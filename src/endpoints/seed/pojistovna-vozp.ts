import type { Media } from '@/payload-types'

export const pojistovnaVOZP: Omit<Media, 'createdAt' | 'id' | 'updatedAt'> = {
  alt: 'VOZP – Vojenská zdravotní pojišťovna České republiky',
}
