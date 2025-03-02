import type { RequiredDataFromCollectionSlug } from 'payload'
import type { Media, User } from '@/payload-types'

type PostArgs = { heroImage: Media; author: User }

export const post3: (args: PostArgs) => RequiredDataFromCollectionSlug<'posts'> = ({
  heroImage,
  author,
}) => ({
  slug: 'prevence-respiracnich-onemocneni',
  _status: 'published',
  title: 'Prevence respiračních onemocnění',
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
              text: 'Připravili jsme pro vás přehled doporučení, jak předcházet respiračním onemocněním u dětí v zimním období.',
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
    title: 'Prevence respiračních onemocnění',
    description: 'Připravili jsme pro vás přehled doporučení pro zimní období.',
    image: heroImage.id,
  },
  publishedAt: '2025-02-15',
})
