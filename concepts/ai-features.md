# AI Features (Einstein & Agentforce)

## Core Idea
Marketing Cloud Next ships with generative AI (Agentforce) and predictive AI (Einstein) features that draft campaigns, optimize send times, filter bot clicks, and score engagement — all protected by the Einstein Trust Layer.

## Prerequisites
- [[marketing-cloud-next-overview]]
- [[scoring-models]]
- [[identity-resolution-rulesets]]

## Detailed Explanation

### Setup AI (Agentforce)
1. Set up **Salesforce Foundations** (required for agent templates)
2. Set up **Einstein Generative AI** (and Agentforce Employee Agent)
3. Enable Agentforce Employee Agent + user permissions
4. Enable Marketing Cloud features (Setup → "Einstein & Agentforce")

### Agentforce Agents & Standard Actions

| Agent | Standard Actions |
|-------|-----------------|
| **Campaign Creation** | Draft Campaign Brief, Refine Campaign Preview, Save Campaign Brief, Create Campaign from Brief, Save Campaign, Identify Record by Name, Summarize Campaign, Generate Campaign Insights, Identify Business Unit |
| **Content Builder** | Draft Content, Create Section with Content, Create Section |
| **Journey Decisioning** (Engagement+) | Select Journey, Create Journey Content |

### Einstein Predictive AI Features

| Feature | What it does | Edition |
|---------|-------------|---------|
| **Send Time Optimization (STO)** | Sends email at optimal time per recipient | Growth (global model required) / Advanced |
| **Metrics Guard** | Filters bot/non-human clicks & opens | Growth + Advanced |
| **Engagement Scoring** | Contact-level engagement scores | Advanced only |
| **Engagement Frequency** | Determines optimal contact frequency | Advanced only |

### Key Setup Notes
- **STO / Scoring / Frequency** all require an identity resolution ruleset with **Individual** as primary DMO (must be one of first two rulesets).
- **STO:** Setup → "Send Time" → Einstein Send Time Optimization with Global Models → Enable. Analyzes past 90 days.
- **Metrics Guard:** Setup → "Messaging" → Email Feature Settings → turn on. Score 0–100% (lower = more likely real).
- **Engagement Scoring:** Setup → "Scoring" → Einstein Engagement Scoring.
- **Engagement Frequency:** Setup → "Frequency" → Einstein Engagement Frequency.

### Einstein Data Usage
- **Agentforce agents** use generative AI models (Yes Generative AI, No global model)
- **STO** and **Metrics Guard** use global models (required in Growth edition)
- **Engagement Scoring/Frequency** (Advanced) use neither generative AI nor global models

### Einstein Trust Layer (AI Security Architecture)
All agentic/conversational AI is protected by the **Einstein Trust Layer**, a secure architecture built natively into the platform:

| Mechanism | What it does |
|-----------|--------------|
| **Custom guardrails** | Brand guidelines, FAQs, tone-of-voice ground the agent and keep it on-script |
| **Toxicity detection** | Blocks hateful/abusive/profane content and deflects prompt-injection attempts |
| **Dynamic grounding** | Answers are grounded in your Data 360 (not the public internet); prevents hallucinations |
| **Subagent/action fences** | Defines what the agent may discuss; off-limits topics politely deflected |
| **Data masking** | Detects PII (credit cards, phones, addresses) and replaces with placeholders before sending to the LLM; unmasks on response |
| **Zero data retention** | LLM providers don't retain prompts/data/responses; your data never trains outside models |
| **Encryption** | In transit (TLS) and at rest (Data 360 logs/profiles) |
| **Audit trail** | Logs every interaction (masked data, toxicity scores, grounding data) for compliance |
| **Human-in-the-loop / escalation** | Auto-escalate frustrated or complex conversations to a live rep |

## Common Pitfalls / Misconceptions
⚠️ Einstein Engagement Scoring and Engagement Frequency are **Advanced edition only**.
⚠️ STO requires the identity resolution ruleset with Individual as primary DMO, and it must be in the **first two rulesets**.
⚠️ Metrics Guard score is counterintuitive: **lower = more likely real** (higher = machine-generated).
⚠️ Disabling STO doesn't remove it from existing sends (only new messages).

## Active Recall Questions
1. Which three Einstein features are Advanced edition only?
2. What does a low Metrics Guard score mean?
3. What prerequisite do STO, Engagement Scoring, and Frequency share?
4. Name three standard actions of the Campaign Creation agent.

## Related Concepts
- [[scoring-models]]
- [[identity-resolution-rulesets]]
- [[agentic-marketing]]
- [[conversational-marketing]]
- [[repeaters-and-recommenders]]

## Source References
- `sources/mktg_implementation_guide.pdf` — "Enable AI Features in Marketing Cloud Next", "Model Cards"
- `sources/Salesforce_Trails.txt` — "Secure Agents with the Einstein Trust Layer"