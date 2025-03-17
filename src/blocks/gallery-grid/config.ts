import { Block } from 'payload'

export const GalleryGrid: Block = {
  slug: 'galleryGrid',
  interfaceName: 'GalleryGridBlock',
  labels: {
    singular: 'Gallery Grid',
    plural: 'Gallery Grids',
  },
  fields: [
    {
      name: 'badgeText',
      type: 'text',
      label: 'Badge Text',
    },
    {
      name: 'heading',
      type: 'text',
      label: 'Section Heading',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description',
    },
  ],
}
