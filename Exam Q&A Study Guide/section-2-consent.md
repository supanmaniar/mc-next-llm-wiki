# Q&A Study Guide — Section 2: Consent (13%)

> **Exam weight: 13%.** Scenario-driven questions with full reasoning. Cover the **Answer** and **Why** until you've committed to your own answer.
> **Related concept pages:** [[consent-and-compliance]] · [[consent-data-model]] · [[consent-write-paths]] · [[consent-double-opt-in]] · [[consent-preference-pages]] · [[consent-audit-trail]] · [[consent-cache]] · [[consent-sync-3-flow]] · [[consent-channels-troubleshooting]]

---

## Q1 — Consent Model

**Question:** A client asks what happens if a contact has never explicitly opted in but has also never opted out. Can Marketing Cloud Next send to them?

**Answer:** **No — Marketing Cloud Next uses strict opt-in, so the absence of an explicit "Yes" means the contact is blocked.**

**Why:** Strict opt-in is the foundational rule of the entire consent model. There is no "implied consent" or "soft opt-in" state. This matters because it inverts the default assumption many marketers carry from other platforms: silence is a **block**, not permission.

> ⚠️ **Distractor logic:** "Yes, unless they've opted out" is the plausible-but-wrong answer — it describes an opt-out model, which is the opposite of what Marketing Cloud Next implements.

---

## Q2 — Composite Key

**Question:** A consultant is explaining how consent records are uniquely identified. What three elements make up the consent composite key?

**Answer:** **Subscription + Contact Point + Channel Type.**

**Why:** Consent is scoped to a specific *topic* (subscription), a specific *address* (contact point), and a specific *medium* (channel type). All three are needed to identify a consent record. This is why opting out of "Product News via Email" does not affect "Product News via SMS" — different channel type, different key.

> ⚠️ **Distractor logic:** An option substituting "Individual" or "PartyID" for one of the three is the "almost right" answer — it swaps in the person, which is precisely what consent is *not* keyed on.

---

## Q3 — PartyID

**Question:** A developer inspects the consent audit trail and notices the PartyID field is blank on every row, even for known Contacts. Is this a data quality issue?

**Answer:** **No — PartyID is blank by design, because consent is keyed on Contact Point value + CSCT ID, not on the individual.**

**Why:** Keying on the individual would require resolving *whose* preference wins when one address maps to multiple people. Keying on the address is conservative and regulator-friendly. The blank PartyID is therefore intentional, not a defect — a subtle but frequently tested point.

> ⚠️ **Distractor logic:** "The integration is misconfigured" is the plausible-but-wrong answer — it treats a deliberate design decision as a bug.

---

## Q4 — Shared Address

**Question:** Two family members share a single email address. One of them unsubscribes from a newsletter. What is the effect on the other?

**Answer:** **The opt-out affects everyone sharing that address — there is no way to send to some and suppress others on the same contact point.**

**Why:** Because consent is keyed on the contact point value, an opt-out on that address applies to the address itself. This is the direct consequence of the design in Q3, and it's why the model is described as conservative. The practical takeaway for a consultant is to advise clients that shared addresses carry shared consent.

---

## Q5 — Audit Trail vs DMO

**Question:** A compliance officer asks how to prove what a contact's consent status was six months ago. Which object should the consultant point to?

**Answer:** **The Consent Audit Trail — it is append-only and records every historical change.**

**Why:** The CSC DMO stores only the **current** status and is updated in place, so it cannot answer historical questions. The Audit Trail is append-only, capturing TimeStamp, ConsentStatus, ContactPointValue, CSCT ID, and caller-provided source attribution. This distinction — *current state* vs *history* — is the core of the question.

> ⚠️ **Distractor logic:** "The CSC DMO" is the plausible-but-wrong answer — it's the right *topic* but the wrong *object* for a historical question.

---

## Q6 — Audit Trail Attribution

**Question:** A client wants to report on *which team member* changed each consent record. What should the consultant explain?

**Answer:** **There is no UserId/ActorId field — use caller-provided source attribution instead (ConsentCapturedSourceType, ConsentCapturedSourceName, ConsentCapturedSourceDetails, SenderId).**

