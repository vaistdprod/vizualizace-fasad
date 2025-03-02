'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { Logo } from '@/components/Logo/Logo'
import { Button } from '@/components/ui/button'

import type { Header } from '@/payload-types'

interface HeaderClientProps {
  data: Header
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  const [theme, setTheme] = useState<string | null>(null)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const pathname = usePathname()

  useEffect(() => {
    setHeaderTheme(null)
  }, [pathname, setHeaderTheme])

  useEffect(() => {
    if (headerTheme && headerTheme !== theme) setTheme(headerTheme)
  }, [headerTheme])

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen)

  return (
    <header className="container relative z-20 py-4" {...(theme ? { 'data-theme': theme } : {})}>
      <div className="flex items-center justify-between">
        {/* Logo Left */}
        <Link href="/" className="flex items-center">
          <Logo loading="eager" priority="high" className="w-10 h-10" />
        </Link>

        {/* Nav Center (Desktop) */}
        <nav className="hidden md:flex flex-1 justify-center gap-4">
          {data.navItems?.map(({ link }, i) => (
            <Link
              key={i}
              href={link.url || '#'}
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Button Right (Desktop) */}
        <div className="hidden md:block">
          <Button asChild>
            <Link href={data.button?.url || '#'}>{data.button?.label}</Link>
          </Button>
        </div>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden" onClick={toggleMobileMenu}>
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          <span className="sr-only">Toggle menu</span>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <nav className="md:hidden flex flex-col items-center gap-4 mt-4">
          {data.navItems?.map(({ link }, i) => (
            <Link
              key={i}
              href={link.url || '#'}
              className="text-muted-foreground hover:text-primary transition-colors"
              onClick={toggleMobileMenu}
            >
              {link.label}
            </Link>
          ))}
          <Button asChild>
            <Link href={data.button?.url || '#'} onClick={toggleMobileMenu}>
              {data.button?.label}
            </Link>
          </Button>
        </nav>
      )}
    </header>
  )
}
