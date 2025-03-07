import type { Aktuality, Media, User } from '@/payload-types'

type AktualityArgs = { heroImage: Media; author: User }

export const aktualita3 = ({
  heroImage,
  author,
}: AktualityArgs): Omit<Aktuality, 'id' | 'createdAt' | 'updatedAt'> => ({
  slug: 'zdravi-pred-skolkou',
  _status: 'published',
  title: 'Zdraví dětí před nástupem do školky',
  heroImage: heroImage.id,
  authors: [author.id],
  content: {
    root: {
      type: 'root',
      children: [
        {
          type: 'paragraph',
          children: [
            {
              type: 'text',
              text: 'S blížícím se školním rokem doporučujeme rodičům připravit děti na školku. Nabízíme tipy na posílení imunity a povinné očkování.',
              version: 1,
            },
          ],
          direction: 'ltr',
          format: '',
          indent: 0,
          version: 1,
        },
      ],
      direction: 'ltr',
      format: '',
      indent: 0,
      version: 1,
    },
  },
  meta: {
    title: 'Zdraví dětí před nástupem do školky',
    description: 'Tipy na posílení imunity a očkování před nástupem do školky.',
    image: heroImage.id,
  },
  publishedAt: '2025-02-15T00:00:00.000Z', // Kept the same date
})
