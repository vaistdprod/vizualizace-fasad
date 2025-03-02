import { getCachedGlobal } from '@/utilities/getGlobals'
import Link from 'next/link'
import React from 'react'
import { Instagram, Facebook } from 'lucide-react'

import type { Footer } from '@/payload-types'

import { Logo } from '@/components/Logo/Logo'
import { AnimatedGradientText } from '@/components/ui/animated-gradient-text'

export async function Footer() {
  const footerData = (await getCachedGlobal('footer', 1)()) as Footer // Type assertion to Footer

  return (
    <footer className="mt-auto border-t border-border bg-muted/50">
      <div className="container py-8 grid gap-8 md:grid-cols-3 md:gap-12">
        {/* Column 1: Logo and Socials */}
        <div className="flex flex-col items-center md:items-start gap-4">
          <Link href="/" className="flex items-center">
            <Logo className="w-10 h-10" />
            <AnimatedGradientText as="span" className="ml-2 text-xl font-bold tracking-tighter">
              Dětská ordinace Zbiroh
            </AnimatedGradientText>
          </Link>
          <div className="flex gap-4">
            {footerData.socialLinks?.map((social, i) => (
              <Link key={i} href={social.url} className="text-muted-foreground hover:text-primary">
                {social.platform === 'Facebook' ? (
                  <Facebook className="w-6 h-6" />
                ) : social.platform === 'Instagram' ? (
                  <Instagram className="w-6 h-6" />
                ) : null}
                <span className="sr-only">{social.platform}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Column 2: Links */}
        {footerData.footerColumns?.slice(0, 2).map((column, i) => (
          <div key={i} className="flex flex-col items-center md:items-start gap-2">
            <h3 className="text-lg font-semibold">{column.title}</h3>
            <nav className="flex flex-col gap-2">
              {column.links?.map((link, j) => (
                <Link
                  key={j}
                  href={link.url}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        ))}

        {/* Column 3: Links */}
        {footerData.footerColumns?.slice(2).map((column, i) => (
          <div key={i} className="flex flex-col items-center md:items-start gap-2">
            <h3 className="text-lg font-semibold">{column.title}</h3>
            <nav className="flex flex-col gap-2">
              {column.links?.map((link, j) => (
                <Link
                  key={j}
                  href={link.url}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        ))}
      </div>

      {/* Copyright */}
      <div className="text-center py-4 border-t border-border">
        <p className="text-muted-foreground">{footerData.copyrightText}</p>
      </div>
    </footer>
  )
}
