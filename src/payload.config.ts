import { s3Storage } from '@payloadcms/storage-s3'
import { S3Client, S3ClientConfig } from '@aws-sdk/client-s3'
import { GetObjectCommand, ListObjectsV2Command } from '@aws-sdk/client-s3'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { nodemailerAdapter } from '@payloadcms/email-nodemailer'
import sharp from 'sharp'
import path from 'path'
import { buildConfig, PayloadRequest, CollectionConfig, Payload } from 'payload'
import { fileURLToPath } from 'url'
import { Categories } from './collections/Categories'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { Users } from './collections/Users'
import { Projects } from './collections/Projects'
import { Footer } from './Footer/config'
import { Header } from './Header/config'
import { plugins } from './plugins'
import { defaultLexical } from '@/fields/defaultLexical'
import { getServerSideURL } from './utilities/getURL'
import { anyone } from './access/anyone'
import { authenticated } from './access/authenticated'
import type { CustomFormSubmission } from './payload-types'

// Extend PayloadRequest to include params
interface CustomPayloadRequest extends PayloadRequest {
  params: { [key: string]: string | undefined }
}

// Centralized S3 configuration
const R2_BUCKET = process.env.R2_PRIVATE_BUCKET ?? throwError('R2_PRIVATE_BUCKET')
const R2_ACCESS_KEY_ID = process.env.R2_ACCESS_KEY_ID ?? throwError('R2_ACCESS_KEY_ID')
const R2_SECRET_ACCESS_KEY = process.env.R2_SECRET_ACCESS_KEY ?? throwError('R2_SECRET_ACCESS_KEY')
const R2_ACCOUNT_ID = process.env.R2_ACCOUNT_ID ?? throwError('R2_ACCOUNT_ID')

