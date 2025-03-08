import type { Media } from '@/payload-types'

export const batole: Omit<Media, 'createdAt' | 'id' | 'updatedAt'> = {
  alt: 'Batole v ordinaci dětského lékaře',
}
