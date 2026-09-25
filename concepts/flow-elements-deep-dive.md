# Flow Elements Deep Dive (Messaging, Decision, Path Experiment, Subflow, Wait)

## Core Idea
Flow Builder elements are the building blocks of a marketing flow. This page deep-dives the **messaging elements** (Send Email/SMS/RCS/Mobile/In-App), the **Decision element** (manual vs. AI logic), **Path Experiments** (A/B/N testing with automated winner selection), the **Subflow element** (calling other flows), and the **Wait elements** (pausing for time, dates, conditions, or events).

## Prerequisites
- [[flow-builder-elements]]
- [[campaign-record-workflow]]
- [[decision-branching-path-experiments]]
- [[engagement-signals]]

## Detailed Explanation

### Flow Features for Marketers
| Feature | Availability |
|---------|--------------|
| **Flow Reports** | Growth + Advanced (installed at setup via data kits) |
| **On-Canvas Insights** | Advanced only (recent metrics on the canvas; turn on in the Analytics tab) |
| **Path Experiments** | Advanced + Personalization |

### Send Email Message Element
Available in: automation event-triggered, broadcast, on-demand, and segment-triggered flows. Email sends based on the Start element's schedule; multiple Send Email elements separated by Wait elements send only after wait conditions are met.

**Inputs:**
- **Email** — content (populated from the campaign's email template; can select different CMS content).
- **Einstein STO** (optional) — predicts optimal send times (admin must enable).
- **Einstein Metrics Guard** (optional) — filters security-scanner clicks/opens (admin must enable).
- **Select Sender** — from Organization-Wide Addresses in Setup.
- **CC** (optional) — static addresses or dynamic (flow resource / data graph field).
- **BCC** (optional) — org compliance BCC; only if admin turns on BCC + grants override access.
- **Archive Emails** (optional) — saves copies of sent emails (only after turned on).
- **Track Clicks / Track Opens** (optional).
- **Communication Subscription** (optional) — sends only to opted-in recipients.

⚠️ Emails sent via this element **don't include signatures from My Email Settings** — add one to the template.

### Send SMS Message Element
Available in: automation event-triggered, broadcast, on-demand, and segment-triggered flows.
- **SMS** content, **Sender ID** (Unified Messaging Setup), **Track Clicks**, **Communication Subscription**, **Communication Subscription Channel Type ID**.

### Send RCS Message Element
Available in: automation event-triggered and segment-triggered flows.
- **RCS Message**, **RCS Agent** (Unified Messaging Setup), **Communication Subscription** + **Channel Type ID**, and **Messaging Session Window**:
  - **Any Time** — send regardless of active session.
  - **Not During Active Sessions** — skip while a session is Active; send when status changes.
  - **Not During Open Sessions** — skip while a session isn't Error/Ended; send when it changes to Error/Ended.

### Send Mobile App Message (Push) Element
Available in: audience flows only.
- **Push Notification Message** (CMS content) + **Sender App** (Unified Messaging Setup).

### Send Mobile In-App Message Element
Available in: audience flows only.
- **In-App Message**, **Sender App**, **Message Expiration** (Default = **180 days** after activation; Custom; Dynamic), **Display Trigger** (System Event or Custom Event with criteria), **Display Options** (priority, delay, display frequency: Once / Every Time the Display Trigger Activates / Fixed Display Limit).

### Send to Journey Element
Sends individuals to a specific MCE journey.
- Supports only journeys with status **Running** that use an **API event entry source**; the MCE business unit must be linked to the **same data space** as the flow.
- **Individual ID → SubscriberKey** in the MCE Data Extension; contact point email → journey's default email.
- If a journey is **Paused**, records queue and enter when resumed.
- Supported in: segment/list/campaign member/record criteria/automation event/activation/on-demand/broadcast flows.

### Decision Element (Deep Dive)
Two logic methods:

| Method | Evaluation |
|--------|-----------|
| **Define Manually (Default)** | Outcomes evaluated **in order** — order matters; first match wins |
| **Define with AI (Advanced)** | AI evaluates all outcomes **simultaneously** — order has no impact |

- **When to Execute Outcome** (record-triggered flows): runs the outcome only if the triggering record **changed to meet** the conditions (e.g., stage changed to Closed Won from any other value).
- ⚠️ **AI Decision isn't supported for Marketing Cloud flows or record-triggered flows.**
- ⚠️ Downstream references to an outcome's value are set only if that outcome was evaluated and matched; later outcomes are null; the default outcome has no value.

### Path Experiment Element (Deep Dive)
- **Prerequisites:** Marketing Cloud Manager or Admin permission set + personalization features set up. Available in **automation event-triggered flows and segment flows**.
- **Automated path selection (recommended):** configure performance metric (standard event like Email Link Clicks, or a custom engagement signal), test group %, duration. Uses **Bayesian prediction**; a path is declared winner at **≥95% confidence** to beat all others; otherwise fallback behavior.
- **Manual path selection:** test a subset of the audience (one-time flows only) with a delay for the remaining group.
- **Paths:** each path has a label, API name, and percentage; **total must equal 100%**. Random assignment is **probability, not exact division** — small audiences can deviate from the set percentages.
- **Reentry:** each individual always receives the same path when reentering (via loop or Go To connector).
- **Manually select a winning path:** Winning Path dropdown on an activated flow — sends all new/remaining/delayed members down that path; **doesn't require saving a new flow version**.
- **Analytics tab:** participant counts, performance metrics, confidence levels (segment flows with status Activated/Completed/Canceled/Error; no data if Error).
- **History tab:** all changes after activation (who, when, automated/manual) — for Activated/Canceled/Error.
- **Notifications:** the user who activated the flow gets an in-app notification when the experiment completes (not sent if that user is deactivated).

### Subflow Element
Launches another **active** flow (the **referenced flow**).
- ⚠️ **You can't call flows that contain wait elements.**
- ⚠️ Only flow admins can run inactive flows — for other users, the flow fails at run time if the referenced flow has no active version.
- **Set Input Values:** variable API names ≤ **40 characters** (longer → save error). A `null` value for a non-collection text/picklist/multi-select picklist variable converts to an empty string.
- **Store Output Values:** assigned when the referenced flow finishes.
- **Version behavior:** API 61.0+ → screen/record-triggered flows call the **active version** by default (fallback to latest); run latest via Debug option or `?latestSub=true` URL suffix.

### Wait Elements
⚠️ **Flows with Wait elements must be autolaunched**; can't combine Wait elements with screens/choice/choice sets.

| Element | What it does |
|---------|--------------|
| **Wait for Conditions** | Resumes after specific conditions are met; each wait configuration has optional wait conditions; if all resume events have unmet conditions, the flow runs the **default path** |
| **Wait Until Date** | Resumes at a calendar date/time (**Enter Date**) or a record attribute's date (**Get from Attribute**); no resume time/time zone → **12 AM org time zone**; past/no-value attribute → pauses then resumes immediately |
| **Wait for Amount of Time** | Resumes after a duration; optional "Resume at a specific time of day" (if the amount expires after the resume time, waits until the next day's resume time) |
| **Wait Until Event** | Resumes after an engagement event (Email Link Click, SMS Response) or custom engagement signal; ⚠️ place **immediately after** the element being monitored; dynamic links/merge-field links unsupported (use **Any Link**); has a max wait time → timeout path |

**Resume events:** **Specific Time** (flow-based or record-based base time + offset number/unit in Days or Hours; negative = before) or **Platform Event Message** (resume on any message, or filtered by conditions; store the message in a record variable matching the platform event — needs Customize Application permission).

### Engagement Signals (Deep Dive)
- Configured using a **primary engagement DMO** + mapped fields; used by custom recommender objectives, custom attribution models, and personalization experiments.
- **Only DMOs categorized as Engagement**; only mapped DMOs/fields; related DMOs must be 1:1 or many-to-one; **only one related DMO**.
- **Item identifier required** for custom objective-based recommenders.
- A **count-based metric** is created by default for each signal.
- **Identifiers:** User, Timestamp, Item, Event.
- **Counting:** discrete events (each occurrence) vs. group repeat events via added fields (count as one signal).
- **Available in flows** checkbox: excludes related objects (unsupported in flows); enables use in both Salesforce Personalization and MC Next automation event-triggered flows.
- **Custom automation events from engagement signals = Advanced edition only.**
- Filters: All Conditions Are Met (AND) / Any Conditions Is Met (OR); operators: Is Equal To, Is Less Than, Is Greater Than, Is Not Equal To, Has No Value, Has Value.

## Common Pitfalls / Misconceptions
⚠️ **Send Email doesn't include My Email Settings signatures.**
⚠️ **AI Decision isn't supported for Marketing Cloud flows.**
⚠️ **Path Experiment percentages are targets, not exact counts** (probability-based assignment).
⚠️ **Subflow can't call flows with wait elements; variable API names ≤ 40 chars.**
⚠️ **Wait elements require autolaunched flows** and can't mix with screens/choice.
⚠️ **Wait Until Event must be immediately after the monitored element.**
⚠️ **Engagement signals: only Engagement-category DMOs; one related DMO; item identifier needed for recommenders.**

## Active Recall Questions
1. What are the two Decision logic methods, and how does evaluation differ?
2. What confidence level declares a Path Experiment winner?
3. What are the restrictions on Subflow elements?
4. What happens if you don't set a resume time/time zone on Wait Until Date?
5. Which engagement signal identifiers exist, and when is the item identifier required?
6. What's the default in-app message expiration?

## Related Concepts
- [[flow-builder-elements]]
- [[campaign-record-workflow]]
- [[flow-data-operations]]
- [[decision-branching-path-experiments]]
- [[engagement-signals]]
- [[mce-journeys-campaigns]]

## Source References
- `sources/Campaigns_Flows_Deep_Dive.txt` — "Flow Builder Features and Elements for Marketers", "Send Email/SMS/RCS/Mobile App/In-App Message Elements", "Send to Journey Element", "Decision Element", "Path Experiment Element", "Subflow Element", "Wait Elements", "Configure an Engagement Signal"