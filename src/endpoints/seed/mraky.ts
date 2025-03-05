import type { Media } from '@/payload-types'

export const mraky: Omit<Media, 'createdAt' | 'id' | 'updatedAt'> = {
  alt: 'Obrázek mraků',
}
