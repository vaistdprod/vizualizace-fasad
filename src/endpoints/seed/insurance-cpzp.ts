import type { Media } from '@/payload-types'

export const insuranceCPZP: Omit<Media, 'createdAt' | 'id' | 'updatedAt'> = {
  alt: 'ČPZP – Česká průmyslová zdravotní pojišťovna',
}
