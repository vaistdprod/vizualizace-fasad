// src/blocks/RenderBlocks.tsx
import React, { Fragment } from 'react'
import type { Media, Page } from '@/payload-types'

import { FeaturedProjectsBlock } from '@/blocks/featured-projects/Component'
import { WhyChooseUsBlock } from '@/blocks/why-choose-us/Component'
import { AboutServicesBlock } from '@/blocks/about-services/Component'
import { PartnershipProcessBlock } from '@/blocks/partnership-process/Component'
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
import { BackgroundImageBlock } from '@/blocks/background-image/Component'
import { ConversionBlock } from '@/blocks/conversion-block/Component'

const blockComponents = {
  featuredProjects: FeaturedProjectsBlock,
  whyChooseUs: WhyChooseUsBlock,
  aboutServices: AboutServicesBlock,
  partnershipProcess: PartnershipProcessBlock,
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
  backgroundImage: BackgroundImageBlock,
  conversionBlock: ConversionBlock,
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
              // Special handling for backgroundImage to render nested blocks
              if (blockType === 'backgroundImage') {
                const {
                  blocks: nestedBlocks,
                  backgroundType,
                  image,
                  opacity,
                  ...rest
                } = block as {
                  blockType: 'backgroundImage'
                  blocks?: Page['layout'][0][]
                  backgroundType: 'image' | 'gridPattern' | 'dotPattern'
                  image?: number | Media | null
                  opacity?: number
                  id?: string
                  blockName?: string
                }
                return (
                  <BackgroundImageBlock
                    key={block.id || `${blockType}-${index}`}
                    backgroundType={backgroundType}
                    image={image}
                    opacity={opacity}
                    {...rest}
                  >
                    {nestedBlocks && nestedBlocks.length > 0 ? (
                      <RenderBlocks blocks={nestedBlocks} />
                    ) : null}
                  </BackgroundImageBlock>
                )
              }

              // Conditionally set margin class for other block types
              const blockClassName =
                blockType === 'trustBadges' || blockType === 'landingHero' ? 'my-0' : 'my-16'

              return (
                <div className={blockClassName} key={block.id || `${blockType}-${index}`}>
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
