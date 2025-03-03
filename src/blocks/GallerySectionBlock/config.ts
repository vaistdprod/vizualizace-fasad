import type { Block } from 'payload'

export const GallerySection: Block = {
  slug: 'gallerySection',
  interfaceName: 'GallerySectionBlock',
  labels: {
    singular: 'Galerie',
    plural: 'Galerie',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
      label: 'Nadpis',
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      label: 'Popis',
    },
    {
      name: 'images',
      type: 'array',
      label: 'Obrázky',
      minRows: 1,
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          label: 'Název',
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
          label: 'Obrázek',
        },
      ],
    },
  ],
}
