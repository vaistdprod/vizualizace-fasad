// src/endpoints/seed/index.ts
import type { CollectionSlug, GlobalSlug, Payload, PayloadRequest, File } from 'payload'
import { uvod } from './uvod'
import { fotogalerie } from './fotogalerie'
import { kontakt } from './kontakt'
import { landing } from './landing'
import { poptavka } from './poptavka'
import { heroBg, contactImage, landingHeroImage, modernOffice } from './images'
import { contactForm } from './contact-form'
import { seedProjects } from './projects' // Add this import
import type { Header } from '@/payload-types'
import { fileURLToPath } from 'url'

const collections: CollectionSlug[] = ['categories', 'media', 'pages', 'forms', 'users', 'projects'] // Add 'projects'
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
      name: 'Admin studiofasad.cz',
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
  const modernOfficeDoc = await payload.create({
    collection: 'media',
    data: modernOffice,
    file: await fetchFileByPath('./bukovinka-pred.jpg'),
  })
  const contactImageDoc = await payload.create({
    collection: 'media',
    data: contactImage,
    file: await fetchFileByPath('./kontakt.jpg'),
  })
  const landingHeroImageDoc = await payload.create({
    collection: 'media',
    data: landingHeroImage,
    file: await fetchFileByPath('./landing-hero.jpg'),
  })

  // Seed projects
  await seedProjects(payload) // Add this call

  // Seed forms
  payload.logger.info('— Seeding forms...')
  const contactFormDoc = await payload.create({
    collection: 'forms',
    data: contactForm,
  })

  // Seed pages
  payload.logger.info('— Seeding pages...')
  await payload.create({
    collection: 'pages',
    depth: 3,
    data: uvod({
      heroImage: heroBgDoc,
      contactForm: contactFormDoc,
    }),
  })
  await payload.create({
    collection: 'pages',
    depth: 3,
    data: fotogalerie({
      modernOffice: modernOfficeDoc,
    }),
  })
  await payload.create({
    collection: 'pages',
    depth: 3,
    data: kontakt({
      contactImage: contactImageDoc,
      contactForm: contactFormDoc,
    }),
  })
  await payload.create({
    collection: 'pages',
    depth: 3,
    data: landing({
      landingHeroImage: landingHeroImageDoc,
      contactForm: contactFormDoc,
    }),
  })
  await payload.create({
    collection: 'pages',
    depth: 3,
    data: poptavka({
      contactImage: contactImageDoc,
      contactForm: contactFormDoc,
    }),
  })

  // Seed globals (header and footer)
  payload.logger.info('— Seeding globals...')
  const navigation = [
    { label: 'Fasády', url: '/fasady' },
    { label: 'Fotogalerie fasád', url: '/fotogalerie-fasad' },
    { label: 'Kontakt a ceník', url: '/kontakt-cenik' },
    { label: 'Poptávka', url: '/poptavka' },
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
        logoSvg: `redacted for brevity`,
      } as Header,
      depth: 0,
      context: { disableRevalidate: true },
    }),
    payload.updateGlobal({
      slug: 'footer',
      data: {
        logoSvg: `redacted for brevity`,
        companyInfo: [
          { icon: 'Building2', text: 'Terapeutika – grafika s.r.o' },
          { icon: 'MapPin', text: 'Stará Ves nad Ondřejnicí, Luční 706' },
          { icon: 'Phone', text: '+420 725 136 901' },
          { icon: 'Mail', text: 'info@vizualizacefasad.cz' },
          { icon: 'Briefcase', text: 'IČO: 04189841' },
        ],
        footerColumns: [
          {
            title: 'Menu',
            links: [
              { label: 'Fasády', url: '/fasady' },
              { label: 'Fotogalerie fasád', url: '/fotogalerie-fasad' },
              { label: 'Kontakt a ceník', url: '/kontakt-cenik' },
              { label: 'Poptávka', url: '/poptavka' },
            ],
          },
          {
            title: 'Naše služby',
          },
        ],
      },
      depth: 0,
      context: { disableRevalidate: true },
    }),
  ])

  payload.logger.info('Seeded database successfully!')
}

export async function fetchFileByPath(filePath: string): Promise<File> {
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
  } else if (filePath.endsWith('.svg')) {
    mimeType = 'image/svg+xml'
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
