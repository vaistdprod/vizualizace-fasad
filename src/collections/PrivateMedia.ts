// src/collections/PrivateMedia.ts
import type { CollectionConfig } from 'payload'
import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'

export const PrivateMedia: CollectionConfig = {
  slug: 'private_media',
  labels: {
    singular: { en: 'Private Media', cs: 'Soukromá média' },
    plural: { en: 'Private Media', cs: 'Soukromá média' },
  },
  upload: {
    mimeTypes: ['image/png', 'image/heic', 'image/jpeg', 'image/webp'],
  },
  access: {
    read: authenticated,
    create: anyone,
    update: authenticated,
    delete: authenticated,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      label: { en: 'Alternative Text', cs: 'Alternativní text' },
    },
  ],
}
