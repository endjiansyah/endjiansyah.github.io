// @ts-check
import { defineConfig } from 'astro/config';

import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import { SITE, getCollectionEntries } from './src/lib/contentImages';
import rehypeImageDimensions from './src/lib/rehypeImageDimensions.ts';

/**
 * Hitung seluruh gambar yang layak didaftarkan ke sitemap untuk sebuah entri.
 * Bukan hanya cover — foto-foto di dalam artikel (yang memuat Endjiansyah) ikut didaftarkan.
 */
function sitemapImagesFor(entry) {
  if (!entry) return undefined;
  const imgs = entry.images.map((img) => ({
    url: `${SITE}${img.url}`,
    title: img.alt,
    caption: img.alt.includes('Endjiansyah') ? img.alt : `${img.alt} — Endjiansyah`,
  }));
  return imgs.length ? imgs : undefined;
}

/** Precompute peta URL -> daftar gambar supaya serialize tidak baca disk berulang. */
function buildImageMap() {
  const map = new Map();

  for (const collection of ['works', 'stories', 'playlists', 'modules']) {
    const routePrefix = collection === 'playlists' || collection === 'modules' ? 'learning' : collection;
    for (const entry of getCollectionEntries(collection)) {
      // File *-en.md mewakili versi Inggris di bawah prefix /en/.
      const prefix = entry.lang === 'en' ? '/en' : '';
      map.set(`${SITE}${prefix}/${routePrefix}/${entry.slug}/`, sitemapImagesFor(entry));
    }
  }

  // Halaman beranda: foto profil adalah gambar utama untuk query nama orang.
  map.set(`${SITE}/`, sitemapImagesHome());
  map.set(`${SITE}/en/`, sitemapImagesHome());

  return map;
}

function sitemapImagesHome() {
  return [
    {
      url: `${SITE}/assets/profile.webp`,
      title: 'Endjiansyah — Software Engineer, AI-Augmented Developer & Technical Mentor',
      caption: 'Endjiansyah — Software Engineer, AI-Augmented Developer & Technical Mentor',
    },
  ];
}

// https://astro.build/config
export default defineConfig({
  site: SITE,
  output: 'static',
  markdown: {
    // Stamp dimensi asli + lazy loading ke semua gambar markdown.
    rehypePlugins: [rehypeImageDimensions],
  },
  integrations: [
    tailwind(),
    sitemap({
      serialize(item) {
        const images = buildImageMap().get(item.url);
        if (images) item.img = images;
        return item;
      },
    }),
  ],
});