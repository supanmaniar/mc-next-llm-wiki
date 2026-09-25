# Flashcards — High-Frequency "Gotcha" Facts (Cram Deck)

> **Use this deck last.** These are the numbers, limits, and traps that appear across all six exam sections. If you can recall these cold, you have covered the most commonly tested specifics.
> **Related:** [[exam-revision-summary]] · [[study-roadmap]]

---

## Numbers & Limits

## Card: 1:1
**Q:** What is 1:1 in Marketing Cloud Next?
**A:** Business Unit ↔ Data Space mapping.

## Card: 48 Hours
**Q:** What takes up to 48 hours?
**A:** DNS propagation after adding domain authentication records.

## Card: 95% Confidence
**Q:** What does 95% confidence trigger?
**A:** The Path Experiment auto-declared winner (Bayesian).

## Card: 72% / 30%
**Q:** What do 72% and 30% represent?
**A:** **72%** = pass score; **30%** = Section 4 exam weight.

## Card: 2048-bit
**Q:** What is 2048-bit?
**A:** The DKIM key strength.

## Card: 9,950
**Q:** What is the max number of segments per org?
**A:** **9,950**.

## Card: 150
**Q:** What is the max number of Business Units?
**A:** **150** (deactivation is permanent).

## Card: 25 / 15 / 50 / 100
**Q:** What do 25 / 15 / 50 / 100 represent?
**A:** **25** personalization points per item · **15** variations per component · **50** filters per tab · **100** attributes per segment.

## Card: 5 / 5 / 1 / 1 / 1
**Q:** What do 5 / 5 / 1 / 1 / 1 represent?
**A:** Max **Offers** (5) / **Lookup Data Graphs** (5) / **Event** (1) / **Apex Class** (1) / **Activation** (1) data sources per content item or message.

## Card: Subject + Preheader
**Q:** How many components are the subject line and preheader?
**A:** **One** component — they are personalized together.

## Card: Replace But Not Remove
**Q:** Which data source can be replaced but not removed?
**A:** The **Personalization Recommender**.

## Card: Recommender Refresh
**Q:** What is the recommender training requirement?
**A:** **≥1 successful refresh**.

## Card: Real-Time Data Graph
**Q:** Which data graph is recommended for landing pages?
**A:** A **real-time** data graph (faster, costs more).

## Card: 80 Chars
**Q:** What is the 80-character limit?
**A:** The prospect Title conversion limit — conversion fails if the lead Title > 80 (the prospect allows 128).

## Card: 90 Days
**Q:** What lasts 90 days?
**A:** The View as Web Page link validity (re-renders personalized values per open). Also the default segment lookback window and the send-time consent cache TTL.

## Card: 5 MB
**Q:** What is the max email file attachment size?
**A:** **5 MB** (a PDF from CMS).

## Card: 30 / 30
**Q:** What do 30 / 30 represent in Distributed Marketing?
**A:** Max **30 approved images** and **30 approved phrases** per template.

## Card: 2,000 Chars
**Q:** What is the max landing page redirect URL length?
**A:** **2,000 characters** (must start with `https://`).

## Card: 1 Form / 1 Flow
**Q:** What is the form cardinality rule?
**A:** **1 form per landing page; 1 flow per form** — view modes must match.

## Card: 2 Lookup Providers
**Q:** What is the max number of lookup data providers on a form?
**A:** **2** (1 marketing object + 1 recipient data graph).

## Card: 20 Chars
**Q:** What is the max form data source name length?
**A:** **20 characters** (alphanumeric + underscores only).

## Card: Reputation Targets
**Q:** What are the reputation targets?
**A:** **< 2% bounce** and **< 0.1% complaint**.

## Card: 6 Months
**Q:** What is the 6-month rule?
**A:** The engagement cutoff for list hygiene.

## Card: E.164
**Q:** What is E.164?
**A:** The phone format required for consent imports.

## Card: SMS Opt-Out Keywords
**Q:** What are the SMS opt-out keywords?
**A:** **STOP / QUIT / CANCEL / END / UNSUBSCRIBE**.

