import type { Block } from 'payload'

export const LandingHero: Block = {
  slug: 'landingHero',
  interfaceName: 'LandingHeroBlock',
  labels: {
    singular: 'Landing Hero',
    plural: 'Landing Hero Sections',
  },
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
      required: true,
      label: 'Primary Button Text',
    },
    {
      name: 'secondaryButtonText',
      type: 'text',
      required: true,
      label: 'Secondary Button Text',
    },
    {
      name: 'backgroundImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Background Image',
    },
  ],
}
