# felipecaicedo — personal site

Static Astro site, no JavaScript shipped to the reader, deployed to GitHub Pages.

```bash
pnpm install
pnpm dev      # http://localhost:4321
pnpm check    # type-check + validate content frontmatter
pnpm build    # → dist/
```

## Where to edit what

Line numbers rot, so this table points at files and the identifier to search for.

| To change | Edit | Look for |
| --- | --- | --- |
| The tagline under your name | `src/lib/site.ts` | `tagline` |
| The caption beside the figure | `src/pages/index.astro` | `hero__caption` |
| The "Who" paragraphs | `src/pages/index.astro` | `id="about-h"` |
| `/work` heading and intro | `src/pages/work/index.astro` | `page-head__title` |
| A project's one-liner, status, links | `src/content/work/<slug>.md` | frontmatter |
| A project's write-up | `src/content/work/<slug>.md` | body, below `---` |
| Project order, or card vs. full page | `src/content/work/<slug>.md` | `order`, `depth` |
| The CV | `src/data/cv.ts` | — |
| Coursework | `src/data/courses.ts` | — |
| Email, LinkedIn, GitHub, meta description | `src/lib/site.ts` | `links`, `description` |
| The figure and its animation | `src/components/Construction.astro` | see below |
| Colours, type scale, spacing | `src/styles/global.css` | `:root` |

Frontmatter is validated, so `pnpm check` catches a mistake before it ships.

## The hero figure and its animation

`src/components/Construction.astro` is one file with two halves.

**The figure** is plain SVG on a `0 0 320 250` canvas: circle centred at
`(160,140)` with radius `95`, three points on the circumference at `(160,45)`,
`(73,178)`, `(247,178)`. The two angle marks are `<path>` wedges sharing a 36px
radius so their widths can be compared directly, which is the whole point of the
proposition. If you move a point, recompute the wedges or they'll drift off the
vertex.

**The choreography** is the CSS underneath. Strokes are drawn by animating
`stroke-dashoffset` to zero; fills use `byrne-ink` to fade in. Order and timing
come from `animation-delay`, currently: circle at 0ms, the two radii at 720 and
860, the chord at 1000, the two sides at 1180 and 1340, the points at 1500, then
the ochre and vermilion angle marks at 1640 and 1800. To make it quicker, scale
every delay down together — they're deliberately staged in
compass-and-straightedge order, so changing one in isolation breaks the sequence.

To replace the figure entirely, keep the class names (`cons__circle`,
`cons__radius`, `cons__chord`, `cons__side`, `cons__wedge-o`, `cons__wedge-a`,
`cons__pt`) and the animation comes along for free. Update the `aria-label` to
describe whatever the new figure shows, and keep the `prefers-reduced-motion`
block at the bottom, which renders the finished state immediately.

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

**Edit `src/data/cv.ts` and nothing else.** `/cv` renders whatever that file
contains, in order. Each section declares a `kind`:

| `kind` | Renders as | Used for |
| --- | --- | --- |
| `entries` | role / org / date with bullets | experience, research, projects |
| `list` | flat lines, no bullets | honours |
| `pairs` | label / value rows | skills |

Adding a section means appending one object to the `cv` array; the page picks it
up with no markup changes. Bullet text supports `**bold**` and `*italic*` via a
small inline formatter (`src/lib/inline.ts`), not a Markdown parser.

**The web CV is allowed to run long.** The one-page constraint belongs to the
resume PDF, which stays a separate Word-authored document. Don't compress this
to fit a page.

**No telephone number belongs anywhere in this repository.** The site is public
and indexed.

To offer the resume as a download: export it from the Word original *with the
phone number removed*, save it to `public/`, and set `cvPdf` in
`src/lib/site.ts`. The link only renders when that value is set.

## CI and deploying

`ci.yml` type-checks and builds on every push. It should always be green.

`deploy.yml` publishes `dist/` to <https://f15cubing.github.io/> on every commit
to `main`. Pages source is set to **GitHub Actions**.

The repository is public because Pages requires that on a plan without GitHub
Pro. Note that even with Pro, a Pages site published from a private repository
is still publicly reachable — access-controlled Pages needs GitHub Enterprise
Cloud, so "private website" was never available here.

Because the repository is named `f15cubing.github.io`, the site serves from the
root and no `base` path configuration is needed. For a custom domain later: add
a `CNAME` file to `public/`, set the domain under Settings → Pages, and update
`site` in `astro.config.mjs`.

For a custom domain later: add a `CNAME` file to `public/` containing the
domain, set it under Settings → Pages, and update `site` in `astro.config.mjs`.
Nothing else changes, because the site is served from the root.
