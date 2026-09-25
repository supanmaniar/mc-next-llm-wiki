# Flashcards — Section 4: Campaign Design, Flow Orchestration & Content (30%)

> **Exam weight: 30% — the highest-value section.** Covers personalization, flow types & triggers, data sources, dynamic content, flow elements, email content, landing pages, forms, and campaign reporting.
> **Related concept pages:** [[personalization-data-sources]] · [[merge-fields-and-expressions]] · [[dynamic-content-variations]] · [[repeaters-and-recommenders]] · [[campaigns-and-flows]] · [[flow-elements-deep-dive]] · [[flow-data-operations]] · [[audience-flows]] · [[activation-triggered-flows]] · [[email-creation-editing]] · [[dynamic-from-reply-addresses]] · [[landing-pages]] · [[forms-data-sources]] · [[external-forms-form-handlers]] · [[campaign-reporting-tools]]

---

## Personalization Methods

## Card: Four Personalization Methods
**Q:** Name the four main personalization methods and when to use each.
**A:** **Merge fields** (single value, simple 1:1) · **Dynamic content / variations** (swap whole components per audience) · **Repeater** (series of items from a data source) · **Saved expressions** (filter+sort to return ONE value).

## Card: Handlebars vs AMPscript
**Q:** What is the difference between Handlebars and AMPscript?
**A:** **Handlebars** is the templating language with scripting + conditional logic (code view, data lookups). **AMPscript** is legacy scripting using the `Lookup()` function for reading marketing objects.

## Card: Personalization Limits
**Q:** What are the key personalization limits?
**A:** **25** personalization points per item · **15** variations per component · linking components shares **one** personalization point · subject line + preheader = **one** component.

## Card: Variations Export Trap
**Q:** ⚠️ Can content with variations be exported/imported?
**A:** No — content with variations **cannot** be exported or imported.

## Card: Identifiers
**Q:** What are the identifiers for marketing object, field, and data graph?
**A:** Marketing object = `__mo` · field = `__c` · data graph = `$dataGraph.Field`.

---

## Flow Types & Triggers

## Card: Five Flow Types
**Q:** Name the five flow types and their triggers.
**A:** **Audience/Segment** (schedule/immediate) · **Automation event-triggered** (customer action) · **Activation-triggered** (Data 360 activation publishes) · **Broadcast** (API/Apex) · **On-demand** (API/Apex, high-priority).

## Card: Audience Flow Sources
**Q:** What are the four audience sources for an audience flow?
**A:** **Segment, List, Record, Campaign**. The segment must be published first; recurring runs up to every hour.

## Card: Event-Triggered Flow
**Q:** What triggers an automation event-triggered flow and how fast does it run?
**A:** A customer action (click, form submit, record update); runs within ~**15 minutes**. ⚠️ The **Create Consent** element is available here only.

## Card: Activation-Triggered Flow
**Q:** What triggers an activation-triggered flow and what is its refresh cadence?
**A:** A Data 360 activation publishing. Refresh: **10 min** (incremental) / **24 hr** (standard). It is the **only Data 360 target type** and uses MuleSoft or HTTP callout.

## Card: Broadcast Flow
**Q:** What is unique about a broadcast flow?
**A:** It uses **dynamic segments** (membership determined after start) and can run asynchronously.

## Card: On-Demand Flow
**Q:** What is an on-demand flow used for?
**A:** High-priority API/Apex-triggered sends (e.g., order confirmations); it can include event info like order ID and amount.

## Card: Campaign Flow Cardinality
**Q:** What is the campaign ↔ flow cardinality?
**A:** **1 campaign = many flows**; **1 flow = 1 campaign**.

## Card: Flow Sharing
**Q:** How does flow sharing work for campaign-related vs standalone flows?
**A:** Flows related to a campaign **inherit its sharing**; standalone flows are **private by default** (share via categories + sharing rules, or manually).

## Card: MCE Journeys
**Q:** What are the limits for connecting MCE journeys to a campaign?
**A:** Max **20** journeys per campaign; one campaign per journey. Journey modes: Draft / Running / Finishing / Paused / Stopped.

## Card: Flow Statuses
**Q:** Name the flow statuses.
**A:** Preparing · Activated · Finishing · Completed · Scheduled · Canceled · Draft · Error. Only **one version active**; ⚠️ a **paused flow counts as active**.