**Why:** The audit trail deliberately does not capture an actor identity. Attribution is achieved through caller-supplied source metadata, which means the *calling system* must populate it. If a client needs per-user attribution, that must be designed into the integration, not assumed from the platform.

> ⚠️ **Distractor logic:** "Query the UserId field" is the plausible-but-wrong answer — it assumes a field that does not exist.

---

## Q7 — GDPR Deletion

**Question:** A contact exercises their right to erasure. How should the consultant delete their consent audit trail rows?

**Answer:** **Use the Consent API `ShouldForget` endpoint on the Individual — deletion is asynchronous and reprocessed at 30/60/90 days, then permanent.**

**Why:** Audit trail rows cannot be deleted through the UI in bulk. `ShouldForget` flags the individual and triggers asynchronous deletion across DMOs, with reprocessing checkpoints at 30, 60, and 90 days before becoming permanent. The staged reprocessing exists because downstream systems may re-ingest the data before the deletion fully propagates.

> ⚠️ **Distractor logic:** "Delete the rows directly in Data Cloud" is the plausible-but-wrong answer — it ignores both the append-only design and the required API path.

---

## Q8 — Create Consent Inputs

**Question:** A consultant is configuring a Create Consent flow action. What four input parameters does it require?

**Answer:** **Consent Status, Contact Point, Channel, and Communication Subscription.**

**Why:** These four map directly onto the composite key (Q2) plus the status being set. Recognising that the inputs mirror the key is a useful memory hook: you're specifying *what* (subscription), *where* (contact point), *how* (channel), and *which state* (status).

---

## Q9 — Create Consent Availability

**Question:** A consultant needs to write consent from a flow. Which flow type supports the Create Consent action, and which legacy action must be avoided?

**Answer:** **Create Consent is available in Automation Event-Triggered flows (and Data Cloud-Triggered / On-Demand flows). Never use the legacy `MessagingConsent` action.**

**Why:** `MessagingConsent` is the deprecated path and is explicitly called out as unsupported. Using it produces consent that is not honoured correctly. The exam tests this because it's a real migration trap for consultants coming from legacy Marketing Cloud.

> ⚠️ **Distractor logic:** "MessagingConsent" is the legacy/over-engineered answer — it looks like a valid action name, which is exactly why it's dangerous.

---

## Q10 — Unsupported Write Paths

**Question:** A client plans to load consent by mapping an external system's data stream directly to the Consent DLO. What should the consultant advise?

**Answer:** **This is an unsupported write path — it will cause stale consent. Supported paths are Preference Pages, the Consent Status LWC, CSV imports, and Salesforce Flow (Create Consent).**

**Why:** The unsupported paths are: Data Stream → Consent DLO, Bulk Ingestion API → Consent DMO, Batch Data Transform → DLO mapped to CSC DMO, and the legacy MessagingConsent actions. These bypass the mechanisms that keep consent authoritative, so the data appears present but is not reliably honoured.

> ⚠️ **Distractor logic:** "It will work but needs a scheduled refresh" is the plausible-but-wrong answer — it implies the path is merely inefficient, when in fact it is unsupported.

---

## Q11 — Silent Dropouts

**Question:** A client reports that consent records appear correctly in the UI, yet some contacts still receive no email. What is the most likely cause?

**Answer:** **External consent was mapped straight into the CSC DMO — it appears saved but is ignored at send time, causing silent dropouts.**

**Why:** This is the practical consequence of Q10. The UI reflects the DMO, but the send path does not trust a directly-mapped value. The result is the worst kind of failure: no error, no bounce, just silent non-delivery. The fix is to route the write through **Create Consent**.

> ⚠️ **Distractor logic:** "The contacts have hard-bounced" is the plausible-but-wrong answer — it's a real cause of non-delivery, but the scenario's clue is that consent *looks* correct.

---

## Q12 — Consent at Scale

**Question:** A client needs to load consent for millions of records from an external system. What two-step approach should the consultant recommend?

**Answer:** **1) Batch Data Transform → DLO for the initial load. 2) A Data Cloud-Triggered Flow with Create Consent to write consent so it is honoured at send time.**

**Why:** The Batch Data Transform handles the volume efficiently, but on its own it lands in the DLO — which is an unsupported write path (Q10). The second step converts that raw data into authoritative consent via Create Consent. This two-step pattern is the documented answer for scale, and it's a favourite exam scenario because it combines a volume constraint with a correctness constraint.

