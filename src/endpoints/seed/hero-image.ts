import type { Media } from '@/payload-types'

export const heroImage: Omit<Media, 'createdAt' | 'id' | 'updatedAt'> = {
  alt: 'Moderní dětská ordinace ve Zbirohu - příjemné prostředí pro děti',
}
