import type { Metadata } from 'next/types'
import { PageRange } from '@/components/PageRange'
import { Pagination } from '@/components/Pagination'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import PageClient from './page.client'
import { notFound } from 'next/navigation'
import { NewsSectionBlock } from '@/blocks/NewsSectionBlock/Component'
import type { Aktuality } from '@/payload-types'

export const revalidate = 86400

type Args = {
  params: Promise<{
    pageNumber: string
  }>
}

export default async function Page({ params: paramsPromise }: Args) {
  const { pageNumber } = await paramsPromise
  const payload = await getPayload({ config: configPromise })

  const sanitizedPageNumber = Number(pageNumber)

  if (!Number.isInteger(sanitizedPageNumber) || sanitizedPageNumber < 1) notFound()

  const aktuality = await payload.find({
    collection: 'aktuality',
    depth: 1, // Matches homepage, should include heroImage
    limit: 12,
    page: sanitizedPageNumber,
    overrideAccess: false,
    sort: '-publishedAt', // Latest first
  })

  const aktualityData: Aktuality[] = aktuality.docs || []

  return (
    <div className="pt-24 pb-24">
      <PageClient />
      <div className="container mb-16">
        <div className="prose max-w-none">
          <h1>Aktuality</h1>
        </div>
      </div>

      <div className="container mb-8">
        <PageRange
          collection="aktuality"
          currentPage={aktuality.page || 1}
          limit={12}
          totalDocs={aktuality.totalDocs || 0}
        />
      </div>

      <NewsSectionBlock
        blockType="newsSection" // Required by type
        heading="Aktuality"
        description="Nejnovější zprávy z naší ordinace"
        aktualityData={aktualityData}
      />

      <div className="container">
        {aktuality?.page && aktuality?.totalPages > 1 && (
          <Pagination page={aktuality.page} totalPages={aktuality.totalPages} />
        )}
      </div>
    </div>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { pageNumber } = await paramsPromise
  return {
    title: `Dětská ordinace Zbiroh | Aktuality | Strana ${pageNumber || ''}`,
  }
}

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const { totalDocs } = await payload.count({
    collection: 'aktuality',
    overrideAccess: false,
  })

  const totalPages = Math.ceil(totalDocs / 12) // Match limit: 12

  const pages: { pageNumber: string }[] = []

  for (let i = 1; i <= totalPages; i++) {
    pages.push({ pageNumber: String(i) })
  }

  return pages
}