> ⚠️ **Distractor logic:** "Use a CSV import" is the plausible-but-wrong answer — CSV imports cap at **50,000 rows** and are intended for one-time loads, not millions.

---

## Q13 — CSV Import Limit

**Question:** A client wants to use CSV consent imports as their ongoing weekly sync mechanism. What should the consultant advise?

**Answer:** **CSV imports are limited to 50,000 rows per file and are intended for one-time loads — not sustained high-volume sync.**

**Why:** The limit is a hard number the exam tests. More importantly, the *intent* matters: CSV import is a migration/onboarding tool, not a pipeline. For ongoing sync, the flow-based approach in Q12 is correct.

---

## Q14 — Send-Time Cache

**Question:** A consultant updates a consent record directly in the CSC DMO and confirms the change in the UI. The next send still goes out. Why?

**Answer:** **At send time, Marketing Cloud Next reads a cache keyed by recipient email — not the DMO directly. Direct DMO writes do not refresh the cache.**

**Why:** The cache is populated on a miss and used for **90 days** unless updated. Only four things refresh it: a manual layout update, an Unsubscribe link / Preference Center action, a CSV import, and (officially) the **Create Consent** flow activity. A direct DMO write updates the source of truth but leaves the cache stale — so consent "looks saved" yet is stale at send.

> ⚠️ **Distractor logic:** "The cache expires after 24 hours" is the "almost right" answer — it invents a refresh interval; the real TTL is 90 days and the real issue is the *write path*.

---

## Q15 — Cache Refresh Paths

**Question:** Which actions refresh the send-time consent cache?

**Answer:** **Manual layout update · Unsubscribe link / Preference Center · CSV import · and (officially) the Create Consent flow activity.**

**Why:** These are the four documented refresh triggers. Note the nuance on the last one: `MessagingConsentV2` is **not guaranteed** to refresh the cache, which is another reason to standardise on Create Consent. Memorising this list lets you answer both "what refreshes it" and "what doesn't" variants.

---

## Q16 — Double Opt-In

**Question:** A client wants to confirm genuine intent before recording consent. What two-step process should the consultant implement, and what type of email must the confirmation be?

**Answer:** **1) Submit the sign-up form and receive a transactional confirmation email. 2) Click the confirmation link to verify intent — only then is consent recorded. The confirmation email must be Transactional.**

**Why:** Only **Transactional** emails can be sent to contacts without confirmed consent; a Promotional email would fail delivery for an unconfirmed contact. This is the crux of the scenario — the email *type* is a hard requirement, not a preference.

> ⚠️ **Distractor logic:** "Send a promotional confirmation email" is the plausible-but-wrong answer — it's the natural marketing instinct and it breaks the flow.

---

## Q17 — Wait Until Event

**Question:** In a double opt-in flow, what does the Wait Until Event step monitor?

**Answer:** **The transactional confirmation email (flow action to monitor) and the opt-in confirmation link/CTA (link to monitor).**

**Why:** The Wait element needs both a *thing that was sent* and a *thing to be clicked*. Specifying only one leaves the flow unable to detect the confirmation. This connects to the Section 4 rule that Wait Until Event must sit **immediately after** the monitored element.

---

## Q18 — Preference Page Metrics

**Question:** A client's Email Opt-Out Rate looks suspiciously low despite many preference page unsubscribes. What is the cause?

**Answer:** **Preference Page unsubscribes are processed as consent updates, not Email Engagement Unsubscribe events — so they are excluded from the Email Opt-Out Rate.**

**Why:** The metric is computed from Email Engagement events. A preference page unsubscribe changes consent but does not emit that event, so the metric understates reality. This is a cross-section trap: it tests Section 2 consent mechanics through a Section 6 metric.

> ⚠️ **Distractor logic:** "The metric is broken" is the plausible-but-wrong answer — the metric is working as designed; the *data source* is the issue.

---

## Q19 — Channel Opt-Out Scope

**Question:** A contact opts out of SMS. What is the scope of that opt-out, and how does it differ from email and WhatsApp?

**Answer:** **SMS opt-out is per sender code. Email is per subscription + channel. WhatsApp is per contact point (blocked in-app).**

