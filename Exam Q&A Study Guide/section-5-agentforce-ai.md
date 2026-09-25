# Q&A Study Guide — Section 5: Agentforce & AI Innovation (11%)

> **Exam weight: 11%.** Scenario-driven questions with full reasoning. Cover the **Answer** and **Why** until you've committed to your own answer.
> **Related concept pages:** [[ai-features]] · [[agentic-marketing]] · [[conversational-marketing]] · [[einstein-segments]] · [[scoring-models]]

---

## Q1 — Marketing Agents

**Question:** A marketer wants to turn a written campaign brief into a campaign with a flow and multichannel content. Which agent should the consultant recommend?

**Answer:** **The Campaign Creation agent — it drafts a brief, creates a campaign from a brief, summarizes, and generates insights.**

**Why:** The Campaign Creation agent is purpose-built for the brief-to-campaign workflow. The Content Builder agent handles content drafting and section creation, which is a narrower scope. Matching the agent to the *task* is the tested skill.

> ⚠️ **Distractor logic:** "The Content Builder agent" is the plausible-but-wrong answer — it handles content, not campaign structure.

---

## Q2 — Einstein Segments

**Question:** A client wants to create segments using natural language. What prerequisite must be met?

**Answer:** **A Unified Individual DMO with at least 10 records.**

**Why:** Einstein Segments requires the Unified Individual DMO to exist with **≥10 records** — the threshold ensures there is enough data for the model to work with. Without identity resolution producing a Unified Individual, the feature cannot function.

> ⚠️ **Distractor logic:** "Any DMO with data" is the plausible-but-wrong answer — the requirement is specifically the Unified Individual DMO.

---

## Q3 — Einstein Data Prism

**Question:** A consultant is configuring Einstein Segments and needs to validate which metadata the model can use. Which tool should they use?

**Answer:** **Metadata Studio — it validates and excludes metadata. Einstein Data Prism is the grounding layer that scans metadata, auto-generates descriptions, and uses a vector database.**

**Why:** The two components have distinct roles: Data Prism does the grounding, Metadata Studio provides the validation/exclusion control. Note the platform restriction: Einstein Data Prism is **not supported in Gov Cloud Plus**.

> ⚠️ **Distractor logic:** "Einstein Data Prism" is the plausible-but-wrong answer — it's the right feature family but the wrong component for validation.

---

## Q4 — Einstein Segment Filtering

**Question:** A client notices that Einstein Segments excluded several attributes they expected to use. Why?

**Answer:** **Einstein Segments strips demographic attributes and attributes that would return fewer than 10 results.**

**Why:** Both filters exist to protect model quality and privacy. The "<10 results" rule prevents statistically meaningless segments, and the demographic exclusion is a fairness/privacy measure. Knowing these filters explains why a natural-language segment may not use every available field.

---

## Q5 — Channel vs Agent

**Question:** A consultant is explaining conversational messaging architecture. What is the difference between a channel and an agent?

**Answer:** **Channel = pipe (delivery); Agent = brain (LLM + Data 360).**

**Why:** The metaphor is the memory hook. The channel handles message transport; the agent handles reasoning and data access. This distinction matters because troubleshooting differs — a delivery failure is a channel issue, a wrong answer is an agent issue.

---

## Q6 — Conversational Ecosystem

**Question:** What four components make up the conversational messaging ecosystem?

**Answer:** **Channel + Flow + Agent + Data 360.**

**Why:** All four are required for a working conversational experience. The **Flow** component is often overlooked — it orchestrates the interaction, while the agent reasons and Data 360 supplies context. Recognising the flow's role helps when diagnosing why a conversation stalls.

---

## Q7 — Subagents vs Actions

**Question:** A consultant needs to define what a conversational agent is allowed to do versus what tools it can use. How should they model this?

**Answer:** **Subagents = job description (boundaries); Actions = tools (get info / update records).**

**Why:** The separation is architectural: subagents scope *responsibility*, actions provide *capability*. This matters for governance — you constrain an agent's remit with subagents and control its reach with actions.

> ⚠️ **Distractor logic:** "Actions define boundaries" is the plausible-but-wrong answer — it inverts the two concepts.

---

## Q8 — Conversational Lifecycle

**Question:** What are the four stages of the conversational lifecycle?

**Answer:** **Trigger → Routing/intent → Execution → Handoff/resolution.**

**Why:** The sequence is memorised. The **Handoff/resolution** stage is the one most often forgotten — it covers escalation to a human, which links to the Einstein Trust Layer's human escalation principle.

---

## Q9 — Conversational KPIs

**Question:** A client wants to measure the success of their conversational agent. Which KPIs should the consultant recommend?

**Answer:** **Deflection, engagement, and conversion.**

**Why:** The three KPIs measure different things: deflection (issues resolved without a human), engagement (interaction quality), and conversion (business outcome). Together they cover efficiency, experience, and results.

---

## Q10 — Predictive AI Edition Gates

**Question:** A client on the Growth tier wants to use Engagement Scoring. Is this possible?

**Answer:** **No — Engagement Scoring is Advanced only. STO is Growth (global model) / Advanced; Metrics Guard is Growth + Advanced; Engagement Frequency is Advanced only.**

