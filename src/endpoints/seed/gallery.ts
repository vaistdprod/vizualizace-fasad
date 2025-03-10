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
  title: 'Naše práce',
  layout: [
    {
      blockType: 'galleryGrid',
      projects: [
        { title: 'Moderní kancelářský komplex', image: modernOffice.id, location: 'New York' },
        { title: 'Kulturní centrum', image: culturalCenter.id, location: 'Londýn' },
        { title: 'Rezidenční věž', image: residentialTower.id, location: 'Dubai' },
        { title: 'Firemní sídlo', image: corporateHQ.id, location: 'Singapur' },
        { title: 'Víceúčelový komplex', image: multipurposeComplex.id, location: 'Tokio' },
        { title: 'Udržitelná kancelářská budova', image: sustainableOffice.id, location: 'Kodaň' },
        { title: 'Luxusní hotel', image: luxuryHotel.id, location: 'Miami' },
        { title: 'Inovační centrum', image: innovationCenter.id, location: 'San Francisco' },
      ],
    },
  ],
  meta: {
    title: 'Galerie - FacadeVision',
    description: 'Prohlédněte si portfolio našich architektonických vizualizací.',
    image: modernOffice.id,
  },
})
