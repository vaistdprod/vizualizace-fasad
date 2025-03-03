import type { Block } from 'payload'

export const HoursSection: Block = {
  slug: 'hoursSection',
  interfaceName: 'HoursSectionBlock',
  labels: {
    singular: 'Ordinační hodiny',
    plural: 'Ordinační hodiny',
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
      name: 'hours',
      type: 'array',
      label: 'Ordinační hodiny',
      minRows: 1,
      fields: [
        {
          name: 'day',
          type: 'text',
          required: true,
          label: 'Den',
        },
        {
          name: 'hours',
          type: 'textarea',
          required: true,
          label: 'Hodiny',
          admin: {
            description:
              'Zadejte hodiny, použijte nové řádky pro více záznamů (např. "8:00-12:00 (Poznámka)" pro dodatečné informace).',
          },
        },
      ],
    },
    {
      name: 'bloodDrawInfo',
      type: 'text',
      label: 'Informace o odběrech krve',
    },
    {
      name: 'emergencyContactInfo',
      type: 'text',
      label: 'Informace o pohotovosti',
    },
    {
      name: 'emergencyPhone',
      type: 'text',
      label: 'Telefonní číslo na pohotovost',
    },
  ],
}
