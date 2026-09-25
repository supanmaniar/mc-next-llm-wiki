# Exam Q&A Study Guide

> **Purpose:** A scenario-driven study guide written in **Salesforce's own exam house style**. Each entry follows a strict three-part structure:
>
> 1. **Question** — a realistic scenario with a persona and a clear ask.
> 2. **Answer** — the correct option(s).
> 3. **Why** — the reasoning, plus why the tempting distractors are wrong.
>
> **Why a separate folder?** `Exam Section Based Flashcards/` is for fast recall drilling. This folder is for **understanding the reasoning** behind each answer — the skill the real exam actually tests.

---

## Exam Blueprint

| # | Section | Weight | Questions | Guide |
|---|---------|--------|-----------|-------|
| 1 | Platform Setup & Governance | 13% | 38 | [[section-1-platform-setup-governance]] |
| 2 | Consent | 13% | 51 | [[section-2-consent]] |
| 3 | Data Modeling, Identity Resolution & Segmentation | 25% | 60 | [[section-3-data-identity-segmentation]] |
| 4 | Campaign Design, Flow Orchestration & Content | 30% | 104 | [[section-4-campaign-flow-content]] |
| 5 | Agentforce & AI Innovation | 11% | 20 | [[section-5-agentforce-ai]] |
| 6 | Analytics & Performance Insights | 8% | 19 | [[section-6-analytics-insights]] |
| | **Total** | **100%** | **292** | |

**Exam facts:** 60 scored questions + up to 5 unscored · 105 minutes · **72%** to pass · Summer '26 release · no prerequisite · no reference materials.

---

## Coverage

Every concept page in `concepts/` is now represented by at least one question. The table below maps the previously uncovered topics to where they now live.

| Concept page | Section | Covered by |
|---|---|---|
| `sandbox-and-deployment` | 1 | Q16–Q21 |
| `domain-settings` | 1 | Q22–Q24 |
| `email-sending-setup` | 1 | Q25–Q28 |
| `allocations-limits-page-customization` | 1 | Q29–Q31 |
| `data-kits-and-data-streams` | 1 | Q14, Q32 |
| `channels-overview` | 1 | Q33–Q38 |
| `web-tracking` | 2 | Q27–Q33 |
| `consent-sync-hybrid` | 2 | Q34–Q37 |
| `consent-setup-billing` | 2 | Q38–Q43 |
| `consent-channels-troubleshooting` | 2 | Q44–Q51 |
| `segment-canvas-and-filters` | 3 | Q42–Q60 |
| `content-and-personalization` | 4 | Q76 |
| `merge-fields-and-expressions` | 4 | Q79–Q82 |
| `campaign-record-workflow` | 4 | Q77–Q78, Q83–Q88 |
| `marketing-triggers` | 4 | Q89–Q92 |
| `rest-api-flow-integration` | 4 | Q93–Q96 |
| `marketing-sites` | 4 | Q97–Q100 |
| `mce-journeys-campaigns` | 4 | Q101–Q104 |

> **Note on placement:** `channels-overview` (SMS/WhatsApp/mobile setup) sits in Section 1 because channel provisioning is platform setup, not campaign design. No "Uncategorised" page was needed — every topic found a home.

### Known remaining gap

The bank is now **topic-complete** but still **format-limited**: every question is a single-answer scenario. The real exam also uses **multi-select ("Choose 2")**, **negative stems ("EXCEPT")**, and **sequence questions ("What is the FIRST step")**. These are not yet represented.

---

## How Salesforce Frames Its Questions

Understanding the house style is half the battle. Salesforce questions are **scenario-first**, not definition-first.

### The stem patterns you will see

| Stem pattern                                      | What it tests                              |
| ------------------------------------------------- | ------------------------------------------ |
| "Which solution should the consultant recommend?" | Best-fit selection among plausible options |
| "Which **two** actions should be taken?"          | Multi-select — **no partial credit**       |
| "What is the **first** step…?"                    | Sequence / order knowledge                 |
| "Which feature **meets the requirement**?"        | Constraint satisfaction                    |
| "What is the **primary** reason…?"                | Causal understanding                       |

### The four-option distractor formula

Every answer set is engineered. Expect:

1. **The correct answer** — meets every stated requirement.
2. **The "almost right"** — right feature, wrong detail (wrong limit, edition, or order).
3. **The plausible-but-wrong** — a real feature that doesn't satisfy the requirement.
4. **The legacy / over-engineered** — an older approach or needlessly complex solution.

> ⚠️ **The most common trap:** an answer that is correct in general but fails on an **edition gate** (Growth vs Advanced) or a **hard limit** (25 personalization points, 15 variations, 9,950 segments).

### Reading tactics

1. **Read the last sentence first** — that's the question; the scenario is context.
2. **Underline the constraints** — "without writing rules", "Advanced only", "at send time".
3. **Watch for absolutes and negatives** — "EXCEPT", "NOT", "always", "never", "only".
4. **Prefer the simplest correct answer** — Salesforce rarely rewards over-engineering.
5. **Check edition gates on every feature question.**
6. **For "Choose 2", verify each option independently.**

### Time strategy

- **105 minutes ÷ 60 questions ≈ 1.75 min per question.** Flag and move on.
- **No negative marking** — never leave a blank. Eliminate two options and guess.
- **72% to pass** — you can miss roughly 17 of 60.

---

## How to Use This Guide

1. **Cover the Answer and Why.** Read the Question, commit to an answer, *then* reveal.
2. **Read the Why even when you're right.** The distractor analysis is where the real learning is.
3. **Note the ⚠️ traps.** These mirror the exam's favourite discriminators.
4. **Weight your time.** Section 4 (30%) + Section 3 (25%) = **55% of the exam**.

---

## Related

- [[exam-revision-summary]] — consolidated revision guide by exam weight
- [[study-roadmap]] — full learning tracks & progress dashboard
- `Exam Section Based Flashcards/` — fast recall drilling by section
- `flashcards/` — topic-based decks (deeper dives per source)