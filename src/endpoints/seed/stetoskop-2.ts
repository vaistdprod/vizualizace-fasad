import type { Media } from '@/payload-types'

export const stetoskop2: Omit<Media, 'createdAt' | 'id' | 'updatedAt'> = {
  alt: 'Dětský lékař provádí vyšetření kojence pomocí stetoskopu.',
}
