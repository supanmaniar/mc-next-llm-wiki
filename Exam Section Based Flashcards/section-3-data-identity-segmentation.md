# Flashcards — Section 3: Data Modeling, Identity Resolution & Segmentation (25%)

> **Exam weight: 25%.** The second-highest-value section. Covers data layers, identity resolution, reconciliation, segmentation, CRM data, marketing objects, and billing.
> **Related concept pages:** [[data-architecture-layers]] · [[data-kits-and-data-streams]] · [[identity-resolution-rulesets]] · [[identity-resolution-match-rules]] · [[identity-resolution-reconciliation-rules]] · [[data360-segment-types]] · [[segment-canvas-and-filters]] · [[people-records-prospects]] · [[marketing-objects-ampscript-handlebars]] · [[data360-billing-usage]]

---

## Data Object Layers

## Card: Three Data Layers
**Q:** What are the three data layers in Marketing Cloud Next, in order?
**A:** 1) **DLO** (Data Lake Object) — raw intake, unprocessed. 2) **DMO** (Data Model Object) — standardized structure. 3) **Unified Individual** — identity-resolved single profile.

## Card: Data Graph
**Q:** What is a data graph?
**A:** The "map" that exposes which DMO fields are available for personalization and decisioning. **Unified Individual must be the primary object.**

## Card: Field Availability Rule
**Q:** What is the key rule about field availability in a data graph?
**A:** A field must be **explicitly added** to the data graph to be usable. Data in Data 360 does not automatically become available everywhere.

## Card: Ingestion Lags
**Q:** What are the approximate ingestion lags for each stage?
**A:** DLO ~3 min (CDC) / ~10 min (batch) · DMO same cycle · identity resolution ~**once per day** · segment 15–30 min · data graph up to **24 hours**.

## Card: Data Kits
**Q:** What are data kits and what do they do?
**A:** Pre-built bundles that install the data plumbing (DMOs, mappings, streams) for a use case; **data streams auto-deploy** with them.

---

## Identity Resolution

## Card: Identity Resolution Purpose
**Q:** What does identity resolution do?
**A:** Matches source records into a **Unified Individual** profile via rulesets.

## Card: Generated Ruleset
**Q:** What does the generated Individual ruleset contain?
**A:** **3 match rules**: Normalized Email, Lead-to-Contact, and Device-to-Known.

## Card: Ruleset Recommendation
**Q:** How many active rulesets are recommended per object, and why?
**A:** **One per object** (Individual + Account) — running two **doubles billing**.

## Card: Identity Resolution Frequency
**Q:** How often does identity resolution run, and is there a faster option?
**A:** Approximately **once per day**; **real-time resolution** is available for immediate needs.

## Card: Custom Match Types
**Q:** What are the two custom Identity Match Types?
**A:** `lead-to-contact` and `device-to-known`.

---

## Match Rules

