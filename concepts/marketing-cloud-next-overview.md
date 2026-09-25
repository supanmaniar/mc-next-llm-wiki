# Marketing Cloud Next — Overview & Setup

## Core Idea
Marketing Cloud Next is Salesforce's multichannel marketing platform that sits on top of **Data Cloud**, so before you can market to anyone you must first wire up the data foundation, identity resolution, channels, and consent.

## Prerequisites
- [[data-kits-and-data-streams]]
- [[identity-resolution-rulesets]]
- [[user-access-and-permission-sets]]

## Detailed Explanation

### What It Is
Marketing Cloud Next (Spring '26) is available in **Salesforce Enterprise and Unlimited Editions** with the **Growth** or **Advanced** edition. It supports a multichannel strategy: **email, landing pages, SMS, WhatsApp, and mobile app messaging**.

The defining trait is its relationship to **Data Cloud**: it's not a standalone email tool. Data Cloud provides the unified data model that powers segments, identity, scoring, and AI.

### Three Admin Roles
Three roles typically participate in setup (sometimes one person fills all three):

| Role | What they do |
|------|-------------|
| **Salesforce admin** (System Administrator profile) | Tasks in Salesforce Setup (click gear icon on any page) |
| **Data Cloud admin** | Install data kits, deploy data streams, configure identity resolution & scoring |
| **Marketing admin** | Any user with the **Marketing Cloud Admin** permission set; configures most Setup pages and publishes/activates campaigns & segments |

### The Setup Assistant
Access via: gear icon → Quick Find "Marketing Cloud" → **Assisted Setup → Assistant Home**.

Three sections:
1. **Basic Settings** — enable Marketing Cloud Next
2. **Required Setup** — data kits, identity resolution, channels
3. **Additional Settings** — AI features, custom domains (recommended)

You track progress via checkboxes and the **Setup checklist**.

### Enabling Marketing Cloud Next (up to 15 min)
Before you can access required/additional settings you must first enable Marketing Cloud Next in Basic Settings. Key prerequisite tasks (mostly auto-run when Salesforce adds functionality):

| Step | Troubleshooting note |
|------|---------------------|
| Enable Data Cloud | App Launcher → **Data 360** → Data Cloud Setup |
| Create Salesforce CRM connector | Data Cloud Setup → Connectors → New → Salesforce CRM |
| Add default email channel | Can't be created by admin; contact Salesforce Support |
| Add data protection details to records | Setup → Data Protection and Privacy |
| Select a data space | Active data spaces appear in dropdown |
| Other | Contact support if content/privacy tools missing |

> **Note:** For Government Cloud, manually enable the CDN (content delivery network).

## Common Pitfalls / Misconceptions
⚠️ **Marketing Cloud Next ≠ Marketing Cloud Engagement.** It's a new, Data Cloud-native product — don't assume legacy Marketing Cloud steps apply.
⚠️ **Skipping Basic Settings.** You cannot access required/additional settings until you enable Marketing Cloud Next and Data Cloud.
⚠️ Assuming a single person does everything — the roles are often split across Salesforce admin, Data Cloud admin, and marketing admin.

## Active Recall Questions
1. What three admin roles are involved in Marketing Cloud Next setup, and what does each do?
2. What is the fundamental difference between Marketing Cloud Next and a traditional email marketing tool?
3. What two things must you enable before accessing required and additional settings?
4. Which editions include Marketing Cloud Next?

## Related Concepts
- [[data-kits-and-data-streams]]
- [[identity-resolution-rulesets]]
- [[user-access-and-permission-sets]]
- [[email-domain-authentication]]

## Source References
- `sources/mktg_implementation_guide.pdf` — "Getting Started with Marketing Cloud Next Setup", "Manage Your Marketing App"