## Card: GSM-7 / UCS-2
**Q:** What are the SMS encoding character limits?
**A:** **GSM-7 = 160 chars** / **UCS-2 = 70 chars**.

## Card: 20 Journeys
**Q:** What is the max number of MCE journeys per campaign?
**A:** **20**.

## Card: 15M / 210
**Q:** What do 15M and 210 represent?
**A:** The activation-triggered flow rate limit — **15M actions/hr + 210 threads** (MC/Data 360).

## Card: 2.5%
**Q:** What does 2.5% represent?
**A:** The flow element error rate that triggers rate limiting.

## Card: +50%
**Q:** What does +50% represent?
**A:** The concurrency allowance for real-time-response flows.

## Card: 0.7
**Q:** What does 0.7 represent?
**A:** The fuzzy match AI confidence threshold.

## Card: Aug 7, 2025
**Q:** What happened on Aug 7, 2025?
**A:** The internal Data Pipeline became **free**.

## Card: Sept 4, 2025
**Q:** What happened on Sept 4, 2025?
**A:** The Segmentation/Activation billing card was **retired** (merged into Data Services).

## Card: 10 Exit Rules
**Q:** What is the max number of exit rules per flow?
**A:** **10** (evaluated on start/resume).

## Card: 40 Chars
**Q:** What is the max Subflow variable API name length?
**A:** **40 characters**.

## Card: 2–20,000
**Q:** What is the Get Records record limit range?
**A:** **2–20,000**.

## Card: 15 Days
**Q:** What is the Recycle Bin retention for deleted records?
**A:** **15 days**.

## Card: 180 Days
**Q:** What is the default in-app message expiration?
**A:** **180 days**.

## Card: 3 Fields
**Q:** What is the max number of Collection Sort fields?
**A:** **3 fields**.

## Card: 1 / 255
**Q:** What do 1 and 255 represent in the Transform element?
**A:** Max **1 nested collection** and a **255-character** formula limit.

---

## Traps & Rules

## Card: Create Consent Availability
**Q:** Which flow type is Create Consent available in?
**A:** **Automation Event-Triggered** flows (also Data Cloud-Triggered / On-Demand). ⚠️ Never `MessagingConsent`.

## Card: 3-Flow Consent Sync
**Q:** What is the rule for all MC Next consent writes?
**A:** All writes must use **Create Consent** (Data Cloud or Automation Event-triggered); direct DMO field mapping is **ignored at send time**.

## Card: Path Experiment Edition
**Q:** What edition and add-on does a Path Experiment require?
**A:** **Advanced + Personalization**.

## Card: Reconciliation vs Contact Points
**Q:** ⚠️ Do reconciliation rules govern contact points?
**A:** **No** — source priority does.

## Card: Paused Flow
**Q:** ⚠️ Does a paused flow count as active?
**A:** **Yes** — a paused flow counts as active.

## Card: One Error Flow
**Q:** ⚠️ What happens to a campaign when one flow errors?
**A:** The **whole campaign** shows Error.

## Card: Update With No Filter
**Q:** ⚠️ What does an Update Records element with no filter do?
**A:** Updates **ALL** records.

## Card: Consent Cache
**Q:** ⚠️ What does NOT refresh the send-time consent cache?
**A:** Direct DMO/DLO writes (e.g., a mapped DLO import) — consent can look saved yet be stale at send.

## Card: Preference Page Unsubscribe
**Q:** ⚠️ How does a Preference Page unsubscribe affect metrics?
**A:** It is a **consent update**, not an Email Engagement event — so it skews Email Opt-Out Rate lower.

## Card: First Page View
**Q:** ⚠️ What is not recorded when consent is required?
**A:** The **first page view**.

## Card: Metrics Guard Score
**Q:** ⚠️ What is counterintuitive about the Metrics Guard score?
**A:** **Lower = more likely real**.

## Card: Marketing Object Immutability
**Q:** ⚠️ Which marketing object properties are immutable?
**A:** Field API name, data type, and primary key designation.

## Card: Match on Blank
**Q:** ⚠️ What is the risk of Match on Blank?
**A:** It is ignored in real-time and can cause overmatching (the "50,000+ profiles" error).

