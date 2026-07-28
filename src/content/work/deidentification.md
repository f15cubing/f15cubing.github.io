---
title: Context-sensitive de-identification
kind: engineering
order: 4
depth: full
period: June 2026 – present
summary: A 1.7B model fine-tuned to strip personal names from educational data, running locally yet scoring comparably to gpt-4.1.
status: Model and dataset published.
stack: [PyTorch, Unsloth, QLoRA, Hugging Face]
repo: https://github.com/f15cubing/slm-deid
links:
  - label: Model and dataset
    href: https://huggingface.co/felipe53
---

Educational text is full of PII (Personally Identifiable Information), which must be redacted if you want to share the data, say, for educational research.
The obvious approach, asking a large model to redact them, is unreliable for two reasons. One, the model is not trained to do this, and two, you are sending your presumably sensitive data to OpenAI or Anthropic to redact, so you need a model small enough to run locally.

I fine-tuned **Qwen3-1.7B** with 4-bit QLoRA via Unsloth for context-sensitive
personal-name de-identification. On 51 quarantined hard cases, against a prompted
baseline of the same 4-bit model: recall went from **0.52 to 0.85**, names missed
fell from **0.26 to 0.08**, and integrity violations — the model altering text it
should have left alone — fell from **0.59 to 0.02**. All with 95% bootstrap
confidence intervals.

The comparison I care about more is against the ceiling. On the same 51 cases,
**gpt-4.1** scores recall 0.78, misses 0.12, and passes 0.88 of passages, against
this model's 0.85 / 0.08 / 0.82. A 1.7B model running on one machine catches more
names and misses fewer than a frontier API model, and loses to it on over-tagging.
That is the whole point: the axis you cannot compromise on is the one where local
wins.

The model and the dataset are on Hugging Face.

## Why the evaluation was most of the work

"Darwin" is a name, a city, and a
theory's owner, but only one of those needs removing. This is why a language model that understands the context around the word is necessary. A model tuned to catch
every capitalised word scores well on recall but destroys the text.
