import type { Block } from 'payload'

export const FAQSection: Block = {
  slug: 'faqSection',
  interfaceName: 'FAQSectionBlock',
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
      name: 'faqs',
      type: 'array',
      label: 'FAQs',
      minRows: 1,
      fields: [
        {
          name: 'question',
          type: 'text',
          required: true,
          label: 'Question',
        },
        {
          name: 'answer',
          type: 'textarea',
          required: true,
          label: 'Answer',
        },
      ],
    },
    {
      name: 'contactPrompt',
      type: 'text',
      label: 'Contact Prompt',
      defaultValue: 'Have more questions?',
    },
  ],
  labels: {
    plural: 'FAQ Sections',
    singular: 'FAQ Section',
  },
}
