import type { Block } from 'payload'

export const ContactSection: Block = {
  slug: 'contactSection',
  interfaceName: 'ContactSectionBlock',
  labels: {
    singular: 'Kontaktní sekce',
    plural: 'Kontaktní sekce',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      label: 'Nadpis',
      defaultValue: 'Kontaktujte nás',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Popis',
      defaultValue: 'Jsme tu pro vás',
    },
    {
      name: 'form',
      type: 'relationship',
      relationTo: 'forms',
      required: true,
      label: 'Kontaktní formulář',
      admin: {
        description: 'Vyberte formulář s poli: Jméno, E-mail, Telefon a Zpráva.',
      },
      maxDepth: 1,
    },
    {
      name: 'contactMethods',
      type: 'array',
      label: 'Kontaktní metody',
      minRows: 1,
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
          label: 'Název metody',
          admin: {
            description: 'Např. "Adresa", "Telefon", "E-mail", "Ordinační hodiny"',
          },
        },
        {
          name: 'value',
          type: 'text',
          required: true,
          label: 'Hodnota',
          admin: {
            description: 'Např. adresa, telefonní číslo, e-mail nebo shrnutí hodin.',
          },
        },
        {
          name: 'href',
          type: 'text',
          label: 'Odkaz',
          admin: {
            description: 'Např. "https://maps.google.com/?q=...", "tel:...", "#ordinacni-hodiny"',
          },
        },
        {
          name: 'icon',
          type: 'select',
          label: 'Ikona',
          required: true,
          options: [
            { label: 'Map Pin', value: 'MapPin' },
            { label: 'Phone', value: 'Phone' },
            { label: 'Mail', value: 'Mail' },
            { label: 'Clock', value: 'Clock' },
            // Add more icons as needed
          ],
          defaultValue: 'MapPin',
        },
        {
          name: 'colorClass',
          type: 'text',
          label: 'Třída barev (CSS)',
          admin: {
            description: 'Např. "bg-pink-100 text-pink-600" pro stylizaci.',
          },
        },
      ],
    },
    {
      name: 'mapEmbedUrl',
      type: 'text',
      label: 'URL vložené mapy',
      admin: {
        description: 'Vložte URL Google Maps pro vaši lokaci.',
      },
    },
    {
      name: 'navigationButtonText',
      type: 'text',
      label: 'Text navigačního tlačítka',
      defaultValue: 'Navigovat',
    },
    {
      name: 'transportMethods',
      type: 'array',
      label: 'Způsoby dopravy',
      minRows: 1,
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          label: 'Název',
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
          label: 'Popis',
        },
        {
          name: 'icon',
          type: 'text',
          required: true,
          label: 'Ikona (emoji nebo kód)',
          admin: {
            description: 'Např. 🚌, 🚗, ♿ nebo kód SVG ikony.',
          },
        },
      ],
    },
  ],
}
