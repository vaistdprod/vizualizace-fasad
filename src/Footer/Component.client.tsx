// src/Footer/Component.client.tsx
'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import React from 'react'
import type { Footer, Media } from '@/payload-types'
import Image from 'next/image'

interface FooterClientProps {
  data: Footer
}

export const FooterClient: React.FC<FooterClientProps> = ({ data }) => {
  const { description, footerColumns, copyrightText, logo, title } = data
  const logoMedia = logo as Media | undefined // Type the logo as Media or undefined

  return (
    <footer className="border-t bg-card">
      <div className="container px-4 md:px-6 mx-auto max-w-7xl">
        <div className="grid gap-8 py-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Logo, Title, and Description (Column 1) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            {logoMedia && logoMedia.url ? (
              <Link href="/">
                <Image
                  src={logoMedia.url}
                  alt={title || 'Logo MUDr. Janulová'}
                  width={192}
                  height={48}
                  className="object-contain max-w-[12rem] mb-4" // Match spacing with h3
                />
              </Link>
            ) : null}
            <h3 className="font-semibold">{title}</h3>
            <p className="text-sm text-muted-foreground">{description}</p>
          </motion.div>

          {/* Navigation Columns (2-4) */}
          {footerColumns &&
            footerColumns.length > 0 &&
            footerColumns.map((column, index) => (
              <motion.div
                key={column.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <h3 className="font-semibold mb-4">{column.title}</h3>
                <ul className="space-y-2">
                  {column.links && column.links.length > 0 ? (
                    column.links.map((link) => (
                      <li key={link.label}>
                        <Link
                          href={link.url || '#'}
                          className="text-sm text-muted-foreground hover:text-primary transition-colors"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))
                  ) : (
                    <li className="text-sm text-muted-foreground">Žádné odkazy</li>
                  )}
                </ul>
              </motion.div>
            ))}
        </div>
        <div className="border-t py-6 text-center text-sm text-muted-foreground">
          <p suppressHydrationWarning>
            {copyrightText}{' '}
            <Link href="https://tdprod.cz" className="hover:text-primary transition-colors">
              Vytvořillo TD Productions.
            </Link>
          </p>
        </div>
      </div>
    </footer>
  )
}