**Why:** Each channel has a different opt-out granularity, and the exam tests the differences directly. The SMS "per sender code" scope is the most commonly missed — it is neither per-subscription nor per-address.

---

## Q20 — Unsubscribe All

**Question:** A contact clicks "Unsubscribe from all". Does this create a permanent block on all future sends?

**Answer:** **No — "Unsubscribe from all" does not persist as a permanent block.**

**Why:** It opts the contact out of all *current* subscriptions, but it is not a permanent, account-level suppression. This is a subtle but frequently tested distinction, and it pairs with the rule that there is no channel-level or account-level opt-out today.

> ⚠️ **Distractor logic:** "Yes, it permanently blocks all sends" is the plausible-but-wrong answer — it matches the intuitive meaning of the label.

---

## Q21 — Never Delete a Subscription

**Question:** A client wants to tidy up by deleting an unused Communication Subscription. What should the consultant advise?

**Answer:** **Never delete a Communication Subscription — it destroys the audit trail.**

**Why:** The subscription is part of the consent key and the audit history. Deleting it removes the ability to prove consent history for that topic, which is a compliance failure. The correct approach is to stop using it, not to delete it.

---

## Q22 — Transactional Consent

**Question:** A client sends OTP codes via SMS and believes consent is not required because the messages are transactional. Are they correct?

**Answer:** **No — transactional SMS (OTP/2FA) still requires consent (TCPA). Transactional *email* consent is off by default, but selecting a Communication Subscription turns it on.**

**Why:** The two channels differ. Transactional email has a consent check that defaults to off (and is switched on by selecting a subscription), but transactional SMS is governed by TCPA and still requires consent. The scenario deliberately uses the word "transactional" to bait the email rule onto SMS.

> ⚠️ **Distractor logic:** "Transactional messages are exempt" is the plausible-but-wrong answer — true for email by default, false for SMS.

---

## Q23 — Spam Complaint

**Question:** A contact files a spam complaint, which is processed via the feedback loop and Reply Mail Management. What is the opt-out scope?

**Answer:** **All current subscriptions — there is no channel-level or account-level opt-out today.**

**Why:** An FBL complaint plus RMM processing opts the contact out of everything currently subscribed. Knowing that no finer-grained opt-out exists prevents you from selecting a distractor that offers channel-level control.

---

## Q24 — Consent Banner

**Question:** A client implements the consent banner on their website. They notice the first page view is missing from their analytics. Is this a bug?

**Answer:** **No — the first page view is not recorded when consent is required.**

**Why:** The banner must be answered before tracking can begin, so the initial view that *presents* the banner cannot be captured. The banner stores its state in the `sfmc_consent` cookie for **365 days**. This is a designed behaviour, not a defect.

---

## Q25 — 3-Flow Consent Sync

**Question:** A consultant is designing a CRM ↔ Data 360 ↔ Marketing Cloud Next consent sync. What is the non-negotiable rule for every consent write?

**Answer:** **All writes must use Create Consent (Data Cloud-Triggered or Automation Event-Triggered). Direct DMO field mapping is ignored at send time.**

**Why:** This is the architectural conclusion of Q10–Q12 applied to a multi-system design. The three-flow pattern uses Create Consent in each direction, and Flow 3 (Automation Event-Triggered on the CRM consent record) sets Opt Out to suppressed so it prevents deployment immediately. Any shortcut that writes fields directly will silently fail at send.

> ⚠️ **Distractor logic:** "Update the CSC DMO field directly for performance" is the legacy/over-engineered answer — it optimises the wrong thing and breaks correctness.

---

## Q26 — Consent Segmentation

**Question:** A client wants to build a segment of contacts who have opted in to a specific subscription. What approach is required, and what is the cost implication?

**Answer:** **A Calculated Insight workaround — it is metered and consumes credits.**

**Why:** Consent lives in DMOs that the segment canvas cannot query directly for this purpose, so a Calculated Insight bridges the gap. The cost implication matters because segmentation credits are consumed on publish, and Calculated Insights add their own metered usage. The exam tests both the *method* and the *cost*.

---

## Q27 — Web Tracking Scope

**Question:** A client wants to understand what activity Marketing Cloud Next can capture on their website. What four activities are tracked?

**Answer:** **Page views, form submissions, link clicks, and button clicks.**

