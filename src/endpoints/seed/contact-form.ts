import { RequiredDataFromCollectionSlug } from 'payload'

export const contactForm: RequiredDataFromCollectionSlug<'forms'> = {
  title: 'Kontaktní formulář',
  submitButtonLabel: 'Odeslat zprávu',
  confirmationType: 'message',
  confirmationMessage: {
    root: {
      type: 'root',
      children: [
        {
          type: 'heading',
          tag: 'h2',
          children: [{ type: 'text', text: 'Zpráva byla úspěšně odeslána!', version: 1 }],
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
  fields: [
    {
      blockType: 'text',
      name: 'name',
      label: 'Vaše jméno',
      required: true,
      width: 100,
    },
    {
      blockType: 'email',
      name: 'email',
      label: 'E-mail',
      required: true,
      width: 100,
    },
    {
      blockType: 'number',
      name: 'phone',
      label: 'Telefonní číslo',
      required: true,
      width: 100,
    },
    {
      blockType: 'textarea',
      name: 'message',
      label: 'Zpráva',
      required: true,
      width: 100,
    },
  ],
  emails: [
    {
      emailFrom: '"Dětská ordinace Zbiroh" <info@pediatr-zbiroh.cz>',
      emailTo: '{{email}}',
      subject: 'Nová zpráva z kontaktního formuláře',
      message: {
        root: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              children: [{ type: 'text', text: 'Vaše zpráva byla úspěšně odeslána.', version: 1 }],
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
    },
  ],
}
