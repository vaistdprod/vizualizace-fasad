// src/seed/projects.ts
import type { RequiredDataFromCollectionSlug } from 'payload'
import type { Media } from '@/payload-types'

export type ProjectsArgs = {
  // Images from uvod.ts
  modernOfficeTower: Media
  luxuryResidential: Media
  culturalCenter: Media
  vizualizaceDvouPohleduRD1: Media
  vizualizaceDvouPohleduRD2: Media
  vizualizaceDvouPohleduRD3: Media
  vizualizaceDvouPohleduRD4: Media
  vizualizaceDvouPohleduRD5: Media
  vizualizaceDvouPohleduRD6: Media
  vizualizaceDvouPohleduRD7: Media
  vizualizaceDvouPohleduRD8: Media
  vizualizaceDvouPohleduRD9: Media
  revitalizacePanelak1: Media
  revitalizacePanelak2: Media
  revitalizacePanelak3: Media
  revitalizacePanelak4: Media
  revitalizacePanelak5: Media
  revitalizacePanelak6: Media
  revitalizacePanelak7: Media
  revitalizacePanelak8: Media
  vizualizaceNovostavbyRD1: Media
  vizualizaceNovostavbyRD2: Media
  vizualizaceNovostavbyRD3: Media
  vizualizaceNovostavbyRD4: Media
  vizualizaceNovostavbyRD5: Media
  vizualizaceNovostavbyRD6: Media
  vizualizaceNovostavbyRD7: Media
  vizualizaceNovostavbyRD8: Media
  vizualizaceNovostavbyRD9: Media
  rekonstrukceFasadyStrecha1: Media
  rekonstrukceFasadyStrecha2: Media
  rekonstrukceFasadyStrecha3: Media
  rekonstrukceFasadyStrecha4: Media
  rekonstrukceFasadyStrecha5: Media
  rekonstrukceFasadyStrecha6: Media
  rekonstrukceFasadyStrecha7: Media
  rekonstrukceFasadyStrecha8: Media
  rekonstrukceFasadyStrecha9: Media
  navrhBarevnostiFasady1: Media
  navrhBarevnostiFasady2: Media
  navrhBarevnostiFasady3: Media
  navrhBarevnostiFasady4: Media
  navrhBarevnostiFasady5: Media
  navrhBarevnostiFasady6: Media
  navrhBarevnostiFasady7: Media
  navrhBarevnostiFasady8: Media
  navrhBarevnostiFasady9: Media
  navrhBarevnostiFasady10: Media
  navrhBarevnostiFasady11: Media
  navrhBarevnostiFasady12: Media
  navrhBarevnostiFasady13: Media
  navrhFasadyRD1: Media
  navrhFasadyRD2: Media
  navrhFasadyRD3: Media
  navrhFasadyRD4: Media
  navrhFasadyRD5: Media
  bytovyDumBrno1: Media
  bytovyDumBrno2: Media
  bytovyDumBrno3: Media
  bytovyDumBrno4: Media
  bytovyDumBrno5: Media
  bytovyDumBrno6: Media
  bytovyDumBrno7: Media
  bytovyDumBrno8: Media
  bytovyDumBrno9: Media
  drevenaFasada1: Media
  drevenaFasada2: Media
  drevenaFasada3: Media
  drevenaFasada4: Media
  drevenaFasada5: Media
  drevenaFasada6: Media
  drevenaFasada7: Media
  drevenaFasada8: Media
  drevenaFasada9: Media
  navrhFasadyKamen1: Media
  navrhFasadyKamen2: Media
  navrhFasadyKamen3: Media
  navrhFasadyKamen4: Media
  navrhFasadyKamen5: Media
  navrhFasadyKamen6: Media
  navrhFasadyKamen7: Media
  navrhFasadyKamen8: Media
  navrhFasadyKamen9: Media
  barevnyNavrhObklad1: Media
  barevnyNavrhObklad2: Media
  barevnyNavrhObklad3: Media
  barevnyNavrhObklad4: Media
  barevnyNavrhObklad5: Media
  barevnyNavrhObklad6: Media
  barevnyNavrhObklad7: Media
  barevnyNavrhObklad8: Media
  barevnyNavrhObklad9: Media
  vizualizaceFasadyZabradli1: Media
  vizualizaceFasadyZabradli2: Media
  vizualizaceFasadyZabradli3: Media
  vizualizaceFasadyZabradli4: Media
  vizualizaceFasadyZabradli5: Media
  vizualizaceFasadyZabradli6: Media
  vizualizaceFasadyZabradli7: Media
  vizualizaceFasadyZabradli8: Media
  vizualizaceFasadyZabradli9: Media
  realizaceFasady3_1: Media
  realizaceFasady3_2: Media
  realizaceFasady3_3: Media
  realizaceFasady3_4: Media
  realizaceFasady3_5: Media
  realizaceFasadyBukovinka1: Media
  realizaceFasadyBukovinka2: Media
  realizaceFasadyBukovinka3: Media
  realizaceFasadyBukovinka4: Media
  realizaceFasadyBukovinka5: Media
  realizaceFasadyBukovinka6: Media
  realizaceFasadyBukovinka7: Media
  realizaceFasadyBukovinka8: Media
  realizaceFasadyBukovinka9: Media
  realizaceFasadyBukovinka10: Media
  realizaceFasadyBukovinka11: Media
  realizaceFasadyBukovinka12: Media
  realizaceFasadyOstrava1: Media
  realizaceFasadyOstrava2: Media
  realizaceFasadyOstrava3: Media
  realizaceFasadyOstrava4: Media
  fasadaRodinnehoDomu1: Media
  fasadaRodinnehoDomu2: Media
  fasadaRodinnehoDomu3: Media
  fasadaRodinnehoDomu4: Media
  kamenNaFasadeRD1: Media
  kamenNaFasadeRD2: Media
  kamenNaFasadeRD3: Media
  kamenNaFasadeRD4: Media
  kamenNaFasadeRD5: Media
  kamenNaFasadeRD6: Media
  kamenNaFasadeRD7: Media
  kamenNaFasadeRD8: Media
  rodinnyDum1: Media
  rodinnyDum2: Media
  rodinnyDum3: Media
  rodinnyDum4: Media
  rodinnyDum5: Media
  rodinnyDum6: Media
  rodinnyDum7: Media
  rodinnyDum8: Media
  rodinnyDum9: Media
  rodinnyDum10: Media
  rodinnyDum11: Media
  rodinnyDum12: Media
  vizualizaceBarevneFasadyRD1: Media
  vizualizaceBarevneFasadyRD2: Media
  vizualizaceBarevneFasadyRD3: Media
  vizualizaceBarevneFasadyRD4: Media
  vizualizaceBarevneFasadyRD5: Media
  vizualizaceBarevneFasadyRD6: Media
  vizualizaceBarevneFasadyRD7: Media
  vizualizaceBarevneFasadyRD8: Media
}

