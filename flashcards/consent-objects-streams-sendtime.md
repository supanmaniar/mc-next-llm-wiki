# Flashcards — Consent Objects, Streams & Send-Time Rules (Szymon Lewandowski)

## Card: The Three Rules of MC Next Consent
**Q:** What three rules explain almost everything about consent in Marketing Cloud Next?
**A:** 1) Consent attaches to a **contact point value**, not a person. 2) **No consent record means opted out**. 3) At send time the source of truth is a **cache**, not the record.

## Card: Consent Attaches To
**Q:** What does consent attach to in MC Next, and what does it NOT attach to?
**A:** It attaches to a **Contact Point Value** (email address, or phone in E.164). It does **not** attach to an Individual, Unified Individual, or CRM Prospect/Lead/Contact — and it isn't duplicated in CRM.

## Card: Why Key on the Address
**Q:** Why does Salesforce key consent on the address rather than the person?
**A:** When several individuals share a contact point (e.g. `office@acme.com`), keying on the person forces the platform to decide whose preference wins. Keying on the address gives the **more restrictive default** — an opt-out is binding for everyone behind it, which is how regulators look at it.

## Card: Changing an Email Address
**Q:** What happens to consent when someone changes their email address?
**A:** Their consent is **stranded on the old address**. The new address has no record, which means **opted out**.

## Card: Deleting a Contact
**Q:** What happens to the consent record when you delete the Contact?
**A:** The consent record **stays in Data 360**, keyed to an address that no longer appears anywhere in your CRM.

## Card: Day-One Database State
**Q:** On the day you switch Marketing Cloud Next on, what is the consent state of your existing database?
**A:** **Entirely opted out** — no consent record means opt-out, so the whole base starts suppressed until you import consent.

## Card: Custom Flag Fields
**Q:** Can you drive commercial sends from custom flag fields on Contact or Lead?
**A:** No. There is no supported path. Custom flags can **feed** the standard model through a flow, but they cannot **replace** it — updating those objects alone does nothing at send time.

## Card: Consent Import Combinations
**Q:** How many CSV files do you need for two subscriptions across email and SMS, with both opt-in and opt-out?
**A:** **Eight** — each file covers exactly one channel, one subscription and one status (2 subscriptions × 2 channels × 2 statuses).

## Card: Earlier Consent Date
**Q:** What happens if you import a consent date earlier than the one already on the record?
**A:** The platform **ignores it**. The row still imports, nothing fails, nothing warns you — and the date you think you loaded is not the date that's there.

## Card: Two Statuses Only
**Q:** How many consent statuses does the MC Next record support, and what does the CRM object carry instead?
**A:** Only **two** — opt-in and opt-out, nothing in between. The CRM `CommSubscriptionConsent` object (the empty one) carries **OptInPending / OptOutPending** since API 58.0 — every state a double opt-in flow could want, on the object that has no bearing on sends.

## Card: Consent Check Applicability
**Q:** Which message types require a consent check?
**A:** Promotional email **required**; transactional email **not required**; promotional SMS/WhatsApp/RCS **required**; transactional SMS/WhatsApp/RCS **required**.

## Card: Disabling Consent Checks
**Q:** What must you accept to disable consent checks entirely, and what does the change not affect?
**A:** You must **affirm in writing that you accept responsibility** for compliance problems. ⚠️ The change **does not affect active flows** — anything already running keeps checking.

## Card: SMS/WhatsApp/RCS Granularity
**Q:** How does SMS/WhatsApp/RCS opt-out granularity differ from email?
**A:** Each SMS code, WhatsApp number and RCS agent maps to **one or more subscriptions**, and opting out of the channel opts the person out of **every subscription mapped to it**. There is no per-subscription opt-out over SMS.

## Card: RCS Exception
**Q:** What is the one exception to the one-channel-one-consent rule?
**A:** **RCS** — Salesforce says you can reuse existing SMS consent when the messaging use case stays the same, and tells you to check that with your legal team.

## Card: Compliance BCC vs CC
**Q:** How do Compliance BCC and CC recipients behave with consent checks?
**A:** **Compliance BCC** is excluded from consent checks entirely (it doesn't represent a person). **CC recipients** are suppressed if the primary recipient doesn't get the email because the address lacks consent.

## Card: Three Consent Models
**Q:** What are the three consent models in Salesforce, and which does MC Next read?
**A:** 1) Salesforce Consent Data Model (legal basis). 2) Data 360 consent objects (activation eligibility). 3) Communication Subscription Consent (MC Next sends). MC Next reads **only the third**, through the cache.

