// src/blocks/background-image/config.ts
import type { Block } from 'payload'
import { FeaturedProjects } from '../featured-projects/config'
import { WhyChooseUs } from '../why-choose-us/config'
import { AboutServices } from '../about-services/config'
import { PartnershipProcess } from '../partnership-process/config'
import { CTASection } from '../cta-section/config'
import { PricingPlans } from '../pricing-plans/config'
import { GalleryGrid } from '../gallery-grid/config'
import { ContactSection } from '../contact-section/config'
import { TeamSection } from '../team-section/config'
import { TrustBadges } from '../trust-badges/config'
import { ConversionBlock } from '../conversion-block/config'

export const BackgroundImage: Block = {
  slug: 'backgroundImage',
  interfaceName: 'BackgroundImageBlock',
  labels: {
    singular: 'Background Wrapper',
    plural: 'Background Wrappers',
  },
  fields: [
    {
      name: 'backgroundType',
      type: 'select',
      label: 'Background Type',
      defaultValue: 'gridPattern', // Still good for this client
      options: [
        { label: 'Custom Image', value: 'image' },
        { label: 'Grid Pattern', value: 'gridPattern' },
        { label: 'Dot Pattern', value: 'dotPattern' }, // New option
      ],
      required: true,
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Background Image',
      admin: {
        condition: (_, siblingData) => siblingData.backgroundType === 'image',
      },
    },
    {
      name: 'opacity',
      type: 'number',
      label: 'Image Opacity',
      min: 0,
      max: 1,
      defaultValue: 0.15,
      admin: {
        step: 0.01,
        description: 'Value between 0 (transparent) and 1 (opaque). Only applies to images.',
        condition: (_, siblingData) => siblingData.backgroundType === 'image',
      },
    },
    {
      name: 'blocks',
      type: 'blocks',
      label: 'Nested Blocks',
      blocks: [
        FeaturedProjects,
        WhyChooseUs,
        AboutServices,
        PartnershipProcess,
        CTASection,
        PricingPlans,
        GalleryGrid,
        ContactSection,
        TeamSection,
        TrustBadges,
        ConversionBlock,
      ],
      minRows: 1,
    },
  ],
}
