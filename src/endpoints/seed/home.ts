import type { RequiredDataFromCollectionSlug } from 'payload'
import type { Media, Form } from '@/payload-types'

type HomeArgs = {
  heroImage: Media
  modernOfficeTower: Media
  luxuryResidential: Media
  culturalCenter: Media
  contactForm: Form
}

export const home: (args: HomeArgs) => RequiredDataFromCollectionSlug<'pages'> = ({
  heroImage,
  modernOfficeTower,
  luxuryResidential,
  culturalCenter,
  contactForm,
}) => ({
  slug: 'home',
  _status: 'published',
  title: 'FacadeVision - Architektonické vizualizace',
  layout: [
    {
      blockType: 'heroSection',
      title: 'Proměňte svou architektonickou vizi',
      description:
        'Oživujeme architektonické návrhy působivými vizualizacemi, které zachycují každý detail a vzbuzují důvěru ve vaše projekty.',
      buttonText: 'Prohlédnout naši práci',
      backgroundImage: heroImage.id,
    },
    {
      blockType: 'featuredProjects',
      title: 'Vybrané projekty',
      description:
        'Objevte, jak pomáháme architektům a developerům oživit jejich vize pomocí pokročilých vizualizačních technik.',
      projects: [
        { title: 'Moderní kancelářská věž', image: modernOfficeTower.id },
        { title: 'Luxusní rezidenční komplex', image: luxuryResidential.id },
        { title: 'Kulturní centrum', image: culturalCenter.id },
      ],
    },
    {
      blockType: 'whyChooseUs',
      title: 'Proč si vybrat nás',
      description:
        'Zažijte excelenci v architektonické vizualizaci s naším komplexním portfoliem služeb.',
      features: [
        {
          title: 'Expertní vizualizace',
          description:
            'Špičková expertíza v tvorbě fotorealistických architektonických vizualizací.',
          icon: 'Star',
        },
        {
          title: 'Rychlé dodání',
          description: 'Rychlé dodání bez kompromisů na kvalitě, dodržujeme vaše termíny.',
          icon: 'Clock',
        },
        {
          title: 'Řešení na míru',
          description:
            'Přizpůsobené vizualizační přístupy odpovídající specifickým požadavkům vašeho projektu.',
          icon: 'Settings',
        },
        {
          title: 'Nejnovější technologie',
          description:
            'Nejmodernější renderovací technologie a nástroje pro špičkovou vizuální kvalitu.',
          icon: 'Cpu',
        },
        {
          title: 'Dostupné ceny',
          description:
            'Konkurenceschopné ceny s flexibilními balíčky odpovídajícími vašemu rozpočtu.',
          icon: 'PiggyBank',
        },
        {
          title: 'Klient na prvním místě',
          description: 'Věnovaná podpora a spolupráce během celého průběhu vašeho projektu.',
          icon: 'Users',
        },
      ],
    },
    {
      blockType: 'aboutServices',
      title: 'O našich službách',
      description:
        'At FacadeVision, we specialize in transforming architectural concepts into stunning visual realities. Our comprehensive visualization services combine technical expertise with artistic finesse to bring your designs to life.\n\nWe understand that each project is unique, which is why we offer customized solutions tailored to your specific needs. From initial concept development to final delivery, our team works closely with you to ensure every detail is captured perfectly.\n\nVe FacadeVision se specializujeme na přeměnu architektonických konceptů v působivou vizuální realitu. Naše komplexní vizualizační služby kombinují technickou expertizu s uměleckým citem pro oživení vašich návrhů.\n\nChápeme, že každý projekt je jedinečný, proto nabízíme řešení na míru přizpůsobená vašim specifickým potřebám. Od počátečního vývoje konceptu až po finální dodání pracuje náš tým úzce s vámi, aby byl každý detail zachycen dokonale.\n\nAť už pracujete na malém rezidenčním projektu nebo velkém komerčním developmentu, naše pokročilé vizualizační techniky a pozornost k detailu vám pomohou efektivně komunikovat vaši vizi zúčastněným stranám a klientům.',
      image: heroImage.id, // Reusing hero image for simplicity
    },
    {
      blockType: 'partnershipProcess',
      title: 'Jak funguje spolupráce?',
      description: 'Náš optimalizovaný proces zajišťuje hladkou spolupráci od začátku až do konce.',
      steps: [
        {
          number: 1,
          title: 'Úvodní konzultace',
          description:
            'Probereme požadavky vašeho projektu, časový harmonogram a cíle, abychom plně porozuměli vaší vizi.',
          icon: 'MessageSquare',
          image: modernOfficeTower.id,
        },
        {
          number: 2,
          title: 'Vývoj konceptu',
          description:
            'Náš tým vytváří počáteční koncepty a vizualizační strategie přizpůsobené potřebám vašeho projektu.',
          icon: 'Lightbulb',
          image: luxuryResidential.id,
        },
        {
          number: 3,
          title: 'Návrhy vizualizací',
          description:
            'Vytváříme předběžné rendery a vizualizace pro vaši kontrolu a zpětnou vazbu.',
          icon: 'ImageIcon',
          image: culturalCenter.id,
        },
        {
          number: 4,
          title: 'Revize',
          description:
            'Na základě vaší zpětné vazby vylepšujeme a zdokonalujeme každý detail vizualizací.',
          icon: 'FileEdit',
          image: modernOfficeTower.id,
        },
        {
          number: 5,
          title: 'Finální dodání',
          description:
            'Obdržíte finální vizualizace ve vysokém rozlišení připravené k zamýšlenému použití.',
          icon: 'Send',
          image: luxuryResidential.id,
        },
      ],
    },
    {
      blockType: 'formBlock',
      form: contactForm.id,
      enableIntro: true,
      introContent: {
        root: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  detail: 0,
                  format: 0,
                  mode: 'normal',
                  style: '',
                  text: 'Máte otázku nebo chcete začít spolupráci? Kontaktujte nás!',
                  version: 1,
                },
              ],
              direction: 'ltr',
              format: '',
              indent: 0,
              version: 1,
            },
          ],
          direction: 'ltr',
          format: '',
          indent: 0,
          version: 1,
        },
      },
    },
  ],
  meta: {
    title: 'FacadeVision - Architektonické vizualizace',
    description: 'Přeměňujeme architektonické vize na realitu s fotorealistickými vizualizacemi.',
    image: heroImage.id,
  },
})
