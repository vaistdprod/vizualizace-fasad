// src/blocks/trust-badges/config.ts
import type { Block } from 'payload'

export const TrustBadges: Block = {
  slug: 'trustBadges',
  interfaceName: 'TrustBadgesBlock',
  labels: {
    singular: { en: 'Trust Badges', cs: 'Odznaky důvěry' },
    plural: { en: 'Trust Badges Sections', cs: 'Sekce odznaků důvěry' },
  },
  fields: [
    {
      name: 'stats',
      type: 'array',
      label: { en: 'Stats', cs: 'Statistiky' },
      minRows: 1,
      fields: [
        {
          name: 'value',
          type: 'text',
          required: true,
          label: { en: 'Value', cs: 'Hodnota' },
        },
        {
          name: 'label',
          type: 'text',
          required: true,
          label: { en: 'Label', cs: 'Štítek' },
        },
      ],
    },
  ],
}
