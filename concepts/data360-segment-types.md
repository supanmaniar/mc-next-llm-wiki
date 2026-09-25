# Data 360 Segment Types

## Core Idea
Data 360 supports five segment types — **standard**, **real-time**, **waterfall**, **dynamic**, and **data-kit** — each optimized for a different job: scheduled audience refreshes, millisecond on-demand evaluation, mutually-exclusive multi-offer priority lists, parameterized query-driven lists, and ready-made segments from prebuilt packages.

## Prerequisites
- [[segments-and-audiences]]
- [[identity-resolution-rulesets]]
- [[data-architecture-layers]]

## Detailed Explanation

### Standard Segment
The workhorse segment type: built on a **data model object (DMO)**, with a configurable **lookback window** and a publishing schedule to activation targets.

- **Lookback Window** — default **90 days**, up to **2 years** (or **360 days** if set via the "Days" dropdown). Container-level criteria can override the segment-level window (e.g., segment = 90 days, a container = 60 days → the container wins).
- **Publish types** — standard or rapid (see scheduling below).
- **Max segments** per org: **9,950**.

### Real-Time Segment
Completes on demand **in milliseconds**. To make it available in a real-time data graph, add the **Segment ID** and **Timestamp** fields from the segment membership DMO to the real-time data graph.

Constraints:
- Can't use **exclusion criteria** or **nested batch segments**.
- Can't use **segment counts** or **manual publish**.

### Waterfall Segment
Processes a list of existing segments in a **priority order**, so an individual who qualifies for multiple segments is placed **only in the highest-priority segment they match**. This creates **mutually exclusive** audiences — ideal for campaigns where a customer should receive just one, most-relevant offer.

Key rules:
- Up to **20 segments** per waterfall; drag-and-drop to set priority.
- A segment can exist in **only one** waterfall; can't include nested segments.
- Only **active** segments built on the **selected DMO** are eligible.
- **Rapid publish is not available** for waterfall segments.
- First-match semantics: stops evaluating a customer as soon as the highest-priority match is found.

### Dynamic Segment
Built on a DMO but runs queries **without persisting data** in Segment Membership DMOs. Attribute filters use **placeholders** that accept dynamic values at execution time.

- Can't be scheduled or published via the UI or Connect API — run via **API call through a broadcast flow**, supplying dynamic values at runtime.
- Parameterized values make segment count **not applicable**.

### Data Kit Segment
Create a segment from a **predefined segment in a data kit** (instead of from scratch), then edit/fine-tune it. Child segments/calculated insights must share the same API name.

### Publishing & Scheduling (All Segments)

**Standard publish** (12 or 24 hours):
- Daily: choose **12 or 24 hours**, start date/time, days of week.
- Weekly: set weeks interval, start, day of week.
- Monthly: up to **24 months**, specific day or "last day".

**Rapid publish** (1 or 4 hours — Marketing Cloud Engagement / file storage targets only):
- Daily by default; choose **1-hour or 4-hour** interval.
- Set a From/To time window, start date/time, days of week.
- **Max 20 rapid-publish segments** per org.
- Prioritized in the publish queue; supports **Incremental Refresh**.
- ⚠️ You can't change a standard publish to rapid publish after creation.

> Note: If day 29/30/31 is selected for a month that lacks that day (e.g., February), the publish is skipped that month.

### Segment vs. Publish Status

| Segment Status | Meaning |
|----------------|---------|
| Active | Created, full functionality |
| Processing | Publishing in progress |
| Recounting | Population recount in progress |
| Error | Active but can't be manually published |
| Inactive | Can only be deleted |

| Publish Status | Meaning |
|----------------|---------|
| Success | Published to activation target |
| Error | Failed — contact support |
| Skipped | Temporarily delayed 30 min (max simultaneous publishes) |
| Publishing | In progress; last publish's data available until done |
| Blank | Created but not published |
| Deferred | Pushed out (exceeds max simultaneous publishes) |

### Publication Platforms
The target platform a segment publishes to (CC = B2C Commerce, Ecosystem = External Activation, Personalization, Loyalty, SFMC = Marketing Cloud Engagement, S3 = file storage).

### Segment Membership DMO
Each publish creates/updates a **Segment Membership DMO** (type `Segment_Membership`). Two variants:
- **Latest** (`Objectname_SM__dlm`) — profiles in the latest publish.
- **History** (`Objectname_SMH__dlm`) — prior publish, last **30 days**.

Members no longer meeting criteria are removed on the next publish. Interact via Data Explorer, Tableau, or SOQL/Query APIs.

Schema fields: `Id`, `Key Qualifier Id`, `Segment Id`, `Snapshot Type` (F = full), `Delta Type` (New/Existing/Removed, history only), `Timestamp`, `Version Stamp`.

### Deletion / Deactivation Semantics
- **Delete** — remove the activation first; once deleted you can't re-enable; restoring from recycle bin makes it read-only (must recreate).
- **Deactivate (Inactivate)** — applies to all targets; no longer publishes, can't be chosen for activation, **can't be re-enabled**. If you might use it again, **stop the publish schedule instead**.
- **Copy** — replicate a segment's filters/customizations.

## Common Pitfalls / Misconceptions
⚠️ **Composite keys** — the Segment Canvas joins on single-field relationships; composite keys only work in manual queries. Use DMOs with a single, unique primary key.
⚠️ Real-time segments can't use exclusion criteria, nested batch segments, counts, or manual publish.
⚠️ You can't convert a standard publish to rapid publish after creating the segment.
⚠️ Waterfall = mutually exclusive priority list; first match wins (no multi-offer duplicate sends).
⚠️ Deleting ≠ deactivating; deactivation is permanent and can't be re-enabled.

## Active Recall Questions
1. Name the five segment types and the primary job of each.
2. How does a waterfall segment prevent a customer from receiving multiple offers?
3. What are the standard vs. rapid publish intervals?
4. What's the difference between the "Latest" and "History" segment membership DMOs?
5. Why is "deactivate" different from "stop the publish schedule"?

## Related Concepts
- [[segments-and-audiences]]
- [[segment-canvas-and-filters]]
- [[einstein-segments]]
- [[data-architecture-layers]]

## Source References
- `sources/Salesforce_D360_Segments.txt` — "Create Segments in Data 360", "Create a Standard/Real-Time/Waterfall/Dynamic Segment", "Manage Data 360 Segment Schedules", "Segment Types and Statuses", "Segment Membership Data Model Object"