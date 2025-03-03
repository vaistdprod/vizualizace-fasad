import type { Block } from 'payload'

export const FAQSection: Block = {
  slug: 'faqSection',
  interfaceName: 'FAQSectionBlock',
  labels: {
    singular: 'Sekce častých dotazů',
    plural: 'Sekce častých dotazů',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
      label: 'Nadpis',
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      label: 'Popis',
    },
    {
      name: 'faqs',
      type: 'array',
      label: 'Časté dotazy',
      minRows: 1,
      fields: [
        {
          name: 'question',
          type: 'text',
          required: true,
          label: 'Otázka',
        },
        {
          name: 'answer',
          type: 'textarea',
          required: true,
          label: 'Odpověď',
        },
      ],
    },
    {
      name: 'contactPrompt',
      type: 'text',
      label: 'Text pro kontakt',
      defaultValue: 'Máte další otázky?',
    },
  ],
}
