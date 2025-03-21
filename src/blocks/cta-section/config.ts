// src/blocks/cta-section/config.ts
import type { Block } from 'payload'

export const CTASection: Block = {
  slug: 'ctaSection',
  interfaceName: 'CTASectionBlock',
  labels: {
    singular: { en: 'CTA Section', cs: 'Sekce CTA' },
    plural: { en: 'CTA Sections', cs: 'Sekce CTA' },
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: { en: 'Title', cs: 'Název' },
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      label: { en: 'Description', cs: 'Popis' },
    },
    {
      name: 'buttonText',
      type: 'text',
      required: true,
      label: { en: 'Button Text', cs: 'Text tlačítka' },
    },
    {
      name: 'buttonHref',
      type: 'text',
      required: false,
      label: { en: 'Button Link', cs: 'Odkaz tlačítka' },
      admin: {
        description: { en: 'URL for the button', cs: 'URL pro tlačítko' },
      },
    },
    {
      name: 'buttonVariant',
      type: 'select',
      label: { en: 'Button Variant', cs: 'Varianta tlačítka' },
      defaultValue: 'default',
      options: [
        { label: { en: 'Default', cs: 'Výchozí' }, value: 'default' },
        { label: { en: 'Outline', cs: 'Obrys' }, value: 'outline' },
      ],
    },
  ],
}
