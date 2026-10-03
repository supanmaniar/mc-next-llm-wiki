# Consent Data Streams

## Core Idea
Consent records reach the Communication Subscription Consent (CSC) DMO through the **`UnifiedMessagingConsent` data kit**, which installs two data streams (consent records + audit trail) — and in most orgs you will find **two active generations of each stream feeding the same DMO**, so every query must deduplicate on the latest record.

## Prerequisites
- [[consent-data-model]]
- [[consent-write-paths]]
- [[data-kits-and-data-streams]]
- [[data-architecture-layers]]

## Detailed Explanation

### The Route Consent Takes
Consent records don't appear in the DMO by magic. Every **supported** write goes through Marketing Cloud Next's own **consent service**:

1. The service writes into a **data lake object (DLO)** — a raw landing table.
2. That DLO is **mapped to the Communication Subscription Consent DMO**.
3. The service is also what **updates the cache** — which is why the *route* matters more than the *result*.

The data kit that carries all of this is called **`UnifiedMessagingConsent`**, and it installs **two data streams**:
- one for the **consent records** themselves (`MessagingConsentV2`),
- one for the **audit trail** (`ConsentAuditTrailV2`).

### Two Data Stream Generations
Look at the Data 360 objects associated with Marketing Cloud Next and you may find **more consent streams than you went looking for**. There are two ways to end up with duplicates, and only one is the one the documentation prepares you for.

**1. The documented generation switch.** Orgs created before **Summer '25** moved from `MessagingConsent` to `MessagingConsentV2`, and they can still hold **two records for the same contact point and the same subscription**, one written by each generation. If your org is newer than that, you can skip this.

**2. The org-ID naming quirk (catches everyone else).** Salesforce started **appending the org ID to the stream names**, both spellings stayed active, and an org that has only ever run V2 ends up with the same duplicate rows. This is not a legacy migration artefact — it is the live state of a V2-only org.

The send-time behaviour is fine, because **the latest record wins**. Your queries are not fine, because a naive `SELECT` against the DMO returns **both rows** and you have no obvious signal telling you which one the platform acted on. If you have ever pulled a consent export and found duplicate rows you couldn't explain, this is why.

### Finding Duplicates (with the dangerous ones on top)
```sql
SELECT
    "ssot__ContactPointValueText__c"                   AS contact_point,
    "ssot__CommunicationSubscriptionChannelTypeId__c"  AS channel_type,
    COUNT(*)                                           AS rows_found,
    COUNT(DISTINCT "ssot__ConsentStatus__c")           AS distinct_statuses
FROM "ssot__CommunicationSubscriptionConsent__dlm"
GROUP BY 1, 2
HAVING COUNT(*) > 1
ORDER BY distinct_statuses DESC
```
Sorting on `distinct_statuses` surfaces the contact points where the two streams **disagree** — same address, same subscription, one row opt-in and one row opt-out.

### Org ID in Stream Names
Salesforce names the V2 data streams with the org ID appended, so what you actually see in your org is closer to:
```
MessagingConsentV2_00DXX00000XXXXX-MessagingConsent
ConsentAuditTrailV2_00DXX00000XXXXX-ConsentAuditTrail
```
A real org (the source author's) shows both spellings active, with the larger stream doing the current work:

| Data stream | Records |
|-------------|---------|
| `MessagingConsentV2-MessagingConsent` | 8 |
| `MessagingConsentV2_<orgId>-MessagingConsent` | 340 |
| `ConsentAuditTrailV2-ConsentAuditTrail` | 12 |
| `ConsentAuditTrailV2_<orgId>-ConsentAuditTrail` | 585 |

Both consent streams are V2, both are active, and they differ only in whether the org ID is in the name. The larger stream does the current work, the smaller one is the tail, and **both feed the same DMO**.

The documentation acknowledges this in exactly one place: a note in the table of Data 360 objects associated with Marketing Cloud Next, saying that some DLOs are appended with the org ID or other identifying information.

### The Portability Consequence
**Nothing that references the consent data lake object by name is portable.** Not a Data Transform, not a saved query, not a Calculated Insight definition, not the runbook you wrote for your own team, and not anything you copy from a blog post. It also means the name changes when the org ID changes — the same sandbox problem the subscription Ids have, arriving from a second direction.

### Field Mapping (V2 stream → DMO)
Marketing Cloud Next populates a **minority** of the object it writes to (ten mapped fields, seventeen target fields left unmapped) — what you'd expect from a standard Data 360 object being used by one specific product.

- **`ConsentId` is the primary key.** Built from the contact point value combined with the Communication Subscription Channel Type Id.
- **`ConsentCapturedDateTime` and `UpdatedTime` are separate**, mapping to Consent Captured Date Time and Last Modified Date. One tells you **when the person decided**, the other **when the row last changed**. They are frequently different, and only one is the date your legal team cares about.
- **`PartyId` is mapped to `Party`.** Wired, connected, and carrying nothing (see [[consent-data-model]]).

## Common Pitfalls / Misconceptions
⚠️ Two active consent streams can feed the same DMO — a naive `SELECT` returns duplicate rows with no signal which one the platform acted on.
⚠️ The org-ID naming quirk is **not** a legacy artefact; it affects orgs that have only ever run V2.
⚠️ **No consent DLO name is portable** — always read the actual stream name in your own org before copying any query or transform.
⚠️ Deduplicate on the **latest record per contact point + subscription** before any reporting query, Calculated Insight, or audit extract.
⚠️ `ConsentCapturedDateTime` (when the person decided) ≠ `UpdatedTime` (when the row changed).
⚠️ The audit trail is a **DLO not mapped to any DMO** — Data Explorer won't show it; use Query Editor.

## Active Recall Questions
1. What is the name of the data kit that installs the consent data streams, and how many streams does it install?
2. What are the two ways an org can end up with duplicate consent records for the same contact point and subscription?
3. Why is the org-ID stream-naming quirk not a legacy migration artefact?
4. Why is no consent DLO name portable across orgs?
5. Which two date fields are separate in the V2 mapping, and what does each mean?

## Related Concepts
- [[consent-data-model]]
- [[consent-write-paths]]
- [[consent-audit-trail]]
- [[consent-cache]]
- [[data-kits-and-data-streams]]
- [[data-architecture-layers]]

## Source References
- `sources/Consent_Management_MCNext_SzymonLewandowski.md` — "Consent Management in Marketing Cloud Next" (Szymon Lewandowski, 20 Sep 2026)
