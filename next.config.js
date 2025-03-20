import { withPayload } from '@payloadcms/next/withPayload'
import redirects from './redirects.js'

const NEXT_PUBLIC_SERVER_URL = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      ...[NEXT_PUBLIC_SERVER_URL /* 'https://example.com' */].map((item) => {
        const url = new URL(item)
        return {
          hostname: url.hostname,
          protocol: url.protocol.replace(':', ''),
        }
      }),
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
  reactStrictMode: true,
  redirects, // Your existing redirects from redirects.js
  poweredByHeader: false,
  compress: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  experimental: {
    optimizeCss: true,
    viewTransition: true,
    optimizePackageImports: ['framer-motion', 'lucide-react'],
  },
  httpAgentOptions: {
    keepAlive: true,
  },
  async rewrites() {
    return [
      {
        source: '/', // User visits /
        destination: '/uvod', // Serve content from /uvod (slug: 'uvod')
      },
    ]
  },
  async redirects() {
    // Combine with existing redirects from redirects.js
    const existingRedirects = typeof redirects === 'function' ? await redirects() : redirects || []
    return [
      ...existingRedirects,
      {
        source: '/uvod', // User visits /uvod
        destination: '/', // Redirect to / with a 301
        permanent: true, // Permanent redirect (301) for SEO
      },
      // New redirects for /kontakt and /kontakty
      {
        source: '/kontakt',
        destination: '/kontakt-cenik',
        permanent: true,
      },
      {
        source: '/kontakty',
        destination: '/kontakt-cenik',
        permanent: true,
      },
      // New redirects for photogallery-related paths
      {
        source: '/fasady-rodinnych-domu-fotogalerie',
        destination: '/fotogalerie-fasad',
        permanent: true,
      },
      {
        source: '/fotogalerie',
        destination: '/fotogalerie-fasad',
        permanent: true,
      },
      {
        source: '/fasady-rodinnych-domu-fotogalerie/fotogalerie-realizaci',
        destination: '/fotogalerie-fasad',
        permanent: true,
      },
      {
        source: '/realizace/venkovni-obklady-fasad',
        destination: '/fotogalerie-fasad',
        permanent: true,
      },
      {
        source: '/realizace/renovace-fasad',
        destination: '/fotogalerie-fasad',
        permanent: true,
      },
      {
        source: '/realizace/rekonstrukce-fasad',
        destination: '/fotogalerie-fasad',
        permanent: true,
      },
      {
        source: '/realizace/zatepleni-fasad',
        destination: '/fotogalerie-fasad',
        permanent: true,
      },
      {
        source: '/realizace/opravy-fasad',
        destination: '/fotogalerie-fasad',
        permanent: true,
      },
      {
        source: '/realizace/natery-fasad',
        destination: '/fotogalerie-fasad',
        permanent: true,
      },
      // New redirects for visualization-related paths
      {
        source: '/navrhy-vizualizace-fasad',
        destination: '/fasady',
        permanent: true,
      },
      {
        source: '/navrhy-vizualizace-fasad/vizualizace',
        destination: '/fasady',
        permanent: true,
      },
      {
        source: '/navrhy-vizualizace-fasad/pruvodce-navrhem-barvy-a-materialu-fasad',
        destination: '/fasady',
        permanent: true,
      },
    ]
  },
}

export default withPayload(nextConfig)
