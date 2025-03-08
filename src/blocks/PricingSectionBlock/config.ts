import type { Block } from 'payload'

export const PricingSectionBlock: Block = {
  slug: 'pricingSection',
  interfaceName: 'PricingSectionBlock',
  labels: { singular: 'Ceník', plural: 'Ceníky' },
  fields: [
    { name: 'heading', type: 'text', required: true, label: 'Nadpis' },
    { name: 'description', type: 'textarea', required: true, label: 'Popis' },
    {
      name: 'pricingItems',
      type: 'array',
      label: 'Položky ceníku',
      minRows: 1,
      fields: [
        { name: 'title', type: 'text', required: true, label: 'Název služby' },
        { name: 'description', type: 'text', required: true, label: 'Popis služby' },
        { name: 'price', type: 'text', required: true, label: 'Cena' },
      ],
    },
    {
      name: 'contactPrompt',
      type: 'text',
      label: 'Text pro kontakt',
      defaultValue: 'Máte dotazy k ceníku?',
    },
    {
      name: 'tableHeaders',
      type: 'group',
      label: 'Hlavičky tabulky',
      fields: [
        { name: 'service', type: 'text', label: 'Služba', defaultValue: 'Služba' },
        { name: 'description', type: 'text', label: 'Popis', defaultValue: 'Popis' },
        { name: 'price', type: 'text', label: 'Cena', defaultValue: 'Cena' },
      ],
    },
  ],
}
