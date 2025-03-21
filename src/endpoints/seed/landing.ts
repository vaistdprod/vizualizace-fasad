import type { RequiredDataFromCollectionSlug } from 'payload'
import type { Media, Form } from '@/payload-types'

type LandingArgs = {
  rodinnyDum: Media
  contactForm: Form
}

export const landing: (args: LandingArgs) => RequiredDataFromCollectionSlug<'pages'> = ({
  rodinnyDum,
  contactForm,
}) => ({
  slug: 'fasady',
  _status: 'published',
  title: 'Landing page',
  layout: [
    {
      blockType: 'landingHero',
      title: 'Proměňte svou architektonickou vizi v realitu',
      description:
        'Profesionální služby vizualizace fasád s dodáním do 5 pracovních dní. Oživte svůj dům novou fasádou a mějte jistotu, že bude taková, jakou si ji představujete!',
      primaryButtonText: 'Získat nabídku zdarma',
      primaryButtonHref: '#kontaktni-formular',
      secondaryButtonText: 'Zobrazit portfolio',
      secondaryButtonHref: '/fotogalerie-fasad',
      backgroundImage: rodinnyDum.id,
      badgeText: 'Vizualizace fasád',
      scrollIndicator: {
        enabled: true,
        text: 'Více',
      },
    },
    {
      blockType: 'backgroundImage',
      backgroundType: 'gridPattern',
      blocks: [
        {
          blockType: 'trustBadges',
          stats: [
            { value: '1000+', label: 'Dokončených projektů' },
            { value: '99%', label: 'Spokojenost klientů' },
            { value: '15+', label: 'Let zkušeností' },
            { value: '5 dní', label: 'Doba dodání' },
          ],
        },
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
          blockType: 'conversionBlock',
          badgeText: 'Výhodná nabídka',
          headline: 'Získejte profesionální vizualizaci fasády',
          subheading:
            'Připojte se ke stovkám spokojených zákazníků a proměňte svůj dům s našimi fotorealistickými vizualizacemi.',
          originalPrice: 6000,
          discountPrice: 'od 4800',
          discountPercentage: 20,
          currency: 'Kč',
          urgencyText: 'Pospěšte si, nabídka je časově omezená!',
          primaryCTA: {
            text: 'Získat nabídku',
            href: '#kontaktni-formular',
          },
          secondaryCTA: {
            text: 'Kompletní ceník',
            href: '/kontakt-cenik',
          },
          trustBadges: [
            {
              icon: 'ShieldCheck',
              text: '100% garance spokojenosti',
            },
            {
              icon: 'CheckCircle',
              text: 'Více než 1000 spokojených klientů',
            },
            {
              icon: 'Clock',
              text: 'Dodání do 5 dní',
            },
          ],
          testimonial: {
            quote:
              'Proměnili náš nápad v perfektní vizualizace, které nám pomohly ušetřit statisíce na nepovedených fasádách.',
            name: 'Matěj Vais',
            role: 'Majitel rodinného domu',
          },
          packageDetails: {
            title: '3 fotografie',
            features: [
              { text: '10 variant v úvodních konceptech' },
              { text: '6 variant ve 2. sérii' },
              { text: '1 finální úprava' },
            ],
            additionalFeeText: '+ 1500 Kč za obkladové materiály',
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
          enableContactContent: true,
          contactContent:
            'Maximální velikost každého přiloženého souboru v poptávkovém formuláři může být 5MB. Máte-li větší fotografie, použijte pro komunikaci s námi e-mailovou adresu info@vizualizacefasad.cz.\n\nNečekejte až budou řemeslníci stavět lešení. Mějte jasno o podobě fasády vašeho domu ještě před tím.',
        },
      ],
    },
  ],
  meta: {
    title: 'Vizualizace a návrhy fasád - studiofasad.cz',
    description:
      'Profesionální vizualizace fasád s dodáním do 5 dní. Kontaktujte nás pro cenovou nabídku zdarma.',
    image: rodinnyDum.id,
    keywords:
      'vizualizace fasád, fotorealistické vizualizace, studiofasad.cz, návrhy fasád, rychlé vizualizace, architektonické vizualizace',
  },
})
