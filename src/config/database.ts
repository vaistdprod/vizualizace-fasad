import { postgresAdapter } from '@payloadcms/db-postgres'
import { env } from './env'

export const db = postgresAdapter({
  pool: {
    connectionString: env.POSTGRES_URL,
  },
})