## Card: Flow Reports Availability
**Q:** Which tiers get On-Canvas Insights vs Flow Reports?
**A:** On-Canvas Insights = **Advanced only**; Flow Reports = **Growth + Advanced**.

---

## Data Sources for Messaging Content

## Card: Data Source by Component
**Q:** What data source feeds each of these: segment entry, email merge fields, decision splits, Get Records?
**A:** Segment entry = **DMO layer (Data 360)** · email merge fields & decision splits = **data graph** · Get Records = **Salesforce Core** (bypasses Data 360).

## Card: Full Data Source List
**Q:** Name the data sources available for messaging content.
**A:** Data Graph (default) · Unified Individual DMO (fallback) · Event (1 per item) · Offer (max 5) · Personalization Recommender · Content Variable · Salesforce Record · Lookup Data Graph (max 5) · Apex Class (1 per message) · Activation (1 per message) · Marketing Object & Prospect (landing pages/forms only).

## Card: Data Graph Definition
**Q:** What is a data graph and what does the Default badge mean?
**A:** A Data 360 object from a primary DMO (usually Unified Individual) plus related objects. The **Default badge** marks the default graph. Standard vs. real-time (real-time = faster, costs more).

## Card: Locked Data Graph
**Q:** ⚠️ When is a data graph locked (cannot be removed/replaced)?
**A:** If an email has dynamic content variations or a recommender; or once a landing page content block is **published**. Landing pages should use a **real-time** graph.

## Card: SMS/WhatsApp Data Graph
**Q:** Which data graph do SMS and WhatsApp use?
**A:** Only the **default** data graph (not shown in the panel, but works in merge fields).

## Card: Unified Individual Fallback
**Q:** When is the Unified Individual DMO used as a data source?
**A:** As a **fallback** when no data graph exists; it is the only option in Starter/Pro Suite emails.

## Card: Event Data Source
**Q:** What are the rules for the Event data source?
**A:** **1 per item**; repeaters do not support custom event data; cannot be removed/replaced after publish.

## Card: Recommender Data Source
**Q:** What are the rules for the Personalization Recommender data source?
**A:** Only trained recommenders on the same data graph; needs **≥1 successful refresh**; can be **replaced but not removed**; data works only in a repeater.

## Card: Lookup Data Graph
**Q:** What are the rules for a lookup data graph?
**A:** For non-profile data (catalog); needs a primary key; **cannot nest**; max **5**.

## Card: Content Variable
**Q:** What data types does a Content Variable support?
**A:** Boolean, string, date, date time, number, recordId — mapped to Flow data (MuleSoft/HTTP).

## Card: Changing Data Source
**Q:** ⚠️ What must you do if you change a data source after attributes are used in merge fields?
**A:** Delete the merge fields, add the new source, and recreate them.

## Card: Combining Content Types
**Q:** What is required when combining content types (form + landing page)?
**A:** The **data graphs must match**.

---

## Dynamic Content & Linking

## Card: Personalization Point
**Q:** What is a personalization point?
**A:** A content element eligible for a decision (subject line, preheader, image). The **first variation auto-creates** the point.

## Card: Decision vs Targeting Rule
**Q:** What is the difference between a decision and a targeting rule?
**A:** A **decision** is who is eligible (each variation ↔ a decision with the **same name**). A **targeting rule** is the conditions for showing a variation (attributes, related attributes, calculated insights, segment memberships).

## Card: All vs Any Conditions
**Q:** What is the difference between "All Conditions Are Met" and "Any Conditions Are Met"?
**A:** All = every condition must be true; Any = at least one condition must be true.

## Card: Default Variation
**Q:** What is the default variation and can its priority change?
**A:** It shows when no rule matches; its priority **cannot be changed**.

## Card: Clone vs Link
**Q:** What is the difference between cloning and linking a personalization point?
**A:** **Clone** = separate copy (component must have no variations; only points on the same data graph are shown). **Link** = share one point (point must already exist in the content item; component must have no variations).

## Card: Linked Component Behaviour
**Q:** What changes propagate across linked components, and what stays independent?
**A:** Adding/deleting a variation or editing rules/priorities applies to **all** linked components; content/style edits stay **independent**.

## Card: Unlink
**Q:** What does unlinking a personalization point do?
**A:** It **clones** the point ("Copy of …") so the component keeps its settings but becomes independent.