**Why:** These four cover the main engagement signals that feed Data Cloud for segmentation. Recognising the scope matters because it defines what data is available downstream — anything outside these four is not captured by web tracking.

---

## Q28 — Web Tracking Cookies

**Question:** A consultant is explaining the cookies used by web tracking. Which cookie stores the consent decision, and for how long?

**Answer:** **`sfmc_consent` — 365 days, storing True (opted in) or False (opted out / ignored the banner).**

**Why:** Three cookies are involved: `_sfid_${domainHash}` (730 days, creates a unique visitor ID), `sfmc_consent` (365 days, the consent decision), and `guest_uuid_essential_<SiteID>` (365 days, no longer used but still set). The consent cookie is the one that governs whether tracking proceeds.

> ⚠️ **Distractor logic:** `_sfid_${domainHash}` is the plausible-but-wrong answer — it identifies the visitor, not their consent state.

---

## Q29 — First Page View

**Question:** A client notices their landing page analytics are missing the very first view from each visitor. Is this a tracking failure?

**Answer:** **No — when consent is required, the first page view is not recorded because it happens before the visitor has consented.**

**Why:** This is a designed consequence of consent-first tracking, not a defect. It applies to both landing pages and external sites, since the same consent banner is used for both. The practical implication is that analytics will always undercount by one view per consented visitor.

> ⚠️ **Distractor logic:** "The tracking code is misconfigured" is the plausible-but-wrong answer — it misdiagnoses designed behaviour as a bug.

---

## Q30 — Landing Page Tracking Setup

**Question:** A consultant is configuring web tracking on a landing page with a consent banner. What two integration tiles are required?

**Answer:** **The Data Cloud integration and the Data Cloud Web Tracking Consent Banner integration — then publish the site.**

**Why:** Both tiles are needed: one connects the data, the other renders the banner. Without the banner integration, consent cannot be captured. Note the permission split: configuring external tracking needs **Marketing Cloud Admin**, while creating/publishing a consent banner needs **Marketing Cloud Manager plus a CMS workspace contributor role** (content admin or content manager).

> ⚠️ **Distractor logic:** "Only the Data Cloud integration" is the plausible-but-wrong answer — it omits the banner tile, so no consent would be captured.

---

## Q31 — Tracking Without a Consent Banner

**Question:** A client wants web tracking without displaying a consent banner. What configuration is required?

**Answer:** **Set the security level to Relaxed CSP, add the Data Cloud integration (NOT the consent banner integration), and add the tracking code snippet to Head Markup — which dispatches a `set-consent` custom event.**

**Why:** The Head Markup snippet programmatically signals consent, removing the need for a visible banner. The Relaxed CSP setting is required for the script to run. Note the contrast with the banner approach: you add the Data Cloud integration but deliberately **not** the consent banner integration.

> ⚠️ **Distractor logic:** "Add the consent banner integration but hide the banner" is the plausible-but-wrong answer — the correct approach omits that integration entirely.

---

## Q32 — External Site Tracking

**Question:** A consultant needs to track activity on a client's external website. What two artefacts must be created?

**Answer:** **A Website Connector (Setup → Web Tracking → Website Connectors → New) and a Webpage Embed Code (name it, select the connector, choose the consent requirement, associate a campaign) — then add the embed code to the site's `<head>` tag.**

**Why:** The connector establishes the link; the embed code is what actually runs on the site. The consent requirement is chosen at embed-code creation, which determines whether a banner is needed. Note the maintenance warning: pre-Winter '26 external tracking scripts must be replaced with the new embed script.

---

## Q33 — Custom Domain Tracking

**Question:** A client hosts a landing page on a custom domain and wants to track activity. What must the consultant configure?

**Answer:** **Add a custom URL for that domain in Setup and define the path as `/lp`.**

**Why:** The `/lp` path convention is how the platform recognises landing page traffic on a custom domain. This is a memorised configuration detail, and it pairs with the rule that each use case needs its own authenticated domain (Section 1, Q24).

---

## Q34 — Email Opt Out Sync Gap

**Question:** A contact opts out via the standard Salesforce `Email Opt Out` field, but still receives marketing emails from Marketing Cloud Next. Why?

