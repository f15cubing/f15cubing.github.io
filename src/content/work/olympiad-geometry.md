---
title: Interactive Olympiad Geometry
kind: geometry
order: 1
depth: full
period: '2026'
summary: A geometry course where every figure is draggable, and a from-scratch proof checker that verifies olympiad arguments the way a grader would.
status: Functional MVP — one full course, plus a proof mode backed by a 31-rule DDAR engine. Not yet publicly deployed.
stack: [TypeScript, React, JSXGraph, Firebase, Vitest]
repo: https://github.com/f15cubing/brilliant-clone
---

Two halves that need each other.

The first is a course on angle chasing: seven lessons, thirty-nine problems, and
every construction draggable. You pull a vertex around and the theorem keeps
holding — which is the fastest way I know to make somebody believe a statement
before they can prove it.

The second is the part I actually care about. **Competitive Freeplay** lets you
assemble a multi-step proof and have it checked by a DDAR engine I wrote from
scratch in TypeScript, modelled on the deduction half of DeepMind's
AlphaGeometry. Thirty-one deduction rules, including a length-and-ratio layer
built on an arithmetic-reasoning core, over fourteen curated puzzles. It
verifies arguments up to the difficulty of IMO 2019 Problem 2. There's an
optional natural-language mode that translates a written step into a formal one,
so you can type "power of a point at $P$" instead of clicking a rule out of a
list.

## The hard part

Checking a proof is not checking an answer. A student can be right in a way you
didn't anticipate, and a checker that only recognises the intended solution is
worse than no checker at all — it teaches the student that correct reasoning is
wrong. So the engine works forwards: it takes the facts you've asserted, closes
them under its rule set, and asks whether the goal fell out. Any route that
reaches the goal passes, including routes I never thought of.

The length layer was the awkward one. Angle chasing closes nicely under a small
set of rules; ratios drag in similar triangles, power of a point, and Thales,
each of which wants to introduce terms that weren't in the original figure.
Deciding what the engine is allowed to construct on its own is most of the
design.

## Honest state

One course is finished and the proof mode works. Lint, CI, and a Vitest suite
covering the Freeplay engine, the rule lab, and the course logic are in place;
component and UI tests are the real remaining gap. The app runs against a
Firebase sandbox and isn't deployed for public use yet — the engine itself has
no backend dependency, which is what makes putting a piece of it on this site a
reasonable next step rather than a rewrite.
