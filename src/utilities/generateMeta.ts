import type { Metadata } from 'next'

import type { Media, Page, Config } from '../payload-types'

import { mergeOpenGraph } from './mergeOpenGraph'
import { getServerSideURL } from './getURL'

const getImageURL = (image?: Media | Config['db']['defaultIDType'] | null) => {
  const serverUrl = getServerSideURL()

  let url = serverUrl + '/favicon.svg'

  if (image && typeof image === 'object' && 'url' in image) {
    const ogUrl = image.sizes?.og?.url

    url = ogUrl ? serverUrl + ogUrl : serverUrl + image.url
  }

  return url
}

/**
 * Generates metadata for pages and aktuality with SEO best practices
 */
export const generateMeta = async (args: { doc: Partial<Page> | null }): Promise<Metadata> => {
  const { doc } = args
  const serverUrl = getServerSideURL()

  // Get the page URL for canonical links
  const pageUrl = Array.isArray(doc?.slug)
    ? `${serverUrl}/${doc?.slug.join('/')}`
    : `${serverUrl}/${doc?.slug ?? ''}`

  const ogImage = getImageURL(doc?.meta?.image)

  // Prioritize page title, then site title
  const title = doc?.meta?.title
    ? `${doc.meta.title} | Ordinace praktického lékaře pro děti a dorost | MUDr. Janulová`
    : 'Ordinace praktického lékaře pro děti a dorost | MUDr. Janulová'

  // Ensure description exists and has reasonable length
  let description = doc?.meta?.description ?? ''
  if (!description) {
    description =
      'Ordinace praktického lékaře pro děti a dorost | MUDr. Janulová - Pediatrická péče pro děti a dorost'
  } else if (description.length > 160) {
    // Truncate to recommended SEO length while preserving whole words
    description = description.substring(0, 157).split(' ').slice(0, -1).join(' ') + '...'
  }

  return {
    description,
    openGraph: mergeOpenGraph({
      description: description,
      images: ogImage
        ? [
            {
              url: ogImage,
              width: 1200,
              height: 630,
              alt:
                doc?.meta?.title ??
                'Ordinace praktického lékaře pro děti a dorost | MUDr. Janulová',
            },
          ]
        : [
            {
              url: `${getServerSideURL()}/media/news-placeholder.jpg`,
              width: 1200,
              height: 630,
              alt: 'Ordinace praktického lékaře pro děti a dorost | MUDr. Janulová',
            },
          ],
      title,
      url: pageUrl.replace(/\/$/, ''), // Remove trailing slash if present
      locale: 'cs_CZ',
      type: 'website',
    }),
    title,
    // Add canonical URL and language alternates
    alternates: {
      canonical: pageUrl,
      languages: {
        'cs-CZ': pageUrl,
      },
    },
    // Add additional metadata for better SEO
    authors: [{ name: 'Ordinace praktického lékaře pro děti a dorost | MUDr. Janulová' }],
    robots: {
      index: true,
      follow: true,
    },
  }
}
