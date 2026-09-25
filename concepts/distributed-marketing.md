# Distributed Marketing & Alerts

## Core Idea
Distributed Marketing and Alerts lets marketers share **approved email templates** with non-marketing users (sales reps) so they can send on-brand, compliant one-to-one or bulk emails — with locked brand content and approved phrases/images.

## Prerequisites
- [[marketing-cloud-next-overview]]
- [[content-and-personalization]]
- [[campaigns-and-flows]]
- [[email-creation-editing]]

## Detailed Explanation

### What It Solves
Non-marketing users (sales reps, account teams) need to send emails that stay on-brand and compliant. Marketers build approved templates, then non-marketers personalize within locked boundaries.

### Admin Setup (high-level)
1. Turn on Distributed Marketing & Alerts (Setup → "Distributed").
2. Assign Content Workspace + Builder permissions (marketers).
3. Assign permission sets to non-marketing users:
   - **Marketing Cloud Manager** + **Send Distributed Marketing Messages** (to send templated emails)
   - **Tableau Next Included App Business User** + **View Unified Engagement History Dashboards** (to view UED dashboard)
   - **Tableau Next Included App Business User** + **Send Distributed Marketing Messages** (to view Distributed Sends dashboard)
4. Install/update Marketing Performance Intelligence.
5. Add dashboard components to record pages.

### Configure an Approved Template
- Up to **30 approved images** and **30 approved phrases**.
- Images: only **one** can be the default; can't be "required" (only phrases can be required/locked).
- Phrase set as **required** = locked (user can't edit).
- Subject line/preheader can be locked or unlocked.
- Parent component locking cascades to nested components.
- **Default vs. required vs. blank:** a default appears automatically (user can edit/remove); a required phrase is locked; if neither, the section shows as a **blank placeholder**.
- **Subject/preheader:** if unlocked, users can enter custom text even when approved options exist — **lock the field** to force approved options only.

**Template content building:**
- Approved subject lines/preheaders: add a default subject/preheader first, then turn on **Approved content** to add variations.
- Approved images: drag **Approved Images** (Media category); add caption/hyperlink/alt text; set as default (one only).
- Approved phrases: drag **Approved Phrases** (Basic category); format; include by default or require (lock).
- Add **instructions** on how to use the template; publish the template.
- **Data source:** add the prebuilt **Distributed Marketing and Alerts Message Event** as the Event Data Provider type to use/preview certain merge fields.

### Making the Template Available
1. Create an **event-triggered flow** with the **Distributed Marketing and Alerts Message** event type.
2. Configure sender settings:
   - **Scheduled sending** — allow non-marketers to schedule their send.
   - **Send on behalf of** — allow sending from a specific From address (create a custom lookup field on the campaign object in Setup first).
3. Add flow elements to handle scheduling + cancellation:
   - **Wait Until Date** element (Event → Scheduled Time, **Get from Attribute**) for scheduled sends.
   - **Get Records** element (Data Source = Salesforce Object → **List Email**; filter List Email ID = Event → List Email Id).
   - **Decision** element — check `List Email from Get List Email | Status` **Equals** **Scheduled**.
   - **Send Email Message** element on the scheduled branch → select the published template + workspace/folder. Canceled emails go down the alternate path and **aren't sent**.
4. **Activate** the flow — non-marketers can then use the template.

### Sending (non-marketer)
**Permissions:** **Send Distributed Marketing Messages** permission set **AND** **Marketing Cloud Manager** permission set.

Entry points:
- Lead/contact/prospect/person account/campaign record → **Distributed Messages** component → **Send Email Messages**.
- Lead/contact/prospect **list view** → **Send Distributed Message**.
- **Campaign members** related list → checkbox-select members → **Send Distributed Message**.

Steps: select the campaign with the template → personalize unlocked sections or choose approved content (only if the marketer configured variations) → preview with a recipient → select From and Reply-to → schedule or send immediately.

**Unschedule an email:** App Launcher → **List Emails** → dropdown → **Unschedule** → confirm. ⚠️ Unscheduling **cancels** the email (and any emails scheduled with it in the campaign). To send on a new schedule, **recreate** it.

### Performance Monitoring
- **Distributed Sends dashboard** (Distributed Sends tab; you only see **your own** sends):
  - **Individual Email** — one-to-one sends (Total Recipients filter = 1–1).
  - **Bulk Email** — bulk sends (Total Recipients defaults > 1).
  - **Bulk Email Recipient Activity** — per-recipient engagement.
  - Filters: **Activity Type** (opens/clicks), **Engagement Date**, **Send Mechanism Name** (keep = **Distributed Marketing**).
- **Unified Engagement History dashboard** (on lead/contact/person account record pages; admin adds the component).
- **Identify Top Engaged Unified Individuals** agent action.

## Common Pitfalls / Misconceptions
⚠️ You can't set an **image** as required (only phrases).
⚠️ Only **one** default image allowed.
⚠️ Senders need BOTH the Send Distributed Marketing Messages permission set AND Marketing Cloud Manager.
⚠️ Non-marketers only see approved content variations if the marketer configured them.
⚠️ **Unscheduling cancels the email** — and any emails scheduled with it in the same campaign.
⚠️ **Lock the subject/preheader** to stop users entering custom text instead of approved options.
⚠️ The Distributed Sends dashboard only shows **your own** sends.

## Active Recall Questions
1. What's the maximum number of approved images and phrases per template?
2. Which content type can be marked "required" (locked)?
3. What two permission sets does a non-marketing sender need?
4. What kind of flow makes an approved template available to non-marketers?
5. How does the flow prevent sending when a user cancels an email?
6. What are the three views of the Distributed Sends dashboard?

## Related Concepts
- [[content-and-personalization]]
- [[campaigns-and-flows]]
- [[email-creation-editing]]
- [[flow-builder-elements]]
- [[reporting-metrics-dashboards]]

## Source References
- `sources/Marketing Cloud Next Salesforce Help Information.txt` — "Distributed Marketing and Alerts"
- `sources/Email_Deep_Dive.txt` — "Distributed Marketing and Alerts", "Configure an Approved Email Template for Non-Marketing Users", "Make an Approved Email Template Available to Non-Marketing Users", "Send an Email with an Approved Distributed Marketing Template", "Monitoring Performance for Distributed Marketing Messages"
