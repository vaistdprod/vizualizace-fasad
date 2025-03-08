import type { CollectionSlug, GlobalSlug, Payload, PayloadRequest, File } from 'payload'
import { kontaktniFormular } from './kontaktni-formular'
import { home } from './home'
import { aktualita1 } from './aktualita-1' // New checkup guidelines
import { aktualita2 } from './aktualita-2' // Nutrition workshop
import { aktualita3 } from './aktualita-3' // Back-to-school tips
import { heroImage } from './hero-image'
import { ordinace } from './ordinace'
import { hracky } from './hracky'
import { vysetrovna } from './vysetrovna'
import { pojistovnaVZP } from './pojistovna-vzp'
import { pojistovnaZPMV } from './pojistovna-zpmv'
import { pojistovnaOZP } from './pojistovna-ozp'
import { pojistovnaRBP } from './pojistovna-rbp'
import { pojistovnaCPZP } from './pojistovna-cpzp'
import { pojistovnaVOZP } from './pojistovna-vozp'
import { logo } from './logo'
import { polka } from './polka'
import { ilustrace } from './ilustrace'
import { batole } from './batole'
import { naruci } from './naruci'
import { stetoskop } from './stetoskop'
import { stetoskop2 } from './stetoskop-2'
import { vysetreni } from './vysetreni'
import { vysetreni2 } from './vysetreni-2'
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
    file: await fetchFileByPath('./stetoskop-2.jpg'),
  })
  const ordinaceDoc = await payload.create({
    collection: 'media',
    data: ordinace,
    file: await fetchFileByPath('./ordinace.jpg'),
  })
  const hrackyDoc = await payload.create({
    collection: 'media',
    data: hracky,
    file: await fetchFileByPath('./hracky.jpg'),
  })
  const vysestrovnaDoc = await payload.create({
    collection: 'media',
    data: vysetrovna,
    file: await fetchFileByPath('./vysetrovna.jpg'),
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
  const backgroundImagePolkaDoc = await payload.create({
    collection: 'media',
    data: polka,
    file: await fetchFileByPath('./polka.svg'),
  })
  const backgroundImageIlustraceDoc = await payload.create({
    collection: 'media',
    data: ilustrace,
    file: await fetchFileByPath('./ilustrace.svg'),
  })

  // Additional images
  await payload.create({
    collection: 'media',
    data: batole,
    file: await fetchFileByPath('./batole.jpg'),
  })
  await payload.create({
    collection: 'media',
    data: naruci,
    file: await fetchFileByPath('./naruci.jpg'),
  })
  await payload.create({
    collection: 'media',
    data: stetoskop,
    file: await fetchFileByPath('./stetoskop.jpg'),
  })
  await payload.create({
    collection: 'media',
    data: stetoskop2,
    file: await fetchFileByPath('./stetoskop-2.jpg'),
  })
  await payload.create({
    collection: 'media',
    data: vysetreni,
    file: await fetchFileByPath('./vysetreni.jpg'),
  })
  await payload.create({
    collection: 'media',
    data: vysetreni2,
    file: await fetchFileByPath('./vysetreni-2.jpg'),
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
    data: aktualita1({ heroImage: ordinaceDoc, author: demoAuthor }),
  })
  const aktualita2Doc = await payload.create({
    collection: 'aktuality',
    depth: 3,
    context: { disableRevalidate: true },
    data: aktualita2({ heroImage: hrackyDoc, author: demoAuthor }),
  })
  const aktualita3Doc = await payload.create({
    collection: 'aktuality',
    depth: 3,
    context: { disableRevalidate: true },
    data: aktualita3({ heroImage: vysestrovnaDoc, author: demoAuthor }),
  })

  // Seed home page
  payload.logger.info('— Seeding home page...')
  await payload.create({
    collection: 'pages',
    depth: 3,
    data: home({
      heroImage: heroImageDoc,
      _ordinace: ordinaceDoc,
      _hracky: hrackyDoc,
      _vysetrovna: vysestrovnaDoc,
      vzpImage: vzpImageDoc,
      zpmvImage: zpmvImageDoc,
      ozpImage: ozpImageDoc,
      rbpImage: rbpImageDoc,
      cpzpImage: cpzpImageDoc,
      vozpImage: vozpImageDoc,
      kontaktniFormular: kontaktniFormularDoc,
      aktuality: [aktualita1Doc, aktualita2Doc, aktualita3Doc],
      backgroundImagePolka: backgroundImagePolkaDoc,
      backgroundImageIlustrace: backgroundImageIlustraceDoc,
      polkaOpacity: 0.3,
      ilustraceOpacity: 0.06,
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
        logo: logoDoc.id, // Add the logo reference here
        title: 'Ordinace praktického lékaře pro děti a dorost | MUDr. Janulová', // Dynamic title
        description: 'Poskytujeme odbornou péči pro děti od narození až po dospívající v Brně.',
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
                url: 'https://maps.app.goo.gl/yp4vJJC6vHpHLWvo7',
              },
              { label: 'Napište nám e-mail', url: 'mailto:mirka.janulova@seznam.cz' },
              { label: 'Zavolejte nám', url: 'tel:+420732229610' },
              { label: 'Web města Brno', url: 'https://www.brno.cz' },
            ],
          },
        ],
        copyrightText: '© 2025 MUDr. Miroslava Janulová, s.r.o.',
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
