# Data Kits & Data Streams

## Core Idea
Data kits are pre-built packages of Data Model Objects (DMOs), fields, and data connections that make Marketing Cloud Next work. You install them, and their data streams auto-deploy in Data Cloud — like plugging in the wiring before you turn on the lights.

## Prerequisites
- [[marketing-cloud-next-overview]]
- Basic understanding of Data Cloud connectors

## Detailed Explanation

### What Data Kits Do
Data kits contain the "plumbing" for Marketing Cloud Next. They include DMOs (Data Model Objects), metadata, relationships, and data streams that flow data into Data Cloud. Without them, nothing works.

### Required Data Kits (by Setup Label)

| Setup Label | Package Name | Details |
|-------------|-------------|---------|
| **Marketing Setup Objects Data Kit** | `Marketing Cloud Consent Objects` | Two bundles: `MarketingSetup_General` and `SMSAddOn_General` (SMS bundle only if using SMS add-on) |
| **Consent Objects Data Kit** | `UnifiedMessagingConsent` | Contains `ConsentAuditTrail` and `MessagingConsent` data streams |
| **Flows Integration Data Kit** | `Salesforce Data Cloud - Flow Integration` | Contains Flows data bundle + two Flow Run data streams (Ingestion API) |
| **Email Channel Data Kit** | `MessagingEventsEmailEngagement` | Contains `MessagingEventsEmail` data stream |
| **SMS Channel Data Kit** | `MessagingEventsSms` | Contains `MessagingEventsSMS` data stream (SMS add-on only) |
| **WhatsApp Channel Data Kit** | `UnifiedWhatsAppPackage` | Contains `MessagingEventsWhatsApp` data stream (WhatsApp add-on only) |
| **Sales** | — | Contains data streams for **accounts, leads, and contacts**. Install from Data Cloud Setup. |

### Permissions Needed
- **Install data kits:** System Administrator profile + Marketing Cloud Admin permission sets
- **Deploy data streams:** Data Cloud admin permission set

### Installation Process
1. Setup → Quick Find "Basic" → **Basic Settings** under Marketing Setup
2. In "Install Marketing Data Kits" section → **Install or Update**
3. First-time install: all data kits install + CRM/ingestion data streams auto-deploy
4. Update: only changed kits are reinstalled/redeployed
5. Status shown per kit — takes a few minutes

### Manual Deployment (Optional)
If ingestion data streams don't auto-deploy:
1. App Launcher → **Data Streams** tab
2. Click **New** → select **Installed Data Kits and Packages**
3. Data Kits tab → select kit → select bundle → select connector → review fields → **Deploy**
4. Repeat until sidebar is empty

> **Data Cloud One companion org note:** Data kits are installed in the home org; ask your Data Cloud admin to set up streams in the home org.

### Billing Impact
Data streams consume **Data Cloud credits** based on batch data processed. See Data Cloud Billable Usage Types.

## Common Pitfalls / Misconceptions
⚠️ **Thinking data kits are optional.** Every channel (email, SMS, WhatsApp) has its own data kit — miss one and that channel won't work.
⚠️ The SMS and WhatsApp data kits are only needed if you have those add-ons, but the Sales, Marketing Setup Objects, Consent Objects, Flows Integration, and Email Channel data kits are always required.
⚠️ Data stream names/field values are predefined by the package and **cannot be changed**.

## Active Recall Questions
1. What is the difference between a data kit and a data stream?
2. Which data kit is always required regardless of which channels you use?
3. What permission is needed to deploy data streams?
4. What happens to data streams when you update a data kit?

## Related Concepts
- [[marketing-cloud-next-overview]]
- [[identity-resolution-rulesets]]
- [[consent-and-compliance]]
- [[reporting-analytics-setup]]

## Source References
- `sources/mktg_implementation_guide.pdf` — "Install and Deploy Data Streams for Marketing Cloud Next"