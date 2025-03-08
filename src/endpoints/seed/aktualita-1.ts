import type { Aktuality, Media, User } from '@/payload-types'

type AktualityArgs = { heroImage: Media; author: User }

export const aktualita1 = ({
  heroImage,
  author,
}: AktualityArgs): Omit<Aktuality, 'id' | 'createdAt' | 'updatedAt'> => ({
  slug: 'letni-dovolena-2025',
  _status: 'published',
  title: 'Letní dovolená 2025 - ordinace uzavřena',
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
              text: 'Vážení rodiče, dovolujeme si vás informovat, že naše ordinace bude z důvodu letní dovolené uzavřena v termínu 15.7. - 29.7.2025. Akutní případy ošetří zastupující lékař MUDr. Novák v ordinaci na ulici Kounicova 26, Brno. Děkujeme za pochopení.',
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
    title: 'Letní dovolená 2025 - ordinace uzavřena',
    description: 'Informace o uzavření ordinace během letní dovolené v červenci 2025.',
    image: heroImage.id,
  },
  publishedAt: '2025-02-25T00:00:00.000Z', // Kept the same date
})
