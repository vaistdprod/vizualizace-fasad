import type { Metadata } from 'next'

import { cn } from '@/utilities/ui'
import { Mali, Nunito } from 'next/font/google'
import React from 'react'

import { StructuredData } from '@/components/StructuredData'
import { Footer } from '@/Footer/Component'
import { Header } from '@/Header/Component'
import { Providers } from '@/providers'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { draftMode } from 'next/headers'

import './globals.css'
import { getServerSideURL } from '@/utilities/getURL'

// Configure Mali font for headings
const mali = Mali({
  subsets: ['latin'],
  variable: '--font-mali',
  display: 'swap', // Ensures text remains visible during font loading
  preload: true,
  weight: ['400', '500', '600', '700'],
  fallback: ['cursive', 'system-ui'], // Fallback fonts to minimize CLS
  adjustFontFallback: true, // Automatically adjust the size of the fallback font
})

// Configure Nunito font for body text
const nunito = Nunito({
  subsets: ['latin'],
  variable: '--font-nunito',
  display: 'swap', // Ensures text remains visible during font loading
  preload: true,
  weight: ['400', '500', '600', '700'],
  fallback: ['system-ui', 'sans-serif'], // Fallback fonts to minimize CLS
  adjustFontFallback: true, // Automatically adjust the size of the fallback font
})

export default async function RootLayout({ children }: { readonly children: React.ReactNode }) {
  const { isEnabled: _isEnabled } = await draftMode()

  return (
    <html
      className={cn('font-sans', mali.variable, nunito.variable)}
      lang="cs"
      data-theme="light"
      suppressHydrationWarning
    >
      <head>
        <link href="/favicon.png" rel="icon" sizes="32x32" />
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
        <link href="/apple-touch-icon.png" rel="apple-touch-icon" sizes="180x180" />
        <link href="/favicon-192x192.png" rel="icon" sizes="192x192" />

        {/* Preload critical assets */}
        <link rel="preconnect" href={getServerSideURL()} />
        <link rel="dns-prefetch" href={getServerSideURL()} />
      </head>
      <body className="antialiased">
        <Providers>
          <Header />
          <main>{children}</main>
          <Footer />
          <StructuredData />
        </Providers>
      </body>
    </html>
  )
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export const metadata: Metadata = {
  metadataBase: new URL(getServerSideURL()),
  keywords: [
    // Core terms
    'dětský lékař',
    'pediatr',
    'Brno',
    'dětská ordinace',
    'očkování',
    'preventivní prohlídky',
    // Location variations
    'dětský lékař Brno',
    'pediatr Brno',
    'dětský lékař Starý Lískovec',
    'pediatr Starý Lískovec',
    'dětský lékař Bohunice',
    'pediatr Bohunice',
    'dětský lékař Nový Lískovec',
    'pediatr Nový Lískovec',
    // Service variations
    'očkování dětí Brno',
    'preventivní prohlídky dětí',
    'dětská pohotovost Brno',
    'praktický lékař pro děti a dorost',
    'pediatrická ordinace Brno',
    'dětský doktor Brno',
    // Specific conditions/services
    'CRP test pro děti',
    'odběry krve u dětí',
    'laktační poradna Brno',
    'výživové poradenství pro děti',
    'péče o novorozence Brno',
    'péče o kojence',
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
