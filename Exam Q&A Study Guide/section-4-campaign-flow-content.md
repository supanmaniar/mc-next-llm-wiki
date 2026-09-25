# Q&A Study Guide — Section 4: Campaign Design, Flow Orchestration & Content (30%)

> **Exam weight: 30% — the highest-value section.** Scenario-driven questions with full reasoning. Cover the **Answer** and **Why** until you've committed to your own answer.
> **Related concept pages:** [[personalization-data-sources]] · [[merge-fields-and-expressions]] · [[dynamic-content-variations]] · [[repeaters-and-recommenders]] · [[campaigns-and-flows]] · [[flow-elements-deep-dive]] · [[flow-data-operations]] · [[audience-flows]] · [[activation-triggered-flows]] · [[email-creation-editing]] · [[dynamic-from-reply-addresses]] · [[landing-pages]] · [[forms-data-sources]] · [[external-forms-form-handlers]] · [[campaign-reporting-tools]]

---

## Q1 — Personalization Method Selection

**Question:** A marketing team wants to show a list of five recommended products per contact in an email, pulled from a catalog. Which personalization method should the consultant recommend?

**Answer:** **A repeater.**

**Why:** A repeater shows a series of items from a data source — exactly the "list of products" pattern. Merge fields return a single value, dynamic content swaps whole components per audience, and saved expressions return one value. Only a repeater iterates over multiple rows. Note that recommender data works **only inside a repeater**, so if recommendations are involved, the repeater is mandatory.

> ⚠️ **Distractor logic:** "Dynamic content variations" is the plausible-but-wrong answer — it changes *which* component shows, not how many items render.

---

## Q2 — Saved Expressions

**Question:** A client wants to display each contact's most recent purchase amount, reusing the same logic across email and SMS. Which method should the consultant use?

**Answer:** **A saved expression — it filters and sorts to return ONE value and is reusable across channels.**

**Why:** Saved expressions are purpose-built for "return the single most recent/most relevant value" and are channel-agnostic. A merge field alone cannot filter and sort; a repeater returns many rows. The reusability across channels is the detail that makes saved expressions the best fit.

---

## Q3 — Personalization Limits

**Question:** A designer has built an email with 20 personalization points and wants to add 10 more. What should the consultant advise?

**Answer:** **The limit is 25 personalization points per item — only 5 more can be added.**

**Why:** The limit is **25** personalization points per item, **15** variations per component. Note the additional rule that **linking components shares one personalization point**, so linking can reduce the count. Also, subject line + preheader count as **one** component, not two.

> ⚠️ **Distractor logic:** "There is no limit" is the plausible-but-wrong answer — the limits are hard and frequently tested.

---

## Q4 — Variations Export

**Question:** A client wants to export an email with dynamic content variations and import it into another org. Is this possible?

**Answer:** **No — content with variations cannot be exported or imported.**

**Why:** This is a hard restriction. The practical implication is that variation logic must be rebuilt manually in the target org, which affects deployment planning. This pairs with the Section 1 sandbox/deployment topic.

---

## Q5 — Flow Type Selection

**Question:** A client wants a flow to run when a customer submits a form, completing within about 15 minutes. Which flow type should the consultant use?

**Answer:** **An automation event-triggered flow.**

**Why:** Event-triggered flows run on a customer action (click, form submit, record update) within ~**15 minutes**. Note the bonus fact: the **Create Consent** element is available here only — which is why this flow type is central to the consent architecture in Section 2.

> ⚠️ **Distractor logic:** "An audience flow" is the plausible-but-wrong answer — audience flows run on a schedule, not on a customer action.

---

## Q6 — Activation-Triggered Flow

**Question:** A client wants a flow to run whenever a Data 360 activation publishes. Which flow type applies, and what is the refresh cadence?

**Answer:** **An activation-triggered flow — refresh is 10 minutes (incremental) / 24 hours (standard). It is the only Data 360 target type and uses MuleSoft or HTTP callout.**

**Why:** Activation-triggered flows are uniquely tied to Data 360 activation publishing. The dual refresh cadence is the tested detail — incremental is far faster than standard, which matters for time-sensitive use cases. The "only Data 360 target type" fact distinguishes it from other flow types.

---

## Q7 — Broadcast Flow

**Question:** A client needs a flow whose audience membership is determined *after* the flow starts. Which flow type should the consultant use?

**Answer:** **A broadcast flow — it uses dynamic segments (membership after start) and can run asynchronously.**

**Why:** The "membership after start" behaviour is the defining characteristic of a broadcast flow and is exactly what the scenario describes. Audience flows, by contrast, use a fixed published segment. The async capability is a secondary detail.

---

## Q8 — Campaign Flow Cardinality

**Question:** A client asks whether one flow can belong to multiple campaigns. What should the consultant explain?

**Answer:** **No — 1 campaign = many flows, but 1 flow = 1 campaign.**

**Why:** The cardinality is asymmetric, and the exam tests the direction. A campaign can contain many flows, but a flow belongs to exactly one campaign. This affects how you structure reusable logic — you'd use a subflow rather than sharing a flow across campaigns.

> ⚠️ **Distractor logic:** "A flow can belong to multiple campaigns" is the plausible-but-wrong answer — it assumes symmetry that does not exist.

---

## Q9 — Flow Sharing

**Question:** A consultant creates a standalone flow and expects the marketing team to see it. They report it is invisible. Why?

**Answer:** **Standalone flows are private by default — share via categories + sharing rules, or manually. Flows related to a campaign inherit the campaign's sharing.**

**Why:** The default differs by flow origin. Campaign-related flows inherit sharing automatically, which is why they "just work"; standalone flows require explicit sharing. This is a common implementation surprise and a favourite exam scenario.

> ⚠️ **Distractor logic:** "The team needs a higher permission set" is the plausible-but-wrong answer — it misdiagnoses a *sharing* problem as a *permissions* problem.

---

## Q10 — Flow Statuses

**Question:** A client pauses a flow and asks whether it still counts as active. What should the consultant explain?

**Answer:** **Yes — a paused flow counts as active. Only one version can be active at a time.**

**Why:** The status list is Preparing, Activated, Finishing, Completed, Scheduled, Canceled, Draft, and Error. The "paused counts as active" rule matters because it blocks activating a different version — you must fully stop the paused flow first. This is a subtle but frequently tested constraint.

> ⚠️ **Distractor logic:** "A paused flow is inactive, so you can activate another version" is the plausible-but-wrong answer — it follows intuition but violates the one-active-version rule.

---

## Q11 — Data Source by Component

**Question:** A consultant needs to configure a decision split based on a customer attribute. Which data source feeds decision splits?

**Answer:** **The data graph.**

**Why:** Email merge fields and decision splits both draw from the **data graph**. By contrast, the segment (audience entry) comes from the **DMO layer (Data 360)**, and the Get Records element pulls from **Salesforce Core**, bypassing Data 360. Mapping each component to its correct source is a high-frequency exam pattern.

> ⚠️ **Distractor logic:** "The DMO layer" is the plausible-but-wrong answer — correct for the segment entry, wrong for decision splits.

