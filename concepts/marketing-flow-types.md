# Marketing Flow Types (Complete Taxonomy)

## Core Idea
In Marketing Cloud Next, **all outbound messaging is orchestrated through Flow** — a major shift from Marketing Cloud Engagement, where messages could be sent from journeys, automations, triggered sends, UI sends, and more. These **marketing flows** (also called **high-scale flows**) run **off-core** on a separate high-scale processing engine.

## Prerequisites
- [[campaigns-and-flows]]
- [[flow-builder-elements]]
- [[data-architecture-layers]]

## Detailed Explanation

### Flow Is the Orchestration Engine
In **Marketing Cloud Engagement**, messages could be sent from a variety of tools and execution contexts: journeys, automations, triggered sends, UI-based sends, Salesforce sends, Content Builder sends, and more.

In **Marketing Cloud Next**, **Flow becomes the single orchestration engine for outbound engagement**. These are called **marketing flows** or **high-scale flows**.

### High-Scale Flows vs. Core Flows
Marketing flows are **fundamentally different** from the core flows many Salesforce admins know:

| | Core Flows | Marketing (High-Scale) Flows |
|-|-----------|------------------------------|
| **Engine** | Core Salesforce transactional runtime | Separate **high-scale processing engine** |
| **Execution** | On-core | **Off-core** (outside the core transactional runtime) |
| **Governor limits** | Apply | Traditional concerns **don't apply the same way** |
| **Transaction management / scaling patterns** | Apply | Don't apply the same way |

> **Memory hook:** marketing flows run **off-core**, so the governor-limit and transaction-scaling worries that dominate core Flow design simply don't apply in the same way.

### The Complete Flow Type Taxonomy

| Flow type | Trigger | Key characteristics |
|-----------|---------|---------------------|
| **Audience flow** (segment / list / CRM record / campaign member) | Schedule or immediate | **Summer '26** — unifies previously separate flow types into one experience; choose the audience source in flow config |
| **Activation-triggered flow** | A Data 360 activation publishes | **Winter '26** — uses the **Data 360 activation target type**; activation can be the **personalization source** |
| **Automation event-triggered flow** (event-triggered) | A predefined event occurs | Engagement events (opens, clicks, form submissions — no extra config), **engagement signals**, or **CRM record-triggered events** |
| **On-demand flow** | REST API call | Targets an **individual**; real-time personalization via **Apex-defined schema** in the payload; ~**1–3 seconds** latency |
| **Broadcast flow** | REST API call | Targets **all members of a dynamic segment**; fan-out; sync or async |
| **Data Cloud-triggered flow** | A DMO (or Calculated Insight object) record is created/updated | ⚠️ **Not technically a marketing flow** but still a high-scale flow type; most commonly used for **consent automation** |

### Audience Flows (Summer '26)
Audience flows **unify several previously separate flow types** into a single, simplified orchestration experience, covering:
- **Segments**
- **Actionable lists**
- **CRM records**
- **Campaign members**

Rather than selecting different flow types for different audience models, marketers create **one audience flow** and choose the **audience source directly in the flow configuration**. A key addition is support for **list-triggered flows**. See [[audience-flows]].

### Activation-Triggered Flows (Winter '26)
Designed to work with Data 360 activations using the **Data 360 activation target type**. Conceptually similar to segment-based flows, but with important differences when creating the activation:
- Add **filters to activation membership**
- Add **contact point filters**
- **Limit audience size** based on attributes
- **Append additional attributes from related objects** associated with a segment member

**Why this matters:** messages can use the **activation directly as the personalization source**, so email merge fields and repeaters can reference **enriched Data 360 activation attributes** without additional lookups at send time. See [[activation-triggered-flows]].

