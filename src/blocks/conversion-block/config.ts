import type { Block } from 'payload'

export const ConversionBlock: Block = {
  slug: 'conversionBlock',
  interfaceName: 'ConversionBlockProps',
  labels: {
    singular: 'Conversion Block',
    plural: 'Conversion Blocks',
  },
  fields: [
    {
      name: 'badgeText',
      type: 'text',
      label: 'Badge Text',
    },
    {
      name: 'headline',
      type: 'text',
      required: true,
      label: 'Headline',
    },
    {
      name: 'subheading',
      type: 'textarea',
      required: true,
      label: 'Subheading',
    },
    {
      name: 'endDate',
      type: 'date',
      label: 'Offer End Date',
      admin: {
        description: 'Date when the offer expires',
      },
    },
    {
      name: 'originalPrice',
      type: 'number',
      label: 'Original Price',
      admin: {
        description: 'Original price before discount',
      },
    },
    {
      name: 'discountPrice',
      type: 'text',
      label: 'Discount Price',
      admin: {
        description: 'Price after discount',
      },
    },
    {
      name: 'discountPercentage',
      type: 'number',
      label: 'Discount Percentage',
      min: 0,
      max: 100,
      admin: {
        description: 'Percentage of discount (0-100)',
      },
    },
    {
      name: 'currency',
      type: 'text',
      label: 'Currency',
    },
    {
      name: 'testimonial',
      type: 'group',
      label: 'Testimonial',
      fields: [
        {
          name: 'quote',
          type: 'textarea',
          label: 'Quote',
          required: true,
        },
        {
          name: 'name',
          type: 'text',
          label: 'Name',
          required: true,
        },
        {
          name: 'role',
          type: 'text',
          label: 'Role/Position',
          required: true,
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          label: 'Avatar Image',
        },
      ],
    },
    {
      name: 'trustBadges',
      type: 'array',
      label: 'Trust Badges',
      minRows: 0,
      maxRows: 3,
      fields: [
        {
          name: 'icon',
          type: 'select',
          label: 'Icon',
          options: [
            {
              label: 'Shield Check',
              value: 'ShieldCheck',
            },
            {
              label: 'Check Circle',
              value: 'CheckCircle',
            },
            {
              label: 'Clock',
              value: 'Clock',
            },
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
      name: 'primaryCTA',
      type: 'group',
      label: 'Primary Call to Action',
      fields: [
        {
          name: 'text',
          type: 'text',
          label: 'Button Text',
          required: true,
        },
        {
          name: 'href',
          type: 'text',
          label: 'Button Link',
          required: true,
        },
      ],
    },
    {
      name: 'secondaryCTA',
      type: 'group',
      label: 'Secondary Call to Action',
      fields: [
        {
          name: 'text',
          type: 'text',
          label: 'Button Text',
        },
        {
          name: 'href',
          type: 'text',
          label: 'Button Link',
          required: true,
        },
      ],
    },
    {
      name: 'urgencyText',
      type: 'text',
      label: 'Urgency Text',
    },
    {
      name: 'packageDetails',
      type: 'group',
      label: 'Package Details',
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Package Title',
        },
        {
          name: 'features',
          type: 'array',
          label: 'Features',
          minRows: 1,
          fields: [
            {
              name: 'text',
              type: 'text',
              label: 'Feature Text',
              required: true,
            },
          ],
        },
        {
          name: 'additionalFeeText',
          type: 'text',
          label: 'Additional Fee Text',
        },
      ],
    },
  ],
}
