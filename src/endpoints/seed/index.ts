import type { CollectionSlug, GlobalSlug, Payload, PayloadRequest, File } from 'payload'
import { home } from './home'
import { services } from './services'
import { pricing } from './pricing'
import { gallery } from './gallery'
import { contact } from './contact'
import {
  heroBg,
  modernOfficeTower,
  luxuryResidential,
  culturalCenter,
  facadeImage,
  threeDImage,
  designImage,
  customImage,
  pricingImage,
  modernOffice,
  residentialTower,
  corporateHQ,
  multipurposeComplex,
  sustainableOffice,
  luxuryHotel,
  innovationCenter,
  contactImage,
  sarahImage,
  michaelImage,
  emilyImage,
} from './images'
import { contactForm } from './contact-form'
import type { Header } from '@/payload-types'
import { fileURLToPath } from 'url'

const collections: CollectionSlug[] = [
  'categories',
  'media',
  'pages',
  'forms',
  'form-submissions',
  'users',
]

const globals: GlobalSlug[] = ['header', 'footer']

export const seed = async ({
  payload,
  req,
}: {
  payload: Payload
  req: PayloadRequest
}): Promise<void> => {
  payload.logger.info('Seeding database...')

  // Clear globals
  payload.logger.info('— Clearing globals...')
  await Promise.all(
    globals.map(async (global) => {
      try {
        if (global === 'header') {
          await payload.db.drizzle.delete(payload.db.tables.header).execute()
        } else if (global === 'footer') {
          await payload.db.drizzle.delete(payload.db.tables.footer).execute()
        }
      } catch (err) {
        payload.logger.error(`Error clearing global ${global}: ${err}`)
      }
    }),
  )

  // Clear collections
  payload.logger.info('— Clearing collections...')
  await Promise.all(
    collections.map((collection) => payload.db.deleteMany({ collection, req, where: {} })),
  )
  await Promise.all(
    collections
      .filter((collection) => Boolean(payload.collections[collection].config.versions))
      .map((collection) => payload.db.deleteVersions({ collection, req, where: {} })),
  )

  // Seed demo user
  payload.logger.info('— Seeding demo user...')
  await payload.delete({
    collection: 'users',
    depth: 0,
    where: { email: { equals: 'admin@facadevision.com' } },
  })

  const DEMO_USER_PASSWORD = process.env.DEMO_USER_PASSWORD
  if (!DEMO_USER_PASSWORD) {
    throw new Error('V proměnných chybí hodnota pro DEMO_USER_PASSWORD!')
  }
  await payload.create({
    collection: 'users',
    data: {
      name: 'Admin FacadeVision',
      email: 'admin@facadevision.com',
      password: DEMO_USER_PASSWORD,
    },
  })

  // Seed media
  payload.logger.info('— Seeding media...')
  const heroBgDoc = await payload.create({
    collection: 'media',
    data: heroBg,
    file: await fetchFileByPath('./hero-bg.jpg'),
  })
  const modernOfficeTowerDoc = await payload.create({
    collection: 'media',
    data: modernOfficeTower,
    file: await fetchFileByPath('./modern-office-tower.jpg'),
  })
  const luxuryResidentialDoc = await payload.create({
    collection: 'media',
    data: luxuryResidential,
    file: await fetchFileByPath('./luxury-residential.jpg'),
  })
  const culturalCenterDoc = await payload.create({
    collection: 'media',
    data: culturalCenter,
    file: await fetchFileByPath('./cultural-center.jpg'),
  })
  const facadeImageDoc = await payload.create({
    collection: 'media',
    data: facadeImage,
    file: await fetchFileByPath('./facade-image.jpg'),
  })
  const threeDImageDoc = await payload.create({
    collection: 'media',
    data: threeDImage,
    file: await fetchFileByPath('./three-d-image.jpg'),
  })
  const designImageDoc = await payload.create({
    collection: 'media',
    data: designImage,
    file: await fetchFileByPath('./design-image.jpg'),
  })
  const customImageDoc = await payload.create({
    collection: 'media',
    data: customImage,
    file: await fetchFileByPath('./custom-image.jpg'),
  })
  const pricingImageDoc = await payload.create({
    collection: 'media',
    data: pricingImage,
    file: await fetchFileByPath('./pricing-image.jpg'),
  })
  const modernOfficeDoc = await payload.create({
    collection: 'media',
    data: modernOffice,
    file: await fetchFileByPath('./modern-office.jpg'),
  })
  const residentialTowerDoc = await payload.create({
    collection: 'media',
    data: residentialTower,
    file: await fetchFileByPath('./residential-tower.jpg'),
  })
  const corporateHQDoc = await payload.create({
    collection: 'media',
    data: corporateHQ,
    file: await fetchFileByPath('./corporate-hq.jpg'),
  })
  const multipurposeComplexDoc = await payload.create({
    collection: 'media',
    data: multipurposeComplex,
    file: await fetchFileByPath('./multipurpose-complex.jpg'),
  })
  const sustainableOfficeDoc = await payload.create({
    collection: 'media',
    data: sustainableOffice,
    file: await fetchFileByPath('./sustainable-office.jpg'),
  })
  const luxuryHotelDoc = await payload.create({
    collection: 'media',
    data: luxuryHotel,
    file: await fetchFileByPath('./luxury-hotel.jpg'),
  })
  const innovationCenterDoc = await payload.create({
    collection: 'media',
    data: innovationCenter,
    file: await fetchFileByPath('./innovation-center.jpg'),
  })
  const contactImageDoc = await payload.create({
    collection: 'media',
    data: contactImage,
    file: await fetchFileByPath('./contact-image.jpg'),
  })
  const sarahImageDoc = await payload.create({
    collection: 'media',
    data: sarahImage,
    file: await fetchFileByPath('./sarah-image.jpg'),
  })
  const michaelImageDoc = await payload.create({
    collection: 'media',
    data: michaelImage,
    file: await fetchFileByPath('./michael-image.jpg'),
  })
  const emilyImageDoc = await payload.create({
    collection: 'media',
    data: emilyImage,
    file: await fetchFileByPath('./emily-image.jpg'),
  })

  // Seed contact form
  payload.logger.info('— Seeding contact form...')
  const contactFormDoc = await payload.create({
    collection: 'forms',
    data: contactForm,
  })

  // Seed pages
  payload.logger.info('— Seeding pages...')
  await payload.create({
    collection: 'pages',
    depth: 3,
    data: home({
      heroImage: heroBgDoc,
      modernOfficeTower: modernOfficeTowerDoc,
      luxuryResidential: luxuryResidentialDoc,
      culturalCenter: culturalCenterDoc,
      contactForm: contactFormDoc,
    }),
  })
  await payload.create({
    collection: 'pages',
    depth: 3,
    data: services({
      facadeImage: facadeImageDoc,
      threeDImage: threeDImageDoc,
      designImage: designImageDoc,
      customImage: customImageDoc,
    }),
  })
  await payload.create({
    collection: 'pages',
    depth: 3,
    data: pricing({
      pricingImage: pricingImageDoc,
    }),
  })
  await payload.create({
    collection: 'pages',
    depth: 3,
    data: gallery({
      modernOffice: modernOfficeDoc,
      culturalCenter: culturalCenterDoc,
      residentialTower: residentialTowerDoc,
      corporateHQ: corporateHQDoc,
      multipurposeComplex: multipurposeComplexDoc,
      sustainableOffice: sustainableOfficeDoc,
      luxuryHotel: luxuryHotelDoc,
      innovationCenter: innovationCenterDoc,
    }),
  })
  await payload.create({
    collection: 'pages',
    depth: 3,
    data: contact({
      contactImage: contactImageDoc,
      sarahImage: sarahImageDoc,
      michaelImage: michaelImageDoc,
      emilyImage: emilyImageDoc,
      contactForm: contactFormDoc,
    }),
  })

  // Seed globals (header and footer)
  payload.logger.info('— Seeding globals...')
  const navigation = [
    { label: 'Úvod', url: '/' },
    { label: 'Služby', url: '/sluzby' },
    { label: 'Ceník', url: '/cenik' },
    { label: 'Galerie', url: '/galerie' },
    { label: 'Kontakt', url: '/kontakt' },
  ]
  const headerData = {
    navItems: navigation.map((item) => ({
      link: { type: 'custom' as const, label: item.label, url: item.url },
    })),
  }
  await Promise.all([
    payload.updateGlobal({
      slug: 'header',
      data: headerData as Header,
      depth: 0,
      context: { disableRevalidate: true },
    }),
    payload.updateGlobal({
      slug: 'footer',
      data: {
        companyInfo: [
          { icon: 'Building2', text: 'FacadeVision Ltd.' },
          { icon: 'MapPin', text: '123 Architecture Plaza, Design District, NY 10001' },
          { icon: 'Phone', text: '+1 (555) 123-4567' },
          { icon: 'Mail', text: 'contact@facadevision.com' },
          { icon: 'Clock', text: 'Mon-Fri: 9:00 AM - 6:00 PM EST' },
        ],
        footerColumns: [
          {
            title: 'Rychlé odkazy',
            links: [
              { label: 'O nás', url: '/about' },
              { label: 'Služby', url: '/sluzby' },
              { label: 'Galerie', url: '/galerie' },
              { label: 'Ceník', url: '/cenik' },
              { label: 'Kontakt', url: '/kontakt' },
            ],
          },
          {
            title: 'Naše služby',
            links: [
              { label: 'Vizualizace fasád', url: '/sluzby#facade' },
              { label: '3D vizualizace', url: '/sluzby#3d' },
              { label: 'Vizualizace interiérů', url: '/sluzby#interior' },
              { label: 'Architektonické animace', url: '/sluzby#animation' },
              { label: 'Virtuální prohlídky', url: '/sluzby#vr' },
            ],
          },
        ],
        newsletter: {
          title: 'Zůstaňte v obraze',
          description:
            'Přihlaste se k odběru novinek o trendech a aktualizacích v architektonické vizualizaci.',
          buttonText: 'Přihlásit k odběru',
        },
      },
      depth: 0,
      context: { disableRevalidate: true },
    }),
  ])

  payload.logger.info('Seeded database successfully!')
}

async function fetchFileByPath(filePath: string): Promise<File> {
  const { readFile } = await import('fs/promises')
  const path = await import('path')
  const __filename = fileURLToPath(import.meta.url)
  const __dirname = path.dirname(__filename)
  const fullPath = path.resolve(__dirname, filePath)
  const data = await readFile(fullPath)
  let mimeType: string
  if (filePath.endsWith('.jpg') || filePath.endsWith('.jpeg')) {
    mimeType = 'image/jpeg'
  } else if (filePath.endsWith('.png')) {
    mimeType = 'image/png'
  } else {
    mimeType = 'image/jpeg' // Default to JPEG
  }
  return {
    name: path.basename(filePath),
    data,
    mimetype: mimeType,
    size: data.length,
  }
}
