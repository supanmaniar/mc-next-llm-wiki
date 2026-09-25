# Master Study Roadmap — Marketing Cloud Next

## What This Is
A learning track for the **Salesforce Marketing Cloud Next Consultant exam** (Summer '26 release, 60 questions, 72% pass) and the **Implementation Guide (Spring '26)**. Study in logical sequence: foundations → data → access → channels → compliance → reporting → scoring → AI → sandbox.

> 📋 **Cramming?** Start with the [[exam-revision-summary]] — a consolidated revision guide organized by exam weight (Section 4 = 30% first).

## Exam Coverage Map

| Exam Section                                             | Weight | Coverage                  |
| -------------------------------------------------------- | ------ | ------------------------- |
| **1. Platform Setup & Governance**                       | 13%    | ✅ Full                   |
| **2. Consent**                                           | 13%    | ✅ Full                   |
| **3. Data Modeling, Identity Resolution & Segmentation** | 25%    | ✅ Full                   |
| **4. Campaign Design, Flow Orchestration & Content**     | 30%    | ✅ Full                   |
| **5. Agentforce & AI Innovation**                        | 11%    | ✅ Full                   |
| **6. Analytics & Performance Insights**                  | 8%     | ✅ Full                   |

> **All six exam sections are covered by source material.** No outstanding gaps. The table below lists **thin spots worth reinforcing** (topics that exist but are lightly detailed or spread across pages) — recommend review, not new sources.

### Thin coverage worth reinforcing (not missing)
- **Data 360 provisioning model** (Section 1) — core-org vs. Data Cloud One/companion-org configuration is only a one-liner in [[data-kits-and-data-streams]]; the exam objective explicitly calls out "Data 360 provisioning".
- **Predictive AI feature selection** (Section 5) — STO vs. Metrics Guard vs. Engagement Scoring/Frequency decision rules are in [[ai-features]] but there's no scenario-style practice question deck.
- **Pre-built dashboard selection scenarios** (Section 6) — each dashboard's *when-to-use* is listed in [[reporting-metrics-dashboards]], but no scenario drill (e.g., "which dashboard for deliverability?").
- **CRM data ingestion path** (Section 3) — Accounts/Leads/Contacts ingestion via the Sales data kit + Actionable List creation is spread across [[data-kits-and-data-streams]], [[marketing-objects-ampscript-handlebars]], [[people-records-prospects]]; a consolidation note would aid recall.

## Learning Tracks

> **Basic → Advanced.** Work through tracks in order. Each track builds on the previous one; within a track, later pages assume earlier pages.

### Track 1 — Foundations & Platform Architecture
1. [[marketing-cloud-next-overview]] — what MC Next is, editions (Growth/Advanced), admin roles
2. [[data-kits-and-data-streams]] — the data plumbing (DMOs, data kits, streams)
3. [[data-architecture-layers]] — DLO → DMO → data graph, ingestion lags

### Track 2 — Data Foundation & Identity
4. [[identity-resolution-rulesets]] — unifying records into a profile
5. [[identity-resolution-match-rules]] — match rules, criteria, methods, default rules
6. [[identity-resolution-reconciliation-rules]] — selecting single values for unified fields
7. [[segments-and-audiences]] — core glossary (segment, audience, unified individual)
8. [[data360-segment-types]] — standard/real-time/waterfall/dynamic/data-kit segments
9. [[segment-canvas-and-filters]] — attributes, containers, aggregation, group/rank/limit
10. [[people-records-prospects]] — prospect → lead → contact → unified individual

### Track 3 — Access & Governance
11. [[user-access-and-permission-sets]] — permission sets, content roles, identity-licensed users
12. [[business-units]] — data isolation (1:1 data space), member roles, workspace sharing

