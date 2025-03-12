import type { Block } from 'payload'

export const GalleryGrid: Block = {
  slug: 'galleryGrid',
  interfaceName: 'GalleryGridBlock',
  labels: {
    singular: 'Gallery Grid',
    plural: 'Gallery Grids',
  },
  fields: [
    {
      name: 'preHeading',
      type: 'text',
      label: 'Pre-Heading',
    },
    {
      name: 'heading',
      type: 'text',
      label: 'Section Heading',
      required: true,
      admin: {
        description: 'Heading displayed above the gallery',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description',
      admin: {
        description: 'Optional description displayed below the heading',
      },
    },
    {
      name: 'projects',
      type: 'array',
      label: 'Projects',
      minRows: 1,
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          label: 'Project Title',
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
          label: 'Project Image',
        },
        {
          name: 'location',
          type: 'text',
          required: true,
          label: 'Location',
        },
      ],
    },
  ],
}
