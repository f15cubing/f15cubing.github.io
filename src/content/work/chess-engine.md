---
title: Neural Chess Engine
kind: engineering
order: 2
depth: full
period: December 2025 – March 2026
summary: A network trained on 200,000 Lichess positions, wired into a classical search, playing rated games unattended on a cloud VM.
status: Live. Playing rated games as felipe_bot_53.
stack: [Python, PyTorch, GCP, Linux]
repo: https://github.com/f15cubing/felipe_bot_53
links:
  - label: Play it on Lichess
    href: https://lichess.org/@/felipe_bot_53
---

A multi-layer network trained on more than 200,000 Lichess positions to
evaluate a board, sitting inside a search that a 1990s engine would recognise:
negamax with alpha–beta pruning, quiescence search to stop it walking into
captures at the horizon, an opening book, and three-to-five-piece Syzygy
tablebases so endgames are played perfectly rather than approximately.

It runs as a UCI-compliant bot on an Ubuntu VM on GCP, managed over SSH, and it
plays rated games without me watching.

## What I learned from it

The evaluation network was the interesting part to build and the least
interesting part of the strength. Search depth dominated. A better evaluation
function that costs you two plies is usually a downgrade, and the tablebases —
which involve no learning whatsoever — bought more rating points than any
architecture change I made.

The other lesson was about horizons. Quiescence search exists because a static
evaluation of a position mid-capture is meaningless, and every version of this
engine that skipped it played beautifully until it lost a queen for nothing.
Most of my debugging was not "is the network good" but "does the engine know
when it is allowed to stop looking."
