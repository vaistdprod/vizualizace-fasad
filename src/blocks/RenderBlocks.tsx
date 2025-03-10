import React, { Fragment } from 'react'

import type { Page } from '@/payload-types'

import { HeroSectionBlock } from '@/blocks/hero-section/Component'
import { FeaturedProjectsBlock } from '@/blocks/featured-projects/Component'
import { WhyChooseUsBlock } from '@/blocks/why-choose-us/Component'
import { AboutServicesBlock } from '@/blocks/about-services/Component'
import { PartnershipProcessBlock } from '@/blocks/partnership-process/Component'
import { ServiceCardsBlock } from '@/blocks/service-cards/Component'
import { ContentBlock } from '@/blocks/Content/Component'
import { CTASectionBlock } from '@/blocks/cta-section/Component'
import { PricingPlansBlock } from '@/blocks/pricing-plans/Component'
import { GalleryGridBlock } from '@/blocks/gallery-grid/Component'
import { ContactInfoBlock } from '@/blocks/contact-info/Component'
import { FormBlock } from '@/blocks/Form/Component'
import { TeamSectionBlock } from '@/blocks/team-section/Component'

const blockComponents = {
  heroSection: HeroSectionBlock,
  featuredProjects: FeaturedProjectsBlock,
  whyChooseUs: WhyChooseUsBlock,
  aboutServices: AboutServicesBlock,
  partnershipProcess: PartnershipProcessBlock,
  serviceCards: ServiceCardsBlock,
  content: ContentBlock,
  ctaSection: CTASectionBlock,
  pricingPlans: PricingPlansBlock,
  galleryGrid: GalleryGridBlock,
  contactInfo: ContactInfoBlock,
  formBlock: FormBlock,
  teamSection: TeamSectionBlock,
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
              return (
                <div className="my-16" key={index}>
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
