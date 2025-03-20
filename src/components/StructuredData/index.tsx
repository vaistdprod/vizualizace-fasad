'use client'

import Script from 'next/script'
import { Page } from '@/payload-types'
import { getServerSideURL } from '@/utilities/getURL'

interface StructuredDataProps {
  page?: Pick<Page, 'title' | 'publishedAt' | 'meta' | 'slug'>
}

// Union type for all possible schemas
type SchemaType =
  | {
      '@context': string
      '@type': 'Organization'
      '@id': string
      name: string
      description: string
      url: string
      logo: { '@type': string; url: string }
      address: {
        '@type': string
        streetAddress: string
        addressLocality: string
        addressCountry: string
        postalCode: string
      }
      telephone: string
      email: string
      sameAs: string[]
    }
  | {
      '@context': string
      '@type': 'WebPage'
      '@id': string
      url: string
      name: string
      description: string
      datePublished: string | null | undefined
      dateModified: string
      publisher: { '@id': string }
      inLanguage: string
      mainEntity?: { '@id': string }
    }
  | {
      '@context': string
      '@type': 'BreadcrumbList'
      itemListElement: { '@type': string; position: number; name: string; item: string }[]
    }
  | {
      '@context': string
      '@type': 'Service'
      '@id'?: string
      serviceType: string
      provider: { '@id': string }
      description: string
      url: string
    }
  | {
      '@context': string
      '@type': 'Offer'
      '@id'?: string
      name: string
      description: string
      offeredBy: { '@id': string }
      priceCurrency: string
      price: string
      priceValidUntil: string
      url: string
    }
  | {
      '@context': string
      '@type': 'ImageGallery'
      '@id'?: string
      name: string
      description: string
      url: string
      publisher: { '@id': string }
    }
  | {
      '@context': string
      '@type': 'ContactPage'
      '@id'?: string
      name: string
      description: string
      url: string
      contactPoint: {
        '@type': string
        telephone: string
        email: string
        contactType: string
        availableLanguage: string
      }
    }

const generateOrganizationSchema = (): SchemaType => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${getServerSideURL()}#organization`,
  name: 'studiofasad.cz',
  description:
    'Profesionální návrhy a vizualizace fasád pro novostavby, rekonstrukce i komerční objekty.',
  url: getServerSideURL(),
  logo: { '@type': 'ImageObject', url: `${getServerSideURL()}/favicon.svg` },
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Luční 706',
    addressLocality: 'Stará Ves nad Ondřejnicí',
    addressCountry: 'CZ',
    postalCode: '739 23',
  },
  telephone: '+420 725 136 901',
  email: 'info@vizualizacefasad.cz',
  sameAs: [],
})

const generateWebPageSchema = (page: NonNullable<StructuredDataProps['page']>): SchemaType => {
  const url = page.slug === '' ? getServerSideURL() : `${getServerSideURL()}/${page.slug}`
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${url}#webpage`,
    url,
    name: page.title,
    description: page.meta?.description || '',
    datePublished: page.publishedAt,
    dateModified: new Date().toISOString(),
    publisher: { '@id': `${getServerSideURL()}#organization` },
    inLanguage: 'cs-CZ',
  }
}

const generateBreadcrumbSchema = (page: NonNullable<StructuredDataProps['page']>): SchemaType => {
  const pageUrl = page.slug === '' ? getServerSideURL() : `${getServerSideURL()}/${page.slug}`
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Domů', item: getServerSideURL() },
      { '@type': 'ListItem', position: 2, name: page.title, item: pageUrl },
    ],
  }
}

const generateServiceSchema = (page: NonNullable<StructuredDataProps['page']>): SchemaType => {
  const url = `${getServerSideURL()}/${page.slug}`
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${url}#service`,
    serviceType: 'Návrhy a vizualizace fasád',
    provider: { '@id': `${getServerSideURL()}#organization` },
    description: page.meta?.description || '',
    url,
  }
}

const generateOfferSchema = (page: NonNullable<StructuredDataProps['page']>): SchemaType => {
  const url = `${getServerSideURL()}/${page.slug}`
  return {
    '@context': 'https://schema.org',
    '@type': 'Offer',
    '@id': `${url}#offer`,
    name: 'Návrhy fasád',
    description: page.meta?.description || '',
    offeredBy: { '@id': `${getServerSideURL()}#organization` },
    priceCurrency: 'CZK',
    price: '2900',
    priceValidUntil: '2025-12-31',
    url,
  }
}

const generateImageGallerySchema = (page: NonNullable<StructuredDataProps['page']>): SchemaType => {
  const url = `${getServerSideURL()}/${page.slug}`
  return {
    '@context': 'https://schema.org',
    '@type': 'ImageGallery',
    '@id': `${url}#gallery`,
    name: page.title,
    description: page.meta?.description || '',
    url,
    publisher: { '@id': `${getServerSideURL()}#organization` },
  }
}

const generateContactPageSchema = (page: NonNullable<StructuredDataProps['page']>): SchemaType => {
  const url = `${getServerSideURL()}/${page.slug}`
  return {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    '@id': `${url}#contact`,
    name: page.title,
    description: page.meta?.description || '',
    url,
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+420 725 136 901',
      email: 'info@vizualizacefasad.cz',
      contactType: 'customer service',
      availableLanguage: 'cs',
    },
  }
}

export const StructuredData: React.FC<StructuredDataProps> = ({ page }) => {
  const schemas: SchemaType[] = [generateOrganizationSchema()]

  if (page) {
    const slug = page.slug || ''
    const pageUrl = slug === '' ? getServerSideURL() : `${getServerSideURL()}/${slug}`
    schemas.push(generateWebPageSchema(page), generateBreadcrumbSchema(page))

    switch (slug) {
      case 'fasady':
        schemas.push(generateServiceSchema(page))
        break
      case 'kontakt-cenik':
        schemas.push(generateOfferSchema(page))
        break
      case 'fotogalerie-fasad':
        schemas.push(generateImageGallerySchema(page))
        break
      case 'poptavka':
        schemas.push(generateContactPageSchema(page))
        break
      case '': // Homepage
      case 'fasady':
        schemas.push({
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          '@id': `${pageUrl}#webpage`,
          url: pageUrl,
          name: page.title,
          description: page.meta?.description || '',
          datePublished: page.publishedAt,
          dateModified: new Date().toISOString(),
          publisher: { '@id': `${getServerSideURL()}#organization` },
          inLanguage: 'cs-CZ',
          mainEntity: { '@id': `${getServerSideURL()}#organization` },
        })
        break
    }
  }

  return (
    <Script
      id="structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }}
      strategy="afterInteractive"
    />
  )
}