## Card: Repeater Behaviour
**Q:** What happens to a repeater when there is no data, and when the layout changes?
**A:** It is **empty** if there is no data for the recipient; changing the layout **removes content/data/style**.

## Card: Objective-Based Recommender
**Q:** How does an objective-based recommender work?
**A:** It picks the best image per contact at send time (no rules); the canvas shows a **placeholder** — use Preview with a segment to see real output.

---

## Flow Elements & Logic

## Card: Four Core Elements
**Q:** What do the Entry, Decision, Action, and Wait elements do?
**A:** **Entry** = who enters and when · **Decision** = branching (first match wins) · **Action** = send email/SMS, create/update records, create consent, add/remove actionable list · **Wait** = fixed duration or wait-until-event.

## Card: Decision Logic Methods
**Q:** What are the two Decision logic methods?
**A:** **Define Manually** (outcomes evaluated in order) vs. **Define with AI** (Advanced; simultaneous — order has no impact). ⚠️ Define with AI is **not supported for Marketing Cloud flows**.

## Card: Decision Condition Parts
**Q:** What are the three parts of a decision condition?
**A:** **Resource** (data-graph attribute) + **Operator** (Equals/Greater Than…) + **Value**.

## Card: Wait Element Restriction
**Q:** ⚠️ What flow type do Wait elements require?
**A:** **Autolaunched flows** — they cannot be mixed with screens or choice.

## Card: Wait Until Date
**Q:** What time is used for Wait Until Date with no time specified?
**A:** **12 AM org time zone**.

## Card: Wait Until Event Placement
**Q:** ⚠️ Where must a Wait Until Event element sit, and what links are unsupported?
**A:** It must be **immediately after** the monitored element; dynamic/merge-field links are unsupported (use **Any Link**).

## Card: Path Experiment
**Q:** What is a Path Experiment and when does it declare a winner?
**A:** A random split + optimizer (Advanced + Personalization); auto-declares a winner at **95% confidence** (Bayesian). Max **10** variations; percentages are **targets, not exact counts**.

## Card: Path Experiment Manual Winner
**Q:** Does manually selecting a Path Experiment winner require a new version?
**A:** No.

## Card: Marketing Completion Actions
**Q:** What are marketing completion actions and which flow type are they for?
**A:** Assign to Queue/User and Notify User — **Audience flows only**.

## Card: Einstein Decision
**Q:** What does the Einstein Decision element do?
**A:** Routes by engagement level (Engagement Frequency / Scoring).

## Card: Determine CRM Record
**Q:** What does the Determine CRM Record for Individual element do?
**A:** Branches on contact / lead / prospect.

## Card: Send to Journey
**Q:** What are the restrictions for Send to Journey?
**A:** Supports only **Running** journeys with an **API event entry source**; Individual ID maps to SubscriberKey.

## Card: Subflow
**Q:** What are the rules for a Subflow element?
**A:** Launches another active flow; ⚠️ **cannot call flows with wait elements**; variable API names ≤ **40 chars**; calls the **active version** (API 61.0+).

## Card: Get Records
**Q:** What are the rules for the Get Records element?
**A:** Pulls data in; limit **2–20,000**; needs DLO→DMO mapping for Data Cloud objects.

## Card: Update Records Trap
**Q:** ⚠️ What happens with an Update Records element that has no filter?
**A:** It updates **ALL** records.

## Card: Delete Records
**Q:** Where do deleted records go and how long are they retained?
**A:** To the **Recycle Bin** for **15 days**.

## Card: Transaction Completion
**Q:** When do record changes actually take effect in a flow?
**A:** Only when the **transaction completes**.

## Card: Collection Elements
**Q:** What do the Assignment, Loop, Collection Filter, Collection Sort, and Transform elements do?
**A:** **Assignment** (consecutive in order) · **Loop** (Current Item from Loop) · **Collection Filter** (output null until run; source unchanged) · **Collection Sort** (up to **3 fields**; modifies directly) · **Transform** (≤**1 nested collection**; formula ≤**255 chars**; no data graphs for joins).

## Card: Operators Restriction
**Q:** ⚠️ Where are In/Not In operators available, and which conditions are NOT filter conditions?
**A:** In/Not In only in Create/Get/Update Records; **Contains/Is Changed** are not filter conditions. Multi-select picklist matching is fragile → use **INCLUDES**.

