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
2. [[marketing-cloud-portfolio]] — the four-product portfolio, editions, exam logistics
3. [[data-kits-and-data-streams]] — the data plumbing (DMOs, data kits, streams)
4. [[data-architecture-layers]] — DLO → DMO → data graph, ingestion lags

### Track 2 — Data Foundation & Identity
5. [[identity-resolution-rulesets]] — unifying records into a profile
6. [[identity-resolution-match-rules]] — match rules, criteria, methods, default rules
7. [[identity-resolution-reconciliation-rules]] — selecting single values for unified fields
8. [[segments-and-audiences]] — core glossary (segment, audience, unified individual)
9. [[data360-segment-types]] — standard/real-time/waterfall/dynamic/data-kit segments
10. [[segment-canvas-and-filters]] — attributes, containers, aggregation, group/rank/limit
11. [[people-records-prospects]] — prospect → lead → contact → unified individual
12. [[crm-integration-and-actionable-lists]] — CRM records as audience source, Sales Data Kit, actionable lists

### Track 3 — Access & Governance
13. [[user-access-and-permission-sets]] — permission sets, content roles, identity-licensed users
14. [[business-units]] — data isolation (1:1 data space), member roles, workspace sharing

### Track 4 — Channels & Deliverability
15. [[channels-overview]] — SMS, WhatsApp, mobile app messaging
16. [[email-domain-authentication]] — DKIM/SPF/DMARC, functional subdomains
17. [[domain-settings]] — My Domain, tracker, sending, custom domains
18. [[domain-warming-ip-infrastructure]] — domain warming, managed dedicated IPs, reputation
19. [[email-sending-setup]] — trusted identity, consent config, RMM, Metrics Guard

### Track 5 — Consent & Compliance
20. [[consent-and-compliance]] — subscription model, consent DMOs, double opt-in
21. [[consent-data-model]] — CSC DMO, contact-point-value keying, 4-level Salesforce consent model
22. [[consent-objects-and-models]] — three consent models, four consent objects & Id prefixes, subscription governance
23. [[consent-data-streams]] — UnifiedMessagingConsent data kit, dual stream generations, org-ID naming, field mapping
24. [[consent-write-paths]] — Create Consent action, supported vs. unsupported write paths, consent at scale
25. [[consent-double-opt-in]] — two-step confirmation flow, transactional email, Wait Until Event
26. [[consent-preference-pages]] — customization limits, localization, unsubscribe event behavior
27. [[consent-audit-trail]] — append-only history, fields, deletion, rejected rows
28. [[consent-segmentation]] — Calculated Insight workaround, credit costs
29. [[consent-sync-hybrid]] — two-Flow Email Opt Out bridge, Account Engagement / MCE consent mapping
30. [[consent-sync-3-flow]] — validated 3-flow architecture (CRM + Data 360 + MC Next) using Create Consent, unsupported DMO writes
31. [[consent-setup-billing]] — package install prerequisites, credits, sandbox deployment
32. [[consent-channels-troubleshooting]] — transactional/SMS/WhatsApp, unsubscribe actions, 5-step troubleshooting
33. [[web-tracking]] — cookies, consent banner, external site tracking
34. [[contact-points-activation]] — contact point selection & source priority order
35. [[contact-point-resolution]] — send-time contact point resolution, activation templates
36. [[consent-cache]] — send-time consent cache (90-day TTL), cache-refreshing write paths

### Track 6 — Content & Personalization
37. [[content-and-personalization]] — CMS content types, merge fields, dynamic content
38. [[marketing-workspaces-and-cms]] — CMS workspaces, business unit content isolation, common assets
39. [[personalization-data-sources]] — data source types, data graph rules, per-item limits
40. [[merge-fields-and-expressions]] — merge fields, saved expressions, permissions
41. [[dynamic-content-variations]] — variations, personalization points, linking/unlinking
42. [[repeaters-and-recommenders]] — repeater components, Personalization recommenders
43. [[email-building-personalization]] — email editor, variations, linking, merge fields
44. [[email-creation-editing]] — visual/code view editing, templates, CAN-SPAM details, preview/test
45. [[dynamic-from-reply-addresses]] — dynamic sender/reply resolution, DMARC alignment, RMM
46. [[landing-pages]] — landing pages, templates, SEO, URL aliases, LinkedIn posts
47. [[forms-data-sources]] — forms, data providers, hidden fields, reCAPTCHA, progressive profiling
48. [[external-forms-form-handlers]] — external embedding, form handlers, CORS/clickjack setup
49. [[marketing-sites]] — code-view hosting, site settings, languages, security
50. [[marketing-objects-ampscript-handlebars]] — marketing objects, AMPscript/Handlebars, actionable lists
51. [[engagement-signals]] — tracking engagements for Personalization features

