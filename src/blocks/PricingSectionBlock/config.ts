import type { Block } from 'payload'

export const PricingSectionBlock: Block = {
  slug: 'pricingSection', // Update slug to match the naming convention
  interfaceName: 'PricingSectionBlock',
  labels: {
    singular: 'Ceník',
    plural: 'Ceníky',
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
      name: 'pricingItems',
      type: 'array',
      label: 'Položky ceníku',
      minRows: 1,
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          label: 'Název služby',
        },
        {
          name: 'price',
          type: 'text',
          required: true,
          label: 'Cena',
        },
      ],
    },
    {
      name: 'contactPrompt',
      type: 'text',
      label: 'Text pro kontakt',
      defaultValue: 'Máte dotazy k ceníku? Kontaktujte nás.',
    },
  ],
}
