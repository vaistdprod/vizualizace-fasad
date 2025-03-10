import type { Block } from 'payload'

export const ContactInfo: Block = {
  slug: 'contactInfo',
  interfaceName: 'ContactInfoBlock',
  labels: {
    singular: 'Contact Info',
    plural: 'Contact Info Sections',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Title',
      defaultValue: 'Kontaktní informace',
    },
    {
      name: 'items',
      type: 'array',
      label: 'Contact Items',
      minRows: 1,
      fields: [
        {
          name: 'icon',
          type: 'select',
          required: true,
          label: 'Icon',
          options: [
            { label: 'Mail', value: 'Mail' },
            { label: 'Phone', value: 'Phone' },
            { label: 'MapPin', value: 'MapPin' },
            { label: 'Clock', value: 'Clock' },
          ],
        },
        {
          name: 'label',
          type: 'text',
          required: true,
          label: 'Label',
        },
        {
          name: 'value',
          type: 'text',
          required: true,
          label: 'Value',
        },
      ],
    },
  ],
}