**Why:** The edition matrix is one of the most frequently tested tables in the section. Note that **Metrics Guard** is the only feature available on both tiers alongside STO, while Engagement Scoring and Engagement Frequency are Advanced-only. The roadmap flags this as a thin spot worth reinforcing.

> ⚠️ **Distractor logic:** "Yes, with an add-on" is the plausible-but-wrong answer — the gate is the tier, not a purchasable add-on.

---

## Q11 — Metrics Guard Score

**Question:** A client sees a Metrics Guard score of 0.2 on a send and assumes it performed poorly. What should the consultant explain?

**Answer:** **The Metrics Guard score is counterintuitive — lower means more likely real (less likely to be a bot).**

**Why:** Metrics Guard filters bot traffic, so a low score indicates genuine human engagement. This inversion is a favourite exam trap because the natural reading of "low score" is "poor performance". The correct interpretation is the opposite.

> ⚠️ **Distractor logic:** "A low score means low engagement quality" is the plausible-but-wrong answer — it applies the intuitive reading, which is backwards.

---

## Q12 — Predictive AI Prerequisite

**Question:** A consultant is enabling Send Time Optimization, Engagement Scoring, and Engagement Frequency. What shared prerequisite must be in place?

**Answer:** **An identity resolution ruleset with Individual as the primary object.**

**Why:** All three features depend on resolved individual profiles. Without identity resolution producing a Unified Individual, there is no stable subject for the model to score or optimise. This links directly to Section 3's identity resolution content.

> ⚠️ **Distractor logic:** "A data graph with engagement fields" is the plausible-but-wrong answer — it names a related but insufficient prerequisite.

---

## Q13 — Scoring Models

**Question:** A client wants to score both individuals and accounts. What should the consultant explain about scoring models and editions?

**Answer:** **The three scoring models are Engagement, Fit, and Overall, scored 0–100. Account scoring is Advanced only.**

**Why:** The 0–100 range and the three model types are memorised facts. The account-scoring edition gate is the constraint to check — a client on Growth can score individuals but not accounts.

---

## Q14 — Scoring Frequency Cost

**Question:** A client wants to increase scoring frequency to daily. What is the cost implication?

**Answer:** **More frequent scoring consumes more credits.**

**Why:** Scoring is a metered operation, so frequency directly drives cost. This is a design trade-off: fresher scores cost more. The practical advice is to align scoring frequency with how quickly the business actually acts on score changes.

---

## Q15 — Einstein Trust Layer

**Question:** A client's legal team asks how Salesforce prevents AI hallucination and protects sensitive data. Which framework should the consultant describe?

**Answer:** **The Einstein Trust Layer — toxicity detection, dynamic grounding (anti-hallucination), PII masking, zero data retention, encryption, audit trail, and human escalation.**

**Why:** The seven components address different concerns: **dynamic grounding** prevents hallucination by grounding responses in real data, **PII masking** and **zero data retention** address privacy, and **human escalation** provides a safety net. Knowing which component addresses which concern is the tested skill.

> ⚠️ **Distractor logic:** "The model is fine-tuned to avoid hallucination" is the plausible-but-wrong answer — the mechanism is *grounding*, not fine-tuning.

---

## Q16 — Dynamic Grounding

**Question:** What does dynamic grounding do in the Einstein Trust Layer?

**Answer:** **It grounds AI responses in real data to prevent hallucination.**

**Why:** Grounding is the anti-hallucination mechanism — the model retrieves and cites real data rather than generating plausible-sounding content. This is why the Trust Layer is described as a *framework* rather than a single feature.

---

## Q17 — Zero Data Retention

**Question:** A client asks whether their prompts are stored by the LLM provider. What should the consultant explain?

**Answer:** **Zero data retention means prompts and responses are not retained by the LLM provider.**

**Why:** This is a privacy guarantee that matters for regulated industries. It complements PII masking — masking removes sensitive data before it reaches the model, and zero retention ensures nothing persists afterwards.

---

## Q18 — Agentic Marketing Waves

**Question:** A consultant is explaining the evolution of marketing automation. What are the three waves?

**Answer:** **Automation → Real-Time → Agentic.**

**Why:** The progression describes increasing autonomy: rule-based automation, then real-time responsiveness, then agents that execute on a stated strategy. The framing matters because it positions agentic marketing as the current frontier rather than a replacement for earlier approaches.

---

## Q19 — Agentic Marketing Definition

**Question:** What is the defining characteristic of agentic marketing?

**Answer:** **The marketer states the strategy and AI agents execute it.**

**Why:** The shift is from *configuring* automation to *delegating* execution. This is the conceptual anchor for the whole section — it explains why agents, subagents, and actions exist as governance mechanisms.

---

## Q20 — AI Campaign Insights Scope

**Question:** A client runs Generate Campaign Insights on a campaign with three flows. Which flow is analysed?

**Answer:** **The first flow.**

**Why:** The scope limitation is a memorised detail. It matters because a client expecting analysis of the whole campaign may misread the output as incomplete — the tool is working as designed.

---

## Related

- [[exam-revision-summary]] — Section 5 summary
- [[section-4-campaign-flow-content]] — previous guide
- [[section-6-analytics-insights]] — next guide
- `Exam Section Based Flashcards/section-5-agentforce-ai` — recall drilling