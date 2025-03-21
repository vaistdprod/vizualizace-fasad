// src/collections/Pages/index.ts
import type { CollectionConfig } from 'payload'
import { authenticated } from '../../access/authenticated'
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'
import { FeaturedProjects } from '../../blocks/featured-projects/config'
import { WhyChooseUs } from '../../blocks/why-choose-us/config'
import { AboutServices } from '../../blocks/about-services/config'
import { PartnershipProcess } from '../../blocks/partnership-process/config'
import { CTASection } from '../../blocks/cta-section/config'
import { PricingPlans } from '../../blocks/pricing-plans/config'
import { GalleryGrid } from '../../blocks/gallery-grid/config'
import { ContactSection } from '../../blocks/contact-section/config'
import { FormBlock } from '../../blocks/Form/config'
import { TeamSection } from '../../blocks/team-section/config'
import { Content } from '../../blocks/Content/config'
import { MediaBlock } from '../../blocks/MediaBlock/config'
import { LandingHero } from '../../blocks/landing-hero/config'
import { TrustBadges } from '../../blocks/trust-badges/config'
import { BackgroundImage } from '../../blocks/background-image/config'
import { ConversionBlock } from '../../blocks/conversion-block/config'
import { slugField } from '@/fields/slug'
import { populatePublishedAt } from '../../hooks/populatePublishedAt'
import { generatePreviewPath } from '../../utilities/generatePreviewPath'
import { revalidateDelete, revalidatePage } from './hooks/revalidatePage'

export const Pages: CollectionConfig = {
  slug: 'pages',
  labels: {
    singular: { en: 'Page', cs: 'Stránka' },
    plural: { en: 'Pages', cs: 'Stránky' },
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
      label: { en: 'Title', cs: 'Název' },
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
                FeaturedProjects,
                WhyChooseUs,
                AboutServices,
                PartnershipProcess,
                CTASection,
                PricingPlans,
                GalleryGrid,
                ContactSection,
                FormBlock,
                TeamSection,
                Content,
                MediaBlock,
                LandingHero,
                TrustBadges,
                BackgroundImage,
                ConversionBlock,
              ],
              required: true,
              label: { en: 'Layout', cs: 'Rozvržení' },
              admin: {
                initCollapsed: true,
              },
            },
          ],
          label: { en: 'Content', cs: 'Obsah' },
        },
      ],
    },
    {
      name: 'publishedAt',
      type: 'date',
      label: { en: 'Published At', cs: 'Zveřejněno dne' },
      admin: {
        position: 'sidebar',
      },
    },
    ...slugField(),
  ],
  hooks: {
    afterChange: [revalidatePage],
    beforeChange: [populatePublishedAt],
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
