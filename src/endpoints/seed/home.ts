import type { RequiredDataFromCollectionSlug } from 'payload'
import type { Form, Media, Aktuality } from '@/payload-types'

type HomeArgs = {
  heroImage: Media
  _ordinace: Media
  _hracky: Media
  _vysetrovna: Media
  vzpImage: Media
  zpmvImage: Media
  ozpImage: Media
  rbpImage: Media
  cpzpImage: Media
  vozpImage: Media
  kontaktniFormular: Form
  aktuality: Aktuality[]
  backgroundImagePolka: Media
  backgroundImageIlustrace: Media
  polkaOpacity?: number
  ilustraceOpacity?: number
}

export const home: (args: HomeArgs) => RequiredDataFromCollectionSlug<'pages'> = ({
  heroImage,
  _ordinace,
  _hracky,
  _vysetrovna,
  vzpImage,
  zpmvImage,
  ozpImage,
  rbpImage,
  cpzpImage,
  vozpImage,
  kontaktniFormular,
  aktuality,
  backgroundImagePolka,
  backgroundImageIlustrace,
  polkaOpacity = 0.3,
  ilustraceOpacity = 0.06,
}) => ({
  slug: 'uvod',
  _status: 'published',
  title: 'Dětská ambulance MUDr. Janulová',
  layout: [
    {
      blockType: 'heroSection',
      title: 'Dětská ambulance MUDr. Janulová',
      description:
        'Poskytujeme odbornou péči dětem od narození až do 19 let. Specializujeme se na diagnostiku, léčbu a prevenci, včetně laktační poradny a očkování. Naše moderně vybavená ordinace v Brně zajišťuje rychlé testy a profesionální přístup. Zdraví vašich dětí je naší prioritou.',
      primaryButtonText: 'Kontaktujte nás',
      primaryButtonLink: '#kontakty',
      secondaryButtonText: 'Naše služby',
      secondaryButtonLink: '#sluzby',
      image: heroImage,
    },
    {
      blockType: 'newsSection',
      heading: 'Aktuality',
      description: 'Sledujte novinky z naší ambulance.',
      aktuality: aktuality.map((a) => a.id),
    },
    {
      blockType: 'backgroundImageBlock',
      image: backgroundImagePolka,
      opacity: polkaOpacity,
      blocks: [
        {
          blockType: 'hoursSection',
          heading: 'Ordinační hodiny',
          description: 'Prosíme o objednání předem na telefonním čísle 732 229 610.',
          hours: [
            {
              day: 'Pondělí',
              schedules: [
                { timeRange: '7:30-10:00', note: 'nemocní' },
                { timeRange: '10:00-14:00', note: 'prevence' },
              ],
            },
            {
              day: 'Úterý',
              schedules: [
                { timeRange: '7:30-10:00', note: 'nemocní' },
                { timeRange: '10:00-13:00', note: 'prevence' },
              ],
            },
            {
              day: 'Středa',
              schedules: [
                { timeRange: '10:00-11:30', note: 'nemocní' },
                { timeRange: '13:00-18:00', note: 'poradna' },
              ],
            },
            {
              day: 'Čtvrtek',
              schedules: [
                { timeRange: '7:30-10:00', note: 'nemocní' },
                { timeRange: '10:00-13:00', note: 'prevence' },
              ],
            },
            {
              day: 'Pátek',
              schedules: [
                { timeRange: '7:30-10:00', note: 'nemocní' },
                { timeRange: '10:00-13:00', note: 'prevence' },
              ],
            },
          ],
          closedDates: [
            {
              from: '2025-04-21',
              to: '2025-04-21',
              note: 'Svátek – Velikonoční pondělí',
            },
          ],
          bloodDrawInfo: 'ODBĚRY BIOLOGICKÉHO MATERIÁLU: Po-Pá 7:30-9:00',
          emergencyContactInfo: 'Máte akutní problém? Kontaktujte nás na',
          emergencyPhone: '+420 732 229 610',
        },
        {
          blockType: 'servicesSection',
          heading: 'Naše služby',
          description: 'Komplexní péče o zdraví vašich dětí.',
          services: [
            {
              icon: 'Stethoscope',
              title: 'Preventivní prohlídky',
              shortDescription: 'Pravidelné kontroly vývoje a zdraví dětí.',
            },
            {
              icon: 'Syringe',
              title: 'Očkování',
              shortDescription:
                'Standardní i nadstandardní vakcinace (klíšťová encefalitida, žloutenka, meningokok).',
            },
            {
              icon: 'Heart',
              title: 'Laktační poradna',
              shortDescription: 'Poradenství pro maminky kojenců.',
            },
            {
              icon: 'Microscope',
              title: 'Diagnostika',
              shortDescription: 'Rychlé testy na CRP a moč do 2 minut.',
            },
            {
              icon: 'Bandage',
              title: 'Drobná poranění',
              shortDescription: 'Ošetření ran a odstranění stehů.',
            },
            {
              icon: 'HeartPulse',
              title: 'Výživové poradenství',
              shortDescription: 'Rady pro zdravou stravu dětí.',
            },
          ],
        },
        {
          blockType: 'teamSection',
          heading: 'Náš tým',
          description: 'Tým odborníků pečující o vaše děti s láskou a profesionalitou.',
          teamMembers: [
            {
              title: 'MUDr. Miroslava Janulová',
              role: 'Pediatr',
              icon: 'Stethoscope',
              description: 'Zkušená dětská lékařka zaměřená na komplexní péči o děti.',
            },
            {
              title: 'Monika',
              role: 'Zdravotní sestra',
              icon: 'Heart',
              description: 'Pomáhá s péčí a organizací v ordinaci.',
            },
          ],
        },
      ],
    },
    {
      blockType: 'backgroundImageBlock',
      image: backgroundImageIlustrace,
      opacity: ilustraceOpacity,
      blocks: [
        {
          blockType: 'insuranceSection',
          heading: 'Smluvní pojišťovny',
          description: 'Spolupracujeme s těmito zdravotními pojišťovnami.',
          partners: [
            { title: 'VZP', logo: vzpImage.id, url: 'https://www.vzp.cz' },
            { title: 'VOZP', logo: vozpImage.id, url: 'https://www.vozp.cz' },
            { title: 'ČPZP', logo: cpzpImage.id, url: 'https://www.cpzp.cz' },
            { title: 'OZP', logo: ozpImage.id, url: 'https://www.ozp.cz' },
            { title: 'RBP', logo: rbpImage.id, url: 'https://www.rbp213.cz' },
            { title: 'ZPMVČR', logo: zpmvImage.id, url: 'https://www.zpmvcr.cz' },
          ],
          contactPrompt: 'Nevidíte svou pojišťovnu? Kontaktujte nás.',
          contactCard: {
            heading: 'Máte otázky k pojištění?',
            buttonText: 'Napište nám',
            buttonLink: '#kontakty',
          },
        },
        {
          blockType: 'pricingSection',
          heading: 'Ceník služeb',
          description: 'Přehled cen za nadstandardní služby.',
          pricingItems: [
            {
              title: 'Očkování proti klíšťové encefalitidě',
              description: 'Nepovinná vakcinace na přání rodičů.',
              price: '850 Kč',
            },
            {
              title: 'Očkování proti žloutence (Hepatitida A+B)',
              description: 'Doporučená vakcinace pro děti.',
              price: '1 200 Kč',
            },
            {
              title: 'Očkování proti meningokoku (MenB)',
              description: 'Ochrana proti meningokokovým infekcím.',
              price: '1 800 Kč',
            },
            {
              title: 'Laktační poradna (30 minut)',
              description: 'Individuální konzultace pro kojící matky.',
              price: '500 Kč',
            },
            {
              title: 'Test na CRP',
              description: 'Rychlý test z krve do 2 minut.',
              price: '250 Kč',
            },
          ],
          contactPrompt: 'Potřebujete více informací o cenách?',
          tableHeaders: {
            service: 'Služba',
            description: 'Popis',
            price: 'Cena',
          },
          contactLink: {
            text: 'Kontaktujte nás',
            href: '#kontakty',
          },
        },
        {
          blockType: 'contactSection',
          heading: 'Kontaktujte nás',
          description: 'Jsme tu pro vás a vaše děti.',
          form: kontaktniFormular.id,
          contactMethods: [
            {
              label: 'Adresa',
              value: 'U Pošty 402/14, 625 00 Brno, Starý Lískovec, 1. patro, dveře č. 107',
              href: 'https://maps.app.goo.gl/yp4vJJC6vHpHLWvo7',
              icon: 'MapPin',
              colorClass: 'bg-pink-100 text-pink-600',
            },
            {
              label: 'Telefon',
              value: '+420 732 229 610',
              href: 'tel:+420732229610',
              icon: 'Phone',
              colorClass: 'bg-blue-100 text-blue-600',
            },
            {
              label: 'E-mail',
              value: 'mirka.janulova@seznam.cz',
              href: 'mailto:mirka.janulova@seznam.cz',
              icon: 'Mail',
              colorClass: 'bg-purple-100 text-purple-600',
            },
            {
              label: 'Ordinační hodiny',
              value: 'Jsme zde pro vás od pondělí do pátku.',
              href: '#ordinacni-hodiny',
              icon: 'Clock',
              colorClass: 'bg-green-100 text-green-600',
            },
          ],
          mapEmbedUrl:
            'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2608.7054235701626!2d16.56247737712967!3d49.16819937885334!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x471295ebc83e77b5%3A0x340ea0d079c0244!2zTVVEci4gTWlyb3NsYXZhIEphbnVsb3bDoSAtIGTEm3Rza8O9IGzDqWthxZk!5e0!3m2!1sen!2scz!4v1741372365525!5m2!1sen!2scz',
          navigationButtonText: 'Navigovat do ordinace',
          transportMethods: [
            {
              title: 'Automobil',
              description: 'Parkoviště dostupné u polikliniky',
              icon: '🚗',
            },
            {
              title: 'Tramvaj',
              description: 'Zastávka Osová, linky 6, 7, 8',
              icon: '🚋',
            },
            {
              title: 'Autobus a trolejbus',
              description: 'Zastávka Osová, linky 25, 50, 69',
              icon: '🚌',
            },
          ],
        },
      ],
    },
  ],
  meta: {
    title: 'Dětská ambulance MUDr. Janulová',
    description: 'Odborná péče pro děti v Brně od narození do 19 let.',
    image: heroImage.id,
  },
})
