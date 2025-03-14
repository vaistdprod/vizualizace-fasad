import type { Metadata } from 'next'
import { cn } from '@/utilities/ui'
import { GeistSans } from 'geist/font/sans'
import React from 'react'
import { InitTheme } from '@/providers/Theme/InitTheme'
import { Footer } from '@/Footer/Component'
import { Header } from '@/Header/Component'
import { Providers } from '@/providers'
import { CookieConsent } from '@/components/CookieConsent'
import { draftMode } from 'next/headers'
import { GTM } from '@/components/GTM'
import { getServerSideURL } from '@/utilities/getURL'
import './globals.css'

export default async function RootLayout({ children }: { readonly children: React.ReactNode }) {
  const { isEnabled: _isEnabled } = await draftMode()

  return (
    <html className={cn(GeistSans.variable)} lang="cs" suppressHydrationWarning>
      <head>
        <InitTheme />
        <link href="/favicon.png" rel="icon" sizes="32x32" />
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
        <link href="/apple-touch-icon.png" rel="apple-touch-icon" sizes="180x180" />
        <link href="/favicon-192x192.png" rel="icon" sizes="192x192" />
        <link rel="preconnect" href={getServerSideURL()} />
        <link rel="dns-prefetch" href={getServerSideURL()} />
      </head>
      <body className="antialiased relative">
        <Providers>
          <GTM />
          <Header />
          <main>{children}</main>
          <Footer />
          <CookieConsent />
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
  openGraph: {
    type: 'website',
    siteName: 'studiofasad.cz - Profesionální návrhy fasád',
    locale: 'cs_CZ',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
}
