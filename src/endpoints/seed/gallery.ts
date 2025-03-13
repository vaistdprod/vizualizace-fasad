import type { RequiredDataFromCollectionSlug } from 'payload'
import type { Media } from '@/payload-types'

type GalleryArgs = {
  modernOffice: Media
  culturalCenter: Media
  residentialTower: Media
  corporateHQ: Media
  multipurposeComplex: Media
  sustainableOffice: Media
  luxuryHotel: Media
  innovationCenter: Media
}

export const gallery: (args: GalleryArgs) => RequiredDataFromCollectionSlug<'pages'> = ({
  modernOffice,
  culturalCenter,
  residentialTower,
  corporateHQ,
  multipurposeComplex,
  sustainableOffice,
  luxuryHotel,
  innovationCenter,
}) => ({
  slug: 'galerie',
  _status: 'published',
  title: 'Fotogalerie realizací',
  layout: [
    {
      blockType: 'backgroundImage',
      backgroundType: 'gridPattern', // Explicitly grid for this client
      blocks: [
        {
          blockType: 'galleryGrid',
          badgeText: 'Naše práce',
          heading: 'Galerie realizací',
          description:
            'Prohlédněte si ukázky našich realizací. Porovnejte původní stav, vizualizaci a výslednou realizaci.',
          projects: [
            {
              title: 'Realizace fasády Ostrava - před',
              image: modernOffice.id,
              location: 'Ostrava',
            },
            {
              title: 'Realizace fasády Ostrava - vizualizace',
              image: culturalCenter.id,
              location: 'Ostrava',
            },
            {
              title: 'Realizace fasády Ostrava - po',
              image: residentialTower.id,
              location: 'Ostrava',
            },
            {
              title: 'Realizace fasády Bukovinka - před',
              image: corporateHQ.id,
              location: 'Bukovinka',
            },
            {
              title: 'Realizace fasády Bukovinka - vizualizace',
              image: multipurposeComplex.id,
              location: 'Bukovinka',
            },
            {
              title: 'Realizace fasády Bukovinka - po',
              image: sustainableOffice.id,
              location: 'Bukovinka',
            },
            { title: 'Rodinný dům - vizualizace', image: luxuryHotel.id, location: 'Brno' },
            { title: 'Bytový dům - vizualizace', image: innovationCenter.id, location: 'Brno' },
          ],
        },
      ],
    },
  ],
  meta: {
    title: 'Fotogalerie realizací - VizualizaceFasad.cz',
    description:
      'Ukázky realizovaných fasád podle našich návrhů. Porovnejte původní stav, vizualizaci a výslednou realizaci.',
    image: modernOffice.id,
  },
})
