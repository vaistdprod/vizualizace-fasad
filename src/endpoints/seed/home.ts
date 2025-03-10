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
  title: 'VizualizaceFasad.cz - Profesionální návrhy fasád',
  layout: [
    {
      blockType: 'heroSection',
      title: 'Profesionálně navrhujeme fasády vašich domů!',
      description:
        'Dokončujete novostavbu? Zateplujete? Děláte rekonstrukci nebo uvažujete o novém nátěru fasády? Nechte si ještě před zahájením stavebních prací ukázat, jak bude dům vypadat.',
      buttonText: 'Nezávazná poptávka',
      backgroundImage: heroImage.id,
    },
    {
      blockType: 'featuredProjects',
      title: 'Ukázky našich návrhů',
      description:
        'Prohlédněte si ukázky našich prací. Máte spoustu možností jak z fasády vašeho domu udělat ozdobu ulice. Bez obav zvolte jednobarevnou fasádu nebo moderní fasádu vícebarevnou.',
      projects: [
        { title: 'Moderní kancelářská věž', image: modernOfficeTower.id },
        { title: 'Luxusní rezidenční komplex', image: luxuryResidential.id },
        { title: 'Kulturní centrum', image: culturalCenter.id },
      ],
    },
    {
      blockType: 'whyChooseUs',
      title: 'Proč s námi?',
      description:
        'Více než 1000 úspěšně provedených návrhů fasád jak novostaveb, rekonstrukcí rodinných příp. panelových domů či komerčních objektů.',
      features: [
        {
          title: 'Profesionální návrhy',
          description:
            'Naše návrhy jsou profesionální a realisticky propracované, zohledňují vaše představy.',
          icon: 'Star',
        },
        {
          title: 'Rychlé zpracování',
          description: 'První série návrhů jsou zpravidla do 5 pracovních dní hotové.',
          icon: 'Clock',
        },
        {
          title: 'Jasná cena',
          description:
            'Cenu vizualizace fasády u nás znáte dopředu, nedochází k nečekanému navyšování ceny.',
          icon: 'PiggyBank',
        },
        {
          title: 'Bohaté zkušenosti',
          description:
            'Máme nejbohatší zkušenosti s navrhováním a s vizualizací fasádních obkladových materiálů na našem trhu.',
          icon: 'Star',
        },
        {
          title: 'Technická zdatnost',
          description: 'Technicky náročné zakázky jsou pro nás výzvou a neodmítáme je.',
          icon: 'Settings',
        },
        {
          title: 'Nasloucháme vám',
          description:
            'Nasloucháme vašim představám, v případě vašeho zájmu je rádi doplníme o naše návrhy.',
          icon: 'Users',
        },
      ],
    },
    {
      blockType: 'aboutServices',
      title: 'O našich službách',
      description:
        'Aby výsledný dojem vašeho domu byl přesně podle vašich představ, nechejte si ještě před zahájením stavebních prací ukázat, jak bude dům vypadat, až bude hotový. Máte spoustu možností jak z fasády vašeho domu udělat ozdobu ulice.\n\nBez obav zvolte jednobarevnou fasádu nebo moderní fasádu vícebarevnou. Zakomponujte venkovní obklady. Dřevo, kámen, cihlové obklady to vše může vašemu domu vtisknout punc výjimečnosti.\n\nBylo by chybou nezkusit více variant toho, co by vašemu domu mohlo slušet. Vizualizací návrhu fasády do fotografie. Bez obav. S vašimi i našimi nápady. Za rozumnou cenu.\n\nS grafickým návrhem budete mít jasnou představu o tom, jak následná realizace bude vypadat a nemusíte se již obávat výsledku. To vám rovněž usnadní komunikaci s realizační firmou.',
      image: heroImage.id, // Reusing hero image for simplicity
    },
    {
      blockType: 'partnershipProcess',
      title: 'Jak probíhá spolupráce?',
      description:
        'Samotná vizualizace probíhá ve 3 krocích, které vám zaručí spokojenost s výsledkem.',
      steps: [
        {
          number: 1,
          title: 'První série konceptů',
          description:
            'Nejprve zasíláme 5-10 návrhů, z nichž vyberete prvky, motivy a barvy, které se vám líbí.',
          icon: 'Lightbulb',
          image: modernOfficeTower.id,
        },
        {
          number: 2,
          title: 'Druhá série návrhů',
          description: 'Na základě vašich připomínek vytvoříme druhou sérii 6 variant návrhů.',
          icon: 'ImageIcon',
          image: luxuryResidential.id,
        },
        {
          number: 3,
          title: 'Finální doladění',
          description:
            'Následuje finální doladění detailů, pokud již není plná spokojenost po 2. kroku.',
          icon: 'FileEdit',
          image: culturalCenter.id,
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
    title: 'VizualizaceFasad.cz - Profesionální návrhy fasád',
    description:
      'Profesionálně navrhujeme fasády vašich domů. Nechte si ukázat, jak bude váš dům vypadat, ještě před zahájením stavebních prací.',
    image: heroImage.id,
  },
})
