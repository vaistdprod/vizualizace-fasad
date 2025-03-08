import type { Media } from '@/payload-types'

export const vysetrovna: Omit<Media, 'createdAt' | 'id' | 'updatedAt'> = {
  alt: 'Vyšetřovna dětské ambulance s moderním vybavením, pracovními stanicemi a dětskými hračkami pro příjemné prostředí.',
}
