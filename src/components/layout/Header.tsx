'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Coaching', href: '/coaching' },
  { name: 'Dance & Yoga', href: '/dance-yoga' },
  { name: 'Music', href: '/music' },
  { name: 'Sacred Art & Wisdom', href: '/sacred-art-wisdom' },
  { name: 'Feminine Arts', href: '/feminine-arts' },
  { name: 'Water', href: '/water' },
  { name: 'Visual Storytelling', href: '/visual-storytelling' },
  { name: 'About', href: '/about' },
]

export default function Header() {
  const pathname = usePathname()

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm" style={{ fontFamily: 'var(--font-brandon), sans-serif' }}>
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center h-24">
          <div className="flex items-center space-x-6 lg:space-x-8 overflow-x-auto">
            {navigation.map((item) => {
              const isActive = pathname === item.href ||
                (item.href !== '/' && pathname?.startsWith(item.href))
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`text-xl font-medium transition-colors duration-200 whitespace-nowrap ${isActive
                    ? 'text-teal-500'
                    : 'text-black hover:text-teal-600'
                    }`}
                >
                  {item.name}
                </Link>
              )
            })}
          </div>
        </div>
      </nav>
    </header>
  )
}

