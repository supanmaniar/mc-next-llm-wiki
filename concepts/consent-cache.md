# Consent Cache (Send-Time Source of Truth)

## Core Idea
At send time, Marketing Cloud Next does **not** read the Communication Subscription Consent (CSC) DMO directly — it reads a **consent cache** keyed by the recipient's email address, populated on demand, valid for **90 days**, and only refreshed by **supported write paths**.

## Prerequisites
- [[consent-data-model]]
- [[consent-and-compliance]]
- [[consent-write-paths]]

## Detailed Explanation

### Why a Cache?
Consent sits in Data Cloud as a DMO and is written through flows, imports, and preference pages. Reading the DMO on every email send would be slow and inconsistent (and would push read load onto Data Cloud at campaign time). A per-recipient DMO query across a 400,000-recipient send would be brutal on latency and cost, and consent for any given address changes rarely. Instead, MC Next keeps a fast **cache** in front of the consent data.

⚠️ **The cache is the one part of this topic Salesforce does not document.** The official material describes methods that cause stale consent, lists which writes are safe, and describes the failures that follow — without ever naming the mechanism or stating a retention period. The read path and the 90 days come from practitioners (Elliot Harper's LinkedIn series and a Mavlers write-up, May 2026), described identically and independently — well corroborated rather than official.

### You Cannot See or Flush the Cache
The problem with the design is not the caching itself, it's the opacity:
- You **cannot see** the cache.
- You **cannot flush** it.
- You **cannot tell** from any interface whether the value the send engine holds matches the value you're looking at.

So "the DMO says opted out" tells you considerably less than you'd expect about whether the email goes out.

### The Send-Time Flow (3 steps + retention)
1. **Email is sent** → MC Next checks the cache for a Consent Record matching the recipient's email address.
2. **Cache hit** → the cached consent is used.
3. **Cache miss** → the **Communication Subscription Consent** is queried and the cache **populated** for that email.
4. **Retention:** the cached value is used for **90 days**, *unless it is updated* (cache refresh happens only on supported updates, below).

### ⚠️ Not Every Consent Update Refreshes the Cache
The cache is not invalidated automatically by every write path. From the five methods that modify the Consent Status:

| Update method | Cache handled? |
|---------------|----------------|
| Manual update from **Lead / Contact layouts** (Privacy Consent Status LWC) | ✅ Yes |
| **Unsubscribe link / Preference Center** in email | ✅ Yes |
| **CSV import** (Consent menu) | ✅ Yes |
| **Flows — Create Consent activity** | ✅ Officially yes |
| **Flows — MessagingConsentV2.MessagingConsent activity** | ⚠️ *Seems* to work, but **no official guarantee** |
| **Direct write into the CSC DMO** (e.g., importing data into a DLO mapped to it) | ❌ No — cache stays stale |

**Consequences of a stale cache:**
- A record may appear Opted Out in the CSC DMO (e.g., a direct bulk load), yet the recipient **keeps receiving email** because the old Opted-In value is still in the cache (up to 90 days).
- Conversely, an Opted In written outside a supported path may not begin sending until the cache entry ages out or is refreshed.

### Relationship to the "supported write paths" rule
This is the send-time mechanism behind the existing golden rule in [[consent-write-paths]]: **unsupported writes can appear saved but be ignored at send time**. The cache is *why* the caveat "(unless it was created using the V1 system…)" and the warning about direct DMO writes exist — the DMO may be current while the cache is not.

## Common Pitfalls / Misconceptions
⚠️ **The DMO is not consulted directly at send time** — the cache is the source of truth for the send engine.
⚠️ A direct-to-DLO/DMO consent load (mapped DLO) **does not refresh the cache**, so it can look saved yet not be honored for up to 90 days.
⚠️ Only **Create Consent** officially refreshes the cache in Flows. `MessagingConsentV2.MessagingConsent` is **not officially guaranteed** (even though it may appear to work).
⚠️ Cache freshness is **per email address** — a shared address (household) can keep a stale consent for all individuals sharing it.
⚠️ The cache is **invisible and cannot be flushed** — there is no way to inspect what the send engine currently believes about an address.

### Open Question (unresolved)
Does the 90-day clock run from the **write** or from the **last read**, and does a send refresh the entry? If it resets on read, then 90 days is a **floor rather than a ceiling**, and a frequently mailed address could hold a stale value for far longer than three months. No official answer exists.

## Active Recall Questions
1. What does MC Next consult at send time to decide if a recipient may receive an email?
2. What happens on a cache miss?
3. How long is a consent cache value used before it expires?
4. Which four consent update methods refresh the cache?
5. What happens if you write consent directly into the CSC DMO via a mapped DLO?

## Related Concepts
- [[consent-data-model]]
- [[consent-objects-and-models]]
- [[consent-data-streams]]
- [[consent-write-paths]]
- [[consent-and-compliance]]
- [[consent-audit-trail]]
- [[consent-double-opt-in]]
- [[email-sending-setup]]

## Source References
- `sources/Consent_Management_MCNext_DeepDive.md` (Deep Dive #022, the-agentic-marketer.com — "Consent Management in Marketing Cloud Next explained", edit 31/01/2026)
- `sources/Consent_Management_MCNext_SzymonLewandowski.md` — "Consent Management in Marketing Cloud Next" (Szymon Lewandowski, 20 Sep 2026)