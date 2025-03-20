import type { Form as BaseForm } from '@/payload-types'
export const contactForm: Omit<BaseForm, 'createdAt' | 'id' | 'sizes' | 'updatedAt'> &
  Partial<Pick<BaseForm, 'id'>> = {
  title: 'Poptávkový formulář',
  fields: [
    {
      blockType: 'text' as const,
      name: 'name',
      label: 'Jméno',
      required: true,
    },
    {
      blockType: 'email' as const,
      name: 'email',
      label: 'E-mail',
      required: true,
    },
    {
      blockType: 'text' as const,
      name: 'phone',
      label: 'Telefon',
      required: true,
    },
    {
      blockType: 'textarea' as const,
      name: 'message',
      label: 'Vaše představy a požadavky',
      required: true,
    },
  ],
  submitButtonLabel: 'Odeslat nezávaznou poptávku',
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
              text: 'Děkujeme za vaši poptávku!',
              version: 1,
            },
          ],
          direction: 'ltr',
          format: '',
          indent: 0,
          version: 1,
        },
        {
          type: 'paragraph',
          children: [
            {
              type: 'text',
              detail: 0,
              format: 0,
              mode: 'normal',
              style: '',
              text: 'Pokud jste přiložili fotografie, budou zpracovány spolu s vaším požadavkem. Brzy vám zašleme potvrzovací e-mail a připravíme cenovou nabídku.',
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
