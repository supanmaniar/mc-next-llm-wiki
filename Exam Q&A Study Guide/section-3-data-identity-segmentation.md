# Q&A Study Guide — Section 3: Data Modeling, Identity Resolution & Segmentation (25%)

> **Exam weight: 25% — the second-highest-value section.** Scenario-driven questions with full reasoning. Cover the **Answer** and **Why** until you've committed to your own answer.
> **Related concept pages:** [[data-architecture-layers]] · [[data-kits-and-data-streams]] · [[identity-resolution-rulesets]] · [[identity-resolution-match-rules]] · [[identity-resolution-reconciliation-rules]] · [[data360-segment-types]] · [[segment-canvas-and-filters]] · [[people-records-prospects]] · [[marketing-objects-ampscript-handlebars]] · [[data360-billing-usage]]

---

## Q1 — Data Layers

**Question:** A consultant is explaining the data architecture to a client. A field exists in the raw ingested data but is not available for personalization. What is the most likely explanation?

**Answer:** **The field has not been explicitly added to the data graph. Data in Data 360 does not automatically become available everywhere.**

**Why:** The three layers are **DLO** (raw intake) → **DMO** (standardized) → **Unified Individual** (identity-resolved). The **data graph** is the map that exposes which DMO fields are usable for personalization and decisioning, and **Unified Individual must be the primary object**. A field can exist in the DLO and DMO yet remain invisible to messaging until it is added to the graph.

> ⚠️ **Distractor logic:** "The field needs to be re-ingested" is the plausible-but-wrong answer — it misdiagnoses an *exposure* problem as an *ingestion* problem.

---

## Q2 — Ingestion Lags

**Question:** A client updates a contact's email address in the source system and expects the change to be reflected in a segment immediately. What should the consultant explain about timing?

**Answer:** **Expect staged lags: DLO ~3 min (CDC) / ~10 min (batch) · DMO same cycle · identity resolution ~once per day · segment 15–30 min · data graph up to 24 hours.**

**Why:** Each stage in the pipeline adds latency, and the cumulative effect can be substantial. The identity resolution step (~once per day) is usually the biggest surprise, and the data graph refresh (up to 24 hours) is the longest. This is a memorised sequence the exam tests because it drives real client expectations.

> ⚠️ **Distractor logic:** "Changes are near-instant" is the plausible-but-wrong answer — it ignores the pipeline entirely.

---

## Q3 — Identity Resolution Purpose

**Question:** A client has the same person appearing as a Lead and a Contact with different email addresses. What mechanism unifies them into a single profile?

**Answer:** **Identity resolution — it matches source records into a Unified Individual via rulesets.**

**Why:** Identity resolution is the process that consolidates multiple source records into one resolved profile. The generated Individual ruleset contains **3 match rules**: Normalized Email, Lead-to-Contact, and Device-to-Known. Recognising that Lead-to-Contact is a *default* rule explains why this scenario resolves without custom configuration.

---

## Q4 — Ruleset Count

**Question:** A client wants to run two active identity resolution rulesets on the Individual object to improve matching. What should the consultant advise?

**Answer:** **Recommend one active ruleset per object (Individual + Account) — running two doubles billing.**

**Why:** Identity resolution consumes credits, and each additional active ruleset on the same object multiplies the cost. The recommendation is one per object. The scenario tests whether you know the *cost* consequence, not just the capability.

> ⚠️ **Distractor logic:** "Add a second ruleset for better coverage" is the plausible-but-wrong answer — it sounds like a quality improvement but doubles cost for marginal gain.

---

## Q5 — Match Rule vs Criteria

**Question:** A consultant wants to *increase* consolidation so more records merge into unified profiles. Should they add more match rules or more match criteria?

**Answer:** **Add more match rules. More rules → higher consolidation; more criteria → lower consolidation.**

**Why:** A **match rule** is an opportunity to match — records match if **any one** rule's criteria are met. A **match criterion** is precision *within* a rule — records must match **all** criteria. So adding rules widens the net (more matches), while adding criteria narrows it (fewer matches). This inversion is one of the most commonly tested concepts in the section.

> ⚠️ **Distractor logic:** "Add more criteria" is the plausible-but-wrong answer — it does the opposite of what the scenario asks.

---

## Q6 — Match Methods

**Question:** A client's data has inconsistent email formatting — some addresses have trailing spaces and Gmail addresses use dots and plus-addressing. Which match method should the consultant use?

