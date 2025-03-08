import type { Metadata } from 'next'
import { getServerSideURL } from './getURL'

const defaultOpenGraph: Metadata['openGraph'] = {
  type: 'website',
  description:
    'Ordinace praktického lékaře pro děti a dorost MUDr. Miroslavy Janulové ve Starém Lískovci.',
  images: [
    {
      url: `${getServerSideURL()}/favicon.svg`,
    },
  ],
  siteName: 'Ordinace praktického lékaře pro děti a dorost | MUDr. Janulová',
  title: 'Ordinace praktického lékaře pro děti a dorost | MUDr. Janulová',
}

export const mergeOpenGraph = (og?: Metadata['openGraph']): Metadata['openGraph'] => {
  return {
    ...defaultOpenGraph,
    ...og,
    images: og?.images ? og.images : defaultOpenGraph.images,
  }
}
