import type { Metadata } from 'next'
import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'
import { RenderBlocks } from '@/blocks/RenderBlocks'
import { generateMeta } from '@/utilities/generateMeta'
import PageClient from './page.client'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import type { Aktuality } from '@/payload-types'

// Define partial type for fetched data
type PartialAktuality = Pick<Aktuality, 'title' | 'slug' | 'heroImage' | 'publishedAt' | 'meta'>

// In-memory cache
const aktualityCache: { [key: string]: PartialAktuality[] } = {}
const CACHE_KEY = 'homepage_aktuality'

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const pages = await payload.find({
    collection: 'pages',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: { slug: true },
  })

  return pages.docs?.filter((doc) => doc.slug !== 'home').map(({ slug }) => ({ slug }))
}

type Args = {
  readonly params: Promise<{ slug?: string }>
}

export const revalidate = 86400

export default async function Page({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { slug = 'home' } = await paramsPromise
  const url = '/' + slug

  const page = await queryPageBySlug({ slug })
  if (!page) return <PayloadRedirects url={url} />

  const { layout } = page
  const payload = await getPayload({ config: configPromise })
  let aktualityData: PartialAktuality[] = []

  if (aktualityCache[CACHE_KEY] && !draft) {
    aktualityData = aktualityCache[CACHE_KEY]
    console.log('Cache hit for homepage aktuality')
  } else {
    try {
      const start = Date.now()
      aktualityData = (await payload
        .find({
          collection: 'aktuality',
          depth: 1,
          limit: 3,
          overrideAccess: false,
          draft,
          sort: '-publishedAt',
          select: { title: true, slug: true, heroImage: true, publishedAt: true, meta: true },
        })
        .then((res) => {
          console.log(`Payload fetch took: ${Date.now() - start}ms`)
          return res.docs || []
        })) as PartialAktuality[]
      if (!draft) aktualityCache[CACHE_KEY] = aktualityData
    } catch (_error) {
      aktualityData = []
    }
  }

  return (
    <article>
      <PageClient />
      <PayloadRedirects disableNotFound url={url} />
      {draft && <LivePreviewListener />}
      <RenderBlocks blocks={layout} aktualityData={aktualityData} />
    </article>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = 'home' } = await paramsPromise
  const page = await queryPageBySlug({ slug })
  return generateMeta({ doc: page })
}

const queryPageBySlug = cache(async ({ slug: pageSlug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'pages',
    draft,
    limit: 1,
    pagination: false,
    overrideAccess: draft,
    depth: 3,
    where: { slug: { equals: pageSlug } },
  })

  return result.docs?.[0] || null
})