**Answer:** **Exact Normalized.**

**Why:** **Exact** is merely case-insensitive (Maryanne = maryanne). **Exact Normalized** transforms data first — for email it strips whitespace and quotes, and handles Gmail `.` and `+`; for phone it applies libphonenumber validation; for address it applies country rules. The scenario's specific data quality issues are exactly what normalization addresses.

> ⚠️ **Distractor logic:** "Fuzzy High Precision" is the plausible-but-wrong answer — fuzzy is for *approximate* similarity, not for *deterministic* formatting cleanup.

---

## Q7 — Fuzzy Matching

**Question:** A client wants to match on Account names that are spelled slightly differently. What should the consultant know about fuzzy matching for Account fields?

**Answer:** **Fuzzy matching uses a BERT AI model with a 0.7 confidence threshold — but it is not available for Account fields.**

**Why:** The BERT model covers 150+ countries, 3B words, and 20M names, with a **0.7** confidence threshold. However, the Account-field restriction is the trap: the scenario asks specifically about Account names, so fuzzy is unavailable regardless of its capability. This is a classic "right feature, wrong object" distractor setup.

> ⚠️ **Distractor logic:** "Use Fuzzy High Precision" is the plausible-but-wrong answer — correct method, unsupported object.

---

## Q8 — Real-Time Matching

**Question:** A client needs real-time identity resolution. Which match methods will actually be used, regardless of the scheduled method configured?

**Answer:** **All criteria run Exact, except phone and email which run Exact Normalized.**

**Why:** Real-time matching cannot afford the compute of fuzzy matching, so it degrades to deterministic methods. Knowing this prevents you from promising fuzzy-quality matching in a real-time scenario. It also explains why real-time resolution may consolidate differently from the scheduled run.

---

## Q9 — Match on Blank

**Question:** A client enables "Match on Blank" to improve consolidation and then sees an error about 50,000+ profiles. What is the cause?

**Answer:** **Match on Blank is ignored in real-time and can cause overmatching — the "50,000+ profiles" error.**

**Why:** Matching on blank values causes unrelated records (which all share the blank value) to collapse together. The setting is also ignored in real-time, so behaviour differs between scheduled and real-time runs. The fix is to disable it and match on meaningful, populated attributes.

> ⚠️ **Distractor logic:** "Increase the profile limit" is the plausible-but-wrong answer — it treats a symptom while the root cause is overmatching.

---

## Q10 — Single Contact Point

**Question:** A consultant proposes matching individuals on email address alone to maximise consolidation. What is the risk?

**Answer:** **Matching on a single contact point mixes household members into one profile — except when using unique external IDs.**

**Why:** Shared addresses (households, family plans) would merge distinct people. The exception is a genuinely unique external identifier, which is safe to match on. This connects directly to the Section 2 consent model, where shared addresses already carry shared consent — merging them compounds the problem.

---

## Q11 — Default Rules

**Question:** How many default match rules exist for Accounts, Individuals, and Households?

**Answer:** **Accounts = 2 · Individuals = 4 · Households = 1.**

**Why:** These are memorised counts. The Households figure (**1 rule only**) is the most commonly missed, and the Individuals figure (4) reflects the Fuzzy Name plus Normalized Email/Phone/Address/Phone+Email combination.

---

## Q12 — Known Profiles

**Question:** A client asks when a unified profile is considered "known" for entitlement purposes. What should the consultant explain?

**Answer:** **A profile is known if any source profile is known; account profiles are always known. Known profiles from all rulesets count toward entitlement.**

**Why:** The "any source" rule means a single known source is sufficient. The "all rulesets" rule matters because it means running multiple rulesets inflates the known-profile count — which ties back to the billing warning in Q4.

---

## Q13 — Reconciliation Purpose

**Question:** A unified profile has three different first names from three source systems. What determines which one is displayed?

**Answer:** **Reconciliation rules — they select a single value for a unified field that cannot hold multiple values.**

**Why:** Reconciliation resolves conflicts for single-value fields like name. The three types are **Last Updated** (ties → alphabetical), **Most Frequent** (ties → last updated), and **Source Priority** (use on **ID fields** to stabilize). Critically, reconciliation only determines what is **shown** — it never changes source data.

> ⚠️ **Distractor logic:** "The most recently created source record wins" is the "almost right" answer — it describes Last Updated, but ignores the tie-break rule and the fact that the type is configurable.

