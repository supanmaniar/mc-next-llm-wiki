# Marketing Objects, AMPscript & Handlebars

## Core Idea
Beyond the data graph, you can store marketer-owned data in **marketing objects** (like legacy data extensions) and read it into messages using **AMPscript** or **Handlebars**, and you can reach fixed lists of known individuals with **actionable lists** — giving marketers autonomy without admin dependencies.

## Prerequisites
- [[data-architecture-layers]]
- [[email-building-personalization]]
- [[content-and-personalization]]

## Detailed Explanation

### Marketing Objects (vs. Data Extensions)
A **marketing object** stores data for marketing use cases. If you used Marketing Cloud Engagement, think of them as similar to **data extensions**. Create one by **importing data from a CSV file** (columns become fields; data type is inferred).

**Why use them:** flexible, high-performance storage for reference data, product information, and content variations — without maintaining separate data sources or complex integrations. Marketers keep **autonomy**: no Salesforce/Data 360 admin is required; any Marketing Admin or Manager with the right permission can create/manage them.

**Data types** (fixed max length — unlike data extensions, you can't change it):

| Type | Capacity |
|------|----------|
| Text | Up to 255 characters |
| Number | Integer up to 18 digits |
| Decimal | Decimal up to 18 digits |

**Resource allocations (per edition):**

| Resource | Growth | Advanced |
|----------|--------|----------|
| Storage | 10 GB | 40 GB |
| Marketing objects | 25 | 100 |
| Columns per object | 100 (both) | 100 (both) |

**Permissions:**
- `ViewAllMarketingObjectRecords` — view records from any marketing object.
- `ManageMarketingObjects` — view + create/delete marketing objects.
- Data Management tab must be set **Default On** for marketing users (Profiles → Marketing User → Tab Settings).

### Managing Marketing Objects (Lifecycle)
**Create (from CSV):** Data Management tab → Marketing Data panel → Marketing Objects → **New** → **From File** → upload CSV → name + API name (+ optional description) → review field names (edit name/API name/data type via pencil) → mark **Primary Key** fields → save.
- ⚠️ You can select **more than one primary key field**, but marketing objects **don't support composite keys**.
- Data types are **inferred** from the CSV; the object contains only the columns in the file.

**Full refresh:** Data Explorer tab → **Upload from file** → **Full Refresh** → upload CSV. ⚠️ This **deletes** the object's data and replaces it with the file's data; the file **must have the same columns** as the object. Needs `Manage Marketing Objects` + `Modify All Marketing Object Records`.

**Add/modify fields:** Edit → **Add Field** (Field Name, API Name, Data Type, Primary Key). You can add fields anytime (empty or populated object).
- ⚠️ **Field API name, data type, and primary key designation can't be changed after creation** — delete the field and recreate it (deleting a field **permanently removes its data**).
- Schema changes complete in a few seconds; while processing, you can't make more schema changes (fields show a **"Read Only"** indicator), but the object stays available for queries and record creation.

**Insert records:** Data Explorer → **Add Records** (manual entry for small numbers; use CSV for larger loads).

**Delete records:** Data Explorer → select records → **Delete Records** (needs `Manage Marketing Objects` + `Modify All Marketing Object Records`).

**Delete an object:** Delete → confirm. ⚠️ **Deletes all contained data and can't be restored.** Before deleting, remove references from all content, campaigns, briefs, and flows — **if any other object refers to the data, you can't delete it**.

### Reading Marketing Object Data (AMPscript & Handlebars)
Identifiers:
- Marketing object API name + `__mo` (e.g., `CustomerRewardMembers__mo`)
- Field API name + `__c` (e.g., `RewardsPoints__c`)
- Data graph field reference = `$dataGraph.<Field>` (e.g., `$dataGraph.Email__c`)

**AMPscript** — use the `Lookup()` function to cross-reference a marketing object with a data graph value:
```amp
%%[
SET @points = Lookup(
    CustomerRewardMembers__mo,
    RewardsPoints__c,
    EmailAddress__c,
    $dataGraph.Email__c)
]%%
<p>Your reward points balance is %%=v(@points)=%%!</p>
```

**Handlebars** — use the `QueryFirst` helper (`queryFirst type="MO"`):
```handlebars
{{set points=(
  get (queryFirst type="MO"
    object="CustomerRewardMembers__mo"
    EmailAddress__c=$dataGraph.Email__c)
  "RewardsPoints__c")}}
<p>Your reward points balance is {{points}}!</p>
```

You can use AMPscript/Handlebars in messages built via the **visual editor** or the **API**. Always **preview and test** before publishing.

### Actionable Lists
An **actionable list** is a **fixed (static) collection** of audience members — ideal for quickly reaching a specific set of known individuals (e.g., trade-show sign-ups). Contrast with segments, which update **dynamically**.

- A list can contain **either leads or contacts, but not both**.
- **Create:** import a CSV (from Leads or Contacts tab), toggle **Add to Actionable List** on during import.
- **Use in a campaign:** add a **list-triggered flow** to the campaign.
- **Automate:** add/remove members with flows (Add to / Remove from Actionable List elements).
- **Remove members manually:** only the **list's creator** can remove members from the record page.

### Enhanced CMS Workspaces (Sharing)
Workspaces can be **shared** so one workspace (source) makes content available to others (targets):
- Only **content contributors in the source** can change source content.
- Target workspaces see shared content in a **"Shared with Workspaces" folder**.
- **Cascading rule:** sharing Space A → B lets B use A's content, but if B is shared to C, publishing to C **doesn't publish A's assets** — you must share A → C directly.
- If source content is unshared, it's unpublished in the target's channels wherever referenced.
- Can't delete the **default** marketing workspace; delete others only after unpublishing + removing sharing relationships.

### Other Reusable Content
- **Brands** — colors, fonts, buttons, identity, tone (assign a default brand).
- **Reusable content blocks** — text/images/links/buttons stored in the workspace, added to any email/landing page; use **variation rules** for per-audience blocks.
- **Custom tracked links** — report clicks on externally-managed content.

## Common Pitfalls / Misconceptions
⚠️ Marketing objects ≠ data extensions exactly — you **can't change a field's max length** once created.
⚠️ **Field API name, data type, and primary key designation are immutable after creation** — delete + recreate the field (which deletes its data).
⚠️ **Multiple primary key fields are allowed, but composite keys aren't supported.**
⚠️ **Full refresh deletes and replaces all object data** — the replacement CSV must have the same columns.
⚠️ **Deleting a marketing object is permanent** (all data gone, can't restore) and is blocked if any other object references it.
⚠️ AMPscript uses `%%...%%` + `Lookup()`; Handlebars uses `queryFirst type="MO"` — both reference `__mo`/`__c` identifiers.
⚠️ Actionable lists = **static**; segments = **dynamic**. A list holds leads OR contacts, never both.
⚠️ Workspace sharing doesn't transitively publish source assets — share the original source directly to each target.
⚠️ Only a list's **creator** can manually remove members.

## Active Recall Questions
1. What are the three data types (and their limits) available in marketing objects?
2. What are the Growth vs. Advanced allocations for storage and object count?
3. In AMPscript, what function retrieves marketing object data, and what identifier suffix marks a marketing object vs. a field?
4. How do actionable lists differ from segments?
5. In a multi-workspace share chain (A→B→C), why might an image fail to publish to C?
6. Which field properties can't be changed after a marketing object field is created?
7. What happens during a full refresh, and what must the replacement CSV match?
8. When can't you delete a marketing object?

## Related Concepts
- [[data-architecture-layers]]
- [[email-building-personalization]]
- [[content-and-personalization]]
- [[personalization-data-sources]]
- [[segments-and-audiences]]
- [[user-access-and-permission-sets]]

## Source References
- `sources/Marketing Cloud Next Salesforce Help Information.txt` — "Marketing Objects in Marketing Cloud Next", "Use Actionable Lists in Marketing Cloud Next", "Use Marketing Object Data in Messages", "Organize and Share Content in a Marketing Workspace", "Enhanced CMS Workspaces"
- `sources/Marketing_Objects_Deep_Dive.txt` — user-provided Salesforce Help articles (Marketing Objects, Data Types & Resource Allocations, Configure Marketing Objects, Manage Marketing Objects, Use Marketing Object Data in Messages)