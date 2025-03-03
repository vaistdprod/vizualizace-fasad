import type { Aktuality, Media, User } from '@/payload-types'

type AktualityArgs = { heroImage: Media; author: User }

export const aktualita1 = ({
  heroImage,
  author,
}: AktualityArgs): Omit<Aktuality, 'id' | 'createdAt' | 'updatedAt'> => ({
  slug: 'nova-vakcina-proti-chripce',
  _status: 'published',
  title: 'Nová očkovací vakcína proti chřipce',
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
              text: 'Od příštího měsíce bude v naší ordinaci dostupná nová vakcína proti chřipce. Doporučujeme očkování zejména pro děti s chronickými onemocněními.',
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
    title: 'Nová očkovací vakcína proti chřipce',
    description: 'Od příštího měsíce bude v naší ordinaci dostupná nová vakcína proti chřipce.',
    image: heroImage.id,
  },
  publishedAt: '2025-02-25T00:00:00.000Z', // Full ISO string
})
