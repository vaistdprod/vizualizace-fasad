import type { GlobalConfig } from 'payload'
import { link } from '@/fields/link'
import { revalidateHeader } from './hooks/revalidateHeader'

export const Header: GlobalConfig = {
  slug: 'header',
  label: 'Hlavička',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media', // Assumes you have a 'media' collection for images
      label: 'Logo',
      required: true,
    },
    {
      name: 'navItems',
      type: 'array',
      label: 'Položky navigace',
      fields: [
        link({
          appearances: false,
        }),
      ],
      maxRows: 9,
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: '@/Header/RowLabel#RowLabel',
        },
      },
    },
    {
      name: 'button',
      type: 'group',
      label: 'Tlačítko',
      fields: [
        {
          name: 'type',
          type: 'select',
          options: [
            { label: 'Vlastní', value: 'custom' },
            { label: 'Odkaz na stránku', value: 'reference' },
          ],
          defaultValue: 'custom',
          label: 'Typ',
        },
        {
          name: 'label',
          type: 'text',
          required: true,
          label: 'Text',
        },
        {
          name: 'url',
          type: 'text',
          label: 'URL',
          admin: {
            condition: (_, siblingData) => siblingData.type === 'custom',
          },
        },
        {
          name: 'reference',
          type: 'relationship',
          relationTo: 'pages',
          label: 'Odkaz na stránku',
          admin: {
            condition: (_, siblingData) => siblingData.type === 'reference',
          },
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateHeader],
  },
}
