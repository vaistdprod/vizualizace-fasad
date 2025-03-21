// src/fields/link.ts
import type { Field, GroupField } from 'payload'
import deepMerge from '@/utilities/deepMerge'

export type LinkAppearances = 'default' | 'outline'

export const appearanceOptions: Record<
  LinkAppearances,
  { label: Record<string, string>; value: string }
> = {
  default: {
    label: { en: 'Default', cs: 'Výchozí' },
    value: 'default',
  },
  outline: {
    label: { en: 'Outline', cs: 'Obrys' },
    value: 'outline',
  },
}

type LinkType = (options?: {
  appearances?: LinkAppearances[] | false
  disableLabel?: boolean
  overrides?: Partial<GroupField>
}) => Field

export const link: LinkType = ({ appearances, disableLabel = false, overrides = {} } = {}) => {
  const linkResult: GroupField = {
    name: 'link',
    type: 'group',
    label: { en: 'Link', cs: 'Odkaz' },
    admin: {
      hideGutter: true,
    },
    fields: [
      {
        type: 'row',
        fields: [
          {
            name: 'type',
            type: 'radio',
            admin: {
              layout: 'horizontal',
              width: '50%',
            },
            defaultValue: 'reference',
            options: [
              { label: { en: 'Internal Link', cs: 'Interní odkaz' }, value: 'reference' },
              { label: { en: 'Custom URL', cs: 'Vlastní URL' }, value: 'custom' },
            ],
            label: { en: 'Link Type', cs: 'Typ odkazu' },
          },
          {
            name: 'newTab',
            type: 'checkbox',
            admin: {
              style: { alignSelf: 'flex-end' },
              width: '50%',
            },
            label: { en: 'Open in New Tab', cs: 'Otevřít v nové záložce' },
          },
        ],
      },
    ],
  }

  const linkTypes: Field[] = [
    {
      name: 'reference',
      type: 'relationship',
      admin: {
        condition: (_, siblingData) => siblingData?.type === 'reference',
      },
      label: { en: 'Document to Link To', cs: 'Dokument k propojení' },
      relationTo: ['pages'],
      required: true,
    },
    {
      name: 'url',
      type: 'text',
      admin: {
        condition: (_, siblingData) => siblingData?.type === 'custom',
      },
      label: { en: 'Custom URL', cs: 'Vlastní URL' },
      required: true,
    },
  ]

  if (!disableLabel) {
    linkTypes.map((linkType) => ({
      ...linkType,
      admin: {
        ...linkType.admin,
        width: '50%',
      },
    }))

    linkResult.fields.push({
      type: 'row',
      fields: [
        ...linkTypes,
        {
          name: 'label',
          type: 'text',
          admin: { width: '50%' },
          label: { en: 'Label', cs: 'Popisek' },
          required: true,
        },
      ],
    })
  } else {
    linkResult.fields = [...linkResult.fields, ...linkTypes]
  }

  if (appearances !== false) {
    let appearanceOptionsToUse = [appearanceOptions.default, appearanceOptions.outline]
    if (appearances) {
      appearanceOptionsToUse = appearances.map((appearance) => appearanceOptions[appearance])
    }

    linkResult.fields.push({
      name: 'appearance',
      type: 'select',
      admin: {
        description: {
          en: 'Choose how the link should be rendered.',
          cs: 'Vyberte, jak má být odkaz zobrazen.',
        },
      },
      defaultValue: 'default',
      options: appearanceOptionsToUse,
      label: { en: 'Appearance', cs: 'Vzhled' },
    })
  }

  return deepMerge(linkResult, overrides)
}
