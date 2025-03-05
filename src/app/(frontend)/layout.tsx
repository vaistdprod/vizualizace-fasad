import type { Metadata } from 'next'

import { cn } from '@/utilities/ui'
import { Quicksand } from 'next/font/google'
import React from 'react'

import { AdminBar } from '@/components/AdminBar'
import { StructuredData } from '@/components/StructuredData'
import { Footer } from '@/Footer/Component'
import { Header } from '@/Header/Component'
import { Providers } from '@/providers'
import { InitTheme } from '@/providers/Theme/InitTheme'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { draftMode } from 'next/headers'

import './globals.css'
import { getServerSideURL } from '@/utilities/getURL'

// Configure Quicksand font with variable support and optimize loading
const quicksand = Quicksand({
  subsets: ['latin'],
  variable: '--font-quicksand',
  display: 'swap', // Ensures text remains visible during font loading
  preload: true,
  weight: ['300', '400', '500', '600', '700'],
  fallback: ['system-ui', 'sans-serif'], // Fallback fonts to minimize CLS
  adjustFontFallback: true, // Automatically adjust the size of the fallback font
})

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { isEnabled } = await draftMode()

  return (
    <html className={cn('font-sans', quicksand.variable)} lang="cs" suppressHydrationWarning>
      <head>
        <InitTheme />
        <link href="/favicon.ico" rel="icon" sizes="32x32" />
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />

        {/* Preload critical assets */}
        <link rel="preconnect" href={getServerSideURL()} />
        <link rel="dns-prefetch" href={getServerSideURL()} />

        {/* Add preload hints for critical CSS */}
        <link rel="preload" href="/_next/static/css/app.css" as="style" />
      </head>
      <body className="antialiased">
        <Providers>
          <AdminBar
            adminBarProps={{
              preview: isEnabled,
            }}
          />

          <Header />
          <main>{children}</main>
          <Footer />
          <StructuredData />
        </Providers>
      </body>
    </html>
  )
}

export const metadata: Metadata = {
  metadataBase: new URL(getServerSideURL()),
  keywords: [
    'dětský lékař',
    'pediatr',
    'Zbiroh',
    'dětská ordinace',
    'očkování',
    'preventivní prohlídky',
  ],
  openGraph: mergeOpenGraph(),
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'verification-code', // Replace with actual verification code if available
  },
}

export const viewport = {
  themeColor: '#ffffff',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  viewportFit: 'cover',
}
