'use client'

import { usePathname } from 'next/navigation'
import Header from './Header'
import Footer from './Footer'
import { NavigationItem } from '@/lib/types'

export default function ConditionalLayout({
  children,
  navigation,
}: {
  children: React.ReactNode
  navigation: NavigationItem[]
}) {
  const pathname = usePathname()
  const isStudio = pathname?.startsWith('/studio')

  return (
    <>
      {!isStudio && <Header navigation={navigation} />}
      {children}
      {!isStudio && <Footer />}
    </>
  )
}

