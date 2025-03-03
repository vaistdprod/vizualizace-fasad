import type { CollectionSlug, GlobalSlug, Payload, PayloadRequest, File } from 'payload'

import { contactForm } from './contact-form'
import { home } from './home'
import { aktualita1 } from './aktualita-1'
import { aktualita2 } from './aktualita-2'
import { aktualita3 } from './aktualita-3'
import { heroImage } from './hero-image.ts'
import { teamImage } from './team-image.ts'
import { galleryImage1 } from './gallery-image-1.ts'
import { galleryImage2 } from './gallery-image-2.ts'
import { galleryImage3 } from './gallery-image-3.ts'
import { insuranceVZP } from './insurance-vzp.ts'
import { insuranceZPMV } from './insurance-zpmv.ts'
import { insuranceOZP } from './insurance-ozp.ts'
import { insuranceRBP } from './insurance-rbp.ts'
import { insuranceCPZP } from './insurance-cpzp.ts'
import { insuranceVOZP } from './insurance-vozp.ts'
import type { Header, Footer } from '@/payload-types'
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

  // Clear collections and globals
  payload.logger.info(`— Clearing collections and globals...`)
  await Promise.all(
    globals.map((global) =>
      payload.updateGlobal({
        slug: global,
        data:
          global === 'header'
            ? ({ button: { type: 'custom' as const, label: 'temp' } } as Partial<Header>)
            : global === 'footer'
              ? ({ copyrightText: 'temp' } as Partial<Footer>)
              : {},
        depth: 0,
        context: { disableRevalidate: true },
      }),
    ),
  )
  await Promise.all(
    collections.map((collection) => payload.db.deleteMany({ collection, req, where: {} })),
  )
  await Promise.all(
    collections
      .filter((collection) => Boolean(payload.collections[collection].config.versions))
      .map((collection) => payload.db.deleteVersions({ collection, req, where: {} })),
  )

  // Seed demo author
  payload.logger.info(`— Seeding demo author...`)
  await payload.delete({
    collection: 'users',
    depth: 0,
    where: { email: { equals: 'info@pediatr-zbiroh.cz' } },
  })
  const demoAuthor = await payload.create({
    collection: 'users',
    data: {
      name: 'MUDr. Lucie Šťastná',
      email: 'info@pediatr-zbiroh.cz',
      password: 'password',
    },
  })

  // Seed media with explicit file pairing, including SVG support
  payload.logger.info(`— Seeding media...`)
  const heroImageDoc = await payload.create({
    collection: 'media',
    data: heroImage,
    file: await fetchFileByPath('./ruka.jpg'), // In src/seed/
  })

  const teamImageDoc = await payload.create({
    collection: 'media',
    data: teamImage,
    file: await fetchFileByPath('./lucie-stastna.jpg'), // In src/seed/
  })

  const galleryImage1Doc = await payload.create({
    collection: 'media',
    data: galleryImage1,
    file: await fetchFileByPath('./ordinace.jpg'), // In src/seed/
  })

  const galleryImage2Doc = await payload.create({
    collection: 'media',
    data: galleryImage2,
    file: await fetchFileByPath('./hracky.jpg'), // In src/seed/
  })

  const galleryImage3Doc = await payload.create({
    collection: 'media',
    data: galleryImage3,
    file: await fetchFileByPath('./trava.jpg'), // In src/seed/
  })

  const vzpImageDoc = await payload.create({
    collection: 'media',
    data: insuranceVZP,
    file: await fetchFileByPath('./vzp.svg'), // SVG in src/seed/
  })

  const zpmvImageDoc = await payload.create({
    collection: 'media',
    data: insuranceZPMV,
    file: await fetchFileByPath('./zpmv.svg'), // SVG in src/seed/
  })

  const ozpImageDoc = await payload.create({
    collection: 'media',
    data: insuranceOZP,
    file: await fetchFileByPath('./ozp.svg'), // SVG in src/seed/
  })

  const rbpImageDoc = await payload.create({
    collection: 'media',
    data: insuranceRBP,
    file: await fetchFileByPath('./rbp.svg'), // SVG in src/seed/
  })

  const cpzpImageDoc = await payload.create({
    collection: 'media',
    data: insuranceCPZP,
    file: await fetchFileByPath('./cpzp.svg'), // SVG in src/seed/
  })

  const vozpImageDoc = await payload.create({
    collection: 'media',
    data: insuranceVOZP,
    file: await fetchFileByPath('./vozp.png'), // PNG in src/seed/
  })

  payload.logger.info(`— Seeding contact form...`)
  const contactFormDoc = await payload.create({
    collection: 'forms',
    data: contactForm,
  })

  payload.logger.info(`— Seeding aktuality...`)
  const aktualita1Doc = await payload.create({
    collection: 'aktuality',
    depth: 3,
    context: { disableRevalidate: true },
    data: aktualita1({ heroImage: galleryImage1Doc, author: demoAuthor }),
  })
  const aktualita2Doc = await payload.create({
    collection: 'aktuality',
    depth: 3,
    context: { disableRevalidate: true },
    data: aktualita2({ heroImage: galleryImage2Doc, author: demoAuthor }),
  })
  const aktualita3Doc = await payload.create({
    collection: 'aktuality',
    depth: 3,
    context: { disableRevalidate: true },
    data: aktualita3({ heroImage: galleryImage3Doc, author: demoAuthor }),
  })

  payload.logger.info(`— Seeding home page...`)
  await payload.create({
    collection: 'pages',
    depth: 3,
    data: home({
      heroImage: heroImageDoc,
      teamImage: teamImageDoc,
      galleryImage1: galleryImage1Doc,
      galleryImage2: galleryImage2Doc,
      galleryImage3: galleryImage3Doc,
      vzpImage: vzpImageDoc,
      zpmvImage: zpmvImageDoc,
      ozpImage: ozpImageDoc,
      rbpImage: rbpImageDoc,
      cpzpImage: cpzpImageDoc,
      vozpImage: vozpImageDoc,
      contactForm: contactFormDoc,
      aktuality: [aktualita1Doc, aktualita2Doc, aktualita3Doc],
    }),
  })

  payload.logger.info(`— Seeding globals...`)
  const navigation = [
    { label: 'Aktuality', url: '#aktuality' },
    { label: 'Služby', url: '#sluzby' },
    { label: 'Objednání', url: '#objednani' },
    { label: 'Náš tým', url: '#nas-tym' },
    { label: 'Galerie', url: '#galerie' },
    { label: 'Ordinační hodiny', url: '#ordinacni-hodiny' },
    { label: 'Pojišťovny', url: '#pojistovny' },
    { label: 'Dotazy', url: '#dotazy' },
    { label: 'Kontakty', url: '#kontakty' },
  ]
  await Promise.all([
    payload.updateGlobal({
      slug: 'header',
      data: {
        navItems: navigation.map((item) => ({
          link: { type: 'custom' as const, label: item.label, url: item.url },
        })),
        button: { type: 'custom' as const, label: 'Objednat se', url: '#objednani' },
      } as Header, // Explicitly type as Header
    }),
    payload.updateGlobal({
      slug: 'footer',
      data: {
        description: 'Poskytujeme lékařskou péči pro vaše děti od novorozenců až po dospívající.',
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
              { label: 'Objednání', url: '#objednani' },
              { label: 'Náš tým', url: '#nas-tym' },
            ],
          },
          {
            title: 'Další informace',
            links: [
              { label: 'Galerie', url: '#galerie' },
              { label: 'Ordinační hodiny', url: '#ordinacni-hodiny' },
              { label: 'Pojišťovny', url: '#pojistovny' },
              { label: 'Dotazy', url: '#dotazy' },
            ],
          },
          {
            title: 'Kontakty',
            links: [
              { label: 'Spojte se s námi', url: '#kontakty' },
              { label: 'Pohotovost', url: 'tel:155' },
              { label: 'Kde nás najdete', url: '#kontakty' },
              { label: 'Objednání', url: '#objednani' },
            ],
          },
        ],
        copyrightText: '© 2025 Dětská ambulance Zbiroh s.r.o. by TD Productions.',
      },
    }),
  ])

  payload.logger.info('Seeded database successfully!')
}

async function fetchFileByPath(filePath: string): Promise<File> {
  const { readFile } = await import('fs/promises')
  const path = await import('path')
  // Get the directory of the current file (src/endpoints/seed/)
  const __filename = fileURLToPath(import.meta.url)
  const __dirname = path.dirname(__filename)
  const fullPath = path.resolve(__dirname, filePath) // Still resolves from src/endpoints/seed/
  const data = await readFile(fullPath)
  let mimeType: string
  if (filePath.endsWith('.svg')) {
    mimeType = 'image/svg+xml'
  } else if (filePath.endsWith('.png')) {
    mimeType = 'image/png'
  } else {
    mimeType = 'image/jpeg' // Default for .jpg
  }
  return {
    name: path.basename(filePath),
    data,
    mimetype: mimeType,
    size: data.length,
  }
}
