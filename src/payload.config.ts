import { s3Storage } from '@payloadcms/storage-s3'
import { vercelPostgresAdapter } from '@payloadcms/db-vercel-postgres'
import { resendAdapter } from '@payloadcms/email-resend'
import type { FormSubmission } from '@payloadcms/plugin-form-builder/types'

import sharp from 'sharp'
import path from 'path'
import { buildConfig, PayloadRequest } from 'payload'
import { fileURLToPath } from 'url'

import { Categories } from './collections/Categories'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { Aktuality } from './collections/Aktuality'
import { Users } from './collections/Users'
import { Footer } from './Footer/config'
import { Header } from './Header/config'
import { plugins } from './plugins'
import { defaultLexical } from '@/fields/defaultLexical'
import { getServerSideURL } from './utilities/getURL'
import { cs } from '@payloadcms/translations/languages/cs'

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
  email: resendAdapter({
    defaultFromAddress: process.env.DEFAULT_FROM_ADDRESS || 'info@mudrjanulova.cz',
    defaultFromName: 'Ordinace praktického lékaře pro děti a dorost | MUDr. Janulová',
    apiKey: process.env.RESEND_API_KEY || '',
  }),
  collections: [Pages, Aktuality, Media, Categories, Users],
  cors: [getServerSideURL()].filter(Boolean),
  globals: [Header, Footer],
  plugins: [
    ...plugins,
    s3Storage({
      collections: {
        media: true,
      },
      bucket: R2_BUCKET, // Now typed as string
      config: {
        credentials: {
          accessKeyId: R2_ACCESS_KEY_ID, // Now typed as string
          secretAccessKey: R2_SECRET_ACCESS_KEY, // Now typed as string
        },
        endpoint: `https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com`, // Now typed as string
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
          if (!req.body) {
            throw new Error('Požadavek je prázdný.')
          }
          const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body
          const { form, submissionData } = body

          const response = await handleFormSubmission({ form, submissionData }, req)
          return new Response(JSON.stringify(response), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
          })
        } catch (_error) {
          return new Response(JSON.stringify({ error: 'Chyba na serveru.' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
          })
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

  await payload.sendEmail({
    to: process.env.DEFAULT_TO_ADDRESS || 'info@mudrjanulova.cz',
    from: process.env.DEFAULT_FROM_ADDRESS || 'info@mudrjanulova.cz',
    subject: 'Nová zpráva z kontaktního formuláře',
    html: `
      <h1>Nová zpráva z kontaktního formuláře</h1>
      <p><strong>Jméno:</strong> ${senderName || 'Neuvedeno'}</p>
      <p><strong>E-mail:</strong> ${senderEmail || 'Neuvedeno'}</p>
      <p><strong>Telefon:</strong> ${phone || 'Neuvedeno'}</p>
      <p><strong>Zpráva:</strong> ${message || 'Neuvedeno'}</p>
    `,
  })

  await payload.sendEmail({
    to: senderEmail,
    from: process.env.DEFAULT_FROM_ADDRESS || 'info@mudrjanulova.cz',
    subject: 'Děkujeme za Vaši zprávu',
    html: `
      <h1>Dobrý den, ${senderName || ''}!</h1>
      <p>Vaše zpráva byla úspěšně odeslána, brzy se vám ozveme zpět. Zde je kopie Vaší zprávy:</p>
      <p><strong>Zpráva:</strong> ${message || 'Zpráva nemá obsah.'}</p>
      <p>S pozdravem<br/>Ordinace praktického lékaře pro děti a dorost | MUDr. Janulová</p>
    `,
  })

  return { success: true }
}
