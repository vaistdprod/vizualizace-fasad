// src/seed/home.ts
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
  slug: 'uvod',
  _status: 'published',
  title: 'studiofasad.cz - Profesionální návrhy fasád',
  layout: [
    {
      blockType: 'landingHero',
      title: 'Profesionálně navrhujeme fasády vašich domů!',
      description:
        'Dokončujete novostavbu? Zateplujete? Děláte rekonstrukci nebo uvažujete o novém nátěru fasády? Nechte si ještě před zahájením stavebních prací ukázat, jak bude dům vypadat.',
      primaryButtonText: 'Nezávazná poptávka',
      primaryButtonHref: '/kontakt',
      secondaryButtonHref: '/sluzby',
      backgroundImage: heroImage.id,
      badgeText: 'Vizualizace fasád',
      scrollIndicator: {
        enabled: true,
        text: 'Více',
      },
    },
    {
      blockType: 'backgroundImage',
      backgroundType: 'gridPattern', // Explicitly grid for this client
      blocks: [
        {
          blockType: 'whyChooseUs',
          badgeText: 'Proč nás zvolit',
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
          blockType: 'aboutServices',
          title: 'O našich službách',
          badgeText: 'Profesionální vizualizace fasád',
          description:
            'Aby výsledný dojem vašeho domu byl přesně podle vašich představ, nechejte si ještě před zahájením stavebních prací ukázat, jak bude dům vypadat, až bude hotový. Máte spoustu možností jak z fasády vašeho domu udělat ozdobu ulice.\n\nBez obav zvolte jednobarevnou fasádu nebo moderní fasádu vícebarevnou. Zakomponujte venkovní obklady. Dřevo, kámen, cihlové obklady to vše může vašemu domu vtisknout punc výjimečnosti.',
          image: heroImage.id,
          layout: 'imageLeft',
          features: [
            {
              title: 'Realistické vizualizace',
              description:
                'Naše návrhy jsou fotorealistické a poskytují přesnou představu o výsledku.',
              icon: 'image',
            },
            {
              title: 'Více variant',
              description:
                'Vytvoříme několik variant, abyste si mohli vybrat tu nejlepší pro váš dům.',
              icon: 'layers',
            },
            {
              title: 'Odborné poradenství',
              description:
                'Poskytneme vám odborné rady ohledně materiálů, barev a designových trendů.',
              icon: 'star',
            },
            {
              title: 'Snadná komunikace',
              description:
                'S grafickým návrhem bude komunikace s realizační firmou mnohem jednodušší.',
              icon: 'message-circle',
            },
          ],
          cta: {
            enabled: true,
            text: 'Nezávazná poptávka',
            link: '/kontakt',
          },
        },
        {
          blockType: 'partnershipProcess',
          title: 'Jak bude spolupráce probíhat?',
          description: 'Mám zájem o vizualizaci návrhu fasády. Jak bude spolupráce probíhat?',
          steps: [
            {
              number: 1,
              title: 'Nezávazná nabídka',
              description:
                'Zdarma a nezávazně vytvoříme cenovou nabídku vizualizace návrhu fasády. Prostřednictvím poptávkového formuláře zašlete prosím fotografie domu do nichž požadujete vizualizovat fasádu.',
              icon: 'Camera',
              image: modernOfficeTower.id,
            },
            {
              number: 2,
              title: 'Potvrzení a kalkulace',
              description:
                'Jakmile k nám údaje dorazí, zasíláme potvrzovací email, v některých případech vás poprosíme o doplňující informace. Nyní vytvoříme cenovou kalkulaci vaší zakázky.',
              icon: 'FileEdit',
              image: luxuryResidential.id,
            },
            {
              number: 3,
              title: 'Proces vizualizace',
              description:
                'Samotná vizualizace probíhá ve 3 krocích tak, že nejprve zasíláme 1. sérii konceptů (5-10 návrhů), z nichž vyberete prvky, motivy a barvy jenž se Vám líbí.',
              icon: 'ImageIcon',
              image: culturalCenter.id,
            },
            {
              number: 4,
              title: 'Dokončení a platba',
              description:
                'První série návrhů jsou zpravidla do 5 pracovních dní hotové. Poté, co jsou návrhy fasády ve formátu JPG nachystány k elektronickému odeslání, zašleme vám email s výzvou k platbě.',
              icon: 'CreditCard',
              image: heroImage.id,
            },
          ],
          visualizationDetail: {
            heading: 'Postup návrhů',
            description:
              'Samotná vizualizace probíhá ve 3 krocích, které vám zaručí spokojenost s výsledkem',
            phases: [
              {
                title: 'Úvodní koncepty',
                subtitle: 'Připravíme 5 - 10 návrhů',
                number: 1,
              },
              {
                title: 'Série návrhů',
                subtitle: 'Obdržíte 6 variant vizualizací',
                number: 2,
              },
              {
                title: 'Finální návrh',
                subtitle: '1 finální vizualizace',
                number: 3,
              },
            ],
            timeframe: 'Celý proces trvá přibližně 5-7 pracovních dní',
          },
        },
        {
          blockType: 'contactSection',
          heading: 'Kontaktujte nás',
          description: 'Máte otázku nebo chcete začít spolupráci? Napište nám!',
          contactItems: [
            {
              icon: 'Mail',
              label: 'E-mail',
              value: 'info@vizualizacefasad.cz',
            },
            {
              icon: 'Phone',
              label: 'Telefon',
              value: '+420 725 136 901',
            },
          ],
          form: contactForm.id,
          enableIntro: false,
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
    },
  ],
  meta: {
    title: 'studiofasad.cz - Profesionální návrhy fasád',
    description:
      'Profesionálně navrhujeme fasády vašich domů. Realistické vizualizace pro novostavby a rekonstrukce.',
    image: heroImage.id,
    keywords:
      'vizualizace fasád, návrhy fasád, fasády novostaveb, rekonstrukce fasád, zateplení fasády, fasádní obklady, studiofasad.cz',
  },
})
