// collections/Header.ts
import type { GlobalConfig } from 'payload'
import { link } from '@/fields/link'
import { revalidateHeader } from './hooks/revalidateHeader'

export const Header: GlobalConfig = {
  slug: 'header',
  label: 'Header',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'topBar',
      type: 'group',
      label: 'Top Bar',
      fields: [
        {
          name: 'phone',
          type: 'text',
          label: 'Phone Number',
          required: true,
        },
        {
          name: 'email',
          type: 'text',
          label: 'Email address',
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
      label: 'Navigation Items',
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
