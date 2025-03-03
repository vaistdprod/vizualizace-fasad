import type { Block } from 'payload'

export const AppointmentSection: Block = {
  slug: 'appointmentSection',
  interfaceName: 'AppointmentSectionBlock',
  labels: {
    singular: 'Sekce objednání',
    plural: 'Sekce objednání',
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
      name: 'appointmentTypes',
      type: 'array',
      label: 'Typy návštěv',
      minRows: 1,
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          label: 'Název',
        },
        {
          name: 'duration',
          type: 'text',
          required: true,
          label: 'Délka trvání',
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
          label: 'Popis',
        },
        {
          name: 'buttonText',
          type: 'text',
          required: true,
          label: 'Text tlačítka',
        },
      ],
    },
    {
      name: 'imageSection',
      type: 'group',
      label: 'Sekce s obrázkem',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
          label: 'Obrázek',
        },
        {
          name: 'title',
          type: 'text',
          label: 'Název',
          defaultValue: 'Naše ordinace',
        },
        {
          name: 'description',
          type: 'text',
          label: 'Popis',
          defaultValue: 'Příjemné prostředí pro děti i rodiče',
        },
      ],
    },
    {
      name: 'contactPrompt',
      type: 'text',
      label: 'Text pro kontakt',
    },
    {
      name: 'contactLinkText',
      type: 'text',
      label: 'Text odkazu na kontakt',
    },
  ],
}
