// src/blocks/contact-section/config.ts
import type { Block } from 'payload'
import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

export const ContactSection: Block = {
  slug: 'contactSection',
  interfaceName: 'ContactSectionBlock',
  labels: {
    singular: { en: 'Contact Section', cs: 'Kontaktní sekce' },
    plural: { en: 'Contact Sections', cs: 'Kontaktní sekce' },
  },
  fields: [
    {
      name: 'badgeText',
      type: 'text',
      label: { en: 'Badge Text', cs: 'Text odznaku' },
    },
    {
      name: 'heading',
      type: 'text',
      label: { en: 'Section Heading', cs: 'Nadpis sekce' },
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      label: { en: 'Description', cs: 'Popis' },
    },
    {
      name: 'contactTitle',
      type: 'text',
      label: { en: 'Contact Info Title', cs: 'Název kontaktních informací' },
    },
    {
      name: 'enableContactContent',
      type: 'checkbox',
      label: { en: 'Enable Contact Content', cs: 'Povolit kontaktní obsah' },
      defaultValue: false,
    },
    {
      name: 'contactContent',
      type: 'textarea',
      label: { en: 'Contact Content', cs: 'Kontaktní obsah' },
      admin: { condition: (_, { enableContactContent }) => Boolean(enableContactContent) },
    },
    {
      name: 'contactItems',
      type: 'array',
      label: { en: 'Contact Items', cs: 'Kontaktní položky' },
      minRows: 1,
      fields: [
        {
          name: 'icon',
          type: 'select',
          required: true,
          label: { en: 'Icon', cs: 'Ikona' },
          options: [
            { label: { en: 'Mail', cs: 'E-mail' }, value: 'Mail' },
            { label: { en: 'Phone', cs: 'Telefon' }, value: 'Phone' },
            { label: { en: 'MapPin', cs: 'Poloha' }, value: 'MapPin' },
            { label: { en: 'Clock', cs: 'Hodiny' }, value: 'Clock' },
            { label: { en: 'Building', cs: 'Budova' }, value: 'Building' },
          ],
        },
        {
          name: 'label',
          type: 'text',
          required: true,
          label: { en: 'Label', cs: 'Popisek' },
        },
        {
          name: 'value',
          type: 'text',
          required: true,
          label: { en: 'Value', cs: 'Hodnota' },
        },
      ],
    },
    {
      name: 'form',
      type: 'relationship',
      relationTo: 'forms',
      required: true,
      label: { en: 'Form', cs: 'Formulář' },
    },
    {
      name: 'enableIntro',
      type: 'checkbox',
      label: { en: 'Enable intro form content', cs: 'Povolit úvodní obsah formuláře' },
    },
    {
      name: 'introContent',
      type: 'richText',
      admin: { condition: (_, { enableIntro }) => Boolean(enableIntro) },
      editor: lexicalEditor({
        features: ({ rootFeatures }) => [
          ...rootFeatures,
          HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
          FixedToolbarFeature(),
          InlineToolbarFeature(),
        ],
      }),
      label: { en: 'Form', cs: 'Formulář' },
    },
  ],
}
