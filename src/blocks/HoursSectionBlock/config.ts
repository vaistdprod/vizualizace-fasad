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
      label: 'Ordinační hodiny (podle dní v týdnu)',
      minRows: 1,
      fields: [
        {
          name: 'day',
          type: 'text',
          required: true,
          label: 'Den',
        },
        {
          name: 'schedules',
          type: 'array',
          label: 'Časové úseky',
          minRows: 1,
          fields: [
            {
              name: 'timeRange',
              type: 'text',
              required: true,
              label: 'Časový úsek (např. 7:30-10:00)',
              admin: {
                description: 'Zadejte časový úsek ve formátu start-konec (např. 7:30-10:00).',
              },
            },
            {
              name: 'note',
              type: 'text',
              required: false,
              label: 'Poznámka (volitelné)',
              admin: {
                description: 'Přidejte volitelnou poznámku (např. "nemocní" nebo "prevence").',
              },
            },
          ],
        },
      ],
    },
    {
      name: 'closedDates',
      type: 'array',
      label: 'Zavřené období (rozmezí datumů)',
      fields: [
        {
          name: 'from',
          type: 'date',
          required: true,
          label: 'Od data',
          admin: {
            description: 'Vyberte počáteční datum uzavření.',
          },
        },
        {
          name: 'to',
          type: 'date',
          required: true,
          label: 'Do data',
          admin: {
            description: 'Vyberte koncové datum uzavření.',
          },
        },
        {
          name: 'note',
          type: 'text',
          required: false,
          label: 'Poznámka (volitelné)',
          admin: {
            description: 'Přidejte důvod uzavření (např. "Dovolená" nebo "Svátek").',
          },
        },
      ],
      admin: {
        description:
          'Zadejte rozmezí datumů, kdy bude ordinace zavřena (např. dovolená nebo svátky).',
      },
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
