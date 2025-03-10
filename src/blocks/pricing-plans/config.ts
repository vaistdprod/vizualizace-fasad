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
          name: 'popular',
          type: 'checkbox',
          label: 'Mark as Popular',
          defaultValue: false,
        },
      ],
    },
  ],
}
