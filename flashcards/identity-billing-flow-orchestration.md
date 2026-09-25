# Flashcards — Identity Resolution, Billing & Flow Orchestration

## Card: Match Rule vs Criteria
**Q:** How do match rules vs. match criteria affect consolidation rate?
**A:** More match rules = higher consolidation (more match opportunities); more criteria per rule = lower consolidation (harder to match).

## Card: Match Methods
**Q:** Name the five match methods.
**A:** Exact, Exact Normalized, Fuzzy - High Precision, Fuzzy - Medium Precision, Fuzzy - Low Precision.

## Card: Fuzzy Matching Model
**Q:** What AI model powers fuzzy matching, and what's its confidence threshold?
**A:** BERT language model trained on 150+ countries, 3B English words, 20M names; 0.7 confidence threshold.

## Card: Real-Time Matching Methods
**Q:** How does real-time matching differ from scheduled matching?
**A:** In real-time, all criteria except phone/email run Exact; phone and email run Exact Normalized (unless Exact was the scheduled method).

## Card: Match on Blank
**Q:** What's the risk of Match on Blank, and when is it ignored?
**A:** Can cause overmatching (e.g., middle name) and the "matched 50,000+ profiles" error; it's ignored in real-time matching.

## Card: Single Contact Point Matching
**Q:** Why isn't matching on a single contact point recommended?
**A:** It can mix household members sharing an email/phone into a single unified profile (except unique external identifiers like party ID).

## Card: Default Individual Match Rules
**Q:** What are the four default match rules for individuals?
**A:** Fuzzy Name + Normalized Email; Fuzzy Name + Normalized Phone; Fuzzy Name + Normalized Address; Fuzzy Name + Normalized Phone + Normalized Email.

## Card: Household Match Rules
**Q:** How many match rules can a household ruleset have?
**A:** Only one. Recommended: last name + address, or party identifier.

## Card: Anonymous vs Known
**Q:** When is a unified profile considered known vs anonymous?
**A:** Known if any source profile was designated known; anonymous if only anonymous sources. Account profiles are always known.

## Card: Reconciliation Rules
**Q:** What are the three reconciliation rule types?
**A:** Last Updated, Most Frequent, Source Priority.

## Card: Reconciliation & Contact Points
**Q:** Do reconciliation rules apply to contact points?
**A:** No — they only reconcile Unified Individual object fields. Use source priority order in activations to deliver contact points.

## Card: Source Priority on ID Fields
**Q:** Which reconciliation rule should you use on ID fields, and why?
**A:** Source Priority — to stabilize ID values.

## Card: Internal Data Pipeline Billing
**Q:** Does ingesting via the internal Salesforce connector consume credits?
**A:** No — free as of Aug 7, 2025 (included with Data 360). External ingestion consumes credits.

## Card: Activate DMO Doubling
**Q:** When does Activate DMO - Streaming double the records processed?
**A:** When a data graph is used with the activation (1 record change = 2 records processed).

## Card: Batch Calculated Insights Billing
**Q:** When does a Batch Calculated Insight charge credits?
**A:** Only when underlying objects change; no charge if no changes. Objects used multiple times counted once.

## Card: Batch Profile Unification
**Q:** How is Batch Profile Unification billed after the first run?
**A:** Only new or modified source profiles count (deleted or suppressed profiles count as modified).

## Card: Minimum Credit Decrement
**Q:** What's the minimum credit decrement per usage type?
**A:** 1 credit, where fractional usage amounts to 1+ credits over the monthly billing period.

## Card: Create Consent Flow Availability
**Q:** In which flow type is the Create Consent element available?
**A:** Automation Event-Triggered flows only (per the marketing flow elements table).

## Card: Path Experiment Requirements
**Q:** What edition + add-on do Path Experiments require?
**A:** Advanced edition + Personalization.

## Card: On-Canvas Insights
**Q:** Which edition supports On-Canvas Insights?
**A:** Advanced only.

## Card: Flow Status - Paused
**Q:** Is a paused flow considered active?
**A:** Yes — a paused flow counts as active, so only one version can be active.

## Card: Activation-Triggered Target Type
**Q:** Which activation target type do activation-triggered flows support?
**A:** Only Data 360 activation target type; other target types error on save.

## Card: Activation Flow Rate Limits
**Q:** What's the concurrency limit for Marketing Cloud/Data 360 activation-triggered flows?
**A:** 15,000,000 actions/hour with 210 concurrent threads.

## Card: Activation Error Rate
**Q:** What error-rate threshold triggers additional rate limiting?
**A:** Elements failing more than 2.5% of the time.

## Card: Real-Time Response Allowance
**Q:** What allowance do real-time-response flows get?
**A:** 50% additional allowance to the concurrency limit (e.g., 210 → 315).

## Card: Audience Flow Sources
**Q:** What are the four audience sources for an audience flow?
**A:** Segment, List, Record, Campaign.

## Card: Broadcast Flow Segment
**Q:** What type of segment do broadcast flows use?
**A:** Dynamic segments — membership is determined after the flow starts.

## Card: Engagement Signal DMO
**Q:** What category of DMO can be used for engagement signals?
**A:** Only DMOs categorized as Engagement.

## Card: Engagement Signal Identifiers
**Q:** What are the four identifier types in an engagement signal?
**A:** User Identifier, Timestamp Identifier, Item Identifier, Event Identifier.

## Card: Flow Sharing - Campaign Delete
**Q:** What happens to flow sharing when a campaign is deleted?
**A:** Sharing reverts to the flow's own rules; if none, the flow becomes private (owner, admins, View All Non-Setup Flows/Manage Flow only).

## Card: REST Flow Endpoint
**Q:** What's the REST endpoint to run an autolaunched flow?
**A:** POST /services/data/v65.0/actions/custom/flow/FLOW_API_NAME

## Card: Invocable.Action vs Flow.Interview
**Q:** What's the difference between Invocable.Action and Flow.Interview in Apex?
**A:** Invocable.Action = dynamic reference + bulkification; Flow.Interview = static reference (referential integrity) but no bulkification.

## Card: REST vs Apex Flow Version
**Q:** Which flow version does REST run vs. Apex-as-admin?
**A:** REST runs the active version; Apex as flow admin runs the latest version regardless of activation.

## Card: Journeys per Campaign
**Q:** What's the limit of associated journeys per Campaign?
**A:** 20 journeys per Campaign.

## Card: Journey Connection Modes
**Q:** What journey modes are required to connect to a Campaign?
**A:** Draft, Running, Finishing, Paused, or Stopped.

## Card: Marketing Calendar
**Q:** Which flows don't appear on the Marketing Calendar?
**A:** Event/form-triggered flows (no start date).

## Related
- [[identity-resolution-rulesets]]
- [[identity-resolution-match-rules]]
- [[identity-resolution-reconciliation-rules]]
- [[data360-billing-usage]]
- [[flow-builder-elements]]
- [[activation-triggered-flows]]
- [[audience-flows]]
- [[engagement-signals]]
- [[flow-sharing]]
- [[rest-api-flow-integration]]
- [[mce-journeys-campaigns]]