## Card: Four Consent Objects & Prefixes
**Q:** Name the four consent objects and the Id prefixes of the first three.
**A:** Communication Subscription (`0Xl`), Engagement Channel Type (`0eF`), Communication Subscription Channel Type (`0eB`), Communication Subscription Consent (no prefix). The first three are **CRM objects**; the consent record lives in **Data 360 only**.

## Card: CRM Object Age
**Q:** Since which API version have `CommSubscription` and `CommSubscriptionConsent` existed?
**A:** **API 48.0** (Spring '20) — roughly five years before Marketing Cloud Next existed.

## Card: Engagement Channel Type DMO
**Q:** Does Engagement Channel Type have a DMO?
**A:** **No.** Communication Subscription Channel Type carries an `ssot__EngagementChannelTypeId__c` with **no relationship attached** — on the Data 360 side the channel is a bare identifier pointing nowhere.

## Card: Subscription Scope
**Q:** Can you change a subscription's scope after creation?
**A:** **No.** With business units (Advanced), a subscription is assigned to a single BU or all BUs, and the scope **cannot be edited after creation**. It also limits which channels you can add.

## Card: Deleting a Subscription
**Q:** What happens when you delete a Communication Subscription?
**A:** It **deletes all of its consent data** — a legal exposure, not just an admin inconvenience. Salesforce's recommendation is simply not to delete subscriptions once consent has been collected.

## Card: New Subscription & Preference Page
**Q:** Does a new subscription automatically appear on the preference page?
**A:** **No.** MC Next ships **one** customizable email preference page containing only the default marketing subscription. Adding subscriptions to it is a **separate step** after creation.

## Card: Frequency Capping
**Q:** Does MC Next support frequency capping on a subscription?
**A:** **No.** The platform has a `CommSubscriptionTiming` object for exactly this, but MC Next **doesn't map it**. Send-frequency rules live in your journey logic or segment.

## Card: The Join Key
**Q:** What is the whole join key for a consent record, and what does it make possible/impossible?
**A:** **Contact point value + Communication Subscription Channel Type Id**. Searching consent by **email address works**; searching it by **person doesn't**. The consent DMO has exactly one traversable relationship (N:1 to CSCT).

## Card: The Party Field
**Q:** What is the state of the `Party` field on the consent DMO?
**A:** It's an out-of-the-box relationship between `Individual.Id` and `CommunicationSubscriptionConsent.Party`, wired end to end from the DLO — and **always empty**. Never build on it.

## Card: Joining Consent to a Person
**Q:** How do you correctly join a consent record back to a person?
**A:** Through the **Contact Point Email** or **Contact Point Phone** DMO (which carry the PartyId mapping), matching on the contact point value — the same way the Privacy Consent Status component does it.

## Card: Consent DMO Namespaces
**Q:** What are the two namespaces of the consent DMO, and why does it matter?
**A:** The older `ssot__CommunicationSubscriptionConsent__dlm` and the newer `std__CommunicationSubscriptionConsentDmo__dlm` (API version 254). Their **field lists are not identical** — the public reference for the older one lists `ssot__ContactPointId__c` and **no contact point value field at all**.

## Card: UnifiedMessagingConsent Data Kit
**Q:** What is the name of the data kit that carries consent, and how many streams does it install?
**A:** **`UnifiedMessagingConsent`** — it installs **two** data streams: one for the consent records (`MessagingConsentV2`) and one for the audit trail (`ConsentAuditTrailV2`).

## Card: Two Ways to Get Duplicate Streams
**Q:** What are the two ways an org ends up with duplicate consent records for the same contact point and subscription?
**A:** 1) The **documented generation switch** (pre-Summer '25 orgs moved `MessagingConsent` → `MessagingConsentV2`). 2) The **org-ID naming quirk** — Salesforce appended the org ID to stream names, both spellings stayed active, so even a V2-only org gets duplicates.

## Card: Duplicate Streams & Queries
**Q:** Why is the org-ID naming quirk dangerous for queries?
**A:** Send-time behaviour is fine (**latest record wins**), but a naive `SELECT` against the DMO returns **both rows** with no signal which one the platform acted on — unexplained duplicate rows in consent exports.

## Card: DLO Name Portability
**Q:** Why is no consent DLO name portable?
**A:** The org ID is appended to the stream name, so the name differs per org (and changes when the org ID changes). **Nothing that references the consent DLO by name is portable** — not a Data Transform, saved query, Calculated Insight, or runbook.

## Card: V2 Field Mapping
**Q:** What are the key fields in the V2 consent stream → DMO mapping?
**A:** `ConsentId` (primary key = contact point value + CSCT Id), `ConsentCapturedDateTime` (when the person decided) and `UpdatedTime` (when the row changed) as **separate** fields, and `PartyId` mapped to `Party` (carrying nothing). Ten fields mapped, seventeen left unmapped.

## Card: The Consent Service
**Q:** What is the one rule governing consent writes?
**A:** **Only writes that go through the consent service count.** The service writes into a DLO mapped to the CSC DMO and updates the cache. Everything else produces a row and changes nothing in the cache.

## Card: Supported Write Methods
**Q:** Name the supported consent write methods.
**A:** Bulk CSV import (50k rows/file), Privacy Consent Status component, unsubscribe URLs / preference pages / SMS & WhatsApp opt-outs, landing page forms paired with an Automation Event-Triggered Flow, and the Consent Request / Create Consent flow action.

## Card: Create Consent in Record-Triggered Flows
**Q:** When did the Consent Request element become available in Record-Triggered Flows?
**A:** **Winter '27 Release** — with some orgs receiving the option before the official release window.

## Card: Unsupported Write Methods
**Q:** Name the unsupported consent write methods and why they fail.
**A:** Data stream mapped directly to the consent DLO; Bulk Ingestion API writing to the consent DMO; Batch Data Transforms updating a mapped DLO; legacy `MessagingConsent`/`MessagingConsentV2` flow actions; external systems writing into the consent DMO. All **bypass the consent service**.

## Card: Bidirectional Failure
**Q:** How does an unsupported write fail, and does anything error?
**A:** It fails **in both directions** — an email may fail to send to an address that appears opted in, and may send to an address that appears opted out. The DMO can also disagree with the Privacy Consent Status component. **Nothing errors anywhere.**

## Card: Fixing a Bad Write
**Q:** How do you fix consent written through an unsupported path?
**A:** There is **no cache flush** — re-issue every affected consent change through a supported method. Small sets: the component. Larger: a **Data Cloud-Triggered Flow calling Create Consent** across the affected population, or CSV import as a replay tool.

## Card: Where to Find Consent Data
**Q:** Where can you find consent data?
**A:** On the record via the **Privacy Consent Status** component (Lead/Contact/Person Account); in **Data Explorer** against the CSC DMO (search on contact point value); in **Query Editor** for joins and audit-trail data (Data Explorer won't show the audit trail).

## Card: What You Can't See
**Q:** What four things can you currently not see about consent?
**A:** 1) The **cache**. 2) **Who** changed a record (no actor field). 3) **Consent history** on the record. 4) Anything in the **Party** field. (Plus: the component shows only the 100 most recent records.)

