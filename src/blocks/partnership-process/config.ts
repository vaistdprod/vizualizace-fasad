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
      label: 'Main Process Steps',
      minRows: 1,
      maxRows: 4,
      admin: {
        description:
          'Add up to 4 main steps in the process. Step 3 will be expanded with visualization details.',
      },
      fields: [
        {
          name: 'number',
          type: 'number',
          required: true,
          label: 'Step Number',
          admin: {
            description: 'Number of this step in the process (1-4)',
          },
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
            { label: 'Message', value: 'MessageSquare' },
            { label: 'Lightbulb', value: 'Lightbulb' },
            { label: 'Image', value: 'ImageIcon' },
            { label: 'Document', value: 'FileEdit' },
            { label: 'Send', value: 'Send' },
            { label: 'Check', value: 'CheckCircle' },
            { label: 'Camera', value: 'Camera' },
            { label: 'Clock', value: 'Clock' },
            { label: 'Credit Card', value: 'CreditCard' },
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
    {
      name: 'vizDetail',
      type: 'group',
      label: 'Visualization Process Detail',
      admin: {
        description: 'Details for the visualization process (expanded from step 3)',
      },
      fields: [
        {
          name: 'heading',
          type: 'text',
          label: 'Heading',
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Description',
        },
        {
          name: 'phases',
          type: 'array',
          label: 'Visualization Phases',
          minRows: 3,
          maxRows: 3,
          admin: {
            description: 'The 3 phases of the visualization process',
          },
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
              label: 'Phase Title',
            },
            {
              name: 'subtitle',
              type: 'text',
              label: 'Phase Subtitle',
            },
            {
              name: 'number',
              type: 'number',
              required: true,
              label: 'Phase Number',
              min: 1,
              max: 3,
            },
          ],
        },
        {
          name: 'timeframe',
          type: 'text',
          label: 'Process Timeframe',
        },
      ],
    },
  ],
}
