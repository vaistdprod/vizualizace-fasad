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
      name: 'logoSvg',
      type: 'code',
      label: 'Logo SVG Code',
      admin: {
        language: 'html', // Sets the editor to HTML mode for SVG
      },
    },
    {
      name: 'companyInfo',
      type: 'array',
      label: 'Informace o společnosti',
      fields: [
        {
          name: 'icon',
          type: 'select',
          label: 'Ikona',
          options: [
            { label: 'Building2', value: 'Building2' },
            { label: 'MapPin', value: 'MapPin' },
            { label: 'Phone', value: 'Phone' },
            { label: 'Mail', value: 'Mail' },
            { label: 'Clock', value: 'Clock' },
            { label: 'Briefcase', value: 'Briefcase' },
          ],
          required: true,
        },
        {
          name: 'text',
          type: 'text',
          label: 'Text',
          required: true,
        },
      ],
    },
    {
      name: 'footerColumns',
      type: 'array',
      label: 'Sloupce patičky',
      maxRows: 2,
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
              required: false,
              label: 'URL',
            },
          ],
        },
      ],
      admin: {
        initCollapsed: true,
      },
    },
  ],
  hooks: {
    afterChange: [revalidateFooter],
  },
}
