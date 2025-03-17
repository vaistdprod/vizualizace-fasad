import type { Block } from 'payload'

export const LandingHero: Block = {
  slug: 'landingHero',
  interfaceName: 'LandingHeroBlock',
  labels: {
    singular: 'Landing Hero',
    plural: 'Landing Hero Sections',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Title',
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      label: 'Description',
    },
    {
      name: 'primaryButtonText',
      type: 'text',
      required: true,
      label: 'Primary Button Text',
    },
    {
      name: 'primaryButtonHref',
      type: 'text',
      required: false,
      label: 'Primary Button Link',
      admin: {
        description: 'URL for the primary button',
      },
    },
    {
      name: 'secondaryButtonText',
      type: 'text',
      required: false,
      label: 'Secondary Button Text',
      admin: {
        description:
          'Optional secondary button text. If left empty, no secondary button will be displayed.',
      },
    },
    {
      name: 'secondaryButtonHref',
      type: 'text',
      required: false,
      label: 'Secondary Button Link',
      admin: {
        description: 'URL for the secondary button',
        condition: (_, siblingData) => Boolean(siblingData?.secondaryButtonText),
      },
    },
    {
      name: 'backgroundImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Background Image',
    },
    {
      name: 'badgeText',
      type: 'text',
      label: 'Badge Text',
      admin: {
        description: 'Text displayed in the badge above the title',
      },
    },
    {
      name: 'scrollIndicator',
      type: 'group',
      label: 'Scroll Indicator',
      admin: {
        description: 'Settings for the scroll indicator at the bottom of the hero section',
      },
      fields: [
        {
          name: 'enabled',
          type: 'checkbox',
          label: 'Show Scroll Indicator',
        },
        {
          name: 'text',
          type: 'text',
          label: 'Scroll Text',
          admin: {
            condition: (_, siblingData) => siblingData?.enabled,
          },
        },
      ],
    },
  ],
}
