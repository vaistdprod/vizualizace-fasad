import type { Metadata } from 'next'
import { PageRange } from '@/components/PageRange'
import { Pagination } from '@/components/Pagination'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import PageClient from './page.client'
import { NewsSectionBlock } from '@/blocks/NewsSectionBlock/Component'
import type { Aktuality } from '@/payload-types'

export const dynamic = 'force-static'
export const revalidate = 86400

type PageProps = {
  params: { slug?: string }
  searchParams: { page?: string }
}

export default async function Page({ searchParams }: PageProps) {
  const payload = await getPayload({ config: configPromise })

  // If page parameter is provided, redirect to the paginated URL
  if (searchParams.page && searchParams.page !== '1') {
    return {
      redirect: {
        destination: `/aktuality/stranka/${searchParams.page}`,
        permanent: true,
      },
    }
  }

  const pageNumber = parseInt(searchParams.page || '1', 10)
  const limit = 12

  const aktuality = await payload.find({
    collection: 'aktuality',
    depth: 1,
    limit,
    page: pageNumber,
    overrideAccess: false,
    sort: '-publishedAt',
  })

  const aktualityData: Aktuality[] = aktuality.docs || []

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
        blockType="newsSection" // Add required blockType
        heading="Aktuality"
        description="Nejnovější zprávy z naší ordinace"
        aktualityData={aktualityData}
      />

      <div className="container">
        {aktuality.totalPages > 1 && aktuality.page && (
          <Pagination page={aktuality.page} totalPages={aktuality.totalPages} />
        )}
      </div>
    </div>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: `Aktuality dětské ordinace Zbiroh`,
  }
}