### Track 7 — Campaign Orchestration
52. [[campaigns-and-flows]] — campaigns, flow types, statuses, elements
53. [[marketing-flow-types]] — complete flow taxonomy, off-core high-scale engine
54. [[campaign-record-workflow]] — campaign record, first-flow creation, signup form, pause/edit
55. [[flow-builder-elements]] — marketing flow elements & status reference
56. [[flow-elements-deep-dive]] — messaging elements, Decision, Path Experiment, Subflow, Wait
57. [[flow-data-operations]] — Get/Create/Update/Delete Records, collections, Transform, operators
58. [[audience-flows]] — segment/list/record/campaign audience sources
59. [[activation-triggered-flows]] — Data 360 activation triggers, rate limits
60. [[decision-branching-path-experiments]] — Decision elements, formula resources, Path Experiments
61. [[marketing-triggers]] — behavioral automation events
62. [[distributed-marketing]] — approved templates for non-marketers
63. [[flow-sharing]] — campaign-inherited vs. standalone flow sharing
64. [[mce-journeys-campaigns]] — MCE journeys, Marketing Calendar
65. [[rest-api-flow-integration]] — starting flows from REST API & Apex
66. [[campaign-reporting-tools]] — Campaign Stage, Not Sent Reasons, Marketing Calendar, AI campaigns

### Track 8 — AI & Agentforce
67. [[ai-features]] — Einstein predictive AI + Einstein Trust Layer
68. [[marketing-agents]] — five out-of-the-box AI agents
69. [[agentic-marketing]] — autonomous AI agents, the three waves
70. [[conversational-marketing]] — two-way conversations, subagents & actions
71. [[einstein-segments]] — generative AI segments via Einstein Data Prism

### Track 9 — Reporting, Scoring & Optimization
72. [[reporting-analytics-setup]] — Marketing Performance, analytics packages
73. [[reporting-metrics-dashboards]] — metric formulas, channel KPIs
74. [[opportunity-influence-b2b-analytics]] — revenue attribution & B2B dashboards
75. [[scoring-models]] — engagement/fit/overall scoring
76. [[data360-billing-usage]] — Data 360 credit consumption & usage types

### Track 10 — DevOps & Limits
77. [[sandbox-and-deployment]] — testing & deploying changes
78. [[allocations-limits-page-customization]] — hard limits & Lightning components

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
| [[marketing-cloud-portfolio]]        | ☐      |       |
| [[data-kits-and-data-streams]]            | ☐      |       |
| [[data-architecture-layers]]              | ☐      |       |
| [[identity-resolution-rulesets]]          | ☐      |       |
| [[identity-resolution-match-rules]]       | ☐      |       |
| [[identity-resolution-reconciliation-rules]] | ☐   |       |
| [[segments-and-audiences]]                | ☐      |       |
| [[data360-segment-types]]                 | ☐      |       |
| [[segment-canvas-and-filters]]            | ☐      |       |
| [[people-records-prospects]]              | ☐      |       |
| [[crm-integration-and-actionable-lists]]  | ☐      |       |
| [[user-access-and-permission-sets]]       | ☐      |       |
| [[business-units]]                        | ☐      |       |
| [[channels-overview]]                     | ☐      |       |
| [[email-domain-authentication]]           | ☐      |       |
| [[domain-settings]]                       | ☐      |       |
| [[domain-warming-ip-infrastructure]]      | ☐      |       |
| [[email-sending-setup]]                   | ☐      |       |
| [[consent-and-compliance]]                | ☐      |       |
| [[consent-data-model]]                    | ☐      |       |
| [[consent-objects-and-models]]            | ☐      |       |
| [[consent-data-streams]]                  | ☐      |       |
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
| [[contact-point-resolution]]              | ☐      |       |
| [[consent-cache]]                         | ☐      |       |
| [[content-and-personalization]]           | ☐      |       |
| [[marketing-workspaces-and-cms]]          | ☐      |       |
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
| [[marketing-flow-types]]                  | ☐      |       |
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
| [[marketing-agents]]                      | ☐      |       |
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
- [[flashcards/consent-objects-streams-sendtime]]
- [[flashcards/identity-billing-flow-orchestration]]
- [[flashcards/personalization-data-sources-deep-dive]]
- [[flashcards/web-content-forms-deep-dive]]
- [[flashcards/campaigns-flows-deep-dive]]
- [[flashcards/exam-masterclass-session1]]
- [[flashcards/exam-masterclass-session2]]
- [[flashcards/exam-masterclass-session3]]
- [[flashcards/exam-masterclass-session4]]

