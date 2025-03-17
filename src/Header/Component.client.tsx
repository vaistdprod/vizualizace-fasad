// components/HeaderClient.tsx
'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { TopBar } from './TopBar'
import { ThemeSelector } from '@/providers/Theme/ThemeSelector'
import { cn } from '@/utilities/ui'
import Image from 'next/image'
import type { Header } from '@/payload-types'

interface HeaderClientProps {
  data: Header
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 0)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
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
    if (isMobileMenuOpen) document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [isMobileMenuOpen])

  const { navItems = [], topBar, logoSvg } = data

  return (
    <>
      {topBar && <TopBar phone={topBar.phone} email={topBar.email} />}
      <header
        className={cn(
          'sticky top-0 z-50 w-full transition-all duration-300 border-b',
          scrolled
            ? 'backdrop-blur-xl bg-background/80 border-opacity-100'
            : 'bg-transparent border-transparent',
        )}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between py-4.5 px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="flex lg:flex-1"
          >
            <Link href="/" className="flex items-center">
              {logoSvg ? (
                <div
                  dangerouslySetInnerHTML={{ __html: logoSvg }}
                  className="w-[81px] h-[54px] object-contain"
                />
              ) : (
                <span className="font-semibold text-xl">studiofasad.cz</span>
              )}
            </Link>
          </motion.div>

          <nav className="hidden lg:flex lg:gap-x-8">
            {navItems?.map((item, index) => (
              <motion.div
                key={item.link.url}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: index * 0.05 }}
              >
                <Link
                  href={item.link.url || '#'}
                  className="text-sm font-semibold leading-6 hover:text-primary/80"
                >
                  {item.link.label}
                </Link>
              </motion.div>
            ))}
          </nav>

          <div className="flex items-center pl-4 h-full">
            <ThemeSelector />
            <motion.button
              className="lg:hidden cursor-pointer"
              onClick={toggleMobileMenu}
              whileTap={{ scale: 0.95 }}
              aria-label="Přepnout menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </motion.button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <motion.div
            className="lg:hidden bg-background/95 backdrop-blur-xl border-b mobile-menu"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <nav className="flex flex-col space-y-4 p-6">
              {navItems?.map((item, index) => (
                <motion.div
                  key={item.link.url}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2, delay: index * 0.05 }}
                >
                  <Link
                    href={item.link.url || '#'}
                    className="text-base font-medium hover:text-primary/80 transition-colors"
                    onClick={toggleMobileMenu}
                  >
                    {item.link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </header>
    </>
  )
}
