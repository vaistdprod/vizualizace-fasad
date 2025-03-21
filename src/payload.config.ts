import { buildConfig } from 'payload'
import path from 'path'
import sharp from 'sharp'
import { fileURLToPath } from 'url'
import { env } from './config/env'
import { db } from './config/database'
import { email } from './config/email'
import { s3Plugin } from './config/s3'
import { adminConfig } from './config/admin'
import { jobsConfig } from './config/jobs'
import { Categories } from './collections/Categories'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { Users } from './collections/Users'
import { Projects } from './collections/Projects'
import { PrivateMedia } from './collections/PrivateMedia'
import { FormSubmissions } from './collections/FormSubmissions'
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
  admin: adminConfig,
  editor: defaultLexical,
  db,
  email,
  collections: [Pages, Media, PrivateMedia, Categories, Users, FormSubmissions, Projects],
  i18n: {
    fallbackLanguage: 'cs',
    supportedLanguages: { en, cs },
  },
  cors: ['http://localhost:3000', getServerSideURL()].filter(Boolean),
  globals: [Header, Footer],
  plugins: [...plugins, s3Plugin],
  secret: env.PAYLOAD_SECRET,
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
  jobs: jobsConfig,
})
