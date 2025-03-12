import type { RequiredDataFromCollectionSlug } from 'payload'
import type { Media } from '@/payload-types'

type PricingArgs = {
  pricingImage: Media
}

export const pricing: (args: PricingArgs) => RequiredDataFromCollectionSlug<'pages'> = ({
  pricingImage,
}) => ({
  slug: 'cenik',
  _status: 'published',
  title: 'Ceník návrhů fasád',
  layout: [
    {
      blockType: 'pricingPlans',
      badgeText: 'Ceník',
      heading: 'Transparentní cenová politika',
      description:
        'Nabízíme jasně definované cenové balíčky pro různé typy projektů. Vyberte si řešení, které nejlépe odpovídá vašim potřebám.',
      priceSuffix: 'za projekt',
      popularLabel: 'Oblíbené',
      buttonText: 'Začít',
      buttonHref: '/kontakt',
      plans: [
        {
          name: 'Rodinný dům',
          price: '2 900 Kč',
          description: 'Jeden pohled rodinného domu',
          icon: 'Building2',
          features: [
            { feature: '5-10 návrhů v první sérii' },
            { feature: '6 variant ve druhé sérii' },
            { feature: 'Finální doladění detailů' },
            { feature: 'Zpracování do 5 pracovních dnů' },
            { feature: 'Realistické vizualizace' },
          ],
          buttonHref: '/kontakt?plan=basic',
        },
        {
          name: 'Rodinný dům PLUS',
          price: '4 900 Kč',
          description: 'Dva pohledy rodinného domu',
          icon: 'Building2',
          popular: true,
          features: [
            { feature: '5-10 návrhů v první sérii' },
            { feature: '6 variant ve druhé sérii' },
            { feature: 'Finální doladění detailů' },
            { feature: 'Zpracování do 5 pracovních dnů' },
            { feature: 'Realistické vizualizace' },
            { feature: 'Dva pohledy domu' },
            { feature: 'Konzultace materiálů' },
          ],
          buttonHref: '/kontakt?plan=plus',
        },
        {
          name: 'Komerční objekt',
          price: 'Dle rozsahu',
          description: 'Pro bytové domy a komerční objekty',
          icon: 'Building2',
          features: [
            { feature: 'Více pohledů budovy' },
            { feature: 'Komplexní řešení fasády' },
            { feature: 'Tři série návrhů' },
            { feature: 'Konzultace materiálů' },
            { feature: 'Technické poradenství' },
            { feature: 'Realistické vizualizace' },
            { feature: 'Individuální přístup' },
          ],
          buttonHref: '/kontakt?plan=commercial',
        },
      ],
    },
    {
      blockType: 'ctaSection',
      title: 'Máte zájem o cenovou nabídku?',
      description:
        'Pošlete nám fotografie vašeho domu a my vám připravíme nezávaznou cenovou nabídku na míru.',
      buttonText: 'Nezávazná poptávka',
      buttonHref: '/kontakt',
      buttonVariant: 'outline',
    },
  ],
  meta: {
    title: 'Ceník návrhů fasád - VizualizaceFasad.cz',
    description:
      'Ceník návrhů a vizualizací fasád pro rodinné domy, bytové domy a komerční objekty.',
    image: pricingImage.id,
  },
})
