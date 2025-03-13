import type { Metadata } from 'next'
import Script from 'next/script'
import { cn } from '@/utilities/ui'
import { GeistSans } from 'geist/font/sans'
import React from 'react'
import { InitTheme } from '@/providers/Theme/InitTheme'
import { StructuredData } from '@/components/StructuredData'
import { Footer } from '@/Footer/Component'
import { Header } from '@/Header/Component'
import { Providers } from '@/providers'
import { CookieConsent } from '@/components/CookieConsent'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { draftMode } from 'next/headers'
import { getServerSideURL } from '@/utilities/getURL'
import { GTM_ID } from '@/lib/gtm'

import './globals.css'

export default async function RootLayout({ children }: { readonly children: React.ReactNode }) {
  const { isEnabled: _isEnabled } = await draftMode()

  return (
    <html className={cn(GeistSans.variable)} lang="cs" data-theme="light" suppressHydrationWarning>
      <head>
        <InitTheme />
        <link href="/favicon.png" rel="icon" sizes="32x32" />
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
        <link href="/apple-touch-icon.png" rel="apple-touch-icon" sizes="180x180" />
        <link href="/favicon-192x192.png" rel="icon" sizes="192x192" />
        <link rel="preconnect" href={getServerSideURL()} />
        <link rel="dns-prefetch" href={getServerSideURL()} />
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GTM_ID}`}
          strategy="afterInteractive"
        />
      </head>
      <body className="antialiased relative">
        <Providers>
          <Header />
          <main>{children}</main>
          <Footer />
          <CookieConsent />
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
    'vizualizace fasád',
    'návrhy fasád',
    'fasády novostaveb',
    'rekonstrukce fasád',
    'zateplení fasády',
    'fasádní obklady',
    'kamenné obklady',
    'dřevěné obklady',
    'cihlové obklady',
    'bytové domy',
    'komerční objekty',
    'průmyslové objekty',
    'barevné řešení fasády',
    'vizualizace domu',
    'návrh fasády',
    'fasáda rodinného domu',
    'fasáda bytového domu',
    'fasáda komerčního objektu',
    'realistické vizualizace',
    'grafický návrh fasády',
    'architektonické vizualizace',
    'fasády Ostrava',
    'fasády Brno',
    'fasády Česká republika',
    'VizualizaceFasad.cz',
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
    google: 'verification-code',
  },
}
