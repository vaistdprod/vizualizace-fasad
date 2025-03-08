import type { Media } from '@/payload-types'

export const ordinace: Omit<Media, 'createdAt' | 'id' | 'updatedAt'> = {
  alt: 'Matka s dítětem při konzultaci v ordinaci dětského lékaře.',
}
