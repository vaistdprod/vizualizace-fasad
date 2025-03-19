// src/endpoints/seed/fotogalerie.ts
import type { RequiredDataFromCollectionSlug } from 'payload'
import type { Media } from '@/payload-types'

type FotogalerieArgs = {
  predPo: Media
}

export const fotogalerie: (args: FotogalerieArgs) => RequiredDataFromCollectionSlug<'pages'> = ({
  predPo,
}) => ({
  slug: 'fotogalerie-fasad',
  _status: 'published',
  title: 'Fotogalerie realizací',
  layout: [
    {
      blockType: 'backgroundImage',
      backgroundType: 'gridPattern',
      blocks: [
        {
          blockType: 'galleryGrid',
          badgeText: 'Naše práce',
          heading: 'Fotogalerie realizací',
          description:
            'Ukázky realizovaných fasád podle našich návrhů. Porovnejte původní stav, vizualizaci a výslednou realizaci.',
        },
      ],
    },
  ],
  meta: {
    title: 'Fotogalerie realizací - studiofasad.cz',
    description:
      'Ukázky realizovaných fasád podle našich návrhů. Porovnejte původní stav, vizualizaci a výslednou realizaci.',
    image: predPo.id,
    keywords:
      'fotogalerie fasád, realizace fasád, studiofasad.cz, fotogalerie vizualizací, před a po fasády',
  },
})
