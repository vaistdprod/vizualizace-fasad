// blocks/contact-section/config.ts
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
    singular: 'Contact Section',
    plural: 'Contact Sections',
  },
  fields: [
    {
      name: 'preHeading',
      type: 'text',
      label: 'Pre-Heading',
    },
    {
      name: 'heading',
      type: 'text',
      label: 'Section Heading',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description',
    },
    {
      name: 'contactTitle',
      type: 'text',
      label: 'Contact Info Title',
      defaultValue: 'Kontaktní informace',
    },
    {
      name: 'contactItems',
      type: 'array',
      label: 'Contact Items',
      minRows: 1,
      fields: [
        {
          name: 'icon',
          type: 'select',
          required: true,
          label: 'Icon',
          options: [
            { label: 'Mail', value: 'Mail' },
            { label: 'Phone', value: 'Phone' },
            { label: 'MapPin', value: 'MapPin' },
            { label: 'Clock', value: 'Clock' },
            { label: 'Building', value: 'Building' },
          ],
        },
        {
          name: 'label',
          type: 'text',
          required: true,
          label: 'Label',
        },
        {
          name: 'value',
          type: 'text',
          required: true,
          label: 'Value',
        },
      ],
    },
    {
      name: 'form',
      type: 'relationship',
      relationTo: 'forms',
      required: true,
      label: 'Formulář',
      // Removed admin: { depth: 1 } as it's not valid here
    },
    {
      name: 'enableIntro',
      type: 'checkbox',
      label: 'Povolit úvodní obsah formuláře',
    },
    {
      name: 'introContent',
      type: 'richText',
      admin: {
        condition: (_, { enableIntro }) => Boolean(enableIntro),
      },
      editor: lexicalEditor({
        features: ({ rootFeatures }) => [
          ...rootFeatures,
          HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
          FixedToolbarFeature(),
          InlineToolbarFeature(),
        ],
      }),
      label: 'Úvodní obsah formuláře',
    },
  ],
}