---

## Q12 — Data Graph Locking

**Question:** A consultant tries to replace the data graph on an email that uses dynamic content variations. The option is unavailable. Why?

**Answer:** **The data graph is locked — it cannot be removed or replaced if the email has dynamic content variations or a recommender, or once a landing page content block is published.**

**Why:** Locking protects the integrity of personalization logic that depends on specific fields. The practical implication is that data graph decisions must be made *before* building variations. Landing pages should use a **real-time** graph, which is a related design rule.

> ⚠️ **Distractor logic:** "You need a higher permission" is the plausible-but-wrong answer — it misdiagnoses a *design lock* as an *access* issue.

---

## Q13 — Recommender Data Source

**Question:** A client wants to remove a Personalization Recommender data source from an email. What should the consultant explain?

**Answer:** **A recommender can be replaced but not removed. It also requires ≥1 successful refresh and only works on trained recommenders on the same data graph.**

**Why:** The "replace but not remove" rule is a memorised exam fact. The training requirement (≥1 successful refresh) means a recommender cannot be used immediately after configuration. And the data works **only inside a repeater**, which constrains the content design.

> ⚠️ **Distractor logic:** "Remove and re-add it" is the plausible-but-wrong answer — removal is not permitted at all.

---

## Q14 — Lookup Data Graph

**Question:** A client needs to pull catalog data (non-profile data) into an email. Which data source applies, and what are the limits?

**Answer:** **A lookup data graph — for non-profile data, needs a primary key, cannot nest, and is limited to 5.**

**Why:** Lookup data graphs are the mechanism for joining non-profile reference data. The three constraints matter: the primary key requirement, the no-nesting rule, and the max of **5**. The no-nesting rule is the most commonly missed.

---

## Q15 — Changing a Data Source

**Question:** A consultant changes the data source on an email after merge fields were already built from the old source. What must they do?

**Answer:** **Delete the merge fields, add the new source, and recreate the merge fields.**

**Why:** Merge fields bind to specific source attributes, so changing the source invalidates them. There is no automatic remapping. This is a planning lesson: finalise the data source before building personalization.

> ⚠️ **Distractor logic:** "The merge fields remap automatically" is the plausible-but-wrong answer — it assumes intelligence the platform does not provide.

---

## Q16 — Combining Content Types

**Question:** A client wants to combine a form and a landing page in one content item. What is the prerequisite?

**Answer:** **The data graphs must match.**

**Why:** Both components must resolve against the same data graph for the combined content to work. This is a constraint that surfaces during design, and it links to the landing page rule that published content blocks lock the data graph.

---

## Q17 — Personalization Point

**Question:** A designer adds the first variation to a subject line. What happens automatically?

**Answer:** **The first variation auto-creates the personalization point.**

**Why:** You do not create personalization points manually — they are created by the act of adding the first variation. This is a small but tested mechanic, and it explains why the point count grows as variations are added.

---

## Q18 — Decision vs Targeting Rule

**Question:** A consultant is configuring dynamic content. What is the difference between a decision and a targeting rule?

**Answer:** **A decision is who is eligible (each variation maps to a decision with the same name). A targeting rule is the conditions for showing a variation (attributes, related attributes, calculated insights, segment memberships).**

**Why:** The naming convention — each variation maps to a decision with the **same name** — is a useful memory hook. The targeting rule is where the actual logic lives, and the four condition types are worth memorising.

---

## Q19 — Default Variation

**Question:** A client wants to change the priority of the default variation so it is evaluated first. Is this possible?

**Answer:** **No — the default variation's priority cannot be changed. It shows when no rule matches.**

**Why:** The default is the catch-all fallback, so it must remain last by definition. This is a hard constraint the exam tests because reordering variations is otherwise a normal operation.

---

## Q20 — Clone vs Link

**Question:** A consultant wants two components to share the same personalization logic. Should they clone or link?

**Answer:** **Link — linking shares one personalization point. Cloning creates a separate copy.**

**Why:** The distinction is about shared vs independent logic. **Clone** requires the component to have no variations and only shows points on the same data graph. **Link** requires the point to already exist in the content item and the component to have no variations. The key behavioural difference: linked components share variation/rule/priority changes but keep content/style edits independent.

> ⚠️ **Distractor logic:** "Clone" is the plausible-but-wrong answer — it produces two independent points, so logic changes would not propagate.

---

## Q21 — Unlink

**Question:** A consultant unlinks a personalization point. What is the result?

**Answer:** **The point is cloned ("Copy of …") so the component keeps its settings but becomes independent.**

**Why:** Unlinking is a non-destructive way to break the shared relationship while preserving configuration. The "Copy of …" naming is a useful visual cue that the point is now independent.

---

## Q22 — Repeater Behaviour

**Question:** A designer changes the layout of a repeater that already has content and styling. What happens?

**Answer:** **Changing the layout removes content, data, and style.**

**Why:** This is a destructive operation, so layout decisions should be made early. Related: a repeater is **empty** if there is no data for the recipient, which means the email must handle the empty state gracefully.

> ⚠️ **Distractor logic:** "The content is preserved and reflowed" is the plausible-but-wrong answer — it assumes a non-destructive reflow that does not occur.

---

## Q23 — Objective-Based Recommender

**Question:** A designer configures an objective-based recommender and sees a placeholder on the canvas. Is this a configuration error?

**Answer:** **No — the canvas shows a placeholder by design. Use Preview with a segment to see real output.**

**Why:** The recommender picks the best image per contact at send time with no rules, so there is no single correct preview on the canvas. The placeholder is expected; the Preview-with-segment step is how you validate. This is a designed behaviour, not a defect.

---

## Q24 — Decision Logic Methods

**Question:** A consultant wants a Decision element where outcome order has no impact. Which logic method should they use, and is it supported for Marketing Cloud flows?

**Answer:** **"Define with AI" evaluates outcomes simultaneously so order has no impact — but it is NOT supported for Marketing Cloud flows.**

**Why:** The scenario's requirement ("order has no impact") points to Define with AI, but the second half of the question is the trap: it is unsupported for Marketing Cloud flows. The supported method is **Define Manually**, where outcomes are evaluated in order. This is a classic "right feature, wrong product" distractor.

> ⚠️ **Distractor logic:** "Define with AI" alone is the plausible-but-wrong answer — it satisfies the stated requirement but violates the product constraint.

---

## Q25 — Decision Condition

**Question:** What three parts make up a decision condition?

**Answer:** **Resource (data-graph attribute) + Operator (Equals/Greater Than…) + Value.**

**Why:** Recognising the three-part structure helps you debug decision elements and spot misconfiguration. The Resource must come from the data graph, which ties back to Q11.

---

## Q26 — Wait Element Restriction

**Question:** A consultant adds a Wait element to a flow that also uses screens. What happens?

**Answer:** **Wait elements require autolaunched flows — they cannot be mixed with screens or choice.**

**Why:** This is a hard architectural constraint. The practical implication is that any flow needing a wait must be autolaunched, which affects how the flow is triggered and how it interacts with users.

