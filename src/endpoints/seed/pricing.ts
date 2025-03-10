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
  title: 'Naše cenové plány',
  layout: [
    {
      blockType: 'pricingPlans',
      plans: [
        {
          name: 'Základní',
          price: '$500',
          description: 'Ideální pro malé architektonické projekty',
          icon: 'Building2',
          features: [
            { feature: '1 vizualizace fasády' },
            { feature: 'Standardní rozlišení' },
            { feature: '2 kola revizí' },
            { feature: 'Dodání do 5 dnů' },
            { feature: 'Základní nastavení osvětlení' },
          ],
        },
        {
          name: 'Standardní',
          price: '$1,200',
          description: 'Ideální pro středně velké projekty',
          icon: 'Building2',
          popular: true,
          features: [
            { feature: '3 vizualizace fasády' },
            { feature: 'Vysoké rozlišení' },
            { feature: '4 kola revizí' },
            { feature: 'Dodání do 3 dnů' },
            { feature: 'Pokročilé osvětlení' },
            { feature: 'Úprava materiálů' },
            { feature: 'Zasazení do prostředí' },
          ],
        },
        {
          name: 'Premium',
          price: '$2,500',
          description: 'Pro komplexní architektonické projekty',
          icon: 'Building',
          features: [
            { feature: '6 vizualizací fasády' },
            { feature: 'Ultra vysoké rozlišení' },
            { feature: 'Neomezené revize' },
            { feature: 'Dodání do 48 hodin' },
            { feature: 'Pokročilé osvětlení' },
            { feature: 'Kompletní knihovna materiálů' },
            { feature: 'Integrace do prostředí' },
            { feature: 'Náhled animace' },
            { feature: 'Soubory připravené pro VR' },
          ],
        },
      ],
    },
    {
      blockType: 'ctaSection',
      title: 'Potřebujete individuální řešení?',
      description:
        'Kontaktujte nás pro balíčky na míru, které odpovídají vašim specifickým požadavkům.',
      buttonText: 'Kontaktovat obchodní oddělení',
      buttonVariant: 'outline',
    },
  ],
  meta: {
    title: 'Cenové plány - FacadeVision',
    description: 'Ceník našich vizualizačních služeb pro architektonické projekty.',
    image: pricingImage.id,
  },
})
