// src/blocks/partnership-process/config.ts
import type { Block } from 'payload'

export const PartnershipProcess: Block = {
  slug: 'partnershipProcess',
  interfaceName: 'PartnershipProcessBlock',
  labels: {
    singular: { en: 'Partnership Process', cs: 'Proces partnerství' },
    plural: { en: 'Partnership Process Sections', cs: 'Sekce procesu partnerství' },
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: { en: 'Title', cs: 'Název' },
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      label: { en: 'Description', cs: 'Popis' },
    },
    {
      name: 'steps',
      type: 'array',
      label: { en: 'Main Process Steps', cs: 'Hlavní kroky procesu' },
      minRows: 1,
      maxRows: 4,
      admin: {
        description: {
          en: 'Add up to 4 main steps in the process. Step 3 will be expanded with visualization details.',
          cs: 'Přidejte až 4 hlavní kroky procesu. Krok 3 bude rozšířen o detaily vizualizace.',
        },
      },
      fields: [
        {
          name: 'number',
          type: 'number',
          required: true,
          label: { en: 'Step Number', cs: 'Číslo kroku' },
          admin: {
            description: {
              en: 'Number of this step in the process (1-4)',
              cs: 'Číslo tohoto kroku v procesu (1-4)',
            },
          },
        },
        {
          name: 'title',
          type: 'text',
          required: true,
          label: { en: 'Step Title', cs: 'Název kroku' },
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
          label: { en: 'Step Description', cs: 'Popis kroku' },
        },
        {
          name: 'icon',
          type: 'select',
          required: true,
          label: { en: 'Icon', cs: 'Ikona' },
          options: [
            { label: { en: 'Message', cs: 'Zpráva' }, value: 'MessageSquare' },
            { label: { en: 'Lightbulb', cs: 'Žárovka' }, value: 'Lightbulb' },
            { label: { en: 'Image', cs: 'Obrázek' }, value: 'ImageIcon' },
            { label: { en: 'Document', cs: 'Dokument' }, value: 'FileEdit' },
            { label: { en: 'Send', cs: 'Odeslat' }, value: 'Send' },
            { label: { en: 'Check', cs: 'Kontrola' }, value: 'CheckCircle' },
            { label: { en: 'Camera', cs: 'Fotoaparát' }, value: 'Camera' },
            { label: { en: 'Clock', cs: 'Hodiny' }, value: 'Clock' },
            { label: { en: 'Credit Card', cs: 'Kreditní karta' }, value: 'CreditCard' },
          ],
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
          label: { en: 'Step Image', cs: 'Obrázek kroku' },
        },
      ],
    },
    {
      name: 'vizDetail',
      type: 'group',
      label: { en: 'Visualization Process Detail', cs: 'Detail procesu vizualizace' },
      admin: {
        description: {
          en: 'Details for the visualization process (expanded from step 3)',
          cs: 'Detaily procesu vizualizace (rozšíření kroku 3)',
        },
      },
      fields: [
        {
          name: 'heading',
          type: 'text',
          label: { en: 'Heading', cs: 'Nadpis' },
        },
        {
          name: 'description',
          type: 'textarea',
          label: { en: 'Description', cs: 'Popis' },
        },
        {
          name: 'phases',
          type: 'array',
          label: { en: 'Visualization Phases', cs: 'Fáze vizualizace' },
          minRows: 3,
          maxRows: 3,
          admin: {
            description: {
              en: 'The 3 phases of the visualization process',
              cs: '3 fáze procesu vizualizace',
            },
          },
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
              label: { en: 'Phase Title', cs: 'Název fáze' },
            },
            {
              name: 'subtitle',
              type: 'text',
              label: { en: 'Phase Subtitle', cs: 'Podnadpis fáze' },
            },
            {
              name: 'number',
              type: 'number',
              required: true,
              label: { en: 'Phase Number', cs: 'Číslo fáze' },
              min: 1,
              max: 3,
            },
            {
              name: 'images',
              type: 'array',
              label: { en: 'Phase Images', cs: 'Obrázky fáze' },
              minRows: 1,
              maxRows: 9,
              admin: {
                description: {
                  en: 'Upload images for this phase: up to 9 for Phase 1, 6 for Phase 2, 1 for Phase 3.',
                  cs: 'Nahrajte obrázky pro tuto fázi: až 9 pro fázi 1, 6 pro fázi 2, 1 pro fázi 3.',
                },
              },
              fields: [
                {
                  name: 'image',
                  type: 'upload',
                  relationTo: 'media',
                  required: true,
                  label: { en: 'Image', cs: 'Obrázek' },
                },
              ],
            },
          ],
        },
        {
          name: 'timeframe',
          type: 'text',
          label: { en: 'Process Timeframe', cs: 'Časový rámec procesu' },
        },
      ],
    },
  ],
}
