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
        logoSvg: `<svg version="1.2" xmlns="http://www.w3.org/2000/svg" viewBox="40.9 61.3 117.7 78"><style>.a{fill:#fea621}.b{fill:#00a0c6}.c{fill:#f00}.d{fill:#bf6000}.e{fill:#610006}.f{fill:#205315}.g{fill:#0a003e}.h{fill:#40a629}.j{fill:var(--color-foreground)}</style><path class="a" d="m74.9 112.7l17-17 8.5 8.5-17 17z"></path><path class="b" d="m100.4 87.2l4.4-4.4 8.5 8.5-4.4 4.4z"></path><path class="c" d="m62 99.7l16.9-16.9 8.6 8.5-17 17z"></path><path class="c" d="m87.5 74.3l4.4-4.5 8.5 8.5-4.4 4.5z"></path><path class="d" d="m91.9 95.7l8.5-8.5 8.5 8.5-8.5 8.5z"></path><path class="a" d="m117.4 121.2l-17-17 8.5-8.5 17 17z"></path><path class="e" d="m78.9 82.8l8.6-8.5 8.5 8.5-8.5 8.5z"></path><path class="a" d="m91.9 95.7l-4.4-4.4 8.5-8.5 4.4 4.4z"></path><path class="f" d="m91.9 69.8l8.5-8.5 8.5 8.5-8.5 8.5z"></path><path class="g" d="m104.8 82.8l8.5-8.6 8.5 8.6-8.5 8.5z"></path><path class="b" d="m130.3 108.2l-17-16.9 8.5-8.5 17 16.9z"></path><path class="h" d="m100.4 78.3l8.5-8.5 4.4 4.4-8.5 8.6z"></path><path class="j" d="m47.6 130.8h2.4c0-2.1-1.7-3.5-4.3-3.5-2.6 0-4.5 1.4-4.5 3.5 0 1.8 1.2 2.8 3.2 3.2l1.3 0.4c1.3 0.3 2 0.6 2 1.4 0 0.9-0.8 1.5-2.1 1.5-1.3 0-2.2-0.6-2.3-1.8h-2.4c0.1 2.5 1.9 3.8 4.7 3.8 2.9 0 4.6-1.3 4.6-3.5 0-1.9-1.5-3-3.5-3.4l-1.1-0.3c-1-0.2-1.9-0.6-1.8-1.4 0-0.8 0.6-1.3 1.8-1.3 1.2 0 1.9 0.5 2 1.4zm3.8-1.3h3.6v9.7h2.4v-9.7h3.6v-2h-9.6zm18.4-2.1v7.4c0 1.3-0.9 2.3-2.4 2.3-1.4 0-2.4-1-2.4-2.3v-7.4h-2.4v7.6c0 2.6 1.9 4.3 4.8 4.3 2.9 0 4.9-1.7 4.9-4.3v-7.6zm8.6 11.7c3.6 0 5.8-2.2 5.8-5.9 0-3.6-2.2-5.8-5.7-5.8h-4.2v11.7zm-1.7-2.1v-7.5h1.6c2.2 0 3.3 1.2 3.3 3.8 0 2.6-1.1 3.7-3.3 3.7zm11.7-9.6h-2.5v11.7h2.5zm12.8 5.9c0-3.9-2.4-6.1-5.5-6.1-3.1 0-5.5 2.2-5.5 6.1 0 3.8 2.4 6 5.5 6 3.1 0 5.5-2.2 5.5-6zm-2.5 0c0 2.4-1.2 3.8-3 3.8-1.8 0-3-1.4-3-3.8 0-2.5 1.2-3.9 3-3.9 1.8 0 3 1.4 3 3.9zm8 5.8h2.5v-4.8h4.8v-2.1h-4.8v-2.8h5.3v-2h-7.8zm10 0l0.9-2.7h4.2l0.8 2.7h2.7l-4-11.7h-3.2l-4.1 11.7zm1.5-4.6l1.5-4.4h0.1l1.4 4.4zm14.6-3.7h2.4c-0.1-2.1-1.8-3.6-4.4-3.6-2.6 0-4.4 1.5-4.4 3.6 0 1.7 1.2 2.7 3.2 3.2l1.2 0.3c1.3 0.3 2 0.7 2 1.4 0 0.9-0.8 1.5-2 1.5-1.3 0-2.3-0.6-2.3-1.8h-2.4c0 2.6 1.8 3.9 4.7 3.9 2.8 0 4.5-1.4 4.5-3.5 0-2-1.4-3-3.5-3.5l-1-0.2c-1-0.3-1.9-0.6-1.9-1.5 0-0.7 0.7-1.3 1.9-1.3 1.2 0 1.9 0.5 2 1.5zm5.9 8.3l0.9-2.7h4.2l0.9 2.7h2.6l-4-11.7h-3.2l-4 11.7zm1.5-4.6l1.4-4.4h0.1l1.4 4.4zm0.7-8.2h1.7l1.7-2.6h-2.2zm12 12.8c3.6 0 5.7-2.2 5.7-5.9 0-3.6-2.1-5.8-5.7-5.8h-4.1v11.7zm-1.7-2.1v-7.5h1.6c2.2 0 3.3 1.1 3.3 3.7 0 2.6-1.1 3.8-3.3 3.8z"></svg>`,
      } as Header,
      depth: 0,
      context: { disableRevalidate: true },
    }),
    payload.updateGlobal({
      slug: 'footer',
      data: {
        logoSvg: `<svg version="1.2" xmlns="http://www.w3.org/2000/svg" viewBox="40.9 61.3 117.7 78"><style>.a{fill:#fea621}.b{fill:#00a0c6}.c{fill:#f00}.d{fill:#bf6000}.e{fill:#610006}.f{fill:#205315}.g{fill:#0a003e}.h{fill:#40a629}.j{fill:var(--color-foreground)}</style><path class="a" d="m74.9 112.7l17-17 8.5 8.5-17 17z"></path><path class="b" d="m100.4 87.2l4.4-4.4 8.5 8.5-4.4 4.4z"></path><path class="c" d="m62 99.7l16.9-16.9 8.6 8.5-17 17z"></path><path class="c" d="m87.5 74.3l4.4-4.5 8.5 8.5-4.4 4.5z"></path><path class="d" d="m91.9 95.7l8.5-8.5 8.5 8.5-8.5 8.5z"></path><path class="a" d="m117.4 121.2l-17-17 8.5-8.5 17 17z"></path><path class="e" d="m78.9 82.8l8.6-8.5 8.5 8.5-8.5 8.5z"></path><path class="a" d="m91.9 95.7l-4.4-4.4 8.5-8.5 4.4 4.4z"></path><path class="f" d="m91.9 69.8l8.5-8.5 8.5 8.5-8.5 8.5z"></path><path class="g" d="m104.8 82.8l8.5-8.6 8.5 8.6-8.5 8.5z"></path><path class="b" d="m130.3 108.2l-17-16.9 8.5-8.5 17 16.9z"></path><path class="h" d="m100.4 78.3l8.5-8.5 4.4 4.4-8.5 8.6z"></path><path class="j" d="m47.6 130.8h2.4c0-2.1-1.7-3.5-4.3-3.5-2.6 0-4.5 1.4-4.5 3.5 0 1.8 1.2 2.8 3.2 3.2l1.3 0.4c1.3 0.3 2 0.6 2 1.4 0 0.9-0.8 1.5-2.1 1.5-1.3 0-2.2-0.6-2.3-1.8h-2.4c0.1 2.5 1.9 3.8 4.7 3.8 2.9 0 4.6-1.3 4.6-3.5 0-1.9-1.5-3-3.5-3.4l-1.1-0.3c-1-0.2-1.9-0.6-1.8-1.4 0-0.8 0.6-1.3 1.8-1.3 1.2 0 1.9 0.5 2 1.4zm3.8-1.3h3.6v9.7h2.4v-9.7h3.6v-2h-9.6zm18.4-2.1v7.4c0 1.3-0.9 2.3-2.4 2.3-1.4 0-2.4-1-2.4-2.3v-7.4h-2.4v7.6c0 2.6 1.9 4.3 4.8 4.3 2.9 0 4.9-1.7 4.9-4.3v-7.6zm8.6 11.7c3.6 0 5.8-2.2 5.8-5.9 0-3.6-2.2-5.8-5.7-5.8h-4.2v11.7zm-1.7-2.1v-7.5h1.6c2.2 0 3.3 1.2 3.3 3.8 0 2.6-1.1 3.7-3.3 3.7zm11.7-9.6h-2.5v11.7h2.5zm12.8 5.9c0-3.9-2.4-6.1-5.5-6.1-3.1 0-5.5 2.2-5.5 6.1 0 3.8 2.4 6 5.5 6 3.1 0 5.5-2.2 5.5-6zm-2.5 0c0 2.4-1.2 3.8-3 3.8-1.8 0-3-1.4-3-3.8 0-2.5 1.2-3.9 3-3.9 1.8 0 3 1.4 3 3.9zm8 5.8h2.5v-4.8h4.8v-2.1h-4.8v-2.8h5.3v-2h-7.8zm10 0l0.9-2.7h4.2l0.8 2.7h2.7l-4-11.7h-3.2l-4.1 11.7zm1.5-4.6l1.5-4.4h0.1l1.4 4.4zm14.6-3.7h2.4c-0.1-2.1-1.8-3.6-4.4-3.6-2.6 0-4.4 1.5-4.4 3.6 0 1.7 1.2 2.7 3.2 3.2l1.2 0.3c1.3 0.3 2 0.7 2 1.4 0 0.9-0.8 1.5-2 1.5-1.3 0-2.3-0.6-2.3-1.8h-2.4c0 2.6 1.8 3.9 4.7 3.9 2.8 0 4.5-1.4 4.5-3.5 0-2-1.4-3-3.5-3.5l-1-0.2c-1-0.3-1.9-0.6-1.9-1.5 0-0.7 0.7-1.3 1.9-1.3 1.2 0 1.9 0.5 2 1.5zm5.9 8.3l0.9-2.7h4.2l0.9 2.7h2.6l-4-11.7h-3.2l-4 11.7zm1.5-4.6l1.4-4.4h0.1l1.4 4.4zm0.7-8.2h1.7l1.7-2.6h-2.2zm12 12.8c3.6 0 5.7-2.2 5.7-5.9 0-3.6-2.1-5.8-5.7-5.8h-4.1v11.7zm-1.7-2.1v-7.5h1.6c2.2 0 3.3 1.1 3.3 3.7 0 2.6-1.1 3.8-3.3 3.8z"></svg>`,
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
            title: 'Návrhy fasád',
            links: [
              { label: 'Fasáda rodinného domu', url: '/fasady' },
              { label: 'Barevné kombinace s obkladem - kámen', url: '/fotogalerie-fasad' },
              { label: 'Vizualizace fasády, zábradlí a schodů', url: '/kontakt-cenik' },
              { label: 'Všechny', url: '/fotogalerie-fasad' },
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
