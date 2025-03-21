// src/collections/Projects/index.ts
import type { CollectionConfig } from 'payload'
import { authenticated } from '../../access/authenticated'
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'
import { populatePublishedAt } from '../../hooks/populatePublishedAt'
import { generatePreviewPath } from '../../utilities/generatePreviewPath'
import { revalidateProject } from './hooks/revalidateProject'

export const Projects: CollectionConfig = {
  slug: 'projects',
  labels: {
    singular: { en: 'Project', cs: 'Projekt' },
    plural: { en: 'Projects', cs: 'Projekty' },
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'updatedAt'],
    description: {
      en: 'A collection of projects with titles, descriptions, and images.',
      cs: 'Sbírka projektů s názvy, popisy a obrázky.',
    },
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
      label: { en: 'Project Title', cs: 'Název projektu' },
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      label: { en: 'Slug', cs: 'Slug' },
      admin: {
        description: {
          en: 'URL-friendly identifier for the project (e.g., "realizace-fasady-ostrava").',
          cs: 'URL-přátelský identifikátor projektu (např. "realizace-fasady-ostrava").',
        },
      },
    },
    {
      name: 'description',
      type: 'textarea',
      label: { en: 'Project Description', cs: 'Popis projektu' },
      admin: {
        description: { en: 'Brief description of the project.', cs: 'Stručný popis projektu.' },
      },
    },
    {
      name: 'images',
      type: 'array',
      label: { en: 'Project Images', cs: 'Obrázky projektu' },
      minRows: 1,
      maxRows: 16,
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          label: { en: 'Image Title', cs: 'Název obrázku' },
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
          label: { en: 'Image', cs: 'Obrázek' },
        },
        {
          name: 'caption',
          type: 'text',
          label: { en: 'Image Caption', cs: 'Popisek obrázku' },
          admin: {
            description: {
              en: 'Optional caption for the image.',
              cs: 'Volitelný popisek obrázku.',
            },
          },
        },
      ],
    },
    {
      name: 'featured',
      type: 'checkbox',
      label: { en: 'Featured Project', cs: 'Vybraný projekt' },
      defaultValue: false,
      admin: {
        position: 'sidebar',
        description: {
          en: 'Check this box to feature this project on the homepage.',
          cs: 'Zaškrtněte toto políčko, aby byl projekt zobrazen na domovské stránce.',
        },
      },
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
      label: { en: 'Featured Image', cs: 'Hlavní obrázek' },
      admin: {
        description: {
          en: 'The main image to represent this project (used on homepage).',
          cs: 'Hlavní obrázek reprezentující tento projekt (použitý na domovské stránce).',
        },
      },
    },
    {
      name: 'publishedAt',
      type: 'date',
      label: { en: 'Published At', cs: 'Zveřejněno dne' },
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
