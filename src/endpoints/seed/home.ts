// src/endpoints/seed/home.ts
import type { RequiredDataFromCollectionSlug } from 'payload'
import type { Form, Media, Aktuality } from '@/payload-types'

type HomeArgs = {
  heroImage: Media
  teamImage: Media
  galleryImage1: Media
  galleryImage2: Media
  galleryImage3: Media
  vzpImage: Media
  zpmvImage: Media
  ozpImage: Media
  rbpImage: Media
  cpzpImage: Media
  vozpImage: Media
  contactForm: Form
  aktuality: Aktuality[]
  backgroundImageMraky: Media // First 3 sections
  backgroundImagePuntiky: Media // Next 3 sections
  backgroundImageMalovanky: Media // Last 4 sections
  mrakyOpacity?: number // Opacity for mraky block
  puntikyOpacity?: number // Opacity for puntiky block
  malovankyOpacity?: number // Opacity for malovanky block
}

export const home: (args: HomeArgs) => RequiredDataFromCollectionSlug<'pages'> = ({
  heroImage,
  teamImage,
  galleryImage1,
  galleryImage2,
  galleryImage3,
  vzpImage,
  zpmvImage,
  ozpImage,
  rbpImage,
  cpzpImage,
  vozpImage,
  contactForm,
  aktuality,
  backgroundImageMraky,
  backgroundImagePuntiky,
  backgroundImageMalovanky,
  mrakyOpacity = 0.15, // Default matches component
  puntikyOpacity = 0.15, // Default matches component
  malovankyOpacity = 0.15, // Default matches component
}) => ({
  slug: 'home',
  _status: 'published',
  title: 'Dětská ordinace Zbiroh',
  layout: [
    {
      blockType: 'backgroundImageBlock', // First 3 sections with mraky.svg
      image: backgroundImageMraky,
      opacity: mrakyOpacity, // Added opacity field
      blocks: [
        {
          blockType: 'heroSection',
          title: 'Dětská ordinace Zbiroh',
          description:
            'Poskytujeme plnou péči o jakékoliv dítě od narození do 19 let včetně nedonošených a rizikových dětí.\n\nI při sebemenším vyšetření dbáme na pečlivé zvážení všech příznaků a neváháme kontaktovat specialisty, abychom předešli budoucím komplikacím.\n\nDbáme i na preventivní úkony na ochranu zdraví dětí a dorostu, jako je očkování nebo monitorování vývoje dětí pravidelnými preventivními prohlídkami.\n\nO naší kvalitě bezesporu svědčí i fakt, že odchované děti se k nám velmi často vrací s vlastními dětmi, a tak se často staráme o několik generací v jedné rodině.',
          primaryButtonText: 'Objednat se',
          primaryButtonLink: '#objednani',
          secondaryButtonText: 'Naše služby',
          secondaryButtonLink: '#sluzby',
          image: heroImage,
        },
        {
          blockType: 'newsSection',
          heading: 'Aktuality',
          description: 'Čtěte nejnovější informace z naší ordinace.',
          aktuality: aktuality,
        },
        {
          blockType: 'appointmentSection',
          heading: 'Naplánujte si návštěvu',
          description: 'Zvolte typ objednání, který potřebujete.',
          appointmentTypes: [
            {
              title: 'Pro registrované',
              duration: '30 minut',
              description: 'Po kliknutí se budete moci přihlásit.',
              buttonText: 'Objednat se',
              buttonLink: '#registrovani',
            },
            {
              title: 'Pro neregistrované',
              duration: '30 minut',
              description: 'Po kliknutí budete vyzváni k registraci.',
              buttonText: 'Objednat se',
              buttonLink: '#neregistrovani',
            },
          ],
          imageSection: {
            title: 'Příjemné prostředí',
            description: 'Naše ordinace je vybavena tak, aby se u nás děti cítily dobře',
            image: galleryImage2.id,
          },
          contactPrompt: 'Potřebujete se objednat kvůli něčemu jinému?',
          contactLinkText: 'Kontaktujte nás.',
        },
      ],
    },
    {
      blockType: 'backgroundImageBlock', // Next 3 sections with puntiky.svg
      image: backgroundImagePuntiky,
      opacity: puntikyOpacity, // Added opacity field
      blocks: [
        {
          blockType: 'hoursSection',
          heading: 'Ordinační hodiny',
          description: 'Pokud je to jen možné, prosíme o objednávání se předem.',
          hours: [
            { day: 'Pondělí', hours: '08:00-13:00' },
            {
              day: 'Úterý',
              hours:
                '08:00-12:00 (Poradna pro zdravé pozvané děti)\n13:00-16:00 (Pro nemocné děti)',
            },
            { day: 'Středa', hours: '08:00-13:00' },
            {
              day: 'Čtvrtek',
              hours:
                '08:00-11:00 (Poradna pro zdravé pozvané děti)\n13:00-18:00 (13:00-15:00 nemocné děti, 15:00-18:00 poradna pro pozvané děti)',
            },
            { day: 'Pátek', hours: '08:00-13:00' },
          ],
          bloodDrawInfo: 'ODBĚRY KRVE 08:00 – 09:00 HODIN\n(PONDĚLÍ – STŘEDA – PÁTEK)',
          emergencyContactInfo: 'Vaše dítě má akutní potíže? Zavolejte nám na číslo',
          emergencyPhone: '+420 371 794 225',
        },
        {
          blockType: 'servicesSection',
          heading: 'Služby',
          description:
            'Poskytujeme plnou péči o jakékoliv dítě od narození do 19 let včetně nedonošených a rizikových dětí.',
          services: [
            {
              title: 'Ambulantní péče',
              icon: 'Stethoscope',
              shortDescription: 'Ambulantní vyšetření a ošetření dětí do 19 let',
            },
            {
              title: 'Kojenecká poradna',
              icon: 'Heart',
              shortDescription: 'Kojenecká poradna pro děti ve věku 0-18 měsíců',
            },
            {
              title: 'Očkování',
              icon: 'Syringe',
              shortDescription: 'Povinné a nepovinné preventivní očkování',
            },
            {
              title: 'Preventivní péče',
              icon: 'HeartPulse',
              shortDescription: 'Pravidelné preventivní prohlídky a monitorování vývoje dětí',
            },
            {
              title: 'Diagnostika a léčba',
              icon: 'Activity',
              shortDescription: 'Diagnostika a léčba nemocných dětí s důrazem na příznaky',
            },
            {
              title: 'Návštěvní služba',
              icon: 'Bandage',
              shortDescription: 'Návštěvní služba u novorozenců a nemocných dětí',
            },
            {
              title: 'Potvrzení lékaře',
              icon: 'MessageCircle',
              shortDescription: 'Potvrzení o zdravotním stavu dítěte pro sport, tábory, průkazy',
            },
            {
              title: 'Konzultace se specialisty',
              icon: 'Microscope',
              shortDescription: 'Konzultace pro předcházení komplikacím u dětí',
            },
          ],
        },
        {
          blockType: 'teamSection',
          heading: 'Náš tým',
          description: 'Staráme se o zdravý a pohodový vývoj vašeho dětěte.',
          teamMembers: [
            {
              title: 'MUDr. Lucie Šťastná',
              role: 'Pediatr',
              description:
                'Specializovaná dětská lékařka s 5letou praxí v pediatrii. Absolventka 1. lékařské fakulty UK v Praze.',
              image: teamImage.id,
            },
          ],
        },
      ],
    },
    {
      blockType: 'backgroundImageBlock', // Last 4 sections with malovanky.svg
      image: backgroundImageMalovanky,
      opacity: malovankyOpacity, // Added opacity field
      blocks: [
        {
          blockType: 'gallerySection',
          heading: 'Naše ordinace',
          description: 'Prohlédněte si naši ordinaci.',
          images: [
            { title: 'Ordinace', image: galleryImage1.id },
            { title: 'Čekárna', image: galleryImage2.id },
            { title: 'Vyšetřovna', image: galleryImage3.id },
          ],
        },
        {
          blockType: 'insuranceSection',
          heading: 'Smluvní pojišťovny',
          description: 'Spolupracujeme s většinou z hlavních zdravotních pojišťoven.',
          partners: [
            { title: 'VZP', logo: vzpImage.id, url: 'https://www.vzp.cz' },
            { title: 'ZPMV', logo: zpmvImage.id, url: 'https://www.zpmvcr.cz' },
            { title: 'OZP', logo: ozpImage.id, url: 'https://www.ozp.cz' },
            { title: 'RBP', logo: rbpImage.id, url: 'https://www.rbp213.cz' },
            { title: 'ČPZP', logo: cpzpImage.id, url: 'https://www.cpzp.cz' },
            { title: 'VOZP', logo: vozpImage.id, url: 'https://www.vozp.cz' },
          ],
          contactPrompt: 'Nevidíte zde svou pojišťovnu?',
        },
        {
          blockType: 'pricingSection',
          heading: 'Ceník našich služeb',
          description: 'Přehled cen za naše pediatrické služby.',
          pricingItems: [
            {
              title: 'Preventivní prohlídka dítěte',
              description: 'Kompletní preventivní kontrola zdravotního stavu dítěte.',
              price: '500 Kč',
            },
            {
              title: 'Očkování (povinné)',
              description: 'Standardní povinné vakcinace dle očkovacího kalendáře.',
              price: '300 Kč',
            },
            {
              title: 'Očkování (nepovinné)',
              description: 'Volitelné vakcinace na přání rodičů (např. chřipka).',
              price: '500 Kč',
            },
            {
              title: 'Kojenecká poradna (1 hodina)',
              description: 'Poradenství pro kojence včetně vážení a měření.',
              price: '700 Kč',
            },
            {
              title: 'Ambulantní vyšetření',
              description: 'Jednorázové vyšetření při běžných potížích.',
              price: '600 Kč',
            },
            {
              title: 'Diagnostika a léčba (základní)',
              description: 'Základní diagnostika a léčba akutních onemocnění.',
              price: '800 Kč',
            },
            {
              title: 'Návštěvní služba (domácí)',
              description: 'Vyšetření u vás doma v případě nemoci dítěte.',
              price: '1 200 Kč',
            },
            {
              title: 'Potvrzení o zdravotním stavu',
              description: 'Vystavení potvrzení pro školy, tábory apod.',
              price: '400 Kč',
            },
            {
              title: 'Konzultace s pediatrem (30 minut)',
              description: 'Osobní konzultace s lékařem o zdraví dítěte.',
              price: '500 Kč',
            },
            {
              title: 'Ultrazvuk (břišní)',
              description: 'Ultrazvukové vyšetření břišní dutiny dítěte.',
              price: '1 000 Kč',
            },
            {
              title: 'Odběr krve',
              description: 'Odběr krve pro laboratorní analýzu.',
              price: '300 Kč',
            },
            {
              title: 'Náhradní očkování (po odložení)',
              description: 'Opakované očkování po přerušení kalendáře.',
              price: '450 Kč',
            },
            {
              title: 'Poradna pro zdravé děti',
              description: 'Pravidelná kontrola zdravých dětí do 18 měsíců.',
              price: '600 Kč',
            },
            {
              title: 'Monitorování vývoje dítěte',
              description: 'Dlouhodobé sledování růstu a vývoje dítěte.',
              price: '550 Kč',
            },
            {
              title: 'Akutní ošetření (mimo ordinační hodiny)',
              description: 'Okamžitá péče při akutních stavech mimo běžnou dobu.',
              price: '1 500 Kč',
            },
            // New items
            {
              title: 'EKG vyšetření',
              description: 'Záznam srdeční činnosti pro děti s podezřením na problémy.',
              price: '700 Kč',
            },
            {
              title: 'Test na alergie',
              description: 'Kožní test na běžné alergeny u dětí.',
              price: '900 Kč',
            },
            {
              title: 'Rehabilitace (30 minut)',
              description: 'Cvičení s fyzioterapeutem pro děti s pohybovými obtížemi.',
              price: '600 Kč',
            },
          ],
          contactPrompt: 'Máte dotazy k ceníku?',
        },
        {
          blockType: 'contactSection',
          heading: 'Spojte se s námi',
          description: 'Rádi vám zodpovíme vaše dotazy.',
          form: contactForm.id,
          address: 'Masarykovo náměstí 275, 338 08 Zbiroh',
          phone: '+420 371 794 225',
          email: 'info@pediatr-zbiroh.cz',
          mapEmbedUrl:
            'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2572.1125065799224!2d13.76620967715638!3d49.85913122976267!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x470baaaa1d0a350f%3A0x14e1bcba391994f7!2zSsOtbGtvdsOhIEV2YSBNVURyLg!5e0!3m2!1sen!2scz!4v1740499961460!5m2!1sen!2scz',
          navigationButtonText: 'Navigovat do ordinace',
        },
      ],
    },
  ],
  meta: {
    title: 'Dětská ordinace Zbiroh',
    description: 'Poskytujeme plnou péči o děti od narození do 19 let.',
    image: heroImage.id,
  },
})
