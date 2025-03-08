import type { Media } from '@/payload-types'

export const polka: Omit<Media, 'createdAt' | 'id' | 'updatedAt'> = {
  alt: 'Pastelové meruňkové a modré puntíky na světlém pozadí, jemný vzor pro dětský web MUDr. Janulové.',
}
