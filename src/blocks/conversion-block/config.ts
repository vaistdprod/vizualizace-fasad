// src/blocks/conversion-block/config.ts
import type { Block } from 'payload'

export const ConversionBlock: Block = {
  slug: 'conversionBlock',
  interfaceName: 'ConversionBlockProps',
  labels: {
    singular: { en: 'Conversion Block', cs: 'Konverzní blok' },
    plural: { en: 'Conversion Blocks', cs: 'Konverzní bloky' },
  },
  fields: [
    {
      name: 'badgeText',
      type: 'text',
      label: { en: 'Badge Text', cs: 'Text odznaku' },
    },
    {
      name: 'headline',
      type: 'text',
      required: true,
      label: { en: 'Headline', cs: 'Titulek' },
    },
    {
      name: 'subheading',
      type: 'textarea',
      required: true,
      label: { en: 'Subheading', cs: 'Podnadpis' },
    },
    {
      name: 'endDate',
      type: 'date',
      label: { en: 'Offer End Date', cs: 'Datum konce nabídky' },
      admin: {
        description: { en: 'Date when the offer expires', cs: 'Datum, kdy nabídka vyprší' },
      },
    },
    {
      name: 'originalPrice',
      type: 'number',
      label: { en: 'Original Price', cs: 'Původní cena' },
      admin: {
        description: { en: 'Original price before discount', cs: 'Původní cena před slevou' },
      },
    },
    {
      name: 'discountPrice',
      type: 'text',
      label: { en: 'Discount Price', cs: 'Cena po slevě' },
      admin: {
        description: { en: 'Price after discount', cs: 'Cena po slevě' },
      },
    },
    {
      name: 'discountPercentage',
      type: 'number',
      label: { en: 'Discount Percentage', cs: 'Procento slevy' },
      min: 0,
      max: 100,
      admin: {
        description: { en: 'Percentage of discount (0-100)', cs: 'Procento slevy (0-100)' },
      },
    },
    {
      name: 'currency',
      type: 'text',
      label: { en: 'Currency', cs: 'Měna' },
    },
    {
      name: 'testimonial',
      type: 'group',
      label: { en: 'Testimonial', cs: 'Ohlas' },
      fields: [
        {
          name: 'quote',
          type: 'textarea',
          label: { en: 'Quote', cs: 'Citát' },
          required: true,
        },
        {
          name: 'name',
          type: 'text',
          label: { en: 'Name', cs: 'Jméno' },
          required: true,
        },
        {
          name: 'role',
          type: 'text',
          label: { en: 'Role/Position', cs: 'Role/Pozice' },
          required: true,
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          label: { en: 'Avatar Image', cs: 'Obrázek avatara' },
        },
      ],
    },
    {
      name: 'trustBadges',
      type: 'array',
      label: { en: 'Trust Badges', cs: 'Odznaky důvěry' },
      minRows: 0,
      maxRows: 3,
      fields: [
        {
          name: 'icon',
          type: 'select',
          label: { en: 'Icon', cs: 'Ikona' },
          options: [
            { label: { en: 'Shield Check', cs: 'Štít s kontrolou' }, value: 'ShieldCheck' },
            { label: { en: 'Check Circle', cs: 'Kruh s kontrolou' }, value: 'CheckCircle' },
            { label: { en: 'Clock', cs: 'Hodiny' }, value: 'Clock' },
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
      name: 'primaryCTA',
      type: 'group',
      label: { en: 'Primary Call to Action', cs: 'Primární výzva k akci' },
      fields: [
        {
          name: 'text',
          type: 'text',
          label: { en: 'Button Text', cs: 'Text tlačítka' },
          required: true,
        },
        {
          name: 'href',
          type: 'text',
          label: { en: 'Button Link', cs: 'Odkaz tlačítka' },
          required: true,
        },
      ],
    },
    {
      name: 'secondaryCTA',
      type: 'group',
      label: { en: 'Secondary Call to Action', cs: 'Sekundární výzva k akci' },
      fields: [
        {
          name: 'text',
          type: 'text',
          label: { en: 'Button Text', cs: 'Text tlačítka' },
        },
        {
          name: 'href',
          type: 'text',
          label: { en: 'Button Link', cs: 'Odkaz tlačítka' },
          required: true,
        },
      ],
    },
    {
      name: 'urgencyText',
      type: 'text',
      label: { en: 'Urgency Text', cs: 'Text naléhavosti' },
    },
    {
      name: 'packageDetails',
      type: 'group',
      label: { en: 'Package Details', cs: 'Detaily balíčku' },
      fields: [
        {
          name: 'title',
          type: 'text',
          label: { en: 'Package Title', cs: 'Název balíčku' },
        },
        {
          name: 'features',
          type: 'array',
          label: { en: 'Features', cs: 'Vlastnosti' },
          minRows: 1,
          fields: [
            {
              name: 'text',
              type: 'text',
              label: { en: 'Feature Text', cs: 'Text vlastnosti' },
              required: true,
            },
          ],
        },
        {
          name: 'additionalFeeText',
          type: 'text',
          label: { en: 'Additional Fee Text', cs: 'Text dodatečného poplatku' },
        },
      ],
    },
  ],
}
