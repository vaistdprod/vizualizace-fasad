// src/endpoints/seed/index.ts
import type { CollectionSlug, GlobalSlug, Payload, PayloadRequest, File } from 'payload'
import { uvod } from './uvod'
import { fotogalerie } from './fotogalerie'
import { kontakt } from './kontakt'
import { landing } from './landing'
import { poptavka } from './poptavka'
import { projects, ProjectsArgs } from './projects'
import {
  heroBg,
  modernOfficeTower,
  luxuryResidential,
  culturalCenter,
  modernOffice,
  contactImage,
  landingHeroImage,
  logo,
  vizualizaceDvouPohleduRD1,
  vizualizaceDvouPohleduRD2,
  vizualizaceDvouPohleduRD3,
  vizualizaceDvouPohleduRD4,
  vizualizaceDvouPohleduRD5,
  vizualizaceDvouPohleduRD6,
  vizualizaceDvouPohleduRD7,
  vizualizaceDvouPohleduRD8,
  vizualizaceDvouPohleduRD9,
  revitalizacePanelak1,
  revitalizacePanelak2,
  revitalizacePanelak3,
  revitalizacePanelak4,
  revitalizacePanelak5,
  revitalizacePanelak6,
  revitalizacePanelak7,
  revitalizacePanelak8,
  vizualizaceNovostavbyRD1,
  vizualizaceNovostavbyRD2,
  vizualizaceNovostavbyRD3,
  vizualizaceNovostavbyRD4,
  vizualizaceNovostavbyRD5,
  vizualizaceNovostavbyRD6,
  vizualizaceNovostavbyRD7,
  vizualizaceNovostavbyRD8,
  vizualizaceNovostavbyRD9,
  rekonstrukceFasadyStrecha1,
  rekonstrukceFasadyStrecha2,
  rekonstrukceFasadyStrecha3,
  rekonstrukceFasadyStrecha4,
  rekonstrukceFasadyStrecha5,
  rekonstrukceFasadyStrecha6,
  rekonstrukceFasadyStrecha7,
  rekonstrukceFasadyStrecha8,
  rekonstrukceFasadyStrecha9,
  navrhBarevnostiFasady1,
  navrhBarevnostiFasady2,
  navrhBarevnostiFasady3,
  navrhBarevnostiFasady4,
  navrhBarevnostiFasady5,
  navrhBarevnostiFasady6,
  navrhBarevnostiFasady7,
  navrhBarevnostiFasady8,
  navrhBarevnostiFasady9,
  navrhBarevnostiFasady10,
  navrhBarevnostiFasady11,
  navrhBarevnostiFasady12,
  navrhBarevnostiFasady13,
  navrhFasadyRD1,
  navrhFasadyRD2,
  navrhFasadyRD3,
  navrhFasadyRD4,
  navrhFasadyRD5,
  bytovyDumBrno1,
  bytovyDumBrno2,
  bytovyDumBrno3,
  bytovyDumBrno4,
  bytovyDumBrno5,
  bytovyDumBrno6,
  bytovyDumBrno7,
  bytovyDumBrno8,
  bytovyDumBrno9,
  drevenaFasada1,
  drevenaFasada2,
  drevenaFasada3,
  drevenaFasada4,
  drevenaFasada5,
  drevenaFasada6,
  drevenaFasada7,
  drevenaFasada8,
  drevenaFasada9,
  navrhFasadyKamen1,
  navrhFasadyKamen2,
  navrhFasadyKamen3,
  navrhFasadyKamen4,
  navrhFasadyKamen5,
  navrhFasadyKamen6,
  navrhFasadyKamen7,
  navrhFasadyKamen8,
  navrhFasadyKamen9,
  barevnyNavrhObklad1,
  barevnyNavrhObklad2,
  barevnyNavrhObklad3,
  barevnyNavrhObklad4,
  barevnyNavrhObklad5,
  barevnyNavrhObklad6,
  barevnyNavrhObklad7,
  barevnyNavrhObklad8,
  barevnyNavrhObklad9,
  vizualizaceFasadyZabradli1,
  vizualizaceFasadyZabradli2,
  vizualizaceFasadyZabradli3,
  vizualizaceFasadyZabradli4,
  vizualizaceFasadyZabradli5,
  vizualizaceFasadyZabradli6,
  vizualizaceFasadyZabradli7,
  vizualizaceFasadyZabradli8,
  vizualizaceFasadyZabradli9,
  realizaceFasady3_1,
  realizaceFasady3_2,
  realizaceFasady3_3,
  realizaceFasady3_4,
  realizaceFasady3_5,
  realizaceFasadyBukovinka1,
  realizaceFasadyBukovinka2,
  realizaceFasadyBukovinka3,
  realizaceFasadyBukovinka4,
  realizaceFasadyBukovinka5,
  realizaceFasadyBukovinka6,
  realizaceFasadyBukovinka7,
  realizaceFasadyBukovinka8,
  realizaceFasadyBukovinka9,
  realizaceFasadyBukovinka10,
  realizaceFasadyBukovinka11,
  realizaceFasadyBukovinka12,
  realizaceFasadyOstrava1,
  realizaceFasadyOstrava2,
  realizaceFasadyOstrava3,
  realizaceFasadyOstrava4,
  fasadaRodinnehoDomu1,
  fasadaRodinnehoDomu2,
  fasadaRodinnehoDomu3,
  fasadaRodinnehoDomu4,
  kamenNaFasadeRD1,
  kamenNaFasadeRD2,
  kamenNaFasadeRD3,
  kamenNaFasadeRD4,
  kamenNaFasadeRD5,
  kamenNaFasadeRD6,
  kamenNaFasadeRD7,
  kamenNaFasadeRD8,
  rodinnyDum1,
  rodinnyDum2,
  rodinnyDum3,
  rodinnyDum4,
  rodinnyDum5,
  rodinnyDum6,
  rodinnyDum7,
  rodinnyDum8,
  rodinnyDum9,
  rodinnyDum10,
  rodinnyDum11,
  rodinnyDum12,
  vizualizaceBarevneFasadyRD1,
  vizualizaceBarevneFasadyRD2,
  vizualizaceBarevneFasadyRD3,
  vizualizaceBarevneFasadyRD4,
  vizualizaceBarevneFasadyRD5,
  vizualizaceBarevneFasadyRD6,
  vizualizaceBarevneFasadyRD7,
  vizualizaceBarevneFasadyRD8,
} from './images'
import { contactForm } from './contact-form'
import type { Header, Media } from '@/payload-types'
import { fileURLToPath } from 'url'

