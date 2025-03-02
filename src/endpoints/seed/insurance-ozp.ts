import type { Media } from '@/payload-types'

export const insuranceOZP: Omit<Media, 'createdAt' | 'id' | 'updatedAt'> = {
  alt: 'OZP – Oborová zdravotní pojišťovna',
}
