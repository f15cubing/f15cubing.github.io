/**
 * The CV, as data. This is the only file to edit when the CV changes — the
 * /cv page renders whatever is here, in this order, with no markup to touch.
 *
 * Scope note: this drives the *web* CV, which is allowed to run long. The
 * one-page resume stays a separate document (Word → PDF); do not try to make
 * this fit on one page.
 *
 * No telephone number belongs in this file. The site is public and indexed.
 */

export interface CvEntry {
  /** The line in bold: job title, degree, or project name. */
  role: string;
  /** The line under it: institution, employer, or tech stack. */
  org: string;
  when: string;
  where?: string;
  points: string[];
}

export interface CvPair {
  label: string;
  value: string;
}

/**
 * A section renders by `kind`:
 *   entries — role/org/date blocks with bullets (experience, research, …)
 *   list    — flat lines, no bullets (honours)
 *   pairs   — label/value rows (skills)
 * Add a section by appending to `cv` below; the page picks it up automatically.
 */
export type CvSection =
  | { label: string; kind: 'entries'; entries: CvEntry[] }
  | { label: string; kind: 'list'; items: string[] }
  | { label: string; kind: 'pairs'; pairs: CvPair[] }
  /** Reads from src/data/courses.ts. Add a class there, not here. */
  | { label: string; kind: 'courses' };

export const cv: CvSection[] = [
  {
    label: 'Education',
    kind: 'entries',
    entries: [
      {
        role: 'B.S. Mathematics with Computer Science',
        org: 'Massachusetts Institute of Technology',
        when: 'September 2025 – May 2029',
        where: 'Cambridge, MA',
        points: [],
      },
    ],
  },

  // Rendered from src/data/courses.ts — add a class there and it appears here.
  {
    label: 'Coursework',
    kind: 'courses',
  },

  {
    label: 'Honours',
    kind: 'list',
    items: [
      'International Mathematical Olympiad — Bronze Medal (2025); Honourable Mention (2023, 2024)',
      'Iberoamerican Mathematical Olympiad — Silver Medal (2023, 2024)',
      'Colombian Mathematical Olympiad — National Winner (2023, 2024, 2025)',
      'Putnam Mathematical Competition — Top 500 (2025)',
    ],
  },

  {
    label: 'Experience',
    kind: 'entries',
    entries: [
      {
        role: 'AI Engineering Intern',
        org: 'Alpha School / Gauntlet AI',
        when: 'June 2026 – present',
        where: 'Remote',
        points: [
          'Fine-tuned Qwen3-1.7B (4-bit QLoRA, Unsloth) for context-sensitive personal-name de-identification in educational text, raising entity-level recall from 0.19 to 0.93 and cutting data leakage from 0.41 to 0.04 against a prompted baseline; published the adapter and dataset to Hugging Face with bootstrap confidence intervals and a leakage-quarantined evaluation set.',
          "Forked Anki (desktop and Android) in one week to build a GRE Mathematics prep app with a three-score readiness model — FSRS recall, logistic-regression performance, and projected scaled score — including a read-only mastery-query RPC added to Anki's Rust backend; shipped 50+ PRs via parallel autonomous-agent workflows.",
          'Authored research briefs on LLM evaluation, including IRT-calibrated adaptive benchmarking that recovers a 14,000-item benchmark score to within about 2% from roughly 100 items, and ran citation-integrity sweeps that caught fabricated and misattributed claims before publication.',
        ],
      },
      {
        role: 'Coach & Lecturer',
        org: 'Colombian Mathematical Olympiad Training Programme',
        when: 'August 2025 – June 2026',
        where: 'Bogotá, Colombia',
        points: [
          'Designed and taught the number theory and algebra curricula at the national training camp, for 30+ students preparing for IMO, Iberoamerican, PAGMO, and CentroAmerican team selection.',
          'Coauthored Problem 6 for the Colombian Mathematical Olympiad; designed the Iberoamerican team-selection test; graded the national semifinal and final rounds.',
        ],
      },
      {
        role: 'Treasurer',
        org: 'Number Six Club, MIT',
        when: 'January 2026 – present',
        where: 'Cambridge, MA',
        points: [
          'Manage a $400K+ annual operating budget for a 50+ member living group; built and maintain the financial system tracking income, expenses, rent, and disbursements, and handle tax filings.',
        ],
      },
    ],
  },

  {
    label: 'Research',
    kind: 'entries',
    entries: [
      {
        role: 'Undergraduate Researcher (UROP)',
        org: 'MIT Department of Mathematics — advised by Prof. Haynes Miller',
        when: 'November 2025 – present',
        where: 'Cambridge, MA',
        points: [
          'Built a Rust framework to computationally verify algebraic identities and test conjectures on level algebras and medial magmas.',
          'Applying category theory and algebraic topology to characterise their structure; contributing proofs to a manuscript in preparation.',
        ],
      },
    ],
  },

  {
    label: 'Projects',
    kind: 'entries',
    entries: [
      {
        role: 'Neural Chess Engine & Lichess Bot',
        org: 'Python · PyTorch · Oracle Cloud · Linux',
        when: 'December 2025 – present',
        points: [
          'Trained a multi-layer neural network on 200,000+ Lichess positions to evaluate board states; integrated with negamax search, alpha–beta pruning, quiescence search, an opening book, and 3–5-piece Syzygy tablebases.',
          // Migrated off GCP in July 2026 when the trial lapsed; now on Oracle's
          // Always Free ARM tier, which has no expiry date.
          'Deployed as a UCI-compliant bot on an Oracle Cloud Always Free ARM instance (VM.Standard.A1.Flex), managed over SSH, with automated matchmaking. Has played 4,700+ games, 3,700+ of them rated, running unattended.',
        ],
      },
      {
        role: 'Interactive Olympiad Geometry Platform',
        org: 'TypeScript · React · Firebase',
        when: 'Ongoing',
        points: [
          // Phrasing per your own instruction: "IMO-level problems", not a
          // specific named problem.
          "Built a formal geometry proof assistant with a from-scratch DDAR engine modelled on DeepMind's AlphaGeometry — 31 deduction rules verifying multi-step Euclidean proofs on IMO-level problems — plus a natural-language-to-formal-statement translator.",
        ],
      },
    ],
  },

  {
    label: 'Skills',
    kind: 'pairs',
    pairs: [
      { label: 'Proficient', value: 'Python, LaTeX, Bash/Linux CLI, Git' },
      { label: 'Familiar', value: 'Rust, TypeScript/React, C & Assembly' },
      {
        label: 'ML & data',
        value: 'PyTorch, Hugging Face, Unsloth, QLoRA/quantisation, NumPy',
      },
      { label: 'Infrastructure', value: 'Oracle Cloud (OCI), GCP, Firebase, Linux' },
      { label: 'Languages', value: 'English (fluent), Spanish (native)' },
    ],
  },
];