> ⚠️ **Distractor logic:** "It works but runs synchronously" is the plausible-but-wrong answer — the combination is not permitted at all.

---

## Q27 — Wait Until Date

**Question:** A Wait Until Date element has no time specified. When does it resume?

**Answer:** **12 AM org time zone.**

**Why:** The default time is midnight in the org's time zone, not the recipient's. This matters for time-sensitive sends and is a memorised detail the exam tests.

---

## Q28 — Wait Until Event

**Question:** A consultant places a Wait Until Event element two steps after the monitored email. Will it work?

**Answer:** **No — Wait Until Event must be immediately after the monitored element. Dynamic/merge-field links are also unsupported (use Any Link).**

**Why:** The element needs to observe the immediately preceding action. Placing it elsewhere breaks the monitoring. The link restriction is a related trap: personalized links cannot be monitored, so you must use **Any Link**.

> ⚠️ **Distractor logic:** "It works as long as the email is in the flow" is the plausible-but-wrong answer — proximity is required.

---

## Q29 — Path Experiment

**Question:** A client wants to A/B test five email variations and have the winner selected automatically. Which feature applies, what edition is required, and when is the winner declared?

**Answer:** **A Path Experiment — requires Advanced + Personalization, and auto-declares a winner at 95% confidence (Bayesian). Max 10 variations.**

**Why:** The auto-winner requirement points to Path Experiment, and the edition gate (Advanced + Personalization) is the constraint to check. The **95% confidence** threshold is a memorised number. Note also that percentages are **targets, not exact counts**, and manual winner selection does not require a new version.

> ⚠️ **Distractor logic:** "A Decision element with random assignment" is the plausible-but-wrong answer — it can split traffic but cannot auto-declare a statistical winner.

---

## Q30 — Subflow

**Question:** A consultant wants a Subflow to call a flow that contains a Wait element. Is this possible?

**Answer:** **No — a Subflow cannot call flows with wait elements. Variable API names are ≤ 40 chars, and it calls the active version (API 61.0+).**

**Why:** The wait restriction exists because the Subflow must complete within the parent's execution context. The 40-character variable limit and the "active version" behaviour are secondary details the exam tests. This is a good example of a constraint that shapes flow architecture.

---

## Q31 — Get Records

**Question:** A consultant configures a Get Records element to retrieve 25,000 records. What happens?

**Answer:** **It fails — the limit is 2–20,000 records.**

**Why:** The range is **2–20,000**. The lower bound (2) is unusual and worth noting. For Data Cloud objects, Get Records also needs a DLO→DMO mapping, which is a separate configuration prerequisite.

---

## Q32 — Update Records Trap

**Question:** A consultant configures an Update Records element but forgets to add a filter. What is the effect?

**Answer:** **It updates ALL records.**

**Why:** This is one of the most dangerous traps in the exam. Without a filter, the element applies the update to every record in scope. The practical lesson is to always verify the filter before activating a flow.

> ⚠️ **Distractor logic:** "It updates nothing without a filter" is the plausible-but-wrong answer — it assumes a safe default that does not exist.

---

## Q33 — Delete Records

**Question:** Where do records deleted by a flow go, and how long are they retained?

**Answer:** **To the Recycle Bin for 15 days.**

**Why:** The 15-day retention is a memorised number. It provides a recovery window, which is relevant for change management and incident response.

---

## Q34 — Transaction Completion

**Question:** A flow creates a record and then immediately queries it in the next element. The query returns nothing. Why?

**Answer:** **Records change only when the transaction completes — the change is not visible mid-transaction.**

**Why:** This is a transactional-consistency behaviour. The practical implication is that you cannot read back a record you just created within the same transaction; you must carry the value in a variable instead.

> ⚠️ **Distractor logic:** "The record creation failed" is the plausible-but-wrong answer — the creation succeeded, it is simply not yet visible.

---

## Q35 — Collection Elements

**Question:** A consultant needs to sort a collection by four fields. Is this possible?

**Answer:** **No — Collection Sort supports up to 3 fields and modifies the collection directly.**

**Why:** The 3-field limit is a memorised number. Note the related limits: **Transform** allows ≤ 1 nested collection with a formula ≤ 255 characters and no data graphs for joins; **Collection Filter** outputs null until run and leaves the source unchanged; **Assignment** runs consecutively in order.

---

## Q36 — Operators Restriction

**Question:** A consultant wants to use the "Contains" operator as a filter condition. Is this supported?

**Answer:** **No — Contains and Is Changed are not filter conditions. In/Not In are only available in Create/Get/Update Records.**

**Why:** The operator availability varies by element, which is a common source of configuration errors. For multi-select picklists, matching is fragile, so the guidance is to use **INCLUDES** instead.

> ⚠️ **Distractor logic:** "Use Contains" is the plausible-but-wrong answer — it is a valid operator elsewhere but not as a filter condition.

---

## Q37 — Exit Rules

**Question:** How many exit rules can a flow have, and when are they evaluated?

**Answer:** **Up to 10, evaluated on start/resume. Numeric attributes support aggregation (Average/Sum/Max/Min).**

**Why:** The count (10) and the evaluation points (start/resume) are both tested. The aggregation capability on numeric attributes is a secondary detail that enables more sophisticated exit conditions.

---

## Q38 — Engagement Signals

**Question:** A consultant wants to use custom events from engagement signals. What edition is required, and what are the other constraints?

**Answer:** **Advanced only for custom events. Signals use only Engagement-category DMOs, one related DMO (1:1 or many-to-one), and require an item identifier for recommenders.**

**Why:** The edition gate is the primary constraint. The other rules matter for configuration: the Engagement-category restriction limits which DMOs qualify, and the item identifier requirement is a prerequisite for recommender use. Identifiers are User/Timestamp/Item/Event, and the default metric is count-based.

---

## Q39 — Flow vs Org Data Graph

**Question:** A consultant notices the flow uses a different data graph than the org default. Is this a problem?

**Answer:** **No — the org default data graph drives message personalization, while the flow data graph drives decisioning. They are intentionally separate.**

**Why:** Recognising that these are two distinct graphs prevents a misdiagnosis. The flow graph governs decision logic; the org default governs message content. This distinction is frequently tested.

---

## Q40 — Contact Point Selection

**Question:** A client wants to control which phone number is sent to an activation target when a contact has several. What should the consultant configure?

**Answer:** **Contact point selection (which fields go to the target) plus source priority order (which value wins).**

**Why:** Two separate mechanisms are involved: *selection* determines which field types are included, and *source priority* determines which value wins. The priority values are **Primary** (Primary Flag mapped), **Personal** (For Personal Use = 1), **Business** (For Business Use = 1), and **Any** (no flag).

> ⚠️ **Distractor logic:** "Reconciliation rules" is the plausible-but-wrong answer — reconciliation does not govern contact points (see Section 3, Q14).

---

## Q41 — Removing Any Source

**Question:** A client removes "Any Source/Any Type" from their contact point configuration. What is the effect?

