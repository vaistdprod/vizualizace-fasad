import { Block } from 'payload'

export const FeaturedProjects: Block = {
  slug: 'featuredProjects',
  interfaceName: 'FeaturedProjectsBlock',
  labels: {
    singular: 'Featured Projects',
    plural: 'Featured Projects',
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
      name: 'afterProjectsText',
      type: 'textarea',
      label: 'Text After Projects',
    },
    {
      name: 'primaryButton',
      type: 'group',
      label: 'Primary Button',
      fields: [
        {
          name: 'enabled',
          type: 'checkbox',
          label: 'Enable Primary Button',
          defaultValue: false,
        },
        {
          name: 'text',
          type: 'text',
          label: 'Button Text',
          admin: { condition: (_, siblingData) => siblingData?.enabled },
        },
        {
          name: 'link',
          type: 'text',
          label: 'Button Link',
          admin: { condition: (_, siblingData) => siblingData?.enabled },
        },
      ],
    },
    {
      name: 'secondaryButton',
      type: 'group',
      label: 'Secondary Button',
      fields: [
        {
          name: 'enabled',
          type: 'checkbox',
          label: 'Enable Secondary Button',
          defaultValue: false,
        },
        {
          name: 'text',
          type: 'text',
          label: 'Button Text',
          admin: { condition: (_, siblingData) => siblingData?.enabled },
        },
        {
          name: 'link',
          type: 'text',
          label: 'Button Link',
          admin: { condition: (_, siblingData) => siblingData?.enabled },
        },
      ],
    },
  ],
}
