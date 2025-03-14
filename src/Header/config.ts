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
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      label: 'Logo',
      required: false, // Optional: Make it required if you want
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