## Card: Copying an Email
**Q:** ⚠️ What personalization is lost when copying an email?
**A:** Only default variations are copied — other variations, rules, and recommenders are not.

## Card: Convert to Code
**Q:** ⚠️ Is Convert to Code reversible?
**A:** No — it is one-way and removes dynamic content.

## Card: Template Locking
**Q:** ⚠️ What can authors still edit on a locked template?
**A:** Targeting rules and variations (locking protects content/settings only).

## Card: Sharing Dashboards
**Q:** ⚠️ What happens when you share a dashboard?
**A:** It won't appear to users — sharing alone does not grant visibility.

## Card: Wait Elements
**Q:** ⚠️ What flow type do Wait elements require?
**A:** **Autolaunched flows** — they cannot be mixed with screens or choice.

## Card: Subflow Restriction
**Q:** ⚠️ What can a Subflow not call?
**A:** Flows with **wait elements**.

## Card: Define with AI
**Q:** ⚠️ Is "Define with AI" supported for Marketing Cloud flows?
**A:** **No**.

## Card: Marketing Calendar Trap
**Q:** ⚠️ Which flows don't appear on the Marketing Calendar?
**A:** Event-triggered and form-triggered flows.

## Card: Form Handler Field Names
**Q:** ⚠️ What is the critical form handler rule?
**A:** External field names must **exactly match** the HTML `name` attributes.

## Card: Map Fields Timing
**Q:** ⚠️ When must form handler fields be mapped?
**A:** **Before creating the flow** — edits afterwards don't reflect automatically.

## Card: Never Delete Subscription
**Q:** ⚠️ Why never delete a Communication Subscription?
**A:** It destroys the audit trail.

## Card: Transactional SMS
**Q:** ⚠️ Does transactional SMS require consent?
**A:** **Yes** (TCPA) — even for OTP/2FA.

## Card: Unsubscribe All
**Q:** ⚠️ Does "Unsubscribe from all" persist as a permanent block?
**A:** **No**.

## Card: Variations Export
**Q:** ⚠️ Can content with variations be exported/imported?
**A:** **No**.

## Card: Changing Data Source
**Q:** ⚠️ What must you do if you change a data source after using attributes in merge fields?
**A:** Delete the merge fields, add the new source, and recreate them.

## Card: Combining Content Types
**Q:** ⚠️ What is required when combining a form and a landing page?
**A:** The **data graphs must match**.

## Card: Prospect Title
**Q:** ⚠️ What breaks prospect → lead conversion?
**A:** A lead Title **> 80 characters**, or **custom required fields** on the Lead.

## Card: Composite Keys
**Q:** ⚠️ Are composite keys supported in the segment canvas?
**A:** **No** — single-field joins only.

## Card: Marketing Object Delete
**Q:** ⚠️ When is a marketing object delete blocked?
**A:** When any other object references it.

## Card: Plain Text Desync
**Q:** ⚠️ What happens if you manually edit the plain text version?
**A:** It desyncs from the HTML version — future changes are not included.

## Card: reCAPTCHA Break
**Q:** ⚠️ What breaks reCAPTCHA?
**A:** Changing **My Domain**.

## Card: Progressive Profiling PII
**Q:** ⚠️ What should you avoid with progressive profiling?
**A:** Pre-filling **PII**.

## Card: Unpublishing a Form
**Q:** ⚠️ What happens when you unpublish a form?
**A:** It deactivates its flow and Submit stops working.

## Card: On-Canvas Analytics Cost
**Q:** ⚠️ What does opening element details consume?
**A:** **Data Cloud credits**.

## Card: On-Canvas Availability
**Q:** ⚠️ For which runs is on-canvas analytics unavailable?
**A:** Runs before **Winter '25**.

---

## Related

- [[exam-revision-summary]] — full cram list
- [[section-1-platform-setup-governance]] · [[section-2-consent]] · [[section-3-data-identity-segmentation]] · [[section-4-campaign-flow-content]] · [[section-5-agentforce-ai]] · [[section-6-analytics-insights]] — section decks