**Answer:** **A smaller population is targeted.**

**Why:** Removing the catch-all option narrows the eligible population to contacts with an explicitly flagged source. This is a deliberate trade-off: more precise targeting at the cost of reach.

---

## Q42 — Copying an Email

**Question:** A consultant copies an email that uses dynamic content variations and a recommender. What is preserved?

**Answer:** **Only default variations are copied — other variations, rules, and recommenders are not. Merge fields and repeaters are preserved.**

**Why:** This is a significant and frequently tested limitation. The practical implication is that copying an email is not a reliable way to duplicate personalization logic; you must rebuild the variations and recommender.

> ⚠️ **Distractor logic:** "Everything is copied" is the plausible-but-wrong answer — it assumes a faithful copy.

---

## Q43 — Convert to Code

**Question:** A designer converts an email to code view to add custom logic. What do they lose, and can they revert?

**Answer:** **Convert to Code is one-way. It removes dynamic content (repeaters, conditional logic, content variants) and you lose drag-and-drop plus the Style tab.**

**Why:** The irreversibility is the key fact. This means the decision must be deliberate and late in the build process. The loss of the Style tab is a secondary consequence that affects ongoing maintenance.

---

## Q44 — View as Web Page

**Question:** A client asks how long the View as Web Page link works and whether it shows the original personalized content. What should the consultant explain?

**Answer:** **It works for 90 days after send, reflects the published version, and personalized values re-render against the recipient's current profile on each open.**

**Why:** The re-rendering behaviour is the subtle detail: the link does not freeze the original values, so a contact who changes their name will see the new name. This has implications for compliance and for how clients interpret what a recipient saw.

> ⚠️ **Distractor logic:** "It shows a static snapshot of the sent email" is the plausible-but-wrong answer — it assumes frozen content.

---

## Q45 — Plain Text Version

**Question:** A consultant manually edits the plain text version of an email. What is the consequence?

**Answer:** **It desyncs from the HTML version — future changes are not included.**

**Why:** Manual edits break the link between the two versions, so subsequent HTML updates will not propagate. The practical advice is to avoid manual plain-text edits, or to accept that the versions will diverge.

---

## Q46 — Test Sends

**Question:** A consultant wants to send a test to 8 recipients. What should they know?

**Answer:** **Test sends are limited to 5 recipients, count toward message credits, and the From name must be from an authenticated domain.**

**Why:** Three separate constraints are tested here. The credit consumption is often overlooked — tests are not free. The authenticated-domain requirement links back to Section 1's domain authentication.

---

## Q47 — CAN-SPAM

**Question:** A client asks what is legally required in a marketing email. What should the consultant state?

**Answer:** **A Physical Address merge field plus an opt-out link (Unsubscribe / Preference Manager / custom preference page).**

**Why:** Both elements are required for CAN-SPAM compliance. Note the practical caveat: Preference Manager and Unsubscribe links **do not work in preview**, so a preview will not show them functioning — this is expected, not a bug.

---

## Q48 — Dynamic From/Reply

**Question:** A client wants the From address to vary per sender while avoiding DMARC alignment failures. What should the consultant recommend?

**Answer:** **A static From address with a dynamic display name — this uses subdomain senders and avoids DMARC alignment failures.**

**Why:** The distinction is architectural: **static From + dynamic display name** works with subdomain senders, while **dynamic From** requires root-domain authenticators (personal addresses align with the sending domain). Dynamic reply requires an **authorized email domain**, falling back to a fallback address if unauthorized. Always configure an **authenticated fallback**.

> ⚠️ **Distractor logic:** "Use a dynamic From address" is the plausible-but-wrong answer — it satisfies the "vary per sender" requirement but risks DMARC alignment failures.

---

## Q49 — Direct Reply vs RMM

**Question:** A client wants auto-replies and out-of-office processing on replies. Should they use direct reply or Reply Mail Management?

**Answer:** **RMM — direct reply bypasses RMM, so there is no auto-reply, out-of-office, or unsubscribe processing.**

**Why:** The scenario's requirement (auto-reply, out-of-office, unsubscribe processing) is exactly what RMM provides. Direct reply is faster but skips all of it. This is a functional trade-off the exam tests.

---

## Q50 — Distributed Marketing Limits

**Question:** A client wants to lock certain images so non-marketers cannot change them. Is this possible?

**Answer:** **No — only phrases can be required (locked); images cannot. The limits are 30 approved images + 30 approved phrases, with only one default image.**

**Why:** The asymmetry between images and phrases is the tested detail. The scenario asks to lock images, which is not supported. The 30/30 limits and the single default image are memorised numbers.

> ⚠️ **Distractor logic:** "Lock the images" is the plausible-but-wrong answer — it assumes symmetry between the two asset types.

---

## Q51 — Distributed Marketing Availability

**Question:** A consultant is configuring Distributed Marketing availability. What flow type and event are required?

**Answer:** **An event-triggered flow with the Distributed Marketing and Alerts Message event. Get Records (List Email) + Decision (Status = Scheduled) prevent canceled sends.**

**Why:** The specific event name is a memorised fact. The Get Records + Decision pattern is a design technique: checking that the email status is still Scheduled prevents sending an email that was canceled after the flow started.

---

## Q52 — Unschedule Behaviour

**Question:** A user unschedules an email in a campaign. What happens to other emails scheduled with it?

**Answer:** **Unschedule cancels the email — and any others scheduled with it in the campaign.**

**Why:** The cascade is the tested detail. This is a destructive operation with broader impact than the user might expect, which is why the Distributed Marketing flow includes the Status = Scheduled check.

---

## Q53 — Landing Page URL Alias

**Question:** A consultant needs to change a landing page's vanity URL. When can this be done?

**Answer:** **In Draft only — publishing activates aliases. Alias statuses are Draft / Active / Inactive (reactivatable).**

**Why:** The Draft-only restriction means the page must be unpublished to change the alias. The three statuses matter because an Inactive alias can be reactivated, which is useful for seasonal campaigns.

---

## Q54 — Redirect URL

**Question:** A client wants to set a redirect URL for an unpublished landing page. What are the requirements?

**Answer:** **It must start with `https://` and be under 2,000 characters. Set it up before unpublishing to avoid the "URL no longer exists" page.**

**Why:** Both the protocol requirement and the length limit are tested. The sequencing advice is the practical insight: configuring the redirect *before* unpublishing prevents visitors from hitting an error page.

---

## Q55 — Form Visibility

**Question:** A client has built a form and added it to a landing page, but visitors cannot see it. What is the likely cause?

**Answer:** **The landing page must be published with an active URL alias for the form to be visible.**

**Why:** Publishing the landing page also publishes the form and activates the related flow. Until then, the form exists but is not reachable. This is a common go-live oversight.

---

## Q56 — Landing Page SEO

**Question:** A client wants to add custom JavaScript to a landing page for SEO. Is this allowed?

**Answer:** **No — only JSON-LD structured data is allowed (no JavaScript). Allowed tags are `<link>`, `<meta>`, and `<script>`.**

