import { s3Storage } from '@payloadcms/storage-s3'
import { vercelPostgresAdapter } from '@payloadcms/db-vercel-postgres'
import { nodemailerAdapter } from '@payloadcms/email-nodemailer'
import type { FormSubmission } from '@payloadcms/plugin-form-builder/types'
import formidable from 'formidable'
import fs from 'fs/promises'
import sharp from 'sharp'
import path from 'path'
import { buildConfig, PayloadRequest } from 'payload'
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
import { cs } from '@payloadcms/translations/languages/cs'

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

// Ensure required env vars are defined
const R2_BUCKET = process.env.R2_BUCKET ?? throwError('R2_BUCKET')
const R2_ACCESS_KEY_ID = process.env.R2_ACCESS_KEY_ID ?? throwError('R2_ACCESS_KEY_ID')
const R2_SECRET_ACCESS_KEY = process.env.R2_SECRET_ACCESS_KEY ?? throwError('R2_SECRET_ACCESS_KEY')
const R2_ACCOUNT_ID = process.env.R2_ACCOUNT_ID ?? throwError('R2_ACCOUNT_ID')

function throwError(varName: string): never {
  throw new Error(
    `Environment variable ${varName} is missing. Please set it in your .env file or Vercel settings.`,
  )
}

export default buildConfig({
  admin: {
    components: {
      beforeLogin: ['@/components/BeforeLogin'],
      beforeDashboard: ['@/components/BeforeDashboard'],
      graphics: {
        Logo: '@/components/Logo/AdminLogo',
        Icon: '@/components/Logo/AdminLogo',
      },
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
  i18n: {
    supportedLanguages: { cs },
    fallbackLanguage: 'cs',
  },
  email: nodemailerAdapter({
    defaultFromAddress: process.env.DEFAULT_FROM_ADDRESS || 'info@vizualizacefasad.cz',
    defaultFromName:
      process.env.DEFAULT_FROM_NAME ||
      'Ordinace praktického lékaře pro děti a dorost | MUDr. Janulová',
  }),
  collections: [Pages, Media, Categories, Users],
  cors: [getServerSideURL()].filter(Boolean),
  globals: [Header, Footer],
  plugins: [
    ...plugins,
    s3Storage({
      collections: {
        media: true,
      },
      bucket: R2_BUCKET,
      config: {
        credentials: {
          accessKeyId: R2_ACCESS_KEY_ID,
          secretAccessKey: R2_SECRET_ACCESS_KEY,
        },
        endpoint: `https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
        region: 'auto',
      },
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
          // Apply rate limiting
          const { limited, message } = rateLimit(req)
          if (limited) {
            return new Response(JSON.stringify({ error: message }), {
              status: 429,
              headers: { 'Content-Type': 'application/json' },
            })
          }

          // Parse FormData
          const form = formidable({
            multiples: true,
            maxFileSize: 5 * 1024 * 1024, // 5MB
            maxFiles: 5, // Max 5 files
          })

          const [fields, files] = await new Promise<
            [formidable.Fields<string>, formidable.Files<string>]
          >((resolve, reject) => {
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

          // Validate file types
          const allowedMimetypes = ['image/png', 'image/heic', 'image/jpeg', 'image/webp']
          for (const [fieldName, fileArray] of Object.entries(files)) {
            if (!fileArray || fileArray.length === 0) continue // Skip if no files
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

          // Sanitize filenames and upload files
          const uploadedFiles = await Promise.all(
            Object.entries(files).map(async ([fieldName, fileArray]) => {
              if (!fileArray || fileArray.length === 0) return null // Skip if no files
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

          // Process other fields
          const submissionData = Object.entries(fields)
            .filter(([key]) => key !== 'form')
            .map(([field, values]) => ({ field, value: values?.[0] || '' }))

          // Call handleFormSubmission
          const response = await handleFormSubmission(
            {
              form: formId,
              submissionData: [
                ...submissionData,
                ...uploadedFiles.map((f) => ({ field: f.field, value: f.fileId })),
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

// Update handleFormSubmission to handle file IDs if needed
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
  const fileFields = submissionData.filter((field) => field.field === 'attachment') // Adjust field name as needed

  // Include file info in emails if present
  const fileLinks = fileFields.length
    ? fileFields.map((f) => `<p><strong>Příloha:</strong> Media ID ${f.value}</p>`).join('')
    : ''

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
      ${fileLinks}
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
