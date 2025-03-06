import type { Metadata } from 'next'
import { PageRange } from '@/components/PageRange'
import { Pagination } from '@/components/Pagination'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import PageClient from './page.client'
import { NewsSectionBlock } from '@/blocks/NewsSectionBlock/Component'
import type { Aktuality } from '@/payload-types'

// Define partial type for fetched data
type PartialAktuality = Pick<Aktuality, 'title' | 'slug' | 'heroImage' | 'publishedAt' | 'meta'>

// In-memory cache
const aktualityCache: { [key: string]: PartialAktuality[] } = {}

export const dynamic = 'force-static'
export const revalidate = 86400

type PageProps = {
  searchParams: Promise<{ page?: string }>
}

export default async function Page({ searchParams: searchParamsPromise }: Readonly<PageProps>) {
  const searchParams = await searchParamsPromise
  const payload = await getPayload({ config: configPromise })

  if (searchParams.page && searchParams.page !== '1') {
    return {
      redirect: {
        destination: `/aktuality/stranka/${searchParams.page}`,
        permanent: true,
      },
    }
  }

  const pageNumber = parseInt(searchParams.page ?? '1', 10)
  const limit = 12
  const cacheKey = `aktuality_page_${pageNumber}`

  let aktualityData: PartialAktuality[] = []
  if (aktualityCache[cacheKey]) {
    aktualityData = aktualityCache[cacheKey]
    console.log(`Cache hit for ${cacheKey}`)
  } else {
    const aktuality = await payload.find({
      collection: 'aktuality',
      depth: 1,
      limit,
      page: pageNumber,
      overrideAccess: false,
      sort: '-publishedAt',
      select: { title: true, slug: true, heroImage: true, publishedAt: true, meta: true },
    })
    aktualityData = aktuality.docs || []
    aktualityCache[cacheKey] = aktualityData
  }

  const totalDocs = aktualityData.length === limit ? limit * 2 : aktualityData.length
  const aktuality = {
    docs: aktualityData,
    page: pageNumber,
    totalDocs,
    totalPages: Math.ceil(totalDocs / limit),
  }

  return (
    <div className="pt-24 pb-24">
      <PageClient />
      <div className="container mb-8">
        <PageRange
          collection="aktuality"
          currentPage={aktuality.page || 1}
          limit={limit}
          totalDocs={aktuality.totalDocs || 0}
        />
      </div>
      <NewsSectionBlock
        blockType="newsSection"
        heading="Aktuality"
        description="Nejnovější informace z naší ordinace."
        aktualityData={aktualityData}
      />
      <div className="container">
        {aktuality.totalPages > 1 && !!aktuality.page && (
          <Pagination page={aktuality.page} totalPages={aktuality.totalPages} />
        )}
      </div>
    </div>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: `Aktuality | Pediatr Zbiroh`,
  }
}
