import React, { Fragment } from 'react'
import type { Page, Aktuality } from '@/payload-types'
import { ArchiveBlock } from '@/blocks/ArchiveBlock/Component'
import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { ContentBlock } from '@/blocks/Content/Component'
import { FormBlock } from '@/blocks/Form/Component'
import { MediaBlock } from '@/blocks/MediaBlock/Component'
import { HeroSectionBlock } from '@/blocks/HeroSectionBlock/Component'
import { ServicesSectionBlock } from '@/blocks/ServicesSectionBlock/Component'
import { TeamSectionBlock } from '@/blocks/TeamSectionBlock/Component'
import { GallerySectionBlock } from '@/blocks/GallerySectionBlock/Component'
import { InsuranceSectionBlock } from '@/blocks/InsuranceSectionBlock/Component'
import { HoursSectionBlock } from '@/blocks/HoursSectionBlock/Component'
import { AppointmentSectionBlock } from '@/blocks/AppointmentSectionBlock/Component'
import { NewsSectionBlock } from '@/blocks/NewsSectionBlock/Component'
import { ContactSectionBlock } from '@/blocks/ContactSectionBlock/Component'
import { BackgroundImageBlock } from '@/blocks/BackgroundImageBlock/Component'
import { PricingSectionBlock } from '@/blocks/PricingSectionBlock/Component'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type BlockComponent<T = any> = React.FC<
  T & { children?: React.ReactNode; disableInnerContainer?: boolean }
>

const blockComponents: { [key: string]: BlockComponent } = {
  archive: ArchiveBlock,
  content: ContentBlock,
  cta: CallToActionBlock,
  formBlock: FormBlock,
  mediaBlock: MediaBlock,
  heroSection: HeroSectionBlock,
  servicesSection: ServicesSectionBlock,
  teamSection: TeamSectionBlock,
  gallerySection: GallerySectionBlock,
  insuranceSection: InsuranceSectionBlock,
  hoursSection: HoursSectionBlock,
  appointmentSection: AppointmentSectionBlock,
  newsSection: NewsSectionBlock,
  contactSection: ContactSectionBlock,
  backgroundImageBlock: BackgroundImageBlock,
  pricingSection: PricingSectionBlock,
}

export const RenderBlocks: React.FC<{
  blocks: Page['layout'][0][]
  aktualityData?: Aktuality[]
}> = (props) => {
  const { blocks, aktualityData = [] } = props

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block, index) => {
          const { blockType } = block

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType]

            if (Block) {
              if (blockType === 'backgroundImageBlock') {
                const {
                  blocks: nestedBlocks,
                  image,
                  ...rest
                } = block as {
                  blockType: 'backgroundImageBlock'
                  blocks?: Page['layout'][0][]
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  image: any
                  id?: string
                  blockName?: string
                }
                return (
                  <BackgroundImageBlock key={index} image={image} {...rest}>
                    {nestedBlocks && nestedBlocks.length > 0 ? (
                      <RenderBlocks blocks={nestedBlocks} aktualityData={aktualityData} />
                    ) : null}
                  </BackgroundImageBlock>
                )
              }
              if (blockType === 'newsSection') {
                return (
                  <div key={index}>
                    <Block {...block} aktualityData={aktualityData} disableInnerContainer />
                  </div>
                )
              }
              return (
                <div key={index}>
                  <Block {...block} disableInnerContainer />
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
