import type { RequiredDataFromCollectionSlug } from 'payload'
import type { Media, Form } from '@/payload-types'

type PoptavkaArgs = {
  contactImage: Media
  contactForm: Form
}

export const poptavka: (args: PoptavkaArgs) => RequiredDataFromCollectionSlug<'pages'> = ({
  contactImage,
  contactForm,
}) => ({
  slug: 'poptavka',
  _status: 'published',
  title: 'Poptávka',
  layout: [
    {
      blockType: 'backgroundImage',
      backgroundType: 'gridPattern',
      blocks: [
        {
          blockType: 'contactSection',
          badgeText: 'Poptávka',
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
      ],
    },
  ],
  meta: {
    title: 'Poptávka vizualizace fasády - studiofasad.cz',
    description:
      'Poptejte profesionální návrhy a vizualizace fasád vašich domů. Nezávazná poptávka pro vizualizace fasád rodinných domů, bytových domů a komerčních objektů.',
    image: contactImage.id,
    keywords:
      'poptávka fasády, poptávka vizualizace fasády, návrhy fasád poptávka, studiofasad.cz, rodinný dům fasáda poptávka, komerční fasády poptávka, vizualizace fasád poptávka, návrhy fasád poptávka, info@vizualizacefasad.cz, +420 725 136 901',
  },
})
