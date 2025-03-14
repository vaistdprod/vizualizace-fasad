import { formBuilderPlugin } from '@payloadcms/plugin-form-builder'
import { redirectsPlugin } from '@payloadcms/plugin-redirects'
import { seoPlugin } from '@payloadcms/plugin-seo'
import { Field, Plugin } from 'payload'
import { revalidateRedirects } from '@/hooks/revalidateRedirects'
import { FixedToolbarFeature, HeadingFeature, lexicalEditor } from '@payloadcms/richtext-lexical'
import { Page } from '@/payload-types'
import { getServerSideURL } from '@/utilities/getURL'

export const plugins: Plugin[] = [
  redirectsPlugin({
    collections: ['pages'],
    overrides: {
      fields: ({ defaultFields }) =>
        defaultFields.map((field) => {
          if ('name' in field && field.name === 'from') {
            return {
              ...field,
              admin: {
                description: 'You will need to rebuild the website when changing this field.',
              },
            }
          }
          return field
        }) as Field[],
      hooks: {
        afterChange: [revalidateRedirects],
      },
    },
  }),
  seoPlugin({
    collections: ['pages'],
    uploadsCollection: 'media',
    tabbedUI: true,
    generateTitle: ({ doc }: { doc: Page }) =>
      doc?.title ? `${doc.title} | studiofasad.cz` : 'studiofasad.cz - Profesionální návrhy fasád',
    generateURL: ({ doc }: { doc: Page }) => {
      const url = getServerSideURL()
      return doc?.slug ? `${url}/${doc.slug}` : url
    },
    generateDescription: ({ doc }: { doc: Page }) => {
      if (!doc?.meta?.description && doc?.layout?.length) {
        const firstBlock = doc.layout.find(
          (block) => block.blockType === 'landingHero' || block.blockType === 'aboutServices',
        )
        return (
          firstBlock?.description?.substring(0, 157) + '...' ||
          'Profesionální návrhy a vizualizace fasád.'
        )
      }
      return doc?.meta?.description || 'Profesionální návrhy a vizualizace fasád.'
    },
    fields: ({ defaultFields }) => [
      ...defaultFields, // Preserve title, description, image
      {
        name: 'keywords',
        type: 'text',
        admin: {
          description:
            'Comma-separated keywords for SEO (e.g., "fasády, vizualizace, studiofasad.cz")',
        },
      },
    ],
  }),
  formBuilderPlugin({
    fields: {
      payment: false,
      text: true,
      textarea: true,
      email: true,
      select: false,
      checkbox: false,
      country: false,
      message: false,
      state: false,
    },
    formOverrides: {
      fields: ({ defaultFields }) =>
        defaultFields.map((field) => {
          if ('name' in field && field.name === 'confirmationMessage') {
            return {
              ...field,
              editor: lexicalEditor({
                features: ({ rootFeatures }) => [
                  ...rootFeatures,
                  FixedToolbarFeature(),
                  HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
                ],
              }),
            }
          }
          return field
        }) as Field[],
    },
  }),
]
