import path from "node:path";

import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

import { Tags } from "./lib/const";

const posts = defineCollection({
  loader: glob({
    base: "./src/content/posts",
    pattern: "**/index.md",
    generateId: ({ entry }) => path.basename(path.dirname(entry)),
  }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    tags: z.array(z.enum(Tags)).nonempty(),
    published: z.boolean(),
    publishedAt: z.string(),
    updatedAt: z.string().optional(),
  }),
});

export const collections = {
  posts,
};
