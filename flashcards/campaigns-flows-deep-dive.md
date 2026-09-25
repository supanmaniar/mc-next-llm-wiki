# Flashcards — Campaigns, Flows & Flow Elements Deep Dive

## Card: Campaign-Flow Cardinality
**Q:** What's the relationship between campaigns and flows?
**A:** A campaign can relate to multiple flows, but each flow relates to only one campaign. Changing an active flow's campaign causes reporting and data stream issues.

## Card: First Flow Creation Methods
**Q:** What are the three ways to create the first flow in a campaign?
**A:** Flow trigger (Build Your Own → pick a trigger), flow template (goal-driven preconfigured flow), or Quick Start (common use case with preconfigured flow + CMS content).

## Card: Signup Form Template Assets
**Q:** What does the signup form flow template automatically create?
**A:** A flow, a form, and (optionally) a landing page — all related to the campaign. Lead is the default record type created on submit.

## Card: Segment Publish Requirement
**Q:** What must you do before sending to a segment or previewing membership?
**A:** Publish the segment first (republish if stale). For the freshest data, republish the segment immediately before running the flow.

## Card: Pause Duration and Wait Elements
**Q:** How does pausing a flow affect Wait elements?
**A:** The pause duration counts toward the total wait time; past-due tasks complete immediately after resume.

## Card: Edit a Paused Flow
**Q:** What are the steps to edit a paused flow?
**A:** Deactivate (choose "Deactivate and cancel work" or "Deactivate and complete work") → Edit As New Version → Activate. The version number is appended to the flow name.

## Card: Exit Rules
**Q:** How many exit rules can a flow have, and when are they evaluated?
**A:** Up to 10; evaluated each time a user starts or resumes a flow. Numeric attributes support aggregation functions (Average, Sum, Max, Min).

## Card: Decision Logic Methods
**Q:** What are the two Decision element logic methods, and how do they differ?
**A:** Define Manually (outcomes evaluated in order — first match wins) vs. Define with AI (Advanced; all outcomes evaluated simultaneously — order has no impact). AI Decision isn't supported for Marketing Cloud flows.

## Card: Path Experiment Winner
**Q:** How does automated Path Experiment selection declare a winner?
**A:** Bayesian prediction; a path wins at ≥95% confidence to beat all others, otherwise fallback behavior. Percentages are targets, not exact counts (probability-based assignment).

## Card: Path Experiment Manual Winner
**Q:** How do you manually select a winning path, and does it require a new version?
**A:** Winning Path dropdown on the activated flow — sends all new/remaining/delayed members down that path. It doesn't require saving a new flow version.

## Card: Subflow Restrictions
**Q:** What are the Subflow element restrictions?
**A:** Can't call flows that contain wait elements; variable API names ≤ 40 characters; only flow admins can run inactive flows (others fail at run time if no active version).

## Card: Subflow Version Behavior
**Q:** Which version does a Subflow call by default (API 61.0+)?
**A:** The active version; if none, the latest version. Run latest via Debug option or appending ?latestSub=true to the parent flow URL.

## Card: Wait Element Requirement
**Q:** What's required for flows with Wait elements?
**A:** They must be autolaunched, and can't be combined with screens, choice, or choice sets.

## Card: Wait Until Date Default
**Q:** What happens if you don't set a resume time/time zone on Wait Until Date?
**A:** The flow resumes at 12 AM in your org's time zone. A past or missing attribute value → pauses then resumes immediately.

## Card: Wait Until Event Placement
**Q:** Where must the Wait Until Event element be placed, and what's unsupported?
**A:** Immediately after the element being monitored. Dynamic links and links with merge fields are unsupported — use the Any Link option instead.

## Card: Engagement Signal DMO Rules
**Q:** What DMO rules apply to engagement signals?
**A:** Only DMOs categorized as Engagement; only mapped DMOs/fields; related DMOs must be 1:1 or many-to-one; only one related DMO; item identifier required for custom objective-based recommenders.

## Card: Engagement Signal Identifiers
**Q:** What are the four engagement signal identifiers?
**A:** User Identifier, Timestamp Identifier, Item Identifier, Event Identifier. A count-based metric is created by default.

## Card: Engagement Signal Counting
**Q:** How can engagement events be counted?
**A:** As discrete events (each occurrence, e.g., total email clicks) or grouped repeat events via added fields counted as one signal (e.g., unique click = individual ID + bulk message ID + click event).

## Card: Send Email Element
**Q:** What are the key inputs of the Send Email Message element?
**A:** Email content, Einstein STO, Einstein Metrics Guard, Sender (Organization-Wide Addresses), CC/BCC, Archive Emails, Track Clicks/Opens, Communication Subscription. Emails don't include My Email Settings signatures.

