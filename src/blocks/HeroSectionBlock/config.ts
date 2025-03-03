import type { Block } from 'payload'

export const HeroSection: Block = {
  slug: 'heroSection',
  interfaceName: 'HeroSectionBlock',
  labels: {
    singular: 'Úvodní sekce',
    plural: 'Úvodní sekce',
  },
  fields: [
    {
      name: 'title',
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
      name: 'primaryButtonText',
      type: 'text',
      label: 'Text hlavního tlačítka',
    },
    {
      name: 'primaryButtonLink',
      type: 'text',
      label: 'Odkaz hlavního tlačítka',
    },
    {
      name: 'secondaryButtonText',
      type: 'text',
      label: 'Text vedlejšího tlačítka',
    },
    {
      name: 'secondaryButtonLink',
      type: 'text',
      label: 'Odkaz vedlejšího tlačítka',
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Obrázek',
      maxDepth: 1, // Ensure the full Media object is populated
    },
  ],
}
