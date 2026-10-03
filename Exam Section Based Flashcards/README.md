# Exam Section Based Flashcards

> **Purpose:** Active-recall decks organised **by exam section**, weighted to match the real exam blueprint. Use these for targeted drilling of a single section, or work through all six for a full mock-exam sweep.
>
> **Why a separate folder?** The existing `flashcards/` folder is organised **by topic/source**. This folder is organised **by exam section** so you can drill exactly what the exam tests, in exam order and weight.

---

## Exam Blueprint

| # | Section | Weight | Deck | Cards |
|---|---------|--------|------|-------|
| 1 | Platform Setup & Governance | 13% | [[section-1-platform-setup-governance]] | 39 |
| 2 | Consent | 13% | [[section-2-consent]] | 59 |
| 3 | Data Modeling, Identity Resolution & Segmentation | 25% | [[section-3-data-identity-segmentation]] | 77 |
| 4 | Campaign Design, Flow Orchestration & Content | 30% | [[section-4-campaign-flow-content]] | 127 |
| 5 | Agentforce & AI Innovation | 11% | [[section-5-agentforce-ai]] | 31 |
| 6 | Analytics & Performance Insights | 8% | [[section-6-analytics-insights]] | 27 |
| — | High-Frequency "Gotcha" Facts (cram) | all | [[gotcha-facts-cram-deck]] | 97 |
| | **Total** | **100%** | | **457** |

**Exam facts:** 60 scored questions + up to 5 unscored · 105 minutes · **72%** to pass · Summer '26 release · no prerequisite · no reference materials.

---

## How to Use These Decks

1. **Cover the answer.** Read the **Q**, answer aloud or in writing, *then* reveal the **A**.
2. **Mark your misses.** Anything you get wrong goes on a "revisit" list — re-drill it the next day (spaced repetition).
3. **Weight your time.** Section 4 (30%) + Section 3 (25%) = **55% of the exam**. Spend the most time there.
4. **Drill the ⚠️ cards hardest.** Cards flagged with ⚠️ are the classic exam traps.
5. **Cross-reference.** Each card links back to its `concepts/` page for the full explanation.

---

## Suggested Study Sequence

```mermaid
flowchart LR
    A["Section 1<br/>Setup & Governance<br/>13%"] --> B["Section 2<br/>Consent<br/>13%"]
    B --> C["Section 3<br/>Data, Identity<br/>& Segmentation<br/>25%"]
    C --> D["Section 4<br/>Campaign, Flow<br/>& Content<br/>30%"]
    D --> E["Section 5<br/>Agentforce<br/>& AI<br/>11%"]
    E --> F["Section 6<br/>Analytics<br/>8%"]
```

> **Cramming?** Start with Section 4, then Section 3, then the "Gotcha Facts" deck below.

---

## Masterclass Series Coverage

The official **Marketing Cloud Next Consultant Exam Masterclass** (Elliot Harper, Salesforce — four sessions) added cards across every deck:

| Deck | Masterclass additions |
|------|----------------------|
| Section 1 | Agentforce Marketing portfolio, six configuration steps, Data Cloud Architect, authorized vs authenticated domain, CMS workspaces, common assets, business unit role access |
| Section 2 | Four consent granularity levels, four consent objects, preference page channel rule/limits/releases |
| Section 3 | Data 360 capabilities checklist, CRM integration timeline, Sales Data Kit, actionable list consent gap, contact point resolution, activation templates |
| Section 4 | Flow taxonomy (six types), off-core engine, which flows can't send email, audience flow re-entry, eight data providers, activation+event conflict, content variables, marketing objects |
| Section 5 | Five out-of-the-box agents, Engagement Frequency classifications, Engagement Scoring personas/tiers, STO setup and window |
| Section 6 | Three reporting capabilities, semantic data model, content performance access, deliverability dashboards, Unified Engagement History |
| Gotcha cram | 4 / 6 / 5 / 8 / 4 counts, 90 days, 2 hours–1 week, activation+event, reconciliation vs contact points, off-core, common assets |

---

## Related

- [[exam-revision-summary]] — consolidated revision guide by exam weight
- [[study-roadmap]] — full learning tracks & progress dashboard
- `flashcards/` — topic-based decks (deeper dives per source)