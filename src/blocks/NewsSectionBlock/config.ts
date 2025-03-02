import type { Block } from 'payload'

export const NewsSection: Block = {
  slug: 'newsSection',
  interfaceName: 'NewsSectionBlock',
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
      name: 'posts',
      type: 'relationship',
      relationTo: 'posts',
      hasMany: true,
      label: 'Posts',
      admin: {
        description: 'Select posts to display in the news section.',
      },
      maxDepth: 1, // Ensure full Post objects are populated
    },
  ],
  labels: {
    plural: 'News Sections',
    singular: 'News Section',
  },
}
