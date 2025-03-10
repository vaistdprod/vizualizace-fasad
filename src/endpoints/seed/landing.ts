import type { RequiredDataFromCollectionSlug } from 'payload'
import type { Media, Form } from '@/payload-types'

type LandingArgs = {
  landingHeroImage: Media
  testimonialImage1: Media
  testimonialImage2: Media
  testimonialImage3: Media
  landingForm: Form // Added form argument
}

export const landing: (args: LandingArgs) => RequiredDataFromCollectionSlug<'pages'> = ({
  landingHeroImage,
  testimonialImage1,
  testimonialImage2,
  testimonialImage3,
  landingForm,
}) => ({
  slug: 'landing',
  _status: 'published',
  title: 'Domovská stránka',
  layout: [
    {
      blockType: 'landingHero',
      title: 'Proměňte svou architektonickou vizi v realitu',
      description:
        'Profesionální služby 3D vizualizace s dodáním do 48 hodin. Oživte své návrhy s fotorealistickou kvalitou.',
      primaryButtonText: 'Získat bezplatnou konzultaci',
      secondaryButtonText: 'Zobrazit portfolio',
      backgroundImage: landingHeroImage.id,
    },
    {
      blockType: 'trustBadges',
      stats: [
        { value: '500+', label: 'Projects Completed' },
        { value: '98%', label: 'Client Satisfaction' },
        { value: '15+', label: 'Years Experience' },
        { value: '48h', label: 'Average Delivery' },
      ],
    },
    {
      blockType: 'benefits',
      title: 'Proč zvolit FacadeVision?',
      description: 'Špičkové vizualizační služby, kterým důvěřují přední architektonické firmy',
      benefits: [
        {
          title: '48-Hour Delivery',
          description: 'Get your architectural visualizations in just 2 days',
          icon: 'Clock',
        },
        {
          title: 'Photorealistic Quality',
          description: 'Ultra-high resolution renders with precise lighting',
          icon: 'CheckCircle2',
        },
        {
          title: '100% Satisfaction',
          description: 'Unlimited revisions until you’re completely satisfied',
          icon: 'Shield',
        },
      ],
    },
    {
      blockType: 'testimonials',
      title: 'Co říkají naši klienti',
      description: 'Důvěřují nám přední architektonické firmy po celém světě',
      testimonials: [
        {
          name: 'John Anderson',
          role: 'Vedoucí architekt, Foster + Partners',
          image: testimonialImage1.id,
          quote:
            'FacadeVision proměnil náš koncept v úchvatné vizualizace, které nám pomohly vyhrát projekt za 50M dolarů.',
          result: 'Vyhráli jsme projekt za 50M dolarů',
        },
        {
          name: 'Sarah Martinez',
          role: 'Ředitelka designu, BIG Architects',
          image: testimonialImage2.id,
          quote:
            '48hodinová doba dodání s výjimečnou kvalitou. Naše prezentace nyní vynikají díky fotorealistickým vizualizacím.',
          result: 'O 30 % rychlejší schvalování projektů',
        },
        {
          name: 'David Chen',
          role: 'Ředitel, SOM',
          image: testimonialImage3.id,
          quote:
            'Pozornost týmu k detailům a přesnost osvětlení je bezkonkurenční. Stali se naším preferovaným partnerem pro vizualizace.',
          result: '100% spokojenost klientů',
        },
      ],
    },
    {
      blockType: 'formBlock',
      form: landingForm.id,
      enableIntro: true,
      introContent: {
        root: {
          type: 'root',
          format: '',
          indent: 0,
          version: 1,
          children: [
            {
              children: [
                {
                  detail: 0,
                  format: 0,
                  mode: 'normal',
                  style: '',
                  text: 'Začněte svůj projekt ještě dnes',
                  type: 'text',
                  version: 1,
                },
              ],
              direction: 'ltr',
              format: '',
              indent: 0,
              type: 'heading',
              version: 1,
              tag: 'h2',
            },
            {
              children: [
                {
                  detail: 0,
                  format: 0,
                  mode: 'normal',
                  style: '',
                  text: 'Získejte bezplatnou konzultaci a cenovou nabídku pro vaše potřeby architektonické vizualizace',
                  type: 'text',
                  version: 1,
                },
              ],
              direction: 'ltr',
              format: '',
              indent: 0,
              type: 'paragraph',
              version: 1,
            },
            {
              children: [
                {
                  detail: 0,
                  format: 0,
                  mode: 'normal',
                  style: '',
                  text: 'Dodání do 48 hodin',
                  type: 'text',
                  version: 1,
                },
              ],
              direction: 'ltr',
              format: '',
              indent: 0,
              type: 'listitem',
              version: 1,
              value: 1,
            },
            {
              children: [
                {
                  detail: 0,
                  format: 0,
                  mode: 'normal',
                  style: '',
                  text: 'Neomezené revize',
                  type: 'text',
                  version: 1,
                },
              ],
              direction: 'ltr',
              format: '',
              indent: 0,
              type: 'listitem',
              version: 1,
              value: 2,
            },
            {
              children: [
                {
                  detail: 0,
                  format: 0,
                  mode: 'normal',
                  style: '',
                  text: 'Záruka vrácení peněz',
                  type: 'text',
                  version: 1,
                },
              ],
              direction: 'ltr',
              format: '',
              indent: 0,
              type: 'listitem',
              version: 1,
              value: 3,
            },
          ],
          direction: 'ltr',
        },
      },
    },
  ],
  meta: {
    title: 'Vizualizace fasád a 3D návrhy - VizualizaceFasad.cz',
    description:
      'Profesionální 3D vizualizace fasád s dodáním do 48 hodin. Kontaktujte nás pro bezplatnou konzultaci.',
    image: landingHeroImage.id,
  },
})
