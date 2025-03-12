import type { Block } from 'payload'

export const ServiceCards: Block = {
  slug: 'serviceCards',
  interfaceName: 'ServiceCardsBlock',
  labels: {
    singular: 'Service Cards',
    plural: 'Service Cards Sections',
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
  ],
}
