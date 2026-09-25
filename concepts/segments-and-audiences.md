# Segments & Audiences

## Core Idea
A **segment** is a group of Unified Individual IDs filtered by rules you define, and a **Unified Individual** is the consolidated record that merges multiple lead/contact records for the same person — the foundation of targeted marketing.

## Prerequisites
- [[identity-resolution-rulesets]]
- [[data-kits-and-data-streams]]

## Detailed Explanation

### Key Terms (from Glossary)

| Term | Definition |
|------|-----------|
| **Audience** | Any collection of people who can receive marketing/transactional/operational content |
| **Segment** | A group of Unified Individual IDs based on filtering rule criteria |
| **Unified Individual** | Consolidated record of metadata from multiple prospect/lead/contact records for the same person |
| **Unification** | Process of matching lead/contact records to create a unified individual record for segmentation |
| **Identity Resolution** | Matching multiple records to create a unified profile |
| **Identity Resolution Ruleset** | Criteria used to identify/match related records (e.g., name, email) |

### How It Connects
Identity resolution rulesets → Unification → Unified Individual → Segments → Campaigns/Flows.

Segments are powered by Data Cloud; for limits see Data Cloud Limits and Guidelines.

> This page defines the core terms. For the mechanics of building segments, see:
> - [[data360-segment-types]] — standard, real-time, waterfall, dynamic, data-kit segments + publishing/scheduling
> - [[segment-canvas-and-filters]] — direct/related attributes, containers, aggregation, grouping/ranking/limiting
> - [[einstein-segments]] — generative AI segment creation via Einstein Data Prism

### Glossary of Related Terms

| Term | Definition |
|------|-----------|
| **Campaign** | Record organizing audience, assets, metrics for a marketing effort |
| **Campaign Flow** | Container for automated marketing activities related to a campaign |
| **Connector** | Self-contained component to integrate third-party apps with Salesforce |
| **Consent** | Willingness to receive promotional content |
| **Consent Status** | Whether opted in to receive email marketing |
| **Data Cloud** | Platform storing/consolidating large amounts of varied data types |
| **Data Kit** | Contains specific Data Cloud objects (metadata, relationships) to streamline package installation |
| **Data Model** | Way to organize/standardize data elements and relationships |
| **Email** | Content type with text/images distributed to email addresses |
| **Email Preference Center Page** | Where people subscribe/unsubscribe from public lists |
| **Email Template** | Reusable design for new emails |
| **Form** | Content type with fields for capturing data |
| **Landing Page** | Content type hosted online with text/images/form |
| **SMS Message** | Text-only content distributed to subscriber phone numbers |

## Common Pitfalls / Misconceptions
⚠️ **Segment vs Audience** — an audience is the general concept; a segment is the specific filtered group of Unified Individual IDs.
⚠️ **Unified Individual ≠ Contact** — it's a merge of multiple records for the same person.
⚠️ Segments are Data Cloud-native, so Data Cloud limits apply.

## Active Recall Questions
1. What is the difference between an audience and a segment?
2. What is a Unified Individual?
3. What process creates the unified record used for segmentation?

## Related Concepts
- [[identity-resolution-rulesets]]
- [[scoring-models]]
- [[marketing-cloud-next-overview]]
- [[data360-segment-types]]
- [[segment-canvas-and-filters]]
- [[einstein-segments]]

## Source References
- `sources/mktg_implementation_guide.pdf` — "Marketing Cloud Next Glossary"