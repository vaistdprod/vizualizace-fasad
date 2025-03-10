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
  ],
}
