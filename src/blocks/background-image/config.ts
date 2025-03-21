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
    singular: { en: 'Background Wrapper', cs: 'Obal pozadí' },
    plural: { en: 'Background Wrappers', cs: 'Obaly pozadí' },
  },
  fields: [
    {
      name: 'backgroundType',
      type: 'select',
      label: { en: 'Background Type', cs: 'Typ pozadí' },
      defaultValue: 'gridPattern',
      options: [
        { label: { en: 'Custom Image', cs: 'Vlastní obrázek' }, value: 'image' },
        { label: { en: 'Grid Pattern', cs: 'Mřížkový vzor' }, value: 'gridPattern' },
        { label: { en: 'Dot Pattern', cs: 'Tečkovaný vzor' }, value: 'dotPattern' },
      ],
      required: true,
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: { en: 'Background Image', cs: 'Obrázek pozadí' },
      admin: { condition: (_, siblingData) => siblingData.backgroundType === 'image' },
    },
    {
      name: 'opacity',
      type: 'number',
      label: { en: 'Image Opacity', cs: 'Průhlednost obrázku' },
      min: 0,
      max: 1,
      defaultValue: 0.15,
      admin: {
        step: 0.01,
        description: {
          en: 'Value between 0 (transparent) and 1 (opaque). Only applies to images.',
          cs: 'Hodnota mezi 0 (průhledné) a 1 (neprůhledné). Platí pouze pro obrázky.',
        },
        condition: (_, siblingData) => siblingData.backgroundType === 'image',
      },
    },
    {
      name: 'blocks',
      type: 'blocks',
      label: { en: 'Nested Blocks', cs: 'Vnořené bloky' },
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
