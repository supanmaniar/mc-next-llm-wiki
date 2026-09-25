# Campaigns & Marketing Flows

## Core Idea
A **campaign** organizes the assets, audience, and metrics of a marketing effort; a **flow** is the automation engine (a flow chart on a canvas) that actually distributes content. One campaign can contain many flows, but each flow belongs to one campaign.

## Prerequisites
- [[marketing-cloud-next-overview]]
- [[segments-and-audiences]]
- [[content-and-personalization]]

## Detailed Explanation

### Campaign vs. Flow
| Term | What it is |
|------|-----------|
| **Campaign** | Object organizing assets + metadata; performance rolls up to it |
| **Flow** | Series of automated actions on an interactive canvas |
| **Marketing Flow** | A flow used for marketing (content distribution); should always relate to a campaign for reporting |

> A campaign can relate to multiple flows, but each flow relates to **only one** campaign.

### Campaign Record vs. Flow Canvas
- **Campaign record** shows flow summaries (Start element, message/wait elements) + sidebar (Campaign Insights, Influenced Opportunities). For simple campaigns, add message/wait elements in "Next Steps".
- **Flow Builder canvas** for advanced elements (decision branching).

### Flow Types (Marketing-Oriented)

| Flow Type | Trigger | Notes |
|-----------|---------|-------|
| **Audience Flow** (segment/list/campaign member) | Schedule or immediate | Runs on schedule; can republish segment before run |
| **Automation Event-Triggered Flow** | An event occurs | Runs within ~15 min of event |
| **Activation-Triggered Flow** | An activation publishes | Based on segment publish schedule |
| **Broadcast Flow** | API/Apex call | Dynamic segment, membership determined at start |
| **On-Demand Flow** | API/Apex call | For high-priority (order confirmations) |

### Flow Status Reference

| Status | Meaning |
|--------|---------|
| Preparing | Preparing resources, not yet processing |
| Activated | Running |
| Finishing | Processing remaining people, no new |
| Completed | Finished |
| Scheduled | Not started |
| Canceled | Paused + deactivated |
| Draft | Not activated |
| Error | Stopped due to problem |

### Flow Versions & Occurrences
- **Version** = named iteration when you modify + save as new version.
- **Occurrence** = each time a version runs (track progress/errors in Flows Version Occurrence list).

### Key Flow Elements for Marketing
Decision (IF/ELSE branching), Send Email/SMS/RCS/Mobile App/In-App Message, Create/Update/Delete Records, Wait elements, Create Consent, Add/Remove from Actionable List, Path Experiment (Advanced), Subflow, Transform, Loop, Get Records.

### Exit Rules
Remove a user from a flow when they meet conditions (up to 10 rules). Evaluated when a user starts or resumes a flow.

### Decision Element
Like IF/ELSE. Outcomes evaluated in order; first matching outcome wins; unmatched → default path.

### Pausing Flows
- Pause holds processing at each element until resume.
- Wait time counts toward total wait during pause.
- To edit: Deactivate (complete work or cancel work) → Edit As New Version → Activate.

### Marketing Calendar
Centralized hub for campaigns + flows. Daily/weekly/monthly views, drag campaigns to change dates (not segment flows).

## Common Pitfalls / Misconceptions
⚠️ **One flow → one campaign** (changing an active flow's campaign causes reporting/data issues).
⚠️ Only **one version** of a flow can be active; a paused flow still counts as active.
⚠️ Event/form-triggered flows don't appear on the Marketing Calendar (no start date).
⚠️ Deleting a campaign removes the relationship but **not** the flow record (and vice versa).

## Active Recall Questions
1. What's the cardinality between campaigns and flows?
2. Name three marketing-oriented flow types and their triggers.
3. What does the Decision element do, and how are outcomes evaluated?
4. What happens when you pause a flow containing a Wait element?
5. How many exit rules can a flow have?

## Related Concepts
- [[business-units]]
- [[segments-and-audiences]]
- [[content-and-personalization]]
- [[marketing-triggers]]
- [[flow-builder-elements]]
- [[audience-flows]]
- [[activation-triggered-flows]]
- [[flow-sharing]]
- [[mce-journeys-campaigns]]
- [[rest-api-flow-integration]]

## Source References
- `sources/Marketing Cloud Next Salesforce Help Information.txt` — "Get Started with Marketing Campaigns and Flows", "Comparison of Marketing-Oriented Flow Types", "Flow Status Reference"
- User-provided campaign/flow articles (Work with Campaigns, Work with Marketing Flows, Marketing Calendar, MCE Journeys)