### Automation Event-Triggered Flows
Unlike segment-triggered flows (scheduled batch), these launch **automatically when a predefined event occurs**. Event sources:
1. **Standard engagement events** — email opens, clicks, form submissions (**no additional configuration required**)
2. **Engagement signals** — define your own customer engagement events (website interactions, PDF downloads, other tracked activities)
3. **CRM record-triggered events** (**Spring '26**) — fire when a **prospect, lead, contact, or any related object** record is created or updated

### On-Demand Flows
Allow external systems to trigger **transactional messaging instantly** through the **REST API**. Real-time personalization data can be passed **directly in the API payload** using an **Apex-defined data schema** — meaning there's **no requirement to first ingest or hydrate data into Data Cloud**.

- Unlocks flexible transactional architectures: developers define custom personalization schemas and surface data from virtually any source system.
- **Typical latency: ~1–3 seconds.**
- Ideal for **one-time passcodes, order confirmations, password resets, real-time service alerts**.

### Broadcast Flows
Designed for **fan-out processing** — a single event triggers communication to a **large group of recipients simultaneously** (e.g., a power outage → SMS to everyone in that area).

- Triggered via **REST API** (like on-demand).
- **Key difference:** on-demand targets an **individual**; broadcast targets **all members of a segment**.
- The segment **must use the dynamic segment type** — evaluated at **execution time** using variables passed into the flow, allowing highly contextual audience resolution.
- Common use cases: **airline flight delay notifications, utility outage alerts, emergency notifications**.

### Data Cloud-Triggered Flows
Execute whenever a record within a **Data Cloud DMO** (or **Calculated Insight object**) is created or updated.

- Under the hood, Data 360 **monitors the specified DMO** for changes; when a matching change occurs, a **data action publishes a platform event** which triggers the flow.
- ⚠️ **Technically not a marketing flow**, but still considered a high-scale flow type.
- Most commonly used to **automate consent management** based on DMO/CIO record changes, using the **Create Consent** flow action — which updates the **Communication Subscription DMO** and the **consent cache layer** to maintain real-time consent consistency. See [[consent-write-paths]] and [[consent-cache]].

### ⚠️ Which Flows Can Send Email?
The session's final quiz tests this directly:

> **Record-triggered flows are CRM flows and can't be used to send emails from Marketing Cloud Next.**
> **Data Cloud-triggered (Data 360-triggered) flows also can't be used to send emails from Marketing Cloud Next.**

So although both are high-scale flow types, **neither sends marketing email** — data cloud-triggered flows are for data/consent automation, and record-triggered flows are CRM flows.

## Common Pitfalls / Misconceptions
⚠️ **All outbound messaging goes through Flow** in MC Next — unlike MCE's many send contexts.
⚠️ Marketing flows run **off-core** — governor limits and transaction-scaling concerns don't apply the same way.
⚠️ **Record-triggered flows and Data Cloud-triggered flows cannot send emails** from MC Next.
⚠️ **Broadcast flows require dynamic segments**; on-demand flows target an individual.
⚠️ **Data Cloud-triggered flows aren't technically marketing flows** (but are high-scale flow types).
⚠️ On-demand flows need **no Data Cloud ingestion** — personalization comes from the API payload via an Apex schema.
⚠️ Audience flows unify segment/list/CRM record/campaign member sources — don't look for separate flow types.

## Active Recall Questions
1. What is the single orchestration engine for outbound messaging in MC Next?
2. What does "off-core" mean for marketing flows, and what does it change?
3. Name the six flow types and their triggers.
4. Which flow types can send email from MC Next, and which two cannot?
5. What is the key difference between an on-demand flow and a broadcast flow?
6. What segment type must a broadcast flow use, and when is it evaluated?
7. What is the most common use of a Data Cloud-triggered flow?
8. What can an activation-triggered flow use as its personalization source?

## Related Concepts
- [[campaigns-and-flows]]
- [[audience-flows]]
- [[activation-triggered-flows]]
- [[rest-api-flow-integration]]
- [[marketing-triggers]]
- [[flow-builder-elements]]
- [[consent-write-paths]]
- [[data360-segment-types]]

## Source References
- `sources/MCNext_Consultant_Exam_Masterclass_Session2.txt` — Elliot Harper, "Marketing Cloud Next Consultant Exam Masterclass" Session 2 (Salesforce, Summer '26)
- `sources/Campaigns_Flows_Deep_Dive.txt` — "Comparison of Marketing-Oriented Flow Types"
