import type { Block } from 'payload'

export const PartnershipProcess: Block = {
  slug: 'partnershipProcess',
  interfaceName: 'PartnershipProcessBlock',
  labels: {
    singular: 'Partnership Process',
    plural: 'Partnership Process Sections',
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
      name: 'steps',
      type: 'array',
      label: 'Steps',
      minRows: 1,
      fields: [
        {
          name: 'number',
          type: 'number',
          required: true,
          label: 'Step Number',
        },
        {
          name: 'title',
          type: 'text',
          required: true,
          label: 'Step Title',
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
          label: 'Step Description',
        },
        {
          name: 'icon',
          type: 'select',
          required: true,
          label: 'Icon',
          options: [
            { label: 'MessageSquare', value: 'MessageSquare' },
            { label: 'Lightbulb', value: 'Lightbulb' },
            { label: 'ImageIcon', value: 'ImageIcon' },
            { label: 'FileEdit', value: 'FileEdit' },
            { label: 'Send', value: 'Send' },
          ],
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
          label: 'Step Image',
        },
      ],
    },
  ],
}