---

## Q14 — Reconciliation vs Contact Points

**Question:** A client wants to use reconciliation rules to control which phone number is used in an activation. Is this the right approach?

**Answer:** **No — reconciliation rules do not govern contact points. All contact points stay in the unified profile; use source priority in activations instead.**

**Why:** This is one of the highest-frequency traps in the exam. Reconciliation handles single-value fields; contact points are multi-valued by design and are governed by **source priority** at the activation layer. Selecting reconciliation here is the classic "right concept, wrong layer" error.

> ⚠️ **Distractor logic:** "Use Source Priority reconciliation" is the plausible-but-wrong answer — it correctly names source priority but places it in the wrong mechanism.

---

## Q15 — Segment Types

**Question:** A client needs a segment that evaluates in milliseconds on demand, with no scheduled publish. Which segment type should the consultant use, and what are its limitations?

**Answer:** **A real-time segment. It cannot use exclusion, nesting, or counts, and cannot be manually published. It requires Segment ID + Timestamp in the real-time graph.**

**Why:** Real-time segments trade flexibility for speed. The four limitations are the exam's focus — particularly the requirement for **Segment ID + Timestamp** in the real-time graph, which is a configuration prerequisite that's easy to overlook.

> ⚠️ **Distractor logic:** "A standard segment with rapid publish" is the plausible-but-wrong answer — rapid publish is 1/4h, which is not millisecond latency.

---

## Q16 — Waterfall Segment

**Question:** A client wants to present mutually exclusive offers in priority order, so each contact receives only the highest-priority offer they qualify for. Which segment type applies, and what is the limit?

**Answer:** **A waterfall segment — priority-ranked and mutually exclusive, with a maximum of 20 segments, one waterfall each, and no rapid publish.**

**Why:** Waterfall is purpose-built for exactly this "first qualifying offer wins" pattern. The limits matter: max **20** segments, only **one** waterfall per org, and rapid publish is unavailable. The mutual exclusivity is the defining characteristic.

---

## Q17 — Dynamic Segment

**Question:** A client wants to pass parameters at runtime so the same segment definition produces different audiences per API call. Which segment type should the consultant use?

**Answer:** **A dynamic segment — it uses parameterized placeholders and is run via API or broadcast flow. It does not persist.**

**Why:** Dynamic segments are templates, not stored audiences. The non-persistence is the key detail: there is no saved membership to inspect afterwards, which affects how you'd audit or report on the send.

---

## Q18 — Segment Limits

**Question:** A consultant is designing a complex segment. What are the key limits to respect?

**Answer:** **9,950 segments per org · 50 filters per tab · 100 attributes · 20 filters per container · nest 3 levels within a container / 10 across the segment.**

**Why:** These are memorised numbers the exam tests directly. The nesting distinction (**3 within a container, 10 across**) is the most commonly confused pair — note they measure different things.

---

## Q19 — Lookback Window

**Question:** A client needs a segment that looks back two years. Is this possible, and what is the default?

**Answer:** **Yes — the default lookback is 90 days and the maximum is 2 years. Container criteria override the segment-level setting.**

**Why:** The default (90 days) is what most segments use, so a two-year requirement needs explicit configuration. The override rule matters because a container-level setting silently changes behaviour for that container, which can surprise a consultant reviewing only the segment-level value.

---

## Q20 — Publish Cadence

**Question:** A client needs a segment refreshed every 15 minutes. What should the consultant recommend, and what are the caveats?

**Answer:** **Rapid publish (1/4h). Caveats: maximum 20 rapid segments, SFMC/file storage only, and it cannot be converted to standard.**

**Why:** Standard publish is 12/24h, so 15-minute freshness requires rapid. The three caveats are the exam's focus — especially the **irreversibility** (cannot convert to standard) and the storage restriction, which limit how the segment can be used downstream.

> ⚠️ **Distractor logic:** "Use a real-time segment" is the plausible-but-wrong answer — real-time is millisecond, but it cannot be scheduled or published at all.

---

## Q21 — Composite Keys

**Question:** A consultant wants to join two DMOs in the segment canvas using a two-field composite key. Is this supported?

**Answer:** **No — composite keys are unsupported in the canvas. Only single-field joins are allowed; use single unique primary key DMOs.**

