import { Config } from 'payload'
import path from 'path'
import { fileURLToPath } from 'url'
import { Users } from '../collections/Users'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export const adminConfig: Config['admin'] = {
  components: {
    beforeLogin: ['../components/BeforeLogin'],
    beforeDashboard: ['../components/BeforeDashboard'],
    graphics: {
      Logo: 'src/graphics/Logo/index.tsx#Logo',
    },
  },
  importMap: {
    baseDir: path.resolve(dirname),
  },
  meta: {
    description: 'Admin panel of your website',
    titleSuffix: ' - Admin',
    icons: [
      {
        type: 'image/svg+xml',
        rel: 'icon',
        url: '/favicon.svg',
      },
    ],
  },
  user: Users.slug,
  livePreview: {
    breakpoints: [
      { label: 'Mobile', name: 'mobile', width: 375, height: 667 },
      { label: 'Tablet', name: 'tablet', width: 768, height: 1024 },
      { label: 'Desktop', name: 'desktop', width: 1440, height: 900 },
    ],
  },
}
