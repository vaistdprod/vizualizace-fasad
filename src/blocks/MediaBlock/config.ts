// src/blocks/MediaBlock/config.ts
import type { Block } from 'payload'

export const MediaBlock: Block = {
  slug: 'mediaBlock',
  interfaceName: 'MediaBlock',
  labels: {
    singular: { en: 'Media', cs: 'Média' },
    plural: { en: 'Media', cs: 'Média' },
  },
  fields: [
    {
      name: 'media',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: { en: 'Media', cs: 'Média' },
    },
  ],
}
