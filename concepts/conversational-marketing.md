# Conversational Marketing (Agentforce)

## Core Idea
Conversational marketing shifts channels from one-way "broadcast" (do-not-reply) to two-way conversation, using Agentforce AI agents to understand intent, retrieve context, and respond to customers across SMS, email, and WhatsApp.

## Prerequisites
- [[agentic-marketing]]
- [[ai-features]]
- [[channels-overview]]

## Detailed Explanation

### The Engagement Gap (Broadcast vs. Conversational)
For two decades, digital marketing operated on a **broadcast model**: pushing millions of emails, SMS blasts, and push notifications. It *talks at* customers, not *with* them.

The failure mode is the "do-not-reply" impasse: a customer replies to a promo with a question, receives "This is an automated message. Replies are not monitored," and the engagement dies.

The **conversational (two-way) model** treats brand and customer as both senders and receivers, proactively solving problems, recommending products, and assisting based on real-time context.

### How Agents Differ from Chatbots
A basic chatbot follows a rigid decision tree ("if X, then Y"). An **Agentforce agent** uses **large language models (LLMs)** plus your business data to understand natural language, check rules, and respond contextually.

There are no separate agents to manage — Marketing Cloud Next uses Agentforce directly. You create new agents or reuse existing ones.

### Channel vs. Agent (the "Pipe" vs. the "Brain")
These are **distinct components** that work together:
- **Channel** = the *pipe*: delivers the message and receives the reply (SMS, WhatsApp, email).
- **Agent** = the *brain*: routed the reply, uses LLMs + Data 360 to analyze text.

This separation means you build **one agent** (with subagents/instructions) and deploy it across **multiple channels** without rebuilding logic.

### Supported Channels
| Channel | Conversational role |
|---------|---------------------|
| **SMS** | Thread becomes a service window; reply to alerts/reminders like texting a friend |
| **Email** | Transforms one-way blasts into threaded two-way conversations; good for long-form content, receipts, digests |
| **WhatsApp** | Rich media channel (longer messages, images, button interactions); ideal for global markets |

**Edition note:** Email is included in both Growth and Advanced editions; SMS and WhatsApp are paid add-ons in both.

### The Conversational Ecosystem (Four Components)
1. **Channel (interface)** — entry point; SMS/WhatsApp/email.
2. **Flow (traffic controller)** — gatekeeper that decides *when* a conversation starts (e.g., trigger an outbound SMS when a loyalty tier changes), then hands control to the agent on reply.
3. **Agent (intelligence)** — powered by Agentforce; reasons, holds brand persona, follows instructions.
4. **Data 360 (memory)** — unified customer profile lets the agent reference specifics ("I see you bought the red sweater last week") instead of generic questions.

### Defining Behavior: Subagents & Actions
- **Subagents** = the *job description*: boundaries of what the agent may discuss (e.g., Order Status, Product Recommendations, Returns). Provide **guardrails** — off-limits topics get politely deflected back to approved subjects.
- **Actions** = the *tools*: capabilities to actually do things in systems. Two types:
  - **Get Information** — query a system (e.g., `Get_Tracking_Status`).
  - **Update Records** — write back to Salesforce (e.g., `Update_Email_Preference`, `Create_Lead`).
  - Without actions an agent can only talk; with them it becomes a service rep that resolves issues unaided.

### Lifecycle of a Conversation (4 Stages)
1. **Trigger** — a flow sends an outbound message (email/SMS/WhatsApp).
2. **Routing & Engagement** — customer replies; flow detects the reply and routes the session to the agent, which identifies intent.
3. **Execution** — agent checks Data 360, uses an action to retrieve/update data, generates a response.
4. **Handoff or Resolution** — agent either completes the task, or detects sentiment (frustration) and **hands off** the conversation with full transcript to a human service rep in Agentforce Service.

