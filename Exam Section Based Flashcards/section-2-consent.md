# Flashcards — Section 2: Consent (13%)

> **Exam weight: 13%.** Covers the consent model, consent DMOs, write paths, double opt-in, preference pages, audit trail, and channel rules.
> **Related concept pages:** [[consent-and-compliance]] · [[consent-data-model]] · [[consent-objects-and-models]] · [[consent-data-streams]] · [[consent-write-paths]] · [[consent-double-opt-in]] · [[consent-preference-pages]] · [[consent-audit-trail]] · [[consent-cache]] · [[consent-sync-3-flow]] · [[consent-channels-troubleshooting]]

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

## Card: Three Consent Models
**Q:** ⚠️ How many consent models exist in a Salesforce org, and which does MC Next read?
**A:** **Three** — Salesforce Consent Data Model (legal basis), Data 360 consent objects (activation eligibility), and Communication Subscription Consent (MC Next sends). MC Next reads **only the third**, through the cache.

## Card: Consent Object Id Prefixes
**Q:** What are the Id prefixes for the three CRM consent objects?
**A:** Communication Subscription `0Xl` · Engagement Channel Type `0eF` · Communication Subscription Channel Type `0eB`. The consent record itself lives in **Data 360 only**.

## Card: Engagement Channel Type DMO
**Q:** ⚠️ Does Engagement Channel Type have a DMO?
**A:** **No.** Communication Subscription Channel Type carries an `ssot__EngagementChannelTypeId__c` with **no relationship attached** — the channel is a bare identifier on the Data 360 side.

## Card: Subscription Governance
**Q:** What four subscription rules must you get right at creation?
**A:** 1) **Scope can't change** (single BU or all BUs). 2) **Deleting a subscription deletes all its consent data**. 3) A new subscription **doesn't appear on the preference page** by default. 4) **No frequency capping** (`CommSubscriptionTiming` exists but isn't mapped).

## Card: The Party Field
**Q:** ⚠️ What is the state of the `Party` field on the consent DMO?
**A:** Wired end to end from the DLO but **always empty**. Never build on it — join to a person through the **Contact Point Email/Phone** DMO instead.

---

## Consent Data Streams

## Card: UnifiedMessagingConsent Data Kit
**Q:** What data kit carries consent, and how many streams does it install?
**A:** **`UnifiedMessagingConsent`** — it installs **two** streams: consent records (`MessagingConsentV2`) and audit trail (`ConsentAuditTrailV2`).

## Card: Duplicate Consent Streams
**Q:** ⚠️ What are the two ways an org ends up with duplicate consent records for the same contact point + subscription?
**A:** 1) The documented pre-Summer '25 **generation switch** (`MessagingConsent` → `MessagingConsentV2`). 2) The **org-ID naming quirk** — Salesforce appended the org ID to stream names, both spellings stayed active, so even a V2-only org gets duplicates.

## Card: DLO Name Portability
**Q:** ⚠️ Why is no consent DLO name portable?
**A:** The **org ID is appended** to the stream name, so it differs per org (and changes when the org ID changes). Always read the actual stream name in your org before copying any query or transform.

## Card: V2 Field Mapping
**Q:** What are the key fields in the V2 consent stream → DMO mapping?
**A:** `ConsentId` (primary key = contact point value + CSCT Id) · `ConsentCapturedDateTime` (when the person decided) ≠ `UpdatedTime` (when the row changed) · `PartyId` mapped to `Party` but empty.

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
**A:** **Data Cloud-Triggered**, **Automation Event-Triggered**, and **On-Demand** flows (plus **Record-Triggered** from Winter '27). ⚠️ Never use the legacy `MessagingConsent` action.

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

## Card: Consent-Check Applicability
**Q:** ⚠️ Which message types require a consent check?
**A:** Promotional email **required** · transactional email **not required** · promotional SMS/WhatsApp/RCS **required** · transactional SMS/WhatsApp/RCS **required**. Separate switches under Setup → email channel settings.

## Card: Disabling Consent Checks
**Q:** What must you accept to disable consent checks, and what does the change not affect?
**A:** You must **affirm in writing that you accept responsibility** for compliance problems. ⚠️ The change **doesn't affect active flows** — anything already running keeps checking.

## Card: SMS/WhatsApp/RCS Granularity
**Q:** ⚠️ How does SMS/WhatsApp/RCS opt-out granularity differ from email?
**A:** Each code/number/agent maps to **one or more subscriptions**, and opting out of the channel opts out of **all** mapped subscriptions — there is no per-subscription opt-out over SMS. **RCS exception:** can reuse existing SMS consent when the use case matches.

## Card: Compliance BCC vs CC
**Q:** How do Compliance BCC and CC recipients behave with consent checks?
**A:** **Compliance BCC** is excluded from consent checks entirely (it doesn't represent a person). **CC recipients** are suppressed if the primary recipient lacks consent.

## Card: Consent Read Latency
**Q:** How long do consent changes take to appear in the DMO?
**A:** **Minutes** (up to a couple of hours with Consent Changes in flows) — long enough that a test looks like it failed when it has only just started.

## Card: What You Can't See
**Q:** What four things can you currently not see about consent?
**A:** 1) The **cache**. 2) **Who** changed a record (no actor field). 3) **Consent history** on the record. 4) Anything in the **Party** field. (Plus: the component shows only the 100 most recent records.)

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

## Consent Granularity & Preference Pages

## Card: Four Consent Granularity Levels
**Q:** Name the four levels of consent granularity.
**A:** **L1** = entire individual record (all channels/subscriptions/points) · **L2** = a channel as a whole (all email) · **L3** = a specific contact point value · **L4** = a specific contact point **+** a specific subscription type.

## Card: Which Level MC Next Enforces
**Q:** Which consent level does Marketing Cloud Next enforce?
**A:** ⚠️ **Level 4** — the most granular (contact point + subscription type).

## Card: The Four Consent Objects
**Q:** Name the four objects that manage Level 4 consent.
**A:** **Communication Subscription** (purpose/category) · **Communication Subscription Channel Type** (subscription + channel) · **Communication Subscription Consent** (the consent record) · **Engagement Channel Type** (email/SMS/WhatsApp/RCS).

## Card: Preference Page Channel Rule
**Q:** How does the message channel affect preference pages?
**A:** The channel **automatically determines** the page: **email** → email preference manager; **SMS** → separate SMS-specific page. ⚠️ No unified cross-channel page out-of-the-box.

## Card: Preference Page Limitations
**Q:** Name four limitations of out-of-the-box preference pages.
**A:** No **unified cross-channel** page · no **native multilingual** support · no **custom code** (AMPscript/Apex/server-side JS) · can't **pre-populate from URL parameters**.

## Card: Preference Page Releases
**Q:** What did Spring and Summer add to preference pages?
**A:** **Spring** = custom preference pages. **Summer** = **multiple** preference pages (e.g., per brand).

## Card: Standard Subscription Block Limits
**Q:** What can't you edit in the standard subscription block?
**A:** **Button labels, headings, subheadings**, and the **order of the subscription list**. Partial workaround: **rename the subscriptions from the Consent tab**.

---

## Related

- [[exam-revision-summary]] — Section 2 summary
- [[section-1-platform-setup-governance]] — previous deck
- [[section-3-data-identity-segmentation]] — next deck
- `flashcards/consent-management-deep-dive` · `flashcards/consent-cache-and-subscription-model` — topic-based deep dives