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

import { HeroSectionBlock } from '@/blocks/hero-section/Component'
import { FeaturedProjectsBlock } from '@/blocks/featured-projects/Component'
import { WhyChooseUsBlock } from '@/blocks/why-choose-us/Component'
import { AboutServicesBlock } from '@/blocks/about-services/Component'
import { PartnershipProcessBlock } from '@/blocks/partnership-process/Component'
import { ServiceCardsBlock } from '@/blocks/service-cards/Component'
import { CTASectionBlock } from '@/blocks/cta-section/Component'
import { PricingPlansBlock } from '@/blocks/pricing-plans/Component'
import { GalleryGridBlock } from '@/blocks/gallery-grid/Component'
import { ContactInfoBlock } from '@/blocks/contact-info/Component'
import { TeamSectionBlock } from '@/blocks/team-section/Component'

import type {
  HeroSectionBlock as HeroSectionBlockProps,
  FeaturedProjectsBlock as FeaturedProjectsBlockProps,
  WhyChooseUsBlock as WhyChooseUsBlockProps,
  AboutServicesBlock as AboutServicesBlockProps,
  PartnershipProcessBlock as PartnershipProcessBlockProps,
  ServiceCardsBlock as ServiceCardsBlockProps,
  CTASectionBlock as CTASectionBlockProps,
  PricingPlansBlock as PricingPlansBlockProps,
  GalleryGridBlock as GalleryGridBlockProps,
  ContactInfoBlock as ContactInfoBlockProps,
  TeamSectionBlock as TeamSectionBlockProps,
} from '@/payload-types'
import { cn } from '@/utilities/ui'

type NodeTypes =
  | DefaultNodeTypes
  | SerializedBlockNode<
      | HeroSectionBlockProps
      | FeaturedProjectsBlockProps
      | WhyChooseUsBlockProps
      | AboutServicesBlockProps
      | PartnershipProcessBlockProps
      | ServiceCardsBlockProps
      | CTASectionBlockProps
      | PricingPlansBlockProps
      | GalleryGridBlockProps
      | ContactInfoBlockProps
      | TeamSectionBlockProps
    >

const internalDocToHref = ({ linkNode }: { linkNode: SerializedLinkNode }) => {
  const { value, relationTo } = linkNode.fields.doc!
  if (typeof value !== 'object') {
    throw new Error('Expected value to be an object')
  }
  const slug = value.slug
  return relationTo === 'posts' ? `/posts/${slug}` : `/${slug}`
}

const jsxConverters: JSXConvertersFunction<NodeTypes> = ({ defaultConverters }) => ({
  ...defaultConverters,
  ...LinkJSXConverter({ internalDocToHref }),
  blocks: {
    heroSection: ({ node }) => <HeroSectionBlock {...node.fields} />,
    featuredProjects: ({ node }) => <FeaturedProjectsBlock {...node.fields} />,
    whyChooseUs: ({ node }) => <WhyChooseUsBlock {...node.fields} />,
    aboutServices: ({ node }) => <AboutServicesBlock {...node.fields} />,
    partnershipProcess: ({ node }) => <PartnershipProcessBlock {...node.fields} />,
    serviceCards: ({ node }) => <ServiceCardsBlock {...node.fields} />,
    ctaSection: ({ node }) => <CTASectionBlock {...node.fields} />,
    pricingPlans: ({ node }) => <PricingPlansBlock {...node.fields} />,
    galleryGrid: ({ node }) => <GalleryGridBlock {...node.fields} />,
    contactInfo: ({ node }) => <ContactInfoBlock {...node.fields} />,
    teamSection: ({ node }) => <TeamSectionBlock {...node.fields} />,
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
