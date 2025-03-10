import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'
import { HeroSection } from '../../blocks/hero-section/config'
import { FeaturedProjects } from '../../blocks/featured-projects/config'
import { WhyChooseUs } from '../../blocks/why-choose-us/config'
import { AboutServices } from '../../blocks/about-services/config'
import { PartnershipProcess } from '../../blocks/partnership-process/config'
import { ServiceCards } from '../../blocks/service-cards/config'
import { CTASection } from '../../blocks/cta-section/config'
import { PricingPlans } from '../../blocks/pricing-plans/config'
import { GalleryGrid } from '../../blocks/gallery-grid/config'
import { ContactInfo } from '../../blocks/contact-info/config'
import { FormBlock } from '../../blocks/Form/config'
import { TeamSection } from '../../blocks/team-section/config'

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

export const Pages: CollectionConfig = {
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
                HeroSection,
                FeaturedProjects,
                WhyChooseUs,
                AboutServices,
                PartnershipProcess,
                ServiceCards,
                CTASection,
                PricingPlans,
                GalleryGrid,
                ContactInfo,
                FormBlock,
                TeamSection,
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
