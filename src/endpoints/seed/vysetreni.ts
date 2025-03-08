import type { Media } from '@/payload-types'

export const vysetreni: Omit<Media, 'createdAt' | 'id' | 'updatedAt'> = {
  alt: 'Pediatr vysvětluje postup matce s dítětem během vyšetření v dětské ambulanci.',
}