## Card: Exit Rules
**Q:** What are the rules for flow exit rules?
**A:** Up to **10**; evaluated on start/resume; numeric attributes support aggregation (Average/Sum/Max/Min).

## Card: Engagement Signals
**Q:** What are the rules for engagement signals?
**A:** Only **Engagement-category DMOs**; one related DMO (1:1 or many-to-one); **item identifier required** for recommenders; identifiers = User/Timestamp/Item/Event; count-based metric by default; custom events from signals = **Advanced only**.

## Card: Flow vs Org Data Graph
**Q:** What is the difference between the flow data graph and the org default data graph?
**A:** Org default → message personalization; flow graph → decisioning.

---

## Activation Templates & Contact Points

## Card: Contact Point Selection
**Q:** What is contact point selection?
**A:** Choosing which fields (email, phone, MAID, etc.) go to the activation target.

## Card: Source Priority Order
**Q:** What is source priority order and its values?
**A:** Which value wins when a contact has multiple sources. Values: **Primary** (Primary Flag mapped) · **Personal** (For Personal Use = 1) · **Business** (For Business Use = 1) · **Any** (no flag).

## Card: Contact Point Governance
**Q:** ⚠️ What governs contact points — reconciliation rules or source priority?
**A:** **Source priority** — reconciliation rules do **not** govern contact points.

## Card: Removing Any Source
**Q:** What happens when you remove "Any Source/Any Type"?
**A:** A **smaller population** is targeted.

---

## Email Content & Sending

## Card: Email Creation Paths
**Q:** What are the three ways to create/edit an email?
**A:** Content tab (Add → Content → Email), the campaign record, or a flow's Send Email Message element.

## Card: Email Permissions
**Q:** What permissions are needed to create/edit vs publish an email?
**A:** Create/edit = Marketing Cloud Manager + any CMS contributor role; publish/unpublish = plus content admin/manager.

## Card: Copying an Email
**Q:** ⚠️ What personalization is lost when copying an email?
**A:** Only **default variations** are copied — other variations, rules, and recommenders are not (merge fields and repeaters are).

## Card: Convert to Code
**Q:** What does Convert to Code do and is it reversible?
**A:** It is **one-way** and removes dynamic content (repeaters, conditional logic, content variants); you lose drag-and-drop and the Style tab.

## Card: View as Web Page
**Q:** How long does the View as Web Page link work and what does it reflect?
**A:** Works **90 days** after send; reflects the published version; personalized values **re-render against the recipient's current profile** on each open.

## Card: Plain Text Version
**Q:** ⚠️ What happens if you manually edit the plain text version?
**A:** It **desyncs** from the HTML version — future changes are not included.

## Card: Test Sends
**Q:** What are the rules for test sends?
**A:** Up to **5** recipients; they count toward **message credits**; the From name must be from an **authenticated domain**.

## Card: File Attachment
**Q:** What are the file attachment limits?
**A:** A PDF from CMS, up to **5 MB**.

## Card: CAN-SPAM Requirements
**Q:** What does CAN-SPAM require in an email?
**A:** A Physical Address merge field + an opt-out link (Unsubscribe / Preference Manager / custom preference page). ⚠️ Preference Manager and Unsubscribe links do not work in preview.

## Card: Email Templates Locking
**Q:** How does template locking work?
**A:** Templates are locked by default; nested components mirror the parent (locking cascades). Unlock template-wide (Settings), subject/preheader (lock icons), data sources, or per-component.

## Card: Dynamic From/Reply
**Q:** What are the rules for dynamic From and Reply addresses?
**A:** **Static From + dynamic display name** = subdomain senders (avoids DMARC alignment failures). **Dynamic From** = root-domain authenticators. Dynamic reply requires an **authorized email domain** (unauthorized → fallback). Direct reply **bypasses RMM**. Always configure an **authenticated fallback**.

## Card: Distributed Marketing Limits
**Q:** What are the Distributed Marketing template limits?
**A:** **30 approved images + 30 approved phrases**; only **one default image**; only **phrases** can be required (locked) — images cannot.

## Card: Distributed Marketing Sender Permissions
**Q:** What permissions do non-marketer senders need?
**A:** **Send Distributed Marketing Messages** + **Marketing Cloud Manager**.

