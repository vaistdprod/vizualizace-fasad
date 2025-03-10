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
import { GA_ID } from '@/lib/ga'

import './globals.css'

export default async function RootLayout({ children }: { readonly children: React.ReactNode }) {
  const { isEnabled: _isEnabled } = await draftMode()

  return (
    <html
      className={cn('font-sans', GeistSans.variable)}
      lang="cs"
      data-theme="light"
      suppressHydrationWarning
    >
      <head>
        <InitTheme />
        <link href="/favicon.png" rel="icon" sizes="32x32" />
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
        <link href="/apple-touch-icon.png" rel="apple-touch-icon" sizes="180x180" />
        <link href="/favicon-192x192.png" rel="icon" sizes="192x192" />
        <link rel="preconnect" href={getServerSideURL()} />
        <link rel="dns-prefetch" href={getServerSideURL()} />

        {/* GA4 Script */}
        <Script
          id="ga-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_ID}', { 'send_page_view': true });
              gtag('consent', 'default', {
                'analytics_storage': 'denied'
              });
            `,
          }}
        />
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />
      </head>
      <body className="antialiased">
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
    'dětský lékař',
    'pediatr',
    'Brno',
    'dětská ordinace',
    'očkování',
    'preventivní prohlídky',
    'dětský lékař Brno',
    'pediatr Brno',
    'dětský lékař Starý Lískovec',
    'pediatr Starý Lískovec',
    'dětský lékař Bohunice',
    'pediatr Bohunice',
    'dětský lékař Nový Lískovec',
    'pediatr Nový Lískovec',
    'očkování dětí Brno',
    'preventivní prohlídky dětí',
    'dětská pohotovost Brno',
    'praktický lékař pro děti a dorost',
    'pediatrická ordinace Brno',
    'dětský doktor Brno',
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
    google: 'verification-code',
  },
}
