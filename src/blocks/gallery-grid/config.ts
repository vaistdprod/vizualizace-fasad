// src/blocks/gallery-grid/config.ts
import { Block } from 'payload'

export const GalleryGrid: Block = {
  slug: 'galleryGrid',
  interfaceName: 'GalleryGridBlock',
  labels: {
    singular: { en: 'Gallery Grid', cs: 'Galerie mřížka' },
    plural: { en: 'Gallery Grids', cs: 'Galerie mřížky' },
  },
  fields: [
    {
      name: 'badgeText',
      type: 'text',
      label: { en: 'Badge Text', cs: 'Text odznaku' },
    },
    {
      name: 'heading',
      type: 'text',
      label: { en: 'Section Heading', cs: 'Nadpis sekce' },
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      label: { en: 'Description', cs: 'Popis' },
    },
  ],
}
