import type { Media } from '@/payload-types'

export const insuranceVZP: Omit<Media, 'createdAt' | 'id' | 'updatedAt'> = {
  alt: 'VZP – Všeobecná zdravotní pojišťovna',
}
