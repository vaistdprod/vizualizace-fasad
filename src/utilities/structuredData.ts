/**
 * Utility for generating structured data (JSON-LD) for the website
 */

export const generateMedicalPracticeSchema = () => {
  return {
    '@context': 'https://schema.org',
    '@type': 'MedicalBusiness',
    '@id': process.env.NEXT_PUBLIC_SERVER_URL,
    name: 'Dětská ordinace Zbiroh',
    description:
      'Pediatrická ordinace poskytující zdravotní péči pro děti a dorost ve Zbirohu a okolí.',
    url: process.env.NEXT_PUBLIC_SERVER_URL,
    telephone: '+420 XXX XXX XXX', // Replace with actual phone number
    email: 'info@pediatr-zbiroh.cz', // Replace with actual email
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Masarykovo náměstí 123', // Replace with actual address
      addressLocality: 'Zbiroh',
      postalCode: '33808',
      addressCountry: 'CZ',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 49.8583, // Replace with actual coordinates
      longitude: 13.7722, // Replace with actual coordinates
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday'],
        opens: '08:00',
        closes: '16:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Tuesday'],
        opens: '08:00',
        closes: '16:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Wednesday'],
        opens: '08:00',
        closes: '16:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Thursday'],
        opens: '08:00',
        closes: '16:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Friday'],
        opens: '08:00',
        closes: '14:00',
      },
    ],
    medicalSpecialty: 'Pediatrics',
    availableService: [
      {
        '@type': 'MedicalProcedure',
        name: 'Preventivní prohlídky',
        description: 'Pravidelné preventivní prohlídky dětí a dorostu',
      },
      {
        '@type': 'MedicalProcedure',
        name: 'Očkování',
        description: 'Povinná i nepovinná očkování',
      },
      {
        '@type': 'MedicalProcedure',
        name: 'Léčebná péče',
        description: 'Diagnostika a léčba akutních i chronických onemocnění',
      },
    ],
    priceRange: '$$',
    paymentAccepted: 'Zdravotní pojištění',
    healthPlanNetworkID: ['VZP', 'ZPMV', 'OZP', 'RBP', 'CPZP', 'VOZP'], // Replace with actual insurance companies
  }
}

export const generateBreadcrumbSchema = (items: Array<{ name: string; url: string }>) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}
