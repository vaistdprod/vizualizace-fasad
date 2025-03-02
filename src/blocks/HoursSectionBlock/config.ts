import type { Block } from 'payload'

export const HoursSection: Block = {
  slug: 'hoursSection',
  interfaceName: 'HoursSectionBlock',
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
      name: 'hours',
      type: 'array',
      label: 'Hours',
      minRows: 1,
      fields: [
        {
          name: 'day',
          type: 'text',
          required: true,
          label: 'Day',
        },
        {
          name: 'hours',
          type: 'textarea',
          required: true,
          label: 'Hours',
          admin: {
            description:
              'Enter hours, use new lines for multiple entries (e.g., "8:00-12:00 (Note)" for additional info).',
          },
        },
      ],
    },
    {
      name: 'bloodDrawInfo',
      type: 'text',
      label: 'Blood Draw Information',
    },
    {
      name: 'emergencyContactInfo',
      type: 'text',
      label: 'Emergency Contact Info',
    },
    {
      name: 'emergencyPhone',
      type: 'text',
      label: 'Emergency Phone Number',
    },
  ],
  labels: {
    plural: 'Hours Sections',
    singular: 'Hours Section',
  },
}
