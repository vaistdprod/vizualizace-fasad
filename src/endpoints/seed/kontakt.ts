import type { RequiredDataFromCollectionSlug } from 'payload'
import type { Media, Form } from '@/payload-types'

type KontaktArgs = {
  dumKamen: Media
  contactForm: Form
}

export const kontakt: (args: KontaktArgs) => RequiredDataFromCollectionSlug<'pages'> = ({
  dumKamen,
  contactForm,
}) => ({
  slug: 'kontakt-cenik',
  _status: 'published',
  title: 'Kontaktujte nás',
  layout: [
    {
      blockType: 'backgroundImage',
      backgroundType: 'gridPattern',
      blocks: [
        {
          blockType: 'pricingPlans',
          badgeText: 'Ceník',
          heading: 'Ceník návrhů fasád',
          description:
            'Ceny vypracování návrhu fasády jsou individuální a odvíjejí se od požadavků klienta. Chcete vědět kolik vás bude vizualizace stát právě pro váš dům? Pošlete fotografie domu a vaše představy a požadavky, rádi vám nezávazně vypracujeme cenovou nabídku. Pro vaši prvotní představu uvádíme výchozí ceník našich služeb. Zpracování fotografií nebo výkresů na dům v šesti barevných provedeních.',
          buttonText: 'Objednat',
          buttonHref: '/kontakt',
          afterPricingText:
            'Uvedené ceny jsou orientační a mohou se lišit v závislosti na složitosti projektu. Pro větší projekty nebo specifické požadavky nabízíme individuální kalkulaci. Neváhejte nás kontaktovat pro nezávaznou konzultaci a přesnou cenovou nabídku na míru vašim potřebám.',
          primaryButton: {
            enabled: true,
            text: 'Nezávazná poptávka',
            link: '/kontakt',
          },
          secondaryButton: {
            enabled: true,
            text: 'Více informací o procesu',
            link: '/',
          },
          options: [
            {
              count: 1,
              base: 2400,
              discount: 10,
              final: 2180,
              fee: 500,
              concepts: 10,
              series: 6,
              adjust: 1,
            },
            {
              count: 2,
              base: 4200,
              discount: 15,
              final: 3570,
              fee: 1000,
              concepts: 10,
              series: 6,
              adjust: 1,
            },
            {
              count: 3,
              base: 6000,
              discount: 20,
              final: 4800,
              fee: 1500,
              concepts: 10,
              series: 6,
              adjust: 1,
            },
          ],
          tableHeaders: {
            service: 'Služba',
            concepts: 'variant v úvodních konceptech',
            series: 'variant ve 2. sérii',
            adjust: 'finální úprava',
            fee: 'Příplatek za obkladové materiály',
          },
          labels: {
            discount: 'SLEVA',
            photo: 'fotografie',
            photos: 'fotografie',
            currency: 'Kč',
            from: 'od',
            for: 'za',
          },
          note: 'Ceny jsou konečné. Nejsme plátci DPH.',
        },
        {
          blockType: 'contactSection',
          badgeText: 'Kontaktujte nás',
          heading: 'Máte zájem o cenovou nabídku?',
          description:
            'Pošlete nám fotografie vašeho domu a my připravíme nezávaznou cenovou nabídku na míru. Nezávazně a ZDARMA.',
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
        {
          blockType: 'teamSection',
          title: 'Náš tým',
          description: 'Seznamte se s našimi odborníky na vizualizace fasád.',
          team: [
            {
              name: 'Ing. Jan Kantor',
              role: 'Návrhy, design, obchod',
              email: 'kantor@vizualizacefasad.cz',
              phone: '+420 725 136 901',
            },
            {
              name: 'Zuzana Polášková',
              role: 'Návrhy, design',
              email: 'info@vizualizacefasad.cz',
              phone: '+420 725 136 901',
            },
          ],
        },
      ],
    },
  ],
  meta: {
    title: 'Kontakt a ceník návrhů fasád - studiofasad.cz',
    description:
      'Kontaktujte nás pro profesionální návrhy a vizualizace fasád vašich domů. Ceník návrhů a vizualizací fasád pro rodinné domy, bytové domy a komerční objekty.',
    image: dumKamen.id,
    keywords:
      'ceník fasád, cena vizualizace fasády, návrhy fasád cena, studiofasad.cz, rodinný dům fasáda cena, komerční fasády cena, kontakt studiofasad.cz, vizualizace fasád kontakt, návrhy fasád kontakt, info@vizualizacefasad.cz, +420 725 136 901',
  },
})
