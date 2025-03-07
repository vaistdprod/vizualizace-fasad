import type { Media } from '@/payload-types'

export const pojistovnaVZP: Omit<Media, 'createdAt' | 'id' | 'updatedAt'> = {
  alt: 'VZP – Všeobecná zdravotní pojišťovna',
}
