import type { Media } from '@/payload-types'

export const insuranceZPMV: Omit<Media, 'createdAt' | 'id' | 'updatedAt'> = {
  alt: 'ZPMV – Zdravotní pojišťovna ministerstva vnitra',
}
