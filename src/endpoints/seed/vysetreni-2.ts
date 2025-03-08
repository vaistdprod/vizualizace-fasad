import type { Media } from '@/payload-types'

export const vysetreni2: Omit<Media, 'createdAt' | 'id' | 'updatedAt'> = {
  alt: 'Lékař kontroluje zdraví kojence pomocí stetoskopu v přátelském prostředí dětské ambulance.',
}
