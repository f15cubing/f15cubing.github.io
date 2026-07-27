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
    /**
     * Sort key for /work, low to high. It is not the printed numeral: those
     * count rendered entries, so hiding one leaves no gap. Values may therefore
     * have holes, and reordering means editing only the entries that moved.
     */
    order: z.number().int().positive(),
    /** `full` gets its own page; `card` is listed on /work only. */
    depth: z.enum(['full', 'card']).default('card'),
    /**
     * Keeps an entry in the repository but off the site entirely: no card, no
     * page, no link. Use it to shelve something without deleting the write-up.
     */
    hidden: z.boolean().default(false),
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
    draft: z.boolean().default(false),
  }),
});

export const collections = { work, posts };