**Why:** The restriction to JSON-LD is a security measure. The allowed-tag list is a memorised detail. Note that `<script>` is allowed as a tag, but not arbitrary JavaScript — the distinction is about *structured data* versus *executable code*.

> ⚠️ **Distractor logic:** "Add a `<script>` block with your JavaScript" is the plausible-but-wrong answer — it exploits the allowed tag without respecting the content restriction.

---

## Q57 — Template Locking Scope

**Question:** A client locks a landing page template to prevent authors changing personalization logic. Will this work?

**Answer:** **No — template locking protects content/settings only. Authors can still edit targeting rules and variations. Clone the personalization point for logic control.**

**Why:** This is a significant gap between expectation and behaviour. Locking does not extend to personalization logic, so the correct approach is to clone the personalization point. Note that template dynamic content rules and variants copy to new pages automatically.

> ⚠️ **Distractor logic:** "Locking prevents all edits" is the plausible-but-wrong answer — it overstates the protection.

---

## Q58 — Form Cardinality

**Question:** A client wants two forms on one landing page, each with its own flow. Is this possible?

**Answer:** **No — one form per landing page and one flow per form. View modes must also match (block ↔ block, code ↔ code).**

**Why:** The 1:1:1 relationship is a hard constraint. The view-mode matching rule is a secondary requirement that catches people out when mixing component-based and code-based content.

---

## Q59 — Form Write Data Provider

**Question:** A consultant configures a form's write data provider. What are the rules?

**Answer:** **Account/Contact/Lead/Prospect or a marketing object (default if available, else Lead); one object at a time; respects FLS.**

**Why:** The fallback to **Lead** is the tested detail — if no default is available, Lead is used. The "one object at a time" rule means a form cannot write to multiple objects, and FLS compliance means field-level security is honoured.

---

## Q60 — Form Read Data Providers

**Question:** A client wants to pre-fill form fields and use progressive profiling. What is the maximum number of lookup providers?

**Answer:** **2 — a maximum of 1 marketing object plus 1 recipient data graph.**

**Why:** The composition rule (1 + 1) is more specific than a simple "2" and is the tested detail. Read providers enable pre-fill and progressive profiling, and they are distinct from the write provider.

---

## Q61 — Unsupported Form Field Types

**Question:** A client wants to add a "Number of Employees" field and a multi-picklist to a form. Is this supported?

**Answer:** **No — Number of Employees and multi-picklist are unsupported. Also, no duplicate fields, and changing a field's API name breaks future saves.**

**Why:** The unsupported list is memorised. The API-name warning is a practical trap: renaming a field after forms reference it breaks subsequent saves, so field names should be finalised early.

---

## Q62 — Hidden Fields

**Question:** A consultant adds a hidden required field to a form. What is required?

**Answer:** **A fallback value — hidden required fields need one. Supported hidden types are Checkbox/Dropdown/Number/Plain Text/Text Area, and URL parameters (UTM) are supported.**

**Why:** A hidden required field cannot be filled by the user, so a fallback is mandatory. The UTM support is a useful capability for capturing campaign attribution without user input.

---

## Q63 — reCAPTCHA

**Question:** A client enables reCAPTCHA v2. What are the scope and caveats?

**Answer:** **It applies to marketing landing pages with forms only, applies to every form once enabled, is one per external page, and changing My Domain breaks it.**

**Why:** The "every form once enabled" behaviour is the tested detail — you cannot enable it selectively. The My Domain dependency is a real operational risk that must be flagged during implementation.

> ⚠️ **Distractor logic:** "Enable it per form" is the plausible-but-wrong answer — it assumes granular control that does not exist.

---

## Q64 — Progressive Profiling

**Question:** A client wants to use progressive profiling with rules on hidden fields. Is this supported?

**Answer:** **No — there are no rules on hidden fields or related objects. Progressive profiling needs a read data provider, and changing the read source removes rule connections. Avoid pre-filling PII.**

**Why:** The hidden-field restriction is the tested constraint. The "changing the read source removes rule connections" behaviour is a maintenance trap, and the PII warning is a compliance consideration.

---

## Q65 — Unpublishing a Form

**Question:** A client unpublishes a form to make edits. What happens?

**Answer:** **It deactivates its flow, Submit stops working, and you must save the flow as a new version to edit and republish.**

**Why:** The flow deactivation is the significant consequence — unpublishing a form has downstream effects on automation. The "save as a new version" requirement means the edit is not a simple toggle.

---

## Q66 — External Form Embedding

**Question:** A consultant is embedding a Marketing Cloud Next form on an external website. What does the embedding code consist of?

**Answer:** **2 `<script>` tags + 1 `<fragment>` element, generated from the published version (republish to refresh).**

**Why:** The composition is a memorised detail. The "generated from the published version" rule means any change requires republishing to regenerate the code — a common source of stale embeds.

---

## Q67 — External Form Security

**Question:** A client embeds a form externally and sees a frame-ancestors 'self' CSP error. What is the cause?

**Answer:** **The Experience Cloud site was not published after configuring CORS Allowed Origin List, clickjack protection, and Trusted Sites for Scripts.**

**Why:** All three security configurations are required, and the site must be published for them to take effect. The specific error message is a useful diagnostic clue the exam may reference.

---

## Q68 — Form Handler Field Names

**Question:** A client's form handler is not capturing data correctly. The external form uses field names like `first_name`. What is the likely cause?

**Answer:** **External field names must exactly match the HTML `name` attributes. Date = `YYYY-MM-DD`; Time = `hh:mm:ss`; DateTime = ISO 8601; selected checkbox = `true`.**

**Why:** Exact matching is required, including format conventions. The specific formats are memorised details. This is a high-frequency exam topic because it's a common real-world failure.

> ⚠️ **Distractor logic:** "Field names are case-insensitive" is the plausible-but-wrong answer — exact matching is required.

---

## Q69 — Form Handler Mapping Timing

**Question:** A consultant creates a form handler flow and then adds a new field mapping. Will the flow pick it up?

**Answer:** **No — map all fields before creating the flow. Edits afterwards do not reflect automatically.**

**Why:** The mapping is baked into the flow at creation time. This means field mapping must be complete before the flow is built, which affects implementation sequencing.

---

## Q70 — Client vs Server Side Form Handlers

**Question:** A client needs form handler submissions to support web tracking and identity resolution, but their site has a strict CSP. Which approach should the consultant recommend?

**Answer:** **Neither fully satisfies both — client-side (JS snippet) supports web tracking + identity resolution; server-side (direct POST URL) has no tracking/identity resolution but works with strict CSP. Both need a CORS Allowlist entry.**

**Why:** This is a genuine trade-off question. The scenario's two requirements conflict: tracking/identity resolution requires client-side, but strict CSP favours server-side. The correct answer is to surface the trade-off rather than pretend one option satisfies both. This is the kind of "analyse and recommend" question the exam favours.

---

## Q71 — Campaign Stage

**Question:** A campaign has five flows; four completed successfully and one errored. What does the Campaign Stage show?

