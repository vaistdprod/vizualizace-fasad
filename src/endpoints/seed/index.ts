import type { CollectionSlug, GlobalSlug, Payload, PayloadRequest, File } from 'payload'
import { kontaktniFormular } from './kontaktni-formular'
import { home } from './home'
import { aktualita1 } from './aktualita-1' // New checkup guidelines
import { aktualita2 } from './aktualita-2' // Nutrition workshop
import { aktualita3 } from './aktualita-3' // Back-to-school tips
import { heroImage } from './hero-image'
import { teamImage } from './team-image'
import { aktualitaImage1 } from './aktualita-image-1'
import { aktualitaImage2 } from './aktualita-image-2'
import { aktualitaImage3 } from './aktualita-image-3'
import { pojistovnaVZP } from './pojistovna-vzp'
import { pojistovnaZPMV } from './pojistovna-zpmv'
import { pojistovnaOZP } from './pojistovna-ozp'
import { pojistovnaRBP } from './pojistovna-rbp'
import { pojistovnaCPZP } from './pojistovna-cpzp'
import { pojistovnaVOZP } from './pojistovna-vozp'
import { logo } from './logo'
import { mraky } from './mraky'
import { malovanky } from './malovanky'
import { puntiky } from './puntiky'
import type { Header } from '@/payload-types'
import { fileURLToPath } from 'url'

