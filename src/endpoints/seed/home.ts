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
}) => ({
  slug: 'home',
  _status: 'published',
  title: 'Dětská ordinace Zbiroh',
  layout: [
    {
      blockType: 'heroSection',
      title: 'Dětská ordinace Zbiroh',
      description:
        'Poskytujeme plnou péči o jakékoliv dítě od narození do 19 let včetně nedonošených a rizikových dětí.\n\nI při sebemenším vyšetření dbáme na pečlivé zvážení všech příznaků a neváháme kontaktovat specialisty, abychom předešli budoucím komplikacím.\n\nDbáme i na preventivní úkony na ochranu zdraví dětí a dorostu, jako je očkování nebo monitorování vývoje dětí pravidelnými preventivními prohlídkami.\n\nO naší kvalitě bezesporu svědčí i fakt, že odchované děti se k nám velmi často vrací s vlastními dětmi, a tak se často staráme o několik generací v jedné rodině.',
      primaryButtonText: 'Objednat se',
      primaryButtonLink: '#objednani',
      secondaryButtonText: 'Naše služby',
      secondaryButtonLink: '#nase-sluzby',
      image: heroImage, // Pass the full Media object
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
          shortDescription:
            'Diagnostika a léčba nemocných dětí s důrazem na pečlivé zvážení všech příznaků',
        },
        {
          title: 'Návštěvní služba',
          icon: 'Bandage',
          shortDescription: 'Návštěvní služba u novorozenců a nemocných dětí',
        },
        {
          title: 'Potvrzení lékaře',
          icon: 'MessageCircle',
          shortDescription:
            'Potvrzení lékaře o zdravotním stavu dítěte pro sport, tábory, řidičské průkazy',
        },
        {
          title: 'Konzultace se specialisty',
          icon: 'Microscope',
          shortDescription:
            'Konzultace se specialisty v případě potřeby pro předcházení budoucím komplikacím',
        },
      ],
    },
    {
      blockType: 'teamSection',
      heading: 'Náš tým',
      description: 'Staráme se o zdravý a pohodový vývoj vašeho dítěte.',
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
      blockType: 'hoursSection',
      heading: 'Ordinační hodiny',
      description: 'Pokud je to jen možné, prosíme o objednávání se předem.',
      hours: [
        { day: 'Pondělí', hours: '08:00-13:00' },
        {
          day: 'Úterý',
          hours: '08:00-12:00 (Poradna pro zdravé pozvané děti)\n13:00-16:00 (Pro nemocné děti)',
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
      blockType: 'insuranceSection',
      heading: 'Smluvní pojišťovny',
      description: 'Spolupracujeme s většinou z hlavních zdravotních pojišťoven.',
      partners: [
        { title: 'VZP', logo: vzpImage.id },
        { title: 'ZPMV', logo: zpmvImage.id },
        { title: 'OZP', logo: ozpImage.id },
        { title: 'RBP', logo: rbpImage.id },
        { title: 'ČPZP', logo: cpzpImage.id },
        { title: 'VOZP', logo: vozpImage.id },
      ],
      contactPrompt: 'Nevidíte zde svou pojišťovnu? Napište nám pro více informací.',
    },
    {
      blockType: 'faqSection',
      heading: 'Často kladené dotazy',
      description: 'Zde najdete odpovědi na nejčastější dotazy.',
      faqs: [
        {
          question: 'Jak se mohu objednat na preventivní prohlídku?',
          answer:
            'Objednat se můžete telefonicky v ordinačních hodinách nebo pomocí našeho online objednávkového systému. Pro preventivní prohlídky doporučujeme objednání s předstihem.',
        },
        {
          question: 'Co mám dělat v případě akutních potíží mimo ordinační hodiny?',
          answer:
            'V případě akutních potíží mimo ordinační hodiny kontaktujte pohotovostní službu na čísle 155 nebo navštivte nejbližší dětskou pohotovost.',
        },
        {
          question: 'Jak probíhá první návštěva v ordinaci?',
          answer:
            'První návštěva zahrnuje podrobné vyšetření dítěte, seznámení s jeho zdravotní dokumentací a konzultaci s rodiči. Přineste s sebou očkovací průkaz a předchozí zdravotní záznamy.',
        },
        {
          question: 'Jaký je postup při očkování?',
          answer:
            'Očkování probíhá podle platného očkovacího kalendáře. Před očkováním provedeme vyšetření, zda je dítě zdravé. Po očkování doporučujeme 30minutové pozorování v čekárně.',
        },
        {
          question: 'Pečujete o děti všech věkových kategorií?',
          answer:
            'Ano, poskytujeme plnou péči o jakékoliv dítě od narození do 19 let včetně nedonošených a rizikových dětí. O naší kvalitě svědčí i fakt, že odchované děti se k nám velmi často vrací s vlastními dětmi, a tak se často staráme o několik generací v jedné rodině.',
        },
      ],
      contactPrompt: 'Nezodpověděli jsme váš dotaz? Kontaktujte nás',
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
        },
        {
          title: 'Pro neregistrované',
          duration: '30 minut',
          description: 'Po kliknutí budete vyzváni k registraci.',
          buttonText: 'Objednat se',
        },
      ],
      imageSection: {
        title: 'Příjemné prostředí',
        description: 'Naše ordinace je vybavena tak, aby se u nás děti cítily dobře',
        image: galleryImage2.id,
      },
      contactPrompt: 'Potřebujete se objednat kvůli něčemu jinému?',
      contactLinkText: 'Kontaktujte nás',
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
  meta: {
    title: 'Dětská ordinace Zbiroh',
    description: 'Poskytujeme plnou péči o děti od narození do 19 let.',
    image: heroImage.id,
  },
})