## Card: Consent Read Latency
**Q:** How long do consent changes take to appear in the DMO?
**A:** **Minutes** — long enough that a test looks like it failed when it has only just started, and long enough that people retry the write and create a second problem. With Consent Changes in flows, up to a couple of hours.

## Card: Undoing a Bad Import
**Q:** How do you undo a bad initial consent import?
**A:** You can't self-serve — **audit trail rows cannot be deleted through any self-service route**, so it means opening a case with Salesforce Support. Plan the initial import as if you cannot undo it.

## Card: Open Question — Cache Clock
**Q:** What is the unresolved question about the 90-day cache clock?
**A:** Whether it runs from the **write** or the **last read**, and whether a send refreshes the entry. If it resets on read, 90 days is a **floor rather than a ceiling**.

## Card: Open Question — Merging Contacts
**Q:** What is the unresolved question about merging Contacts?
**A:** What happens to consent when two Contacts with **different email addresses** are merged. Nothing in the documentation covers it, and it matters to anyone running deduplication at scale.

## Related
- [[consent-objects-and-models]]
- [[consent-data-streams]]
- [[consent-data-model]]
- [[consent-write-paths]]
- [[consent-cache]]
- [[consent-audit-trail]]
- [[consent-channels-troubleshooting]]
- [[consent-and-compliance]]
