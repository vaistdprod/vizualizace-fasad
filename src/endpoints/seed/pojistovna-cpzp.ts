import type { Media } from '@/payload-types'

export const pojistovnaCPZP: Omit<Media, 'createdAt' | 'id' | 'updatedAt'> = {
  alt: 'ČPZP – Česká průmyslová zdravotní pojišťovna',
}