### Track 4 — Channels & Deliverability
13. [[channels-overview]] — SMS, WhatsApp, mobile app messaging
14. [[email-domain-authentication]] — DKIM/SPF/DMARC, functional subdomains
15. [[domain-settings]] — My Domain, tracker, sending, custom domains
16. [[domain-warming-ip-infrastructure]] — domain warming, managed dedicated IPs, reputation
17. [[email-sending-setup]] — trusted identity, consent config, RMM, Metrics Guard

### Track 5 — Consent & Compliance
18. [[consent-and-compliance]] — subscription model, consent DMOs, double opt-in
19. [[consent-data-model]] — CSC DMO, contact-point-value keying, 4-level Salesforce consent model
20. [[consent-write-paths]] — Create Consent action, supported vs. unsupported write paths, consent at scale
21. [[consent-double-opt-in]] — two-step confirmation flow, transactional email, Wait Until Event
22. [[consent-preference-pages]] — customization limits, localization, unsubscribe event behavior
23. [[consent-audit-trail]] — append-only history, fields, deletion, rejected rows
24. [[consent-segmentation]] — Calculated Insight workaround, credit costs
25. [[consent-sync-hybrid]] — two-Flow Email Opt Out bridge, Account Engagement / MCE consent mapping
26. [[consent-sync-3-flow]] — validated 3-flow architecture (CRM + Data 360 + MC Next) using Create Consent, unsupported DMO writes
27. [[consent-setup-billing]] — package install prerequisites, credits, sandbox deployment
28. [[consent-channels-troubleshooting]] — transactional/SMS/WhatsApp, unsubscribe actions, 5-step troubleshooting
29. [[web-tracking]] — cookies, consent banner, external site tracking
30. [[contact-points-activation]] — contact point selection & source priority order
31. [[consent-cache]] — send-time consent cache (90-day TTL), cache-refreshing write paths

### Track 6 — Content & Personalization
31. [[content-and-personalization]] — CMS content types, merge fields, dynamic content
32. [[personalization-data-sources]] — data source types, data graph rules, per-item limits
33. [[merge-fields-and-expressions]] — merge fields, saved expressions, permissions
34. [[dynamic-content-variations]] — variations, personalization points, linking/unlinking
35. [[repeaters-and-recommenders]] — repeater components, Personalization recommenders
36. [[email-building-personalization]] — email editor, variations, linking, merge fields
37. [[email-creation-editing]] — visual/code view editing, templates, CAN-SPAM details, preview/test
38. [[dynamic-from-reply-addresses]] — dynamic sender/reply resolution, DMARC alignment, RMM
39. [[landing-pages]] — landing pages, templates, SEO, URL aliases, LinkedIn posts
40. [[forms-data-sources]] — forms, data providers, hidden fields, reCAPTCHA, progressive profiling
41. [[external-forms-form-handlers]] — external embedding, form handlers, CORS/clickjack setup
42. [[marketing-sites]] — code-view hosting, site settings, languages, security
43. [[marketing-objects-ampscript-handlebars]] — marketing objects, AMPscript/Handlebars, actionable lists
44. [[engagement-signals]] — tracking engagements for Personalization features

### Track 7 — Campaign Orchestration
45. [[campaigns-and-flows]] — campaigns, flow types, statuses, elements
46. [[campaign-record-workflow]] — campaign record, first-flow creation, signup form, pause/edit
47. [[flow-builder-elements]] — marketing flow elements & status reference
48. [[flow-elements-deep-dive]] — messaging elements, Decision, Path Experiment, Subflow, Wait
49. [[flow-data-operations]] — Get/Create/Update/Delete Records, collections, Transform, operators
50. [[audience-flows]] — segment/list/record/campaign audience sources
51. [[activation-triggered-flows]] — Data 360 activation triggers, rate limits
52. [[decision-branching-path-experiments]] — Decision elements, formula resources, Path Experiments
53. [[marketing-triggers]] — behavioral automation events
54. [[distributed-marketing]] — approved templates for non-marketers
55. [[flow-sharing]] — campaign-inherited vs. standalone flow sharing
56. [[mce-journeys-campaigns]] — MCE journeys, Marketing Calendar
57. [[rest-api-flow-integration]] — starting flows from REST API & Apex
58. [[campaign-reporting-tools]] — Campaign Stage, Not Sent Reasons, Marketing Calendar, AI campaigns

