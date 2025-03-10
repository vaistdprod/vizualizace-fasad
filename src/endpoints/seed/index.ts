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
    where: { email: { equals: 'info@vizualizacefasad.cz' } },
  })

  const DEMO_USER_PASSWORD = process.env.DEMO_USER_PASSWORD
  if (!DEMO_USER_PASSWORD) {
    throw new Error('V proměnných chybí hodnota pro DEMO_USER_PASSWORD!')
  }
  await payload.create({
    collection: 'users',
    data: {
      name: 'Admin VizualizaceFasad.cz',
      email: 'info@vizualizacefasad.cz',
      password: DEMO_USER_PASSWORD,
    },
  })

  // Seed media
  payload.logger.info('— Seeding media...')
  const heroBgDoc = await payload.create({
    collection: 'media',
    data: heroBg,
    file: await fetchFileByPath('./fasada-hlavni.jpg'),
  })
  const modernOfficeTowerDoc = await payload.create({
    collection: 'media',
    data: modernOfficeTower,
    file: await fetchFileByPath('./ostrava-pred.jpg'),
  })
  const luxuryResidentialDoc = await payload.create({
    collection: 'media',
    data: luxuryResidential,
    file: await fetchFileByPath('./ostrava-navrh.jpg'),
  })
  const culturalCenterDoc = await payload.create({
    collection: 'media',
    data: culturalCenter,
    file: await fetchFileByPath('./ostrava-po.jpg'),
  })
  const facadeImageDoc = await payload.create({
    collection: 'media',
    data: facadeImage,
    file: await fetchFileByPath('./novostavby.jpg'),
  })
  const threeDImageDoc = await payload.create({
    collection: 'media',
    data: threeDImage,
    file: await fetchFileByPath('./rekonstrukce.jpg'),
  })
  const designImageDoc = await payload.create({
    collection: 'media',
    data: designImage,
    file: await fetchFileByPath('./obklady.jpg'),
  })
  const customImageDoc = await payload.create({
    collection: 'media',
    data: customImage,
    file: await fetchFileByPath('./komercni.jpg'),
  })
  const pricingImageDoc = await payload.create({
    collection: 'media',
    data: pricingImage,
    file: await fetchFileByPath('./cenik.jpg'),
  })
  const modernOfficeDoc = await payload.create({
    collection: 'media',
    data: modernOffice,
    file: await fetchFileByPath('./bukovinka-pred.jpg'),
  })
  const residentialTowerDoc = await payload.create({
    collection: 'media',
    data: residentialTower,
    file: await fetchFileByPath('./bukovinka-navrh.jpg'),
  })
  const corporateHQDoc = await payload.create({
    collection: 'media',
    data: corporateHQ,
    file: await fetchFileByPath('./bukovinka-po.jpg'),
  })
  const multipurposeComplexDoc = await payload.create({
    collection: 'media',
    data: multipurposeComplex,
    file: await fetchFileByPath('./rodinny-dum.jpg'),
  })
  const sustainableOfficeDoc = await payload.create({
    collection: 'media',
    data: sustainableOffice,
    file: await fetchFileByPath('./bytovy-dum.jpg'),
  })
  const luxuryHotelDoc = await payload.create({
    collection: 'media',
    data: luxuryHotel,
    file: await fetchFileByPath('./obklady-ukazka.jpg'),
  })
  const innovationCenterDoc = await payload.create({
    collection: 'media',
    data: innovationCenter,
    file: await fetchFileByPath('./komercni-ukazka.jpg'),
  })
  const contactImageDoc = await payload.create({
    collection: 'media',
    data: contactImage,
    file: await fetchFileByPath('./kontakt.jpg'),
  })
  const sarahImageDoc = await payload.create({
    collection: 'media',
    data: sarahImage,
    file: await fetchFileByPath('./kantor.jpg'),
  })
  const michaelImageDoc = await payload.create({
    collection: 'media',
    data: michaelImage,
    file: await fetchFileByPath('./firma.jpg'),
  })
  const emilyImageDoc = await payload.create({
    collection: 'media',
    data: emilyImage,
    file: await fetchFileByPath('./polaskova.jpg'),
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
      data: {
        id: 1,
        ...headerData,
        topBar: {
          phone: '+420 725 136 901',
          email: 'info@vizualizacefasad.cz',
        },
      } as Header,
      depth: 0,
      context: { disableRevalidate: true },
    }),
    payload.updateGlobal({
      slug: 'footer',
      data: {
        companyInfo: [
          { icon: 'Building2', text: 'Terapeutika – grafika s.r.o' },
          { icon: 'MapPin', text: 'Stará Ves nad Ondřejnicí, Luční 706' },
          { icon: 'Phone', text: '+420 725 136 901' },
          { icon: 'Mail', text: 'info@vizualizacefasad.cz' },
          { icon: 'Building2', text: 'IČO: 04189841' },
        ],
        footerColumns: [
          {
            title: 'Menu',
            links: [
              { label: 'Úvod', url: '/' },
              { label: 'Služby', url: '/sluzby' },
              { label: 'Ceník', url: '/cenik' },
              { label: 'Galerie', url: '/galerie' },
              { label: 'Kontakt', url: '/kontakt' },
            ],
          },
          {
            title: 'Naše služby',
            links: [
              { label: 'Vizualizace fasád novostaveb', url: '/sluzby#novostavby' },
              { label: 'Návrhy rekonstrukcí', url: '/sluzby#rekonstrukce' },
              { label: 'Fasádní obklady', url: '/sluzby#obklady' },
              { label: 'Komerční objekty', url: '/sluzby#komercni' },
            ],
          },
        ],
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
