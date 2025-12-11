'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useRef, useEffect } from 'react'
import { NavigationItem } from '@/lib/types'

interface HeaderProps {
  navigation: NavigationItem[]
}

export default function Header({ navigation }: HeaderProps) {
  const pathname = usePathname()
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileDropdown, setMobileDropdown] = useState<string | null>(null)
  const closeTimer = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    // Close menus on route change
    const timer = setTimeout(() => {
      setOpenDropdown(null)
      setMobileOpen(false)
      setMobileDropdown(null)
    }, 0)
    return () => clearTimeout(timer)
  }, [pathname])

  const clearCloseTimer = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current)
      closeTimer.current = null
    }
  }

  const scheduleClose = () => {
    clearCloseTimer()
    closeTimer.current = setTimeout(() => {
      setOpenDropdown(null)
    }, 200)
  }

  const getHref = (item: NavigationItem): string => {
    if (item.linkType === 'external' && item.externalUrl) {
      return item.externalUrl
    }
    if (item.linkType === 'page' && item.page?.slug?.current) {
      const slug = item.page.slug.current
      return slug === 'home' ? '/' : `/${slug}`
    }
    return '#'
  }

  const isActive = (item: NavigationItem): boolean => {
    if (item.linkType === 'page' && item.page?.slug?.current) {
      const slug = item.page.slug.current
      const href = slug === 'home' ? '/' : `/${slug}`
      return pathname === href
    }
    return false
  }

  const hasChildren = (item: NavigationItem): boolean => {
    return !!(item.children && item.children.length > 0)
  }

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm" style={{ fontFamily: 'var(--font-brandon), sans-serif' }}>
      <nav className="w-full">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
          <div className="flex items-center justify-center md:justify-center h-16 md:h-20 lg:h-24 w-full">
            <button
              className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-black hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-teal-500"
              aria-label="Toggle navigation menu"
              onClick={() => setMobileOpen((prev) => !prev)}
            >
              <span className="sr-only">Open main menu</span>
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                {mobileOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
            <div className="hidden md:flex items-center justify-center gap-x-3 lg:gap-x-4 xl:gap-x-5 2xl:gap-x-6">
              {navigation.length === 0 ? (
                <div className="text-xl text-gray-400">No navigation items found</div>
              ) : (
                navigation.map((item) => {
                  const itemIsActive = isActive(item)
                  const itemHasChildren = hasChildren(item)
                  const isDropdownOpen = openDropdown === item._id

                  return (
                    <div
                      key={item._id}
                      className="relative group"
                      onMouseEnter={() => {
                        if (itemHasChildren) {
                          clearCloseTimer()
                          setOpenDropdown(item._id)
                        }
                      }}
                      onMouseLeave={() => {
                        scheduleClose()
                      }}
                    >
                      {item.linkType === 'external' ? (
                        <a
                          href={getHref(item)}
                          target="_blank"
                          rel="noreferrer"
                          className={`text-base md:text-lg lg:text-xl xl:text-xl 2xl:text-xl font-medium transition-colors duration-200 whitespace-nowrap inline-block ${itemIsActive
                            ? 'text-teal-500'
                            : 'text-black hover:text-teal-600'
                            }`}
                        >
                          {item.label}
                        </a>
                      ) : (
                        <Link
                          href={getHref(item)}
                          className={`text-base md:text-lg lg:text-xl xl:text-xl 2xl:text-xl font-medium transition-colors duration-200 whitespace-nowrap inline-block ${itemIsActive
                            ? 'text-teal-500'
                            : 'text-black hover:text-teal-600'
                            }`}
                        >
                          {item.label}
                        </Link>
                      )}

                      {/* Dropdown Menu - Remove the gap and fix styling */}
                      {itemHasChildren && isDropdownOpen && (
                        <div
                          className="absolute left-0 w-56 lg:w-64 xl:w-72 bg-white rounded-md shadow-lg border border-gray-200 py-2 mt-1"
                          style={{
                            top: '100%',
                            zIndex: 9999,
                          }}
                          onMouseEnter={() => {
                            clearCloseTimer()
                            setOpenDropdown(item._id)
                          }}
                          onMouseLeave={() => {
                            scheduleClose()
                          }}
                        >
                          {item.children && item.children.length > 0 ? (
                            item.children.map((child, index) => {
                              const childSlug = child.page?.slug?.current
                              const childHref =
                                child?.linkType === 'external' && child.externalUrl
                                  ? child.externalUrl
                                  : childSlug === 'home'
                                    ? '/'
                                    : childSlug
                                      ? `/${childSlug}`
                                      : '#'
                              const childIsActive =
                                child?.linkType === 'page' && childSlug
                                  ? pathname === (childSlug === 'home' ? '/' : `/${childSlug}`)
                                  : false

                              return (
                                child?.linkType === 'external' ? (
                                  <a
                                    key={`${item._id}-child-${index}`}
                                    href={childHref}
                                    target="_blank"
                                    rel="noreferrer"
                                    className={`block px-4 py-2 text-sm lg:text-base xl:text-base 2xl:text-lg transition-colors duration-200 ${childIsActive
                                      ? 'text-teal-500 bg-teal-50'
                                      : 'text-gray-700 hover:text-teal-600 hover:bg-gray-50'
                                      }`}
                                    onClick={() => setOpenDropdown(null)}
                                  >
                                    {child.label}
                                  </a>
                                ) : (
                                  <Link
                                    key={`${item._id}-child-${index}`}
                                    href={childHref}
                                    className={`block px-4 py-2 text-sm lg:text-base xl:text-base 2xl:text-lg transition-colors duration-200 ${childIsActive
                                      ? 'text-teal-500 bg-teal-50'
                                      : 'text-gray-700 hover:text-teal-600 hover:bg-gray-50'
                                      }`}
                                    onClick={() => setOpenDropdown(null)}
                                  >
                                    {child.label}
                                  </Link>
                                )
                              )
                            })
                          ) : (
                            <div className="px-4 py-2 text-gray-500">No sub-pages</div>
                          )}
                        </div>
                      )}
                    </div>
                  )
                })
              )}
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ${mobileOpen ? 'max-h-[80vh] py-2' : 'max-h-0'
            } ${mobileOpen ? 'overflow-y-auto' : ''}`}
        >
          <div className="container mx-auto px-4 sm:px-6">
            {navigation.length === 0 ? (
              <div className="text-base text-gray-400 py-4 text-center">No navigation items found</div>
            ) : (
              <div className="space-y-2 pb-4">
                {navigation.map((item) => {
                  const itemIsActive = isActive(item)
                  const itemHasChildren = hasChildren(item)

                  return (
                    <div key={item._id} className="border-b border-gray-100 pb-2">
                      <div className="flex items-center justify-center relative">
                        {itemHasChildren ? (
                          <>
                            <button
                              type="button"
                              className={`text-center text-lg font-medium ${itemIsActive ? 'text-teal-500' : 'text-black'}`}
                              onClick={() =>
                                setMobileDropdown((prev) => (prev === item._id ? null : item._id))
                              }
                            >
                              {item.label}
                            </button>
                            <button
                              type="button"
                              aria-label="Toggle submenu"
                              className="absolute right-0 p-1 text-gray-500"
                              onClick={() =>
                                setMobileDropdown((prev) => (prev === item._id ? null : item._id))
                              }
                            >
                              <svg
                                className={`h-5 w-5 transition-transform ${mobileDropdown === item._id ? 'rotate-180' : 'rotate-0'}`}
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <polyline points="6 9 12 15 18 9" />
                              </svg>
                            </button>
                          </>
                        ) : item.linkType === 'external' ? (
                          <a
                            href={getHref(item)}
                            target="_blank"
                            rel="noreferrer"
                            className={`block text-center text-lg font-medium ${itemIsActive ? 'text-teal-500' : 'text-black'}`}
                            onClick={() => setMobileOpen(false)}
                          >
                            {item.label}
                          </a>
                        ) : (
                          <Link
                            href={getHref(item)}
                            className={`block text-center text-lg font-medium ${itemIsActive ? 'text-teal-500' : 'text-black'}`}
                            onClick={() => setMobileOpen(false)}
                          >
                            {item.label}
                          </Link>
                        )}
                      </div>

                      {itemHasChildren && item.children && item.children.length > 0 && mobileDropdown === item._id && (
                        <div className="mt-2 space-y-2">
                          {item.children.map((child, index) => {
                            const childSlug = child.page?.slug?.current
                            const childHref =
                              child?.linkType === 'external' && child.externalUrl
                                ? child.externalUrl
                                : childSlug === 'home'
                                  ? '/'
                                  : childSlug
                                    ? `/${childSlug}`
                                    : '#'
                            const childIsActive =
                              child?.linkType === 'page' && childSlug
                                ? pathname === (childSlug === 'home' ? '/' : `/${childSlug}`)
                                : false

                            return child?.linkType === 'external' ? (
                              <a
                                key={`${item._id}-mobile-child-${index}`}
                                href={childHref}
                                target="_blank"
                                rel="noreferrer"
                                className={`block text-center text-base ${childIsActive ? 'text-teal-500' : 'text-gray-700'}`}
                                onClick={() => {
                                  setMobileOpen(false)
                                  setMobileDropdown(null)
                                }}
                              >
                                {child.label}
                              </a>
                            ) : (
                              <Link
                                key={`${item._id}-mobile-child-${index}`}
                                href={childHref}
                                className={`block text-center text-base ${childIsActive ? 'text-teal-500' : 'text-gray-700'}`}
                                onClick={() => {
                                  setMobileOpen(false)
                                  setMobileDropdown(null)
                                }}
                              >
                                {child.label}
                              </Link>
                            )
                          })}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  )
}