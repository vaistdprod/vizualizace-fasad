'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Heart } from 'lucide-react'
import React from 'react'
import type { Footer as FooterType } from '@/payload-types'

interface FooterClientProps {
  data: FooterType
}

export const FooterClient: React.FC<FooterClientProps> = ({ data }) => {
  const socialLinks = data.socialLinks || []
  const footerColumns = data.footerColumns || []
  const description =
    data.description ||
    'Providing compassionate pediatric care for your children, from newborns to adolescents.'
  const copyrightText =
    data.copyrightText ||
    `© ${new Date().getFullYear()} Dětská ordinace Zbiroh. All rights reserved.`

  return (
    <footer className="border-t bg-card">
      <div className="container px-4 md:px-6 mx-auto max-w-7xl">
        <div className="grid gap-8 py-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Logo and Description (Column 1) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <div className="flex items-center space-x-2">
              <Heart className="h-6 w-6 text-primary" />
              <span className="text-lg font-bold">Dětská ordinace Zbiroh</span>
            </div>
            <p className="text-sm text-muted-foreground">{description}</p>
            <div className="flex space-x-4">
              {socialLinks.map((social, i) => (
                <Link
                  key={i}
                  href={social.url || '#'}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {social.platform}
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Navigation Columns (2-4) */}
          {footerColumns.map((column, index) => (
            <motion.div
              key={column.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <h3 className="font-semibold mb-4">{column.title}</h3>
              <ul className="space-y-2">
                {column.links?.map((link, j) => (
                  <li key={j}>
                    <Link
                      href={link.url || '#'}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
        <div className="border-t py-6 text-center text-sm text-muted-foreground">
          <p suppressHydrationWarning>{copyrightText}</p>
        </div>
      </div>
    </footer>
  )
}
