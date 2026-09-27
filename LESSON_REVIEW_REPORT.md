# Thread Academy — Lesson Quality Review
**Date:** 2026-09-22
**Scope:** All 1,098 lesson files (`content/chapters/<subject>/<chapter>/<topic>.mdx`) + source briefs (`~/workspace/gen/lessons/briefs*.json`)

## Method
1. **Automated scan** (`lesson_review.py`, local-only): structural checks, frontmatter, placeholder/mojibake detection, quiz integrity (answer index in range, no duplicate/empty options, explanation present), practice-item completeness, and **arithmetic verification** — every pure-arithmetic quiz question, practice answer, worked example, and brief answer was recomputed (including one-step equations like `x + 9 = 20`).
2. **Editorial spot-check:** 36 lessons read and hand-verified across all subject groups (3 parallel reviewers + my own reads), recomputing calculations and checking every marked quiz answer.

## Headline result
**Zero factual errors** in calculations, formulas, definitions, quiz marked answers, or practice answers across the automated scan and all 36 hand-checked lessons. The content is factually sound. All defects found were structural/editorial — and all clear-cut ones are now fixed.

## Defects found and fixed

### Fixed automatically (scripted, verified)
| Defect | Count | Fix |
|---|---|---|
| Duplicate quiz options (generator padded short option lists by copying the correct answer) | 12 questions in 10 files | Deduped to 3 distinct options, recomputed `answer={n}` |
| Double periods (`..`) at end of Summary bullets (generator's `sent()` bug) | ~590 lines across ~590 files | Collapsed to single period |

### Fixed by hand (editorial rewrites)
| File | Problem | Fix |
|---|---|---|
| `history/cold-war/origins-of-the-cold-war.mdx` | Titled "Origins 1945–1949" but body covered the *end* of the Cold War (Gorbachev, 1989, 1991); summary listed "Détente" never taught | Rewrote Key ideas, worked example, practice, one quiz question and summary to cover Yalta/Potsdam, Truman Doctrine, Marshall Plan, Berlin Blockade, NATO 1949 |
| `mathematics/further-statistics/normal-distribution.mdx` | Worked example, mistakes, 2 practice items and quiz Q2 were about hypothesis testing / binomial, not the normal distribution | Replaced with z-score probability content (empirical rule, P(X<115) worked example, σ vs σ² mistake) |
| `english/grammar-vocabulary/word-classes.mdx` | Promised the 8 parts of speech; taught sentence types and punctuation instead (noun/verb/adjective appeared zero times) | Full rewrite: the 8 word classes, worked labeling example, on-topic practice/quiz |
| `spanish/spanish-basics/ser-and-estar.mdx` | Key-ideas §1 and 3 of 4 practice questions were about -ar verb conjugation, not ser/estar | Replaced with ser conjugation section and ser/estar-choice practice |
| `computer-science/algorithms/bubble-sort.mdx` | ~Half the lesson (key ideas, worked example, practice, quiz) was about binary/linear search | Re-scoped to bubble sort: passes, trace worked example, plausible quiz distractors |
| `computer-science/algorithms/binary-search.mdx` | Mirror contamination: bubble-sort sections in a binary-search lesson | Re-scoped to binary search: halving method, trace, off-by-one mistake |
| `chemistry/chemical-bonding/ionic-bonding.mdx` | Key term and objective said "covalent bond" in an ionic-bonding lesson | Key term → ionic bond (contrast content kept — good pedagogy) |
| `physics/electricity/voltage-and-resistance.mdx` | Key ideas §2 + worked example were series/parallel content | Replaced with resistance factors and a V=IR worked example |
| `physics/energy/kinetic-energy.mdx` | One practice item asked about motor efficiency | Replaced with KE = ½mv² calculation |
| 2 history files | Lowercase "gandhi" / "fischer" in focus lines | Capitalized |

## Known limitations (not fixed — by design or needing human judgment)
- **Recycled quiz distractors (systemic):** In most generated lessons, wrong quiz options are verbatim answers to *other* practice questions — weak as assessment, but the marked answer is always correct. Fixing properly needs per-question plausible distractors (a generator-level change); flagged for a future pass.
- **57 thin quizzes** with only 1 question (generator failed to produce Q2/Q3). Functional, but thin.
- **41 authored-file structural warnings:** the 114 hand-written lessons use a different template (no Key-ideas/Mistakes sections etc.) — expected, not defects.
- **Cross-lesson repetition:** lessons within a chapter share brief material, so some practice questions repeat across a chapter's lessons. Cosmetic.
- Sample size: 36 of 1,098 lessons hand-checked. The automated scan covered 100% for structural/arithmetic issues; deeper subjects (e.g. advanced physics derivations, historiography debates) would benefit from domain-expert review.

## Verification
- Scanner: **0 errors** after fixes (was 13).
- Arithmetic: every verifiable calculation in lessons and briefs recomputed — all correct.
- Production build: clean (see build log), all 15,422 pages generated.

## Update 2026-09-23 — recycled quiz distractors fixed
- Re-scanned: 2,648 of 6,669 distractor options (40%) were verbatim copies of other practice answers, in 728 of 1,001 quiz files.
- Fixed at generator level: new `~/workspace/gen/lessons/quiz-distractors.ts` (`synthesizeDistractors()`) — numeric perturbation, yes/no counterparts, domain-relevant chapter terms/concepts/mistakes; `generate.ts` patched to use it.
- Migrated all existing files: 926 lesson files, 1,194 quiz questions rewritten (questions/correct answers/explanations untouched). Post-fix audit: 0 recycled distractors, 0 duplicate options, all answer indexes valid. Build clean. Pushed as `d416949a1550786b1dd810a3b474afd044665e20`.
- Still open: 57 quizzes with a single question; 8 pre-existing 3-option questions (valid, left as-is).
