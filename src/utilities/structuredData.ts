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
      name: 'studiofasad.cz',
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
    name: 'studiofasad.cz',
    description:
      'Profesionální návrhy a vizualizace fasád pro novostavby, rekonstrukce i komerční objekty.',
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
      streetAddress: 'Luční 706',
      addressLocality: 'Stará Ves nad Ondřejnicí',
      addressCountry: 'CZ',
      postalCode: '739 23',
    },
    priceRange: '2900 Kč - 4900 Kč',
    telephone: '+420 725 136 901',
    email: 'info@vizualizacefasad.cz',
    vatID: 'CZ04189841',
    founder: {
      '@type': 'Person',
      name: 'Ing. Jan Kantor',
      jobTitle: 'Návrhy, design, obchod',
    },
    availableLanguage: {
      '@type': 'Language',
      name: 'Čeština',
      alternateName: 'cs',
    },
  }
}
