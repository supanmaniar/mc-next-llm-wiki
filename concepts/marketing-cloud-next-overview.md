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

### Where It Sits: The Marketing Cloud Portfolio
Marketing Cloud Next is **one product** inside the broader **Marketing Cloud** portfolio (the brand, not a product). The portfolio also includes **Salesforce Personalization** (real-time personalization), **Marketing Intelligence** (AI-powered analytics), and **Loyalty Management** (no-code B2B/B2C loyalty). MC Next is the evolution of **Marketing Cloud Engagement**. See [[marketing-cloud-portfolio]].

### The Six Configuration Steps
Setup is best thought of as **configuration, not implementation** — MC Next and Data 360 can be enabled in a few clicks with a guided interface. At a minimum there are **six key configuration steps** (plus optional steps not required for core functionality):

1. **Set up Data 360**
2. **Enable Marketing Cloud**
3. **Deploy the required data streams**
4. **Add the company physical address** (Setup → Company Information) — appears in the footer of promotional emails for regulatory compliance
5. **Create an authenticated domain** (generate DNS records → publish via DNS provider)
6. *(plus any channel-specific steps)*

Steps 1–3 are driven by the **Marketing Cloud Next Setup Assistant**, each initiated with a single button click that starts the automated enablement process. Steps 4–5 are additional required tasks completed after enablement.

> **MCE vs. MC Next domain setup:** in Marketing Cloud Engagement a **sender authentication package** configures the sending domain; in MC Next you add an **authenticated domain**, generate the DNS records, and publish them through your DNS provider. See [[email-domain-authentication]].

### Three Admin Roles
Three roles typically participate in setup (sometimes one person fills all three):

| Role | What they do |
|------|-------------|
| **Salesforce admin** (System Administrator profile) | Tasks in Salesforce Setup (click gear icon on any page); assigns the two permission sets before configuration begins |
| **Data Cloud admin** | Install data kits, deploy data streams, configure identity resolution & scoring |
| **Marketing admin** | Any user with the **Marketing Cloud Admin** permission set; configures most Setup pages and publishes/activates campaigns & segments |

### Two Permission Sets Required Before Configuration
A user with a **System Administrator profile** must assign **two permission sets** to anyone configuring Marketing Cloud Next:

| Permission Set | Grants |
|----------------|--------|
| **Data Cloud Architect** | Access to Data 360 setup and data modelling objects; install data kits, deploy data streams, configure identity resolution, and other admin tasks |
| **Marketing Admin** | Configure most marketing settings in Salesforce Setup; publish and activate campaigns and segments |

> ⚠️ **Data Cloud Architect** replaced the old **Data Cloud Admin** permission set in the **Spring '26 release**. See [[user-access-and-permission-sets]].

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
⚠️ **Marketing Cloud is a portfolio, not a product** — MC Next is one of four products in it. See [[marketing-cloud-portfolio]].
⚠️ **Skipping Basic Settings.** You cannot access required/additional settings until you enable Marketing Cloud Next and Data Cloud.
⚠️ Assuming a single person does everything — the roles are often split across Salesforce admin, Data Cloud admin, and marketing admin.
⚠️ **Data Cloud Architect** (not Data Cloud Admin) is the current permission set name — renamed in Spring '26.
⚠️ **System Administrator is a profile, not a permission set** — a common exam distractor.
⚠️ MCE uses a **sender authentication package**; MC Next uses an **authenticated domain** — different setup paths.

## Active Recall Questions
1. What three admin roles are involved in Marketing Cloud Next setup, and what does each do?
2. What is the fundamental difference between Marketing Cloud Next and a traditional email marketing tool?
3. What two things must you enable before accessing required and additional settings?
4. Which editions include Marketing Cloud Next?
5. Name the four products in the Marketing Cloud portfolio.
6. What are the three tasks the Setup Assistant guides you through?
7. Which two permission sets must be assigned before configuration, and which replaced Data Cloud Admin?
8. What are the two additional required tasks after enablement?

## Related Concepts
- [[marketing-cloud-portfolio]]
- [[data-kits-and-data-streams]]
- [[identity-resolution-rulesets]]
- [[user-access-and-permission-sets]]
- [[email-domain-authentication]]

## Source References
- `sources/mktg_implementation_guide.pdf` — "Getting Started with Marketing Cloud Next Setup", "Manage Your Marketing App"
- `sources/MCNext_Consultant_Exam_Masterclass_Session1.txt` — Elliot Harper, "Marketing Cloud Next Consultant Exam Masterclass" Session 1 (Salesforce, Summer '26)
