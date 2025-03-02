import type { Media } from '@/payload-types'

export const insuranceRBP: Omit<Media, 'createdAt' | 'id' | 'updatedAt'> = {
  alt: 'RBP – Revírní bratrská pokladna',
}
