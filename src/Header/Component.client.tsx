// src/Header/Component.client.tsx
'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import Image from 'next/image'
import type { Header, Media } from '@/payload-types'

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

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Check if the menu is open and the click is outside the menu
      if (isMobileMenuOpen) {
        const target = event.target as HTMLElement
        const isMenuButton =
          target.closest('button')?.getAttribute('aria-label') === 'Přepnout menu'
        const isInsideMenu = target.closest('.mobile-menu')

        if (!isMenuButton && !isInsideMenu) {
          setIsMobileMenuOpen(false)
        }
      }
    }

    // Add event listener when menu is open
    if (isMobileMenuOpen) {
      document.addEventListener('click', handleClickOutside)
    }

    // Clean up event listener
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [isMobileMenuOpen])

  const navItems = data.navItems || []
  const button = data.button || { label: 'Objednat se', url: '#objednani', type: 'custom' }
  const logo = data.logo as Media // Assert it's a Media object since it's required and seeded

  if (!logo.url) {
    throw new Error('Logo URL is missing in Header data')
  }

  return (
    <header
      className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
      {...(theme ? { 'data-theme': theme } : {})}
    >
      <div className="container flex h-16 items-center px-4 md:px-6 mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="mr-4 flex items-center space-x-2 hover:opacity-80 transition-opacity min-w-[48px] flex-shrink-0"
        >
          <Link href="/" className="flex items-center">
            <Image
              src={logo.url} // Now TypeScript knows it's a string
              alt="Logo Pediatr Zbiroh"
              width={48}
              height={48}
              className="object-contain"
              priority
            />
          </Link>
        </motion.div>

        <nav className="flex flex-1 items-center justify-end space-x-6">
          {navItems.map((item, index) => (
            <motion.div
              key={item.link.url}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: index * 0.05, ease: 'easeOut' }}
            >
              <Link
                href={item.link.url || '#'}
                className="text-sm font-medium transition-colors hover:text-primary whitespace-nowrap hidden lg:inline-block"
              >
                {item.link.label}
              </Link>
            </motion.div>
          ))}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: navItems.length * 0.05, ease: 'easeOut' }}
          >
            <Button variant="rainbow" size="sm">
              <Link href={button.url || '#'}>{button.label}</Link>
            </Button>
          </motion.div>
        </nav>

        <motion.button
          className="lg:hidden ml-4 cursor-pointer"
          onClick={toggleMobileMenu}
          whileTap={{ scale: 0.95 }}
          aria-label="Přepnout menu"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          <span className="sr-only">Přepnout menu</span>
        </motion.button>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <motion.div
          className="top-0 left-0 right-0 z-40 border-b shadow-lg lg:hidden mobile-menu relative before:absolute before:inset-0 before:-z-10"
          style={
            {
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
            } as React.CSSProperties
          }
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          {/* Using the before: pseudo-element for backdrop filter to fix Chrome nested filter bug */}
          <div className="container px-4 py-4 mx-auto max-w-7xl">
            <nav className="flex flex-col space-y-4">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.link.url}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2, delay: index * 0.05 }}
                >
                  <Link
                    href={item.link.url || '#'}
                    className="text-base font-medium transition-colors hover:text-primary block py-1"
                    onClick={toggleMobileMenu}
                  >
                    {item.link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </div>
        </motion.div>
      )}
    </header>
  )
}