**Answer:** **`HasOptedOutOfEmail` does not automatically sync with the Marketing Cloud Next consent layer — you need a two-Flow bridge.**

**Why:** The CRM field and the MC Next consent layer are separate systems. Without custom configuration, an opt-out in CRM is invisible to MC Next, and conversely a preference-page unsubscribe does not update the CRM field. This is a significant compliance risk and a high-value exam scenario.

> ⚠️ **Distractor logic:** "The opt-out takes up to 24 hours to sync" is the plausible-but-wrong answer — it implies a sync exists, when in fact none does by default.

---

## Q35 — Two-Flow Bridge

**Question:** A consultant is building the CRM ↔ MC Next consent bridge. What flow types and actions are used in each direction?

**Answer:** **Flow 1 (CRM → MC Next): an Automation Event-Triggered Flow on the Contact/Lead using a Consent Request action. Flow 2 (MC Next → CRM): a Data Cloud-Triggered Flow using an Update Records action to set `HasOptedOutOfEmail`.**

**Why:** The two directions use different flow types because they listen to different systems. Flow 1 triggers on the CRM record change; Flow 2 triggers on the MC Next consent record change. Both need Decision actions to handle multiple channels or subscriptions.

> ⚠️ **Distractor logic:** "Use MessagingConsent in both flows" is the legacy/over-engineered answer — it does not correctly update the MC Next consent layer over time.

---

## Q36 — Infinite Loop Risk

**Question:** A consultant builds the two-flow consent bridge and sees flows triggering each other repeatedly. What is the cause and the fix?

**Answer:** **An infinite loop — the Data Cloud-Triggered Flow updating the Contact/Lead must not re-trigger Flow 1. Review trigger conditions carefully.**

**Why:** Flow 1 fires on CRM changes and Flow 2 writes to CRM, so without careful conditions Flow 2's write re-triggers Flow 1, which writes to MC Next, which re-triggers Flow 2. The fix is to scope the trigger conditions so each flow ignores changes it caused itself.

> ⚠️ **Distractor logic:** "Add a wait element to break the cycle" is the plausible-but-wrong answer — it delays the loop rather than preventing it.

---

## Q37 — Hybrid Sending

**Question:** A client runs Marketing Cloud Account Engagement and Marketing Cloud Next side by side. How is consent matched between them?

**Answer:** **Automatically (Match Overall Email Consent) or manually (Match Consent and Subscriptions). For Marketing Cloud Engagement, use the Consent Mapping tool — email and SMS are available today.**

**Why:** The two hybrid scenarios use different mechanisms. Account Engagement offers automatic or manual matching, while Marketing Cloud Engagement uses the Consent Mapping tool with email and SMS support. Recognising which tool applies to which product is the tested skill.

> ⚠️ **Distractor logic:** "Use the Consent Mapping tool for Account Engagement" is the plausible-but-wrong answer — that tool belongs to the Marketing Cloud Engagement scenario.

---

## Q38 — Consent Package Install Failure

**Question:** A consultant's consent package installation fails with CustomField errors on ConsentAuditTrail. What are the two prerequisites to check?

**Answer:** **1) Data Protection must be enabled (Set Up Data Privacy). 2) The Data Cloud Salesforce Connector permission set must grant Read and View All Records on Communication Subscription, Communication Subscription Channel Type, and Engagement Channel Type.**

**Why:** The install step "Automatically Install Required Packages with One Click" includes the consent-specific managed package, and it fails if either prerequisite is missing. The three objects needing permissions are a memorised list — the CustomField errors are a symptom, not the root cause.

> ⚠️ **Distractor logic:** "Reinstall the package" is the plausible-but-wrong answer — it retries without fixing the underlying permission gap.

---

## Q39 — Consent Data Stream Activation

**Question:** A consultant's consent data streams will not ingest on a new sandbox. What is the most likely cause?

**Answer:** **The data streams are in a `NEEDS_ACTIVATION` state — expected on new sandboxes because connections are not activated by default. Activate each consent data stream in Data Cloud Setup.**

**Why:** This is a sandbox-specific gotcha: the streams exist but are dormant. The fix is a manual activation step. If activation is done and ingestion still fails, the next step is to review the data for rejected rows.

> ⚠️ **Distractor logic:** "The data is malformed" is the plausible-but-wrong answer — it jumps to a data-quality diagnosis before checking the activation state.

