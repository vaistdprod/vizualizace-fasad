// src/payload.config.ts
import { s3Storage } from '@payloadcms/storage-s3'
import { S3Client, S3ClientConfig } from '@aws-sdk/client-s3'
import { GetObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { vercelPostgresAdapter } from '@payloadcms/db-vercel-postgres'
import { nodemailerAdapter } from '@payloadcms/email-nodemailer'
import type { FormSubmission } from '@payloadcms/plugin-form-builder/types'
import formidable from 'formidable'
import fs from 'fs/promises'
import sharp from 'sharp'
import path from 'path'
import { buildConfig, PayloadRequest, CollectionConfig } from 'payload'
import { fileURLToPath } from 'url'
import { Categories } from './collections/Categories'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { Users } from './collections/Users'
import { Footer } from './Footer/config'
import { Header } from './Header/config'
import { plugins } from './plugins'
import { defaultLexical } from '@/fields/defaultLexical'
import { getServerSideURL } from './utilities/getURL'

// Centralized S3 configuration
const R2_BUCKET = process.env.R2_BUCKET ?? throwError('R2_BUCKET')
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

const s3Client = new S3Client(s3Config)

// Custom FormSubmissions collection
const FormSubmissions: CollectionConfig = {
  slug: 'custom-form-submissions',
  admin: {
    useAsTitle: 'createdAt',
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
      relationTo: 'media',
      hasMany: true,
    },
    {
      name: 'attachmentLinks',
      type: 'textarea',
      admin: {
        readOnly: true,
        position: 'sidebar',
        description: 'Signed URLs for attached media (valid for 1 hour)',
      },
      hooks: {
        afterRead: [
          async ({ data, req }) => {
            if (!data?.attachments?.length) return 'No attachments'
            const { payload } = req

            const mediaDocs = await Promise.all(
              data.attachments.map((id: string | number) =>
                payload.findByID({ collection: 'media', id }),
              ),
            )

            const urls = await Promise.all(
              mediaDocs.map((doc) =>
                getSignedUrl(
                  s3Client,
                  new GetObjectCommand({
                    Bucket: R2_BUCKET,
                    Key: doc.filename,
                  }),
                  { expiresIn: 3600 },
                ),
              ),
            )

            return urls.join('\n')
          },
        ],
      },
    },
  ],
}

// Type for our custom FormSubmissions collection
type FormSubmissionWithAttachments = {
  form: number
  submissionData: { field: string; value: string }[]
  attachments?: number[]
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
  db: vercelPostgresAdapter({
    pool: {
      connectionString: process.env.POSTGRES_URL || '',
    },
  }),
  email: nodemailerAdapter({
    defaultFromAddress: process.env.DEFAULT_FROM_ADDRESS || 'info@vizualizacefasad.cz',
    defaultFromName:
      process.env.DEFAULT_FROM_NAME ||
      'Ordinace praktického lékaře pro děti a dorost | MUDr. Janulová',
  }),
  collections: [Pages, Media, Categories, Users, FormSubmissions],
  cors: [getServerSideURL()].filter(Boolean),
  globals: [Header, Footer],
  plugins: [
    ...plugins,
    s3Storage({
      collections: {
        [Media.slug]: true,
      },
      bucket: R2_BUCKET,
      config: s3Config, // Reuse the centralized config
    }),
  ],
  secret: process.env.PAYLOAD_SECRET,
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  jobs: {
    access: {
      run: ({ req }: { req: PayloadRequest }): boolean => {
        if (req.user) return true
        const authHeader = req.headers.get('authorization')
        return authHeader === `Bearer ${process.env.CRON_SECRET}`
      },
    },
    tasks: [],
  },
  endpoints: [
    {
      path: '/custom-form-submissions',
      method: 'post',
      handler: async (req: PayloadRequest) => {
        try {
          const { limited, message } = rateLimit(req)
          if (limited) {
            return new Response(JSON.stringify({ error: message }), {
              status: 429,
              headers: { 'Content-Type': 'application/json' },
            })
          }

          const form = formidable({
            multiples: true,
            maxFileSize: 5 * 1024 * 1024,
            maxFiles: 5,
          })

          const [fields, files] = await new Promise<
            [formidable.Fields<string>, formidable.Files<string>]
          >((resolve, reject): void => {
            form.parse(req as any, (err, fields, files) => {
              if (err) {
                if (err.code === 'formidable.FILE_SIZE_EXCEEDED') {
                  reject(new Error('Soubor přesahuje limit 5 MB'))
                } else if (err.code === 'formidable.MAX_FILES_EXCEEDED') {
                  reject(new Error('Maximálně 5 souborů povoleno'))
                }
                reject(err)
              } else resolve([fields, files])
            })
          })

          const formId = fields.form?.[0]
          if (!formId) {
            return new Response(JSON.stringify({ error: 'Form ID missing' }), {
              status: 400,
              headers: { 'Content-Type': 'application/json' },
            })
          }

          const allowedMimetypes = ['image/png', 'image/heic', 'image/jpeg', 'image/webp']
          for (const [fieldName, fileArray] of Object.entries(files)) {
            if (!fileArray || fileArray.length === 0) continue
            for (const file of fileArray) {
              if (!allowedMimetypes.includes(file.mimetype || '')) {
                return new Response(
                  JSON.stringify({
                    error: `Nepovolený typ souboru pro ${fieldName}: ${file.mimetype}`,
                  }),
                  { status: 400, headers: { 'Content-Type': 'application/json' } },
                )
              }
            }
          }

          const uploadedFiles = await Promise.all(
            Object.entries(files).map(async ([fieldName, fileArray]) => {
              if (!fileArray || fileArray.length === 0) return null
              const file = fileArray[0]
              if (!file) return null
              const fileBuffer = await fs.readFile(file.filepath)
              const safeFilename = (file.originalFilename || `${fieldName}-${Date.now()}`).replace(
                /[^a-zA-Z0-9.-]/g,
                '_',
              )
              const uploadedFile = await req.payload.create({
                collection: 'media',
                data: { alt: `${fieldName} upload` },
                file: {
                  name: safeFilename,
                  data: fileBuffer,
                  mimetype: file.mimetype || 'application/octet-stream',
                  size: file.size,
                },
              })
              return { field: fieldName, fileId: uploadedFile.id }
            }),
          ).then((results) => results.filter((r): r is NonNullable<typeof r> => r !== null))

          const submissionData = Object.entries(fields)
            .filter(([key]) => key !== 'form' && key !== 'attachment')
            .map(([field, values]) => ({ field, value: values?.[0] || '' }))

          await req.payload.create({
            collection: 'custom-form-submissions',
            data: {
              form: Number(formId),
              submissionData,
              attachments: uploadedFiles.map((f) => f.fileId),
            } as FormSubmissionWithAttachments,
          })

          const response = await handleFormSubmission(
            {
              form: formId,
              submissionData: [
                ...submissionData,
                ...uploadedFiles.map((f) => ({ field: f.field, value: f.fileId.toString() })),
              ],
            },
            req,
          )

          return new Response(JSON.stringify(response), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
          })
        } catch (error) {
          console.error('Form submission error:', error)
          return new Response(
            JSON.stringify({ error: (error as Error).message || 'Chyba na serveru.' }),
            { status: 500, headers: { 'Content-Type': 'application/json' } },
          )
        }
      },
    },
  ],
})

