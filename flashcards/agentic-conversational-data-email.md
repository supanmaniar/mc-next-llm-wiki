# Flashcards — Agentic, Conversational, Data Architecture & Email

## Card: Agentic Marketing Definition
**Q:** What is the defining difference between traditional automation and agentic marketing?
**A:** Automation follows a fixed, human-configured path; agentic marketing lets the marketer state a *strategy* while AI agents create content, build audiences, personalize, optimize, and orchestrate handoffs autonomously.

## Card: Three Pillars
**Q:** What three pillars set Marketing Cloud Next apart from retrofitted-AI platforms?
**A:** (1) Actionable data (one unified dataset), (2) cross-departmental workflows (Sales/Service/Commerce), (3) autonomous Agentforce-native AI agents.

## Card: Three Waves
**Q:** Name the three waves of Marketing Cloud evolution.
**A:** Wave 1 Automation → Wave 2 Real-Time → Wave 3 Agentic.

## Card: Zero Copy
**Q:** What does "zero copy data access" mean?
**A:** Connecting directly to an external data platform (Snowflake, BigQuery) and reading data in place without physically moving/copying it.

## Card: Channel vs Agent
**Q:** What is the "pipe vs. brain" distinction in conversational marketing?
**A:** The channel (SMS/WhatsApp/email) is the pipe that delivers messages and receives replies; the agent (Agentforce) is the brain that analyzes text with LLMs + Data 360.

## Card: Conversational Ecosystem
**Q:** What are the four components of the conversational ecosystem?
**A:** Channel (interface), Flow (traffic controller), Agent (intelligence), Data 360 (memory).

## Card: Subagent vs Action
**Q:** What's the difference between a subagent and an action?
**A:** A subagent defines the boundaries of what the agent may discuss (the "job description"); an action is a tool to actually do things (Get Information or Update Records).

## Card: Conversation Lifecycle
**Q:** What are the four stages of a conversation's lifecycle?
**A:** (1) Trigger, (2) Routing & engagement (intent recognition), (3) Execution (retrieve/update via actions), (4) Handoff or resolution.

## Card: Conversational KPIs
**Q:** Name the three core KPIs for conversational marketing.
**A:** Deflection rate (no human intervention), engagement rate (replies vs. clicks), conversion rate (sale/booking).

## Card: Einstein Trust Layer
**Q:** Name four mechanisms of the Einstein Trust Layer.
**A:** Toxicity detection, dynamic grounding (anti-hallucination), PII data masking, zero data retention, encryption, audit trail, human escalation (any four).

## Card: Data Masking
**Q:** How does the Trust Layer protect PII sent to an LLM?
**A:** It detects PII (credit cards, phones, addresses), replaces it with anonymized placeholders before the prompt reaches the LLM, then unmasks the response.

## Card: Three Data Layers
**Q:** What are DLO, DMO, and Unified Individual, in order?
**A:** DLO (raw data lake object, "intake"), DMO (standardized data model object), Unified Individual (identity-resolved single profile).

## Card: Data Graph Primary Object
**Q:** What primary object does Marketing Cloud Next require for a data graph?
**A:** Unified Individual (the segment driving the flow must also be built on Unified Individual).

## Card: Data Graph Rule
**Q:** Why doesn't data automatically become available just because it's in Data 360?
**A:** A field must be explicitly included in the data graph before Marketing Cloud Next can access it for personalization/decisioning.

