import { PayloadRequest } from 'payload'
import type { CustomFormSubmission } from '../payload-types'

export const jobsConfig = {
  access: {
    run: ({ req }: { req: PayloadRequest }): boolean => {
      if (req.user) return true
      const authHeader = req.headers.get('authorization')
      return authHeader === `Bearer ${process.env.CRON_SECRET}`
    },
  },
  tasks: [
    {
      slug: 'clean-expired-media',
      handler: async ({ req }: { req: PayloadRequest }) => {
        const payload = req.payload
        const threeMonthsAgo = new Date()
        threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3)
        const expiredSubmissions = await payload.find({
          collection: 'custom_form_submissions',
          where: { createdAt: { less_than: threeMonthsAgo.toISOString() } },
        })
        console.log(`Found ${expiredSubmissions.docs.length} expired submissions`)

        for (const submission of expiredSubmissions.docs as CustomFormSubmission[]) {
          if (submission.attachments && Array.isArray(submission.attachments)) {
            await Promise.all(
              submission.attachments.map(async (attachment) => {
                const attachmentId =
                  typeof attachment === 'object' && attachment && 'id' in attachment
                    ? attachment.id
                    : attachment
                if (!attachmentId) {
                  console.log(`Skipping invalid attachment in submission ${submission.id}`)
                  return
                }
                try {
                  await payload.delete({
                    collection: 'private_media',
                    id: attachmentId as string | number,
                  })
                  console.log(`Deleted private_media ${attachmentId}`)
                } catch (err) {
                  console.log(
                    `Failed to delete private_media ${attachmentId}: ${(err as Error).message}`,
                  )
                }
              }),
            )
          }
          try {
            await payload.delete({ collection: 'custom_form_submissions', id: submission.id })
            console.log(`Deleted submission ${submission.id}`)
          } catch (err) {
            console.log(`Failed to delete submission ${submission.id}: ${(err as Error).message}`)
          }
        }
        console.log(`Cleaned up ${expiredSubmissions.docs.length} expired submissions`)

        const existingJobs = await payload.find({
          collection: 'payload-jobs',
          where: {
            taskSlug: { equals: 'clean-expired-media' },
            waitUntil: { greater_than: new Date().toISOString() },
          },
        })
        if (existingJobs.docs.length === 0) {
          const tomorrow = new Date()
          tomorrow.setDate(tomorrow.getDate() + 1)
          tomorrow.setHours(0, 0, 0, 0)
          await payload.jobs.queue({
            task: 'clean-expired-media',
            input: {},
            waitUntil: tomorrow,
          })
          console.log(`Re-queued clean-expired-media for ${tomorrow.toISOString()}`)
        } else {
          console.log('Next clean-expired-media job already queued, skipping re-queue')
        }

        return { state: 'succeeded' as const, output: undefined }
      },
    },
  ],
}
