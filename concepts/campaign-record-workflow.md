# Campaign Record & Workflow

## Core Idea
The **campaign record** is the centralized hub for a marketing effort — it shows flow summaries, performance insights, and content across flows, and it's where you create the first flow (via flow trigger, template, or quick start). Campaigns and flows are distinct objects: one campaign can relate to many flows, but each flow relates to only one campaign.

## Prerequisites
- [[campaigns-and-flows]]
- [[flow-builder-elements]]
- [[segments-and-audiences]]
- [[content-and-personalization]]

## Detailed Explanation

### Permissions
- **Create and manage a campaign:** Marketing Cloud Manager permission set **OR** View Flows and Create and Edit Flows user permissions **AND** Permissions to all elements in the flow.

### Campaign Record vs. Flow Canvas
| Surface | What it shows |
|---------|---------------|
| **Campaign record** | Flow summaries (Start element + message/wait elements; >5 elements → messages in a table), sidebar (Campaign Insights, Influenced Opportunities), Overview tab (performance + deliverability insights, content across flows) |
| **Flow Builder canvas** | Advanced elements (decision branching, wait configuration) |

- For most basic campaigns, add message/wait elements in the **Next Steps** section of the campaign record.
- Some features/settings appear in Flow Builder but not on the campaign, and vice versa.

### Creating the First Flow (Three Ways)
| Method | What you get |
|--------|--------------|
| **Flow trigger** | Build Your Own tab → pick a trigger → build the flow from there |
| **Flow template** | Goal-driven flow preconfigured with key elements (e.g., follow-up email) you can customize/remove |
| **Quick start** | Common campaign use case with a preconfigured flow including CMS content (e.g., customizable email) |

Flows operate **independently** — activate each one to collect data or distribute content. You can add more flows to a campaign as you go.

### Send a Message with a Campaign (List/Segment Flow)
1. Create a campaign → Save.
2. Build Your Own → Start → **List** or **Segment**.
3. Set a schedule (**Send Now** to begin immediately — messages send only when you **activate** the campaign).
4. Select a segment or actionable list.
5. **Publish the segment** first (to send or preview membership); republish if stale.
6. Add message elements + content; for each message: edit/customize → preview/test → **publish** → configure sender + communication subscription.
7. Add a time-based wait element if needed (other elements → Flow Builder).
8. **Activate the flow** — optionally republish the segment immediately before running for the freshest data.

### Signup Form Campaign
The **signup form flow template** automatically creates and relates: **Flow + Form + (optional) Landing page**.
1. Create campaign → Build Your Own → **Browse Templates** → **Signup Form**.
2. Configure data collection: record type to create on submit (**Lead** default) + marketing channel + communication subscription (for consent).
3. Customize the form: brand, header, fields (some can't be removed depending on the consent channel), submit button, footer consent message.
4. Optionally create a marketing landing page to host the form.
5. In Flow Builder, review consent details; add a Send Email welcome message if desired.
6. **Activate the flow + publish the form**; make it accessible (embed code for external site, or customize the landing page URL alias + publish).
7. Test the form with sample data.

### Automate Tasks with a Campaign (Event Flow)
1. Create campaign → Build Your Own → Start → **Event**.
2. **Configure Event** → Flow Builder → **Select Event** → pick from the **Event Library** (e.g., **Email Subscription** for a welcome email).
3. Complete required event fields → save.
4. Add elements (Send Email Message, flow actions) → **activate**.
5. ⚠️ To change an **active** flow, **pause it first**.

### Work with Marketing Flows (Relationship Rules)
- A single campaign can contain multiple flows; each flow relates to **only one** campaign.
- ⚠️ Changing the association for an **active** flow causes reporting and data stream issues. For a **draft** flow, update the **Associated Record** field on the flow record.
- **Versions:** only one version can be active; a **paused flow is considered active**. The campaign record shows the **most recently activated version**.
- **Sharing:** a flow inherits the campaign's sharing settings. Deleting the campaign reverts to the flow's own rules (or private: owner, admins, View All Non-Setup Flows / Manage Flow).
- Deleting a campaign or flow removes the relationship but the **other record remains intact**.

### Add Structure & Logic (Flow Canvas)
- **Add/move elements:** hover the circle → **+** → select element; Cut/Copy/Paste (single or multiple via Select Elements + clipboard); Delete Element.
- **Decision branching:** outcomes evaluated **in order**; first match wins; unmatched → **default outcome**. For data graph resources: nested condition groups, aggregation on related numeric fields, date/calendar operators.
- **Exit rules:** remove a user from a flow when conditions are met (like a filter). Evaluated each time a user **starts or resumes** a flow. **Up to 10 exit rules**; conditions on global attributes, data graph attributes, related attributes, or calculated insights (numeric → aggregation functions like Average/Sum/Max/Min).

### Pause & Edit a Flow
- **Pause:** processing stops at each element; people/data held until resume. ⚠️ **Pause duration counts toward total wait time** for Wait elements; past-due tasks complete immediately on resume.
- **Edit a paused flow:** **Deactivate** (choose **Deactivate and cancel work** or **Deactivate and complete work**) → **Edit As New Version** (version number appended to name) → **Activate**.
- **Example (wait):** a 48-hour Wait element, paused 12 hours in → 24 hours elapsed since pause → next email sends 24 hours later.

### Share Standalone Flows
- **Dynamic sharing:** add **category/subcategory** on the flow's Details tab to apply admin-created criteria-based sharing rules. ⚠️ Category/subcategory must **match exactly** for the Equals operator; with Contains, only needs to include the rule's category.
- **Manual sharing:** flow record → **Sharing** → search user, public group, role, or role + internal subordinates.

## Common Pitfalls / Misconceptions
⚠️ **Messages send only when you activate the campaign.**
⚠️ **Publish the segment before sending/previewing** — republish if stale.
⚠️ **Changing an active flow's campaign causes reporting/data stream issues.**
⚠️ **A paused flow counts as active** — only one version can be active.
⚠️ **Pause duration counts toward Wait element total time.**
⚠️ **Exit rules are evaluated on start/resume** — up to 10 rules.
⚠️ **Category/subcategory must match sharing rules exactly (Equals).**

## Active Recall Questions
1. What are the three ways to create the first flow in a campaign?
2. What does the signup form flow template automatically create?
3. What must you do before sending to a segment?
4. What happens when you pause a flow with a Wait element?
5. How do you edit a paused flow?
6. What are the two ways to share standalone flows?

## Related Concepts
- [[campaigns-and-flows]]
- [[flow-builder-elements]]
- [[flow-data-operations]]
- [[campaign-reporting-tools]]
- [[audience-flows]]
- [[flow-sharing]]
- [[forms-data-sources]]

## Source References
- `sources/Campaigns_Flows_Deep_Dive.txt` — "Get Started with Marketing Campaigns and Flows", "Campaign Record vs. Flow Canvas", "Work with Campaigns", "Send a Message with a Campaign", "Create a Signup Form with a Campaign", "Automate Tasks with a Campaign", "Work with Marketing Flows", "Add Structure and Logic to a Marketing Flow", "Pause and Edit a Marketing Flow", "Share Standalone Marketing Flows"