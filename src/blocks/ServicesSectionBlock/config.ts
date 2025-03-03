import type { Block } from 'payload'

export const ServicesSection: Block = {
  slug: 'servicesSection',
  interfaceName: 'ServicesSectionBlock',
  labels: {
    singular: 'Sekce služeb',
    plural: 'Sekce služeb',
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
      name: 'services',
      type: 'array',
      label: 'Služby',
      minRows: 1,
      fields: [
        {
          name: 'icon',
          type: 'select',
          label: 'Ikona',
          options: [
            { label: 'Stetoskop', value: 'Stethoscope' },
            { label: 'Injekce', value: 'Syringe' },
            { label: 'Hvězda', value: 'Star' },
            { label: 'Srdce', value: 'Heart' },
            { label: 'Tep srdce', value: 'HeartPulse' },
            { label: 'Aktivita', value: 'Activity' },
            { label: 'Obvaz', value: 'Bandage' },
            { label: 'Zpráva', value: 'MessageCircle' },
            { label: 'Mikroskop', value: 'Microscope' },
          ],
          defaultValue: 'Star',
        },
        {
          name: 'title',
          type: 'text',
          required: true,
          label: 'Název',
        },
        {
          name: 'shortDescription',
          type: 'textarea',
          label: 'Krátký popis',
        },
      ],
    },
  ],
}
