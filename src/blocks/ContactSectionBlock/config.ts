import type { Block } from 'payload'

export const ContactSection: Block = {
  slug: 'contactSection',
  interfaceName: 'ContactSectionBlock',
  fields: [
    {
      name: 'heading',
      type: 'text',
      label: 'Heading',
      defaultValue: 'Contact Us',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description',
      defaultValue: 'We are here for you',
    },
    {
      name: 'form',
      type: 'relationship',
      relationTo: 'forms',
      required: true,
      label: 'Contact Form',
      admin: {
        description: 'Select a form with fields: Name, Email, Phone, and Message.',
      },
      maxDepth: 1, // Ensure the full Form object is populated
    },
    {
      name: 'address',
      type: 'text',
      required: true,
      label: 'Address',
    },
    {
      name: 'phone',
      type: 'text',
      required: true,
      label: 'Phone Number',
    },
    {
      name: 'email',
      type: 'text',
      required: true,
      label: 'Email',
    },
    {
      name: 'mapEmbedUrl',
      type: 'text',
      label: 'Map Embed URL',
      admin: {
        description: 'Paste the Google Maps embed URL for your location.',
      },
    },
    {
      name: 'navigationButtonText',
      type: 'text',
      label: 'Navigation Button Text',
      defaultValue: 'Navigate',
    },
  ],
  labels: {
    plural: 'Contact Sections',
    singular: 'Contact Section',
  },
}
