# Consent Write Paths

## Core Idea
Only a handful of **supported methods** correctly write consent so it's honored at send time — everything else (direct DLO/DMO writes, legacy MessagingConsent actions) can silently produce stale or wrong consent.

## Prerequisites
- [[consent-data-model]]
- [[consent-and-compliance]]
- [[campaigns-and-flows]]

## Detailed Explanation

### The Create Consent / Consent Request Action
The **Create Consent** action element updates the consent status for the contact point related to a unified individual in a flow. For a specific channel + communication subscription combination, you can set a contact point's consent status to **Opt In** or **Opt Out**.

**Input parameters:**
- **Consent Status** — the status to assign (Opt In / Opt Out)
- **Contact Point** — contact info used to receive marketing (email/phone); you can update multiple contact points with a single action
- **Channel** — the marketing channel (email, SMS); each contact point relates to one channel
- **Communication Subscription** — the type of marketing content the consent allows (e.g., weekly newsletter)

**Editions:** Enterprise and Unlimited with Marketing Cloud Growth or Advanced; all editions supported by Data 360.

**Where it's available (currently only these flow types):**
- Data Cloud-Triggered Flows
- Automation Event-Triggered Flows
- On-Demand Flows

For a Lead/Contact create-or-update use case, use an Automation Event-Triggered Flow with the "Prospect, Lead, Contact or Related Record Change" event.

### Supported Methods for Creating/Updating Consent
**1) Manually**
- Bulk import of consent data (CSV, up to 50,000 rows/file) — best for one-time loads
- Manual updates in the Consent Status component on individual records

**2) End user updates**
- Unsubscribe URLs in emails
- Preference Page submissions
- Opt outs from SMS/WhatsApp
- Landing Page form submissions (when paired with an Automation Event-Triggered Flow + Consent Request action)

**3) Specific Flow actions**
- **Consent Request** action (also labeled **Create Consent**) in Automation Event-Triggered Flows (incl. Form-Triggered) or On-Demand Flow
- **Create Consent** action in Data Cloud-Triggered Flows

### Unsupported Methods (cause stale consent)
Avoid these — they can result in consent not honored at send time:
- Data Stream mapped directly to the Consent Data Lake Object (DLO)
- Data Cloud Bulk Ingestion API writing directly to the Consent DMO
- Data Cloud Batch Data Transforms updating a DLO mapped to the CSC DMO
- Legacy `MessagingConsent.MessagingConsent` and `MessagingConsentV2.MessagingConsent` flow actions (write directly to the DLO)

**Consequences of unsupported writes:**
- Consent may not be respected during sends even though it appears saved in the CSC DMO
- An email may not send even though the address appears opted in (or may send inadvertently when opted out)
- The CSC DMO may not align with the Consent Status component on individual records
- Possible additional Data Cloud Data Services Credits charges from incorrectly mapped fields

### Consent at Scale (Millions of Records)
The CSV import tool is limited to 50,000 rows/file — not suited to enterprise-scale loads. Recommended 2-step process:

1. Complete the initial data load into Data Cloud. A **Batch Data Transform** can create records in the consent DLO from contact/lead records.
2. Then use a **Data Cloud-Triggered Flow with the Create Consent action** to write consent so it's honored at send time.

**Non-Salesforce primary data (Snowflake, Databricks, Azure):**
1. Land source data in Data Cloud (Data Stream or Bulk Ingestion API) — populates Data Cloud but doesn't write consent yet.
2. Stage consent rows for a Data Cloud Record-Triggered Flow using a Batch Data Transform.
3. Run the Data Cloud Record-Triggered Flow with Create Consent — the supported write path.

**Alternate write path:** For programmatic ingestion driven by an external system, an **On-Demand Flow** can be invoked via REST and supports Create Consent/Consent Request.

### Bulk Import Behavior
- For loads ≤50,000 rows, use the Consent tab import wizard — updates consent correctly and reflects mailable status within ~2 minutes. CSV only.
- Imports with validation errors (e.g., "contactPointValue provided value cannot be formatted") can stay "In Progress" indefinitely; there's no option to skip bad rows — a clean file is required.
- ⚠️ Don't mix a direct-to-DLO bulk load with out-of-the-box tools (Preference Page, Create Consent, one-click unsubscribe, LWC) for the same records — this can make consent values inconsistent.

### Troubleshooting a Flow That Doesn't Create/Update Consent
- If the flow was created **before May 2026** and includes a reference element (text variable or Get Records), this is a fixed bug. Fix: create a new version, click the consent action (no changes needed), activate the new version.
- **"contactPointValue provided value cannot be formatted"** — the Contact Point field must reference a contact point value (e.g., an email address), **not** a contact point ID (e.g., Contact Point Email ID).

## Common Pitfalls / Misconceptions
⚠️ Never use `MessagingConsent` / `MessagingConsentV2` actions — they're not supported and cause stale consent.
⚠️ Direct-to-DLO/DMO writes (Data Stream, Bulk Ingestion API, Batch Data Transform) are unsupported.
⚠️ The Contact Point field takes a contact point **value**, not an ID.
⚠️ CSV import is capped at 50,000 rows and intended for one-time loads, not sustained sync.
⚠️ At send time the source of truth is a **cache**, not the DMO — direct DMO writes don't refresh it. See [[consent-cache]].

## Active Recall Questions
1. What are the four input parameters of the Create Consent action?
2. In which three flow types is Create Consent/Consent Request available?
3. What are the three categories of supported consent write methods?
4. What's the recommended 2-step process for consent at scale?
5. What does the "contactPointValue provided value cannot be formatted" error mean?

## Related Concepts
- [[consent-data-model]]
- [[consent-double-opt-in]]
- [[consent-sync-hybrid]]
- [[consent-sync-3-flow]]
- [[consent-and-compliance]]
- [[consent-cache]]
- [[campaigns-and-flows]]

## Source References
- User-provided "Create Consent Marketing Flow Element" article
- User-provided "Consent Management: How Consent is Stored and Written" article
- User-provided "Consent Management: Consent at Scale and Data Ingestion" article
- User-provided "Troubleshooting Marketing Flows That Contain the Create Consent Action" article