# Segment Canvas & Filters

## Core Idea
The Segment Canvas lets you build audiences by dragging **direct** (1:1, N:1) and **related** (1:N) attributes into containers, applying aggregation, AND/OR nesting, and advanced grouping/ranking/limiting — with population counts to validate each filter's impact.

## Prerequisites
- [[data360-segment-types]]
- [[data-architecture-layers]]

## Detailed Explanation

### Direct vs. Related Attributes
| Type | Meaning | Examples |
|------|---------|----------|
| **Direct attribute** | A single data point about the segmented entity (often demographic) | Postal code, first name, birthday — 1:1 (one name) or N:1 (many employees → one department) |
| **Related attribute** | A collection of data points (often behavioral/engagement events) | Purchase history, product numbers, email interactions — 1:N (one customer → many orders) |

### Containers
When you filter with a **related attribute**, a **container** is created, and the related attribute's DMO becomes the **container object**.

- **Same container** = attributes act on the *same data row* (AND logic on one record). E.g., "yellow" + "scarf" in one container → a single yellow scarf in one order.
- **Separate containers** = no relationship between them, filters apply independently. "Yellow" in one container + "scarf" in another → bought *any* yellow product AND *any* scarf.

### Aggregation (in containers)
Quantifies results before filtering:

| Type | Meaning | Example |
|------|---------|---------|
| **Count** | How many times criteria must be met | "At least 5 purchases" |
| **Sum** | Attribute summed across values | Lifetime value > $X |
| **Average** | Averages across values | Avg satisfaction = 3.5 |
| **Max** | Maximum value | Max order < $X |
| **Min** | Minimum value | Min order > $X |

### Filter Limits & Nesting
- **50 filters** per tab (Include / Exclude); aggregations count toward this.
- **100 attributes** per segment.
- **20 filters** per container.
- **Nesting:** up to **3 levels** within a container; up to **10 levels** across containers.
- **Include / Exclude tabs**: excluded records are subtracted from included population.

### Relationships & Paths
- **Direct tab** — DMOs with 1:1 or N:1 relationship from the Segment On object.
- **Related tab** — DMOs with 1:N relationship.
- **Container paths** — when a container has multiple routes back to the segment-on entity (e.g., an order with both Buyer ID and Seller ID), choose the path that builds the intended audience.
- **Cyclic paths** (a→b→a) degrade performance and are blocked by default.
- Joins are **case-sensitive** — mismatched case means records don't link.

### Key/Foreign Key
Primary key and foreign key attributes **don't appear** on the canvas. To use them, create a **custom attribute** not assigned as PK/FK.

### Population Counts
- **Segment count** — entity count from filters (excludes profiles with Data Deletion/Restrict Processing requests).
- **Filter-level count** — direct attributes (e.g., Gender = Female count).
- **Container-level count** — related attributes (distinct count in that container).
- **Approximate Segment Population** — a 95%-confidence range estimate (enable in Feature Manager); less accurate for small populations.
- **Total / Included / Excluded population** — overall entities, those passing include minus exclude, and those excluded.

### Value Matching (Queries)
- Queries honor **exact matching** on special characters/accents and are **case-insensitive** for text.
- Type matching is exact: string `0852` ≠ `852` (leading zero) or `"0852"` (with quotes).
- `Is In` / `Is Not In` accept up to 100 values (bulk paste up to 10,000 for `Is In`).

### Group, Rank, and Limit (Advanced Multi-Level Filtering)
After standard Include/Exclude, apply sequential logic:
1. **Group By** — bundle records by a shared attribute (e.g., Account ID).
2. **Sort By** — order records within each group (e.g., by Fit Score descending).
3. **Limit** — restrict records per ranked group (e.g., top 10 accounts).

Rules:
- Max **3 group rules** + **3 sort rules** per ruleset.
- Applies **only within** qualified profiles (not global ranking).
- Records filtered out land in **Excluded Population**.
- Only **direct attributes** and aggregatable calculated insights; **related attributes not supported** for ranking/limiting.
- Not supported for DBT, real-time, or dynamic segments (waterfall: child segments only).
- A segment using these rules can be nested only in **Last Membership** mode.

### Attribute Shortcuts
Save a reusable **segment-on object + path + target attribute** as a named shortcut to avoid re-navigating the attribute library.
- Appear in a dedicated **Shortcuts tab** (only after the first shortcut is saved).
- **500 per tenant**, scoped to data space, saved at org level.
- Packageable via DataKits (sandbox-compatible).
- Operate at the **filter level** (not container level) — don't capture aggregation context.

### Other Filtering Features
- **Nested segments** — reuse an existing segment as a filter (outer/inner); child segments in `Last Published Membership` or `Segment Criteria` mode.
- **Hierarchical aggregation** — roll up revenues across account hierarchies (Account/Unified Account; up to 5 containers, 3 levels per DMO).
- **Vector filters (Beta)** — NLP-based `Is Similar To` operator for unstructured data.
- **Currency data type** — normalize multi-currency values via a currency code during filter/aggregation.
- **Event time** — engagement DMOs process up to **24 months** of the event date field value.
- **Calculated insights** — search by name or under the referenced object; boolean-measure CIs unsupported.

### Segmentation Operators (by data type)
- **Date** — `Is Anniversary Of`, `Is Today/Yesterday/Tomorrow`, `Is Between`, `Last/Next Number Of Days/Months/Years`, `Day/Month Of Week/Year`, `Has Value/No Value`, etc. (use org time zone).
- **Numeric** — `Is Equal/Less/Greater Than`, `Is Between`, `Has Value/No Value`, etc.
- **Text** (incl. URL/phone/email) — `Contains`, `Matches` (regex), `Begins With`, `Exists As A Whole Word`, `Is In`, `Is Not In`, etc.
- **Boolean** — `Is True`, `Is False`, `Has Value/No Value`.

## Common Pitfalls / Misconceptions
⚠️ Attributes in **separate containers** are unrelated — don't assume cross-container AND logic (that's what same-container AND gives you).
⚠️ Object joins are **case-sensitive** — `c12d3` won't match `C12D3`.
⚠️ Queries honor exact matching (leading zeros, accents) — `Canon City` ≠ `Cañon City`.
⚠️ Ranking/limiting applies only within Qualified profiles, and only to direct attributes.
⚠️ Engagement DMO event window caps at **24 months** — wider ranges fail.

## Active Recall Questions
1. What's the difference between a direct and a related attribute?
2. How do same-container vs. separate-container attributes differ in filtering logic?
3. What are the five aggregation types, and what does each do?
4. What are the nesting limits (container vs. across containers)?
5. What three steps make up Group/Rank/Limit?

## Related Concepts
- [[data360-segment-types]]
- [[data-architecture-layers]]
- [[segments-and-audiences]]

## Source References
- `sources/Salesforce_D360_Segments.txt` — "Segment Canvas", "Segment Your Data with Attributes", "Filtering Using Containers and Attributes", "Aggregation", "Group, Rank, and Limit Segment Audience", "Segmentation Operators in Data 360"