import { MediaBlock } from '@/blocks/MediaBlock/Component'
import {
  DefaultNodeTypes,
  SerializedBlockNode,
  SerializedLinkNode,
} from '@payloadcms/richtext-lexical'
import { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import {
  JSXConvertersFunction,
  LinkJSXConverter,
  RichText as RichTextWithoutBlocks,
} from '@payloadcms/richtext-lexical/react'

import { HeroSectionBlock } from '@/blocks/HeroSectionBlock/Component'
import { ServicesSectionBlock } from '@/blocks/ServicesSectionBlock/Component'
import { TeamSectionBlock } from '@/blocks/TeamSectionBlock/Component'
import { GallerySectionBlock } from '@/blocks/GallerySectionBlock/Component'
import { InsuranceSectionBlock } from '@/blocks/InsuranceSectionBlock/Component'
import { HoursSectionBlock } from '@/blocks/HoursSectionBlock/Component'
import { AppointmentSectionBlock } from '@/blocks/AppointmentSectionBlock/Component'
import { NewsSectionBlock } from '@/blocks/NewsSectionBlock/Component'
import { ContactSectionBlock } from '@/blocks/ContactSectionBlock/Component' // Added import
import { BackgroundImageBlock } from '@/blocks/BackgroundImageBlock/Component' // Already included
import { PricingSectionBlock } from '@/blocks/PricingSectionBlock/Component' // Updated to PricingSectionBlock

import type {
  BannerBlock as BannerBlockProps,
  CallToActionBlock as CTABlockProps,
  MediaBlock as MediaBlockProps,
  HeroSectionBlock as HeroSectionBlockProps,
  ServicesSectionBlock as ServicesSectionBlockProps,
  TeamSectionBlock as TeamSectionBlockProps,
  GallerySectionBlock as GallerySectionBlockProps,
  InsuranceSectionBlock as InsuranceSectionBlockProps,
  HoursSectionBlock as HoursSectionBlockProps,
  AppointmentSectionBlock as AppointmentSectionBlockProps,
  NewsSectionBlock as NewsSectionBlockProps,
  ContactSectionBlock as ContactSectionBlockProps, // Added type
  BackgroundImageBlock as BackgroundImageBlockProps, // Already included
  PricingSectionBlock as PricingSectionBlockProps, // Updated to PricingSectionBlock
} from '@/payload-types'
import { BannerBlock } from '@/blocks/Banner/Component'
import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { cn } from '@/utilities/ui'

type NodeTypes =
  | DefaultNodeTypes
  | SerializedBlockNode<
      | CTABlockProps
      | MediaBlockProps
      | BannerBlockProps
      | HeroSectionBlockProps
      | ServicesSectionBlockProps
      | TeamSectionBlockProps
      | GallerySectionBlockProps
      | InsuranceSectionBlockProps
      | HoursSectionBlockProps
      | AppointmentSectionBlockProps
      | NewsSectionBlockProps
      | ContactSectionBlockProps // Added ContactSectionBlockProps
      | BackgroundImageBlockProps // Already included
      | PricingSectionBlockProps // Updated to PricingSectionBlock
    >

const internalDocToHref = ({ linkNode }: { linkNode: SerializedLinkNode }) => {
  const { value, relationTo } = linkNode.fields.doc!
  if (typeof value !== 'object') {
    throw new Error('Expected value to be an object')
  }
  const slug = value.slug
  return relationTo === 'aktuality' ? `/aktuality/${slug}` : `/${slug}`
}

const jsxConverters: JSXConvertersFunction<NodeTypes> = ({ defaultConverters }) => ({
  ...defaultConverters,
  ...LinkJSXConverter({ internalDocToHref }),
  blocks: {
    banner: ({ node }) => <BannerBlock className="col-start-2 mb-4" {...node.fields} />,
    mediaBlock: ({ node }) => (
      <MediaBlock
        className="col-start-1 col-span-3"
        imgClassName="m-0"
        {...node.fields}
        captionClassName="mx-auto max-w-[48rem]"
        enableGutter={false}
        disableInnerContainer={true}
      />
    ),
    cta: ({ node }) => <CallToActionBlock {...node.fields} />,
    heroSection: ({ node }) => <HeroSectionBlock {...node.fields} />,
    servicesSection: ({ node }) => <ServicesSectionBlock {...node.fields} />,
    teamSection: ({ node }) => <TeamSectionBlock {...node.fields} />,
    gallerySection: ({ node }) => <GallerySectionBlock {...node.fields} />,
    insuranceSection: ({ node }) => <InsuranceSectionBlock {...node.fields} />,
    hoursSection: ({ node }) => <HoursSectionBlock {...node.fields} />,
    appointmentSection: ({ node }) => <AppointmentSectionBlock {...node.fields} />,
    newsSection: ({ node }) => <NewsSectionBlock {...node.fields} />,
    contactSection: ({ node }) => <ContactSectionBlock {...node.fields} />, // Added ContactSectionBlock
    backgroundImageBlock: ({ node }) => <BackgroundImageBlock {...node.fields} />, // Already included
    pricingSection: ({ node }) => <PricingSectionBlock {...node.fields} />, // Updated to pricingSection
  },
})

type Props = {
  data: SerializedEditorState
  enableGutter?: boolean
  enableProse?: boolean
} & React.HTMLAttributes<HTMLDivElement>

export default function RichText(props: Props) {
  const { className, enableProse = true, enableGutter = true, ...rest } = props
  return (
    <RichTextWithoutBlocks
      converters={jsxConverters}
      className={cn(
        {
          'container ': enableGutter,
          'max-w-none': !enableGutter,
          'mx-auto prose md:prose-md dark:prose-invert ': enableProse,
        },
        className,
      )}
      {...rest}
    />
  )
}
