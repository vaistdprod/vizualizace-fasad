import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'

export const Users: CollectionConfig = {
  slug: 'users',
  labels: {
    singular: 'User',
    plural: 'Users',
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
  auth: true, // Authentication is already enabled, which is perfect
  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'Name',
    },
  ],
  timestamps: true,
  hooks: {
    // Add the beforeChange hook for password validation
    beforeChange: [
      async ({ data, req }) => {
        // Check if a password is being set or updated
        if (data.password) {
          const password = data.password

          // Define your password rules
          const minLength = 12
          const hasUpperCase = /[A-Z]/.test(password)
          const hasLowerCase = /[a-z]/.test(password)
          const hasNumbers = /\d/.test(password)
          const hasSymbols = /[!@#$%^&*(),.?":{}|<>]/.test(password)

          // Validate the password against your rules
          if (password.length < minLength) {
            throw new Error('Password must be at least 12 characters long.')
          }
          if (!hasUpperCase) {
            throw new Error('Password must contain at least one uppercase letter.')
          }
          if (!hasLowerCase) {
            throw new Error('Password must contain at least one lowercase letter.')
          }
          if (!hasNumbers) {
            throw new Error('Password must contain at least one number.')
          }
          if (!hasSymbols) {
            throw new Error(
              'Password must contain at least one special character (e.g., !@#$%^&*).',
            )
          }
        }

        return data // Return the data if validation passes
      },
    ],
  },
}