## Card: Match Rule vs Criteria
**Q:** What is the difference between a match rule and match criteria?
**A:** A **match rule** is an opportunity to match (records match if **any one** rule's criteria are met). **Match criteria** is precision within a rule (records must match **all** criteria).

## Card: Consolidation Direction
**Q:** How do more match rules vs more criteria affect consolidation?
**A:** More **rules** → **higher** consolidation. More **criteria** → **lower** consolidation.

## Card: Five Match Methods
**Q:** Name the five match methods.
**A:** Exact · Exact Normalized · Fuzzy High Precision · Fuzzy Medium Precision · Fuzzy Low Precision.

## Card: Exact vs Exact Normalized
**Q:** What is the difference between Exact and Exact Normalized matching?
**A:** **Exact** is case-insensitive (Maryanne = maryanne). **Exact Normalized** transforms data first (email: strips whitespace/quotes, gmail `.`/`+`; phone: libphonenumber validation; address: country rules).

## Card: Fuzzy Matching
**Q:** What powers fuzzy matching and what is its confidence threshold?
**A:** A **BERT AI model** (150+ countries, 3B words, 20M names) with a **0.7 confidence** threshold. ⚠️ Not available for Account fields.

## Card: Real-Time Matching Methods
**Q:** In real-time matching, which methods are used regardless of the scheduled method?
**A:** All criteria run **Exact**, except phone/email which run **Exact Normalized**.

## Card: Match on Blank Trap
**Q:** ⚠️ What is the risk of the "Match on Blank" advanced setting?
**A:** It is **ignored in real-time** and can cause **overmatching** (the "50,000+ profiles" error).

## Card: Single Contact Point Trap
**Q:** ⚠️ Why should you avoid matching on a single contact point?
**A:** It mixes household members into one profile — except when using **unique external IDs**.

## Card: Default Rules Counts
**Q:** How many default match rules exist for Accounts, Individuals, and Households?
**A:** Accounts = **2** · Individuals = **4** · Households = **1 rule only**.

## Card: Known Profile Rule
**Q:** When is a unified profile considered "known"?
**A:** If **any** source profile is known; account profiles are **always** known. Known profiles from **all rulesets** count toward entitlement.

---

## Reconciliation Rules

## Card: Reconciliation Purpose
**Q:** What do reconciliation rules do?
**A:** Select a **single value** for a unified field that cannot hold multiple values (e.g., name).

## Card: Three Reconciliation Types
**Q:** Name the three reconciliation rule types.
**A:** **Last Updated** (ties → alphabetical) · **Most Frequent** (ties → last updated) · **Source Priority** (use on **ID fields** to stabilize).

## Card: Reconciliation vs Contact Points
**Q:** ⚠️ Do reconciliation rules govern contact points?
**A:** **No** — all contact points stay in the unified profile; use **source priority** in activations instead.

## Card: Reconciliation Scope
**Q:** Does reconciliation change source data?
**A:** No — it only determines what is **shown** in the unified profile; it never changes source data.

---

## Segmentation

## Card: Five Segment Types
**Q:** Name the five segment types and their purpose.
**A:** **Standard** (scheduled audience on a DMO) · **Real-time** (millisecond on-demand) · **Waterfall** (priority-ranked, mutually exclusive offers) · **Dynamic** (parameterized placeholders) · **Data kit** (predefined, editable).

## Card: Segment Limits
**Q:** What are the key segment limits?
**A:** **9,950** segments/org · **50** filters/tab · **100** attributes · **20** filters/container · nest **3** (container) / **10** (across).

## Card: Lookback Window
**Q:** What is the default lookback window and its maximum?
**A:** Default **90 days**, maximum **2 years** (container criteria override the segment-level setting).

## Card: Publish Cadence
**Q:** What are the standard and rapid publish cadences?
**A:** Standard **12/24h** · Rapid **1/4h** (max 20, SFMC/file storage only, cannot convert to standard).

## Card: Real-Time Segment Limits
**Q:** What can a real-time segment NOT do?
**A:** No exclusion, no nesting, no counts, and no manual publish. It needs **Segment ID + Timestamp** in the real-time graph.

## Card: Waterfall Segment
**Q:** What is a waterfall segment and its limit?
**A:** Priority-ranked, mutually exclusive offers — max **20** segments, one waterfall each, no rapid publish.

## Card: Dynamic Segment
**Q:** What is a dynamic segment?
**A:** A parameterized segment with placeholders, run via API or broadcast flow — it does **not** persist.

## Card: Canvas Nesting
**Q:** What are the canvas nesting limits?
**A:** Nest **3 levels** within a container, **10 levels** across the segment.

## Card: Composite Keys
**Q:** ⚠️ Are composite keys supported in the segment canvas?
**A:** No — only **single-field joins**. Use single unique primary key DMOs.

## Card: Aggregation Functions
**Q:** What aggregation functions does the segment canvas support?
**A:** Count, Sum, Average, Max, Min. Group/Rank/Limit allows max **3 group + 3 sort rules**.

---

## CRM Data & Actionable Lists

## Card: Prospect vs Lead
**Q:** What is the difference between a Prospect and a Lead?
**A:** **Prospect** = top of funnel, unqualified, marketing-owned, may have interacted once, no owner, low-to-medium conversion potential. **Lead** = middle of funnel, qualified, sales-owned, actively engaging, medium-to-high potential.

## Card: Person Progression
**Q:** What is the progression of person records?
**A:** **Prospect** (unqualified, marketing) → **Lead** (qualified, sales) → **Contact** (customer).

## Card: Unified Individual Creation
**Q:** Can Individual or Unified Individual records be created manually?
**A:** No — they are created only via **sync and harmonization**.

## Card: Account Requirement
**Q:** What is required to create a Contact?
**A:** An **Account**.

## Card: Campaign Member
**Q:** What does a Campaign Member record do and what statuses does it use?
**A:** It relates a person to a campaign; statuses include **Responded** and **Attended**.

## Card: Prospect to Lead Conversion
**Q:** How is a Prospect converted to a Lead?
**A:** Manually, or via a **Data 360-Triggered Flow** on an engagement score threshold.

## Card: Prospect to Contact Conversion
**Q:** How is a Prospect converted to a Contact?
**A:** Manually, or via a **Record-Triggered Flow** (Prospect created/updated, e.g., `ProspectStatus` = Qualified) using the **Convert Prospect** action.

## Card: Convert Prospect Inputs
**Q:** What are the inputs to the Convert Prospect action?
**A:** Prospect ID, Converted Status + Converted checkbox, Existing/New Contact, Existing/New Account, and optional Opportunity.

## Card: Conversion Overwrite Rule
**Q:** When converting to an existing lead, which fields are overwritten?
**A:** Only **empty** fields.

## Card: Multi-Currency Conversion
**Q:** Which currency wins on prospect conversion?
**A:** The **prospect's currency code** wins (avoids conversion problems).

## Card: Title Length Trap
**Q:** ⚠️ What Title length breaks prospect conversion?
**A:** A lead Title **> 80 characters** breaks conversion (the prospect allows 128).

## Card: Custom Required Field Trap
**Q:** ⚠️ What blocks a prospect → lead conversion?
**A:** **Custom required fields** on the Lead object.

## Card: Field Mapping
**Q:** How do key prospect fields map on conversion?
**A:** Company → Account Name · City/State/Zip → Mailing (Contact) / Billing (Account) · Email/Phone → same · Industry → Account only · Prospect Currency → Lead/Contact/Account Currency.

## Card: Prospect Restrictions
**Q:** Name three restrictions on Prospect records.
**A:** Cannot be added as a campaign member · not in the Data Import Wizard · cannot be cloned or bulk deleted.

## Card: Lead Assignment Rules
**Q:** What do Lead Assignment Rules determine?
**A:** The record **owner** after conversion; each rule entry = processing order + condition + assigned user.

## Card: Actionable List
**Q:** What is an actionable list?
**A:** A static collection of **leads OR contacts** (never both), used with a list-triggered flow.

---

## Marketing Objects

## Card: Marketing Object Storage
**Q:** What are the field type limits for marketing objects?
**A:** Text ≤ **255** · Number ≤ **18 digits** · Decimal. Storage: Growth **10GB / 25 objects**, Advanced **40GB / 100 objects**; **100 columns** per object.

## Card: Marketing Object Creation
**Q:** How are marketing objects created and what defines the object?
**A:** Via **CSV import** (data types inferred); the object contains **only the file's columns**.

## Card: Marketing Object Keys
**Q:** What are the primary key rules for marketing objects?
**A:** Multiple primary key fields are allowed, but **no composite keys**.

## Card: Immutable Fields
**Q:** ⚠️ Which marketing object properties are immutable after creation?
**A:** **Field API name, data type, and primary key designation** — you must delete and recreate the field (which deletes its data).

## Card: Full Refresh
**Q:** What does a full refresh do and what permissions does it need?
**A:** Deletes and replaces **all** data (CSV must match columns); needs `Manage Marketing Objects` + `Modify All Marketing Object Records`.

## Card: Marketing Object Delete
**Q:** ⚠️ What happens when you delete a marketing object?
**A:** Deletion is **permanent** (all data gone, cannot restore) and is **blocked** if any other object references it.

## Card: Marketing Object Permissions
**Q:** What is the difference between the two marketing object permissions?
**A:** `ViewAllMarketingObjectRecords` (view only) vs. `ManageMarketingObjects` (view + create/delete).

## Card: Marketing Object Identifiers
**Q:** What are the AMPscript/Handlebars identifiers for marketing objects?
**A:** Marketing object = `__mo` · field = `__c` · data graph = `$dataGraph.Field`. AMPscript uses `Lookup()`; Handlebars uses `queryFirst type="MO"`.

---

## Consumption & Billing

## Card: Segmentation Credit Trigger
**Q:** When are segmentation credits consumed?
**A:** On **publish**.

## Card: Cost Reduction
**Q:** Name three ways to reduce Data 360 credit consumption.
**A:** Fewer schedules, tighter lookback windows, preview before publish, and nesting common filters.

## Card: Internal Pipeline Cost
**Q:** What is the cost of the Internal Data Pipeline, and since when?
**A:** **Free** since **Aug 7, 2025** (Salesforce CRM / Marketing Cloud / Commerce Cloud / Personalization connectors).

## Card: External Ingestion Cost
**Q:** Which ingestion consumes credits?
**A:** **External ingestion** (Snowflake, S3, streaming).

## Card: Streaming Activation Cost
**Q:** What is the cost rule for Activate DMO - Streaming?
**A:** Charged per record created/updated per activation — and **doubles** if a data graph is used.

## Card: Batch Calculated Insights
**Q:** When does Batch Calculated Insights charge?
**A:** Only when underlying objects change; objects used multiple times are counted **once**.

## Card: Batch Profile Unification
**Q:** How does Batch Profile Unification charge after the first run?
**A:** Only **new/modified** source profiles count.

## Card: Minimum Decrement
**Q:** What is the minimum credit decrement?
**A:** **1 per usage type** (when fractional usage ≥ 1 over the month).

## Card: Retired Card
**Q:** Which billing card was retired on Sept 4, 2025?
**A:** The **"Segmentation and Activation"** card (merged into the Data Services card).

---

## Related

- [[exam-revision-summary]] — Section 3 summary
- [[section-2-consent]] — previous deck
- [[section-4-campaign-flow-content]] — next deck
- `flashcards/data360-segmentation` · `flashcards/identity-billing-flow-orchestration` — topic-based deep dives