import type { Media } from '@/payload-types'

export const pojistovnaRBP: Omit<Media, 'createdAt' | 'id' | 'updatedAt'> = {
  alt: 'RBP – Revírní bratrská pokladna',
}
