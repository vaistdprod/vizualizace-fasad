import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
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
import { Posts } from './collections/Posts'
import { Users } from './collections/Users'
import { Footer } from './Footer/config'
import { Header } from './Header/config'
import { plugins } from './plugins'
import { defaultLexical } from '@/fields/defaultLexical'
import { getServerSideURL } from './utilities/getURL'
import { en } from '@payloadcms/translations/languages/en'
import { cs } from '@payloadcms/translations/languages/cs'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    components: {
      beforeLogin: ['@/components/BeforeLogin'],
      beforeDashboard: ['@/components/BeforeDashboard'],
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
    supportedLanguages: { en, cs },
    fallbackLanguage: 'cs',
  },
  email: resendAdapter({
    defaultFromAddress: process.env.DEFAULT_FROM_ADDRESS || 'info@pediatr-zbiroh.cz',
    defaultFromName: 'Dětská ordinace Zbiroh',
    apiKey: process.env.RESEND_API_KEY || '',
  }),
  collections: [Pages, Posts, Media, Categories, Users],
  cors: [getServerSideURL()].filter(Boolean),
  globals: [Header, Footer],
  plugins: [
    ...plugins,
    vercelBlobStorage({
      collections: { media: true },
      token: process.env.BLOB_READ_WRITE_TOKEN || '',
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
          // Safely handle req.body
          if (!req.body) {
            throw new Error('Požadavek je prázdný.')
          }
          const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body
          const { form, submissionData } = body

          // Call the handler
          const response = await handleFormSubmission({ form, submissionData }, req)
          return new Response(JSON.stringify(response), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
          })
        } catch (error) {
          console.error('Error handling form submission:', error)
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

  // Extract form data
  const emailField = submissionData.find((field) => field.field === 'email')
  const senderEmail = emailField?.value as string
  const nameField = submissionData.find((field) => field.field === 'name')
  const senderName = nameField?.value as string
  const phoneField = submissionData.find((field) => field.field === 'phone')
  const phone = phoneField?.value as string
  const messageField = submissionData.find((field) => field.field === 'message')
  const message = messageField?.value as string

  // Send email to admin
  await payload.sendEmail({
    to: process.env.DEFAULT_TO_ADDRESS || 'info@pediatr-zbiroh.cz',
    from: process.env.DEFAULT_FROM_ADDRESS || 'info@pediatr-zbiroh.cz',
    subject: 'Nová zpráva z kontaktního formuláře',
    html: `
      <h1>Nová zpráva z kontaktního formuláře</h1>
      <p><strong>Jméno:</strong> ${senderName || 'Neuvedeno'}</p>
      <p><strong>E-mail:</strong> ${senderEmail || 'Neuvedeno'}</p>
      <p><strong>Telefon:</strong> ${phone || 'Neuvedeno'}</p>
      <p><strong>Zpráva:</strong> ${message || 'Neuvedeno'}</p>
    `,
  })

  // Send confirmation email to submitter
  await payload.sendEmail({
    to: senderEmail,
    from: process.env.DEFAULT_FROM_ADDRESS || 'info@pediatr-zbiroh.cz',
    subject: 'Děkujeme za Vaši zprávu',
    html: `
      <h1>Dobrý den, ${senderName || ''}!</h1>
      <p>Vaše zpráva byla úspěšně odeslána, brzy se vám ozveme zpět. Zde je kopie Vaší zprávy:</p>
      <p><strong>Zpráva:</strong> ${message || 'Zpráva nemá obsah.'}</p>
      <p>S pozdravem<br/>Dětská ordinace Zbiroh</p>
    `,
  })

  return { success: true }
}
