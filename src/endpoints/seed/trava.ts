import type { Media } from '@/payload-types'

export const trava: Omit<Media, 'createdAt' | 'id' | 'updatedAt'> = {
  alt: 'Obrázek trávy',
}
