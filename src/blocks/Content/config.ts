// src/blocks/Content/config.ts
import type { Block, Field } from 'payload'
import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { link } from '@/fields/link'

const columnFields: Field[] = [
  {
    name: 'size',
    type: 'select',
    defaultValue: 'oneThird',
    options: [
      { label: { en: 'One Third', cs: 'Jedna třetina' }, value: 'oneThird' },
      { label: { en: 'Half', cs: 'Polovina' }, value: 'half' },
      { label: { en: 'Two Thirds', cs: 'Dvě třetiny' }, value: 'twoThirds' },
      { label: { en: 'Full', cs: 'Plná' }, value: 'full' },
    ],
  },
  {
    name: 'richText',
    type: 'richText',
    editor: lexicalEditor({
      features: ({ rootFeatures }) => [
        ...rootFeatures,
        HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
        FixedToolbarFeature(),
        InlineToolbarFeature(),
      ],
    }),
    label: false,
  },
  {
    name: 'enableLink',
    type: 'checkbox',
    label: { en: 'Enable Link', cs: 'Povolit odkaz' },
  },
  link({
    overrides: {
      admin: { condition: (_, { enableLink }) => Boolean(enableLink) },
    },
  }),
]

export const Content: Block = {
  slug: 'content',
  interfaceName: 'ContentBlock',
  labels: {
    singular: { en: 'Content', cs: 'Obsah' },
    plural: { en: 'Content Blocks', cs: 'Obsahové bloky' },
  },
  fields: [
    {
      name: 'columns',
      type: 'array',
      admin: { initCollapsed: true },
      label: { en: 'Columns', cs: 'Sloupce' },
      fields: columnFields,
    },
  ],
}
