# Flashcards — Section 2: Consent (13%)

> **Exam weight: 13%.** Covers the consent model, consent DMOs, write paths, double opt-in, preference pages, audit trail, and channel rules.
> **Related concept pages:** [[consent-and-compliance]] · [[consent-data-model]] · [[consent-write-paths]] · [[consent-double-opt-in]] · [[consent-preference-pages]] · [[consent-audit-trail]] · [[consent-cache]] · [[consent-sync-3-flow]] · [[consent-channels-troubleshooting]]

---

## Core Consent Model

## Card: Consent Model Type
**Q:** What consent model does Marketing Cloud Next use?
**A:** **Strict opt-in** — the absence of an explicit "Yes" means the contact is **blocked**.

## Card: Consent Composite Key
**Q:** What three things make up the consent composite key?
**A:** **Subscription + Contact Point + Channel Type**.

## Card: Consent Tied To
**Q:** Is consent tied to the person or the contact point?
**A:** The **contact point** (email address, phone number, device ID) — not the person.

## Card: Consent Keying
**Q:** What is consent keyed on, and why is PartyID blank?
**A:** Keyed on **Contact Point value + CSCT ID**, not PartyID. PartyID is blank **by design** because one address can map to multiple individuals.

## Card: Shared Address Opt-Out
**Q:** What happens when two people share one email and one opts out?
**A:** The opt-out affects **everyone** on that address — there is no way to send to some and suppress others sharing the same contact point.

---

## Consent Objects (DMOs)

## Card: Five Consent DMOs
**Q:** Name the five consent-related DMOs.
**A:** **Contact Point** (address) · **Communication Subscription** (topic) · **Engagement Channel Type** (medium) · **Communication Subscription Channel Type** (delivery method) · **Communication Subscription Consent** (the opt-in/opt-out record).

## Card: CSC DMO
**Q:** What does the Communication Subscription Consent (CSC) DMO store?
**A:** The **current** consent status for a contact point + subscription + channel combination (updated in place).

## Card: Audit Trail vs DMO
**Q:** What is the key difference between the Consent Audit Trail and the CSC DMO?
**A:** The Audit Trail is **append-only** (full history of every change); the CSC DMO stores only the **current** status and is updated in place.

## Card: Audit Trail Fields
**Q:** What fields does the Consent Audit Trail capture?
**A:** TimeStamp, ConsentStatus, ContactPointValue, CSCT ID, and caller-provided source attribution.

## Card: Audit Trail Actor
**Q:** How do you attribute "who" made a consent change in the audit trail?
**A:** There is **no UserId/ActorId field**. Use caller-provided source attribution (ConsentCapturedSourceType, ConsentCapturedSourceName, ConsentCapturedSourceDetails, SenderId).

## Card: Audit Trail Deletion
**Q:** How do you delete audit trail rows for GDPR?
**A:** Use the Consent API **ShouldForget** endpoint on the Individual — async deletion reprocessed at **30/60/90 days**, then permanent.

---

## Methods to Create/Manage Consent

## Card: Four Consent Methods
**Q:** Name the four supported ways to create or manage consent.
**A:** 1) **Preference Pages** (subscriber self-service) · 2) **Consent Status LWC** (admin drops on layouts) · 3) **Consent Imports** (CSV) · 4) **Salesforce Flow** (Create Consent / Consent Request).

## Card: Create Consent Inputs
**Q:** What are the four input parameters of the Create Consent action?
**A:** Consent Status, Contact Point, Channel, and Communication Subscription.

## Card: Create Consent Availability
**Q:** In which flow types is Create Consent available?
**A:** **Automation Event-Triggered** flows (and Data Cloud-Triggered / On-Demand flows). ⚠️ Never use the legacy `MessagingConsent` action.

## Card: CSV Import Limit
**Q:** What is the CSV consent import limit and its intended purpose?
**A:** **50,000 rows** per file, intended for **one-time loads** — not sustained high-volume sync.

## Card: Unsupported Write Paths
**Q:** Name the unsupported consent write paths that cause stale consent.
**A:** Data Stream → Consent DLO · Bulk Ingestion API → Consent DMO · Batch Data Transform → DLO mapped to CSC DMO · legacy MessagingConsent/MessagingConsentV2.

## Card: Silent Dropout Trap
**Q:** ⚠️ What happens when external consent is mapped straight into the CSC DMO?
**A:** It **appears saved but is ignored at send time** — causing silent dropouts, compliance violations, and UI misalignment.

## Card: Consent At Scale
**Q:** What is the recommended 2-step process for consent at scale?
**A:** 1) Batch Data Transform → DLO (initial load). 2) **Data Cloud-Triggered Flow with Create Consent** to write consent so it is honoured at send time.

