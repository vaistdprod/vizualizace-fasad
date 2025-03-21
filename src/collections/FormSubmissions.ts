// src/collections/FormSubmissions.ts
import type { CollectionConfig } from 'payload'
import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'
import type { CustomFormSubmission } from '../payload-types'

export const FormSubmissions: CollectionConfig = {
  slug: 'custom_form_submissions',
  labels: {
    singular: { en: 'Form Submission', cs: 'Odeslání formuláře' },
    plural: { en: 'Form Submissions', cs: 'Odeslání formulářů' },
  },
  admin: {
    useAsTitle: 'createdAt',
  },
  access: {
    create: anyone,
    read: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  hooks: {
    afterOperation: [
      ({ operation, result }) => {
        if (operation === 'create' && result) {
          console.log('After create operation - result:', result)
        }
      },
    ],
  },
  fields: [
    {
      name: 'form',
      type: 'relationship',
      relationTo: 'forms',
      required: true,
      label: { en: 'Form', cs: 'Formulář' },
    },
    {
      name: 'submissionData',
      type: 'array',
      label: { en: 'Submission Data', cs: 'Data odeslání' },
      fields: [
        { name: 'field', type: 'text', label: { en: 'Field', cs: 'Pole' } },
        { name: 'value', type: 'text', label: { en: 'Value', cs: 'Hodnota' } },
      ],
    },
    {
      name: 'attachments',
      type: 'relationship',
      relationTo: 'private_media',
      hasMany: true,
      label: { en: 'Attachments', cs: 'Přílohy' },
    },
    {
      name: 'accessToken',
      type: 'text',
      unique: true,
      defaultValue: () => crypto.randomUUID(),
      label: { en: 'Access Token', cs: 'Přístupový token' },
    },
    {
      name: 'expiresAt',
      type: 'date',
      defaultValue: () => {
        const date = new Date()
        date.setMonth(date.getMonth() + 3)
        return date.toISOString()
      },
      label: { en: 'Expires At', cs: 'Vyprší dne' },
    },
    {
      name: 'attachmentLinks',
      type: 'textarea',
      admin: {
        readOnly: true,
        position: 'sidebar',
        description: {
          en: 'Permanent links for attached media (requires token access)',
          cs: 'Trvalé odkazy na přiložená média (vyžaduje přístupový token)',
        },
      },
      label: { en: 'Attachment Links', cs: 'Odkazy na přílohy' },
      hooks: {
        afterRead: [
          async ({ data, req }) => {
            if (!data?.attachments?.length) return { en: 'No attachments', cs: 'Žádné přílohy' }
            const { payload } = req
            const mediaDocs = await Promise.all(
              data.attachments.map((id: string | number) =>
                payload.findByID({ collection: 'private_media', id }),
              ),
            )
            return mediaDocs.join('\n')
          },
        ],
      },
    },
  ],
}
