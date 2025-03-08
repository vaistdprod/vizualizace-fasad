// src/fields/formBuilder.ts
// Definice polí pro formuláře s českými popisky

// Základní pole s českými popisky
const name = {
  name: 'name',
  type: 'text',
  label: 'Název (malá písmena, bez speciálních znaků)',
  required: true,
}

const label = {
  name: 'label',
  type: 'text',
  label: 'Popisek',
  localized: true,
}

const required = {
  name: 'required',
  type: 'checkbox',
  label: 'Povinné',
}

const width = {
  name: 'width',
  type: 'number',
  label: 'Šířka pole (procenta)',
}

// České verze polí pro formuláře
export const czechFields = {
  text: {
    slug: 'text',
    fields: [
      {
        type: 'row',
        fields: [
          {
            ...name,
            admin: {
              width: '50%',
            },
          },
          {
            ...label,
            admin: {
              width: '50%',
            },
          },
        ],
      },
      {
        type: 'row',
        fields: [
          {
            ...width,
            admin: {
              width: '50%',
            },
          },
          {
            name: 'defaultValue',
            type: 'text',
            admin: {
              width: '50%',
            },
            label: 'Výchozí hodnota',
            localized: true,
          },
        ],
      },
      required,
    ],
    labels: {
      plural: 'Textová pole',
      singular: 'Text',
    },
  },
  email: {
    slug: 'email',
    fields: [
      {
        type: 'row',
        fields: [
          {
            ...name,
            admin: {
              width: '50%',
            },
          },
          {
            ...label,
            admin: {
              width: '50%',
            },
          },
        ],
      },
      width,
      required,
    ],
    labels: {
      plural: 'E-mailová pole',
      singular: 'E-mail',
    },
  },
  number: {
    slug: 'number',
    fields: [
      {
        type: 'row',
        fields: [
          {
            ...name,
            admin: {
              width: '50%',
            },
          },
          {
            ...label,
            admin: {
              width: '50%',
            },
          },
        ],
      },
      {
        type: 'row',
        fields: [
          {
            ...width,
            admin: {
              width: '50%',
            },
          },
          {
            name: 'defaultValue',
            type: 'number',
            admin: {
              width: '50%',
            },
            label: 'Výchozí hodnota',
          },
        ],
      },
      required,
    ],
    labels: {
      plural: 'Číselná pole',
      singular: 'Číslo',
    },
  },
  textarea: {
    slug: 'textarea',
    fields: [
      {
        type: 'row',
        fields: [
          {
            ...name,
            admin: {
              width: '50%',
            },
          },
          {
            ...label,
            admin: {
              width: '50%',
            },
          },
        ],
      },
      {
        type: 'row',
        fields: [
          {
            ...width,
            admin: {
              width: '50%',
            },
          },
          {
            name: 'defaultValue',
            type: 'text',
            admin: {
              width: '50%',
            },
            label: 'Výchozí hodnota',
            localized: true,
          },
        ],
      },
      required,
    ],
    labels: {
      plural: 'Textové oblasti',
      singular: 'Textová oblast',
    },
  },
}
