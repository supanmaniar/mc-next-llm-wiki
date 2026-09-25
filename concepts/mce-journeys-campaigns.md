# Marketing Cloud Engagement Journeys & Campaigns

## Core Idea
Use the **campaign object as a shared workspace** across Marketing Cloud Engagement and Marketing Cloud Next — associate MCE journeys to a campaign to streamline workflows and enable in-depth reporting.

## Prerequisites
- [[campaigns-and-flows]]
- [[distributed-marketing]]
- [[reporting-analytics-setup]]

## Detailed Explanation

### Associating Journeys to Campaigns
- When you create a campaign, you can select a **Quick Start** option (preconfigured flow) or **Build Your Own** (create campaign + flow from scratch).
- Connect MCE journeys to a Campaign to group them into a larger marketing effort and automatically create a grouped view of their marketing performance.

### Multi-Org Scenarios
- Marketing Cloud Engagement+ supports customers with **multiple orgs**.
- If org A builds campaign A and associates journey A, that same journey **isn't available** for org B to relate to campaign B.

### Campaign Reporting with Journeys
- For **new journeys**, reporting begins when the journey is connected to a Campaign.
- For a **running journey**, Salesforce attempts to associate historical send/engagement data to the newly-associated campaign. The amount depends on when data was brought into MC Next and Data 360.
- Example: connect an MCE account to Data 360 in Jan 2026 → backfill 45–90 days of historical data. Connect an activated welcome journey to a Campaign in Feb 2026 → it displays analytics from June 2025 to Feb 2026.

### Connecting Journeys to Campaigns
1. From the Campaigns tab, create a campaign → Save.
2. Click **+** next to Journeys on the Campaign page.
3. Select journeys in Marketing Cloud Engagement.
   - The journey **can't already be connected** to a Campaign.
   - A journey can be connected to **only one** Campaign.
   - Journeys must be in **Draft, Running, Finishing, Paused, or Stopped** mode.
   - **Limit of 20 associated journeys per Campaign**.
4. Click **Add**.

### Marketing Calendar
- Centralized hub for campaigns + flows (daily/weekly/monthly views).
- By default you see campaigns, campaign segment flows, and segment flows calendars (can hide, can't delete/customize colors).
- Drag a campaign to change its date; **can't drag segment flows**.
- Event/form-triggered flows **don't appear** on the calendar (no start date).
- Access: Marketing Cloud Next home page, Marketing Calendar tab, or App Launcher. Integrated with the Sales Calendar.
- Create a **custom object calendar** (editable, deletable, personalized colors).
- Add events to the calendar and link them to campaigns.

## Common Pitfalls / Misconceptions
⚠️ A journey can be connected to **only one** Campaign and can't already be connected.
⚠️ Max **20 journeys** per Campaign.
⚠️ Journeys must be in Draft/Running/Finishing/Paused/Stopped mode to connect.
⚠️ Event/form-triggered flows don't appear on the Marketing Calendar.
⚠️ You can't drag segment flows to change their date on the calendar.

## Active Recall Questions
1. What's the limit of associated journeys per Campaign?
2. What journey modes are required to connect to a Campaign?
3. Why might a running journey show limited historical data?
4. What can't you do with segment flows on the Marketing Calendar?

## Related Concepts
- [[campaigns-and-flows]]
- [[distributed-marketing]]
- [[reporting-analytics-setup]]
- [[flow-sharing]]

## Source References
- User-provided "Marketing Cloud Engagement Journeys and Campaigns", "Connect Marketing Cloud Engagement Journeys to Campaigns", "Manage Campaigns and Flows with Marketing Calendar", "Add an Event to the Marketing Calendar"