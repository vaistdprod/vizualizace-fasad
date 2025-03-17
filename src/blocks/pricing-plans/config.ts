import type { Block } from 'payload'

export const PricingPlans: Block = {
  slug: 'pricingPlans',
  interfaceName: 'PricingPlansBlock',
  labels: {
    singular: 'Pricing Table',
    plural: 'Pricing Tables',
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
      name: 'buttonText',
      type: 'text',
      required: true,
      label: 'Button Text',
    },
    {
      name: 'buttonHref',
      type: 'text',
      required: false,
      label: 'Button Link',
      admin: {
        description: 'URL for the call-to-action buttons',
      },
    },
    {
      name: 'afterPricingText',
      type: 'textarea',
      required: false,
      label: 'Text After Pricing Table',
      admin: {
        description: 'Additional text to display after the pricing table',
      },
    },
    {
      name: 'primaryButton',
      type: 'group',
      label: 'Primary Button',
      fields: [
        {
          name: 'enabled',
          type: 'checkbox',
          label: 'Enable Primary Button',
          defaultValue: false,
        },
        {
          name: 'text',
          type: 'text',
          required: false,
          label: 'Button Text',
          admin: {
            condition: (_, siblingData) => siblingData?.enabled,
          },
        },
        {
          name: 'link',
          type: 'text',
          required: false,
          label: 'Button Link',
          admin: {
            condition: (_, siblingData) => siblingData?.enabled,
          },
        },
      ],
    },
    {
      name: 'secondaryButton',
      type: 'group',
      label: 'Secondary Button',
      fields: [
        {
          name: 'enabled',
          type: 'checkbox',
          label: 'Enable Secondary Button',
          defaultValue: false,
        },
        {
          name: 'text',
          type: 'text',
          required: false,
          label: 'Button Text',
          admin: {
            condition: (_, siblingData) => siblingData?.enabled,
          },
        },
        {
          name: 'link',
          type: 'text',
          required: false,
          label: 'Button Link',
          admin: {
            condition: (_, siblingData) => siblingData?.enabled,
          },
        },
      ],
    },
    {
      name: 'options',
      type: 'array',
      label: 'Price Options',
      required: true,
      minRows: 1,
      admin: {
        description: 'Pricing options to display in the table',
      },
      fields: [
        {
          name: 'count',
          type: 'number',
          required: true,
          label: 'Photo Count',
          min: 1,
        },
        {
          name: 'base',
          type: 'number',
          required: true,
          label: 'Base Price',
        },
        {
          name: 'discount',
          type: 'number',
          required: true,
          label: 'Discount %',
          min: 0,
          max: 100,
        },
        {
          name: 'final',
          type: 'number',
          required: true,
          label: 'Final Price',
        },
        {
          name: 'fee',
          type: 'number',
          required: true,
          label: 'Additional Fee',
        },
        {
          name: 'concepts',
          type: 'number',
          required: true,
          label: 'Initial Concepts',
        },
        {
          name: 'series',
          type: 'number',
          required: true,
          label: 'Second Series',
        },
        {
          name: 'adjust',
          type: 'number',
          required: true,
          label: 'Final Adjustments',
        },
      ],
    },
    {
      name: 'tableHeaders',
      type: 'group',
      label: 'Table Headers',
      admin: {
        description: 'Headers for the pricing table columns',
      },
      fields: [
        {
          name: 'service',
          type: 'text',
          label: 'Service Column',
        },
        {
          name: 'concepts',
          type: 'text',
          label: 'Concepts Column',
        },
        {
          name: 'series',
          type: 'text',
          label: 'Series Column',
        },
        {
          name: 'adjust',
          type: 'text',
          label: 'Adjustments Column',
        },
        {
          name: 'fee',
          type: 'text',
          label: 'Fee Column',
        },
      ],
    },
    {
      name: 'labels',
      type: 'group',
      label: 'Text Labels',
      admin: {
        description: 'Text labels used in the pricing component',
      },
      fields: [
        {
          name: 'discount',
          type: 'text',
          label: 'Discount Label',
        },
        {
          name: 'photo',
          type: 'text',
          label: 'Photo Label (singular)',
        },
        {
          name: 'photos',
          type: 'text',
          label: 'Photo Label (plural)',
        },
        {
          name: 'currency',
          type: 'text',
          label: 'Currency Symbol',
          defaultValue: 'Kč',
        },
        {
          name: 'from',
          type: 'text',
          label: 'From Label',
          defaultValue: 'od',
        },
        {
          name: 'for',
          type: 'text',
          label: 'For Label',
          defaultValue: 'za',
        },
      ],
    },
    {
      name: 'note',
      type: 'text',
      label: 'Footer Note',
    },
  ],
}
