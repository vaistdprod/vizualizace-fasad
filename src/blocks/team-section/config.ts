// src/blocks/team-section/config.ts
import type { Block } from 'payload'

export const TeamSection: Block = {
  slug: 'teamSection',
  interfaceName: 'TeamSectionBlock',
  labels: {
    singular: { en: 'Team Section', cs: 'Sekce týmu' },
    plural: { en: 'Team Sections', cs: 'Sekce týmů' },
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: { en: 'Title', cs: 'Název' },
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      label: { en: 'Description', cs: 'Popis' },
    },
    {
      name: 'team',
      type: 'array',
      label: { en: 'Team Members', cs: 'Členové týmu' },
      minRows: 1,
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
          label: { en: 'Name', cs: 'Jméno' },
        },
        {
          name: 'role',
          type: 'text',
          required: true,
          label: { en: 'Role', cs: 'Role' },
        },
        {
          name: 'email',
          type: 'text',
          required: true,
          label: { en: 'Email', cs: 'E-mail' },
        },
        {
          name: 'phone',
          type: 'text',
          required: true,
          label: { en: 'Phone', cs: 'Telefon' },
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: false,
          label: { en: 'Image', cs: 'Obrázek' },
        },
      ],
    },
  ],
}
