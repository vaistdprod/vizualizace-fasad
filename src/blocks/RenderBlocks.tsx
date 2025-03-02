import React, { Fragment } from 'react'

import type { Page } from '@/payload-types'

import { ArchiveBlock } from '@/blocks/ArchiveBlock/Component'
import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { ContentBlock } from '@/blocks/Content/Component'
import { FormBlock } from '@/blocks/Form/Component'
import { MediaBlock } from '@/blocks/MediaBlock/Component'
import { HeroSectionBlock } from '@/blocks/HeroSectionBlock/Component'
import { ServicesSectionBlock } from '@/blocks/ServicesSectionBlock/Component'
import { TeamSectionBlock } from '@/blocks/TeamSectionBlock/Component'
import { GallerySectionBlock } from '@/blocks/GallerySectionBlock/Component'
import { FAQSectionBlock } from '@/blocks/FAQSectionBlock/Component'
import { InsuranceSectionBlock } from '@/blocks/InsuranceSectionBlock/Component'
import { HoursSectionBlock } from '@/blocks/HoursSectionBlock/Component'
import { AppointmentSectionBlock } from '@/blocks/AppointmentSectionBlock/Component'
import { NewsSectionBlock } from '@/blocks/NewsSectionBlock/Component'
import { ContactSectionBlock } from '@/blocks/ContactSectionBlock/Component' // Added import

const blockComponents = {
  archive: ArchiveBlock,
  content: ContentBlock,
  cta: CallToActionBlock,
  formBlock: FormBlock,
  mediaBlock: MediaBlock,
  heroSection: HeroSectionBlock,
  servicesSection: ServicesSectionBlock,
  teamSection: TeamSectionBlock,
  gallerySection: GallerySectionBlock,
  faqSection: FAQSectionBlock,
  insuranceSection: InsuranceSectionBlock,
  hoursSection: HoursSectionBlock,
  appointmentSection: AppointmentSectionBlock,
  newsSection: NewsSectionBlock,
  contactSection: ContactSectionBlock, // Added ContactSectionBlock
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
