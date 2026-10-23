// Satu sumber kebenaran untuk tipe story: label badge + style-nya.
// Dipakai oleh StoryCard, halaman detail stories, dan schema di content/config.ts
// agar label & warna tidak pernah lagi berbeda antar tampilan.

export const storyTypes = ['mentoring', 'event', 'bootcamp', 'other'] as const;

export type StoryType = (typeof storyTypes)[number];

export interface StoryTypeStyle {
  /** Kelas badge lengkap (background + warna teks + border). */
  badge: string;
  /** Tabel label badge. */
  label: string;
}

export const storyTypeStyles: Record<StoryType, StoryTypeStyle> = {
  mentoring: { badge: 'bg-indigo-50/90 text-indigo-700 border-indigo-200/60', label: 'Mentoring' },
  event: { badge: 'bg-amber-50/90 text-amber-800 border-amber-200/60', label: 'Inisiatif / Event' },
  bootcamp: { badge: 'bg-orange-50/90 text-orange-800 border-orange-200/60', label: 'Karir & Vokasi' },
  other: { badge: 'bg-teal-50/90 text-teal-800 border-teal-200/60', label: 'Field Note' },
};

/** Ambil style tipe story; fallback aman ke 'other' untuk nilai tak dikenal. */
export function storyTypeStyle(type: string): StoryTypeStyle {
  return storyTypeStyles[type as StoryType] ?? storyTypeStyles.other;
}
