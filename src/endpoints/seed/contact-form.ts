import type { Form } from '@/payload-types'

export const contactForm: Omit<Form, 'createdAt' | 'id' | 'updatedAt'> = {
  title: 'Kontaktní formulář',
  fields: [
    {
      blockType: 'text',
      name: 'name',
      label: 'Jméno',
      required: true,
    },
    {
      blockType: 'email',
      name: 'email',
      label: 'E-mail',
      required: true,
    },
    {
      blockType: 'text',
      name: 'phone',
      label: 'Telefon',
      required: false,
    },
    {
      blockType: 'textarea',
      name: 'message',
      label: 'Zpráva',
      required: true,
    },
  ],
  submitButtonLabel: 'Odeslat zprávu',
  confirmationType: 'message',
  confirmationMessage: {
    root: {
      type: 'root',
      children: [
        {
          type: 'paragraph',
          children: [
            {
              type: 'text',
              detail: 0,
              format: 0,
              mode: 'normal',
              style: '',
              text: 'Děkujeme za vaši zprávu! Ozveme se vám co nejdříve.',
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
}