**Why:** The canvas requires single-field joins, which is why the guidance is to model DMOs with a single unique primary key. This is a data-modelling constraint that surfaces during segmentation — a good example of how Section 3 decisions ripple into later configuration.

---

## Q22 — Prospect vs Lead

**Question:** A client's marketing team has captured a contact who filled in a form once and has no sales owner. Is this a Prospect or a Lead?

**Answer:** **A Prospect — top of funnel, unqualified, marketing-owned, may have interacted once, no owner, low-to-medium conversion potential.**

**Why:** The distinction is about qualification and ownership. A **Lead** is middle of funnel, qualified, sales-owned, actively engaging, with medium-to-high potential. The scenario's clues — "filled in a form once" and "no sales owner" — both point to Prospect.

> ⚠️ **Distractor logic:** "A Lead" is the plausible-but-wrong answer — the form submission feels like qualification, but qualification is about sales readiness, not activity.

---

## Q23 — Unified Individual Creation

**Question:** A client wants to manually create Unified Individual records for a test. Is this possible?

**Answer:** **No — Individual and Unified Individual records can only be created via sync and harmonization.**

**Why:** These records are derived artefacts of the identity resolution process, not user-created entities. This matters for testing strategy: you cannot seed test profiles directly, you must drive them through the pipeline.

---

## Q24 — Prospect to Contact Conversion

**Question:** A client wants to automatically convert Prospects to Contacts when they become qualified. What should the consultant configure?

**Answer:** **A Record-Triggered Flow on Prospect created/updated (e.g., `ProspectStatus` = Qualified) using the Convert Prospect action.**

**Why:** The Convert Prospect action takes Prospect ID, Converted Status + Converted checkbox, Existing/New Contact, Existing/New Account, and optional Opportunity. Note the alternative paths: Prospect → Lead can use a **Data 360-Triggered Flow** on an engagement score threshold, and Data 360-triggered and form-triggered flows can also convert. The scenario's "when they become qualified" points to a record-triggered condition.

> ⚠️ **Distractor logic:** "A Data 360-Triggered Flow on engagement score" is the plausible-but-wrong answer — it's a real conversion path, but it triggers on *engagement*, not *qualification*.

---

## Q25 — Conversion Overwrite

**Question:** A Prospect is converted to an existing Lead that already has a populated Phone field. The Prospect has a different phone number. What happens?

**Answer:** **Only empty fields are overwritten — the existing Lead's populated Phone is preserved.**

**Why:** The conversion is deliberately non-destructive for populated fields. This protects existing sales data from being clobbered by marketing-sourced values. The exam tests this because the intuitive assumption is that the incoming record wins.

---

## Q26 — Multi-Currency Conversion

**Question:** A Prospect and an existing Account have different currency codes. Which wins on conversion?

**Answer:** **The prospect's currency code wins — this avoids conversion problems.**

**Why:** The prospect's currency is authoritative for the conversion, which prevents arithmetic errors from mismatched currencies. This is a specific rule worth memorising because it's counterintuitive — you might expect the established Account to take precedence.

---

## Q27 — Title Length Trap

**Question:** A client reports that prospect-to-lead conversion is failing for certain records. The prospects have job titles up to 120 characters. What is the cause?

**Answer:** **A lead Title greater than 80 characters breaks conversion — the prospect allows 128, but the lead does not.**

**Why:** The field-length mismatch between the two objects is the trap. The prospect accepts up to 128 characters, so the data passes validation on the prospect; the lead caps at 80, so conversion fails. The fix is to truncate or remap the title before conversion.

> ⚠️ **Distractor logic:** "The prospect title is too long" is the plausible-but-wrong answer — 120 is within the prospect's 128 limit; the failure is on the *lead* side.

---

## Q28 — Custom Required Fields

**Question:** A client added a custom required field to the Lead object. Now prospect-to-lead conversion fails. Why?

**Answer:** **Custom required fields on the Lead object block prospect-to-lead conversion.**

**Why:** The conversion cannot satisfy a required field that has no source value on the prospect. This is a design constraint to check during implementation — adding required fields to Lead has a downstream effect on the conversion path.

---

## Q29 — Prospect Restrictions

**Question:** A client wants to add Prospects as campaign members and bulk-delete stale ones. What should the consultant advise?

**Answer:** **Prospects cannot be added as campaign members, are not in the Data Import Wizard, and cannot be cloned or bulk deleted.**

