// src/blocks/pricing-plans/config.ts
import type { Block } from 'payload'

export const PricingPlans: Block = {
  slug: 'pricingPlans',
  interfaceName: 'PricingPlansBlock',
  labels: {
    singular: { en: 'Pricing Table', cs: 'Cenová tabulka' },
    plural: { en: 'Pricing Tables', cs: 'Cenové tabulky' },
  },
  fields: [
    {
      name: 'badgeText',
      type: 'text',
      label: { en: 'Badge Text', cs: 'Text odznaku' },
    },
    {
      name: 'heading',
      type: 'text',
      label: { en: 'Section Heading', cs: 'Nadpis sekce' },
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
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
        description: {
          en: 'URL for the call-to-action buttons',
          cs: 'URL pro tlačítka výzvy k akci',
        },
      },
    },
    {
      name: 'afterPricingText',
      type: 'textarea',
      required: false,
      label: { en: 'Text After Pricing Table', cs: 'Text po cenové tabulce' },
      admin: {
        description: {
          en: 'Additional text to display after the pricing table',
          cs: 'Dodatečný text zobrazený po cenové tabulce',
        },
      },
    },
    {
      name: 'primaryButton',
      type: 'group',
      label: { en: 'Primary Button', cs: 'Primární tlačítko' },
      fields: [
        {
          name: 'enabled',
          type: 'checkbox',
          label: { en: 'Enable Primary Button', cs: 'Povolit primární tlačítko' },
          defaultValue: false,
        },
        {
          name: 'text',
          type: 'text',
          required: false,
          label: { en: 'Button Text', cs: 'Text tlačítka' },
          admin: {
            condition: (_, siblingData) => siblingData?.enabled,
          },
        },
        {
          name: 'link',
          type: 'text',
          required: false,
          label: { en: 'Button Link', cs: 'Odkaz tlačítka' },
          admin: {
            condition: (_, siblingData) => siblingData?.enabled,
          },
        },
      ],
    },
    {
      name: 'secondaryButton',
      type: 'group',
      label: { en: 'Secondary Button', cs: 'Sekundární tlačítko' },
      fields: [
        {
          name: 'enabled',
          type: 'checkbox',
          label: { en: 'Enable Secondary Button', cs: 'Povolit sekundární tlačítko' },
          defaultValue: false,
        },
        {
          name: 'text',
          type: 'text',
          required: false,
          label: { en: 'Button Text', cs: 'Text tlačítka' },
          admin: {
            condition: (_, siblingData) => siblingData?.enabled,
          },
        },
        {
          name: 'link',
          type: 'text',
          required: false,
          label: { en: 'Button Link', cs: 'Odkaz tlačítka' },
          admin: {
            condition: (_, siblingData) => siblingData?.enabled,
          },
        },
      ],
    },
    {
      name: 'options',
      type: 'array',
      label: { en: 'Price Options', cs: 'Možnosti cen' },
      required: true,
      minRows: 1,
      admin: {
        description: {
          en: 'Pricing options to display in the table',
          cs: 'Možnosti cen k zobrazení v tabulce',
        },
      },
      fields: [
        {
          name: 'count',
          type: 'number',
          required: true,
          label: { en: 'Photo Count', cs: 'Počet fotografií' },
          min: 1,
        },
        {
          name: 'base',
          type: 'number',
          required: true,
          label: { en: 'Base Price', cs: 'Základní cena' },
        },
        {
          name: 'discount',
          type: 'number',
          required: true,
          label: { en: 'Discount %', cs: 'Sleva %' },
          min: 0,
          max: 100,
        },
        {
          name: 'final',
          type: 'number',
          required: true,
          label: { en: 'Final Price', cs: 'Konečná cena' },
        },
        {
          name: 'fee',
          type: 'number',
          required: true,
          label: { en: 'Additional Fee', cs: 'Dodatečný poplatek' },
        },
        {
          name: 'concepts',
          type: 'number',
          required: true,
          label: { en: 'Initial Concepts', cs: 'Počáteční koncepty' },
        },
        {
          name: 'series',
          type: 'number',
          required: true,
          label: { en: 'Second Series', cs: 'Druhá série' },
        },
        {
          name: 'adjust',
          type: 'number',
          required: true,
          label: { en: 'Final Adjustments', cs: 'Závěrečné úpravy' },
        },
      ],
    },
    {
      name: 'tableHeaders',
      type: 'group',
      label: { en: 'Table Headers', cs: 'Hlavičky tabulky' },
      admin: {
        description: {
          en: 'Headers for the pricing table columns',
          cs: 'Hlavičky sloupců cenové tabulky',
        },
      },
      fields: [
        {
          name: 'service',
          type: 'text',
          label: { en: 'Service Column', cs: 'Sloupec služby' },
        },
        {
          name: 'concepts',
          type: 'text',
          label: { en: 'Concepts Column', cs: 'Sloupec konceptů' },
        },
        {
          name: 'series',
          type: 'text',
          label: { en: 'Series Column', cs: 'Sloupec série' },
        },
        {
          name: 'adjust',
          type: 'text',
          label: { en: 'Adjustments Column', cs: 'Sloupec úprav' },
        },
        {
          name: 'fee',
          type: 'text',
          label: { en: 'Fee Column', cs: 'Sloupec poplatku' },
        },
      ],
    },
    {
      name: 'labels',
      type: 'group',
      label: { en: 'Text Labels', cs: 'Textové štítky' },
      admin: {
        description: {
          en: 'Text labels used in the pricing component',
          cs: 'Textové štítky použité v cenové komponentě',
        },
      },
      fields: [
        {
          name: 'discount',
          type: 'text',
          label: { en: 'Discount Label', cs: 'Štítek slevy' },
        },
        {
          name: 'photo',
          type: 'text',
          label: { en: 'Photo Label (singular)', cs: 'Štítek fotografie (jednotné číslo)' },
        },
        {
          name: 'photos',
          type: 'text',
          label: { en: 'Photo Label (plural)', cs: 'Štítek fotografií (množné číslo)' },
        },
        {
          name: 'currency',
          type: 'text',
          label: { en: 'Currency Symbol', cs: 'Symbol měny' },
          defaultValue: 'Kč',
        },
        {
          name: 'from',
          type: 'text',
          label: { en: 'From Label', cs: 'Štítek "od"' },
          defaultValue: 'od',
        },
        {
          name: 'for',
          type: 'text',
          label: { en: 'For Label', cs: 'Štítek "za"' },
          defaultValue: 'za',
        },
      ],
    },
    {
      name: 'note',
      type: 'text',
      label: { en: 'Footer Note', cs: 'Poznámka v patičce' },
    },
  ],
}
