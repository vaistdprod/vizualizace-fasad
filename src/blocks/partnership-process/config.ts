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
      defaultValue: 'Jak bude spolupráce probíhat?',
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      label: 'Description',
      defaultValue: 'Mám zájem o vizualizaci návrhu fasády. Jak bude spolupráce probíhat?',
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
      defaultValue: [
        {
          number: 1,
          title: 'Nezávazná nabídka',
          description:
            'Zdarma a nezávazně vytvoříme cenovou nabídku vizualizace návrhu fasády. Prostřednictvím poptávkového formuláře zašlete prosím fotografie domu do nichž požadujete vizualizovat fasádu.',
          icon: 'Camera',
        },
        {
          number: 2,
          title: 'Potvrzení a kalkulace',
          description:
            'Jakmile k nám údaje dorazí, zasíláme potvrzovací email, v některých případech vás poprosíme o doplňující informace. Nyní vytvoříme cenovou kalkulaci vaší zakázky.',
          icon: 'FileEdit',
        },
        {
          number: 3,
          title: 'Proces vizualizace',
          description:
            'Samotná vizualizace probíhá ve 3 krocích tak, že nejprve zasíláme 1. sérii konceptů (5-10 návrhů), z nichž vyberete prvky, motivy a barvy jenž se Vám líbí.',
          icon: 'ImageIcon',
        },
        {
          number: 4,
          title: 'Dokončení a platba',
          description:
            'První série návrhů jsou zpravidla do 5 pracovních dní hotové. Poté, co jsou návrhy fasády ve formátu JPG nachystány k elektronickému odeslání, zašleme vám email s výzvou k platbě.',
          icon: 'CreditCard',
        },
      ],
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
      name: 'visualizationDetail',
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
          defaultValue: 'Postup návrhů',
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Description',
          defaultValue:
            'Samotná vizualizace probíhá ve 3 krocích, které vám zaručí spokojenost s výsledkem',
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
          defaultValue: [
            {
              title: 'Úvodní koncepty',
              subtitle: 'Připravíme 5 - 10 návrhů',
              number: 1,
            },
            {
              title: 'Série návrhů',
              subtitle: 'Obdržíte 6 variant vizualizací',
              number: 2,
            },
            {
              title: 'Finální návrh',
              subtitle: '1 finální vizualizace',
              number: 3,
            },
          ],
        },
        {
          name: 'timeframe',
          type: 'text',
          label: 'Process Timeframe',
          defaultValue: 'Celý proces trvá přibližně 5-7 pracovních dní',
        },
      ],
    },
  ],
}
