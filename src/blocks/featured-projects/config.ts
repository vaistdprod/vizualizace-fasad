// src/blocks/featured-projects/config.ts
import { Block } from 'payload'

export const FeaturedProjects: Block = {
  slug: 'featuredProjects',
  interfaceName: 'FeaturedProjectsBlock',
  labels: {
    singular: { en: 'Featured Projects', cs: 'Vybrané projekty' },
    plural: { en: 'Featured Projects', cs: 'Vybrané projekty' },
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
      name: 'afterProjectsText',
      type: 'textarea',
      label: { en: 'Text After Projects', cs: 'Text po projektech' },
    },
    {
      name: 'primaryButton',
      type: 'group',
      label: { en: 'Primary Button', cs: 'Primární tlačítko' },
      fields: [
        {
          name: 'enabled',
          type: 'checkbox',
          label: { en: 'Enable Primary Button', cs: 'Povolit primární tlačítko' },
          defaultValue: false,
        },
        {
          name: 'text',
          type: 'text',
          label: { en: 'Button Text', cs: 'Text tlačítka' },
          admin: { condition: (_, siblingData) => siblingData?.enabled },
        },
        {
          name: 'link',
          type: 'text',
          label: { en: 'Button Link', cs: 'Odkaz tlačítka' },
          admin: { condition: (_, siblingData) => siblingData?.enabled },
        },
      ],
    },
    {
      name: 'secondaryButton',
      type: 'group',
      label: { en: 'Secondary Button', cs: 'Sekundární tlačítko' },
      fields: [
        {
          name: 'enabled',
          type: 'checkbox',
          label: { en: 'Enable Secondary Button', cs: 'Povolit sekundární tlačítko' },
          defaultValue: false,
        },
        {
          name: 'text',
          type: 'text',
          label: { en: 'Button Text', cs: 'Text tlačítka' },
          admin: { condition: (_, siblingData) => siblingData?.enabled },
        },
        {
          name: 'link',
          type: 'text',
          label: { en: 'Button Link', cs: 'Odkaz tlačítka' },
          admin: { condition: (_, siblingData) => siblingData?.enabled },
        },
      ],
    },
  ],
}
