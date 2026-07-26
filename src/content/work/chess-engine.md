---
title: Neural Chess Engine
kind: engineering
order: 2
depth: full
period: December 2025 – present
summary: A network trained on 200,000 Lichess positions, wired into a classical search, playing rated games unattended on a free-tier ARM box.
status: Live. 4,700+ games played, 3,700+ of them rated, as felipe_bot_53.
stack: [Python, PyTorch, Oracle Cloud, Linux]
lichessInlay: true
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

It runs as a UCI-compliant bot on an Ubuntu ARM instance, managed over SSH, with
automated matchmaking, and it plays rated games without me watching.

It started on Google Cloud, which was a mistake with a deadline attached: when
the trial lapsed the bot went quiet, and a project whose whole point is that it
runs unattended had stopped running. I moved it to Oracle's Always Free ARM tier
(`VM.Standard.A1.Flex`), which has no expiry. Rebuilding on `aarch64` meant
sorting out the Syzygy tablebases again, since those aren't in the repository.
The bot has since played over 4,700 games.

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
