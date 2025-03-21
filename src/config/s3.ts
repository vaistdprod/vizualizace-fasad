import { S3ClientConfig } from '@aws-sdk/client-s3'
import { s3Storage } from '@payloadcms/storage-s3'
import { env } from '../config/env' // Adjust based on actual location
import { Media } from '../collections/Media'
import { PrivateMedia } from '../collections/PrivateMedia'
import { Projects } from '../collections/Projects'

export const s3Config: S3ClientConfig = {
  region: 'auto',
  endpoint: `https://${env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: env.R2_ACCESS_KEY_ID,
    secretAccessKey: env.R2_SECRET_ACCESS_KEY,
  },
}

export const s3Plugin = s3Storage({
  bucket: env.R2_BUCKET,
  collections: {
    [Media.slug]: true,
    [PrivateMedia.slug]: true,
    [Projects.slug]: true,
  },
  config: s3Config,
  disableLocalStorage: true,
})
