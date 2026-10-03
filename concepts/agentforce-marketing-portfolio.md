# Agentforce Marketing Portfolio

## Core Idea
**Agentforce Marketing is not a product — it's the brand name for Salesforce's whole next-generation marketing portfolio**, and Marketing Cloud Next is just one product inside it (alongside Salesforce Personalization, Marketing Intelligence, and Loyalty Management).

## Prerequisites
- [[marketing-cloud-next-overview]]

## Detailed Explanation

### The Portfolio, Not a Product
A common exam trap is treating "Agentforce Marketing" as a single platform. It isn't. It's the **umbrella brand** for Salesforce's next-generation marketing suite. Each product in the portfolio is the **evolution of an existing Marketing Cloud product**, rebuilt on the modern data and AI foundation.

| Product | What it is | Evolved from |
|---------|-----------|--------------|
| **Marketing Cloud Next** | Next-generation multichannel marketing platform | Marketing Cloud Engagement |
| **Salesforce Personalization** | Next-generation **real-time** personalization platform | Marketing Cloud Personalization |
| **Marketing Intelligence** | **AI-powered analytics** solution | Marketing Cloud Intelligence |
| **Loyalty Management** | Flexible **B2B and B2C loyalty & rewards** programs via a **no-code** interface | (new capability) |

> **Memory hook:** the portfolio is the *brand*; Marketing Cloud Next is the *product*. When a question asks "which product does X?", the answer is almost never "Agentforce Marketing" — it's one of the four products above.

### Where Marketing Cloud Next Sits
Marketing Cloud Next is the **marketing platform** in the portfolio — the thing you configure, build campaigns and flows in, and send messages from. It is the successor to **Marketing Cloud Engagement (MCE)**, but it is **not** the same product: MC Next is Data Cloud-native, while MCE is the legacy platform. See [[marketing-cloud-next-overview]] and [[mce-journeys-campaigns]].

### Editions (Growth vs. Advanced)
Marketing Cloud Next currently offers **two editions**:

- **Growth Edition** — the base capability set.
- **Advanced Edition** — includes **everything in Growth**, plus additional features.

Advanced-only capabilities that recur across the exam include:
- **Account scoring** (people scoring is in both editions)
- **Engagement Scoring** and **Engagement Frequency** (predictive AI)
- **Business Units**
- **Path Experiments**
- **On-Canvas Insights**
- **Custom engagement signals**

> ⚠️ The edition feature list is **not exhaustive** and changes every release — the platform "continues to evolve with new capabilities introduced in each release."

### The Exam Knowledge Check (edition trap)
The masterclass sample question tests exactly this distinction:

> **Q:** Which statement about scoring is correct?
> **A (correct):** Scoring for **individual records** is available in **both** Growth and Advanced; scoring for **account records** is available **only in Advanced**. The predictive AI capabilities **Engagement Scoring** and **Engagement Frequency** are **Advanced only**.

The distractors typically swap "Growth" and "Advanced" or imply account scoring is available in Growth. See [[scoring-models]] and [[ai-features]].

## Common Pitfalls / Misconceptions
⚠️ **Agentforce Marketing ≠ Marketing Cloud Next.** The former is the portfolio brand; the latter is one product in it.
⚠️ **Marketing Cloud Next ≠ Marketing Cloud Engagement.** MC Next is the Data Cloud-native successor, not a rename.
⚠️ **Account scoring is Advanced only** — people scoring is in both editions.
⚠️ **Engagement Scoring / Engagement Frequency are Advanced only.**
⚠️ Don't assume the edition feature list is complete — it grows each release.

## Active Recall Questions
1. Is Agentforce Marketing a product or a portfolio? Name the four products in it.
2. Which legacy product does Marketing Cloud Next evolve from?
3. Which scoring type is Advanced-only, and which is available in both editions?
4. Name three Advanced-only capabilities besides account scoring.
5. Which product in the portfolio handles loyalty programs, and what interface does it use?

## Related Concepts
- [[marketing-cloud-next-overview]]
- [[scoring-models]]
- [[ai-features]]
- [[mce-journeys-campaigns]]
- [[reporting-metrics-dashboards]]

## Source References
- `sources/MCNext_Consultant_Exam_Masterclass_Session1.txt` — Elliot Harper, "Marketing Cloud Next Consultant Exam Masterclass" Session 1 (Salesforce, Summer '26)
