// src/blocks/about-services/config.ts
import type { Block } from 'payload'

export const AboutServices: Block = {
  slug: 'aboutServices',
  interfaceName: 'AboutServicesBlock',
  labels: {
    singular: { en: 'About Services', cs: 'O službách' },
    plural: { en: 'About Services Sections', cs: 'Sekce o službách' },
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: { en: 'Title', cs: 'Název' },
    },
    {
      name: 'badgeText',
      type: 'text',
      required: false,
      label: { en: 'Badge Text', cs: 'Text odznaku' },
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      label: { en: 'Description', cs: 'Popis' },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: { en: 'Image', cs: 'Obrázek' },
    },
    {
      name: 'features',
      type: 'array',
      label: { en: 'Service Features', cs: 'Vlastnosti služby' },
      minRows: 0,
      maxRows: 4,
      labels: {
        singular: { en: 'Feature', cs: 'Vlastnost' },
        plural: { en: 'Features', cs: 'Vlastnosti' },
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          label: { en: 'Feature Title', cs: 'Název vlastnosti' },
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
          label: { en: 'Feature Description', cs: 'Popis vlastnosti' },
        },
        {
          name: 'icon',
          type: 'text',
          required: false,
          label: { en: 'Icon Name (optional)', cs: 'Název ikony (volitelné)' },
          admin: {
            description: {
              en: 'Enter an icon name from Lucide Icons (e.g., "check", "star", "shield")',
              cs: 'Zadejte název ikony z Lucide Icons (např. "check", "star", "shield")',
            },
          },
        },
      ],
    },
    {
      name: 'cta',
      type: 'group',
      label: { en: 'Call to Action', cs: 'Výzva k akci' },
      fields: [
        {
          name: 'enabled',
          type: 'checkbox',
          label: { en: 'Enable CTA Button', cs: 'Povolit tlačítko CTA' },
          defaultValue: false,
        },
        {
          name: 'text',
          type: 'text',
          required: false,
          label: { en: 'Button Text', cs: 'Text tlačítka' },
          admin: { condition: (_, siblingData) => siblingData?.enabled },
        },
        {
          name: 'link',
          type: 'text',
          required: false,
          label: { en: 'Button Link', cs: 'Odkaz tlačítka' },
          admin: { condition: (_, siblingData) => siblingData?.enabled },
        },
      ],
    },
    {
      name: 'layout',
      type: 'select',
      required: true,
      label: { en: 'Layout Style', cs: 'Styl rozložení' },
      options: [
        {
          label: { en: 'Image on Left', cs: 'Obrázek vlevo' },
          value: 'imageLeft',
        },
        {
          label: { en: 'Image on Right', cs: 'Obrázek vpravo' },
          value: 'imageRight',
        },
      ],
    },
  ],
}
