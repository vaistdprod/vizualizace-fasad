import type { Media } from '@/payload-types'

export const galleryImage3: Omit<Media, 'createdAt' | 'id' | 'updatedAt'> = {
  alt: 'Vyšetřovna s moderním vybavením',
}