const collections: CollectionSlug[] = [
  'categories',
  'media',
  'pages',
  'aktuality',
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

  // Seed demo author
  payload.logger.info('— Seeding demo author...')
  await payload.delete({
    collection: 'users',
    depth: 0,
    where: { email: { equals: 'mirka.janulova@seznam.cz' } },
  })

  const DEMO_AUTHOR_PASSWORD = process.env.DEMO_AUTHOR_PASSWORD
  if (!DEMO_AUTHOR_PASSWORD) {
    throw new Error('V proměnných chybí hodnota pro DEMO_AUTHOR_PASSWORD!')
  }
  const demoAuthor = await payload.create({
    collection: 'users',
    data: {
      name: 'MUDr. Miroslava Janulová',
      email: 'mirka.janulova@seznam.cz',
      password: DEMO_AUTHOR_PASSWORD,
    },
  })

  // Seed media
  payload.logger.info('— Seeding media...')
  const logoDoc = await payload.create({
    collection: 'media',
    data: logo,
    file: await fetchFileByPath('./logo.svg'),
  })
  const heroImageDoc = await payload.create({
    collection: 'media',
    data: heroImage,
    file: await fetchFileByPath('./ruka.jpg'),
  })
  const teamImageDoc = await payload.create({
    collection: 'media',
    data: teamImage,
    file: await fetchFileByPath('./lucie-stastna.jpg'), // Replace if renamed
  })
  const aktualitaImage1Doc = await payload.create({
    collection: 'media',
    data: aktualitaImage1,
    file: await fetchFileByPath('./ordinace.jpg'),
  })
  const aktualitaImage2Doc = await payload.create({
    collection: 'media',
    data: aktualitaImage2,
    file: await fetchFileByPath('./hracky.jpg'),
  })
  const aktualitaImage3Doc = await payload.create({
    collection: 'media',
    data: aktualitaImage3,
    file: await fetchFileByPath('./vysetrovna.jpg'), // Updated from trava.jpg
  })
  const vzpImageDoc = await payload.create({
    collection: 'media',
    data: pojistovnaVZP,
    file: await fetchFileByPath('./vzp.svg'),
  })
  const zpmvImageDoc = await payload.create({
    collection: 'media',
    data: pojistovnaZPMV,
    file: await fetchFileByPath('./zpmv.svg'),
  })
  const ozpImageDoc = await payload.create({
    collection: 'media',
    data: pojistovnaOZP,
    file: await fetchFileByPath('./ozp.svg'),
  })
  const rbpImageDoc = await payload.create({
    collection: 'media',
    data: pojistovnaRBP,
    file: await fetchFileByPath('./rbp.svg'),
  })
  const cpzpImageDoc = await payload.create({
    collection: 'media',
    data: pojistovnaCPZP,
    file: await fetchFileByPath('./cpzp.svg'),
  })
  const vozpImageDoc = await payload.create({
    collection: 'media',
    data: pojistovnaVOZP,
    file: await fetchFileByPath('./vozp.png'),
  })
  const backgroundImageMrakyDoc = await payload.create({
    collection: 'media',
    data: mraky,
    file: await fetchFileByPath('./mraky.svg'),
  })
  const backgroundImagePuntikyDoc = await payload.create({
    collection: 'media',
    data: puntiky,
    file: await fetchFileByPath('./puntiky.svg'),
  })
  const backgroundImageMalovankyDoc = await payload.create({
    collection: 'media',
    data: malovanky,
    file: await fetchFileByPath('./malovanky.svg'),
  })

  // Seed contact form
  payload.logger.info('— Seeding contact form...')
  const kontaktniFormularDoc = await payload.create({
    collection: 'forms',
    data: kontaktniFormular,
  })

  // Seed aktuality
  payload.logger.info('— Seeding aktuality...')
  const aktualita1Doc = await payload.create({
    collection: 'aktuality',
    depth: 3,
    context: { disableRevalidate: true },
    data: aktualita1({ heroImage: aktualitaImage1Doc, author: demoAuthor }),
  })
  const aktualita2Doc = await payload.create({
    collection: 'aktuality',
    depth: 3,
    context: { disableRevalidate: true },
    data: aktualita2({ heroImage: aktualitaImage2Doc, author: demoAuthor }),
  })
  const aktualita3Doc = await payload.create({
    collection: 'aktuality',
    depth: 3,
    context: { disableRevalidate: true },
    data: aktualita3({ heroImage: aktualitaImage3Doc, author: demoAuthor }),
  })

  // Seed home page
  payload.logger.info('— Seeding home page...')
  await payload.create({
    collection: 'pages',
    depth: 3,
    data: home({
      heroImage: heroImageDoc,
      teamImage: teamImageDoc,
      aktualitaImage1: aktualitaImage1Doc,
      aktualitaImage2: aktualitaImage2Doc,
      aktualitaImage3: aktualitaImage3Doc,
      vzpImage: vzpImageDoc,
      zpmvImage: zpmvImageDoc,
      ozpImage: ozpImageDoc,
      rbpImage: rbpImageDoc,
      cpzpImage: cpzpImageDoc,
      vozpImage: vozpImageDoc,
      kontaktniFormular: kontaktniFormularDoc, // Updated to match import
      aktuality: [aktualita1Doc, aktualita2Doc, aktualita3Doc],
      backgroundImageMraky: backgroundImageMrakyDoc,
      backgroundImagePuntiky: backgroundImagePuntikyDoc,
      backgroundImageMalovanky: backgroundImageMalovankyDoc,
      mrakyOpacity: 0.06,
      puntikyOpacity: 0.24,
      malovankyOpacity: 0.06,
    }),
  })

  // Seed globals
  payload.logger.info('— Seeding globals...')
  const navigation = [
    { label: 'Aktuality', url: '#aktuality' },
    { label: 'Služby', url: '#sluzby' },
    { label: 'Náš tým', url: '#nas-tym' },
    { label: 'Ordinační hodiny', url: '#ordinacni-hodiny' },
    { label: 'Pojišťovny', url: '#pojistovny' },
    { label: 'Ceník', url: '#cenik' },
    { label: 'Kontakty', url: '#kontakty' },
  ]
  const headerData = {
    logo: logoDoc.id,
    navItems: navigation.map((item) => ({
      link: { type: 'custom' as const, label: item.label, url: item.url },
    })),
    button: { type: 'custom' as const, label: 'Kontaktujte nás', url: '#kontakty' },
  }
  payload.logger.info(`Header data before update: ${JSON.stringify(headerData)}`)
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
        description: 'Poskytujeme odbornou péči pro děti od narození až po dospívající v Brně.',
        socialLinks: [
          { platform: 'Facebook', url: '#' },
          { platform: 'Instagram', url: '#' },
        ],
        footerColumns: [
          {
            title: 'Rychlé odkazy',
            links: [
              { label: 'Aktuality', url: '#aktuality' },
              { label: 'Služby', url: '#sluzby' },
              { label: 'Náš tým', url: '#nas-tym' },
            ],
          },
          {
            title: 'Další informace',
            links: [
              { label: 'Ordinační hodiny', url: '#ordinacni-hodiny' },
              { label: 'Pojišťovny', url: '#pojistovny' },
              { label: 'Ceník', url: '#cenik' },
            ],
          },
          {
            title: 'Kontakty',
            links: [
              {
                label: 'Navigovat do ordinace',
                url: 'https://maps.google.com/?q=U%20Pošty%20402/14,%20625%2000%20Brno',
              },
              { label: 'Napište nám e-mail', url: 'mailto:mirka.janulova@seznam.cz' },
              { label: 'Zavolejte nám', url: 'tel:+420732229610' },
              { label: 'Web města Brno', url: 'https://www.brno.cz' },
            ],
          },
        ],
        copyrightText: '© 2025 MUDr. Miroslava Janulová, s.r.o. Všechna práva vyhrazena.',
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
  if (filePath.endsWith('.svg')) {
    mimeType = 'image/svg+xml'
  } else if (filePath.endsWith('.png')) {
    mimeType = 'image/png'
  } else {
    mimeType = 'image/jpeg'
  }
  return {
    name: path.basename(filePath),
    data,
    mimetype: mimeType,
    size: data.length,
  }
}
