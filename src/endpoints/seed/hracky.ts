import type { Media } from '@/payload-types'

export const hracky: Omit<Media, 'createdAt' | 'id' | 'updatedAt'> = {
  alt: 'Dítě si hraje s autíčky za přítomnosti maminky, vytvářející klidnou atmosféru.',
}
