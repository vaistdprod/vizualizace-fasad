// src/fields/linkGroup.ts
import type { ArrayField, Field } from 'payload'
import type { LinkAppearances } from './link'
import deepMerge from '@/utilities/deepMerge'
import { link } from './link'

type LinkGroupType = (options?: {
  appearances?: LinkAppearances[] | false
  overrides?: Partial<ArrayField>
}) => Field

export const linkGroup: LinkGroupType = ({ appearances, overrides = {} } = {}) => {
  const generatedLinkGroup: Field = {
    name: 'links',
    type: 'array',
    label: { en: 'Links', cs: 'Odkazy' },
    fields: [
      link({
        appearances,
        overrides: {
          label: { en: 'Link', cs: 'Odkaz' },
        },
      }),
    ],
    admin: {
      initCollapsed: true,
    },
  }

  return deepMerge(generatedLinkGroup, overrides)
}
