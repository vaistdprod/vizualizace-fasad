import type { RequiredDataFromCollectionSlug } from 'payload'
import type { Media, User } from '@/payload-types'

type PostArgs = { heroImage: Media; author: User }

export const post2: (args: PostArgs) => RequiredDataFromCollectionSlug<'posts'> = ({
  heroImage,
  author,
}) => ({
  slug: 'zmena-ordinacnich-hodin-prazdniny',
  _status: 'published',
  title: 'Změna ordinačních hodin během letních prázdnin',
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
              text: 'Informujeme rodiče o upravené ordinační době během letních prázdnin. Akutní případy ošetříme vždy v ranních hodinách.',
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
    title: 'Změna ordinačních hodin během letních prázdnin',
    description: 'Informujeme rodiče o upravené ordinační době během letních prázdnin.',
    image: heroImage.id,
  },
  publishedAt: '2025-02-20',
})
