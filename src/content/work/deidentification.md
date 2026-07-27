---
title: Context-sensitive de-identification
kind: engineering
order: 4
depth: full
period: June 2026 – present
summary: A 1.7B model fine-tuned to strip personal names from educational data, taking recall from 0.19 to 0.93 against a prompted baseline.
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
personal-name de-identification. Against a prompted baseline,
recall went from **0.19 to 0.93**, and data leakage fell from **0.41 to 0.04**.
The model and the dataset are on Hugging Face.

## Why the evaluation was most of the work

"Darwin" is a name, a city, and a
theory's owner, but only one of those needs removing. This is why a language model that understands the context around the word is necessary. A model tuned to catch
every capitalised word scores well on recall but destroys the text.
