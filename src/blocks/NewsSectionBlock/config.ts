import type { Block } from 'payload'

export const NewsSection: Block = {
  slug: 'newsSection',
  interfaceName: 'NewsSectionBlock',
  labels: {
    singular: 'Sekce novinek',
    plural: 'Sekce novinek',
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
      name: 'aktuality',
      type: 'relationship',
      relationTo: 'aktuality',
      hasMany: true,
      label: 'Články',
      admin: {
        description: 'Vyberte články, které se zobrazí v sekci novinek.',
      },
      maxDepth: 3, // Ensure full Aktualita objects are populated
    },
  ],
}
