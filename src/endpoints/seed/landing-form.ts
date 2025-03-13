import type { Form } from '@/payload-types'

export const landingForm: Omit<Form, 'createdAt' | 'id' | 'updatedAt'> = {
  title: 'Kontaktní formulář úvodní stránky',
  fields: [
    {
      blockType: 'text',
      name: 'name',
      label: 'Vaše jméno',
      required: true,
    },
    {
      blockType: 'email',
      name: 'email',
      label: 'E-mailová adresa',
      required: true,
    },
    {
      blockType: 'text',
      name: 'company',
      label: 'Společnost',
      required: true,
    },
    {
      blockType: 'textarea',
      name: 'message',
      label: 'Řekněte nám o vašem projektu...',
      required: true,
    },
  ],
  submitButtonLabel: 'Získat bezplatnou konzultaci',
  confirmationType: 'message',
  confirmationMessage: {
    root: {
      type: 'root',
      format: '',
      indent: 0,
      version: 1,
      children: [
        {
          children: [
            {
              detail: 0,
              format: 0,
              mode: 'normal',
              style: '',
              text: 'Děkujeme za váš zájem! Ozveme se vám do 24 hodin.',
              type: 'text',
              version: 1,
            },
          ],
          direction: 'ltr',
          format: '',
          indent: 0,
          type: 'paragraph',
          version: 1,
        },
      ],
      direction: 'ltr',
    },
  },
}
