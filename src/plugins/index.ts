import { formBuilderPlugin } from '@payloadcms/plugin-form-builder'
import { czechFields } from '@/fields/formBuilder'
import { redirectsPlugin } from '@payloadcms/plugin-redirects'
import { seoPlugin } from '@payloadcms/plugin-seo'
import { Plugin } from 'payload'
import { revalidateRedirects } from '@/hooks/revalidateRedirects'
import { GenerateTitle, GenerateURL } from '@payloadcms/plugin-seo/types'
import { FixedToolbarFeature, HeadingFeature, lexicalEditor } from '@payloadcms/richtext-lexical'

import { Page } from '@/payload-types'
import { getServerSideURL } from '@/utilities/getURL'

const generateTitle: GenerateTitle<Page> = ({ doc }) => {
  return doc?.title
    ? `${doc.title} | Ordinace praktického lékaře pro děti a dorost | MUDr. Janulová`
    : 'Ordinace praktického lékaře pro děti a dorost | MUDr. Janulová'
}

const generateURL: GenerateURL<Page> = ({ doc }) => {
  const url = getServerSideURL()

  return doc?.slug ? `${url}/${doc.slug}` : url
}

export const plugins: Plugin[] = [
  redirectsPlugin({
    collections: ['pages'],
    overrides: {
      // @ts-expect-error - This is a valid override, mapped fields don't resolve to the same type
      fields: ({ defaultFields }) => {
        return defaultFields.map((field) => {
          if ('name' in field && field.name === 'from') {
            return {
              ...field,
              label: 'Z URL',
              admin: {
                description: 'Při změně tohoto pole budete muset znovu sestavit webové stránky.',
              },
            }
          }
          if ('name' in field && field.name === 'to') {
            return {
              ...field,
              label: 'Na',
              // @ts-expect-error - This is a valid override, mapped fields don't resolve to the same type
              fields: field.fields?.map((subField) => {
                if ('name' in subField && subField.name === 'type') {
                  return {
                    ...subField,
                    label: 'Typ URL',
                    // @ts-expect-error - This is a valid override, mapped fields don't resolve to the same type
                    options: subField.options?.map((option) => {
                      if (option.value === 'reference') {
                        return { ...option, label: 'Interní odkaz' }
                      }
                      if (option.value === 'custom') {
                        return { ...option, label: 'Vlastní URL' }
                      }
                      return option
                    }),
                  }
                }
                if ('name' in subField && subField.name === 'reference') {
                  return {
                    ...subField,
                    label: 'Dokument pro přesměrování',
                  }
                }
                if ('name' in subField && subField.name === 'url') {
                  return {
                    ...subField,
                    label: 'URL',
                  }
                }
                return subField
              }),
            }
          }
          return field
        })
      },
      hooks: {
        afterChange: [revalidateRedirects],
      },
      labels: {
        singular: 'Přesměrování',
        plural: 'Přesměrování',
      },
    },
  }),
  seoPlugin({
    generateTitle,
    generateURL,
  }),
  formBuilderPlugin({
    fields: {
      ...czechFields,
      payment: false,
    },
    formOverrides: {
      // @ts-expect-error - This is a valid override, mapped fields don't resolve to the same type
      fields: ({ defaultFields }) => {
        return defaultFields.map((field) => {
          if ('name' in field && field.name === 'title') {
            return {
              ...field,
              label: 'Název',
            }
          }
          if ('name' in field && field.name === 'fields') {
            return {
              ...field,
              label: 'Pole',
            }
          }
          if ('name' in field && field.name === 'submitButtonLabel') {
            return {
              ...field,
              label: 'Text tlačítka odeslání',
            }
          }
          if ('name' in field && field.name === 'confirmationType') {
            return {
              ...field,
              label: 'Typ potvrzení',
              admin: {
                description:
                  'Vyberte, zda chcete zobrazit zprávu na stránce nebo přesměrovat na jinou stránku po odeslání formuláře.',
              },
              // @ts-expect-error - This is a valid override, mapped fields don't resolve to the same type
              options: field.options?.map((option) => {
                if (option.value === 'message') {
                  return { ...option, label: 'Zpráva' }
                }
                if (option.value === 'redirect') {
                  return { ...option, label: 'Přesměrování' }
                }
                return option
              }),
            }
          }
          if ('name' in field && field.name === 'confirmationMessage') {
            return {
              ...field,
              label: 'Potvrzovací zpráva',
              editor: lexicalEditor({
                features: ({ rootFeatures }) => {
                  return [
                    ...rootFeatures,
                    FixedToolbarFeature(),
                    HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
                  ]
                },
              }),
            }
          }
          if ('name' in field && field.name === 'emails') {
            return {
              ...field,
              label: 'E-maily',
              admin: {
                description:
                  'Odeslat vlastní e-maily při odeslání formuláře. Použijte seznamy oddělené čárkami pro odeslání stejného e-mailu více příjemcům. Pro odkaz na hodnotu z tohoto formuláře obalte název tohoto pole dvojitými složenými závorkami, např. {{jméno}}. Můžete použít zástupný znak {{*}} pro výstup všech dat a {{*:table}} pro formátování jako HTML tabulku v e-mailu.',
              },
              // @ts-expect-error - This is a valid override, mapped fields don't resolve to the same type
              fields: field.fields?.map((emailField) => {
                if ('name' in emailField && emailField.name === 'emailTo') {
                  return {
                    ...emailField,
                    label: 'E-mail příjemce',
                  }
                }
                if ('name' in emailField && emailField.name === 'cc') {
                  return {
                    ...emailField,
                    label: 'Kopie (CC)',
                  }
                }
                if ('name' in emailField && emailField.name === 'bcc') {
                  return {
                    ...emailField,
                    label: 'Skrytá kopie (BCC)',
                  }
                }
                if ('name' in emailField && emailField.name === 'replyTo') {
                  return {
                    ...emailField,
                    label: 'Odpovědět na',
                  }
                }
                if ('name' in emailField && emailField.name === 'emailFrom') {
                  return {
                    ...emailField,
                    label: 'E-mail odesílatele',
                  }
                }
                if ('name' in emailField && emailField.name === 'subject') {
                  return {
                    ...emailField,
                    label: 'Předmět',
                  }
                }
                if ('name' in emailField && emailField.name === 'message') {
                  return {
                    ...emailField,
                    label: 'Zpráva',
                    admin: {
                      description: 'Zadejte zprávu, která bude odeslána v tomto e-mailu.',
                    },
                  }
                }
                return emailField
              }),
            }
          }
          return field
        })
      },
      labels: {
        singular: 'Formulář',
        plural: 'Formuláře',
      },
    },
    formSubmissionOverrides: {
      labels: {
        singular: 'Odeslání formuláře',
        plural: 'Odeslané formuláře',
      },
    },
  }),
]