### Business Outcomes
Pipeline generation, upsell/cross-sell, customer retention, conversion, operational efficiency (offload repetitive high-volume inquiries).

### Measuring Success (KPIs)
| Metric | What it measures |
|--------|------------------|
| **Deflection rate** | % of queries handled without human intervention → operational efficiency |
| **Engagement rate** | replies vs. simple link clicks → value of two-way conversations |
| **Conversion rate** | % of conversations ending in a sale/booking → business impact |

### Channel Selection by Customer Intent
- **SMS** — fast/immediate; time-sensitive alerts, reminders, quick confirmations.
- **WhatsApp** — rich media + longer text; detailed ongoing conversations, global markets.
- **Email** — asynchronous; long-form content, complex details, receipts.

### Conversational Email (Two-Way Email)
**Conversational Email** enables two-way email engagement directly from MC Next — instead of one-way broadcast emails, you configure messages that **support replies**. It integrates with **Agentforce, Digital Engagement, and Data 360**: the system analyzes replies to determine intent, can trigger flows, route conversations to Agentforce agents or human reps, and update data in real time — staying contextual, compliant, and unified.

**Common use cases (full lifecycle):**
- **Drive Event Registrations** — invitees confirm attendance + preferences by replying.
- **Recover Abandoned Carts** — customers reply with product/shipping questions before purchasing.
- **Personalize Post-Purchase Journeys** — setup guidance/support in the first 30 days.
- **Enhance Transactional Emails** — recipients respond to shipping/billing notifications for assistance.
- **Service Scheduling** — select a date/time for maintenance via reply.
- **Order Management** — initiate returns or request tracking info through a reply.
- **Loyalty Engagement** — personalized offers; redeem points conversationally.
- **Product Recommendations** — tailored recommendations from purchase history.
- **Account Engagement** — account teams manage replenishment/restocking via structured replies.

**Example: Subscription Re-Engagement (30-day inactivity):**
1. A re-engagement campaign emails recipients asking them to reply with any issues.
2. If a recipient describes a technical hurdle, the **Agentforce Service Agent** identifies the intent and replies **within the same thread**.
3. The agent resolves the issue in-thread and updates the end-user's status to **Active**.
4. If more support is needed, the conversation routes to a **human rep**.

Resolving issues directly in the email thread → faster resolution times, higher win-back rates, fewer support cases.

### Review Cadence
- **Weekly** — monitor deflection + escalation logs; fix broken routing/missing subagents.
- **Monthly** — analyze engagement/conversion; refine instructions, FAQs, messaging.
- **Quarterly** — assess overall ROI; decide on new channels/use cases.

## Common Pitfalls / Misconceptions
⚠️ A conversational agent is **not** a decision-tree chatbot — it uses LLMs + your data to reason.
⚠️ Channel and agent are separate: don't rebuild an agent per channel.
⚠️ Agents without **actions** can only talk — add actions to let them actually resolve issues.
⚠️ SMS/WhatsApp are add-ons in both editions; only email is bundled.
⚠️ **Conversational Email turns passive notifications interactive** — replies are analyzed for intent, not ignored.

## Active Recall Questions
1. What is the key difference between broadcast and conversational marketing?
2. What is the "pipe" vs. the "brain" distinction, and why does it matter?
3. What are the four components of the conversational ecosystem?
4. What's the difference between a subagent and an action?
5. Name the three core KPIs for conversational marketing.
6. What does Conversational Email integrate with, and what happens to replies?
7. Name three Conversational Email use cases.

## Related Concepts
- [[agentic-marketing]]
- [[ai-features]]
- [[channels-overview]]
- [[consent-and-compliance]]
- [[email-creation-editing]]

## Source References
- `sources/Salesforce_Trails.txt` — "Get Started with Conversational Marketing", "Explore the Conversational Ecosystem", "Drive Engagement and Productivity"
- `sources/Email_Deep_Dive.txt` — "Conversational Email in Marketing Cloud Next"
