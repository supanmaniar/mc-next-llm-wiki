# Consent Cache (Send-Time Source of Truth)

## Core Idea
At send time, Marketing Cloud Next does **not** read the Communication Subscription Consent (CSC) DMO directly — it reads a **consent cache** keyed by the recipient's email address, populated on demand, valid for **90 days**, and only refreshed by **supported write paths**.

## Prerequisites
- [[consent-data-model]]
- [[consent-and-compliance]]
- [[consent-write-paths]]

## Detailed Explanation

### Why a Cache?
Consent sits in Data Cloud as a DMO and is written through flows, imports, and preference pages. Reading the DMO on every email send would be slow and inconsistent (and would push read load onto Data Cloud at campaign time). Instead, MC Next keeps a fast **cache** in front of the consent data.

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

## Active Recall Questions
1. What does MC Next consult at send time to decide if a recipient may receive an email?
2. What happens on a cache miss?
3. How long is a consent cache value used before it expires?
4. Which four consent update methods refresh the cache?
5. What happens if you write consent directly into the CSC DMO via a mapped DLO?

## Related Concepts
- [[consent-data-model]]
- [[consent-write-paths]]
- [[consent-and-compliance]]
- [[consent-audit-trail]]
- [[consent-double-opt-in]]
- [[email-sending-setup]]

## Source References
- `sources/Consent_Management_MCNext_DeepDive.md` (Deep Dive #022, the-agentic-marketer.com — "Consent Management in Marketing Cloud Next explained", edit 31/01/2026)