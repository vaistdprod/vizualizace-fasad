// src/endpoints/seed/index.ts
import type { CollectionSlug, GlobalSlug, Payload, PayloadRequest, File } from 'payload'
import { contactForm } from './contact-form'
import { home } from './home'
import { aktualita1 } from './aktualita-1'
import { aktualita2 } from './aktualita-2'
import { aktualita3 } from './aktualita-3'
import { heroImage } from './hero-image'
import { teamImage } from './team-image'
import { galleryImage1 } from './gallery-image-1'
import { galleryImage2 } from './gallery-image-2'
import { galleryImage3 } from './gallery-image-3'
import { insuranceVZP } from './insurance-vzp'
import { insuranceZPMV } from './insurance-zpmv'
import { insuranceOZP } from './insurance-ozp'
import { insuranceRBP } from './insurance-rbp'
import { insuranceCPZP } from './insurance-cpzp'
import { insuranceVOZP } from './insurance-vozp'
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

  // First clear globals to avoid foreign key constraint issues
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

  // Then clear collections
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

  // Seed media
  payload.logger.info('— Seeding media...')
  const logoDoc = await payload.create({
    collection: 'media',
    data: logo,
    file: await fetchFileByPath('./logo.svg'),
  })
  payload.logger.info(`LogoDoc: ${JSON.stringify(logoDoc)}`)
  const heroImageDoc = await payload.create({
    collection: 'media',
    data: heroImage,
    file: await fetchFileByPath('./ruka.jpg'),
  })
  const teamImageDoc = await payload.create({
    collection: 'media',
    data: teamImage,
    file: await fetchFileByPath('./lucie-stastna.jpg'),
  })
  const galleryImage1Doc = await payload.create({
    collection: 'media',
    data: galleryImage1,
    file: await fetchFileByPath('./ordinace.jpg'),
  })
  const galleryImage2Doc = await payload.create({
    collection: 'media',
    data: galleryImage2,
    file: await fetchFileByPath('./hracky.jpg'),
  })
  const galleryImage3Doc = await payload.create({
    collection: 'media',
    data: galleryImage3,
    file: await fetchFileByPath('./trava.jpg'),
  })
  const vzpImageDoc = await payload.create({
    collection: 'media',
    data: insuranceVZP,
    file: await fetchFileByPath('./vzp.svg'),
  })
  const zpmvImageDoc = await payload.create({
    collection: 'media',
    data: insuranceZPMV,
    file: await fetchFileByPath('./zpmv.svg'),
  })
  const ozpImageDoc = await payload.create({
    collection: 'media',
    data: insuranceOZP,
    file: await fetchFileByPath('./ozp.svg'),
  })
  const rbpImageDoc = await payload.create({
    collection: 'media',
    data: insuranceRBP,
    file: await fetchFileByPath('./rbp.svg'),
  })
  const cpzpImageDoc = await payload.create({
    collection: 'media',
    data: insuranceCPZP,
    file: await fetchFileByPath('./cpzp.svg'),
  })
  const vozpImageDoc = await payload.create({
    collection: 'media',
    data: insuranceVOZP,
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
  const contactFormDoc = await payload.create({
    collection: 'forms',
    data: contactForm,
  })

  // Seed aktuality
  payload.logger.info('— Seeding aktuality...')
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

  // Seed home page
  payload.logger.info('— Seeding home page...')
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
      backgroundImageMraky: backgroundImageMrakyDoc,
      backgroundImagePuntiky: backgroundImagePuntikyDoc,
      backgroundImageMalovanky: backgroundImageMalovankyDoc,
      mrakyOpacity: 0.06, // Slightly visible for top section
      puntikyOpacity: 0.24, // Default for middle section
      malovankyOpacity: 0.06, // More faded for bottom section
    }),
  })

  // Seed globals
  payload.logger.info('— Seeding globals...')
  const navigation = [
    { label: 'Aktuality', url: '#aktuality' },
    { label: 'Služby', url: '#sluzby' },
    { label: 'Objednání', url: '#objednani' },
    { label: 'Náš tým', url: '#nas-tym' },
    { label: 'Galerie', url: '#galerie' },
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
    button: { type: 'custom' as const, label: 'Objednat se', url: '#objednani' },
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
              { label: 'Ceník', url: '#cenik' },
            ],
          },
          {
            title: 'Kontakty',
            links: [
              {
                label: 'Navigovat do ordinace',
                url: 'https://maps.google.com/?q=Masarykovo%20n%C3%A1m%C4%9Bst%C3%AD%20275%2C%20338%2008%20Zbiroh',
              },
              { label: 'Napište nám e-mail', url: 'tel:+420 371 794 225' },
              { label: 'Zavolejte nám', url: 'tel:+420 371 794 225' },
              { label: 'Web obce Zbiroh', url: 'https://zbiroh.cz' },
            ],
          },
        ],
        copyrightText: '© 2025 Dětská ambulance Zbiroh s.r.o. by TD Productions.',
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
