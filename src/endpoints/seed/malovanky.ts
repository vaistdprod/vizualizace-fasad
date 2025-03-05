import type { Media } from '@/payload-types'

export const malovanky: Omit<Media, 'createdAt' | 'id' | 'updatedAt'> = {
  alt: 'Obrázek malování',
}