---

## Q40 — Consent Billing

**Question:** A client asks whether ingesting consent into Data Cloud consumes credits. What should the consultant explain?

**Answer:** **No — ingestion through an internal Salesforce connector is zero-cost (since Aug 7, 2025). External ingestion (Snowflake, S3) is a different usage type and does consume credits.**

**Why:** The internal/external distinction is the key discriminator, and it mirrors the Section 3 billing rule. Note the related facts: consent storage only charges **above allocation**, and mapping CRM consent into the CSC DMO is internal-pipeline ingestion and therefore free.

> ⚠️ **Distractor logic:** "All consent ingestion is free" is the plausible-but-wrong answer — external sources are metered.

---

## Q41 — Consent Metered Operations

**Question:** Which consent-related operations DO consume credits?

**Answer:** **Segmentation and Calculated Insights (billed on records processed), and Identity Resolution (billed under Batch Profile Unification).**

**Why:** The pattern is that *moving* consent is free but *processing* it is metered. Building a segment that references consent, or a Calculated Insight used to surface consent, draws down credits each time it runs. Identity Resolution charges on source profiles processed, and after the first run only new/modified profiles count.

> ⚠️ **Distractor logic:** "Storing consent consumes credits" is the plausible-but-wrong answer — storage only charges beyond allocation.

---

## Q42 — Duplicate Consent Records

**Question:** A client ingests the same individuals from two sources and sees higher-than-expected credit consumption. Why?

**Answer:** **Duplicate consent rows increase record counts that downstream metered operations process — this is a data-model design consideration, not a defect.**

**Why:** The duplicates themselves are free to store, but every metered operation (segmentation, Calculated Insights, Identity Resolution) processes more records. The fix is intentional data-model design to deduplicate at ingestion rather than after.

---

## Q43 — Communication Subscription Deployment

**Question:** A consultant wants to deploy Communication Subscriptions from sandbox to production. Is this supported?

**Answer:** **No — it is currently unsupported. Communication Subscriptions are stored as data in the Communication Subscription DMO, and only metadata deploys to a sandbox.**

**Why:** This is the consent-specific instance of the Section 1 deployability rule (campaigns, briefs, and subscriptions are not deployable). The underlying reason is the data/metadata distinction: the subscription *definition* is metadata, but the subscription *records* are data, and only metadata promotes.

> ⚠️ **Distractor logic:** "Deploy them with a change set" is the plausible-but-wrong answer — no deployment method supports this.

---

## Q44 — Transactional Email Consent

**Question:** A client sends transactional emails and wants to be certain consent is never evaluated. What should the consultant advise?

**Answer:** **Do not select a Communication Subscription for transactional sends. The transactional consent check is off by default, but populating a Communication Subscription at send time causes consent to be evaluated even when the global setting is disabled.**

**Why:** The global setting is not the only factor — the presence of a subscription overrides it. This is a subtle interaction that catches people out, and it's the recommended pattern for transactional sends that should bypass consent.

> ⚠️ **Distractor logic:** "The global setting is enough" is the plausible-but-wrong answer — it ignores the subscription override.

---

## Q45 — Opt-Out Scope by Method

**Question:** A consultant is documenting how each unsubscribe method behaves. What is the scope of an email body unsubscribe link versus a spam complaint?

**Answer:** **An email body unsubscribe link opts out of the specific Communication Subscription used on that send. A spam complaint (FBL) opts out of ALL current subscriptions.**

**Why:** The methods differ in scope: email body link and one-click/List-Unsubscribe header are **subscription level**, while spam complaints and RMM are **all current subscriptions**. There is currently no account-level or channel-level opt-out. Note that opt-outs are independent of sending domain and business unit — a global subscription opt-out applies across every business unit.

> ⚠️ **Distractor logic:** "Both opt out of everything" is the plausible-but-wrong answer — the email body link is narrower.

---

## Q46 — Global Subscription Opt-Out

**Question:** A contact opts out of a global Communication Subscription that is sendable from any business unit. What is the effect?

**Answer:** **The opt-out applies to sends from every business unit — opt-outs are independent of sending domain and business unit.**