## Card: RCS Messaging Session Window
**Q:** What are the RCS Messaging Session Window options?
**A:** Any Time (send regardless), Not During Active Sessions (skip while Active), Not During Open Sessions (skip unless status is Error or Ended).

## Card: In-App Message Expiration
**Q:** What's the default in-app message expiration?
**A:** 180 days after you activate the flow (or Custom/Dynamic timeframes).

## Card: Send to Journey Requirements
**Q:** What journeys does the Send to Journey element support?
**A:** Only journeys with status Running that use an API event entry source; the MCE business unit must be linked to the same data space as the flow. Individual ID → SubscriberKey; contact point email → journey's default email.

## Card: Get Records Storage
**Q:** What are the Get Records storage options and record limit?
**A:** Only the first record; all records; or all records up to a limit between 2 and 20,000. Store all fields, choose fields, or choose fields + assign variables (advanced).

## Card: Get Records Data Mapping
**Q:** What's required to use a Data Cloud object in Get Records?
**A:** A data mapping relating DLO fields to DMO fields must exist in the org.

## Card: Update Records No Filter
**Q:** What happens if Update Records has no filter conditions?
**A:** The flow updates ALL records for the object. Also, the element doesn't know which fields are required.

## Card: Delete Records Behavior
**Q:** What are the Delete Records warnings?
**A:** Even an inactive flow triggers deletes when tested; records are deleted the moment the element runs; Recycle Bin holds them 15 days; flows can delete records pending approval.

## Card: Record Transaction Timing
**Q:** When are records actually created/deleted in a flow?
**A:** Not until the interview's transaction completes — when the interview finishes or runs a Screen, Local Action, or Wait element.

## Card: Collection Filter Logic
**Q:** What are the Collection Filter condition requirements?
**A:** All Conditions Are Met, Any Condition Is Met, Custom Condition Logic Is Met (e.g., 1 AND (2 OR 3)), or Formula Evaluates to True. Output is null until the filter runs; source collection unchanged.

## Card: Collection Sort Fields
**Q:** How many sort fields can Collection Sort use?
**A:** Up to 3 fields (greater to lesser priority). Changes are made directly in the selected collection variable.

## Card: Transform Limits
**Q:** What are the Transform element limits?
**A:** Up to 1 nested collection; formula ≤ 255 characters (use a formula resource for longer); debug shows up to 20 records; data graphs aren't supported for joins.

## Card: Flow Operator Availability
**Q:** Which operators are limited to Create/Get/Update Records, and which aren't filter conditions?
**A:** In and Not In are available only in Create Records, Get Records, and Update Records. Contains and Is Changed aren't available as filter conditions.

## Card: Multi-Select Picklist Filtering
**Q:** Why is filtering on multi-select picklists fragile, and what's the fix?
**A:** Semicolon spacing and item order cause mismatches (e.g., "red; green; blue" vs "red;green;blue"). Use the INCLUDES function in a flow formula.

## Card: Campaign Stage
**Q:** What drives the Campaign Stage field?
**A:** The statuses of all flows in the campaign (In Planning, In Progress, Completed, Error, Canceled, Paused). One Error flow can make the whole campaign Error.

## Card: Marketing Calendar Access
**Q:** Who can access the Marketing Calendar, and which calendars are default?
**A:** Marketing Cloud Admin, Marketing Cloud Manager, or Access Marketing Calendar user permission (Sales). Defaults: Campaigns, Campaign Segment Flows, Segment Flows. Event/form-triggered flows don't appear.

## Card: Not Sent Reasons
**Q:** What does the NotSentReason field map to?
**A:** The Engagement Action Reason field of the Email Engagement DMO. Common reasons: no consent, no opt-in, unauthorized From address, hard bounce, TTL exceeded.

## Card: AI Campaign Generation
**Q:** How does Agentforce generate campaigns, and what's the "Forward to Agent" step?
**A:** Draft with Agentforce → describe the objective → the agent generates a brief + campaign preview (name, flow, multichannel content). Conversational campaigns add a "Forward to Agent" final step to handle email responses. After saving, preview steps can't be refined.

## Card: Agent Actions Powered by Flow
**Q:** Which agent actions are powered by Salesforce Flow?
**A:** Create a Campaign from a Brief, Draft a Campaign Brief, Save Campaign Brief, and Save Campaign. Required custom campaign fields need these flows updated.

## Related
- [[campaign-record-workflow]]
- [[flow-elements-deep-dive]]
- [[flow-data-operations]]
- [[campaign-reporting-tools]]
- [[campaigns-and-flows]]
- [[flow-builder-elements]]