import type { GlobalConfig } from 'payload'
import { revalidateFooter } from './hooks/revalidateFooter'

export const Footer: GlobalConfig = {
  slug: 'footer',
  label: 'Footer',
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
      label: 'Company Information',
      fields: [
        {
          name: 'icon',
          type: 'select',
          label: 'Icon',
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
      label: 'Footer Columns',
      maxRows: 2,
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          label: 'Title',
        },
        {
          name: 'links',
          type: 'array',
          label: 'Links',
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
