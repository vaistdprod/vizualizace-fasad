import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { revalidatePath, revalidateTag } from 'next/cache'

import type { Aktuality } from '../../../payload-types'

export const revalidateAktuality: CollectionAfterChangeHook<Aktuality> = ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    if (doc._status === 'published') {
      const path = `/aktuality/${doc.slug}`

      payload.logger.info(`Revalidating aktualita at path: ${path}`)

      revalidatePath(path)
      revalidateTag('aktuality-sitemap')
    }

    // If the aktualita was previously published, we need to revalidate the old path
    if (previousDoc._status === 'published' && doc._status !== 'published') {
      const oldPath = `/aktuality/${previousDoc.slug}`

      payload.logger.info(`Revalidating old aktualita at path: ${oldPath}`)

      revalidatePath(oldPath)
      revalidateTag('aktuality-sitemap')
    }
  }
  return doc
}

export const revalidateDelete: CollectionAfterDeleteHook<Aktuality> = ({
  doc,
  req: { context },
}) => {
  if (!context.disableRevalidate) {
    const path = `/aktuality/${doc?.slug}`

    revalidatePath(path)
    revalidateTag('aktuality-sitemap')
  }

  return doc
}
