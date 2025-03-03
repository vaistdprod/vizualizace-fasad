import type { Metadata } from 'next/types'

import { CollectionArchive } from '@/components/CollectionArchive'
import { PageRange } from '@/components/PageRange'
import { Pagination } from '@/components/Pagination'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import PageClient from './page.client'

export const dynamic = 'force-static'
export const revalidate = 600

export default async function Page() {
  const payload = await getPayload({ config: configPromise })

  const aktuality = await payload.find({
    collection: 'aktuality',
    depth: 1,
    limit: 12,
    overrideAccess: false,
    select: {
      title: true,
      slug: true,
      categories: true,
      meta: true,
    },
  })

  return (
    <div className="pt-24 pb-24">
      <PageClient />
      <div className="container mb-16">
        <div className="prose dark:prose-invert max-w-none">
          <h1>Aktuality</h1>
        </div>
      </div>

      <div className="container mb-8">
        <PageRange
          collection="aktuality"
          currentPage={aktuality.page}
          limit={12}
          totalDocs={aktuality.totalDocs}
        />
      </div>

      <CollectionArchive aktuality={aktuality.docs} />

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
    title: `Payload Website Template Aktuality`,
  }
}
