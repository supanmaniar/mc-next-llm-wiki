# Merge Fields & Saved Expressions

## Core Idea
**Merge fields** insert a single customer value (name, city, product) into content; **saved expressions** are reusable filter+sort criteria that pick *which single value* a data-graph merge field returns when many are possible (e.g., the most recent opportunity). Both live in the Salesforce CMS and are reusable across email, SMS, and WhatsApp.

## Prerequisites
- [[personalization-data-sources]]
- [[content-and-personalization]]
- [[data-architecture-layers]]

## Detailed Explanation

### Merge Fields
Use merge fields to personalize marketing content with customer data — a name in an email, products a visitor is interested in on a landing page.

**Where you can add them:**
- Email **subject line** and **preheader** (click **Add Merge Field**).
- **Text of your content** (Add Merge Field icon in the editing toolbar of a text-based component).

**Steps:**
1. Review and set up the [[personalization-data-sources]] for the content item — they determine which data is available.
2. Click **Add Merge Field**.
3. Select the **data source type**, then the **attribute** to insert.
4. If you select data graph attributes, **select or create an expression** to filter and sort data as needed.

> **SMS/WhatsApp:** merge fields use the **default data graph** configured in Setup (it doesn't appear in the Data Sources panel, but its data works).

### Saved Expressions
An expression defines filter and sort options **across related data objects** to select the right attribute for a merge field. It's saved in **Salesforce CMS** and reusable in email, SMS, and WhatsApp — giving consistency and reducing message design time.

**Permissions needed:**
- Create/edit content: **Marketing Cloud Manager** permission set **AND** any CMS workspace contributor role.
- Publish/unpublish content: **Marketing Cloud Manager** permission set **AND** a CMS workspace contributor role of **content admin or content manager**.

**Prerequisite:** you must have a **data graph** set up to create an expression.

**Steps to create:**
1. Content tab → open your marketing workspace.
2. **Add** | **Content** | **Expression**.
3. Give the expression a **title** (internal use).
4. Select the **data source** containing the resources/attributes you want.
5. Navigate the **resource path** to select an attribute.
6. Add **filter and sort** conditions.
7. To narrow results further, click the **plus icon next to Resource** and define more filter/sort conditions.
8. **Save** — then **publish** to make it available in marketing content. Unpublish to change it or stop its use.

### Example: Data Graph Merge Field with an Expression
Marketer **Erin** wants to share recent opportunities with partners. She uses a merge field related to both an **account** and an **opportunity**: the expression filters accounts by lead type, then sorts related opportunities in **descending date order** to get the most recent one. She saves the expression and reuses it in next month's partner email.

### Example: Expression Filter/Sort
Build an expression with filter and sort conditions to find accounts with **annual revenue greater than $10,000**.

## Common Pitfalls / Misconceptions
⚠️ **Merge fields resolve only what the data source exposes** — no data source, no attribute.
⚠️ **Expressions require a data graph** — you can't create one without it.
⚠️ **An unpublished expression isn't available in content** — publish to use, unpublish to retire.
⚠️ **SMS/WhatsApp merge fields silently use the default data graph** — you don't add it as a data source.
⚠️ **Changing a data source** after attributes are used in merge fields → delete the merge fields first, then recreate them.

## Active Recall Questions
1. Where can you add merge fields in an email?
2. What does a saved expression do, and where is it stored?
3. What permissions are needed to create vs. publish an expression?
4. What's the prerequisite for creating an expression?
5. How does Erin's example use filter + sort to return the most recent opportunity?

## Related Concepts
- [[personalization-data-sources]]
- [[dynamic-content-variations]]
- [[repeaters-and-recommenders]]
- [[content-and-personalization]]
- [[email-building-personalization]]

## Source References
- `sources/Content_Personalization_Data_Sources_Deep_Dive.txt` — "Personalize Content with Merge Fields", "Create an Expression for a Personalized Merge Field"