## Card: Distributed Marketing Availability
**Q:** How is Distributed Marketing availability configured?
**A:** An **event-triggered flow** with the **Distributed Marketing and Alerts Message** event; Get Records (List Email) + Decision (Status = Scheduled) prevent canceled sends.

## Card: Unschedule Behaviour
**Q:** What does unscheduling do?
**A:** It **cancels** the email (and any others scheduled with it in the campaign).

## Card: Distributed Marketing Dashboards
**Q:** What are the two Distributed Marketing dashboards?
**A:** **Distributed Sends** (Individual Email / Bulk Email / Bulk Email Recipient Activity; your own sends only) + **Unified Engagement History** (record pages).

## Card: Conversational Email
**Q:** What is conversational email and what does it integrate with?
**A:** Two-way email integrating with **Agentforce, Digital Engagement, Data 360**; replies are analysed for intent → trigger flows, route to agents/human reps, update data in real time.

---

## Landing Pages

## Card: Landing Page Hosting
**Q:** Where are landing pages hosted?
**A:** On the **Marketing Landing Pages site** (component/template pages) or a **marketing site** (code-view pages).

## Card: URL Alias
**Q:** What is a URL alias and when can it be edited?
**A:** A vanity URL, editable in **Draft** only; publishing activates aliases. Statuses: Draft / Active / Inactive (reactivatable).

## Card: Redirect URL
**Q:** What are the redirect URL rules?
**A:** Must start with `https://` and be **< 2,000 characters**; set it up before unpublishing to avoid the "URL no longer exists" page.

## Card: Form Visibility
**Q:** When is a form visible?
**A:** Only once added to a landing page that is **published with an active URL alias**.

## Card: Publishing a Landing Page
**Q:** What happens when you publish a landing page with a form?
**A:** It publishes the form and **activates the related flow**.

## Card: Landing Page SEO
**Q:** What are the SEO rules for landing pages?
**A:** Public page title, description, head tags; **only JSON-LD** structured data allowed (no JavaScript); allowed tags = `<link>`, `<meta>`, `<script>`.

## Card: Landing Page Preview
**Q:** What are the preview requirements and limitations?
**A:** Requires site contributor access; **merge fields are unresolved**; external images need a Trusted URL list entry.

## Card: Template Locking Scope
**Q:** ⚠️ What does template locking protect, and what can authors still edit?
**A:** It protects content/settings only — authors can still edit **targeting rules/variations**; clone the personalization point for logic control.

## Card: Landing Page Tracking
**Q:** What are the two tracking options for landing pages?
**A:** A **consent banner** (Marketing Cloud Admin config; Manager + content role to publish) or **Relaxed CSP + Head Markup `set-consent` event** (no banner). Custom domain → path `/lp`. Re-publish the site after banner changes.

---

## Forms

## Card: Form Cardinality
**Q:** What is the form cardinality rule?
**A:** **One form per landing page; one flow per form**; view modes must match (block ↔ block, code ↔ code).

## Card: Form Minimum
**Q:** What is the minimum for a form and what are the unique field names?
**A:** ≥1 input + 1 button. Unique names: `Email`, `FirstName`, `LastName` (case-insensitive, no extra chars).

## Card: Write Data Provider
**Q:** What are the rules for the write data provider?
**A:** Account/Contact/Lead/Prospect or a marketing object (default if available, else **Lead**); one object at a time; respects **FLS**.

## Card: Read Data Providers
**Q:** What are the read data providers and their limit?
**A:** Data graph, marketing object, Prospect — for pre-fill + progressive profiling; up to **2 lookup providers** (max 1 marketing object + 1 recipient data graph).

## Card: Supported Field Types
**Q:** What field types are supported on forms, and which are not?
**A:** Supported: Checkbox, Date, Date/Time, Time, Email, Phone, Number, Picklist, Text, Text Area, Text Area (Long), URL. ⚠️ **Number of Employees** and **multi-picklist** are unsupported; no duplicate fields; changing a field's API name breaks future saves.

## Card: Hidden Fields
**Q:** What are the rules for hidden fields and defaults?
**A:** Checkbox/Dropdown/Number/Plain Text/Text Area; hidden required fields need a **fallback value**; URL parameters (UTM) are supported.

