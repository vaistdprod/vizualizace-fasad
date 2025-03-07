import type { Aktuality, Media, User } from '@/payload-types'

type AktualityArgs = { heroImage: Media; author: User }

export const aktualita1 = ({
  heroImage,
  author,
}: AktualityArgs): Omit<Aktuality, 'id' | 'createdAt' | 'updatedAt'> => ({
  slug: 'nove-pokyny-prohlidky',
  _status: 'published',
  title: 'Nové pokyny pro preventivní prohlídky dětí',
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
              text: 'Od března 2025 zavádíme aktualizované pokyny pro preventivní prohlídky. Zaměřujeme se na včasnou detekci vývojových poruch u dětí do 6 let.',
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
    title: 'Nové pokyny pro preventivní prohlídky dětí',
    description: 'Od března 2025 zavádíme nové pokyny pro preventivní prohlídky dětí.',
    image: heroImage.id,
  },
  publishedAt: '2025-02-25T00:00:00.000Z', // Kept the same date
})
