// src/blocks/landing-hero/config.ts
import type { Block } from 'payload'

export const LandingHero: Block = {
  slug: 'landingHero',
  interfaceName: 'LandingHeroBlock',
  labels: {
    singular: { en: 'Landing Hero', cs: 'Úvodní hero sekce' },
    plural: { en: 'Landing Hero Sections', cs: 'Úvodní hero sekce' },
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
      name: 'primaryButtonText',
      type: 'text',
      required: true,
      label: { en: 'Primary Button Text', cs: 'Text primárního tlačítka' },
    },
    {
      name: 'primaryButtonHref',
      type: 'text',
      required: false,
      label: { en: 'Primary Button Link', cs: 'Odkaz primárního tlačítka' },
      admin: {
        description: { en: 'URL for the primary button', cs: 'URL pro primární tlačítko' },
      },
    },
    {
      name: 'secondaryButtonText',
      type: 'text',
      required: false,
      label: { en: 'Secondary Button Text', cs: 'Text sekundárního tlačítka' },
      admin: {
        description: {
          en: 'Optional secondary button text. If left empty, no secondary button will be displayed.',
          cs: 'Volitelný text sekundárního tlačítka. Pokud zůstane prázdné, sekundární tlačítko se nezobrazí.',
        },
      },
    },
    {
      name: 'secondaryButtonHref',
      type: 'text',
      required: false,
      label: { en: 'Secondary Button Link', cs: 'Odkaz sekundárního tlačítka' },
      admin: {
        description: { en: 'URL for the secondary button', cs: 'URL pro sekundární tlačítko' },
        condition: (_, siblingData) => Boolean(siblingData?.secondaryButtonText),
      },
    },
    {
      name: 'backgroundImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: { en: 'Background Image', cs: 'Obrázek pozadí' },
    },
    {
      name: 'badgeText',
      type: 'text',
      label: { en: 'Badge Text', cs: 'Text odznaku' },
      admin: {
        description: {
          en: 'Text displayed in the badge above the title',
          cs: 'Text zobrazený v odznaku nad názvem',
        },
      },
    },
    {
      name: 'scrollIndicator',
      type: 'group',
      label: { en: 'Scroll Indicator', cs: 'Indikátor posunu' },
      admin: {
        description: {
          en: 'Settings for the scroll indicator at the bottom of the hero section',
          cs: 'Nastavení indikátoru posunu ve spodní části hero sekce',
        },
      },
      fields: [
        {
          name: 'enabled',
          type: 'checkbox',
          label: { en: 'Show Scroll Indicator', cs: 'Zobrazit indikátor posunu' },
        },
        {
          name: 'text',
          type: 'text',
          label: { en: 'Scroll Text', cs: 'Text posunu' },
          admin: {
            condition: (_, siblingData) => siblingData?.enabled,
          },
        },
      ],
    },
  ],
}
