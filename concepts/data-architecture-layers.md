# Data Architecture Layers (DLO, DMO, Data Graph, Data Lags)

## Core Idea
Data in Marketing Cloud Next flows through distinct layers — raw **DLO** → standardized **DMO** → unified profile via **identity resolution** → exposed to personalization via the **data graph** — and each layer runs on its own schedule, so not all data is available everywhere instantly.

## Prerequisites
- [[data-kits-and-data-streams]]
- [[identity-resolution-rulesets]]

## Detailed Explanation

### The Three Data Layers
Data doesn't automatically become available everywhere just because it's in Data 360. It moves through layers:

1. **Data Lake Object (DLO)** — the "intake area." Raw source data lands here exactly as it came in, unprocessed, in the source system's own format.
2. **Data Model Object (DMO)** — the standardized structure. Data 360 maps DLO records to DMOs, giving every source a common shape (e.g., a loyalty-app "member" and a Service Cloud "contact" both map to recognizable, comparable types).
3. **Unified Individual** — the resolved profile. Identity resolution stitches standardized DMO records from multiple systems into a single, resolved customer profile. The original DMO records still exist; a new, unified version is created on top.

**Key:** Segmentation is built on **Unified Individuals**, so each person appears once (no duplicates, no double-sends).

### Data Graphs: The Access "Map"
Even when data exists in Data 360, it isn't automatically available in Marketing Cloud Next. A **data graph** defines *which* DMO objects and fields are exposed for personalization and decisioning — a map of what Marketing Cloud Next can access.

- Every data graph starts with **Unified Individual as the primary object** (Marketing Cloud Next *requires* this) and connects related DMOs (e.g., Loyalty Program Member, Sales Order).
- Each connected DMO contributes its own fields.
- The segment driving a flow is also built on Unified Individual — the two must align.

**Rule:** A field must be *explicitly included* in the data graph before Marketing Cloud Next can use it. Data existing in Data 360 does not automatically make it available.

### What Each Component Draws From

| Component | Data source |
|-----------|-------------|
| **Segment** (flow audience entry) | DMO layer in Data 360 |
| **Email merge fields & dynamic content** | Data graph |
| **Decision splits in flows** | Data graph |
| **Get Records element in a flow** | Salesforce Core (e.g., Contacts, Leads, Accounts — bypasses Data 360) |
| Loyalty tier / purchase history / engagement scores | Data 360 — must be in the data graph |

### Data Graph Design Decisions
Before building a graph, an admin decides **three things**:
1. **Which objects** to include.
2. **Which fields** are actually needed (less is more — fields **can't be removed** after save).
3. **Refresh frequency** (daily vs. weekly; infrequent data doesn't need hourly refresh).

Also choose between **standard ingestion** (physically copies data into the data lake) and **zero copy** (reads data in place from an external platform).

### Zero Copy (Two Modes)
- **Live query mode** — fetches data on demand; only updates the data graph after a scheduled batch refresh (may take hours).
- **Acceleration mode** — stores a cached copy refreshing on a schedule (as often as every 15 min); more current but stored in Data 360.

### Data Access from Salesforce Objects
Flows can draw directly from standard Salesforce objects (Contacts, Leads, Accounts) **without** going through Data 360 — e.g., a **Get Records** element checking for an open support case or active account status.

### The Five-Stage Ingestion Workflow & Time Lags

Data moves **sequentially** through five stages, each on its own schedule:

| Stage | What happens | Typical lag |
|-------|--------------|-------------|
| 1. **Data stream ingestion → DLO** | Source data lands in a DLO | ~3 min (streaming/CDC) or ~10 min (batch fallback); first-time extraction up to 24 hrs |
| 2. **DMO mapping** | Raw DLO mapped to standardized DMO | Same ingestion cycle, no added delay |
| 3. **Identity resolution → Unified Individual** | Records stitched into one profile | A few hours up to ~24 hrs (least predictable stage) |
| 4. **Segment refresh** | New profiles evaluated against criteria | 15–30 min after publish/refresh |
| 5. **Data graph refresh** | Personalization fields updated | Up to 24 hrs, or sooner with manual **Refresh Now** |

### Ingestion Mechanisms (Stage 1 detail)
- **CRM connector** (data already in Salesforce) uses **Change Data Capture (CDC)** to stream changes (~3 min). Falls back to batch (~10 min) if CDC unsupported or formula fields included.
- **Ingestion API** (external sources) arrives on scheduled batch cycles (may lag several hours).

### Identity Resolution Timing
Runs ~**once per day** by default (or more frequently for smaller changed-record sets). Least predictable stage; depends on schedule and change volume. **Real-time identity resolution** is available for use cases needing immediate matching (e.g., personalizing a website the moment a known customer browses).

### Practical Implication (Weekend-Purchase Scenario)
A purchase made Saturday morning typically becomes a flow-eligible, personalized recipient by Monday, but a **late Sunday purchase may miss a Monday-morning launch** because identity resolution hasn't completed. To improve coverage, an admin can **manually publish the segment** and **trigger a data graph refresh** before launch.

## Common Pitfalls / Misconceptions
⚠️ **Data in Data 360 ≠ data available everywhere.** A field must be explicitly added to the data graph.
⚠️ Fields **cannot be removed** from a data graph after save — plan carefully (less is more).
⚠️ Identity resolution runs ~daily, not real-time, by default — plan launch timing around it.
⚠️ Marketing Cloud Next requires **Unified Individual** as the primary DMO of the data graph.
⚠️ DLO = raw/unmapped; DMO = standardized; Unified Individual = resolved. Don't conflate them.

## Active Recall Questions
1. What are the three data layers, and what does each do?
2. Why doesn't data automatically become available just because it's in Data 360?
3. What three decisions must an admin make before building a data graph?
4. Name the five stages of the ingestion workflow and their typical lags.
5. Which component draws from Salesforce Core directly (bypassing Data 360)?

## Related Concepts
- [[data-kits-and-data-streams]]
- [[identity-resolution-rulesets]]
- [[segments-and-audiences]]
- [[campaigns-and-flows]]

## Source References
- `sources/Salesforce_Trails.txt` — "Explore the Underlying Data Architecture", "Configure Segments and Data Graphs", "Navigate Data Lags"