## Card: Data Graph Decisions
**Q:** What three decisions must an admin make before building a data graph?
**A:** Which objects to include, which fields are needed (can't be removed after save), and refresh frequency.

## Card: Get Records Source
**Q:** Which flow element draws data from Salesforce Core directly (bypassing Data 360)?
**A:** The Get Records element (e.g., Contacts, Leads, Accounts).

## Card: Ingestion Stages
**Q:** Name the five stages of the data ingestion workflow.
**A:** (1) Data stream → DLO, (2) DMO mapping, (3) identity resolution → Unified Individual, (4) segment refresh, (5) data graph refresh.

## Card: Identity Resolution Lag
**Q:** How often does identity resolution run by default, and why is it the least predictable stage?
**A:** ~Once per day (more often for smaller change sets); depends on schedule and change volume, so a few hours up to ~24 hours.

## Card: CDC vs Batch
**Q:** How do the CRM connector's streaming vs. batch ingestion differ in latency?
**A:** CDC streaming lands in the DLO in ~3 minutes; batch fallback (unsupported CDC or formula fields) checks ~every 10 minutes.

## Card: First Match Wins
**Q:** How does a Decision element evaluate outcomes?
**A:** Outcomes are evaluated in order and the first match wins; unmatched contacts follow the default (catch-all) outcome.

## Card: Decision Condition Parts
**Q:** What are the three parts of a decision condition?
**A:** Resource (data-graph attribute), Operator (Equals/Greater Than/etc.), Value (typed entry or field reference).

## Card: Flow vs Org Data Graph
**Q:** How does the flow data graph differ from the org default data graph?
**A:** The org default populates *message* personalization; the flow data graph determines what the *flow* can evaluate for decisioning.

## Card: Path Experiment Capabilities
**Q:** What two capabilities does a Path Experiment combine?
**A:** Random Split (distribute contacts across paths) and Path Optimizer (evaluate which path performs best).

## Card: Path Experiment Winner
**Q:** At what confidence level does automatic Path Experiment selection declare a winner?
**A:** 95% confidence against all other paths; the delayed group then follows the winning path.

## Card: Path Experiment Edition
**Q:** Which edition includes Path Experiments, and what permission is required?
**A:** Advanced Edition only; requires Marketing Cloud Manager or Admin permission set + personalization features.

## Card: Formula Resource
**Q:** What is a formula resource used for in a flow?
**A:** A computed value (e.g., `Today()-30`) that a Decision element can reference, such as testing recency.

## Card: Message Purpose
**Q:** What's the difference between promotional and transactional message purpose?
**A:** Promotional = marketing content, requires opt-in consent; transactional = related to a customer action (receipt, reset), no subscription needed.

## Card: Email Editor Parts
**Q:** What are the three core parts of the email editor?
**A:** Canvas (structure), components panel (elements), properties sidebar (per-component settings).

## Card: Personalization Tracking
**Q:** How often is personalization tracking setup performed?
**A:** Once per org (Customer Engagement → Personalization Setup).

## Card: Link vs Clone
**Q:** What's the difference between linking and cloning a personalization point?
**A:** Linking shares one personalization point across components (updates apply everywhere); cloning creates a separate copy with its own rules.

## Card: Saved Expression
**Q:** What does a saved expression do?
**A:** Defines which single value to return from data when multiple are possible, using filters/sorting (e.g., most recent purchase); reusable across emails/channels.

## Card: Consent Composite Key
**Q:** What three parts make up the consent composite key?
**A:** Communication Subscription (topic) + Contact Point (email/phone) + Engagement Channel Type (Email/SMS/WhatsApp).

## Card: Strict Opt-In
**Q:** What does Marketing Cloud Next's strict opt-in rule mean?
**A:** If no consent record exists for a recipient on a subscription, the system treats them as opted out and blocks the send (absence of "Yes" = "No").

## Card: Unsubscribe All
**Q:** Does "Unsubscribe from all" persist as a permanent block?
**A:** No — it removes the contact from all *existing* subscriptions but doesn't prevent a future opt-in on a newly created subscription.

## Card: SMS Opt-Out Scope
**Q:** What is SMS opt-out scope?
**A:** Per sender code — opting out of one code doesn't affect other codes from the same brand (not global per phone number).

## Card: Never Delete Subscription
**Q:** Why must you never delete a Communication Subscription?
**A:** Deleting it cascades and permanently destroys all related historical consent data (the audit trail). Instead, remove it from Preference Pages.

## Card: Consent Flow Actions
**Q:** What flow actions write consent, and which must be avoided?
**A:** Use `Create Consent` (Data Cloud Record-Triggered) or `Consent Request` (Automation Event/On-Demand); avoid `MessagingConsent` / `MessagingConsentV2`.

## Card: Double Opt-In
**Q:** What are the five steps of a double opt-in flow?
**A:** (1) Data capture, (2) transactional confirmation email, (3) click verification link, (4) `Consent Request` action writes OPT_IN, (5) verified subscriber.

## Card: Sending Identity
**Q:** What four pieces establish a trusted sending identity?
**A:** Physical address, authenticated sending domain (DKIM/SPF/DMARC), authenticated from addresses, branded tracking domain.

## Card: Reply Mail Management
**Q:** What three functions does Reply Mail Management perform?
**A:** Delete auto-responses, optional auto-response acknowledgment, routing to a monitored inbox (plus opt-out keyword processing).

## Card: Einstein Metrics Guard
**Q:** What does Einstein Metrics Guard do?
**A:** Uses AI to filter non-human activity (bot scans, security checks) so open/click rates reflect real engagement.

## Card: Email Copy Personalization
**Q:** What happens when you copy an email that includes personalization?
**A:** Only the default variations of dynamic content components are copied — other variations and personalization rules aren't. A Personalization recommender isn't copied either (but its merge fields and repeaters are).

## Card: Convert to Code
**Q:** What does converting an email to code remove, and can you undo it?
**A:** It removes dynamic content — repeaters, conditional logic, and content variants — and you lose drag-and-drop components and Style tab styling. You can't undo the conversion.

## Card: View as Web Page Link
**Q:** How long does a View as Web Page link work, and what does it re-render?
**A:** It becomes active when sent and works for 90 days. It reflects the published version at send time, but personalized values re-render against the recipient's current profile each time the link is opened.

## Card: Plain Text Version Sync
**Q:** What happens when you manually edit an email's plain text version?
**A:** It's no longer in sync with the original — future changes to the original aren't included. Restore discards plain-text edits.

## Card: Test Send Limits
**Q:** How many test recipients can you send to, and what do test sends count toward?
**A:** Up to five comma-separated addresses; test sends count toward message credits. The From name must be from an authenticated domain.

## Card: Email File Attachment
**Q:** What file type and size limit apply to email attachments?
**A:** PDF files from Salesforce CMS, up to 5 MB.

## Card: Opt-Out Link Options
**Q:** What are the three opt-out link options for promotional emails?
**A:** Unsubscribe (immediate unsubscribe from the email's subscription + confirmation page), Preference Manager (manage individual email preferences), or a custom preference page URL.

## Card: Email Template Locking
**Q:** How does locking work for email template content?
**A:** Template-wide settings and components are locked by default; nested components mirror the parent (locking/unlocking cascades). Unlock via Settings (template-wide), lock icons (subject/preheader), Data Sources tab, or per-component "Allow users to modify this component".

## Card: Dynamic From - Subdomain vs Root
**Q:** When should you use a static vs. dynamic From address?
**A:** Static From + dynamic display name when sending from an authenticated subdomain (avoids DMARC alignment failures); dynamic From when you authenticate the root domain (personal addresses align with the sending domain).

## Card: Dynamic Reply Address
**Q:** What does a dynamic reply address require, and what happens if the domain isn't authorized?
**A:** It requires an authorized email domain. MC Next validates each resolved reply address's domain; if not authorized, it uses the fallback address.

## Card: Dynamic Reply vs RMM
**Q:** How does a dynamic reply address interact with Reply Mail Management?
**A:** Direct reply bypasses RMM (no auto-reply/out-of-office/unsubscribe processing); RMM routing forwards replies to conversational agents, shared inboxes, or Sales/Service Cloud routing rules.

## Card: Dynamic From Fallback
**Q:** What happens when a dynamic From/reply value is missing at send time?
**A:** MC Next uses the configured fallback — always configure a verified, authenticated address as the fallback to maintain deliverability.

## Card: Dynamic Address Sources
**Q:** What are the two ways to source a dynamic email address?
**A:** From an associated user (contact owner, account manager, customer success manager) or from a custom field (brand, publication, or region address).
