'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useRef } from 'react'
import { NavigationItem } from '@/lib/types'

interface HeaderProps {
  navigation: NavigationItem[]
}

export default function Header({ navigation }: HeaderProps) {
  const pathname = usePathname()
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const closeTimer = useRef<NodeJS.Timeout | null>(null)

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
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center h-24">
          <div className="flex items-center space-x-6 lg:space-x-8">
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
                        className={`text-xl font-medium transition-colors duration-200 whitespace-nowrap inline-block ${itemIsActive
                            ? 'text-teal-500'
                            : 'text-black hover:text-teal-600'
                          }`}
                      >
                        {item.label}
                      </a>
                    ) : (
                      <Link
                        href={getHref(item)}
                        className={`text-xl font-medium transition-colors duration-200 whitespace-nowrap inline-block ${itemIsActive
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
                        className="absolute left-0 w-64 bg-white rounded-md shadow-lg border border-gray-200 py-2 mt-1"
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
                                  className={`block px-4 py-2 text-base transition-colors duration-200 ${childIsActive
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
                                  className={`block px-4 py-2 text-base transition-colors duration-200 ${childIsActive
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
      </nav>
    </header>
  )
}