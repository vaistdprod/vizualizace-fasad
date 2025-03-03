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
      maxDepth: 1, // Ensure the full Form object is populated
    },
    {
      name: 'address',
      type: 'text',
      required: true,
      label: 'Adresa',
    },
    {
      name: 'phone',
      type: 'text',
      required: true,
      label: 'Telefonní číslo',
    },
    {
      name: 'email',
      type: 'text',
      required: true,
      label: 'E-mail',
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
  ],
}