**Answer:** **Error — one Error flow makes the whole campaign Error.**

**Why:** The stage is derived from *all* flows, and a single error propagates to the campaign level. The other stages are In Planning, In Progress, Completed, Canceled, and Paused. This is a frequently tested aggregation rule.

> ⚠️ **Distractor logic:** "In Progress" is the plausible-but-wrong answer — it reflects the majority state, but the rule is that any error wins.

---

## Q72 — Marketing Calendar

**Question:** A client cannot find their form-triggered flow on the Marketing Calendar. Why?

**Answer:** **Event-triggered and form-triggered flows do not appear on the Marketing Calendar. It shows Campaigns + Campaign Segment Flows + Segment Flows by default.**

**Why:** The calendar is for scheduled, plannable activity, so event-driven flows are excluded. Access requires Marketing Cloud Admin/Manager or the Access Marketing Calendar permission, and you can drag campaigns (not segment flows).

---

## Q73 — NotSentReason

**Question:** A client wants to understand why emails were not sent. Which field should the consultant point to?

**Answer:** **NotSentReason — it maps to Engagement Action Reason on the Email Engagement DMO. Common values: no consent, no opt-in, unauthorized From, hard bounce, TTL exceeded.**

**Why:** The mapping to the Email Engagement DMO is the tested detail — it tells you where to query. The common values are a useful diagnostic list, and "no consent" links directly to Section 2.

---

## Q74 — On-Canvas Analytics

**Question:** A client wants to view element-level analytics for a flow run from Winter '24. Is this possible?

**Answer:** **No — on-canvas analytics is not available for runs before Winter '25. It also requires Tableau Next Included App Business User, and opening element details consumes Data Cloud credits.**

**Why:** Three constraints are tested: the Winter '25 cutoff, the permission requirement, and the credit cost. The credit consumption is the most easily overlooked — viewing analytics is not free.

---

## Q75 — AI Campaigns

**Question:** A consultant uses Agentforce to draft a campaign. What does the agent produce, and what powers the agent actions?

**Answer:** **A brief plus a campaign preview (name, flow, multichannel content). Agent actions (Create/Draft/Save Brief, Save Campaign) are powered by Salesforce Flow. Generate Campaign Insights analyses the first flow.**

**Why:** The "powered by Salesforce Flow" detail is the tested fact — it explains the underlying mechanism. The "analyses the first flow" limitation is a scope constraint worth noting.

---

## Q76 — CMS Content Types

**Question:** A consultant is explaining where marketing content lives. What does Salesforce CMS provide in Marketing Cloud Next?

**Answer:** **Salesforce CMS is the content repository — it holds content types (email, landing page, form, image, expression), organised into workspaces, with contributor roles controlling who can edit and publish.**

**Why:** Recognising that CMS is the *storage and governance* layer — separate from the campaign and flow layers — clarifies where content is created versus where it is used. The workspace and role model (Content Admin / Manager / Author) governs access, and expressions are stored here too (Q79).

---

## Q77 — Campaign Record vs Flow Canvas

**Question:** A consultant needs to configure decision branching and wait configuration. Where should they work?

**Answer:** **The Flow Builder canvas — the campaign record shows flow summaries and insights, while advanced elements (decision branching, wait configuration) live in Flow Builder.**

**Why:** The two surfaces have different scopes. The **campaign record** shows flow summaries (Start element plus message/wait elements; more than 5 elements renders messages in a table), a sidebar with Campaign Insights and Influenced Opportunities, and an Overview tab with performance, deliverability, and content insights. The **Flow Builder canvas** holds the advanced logic. Some features appear in one but not the other.

> ⚠️ **Distractor logic:** "The campaign record, because it's the hub" is the plausible-but-wrong answer — the hub shows summaries, not advanced configuration.

---

## Q78 — Creating the First Flow

**Question:** A client wants a preconfigured flow with CMS content they can customise. Which creation method should the consultant recommend?

**Answer:** **Quick start — it provides a common campaign use case with a preconfigured flow including CMS content (e.g. a customisable email).**

**Why:** Three methods exist: **Flow trigger** (Build Your Own → pick a trigger), **Flow template** (goal-driven, preconfigured with key elements like a follow-up email), and **Quick start** (common use case with preconfigured flow *including CMS content*). The distinguishing feature of Quick start is the bundled content.

> ⚠️ **Distractor logic:** "Flow template" is the plausible-but-wrong answer — it provides elements but not bundled CMS content.

---

## Q79 — Saved Expressions

**Question:** A marketer wants a merge field to return the most recent opportunity for an account. What should the consultant create?

**Answer:** **A saved expression — it defines filter and sort options across related data objects to select the right attribute for a merge field. It is stored in Salesforce CMS and reusable across email, SMS, and WhatsApp.**

**Why:** A merge field alone returns a value; an expression determines *which* value when many are possible. The example pattern is: filter accounts by lead type, then sort related opportunities in descending date order to get the most recent. Expressions require a **data graph** as a prerequisite, and must be **published** to be available in content.

> ⚠️ **Distractor logic:** "A merge field with a filter" is the plausible-but-wrong answer — merge fields do not carry filter/sort logic; expressions do.

---

## Q80 — Expression Permissions

**Question:** A consultant needs to create an expression and then publish it. What permissions are required for each step?

**Answer:** **Create/edit: Marketing Cloud Manager permission set AND any CMS workspace contributor role. Publish/unpublish: Marketing Cloud Manager AND a CMS workspace contributor role of content admin or content manager.**

**Why:** The permission escalates between the two steps — any contributor role suffices to create, but publishing requires the higher content admin or content manager role. This mirrors the email permission split (Q42) and is a recurring pattern in the exam.

> ⚠️ **Distractor logic:** "Any contributor role for both" is the plausible-but-wrong answer — publishing requires the elevated role.

---

## Q81 — Merge Field Placement

**Question:** Where can a marketer add merge fields in an email?

