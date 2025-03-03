import type { Block } from 'payload'

export const TeamSection: Block = {
  slug: 'teamSection',
  interfaceName: 'TeamSectionBlock',
  labels: {
    singular: 'Sekce týmu',
    plural: 'Sekce týmu',
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
      name: 'teamMembers',
      type: 'array',
      label: 'Členové týmu',
      minRows: 1,
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          label: 'Jméno',
        },
        {
          name: 'role',
          type: 'text',
          required: true,
          label: 'Pozice',
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Popis',
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
          label: 'Fotografie',
        },
      ],
    },
  ],
}
