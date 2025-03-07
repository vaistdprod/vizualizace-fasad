import type { RequiredDataFromCollectionSlug } from 'payload'
import type { Form, Media, Aktuality } from '@/payload-types'

type HomeArgs = {
  heroImage: Media
  teamImage: Media
  aktualitaImage1: Media // Updated from galleryImage1
  aktualitaImage2: Media // Updated from galleryImage2
  aktualitaImage3: Media // Updated from galleryImage3
  vzpImage: Media
  zpmvImage: Media
  ozpImage: Media
  rbpImage: Media
  cpzpImage: Media
  vozpImage: Media
  kontaktniFormular: Form // Keep as generic Form type
  aktuality: Aktuality[]
  backgroundImageMraky: Media
  backgroundImagePuntiky: Media
  backgroundImageMalovanky: Media
  mrakyOpacity?: number
  puntikyOpacity?: number
  malovankyOpacity?: number
}

export const home: (args: HomeArgs) => RequiredDataFromCollectionSlug<'pages'> = ({
  heroImage,
  teamImage,
  aktualitaImage1, // Updated
  aktualitaImage2, // Updated
  aktualitaImage3, // Updated
  vzpImage,
  zpmvImage,
  ozpImage,
  rbpImage,
  cpzpImage,
  vozpImage,
  kontaktniFormular,
  aktuality,
  backgroundImageMraky,
  backgroundImagePuntiky,
  backgroundImageMalovanky,
  mrakyOpacity = 0.15,
  puntikyOpacity = 0.15,
  malovankyOpacity = 0.15,
}) => ({
  slug: 'home',
  _status: 'published',
  title: 'Dětská ambulance MUDr. Janulová',
  layout: [
    {
      blockType: 'backgroundImageBlock',
      image: backgroundImageMraky,
      opacity: mrakyOpacity,
      blocks: [
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
      ],
    },
    {
      blockType: 'backgroundImageBlock',
      image: backgroundImagePuntiky,
      opacity: puntikyOpacity,
      blocks: [
        {
          blockType: 'hoursSection',
          heading: 'Ordinační hodiny',
          description: 'Prosíme o objednání předem na telefonním čísle 732 229 610.',
          hours: [
            { day: 'Pondělí', hours: '7:30-10:00 (nemocní) / 10:00-14:00 (prevence)' },
            { day: 'Úterý', hours: '7:30-10:00 (nemocní) / 10:00-13:00 (prevence)' },
            { day: 'Středa', hours: '10:00-11:30 (nemocní) / 13:00-18:00 (poradna)' },
            { day: 'Čtvrtek', hours: '7:30-10:00 (nemocní) / 10:00-13:00 (prevence)' },
            { day: 'Pátek', hours: '7:30-10:00 (nemocní) / 10:00-13:00 (prevence)' },
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
              shortDescription: 'Poradenství pro kojence a jejich maminky.',
            },
            {
              icon: 'Activity',
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
              description: 'Zkušená dětská lékařka zaměřená na komplexní péči o děti.',
              image: teamImage.id,
            },
            {
              title: 'Monika',
              role: 'Zdravotní sestra',
              description: 'Pomáhá s péčí a organizací v ordinaci.',
              image: teamImage.id,
            },
          ],
        },
      ],
    },
    {
      blockType: 'backgroundImageBlock',
      image: backgroundImageMalovanky,
      opacity: malovankyOpacity,
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
            {
              title: 'Výživové poradenství (45 minut)',
              description: 'Konzultace pro zdravou stravu dětí.',
              price: '600 Kč',
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
              value: 'U Pošty 402/14, 625 00 Brno, Starý Lískovec',
              href: 'https://maps.google.com/?q=U%20Pošty%20402/14,%20625%2000%20Brno',
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
              label: 'Poloha',
              value: '1. patro, dveře č. 107',
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
              title: 'Tramvaj',
              description: 'Zastávka Starý Lískovec, linky 6, 7, 8',
              icon: '🚋',
            },
            {
              title: 'Trolejbus',
              description: 'Zastávka Starý Lískovec, linka 25',
              icon: '🚎',
            },
            {
              title: 'Autobus',
              description: 'Zastávka Starý Lískovec, linky 50, 69',
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
