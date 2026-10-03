# Marketing Workspaces & Salesforce CMS

## Core Idea
All marketing content in Marketing Cloud Next — images, landing pages, forms, brand assets, emails — lives in **CMS content workspaces**, and each workspace is tied to a **specific business unit**, so content is isolated by team, brand, or region unless it's explicitly shared as a **common asset**.

## Prerequisites
- [[business-units]]
- [[content-and-personalization]]
- [[marketing-cloud-next-overview]]

## Detailed Explanation

### Business Units and Content
Business units in MC Next work much like those in **Marketing Cloud Engagement** and **Marketing Cloud Account Engagement** — they separate **content and data** across teams, brands, or regions.

- All marketing content (images, landing pages, forms, brand assets, emails) is stored in **CMS content workspaces**.
- **Each workspace is associated with a specific business unit.**
- This structure works alongside Data 360's **data spaces**.

### The Entity Relationships (memorize)
| Relationship | Cardinality |
|--------------|-------------|
| **Data space → business unit** | A data space can be associated with **no business units or one business unit** |
| **Business unit → content workspaces** | A business unit can be associated with **one or more content workspaces** |

### Content Filtering by Business Unit
When marketers create an asset (e.g., an email), the system displays **only the content available to the associated business unit**. The same filtering applies when selecting content from a **campaign or flow** — users see only content associated with a business unit or its aligned data space configured for that campaign or flow.

### ⚠️ Cross-Business-Unit Content Access
**By design, content cannot be accessed directly across business units.** Each CMS content workspace must be associated with a specific business unit in Setup.

**The workaround — common assets:**
- Content can be posted as a **common asset**, making it available to **all business units**.
- Users in other business units can then **copy that asset into their own workspaces** and use it locally.

### Access Control by Business Unit
| Role | Access |
|------|--------|
| **Marketing Standard** | Access to **both the data space and CMS content** |
| **Marketing Read-Only** | Access to **only the data space** (no CMS content) |

> ⚠️ Users **without** the Marketing Manager or Marketing Admin permission sets can **only** be assigned the **Marketing Read-Only** role.

### Business Unit Setup (demo)
From the **Business Units** page in Setup you can create and manage business units. Opening an existing business unit lets you:
- **Associate CMS workspaces** with it
- Assign **authenticated email domains** and configure other channel-specific settings
- Configure **preference pages for each domain**
- Enable specific **AI features**
- Add users via **Business Unit Members → Add Users** → assign a role
- Enable **common assets** from the **Business Unit Settings** page

### Marketing Workspaces
When you create content in MC Next, it's stored in a **Marketing Workspace**.

- Use the **default Marketing Cloud Content Workspace**, or create additional workspaces to organise assets by **campaign, initiative, brand, or team** — and to support collaboration across teams.
- **Share content** between marketing workspaces, or with a **general workspace** used by other users. Example: manage brand assets in a marketing workspace, then share them with a general workspace so other teams can use them.
- **Organise content into folders** within each workspace.
- **Export content assets** and import them into another Salesforce org — e.g., moving content between **production and sandbox** orgs.
- **Manage access at the workspace level** (in addition to business-unit-level roles).

**Creating a workspace:** Content tab → **Add Workspace** → choose **Marketing Workspace** → enter a name and **default language**. Marketing Workspace is designed for creating and managing marketing content.

### Content Types
MC Next supports many content types. You don't need to know all of them, but be familiar with the most commonly used: **images, landing pages, forms, and emails**. See [[content-and-personalization]].

### Content Lifecycle (demo)
1. Open an email → **Edit** → drag components from the components panel onto the canvas.
2. Each component has its own **properties** (size, spacing, padding, colour) — e.g., resize an image to 60%.
3. **Save** changes.
4. ⚠️ **Before content can be used, it must also be published.**

### Forms and Landing Pages (demo)
A form must exist **before** it can be placed on a page:
1. Create a new **form** component.
2. Add a **data source** — choose the CRM object where submissions should create records (e.g., name it "leads", select the **Lead** object).
3. Name the form and add fields to capture (first name, last name, email address); adjust formatting/appearance.
4. **Save** the form.
5. Select **New Flow** to create a **form handler** — Flow Builder pre-adds a **Create Records** element with mappings between form fields and the corresponding Lead record fields.
6. ⚠️ **Publishing the form also activates the associated flow.**
7. Create a **landing page**, add the published form, add other elements (e.g., a header image), configure the **page title and SEO title**, then **save and publish**.
8. When a visitor submits the form, the flow runs and **creates a new Lead record in CRM**.

## Common Pitfalls / Misconceptions
⚠️ **Content cannot be accessed directly across business units** — use **common assets** (post, then copy into the target workspace).
⚠️ A **data space** maps to **no business unit or one**; a **business unit** maps to **one or more workspaces**.
⚠️ **Marketing Read-Only** role = data space only, **no CMS content**.
⚠️ Users without Marketing Manager/Admin permission sets can **only** be Marketing Read-Only.
⚠️ **Saving content isn't enough — it must be published** before it can be used.
⚠️ **Publishing a form activates its flow** — the two are linked.
⚠️ A form must exist before it can be added to a landing page.

## Active Recall Questions
1. Where is all marketing content stored, and what is each workspace associated with?
2. What are the cardinalities between data spaces, business units, and content workspaces?
3. How can content be shared across business units, and what's the limitation?
4. Which role gets CMS content access, and which gets data space only?
5. What can you configure from a business unit's setup page?
6. What must happen before content can be used, and what happens when you publish a form?
7. How do you move content between production and sandbox orgs?

## Related Concepts
- [[business-units]]
- [[content-and-personalization]]
- [[forms-data-sources]]
- [[landing-pages]]
- [[user-access-and-permission-sets]]
- [[sandbox-and-deployment]]

## Source References
- `sources/MCNext_Consultant_Exam_Masterclass_Session3.txt` — Elliot Harper, "Marketing Cloud Next Consultant Exam Masterclass" Session 3 (Salesforce, Summer '26)
- `sources/Marketing Cloud Next Salesforce Help Information.txt` — "Organize and Share Content in a Marketing Workspace", "Enhanced CMS Workspaces"
