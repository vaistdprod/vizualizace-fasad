import type { Block } from 'payload'

export const Benefits: Block = {
  slug: 'benefits',
  interfaceName: 'BenefitsBlock',
  labels: {
    singular: 'Benefits',
    plural: 'Benefits Sections',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Title',
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      label: 'Description',
    },
    {
      name: 'benefits',
      type: 'array',
      label: 'Benefits',
      minRows: 1,
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          label: 'Benefit Title',
        },
        {
          name: 'description',
          type: 'text',
          required: true,
          label: 'Benefit Description',
        },
        {
          name: 'icon',
          type: 'select',
          required: true,
          label: 'Icon',
          options: [
            { label: 'Clock', value: 'Clock' },
            { label: 'Check Circle', value: 'CheckCircle2' },
            { label: 'Shield', value: 'Shield' },
          ],
        },
      ],
    },
  ],
}
