# Data 360 Billing & Usage Types

## Core Idea
Data 360 features consume credits based on **records processed, queried, or analyzed** — but some usage (internal Salesforce ingestion) is free, and the exact billing depends on your license type (Data Services vs. Flex Credits vs. Data 360 Profiles).

## Prerequisites
- [[data-kits-and-data-streams]]
- [[consent-setup-billing]]
- [[data-architecture-layers]]

## Detailed Explanation

### License & Billing Models
- Orgs purchasing credits **before Feb 24, 2026** consume **Data Services credits**.
- Orgs purchasing/renewing **after Feb 24, 2026** can have **Data Services or Flex Credits**.
- If you have a **Data 360 Profiles-type license**, some usage types aren't consumed.
- If operating under a **Customer Data Platform license**, refer to Customer Data Platform Billable Usage Calculations instead.
- Monitor usage in your org's **Digital Wallet**.

### Data Service Usage (records processed/queried/analyzed)

| Billing Category | How it's calculated |
|------------------|---------------------|
| **Internal Data Pipeline** | Rows of structured data ingested from Salesforce via CRM/Marketing Cloud/Commerce Cloud/Marketing Cloud Personalization connectors. ⚠️ **Free as of Aug 7, 2025** (included with Data 360). |
| **Batch Data Pipeline (External)** | Rows of batch data processed by data streams across all connectors (except Internal Data Pipeline). |
| **Streaming Data Transforms** | Higher of rows read or written. Joins: rows read = input records × joined objects. |
| **Batch Data Transforms** | Higher of rows read or written. Incremental: only changed rows since previous run. |
| **Streaming Data Pipeline (External)** | Rows of streaming data processed (Website/Mobile App connector, streaming ingestion API). |
| **Unstructured Data Processed** | Amount of unstructured data processed without AI. Chunking + vectorizing counted **once**. |
| **Intelligent Processing** | Unstructured data processed with AI (LLM parsing, image processing, Intelligent Context). |
| **Data Share Rows Shared (Data Out)** | Records processed on initial full batch of a data share (incremental changes don't count). |
| **Data Federation/Sharing Rows Accessed** | Records retrieved from source (federation) or rows returned (data share). Cross-cloud/region only for external shares. |
| **Private Connect Data Processed** | GB transferred over private network route. |
| **Batch Profile Unification** | Source profiles processed by an identity resolution ruleset. After first run, only new/modified profiles count. |
| **Sub-second Real-Time Events** | Sum of profile events + engagement events + API calls in the real-time layer (associated with a real-time data graph). |
| **Batch Calculated Insights** | Records in all underlying objects each time it runs (data space filters considered; no charge if no changes; objects used multiple times counted once). |
| **Streaming Calculated Insights** | Records processed. |
| **Inferences** | Unique inferences produced by a predictive model (internal Einstein Studio or BYOM). |
| **Data Queries** | Records processed (depends on query structure). |
| **Streaming Actions (incl. lookups)** | Records processed. |
| **Segmentation** | Records processed. |
| **Batch Activations** | Records processed. |
| **Activate DMO - Streaming** | Records created/updated in the DMO per activation. ⚠️ If a data graph is used, records processed are **doubled**. |
| **Code Extension** | Measured in **Compute Units** (depends on compute size + time). |
| **Accelerated Data Queries** | No longer billed (as of Aug 16, 2024). |

### Storage & Data Spaces
- **Storage Beyond Allocation** — storage used above the allocated amount. Storage outside Data 360 (Lightning Platform) isn't counted.
- **Data Spaces** — number of data spaces beyond the default data space.

### Segmentation & Activation Card
As of **Sept 4, 2025**, the separate "Segmentation and Activation" consumption card is no longer used — usage is recorded against the same usage types on the Data Services card.

### Ad Audiences & Real-Time Profiles
- **Ad Audiences** — number of ad audience targets.
- **Sub-second Real-Time Profiles & Entities** — unique active visitors per month (each visitor counted once/month).

### Key Rules
- Credits = units used × multiplier on the rate card.
- Usage is summed per type and decremented at a fractional rate; **minimum 1 credit** decremented per usage type when fractional usage amounts to 1+ credits over the monthly period.

## Common Pitfalls / Misconceptions
⚠️ Internal Salesforce connector ingestion is **free** (since Aug 7, 2025); external ingestion consumes credits.
⚠️ Activate DMO - Streaming **doubles** records processed when a data graph is used.
⚠️ Chunking + vectorization of unstructured data is counted **once**, not twice.
⚠️ Batch Calculated Insights charge only when underlying objects change.
⚠️ The "Segmentation and Activation" card was retired Sept 4, 2025.

## Active Recall Questions
1. What's the difference between Internal and External Data Pipeline billing?
2. When does Activate DMO - Streaming double the records processed?
3. How is Batch Profile Unification billed after the first run?
4. What's the minimum credit decrement per usage type?
5. Which usage types are no longer billed?

## Related Concepts
- [[consent-setup-billing]]
- [[data-kits-and-data-streams]]
- [[identity-resolution-rulesets]]
- [[data360-segment-types]]
- [[personalization-data-sources]]

## Source References
- User-provided "Data Services Billable Usage Types for Data 360" article