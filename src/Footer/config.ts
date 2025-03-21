// src/Footer/config.ts
import type { GlobalConfig } from 'payload'
import { revalidateFooter } from './hooks/revalidateFooter'

export const Footer: GlobalConfig = {
  slug: 'footer',
  label: { en: 'Footer', cs: 'Patička' },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'logoSvg',
      type: 'code',
      label: { en: 'Logo SVG Code', cs: 'SVG kód loga' },
      admin: {
        language: 'html', // Sets the editor to HTML mode for SVG
      },
    },
    {
      name: 'companyInfo',
      type: 'array',
      label: { en: 'Company Information', cs: 'Informace o společnosti' },
      fields: [
        {
          name: 'icon',
          type: 'select',
          label: { en: 'Icon', cs: 'Ikona' },
          options: [
            { label: { en: 'Building', cs: 'Budova' }, value: 'Building2' },
            { label: { en: 'Map Pin', cs: 'Mapa' }, value: 'MapPin' },
            { label: { en: 'Phone', cs: 'Telefon' }, value: 'Phone' },
            { label: { en: 'Mail', cs: 'E-mail' }, value: 'Mail' },
            { label: { en: 'Clock', cs: 'Hodiny' }, value: 'Clock' },
            { label: { en: 'Briefcase', cs: 'Kufřík' }, value: 'Briefcase' },
          ],
          required: true,
        },
        {
          name: 'text',
          type: 'text',
          label: { en: 'Text', cs: 'Text' },
          required: true,
        },
      ],
    },
    {
      name: 'footerColumns',
      type: 'array',
      label: { en: 'Footer Columns', cs: 'Sloupce patičky' },
      maxRows: 2,
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          label: { en: 'Title', cs: 'Název' },
        },
        {
          name: 'links',
          type: 'array',
          label: { en: 'Links', cs: 'Odkazy' },
          fields: [
            {
              name: 'label',
              type: 'text',
              required: true,
              label: { en: 'Text', cs: 'Text' },
            },
            {
              name: 'url',
              type: 'text',
              required: false,
              label: { en: 'URL', cs: 'URL' },
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