**Why:** These restrictions exist because Prospects are pre-qualification records managed by the marketing pipeline. The practical implication is that campaign membership requires conversion to Lead or Contact first. The exam tests these as a cluster of limitations.

---

## Q30 — Actionable List

**Question:** A client wants a static collection of contacts for a one-off send. What should the consultant create, and what is the key constraint?

**Answer:** **An actionable list — a static collection of leads OR contacts (never both), used with a list-triggered flow.**

**Why:** The "never both" constraint is the tested detail. An actionable list is homogeneous by design, which means a mixed audience requires two lists or a different mechanism (such as a segment).

---

## Q31 — Marketing Object Storage

**Question:** A client on the Growth tier needs to store 30 marketing objects totalling 15GB. Is this possible?

**Answer:** **No — Growth allows 10GB and 25 objects. Advanced allows 40GB and 100 objects.**

**Why:** Both the storage and object-count limits are exceeded on Growth. The scenario deliberately breaches *both* thresholds so that a partially-correct answer (e.g., "yes, but only 25 objects") is still wrong. Field limits are also worth noting: Text ≤ 255, Number ≤ 18 digits, Decimal, and 100 columns per object.

> ⚠️ **Distractor logic:** "Yes, if you upgrade storage" is the plausible-but-wrong answer — the object count is a separate hard limit.

---

## Q32 — Marketing Object Immutability

**Question:** A consultant needs to change a marketing object field from Text to Number and rename its API name. What must they do?

**Answer:** **Delete and recreate the field — field API name, data type, and primary key designation are immutable after creation. Deleting the field deletes its data.**

**Why:** This is a destructive operation, so it must be planned before go-live. The immutability of these three properties is the tested fact, and the data-loss consequence is the practical warning. This is a classic implementation-planning question.

> ⚠️ **Distractor logic:** "Edit the field type in Setup" is the plausible-but-wrong answer — it assumes editability that does not exist.

---

## Q33 — Marketing Object Delete

**Question:** A client wants to delete a marketing object that is referenced by another object. What happens?

**Answer:** **The delete is blocked if any other object references it. Deletion is otherwise permanent — all data is gone and cannot be restored.**

**Why:** The referential-integrity block prevents orphaned references, and the permanence means there is no recycle bin for marketing objects. Both facts matter for change management: you must remove dependencies first, and you cannot undo the delete.

---

## Q34 — Marketing Object Permissions

**Question:** A user needs to view marketing object records but must not be able to create or delete objects. Which permission should be assigned?

**Answer:** **`ViewAllMarketingObjectRecords` (view only) — as opposed to `ManageMarketingObjects` (view + create/delete).**

**Why:** The two permissions split cleanly along the read/write boundary. The scenario's constraint ("must not create or delete") maps directly onto the view-only permission. Note also that the Data Management tab is **Default On** for the Marketing User profile.

---

## Q35 — Segmentation Credits

**Question:** A client asks when segmentation credits are consumed. What should the consultant explain?

**Answer:** **On publish.**

**Why:** Credits are consumed at publish time, not at authoring time. This means previewing and iterating on a segment definition is free, but every publish costs. The practical advice is to preview before publishing and to reduce publish frequency where possible.

---

## Q36 — Cost Reduction

**Question:** A client's Data 360 credit consumption is higher than expected. What four levers should the consultant recommend?

**Answer:** **Fewer schedules, tighter lookback windows, preview before publish, and nesting common filters.**

**Why:** Each lever targets a different cost driver: schedules drive publish frequency, lookback drives data scanned, previewing avoids wasted publishes, and nesting reduces redundant filter evaluation. This is a synthesis question that rewards understanding *why* each cost exists.

---

## Q37 — Internal Pipeline Cost

**Question:** A client ingests data from Salesforce CRM and Marketing Cloud. Are they charged for this ingestion?

**Answer:** **No — the Internal Data Pipeline is free (since Aug 7, 2025) for Salesforce CRM, Marketing Cloud, Commerce Cloud, and Personalization connectors.**

**Why:** The date matters because it's a recent change the exam tests. External ingestion (Snowflake, S3, streaming) *does* consume credits, so the distinction between internal and external sources is the key discriminator.

> ⚠️ **Distractor logic:** "All ingestion consumes credits" is the plausible-but-wrong answer — it was true before the change.

---

## Q38 — Streaming Activation Cost

**Question:** A client uses Activate DMO - Streaming with a data graph. How is this charged?

