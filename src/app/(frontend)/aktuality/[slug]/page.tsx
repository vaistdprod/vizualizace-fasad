import type { Metadata } from 'next'

import { RelatedAktuality } from '@/blocks/RelatedAktuality/Component'
import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'
import RichText from '@/components/RichText'

import type { Aktualita } from '@/payload-types'

import { AktualitaHero } from '@/heros/AktualitaHero'
import { generateMeta } from '@/utilities/generateMeta'
import PageClient from './page.client'
import { LivePreviewListener } from '@/components/LivePreviewListener'

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const aktuality = await payload.find({
    collection: 'aktuality',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: {
      slug: true,
    },
  })

  const params = aktuality.docs.map(({ slug }) => {
    return { slug }
  })

  return params
}

type Args = {
  params: Promise<{
    slug?: string
  }>
}

export default async function Aktualita({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { slug = '' } = await paramsPromise
  const url = '/aktuality/' + slug
  const aktualita = await queryAktualitaBySlug({ slug })

  if (!aktualita) return <PayloadRedirects url={url} />

  return (
    <article className="pt-16 pb-16">
      <PageClient />

      {/* Allows redirects for valid pages too */}
      <PayloadRedirects disableNotFound url={url} />

      {draft && <LivePreviewListener />}

      <AktualitaHero aktualita={aktualita} />

      <div className="flex flex-col items-center gap-4 pt-8">
        <div className="container">
          <RichText
            className="max-w-[48rem] mx-auto"
            data={aktualita.content}
            enableGutter={false}
          />
          {aktualita.relatedAktuality && aktualita.relatedAktuality.length > 0 && (
            <RelatedAktuality
              className="mt-12 max-w-[52rem] lg:grid lg:grid-cols-subgrid col-start-1 col-span-3 grid-rows-[2fr]"
              docs={aktualita.relatedAktuality.filter((aktualita) => typeof aktualita === 'object')}
            />
          )}
        </div>
      </div>
    </article>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = '' } = await paramsPromise
  const aktualita = await queryAktualitaBySlug({ slug })

  return generateMeta({ doc: aktualita })
}

const queryAktualitaBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'aktuality',
    draft,
    limit: 1,
    overrideAccess: draft,
    pagination: false,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
})