## Card: contactPointValue Error
**Q:** What does "contactPointValue provided value cannot be formatted" mean?
**A:** The Contact Point field must reference a contact point **value** (e.g., an email address), not a contact point **ID**.

---

## Send-Time Consent Cache

## Card: Consent Cache
**Q:** At send time, does Marketing Cloud Next read consent directly from the DMO?
**A:** No — it reads a **cache** keyed by recipient email. The cache is populated on a miss and used for **90 days** unless updated.

## Card: Cache Refresh Paths
**Q:** Which actions refresh the send-time consent cache?
**A:** Manual layout update · Unsubscribe link / Preference Center · CSV import · and (officially) the **Create Consent** flow activity. ⚠️ Direct DMO/DLO writes do **not** refresh the cache.

## Card: Stale Consent Trap
**Q:** ⚠️ Why can consent "look saved" yet still be stale at send time?
**A:** Because a direct DMO/DLO write (e.g., a mapped DLO import) does **not** refresh the send-time cache — the cache still holds the old value.

---

## Double Opt-In

## Card: Double Opt-In Steps
**Q:** What are the two steps of double opt-in?
**A:** 1) Submit the sign-up form and receive a **transactional** confirmation email. 2) Click the confirmation link to verify intent — only then is consent recorded.

## Card: DOI Email Type
**Q:** Why must the DOI confirmation email be Transactional?
**A:** Only **Transactional** emails can be sent to contacts without confirmed consent; a Promotional email would fail delivery.

## Card: Wait Until Event
**Q:** What does the Wait Until Event step monitor in a DOI flow?
**A:** The transactional confirmation email (flow action to monitor) and the opt-in confirmation link/CTA (link to monitor).

---

## Preference Pages & Channels

## Card: Preference Page Unsubscribe
**Q:** ⚠️ Why might Email Opt-Out Rate look lower than expected?
**A:** Preference Page unsubscribes are processed as **consent updates**, not Email Engagement Unsubscribe events — so they are excluded from the Email Opt-Out Rate.

## Card: Channel Opt-Out Scope
**Q:** What is the opt-out scope for Email, SMS, and WhatsApp?
**A:** Email = per subscription + channel · SMS = per **sender code** · WhatsApp = per contact point (blocked in-app).

## Card: Unsubscribe All
**Q:** Does "Unsubscribe from all" create a permanent block?
**A:** No — it does **not** persist as a permanent block.

## Card: Never Delete Subscription
**Q:** ⚠️ Why should you never delete a Communication Subscription?
**A:** Deleting it **destroys the audit trail** for that subscription.

## Card: Transactional Consent
**Q:** What are the consent rules for transactional email and transactional SMS?
**A:** Transactional email consent check is **off by default**, but selecting a Communication Subscription turns it on. Transactional SMS (OTP/2FA) **still requires consent** (TCPA).

## Card: Spam Complaint Opt-Out
**Q:** What does a spam complaint (FBL) plus Reply Mail Management opt the contact out of?
**A:** **All** current subscriptions — there is no channel-level or account-level opt-out today.

## Card: SMS Opt-Out Keywords
**Q:** What are the SMS opt-out keywords?
**A:** **STOP / QUIT / CANCEL / END / UNSUBSCRIBE**.

## Card: Consent Import Phone Format
**Q:** What phone format is required for consent imports?
**A:** **E.164** format.

---

## Consent Banner & Sync

## Card: Consent Banner Cookie
**Q:** What cookie does the consent banner use and how long does it last?
**A:** `sfmc_consent`, storing True/False for **365 days**.

## Card: First Page View Trap
**Q:** ⚠️ What is the consent banner trap on the first page view?
**A:** The **first page view is not recorded** when consent is required.

## Card: 3-Flow Consent Sync
**Q:** What is the rule for all Marketing Cloud Next consent writes in the 3-flow sync architecture?
**A:** All writes must use **Create Consent** (Data Cloud-Triggered or Automation Event-Triggered). ⚠️ Direct DMO field mapping is **ignored at send time**.

## Card: Consent Segmentation
**Q:** How do you segment on consent, and what is the cost implication?
**A:** Use a **Calculated Insight** workaround — it is metered and consumes credits.

---

## Related

- [[exam-revision-summary]] — Section 2 summary
- [[section-1-platform-setup-governance]] — previous deck
- [[section-3-data-identity-segmentation]] — next deck
- `flashcards/consent-management-deep-dive` · `flashcards/consent-cache-and-subscription-model` — topic-based deep dives