**Answer:** **Per record created/updated per activation — and the cost doubles if a data graph is used.**

**Why:** The doubling is the tested detail. It creates a real design trade-off: a data graph adds personalization capability but doubles streaming activation cost, so high-volume streaming activations may warrant avoiding the graph.

---

## Q39 — Batch Calculated Insights

**Question:** A client runs a Calculated Insight that references the same object three times. How is it charged?

**Answer:** **Charged only when underlying objects change, and objects used multiple times are counted once.**

**Why:** The "counted once" rule prevents double-charging for repeated references, and the "only when objects change" rule means idle periods are free. Both details reward careful reading — the scenario's "three times" is designed to test the deduplication rule.

---

## Q40 — Minimum Decrement

**Question:** A client's usage is fractional across the month. What is the minimum credit decrement?

**Answer:** **1 per usage type (when fractional usage ≥ 1 over the month).**

**Why:** This prevents sub-unit usage from being lost or accumulated indefinitely. It's a small but specific billing rule the exam tests as a memorised fact.

---

## Q41 — Retired Billing Card

**Question:** Which billing card was retired on Sept 4, 2025, and what replaced it?

**Answer:** **The "Segmentation and Activation" card was retired and merged into the Data Services card.**

**Why:** The date and the merge destination are both tested. This matters for client conversations about billing structure, since the card a client expects to see may no longer exist.

---

## Q42 — Direct vs Related Attributes

**Question:** A consultant is building a segment and needs to filter on purchase history. Is purchase history a direct or related attribute?

**Answer:** **A related attribute — it is a collection of data points (1:N, one customer to many orders). Direct attributes are single data points (1:1 or N:1), such as postal code or first name.**

**Why:** The distinction determines how the filter behaves. Direct attributes act on a single value about the entity; related attributes represent behavioural or engagement events where one entity has many rows. Purchase history, product numbers, and email interactions are all related attributes.

> ⚠️ **Distractor logic:** "A direct attribute, because it belongs to the customer" is the plausible-but-wrong answer — ownership is not the test; cardinality is.

---

## Q43 — Containers and AND Logic

**Question:** A client wants to find customers who bought a yellow scarf in a single order. Should the "yellow" and "scarf" filters go in the same container or separate containers?

**Answer:** **The same container — attributes in the same container act on the same data row (AND logic on one record). Separate containers apply independently, so "yellow" in one and "scarf" in another would match anyone who bought any yellow product AND any scarf.**

**Why:** This is one of the most consequential segmentation concepts. Same-container filtering is row-level, so it enforces that both conditions were true of the *same* transaction. Separate containers lose that relationship entirely. The container is created automatically when you filter with a related attribute, and the related attribute's DMO becomes the container object.

> ⚠️ **Distractor logic:** "Separate containers, because they are different attributes" is the plausible-but-wrong answer — it produces a materially different (and wrong) audience.

---

## Q44 — Aggregation Types

**Question:** A client wants to target customers with at least five purchases. Which aggregation type applies?

**Answer:** **Count — it defines how many times criteria must be met. The other types are Sum, Average, Max, and Min.**

**Why:** Each aggregation answers a different question: **Count** (how many times), **Sum** (total across values, e.g. lifetime value), **Average** (mean across values), **Max** (highest value), and **Min** (lowest value). Aggregations are applied inside containers and count toward the 50-filter-per-tab limit.

> ⚠️ **Distractor logic:** "Sum" is the plausible-but-wrong answer — it totals values rather than counting occurrences.

---

## Q45 — Case-Sensitive Joins

**Question:** A consultant's segment returns fewer records than expected. The join is on an email address field. What should they check?

**Answer:** **Joins are case-sensitive — mismatched case means records do not link.**

**Why:** This is a subtle data-quality trap. Unlike the *value matching* in queries (which is case-insensitive for text), the *joins* between DMOs are case-sensitive. So `John@Example.com` and `john@example.com` would not link. The fix is to normalise case at ingestion.

> ⚠️ **Distractor logic:** "Query matching is case-insensitive, so joins are too" is the plausible-but-wrong answer — the two behaviours differ.

---

## Q46 — Primary and Foreign Keys

**Question:** A consultant cannot find the primary key attribute on the segment canvas. Why?

**Answer:** **Primary key and foreign key attributes do not appear on the canvas. To use them, create a custom attribute that is not assigned as a PK or FK.**

