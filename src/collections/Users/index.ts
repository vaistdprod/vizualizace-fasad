// src/collections/Users/index.ts
import type { CollectionConfig } from 'payload'
import { authenticated } from '../../access/authenticated'

export const Users: CollectionConfig = {
  slug: 'users',
  labels: {
    singular: { en: 'User', cs: 'Uživatel' },
    plural: { en: 'Users', cs: 'Uživatelé' },
  },
  access: {
    admin: authenticated,
    create: authenticated,
    delete: authenticated,
    read: authenticated,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['name', 'email'],
    useAsTitle: 'name',
  },
  auth: true,
  fields: [
    {
      name: 'name',
      type: 'text',
      label: { en: 'Name', cs: 'Jméno' },
    },
  ],
  timestamps: true,
  hooks: {
    beforeChange: [
      async ({ data, req }) => {
        if (data.password) {
          const password = data.password
          const minLength = 12
          const hasUpperCase = /[A-Z]/.test(password)
          const hasLowerCase = /[a-z]/.test(password)
          const hasNumbers = /\d/.test(password)
          const hasSymbols = /[!@#$%^&*(),.?":{}|<>]/.test(password)

          // Define error messages as a map
          const errors = {
            length: {
              cs: `Heslo musí mít alespoň ${minLength} znaků.`,
              en: `Password must be at least ${minLength} characters long.`,
            },
            upperCase: {
              cs: 'Heslo musí obsahovat alespoň jedno velké písmeno.',
              en: 'Password must contain at least one uppercase letter.',
            },
            lowerCase: {
              cs: 'Heslo musí obsahovat alespoň jedno malé písmeno.',
              en: 'Password must contain at least one lowercase letter.',
            },
            number: {
              cs: 'Heslo musí obsahovat alespoň jedno číslo.',
              en: 'Password must contain at least one number.',
            },
            symbol: {
              cs: 'Heslo musí obsahovat alespoň jeden speciální znak (např. !@#$%^&*).',
              en: 'Password must contain at least one special character (e.g., !@#$%^&*).',
            },
          }

          // Assert locale type based on supportedLanguages (cs, en)
          const locale = (req.locale || 'cs') as 'cs' | 'en'

          if (password.length < minLength) throw new Error(errors.length[locale])
          if (!hasUpperCase) throw new Error(errors.upperCase[locale])
          if (!hasLowerCase) throw new Error(errors.lowerCase[locale])
          if (!hasNumbers) throw new Error(errors.number[locale])
          if (!hasSymbols) throw new Error(errors.symbol[locale])
        }
        return data
      },
    ],
  },
}
