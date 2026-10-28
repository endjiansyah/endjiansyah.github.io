/**
 * i18n sederhana dua bahasa: ID (default, di root) dan EN (di bawah /en/).
 * Semua teks UI mengambil dari dict ini; slug konten antar bahasa dijaga sama
 * melalui frontmatter `slug` pada file .en.md, sehingga pasangan URL simetris:
 *   /works/x/            <-> /en/works/x/
 */

export type Lang = 'id' | 'en';

/** Deteksi bahasa dari pathname request (build time). */
export function langFromPath(path: string): Lang {
  return path.startsWith('/en') ? 'en' : 'id';
}

/** Base URL sesuai bahasa, untuk link anchor (mis. /#journey vs /en/#journey). */
export function baseUrl(lang: Lang): string {
  return lang === 'en' ? '/en' : '';
}

/** Tukar slug page URL ke bahasa lain, mempertahankan struktur & anchor. */
export function alternatePath(path: string, to: Lang): string {
  const withoutEn = path.startsWith('/en') ? path.slice(3) : path;
  return to === 'en' ? `/en${withoutEn}` : withoutEn || '/';
}

type Dict = Record<string, { id: string; en: string }>;

export const ui: Dict = {
  // Hero
  'hero.contact': { id: 'Hubungi Saya', en: 'Contact Me' },
  'hero.bio': {
    id: 'Halo, saya Endjiansyah. Saya seorang Software Engineer, AI-Augmented Developer, dan Educator di Alkademi. Saya berfokus pada pengembangan aplikasi web skala penuh, pengelolaan sistem edukasi digital, serta pembimbingan teknis (Technical Mentorship) pada berbagai program kolaborasi edukasi dan sosial nasional.',
    en: "Hi, I'm Endjiansyah. I'm a Software Engineer, AI-Augmented Developer, and Educator at Alkademi. I focus on full-scale web application development, digital education systems management, and technical mentorship across national education and social collaboration programs.",
  },

  // Journey
  'journey.pill': { id: 'Pengalaman & Perjalanan', en: 'Experience & Journey' },
  'journey.title': { id: 'The Journey', en: 'The Journey' },
  'journey.desc': {
    id: 'Perjalanan karir dari fondasi pemrograman web, manajemen produk & rekayasa, hingga technical mentorship dengan pendekatan AI-augmented development.',
    en: 'Career journey from web programming fundamentals, product & engineering management, to technical mentorship with an AI-augmented development approach.',
  },
  'journey.expTitle': { id: 'Pengalaman Kerja', en: 'Work Experience' },
  'journey.expSub': {
    id: 'Rekam Jejak Profesional — 2018 hingga hari ini',
    en: 'Professional Track Record — 2018 to present',
  },
  'journey.activeBadge': { id: 'Aktif Bekerja di Alkademi', en: 'Currently at Alkademi' },
  'journey.nowBadge': { id: 'Saat Ini', en: 'Current' },
  'journey.showDetail': { id: 'Show Detail', en: 'Show Detail' },
  'journey.hideDetail': { id: 'Hide Detail', en: 'Hide Detail' },
  'journey.eduTitle': { id: 'Pendidikan & Pelatihan', en: 'Education & Training' },
  'journey.eduSub': { id: 'Fondasi Vokasi & Akademik', en: 'Vocational & Academic Foundation' },
  'journey.pddikti': { id: 'Verifikasi di PDDikti Kemdiktisaintek', en: 'Verify on PDDikti Kemdiktisaintek' },

  // Works
  'works.pill': { id: 'Software Engineering Portfolio', en: 'Software Engineering Portfolio' },
  'works.title': { id: 'Selected Works', en: 'Selected Works' },
  'works.desc': {
    id: 'Kumpulan proyek rekayasa perangkat lunak dan aplikasi web yang saya rancang dan kembangkan sendiri — bukan proyek kantor. Proyek & program kolaborasi tingkat korporasi dapat dibaca pada bagian Pengalaman Kerja di atas.',
    en: 'A collection of software engineering and web application projects that I designed and built independently — not corporate projects. Company-level collaborations & programs can be read in the Work Experience section above.',
  },

  // Stories
  'stories.pill': { id: 'Field Notes & Insights', en: 'Field Notes & Insights' },
  'stories.title': { id: 'Stories & Field Notes', en: 'Stories & Field Notes' },
  'stories.desc': {
    id: 'Studi kasus lapangan, refleksi perjalanan profesional, dan inisiatif berdampak di dunia teknologi.',
    en: 'Field case studies, professional journey reflections, and impactful initiatives in technology.',
  },

  // Learning
  'learning.pill': { id: 'Authored Learning Modules', en: 'Authored Learning Modules' },
  'learning.title': { id: 'Learning & Modules', en: 'Learning & Modules' },
  'learning.desc': {
    id: 'Kumpulan modul bacaan dan seri video pembelajaran yang saya susun dan kembangkan sendiri secara terstruktur.',
    en: 'Reading modules and video learning series that I structured and developed on my own.',
  },
  'learning.loadMore': { id: 'Muat Lebih Banyak', en: 'Load More' },

  // Contact
  'contact.title': { id: 'Mari Berkolaborasi', en: 'Let\'s Collaborate' },
  'contact.desc': {
    id: 'Punya gagasan proyek, peluang kepemimpinan teknis, atau sekadar ingin bertukar pikiran? Saya selalu terbuka untuk diskusi yang produktif.',
    en: 'Have a project idea, a technical leadership opportunity, or just want to exchange ideas? I\'m always open to a productive discussion.',
  },
  'contact.email': { id: 'Kirim Email', en: 'Send Email' },

  // Footer
  'footer.tagline': { id: 'Membangun dengan Integritas', en: 'Building with Integrity.' },

  // Detail pages
  'detail.back': { id: 'Kembali', en: 'Back' },
  'detail.visitSite': { id: 'Kunjungi Website', en: 'Visit Website' },
  'detail.otherWorks': { id: 'Project Lainnya', en: 'Other Projects' },
  'detail.otherStories': { id: 'Stories Lainnya', en: 'Other Stories' },
  'detail.watchYoutube': { id: 'Tonton di YouTube', en: 'Watch on YouTube' },
  'detail.watchAllYoutube': { id: 'Tonton Semua di YouTube', en: 'Watch All on YouTube' },
  'detail.otherMaterials': { id: 'Materi Lainnya', en: 'Other Materials' },
  'detail.episode': { id: 'Episode', en: 'Episode' },
  'detail.video': { id: 'Video', en: 'Video' },
  'detail.module': { id: 'Modul', en: 'Module' },
  'detail.of': { id: 'total', en: 'of' },

  // Language switcher
  'lang.label': { id: 'Bahasa', en: 'Language' },
  'lang.id': { id: 'Indonesia', en: 'Indonesia' },
  'lang.en': { id: 'English', en: 'English' },
};

/** Ambil teks UI. */
export function t(lang: Lang, key: string): string {
  return ui[key]?.[lang] ?? ui[key]?.id ?? key;
}
