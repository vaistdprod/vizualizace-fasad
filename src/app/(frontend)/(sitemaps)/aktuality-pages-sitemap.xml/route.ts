import { getServerSideSitemap, ISitemapField } from 'next-sitemap'
import { getPayload } from 'payload'
import config from '@payload-config'
import { unstable_cache } from 'next/cache'

const getAktualityPagesSitemap = unstable_cache(
  async () => {
    const payload = await getPayload({ config })
    const SITE_URL =
      process.env.NEXT_PUBLIC_SERVER_URL ||
      process.env.VERCEL_PROJECT_PRODUCTION_URL ||
      'https://mudrjanulova.cz'

    // Get total count of aktuality to calculate total pages
    const { totalDocs } = await payload.count({
      collection: 'aktuality',
      overrideAccess: false,
      where: {
        _status: {
          equals: 'published',
        },
      },
    })

    const limit = 12 // Same as in the page components
    const totalPages = Math.ceil(totalDocs / limit)

    // Generate sitemap entries for each page
    const sitemap: ISitemapField[] = []

    // Start from page 2 since page 1 is the main aktuality page
    for (let i = 2; i <= totalPages; i++) {
      sitemap.push({
        loc: `${SITE_URL}/aktuality/stranka/${i}`,
        lastmod: new Date().toISOString(),
        priority: 0.7,
      })
    }

    return sitemap
  },
  ['aktuality-pages-sitemap'],
  {
    tags: ['aktuality-pages-sitemap', 'aktuality-sitemap'],
  },
)

export async function GET() {
  const sitemap = await getAktualityPagesSitemap()

  return getServerSideSitemap(sitemap)
}
