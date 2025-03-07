import type { Media } from '@/payload-types'

export const teamImage: Omit<Media, 'createdAt' | 'id' | 'updatedAt'> = {
  alt: 'MUDr. Miroslava Janulová – Pediatr',
}
