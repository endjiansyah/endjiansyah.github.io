/**
 * UI translations for multi-language support (i18n-ready)
 * Phase 1: Indonesian only
 * Phase 2: Add English translations
 */

export const languages = {
  id: 'Bahasa Indonesia',
  en: 'English',
};

export const defaultLang = 'id';

export const ui = {
  id: {
    // Navigation
    'nav.works': 'Works',
    'nav.stories': 'Stories',
    'nav.journey': 'Journey',
    'nav.contact': 'Contact',

    // Hero
    'hero.role': 'Software Engineer • Product Manager • Educator',
    'hero.description': 'Berakar dari pengembangan fundamental hingga menakhodai arsitektur sistem berskala enterprise. Memposisikan diri di titik tengah antara rekayasa teknis perangkat lunak, penyelarasan visi produk, dan komitmen kuat pada edukasi berbasis inklusi.',

    // Sections
    'section.journey': 'The Journey',
    'section.works': 'Selected Works',
    'section.stories': 'Stories & Initiatives',
    'section.contact': 'Mari Berkolaborasi',

    // Journey
    'journey.experience': 'Pengalaman Kerja',
    'journey.education': 'Pendidikan & Pelatihan',

    // Contact
    'contact.description': 'Punya ide proyek, peluang kolaborasi, atau sekadar ingin berdiskusi? Saya selalu terbuka untuk koneksi baru.',
    'contact.email': 'Kirim Email',
    'contact.whatsapp': 'WhatsApp',

    // Detail pages
    'detail.back': '← Kembali',
    'detail.visitSite': 'Kunjungi Website →',
    'detail.tools': 'Teknologi',
    'detail.otherWorks': 'Project Lainnya',
    'detail.otherStories': 'Cerita Lainnya',

    // Story types
    'type.mentoring': 'Mentoring',
    'type.event': 'Event',
    'type.other': 'Lainnya',

    // Footer
    'footer.tagline': 'Membangun dengan Integritas.',
  },
  en: {
    // Navigation
    'nav.works': 'Works',
    'nav.stories': 'Stories',
    'nav.journey': 'Journey',
    'nav.contact': 'Contact',

    // Hero
    'hero.role': 'Software Engineer • Product Manager • Educator',
    'hero.description': 'Rooted in fundamental development to architecting enterprise-scale systems. Positioned at the intersection of software engineering, product vision alignment, and a strong commitment to inclusive education.',

    // Sections
    'section.journey': 'The Journey',
    'section.works': 'Selected Works',
    'section.stories': 'Stories & Initiatives',
    'section.contact': "Let's Collaborate",

    // Journey
    'journey.experience': 'Work Experience',
    'journey.education': 'Education & Training',

    // Contact
    'contact.description': "Have a project idea, collaboration opportunity, or just want to chat? I'm always open to new connections.",
    'contact.email': 'Send Email',
    'contact.whatsapp': 'WhatsApp',

    // Detail pages
    'detail.back': '← Back',
    'detail.visitSite': 'Visit Website →',
    'detail.tools': 'Technologies',
    'detail.otherWorks': 'Other Projects',
    'detail.otherStories': 'Other Stories',

    // Story types
    'type.mentoring': 'Mentoring',
    'type.event': 'Event',
    'type.other': 'Other',

    // Footer
    'footer.tagline': 'Building with Integrity.',
  },
} as const;

export function useTranslations(lang: keyof typeof ui) {
  return function t(key: keyof typeof ui[typeof defaultLang]) {
    return ui[lang][key] || ui[defaultLang][key];
  }
}
