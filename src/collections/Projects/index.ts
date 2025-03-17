import type { CollectionConfig } from 'payload'
import { authenticated } from '../../access/authenticated'
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'
import { populatePublishedAt } from '../../hooks/populatePublishedAt'
import { generatePreviewPath } from '../../utilities/generatePreviewPath'
import { revalidateProject } from './hooks/revalidateProject'

export const Projects: CollectionConfig = {
  slug: 'projects',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished, // Allow published projects to be public
    update: authenticated,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'updatedAt'],
    description: 'A collection of projects with titles, descriptions, and images.',
    livePreview: {
      url: ({ data, req }) => {
        return generatePreviewPath({
          slug: `fotogalerie-fasad#project-${typeof data?.slug === 'string' ? data.slug : ''}`,
          collection: 'projects',
          req,
        })
      },
    },
    preview: (data, { req }) =>
      generatePreviewPath({
        slug: `fotogalerie-fasad#project-${typeof data?.slug === 'string' ? data.slug : ''}`,
        collection: 'projects',
        req,
      }),
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Project Title',
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      label: 'Slug',
      admin: {
        description: 'URL-friendly identifier for the project (e.g., "realizace-fasady-ostrava").',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Project Description',
      admin: {
        description: 'Brief description of the project.',
      },
    },
    {
      name: 'images',
      type: 'array',
      label: 'Project Images',
      minRows: 1,
      maxRows: 12,
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          label: 'Image Title',
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
          label: 'Image',
        },
        {
          name: 'caption',
          type: 'text',
          label: 'Image Caption',
          admin: {
            description: 'Optional caption for the image.',
          },
        },
      ],
    },
    {
      name: 'featured',
      type: 'checkbox',
      label: 'Featured Project',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        description: 'Check this box to feature this project on the homepage.',
      },
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Featured Image',
      admin: {
        description: 'The main image to represent this project (used on homepage).',
      },
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
      },
    },
  ],
  hooks: {
    afterChange: [revalidateProject],
    beforeChange: [populatePublishedAt],
  },
  versions: {
    drafts: {
      autosave: {
        interval: 100,
      },
      schedulePublish: true,
    },
    maxPerDoc: 50,
  },
  timestamps: true,
}
