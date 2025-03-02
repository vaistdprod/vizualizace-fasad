import type { Media } from '@/payload-types'

export const insuranceVOZP: Omit<Media, 'createdAt' | 'id' | 'updatedAt'> = {
  alt: 'VOZP – Vojenská zdravotní pojišťovna České republiky',
}
