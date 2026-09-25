# Flashcards — Section 5: Agentforce & AI Innovation (11%)

> **Exam weight: 11%.** Covers marketing agents, conversational messaging, predictive AI features, and the Einstein Trust Layer.
> **Related concept pages:** [[ai-features]] · [[agentic-marketing]] · [[conversational-marketing]] · [[einstein-segments]] · [[scoring-models]]

---

## Marketing Agents

## Card: Campaign Creation Agent
**Q:** What can the Campaign Creation agent do?
**A:** Draft a brief, create a campaign from a brief, summarize, and generate insights.

## Card: Content Builder Agent
**Q:** What can the Content Builder agent do?
**A:** Draft content and create sections.

## Card: Einstein Segments
**Q:** What does Einstein Segments do and what does it require?
**A:** Turns natural language into a segment; requires a **Unified Individual DMO with ≥10 records**.

## Card: Einstein Data Prism
**Q:** What is Einstein Data Prism?
**A:** The grounding layer for Einstein segments — it scans metadata, auto-generates descriptions, and uses a vector database. Validate/exclude via **Metadata Studio**. ⚠️ Not supported in Gov Cloud Plus.

## Card: Einstein Segment Attribute Filtering
**Q:** What does Einstein Segments strip out when generating a segment?
**A:** Demographic attributes and attributes that would return **< 10 results**.

---

## Conversational Messaging

## Card: Channel vs Agent
**Q:** What is the difference between a channel and an agent in conversational messaging?
**A:** **Channel = pipe** (delivery); **Agent = brain** (LLM + Data 360).

## Card: Conversational Ecosystem
**Q:** What four components make up the conversational ecosystem?
**A:** **Channel + Flow + Agent + Data 360**.

## Card: Subagents vs Actions
**Q:** What is the difference between subagents and actions?
**A:** **Subagents** = job description (boundaries); **Actions** = tools (get info / update records).

## Card: Conversational Lifecycle
**Q:** What are the four stages of the conversational lifecycle?
**A:** Trigger → Routing/intent → Execution → Handoff/resolution.

## Card: Conversational KPIs
**Q:** What are the key conversational KPIs?
**A:** Deflection, engagement, and conversion.

---

## Predictive AI Features

## Card: Predictive AI by Edition
**Q:** Which edition is required for each predictive AI feature?
**A:** **Send Time Optimization (STO)** = Growth (global model) / Advanced · **Metrics Guard** = Growth + Advanced · **Engagement Scoring** = Advanced only · **Engagement Frequency** = Advanced only.

## Card: Metrics Guard Score
**Q:** ⚠️ What is counterintuitive about the Metrics Guard score?
**A:** **Lower = more likely real** (a lower score means a lower likelihood of being a bot).

## Card: Predictive AI Prerequisite
**Q:** What prerequisite do STO, Engagement Scoring, and Engagement Frequency share?
**A:** An identity resolution ruleset with **Individual** as the primary object.

## Card: Scoring Model Types
**Q:** What are the three scoring model types and their range?
**A:** **Engagement**, **Fit**, and **Overall** — scored **0–100**. Account scoring is **Advanced only**.

## Card: Scoring Frequency Cost
**Q:** How does scoring frequency affect cost?
**A:** More frequent scoring = **more credits** consumed.

---

## Einstein Trust Layer

## Card: Einstein Trust Layer Components
**Q:** Name the components of the Einstein Trust Layer.
**A:** Toxicity detection · dynamic grounding (anti-hallucination) · PII masking · zero data retention · encryption · audit trail · human escalation.

## Card: Dynamic Grounding
**Q:** What does dynamic grounding do?
**A:** It grounds AI responses in real data to prevent hallucination.

## Card: Zero Data Retention
**Q:** What does zero data retention mean in the Trust Layer?
**A:** Prompts and responses are **not retained** by the LLM provider.

---

## Related

- [[exam-revision-summary]] — Section 5 summary
- [[section-4-campaign-flow-content]] — previous deck
- [[section-6-analytics-insights]] — next deck
- `flashcards/agentic-conversational-data-email` — topic-based deep dive