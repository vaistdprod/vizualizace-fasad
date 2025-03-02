'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Heart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
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

  const navItems = data.navItems || []
  const button = data.button || { label: 'Objednat se', url: '#objednani', type: 'custom' }

  return (
    <header
      className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
      {...(theme ? { 'data-theme': theme } : {})}
    >
      <div className="container flex h-16 items-center px-4 md:px-6 mx-auto max-w-7xl">
        {/* Logo and Name (Left) */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="mr-4 flex items-center space-x-2 hover:text-primary transition-colors"
        >
          <Heart className="h-6 w-6 text-primary" />
          <Link href="/" className="text-lg font-bold transition-colors hover:text-primary">
            Pediatr Zbiroh
          </Link>
        </motion.div>

        {/* Nav and Buttons (Right, Desktop) */}
        <nav className="flex flex-1 items-center justify-end space-x-6">
          {navItems.map((item, index) => (
            <motion.div
              key={item.link.url}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.2,
                delay: index * 0.05,
                ease: 'easeOut',
              }}
            >
              <Link
                href={item.link.url || '#'}
                className="text-sm font-medium transition-colors hover:text-primary whitespace-nowrap hidden md:inline-block"
              >
                {item.link.label}
              </Link>
            </motion.div>
          ))}
          <Button variant="default" size="sm">
            <Link href={button.url || '#'}>{button.label}</Link>
          </Button>
        </nav>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden" onClick={toggleMobileMenu}>
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          <span className="sr-only">Toggle menu</span>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.nav
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden flex flex-col items-center gap-4 p-4 bg-background border-t"
        >
          {navItems.map((item, index) => (
            <Link
              key={item.link.url}
              href={item.link.url || '#'}
              className="text-sm font-medium transition-colors hover:text-primary"
              onClick={toggleMobileMenu}
            >
              {item.link.label}
            </Link>
          ))}
          <Button variant="default" size="sm" onClick={toggleMobileMenu}>
            <Link href={button.url || '#'}>{button.label}</Link>
          </Button>
        </motion.nav>
      )}
    </header>
  )
}
