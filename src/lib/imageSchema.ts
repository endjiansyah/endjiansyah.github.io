import { SITE, type ContentImage } from './contentImages';

export interface ImageObjectOptions {
  /** Konteks kredit, mis. "project" atau "dokumentasi kegiatan". */
  context?: string;
  /** Nama orang yang dikreditkan. */
  authorName?: string;
}

/**
 * Ubah ContentImage menjadi schema.org ImageObject.
 *
 * Caption SELALU memuat nama pemilik. Ini kuncinya: Google Images memakai caption
 * untuk mengaitkan gambar dengan entitas orang, sehingga foto Endjiansyah bisa
 * muncul untuk query namanya.
 */
export function toImageObject(img: ContentImage, opts: ImageObjectOptions = {}) {
  const authorName = opts.authorName ?? 'Endjiansyah';
  const caption = img.alt.includes(authorName)
    ? img.alt
    : `${img.alt} — ${opts.context ?? 'dokumentasi'} ${authorName}`;

  return {
    '@type': 'ImageObject' as const,
    url: `${SITE}${img.url}`,
    contentUrl: `${SITE}${img.url}`,
    ...(img.width && img.height ? { width: img.width, height: img.height } : {}),
    caption,
    name: img.alt,
    encodingFormat: /\.svg$/i.test(img.url)
      ? 'image/svg+xml'
      : /\.png$/i.test(img.url)
        ? 'image/png'
        : /\.jpe?g$/i.test(img.url)
          ? 'image/jpeg'
          : 'image/webp',
    author: {
      '@type': 'Person' as const,
      name: authorName,
      url: SITE,
    },
  };
}

/**
 * Bangun ImageObject[] untuk satu entri: cover lebih dulu, lalu gambar inline.
 * `limit` membatasi jumlah agar payload JSON-LD tidak membengkak.
 */
export function entryImageObjects(
  images: ContentImage[],
  opts: ImageObjectOptions = {},
  limit = 12,
): ReturnType<typeof toImageObject>[] {
  const ordered = [...images].sort((a, b) => (a.role === 'cover' ? -1 : b.role === 'cover' ? 1 : 0));
  return ordered.slice(0, limit).map((img) =>
    toImageObject(img, {
      ...opts,
      context: img.role === 'cover' ? opts.context : 'dokumentasi kegiatan',
    }),
  );
}
