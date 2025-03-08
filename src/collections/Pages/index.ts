import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'
import { Archive } from '../../blocks/ArchiveBlock/config'
import { CallToAction } from '../../blocks/CallToAction/config'
import { Content } from '../../blocks/Content/config'
import { FormBlock } from '../../blocks/Form/config'
import { MediaBlock } from '../../blocks/MediaBlock/config'
import { HeroSection } from '../../blocks/HeroSectionBlock/config'
import { ServicesSection } from '../../blocks/ServicesSectionBlock/config'
import { TeamSection } from '../../blocks/TeamSectionBlock/config'
import { InsuranceSection } from '../../blocks/InsuranceSectionBlock/config'
import { HoursSection } from '../../blocks/HoursSectionBlock/config'
import { NewsSection } from '../../blocks/NewsSectionBlock/config'
import { ContactSection } from '../../blocks/ContactSectionBlock/config' // Added import
import { BackgroundImageBlock } from '../../blocks/BackgroundImageBlock/config' // Already included
import { PricingSectionBlock } from '../../blocks/PricingSectionBlock/config' // Updated to PricingSectionBlock
import { slugField } from '@/fields/slug'
import { populatePublishedAt } from '../../hooks/populatePublishedAt'
import { generatePreviewPath } from '../../utilities/generatePreviewPath'
import { revalidateDelete, revalidatePage } from './hooks/revalidatePage'
import { enforceHomeSlug } from './hooks/enforceHomeSlug'
import { ensureHomeSlug } from './hooks/ensureHomeSlug'

import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'

export const Pages: CollectionConfig<'pages'> = {
  slug: 'pages',
  labels: {
    singular: 'Stránka',
    plural: 'Stránky',
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  defaultPopulate: {
    title: true,
    slug: true,
  },
  admin: {
    defaultColumns: ['title', 'slug', 'updatedAt'],
    livePreview: {
      url: ({ data, req }) => {
        const path = generatePreviewPath({
          slug: typeof data?.slug === 'string' ? data.slug : '',
          collection: 'pages',
          req,
        })
        return path
      },
    },
    preview: (data, { req }) =>
      generatePreviewPath({
        slug: typeof data?.slug === 'string' ? data.slug : '',
        collection: 'pages',
        req,
      }),
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Název',
    },
    {
      type: 'tabs',
      tabs: [
        {
          fields: [
            {
              name: 'layout',
              type: 'blocks',
              blocks: [
                CallToAction,
                Content,
                MediaBlock,
                Archive,
                FormBlock,
                HeroSection,
                ServicesSection,
                TeamSection,
                InsuranceSection,
                HoursSection,
                NewsSection,
                ContactSection, // Added ContactSection
                BackgroundImageBlock, // Already included
                PricingSectionBlock, // Updated to PricingSectionBlock
              ],
              required: true,
              admin: {
                initCollapsed: true,
              },
            },
          ],
          label: 'Obsah',
        },
        {
          name: 'meta',
          label: 'SEO',
          fields: [
            OverviewField({
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
              imagePath: 'meta.image',
            }),
            MetaTitleField({
              hasGenerateFn: true,
            }),
            MetaImageField({
              relationTo: 'media',
            }),
            MetaDescriptionField({}),
            PreviewField({
              hasGenerateFn: true,
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
            }),
          ],
        },
      ],
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
      },
    },
    ...slugField('title', {
      slugOverrides: {
        hooks: {
          beforeValidate: [enforceHomeSlug],
        },
        admin: {
          description: 'Pro domovskou stránku je hodnota vždy "home" a nelze ji změnit.',
          components: {
            Field: {
              path: '@/fields/slug/HomeSlugComponent#HomeSlugComponent',
              clientProps: {
                fieldToUse: 'title',
                checkboxFieldPath: 'slugLock',
              },
            },
          },
        },
      },
    }),
  ],
  hooks: {
    afterChange: [revalidatePage],
    beforeChange: [populatePublishedAt],
    beforeValidate: [ensureHomeSlug],
    afterDelete: [revalidateDelete],
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
}
