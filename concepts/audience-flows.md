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

## Active Recall Questions
1. What are the four audience sources for an audience flow?
2. How often can a recurring audience flow run?
3. What's the difference between a broadcast flow and an on-demand flow?
4. Why republish a segment before running a scheduled segment flow?

## Related Concepts
- [[campaigns-and-flows]]
- [[flow-builder-elements]]
- [[segments-and-audiences]]
- [[activation-triggered-flows]]

## Source References
- User-provided "Audience Flows", "Comparison of Marketing-Oriented Flow Types", "Create a Broadcast Flow"