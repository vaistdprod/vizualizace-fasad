import type { Metadata } from 'next'
import { getServerSideURL } from './getURL'

const defaultOpenGraph: Metadata['openGraph'] = {
  type: 'website',
  description: 'Web dětské ordinace ve Zbirohu.',
  images: [
    {
      url: `${getServerSideURL()}/favicon.svg`,
    },
  ],
  siteName: 'Dětská ordinace Zbiroh',
  title: 'Dětská ordinace Zbiroh',
}

export const mergeOpenGraph = (og?: Metadata['openGraph']): Metadata['openGraph'] => {
  return {
    ...defaultOpenGraph,
    ...og,
    images: og?.images ? og.images : defaultOpenGraph.images,
  }
}
