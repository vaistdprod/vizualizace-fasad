// src/seed/fotogalerie.ts
import type { RequiredDataFromCollectionSlug } from 'payload'
import type { Media } from '@/payload-types'

type FotogalerieArgs = {
  galleryHeroImage: Media
}

export const fotogalerie: (args: FotogalerieArgs) => RequiredDataFromCollectionSlug<'pages'> = ({
  galleryHeroImage,
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
          heading: 'Galerie realizací',
          description:
            'Prohlédněte si ukázky našich realizací. Porovnejte původní stav, vizualizaci a výslednou realizaci.',
          // Fetched dynamically from Projects
        },
      ],
    },
  ],
  meta: {
    title: 'Fotogalerie realizací - studiofasad.cz',
    description:
      'Ukázky realizovaných fasád podle našich návrhů. Porovnejte původní stav, vizualizaci a výslednou realizaci.',
    image: galleryHeroImage.id,
    keywords:
      'fotogalerie fasád, realizace fasád, studiofasad.cz, fotogalerie vizualizací, před a po fasády',
  },
})
