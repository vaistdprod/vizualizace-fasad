import type { Media } from '@/payload-types'

export const puntiky: Omit<Media, 'createdAt' | 'id' | 'updatedAt'> = {
  alt: 'Obrázek puntíků',
}
