# Audience Flows

## Core Idea
An **audience flow** is the unified flow creation experience for all audience-based, scheduled marketing flows. It runs on a schedule and sends messages to a specified audience, chosen from **four audience sources**: Segment, List, Record, or Campaign.

## Prerequisites
- [[campaigns-and-flows]]
- [[flow-builder-elements]]
- [[segments-and-audiences]]

## Detailed Explanation

### The Four Audience Sources
| Audience source | Audience type | When to use |
|-----------------|---------------|-------------|
| **Segment** | Data 360 segment members | Reach people based on profile data and attributes |
| **List** | Actionable list members | Reach a specific, user-managed group |
| **Record** | Records matching specified criteria | Reach contacts or leads based on field values |
| **Campaign** | Campaign members | Reach people associated with a campaign |

The source you select determines which flow type is created and how the audience is defined.

### When to Use Audience Flows
Use an audience flow to reach a defined group on a schedule:
- Send a promotional email to customers who purchased in the last 30 days (Segment).
- Follow up with attendees after importing event registration data into a list (List).
- Target contacts in a specific region based on CRM fields (Record).
- Send a special offer to everyone associated with a high-value campaign (Campaign).

### Scheduling
- Audience flows run on a **schedule** or can be executed **immediately**.
- A scheduled audience flow can run **once** or **recurring** (as often as every hour).
- For scheduled **segment flows**, you can configure the start step to **publish the target segment immediately** before running — ensuring membership is as up-to-date as possible. If you don't republish, the segment defaults to its defined publishing schedule.

### Re-entry Conditions (Journey Builder parallel)
Audience flows feel **very familiar to anyone with Journey Builder experience** in Marketing Cloud Engagement. When you choose a **recurring schedule**, you configure both the **execution schedule** and the **re-entry conditions** for the flow.

This mirrors Journey Builder's **contact entry mode**, which controls when a contact is eligible to enter a journey. Journey Builder provides **three entry options**:
1. **No re-entry**
2. **Re-entry at any time**
3. **Re-entry only after exiting**

The same concept applies to audience flows — you define exactly **when an individual is eligible to rejoin a scheduled flow**.

### List-Triggered Flows (Summer '26)
A key addition in the **Summer '26** release is support for **list-triggered flows**, allowing you to work seamlessly across different audience types such as **segments and actionable lists**. See [[crm-integration-and-actionable-lists]].

### Flow Canvas Actions
From the Flow canvas you can add a wide range of actions and logic, including:
- **CRUD operations** (create, read, update, delete) on Salesforce records
- Integration with **external platforms** using an extensive library of available actions
- **Send Email Message** and other messaging elements (configured via the properties panel)

### Flow Types (Marketing-Oriented) — Quick Reference
| Flow type | Trigger |
|-----------|---------|
| **Activation-Triggered** | An activation publishes (refresh every 10 min incremental / 24 hr standard) |
| **Automation Event-Triggered** | An event occurs (executed within ~15 min) |
| **Broadcast** | API/Apex call; uses dynamic segments (membership determined after start) |
| **On-Demand** | API/Apex call; high-priority use cases (order confirmations) |
| **Audience** | Schedule or immediate; segment/list/record/campaign members |

### Broadcast Flow Details
- Uses **dynamic segments** to determine eligibility; membership determined after the flow starts.
- Execute programmatically via **API request** or **Apex call**; can also be executed by another flow (subflow).
- Can run **asynchronously** (Async run type) — allows Wait elements; if referenced via subflow, starts in a separate transaction.

### On-Demand Flow Details
- Triggered as-needed for high-priority use cases (order confirmation email).
- An API request can include event info (order ID, purchase amount).
- Execute via API request or Apex call.

## Common Pitfalls / Misconceptions
⚠️ Audience flows run on a schedule — event/form-triggered flows don't appear on the Marketing Calendar (no start date).
⚠️ Broadcast flows use **dynamic** segments; membership is determined after the flow starts.
⚠️ For segment flows, republish the segment before running to get the freshest membership.
⚠️ A recurring audience flow can run as often as every hour.
⚠️ **Re-entry conditions** apply to recurring schedules — mirror Journey Builder's three contact entry modes (no re-entry / any time / only after exiting).
⚠️ Audience flows **unify** segment, list, CRM record, and campaign member sources — there aren't separate flow types for each.

## Active Recall Questions
1. What are the four audience sources for an audience flow?
2. How often can a recurring audience flow run?
3. What's the difference between a broadcast flow and an on-demand flow?
4. Why republish a segment before running a scheduled segment flow?
5. What are the three re-entry options, and which MCE feature do they mirror?
6. What did Summer '26 add to audience flows?

## Related Concepts
- [[campaigns-and-flows]]
- [[flow-builder-elements]]
- [[segments-and-audiences]]
- [[activation-triggered-flows]]
- [[marketing-flow-types]]
- [[crm-integration-and-actionable-lists]]

## Source References
- User-provided "Audience Flows", "Comparison of Marketing-Oriented Flow Types", "Create a Broadcast Flow"
- `sources/MCNext_Consultant_Exam_Masterclass_Session2.txt` — Elliot Harper, "Marketing Cloud Next Consultant Exam Masterclass" Session 2 (Salesforce, Summer '26)