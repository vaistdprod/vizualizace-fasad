/**
 * Utility for generating structured data (JSON-LD) for the medical practice
 */
import type { Aktuality } from '@/payload-types'

// Define a type for the article schema with required properties
export const generateArticleSchema = (
  article: Pick<Aktuality, 'title' | 'publishedAt' | 'updatedAt' | 'authors'> & {
    authors?: Array<{ name?: string | null } | number> | null
  },
) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'MedicalWebPage',
    headline: article.title,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt,
    author: {
      '@type': 'Person',
      name:
        Array.isArray(article.authors) &&
        article.authors.length > 0 &&
        typeof article.authors[0] === 'object'
          ? article.authors[0]?.name || 'MUDr. Janulová'
          : 'MUDr. Janulová',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Ordinace praktického lékaře pro děti a dorost | MUDr. Janulová',
      logo: {
        '@type': 'ImageObject',
        url: `${process.env.NEXT_PUBLIC_SERVER_URL}/favicon.svg`,
      },
    },
  }
}

export const generateMedicalPracticeSchema = () => {
  return {
    '@context': 'https://schema.org',
    '@type': 'MedicalBusiness',
    '@id': process.env.NEXT_PUBLIC_SERVER_URL,
    name: 'Ordinace praktického lékaře pro děti a dorost | MUDr. Janulová',
    alternateName: 'Dětský lékař MUDr. Miroslava Janulová',
    description:
      'Poskytujeme plnou péči o jakékoliv dítě od narození do 19 let včetně nedonošených a rizikových dětí. Specializujeme se na preventivní prohlídky, očkování, diagnostiku a léčbu.',
    url: process.env.NEXT_PUBLIC_SERVER_URL,
    telephone: '+420 732 229 610',
    email: 'mirka.janulova@seznam.cz',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'U Pošty 402/14, 1. patro, dveře č. 107',
      addressLocality: 'Brno',
      addressRegion: 'Jihomoravský kraj',
      addressSublocality: 'Starý Lískovec',
      postalCode: '625 00',
      addressCountry: 'CZ',
    },
    areaServed: [
      {
        '@type': 'City',
        name: 'Brno',
      },
      {
        '@type': 'AdministrativeArea',
        name: 'Starý Lískovec',
      },
      {
        '@type': 'AdministrativeArea',
        name: 'Nový Lískovec',
      },
      {
        '@type': 'AdministrativeArea',
        name: 'Bohunice',
      },
      {
        '@type': 'AdministrativeArea',
        name: 'Kohoutovice',
      },
    ],
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 49.168199,
      longitude: 16.562477,
    },
    hasMap: 'https://www.google.com/maps?q=49.168199,16.562477',
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'https://schema.org/Monday',
        opens: '07:30',
        closes: '10:00',
        description: 'Nemocní',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'https://schema.org/Monday',
        opens: '10:00',
        closes: '14:00',
        description: 'Prevence',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'https://schema.org/Tuesday',
        opens: '07:30',
        closes: '10:00',
        description: 'Nemocní',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'https://schema.org/Tuesday',
        opens: '10:00',
        closes: '13:00',
        description: 'Prevence',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'https://schema.org/Wednesday',
        opens: '10:00',
        closes: '11:30',
        description: 'Nemocní',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'https://schema.org/Wednesday',
        opens: '13:00',
        closes: '18:00',
        description: 'Poradna',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'https://schema.org/Thursday',
        opens: '07:30',
        closes: '10:00',
        description: 'Nemocní',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'https://schema.org/Thursday',
        opens: '10:00',
        closes: '13:00',
        description: 'Prevence',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'https://schema.org/Friday',
        opens: '07:30',
        closes: '10:00',
        description: 'Nemocní',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'https://schema.org/Friday',
        opens: '10:00',
        closes: '13:00',
        description: 'Prevence',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'https://schema.org/Monday',
          'https://schema.org/Tuesday',
          'https://schema.org/Thursday',
          'https://schema.org/Friday',
        ],
        opens: '07:30',
        closes: '09:00',
        description: 'Odběry biologického materiálu',
      },
    ],
    medicalSpecialty: 'Pediatrie',
    availableService: [
      {
        '@type': 'MedicalProcedure',
        name: 'Preventivní prohlídky',
        description: 'Pravidelné kontroly vývoje a zdraví dětí',
      },
      {
        '@type': 'MedicalProcedure',
        name: 'Očkování',
        description:
          'Standardní i nadstandardní vakcinace (klíšťová encefalitida, žloutenka, meningokok)',
      },
      {
        '@type': 'MedicalProcedure',
        name: 'Laktační poradna',
        description: 'Poradenství pro kojence a jejich maminky',
      },
      {
        '@type': 'MedicalProcedure',
        name: 'Diagnostika',
        description: 'Rychlé testy na CRP a moč do 2 minut',
      },
      {
        '@type': 'MedicalProcedure',
        name: 'Drobná poranění',
        description: 'Ošetření ran a odstranění stehů',
      },
      {
        '@type': 'MedicalProcedure',
        name: 'Výživové poradenství',
        description: 'Rady pro zdravou stravu dětí',
      },
    ],
    priceRange: '$$',
    paymentAccepted: 'Zdravotní pojištění',
    healthPlanNetworkId: ['VZP', 'VOZP', 'ČPZP', 'OZP', 'RBP', 'ZPMVČR'],
    availableLanguage: {
      '@type': 'Language',
      name: 'Čeština',
      alternateName: 'cs',
    },
  }
}
