---
title: Context-sensitive de-identification
kind: engineering
order: 4
depth: full
period: June 2026 – present
summary: A 1.7B model fine-tuned to strip personal names from student writing, taking entity-level recall from 0.19 to 0.93 against a prompted baseline.
status: Adapter and dataset published. Built as an AI engineering intern at Alpha School.
stack: [Python, PyTorch, Unsloth, QLoRA, Hugging Face]
repo: https://github.com/f15cubing/slm-deid
links:
  - label: Adapter and dataset
    href: https://huggingface.co/felipe53
---

Educational text is full of names, and most of them must not leave the building.
The obvious approach — ask a large model to redact them — is unreliable in a
specific and dangerous way: it usually works, so you stop checking.

I fine-tuned **Qwen3-1.7B** with 4-bit QLoRA via Unsloth for context-sensitive
personal-name de-identification. Against a prompted baseline, entity-level
recall went from **0.19 to 0.93**, and data leakage fell from **0.41 to 0.04**.
The adapter and the dataset are on Hugging Face, with bootstrap confidence
intervals and a leakage-quarantined evaluation set.

## Why the evaluation was most of the work

*Context-sensitive* is the whole problem. "Darwin" is a name, a city, and a
theory's owner, and only one of those needs removing. A model tuned to catch
every capitalised token scores well on recall and destroys the text. So the
metric has to be entity-level, and the evaluation set has to be quarantined
against leakage — if a name in the test set appeared in training, a high score
tells you the model memorised a name list rather than learned when a name is a
person.

The bootstrap intervals exist for a related reason. On an evaluation set this
size, the difference between 0.93 and 0.91 is frequently nothing at all, and
reporting a bare point estimate invites everybody, including me, to believe a
change helped when it didn't.
