---
title: Speedrun — GRE Mathematics prep on Anki
kind: engineering
order: 5
depth: card
period: '2026'
summary: A fork of Anki, desktop and Android, rebuilt into a GRE Mathematics study app with three separate readiness scores instead of one confident guess.
status: Shipped as a fork. AGPL-3.0-or-later, credit to Anki.
stack: [Python, Rust, Kotlin]
repo: https://github.com/f15cubing/speedrun
---

A GRE Mathematics Subject Test study app built on a fork of Anki, desktop and
Android. It reports three scores rather than one: FSRS-derived recall,
logistic-regression performance, and a projected scaled score, each with honest
ranges — because a single number implies a precision the data doesn't have.
Required adding a read-only mastery-query RPC to Anki's Rust backend.