### Track 8 — AI & Agentforce
59. [[ai-features]] — Einstein predictive AI + Einstein Trust Layer
60. [[agentic-marketing]] — autonomous AI agents, the three waves
61. [[conversational-marketing]] — two-way conversations, subagents & actions
62. [[einstein-segments]] — generative AI segments via Einstein Data Prism

### Track 9 — Reporting, Scoring & Optimization
63. [[reporting-analytics-setup]] — Marketing Performance, analytics packages
64. [[reporting-metrics-dashboards]] — metric formulas, channel KPIs
65. [[opportunity-influence-b2b-analytics]] — revenue attribution & B2B dashboards
66. [[scoring-models]] — engagement/fit/overall scoring
67. [[data360-billing-usage]] — Data 360 credit consumption & usage types

### Track 10 — DevOps & Limits
68. [[sandbox-and-deployment]] — testing & deploying changes
69. [[allocations-limits-page-customization]] — hard limits & Lightning components

## Prerequisite Chain (visual map)
```
  ┌───────────────────────── Foundations ─────────────────────────┐
  │  overview → data-kits → data-architecture-layers              │
  └──────────────────────────────┬────────────────────────────────┘
                                 ▼
  ┌────────────────────── Data Foundation ────────────────────────┐
  │  identity-resolution → segments → data360-segment-types       │
  │       → segment-canvas → people-records                       │
  └──────────────────────────────┬────────────────────────────────┘
                                 ▼
        access ──────► channels ──────► consent
          │               │                │
          ▼               ▼                ▼
   business-units   domain-auth      web-tracking
                    domain-settings   contact-points
                    domain-warming
                                 ▼
        content ──────► campaigns ──────► AI/Agentforce
        personalization    flows          agentic
        data-sources       decision       conversational
        merge-fields       triggers       einstein-segments
        dynamic-content
        repeaters
        email-building
        email-creation
        dynamic-from-reply
        landing-pages
        forms
        external-forms
        marketing-sites
        campaign-record
        flow-elements
        flow-data-ops
        campaign-reporting
                                 ▼
        reporting ──────► scoring ──────► sandbox & limits
```

> The visual map above shows the **major dependencies**. Within it, each track's pages are ordered left-to-right and top-to-bottom as they should be studied.

## Progress Dashboard