**Answer:** **In the subject line and preheader (via Add Merge Field), and in the text of content (via the Add Merge Field icon in a text-based component's editing toolbar).**

**Why:** The two locations correspond to the two personalization surfaces. Note the related rule that subject line and preheader count as **one** component (Section 4, Q3), so personalizing both consumes a single personalization point.

---

## Q82 — SMS/WhatsApp Merge Fields

**Question:** A consultant is configuring merge fields for an SMS message and cannot find the data source in the Data Sources panel. Why?

**Answer:** **SMS and WhatsApp merge fields use the default data graph configured in Setup — it does not appear in the Data Sources panel, but its data works in merge fields.**

**Why:** This is a deliberate UI omission that causes confusion. The data is available; the panel simply does not surface it. Recognising this prevents a misdiagnosis of "no data source configured".

> ⚠️ **Distractor logic:** "SMS does not support merge fields" is the plausible-but-wrong answer — it does, via the default data graph.

---

## Q83 — Signup Form Template

**Question:** A consultant uses the signup form flow template. What does it automatically create?

**Answer:** **A Flow + a Form + (optionally) a Landing page — automatically created and related.**

**Why:** The template bundles three artefacts, which is why it is the fastest path to a working signup experience. Configuration covers the record type to create on submit (**Lead** by default), the marketing channel, and the communication subscription for consent. Some form fields cannot be removed depending on the consent channel.

> ⚠️ **Distractor logic:** "Only a form" is the plausible-but-wrong answer — the template also creates the flow and optionally the landing page.

---

## Q84 — Pause and Wait Interaction

**Question:** A flow has a 48-hour Wait element. It is paused 12 hours in, and 24 hours elapse before resuming. When does the next email send?

**Answer:** **24 hours after resume — pause duration counts toward the Wait element's total time.**

**Why:** The wait clock keeps running during the pause. In the example, 12 hours elapsed before the pause plus 24 hours during it equals 36 hours, leaving 12 hours remaining — so the email sends 12 hours after resume. The general rule is that **pause duration counts toward total wait time**, and past-due tasks complete immediately on resume.

> ⚠️ **Distractor logic:** "The wait restarts from zero on resume" is the plausible-but-wrong answer — the clock is not reset.

---

## Q85 — Editing a Paused Flow

**Question:** A consultant needs to edit an active flow. What is the correct procedure?

**Answer:** **Deactivate (choosing either "Deactivate and cancel work" or "Deactivate and complete work") → Edit As New Version (the version number is appended to the name) → Activate.**

**Why:** You cannot edit an active flow directly. The two deactivation options differ in what happens to in-flight work: cancel it or let it complete. The new-version naming convention preserves the audit trail of what ran.

> ⚠️ **Distractor logic:** "Pause, edit, then resume" is the plausible-but-wrong answer — pausing does not permit editing.

---

## Q86 — Changing an Active Flow's Campaign

**Question:** A consultant needs to associate an active flow with a different campaign. What should they know?

**Answer:** **Changing the association for an active flow causes reporting and data stream issues. For a draft flow, update the Associated Record field on the flow record.**

**Why:** The association is baked into reporting and data streams once the flow is active, so changing it corrupts historical attribution. The correct approach is to make the change while the flow is still a draft, or to create a new flow.

> ⚠️ **Distractor logic:** "Change it and the reporting updates automatically" is the plausible-but-wrong answer — it assumes clean re-attribution that does not occur.

---

## Q87 — Campaign Deletion

**Question:** A client deletes a campaign that has flows associated with it. What happens to the flows?

**Answer:** **The relationship is removed but the flows remain intact. Sharing reverts to the flow's own rules (or private: owner, admins, View All Non-Setup Flows / Manage Flow).**

**Why:** Deleting a campaign does not cascade to its flows. The sharing consequence is the tested detail: while associated, a flow inherits the campaign's sharing; once the campaign is gone, the flow falls back to its own rules or the private default.

> ⚠️ **Distractor logic:** "The flows are deleted with the campaign" is the plausible-but-wrong answer — it assumes a cascade that does not exist.

---

## Q88 — Flow Sharing Categories

**Question:** A consultant is configuring dynamic sharing for a standalone flow. What is the matching rule for category and subcategory?

**Answer:** **With the Equals operator, category/subcategory must match exactly. With Contains, it only needs to include the rule's category.**

**Why:** The two operators have different strictness, which affects how many flows a sharing rule captures. Manual sharing is the alternative: flow record → Sharing → search user, public group, role, or role plus internal subordinates.

> ⚠️ **Distractor logic:** "Contains also requires an exact match" is the plausible-but-wrong answer — Contains is deliberately looser.

---

## Q89 — Marketing Triggers

**Question:** A client wants to trigger a flow when a shopper abandons a cart. Which trigger applies, and what is the inactivity range?

**Answer:** **The Abandoned Shopping Cart trigger — inactivity period ranges from 10 minutes to 7 days.**

**Why:** Six triggers are available: Abandoned Shopping Cart, Abandoned Page, Abandoned Product Browse, Product Back In Stock, Product Low Inventory, and Product Price Drop. The inactivity range is a memorised detail. All triggers require DMO mapping first, and the permission is **Marketing Triggers Admin**.

> ⚠️ **Distractor logic:** "Abandoned Product Browse" is the plausible-but-wrong answer — it detects product views without a cart, not cart abandonment.

---

## Q90 — Inactivity vs Job Frequency

**Question:** A consultant is configuring a marketing trigger and sees both "Inactivity Period" and "Job Frequency". What is the difference?

**Answer:** **Inactivity Period is the wait after the last interaction; Job Frequency is how often the trigger job runs. They combine to determine when a shopper qualifies.**

**Why:** The two settings are frequently conflated. Inactivity defines the *qualifying condition* (how long since the shopper acted), while Job Frequency defines the *evaluation cadence* (how often the system checks). Job Frequency ranges: minutes 10–59, hours 1–23, days 1–7.

> ⚠️ **Distractor logic:** "They are the same setting with different names" is the plausible-but-wrong answer — they govern different things.

---

## Q91 — Product Triggers

**Question:** What is the difference between the "Product Back In Stock" and "Product Low Inventory" triggers?

**Answer:** **Back In Stock fires when an unavailable product becomes available (lookback period 1–60 days). Low Inventory fires when stock falls below a threshold (1–1M units).**

**Why:** The two triggers respond to opposite inventory conditions: one to replenishment, the other to depletion. Their parameter ranges differ, which is the tested detail. Price Drop is a third product trigger, firing on a percentage drop (1–100%).

> ⚠️ **Distractor logic:** "They are the same trigger with different thresholds" is the plausible-but-wrong answer — the conditions are opposite.

---

## Q92 — Order Lifecycle API Events

**Question:** A client's external commerce system needs to trigger flows on order events. What mechanism applies?

**Answer:** **Order Lifecycle API automation events — Order Status via API, Order Shipment Status via API, and Order Return via API. The external system POSTs to `/services/data/<api_version>/actions/custom/flow/flowApiName`.**

**Why:** These are API-first events, meaning the external system must actively POST to Salesforce. Each event exposes a rich payload (Sales Order, Individual, Contact Point Email/Phone, Product DMOs) usable in merge fields and decision elements. The requirement for the external system to POST is the practical constraint.

> ⚠️ **Distractor logic:** "Salesforce polls the commerce system" is the plausible-but-wrong answer — the direction is inbound POST.

---

## Q93 — REST API Flow Execution

**Question:** A consultant needs to start a flow from an external system via REST API. Which flow type is required, and which version runs?

**Answer:** **Only autolaunched flows can be started via REST API, and the call runs the active version.**

**Why:** The endpoint is `POST /services/data/v65.0/actions/custom/flow/FLOW_API_NAME`, with an `inputs` array in the body. The response includes `outputValues`, the Flow Interview GUID, and a final status (`Finished`/`Error`). The autolaunched requirement and the active-version behaviour are both tested.

> ⚠️ **Distractor logic:** "Any flow type can be started via REST" is the plausible-but-wrong answer — screen flows cannot.

---

## Q94 — Multiple Flow Instances

**Question:** A consultant needs to run the same flow for 100 records in one REST call. How should they structure the request?

**Answer:** **Include multiple objects in the `inputs` array — each runs as a separate flow execution in a single transaction, with bulkifiable elements running as a bulkified operation.**

**Why:** The single-transaction behaviour is the tested detail. It means the 100 executions share transaction limits, so governor limits apply across all of them. This is efficient but requires awareness of per-transaction limits.

> ⚠️ **Distractor logic:** "Make 100 separate REST calls" is the plausible-but-wrong answer — it works but ignores the bulk capability and multiplies API usage.

---

## Q95 — Invocable.Action vs Flow.Interview

**Question:** A consultant needs to run flows in batches from Apex with bulkification. Which class should they use?

**Answer:** **`Invocable.Action` — it runs flows in batches with bulkification and references flows dynamically (string name, no referential integrity). `Flow.Interview` references flows statically (referential integrity) and cannot run in batches via bulkification.**

**Why:** The trade-off is flexibility versus safety. `Invocable.Action` can run arbitrary flows but offers no compile-time guarantee the flow exists. `Flow.Interview` guarantees the flow exists but cannot be packaged or deployed without it, and cannot bulkify. The scenario's bulkification requirement points to `Invocable.Action`.

> ⚠️ **Distractor logic:** `Flow.Interview` is the plausible-but-wrong answer — it satisfies the "run flows from Apex" requirement but not the bulkification one.

---

## Q96 — Flow Version from Apex

**Question:** A consultant starts a flow from Apex as a flow admin. Which version runs?

**Answer:** **The latest version, regardless of activation status.** (By contrast, REST API runs the **active** version.)

**Why:** The two entry points differ, and this is a subtle but tested distinction. Running as a flow admin bypasses the activation gate, which is useful for testing but risky in production. Note also that SOQL and DML limits apply during flow execution.

> ⚠️ **Distractor logic:** "The active version, same as REST" is the plausible-but-wrong answer — the admin context changes the behaviour.

---

## Q97 — Marketing Sites vs Landing Pages Site

**Question:** A consultant needs to host a code-view landing page. Which site should they use?

**Answer:** **A marketing site — it hosts code-view landing pages and forms. Component/template-based landing pages live on the auto-generated Marketing Landing Pages site.**

**Why:** The two sites host different content types, and this is the defining distinction. Note the management quirk: **All Sites** lists both, but you can only view and manage a marketing site from the **Marketing Sites** tab. Editing settings and publishing requires the **Marketing Cloud Admin** permission set.

> ⚠️ **Distractor logic:** "The Marketing Landing Pages site" is the plausible-but-wrong answer — it hosts component/template pages only.

---

## Q98 — Marketing Site Languages

**Question:** A client wants to publish a landing page in French, but their site's default locale is English. What must the consultant do?

**Answer:** **Add French as a supported language on the Languages tab, then republish the site.**

**Why:** Adding the language alone is insufficient — the site must be republished for the change to take effect. This is a two-step requirement that catches people out. More generally, site setting changes only go live after you save and publish, and you receive an email when the site is live.

> ⚠️ **Distractor logic:** "Add the language and it applies immediately" is the plausible-but-wrong answer — republishing is required.

---

## Q99 — Marketing Site Security Tab

**Question:** What does the Security tab of a marketing site control?

**Answer:** **CSP security level, trusted sites for scripts, clickjack protection, cookie policy, and Lightning Web Security — plus trusted domains for script hosts.**

**Why:** The Security tab is where the CSP setting from Section 4's web tracking configuration (Relaxed CSP) is applied. Recognising that the security controls live here — not on the landing page itself — is the tested skill. The Advanced tab holds site-wide head markup and version history for rollback.

> ⚠️ **Distractor logic:** "Security is configured per landing page" is the plausible-but-wrong answer — it is site-level.

---

## Q100 — Marketing Site Integrations

**Question:** Which integrations can be configured on a marketing site?

**Answer:** **Data 360, Data 360 Web Tracking Consent Banner, Google Analytics 4, and Meta Pixel.**

**Why:** The four integrations cover platform data (Data 360), consent (the banner), and third-party analytics (GA4, Meta Pixel). Recognising that the consent banner is an *integration* rather than a standalone setting explains why it must be added as a tile (Section 2, Q30).

---

## Q101 — MCE Journey Association

**Question:** A consultant wants to connect an MCE journey to a campaign. What are the constraints?

**Answer:** **The journey cannot already be connected to a campaign, can be connected to only one campaign, must be in Draft/Running/Finishing/Paused/Stopped mode, and there is a limit of 20 journeys per campaign.**

**Why:** The constraints are memorised. The "only one campaign" rule mirrors the flow cardinality rule (1 flow = 1 campaign), and the mode list is broader than the "Running only" restriction that applies to Send to Journey (Section 4, Q30).

> ⚠️ **Distractor logic:** "A journey can be connected to multiple campaigns" is the plausible-but-wrong answer — it assumes symmetry with the campaign-to-many-flows rule.

---

## Q102 — Journey Historical Reporting

**Question:** A client connects a running journey to a campaign and sees analytics going back further than the connection date. Why?

**Answer:** **For a running journey, Salesforce attempts to associate historical send and engagement data to the newly-associated campaign — the amount depends on when data was brought into MC Next and Data 360.**

**Why:** The backfill behaviour is the tested detail. For **new** journeys, reporting begins when the journey is connected; for **running** journeys, historical data is backfilled subject to data availability. The example given: connecting an MCE account to Data 360 in Jan 2026 backfills 45–90 days, so a journey connected in Feb 2026 could display analytics from June 2025.

> ⚠️ **Distractor logic:** "Reporting always starts at the connection date" is the plausible-but-wrong answer — it applies to new journeys only.

---

## Q103 — Multi-Org Journey Scenarios

**Question:** A client has multiple Marketing Cloud Engagement orgs. Org A associates a journey with campaign A. Can org B relate the same journey to campaign B?

**Answer:** **No — the journey is not available for org B to relate to campaign B.**

**Why:** Journey associations are org-scoped, so a journey connected in one org cannot be reused in another. This matters for enterprise clients running multi-org architectures, where campaign structure must be planned per org.

---

## Q104 — Marketing Calendar Customisation

**Question:** A consultant wants to change the colour of the segment flows calendar on the Marketing Calendar. Is this possible?

**Answer:** **No — the default calendars (campaigns, campaign segment flows, segment flows) can be hidden but not deleted or customised. You can create a custom object calendar that is editable, deletable, and has personalised colours.**

**Why:** The distinction is between default and custom calendars. Defaults are fixed; custom object calendars offer full control. You can also add events to the calendar and link them to campaigns.

> ⚠️ **Distractor logic:** "Customise the default calendar colours" is the plausible-but-wrong answer — only custom calendars support that.

---

## Related

- [[exam-revision-summary]] — Section 4 summary
- [[section-3-data-identity-segmentation]] — previous guide
- [[section-5-agentforce-ai]] — next guide
- `Exam Section Based Flashcards/section-4-campaign-flow-content` — recall drilling