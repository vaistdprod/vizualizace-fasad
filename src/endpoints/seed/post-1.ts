import type { Post, Media, User } from '@/payload-types'

type PostArgs = { heroImage: Media; author: User }

export const post1 = ({
  heroImage,
  author,
}: PostArgs): Omit<Post, 'id' | 'createdAt' | 'updatedAt'> => ({
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
