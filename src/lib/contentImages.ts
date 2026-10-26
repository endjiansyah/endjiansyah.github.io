import { readFileSync, readdirSync, existsSync } from 'node:fs';
import path from 'node:path';
import { readImageDimensions } from './imageDimensions';

export const SITE = 'https://endjiansyah.github.io';

const CONTENT_DIR = './src/content';

const COLLECTION_DIRS = {
  works: `${CONTENT_DIR}/works`,
  stories: `${CONTENT_DIR}/stories`,
  playlists: `${CONTENT_DIR}/playlists`,
  modules: `${CONTENT_DIR}/modules`,
} as const;

export type CollectionName = keyof typeof COLLECTION_DIRS;

export interface ContentImage {
  /** Path publik gambar, mis. /assets/img/x.webp */
  url: string;
  /** Alt text asli dari markdown. */
  alt: string;
  width: number | null;
  height: number | null;
  /** 'cover' = coverImage frontmatter, 'inline' = gambar di dalam body artikel. */
  role: 'cover' | 'inline';
}

export interface ContentEntry {
  collection: CollectionName;
  slug: string;
  title: string;
  description: string;
  date: string | null;
  tags: string[];
  images: ContentImage[];
}

/** Buang komentar HTML agar gambar yang di-comment tidak ikut terdaftar. */
function stripHtmlComments(md: string): string {
  return md.replace(/<!--[\s\S]*?-->/g, '');
}

function parseFrontmatter(raw: string): string {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  return match ? match[1] : '';
}

function fmValue(fm: string, key: string): string | null {
  const m = fm.match(new RegExp(`^${key}:\\s*"?(.+?)"?\\s*$`, 'm'));
  return m ? m[1].trim() : null;
}

function fmArray(fm: string, key: string): string[] {
  const m = fm.match(new RegExp(`^${key}:\\s*\\[([^\\]]*)\\]`, 'm'));
  if (!m) return [];
  return m[1]
    .split(',')
    .map((s) => s.trim().replace(/^["']|["']$/g, ''))
    .filter(Boolean);
}

/**
 * Baca satu file markdown menjadi ContentEntry lengkap dengan SEMUA gambarnya
 * (cover + gambar inline di body) beserta dimensi aslinya.
 */
export function parseContentFile(collection: CollectionName, filePath: string): ContentEntry {
  const raw = readFileSync(filePath, 'utf-8');
  const fm = parseFrontmatter(raw);
  const body = stripHtmlComments(raw.slice(fm.length + 8));
  const slug = path.basename(filePath).replace(/\.md$/, '');
  const title = fmValue(fm, 'title') ?? slug;

  const images: ContentImage[] = [];
  const seen = new Set<string>();
  const seenUrls = new Set<string>();
  const seenInlineUrls = new Set<string>();

  const push = (url: string, alt: string, role: 'cover' | 'inline') => {
    if (!url || url.startsWith('http')) return;
    // Cover selalu menang atas inline untuk URL yang sama (mis. cover dipakai ulang
    // di dalam body) supaya tidak ada ImageObject duplikat di JSON-LD/sitemap.
    if (role === 'inline' && seenUrls.has(url) && seenInlineUrls.has(url)) return;
    const key = `${role}:${url}:${alt}`;
    if (seen.has(key)) return;
    seen.add(key);
    seenUrls.add(url);
    if (role === 'inline') seenInlineUrls.add(url);
    const dim = readImageDimensions(url);
    images.push({ url, alt, width: dim?.width ?? null, height: dim?.height ?? null, role });
  };

  const cover = fmValue(fm, 'coverImage');
  if (cover) push(cover, `${title} — Endjiansyah`, 'cover');

  // Gambar inline: ![alt](url). Alt asli markdown sudah menyebut nama Endjiansyah.
  for (const m of body.matchAll(/!\[([^\]]*)\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g)) {
    push(m[2], m[1] || title, 'inline');
  }

  return {
    collection,
    slug,
    title,
    description: fmValue(fm, 'description') ?? '',
    date: fmValue(fm, 'date'),
    tags: fmArray(fm, 'tags'),
    images,
  };
}

/** Baca seluruh entri pada satu koleksi. */
export function readCollection(collection: CollectionName): ContentEntry[] {
  const dir = COLLECTION_DIRS[collection];
  if (!existsSync(dir)) return [];
  return readdirSync(dir)
    .filter((f) => f.endsWith('.md'))
    .map((f) => parseContentFile(collection, `${dir}/${f}`));
}

/** Cache per koleksi supaya disk tidak dibaca berulang saat build. */
const cache = new Map<CollectionName, ContentEntry[]>();

export function getCollectionEntries(collection: CollectionName): ContentEntry[] {
  if (!cache.has(collection)) cache.set(collection, readCollection(collection));
  return cache.get(collection)!;
}

/** Cari entri berdasarkan collection + slug. */
export function findEntry(collection: CollectionName, slug: string): ContentEntry | null {
  return getCollectionEntries(collection).find((e) => e.slug === slug) ?? null;
}

/** Cari entri di playlists ATAU modules (keduanya di bawah /learning/[slug]). */
export function findLearningEntry(slug: string): ContentEntry | null {
  return findEntry('playlists', slug) ?? findEntry('modules', slug);
}
