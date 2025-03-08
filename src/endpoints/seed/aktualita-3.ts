import type { Aktuality, Media, User } from '@/payload-types'

type AktualityArgs = { heroImage: Media; author: User }

export const aktualita3 = ({
  heroImage,
  author,
}: AktualityArgs): Omit<Aktuality, 'id' | 'createdAt' | 'updatedAt'> => ({
  slug: 'zmena-ordinacnich-hodin',
  _status: 'published',
  title: 'Změna ordinačních hodin ve středu',
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
              text: 'Vážení pacienti, dovolujeme si vás informovat, že od 1.5.2025 dochází ke změně ordinačních hodin ve středu. Nově bude ordinace otevřena od 11:00 do 19:00 hodin. Dopolední hodiny budou vyhrazeny pro nemocné pacienty (11:00-13:00) a odpolední hodiny pro poradnu a prevence (13:00-19:00). Děkujeme za pochopení.',
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
    title: 'Změna ordinačních hodin ve středu',
    description: 'Informace o změně ordinačních hodin ve středu od 1.5.2025.',
    image: heroImage.id,
  },
  publishedAt: '2025-02-15T00:00:00.000Z', // Kept the same date
})
