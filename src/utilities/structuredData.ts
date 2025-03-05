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
          ? article.authors[0]?.name || 'MUDr. Šťastná'
          : 'MUDr. Šťastná',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Dětská ordinace Zbiroh',
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
    name: 'Dětská ordinace Zbiroh',
    description:
      'Poskytujeme plnou péči o jakékoliv dítě od narození do 19 let včetně nedonošených a rizikových dětí. Specializujeme se na preventivní prohlídky, očkování, diagnostiku a léčbu.',
    url: process.env.NEXT_PUBLIC_SERVER_URL,
    telephone: '+420 371 794 225', // Exact match
    email: 'info@pediatr-zbiroh.cz', // Exact match
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Masarykovo náměstí 275', // Exact match
      addressLocality: 'Zbiroh',
      postalCode: '338 08', // Space added per site
      addressCountry: 'CZ',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 49.8583, // Kept as-is—matches your mapEmbedUrl roughly
      longitude: 13.7722, // Kept as-is
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'https://schema.org/Monday',
        opens: '08:00',
        closes: '13:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'https://schema.org/Tuesday',
        opens: '08:00',
        closes: '12:00', // Poradna pro zdravé
        description: 'Poradna pro zdravé pozvané děti',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'https://schema.org/Tuesday',
        opens: '13:00',
        closes: '16:00', // Pro nemocné
        description: 'Pro nemocné děti',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'https://schema.org/Wednesday',
        opens: '08:00',
        closes: '13:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'https://schema.org/Thursday',
        opens: '08:00',
        closes: '11:00', // Poradna pro zdravé
        description: 'Poradna pro zdravé pozvané děti',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'https://schema.org/Thursday',
        opens: '13:00',
        closes: '15:00', // Nemocné děti
        description: 'Pro nemocné děti',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'https://schema.org/Thursday',
        opens: '15:00',
        closes: '18:00', // Poradna pro pozvané
        description: 'Poradna pro pozvané děti',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'https://schema.org/Friday',
        opens: '08:00',
        closes: '13:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'https://schema.org/Monday',
          'https://schema.org/Wednesday',
          'https://schema.org/Friday',
        ],
        opens: '08:00',
        closes: '09:00', // Odběry krve
        description: 'Odběry krve',
      },
    ],
    medicalSpecialty: 'Pediatrie',
    availableService: [
      {
        '@type': 'MedicalProcedure',
        name: 'Ambulantní péče',
        description: 'Ambulantní vyšetření a ošetření dětí do 19 let',
      },
      {
        '@type': 'MedicalProcedure',
        name: 'Kojenecká poradna',
        description: 'Kojenecká poradna pro děti ve věku 0-18 měsíců',
      },
      {
        '@type': 'MedicalProcedure',
        name: 'Očkování',
        description: 'Povinné a nepovinné preventivní očkování',
      },
      {
        '@type': 'MedicalProcedure',
        name: 'Preventivní péče',
        description: 'Pravidelné preventivní prohlídky a monitorování vývoje dětí',
      },
      {
        '@type': 'MedicalProcedure',
        name: 'Diagnostika a léčba',
        description:
          'Diagnostika a léčba nemocných dětí s důrazem na pečlivé zvážení všech příznaků',
      },
      {
        '@type': 'MedicalProcedure',
        name: 'Návštěvní služba',
        description: 'Návštěvní služba u novorozenců a nemocných dětí',
      },
      {
        '@type': 'MedicalProcedure',
        name: 'Potvrzení lékaře',
        description:
          'Potvrzení lékaře o zdravotním stavu dítěte pro sport, tábory, řidičské průkazy',
      },
      {
        '@type': 'MedicalProcedure',
        name: 'Konzultace se specialisty',
        description:
          'Konzultace se specialisty v případě potřeby pro předcházení budoucím komplikacím',
      },
    ],
    priceRange: '$$', // Kept as-is—implies moderate cost, adjust if needed
    paymentAccepted: 'Zdravotní pojištění', // Matches your "Smluvní pojišťovny"
    healthPlanNetworkId: ['VZP', 'ZPMV', 'OZP', 'RBP', 'ČPZP', 'VOZP'], // Exact match to your insurers
    availableLanguage: {
      '@type': 'Language',
      name: 'Čeština',
      alternateName: 'cs',
    },
  }
}
