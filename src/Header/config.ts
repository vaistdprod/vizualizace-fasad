// collections/Header.ts
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
      name: 'topBar',
      type: 'group',
      label: 'Horní lišta',
      fields: [
        {
          name: 'phone',
          type: 'text',
          label: 'Telefonní číslo',
          required: true,
        },
        {
          name: 'email',
          type: 'text',
          label: 'E-mail',
          required: true,
        },
      ],
    },
    {
      name: 'logoSvg',
      type: 'code',
      label: 'Logo SVG Code',
      admin: {
        language: 'html', // Sets the editor to HTML mode for SVG
      },
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
