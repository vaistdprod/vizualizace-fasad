// src/Footer/config.ts
import type { GlobalConfig } from 'payload'
import { revalidateFooter } from './hooks/revalidateFooter'

export const Footer: GlobalConfig = {
  slug: 'footer',
  label: 'Patička',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'description',
      type: 'text',
      label: 'Popis',
    },
    {
      name: 'socialLinks',
      type: 'array',
      label: 'Sociální sítě',
      fields: [
        {
          name: 'platform',
          type: 'text',
          required: true,
          label: 'Platforma',
        },
        {
          name: 'url',
          type: 'text',
          required: true,
          label: 'URL',
        },
      ],
      admin: {
        initCollapsed: true,
      },
    },
    {
      name: 'footerColumns',
      type: 'array',
      label: 'Sloupce patičky',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          label: 'Název',
        },
        {
          name: 'links',
          type: 'array',
          label: 'Odkazy',
          fields: [
            {
              name: 'label',
              type: 'text',
              required: true,
              label: 'Text',
            },
            {
              name: 'url',
              type: 'text',
              required: true,
              label: 'URL',
            },
          ],
        },
      ],
      admin: {
        initCollapsed: true,
      },
    },
    {
      name: 'copyrightText',
      type: 'text',
      required: true,
      label: 'Text autorských práv',
    },
  ],
  hooks: {
    afterChange: [revalidateFooter],
  },
}
