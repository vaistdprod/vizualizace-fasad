import type { Block } from 'payload'

export const AppointmentSection: Block = {
  slug: 'appointmentSection',
  interfaceName: 'AppointmentSectionBlock',
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
      name: 'appointmentTypes',
      type: 'array',
      label: 'Appointment Types',
      minRows: 1,
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          label: 'Title',
        },
        {
          name: 'duration',
          type: 'text',
          required: true,
          label: 'Duration',
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
          label: 'Description',
        },
        {
          name: 'buttonText',
          type: 'text',
          required: true,
          label: 'Button Text',
        },
      ],
    },
    {
      name: 'imageSection',
      type: 'group',
      label: 'Image Section',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
          label: 'Image',
        },
        {
          name: 'title',
          type: 'text',
          label: 'Title',
          defaultValue: 'Our Office',
        },
        {
          name: 'description',
          type: 'text',
          label: 'Description',
          defaultValue: 'A welcoming environment for kids and parents',
        },
      ],
    },
    {
      name: 'contactPrompt',
      type: 'text',
      label: 'Contact Prompt',
    },
    {
      name: 'contactLinkText',
      type: 'text',
      label: 'Contact Link Text',
    },
  ],
  labels: {
    plural: 'Appointment Sections',
    singular: 'Appointment Section',
  },
}
