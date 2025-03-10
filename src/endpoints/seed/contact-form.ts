import type { Form } from '@/payload-types'

export const contactForm: Omit<Form, 'createdAt' | 'id' | 'updatedAt'> = {
  title: 'Poptávkový formulář',
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
      required: true,
    },
    {
      blockType: 'textarea',
      name: 'message',
      label:
        'Vaše představy a požadavky (Poznámka: fotografie domu prosím zašlete na info@vizualizacefasad.cz)',
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
              text: 'Děkujeme za vaši poptávku! Pokud jste ještě nezaslali fotografie vašeho domu, prosím pošlete je na info@vizualizacefasad.cz. Po obdržení fotografií vám zašleme potvrzovací email a připravíme cenovou nabídku.',
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
