# felipecaicedo — personal site

Static Astro site, no JavaScript shipped to the reader, deployed to GitHub Pages.

```bash
pnpm install
pnpm dev      # http://localhost:4321
pnpm check    # type-check + validate content frontmatter
pnpm build    # → dist/
```

## Design

Colour follows Oliver Byrne's 1847 edition of Euclid's *Elements*, where the
coloured figure replaced the letter-label: colour is notation, not decoration.
The triad is inherited from `ByrneMark.tsx` in the Interactive Olympiad Geometry
codebase so the two projects read as one hand.

| Token | Value | Means |
| --- | --- | --- |
| `--vermilion` | `#c0392b` | geometry, proof, construction (▲) |
| `--ultramarine` | `#27418c` | engineering, systems, models (■) |
| `--ochre` | `#e0a526` | teaching, writing, problem-setting (●) |
| `--ink` | `#1b1714` | text |
| `--paper` | `#faf6ef` | ground |

Type is Caslon at two optical sizes — Display for anything large, Text for
reading — with IBM Plex Mono as the utility face for labels, data, and code.
Fonts are self-hosted; no external requests.

There is **no dark-mode toggle** by design: a toggle would be the only
JavaScript on the site. `prefers-color-scheme: dark` is honoured in pure CSS, so
readers in dark environments get a dark ground automatically.

The single animation is the hero figure drawing itself in compass-and-straightedge
order. It is CSS-only and disabled under `prefers-reduced-motion`.

## Adding a post

Copy `src/content/posts/template.md`, rename it (the filename becomes the URL),
and set `draft: false`.

The **Writing** nav link, the `/writing` index, and the RSS feed all appear on
their own once one non-draft post exists. Until then the section is unlinked and
`noindex`, so the site never advertises an empty room. Maths is written in `$…$`
and `$$…$$` and rendered at build time by KaTeX.

## Adding or editing work

Files in `src/content/work/`. `depth: full` gives an entry its own page;
`depth: card` lists it on `/work` only. `order` sets the proposition number.
`kind` picks the Byrne shape. `status` is rendered verbatim — keep it honest.

`pnpm check` fails on a bad schema, so a typo can't ship. Note that a bare year
in `period` must be quoted (`period: '2026'`), or YAML parses it as a number.

## The CV

`src/pages/cv.astro` holds the CV as markup — indexable, readable on a phone,
in the site's own type. **No telephone number appears anywhere on the site.**

To offer a PDF download: export one from the Word original *with the phone
number removed*, save it to `public/`, and set `cvPdf` in `src/lib/site.ts` to
its path. The download link only renders when that value is set.

## Deploying

Push to `main`. `.github/workflows/deploy.yml` runs `pnpm check` then
`pnpm build` and publishes `dist/`.

**One-time setup:** in the repository's Settings → Pages, set Source to
**GitHub Actions**. Until then the workflow will fail at the deploy step.

For a custom domain later: add a `CNAME` file to `public/` containing the
domain, set it under Settings → Pages, and update `site` in `astro.config.mjs`.
Nothing else changes, because the site is served from the root.
