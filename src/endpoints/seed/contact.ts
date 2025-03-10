import type { RequiredDataFromCollectionSlug } from 'payload'
import type { Media, Form } from '@/payload-types'

type ContactArgs = {
  contactImage: Media
  sarahImage: Media
  michaelImage: Media
  emilyImage: Media
  contactForm: Form
}

export const contact: (args: ContactArgs) => RequiredDataFromCollectionSlug<'pages'> = ({
  contactImage,
  sarahImage,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  michaelImage,
  emilyImage,
  contactForm,
}) => ({
  slug: 'kontakt',
  _status: 'published',
  title: 'Kontaktujte nás',
  layout: [
    {
      blockType: 'contactInfo',
      title: 'Kontaktní informace',
      items: [
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
    },
    {
      blockType: 'formBlock',
      form: contactForm.id,
      enableIntro: false,
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
          image: sarahImage.id,
        },
        {
          name: 'Zuzana Polášková',
          role: 'Návrhy, design',
          email: 'info@vizualizacefasad.cz',
          phone: '+420 725 136 901',
          image: emilyImage.id,
        },
      ],
    },
  ],
  meta: {
    title: 'Kontakt - VizualizaceFasad.cz',
    description: 'Kontaktujte nás pro profesionální návrhy a vizualizace fasád vašich domů.',
    image: contactImage.id,
  },
})
