import type { Block } from 'payload'

export const InsuranceSection: Block = {
  slug: 'insuranceSection',
  interfaceName: 'InsuranceSectionBlock',
  labels: {
    singular: 'Sekce pojišťoven',
    plural: 'Sekce pojišťoven',
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
      name: 'partners',
      type: 'array',
      label: 'Pojišťovny',
      minRows: 1,
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          label: 'Název pojišťovny',
        },
        {
          name: 'logo',
          type: 'upload',
          relationTo: 'media',
          required: true,
          label: 'Logo pojišťovny',
          maxDepth: 1, // Ensure full Media objects are populated
        },
        {
          name: 'url',
          type: 'text',
          required: true,
          label: 'Web pojišťovny',
          admin: {
            description: 'Zadejte URL webové stránky pojišťovny (např. https://www.vzp.cz).',
          },
        },
      ],
    },
    {
      name: 'contactPrompt',
      type: 'text',
      label: 'Text pro kontakt',
      defaultValue: 'Nevidíte zde svou pojišťovnu? Napište nám pro více informací.',
    },
  ],
}
