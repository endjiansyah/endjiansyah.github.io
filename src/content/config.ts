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

export const collections = {
  'works': worksCollection,
  'stories': storiesCollection,
};
