import { z, defineCollection } from 'astro:content';

const worksCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.string(),
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
    date: z.string(),
    type: z.enum(['mentoring', 'event', 'other']),
    coverImage: z.string(),
    tags: z.array(z.string()).optional(),
    order: z.number().default(999),
  }),
});

export const collections = {
  'works': worksCollection,
  'stories': storiesCollection,
};