const collections: CollectionSlug[] = ['categories', 'media', 'pages', 'forms', 'users', 'projects'] // Add 'projects'
const globals: GlobalSlug[] = ['header', 'footer']

type PageMedia = {
  heroBg: Media
  modernOffice: Media
  contactImage: Media
  landingHeroImage: Media
  logo: Media
}

type MediaDocs = ProjectsArgs & PageMedia

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
  const mediaDocs = {} as MediaDocs
  mediaDocs.heroBg = await payload.create({
    collection: 'media',
    data: heroBg,
    file: await fetchFileByPath('./fasada-hlavni.jpg'),
  })
  mediaDocs.modernOfficeTower = await payload.create({
    collection: 'media',
    data: modernOfficeTower,
    file: await fetchFileByPath('./ostrava-pred.jpg'),
  })
  mediaDocs.luxuryResidential = await payload.create({
    collection: 'media',
    data: luxuryResidential,
    file: await fetchFileByPath('./ostrava-navrh.jpg'),
  })
  mediaDocs.culturalCenter = await payload.create({
    collection: 'media',
    data: culturalCenter,
    file: await fetchFileByPath('./ostrava-po.jpg'),
  })
  mediaDocs.modernOffice = await payload.create({
    collection: 'media',
    data: modernOffice,
    file: await fetchFileByPath('./bukovinka-pred.jpg'),
  })
  mediaDocs.contactImage = await payload.create({
    collection: 'media',
    data: contactImage,
    file: await fetchFileByPath('./kontakt.jpg'),
  })
  mediaDocs.landingHeroImage = await payload.create({
    collection: 'media',
    data: landingHeroImage,
    file: await fetchFileByPath('./landing-hero.jpg'),
  })
  mediaDocs.logo = await payload.create({
    collection: 'media',
    data: logo,
    file: await fetchFileByPath('./logo.svg'),
  })

  // New images from folders
  mediaDocs.vizualizaceDvouPohleduRD1 = await payload.create({
    collection: 'media',
    data: vizualizaceDvouPohleduRD1,
    file: await fetchFileByPath('./vizualizace-dvou-pohledu-rodinneho-domu/1.jpg'),
  })
  mediaDocs.vizualizaceDvouPohleduRD2 = await payload.create({
    collection: 'media',
    data: vizualizaceDvouPohleduRD2,
    file: await fetchFileByPath('./vizualizace-dvou-pohledu-rodinneho-domu/2.jpg'),
  })
  mediaDocs.vizualizaceDvouPohleduRD3 = await payload.create({
    collection: 'media',
    data: vizualizaceDvouPohleduRD3,
    file: await fetchFileByPath('./vizualizace-dvou-pohledu-rodinneho-domu/3.jpg'),
  })
  mediaDocs.vizualizaceDvouPohleduRD4 = await payload.create({
    collection: 'media',
    data: vizualizaceDvouPohleduRD4,
    file: await fetchFileByPath('./vizualizace-dvou-pohledu-rodinneho-domu/4.jpg'),
  })
  mediaDocs.vizualizaceDvouPohleduRD5 = await payload.create({
    collection: 'media',
    data: vizualizaceDvouPohleduRD5,
    file: await fetchFileByPath('./vizualizace-dvou-pohledu-rodinneho-domu/5.jpg'),
  })
  mediaDocs.vizualizaceDvouPohleduRD6 = await payload.create({
    collection: 'media',
    data: vizualizaceDvouPohleduRD6,
    file: await fetchFileByPath('./vizualizace-dvou-pohledu-rodinneho-domu/6.jpg'),
  })
  mediaDocs.vizualizaceDvouPohleduRD7 = await payload.create({
    collection: 'media',
    data: vizualizaceDvouPohleduRD7,
    file: await fetchFileByPath('./vizualizace-dvou-pohledu-rodinneho-domu/7.jpg'),
  })
  mediaDocs.vizualizaceDvouPohleduRD8 = await payload.create({
    collection: 'media',
    data: vizualizaceDvouPohleduRD8,
    file: await fetchFileByPath('./vizualizace-dvou-pohledu-rodinneho-domu/8.jpg'),
  })
  mediaDocs.vizualizaceDvouPohleduRD9 = await payload.create({
    collection: 'media',
    data: vizualizaceDvouPohleduRD9,
    file: await fetchFileByPath('./vizualizace-dvou-pohledu-rodinneho-domu/9.jpg'),
  })

  mediaDocs.revitalizacePanelak1 = await payload.create({
    collection: 'media',
    data: revitalizacePanelak1,
    file: await fetchFileByPath('./revitalizace-fasady-paneloveho-domu/1.jpg'),
  })
  mediaDocs.revitalizacePanelak2 = await payload.create({
    collection: 'media',
    data: revitalizacePanelak2,
    file: await fetchFileByPath('./revitalizace-fasady-paneloveho-domu/2.jpg'),
  })
  mediaDocs.revitalizacePanelak3 = await payload.create({
    collection: 'media',
    data: revitalizacePanelak3,
    file: await fetchFileByPath('./revitalizace-fasady-paneloveho-domu/3.jpg'),
  })
  mediaDocs.revitalizacePanelak4 = await payload.create({
    collection: 'media',
    data: revitalizacePanelak4,
    file: await fetchFileByPath('./revitalizace-fasady-paneloveho-domu/4.jpg'),
  })
  mediaDocs.revitalizacePanelak5 = await payload.create({
    collection: 'media',
    data: revitalizacePanelak5,
    file: await fetchFileByPath('./revitalizace-fasady-paneloveho-domu/5.jpg'),
  })
  mediaDocs.revitalizacePanelak6 = await payload.create({
    collection: 'media',
    data: revitalizacePanelak6,
    file: await fetchFileByPath('./revitalizace-fasady-paneloveho-domu/6.jpg'),
  })
  mediaDocs.revitalizacePanelak7 = await payload.create({
    collection: 'media',
    data: revitalizacePanelak7,
    file: await fetchFileByPath('./revitalizace-fasady-paneloveho-domu/7.jpg'),
  })
  mediaDocs.revitalizacePanelak8 = await payload.create({
    collection: 'media',
    data: revitalizacePanelak8,
    file: await fetchFileByPath('./revitalizace-fasady-paneloveho-domu/8.jpg'),
  })

  mediaDocs.vizualizaceNovostavbyRD1 = await payload.create({
    collection: 'media',
    data: vizualizaceNovostavbyRD1,
    file: await fetchFileByPath('./vizualizace-navrhu-fasady-novostavby-rodinneho-domu/1.jpg'),
  })
  mediaDocs.vizualizaceNovostavbyRD2 = await payload.create({
    collection: 'media',
    data: vizualizaceNovostavbyRD2,
    file: await fetchFileByPath('./vizualizace-navrhu-fasady-novostavby-rodinneho-domu/2.jpg'),
  })
  mediaDocs.vizualizaceNovostavbyRD3 = await payload.create({
    collection: 'media',
    data: vizualizaceNovostavbyRD3,
    file: await fetchFileByPath('./vizualizace-navrhu-fasady-novostavby-rodinneho-domu/3.jpg'),
  })
  mediaDocs.vizualizaceNovostavbyRD4 = await payload.create({
    collection: 'media',
    data: vizualizaceNovostavbyRD4,
    file: await fetchFileByPath('./vizualizace-navrhu-fasady-novostavby-rodinneho-domu/4.jpg'),
  })
  mediaDocs.vizualizaceNovostavbyRD5 = await payload.create({
    collection: 'media',
    data: vizualizaceNovostavbyRD5,
    file: await fetchFileByPath('./vizualizace-navrhu-fasady-novostavby-rodinneho-domu/5.jpg'),
  })
  mediaDocs.vizualizaceNovostavbyRD6 = await payload.create({
    collection: 'media',
    data: vizualizaceNovostavbyRD6,
    file: await fetchFileByPath('./vizualizace-navrhu-fasady-novostavby-rodinneho-domu/6.jpg'),
  })
  mediaDocs.vizualizaceNovostavbyRD7 = await payload.create({
    collection: 'media',
    data: vizualizaceNovostavbyRD7,
    file: await fetchFileByPath('./vizualizace-navrhu-fasady-novostavby-rodinneho-domu/7.jpg'),
  })
  mediaDocs.vizualizaceNovostavbyRD8 = await payload.create({
    collection: 'media',
    data: vizualizaceNovostavbyRD8,
    file: await fetchFileByPath('./vizualizace-navrhu-fasady-novostavby-rodinneho-domu/8.jpg'),
  })
  mediaDocs.vizualizaceNovostavbyRD9 = await payload.create({
    collection: 'media',
    data: vizualizaceNovostavbyRD9,
    file: await fetchFileByPath('./vizualizace-navrhu-fasady-novostavby-rodinneho-domu/9.jpg'),
  })

  mediaDocs.rekonstrukceFasadyStrecha1 = await payload.create({
    collection: 'media',
    data: rekonstrukceFasadyStrecha1,
    file: await fetchFileByPath('./rekonstrukce-fasady-a-vymena-strechy/1.jpg'),
  })
  mediaDocs.rekonstrukceFasadyStrecha2 = await payload.create({
    collection: 'media',
    data: rekonstrukceFasadyStrecha2,
    file: await fetchFileByPath('./rekonstrukce-fasady-a-vymena-strechy/2.jpg'),
  })
  mediaDocs.rekonstrukceFasadyStrecha3 = await payload.create({
    collection: 'media',
    data: rekonstrukceFasadyStrecha3,
    file: await fetchFileByPath('./rekonstrukce-fasady-a-vymena-strechy/3.jpg'),
  })
  mediaDocs.rekonstrukceFasadyStrecha4 = await payload.create({
    collection: 'media',
    data: rekonstrukceFasadyStrecha4,
    file: await fetchFileByPath('./rekonstrukce-fasady-a-vymena-strechy/4.jpg'),
  })
  mediaDocs.rekonstrukceFasadyStrecha5 = await payload.create({
    collection: 'media',
    data: rekonstrukceFasadyStrecha5,
    file: await fetchFileByPath('./rekonstrukce-fasady-a-vymena-strechy/5.jpg'),
  })
  mediaDocs.rekonstrukceFasadyStrecha6 = await payload.create({
    collection: 'media',
    data: rekonstrukceFasadyStrecha6,
    file: await fetchFileByPath('./rekonstrukce-fasady-a-vymena-strechy/6.jpg'),
  })
  mediaDocs.rekonstrukceFasadyStrecha7 = await payload.create({
    collection: 'media',
    data: rekonstrukceFasadyStrecha7,
    file: await fetchFileByPath('./rekonstrukce-fasady-a-vymena-strechy/7.jpg'),
  })
  mediaDocs.rekonstrukceFasadyStrecha8 = await payload.create({
    collection: 'media',
    data: rekonstrukceFasadyStrecha8,
    file: await fetchFileByPath('./rekonstrukce-fasady-a-vymena-strechy/8.jpg'),
  })
  mediaDocs.rekonstrukceFasadyStrecha9 = await payload.create({
    collection: 'media',
    data: rekonstrukceFasadyStrecha9,
    file: await fetchFileByPath('./rekonstrukce-fasady-a-vymena-strechy/9.jpg'),
  })

  mediaDocs.navrhBarevnostiFasady1 = await payload.create({
    collection: 'media',
    data: navrhBarevnostiFasady1,
    file: await fetchFileByPath('./navrh-barevnosti-fasady/1.jpg'),
  })
  mediaDocs.navrhBarevnostiFasady2 = await payload.create({
    collection: 'media',
    data: navrhBarevnostiFasady2,
    file: await fetchFileByPath('./navrh-barevnosti-fasady/2.jpg'),
  })
  mediaDocs.navrhBarevnostiFasady3 = await payload.create({
    collection: 'media',
    data: navrhBarevnostiFasady3,
    file: await fetchFileByPath('./navrh-barevnosti-fasady/3.jpg'),
  })
  mediaDocs.navrhBarevnostiFasady4 = await payload.create({
    collection: 'media',
    data: navrhBarevnostiFasady4,
    file: await fetchFileByPath('./navrh-barevnosti-fasady/4.jpg'),
  })
  mediaDocs.navrhBarevnostiFasady5 = await payload.create({
    collection: 'media',
    data: navrhBarevnostiFasady5,
    file: await fetchFileByPath('./navrh-barevnosti-fasady/5.jpg'),
  })
  mediaDocs.navrhBarevnostiFasady6 = await payload.create({
    collection: 'media',
    data: navrhBarevnostiFasady6,
    file: await fetchFileByPath('./navrh-barevnosti-fasady/6.jpg'),
  })
  mediaDocs.navrhBarevnostiFasady7 = await payload.create({
    collection: 'media',
    data: navrhBarevnostiFasady7,
    file: await fetchFileByPath('./navrh-barevnosti-fasady/7.jpg'),
  })
  mediaDocs.navrhBarevnostiFasady8 = await payload.create({
    collection: 'media',
    data: navrhBarevnostiFasady8,
    file: await fetchFileByPath('./navrh-barevnosti-fasady/8.jpg'),
  })
  mediaDocs.navrhBarevnostiFasady9 = await payload.create({
    collection: 'media',
    data: navrhBarevnostiFasady9,
    file: await fetchFileByPath('./navrh-barevnosti-fasady/9.jpg'),
  })
  mediaDocs.navrhBarevnostiFasady10 = await payload.create({
    collection: 'media',
    data: navrhBarevnostiFasady10,
    file: await fetchFileByPath('./navrh-barevnosti-fasady/10.jpg'),
  })
  mediaDocs.navrhBarevnostiFasady11 = await payload.create({
    collection: 'media',
    data: navrhBarevnostiFasady11,
    file: await fetchFileByPath('./navrh-barevnosti-fasady/11.jpg'),
  })
  mediaDocs.navrhBarevnostiFasady12 = await payload.create({
    collection: 'media',
    data: navrhBarevnostiFasady12,
    file: await fetchFileByPath('./navrh-barevnosti-fasady/12.jpg'),
  })
  mediaDocs.navrhBarevnostiFasady13 = await payload.create({
    collection: 'media',
    data: navrhBarevnostiFasady13,
    file: await fetchFileByPath('./navrh-barevnosti-fasady/13.jpg'),
  })

  mediaDocs.navrhFasadyRD1 = await payload.create({
    collection: 'media',
    data: navrhFasadyRD1,
    file: await fetchFileByPath('./navrh-fasady-rodinneho-domu/1.jpg'),
  })
  mediaDocs.navrhFasadyRD2 = await payload.create({
    collection: 'media',
    data: navrhFasadyRD2,
    file: await fetchFileByPath('./navrh-fasady-rodinneho-domu/2.jpg'),
  })
  mediaDocs.navrhFasadyRD3 = await payload.create({
    collection: 'media',
    data: navrhFasadyRD3,
    file: await fetchFileByPath('./navrh-fasady-rodinneho-domu/3.jpg'),
  })
  mediaDocs.navrhFasadyRD4 = await payload.create({
    collection: 'media',
    data: navrhFasadyRD4,
    file: await fetchFileByPath('./navrh-fasady-rodinneho-domu/4.jpg'),
  })
  mediaDocs.navrhFasadyRD5 = await payload.create({
    collection: 'media',
    data: navrhFasadyRD5,
    file: await fetchFileByPath('./navrh-fasady-rodinneho-domu/5.jpg'),
  })

  mediaDocs.bytovyDumBrno1 = await payload.create({
    collection: 'media',
    data: bytovyDumBrno1,
    file: await fetchFileByPath('./bytovy-dum-brno/1.jpg'),
  })
  mediaDocs.bytovyDumBrno2 = await payload.create({
    collection: 'media',
    data: bytovyDumBrno2,
    file: await fetchFileByPath('./bytovy-dum-brno/2.jpg'),
  })
  mediaDocs.bytovyDumBrno3 = await payload.create({
    collection: 'media',
    data: bytovyDumBrno3,
    file: await fetchFileByPath('./bytovy-dum-brno/3.jpg'),
  })
  mediaDocs.bytovyDumBrno4 = await payload.create({
    collection: 'media',
    data: bytovyDumBrno4,
    file: await fetchFileByPath('./bytovy-dum-brno/4.jpg'),
  })
  mediaDocs.bytovyDumBrno5 = await payload.create({
    collection: 'media',
    data: bytovyDumBrno5,
    file: await fetchFileByPath('./bytovy-dum-brno/5.jpg'),
  })
  mediaDocs.bytovyDumBrno6 = await payload.create({
    collection: 'media',
    data: bytovyDumBrno6,
    file: await fetchFileByPath('./bytovy-dum-brno/6.jpg'),
  })
  mediaDocs.bytovyDumBrno7 = await payload.create({
    collection: 'media',
    data: bytovyDumBrno7,
    file: await fetchFileByPath('./bytovy-dum-brno/7.jpg'),
  })
  mediaDocs.bytovyDumBrno8 = await payload.create({
    collection: 'media',
    data: bytovyDumBrno8,
    file: await fetchFileByPath('./bytovy-dum-brno/8.jpg'),
  })
  mediaDocs.bytovyDumBrno9 = await payload.create({
    collection: 'media',
    data: bytovyDumBrno9,
    file: await fetchFileByPath('./bytovy-dum-brno/9.jpg'),
  })

  mediaDocs.drevenaFasada1 = await payload.create({
    collection: 'media',
    data: drevenaFasada1,
    file: await fetchFileByPath('./drevena-fasada/1.jpg'),
  })
  mediaDocs.drevenaFasada2 = await payload.create({
    collection: 'media',
    data: drevenaFasada2,
    file: await fetchFileByPath('./drevena-fasada/2.jpg'),
  })
  mediaDocs.drevenaFasada3 = await payload.create({
    collection: 'media',
    data: drevenaFasada3,
    file: await fetchFileByPath('./drevena-fasada/3.jpg'),
  })
  mediaDocs.drevenaFasada4 = await payload.create({
    collection: 'media',
    data: drevenaFasada4,
    file: await fetchFileByPath('./drevena-fasada/4.jpg'),
  })
  mediaDocs.drevenaFasada5 = await payload.create({
    collection: 'media',
    data: drevenaFasada5,
    file: await fetchFileByPath('./drevena-fasada/5.jpg'),
  })
  mediaDocs.drevenaFasada6 = await payload.create({
    collection: 'media',
    data: drevenaFasada6,
    file: await fetchFileByPath('./drevena-fasada/6.jpg'),
  })
  mediaDocs.drevenaFasada7 = await payload.create({
    collection: 'media',
    data: drevenaFasada7,
    file: await fetchFileByPath('./drevena-fasada/7.jpg'),
  })
  mediaDocs.drevenaFasada8 = await payload.create({
    collection: 'media',
    data: drevenaFasada8,
    file: await fetchFileByPath('./drevena-fasada/8.jpg'),
  })
  mediaDocs.drevenaFasada9 = await payload.create({
    collection: 'media',
    data: drevenaFasada9,
    file: await fetchFileByPath('./drevena-fasada/9.jpg'),
  })

  mediaDocs.navrhFasadyKamen1 = await payload.create({
    collection: 'media',
    data: navrhFasadyKamen1,
    file: await fetchFileByPath('./navrh-fasady-barevne-kombinace-s-obkladem-kamen/1.jpg'),
  })
  mediaDocs.navrhFasadyKamen2 = await payload.create({
    collection: 'media',
    data: navrhFasadyKamen2,
    file: await fetchFileByPath('./navrh-fasady-barevne-kombinace-s-obkladem-kamen/2.jpg'),
  })
  mediaDocs.navrhFasadyKamen3 = await payload.create({
    collection: 'media',
    data: navrhFasadyKamen3,
    file: await fetchFileByPath('./navrh-fasady-barevne-kombinace-s-obkladem-kamen/3.jpg'),
  })
  mediaDocs.navrhFasadyKamen4 = await payload.create({
    collection: 'media',
    data: navrhFasadyKamen4,
    file: await fetchFileByPath('./navrh-fasady-barevne-kombinace-s-obkladem-kamen/4.jpg'),
  })
  mediaDocs.navrhFasadyKamen5 = await payload.create({
    collection: 'media',
    data: navrhFasadyKamen5,
    file: await fetchFileByPath('./navrh-fasady-barevne-kombinace-s-obkladem-kamen/5.jpg'),
  })
  mediaDocs.navrhFasadyKamen6 = await payload.create({
    collection: 'media',
    data: navrhFasadyKamen6,
    file: await fetchFileByPath('./navrh-fasady-barevne-kombinace-s-obkladem-kamen/6.jpg'),
  })
  mediaDocs.navrhFasadyKamen7 = await payload.create({
    collection: 'media',
    data: navrhFasadyKamen7,
    file: await fetchFileByPath('./navrh-fasady-barevne-kombinace-s-obkladem-kamen/7.jpg'),
  })
  mediaDocs.navrhFasadyKamen8 = await payload.create({
    collection: 'media',
    data: navrhFasadyKamen8,
    file: await fetchFileByPath('./navrh-fasady-barevne-kombinace-s-obkladem-kamen/8.jpg'),
  })
  mediaDocs.navrhFasadyKamen9 = await payload.create({
    collection: 'media',
    data: navrhFasadyKamen9,
    file: await fetchFileByPath('./navrh-fasady-barevne-kombinace-s-obkladem-kamen/9.jpg'),
  })

  mediaDocs.barevnyNavrhObklad1 = await payload.create({
    collection: 'media',
    data: barevnyNavrhObklad1,
    file: await fetchFileByPath('./barevny-navrh-fasady-vcetne-obkladu-ze-dreva-ci-kamene/1.jpg'),
  })
  mediaDocs.barevnyNavrhObklad2 = await payload.create({
    collection: 'media',
    data: barevnyNavrhObklad2,
    file: await fetchFileByPath('./barevny-navrh-fasady-vcetne-obkladu-ze-dreva-ci-kamene/2.jpg'),
  })
  mediaDocs.barevnyNavrhObklad3 = await payload.create({
    collection: 'media',
    data: barevnyNavrhObklad3,
    file: await fetchFileByPath('./barevny-navrh-fasady-vcetne-obkladu-ze-dreva-ci-kamene/3.jpg'),
  })
  mediaDocs.barevnyNavrhObklad4 = await payload.create({
    collection: 'media',
    data: barevnyNavrhObklad4,
    file: await fetchFileByPath('./barevny-navrh-fasady-vcetne-obkladu-ze-dreva-ci-kamene/4.jpg'),
  })
  mediaDocs.barevnyNavrhObklad5 = await payload.create({
    collection: 'media',
    data: barevnyNavrhObklad5,
    file: await fetchFileByPath('./barevny-navrh-fasady-vcetne-obkladu-ze-dreva-ci-kamene/5.jpg'),
  })
  mediaDocs.barevnyNavrhObklad6 = await payload.create({
    collection: 'media',
    data: barevnyNavrhObklad6,
    file: await fetchFileByPath('./barevny-navrh-fasady-vcetne-obkladu-ze-dreva-ci-kamene/6.jpg'),
  })
  mediaDocs.barevnyNavrhObklad7 = await payload.create({
    collection: 'media',
    data: barevnyNavrhObklad7,
    file: await fetchFileByPath('./barevny-navrh-fasady-vcetne-obkladu-ze-dreva-ci-kamene/7.jpg'),
  })
  mediaDocs.barevnyNavrhObklad8 = await payload.create({
    collection: 'media',
    data: barevnyNavrhObklad8,
    file: await fetchFileByPath('./barevny-navrh-fasady-vcetne-obkladu-ze-dreva-ci-kamene/8.jpg'),
  })
  mediaDocs.barevnyNavrhObklad9 = await payload.create({
    collection: 'media',
    data: barevnyNavrhObklad9,
    file: await fetchFileByPath('./barevny-navrh-fasady-vcetne-obkladu-ze-dreva-ci-kamene/9.jpg'),
  })

  mediaDocs.vizualizaceFasadyZabradli1 = await payload.create({
    collection: 'media',
    data: vizualizaceFasadyZabradli1,
    file: await fetchFileByPath('./vizualizace-fasady-zabradli-a-schodu/1.jpg'),
  })
  mediaDocs.vizualizaceFasadyZabradli2 = await payload.create({
    collection: 'media',
    data: vizualizaceFasadyZabradli2,
    file: await fetchFileByPath('./vizualizace-fasady-zabradli-a-schodu/2.jpg'),
  })
  mediaDocs.vizualizaceFasadyZabradli3 = await payload.create({
    collection: 'media',
    data: vizualizaceFasadyZabradli3,
    file: await fetchFileByPath('./vizualizace-fasady-zabradli-a-schodu/3.jpg'),
  })
  mediaDocs.vizualizaceFasadyZabradli4 = await payload.create({
    collection: 'media',
    data: vizualizaceFasadyZabradli4,
    file: await fetchFileByPath('./vizualizace-fasady-zabradli-a-schodu/4.jpg'),
  })
  mediaDocs.vizualizaceFasadyZabradli5 = await payload.create({
    collection: 'media',
    data: vizualizaceFasadyZabradli5,
    file: await fetchFileByPath('./vizualizace-fasady-zabradli-a-schodu/5.jpg'),
  })
  mediaDocs.vizualizaceFasadyZabradli6 = await payload.create({
    collection: 'media',
    data: vizualizaceFasadyZabradli6,
    file: await fetchFileByPath('./vizualizace-fasady-zabradli-a-schodu/6.jpg'),
  })
  mediaDocs.vizualizaceFasadyZabradli7 = await payload.create({
    collection: 'media',
    data: vizualizaceFasadyZabradli7,
    file: await fetchFileByPath('./vizualizace-fasady-zabradli-a-schodu/7.jpg'),
  })
  mediaDocs.vizualizaceFasadyZabradli8 = await payload.create({
    collection: 'media',
    data: vizualizaceFasadyZabradli8,
    file: await fetchFileByPath('./vizualizace-fasady-zabradli-a-schodu/8.jpg'),
  })
  mediaDocs.vizualizaceFasadyZabradli9 = await payload.create({
    collection: 'media',
    data: vizualizaceFasadyZabradli9,
    file: await fetchFileByPath('./vizualizace-fasady-zabradli-a-schodu/9.jpg'),
  })

  mediaDocs.realizaceFasady3_1 = await payload.create({
    collection: 'media',
    data: realizaceFasady3_1,
    file: await fetchFileByPath('./realizace-fasady-3/puvodni-stav.jpg'),
  })
  mediaDocs.realizaceFasady3_2 = await payload.create({
    collection: 'media',
    data: realizaceFasady3_2,
    file: await fetchFileByPath('./realizace-fasady-3/puvodni-stav-2.jpg'),
  })
  mediaDocs.realizaceFasady3_3 = await payload.create({
    collection: 'media',
    data: realizaceFasady3_3,
    file: await fetchFileByPath('./realizace-fasady-3/vizualizace-navrhu-fasady.jpg'),
  })
  mediaDocs.realizaceFasady3_4 = await payload.create({
    collection: 'media',
    data: realizaceFasady3_4,
    file: await fetchFileByPath('./realizace-fasady-3/vizualizace-navrhu-fasady-2.jpg'),
  })
  mediaDocs.realizaceFasady3_5 = await payload.create({
    collection: 'media',
    data: realizaceFasady3_5,
    file: await fetchFileByPath('./realizace-fasady-3/realizace.jpg'),
  })

  mediaDocs.realizaceFasadyBukovinka1 = await payload.create({
    collection: 'media',
    data: realizaceFasadyBukovinka1,
    file: await fetchFileByPath('./realizace-fasady-bukovinka/puvodni-predni-strana.jpg'),
  })
  mediaDocs.realizaceFasadyBukovinka2 = await payload.create({
    collection: 'media',
    data: realizaceFasadyBukovinka2,
    file: await fetchFileByPath('./realizace-fasady-bukovinka/puvodni-vchod-a-garaz.jpg'),
  })
  mediaDocs.realizaceFasadyBukovinka3 = await payload.create({
    collection: 'media',
    data: realizaceFasadyBukovinka3,
    file: await fetchFileByPath('./realizace-fasady-bukovinka/puvodni-zepredu-a-z-boku.jpg'),
  })
  mediaDocs.realizaceFasadyBukovinka4 = await payload.create({
    collection: 'media',
    data: realizaceFasadyBukovinka4,
    file: await fetchFileByPath('./realizace-fasady-bukovinka/puvodni-zezadu-s-terasou.jpg'),
  })
  mediaDocs.realizaceFasadyBukovinka5 = await payload.create({
    collection: 'media',
    data: realizaceFasadyBukovinka5,
    file: await fetchFileByPath('./realizace-fasady-bukovinka/navrh-predni-strana.jpg'),
  })
  mediaDocs.realizaceFasadyBukovinka6 = await payload.create({
    collection: 'media',
    data: realizaceFasadyBukovinka6,
    file: await fetchFileByPath('./realizace-fasady-bukovinka/navrh-vchod-a-garaz.jpg'),
  })
  mediaDocs.realizaceFasadyBukovinka7 = await payload.create({
    collection: 'media',
    data: realizaceFasadyBukovinka7,
    file: await fetchFileByPath('./realizace-fasady-bukovinka/navrh-zepredu-a-z-boku.jpg'),
  })
  mediaDocs.realizaceFasadyBukovinka8 = await payload.create({
    collection: 'media',
    data: realizaceFasadyBukovinka8,
    file: await fetchFileByPath('./realizace-fasady-bukovinka/navrh-zezadu-s-terasou.jpg'),
  })
  mediaDocs.realizaceFasadyBukovinka9 = await payload.create({
    collection: 'media',
    data: realizaceFasadyBukovinka9,
    file: await fetchFileByPath('./realizace-fasady-bukovinka/realizace-predni-strana.jpg'),
  })
  mediaDocs.realizaceFasadyBukovinka10 = await payload.create({
    collection: 'media',
    data: realizaceFasadyBukovinka10,
    file: await fetchFileByPath('./realizace-fasady-bukovinka/realizace-vchod-a-garaz.jpg'),
  })
  mediaDocs.realizaceFasadyBukovinka11 = await payload.create({
    collection: 'media',
    data: realizaceFasadyBukovinka11,
    file: await fetchFileByPath('./realizace-fasady-bukovinka/realizace-zepredu-a-z-boku.jpg'),
  })
  mediaDocs.realizaceFasadyBukovinka12 = await payload.create({
    collection: 'media',
    data: realizaceFasadyBukovinka12,
    file: await fetchFileByPath('./realizace-fasady-bukovinka/realizace-zezadu-s-terasou.jpg'),
  })

  mediaDocs.realizaceFasadyOstrava1 = await payload.create({
    collection: 'media',
    data: realizaceFasadyOstrava1,
    file: await fetchFileByPath('./realizace-fasady-ostrava/puvodni-dum.jpg'),
  })
  mediaDocs.realizaceFasadyOstrava2 = await payload.create({
    collection: 'media',
    data: realizaceFasadyOstrava2,
    file: await fetchFileByPath('./realizace-fasady-ostrava/navrh.jpg'),
  })
  mediaDocs.realizaceFasadyOstrava3 = await payload.create({
    collection: 'media',
    data: realizaceFasadyOstrava3,
    file: await fetchFileByPath('./realizace-fasady-ostrava/navrh-2.jpg'),
  })
  mediaDocs.realizaceFasadyOstrava4 = await payload.create({
    collection: 'media',
    data: realizaceFasadyOstrava4,
    file: await fetchFileByPath('./realizace-fasady-ostrava/realizace.jpg'),
  })

  mediaDocs.fasadaRodinnehoDomu1 = await payload.create({
    collection: 'media',
    data: fasadaRodinnehoDomu1,
    file: await fetchFileByPath('./fasada-rodinneho-domu/1.jpg'),
  })
  mediaDocs.fasadaRodinnehoDomu2 = await payload.create({
    collection: 'media',
    data: fasadaRodinnehoDomu2,
    file: await fetchFileByPath('./fasada-rodinneho-domu/2.jpg'),
  })
  mediaDocs.fasadaRodinnehoDomu3 = await payload.create({
    collection: 'media',
    data: fasadaRodinnehoDomu3,
    file: await fetchFileByPath('./fasada-rodinneho-domu/3.jpg'),
  })
  mediaDocs.fasadaRodinnehoDomu4 = await payload.create({
    collection: 'media',
    data: fasadaRodinnehoDomu4,
    file: await fetchFileByPath('./fasada-rodinneho-domu/4.jpg'),
  })

  mediaDocs.kamenNaFasadeRD1 = await payload.create({
    collection: 'media',
    data: kamenNaFasadeRD1,
    file: await fetchFileByPath('./kamen-na-fasade-rodinneho-domu/1.jpg'),
  })
  mediaDocs.kamenNaFasadeRD2 = await payload.create({
    collection: 'media',
    data: kamenNaFasadeRD2,
    file: await fetchFileByPath('./kamen-na-fasade-rodinneho-domu/4.jpg'),
  })
  mediaDocs.kamenNaFasadeRD3 = await payload.create({
    collection: 'media',
    data: kamenNaFasadeRD3,
    file: await fetchFileByPath('./kamen-na-fasade-rodinneho-domu/5.jpg'),
  })
  mediaDocs.kamenNaFasadeRD4 = await payload.create({
    collection: 'media',
    data: kamenNaFasadeRD4,
    file: await fetchFileByPath('./kamen-na-fasade-rodinneho-domu/6.jpg'),
  })
  mediaDocs.kamenNaFasadeRD5 = await payload.create({
    collection: 'media',
    data: kamenNaFasadeRD5,
    file: await fetchFileByPath('./kamen-na-fasade-rodinneho-domu/cihla.jpg'),
  })
  mediaDocs.kamenNaFasadeRD6 = await payload.create({
    collection: 'media',
    data: kamenNaFasadeRD6,
    file: await fetchFileByPath('./kamen-na-fasade-rodinneho-domu/cihla-2.jpg'),
  })
  mediaDocs.kamenNaFasadeRD7 = await payload.create({
    collection: 'media',
    data: kamenNaFasadeRD7,
    file: await fetchFileByPath('./kamen-na-fasade-rodinneho-domu/grenada.jpg'),
  })
  mediaDocs.kamenNaFasadeRD8 = await payload.create({
    collection: 'media',
    data: kamenNaFasadeRD8,
    file: await fetchFileByPath('./kamen-na-fasade-rodinneho-domu/grenada-2.jpg'),
  })

  mediaDocs.rodinnyDum1 = await payload.create({
    collection: 'media',
    data: rodinnyDum1,
    file: await fetchFileByPath('./rodinny-dum/navrh-1.jpg'),
  })
  mediaDocs.rodinnyDum2 = await payload.create({
    collection: 'media',
    data: rodinnyDum2,
    file: await fetchFileByPath('./rodinny-dum/navrh-2.jpg'),
  })
  mediaDocs.rodinnyDum3 = await payload.create({
    collection: 'media',
    data: rodinnyDum3,
    file: await fetchFileByPath('./rodinny-dum/navrh-3.jpg'),
  })
  mediaDocs.rodinnyDum4 = await payload.create({
    collection: 'media',
    data: rodinnyDum4,
    file: await fetchFileByPath('./rodinny-dum/navrh-4.jpg'),
  })
  mediaDocs.rodinnyDum5 = await payload.create({
    collection: 'media',
    data: rodinnyDum5,
    file: await fetchFileByPath('./rodinny-dum/navrh-5.jpg'),
  })
  mediaDocs.rodinnyDum6 = await payload.create({
    collection: 'media',
    data: rodinnyDum6,
    file: await fetchFileByPath('./rodinny-dum/navrh-6.jpg'),
  })
  mediaDocs.rodinnyDum7 = await payload.create({
    collection: 'media',
    data: rodinnyDum7,
    file: await fetchFileByPath('./rodinny-dum/navrh-7.jpg'),
  })
  mediaDocs.rodinnyDum8 = await payload.create({
    collection: 'media',
    data: rodinnyDum8,
    file: await fetchFileByPath('./rodinny-dum/navrh-8.jpg'),
  })
  mediaDocs.rodinnyDum9 = await payload.create({
    collection: 'media',
    data: rodinnyDum9,
    file: await fetchFileByPath('./rodinny-dum/navrh-9.jpg'),
  })
  mediaDocs.rodinnyDum10 = await payload.create({
    collection: 'media',
    data: rodinnyDum10,
    file: await fetchFileByPath('./rodinny-dum/navrh-10.jpg'),
  })
  mediaDocs.rodinnyDum11 = await payload.create({
    collection: 'media',
    data: rodinnyDum11,
    file: await fetchFileByPath('./rodinny-dum/navrh-11.jpg'),
  })
  mediaDocs.rodinnyDum12 = await payload.create({
    collection: 'media',
    data: rodinnyDum12,
    file: await fetchFileByPath('./rodinny-dum/navrh-12.jpg'),
  })

  mediaDocs.vizualizaceBarevneFasadyRD1 = await payload.create({
    collection: 'media',
    data: vizualizaceBarevneFasadyRD1,
    file: await fetchFileByPath('./vizualizace-barevne-fasady-rodinneho-domu/1.jpg'),
  })
  mediaDocs.vizualizaceBarevneFasadyRD2 = await payload.create({
    collection: 'media',
    data: vizualizaceBarevneFasadyRD2,
    file: await fetchFileByPath('./vizualizace-barevne-fasady-rodinneho-domu/2.jpg'),
  })
  mediaDocs.vizualizaceBarevneFasadyRD3 = await payload.create({
    collection: 'media',
    data: vizualizaceBarevneFasadyRD3,
    file: await fetchFileByPath('./vizualizace-barevne-fasady-rodinneho-domu/3.jpg'),
  })
  mediaDocs.vizualizaceBarevneFasadyRD4 = await payload.create({
    collection: 'media',
    data: vizualizaceBarevneFasadyRD4,
    file: await fetchFileByPath('./vizualizace-barevne-fasady-rodinneho-domu/4.jpg'),
  })
  mediaDocs.vizualizaceBarevneFasadyRD5 = await payload.create({
    collection: 'media',
    data: vizualizaceBarevneFasadyRD5,
    file: await fetchFileByPath('./vizualizace-barevne-fasady-rodinneho-domu/5.jpg'),
  })
  mediaDocs.vizualizaceBarevneFasadyRD6 = await payload.create({
    collection: 'media',
    data: vizualizaceBarevneFasadyRD6,
    file: await fetchFileByPath('./vizualizace-barevne-fasady-rodinneho-domu/6.jpg'),
  })
  mediaDocs.vizualizaceBarevneFasadyRD7 = await payload.create({
    collection: 'media',
    data: vizualizaceBarevneFasadyRD7,
    file: await fetchFileByPath('./vizualizace-barevne-fasady-rodinneho-domu/7.jpg'),
  })
  mediaDocs.vizualizaceBarevneFasadyRD8 = await payload.create({
    collection: 'media',
    data: vizualizaceBarevneFasadyRD8,
    file: await fetchFileByPath('./vizualizace-barevne-fasady-rodinneho-domu/8.jpg'),
  })

  // Seed forms
  payload.logger.info('— Seeding forms...')
  const contactFormDoc = await payload.create({
    collection: 'forms',
    data: contactForm,
  })

  // Seed projects
  payload.logger.info('— Seeding projects...')
  const projectData = projects(mediaDocs as ProjectsArgs)
  for (const project of projectData) {
    await payload.create({
      collection: 'projects',
      data: project,
    })
  }

  // Seed pages
  payload.logger.info('— Seeding pages...')
  await payload.create({
    collection: 'pages',
    depth: 3,
    data: uvod({
      heroImage: mediaDocs.heroBg,
      contactForm: contactFormDoc,
    }),
  })
  await payload.create({
    collection: 'pages',
    depth: 3,
    data: fotogalerie({
      galleryHeroImage: mediaDocs.modernOffice,
    }),
  })
  await payload.create({
    collection: 'pages',
    depth: 3,
    data: kontakt({
      contactImage: mediaDocs.contactImage,
      contactForm: contactFormDoc,
    }),
  })
  await payload.create({
    collection: 'pages',
    depth: 3,
    data: landing({
      landingHeroImage: mediaDocs.landingHeroImage,
      contactForm: contactFormDoc,
    }),
  })
  await payload.create({
    collection: 'pages',
    depth: 3,
    data: poptavka({
      contactImage: mediaDocs.contactImage,
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
