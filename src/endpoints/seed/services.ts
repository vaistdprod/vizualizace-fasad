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
  title: 'Naše vizualizační služby',
  layout: [
    {
      blockType: 'serviceCards',
      services: [
        {
          title: 'Vizualizace fasád',
          description:
            'Fotorealistické vizualizace fasád budov s přesnými materiály, osvětlením a zasazením do prostředí.',
          icon: 'Building2',
          image: facadeImage.id,
          features: [
            { feature: 'Vizualizace materiálů' },
            { feature: 'Simulace osvětlení' },
            { feature: 'Integrace do prostředí' },
          ],
        },
        {
          title: '3D vizualizace',
          description:
            'Kompletní 3D modelování a vizualizační služby pro architektonické projekty jakéhokoli rozsahu.',
          icon: 'Cube3d',
          image: threeDImage.id,
          features: [
            { feature: 'Kompletní 3D modelování' },
            { feature: 'Interiérové/exteriérové pohledy' },
            { feature: 'Možnosti animace' },
          ],
        },
        {
          title: 'Konzultace designu',
          description:
            'Odborné konzultační služby pro optimalizaci designu fasády z hlediska estetiky i funkčnosti.',
          icon: 'Paintbrush',
          image: designImage.id,
          features: [
            { feature: 'Výběr materiálů' },
            { feature: 'Optimalizace designu' },
            { feature: 'Technické konzultace' },
          ],
        },
        {
          title: 'Individuální řešení',
          description:
            'Vizualizační řešení na míru pro jedinečné architektonické výzvy a speciální požadavky.',
          icon: 'Compass',
          image: customImage.id,
          features: [
            { feature: 'Vlastní pracovní postupy' },
            { feature: 'Specializované renderování' },
            { feature: 'Přizpůsobení projektu' },
          ],
        },
      ],
    },
    {
      blockType: 'ctaSection',
      title: 'Připraveni proměnit vaši vizi?',
      description: 'Pojďme probrat, jak můžeme oživit vaše architektonické návrhy.',
      buttonText: 'Začít spolupráci',
    },
  ],
  meta: {
    title: 'Naše vizualizační služby - FacadeVision',
    description: 'Komplexní služby architektonické vizualizace od fasád po 3D modely.',
    image: facadeImage.id,
  },
})
