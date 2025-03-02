import type { Media } from '@/payload-types'

export const galleryImage1: Omit<Media, 'createdAt' | 'id' | 'updatedAt'> = {
  alt: 'Moderní vybavení ordinace s příjemným prostředím pro děti',
}