const s3Config: S3ClientConfig = {
  region: 'auto',
  endpoint: `https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: R2_ACCESS_KEY_ID,
    secretAccessKey: R2_SECRET_ACCESS_KEY,
  },
}

// Private Media collection for form attachments
const PrivateMedia: CollectionConfig = {
  slug: 'private_media',
  upload: {
    mimeTypes: ['image/png', 'image/heic', 'image/jpeg', 'image/webp'],
  },
  access: {
    read: authenticated,
    create: anyone,
    update: authenticated,
    delete: authenticated,
  },
  fields: [{ name: 'alt', type: 'text' }],
}

// Custom FormSubmissions collection
const FormSubmissions: CollectionConfig = {
  slug: 'custom_form_submissions',
  admin: {
    useAsTitle: 'createdAt',
  },
  access: {
    create: anyone,
    read: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  hooks: {
    afterOperation: [
      ({ operation, result }) => {
        if (operation === 'create' && result) {
          console.log('After create operation - result:', result)
        }
      },
    ],
  },
  fields: [
    {
      name: 'form',
      type: 'relationship',
      relationTo: 'forms',
      required: true,
    },
    {
      name: 'submissionData',
      type: 'array',
      fields: [
        { name: 'field', type: 'text' },
        { name: 'value', type: 'text' },
      ],
    },
    {
      name: 'attachments',
      type: 'relationship',
      relationTo: 'private_media',
      hasMany: true,
    },
    {
      name: 'accessToken',
      type: 'text',
      unique: true,
      defaultValue: () => crypto.randomUUID(),
    },
    {
      name: 'expiresAt',
      type: 'date',
      defaultValue: () => {
        const date = new Date()
        date.setMonth(date.getMonth() + 3) // 3 months expiration
        return date.toISOString()
      },
    },
    {
      name: 'attachmentLinks',
      type: 'textarea',
      admin: {
        readOnly: true,
        position: 'sidebar',
        description: 'Permanent links for attached media (requires token access)',
      },
      hooks: {
        afterRead: [
          async ({ data, req }) => {
            if (!data?.attachments?.length) return 'No attachments'
            const { payload } = req
            const mediaDocs = await Promise.all(
              data.attachments.map((id: string | number) =>
                payload.findByID({ collection: 'private_media', id }),
              ),
            )
            return mediaDocs
              .map((doc) => `Signed URL would be generated here (see email for actual link)`)
              .join('\n')
          },
        ],
      },
    },
    {
      name: 'debugFlag',
      type: 'text',
      admin: { hidden: true },
    },
  ],
}

// Simple in-memory rate limiter
const rateLimitStore = new Map<string, { count: number; lastReset: number }>()
const RATE_LIMIT_WINDOW = 15 * 60 * 1000 // 15 minutes
const RATE_LIMIT_MAX = 10 // 10 requests per window

function rateLimit(req: PayloadRequest): { limited: boolean; message?: string } {
  const ip = req.headers.get('x-forwarded-for') || 'unknown'
  const now = Date.now()
  const record = rateLimitStore.get(ip) || { count: 0, lastReset: now }

  if (now - record.lastReset > RATE_LIMIT_WINDOW) {
    record.count = 0
    record.lastReset = now
  }

  record.count += 1
  rateLimitStore.set(ip, record)

  if (record.count > RATE_LIMIT_MAX) {
    return { limited: true, message: 'Příliš mnoho požadavků. Zkuste to znovu později.' }
  }
  return { limited: false }
}

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

function throwError(varName: string): never {
  throw new Error(
    `Environment variable ${varName} is missing. Please set it in your .env file or Vercel settings.`,
  )
}

// Export streamToBuffer for use in other files
export async function streamToBuffer(stream: any): Promise<Buffer> {
  const chunks: Uint8Array[] = []
  for await (const chunk of stream) {
    chunks.push(chunk)
  }
  return Buffer.concat(chunks)
}

export { rateLimit } // Export rateLimit for use in other files
export default buildConfig({
  admin: {
    components: {
      beforeLogin: ['./components/BeforeLogin'],
      beforeDashboard: ['./components/BeforeDashboard'],
    },
    importMap: {
      baseDir: path.resolve(dirname),
    },
    user: Users.slug,
    livePreview: {
      breakpoints: [
        { label: 'Mobile', name: 'mobile', width: 375, height: 667 },
        { label: 'Tablet', name: 'tablet', width: 768, height: 1024 },
        { label: 'Desktop', name: 'desktop', width: 1440, height: 900 },
      ],
    },
  },
  editor: defaultLexical,
  db: postgresAdapter({
    pool: {
      connectionString: process.env.POSTGRES_URL || throwError('POSTGRES_URL'),
    },
  }),
  email: nodemailerAdapter({
    defaultFromAddress: process.env.DEFAULT_FROM_ADDRESS || 'vais@tdprod.cz',
    defaultFromName: process.env.DEFAULT_FROM_NAME || 'Studio fasád',
    transportOptions: {
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: false,
      auth: {
        user: process.env.SMTP_USER || 'vais@tdprod.cz',
        pass: process.env.SMTP_PASS || '',
      },
      logger: process.env.NODE_ENV === 'development',
      debug: process.env.NODE_ENV === 'development',
    },
  }),
  collections: [Pages, Media, PrivateMedia, Categories, Users, FormSubmissions, Projects],
  cors: ['http://localhost:3000', getServerSideURL()].filter(Boolean),
  globals: [Header, Footer],
  plugins: [
    ...plugins,
    s3Storage({
      bucket: R2_BUCKET,
      collections: {
        [Media.slug]: true,
        [PrivateMedia.slug]: true,
        [Projects.slug]: true,
      },
      config: s3Config,
      disableLocalStorage: true,
    }),
  ],
  secret: process.env.PAYLOAD_SECRET,
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  onInit: async (payload) => {
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    tomorrow.setHours(0, 0, 0, 0)
    await payload.jobs.queue({
      task: 'clean-expired-media',
      input: {},
      waitUntil: tomorrow,
    })
    console.log(`Initial clean-expired-media job queued for ${tomorrow.toISOString()}`)
  },
  jobs: {
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
        handler: async (args) => {
          const { req } = args
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

          // Check for existing future jobs
          const existingJobs = await payload.find({
            collection: 'payload-jobs', // Fixed from 'payload_jobs' to 'payload-jobs'
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
  },
})
