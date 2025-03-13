import type { Metadata } from 'next'
import { getServerSideURL } from './getURL'

const defaultOpenGraph: Metadata['openGraph'] = {
  type: 'website',
  description:
    'Profesionální návrhy a vizualizace fasád pro novostavby, rekonstrukce i komerční objekty. Realistické vizualizace, barevná řešení a fasádní obklady.',
  images: [
    {
      url: `${getServerSideURL()}/og-image.jpg`,
      width: 1200,
      height: 630,
      alt: 'studiofasad.cz - Profesionální návrhy fasád',
    },
  ],
  siteName: 'studiofasad.cz - Profesionální návrhy fasád',
  title: 'studiofasad.cz - Profesionální návrhy a vizualizace fasád',
  locale: 'cs_CZ',
}

export const mergeOpenGraph = (og?: Metadata['openGraph']): Metadata['openGraph'] => {
  return {
    ...defaultOpenGraph,
    ...og,
    images: og?.images ? og.images : defaultOpenGraph.images,
  }
}
