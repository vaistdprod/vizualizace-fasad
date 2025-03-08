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
          name: 'icon',
          type: 'select',
          label: 'Ikona',
          options: [
            { label: 'Uživatel', value: 'User' },
            { label: 'Stetoskop', value: 'Stethoscope' },
            { label: 'Tep srdce', value: 'HeartPulse' },
            { label: 'Mikroskop', value: 'Microscope' },
            { label: 'Poznámky', value: 'Clipboard' },
            { label: 'Aktivita', value: 'Activity' },
            { label: 'Teploměr', value: 'Thermometer' },
            { label: 'Dítě', value: 'Baby' },
            { label: 'Lék', value: 'Pill' },
            { label: 'Kniha', value: 'BookOpen' },
            { label: 'Hvězda', value: 'Star' },
            { label: 'Srdce', value: 'Heart' },
            { label: 'Injekce', value: 'Syringe' },
            { label: 'Obvaz', value: 'Bandage' },
            { label: 'Zpráva', value: 'MessageCircle' },
          ],
          defaultValue: 'User',
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Popis',
        },
      ],
    },
  ],
}
