import type { Block } from 'payload'

export const ServiceCards: Block = {
  slug: 'serviceCards',
  interfaceName: 'ServiceCardsBlock',
  labels: {
    singular: 'Service Cards',
    plural: 'Service Cards Sections',
  },
  fields: [
    // Section Header Fields
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
      defaultValue: 'Zjistit více',
    },
    {
      name: 'buttonHref',
      type: 'text',
      required: false,
      label: 'Button Link',
      admin: {
        description: 'URL for the button',
      },
    },
    // Service Cards Array
    {
      name: 'services',
      type: 'array',
      label: 'Services',
      minRows: 1,
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          label: 'Service Title',
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
          label: 'Service Description',
        },
        {
          name: 'icon',
          type: 'select',
          required: true,
          label: 'Icon',
          options: [
            { label: 'Building2', value: 'Building2' },
            { label: 'Cube3d', value: 'Cube3d' },
            { label: 'Paintbrush', value: 'Paintbrush' },
            { label: 'Compass', value: 'Compass' },
          ],
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
          label: 'Service Image',
        },
        {
          name: 'buttonHref',
          type: 'text',
          required: false,
          label: 'Service Button Link',
          admin: {
            description: 'URL for this service card button (overrides the section button link)',
          },
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
      ],
    },
    // Call to Action Section
    {
      name: 'ctaTitle',
      type: 'text',
      label: 'CTA Title',
      admin: {
        description: 'Title for the call to action section at the bottom',
      },
    },
    {
      name: 'ctaDescription',
      type: 'textarea',
      label: 'CTA Description',
      admin: {
        description: 'Description for the call to action section',
      },
    },
    {
      name: 'ctaButtonText',
      type: 'text',
      label: 'CTA Button Text',
      admin: {
        description: 'Text for the call to action button',
      },
    },
    {
      name: 'ctaButtonHref',
      type: 'text',
      label: 'CTA Button Link',
      admin: {
        description: 'URL for the call to action button',
      },
    },
    {
      name: 'ctaButtonVariant',
      type: 'select',
      label: 'CTA Button Variant',
      defaultValue: 'default',
      options: [
        { label: 'Default', value: 'default' },
        { label: 'Outline', value: 'outline' },
        { label: 'Secondary', value: 'secondary' },
      ],
    },
  ],
}
