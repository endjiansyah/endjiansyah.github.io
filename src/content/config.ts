import { z, defineCollection } from 'astro:content';

const portfolioCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    category: z.string(),
    description: z.string(),
    tools: z.array(z.string()).optional(),
  }),
});

export const collections = {
  'portfolio': portfolioCollection,
};
