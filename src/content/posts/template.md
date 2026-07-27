---
# Copy this file, rename it, and set draft: false to publish.
# The filename becomes the URL: writing/my-post/
title: Template — copy me
date: 2026-07-25
summary: One or two sentences that appear on the writing index and in the RSS feed. Say what the piece argues, not that it exists.
# geometry (▲ vermilion) · engineering (■ ultramarine) · teaching (● ochre)
kind: teaching
# While this is true the post is invisible: no page, no index entry, no RSS.
# The "Writing" nav link only appears once a non-draft post exists.
draft: true
---

Ordinary prose. Two spaces of indentation are not meaningful; Markdown rules apply.

## A heading

Inline maths uses single dollars: the inscribed angle $\theta$ subtends a
central angle $2\theta$. Display maths uses double dollars:

$$
\sum_{k=1}^{n} k^3 = \left( \frac{n(n+1)}{2} \right)^2
$$

KaTeX renders both at build time, so no JavaScript ships to the reader.

## Clips

For interactive work, a silent looping clip beats a screenshot:

```html
<figure>
  <video src="/clips/geometry-drag.mp4" autoplay loop muted playsinline></video>
  <figcaption>Dragging a vertex; the theorem holds.</figcaption>
</figure>
```

Put the file in `public/clips/`. Keep it short and encode it small — these are
illustrations, not videos.
