---
title: Olympiad Archive
kind: teaching
order: 6
depth: card
period: '2026'
summary: An ingestion and tagging pipeline for a searchable corpus of olympiad problems, so you can ask for "projective geometry, IMO difficulty, 2015 onward" and get it.
status: In progress — importer and a pilot corpus.
stack: [Python]
repo: https://github.com/f15cubing/olympiad-archive
---

Competition problems are scattered across PDFs, forum threads, and national
websites in a dozen languages. This ingests them into one corpus and tags them
by topic and difficulty using two models independently, so disagreement between
them flags the problems a human should look at.
