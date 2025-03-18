import type { Media } from '@/payload-types'

// Original images
export const heroBg: Omit<Media, 'createdAt' | 'id' | 'updatedAt'> = {
  alt: 'Profesionální návrhy fasád vašich domů - studiofasad.cz',
}

export const luxuryResidential: Omit<Media, 'createdAt' | 'id' | 'updatedAt'> = {
  alt: 'Realizace fasády Ostrava - vizualizace návrhu',
}

export const culturalCenter: Omit<Media, 'createdAt' | 'id' | 'updatedAt'> = {
  alt: 'Realizace fasády Ostrava - po rekonstrukci',
}

export const modernOffice: Omit<Media, 'createdAt' | 'id' | 'updatedAt'> = {
  alt: 'Realizace fasády Bukovinka - před rekonstrukcí',
}

export const contactImage: Omit<Media, 'createdAt' | 'id' | 'updatedAt'> = {
  alt: 'Kontaktujte nás pro profesionální návrhy fasád - studiofasad.cz',
}

export const landingHeroImage: Omit<Media, 'createdAt' | 'id' | 'updatedAt'> = {
  alt: 'Moderní architektonická vizualizace - studiofasad.cz',
}
