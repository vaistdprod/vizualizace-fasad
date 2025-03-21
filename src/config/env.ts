function throwError(varName: string): never {
  throw new Error(
    `Environment variable ${varName} is missing. Please set it in your .env file or Vercel settings.`,
  )
}

export const env = {
  R2_BUCKET: process.env.R2_PRIVATE_BUCKET ?? throwError('R2_PRIVATE_BUCKET'),
  R2_ACCESS_KEY_ID: process.env.R2_ACCESS_KEY_ID ?? throwError('R2_ACCESS_KEY_ID'),
  R2_SECRET_ACCESS_KEY: process.env.R2_SECRET_ACCESS_KEY ?? throwError('R2_SECRET_ACCESS_KEY'),
  R2_ACCOUNT_ID: process.env.R2_ACCOUNT_ID ?? throwError('R2_ACCOUNT_ID'),
  POSTGRES_URL: process.env.POSTGRES_URL ?? throwError('POSTGRES_URL'),
  SMTP_HOST: process.env.SMTP_HOST || 'smtp.gmail.com',
  SMTP_PORT: parseInt(process.env.SMTP_PORT || '587'),
  SMTP_USER: process.env.SMTP_USER || 'vais@tdprod.cz',
  SMTP_PASS: process.env.SMTP_PASS || '',
  DEFAULT_FROM_ADDRESS: process.env.DEFAULT_FROM_ADDRESS || 'vais@tdprod.cz',
  DEFAULT_FROM_NAME: process.env.DEFAULT_FROM_NAME || 'Studio fasád',
  PAYLOAD_SECRET: process.env.PAYLOAD_SECRET ?? throwError('PAYLOAD_SECRET'),
  CRON_SECRET: process.env.CRON_SECRET ?? throwError('CRON_SECRET'),
  NODE_ENV: process.env.NODE_ENV || 'production',
}