| Concept Page                              | Status | Notes |
| ----------------------------------------- | ------ | ----- |
| [[marketing-cloud-next-overview]]         | ☐      |       |
| [[data-kits-and-data-streams]]            | ☐      |       |
| [[data-architecture-layers]]              | ☐      |       |
| [[identity-resolution-rulesets]]          | ☐      |       |
| [[identity-resolution-match-rules]]       | ☐      |       |
| [[identity-resolution-reconciliation-rules]] | ☐   |       |
| [[segments-and-audiences]]                | ☐      |       |
| [[data360-segment-types]]                 | ☐      |       |
| [[segment-canvas-and-filters]]            | ☐      |       |
| [[people-records-prospects]]              | ☐      |       |
| [[user-access-and-permission-sets]]       | ☐      |       |
| [[business-units]]                        | ☐      |       |
| [[channels-overview]]                     | ☐      |       |
| [[email-domain-authentication]]           | ☐      |       |
| [[domain-settings]]                       | ☐      |       |
| [[domain-warming-ip-infrastructure]]      | ☐      |       |
| [[email-sending-setup]]                   | ☐      |       |
| [[consent-and-compliance]]                | ☐      |       |
| [[consent-data-model]]                    | ☐      |       |
| [[consent-write-paths]]                   | ☐      |       |
| [[consent-double-opt-in]]                 | ☐      |       |
| [[consent-preference-pages]]              | ☐      |       |
| [[consent-audit-trail]]                   | ☐      |       |
| [[consent-segmentation]]                  | ☐      |       |
| [[consent-sync-hybrid]]                   | ☐      |       |
| [[consent-sync-3-flow]]                   | ☐      |       |
| [[consent-setup-billing]]                 | ☐      |       |
| [[consent-channels-troubleshooting]]      | ☐      |       |
| [[web-tracking]]                          | ☐      |       |
| [[contact-points-activation]]             | ☐      |       |
| [[consent-cache]]                         | ☐      |       |
| [[content-and-personalization]]           | ☐      |       |
| [[personalization-data-sources]]          | ☐      |       |
| [[merge-fields-and-expressions]]          | ☐      |       |
| [[dynamic-content-variations]]            | ☐      |       |
| [[repeaters-and-recommenders]]            | ☐      |       |
| [[email-building-personalization]]        | ☐      |       |
| [[email-creation-editing]]                | ☐      |       |
| [[dynamic-from-reply-addresses]]          | ☐      |       |
| [[landing-pages]]                         | ☐      |       |
| [[forms-data-sources]]                    | ☐      |       |
| [[external-forms-form-handlers]]          | ☐      |       |
| [[marketing-sites]]                       | ☐      |       |
| [[marketing-objects-ampscript-handlebars]] | ☐      |       |
| [[engagement-signals]]                    | ☐      |       |
| [[campaigns-and-flows]]                   | ☐      |       |
| [[campaign-record-workflow]]              | ☐      |       |
| [[flow-builder-elements]]                 | ☐      |       |
| [[flow-elements-deep-dive]]               | ☐      |       |
| [[flow-data-operations]]                  | ☐      |       |
| [[audience-flows]]                        | ☐      |       |
| [[activation-triggered-flows]]            | ☐      |       |
| [[decision-branching-path-experiments]]   | ☐      |       |
| [[marketing-triggers]]                    | ☐      |       |
| [[distributed-marketing]]                 | ☐      |       |
| [[flow-sharing]]                          | ☐      |       |
| [[mce-journeys-campaigns]]                | ☐      |       |
| [[rest-api-flow-integration]]             | ☐      |       |
| [[campaign-reporting-tools]]              | ☐      |       |
| [[ai-features]]                           | ☐      |       |
| [[agentic-marketing]]                     | ☐      |       |
| [[conversational-marketing]]              | ☐      |       |
| [[einstein-segments]]                     | ☐      |       |
| [[reporting-analytics-setup]]             | ☐      |       |
| [[reporting-metrics-dashboards]]          | ☐      |       |
| [[opportunity-influence-b2b-analytics]]   | ☐      |       |
| [[scoring-models]]                        | ☐      |       |
| [[data360-billing-usage]]                 | ☐      |       |
| [[sandbox-and-deployment]]                | ☐      |       |
| [[allocations-limits-page-customization]] | ☐      |       |

## Flashcards
- [[flashcards/marketing-cloud-next-setup]]
- [[flashcards/channels-consent-reporting]]
- [[flashcards/campaigns-content-beyond]]
- [[flashcards/agentic-conversational-data-email]]
- [[flashcards/data360-segmentation]]
- [[flashcards/consent-management-deep-dive]]
- [[flashcards/consent-cache-and-subscription-model]]
- [[flashcards/identity-billing-flow-orchestration]]
- [[flashcards/personalization-data-sources-deep-dive]]
- [[flashcards/web-content-forms-deep-dive]]
- [[flashcards/campaigns-flows-deep-dive]]