**Why:** The canvas deliberately hides key attributes to prevent accidental misuse in filters. The workaround is a custom attribute, which is a modelling decision made upstream. This is a practical constraint that surfaces during segment design.

---

## Q47 — Container Paths

**Question:** A consultant is building a segment on an order object that has both a Buyer ID and a Seller ID. Why does the path matter?

**Answer:** **When a container has multiple routes back to the segment-on entity, you must choose the path that builds the intended audience. Cyclic paths (a→b→a) degrade performance and are blocked by default.**

**Why:** The same container can be reached via different relationships, and each produces a different audience. Choosing the Buyer path versus the Seller path changes who qualifies. The cyclic-path block is a performance safeguard.

> ⚠️ **Distractor logic:** "The path is chosen automatically" is the plausible-but-wrong answer — it requires deliberate selection.

---

## Q48 — Population Counts

**Question:** A client wants to know how many people a segment will reach before publishing. What count should the consultant use, and what is its caveat?

**Answer:** **The Approximate Segment Population — a 95%-confidence range estimate (enable in Feature Manager). It is less accurate for small populations.**

**Why:** Four count types exist: **segment count** (entity count from filters, excluding profiles with Data Deletion/Restrict Processing requests), **filter-level count** (direct attributes), **container-level count** (related attributes, distinct count), and **Approximate Segment Population** (the range estimate). The small-population caveat is the tested detail.

> ⚠️ **Distractor logic:** "The segment count is exact" is the plausible-but-wrong answer — it is a count of entities passing filters, not a projected reach.

---

## Q49 — Value Matching

**Question:** A consultant filters on a text field with the value `0852`. Will it match a record containing `852`?

**Answer:** **No — type matching is exact. String `0852` does not equal `852` (leading zero) or `"0852"` (with quotes). Queries are case-insensitive for text but honour exact matching on special characters and accents.**

**Why:** The two behaviours are distinct: case is ignored, but type and formatting are not. This means leading zeros, quotes, and accents all matter. The practical implication is that data normalisation at ingestion prevents silent filter failures.

> ⚠️ **Distractor logic:** "It matches because text matching is fuzzy" is the plausible-but-wrong answer — only case is relaxed.

---

## Q50 — Is In Operator Limits

**Question:** A consultant needs to filter on 5,000 values using the `Is In` operator. Is this possible?

**Answer:** **Yes — `Is In` / `Is Not In` accept up to 100 values, but bulk paste supports up to 10,000 for `Is In`.**

**Why:** The two limits serve different input methods: manual entry caps at 100, while bulk paste extends to 10,000. Recognising that the limit depends on the input method is the tested nuance.

> ⚠️ **Distractor logic:** "The limit is 100 regardless" is the plausible-but-wrong answer — it ignores the bulk-paste allowance.

---

## Q51 — Group, Rank and Limit

**Question:** A client wants to target the top 10 accounts by Fit Score. Which feature applies, and what are the constraints?

**Answer:** **Group, Rank, and Limit — Group By (e.g. Account ID), Sort By (e.g. Fit Score descending), then Limit (top 10 per group). Max 3 group rules + 3 sort rules per ruleset.**

**Why:** The three steps run sequentially after standard Include/Exclude filtering. Key constraints: it applies **only within qualified profiles** (not global ranking), filtered-out records land in the **Excluded Population**, only **direct attributes** and aggregatable calculated insights are supported (**related attributes are not**), and it is not supported for DBT, real-time, or dynamic segments. A segment using these rules can be nested only in **Last Membership** mode.

> ⚠️ **Distractor logic:** "Use a related attribute to rank by purchase history" is the plausible-but-wrong answer — related attributes are unsupported for ranking.

---

## Q52 — Attribute Shortcuts

**Question:** A consultant repeatedly navigates the same segment-on object, path, and target attribute. What should they create?

**Answer:** **An attribute shortcut — a reusable named shortcut. Limits: 500 per tenant, scoped to data space, saved at org level, packageable via DataKits.**

**Why:** Shortcuts save navigation time and appear in a dedicated **Shortcuts tab** (only after the first shortcut is saved). The important caveat: they operate at the **filter level**, not the container level, so they do not capture aggregation context.

> ⚠️ **Distractor logic:** "A shortcut captures the full container context" is the plausible-but-wrong answer — it captures only the filter-level path.

---

## Q53 — Nested Segments

