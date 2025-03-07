import type { Media } from '@/payload-types'

export const heroImage: Omit<Media, 'createdAt' | 'id' | 'updatedAt'> = {
  alt: 'Moderní dětská ordinace ve Starém Lískovci – příjemné prostředí pro děti',
}
