import { z, defineCollection } from 'astro:content';

const worksCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.date(),
    coverImage: z.string(),
    tools: z.array(z.string()),
    liveUrl: z.string().optional(),
    order: z.number().default(999),
  }),
});

const storiesCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.date(),
    endDate: z.date().optional(),
    dateLabel: z.string().optional(),
    type: z.enum(['mentoring', 'event', 'bootcamp', 'other']),
    coverImage: z.string(),
    tags: z.array(z.string()).optional(),
    order: z.number().default(999),
  }),
});

// Playlist video: container yang menyimpan daftar video YouTube.
// Video disimpan sebagai array di frontmatter (bukan collection terpisah).
const playlistsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.date(),
    coverImage: z.string(),
    youtubePlaylistUrl: z.string().optional(),
    tags: z.array(z.string()).optional(),
    videos: z.array(z.object({
      title: z.string(),
      youtubeId: z.string(),
      duration: z.string().optional(),
      description: z.string().optional(),
    })).default([]),
    order: z.number().default(999),
  }),
});

// Modul edukasi: artikel/bacaan standalone (mirip stories, body markdown = konten modul).
const modulesCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.date(),
    coverImage: z.string(),
    readTime: z.string().optional(),
    tags: z.array(z.string()).optional(),
    order: z.number().default(999),
  }),
});

export const collections = {
  'works': worksCollection,
  'stories': storiesCollection,
  'playlists': playlistsCollection,
  'modules': modulesCollection,
};
