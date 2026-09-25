# Flashcards — Consent Cache & Subscription Model (MC Next Deep Dive #022)

## Card: Send-Time Source of Truth
**Q:** At send time, what is the actual source of truth for consent in Marketing Cloud Next?
**A:** A cache, not the DMO directly. MC Next checks the cache for a Consent Record matching the recipient's email address; only on a miss does it query the Communication Subscription Consent and populate the cache.

## Card: Cache Miss Behavior
**Q:** What happens on a consent cache miss?
**A:** The Communication Subscription Consent is queried and the cache populated with that recipient's consent value.

## Card: Consent Cache Retention
**Q:** How long is a consent cache value used for?
**A:** 90 days, unless it is updated through a supported path that refreshes the cache.

## Card: Cache-Refreshing Update Methods
**Q:** Which consent update methods refresh the consent cache?
**A:** Manual update from Lead/Contact layouts (Privacy Consent Status LWC), Unsubscribe link / Preference Center, CSV import, and the Create Consent flow activity (official).

## Card: Flow Activities and the Cache
**Q:** Which Flow activity officially refreshes the consent cache, and which one is not guaranteed?
**A:** Create Consent is the only officially supported one. MessagingConsentV2.MessagingConsent 'seems' to work but has no official guarantee.

## Card: Direct DMO Write and the Cache
**Q:** What happens if you write consent directly into the Communication Subscription Consent DMO (e.g., via a mapped DLO)?
**A:** The write does not update the cache, so the new consent can be ignored at send time (stale consent up to the 90-day expiry).

## Card: Stale Cache Symptom
**Q:** What is the symptom of a stale consent cache?
**A:** A recipient can keep receiving email even though the CSC DMO shows Opted Out (or a new Opt In may not be honored) until the cache entry is refreshed or expires.

## Card: CSC DMO Primary ID
**Q:** How is the primary Id of the Communication Subscription Consent DMO formed?
**A:** Forged from the Contact Point and the Comm Subscription Channel Type (e.g., contact+002@bamsoo.com#0eBbF00000000HlUAI).

## Card: Implicit Opt-Out Default
**Q:** What is MC Next's consent default when no record is found for a Contact Point / Subscription / Channel?
**A:** Implicit Opt Out — the recipient is assumed opted out.

## Card: Subscription ↔ Channel Records
**Q:** Which DMO stores the mapping of a Subscription to its Engagement Channels, and how is the combination identified?
**A:** Communication Subscription Channel Type DMO (CommSubscriptionChannelType_Home DSO); each row is a subscription + engagement channel combination, uniquely identified by Comm Subscription Channel Type Id.

## Card: Engagement Channel Type DMO
**Q:** Which DMO defines Engagement Channels themselves, and what do its record IDs start with?
**A:** Engagement Channel Type DMO (EngagementChannelType_Home DSO); records start with `0eF`.

## Card: V1/V2 DSO Mapping
**Q:** After Summer '25, why might a Contact Point show 2 consent records for the same Subscription + Channel?
**A:** The CSC DMO can map to both MessagingConsent and MessagingConsentV2 DSOs. Since Summer '25 only the V2 DSO is written; instances created earlier can have two records, each with a distinct Data Source.

## Card: V1 Record Update Behavior
**Q:** When you modify consent and the existing record was created via the V1 system, what happens?
**A:** The existing V1 record is not updated; a new record is created with V2 as the Data Source. MC Next always uses the latest record as the current Consent Status.

## Card: Test Email Unsubscribe Token
**Q:** What is dummyCsctToken used for?
**A:** Unsubscribing from a Test Email — it is a placeholder Comm Subscription Channel Type.

## Card: Privacy Consent Status Component
**Q:** How does the Privacy Consent Status component determine what to display?
**A:** For each Subscription, it checks the CSC DMO for a related record (same Email Address + Subscription, Email Engagement Channel `0eB…`); displays the latest record's status, or Opted Out if none exists (implicit).

## Card: Five Consent Modification Methods
**Q:** Name the five ways to modify the Consent Status.
**A:** 1) Manual (Privacy Consent Status component dropdown) 2) Unsubscribe link in email 3) Preference Center in email 4) Import (CSV, Consent menu) 5) Flow (Segment Triggered or Automation Triggered; e.g., 2-step DOI).

## Card: Unsubscribe Link Requirement
**Q:** What does every Promotional Email require, and is there two-click unsubscribe?
**A:** At least one Unsubscribe link (or alternatively a Preference Center link), and clicking immediately opts out — there is no two-click unsubscribe in MCG/A so far.

## Card: Multi-Address Consent Choice
**Q:** A Unified Individual has several email addresses — how is their per-subscription consent status determined?
**A:** There is no single correct answer; it's a business choice. A clarifying pattern is to build a new DMO related to Unified Individual holding every address + its current status per subscription, surfaced via Data Cloud Profile Related Records on Lead/Contact layouts.

## Card: Audit Trail Object Names
**Q:** Which DLO stores consent history, and is it mapped to a DMO?
**A:** ConsentAuditTrailV2-ConsentAuditTrail (previously the non-V2 version, unused since Summer '25); it is NOT mapped to any DMO and acts as append-only history, while the CSC DMO is upsert (current state).

## Related
- [[consent-cache]]
- [[consent-and-compliance]]
- [[consent-data-model]]
- [[consent-write-paths]]
- [[consent-audit-trail]]
- [[consent-double-opt-in]]
- [[consent-preference-pages]]
- [[consent-setup-billing]]
- [[consent-channels-troubleshooting]]
- [[consent-management-deep-dive]]