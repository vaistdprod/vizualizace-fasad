/**
 * Utility for generating structured data (JSON-LD) for pages
 */
import type { Page } from '@/payload-types'

// Define a type for the page schema with required properties
export const generatePageSchema = (page: Pick<Page, 'title' | 'publishedAt' | 'meta'>) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: page.title,
    description: page.meta?.description || '',
    datePublished: page.publishedAt,
    dateModified: new Date().toISOString(),
    publisher: {
      '@type': 'Organization',
      name: 'Vizualizace fasád',
      logo: {
        '@type': 'ImageObject',
        url: `${process.env.NEXT_PUBLIC_SERVER_URL}/favicon.svg`,
      },
    },
  }
}

export const generateOrganizationSchema = () => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': process.env.NEXT_PUBLIC_SERVER_URL,
    name: 'Vizualizace fasád',
    description: 'Profesionální vizualizace fasád a architektonické služby',
    url: process.env.NEXT_PUBLIC_SERVER_URL,
    logo: {
      '@type': 'ImageObject',
      url: `${process.env.NEXT_PUBLIC_SERVER_URL}/favicon.svg`,
    },
    sameAs: [
      // Add social media links if available
    ],
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'CZ',
    },
    priceRange: '$$',
    availableLanguage: {
      '@type': 'Language',
      name: 'Čeština',
      alternateName: 'cs',
    },
  }
}
