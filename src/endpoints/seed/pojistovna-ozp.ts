import type { Media } from '@/payload-types'

export const pojistovnaOZP: Omit<Media, 'createdAt' | 'id' | 'updatedAt'> = {
  alt: 'OZP – Oborová zdravotní pojišťovna',
}
