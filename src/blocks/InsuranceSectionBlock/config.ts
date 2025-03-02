import type { Block } from 'payload'

export const InsuranceSection: Block = {
  slug: 'insuranceSection',
  interfaceName: 'InsuranceSectionBlock',
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
      name: 'partners',
      type: 'array',
      label: 'Partners',
      minRows: 1,
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          label: 'Partner Name',
        },
        {
          name: 'logo',
          type: 'upload',
          relationTo: 'media',
          required: true,
          label: 'Logo',
          maxDepth: 1, // Ensure full Media objects are populated
        },
      ],
    },
    {
      name: 'contactPrompt',
      type: 'text',
      label: 'Contact Prompt',
      defaultValue: 'Have questions about insurance?',
    },
  ],
  labels: {
    plural: 'Insurance Sections',
    singular: 'Insurance Section',
  },
}
