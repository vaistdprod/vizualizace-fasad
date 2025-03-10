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
          value: 'contact@facadevision.com',
        },
        {
          icon: 'Phone',
          label: 'Telefon',
          value: '+1 (555) 123-4567',
        },
        {
          icon: 'MapPin',
          label: 'Adresa',
          value: '123 Design District, New York, NY 10001',
        },
        {
          icon: 'Clock',
          label: 'Otevírací doba',
          value: 'Po-Pá: 9:00 - 18:00 EST',
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
      description:
        'Seznamte se s experty stojícími za našimi působivými architektonickými vizualizacemi.',
      team: [
        {
          name: 'Sarah Johnson',
          role: 'Vedoucí vizualizační umělkyně',
          email: 'sarah@facadevision.com',
          phone: '+1 (555) 234-5678',
          image: sarahImage.id,
        },
        {
          name: 'Michael Chen',
          role: 'Technický ředitel',
          email: 'michael@facadevision.com',
          phone: '+1 (555) 345-6789',
          image: michaelImage.id,
        },
        {
          name: 'Emily Rodriguez',
          role: 'Manažerka klientských vztahů',
          email: 'emily@facadevision.com',
          phone: '+1 (555) 456-7890',
          image: emilyImage.id,
        },
      ],
    },
  ],
  meta: {
    title: 'Kontakt - FacadeVision',
    description: 'Spojte se s naším týmem pro vaše vizualizační potřeby.',
    image: contactImage.id,
  },
})
