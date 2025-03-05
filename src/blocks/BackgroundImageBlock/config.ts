import type { Block } from 'payload'
import { AppointmentSection } from '@/blocks/AppointmentSectionBlock/config' // Matches your folder naming
import { ContactSection } from '@/blocks/ContactSectionBlock/config' // Matches your folder naming
import { GallerySection } from '@/blocks/GallerySectionBlock/config' // Matches your folder naming
import { HeroSection } from '@/blocks/HeroSectionBlock/config' // Matches your folder naming
import { HoursSection } from '@/blocks/HoursSectionBlock/config' // Matches your folder naming
import { InsuranceSection } from '@/blocks/InsuranceSectionBlock/config' // Matches your folder naming
import { NewsSection } from '@/blocks/NewsSectionBlock/config' // Matches your folder naming
import { ServicesSection } from '@/blocks/ServicesSectionBlock/config' // Matches your folder naming
import { TeamSection } from '@/blocks/TeamSectionBlock/config' // Matches your folder naming
import { PricingSectionBlock } from '@/blocks/PricingSectionBlock/config' // Updated to PricingSectionBlock

export const BackgroundImageBlock: Block = {
  slug: 'backgroundImageBlock',
  interfaceName: 'BackgroundImageBlock',
  labels: {
    singular: 'Pozadí s obrázkem',
    plural: 'Pozadí s obrázkem',
  },
  fields: [
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Obrázek pozadí',
    },
    {
      name: 'opacity',
      type: 'number',
      label: 'Průhlednost obrázku',
      min: 0,
      max: 1,
      defaultValue: 0.15,
      admin: {
        step: 0.01,
        description: 'Hodnota mezi 0 (neviditelný) a 1 (plně viditelný)',
      },
    },
    {
      name: 'blocks',
      type: 'blocks',
      label: 'Bloky uvnitř pozadí',
      blocks: [
        HeroSection,
        ServicesSection,
        TeamSection,
        GallerySection,
        HoursSection,
        InsuranceSection,
        NewsSection,
        AppointmentSection,
        ContactSection,
        PricingSectionBlock, // Updated to PricingSectionBlock
      ],
      minRows: 1,
    },
    // Removed headerTheme field as requested
  ],
}