export const projects: (args: ProjectsArgs) => RequiredDataFromCollectionSlug<'projects'>[] = (
  args,
) => {
  const {
    modernOfficeTower,
    luxuryResidential,
    culturalCenter,
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
  } = args

  return [
    {
      title: 'Realizace fasády Ostrava',
      slug: 'realizace-fasady-ostrava',
      description:
        'Kompletní rekonstrukce fasády bytového domu v Ostravě včetně zateplení a nových balkónů.',
      images: [
        {
          title: 'Původní stav',
          image: realizaceFasadyOstrava1.id,
          caption: 'Stav před rekonstrukcí',
        },
        {
          title: 'Vizualizace - varianta 1',
          image: realizaceFasadyOstrava2.id,
          caption: 'Návrh nové fasády - první varianta',
        },
        {
          title: 'Vizualizace - varianta 2',
          image: realizaceFasadyOstrava3.id,
          caption: 'Návrh nové fasády - druhá varianta',
        },
        {
          title: 'Finální realizace',
          image: realizaceFasadyOstrava4.id,
          caption: 'Výsledný stav po rekonstrukci',
        },
      ],
      featuredImage: realizaceFasadyOstrava4.id,
      featured: true,
      publishedAt: new Date().toISOString(),
      _status: 'published',
    },
    {
      title: 'Realizace fasády Bukovinka',
      slug: 'realizace-fasady-bukovinka',
      description:
        'Renovace fasády rodinného domu v Bukovince s důrazem na zachování původního charakteru stavby.',
      images: [
        {
          title: 'Původní stav - přední strana',
          image: realizaceFasadyBukovinka1.id,
          caption: 'Stav před renovací - čelní pohled',
        },
        {
          title: 'Původní stav - vchod a garáž',
          image: realizaceFasadyBukovinka2.id,
          caption: 'Stav před renovací - vchod a garáž',
        },
        {
          title: 'Původní stav - zepředu a z boku',
          image: realizaceFasadyBukovinka3.id,
          caption: 'Stav před renovací - boční pohled',
        },
        {
          title: 'Původní stav - zezadu s terasou',
          image: realizaceFasadyBukovinka4.id,
          caption: 'Stav před renovací - zadní pohled',
        },
        {
          title: 'Vizualizace - přední strana',
          image: realizaceFasadyBukovinka5.id,
          caption: 'Návrh renovace - čelní pohled',
        },
        {
          title: 'Vizualizace - vchod a garáž',
          image: realizaceFasadyBukovinka6.id,
          caption: 'Návrh renovace - vchod a garáž',
        },
        {
          title: 'Vizualizace - zepředu a z boku',
          image: realizaceFasadyBukovinka7.id,
          caption: 'Návrh renovace - boční pohled',
        },
        {
          title: 'Vizualizace - zezadu s terasou',
          image: realizaceFasadyBukovinka8.id,
          caption: 'Návrh renovace - zadní pohled',
        },
        {
          title: 'Finální realizace - přední strana',
          image: realizaceFasadyBukovinka9.id,
          caption: 'Výsledný stav po renovaci - přední strana',
        },
        {
          title: 'Finální realizace - vchod a garáž',
          image: realizaceFasadyBukovinka10.id,
          caption: 'Výsledný stav po renovaci - vchod a garáž',
        },
        {
          title: 'Finální realizace - zepředu a z boku',
          image: realizaceFasadyBukovinka11.id,
          caption: 'Výsledný stav po renovaci - zepředu a z boku',
        },
        {
          title: 'Finální realizace - zezadu s terasou',
          image: realizaceFasadyBukovinka12.id,
          caption: 'Výsledný stav po renovaci',
        },
      ],
      featuredImage: realizaceFasadyBukovinka9.id,
      featured: true,
      publishedAt: new Date().toISOString(),
      _status: 'published',
    },
    {
      title: 'Realizace fasády 3',
      slug: 'realizace-fasady-3',
      description: 'Rekonstrukce fasády rodinného domu s moderním designem.',
      images: [
        {
          title: 'Původní stav - pohled 1',
          image: realizaceFasady3_1.id,
          caption: 'Stav před rekonstrukcí - čelní pohled',
        },
        {
          title: 'Původní stav - pohled 2',
          image: realizaceFasady3_2.id,
          caption: 'Stav před rekonstrukcí - boční pohled',
        },
        {
          title: 'Vizualizace - varianta 1',
          image: realizaceFasady3_3.id,
          caption: 'Návrh fasády - první varianta',
        },
        {
          title: 'Vizualizace - varianta 2',
          image: realizaceFasady3_4.id,
          caption: 'Návrh fasády - druhá varianta',
        },
        {
          title: 'Finální realizace',
          image: realizaceFasady3_5.id,
          caption: 'Výsledný stav po rekonstrukci',
        },
      ],
      featuredImage: realizaceFasady3_5.id,
      featured: true,
      publishedAt: new Date().toISOString(),
      _status: 'published',
    },
    {
      title: 'Vizualizace dvou pohledů rodinného domu',
      slug: 'vizualizace-dvou-pohledu-rodinneho-domu',
      description: 'Návrhy fasády rodinného domu z různých úhlů pohledu.',
      images: [
        {
          title: 'Návrh 1',
          image: vizualizaceDvouPohleduRD1.id,
          caption: 'Vizualizace - varianta 1',
        },
        {
          title: 'Návrh 2',
          image: vizualizaceDvouPohleduRD2.id,
          caption: 'Vizualizace - varianta 2',
        },
        {
          title: 'Návrh 3',
          image: vizualizaceDvouPohleduRD3.id,
          caption: 'Vizualizace - varianta 3',
        },
        {
          title: 'Návrh 4',
          image: vizualizaceDvouPohleduRD4.id,
          caption: 'Vizualizace - varianta 4',
        },
        {
          title: 'Návrh 5',
          image: vizualizaceDvouPohleduRD5.id,
          caption: 'Vizualizace - varianta 5',
        },
        {
          title: 'Návrh 6',
          image: vizualizaceDvouPohleduRD6.id,
          caption: 'Vizualizace - varianta 6',
        },
        {
          title: 'Návrh 7',
          image: vizualizaceDvouPohleduRD7.id,
          caption: 'Vizualizace - varianta 7',
        },
        {
          title: 'Návrh 8',
          image: vizualizaceDvouPohleduRD8.id,
          caption: 'Vizualizace - varianta 8',
        },
        {
          title: 'Návrh 9',
          image: vizualizaceDvouPohleduRD9.id,
          caption: 'Vizualizace - varianta 9',
        },
      ],
      featuredImage: vizualizaceDvouPohleduRD1.id,
      featured: true,
      publishedAt: new Date().toISOString(),
      _status: 'published',
    },
    {
      title: 'Revitalizace fasády panelového domu',
      slug: 'revitalizace-fasady-paneloveho-domu',
      description: 'Návrhy revitalizace fasády panelového domu s důrazem na energetickou úsporu.',
      images: [
        { title: 'Návrh 1', image: revitalizacePanelak1.id, caption: 'Vizualizace - varianta 1' },
        { title: 'Návrh 2', image: revitalizacePanelak2.id, caption: 'Vizualizace - varianta 2' },
        { title: 'Návrh 3', image: revitalizacePanelak3.id, caption: 'Vizualizace - varianta 3' },
        { title: 'Návrh 4', image: revitalizacePanelak4.id, caption: 'Vizualizace - varianta 4' },
        { title: 'Návrh 5', image: revitalizacePanelak5.id, caption: 'Vizualizace - varianta 5' },
        { title: 'Návrh 6', image: revitalizacePanelak6.id, caption: 'Vizualizace - varianta 6' },
        { title: 'Návrh 7', image: revitalizacePanelak7.id, caption: 'Vizualizace - varianta 7' },
        { title: 'Návrh 8', image: revitalizacePanelak8.id, caption: 'Vizualizace - varianta 8' },
      ],
      featuredImage: revitalizacePanelak1.id,
      featured: true,
      publishedAt: new Date().toISOString(),
      _status: 'published',
    },
    {
      title: 'Vizualizace fasády novostavby rodinného domu',
      slug: 'vizualizace-fasady-novostavby-rodinneho-domu',
      description: 'Návrhy fasády pro novostavbu rodinného domu s moderním designem.',
      images: [
        {
          title: 'Návrh 1',
          image: vizualizaceNovostavbyRD1.id,
          caption: 'Vizualizace - varianta 1',
        },
        {
          title: 'Návrh 2',
          image: vizualizaceNovostavbyRD2.id,
          caption: 'Vizualizace - varianta 2',
        },
        {
          title: 'Návrh 3',
          image: vizualizaceNovostavbyRD3.id,
          caption: 'Vizualizace - varianta 3',
        },
        {
          title: 'Návrh 4',
          image: vizualizaceNovostavbyRD4.id,
          caption: 'Vizualizace - varianta 4',
        },
        {
          title: 'Návrh 5',
          image: vizualizaceNovostavbyRD5.id,
          caption: 'Vizualizace - varianta 5',
        },
        {
          title: 'Návrh 6',
          image: vizualizaceNovostavbyRD6.id,
          caption: 'Vizualizace - varianta 6',
        },
        {
          title: 'Návrh 7',
          image: vizualizaceNovostavbyRD7.id,
          caption: 'Vizualizace - varianta 7',
        },
        {
          title: 'Návrh 8',
          image: vizualizaceNovostavbyRD8.id,
          caption: 'Vizualizace - varianta 8',
        },
        {
          title: 'Návrh 9',
          image: vizualizaceNovostavbyRD9.id,
          caption: 'Vizualizace - varianta 9',
        },
      ],
      featuredImage: vizualizaceNovostavbyRD1.id,
      featured: true,
      publishedAt: new Date().toISOString(),
      _status: 'published',
    },
    {
      title: 'Rekonstrukce fasády a výměna střechy',
      slug: 'rekonstrukce-fasady-a-vymena-strechy',
      description: 'Kompletní rekonstrukce fasády a střechy rodinného domu.',
      images: [
        {
          title: 'Návrh 1',
          image: rekonstrukceFasadyStrecha1.id,
          caption: 'Vizualizace - varianta 1',
        },
        {
          title: 'Návrh 2',
          image: rekonstrukceFasadyStrecha2.id,
          caption: 'Vizualizace - varianta 2',
        },
        {
          title: 'Návrh 3',
          image: rekonstrukceFasadyStrecha3.id,
          caption: 'Vizualizace - varianta 3',
        },
        {
          title: 'Návrh 4',
          image: rekonstrukceFasadyStrecha4.id,
          caption: 'Vizualizace - varianta 4',
        },
        {
          title: 'Návrh 5',
          image: rekonstrukceFasadyStrecha5.id,
          caption: 'Vizualizace - varianta 5',
        },
        {
          title: 'Návrh 6',
          image: rekonstrukceFasadyStrecha6.id,
          caption: 'Vizualizace - varianta 6',
        },
        {
          title: 'Návrh 7',
          image: rekonstrukceFasadyStrecha7.id,
          caption: 'Vizualizace - varianta 7',
        },
        {
          title: 'Návrh 8',
          image: rekonstrukceFasadyStrecha8.id,
          caption: 'Vizualizace - varianta 8',
        },
        {
          title: 'Návrh 9',
          image: rekonstrukceFasadyStrecha9.id,
          caption: 'Vizualizace - varianta 9',
        },
      ],
      featuredImage: rekonstrukceFasadyStrecha1.id,
      featured: false,
      publishedAt: new Date().toISOString(),
      _status: 'published',
    },
    {
      title: 'Návrh barevnosti fasády',
      slug: 'navrh-barevnosti-fasady',
      description: 'Různé barevné varianty fasády rodinného domu.',
      images: [
        { title: 'Návrh 1', image: navrhBarevnostiFasady1.id, caption: 'Vizualizace - varianta 1' },
        { title: 'Návrh 2', image: navrhBarevnostiFasady2.id, caption: 'Vizualizace - varianta 2' },
        { title: 'Návrh 3', image: navrhBarevnostiFasady3.id, caption: 'Vizualizace - varianta 3' },
        { title: 'Návrh 4', image: navrhBarevnostiFasady4.id, caption: 'Vizualizace - varianta 4' },
        { title: 'Návrh 5', image: navrhBarevnostiFasady5.id, caption: 'Vizualizace - varianta 5' },
        { title: 'Návrh 6', image: navrhBarevnostiFasady6.id, caption: 'Vizualizace - varianta 6' },
        { title: 'Návrh 7', image: navrhBarevnostiFasady7.id, caption: 'Vizualizace - varianta 7' },
        { title: 'Návrh 8', image: navrhBarevnostiFasady8.id, caption: 'Vizualizace - varianta 8' },
        { title: 'Návrh 9', image: navrhBarevnostiFasady9.id, caption: 'Vizualizace - varianta 9' },
        {
          title: 'Návrh 10',
          image: navrhBarevnostiFasady10.id,
          caption: 'Vizualizace - varianta 10',
        },
        {
          title: 'Návrh 11',
          image: navrhBarevnostiFasady11.id,
          caption: 'Vizualizace - varianta 11',
        },
        {
          title: 'Návrh 12',
          image: navrhBarevnostiFasady12.id,
          caption: 'Vizualizace - varianta 12',
        },
        {
          title: 'Návrh 13',
          image: navrhBarevnostiFasady13.id,
          caption: 'Vizualizace - varianta 13',
        },
      ],
      featuredImage: navrhBarevnostiFasady1.id,
      featured: false,
      publishedAt: new Date().toISOString(),
      _status: 'published',
    },
    {
      title: 'Návrh fasády rodinného domu',
      slug: 'navrh-fasady-rodinneho-domu',
      description: 'Návrhy fasády rodinného domu s různými styly.',
      images: [
        { title: 'Návrh 1', image: navrhFasadyRD1.id, caption: 'Vizualizace - varianta 1' },
        { title: 'Návrh 2', image: navrhFasadyRD2.id, caption: 'Vizualizace - varianta 2' },
        { title: 'Návrh 3', image: navrhFasadyRD3.id, caption: 'Vizualizace - varianta 3' },
        { title: 'Návrh 4', image: navrhFasadyRD4.id, caption: 'Vizualizace - varianta 4' },
        { title: 'Návrh 5', image: navrhFasadyRD5.id, caption: 'Vizualizace - varianta 5' },
      ],
      featuredImage: navrhFasadyRD1.id,
      featured: false,
      publishedAt: new Date().toISOString(),
      _status: 'published',
    },
    {
      title: 'Bytový dům Brno',
      slug: 'bytovy-dum-brno',
      description: 'Rekonstrukce fasády, vzorník STO.',
      images: [
        { title: 'Návrh 1', image: bytovyDumBrno1.id, caption: 'Vizualizace - varianta 1' },
        { title: 'Návrh 2', image: bytovyDumBrno2.id, caption: 'Vizualizace - varianta 2' },
        { title: 'Návrh 3', image: bytovyDumBrno3.id, caption: 'Vizualizace - varianta 3' },
        { title: 'Návrh 4', image: bytovyDumBrno4.id, caption: 'Vizualizace - varianta 4' },
        { title: 'Návrh 5', image: bytovyDumBrno5.id, caption: 'Vizualizace - varianta 5' },
        { title: 'Návrh 6', image: bytovyDumBrno6.id, caption: 'Vizualizace - varianta 6' },
        { title: 'Návrh 7', image: bytovyDumBrno7.id, caption: 'Vizualizace - varianta 7' },
        { title: 'Návrh 8', image: bytovyDumBrno8.id, caption: 'Vizualizace - varianta 8' },
        { title: 'Návrh 9', image: bytovyDumBrno9.id, caption: 'Vizualizace - varianta 9' },
      ],
      featuredImage: bytovyDumBrno1.id,
      featured: false,
      publishedAt: new Date().toISOString(),
      _status: 'published',
    },
    {
      title: 'Dřevěná fasáda',
      slug: 'drevena-fasada',
      description: 'Návrhy fasády s dřevěným obkladem pro rodinný dům.',
      images: [
        { title: 'Návrh 1', image: drevenaFasada1.id, caption: 'Vizualizace - varianta 1' },
        { title: 'Návrh 2', image: drevenaFasada2.id, caption: 'Vizualizace - varianta 2' },
        { title: 'Návrh 3', image: drevenaFasada3.id, caption: 'Vizualizace - varianta 3' },
        { title: 'Návrh 4', image: drevenaFasada4.id, caption: 'Vizualizace - varianta 4' },
        { title: 'Návrh 5', image: drevenaFasada5.id, caption: 'Vizualizace - varianta 5' },
        { title: 'Návrh 6', image: drevenaFasada6.id, caption: 'Vizualizace - varianta 6' },
        { title: 'Návrh 7', image: drevenaFasada7.id, caption: 'Vizualizace - varianta 7' },
        { title: 'Návrh 8', image: drevenaFasada8.id, caption: 'Vizualizace - varianta 8' },
        { title: 'Návrh 9', image: drevenaFasada9.id, caption: 'Vizualizace - varianta 9' },
      ],
      featuredImage: drevenaFasada1.id,
      featured: false,
      publishedAt: new Date().toISOString(),
      _status: 'published',
    },
    {
      title: 'Návrh fasády s kamenným obkladem',
      slug: 'navrh-fasady-s-kamennym-obkladem',
      description: 'Barevné kombinace fasády s kamenným obkladem.',
      images: [
        { title: 'Návrh 1', image: navrhFasadyKamen1.id, caption: 'Vizualizace - varianta 1' },
        { title: 'Návrh 2', image: navrhFasadyKamen2.id, caption: 'Vizualizace - varianta 2' },
        { title: 'Návrh 3', image: navrhFasadyKamen3.id, caption: 'Vizualizace - varianta 3' },
        { title: 'Návrh 4', image: navrhFasadyKamen4.id, caption: 'Vizualizace - varianta 4' },
        { title: 'Návrh 5', image: navrhFasadyKamen5.id, caption: 'Vizualizace - varianta 5' },
        { title: 'Návrh 6', image: navrhFasadyKamen6.id, caption: 'Vizualizace - varianta 6' },
        { title: 'Návrh 7', image: navrhFasadyKamen7.id, caption: 'Vizualizace - varianta 7' },
        { title: 'Návrh 8', image: navrhFasadyKamen8.id, caption: 'Vizualizace - varianta 8' },
        { title: 'Návrh 9', image: navrhFasadyKamen9.id, caption: 'Vizualizace - varianta 9' },
      ],
      featuredImage: navrhFasadyKamen1.id,
      featured: false,
      publishedAt: new Date().toISOString(),
      _status: 'published',
    },
    {
      title: 'Barevný návrh fasády s obkladem',
      slug: 'barevny-navrh-fasady-s-obkladem',
      description: 'Návrhy fasády s kombinací dřeva a kamene.',
      images: [
        { title: 'Návrh 1', image: barevnyNavrhObklad1.id, caption: 'Vizualizace - varianta 1' },
        { title: 'Návrh 2', image: barevnyNavrhObklad2.id, caption: 'Vizualizace - varianta 2' },
        { title: 'Návrh 3', image: barevnyNavrhObklad3.id, caption: 'Vizualizace - varianta 3' },
        { title: 'Návrh 4', image: barevnyNavrhObklad4.id, caption: 'Vizualizace - varianta 4' },
        { title: 'Návrh 5', image: barevnyNavrhObklad5.id, caption: 'Vizualizace - varianta 5' },
        { title: 'Návrh 6', image: barevnyNavrhObklad6.id, caption: 'Vizualizace - varianta 6' },
        { title: 'Návrh 7', image: barevnyNavrhObklad7.id, caption: 'Vizualizace - varianta 7' },
        { title: 'Návrh 8', image: barevnyNavrhObklad8.id, caption: 'Vizualizace - varianta 8' },
        { title: 'Návrh 9', image: barevnyNavrhObklad9.id, caption: 'Vizualizace - varianta 9' },
      ],
      featuredImage: barevnyNavrhObklad1.id,
      featured: false,
      publishedAt: new Date().toISOString(),
      _status: 'published',
    },
    {
      title: 'Vizualizace fasády, zábradlí a schodů',
      slug: 'vizualizace-fasady-zabradli-a-schodu',
      description: 'Návrhy fasády s detaily zábradlí a schodiště.',
      images: [
        {
          title: 'Návrh 1',
          image: vizualizaceFasadyZabradli1.id,
          caption: 'Vizualizace - varianta 1',
        },
        {
          title: 'Návrh 2',
          image: vizualizaceFasadyZabradli2.id,
          caption: 'Vizualizace - varianta 2',
        },
        {
          title: 'Návrh 3',
          image: vizualizaceFasadyZabradli3.id,
          caption: 'Vizualizace - varianta 3',
        },
        {
          title: 'Návrh 4',
          image: vizualizaceFasadyZabradli4.id,
          caption: 'Vizualizace - varianta 4',
        },
        {
          title: 'Návrh 5',
          image: vizualizaceFasadyZabradli5.id,
          caption: 'Vizualizace - varianta 5',
        },
        {
          title: 'Návrh 6',
          image: vizualizaceFasadyZabradli6.id,
          caption: 'Vizualizace - varianta 6',
        },
        {
          title: 'Návrh 7',
          image: vizualizaceFasadyZabradli7.id,
          caption: 'Vizualizace - varianta 7',
        },
        {
          title: 'Návrh 8',
          image: vizualizaceFasadyZabradli8.id,
          caption: 'Vizualizace - varianta 8',
        },
        {
          title: 'Návrh 9',
          image: vizualizaceFasadyZabradli9.id,
          caption: 'Vizualizace - varianta 9',
        },
      ],
      featuredImage: vizualizaceFasadyZabradli1.id,
      featured: false,
      publishedAt: new Date().toISOString(),
      _status: 'published',
    },
    {
      title: 'Fasáda rodinného domu',
      slug: 'fasada-rodinneho-domu',
      description: 'Návrhy fasády rodinného domu s jednoduchým designem.',
      images: [
        { title: 'Návrh 1', image: fasadaRodinnehoDomu1.id, caption: 'Vizualizace - varianta 1' },
        { title: 'Návrh 2', image: fasadaRodinnehoDomu2.id, caption: 'Vizualizace - varianta 2' },
        { title: 'Návrh 3', image: fasadaRodinnehoDomu3.id, caption: 'Vizualizace - varianta 3' },
        { title: 'Návrh 4', image: fasadaRodinnehoDomu4.id, caption: 'Vizualizace - varianta 4' },
      ],
      featuredImage: fasadaRodinnehoDomu1.id,
      featured: false,
      publishedAt: new Date().toISOString(),
      _status: 'published',
    },
    {
      title: 'Kámen na fasádě rodinného domu',
      slug: 'kamen-na-fasade-rodinneho-domu',
      description: 'Návrhy fasády s kamenným obkladem pro rodinný dům.',
      images: [
        { title: 'Návrh 1', image: kamenNaFasadeRD1.id, caption: 'Vizualizace - varianta 1' },
        { title: 'Návrh 2', image: kamenNaFasadeRD2.id, caption: 'Vizualizace - varianta 2' },
        { title: 'Návrh 3', image: kamenNaFasadeRD3.id, caption: 'Vizualizace - varianta 3' },
        { title: 'Návrh 4', image: kamenNaFasadeRD4.id, caption: 'Vizualizace - varianta 4' },
        {
          title: 'Návrh 5 - cihla',
          image: kamenNaFasadeRD5.id,
          caption: 'Vizualizace - varianta s cihlou 1',
        },
        {
          title: 'Návrh 6 - cihla',
          image: kamenNaFasadeRD6.id,
          caption: 'Vizualizace - varianta s cihlou 2',
        },
        {
          title: 'Návrh 7 - grenada',
          image: kamenNaFasadeRD7.id,
          caption: 'Vizualizace - varianta grenada 1',
        },
        {
          title: 'Návrh 8 - grenada',
          image: kamenNaFasadeRD8.id,
          caption: 'Vizualizace - varianta grenada 2',
        },
      ],
      featuredImage: kamenNaFasadeRD1.id,
      featured: false,
      publishedAt: new Date().toISOString(),
      _status: 'published',
    },
    {
      title: 'Rodinný dům',
      slug: 'rodinny-dum',
      description: 'Různé návrhy fasády pro rodinný dům.',
      images: [
        { title: 'Návrh 1', image: rodinnyDum1.id, caption: 'Vizualizace - varianta 1' },
        { title: 'Návrh 2', image: rodinnyDum2.id, caption: 'Vizualizace - varianta 2' },
        { title: 'Návrh 3', image: rodinnyDum3.id, caption: 'Vizualizace - varianta 3' },
        { title: 'Návrh 4', image: rodinnyDum4.id, caption: 'Vizualizace - varianta 4' },
        { title: 'Návrh 5', image: rodinnyDum5.id, caption: 'Vizualizace - varianta 5' },
        { title: 'Návrh 6', image: rodinnyDum6.id, caption: 'Vizualizace - varianta 6' },
        { title: 'Návrh 7', image: rodinnyDum7.id, caption: 'Vizualizace - varianta 7' },
        { title: 'Návrh 8', image: rodinnyDum8.id, caption: 'Vizualizace - varianta 8' },
        { title: 'Návrh 9', image: rodinnyDum9.id, caption: 'Vizualizace - varianta 9' },
        { title: 'Návrh 10', image: rodinnyDum10.id, caption: 'Vizualizace - varianta 10' },
        { title: 'Návrh 11', image: rodinnyDum11.id, caption: 'Vizualizace - varianta 11' },
        { title: 'Návrh 12', image: rodinnyDum12.id, caption: 'Vizualizace - varianta 12' },
      ],
      featuredImage: rodinnyDum1.id,
      featured: false,
      publishedAt: new Date().toISOString(),
      _status: 'published',
    },
    {
      title: 'Vizualizace barevné fasády rodinného domu',
      slug: 'vizualizace-barevne-fasady-rodinneho-domu',
      description: 'Barevné návrhy fasády pro rodinný dům.',
      images: [
        {
          title: 'Návrh 1',
          image: vizualizaceBarevneFasadyRD1.id,
          caption: 'Vizualizace - varianta 1',
        },
        {
          title: 'Návrh 2',
          image: vizualizaceBarevneFasadyRD2.id,
          caption: 'Vizualizace - varianta 2',
        },
        {
          title: 'Návrh 3',
          image: vizualizaceBarevneFasadyRD3.id,
          caption: 'Vizualizace - varianta 3',
        },
        {
          title: 'Návrh 4',
          image: vizualizaceBarevneFasadyRD4.id,
          caption: 'Vizualizace - varianta 4',
        },
        {
          title: 'Návrh 5',
          image: vizualizaceBarevneFasadyRD5.id,
          caption: 'Vizualizace - varianta 5',
        },
        {
          title: 'Návrh 6',
          image: vizualizaceBarevneFasadyRD6.id,
          caption: 'Vizualizace - varianta 6',
        },
        {
          title: 'Návrh 7',
          image: vizualizaceBarevneFasadyRD7.id,
          caption: 'Vizualizace - varianta 7',
        },
        {
          title: 'Návrh 8',
          image: vizualizaceBarevneFasadyRD8.id,
          caption: 'Vizualizace - varianta 8',
        },
      ],
      featuredImage: vizualizaceBarevneFasadyRD1.id,
      featured: false,
      publishedAt: new Date().toISOString(),
      _status: 'published',
    },
  ]
}