## Sources Ingested
- `sources/mktg_implementation_guide.pdf` (converted to `mktg_implementation_guide.txt`)
- `sources/Marketing Cloud Next Salesforce Help Information.txt` (Salesforce Help article aggregation)
- `sources/Salesforce_Trails.txt` (Trailhead badges/trails — agentic & conversational marketing, data architecture, email personalization, consent model)
- `sources/Salesforce_D360_Segments.txt` (Data 360 segmentation — segment types, canvas/filters, Einstein segments)
- `sources/Contact_Points_and_Domains.txt` (contact points/source priority order + Unified Messaging domain authentication & functional subdomains)
- `sources/Consent_Sync_Salesforce_Data360_MCNext.txt` (3-flow consent sync blueprint across Salesforce CRM, Data 360 and MC Next — Create Consent guardrail, unsupported DMO writes)
- `sources/Consent_Management_MCNext_DeepDive.md` (MC Next Deep Dive #022 — subscription model, CSC DMO, send-time consent cache with 90-day TTL, 5 consent update methods)
- User-provided consent management articles (Create Consent flow element; Consent Management deep-dive: data model, write paths, audit trail, double opt-in, preference pages, segmentation, sync/hybrid, setup/billing, channels/troubleshooting; Salesforce Consent Data Model; Email Opt Out sync via Flows)
- User-provided identity resolution, billing, flow orchestration, and personalization articles (match rules, reconciliation rules, Data 360 billable usage, flow builder elements, activation-triggered flows, audience flows, engagement signals, flow sharing, REST/Apex flow integration, MCE journeys & campaigns, landing page tracking, personalization data sources/merge fields/variations/repeaters)
- `sources/Content_Personalization_Data_Sources_Deep_Dive.txt` (user-provided Salesforce Help articles — Manage Data Sources, Merge Fields, Expressions, Variations, Linked Personalization Points, Dynamic Content + Salesforce Personalization, Repeaters, Recommenders)
- `sources/People_Records_Deep_Dive.txt` (user-provided Salesforce Help articles — People Records, Considerations for Prospects, Working with Prospects, Convert Prospects, Prospect Field Conversion Mapping, Set Up Lead Assignment Rules)
- `sources/Marketing_Objects_Deep_Dive.txt` (user-provided Salesforce Help articles — Marketing Objects, Data Types & Resource Allocations, Configure Marketing Objects, Manage Marketing Objects, Use Marketing Object Data in Messages)
- `sources/Email_Deep_Dive.txt` (user-provided Salesforce Help articles — Email overview, Create an Email, Code View, Email Templates, Consent Details, Conversational Email, Dynamic From/Reply Addresses, Distributed Marketing and Alerts)
- `sources/Web_Content_Deep_Dive.txt` (user-provided Salesforce Help articles — LinkedIn Posts, Landing Pages, Landing Page Templates, SEO Page Properties, URL Details, Forms, Form Data Sources, Hidden Fields, reCAPTCHA, Progressive Profiling, External Forms, Form Handlers, Marketing Sites)
- `sources/Campaigns_Flows_Deep_Dive.txt` (user-provided Salesforce Help articles — Get Started with Campaigns/Flows, Campaign Record vs. Flow Canvas, Work with Campaigns, Send a Message, Signup Form, Automate Tasks, Work with Marketing Flows, Add Structure/Logic, Pause/Edit, Share Standalone Flows, Flow Types Comparison, Activation-Triggered, Automation Event-Triggered, Engagement Signals, Broadcast, Subflow, Audience Flows, Flow Status, Flow Builder Features/Elements, Embedded Analytics, Path Experiment, Assign to Queue/User, Assignment, Collection Filter/Sort, Create Campaign Member, Create Consent, Create/Get/Update/Delete Records, Decision, Notify User, Send Email/SMS/RCS/Mobile/In-App, Send to Journey, Transform, Flow Operators, Wait Elements, Campaign Reporting Tools, Marketing Calendar, MCE Journeys, AI in MC Next)