**Why:** The subscription's scope determines the opt-out's scope. A global subscription produces a global opt-out, which is why subscription design matters: creating overly broad subscriptions makes opt-outs broader than intended.

---

## Q47 — Opt-Out of All Behaviour

**Question:** A contact performs an "opt out of all" action, then an admin later creates a new subscription and opts them into it. Can the contact receive marketing again?

**Answer:** **Yes — "opt out of all" opts the recipient out of each of their current subscriptions individually. A newly created subscription is not covered, so the contact could receive marketing based on it.**

**Why:** This is the practical consequence of there being no channel-level or global opt-out. The scenario is a genuine compliance risk: a contact who intended to stop all marketing can be re-subscribed by a new subscription. Note that once channel-level consent becomes available, spam complaints and RMM are planned to opt out at the channel level instead.

> ⚠️ **Distractor logic:** "No, they are permanently suppressed" is the plausible-but-wrong answer — it assumes a global block that does not exist.

---

## Q48 — Consent Troubleshooting Step 1

**Question:** A client reports "I opted out but I'm still receiving emails". What is the first troubleshooting step?

**Answer:** **Confirm the consent record in the CSC DMO — open Data Cloud → Data Explorer → Communication Subscription Consent DMO and filter by contact point value and CSCT ID.**

**Why:** Step 1 establishes whether the write ever reached the DMO. If the record is **absent**, the upstream write never arrived and you investigate the source. If it is **present with the expected status**, you move to Step 2 and compare the DMO against what is honoured at send time.

> ⚠️ **Distractor logic:** "Check the email send logs" is the plausible-but-wrong answer — it skips the foundational check of whether consent was ever recorded.

---

## Q49 — Consent Troubleshooting Step 3

**Question:** A consultant finds a mismatch between the CSC DMO and what is honoured at send time. What is the next step?

**Answer:** **Identify the write path — check in order: MessagingConsent/MessagingConsentV2 flow actions, a Data Stream mapped directly to the Consent DLO, a Batch Data Transform writing to the Consent DLO, a Data Cloud Ingestion API call writing to the Consent DMO, or a custom integration writing consent fields directly. Any of these is an unsupported write path.**

**Why:** A mismatch between the DMO and send-time behaviour is the signature of an unsupported write path. The ordered checklist is a memorised sequence, and recognising any of the five as the culprit is the diagnostic skill being tested.

> ⚠️ **Distractor logic:** "Re-import the consent data" is the plausible-but-wrong answer — it treats the symptom without identifying the write path that will overwrite it again.

---

## Q50 — Consent Repair Paths

**Question:** A consultant has identified stale consent records and needs to repair them. What are the three repair paths by volume?

**Answer:** **Single record/small set → update via the Consent Status LWC. Bulk (≤50k rows) → Consent Import CSV. Bulk (>50k rows) → stage into a custom DMO, then run a Data Cloud-Triggered Flow calling Create Consent.**

**Why:** The volume thresholds determine the mechanism, and the 50,000-row boundary is the same limit as the CSV import cap (Q13). After repairing, re-run Step 2 to confirm values match — and expect up to ~15 minutes of latency when reading updated records in Data Cloud.

> ⚠️ **Distractor logic:** "Use a CSV import for any volume" is the plausible-but-wrong answer — it breaks at the 50,000-row limit.

---

## Q51 — Consent Troubleshooting Step 5

**Question:** What is the final step of consent troubleshooting, and why does it matter?

**Answer:** **Prevent recurrence — audit flows for MessagingConsent/MessagingConsentV2 and replace with Create Consent; audit Data Streams and Batch Data Transforms targeting the Consent DLO and reroute through a Data Cloud-Triggered Flow; audit Ingestion API and custom integrations for direct Consent DMO writes.**

**Why:** Repairing individual records does not fix the systemic cause. Step 5 converts a one-off fix into a durable solution by eliminating the unsupported write paths entirely. If consent still is not honoured after re-writing through a supported method, engage Salesforce Support with the contact point value, Channel Type ID, DMO value, timestamp of the most recent write, and the identified write path.

---

## Related

- [[exam-revision-summary]] — Section 2 summary
- [[section-1-platform-setup-governance]] — previous guide
- [[section-3-data-identity-segmentation]] — next guide
- `Exam Section Based Flashcards/section-2-consent` — recall drilling