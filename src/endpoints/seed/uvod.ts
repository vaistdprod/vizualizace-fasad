// src/endpoints/seed/uvod.ts
import type { RequiredDataFromCollectionSlug } from 'payload'
import type { Media, Form } from '@/payload-types'

type UvodArgs = {
  heroImage: Media
  contactForm: Form
}

export const uvod: (args: UvodArgs) => RequiredDataFromCollectionSlug<'pages'> = ({
  heroImage,
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
      secondaryButtonHref: '/',
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
              icon: 'Award',
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
          afterProjectsText:
            'Více návrhů a vizualizací z naší dílny stejně tak jako ukázky hotových realizací fasád dle návrhu od nás jsou pro vás k nahlédnutí v naší fotogalerii.',
          primaryButton: {
            enabled: true,
            text: 'Zobrazit více projektů',
            link: '/fotogalerie-fasad',
          },
          secondaryButton: {
            enabled: true,
            text: 'Nezávazná poptávka',
            link: '/kontakt',
          },
        },
        {
          blockType: 'aboutServices',
          title: 'Proč využít vizualizaci fasády?',
          description:
            'Aby výsledný dojem vašeho domu byl přesně podle vašich představ nechejte si ještě před zahájením stavebních prací ukázat, jak bude dům vypadat, až bude hotový. Vizualizací návrhu fasády do fotografie získáte jasnou představu o tom, jak následná realizace bude vypadat a nemusíte se již obávat výsledku. To vám rovněž usnadní komunikaci s realizační firmou.\n\nMáte spoustu možností jak z fasády vašeho domu udělat ozdobu ulice. Bez obav zvolte jednobarevnou fasádu nebo moderní fasádu vícebarevnou. Zakomponujte venkovní obklady. Dřevo, kámen, cihlové obklady to vše může vašemu domu vtisknout punc výjimečnosti.\n\nBylo by chybou nezkusit více variant toho, co by vašemu domu mohlo slušet. Vizualizací návrhu fasády do fotografie. Bez obav. S vašimi i našimi nápady. Za rozumnou cenu.',
          image: heroImage.id,
          layout: 'imageRight',
          features: [
            {
              title: 'Jasná představa',
              description: 'S grafickým návrhem budete mít jasnou představu o výsledku.',
              icon: 'image',
            },
            {
              title: 'Více variant',
              description:
                'Vyzkoušíte různé barevné kombinace a materiály, abyste mohli vybrat tu nejlepší pro váš dům.',
              icon: 'layers',
            },
            {
              title: 'Odborné poradenství',
              description:
                'Poskytneme vám odborné rady ohledně materiálů, barev a designových trendů.',
              icon: 'settings',
            },
            {
              title: 'Snadná komunikace',
              description: 'Grafický návrh vám usnadní komunikaci s realizační firmou.',
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
          title: 'Jak probíhá spolupráce?',
          description: 'Mám zájem o vizualizaci návrhu fasády. Jak bude spolupráce probíhat?',
          steps: [
            {
              number: 1,
              title: 'Nezávazná nabídka',
              description:
                'Zdarma a nezávazně vytvoříme cenovou nabídku vizualizace návrhu fasády. Prostřednictvím poptávkového formuláře zašlete prosím fotografie domu do nichž požadujete vizualizovat fasádu. Pokud je to možné, pořiďte fotografie bez stínících prvků jako jsou stromy, sloupy, postavy a podobně.\n\nDo poptávkového formuláře rovněž uveďte informace o představách, jak by měla fasáda domu vypadat, máte-li již nějaké. Pokud Vás mezi našimi referenčními návrhy zaujaly některé konkrétní barvy či prvky, uveďte je spolu s označením fotografie v referencích do požadavků. Pro snadnější orientaci v možnostech návrhu fasády jsme pro vás připravili "PRŮVODCE NÁVRHEM". V případě, že budete potřebovat další informace neváhejte se na nás obrátit:',
              icon: 'Camera',
              image: heroImage.id, // Swapped to heroImage since project images are gone
            },
            {
              number: 2,
              title: 'Potvrzení a kalkulace',
              description:
                'Jakmile k nám údaje dorazí, zasíláme potvrzovací e-mail, v některých případech vás poprosíme o doplňující informace. Nyní vytvoříme cenovou kalkulaci vaší zakázky. V případě, že s cenou budete souhlasit začneme ihned tvořit vizualizace návrhů.',
              icon: 'FileEdit',
              image: heroImage.id, // Swapped to heroImage
            },
            {
              number: 3,
              title: 'Proces vizualizace',
              description:
                'Samotná vizualizace probíhá ve 3 krocích tak, že nejprve zasíláme 1. sérii konceptů (5-10 návrhů), z nichž vyberete prvky, motivy a barvy jenž se Vám líbí. Na jejich základě a dle Vašich připomínek vytvoříme 2. sérii návrhů (6 variant) a poté následuje finální doladění detailů (pokud již není plná spokojenost po 2. kroku).',
              icon: 'ImageIcon',
              image: heroImage.id, // Swapped to heroImage
            },
            {
              number: 4,
              title: 'Dokončení a platba',
              description:
                'První série návrhů jsou zpravidla do 5 pracovních dní hotové. Poté, co jsou návrhy fasády ve formátu JPG nachystány k elektronickému odeslání, zašleme vám email s výzvou k platbě. Návrhy zasíláme ihned po přijetí platby na náš účet.',
              icon: 'CreditCard',
              image: heroImage.id,
            },
          ],
          vizDetail: {
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
          badgeText: 'Kontaktujte nás',
          heading: 'Poptávka cenové nabídky',
          description:
            'Pošlete nám fotografie vašeho domu, my připravíme cenovou nabídku přesně na míru. Nezávazně a ZDARMA.',
          contactTitle: 'Kontaktní informace',
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
            {
              icon: 'MapPin',
              label: 'Adresa',
              value: 'Stará Ves nad Ondřejnicí, Luční 706',
            },
            {
              icon: 'Building',
              label: 'IČO',
              value: '04189841',
            },
          ],
          form: contactForm.id,
          enableIntro: false,
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
