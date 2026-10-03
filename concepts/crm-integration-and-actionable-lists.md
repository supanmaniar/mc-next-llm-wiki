# CRM Integration & Actionable Lists

## Core Idea
Marketing Cloud Next is a Lightning app built on Data 360, so historically all audience data had to live in Data 360 — but since **Spring '26** you can use **CRM records directly** as an audience source, and since **Summer '26** you can work with **campaign members and actionable lists**, reducing the Data 360 dependency.

## Prerequisites
- [[marketing-cloud-next-overview]]
- [[data-architecture-layers]]
- [[people-records-prospects]]

## Detailed Explanation

### The Shift Away from a Data 360 Dependency
Because MC Next is a Lightning app built on Data 360, earlier releases required audience, decisioning, and personalization data to exist **in Data 360**. That dependency has been progressively reduced:

| Release | What it added |
|---------|---------------|
| **Spring '26** | Use **CRM records directly** as an audience source — on a **schedule** or based on an **event** |
| **Summer '26** | Work with **campaign members** and **actionable lists** |

### The Four Integration Areas
1. **Sales Data Kit** — creates pre-configured data streams and mappings for common CRM objects: **leads, contacts, accounts, prospects**, plus related objects. See [[data-kits-and-data-streams]].
2. **Flow support** — MC Next works directly with CRM audiences: add campaign members or CRM records on a schedule, or respond to **Change Data Capture (CDC)** events (record created/updated).
3. **Actionable lists** — a fixed collection of audience members (Summer '26).
4. **Reporting** — standard Salesforce CRM reports alongside Data 360 data, including reports based on **DMOs**, plus analytics experiences such as the **Unified Engagement History Dashboard**.

### Flow Operations on Salesforce Records
Within Flow, you can perform standard operations on Salesforce records using the **Get, Create, Update, and Delete Records** elements — CRM integration extends beyond audience selection into data manipulation. See [[flow-data-operations]].

### Actionable Lists
An **actionable list** is a **fixed (static) collection** of audience members — useful when you already know exactly who you want to engage.

**Typical examples:**
- Attendees captured at a trade show
- Selected leads or contacts from CRM
- A curated audience that needs to be activated

**Creating one (demo flow):**
1. From the **Lead or Contact** tabs, select existing CRM records and add them directly to an actionable list — *or* import a CSV.
2. Click **Import → Import from File**, choose the CSV, and enable **Add to Actionable List**.
3. Select an **existing** actionable list or **create a new one**.
4. Review **field mappings** to confirm everything maps correctly.
5. Click **Start Import**.
6. Open the **Actionable Lists** tab to see the members added.

Once created, the audience is ready to be used in MC Next for **activation and engagement**.

### ⚠️ The Consent Gap (critical exam point)
If you create an actionable list containing **new leads or contacts**, Marketing Cloud Next **does not automatically create corresponding consent records** for them. Those consent records must be **created or loaded separately**.

> **Why this matters:** MC Next is strict opt-in — no consent record means opted out. An actionable list of brand-new leads will be **suppressed at send time** until consent is written through a supported path. See [[consent-and-compliance]] and [[consent-write-paths]].

### Using Actionable Lists in Flows
Actionable lists are consumed by **list-triggered flows**, which are now part of the unified **audience flow** experience. See [[audience-flows]] and [[marketing-objects-ampscript-handlebars]].

## Common Pitfalls / Misconceptions
⚠️ **Actionable lists don't create consent records** — new leads/contacts need consent loaded separately or they'll be suppressed.
⚠️ An actionable list holds **leads OR contacts, never both**.
⚠️ Actionable lists are **static**; segments are **dynamic**.
⚠️ CRM records can be used as an audience source, but the **Sales Data Kit** is still the fastest path to identity resolution and engagement features.
⚠️ Only the **list's creator** can manually remove members from the record page.

## Active Recall Questions
1. What did Spring '26 and Summer '26 each add to CRM integration?
2. What does the Sales Data Kit create, and which objects does it cover?
3. What is an actionable list, and when would you use one?
4. What happens to consent when you add new leads to an actionable list?
5. Which flow elements let you operate on Salesforce records directly?
6. Which reporting experiences combine CRM reports with Data 360 data?

## Related Concepts
- [[data-kits-and-data-streams]]
- [[people-records-prospects]]
- [[audience-flows]]
- [[marketing-objects-ampscript-handlebars]]
- [[flow-data-operations]]
- [[consent-and-compliance]]
- [[reporting-metrics-dashboards]]

## Source References
- `sources/MCNext_Consultant_Exam_Masterclass_Session2.txt` — Elliot Harper, "Marketing Cloud Next Consultant Exam Masterclass" Session 2 (Salesforce, Summer '26)
- `sources/Marketing Cloud Next Salesforce Help Information.txt` — "Use Actionable Lists in Marketing Cloud Next", "Deploy or Update the Sales Data Kit"
