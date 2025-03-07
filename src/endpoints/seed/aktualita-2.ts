import type { Aktuality, Media, User } from '@/payload-types'

type AktualityArgs = { heroImage: Media; author: User }

export const aktualita2 = ({
  heroImage,
  author,
}: AktualityArgs): Omit<Aktuality, 'id' | 'createdAt' | 'updatedAt'> => ({
  slug: 'workshop-vyziva-deti',
  _status: 'published',
  title: 'Workshop o výživě dětí v předškolním věku',
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
              text: 'Zveme rodiče na workshop o zdravé výživě dětí, který se uskuteční v naší ordinaci. Naučíte se tipy na vyváženou stravu pro vaše nejmenší.',
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
    title: 'Workshop o výživě dětí v předškolním věku',
    description: 'Přijďte na workshop o zdravé výživě dětí v naší ordinaci.',
    image: heroImage.id,
  },
  publishedAt: '2025-02-20T00:00:00.000Z', // Kept the same date
})
