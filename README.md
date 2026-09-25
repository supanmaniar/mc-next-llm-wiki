# Marketing Cloud Next — LLM Wiki

> A structured, cross-linked knowledge base for **Salesforce Marketing Cloud Next**, built to be read by humans *and* ingested by LLMs.

[![License: CC BY 4.0](https://img.shields.io/badge/License-CC%20BY%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by/4.0/)
[![Obsidian](https://img.shields.io/badge/Obsidian-vault-7C3AED.svg)](https://obsidian.md)
[![Pages](https://img.shields.io/badge/concept%20pages-70-blue.svg)](#whats-inside)
[![Questions](https://img.shields.io/badge/practice%20questions-292-green.svg)](#whats-inside)

---

## What This Is

This repo is a **learning vault** for the **Salesforce Certified Marketing Cloud Next Consultant** exam (Summer '26 release) and the Marketing Cloud Next implementation guide.

It is not a dump of documentation. Every page is **synthesized for learning**: each one states a core idea in one sentence, lists its prerequisites, explains the mechanism, flags the common misconceptions, and ends with active-recall questions. Pages are cross-linked with `[[wiki links]]` so you can traverse the knowledge graph in Obsidian, or let an LLM follow the links for you.

**Two ways to use it:**

| You are… | Start here |
|---|---|
| 🧑‍🎓 **Studying for the exam** | [`_index/study-roadmap.md`](_index/study-roadmap.md) — 10 sequential tracks, basic → advanced |
| ⏰ **Cramming** | [`_index/exam-revision-summary.md`](_index/exam-revision-summary.md) — organized by exam weight |
| 🤖 **An LLM / RAG pipeline** | [`llms.txt`](llms.txt) — a machine-readable index of the whole vault |
| 🛠️ **A consultant** | [`concepts/`](concepts/) — 70 reference pages on how MC Next actually works |

---

## What's Inside

```
mc-next-llm-wiki/
├── concepts/                        # 70 atomic concept pages (the core of the vault)
├── flashcards/                      # 11 topic-organized recall decks
├── Exam Q&A Study Guide/            # 292 scenario questions with reasoning
├── Exam Section Based Flashcards/   # 8 decks organized by exam section + cram deck
├── _index/                          # Study roadmap & exam revision summary
├── _templates/                      # Page template for adding new concepts
├── _scripts/                        # PDF generator
└── llms.txt                         # Machine-readable index for LLM ingestion
```

| Folder | Pages | What it's for |
|---|---:|---|
| [`concepts/`](concepts/) | 70 | Deep conceptual explanations with prerequisites, pitfalls, and recall questions |
| [`flashcards/`](flashcards/) | 11 | Fast recall drilling, organized by topic/source |
| [`Exam Q&A Study Guide/`](Exam%20Q%26A%20Study%20Guide/) | 7 | Scenario questions in Salesforce's exam house style — **Question / Answer / Why** |
| [`Exam Section Based Flashcards/`](Exam%20Section%20Based%20Flashcards/) | 9 | Recall decks weighted to match the real exam blueprint |
| [`_index/`](_index/) | 2 | The roadmap and the revision summary |

### Exam blueprint coverage

| # | Section | Weight | Coverage |
|---|---|---:|---|
| 1 | Platform Setup & Governance | 13% | ✅ Full |
| 2 | Consent | 13% | ✅ Full |
| 3 | Data Modeling, Identity Resolution & Segmentation | 25% | ✅ Full |
| 4 | Campaign Design, Flow Orchestration & Content | 30% | ✅ Full |
| 5 | Agentforce & AI Innovation | 11% | ✅ Full |
| 6 | Analytics & Performance Insights | 8% | ✅ Full |

> **Exam facts:** 60 scored questions + up to 5 unscored · 105 minutes · **72%** to pass · Summer '26 release · no prerequisite · no reference materials allowed.

---

## Quick Start

### Option 1 — Read it on GitHub

Just browse. GitHub renders the Markdown, though `[[wiki links]]` won't be clickable. Start with [`_index/study-roadmap.md`](_index/study-roadmap.md).

### Option 2 — Open it as an Obsidian vault (recommended)

```bash
git clone https://github.com/supanmaniar/mc-next-llm-wiki.git
```

Then in Obsidian: **Open folder as vault** → select the cloned folder. The `[[wiki links]]` become clickable, and the graph view shows how concepts connect.

### Option 3 — Feed it to an LLM

Point your tool at [`llms.txt`](llms.txt) for a structured index, or ingest the `concepts/` folder directly. Each page is self-contained and front-loads its core idea, which makes it well-suited to chunked retrieval.

### Option 4 — Generate a PDF study guide

```bash
pip install -r _scripts/requirements.txt
python _scripts/generate_pdf.py
```

---

## How the Vault Is Organized

The vault follows a deliberate pedagogical structure. If you're adding to it, keep to these conventions:

- **`concepts/`** — one page per concept. Every page has: **Core Idea** (one sentence), **Prerequisites** (`[[links]]` to what you must know first), **Detailed Explanation**, **Common Pitfalls** (⚠️), **Active Recall Questions**, **Related Concepts**, and **Source References**.
- **`flashcards/`** — organized by topic/source, for drilling.
- **`Exam Section Based Flashcards/`** — organized by exam section, for targeted practice.
- **`Exam Q&A Study Guide/`** — scenario questions with full reasoning, including why the distractors are wrong.
- **`_index/`** — the entry points. The roadmap defines the learning order; the revision summary is organized by exam weight.
- **`_templates/`** — copy `wiki-page.md` when creating a new concept page.

**Conventions:**
- Cross-link aggressively with `[[wiki links]]` — the graph is the value.
- Flag contradictions and traps with ⚠️.
- Never present an advanced topic without linking to its prerequisites.

See [`CONTRIBUTING.md`](CONTRIBUTING.md) for the full guide.

---

## Why "LLM Wiki"?

Most study material is either too shallow (bullet lists of facts) or too raw (pasted documentation). This vault is built on a different premise: **knowledge should be synthesized for learning, not just archived.**

That means every page is written to answer *"what is the mental model here, and what do people get wrong?"* — which happens to be exactly the shape that makes content useful to a language model. The pages are atomic, self-contained, explicitly linked, and front-load their thesis. That's good pedagogy *and* good retrieval.

---

## Contributing

Corrections, new concept pages, and additional practice questions are welcome. See [`CONTRIBUTING.md`](CONTRIBUTING.md).

If you spot something that's wrong or out of date with a newer Salesforce release, please [open an issue](https://github.com/supanmaniar/mc-next-llm-wiki/issues).

---

## Disclaimer

This is an **independent, unofficial** study resource. It is not affiliated with, endorsed by, or sponsored by Salesforce, Inc.

Salesforce, Marketing Cloud, Data Cloud, Agentforce, and Einstein are trademarks of Salesforce, Inc. All product behavior described here reflects the Summer '26 / Spring '26 releases and may change. **Always verify against official Salesforce documentation before making implementation decisions.**

The content here is original synthesis and study material. Raw vendor documentation is deliberately **not** redistributed in this repository.

---

## License

Content is licensed under [**Creative Commons Attribution 4.0 International (CC BY 4.0)**](LICENSE) — you may share and adapt it, including commercially, as long as you give appropriate credit.

---

## Acknowledgements

Built as an Obsidian vault, structured for LLM ingestion, and organized around the official Salesforce Marketing Cloud Next Consultant exam blueprint.
