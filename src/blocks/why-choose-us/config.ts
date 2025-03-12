import type { Block } from 'payload'

export const WhyChooseUs: Block = {
  slug: 'whyChooseUs',
  interfaceName: 'WhyChooseUsBlock',
  labels: {
    singular: 'Why Choose Us',
    plural: 'Why Choose Us Sections',
  },
  fields: [
    {
      name: 'badgeText',
      type: 'text',
      required: true,
      label: 'Badge Text',
      defaultValue: 'Why Choose Us',
    },
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
      name: 'features',
      type: 'array',
      label: 'Features',
      minRows: 1,
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          label: 'Feature Title',
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
          label: 'Feature Description',
        },
        {
          name: 'icon',
          type: 'select',
          required: true,
          label: 'Icon',
          options: [
            { label: 'Star', value: 'Star' },
            { label: 'Clock', value: 'Clock' },
            { label: 'Settings', value: 'Settings' },
            { label: 'Cpu', value: 'Cpu' },
            { label: 'PiggyBank', value: 'PiggyBank' },
            { label: 'Users', value: 'Users' },
          ],
        },
      ],
    },
  ],
}