**Question:** A client wants to reuse an existing segment as a filter inside a new segment. What are the modes?

**Answer:** **Nested segments — the child segment can be in `Last Published Membership` or `Segment Criteria` mode.**

**Why:** The two modes differ in what they reference: the last published membership is a frozen snapshot, while segment criteria re-evaluates the child's logic. Choosing between them affects freshness and performance. Note the related constraint that a segment using Group/Rank/Limit can be nested only in **Last Membership** mode.

> ⚠️ **Distractor logic:** "Nested segments always re-evaluate live" is the plausible-but-wrong answer — the mode is configurable.

---

## Q54 — Hierarchical Aggregation

**Question:** A client wants to roll up revenue across an account hierarchy. What are the limits?

**Answer:** **Hierarchical aggregation supports Account/Unified Account, up to 5 containers and 3 levels per DMO.**

**Why:** The limits constrain how deep and how wide the roll-up can go. This is a memorised pair of numbers, and it matters for enterprise clients with complex account structures.

---

## Q55 — Event Time Window

**Question:** A client wants to segment on engagement events from three years ago. Is this possible?

**Answer:** **No — engagement DMOs process up to 24 months of the event date field value.**

**Why:** The 24-month window is a hard limit on event-time processing. This is distinct from the segment lookback window (default 90 days, max 2 years) — the two limits govern different things, and conflating them is a common error.

> ⚠️ **Distractor logic:** "The lookback window covers it" is the plausible-but-wrong answer — the lookback governs segment evaluation, not event-time processing.

---

## Q56 — Segmentation Operators

**Question:** A consultant needs to filter on a date field for "the last 30 days". Which operator applies, and what time zone is used?

**Answer:** **`Last Number Of Days` — date operators use the org time zone.**

**Why:** The date operator set includes `Is Anniversary Of`, `Is Today/Yesterday/Tomorrow`, `Is Between`, `Last/Next Number Of Days/Months/Years`, `Day/Month Of Week/Year`, and `Has Value/No Value`. The org-time-zone detail matters for global clients, where a recipient's local date may differ from the org's.

> ⚠️ **Distractor logic:** "The recipient's time zone" is the plausible-but-wrong answer — operators use the org time zone.

---

## Q57 — Text Operators

**Question:** A consultant needs to match a text field using a regular expression. Which operator applies?

**Answer:** **`Matches` (regex). Other text operators include `Contains`, `Begins With`, `Exists As A Whole Word`, `Is In`, and `Is Not In`.**

**Why:** The text operator set applies to text, URL, phone, and email fields. Recognising that `Matches` is the regex operator — and that `Contains` is a plain substring match — is the tested distinction. Note that `Contains` is a valid *segmentation* operator even though it is not a valid *flow filter* condition (Section 4, Q36).

> ⚠️ **Distractor logic:** "`Contains` supports regex" is the plausible-but-wrong answer — it is a literal substring match.

---

## Q58 — Boolean and Numeric Operators

**Question:** What operators are available for boolean and numeric fields in segmentation?

**Answer:** **Boolean: `Is True`, `Is False`, `Has Value`, `No Value`. Numeric: `Is Equal/Less/Greater Than`, `Is Between`, `Has Value`, `No Value`.**

**Why:** The operator set varies by data type, and the exam tests whether you can match the operator to the field type. Boolean fields have no range operators, while numeric fields have no truth-value operators.

---

## Q59 — Vector Filters

**Question:** A client wants to segment on unstructured text using natural language similarity. Which feature applies?

**Answer:** **Vector filters (Beta) — the NLP-based `Is Similar To` operator for unstructured data.**

**Why:** Vector filters extend segmentation to unstructured content, which traditional operators cannot handle. The Beta status is worth noting, as it signals the feature may change.

---

## Q60 — Currency Data Type

**Question:** A client operates in multiple currencies and wants to segment on a monetary threshold. What should the consultant use?

**Answer:** **The currency data type — it normalises multi-currency values via a currency code during filter and aggregation.**

**Why:** Without normalisation, comparing amounts across currencies is meaningless. The currency data type handles the conversion at filter time, which is why it must be applied to the attribute rather than handled in the filter logic.

---

## Related

- [[exam-revision-summary]] — Section 3 summary
- [[section-2-consent]] — previous guide
- [[section-4-campaign-flow-content]] — next guide
- `Exam Section Based Flashcards/section-3-data-identity-segmentation` — recall drilling