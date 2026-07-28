---
title: felipe_bot_53
kind: engineering
order: 2
depth: full
period: December 2025 – present
summary: A chess engine with a neural network evaluation function, combined with classical search heuristics.
status: Live and 5,000+ games played.
stack: [Python, PyTorch, Oracle Cloud, Linux]
lichessInlay: true
repo: https://github.com/f15cubing/felipe_bot_53
links:
  - label: Play it on Lichess
    href: https://lichess.org/@/felipe_bot_53
---

felipe_bot_53 is a chess bot which uses classic search techniques, including
negamax with alpha–beta pruning, quiescence search to mitigate the horizon effect, an opening book, and three-to-five-piece
tablebases so endgames can be played perfectly, combined with a neural network evaluation function trained on more than 200,000 Lichess positions.

It runs on a Ubuntu ARM instance with
automated matchmaking.

The bot has played over 5,000 games since January, 3,800+ of them rated. I stopped
developing it in March; it has run unattended since.

## What I learned from it

The evaluation network was the most interesting part to build, but surprisingly not the most useful.
The training set was too small for the neural network to effectively learn how to evaluate positions beyond a simple material count.
Search depth and heuristics were what actually made the engine better.
The other lesson was about preventing the horizon effect. Quiescence search exists because a static
evaluation of a position mid-capture is meaningless, and so you look down the entire sequence of captures to make sure you're not leaving your queen hanging in 5 moves, just out of sight.