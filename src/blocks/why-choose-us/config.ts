// src/blocks/why-choose-us/config.ts
import type { Block } from 'payload'

export const WhyChooseUs: Block = {
  slug: 'whyChooseUs',
  interfaceName: 'WhyChooseUsBlock',
  labels: {
    singular: { en: 'Why Choose Us', cs: 'Proč si vybrat nás' },
    plural: { en: 'Why Choose Us Sections', cs: 'Sekce proč si vybrat nás' },
  },
  fields: [
    {
      name: 'badgeText',
      type: 'text',
      required: true,
      label: { en: 'Badge Text', cs: 'Text odznaku' },
    },
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
      name: 'features',
      type: 'array',
      label: { en: 'Features', cs: 'Vlastnosti' },
      minRows: 1,
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
          type: 'select',
          required: true,
          label: { en: 'Icon', cs: 'Ikona' },
          options: [
            { label: { en: 'Star', cs: 'Hvězda' }, value: 'Star' },
            { label: { en: 'Clock', cs: 'Hodiny' }, value: 'Clock' },
            { label: { en: 'Settings', cs: 'Nastavení' }, value: 'Settings' },
            { label: { en: 'Cpu', cs: 'Procesor' }, value: 'Cpu' },
            { label: { en: 'PiggyBank', cs: 'Pokladnička' }, value: 'PiggyBank' },
            { label: { en: 'Users', cs: 'Uživatelé' }, value: 'Users' },
            { label: { en: 'Award', cs: 'Ocenění' }, value: 'Award' },
          ],
        },
      ],
    },
  ],
}
