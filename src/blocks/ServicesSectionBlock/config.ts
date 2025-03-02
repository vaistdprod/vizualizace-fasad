import type { Block } from 'payload'

export const ServicesSection: Block = {
  slug: 'servicesSection',
  interfaceName: 'ServicesSectionBlock',
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
      label: 'Heading',
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      label: 'Description',
    },
    {
      name: 'services',
      type: 'array',
      label: 'Services',
      minRows: 1,
      fields: [
        {
          name: 'icon',
          type: 'select',
          label: 'Icon',
          options: [
            { label: 'Stethoscope', value: 'Stethoscope' },
            { label: 'Syringe', value: 'Syringe' },
            { label: 'Star', value: 'Star' },
            { label: 'Heart', value: 'Heart' },
            { label: 'HeartPulse', value: 'HeartPulse' },
            { label: 'Activity', value: 'Activity' },
            { label: 'Bandage', value: 'Bandage' },
            { label: 'MessageCircle', value: 'MessageCircle' },
            { label: 'Microscope', value: 'Microscope' },
          ],
          defaultValue: 'Star',
        },
        {
          name: 'title',
          type: 'text',
          required: true,
          label: 'Title',
        },
        {
          name: 'shortDescription',
          type: 'textarea',
          label: 'Short Description',
        },
      ],
    },
  ],
  labels: {
    plural: 'Services Sections',
    singular: 'Services Section',
  },
}
