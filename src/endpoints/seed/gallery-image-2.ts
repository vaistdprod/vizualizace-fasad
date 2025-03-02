import type { Media } from '@/payload-types'

export const galleryImage2: Omit<Media, 'createdAt' | 'id' | 'updatedAt'> = {
  alt: 'Prostorná čekárna s dětským koutkem',
}
