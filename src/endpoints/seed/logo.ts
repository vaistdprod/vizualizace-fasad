import type { Media } from '@/payload-types'

export const logo: Omit<Media, 'createdAt' | 'id' | 'updatedAt'> = {
  alt: 'Pediatr Zbiroh Logo',
}
