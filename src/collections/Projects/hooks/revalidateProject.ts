import type { CollectionAfterChangeHook } from 'payload'
import { revalidatePath, revalidateTag } from 'next/cache'
import type { Project } from '@/payload-types'

export const revalidateProject: CollectionAfterChangeHook<Project> = ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    if (doc._status === 'published') {
      const path = `/fotogalerie-fasad#project-${doc.slug}`
      payload.logger.info(`Revalidating project at path: ${path}`)
      revalidatePath('/fotogalerie-fasad') // Revalidate the whole gallery page
      revalidatePath('/') // Revalidate homepage (FeaturedProjects)
      revalidateTag('projects') // Invalidate the projects cache tag
    }

    // If the project was unpublished, revalidate the old path
    if (previousDoc?._status === 'published' && doc._status !== 'published') {
      const oldPath = `/fotogalerie-fasad#project-${previousDoc.slug}`
      payload.logger.info(`Revalidating old project at path: ${oldPath}`)
      revalidatePath('/fotogalerie-fasad')
      revalidatePath('/')
      revalidateTag('projects')
    }
  }
  return doc
}
