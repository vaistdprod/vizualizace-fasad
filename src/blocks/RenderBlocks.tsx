import React, { Fragment } from 'react'

import type { Page } from '@/payload-types'

import { FeaturedProjectsBlock } from '@/blocks/featured-projects/Component'
import { WhyChooseUsBlock } from '@/blocks/why-choose-us/Component'
import { AboutServicesBlock } from '@/blocks/about-services/Component'
import { PartnershipProcessBlock } from '@/blocks/partnership-process/Component'
import { ServiceCardsBlock } from '@/blocks/service-cards/Component'
import { ContentBlock } from '@/blocks/Content/Component'
import { CTASectionBlock } from '@/blocks/cta-section/Component'
import { PricingPlansBlock } from '@/blocks/pricing-plans/Component'
import { GalleryGridBlock } from '@/blocks/gallery-grid/Component'
import { ContactSectionBlock } from '@/blocks/contact-section/Component'
import { FormBlock } from '@/blocks/Form/Component'
import { TeamSectionBlock } from '@/blocks/team-section/Component'
import { MediaBlock } from '@/blocks/MediaBlock/Component'
import { LandingHeroBlock } from '@/blocks/landing-hero/Component'
import { TrustBadgesBlock } from '@/blocks/trust-badges/Component'
import { TestimonialsBlock } from '@/blocks/testimonials/Component'

const blockComponents = {
  featuredProjects: FeaturedProjectsBlock,
  whyChooseUs: WhyChooseUsBlock,
  aboutServices: AboutServicesBlock,
  partnershipProcess: PartnershipProcessBlock,
  serviceCards: ServiceCardsBlock,
  content: ContentBlock,
  ctaSection: CTASectionBlock,
  pricingPlans: PricingPlansBlock,
  galleryGrid: GalleryGridBlock,
  contactSection: ContactSectionBlock,
  formBlock: FormBlock,
  teamSection: TeamSectionBlock,
  mediaBlock: MediaBlock,
  landingHero: LandingHeroBlock,
  trustBadges: TrustBadgesBlock,
  testimonials: TestimonialsBlock,
}

export const RenderBlocks: React.FC<{
  blocks: Page['layout'][0][]
}> = (props) => {
  const { blocks } = props

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block, index) => {
          const { blockType } = block

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType]

            if (Block) {
              // Conditionally set the margin class based on block type
              const blockClassName = blockType === 'landingHero' ? 'mb-16' : 'my-16'

              return (
                <div className={blockClassName} key={index}>
                  {/* @ts-expect-error there may be some mismatch between the expected types here */}
                  <Block {...block} />
                </div>
              )
            }
          }
          return null
        })}
      </Fragment>
    )
  }

  return null
}
