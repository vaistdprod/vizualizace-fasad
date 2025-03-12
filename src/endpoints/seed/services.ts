import type { RequiredDataFromCollectionSlug } from 'payload'
import type { Media } from '@/payload-types'

type ServicesArgs = {
  facadeImage: Media
  threeDImage: Media
  designImage: Media
  customImage: Media
}

export const services: (args: ServicesArgs) => RequiredDataFromCollectionSlug<'pages'> = ({
  facadeImage,
  threeDImage,
  designImage,
  customImage,
}) => ({
  slug: 'sluzby',
  _status: 'published',
  title: 'Návrhy a vizualizace fasád',
  layout: [
    {
      blockType: 'serviceCards',
      badgeText: 'Naše služby',
      heading: 'Profesionální vizualizace fasád',
      description:
        'Nabízíme komplexní služby v oblasti vizualizací fasád pro novostavby i rekonstrukce. Vyzkoušejte různé barevné kombinace a materiály před samotnou realizací.',
      buttonText: 'Zjistit více',
      buttonHref: '/sluzby',
      services: [
        {
          title: 'Vizualizace fasád novostaveb',
          description:
            'Dokončujete novostavbu? Nechte si ukázat, jak bude váš dům vypadat ještě před zahájením stavebních prací. Vyzkoušejte různé barevné kombinace a materiály.',
          icon: 'Building2',
          image: facadeImage.id,
          features: [
            { feature: 'Barevné kombinace' },
            { feature: 'Obkladové materiály' },
            { feature: 'Realistické vizualizace' },
          ],
          buttonHref: '/sluzby#novostavby',
        },
        {
          title: 'Návrhy rekonstrukcí',
          description:
            'Plánujete rekonstrukci nebo zateplení? Vizualizujeme novou podobu vašeho domu včetně všech detailů a materiálů.',
          icon: 'Paintbrush',
          image: threeDImage.id,
          features: [
            { feature: 'Zateplovací systémy' },
            { feature: 'Fasádní prvky' },
            { feature: 'Barevná řešení' },
          ],
          buttonHref: '/sluzby#rekonstrukce',
        },
        {
          title: 'Fasádní obklady',
          description:
            'Zakomponujte do fasády vašeho domu moderní obkladové materiály. Dřevo, kámen nebo cihlové obklady dodají vašemu domu jedinečný charakter.',
          icon: 'Compass',
          image: designImage.id,
          features: [
            { feature: 'Dřevěné obklady' },
            { feature: 'Kamenné obklady' },
            { feature: 'Cihlové obklady' },
          ],
          buttonHref: '/sluzby#obklady',
        },
        {
          title: 'Komerční objekty',
          description:
            'Specializujeme se také na návrhy fasád komerčních a průmyslových objektů, bytových domů a dalších větších staveb.',
          icon: 'Building2',
          image: customImage.id,
          features: [
            { feature: 'Bytové domy' },
            { feature: 'Komerční budovy' },
            { feature: 'Průmyslové objekty' },
          ],
          buttonHref: '/sluzby#komercni',
        },
      ],
    },
    {
      blockType: 'ctaSection',
      title: 'Máte zájem o vizualizaci fasády?',
      description: 'Pošlete nám fotografie vašeho domu, připravíme nezávaznou cenovou nabídku.',
      buttonText: 'Nezávazná poptávka',
      buttonHref: '/kontakt',
    },
  ],
  meta: {
    title: 'Návrhy a vizualizace fasád - VizualizaceFasad.cz',
    description:
      'Profesionální návrhy a vizualizace fasád pro novostavby, rekonstrukce i komerční objekty.',
    image: facadeImage.id,
  },
})
