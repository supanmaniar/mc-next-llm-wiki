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

> **Note:** Einstein Metrics Guard is NOT supported with business units.

### Example Use Case (Welo)
US ecommerce company expanding to Latin America creates a "Welo Latam" business unit to partition LatAm data/content/campaigns from North America, maintain local control, and keep global visibility.

## Common Pitfalls / Misconceptions
⚠️ Business units are **Advanced edition only**.
⚠️ A business unit ↔ data space is a strict **one-to-one** — no sharing.
⚠️ You can't deactivate the **last** remaining business unit.
⚠️ Deactivation is **permanent** — no reactivation.
⚠️ Only Marketer-Standard members can **activate flows**.

## Active Recall Questions
1. What enforces data isolation between business units?
2. What are the two member roles, and what key capability differs?
3. What's the maximum number of business units?
4. Can you deactivate the last business unit? Can you reactivate a deactivated unit?
5. Which Einstein feature is NOT supported with business units?

## Related Concepts
- [[data-kits-and-data-streams]]
- [[identity-resolution-rulesets]]
- [[campaigns-and-flows]]

## Source References
- `sources/Marketing Cloud Next Salesforce Help Information.txt` — "Business Units in Marketing Cloud Next"
