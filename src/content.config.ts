import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * `kind` is notation, not taxonomy: it selects which Byrne shape and colour
 * stands for the entry everywhere it appears. See src/components/Glyph.astro.
 */
const kind = z.enum(['geometry', 'engineering', 'teaching']);

const work = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/work' }),
  schema: z.object({
    title: z.string(),
    kind,
    summary: z.string(),
    /** Position in the sequence of propositions on /work. */
    order: z.number().int().positive(),
    /** `full` gets its own page; `card` is listed on /work only. */
    depth: z.enum(['full', 'card']).default('card'),
    period: z.string().optional(),
    /** Honest current state. Rendered verbatim — no inflation. */
    status: z.string().optional(),
    stack: z.array(z.string()).default([]),
    repo: z.string().url().optional(),
    demo: z.string().url().optional(),
    links: z
      .array(z.object({ label: z.string(), href: z.string().url() }))
      .default([]),
    /** Private source: described, deliberately not linked. */
    closedSource: z.boolean().default(false),
    /**
     * Renders the cached Lichess game inlay after the prose. Only meaningful on
     * the chess entry; see src/components/LichessGame.astro.
     */
    lichessInlay: z.boolean().default(false),
  }),
});

const posts = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    date: z.date(),
    summary: z.string(),
    kind: kind.default('teaching'),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

export const collections = { work, posts };
