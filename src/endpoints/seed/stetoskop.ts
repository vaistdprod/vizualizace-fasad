import type { Media } from '@/payload-types'

export const stetoskop: Omit<Media, 'createdAt' | 'id' | 'updatedAt'> = {
  alt: 'Pečlivé vyšetření novorozence pediatrem v moderně vybavené ordinaci.',
}
