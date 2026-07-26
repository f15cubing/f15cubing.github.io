---
title: Neural Chess Engine
kind: engineering
order: 2
depth: full
period: December 2025 – present
summary: A network trained on 200,000 Lichess positions, wired into a classical search.
status: Live. 4,700+ games played, 3,700+ of them rated, as felipe_bot_53.
stack: [Python, PyTorch, Oracle Cloud, Linux]
lichessInlay: true
repo: https://github.com/f15cubing/felipe_bot_53
links:
  - label: Play it on Lichess
    href: https://lichess.org/@/felipe_bot_53
---

A multi-layer network trained on more than 200,000 Lichess positions to
evaluate a board, combined with classic search techniques including
negamax with alpha–beta pruning, quiescence search to stop it walking into
captures at the horizon, an opening book, and three-to-five-piece Syzygy
tablebases so endgames can be played perfectly.

It runs on a Ubuntu ARM instance with
automated matchmaking.

The bot has played over 4,700 games since January.

## What I learned from it

The evaluation network was the most interesting part to build, but surprisingly not the most useful.
The training set was too small for the neural network to effectively learn how to evaluate positions beyond a simple material count.
Search depth and heuristics were what actually made the engine better.
The other lesson was about preventing the horizon effect. Quiescence search exists because a static
evaluation of a position mid-capture is meaningless, and so you look down the entire sequence of captures to make sure you're not leaving your queen hanging in 5 moves, just out of sight.