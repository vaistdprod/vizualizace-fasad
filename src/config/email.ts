import { nodemailerAdapter } from '@payloadcms/email-nodemailer'
import { env } from './env'

export const email = nodemailerAdapter({
  defaultFromAddress: env.DEFAULT_FROM_ADDRESS,
  defaultFromName: env.DEFAULT_FROM_NAME,
  transportOptions: {
    host: env.SMTP_HOST,
    port: env.SMTP_PORT,
    secure: false,
    auth: {
      user: env.SMTP_USER,
      pass: env.SMTP_PASS,
    },
    logger: env.NODE_ENV === 'development',
    debug: env.NODE_ENV === 'development',
  },
})
