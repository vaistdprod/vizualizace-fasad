// src/collections/Header/config.ts
import type { GlobalConfig } from 'payload'
import { link } from '@/fields/link'
import { revalidateHeader } from './hooks/revalidateHeader'

export const Header: GlobalConfig = {
  slug: 'header',
  label: { en: 'Header', cs: 'Hlavička' },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'topBar',
      type: 'group',
      label: { en: 'Top Bar', cs: 'Horní lišta' },
      fields: [
        {
          name: 'phone',
          type: 'text',
          label: { en: 'Phone Number', cs: 'Telefonní číslo' },
          required: true,
        },
        {
          name: 'email',
          type: 'text',
          label: { en: 'Email Address', cs: 'E-mailová adresa' },
          required: true,
        },
      ],
    },
    {
      name: 'logoSvg',
      type: 'code',
      label: { en: 'Logo SVG Code', cs: 'SVG kód loga' },
      admin: {
        language: 'html', // Sets the editor to HTML mode for SVG
      },
    },
    {
      name: 'navItems',
      type: 'array',
      label: { en: 'Navigation Items', cs: 'Navigační položky' },
      fields: [
        link({
          appearances: false,
          overrides: {
            label: { en: 'Navigation Link', cs: 'Navigační odkaz' },
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
              {
                name: 'label',
                type: 'text',
                label: { en: 'Label', cs: 'Popisek' },
                required: true,
              },
            ],
          },
        }),
      ],
      maxRows: 6,
      admin: {
        initCollapsed: true,
      },
    },
  ],
  hooks: {
    afterChange: [revalidateHeader],
  },
}
