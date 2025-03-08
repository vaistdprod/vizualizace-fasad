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
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      label: 'Logo',
      required: false,
    },
    {
      name: 'title', // New dynamic title field
      type: 'text',
      label: 'Název',
      required: true, // Make it required since it’s a key part of the footer
      defaultValue: 'Ordinace praktického lékaře pro děti a dorost | MUDr. Janulová', // Default for convenience
    },
    {
      name: 'description',
      type: 'text',
      label: 'Popis',
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
        components: {
          RowLabel: '@/Footer/RowLabel#RowLabel',
        },
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
