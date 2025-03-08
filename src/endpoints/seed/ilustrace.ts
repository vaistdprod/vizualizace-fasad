import type { Media } from '@/payload-types'

export const ilustrace: Omit<Media, 'createdAt' | 'id' | 'updatedAt'> = {
  alt: 'Barevné dětské ilustrace zahrnující hračky, kreslené postavy a školní pomůcky, vytvářející přátelskou atmosféru.',
}