export async function handleFormSubmission(submission: FormSubmission, req: PayloadRequest) {
  const { payload } = req
  const { submissionData } = submission

  const emailField = submissionData.find((field) => field.field === 'email')
  const senderEmail = emailField?.value as string
  const nameField = submissionData.find((field) => field.field === 'name')
  const senderName = nameField?.value as string
  const phoneField = submissionData.find((field) => field.field === 'phone')
  const phone = phoneField?.value as string
  const messageField = submissionData.find((field) => field.field === 'message')
  const message = messageField?.value as string
  const fileFields = submissionData.filter((field) => field.field === 'attachment')

  const fileLinks = await Promise.all(
    fileFields.map(async (f) => {
      const mediaDoc = await payload.findByID({
        collection: 'media',
        id: f.value as string,
      })
      const filename = mediaDoc.filename ?? `unknown-file-${mediaDoc.id}`
      const signedUrl = await getSignedUrl(
        s3Client,
        new GetObjectCommand({
          Bucket: R2_BUCKET,
          Key: filename,
        }),
        { expiresIn: 3600 },
      )
      return `<p><strong>Příloha:</strong> <a href="${signedUrl}">${filename}</a></p>`
    }),
  ).then((links) => links.join(''))

  await payload.sendEmail({
    to: process.env.DEFAULT_TO_ADDRESS || 'info@vizualizacefasad.cz',
    from: process.env.DEFAULT_FROM_ADDRESS || 'info@vizualizacefasad.cz',
    subject: 'Nová zpráva z kontaktního formuláře',
    html: `
      <h1>Nová zpráva z kontaktního formuláře</h1>
      <p><strong>Jméno:</strong> ${senderName || 'Neuvedeno'}</p>
      <p><strong>E-mail:</strong> ${senderEmail || 'Neuvedeno'}</p>
      <p><strong>Telefon:</strong> ${phone || 'Neuvedeno'}</p>
      <p><strong>Zpráva:</strong> ${message || 'Neuvedeno'}</p>
      ${fileLinks || ''}
    `,
  })

  await payload.sendEmail({
    to: senderEmail,
    from: process.env.DEFAULT_FROM_ADDRESS || 'info@vizualizacefasad.cz',
    subject: 'Děkujeme za Vaši zprávu',
    html: `
      <h1>Dobrý den, ${senderName || ''}!</h1>
      <p>Vaše zpráva byla úspěšně odeslána, brzy se vám ozveme zpět. Zde je kopie Vaší zprávy:</p>
      <p><strong>Zpráva:</strong> ${message || 'Zpráva nemá obsah.'}</p>
      ${fileLinks ? '<p>Přílohy byly odeslány a budou zpracovány.</p>' : ''}
      <p>S pozdravem<br/>Ordinace praktického lékaře pro děti a dorost | MUDr. Janulová</p>
    `,
  })

  return { success: true }
}
