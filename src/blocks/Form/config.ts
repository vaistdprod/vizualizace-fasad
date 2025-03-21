// src/blocks/Form/config.ts
import type { Block } from 'payload'
import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

export const FormBlock: Block = {
  slug: 'formBlock',
  interfaceName: 'FormBlock',
  labels: {
    singular: { en: 'Form', cs: 'Formulář' },
    plural: { en: 'Forms', cs: 'Formuláře' },
  },
  fields: [
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
      label: { en: 'Enable intro content', cs: 'Povolit úvodní obsah' },
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
      label: { en: 'Intro Content', cs: 'Úvodní obsah' },
    },
  ],
}
