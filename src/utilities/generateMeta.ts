import type { Metadata } from 'next'
import { Page, Media } from '@/payload-types'
import { getServerSideURL } from './getURL'

// Define a stricter Meta type to include keywords
type CustomMeta = {
  title?: string | null
  description?: string | null
  image?: number | Media | null
  keywords?: string | null
}

const getImageURL = (image?: CustomMeta['image']) => {
  const serverUrl = getServerSideURL()
  if (image && typeof image === 'object' && 'url' in image) {
    return image.sizes?.og?.url ? `${serverUrl}${image.sizes.og.url}` : `${serverUrl}${image.url}`
  }
  return `${serverUrl}/favicon.svg`
}

export const generateMeta = async ({ doc }: { doc: Partial<Page> | null }): Promise<Metadata> => {
  if (!doc) return {}

  const pageUrl = `${getServerSideURL()}/${doc.slug || ''}`
  const ogImage = getImageURL(doc.meta?.image)

  return {
    title: doc.meta?.title ?? doc.title ?? undefined, // Explicit null coalescing
    description: doc.meta?.description ?? undefined,
    keywords: doc.meta?.keywords?.split(',').map((k: string) => k.trim()) ?? undefined,
    openGraph: {
      title: doc.meta?.title ?? doc.title ?? undefined,
      description: doc.meta?.description ?? undefined,
      url: pageUrl,
      images: ogImage
        ? [{ url: ogImage, width: 1200, height: 630, alt: doc.title ?? '' }]
        : undefined,
      locale: 'cs_CZ',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: doc.meta?.title ?? doc.title ?? undefined,
      description: doc.meta?.description ?? undefined,
      images: ogImage ? [ogImage] : undefined,
    },
    alternates: { canonical: pageUrl },
    robots: { index: true, follow: true },
  }
}
