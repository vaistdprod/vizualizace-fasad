import type { Aktuality, Media, User } from '@/payload-types'

type AktualityArgs = { heroImage: Media; author: User }

export const aktualita2 = ({
  heroImage,
  author,
}: AktualityArgs): Omit<Aktuality, 'id' | 'createdAt' | 'updatedAt'> => ({
  slug: 'ockovani-proti-chripce-2025',
  _status: 'published',
  title: 'Očkování proti chřipce 2025 - nyní k dispozici',
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
              text: 'Vážení rodiče, informujeme vás, že od 1.4.2025 je v naší ordinaci k dispozici očkování proti chřipce pro sezónu 2025/2026. Očkování je doporučeno zejména pro děti s chronickými onemocněními a oslabenou imunitou. Cena vakcíny je 450 Kč. Pro objednání kontaktujte naši ordinaci telefonicky.',
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
    title: 'Očkování proti chřipce 2025 - nyní k dispozici',
    description: 'Informace o dostupnosti očkování proti chřipce pro sezónu 2025/2026.',
    image: heroImage.id,
  },
  publishedAt: '2025-02-20T00:00:00.000Z', // Kept the same date
})
