# Business Units in Marketing Cloud Next

## Core Idea
Business units create isolated "divisions" inside a single org — each with its own data space, content workspaces, and campaigns — so a global company can run separate brands/regions with data isolation while leadership keeps global visibility.

## Prerequisites
- [[marketing-cloud-next-overview]]
- [[data-kits-and-data-streams]]
- [[identity-resolution-rulesets]]

## Detailed Explanation

### What Business Units Are (Advanced Edition only)
Business units partition an org by marketing goal. Examples: separate brands, geographic regions, product lines, or audience segments.

> Available only in **Marketing Cloud Next Advanced Edition**.

### Data Isolation via Data Spaces
- A business unit maps to **exactly one data space**, and that data space can't be related to any other business unit (one-to-one).
- This keeps data isolated between business units.

### Content Isolation via CMS Workspaces
Business units also separate **content**, not just data. All marketing content (images, landing pages, forms, brand assets, emails) is stored in **CMS content workspaces**, and **each workspace is associated with a specific business unit**.

| Relationship | Cardinality |
|--------------|-------------|
| **Data space → business unit** | No business units **or one** business unit |
| **Business unit → content workspaces** | **One or more** content workspaces |

- When marketers create an asset, the system shows **only content available to the associated business unit**.
- The same filtering applies when selecting content from a **campaign or flow**.
- ⚠️ **Content cannot be accessed directly across business units.** The workaround is **common assets** — post content as a common asset (available to all business units), then users in other units **copy it into their own workspace**. See [[marketing-workspaces-and-cms]].

### Business Unit Roles and Content Access
| Role | Access |
|------|--------|
| **Marketing Standard** | Both the **data space and CMS content** |
| **Marketing Read-Only** | **Data space only** (no CMS content) |

> ⚠️ Users **without** the Marketing Manager or Marketing Admin permission sets can **only** be assigned the **Marketing Read-Only** role.

### The Initial Business Unit
- To turn on business units, you create the **first two** business units consecutively.
- Your current marketing config (data space + default content workspace) becomes the **first** business unit.
- Existing users with Marketing Cloud Admin/Manager permission sets are added as members.

### Business Unit Members (2 roles)

| Role | Capabilities |
|------|-------------|
| **Marketer-Standard** | Activate flows in campaigns; Content Manager role in workspaces (create/edit/view/publish) |
| **Marketer-ReadOnly** | Can't activate campaigns; can send promotional messages + view dashboards; no workspace access (for sales reps) |

### Common Assets
A library making content available to ALL business units. Members post copies of workspace content; any member can copy it to their own workspace.

### Key Considerations
- You can create up to **150 business units**.
- **Deactivation is permanent** — can't reactivate; can't deactivate the last remaining business unit.
- Once assigned, you **can't change** a data space, workspace, campaign, or brief's business unit.
- Deactivation restrictions: flows can't activate, can't add members/channels/DLO filters, AI disabled.

### Per-Business-Unit Setup Tasks
After creating business units, some settings are per-unit, others org-wide:
- Data kits (install per data space)
- Identity resolution rulesets (one per data space per object)
- DLO filters (BusinessUnitId/DataSpaceId with OR condition)
- Channels (assign to all or single unit)
- Marketing Performance Intelligence (per unit)
- Personalization data graph
- Scoring models
- Einstein features (STO, Engagement Frequency, Scoring)

**From the business unit setup page you can also:** associate **CMS workspaces**, assign **authenticated email domains** and other channel-specific settings, configure **preference pages for each domain**, enable specific **AI features**, add **members** (Business Unit Members → Add Users → assign role), and enable **common assets** (Business Unit Settings).

> **Note:** Einstein Metrics Guard is NOT supported with business units.

### Example Use Case (Welo)
US ecommerce company expanding to Latin America creates a "Welo Latam" business unit to partition LatAm data/content/campaigns from North America, maintain local control, and keep global visibility.

## Common Pitfalls / Misconceptions
⚠️ Business units are **Advanced edition only**.
⚠️ A business unit ↔ data space is a strict **one-to-one** — no sharing.
⚠️ **Content can't be accessed directly across business units** — use **common assets** (post, then copy).
⚠️ **Marketing Read-Only** role = data space only, **no CMS content**.
⚠️ Users without Marketing Manager/Admin permission sets can **only** be Marketing Read-Only.
⚠️ You can't deactivate the **last** remaining business unit.
⚠️ Deactivation is **permanent** — no reactivation.
⚠️ Only Marketer-Standard members can **activate flows**.

## Active Recall Questions
1. What enforces data isolation between business units?
2. What are the two member roles, and what key capability differs?
3. What's the maximum number of business units?
4. Can you deactivate the last business unit? Can you reactivate a deactivated unit?
5. Which Einstein feature is NOT supported with business units?
6. What are the cardinalities between data spaces, business units, and content workspaces?
7. How is content shared across business units, and which role gets CMS content access?

## Related Concepts
- [[data-kits-and-data-streams]]
- [[identity-resolution-rulesets]]
- [[campaigns-and-flows]]
- [[marketing-workspaces-and-cms]]
- [[user-access-and-permission-sets]]

## Source References
- `sources/Marketing Cloud Next Salesforce Help Information.txt` — "Business Units in Marketing Cloud Next"
- `sources/MCNext_Consultant_Exam_Masterclass_Session3.txt` — Elliot Harper, "Marketing Cloud Next Consultant Exam Masterclass" Session 3 (Salesforce, Summer '26)
