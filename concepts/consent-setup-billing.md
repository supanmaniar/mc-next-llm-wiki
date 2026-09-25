# Consent Setup & Billing

## Core Idea
Setting up consent requires enabling Data Protection and the right Data Cloud connector permissions before the consent packages install cleanly, and consent data has specific (mostly zero-cost) billing characteristics — but segmentation, Calculated Insights, and Identity Resolution on consent are metered.

## Prerequisites
- [[consent-data-model]]
- [[consent-write-paths]]
- [[sandbox-and-deployment]]
- [[user-access-and-permission-sets]]

## Detailed Explanation

### Installing Consent Packages
During Channel Setup, the step **Automatically Install Required Packages with One Click** includes **Install the Managed Package for Consent-Specific Data**, which deploys the Data Cloud objects used by Marketing Cloud consent. This step **fails if Data Protection isn't enabled or permissions are set incorrectly**.

**To resolve:**
1. Ensure **Data Protection is enabled** (must be completed first) — Set Up Data Privacy.
2. Set **Data Cloud Salesforce Connector permissions**: Setup > Permission Sets > Data Cloud Salesforce Connector > Object Settings. Enable **Read** and **View All Records** for: Communication Subscription; Communication Subscription Channel Type; Engagement Channel Type.

### Consent/Audit-Trail Package Install Fails with CustomField Errors
If install fails with errors on ConsentAuditTrail custom fields (e.g., ConsentCapturedSourceName, ConsentCapturedSourceType, ChannelType, CommunicationSubscriptionChannelTypeId, ConsentCapturedSourceDetails), confirm Data Protection is enabled and the Data Cloud Salesforce Connector permissions include Read + View All Records on the same three objects.

### Consent Data Streams Won't Ingest
The most common cause: data streams are in a **NEEDS_ACTIVATION** state, expected on new sandboxes because connections aren't activated by default. Fix: go to Data Cloud Setup, locate the two consent data streams, and click **Activate** on each. If activation is done and ingestion still fails, review data for rejected rows.

### Billing & Utilization

**Does the CSC object in Salesforce CRM consume data storage?**
Yes. `CommunicationSubscriptionConsent` is a standard Salesforce CRM object; records count against the org's Core CRM data storage. Impact is modest: records aren't pre-populated (a row isn't written until an explicit consent action), so storage tracks active consent updates, not the number of Contacts/Leads. The Core CRM object is separate from the Data Cloud CSC DMO (DMO storage sits in Data Cloud).

**Does ingesting consent into Data Cloud consume credits?**
No, when it arrives through an internal Salesforce connector. As of August 7, 2025, this usage type is included with Data 360 and doesn't consume credits. Ingestion from external sources (Snowflake, S3) is a different usage type and does consume credits.

**Does consent storage in Data Cloud consume credits?**
Only usage above the org's allocation ("Storage Beyond Allocation"). Consent rows within the allocation don't incur an incremental storage charge.

**Does mapping/migrating consent from CRM to MC Next consume credits?**
Bringing CRM consent into the CSC DMO through the CRM connector is internal-pipeline ingestion and is zero-cost. Mapping consent to the correct Contact Point Types is a configuration step, not a metered usage type. Credits are consumed by what you do afterward (queries, segmentation, activation, Calculated Insights, Identity Resolution).

**Does including consent in a segment or Calculated Insight consume credits?**
Yes. Segmentation and Calculated Insights are metered usage types billed on records processed. Building a segment referencing consent, or a Calculated Insight used to surface consent, draws down credits each time it runs.

**Does running Identity Resolution on consent consume credits?**
Yes. Identity Resolution is billed under **Batch Profile Unification**, calculated on source profiles processed (after the first run, only new/modified profiles count). Configure the ruleset but run it only when data sources are properly mapped and ready.

**Can duplicate consent records increase credit consumption?**
Yes. Ingesting the same individuals from more than one source without intentional data-model design can create duplicate rows, increasing record counts that downstream metered operations process. This is a design consideration, not a defect.

### Sandbox & Deployment
**Can you deploy Communication Subscriptions between orgs?** Currently **unsupported**. Communication Subscriptions are stored as **data** in the Communication Subscription DMO, and only **metadata** is deployed to a sandbox — so this data can't currently be promoted to a production org.

## Common Pitfalls / Misconceptions
⚠️ Data Protection must be enabled before consent packages install.
⚠️ Consent data streams start in NEEDS_ACTIVATION on new sandboxes — activate them.
⚠️ Internal Salesforce connector ingestion is zero-cost; external ingestion consumes credits.
⚠️ Communication Subscriptions can't be deployed between orgs (data, not metadata).

## Active Recall Questions
1. What two prerequisites must be met before the consent package installs cleanly?
2. Why do consent data streams fail to ingest on new sandboxes?
3. Does ingesting consent via the internal Salesforce connector consume credits?
4. What's billed under Batch Profile Unification?
5. Can you deploy Communication Subscriptions between orgs?

## Related Concepts
- [[consent-data-model]]
- [[consent-write-paths]]
- [[consent-segmentation]]
- [[sandbox-and-deployment]]
- [[user-access-and-permission-sets]]

## Source References
- User-provided "Consent Management: Getting Started & Setup" article
- User-provided "Consent Management: Billing and Utilization" article
- User-provided "Consent Management: Sandbox & Deployment" article