## Card: reCAPTCHA
**Q:** What are the reCAPTCHA v2 rules?
**A:** Marketing landing pages with forms only; applies to every form once enabled; **one per external page**; changing My Domain breaks it.

## Card: Progressive Profiling
**Q:** What are the progressive profiling rules?
**A:** Needs a read data provider; no rules on hidden fields/related objects; changing the read source removes rule connections. ⚠️ Avoid pre-filling PII.

## Card: Unpublishing a Form
**Q:** What happens when you unpublish a form?
**A:** It deactivates its flow; Submit stops working; save the flow as a new version to edit/republish.

---

## External Forms & Form Handlers

## Card: Embedding Code
**Q:** What makes up the external form embedding code?
**A:** **2 `<script>` tags + 1 `<fragment>` element**; generated from the published version (republish to refresh).

## Card: External Form Security
**Q:** What security setup is required for external forms?
**A:** CORS Allowed Origin List + clickjack protection (Trusted Domains for Inline Framing, or allow any page) + Trusted Sites for Scripts → **publish the Experience Cloud site** (else frame-ancestors 'self' CSP error).

## Card: Form Handler
**Q:** What is a form handler?
**A:** A way to capture existing external form submissions into Salesforce (also creates a Data 360 data source).

## Card: Form Handler Field Names
**Q:** ⚠️ What is the critical rule for external form field names?
**A:** External field names must **exactly match** the HTML `name` attributes. Date = `YYYY-MM-DD`; Time = `hh:mm:ss`; DateTime = ISO 8601; selected checkbox = `true`.

## Card: Honeypot
**Q:** What is a honeypot field?
**A:** A spam field that blocks submissions when it has a value; use a generic label, not `honeypot`.

## Card: Map Fields Timing
**Q:** ⚠️ When must you map all fields in a form handler?
**A:** **Before creating the flow** — edits afterwards do not reflect automatically.

## Card: Client vs Server Side
**Q:** What is the difference between client-side and server-side form handlers?
**A:** **Client-side (JS snippet):** supports web tracking + identity resolution. **Server-side (direct POST URL):** no tracking/identity resolution; works with strict CSP/third-party builders. Both need a **CORS Allowlist** entry.

## Card: LinkedIn Posts
**Q:** Where are LinkedIn posts managed?
**A:** Via the **Social Posts** related list on the campaigns object; connect a LinkedIn account; Publish Now or Schedule.

---

## Campaign Monitoring & Reporting

## Card: Campaign Stage
**Q:** What is the Campaign Stage field and what is the trap?
**A:** Derived from all flows: In Planning / In Progress / Completed / Error / Canceled / Paused. ⚠️ One Error flow makes the **whole campaign** Error.

## Card: Marketing Calendar
**Q:** What does the Marketing Calendar show and what is the trap?
**A:** Campaigns + Campaign Segment Flows + Segment Flows (default); access = Marketing Cloud Admin/Manager or Access Marketing Calendar permission; drag campaigns (not segment flows). ⚠️ Event/form-triggered flows do not appear.

## Card: NotSentReason
**Q:** What does the NotSentReason field map to, and what are common values?
**A:** Maps to **Engagement Action Reason** on the **Email Engagement DMO**. Common: no consent, no opt-in, unauthorized From, hard bounce, TTL exceeded.

## Card: On-Canvas Analytics
**Q:** What does on-canvas element analytics show and what are the caveats?
**A:** Run/success/error counts, avg duration, messaging metrics (Sends, Delivery Rate, Opt-Out Rate, Reads, Failed Deliveries, Response Rate, CTR); needs **Tableau Next Included App Business User**. ⚠️ Open Details consumes **Data Cloud credits**; not available for runs before **Winter '25**.

## Card: AI Campaigns
**Q:** What do AI campaigns do?
**A:** Draft with Agentforce → brief + campaign preview (name, flow, multichannel content); conversational campaigns add a **"Forward to Agent"** step; agent actions are **powered by Salesforce Flow**; Generate Campaign Insights analyses the **first flow**.

---

## Related

- [[exam-revision-summary]] — Section 4 summary
- [[section-3-data-identity-segmentation]] — previous deck
- [[section-5-agentforce-ai]] — next deck
- `flashcards/campaigns-flows-deep-dive` · `flashcards/personalization-data-sources-deep-dive` · `flashcards/web-content-forms-deep-dive` — topic-based deep dives