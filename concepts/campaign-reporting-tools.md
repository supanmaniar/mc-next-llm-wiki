# Campaign Reporting & Monitoring Tools

## Core Idea
Marketing Cloud Next offers several tools to monitor campaign success: **Marketing Performance Intelligence** dashboards, **on-canvas flow analytics**, the **Campaign Stage** field (derived from all flows in the campaign), **Opportunity Influence**, the **Marketing Calendar**, the **Email Not Sent Reasons** table, and **Agentforce** for campaign generation and performance insights.

## Prerequisites
- [[campaign-record-workflow]]
- [[reporting-analytics-setup]]
- [[reporting-metrics-dashboards]]
- [[opportunity-influence-b2b-analytics]]
- [[mce-journeys-campaigns]]

## Detailed Explanation

### Marketing Performance Intelligence
- Admins configure dashboards for marketers.
- **Performance tab** = aggregate analytics; **campaign sidebar → Performance > Insights** = individual campaign insights; **Performance > Deliverability** = campaign-specific email deliverability dashboard.

### Flow Analytics Reporting (On-Canvas Insights)
- **Advanced edition** — certain flow types support on-canvas analytics.
- Messaging element insights (Send Email/SMS/RCS) require the **Tableau Next Included App Business User** permission set.
- **Element Analytics tab:** run count, success count, error count, average duration; messaging engagement metrics: Sends, Delivery Rate, Opt-Out Rate, Reads, Failed Deliveries, Response Rate, Click-Through Rate.
- **Date range filter:** presets (Last 7/30 Days) or Custom; start date must be **on or after the flow's activation date**.
- **Open Details** → element record page Analytics tab (⚠️ consumes **Data Cloud credits**; run data can lag).
- ⚠️ After **Winter '26**, admins must uninstall/reinstall Marketing Performance for detailed analytics; embedded analytics aren't available for runs completed **before Winter '25**.

### Campaign Stage Field
Derived from **all flows** in the campaign (admin must add to the page layout + set field-level security).

| Campaign Stage | Flow status scenario |
|----------------|----------------------|
| **In Planning** | ≥1 flow Scheduled/Preparing Data (no In Progress/Finishing), OR ≥1 flow Draft (no Scheduled/Preparing/In Progress/Finishing) |
| **In Progress** | ≥1 flow In Progress or Finishing |
| **Completed** | ≥1 flow Completed; no Draft/Scheduled/Preparing/In Progress/Finishing/Error |
| **Error** | ≥1 flow Error; no Draft/Scheduled/Preparing/In Progress/Finishing |
| **Canceled** | ≥1 flow Canceled; no other statuses |
| **Paused** | ≥1 flow Paused; no Scheduled/Preparing/In Progress/Finishing |

### Opportunity Influence
- Uses engagement data from contacts related to **Closed/Won** opportunities to attribute revenue to campaigns.
- Admin must enable it in Setup; then **Influenced Opportunities** appears on the campaign sidebar under Performance.

### Marketing Calendar
- **Permissions:** Marketing Cloud Admin OR Marketing Cloud Manager OR **Access Marketing Calendar** user permission (Sales users).
- Default calendars: **Campaigns, Campaign Segment Flows, Segment Flows** (can hide, can't delete/customize colors).
- Daily/weekly/monthly views; click an event for type/status/start date/segments/population; manage campaigns/flows directly; create a **custom object calendar**; add events linked to campaigns.
- **Drag a campaign to change its date; can't drag segment flows.**
- Integrated with the **Sales Calendar**; record-level sharing applies (you only see what you have access to).
- ⚠️ **Event and form-triggered flows don't appear** on the calendar (no specific start date).

### Email: Not Sent Reasons
The **NotSentReason** field maps to the **Engagement Action Reason** field of the **Email Engagement DMO** (view in Data Explorer).

| Reason | Resolution |
|--------|-----------|
| Internal error while sending | Try again later |
| Can't verify recipient consent | Confirm consent, retry |
| Promotional email without opt-in | Get opt-in consent first |
| Reached/exceeded sending allowance | Purchase more entitlements |
| Data graph lacks valid personalization | Review data |
| From address not authorized | Validate From address |
| Invalid number of data graphs | Review data graphs |
| Missing recipient email | Add at least one recipient |
| Unsupported preference center merge field | Review the merge field |
| Can't retrieve profile attributes | Review profile data |
| Hard bounce in previous send | Address removed; retry |
| Syntax errors in render | Fix the message |
| TTL exceeded | Try again later |

### Related Landing Pages
- Manually add a landing page's **URL alias** to the campaign's **Related Landing Pages** related list to relate its reporting metrics to the campaign (admin adds the list to the layout).

### AI in Marketing Cloud Next (Campaign Generation)
- **Draft with Agentforce** → describe the campaign objective → the **Campaign Creation agent** generates a draft brief + campaign preview (proposed name, flow, multichannel message content).
- Ground the brief in a **CMS brand** + strategic grounding fields (goals, KPIs, priority, guardrails); optionally make the campaign **conversational** (adds a **"Forward to Agent"** final step to the flow).
- **Refine Flow / Refine Message** to adjust structure, channels, tone, and wait times.
- ⚠️ After saving the campaign you **can't refine preview steps** — unlink the campaign from the brief to start a new preview. Removing a brief keeps segments/content but the agent can no longer help.
- **Generate Campaign Insights** agent action analyzes the **first flow** in the campaign (channel engagement over time + recommendations).
- **Agent actions are powered by Salesforce Flow** (Create a Campaign from a Brief, Draft a Campaign Brief, Save Campaign Brief, Save Campaign) — admins can modify these flows; ⚠️ required custom campaign fields need the Save Campaign Brief/Save Campaign flows updated.
- **Content Builder sparkle button** — AI drafts/revises email/landing page/SMS text grounded in the brief, brand, and canvas content.

## Common Pitfalls / Misconceptions
⚠️ **Campaign Stage is derived from all flows** — one Error flow can make the whole campaign Error.
⚠️ **Event/form-triggered flows don't appear on the Marketing Calendar.**
⚠️ **You can't drag segment flows on the calendar.**
⚠️ **Open Details in Flow Performance consumes Data Cloud credits.**
⚠️ **NotSentReason maps to the Email Engagement DMO's Engagement Action Reason field.**
⚠️ **After saving a campaign, preview steps can't be refined.**
⚠️ **Embedded analytics aren't available for runs before Winter '25.**

## Active Recall Questions
1. What are the six Campaign Stage values, and what drives them?
2. Which permission sets can access the Marketing Calendar?
3. What does the NotSentReason field map to?
4. What's the "Forward to Agent" step in conversational AI campaigns?
5. What happens if you remove a brief from a campaign?

## Related Concepts
- [[campaign-record-workflow]]
- [[reporting-analytics-setup]]
- [[reporting-metrics-dashboards]]
- [[opportunity-influence-b2b-analytics]]
- [[mce-journeys-campaigns]]
- [[agentic-marketing]]

## Source References
- `sources/Campaigns_Flows_Deep_Dive.txt` — "Tools for Tracking and Reporting on Campaigns", "Manage Campaigns and Flows with Marketing Calendar", "Add an Event to the Marketing Calendar", "Marketing Cloud Engagement Journeys and Campaigns", "AI in Marketing Cloud Next", "View Embedded Element Analytics and Detailed Insights"