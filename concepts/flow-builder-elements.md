# Flow Builder Elements for Marketing

## Core Idea
Flow Builder elements are the actions a flow can run (decisions, sends, record operations). Some elements are **marketing-specific** (Send Email/SMS, Create Consent, Path Experiment) and are available only in certain flow types.

## Prerequisites
- [[campaigns-and-flows]]
- [[consent-write-paths]]
- [[decision-branching-path-experiments]]

## Detailed Explanation

### Marketing-Specific Flow Elements

| Element | What it does | Flow types |
|---------|--------------|-----------|
| **Create Consent** | Updates consent status for a contact point related to a unified individual (Opt In/Opt Out) | Automation Event-Triggered only |
| **Determine CRM Record for Individual** | Finds if a person has a contact, lead, or prospect record; set up different paths per situation | — |
| **Einstein Decision** | Determines email engagement level via Einstein Engagement Frequency/Scoring; routes users by engagement level (if-then) | — |
| **Exit from a Flow** | Removes individuals from a specific Marketing Cloud flow (e.g., remove a customer who purchased during a campaign) | — |
| **Marketing Completion Actions** | Automate follow-up tasks (lead assignments, user notifications) | — |
| **Path Experiment** | Up to 10 versions of a journey; random assignment for unbiased outcome; automated or manual path selection | Advanced + Personalization |
| **Send Email Message** | Sends email from Salesforce CMS to an audience segment; track clicks/opens, opt-in list only, Einstein STO + real-click detection | Audience, Automation Event |
| **Send Marketing Cloud Engagement Email** | Sends email with MCE send classifications/publication lists/content via segment/event/activation/broadcast flow; no segment activation or data replication needed; Retain send log data option | — |
| **Send Mobile App Message** | Push notification from Salesforce CMS to app users | Audience, Automation Event |
| **Send Flash Message** | Flash notification from Salesforce CMS to app users | — |
| **Send RCS Message** | RCS message to an audience segment; track clicks/opens, opt-in list, STO | Audience, Automation Event |
| **Send Mobile In-App Message** | In-app message from Salesforce CMS to mobile app users | Audience, Automation Event |
| **Send SMS Message** | SMS from Salesforce CMS to an audience segment; track clicks/opens, opt-in list, STO | Audience, Automation Event |
| **Send to a Flow** | Sends individuals to a specific Marketing Cloud on-demand flow (e.g., by loyalty status) | — |
| **Send to Journey** | Sends individuals to a specific Marketing Cloud Engagement journey | Audience, Automation Event, Activation |
| **Send WhatsApp Message** | WhatsApp from Salesforce CMS to an audience segment; track clicks/opens, opt-in list | Audience, Automation Event |
| **Wait Until Event** | Resumes a flow interview after an engagement event (Email Link Click, SMS Response) or custom engagement signal | — |

### Standard Flow Elements (available in marketing flows)
- **Add to Actionable List / Remove from Actionable List** — add/remove an individual from an actionable list (Audience, Automation Event, Activation).
- **Assign to Queue / Assign to User** — marketing completion actions that assign leads (Audience only).
- **Create Campaign Member** — creates a campaign member (Audience only).
- **Create Consent** — see above (Automation Event only).
- **Create/Update/Delete/Get Records** — Salesforce record operations (all).
- **Decision** — IF/ELSE branching; evaluates outcomes in order; first match wins; unmatched → default.
- **Loop** — iterates over a collection variable.
- **Notify User** — marketing completion action sending an email notification (Audience only).
- **Path Experiment** — A/B/N test (Audience, Automation Event).
- **Subflow** — launches another active flow.
- **Transform** — maps and transforms source data to target data.
- **Wait for Conditions / Wait Until Date / Wait for Amount of Time** — pause the flow (Audience, Automation Event; Activation = partial).

### Flow Features for Marketers
| Feature | Availability |
|---------|--------------|
| **Flow Reports** | Growth + Advanced (installed at setup via data kits) |
| **On-Canvas Insights** | Advanced only (recent metrics on the flow canvas; turn on in Analytics tab) |
| **Path Experiments** | Advanced + Personalization |

### Flow Status Reference
| Status | Meaning | Available actions |
|--------|---------|-------------------|
| **Preparing** | Preparing resources, not processing | Edit, Pause, Save as new version |
| **Activated** | Running | Edit, Pause, Save as new version |
| **Finishing** | Processing remaining people/data after cancel; no new | Edit, Pause, Save as new version |
| **Completed** | Finished | Save as new version |
| **Scheduled** | Not started | Deactivate, Edit, Save, Save as new version |
| **Canceled** | Paused + deactivated | Save as new version |
| **Draft** | Not activated | Activate, Edit, Save, Save as new version |
| **Error** | Stopped due to problem | Save as new version |

### Versions & Occurrences
- **Flow version** = named iteration created when you modify + save as new version.
- **Flow version occurrence** = each time a version runs. The Flows Version Occurrence related list tracks: Progress Status, Error Details, Entries, Exits, Errors.

## Common Pitfalls / Misconceptions
⚠️ Only **one version** of a flow can be active; a **paused flow counts as active**.
⚠️ Create Consent is available only in Automation Event-Triggered flows (not Audience flows).
⚠️ Path Experiments require **Advanced edition + Personalization**.
⚠️ On-Canvas Insights is **Advanced only**.
⚠️ Event/form-triggered flows don't appear on the Marketing Calendar (no start date).

## Active Recall Questions
1. Name three marketing-specific flow elements.
2. Which flow types support Send Email Message?
3. What's the difference between a flow version and a flow occurrence?
4. Which elements are marketing completion actions?
5. What does the Einstein Decision element do?

## Related Concepts
- [[campaigns-and-flows]]
- [[audience-flows]]
- [[activation-triggered-flows]]
- [[decision-branching-path-experiments]]
- [[consent-write-paths]]

## Source References
- User-provided "Flow Builder Elements for Marketing Flows", "Flow Status Reference", "Flow Builder Features and Elements for Marketers", "Add Structure and Logic to a Marketing Flow", "Pause and Edit a Marketing Flow"