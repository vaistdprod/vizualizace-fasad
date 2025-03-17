import type { Block } from 'payload'

export const AboutServices: Block = {
  slug: 'aboutServices',
  interfaceName: 'AboutServicesBlock',
  labels: {
    singular: 'About Services',
    plural: 'About Services Sections',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Title',
    },
    {
      name: 'badgeText',
      type: 'text',
      required: false,
      label: 'Badge Text',
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      label: 'Description',
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Image',
    },
    {
      name: 'features',
      type: 'array',
      label: 'Service Features',
      minRows: 0,
      maxRows: 4,
      labels: {
        singular: 'Feature',
        plural: 'Features',
      },
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
          type: 'text',
          required: false,
          label: 'Icon Name (optional)',
          admin: {
            description: 'Enter an icon name from Lucide Icons (e.g., "check", "star", "shield")',
          },
        },
      ],
    },
    {
      name: 'cta',
      type: 'group',
      label: 'Call to Action',
      fields: [
        {
          name: 'enabled',
          type: 'checkbox',
          label: 'Enable CTA Button',
          defaultValue: false,
        },
        {
          name: 'text',
          type: 'text',
          required: false,
          label: 'Button Text',
          admin: {
            condition: (_, siblingData) => siblingData?.enabled,
          },
        },
        {
          name: 'link',
          type: 'text',
          required: false,
          label: 'Button Link',
          admin: {
            condition: (_, siblingData) => siblingData?.enabled,
          },
        },
      ],
    },
    {
      name: 'layout',
      type: 'select',
      required: true,
      label: 'Layout Style',
      options: [
        {
          label: 'Image on Left',
          value: 'imageLeft',
        },
        {
          label: 'Image on Right',
          value: 'imageRight',
        },
      ],
    },
  ],
}
