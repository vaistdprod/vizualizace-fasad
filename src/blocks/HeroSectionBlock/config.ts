import type { Block } from 'payload'

export const HeroSection: Block = {
  slug: 'heroSection',
  interfaceName: 'HeroSectionBlock',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Title',
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      label: 'Description',
    },
    {
      name: 'primaryButtonText',
      type: 'text',
      label: 'Primary Button Text',
    },
    {
      name: 'primaryButtonLink',
      type: 'text',
      label: 'Primary Button Link',
    },
    {
      name: 'secondaryButtonText',
      type: 'text',
      label: 'Secondary Button Text',
    },
    {
      name: 'secondaryButtonLink',
      type: 'text',
      label: 'Secondary Button Link',
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Hero Image',
    },
  ],
  labels: {
    plural: 'Hero Sections',
    singular: 'Hero Section',
  },
}