## Sources Ingested
- `sources/mktg_implementation_guide.pdf` (converted to `mktg_implementation_guide.txt`)
- `sources/Marketing Cloud Next Salesforce Help Information.txt` (Salesforce Help article aggregation)
- `sources/Salesforce_Trails.txt` (Trailhead badges/trails — agentic & conversational marketing, data architecture, email personalization, consent model)
- `sources/Salesforce_D360_Segments.txt` (Data 360 segmentation — segment types, canvas/filters, Einstein segments)
- `sources/Contact_Points_and_Domains.txt` (contact points/source priority order + Unified Messaging domain authentication & functional subdomains)
- `sources/Consent_Sync_Salesforce_Data360_MCNext.txt` (3-flow consent sync blueprint across Salesforce CRM, Data 360 and MC Next — Create Consent guardrail, unsupported DMO writes)
- `sources/Consent_Management_MCNext_DeepDive.md` (MC Next Deep Dive #022 — subscription model, CSC DMO, send-time consent cache with 90-day TTL, 5 consent update methods)
- `sources/Consent_Management_MCNext_SzymonLewandowski.md` (Szymon Lewandowski, 20 Sep 2026 — three consent models, four consent objects & Id prefixes, UnifiedMessagingConsent data kit, dual stream generations + org-ID naming, consent-check applicability matrix, subscription governance)
- User-provided consent management articles (Create Consent flow element; Consent Management deep-dive: data model, write paths, audit trail, double opt-in, preference pages, segmentation, sync/hybrid, setup/billing, channels/troubleshooting; Salesforce Consent Data Model; Email Opt Out sync via Flows)
- User-provided identity resolution, billing, flow orchestration, and personalization articles (match rules, reconciliation rules, Data 360 billable usage, flow builder elements, activation-triggered flows, audience flows, engagement signals, flow sharing, REST/Apex flow integration, MCE journeys & campaigns, landing page tracking, personalization data sources/merge fields/variations/repeaters)
- `sources/Content_Personalization_Data_Sources_Deep_Dive.txt` (user-provided Salesforce Help articles — Manage Data Sources, Merge Fields, Expressions, Variations, Linked Personalization Points, Dynamic Content + Salesforce Personalization, Repeaters, Recommenders)
- `sources/People_Records_Deep_Dive.txt` (user-provided Salesforce Help articles — People Records, Considerations for Prospects, Working with Prospects, Convert Prospects, Prospect Field Conversion Mapping, Set Up Lead Assignment Rules)
- `sources/Marketing_Objects_Deep_Dive.txt` (user-provided Salesforce Help articles — Marketing Objects, Data Types & Resource Allocations, Configure Marketing Objects, Manage Marketing Objects, Use Marketing Object Data in Messages)
- `sources/Email_Deep_Dive.txt` (user-provided Salesforce Help articles — Email overview, Create an Email, Code View, Email Templates, Consent Details, Conversational Email, Dynamic From/Reply Addresses, Distributed Marketing and Alerts)
- `sources/Web_Content_Deep_Dive.txt` (user-provided Salesforce Help articles — LinkedIn Posts, Landing Pages, Landing Page Templates, SEO Page Properties, URL Details, Forms, Form Data Sources, Hidden Fields, reCAPTCHA, Progressive Profiling, External Forms, Form Handlers, Marketing Sites)
- `sources/Campaigns_Flows_Deep_Dive.txt` (user-provided Salesforce Help articles — Get Started with Campaigns/Flows, Campaign Record vs. Flow Canvas, Work with Campaigns, Send a Message, Signup Form, Automate Tasks, Work with Marketing Flows, Add Structure/Logic, Pause/Edit, Share Standalone Flows, Flow Types Comparison, Activation-Triggered, Automation Event-Triggered, Engagement Signals, Broadcast, Subflow, Audience Flows, Flow Status, Flow Builder Features/Elements, Embedded Analytics, Path Experiment, Assign to Queue/User, Assignment, Collection Filter/Sort, Create Campaign Member, Create Consent, Create/Get/Update/Delete Records, Decision, Notify User, Send Email/SMS/RCS/Mobile/In-App, Send to Journey, Transform, Flow Operators, Wait Elements, Campaign Reporting Tools, Marketing Calendar, MCE Journeys, AI in MC Next)
- `sources/MCNext_Consultant_Exam_Masterclass_Session1.txt` (Elliot Harper, Salesforce — Marketing Cloud Next Consultant Exam Masterclass Session 1: exam logistics, Marketing Cloud portfolio, six-step configuration, Data Cloud Architect permission set, authorized vs. authenticated domains, four consent granularity levels, preference pages)
- `sources/MCNext_Consultant_Exam_Masterclass_Session2.txt` (Elliot Harper, Salesforce — Marketing Cloud Next Consultant Exam Masterclass Session 2: Data 360 capabilities checklist, CRM integration & actionable lists, complete marketing flow taxonomy, off-core high-scale flows, on-demand/broadcast REST patterns)
- `sources/MCNext_Consultant_Exam_Masterclass_Session3.txt` (Elliot Harper, Salesforce — Marketing Cloud Next Consultant Exam Masterclass Session 3: business units + Salesforce CMS, marketing workspaces, common assets, eight data providers, content variables, marketing objects, personalization methods)
- `sources/MCNext_Consultant_Exam_Masterclass_Session4.txt` (Elliot Harper, Salesforce — Marketing Cloud Next Consultant Exam Masterclass Session 4, final: contact point resolution at send time, activation templates, five AI agents, predictive AI deep dive, semantic data model & reporting dashboards)
