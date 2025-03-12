import type { Block } from 'payload'

export const PricingPlans: Block = {
  slug: 'pricingPlans',
  interfaceName: 'PricingPlansBlock',
  labels: {
    singular: 'Pricing Plans',
    plural: 'Pricing Plans Sections',
  },
  fields: [
    {
      name: 'badgeText',
      type: 'text',
      label: 'Badge Text',
    },
    {
      name: 'heading',
      type: 'text',
      label: 'Section Heading',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description',
    },
    {
      name: 'priceSuffix',
      type: 'text',
      required: true,
      label: 'Price Suffix',
      defaultValue: 'za projekt',
    },
    {
      name: 'popularLabel',
      type: 'text',
      required: true,
      label: 'Popular Label',
      defaultValue: 'Oblíbené',
    },
    {
      name: 'buttonText',
      type: 'text',
      required: true,
      label: 'Button Text',
      defaultValue: 'Začít',
    },
    {
      name: 'buttonHref',
      type: 'text',
      required: false,
      label: 'Button Link',
      admin: {
        description: 'Default URL for all plan buttons',
      },
    },
    {
      name: 'plans',
      type: 'array',
      label: 'Plans',
      minRows: 1,
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
          label: 'Plan Name',
        },
        {
          name: 'price',
          type: 'text',
          required: true,
          label: 'Price',
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
          label: 'Description',
        },
        {
          name: 'icon',
          type: 'select',
          required: true,
          label: 'Icon',
          options: [
            { label: 'Building2', value: 'Building2' },
            { label: 'Building', value: 'Building' },
          ],
        },
        {
          name: 'features',
          type: 'array',
          label: 'Features',
          minRows: 1,
          fields: [
            {
              name: 'feature',
              type: 'text',
              required: true,
              label: 'Feature',
            },
          ],
        },
        {
          name: 'buttonHref',
          type: 'text',
          required: false,
          label: 'Plan Button Link',
          admin: {
            description: 'URL for this specific plan button (overrides the section button link)',
          },
        },
        {
          name: 'popular',
          type: 'checkbox',
          label: 'Mark as Popular',
          defaultValue: false,
        },
      ],
    },
  ],
}
