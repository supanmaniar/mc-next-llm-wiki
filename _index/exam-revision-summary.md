# Exam Revision Summary — Salesforce Certified Marketing Cloud Next Consultant

> **Organized by exam weight (highest → lowest).** Each section lists the core concepts, the key facts to memorize, and common pitfalls. Use the [[wiki links]] to drill into any topic.
>
> **Exam facts:** 60 questions + up to 5 unscored | 105 minutes | 72% pass | Summer '26 release | No prerequisite | No reference materials allowed.

---

## Section 4 — Campaign Design, Flow Orchestration & Content (30%)

> **The highest-value section.** Master flow types, personalization methods, data sources, and landing pages.

### Personalization Methods

| Method | What it does | When to use |
|--------|-------------|-------------|
| **Merge fields** | Insert a single customer value (name, city) | Simple 1:1 personalization |
| **Dynamic content / variations** | Swap whole components per audience via targeting rules | Structure changes by segment |
| **Repeater** | Show a series of items (products, events) from a data source | Catalogs, product lists |
| **Content variations** | Multiple versions of a component (up to 15/component) | A/B-ish per-audience |
| **Handlebars** | Templating language with scripting + conditional logic | Code view; data lookups |
| **AMPscript** | Legacy scripting; `Lookup()` function | Reading marketing objects |
| **Saved expressions** | Filter+sort to return ONE value (e.g., most recent purchase) | Reusable across channels |

**Marketer vs. developer:** merge fields, repeaters, and dynamic content = **marketer configuration**; Handlebars and AMPscript = **developer flexibility**. ⚠️ **Not every MCE AMPscript function is supported in MC Next.**

**MCE vs. MC Next:** MCE personalization relies primarily on **data extensions** (sendable or non-sendable); MC Next offers **data providers, content variables, and marketing objects**. Exam scope = **email** personalization only.

**Key limits:** 25 personalization points per item · 15 variations per component · linking components shares one personalization point · subject line + preheader = **one** component · content with variations **can't be exported/imported**.

**Deep dives:** [[personalization-data-sources]] · [[merge-fields-and-expressions]] · [[dynamic-content-variations]] · [[repeaters-and-recommenders]].

**Identifiers (memorize):** marketing object = `__mo` · field = `__c` · data graph = `$dataGraph.Field`. AMPscript uses `Lookup()`, Handlebars uses `queryFirst type="MO"`.

### The Eight Data Providers
1. **Data graph** — pre-assembled view from a primary DMO (Individual/Unified Individual) + related objects, prepared as a **single read-only record** (no joins at render time).
2. **Event** — data from an event-triggered flow; schema matches the triggering engagement DMO. ⚠️ **Direct attributes only, no related collections.**
3. **Activation** — direct + related attributes configured in the activation; supports Individual or Unified Individual segments.
4. **Salesforce record** — current CRM object data (cases, leads).
5. **Apex class** — custom schema for personalization; designed for on-demand/broadcast flows.
6. **Personalization recommender** — recommendations from Salesforce Personalization; displayed via a repeater.
7. **Lookup graph** — non-profile data; uses a value from the primary data graph as a key into a second, smaller graph.
8. **Offer** — Salesforce Loyalty Management promotions; merge fields + dynamic content by loyalty tier.

⚠️ **A message can't use both an activation and an event data provider** — the flow orchestration patterns conflict.

**Content variables:** custom placeholders defined in the email, populated at runtime from **Salesforce Flow** (any flow data source incl. MuleSoft/HTTP). Types: boolean, text, date, dateTime, number, **recordId**. The **content defines the placeholders; the flow supplies the values**.

**Marketing objects:** marketer-managed tables (MCE data-extension equivalent) for catalogs, reference tables, rewards balances, promo codes; queried at runtime with Handlebars/AMPscript; text/number/decimal fields; full refresh replaces records.

### Flow Types & Triggers

> **Flow is the single orchestration engine for outbound messaging in MC Next** (unlike MCE's many send contexts). Marketing flows are **high-scale flows** that run **off-core** on a separate engine — governor limits and transaction-scaling concerns don't apply the same way. Deep dive → [[marketing-flow-types]].

| Flow type | Trigger | Notes |
|-----------|---------|-------|
| **Audience flow** (segment/list/CRM record/campaign member) | Schedule (or immediate); segment must be published first | **Summer '26** — unifies 4 audience sources: **Segment, List, Record, Campaign**; recurring up to every hour; can republish segment before run; **re-entry conditions** mirror Journey Builder's 3 entry modes |
| **Automation event-triggered flow** | Customer action (click, form submit, record update) | Runs within ~15 min; Create Consent element available here only; sources = standard engagement events, **engagement signals**, **CRM record-triggered events** (Spring '26) |
| **Activation-triggered flow** | A Data 360 activation publishes | **Winter '26**; **only Data 360 target type**; refresh 10 min (incremental) / 24 hr (standard); MuleSoft or HTTP callout; **activation can be the personalization source** |
| **Broadcast flow** | API/Apex call | Targets **all members of a dynamic segment** (fan-out); membership evaluated at execution time; sync or async |
| **On-demand flow** | API/Apex call (high-priority, order confirmations) | Targets an **individual**; personalization via **Apex-defined schema** in the payload (no Data Cloud ingestion); ~**1–3 s** latency |
| **Data Cloud-triggered flow** | A DMO/CIO record created or updated | ⚠️ **Not technically a marketing flow**; used for **consent automation** (Create Consent) |

⚠️ **Record-triggered flows and Data Cloud-triggered flows cannot send emails** from Marketing Cloud Next.

**Campaign ↔ Flow cardinality:** 1 campaign = many flows; 1 flow = 1 campaign.

**Flow sharing:** flows related to a campaign **inherit its sharing**; standalone flows are **private by default** (share via categories + sharing rules, or manually).

**MCE journeys:** connect MCE journeys to a campaign (max **20**/campaign; journey modes Draft/Running/Finishing/Paused/Stopped; one campaign per journey).

### Data Sources for Messaging Content

| Component | Data source |
|-----------|-------------|
| Segment (audience entry) | DMO layer (Data 360) |
| Email merge fields / dynamic content | **Data graph** |
| Decision splits | **Data graph** |
| Get Records element | Salesforce Core (bypasses Data 360) |

**Full data source list:** Data Graph (default) · Unified Individual DMO (fallback) · Event (1 per item) · Offer (max 5) · Personalization Recommender (Advanced + Decision credits) · Content Variable · Salesforce Record · Lookup Data Graph (max 5) · Apex Class (1 per message) · Activation (1 per message) · Marketing Object & Prospect (landing pages/forms only).

**Data source rules (memorize):**
- **Data graph** = Data 360 object from a primary DMO (usually Unified Individual) + related objects. Standard vs. real-time (real-time = faster, costs more). Default graph shows a **Default badge**.
- **Locked data graph:** can't remove/replace if an email has dynamic content variations or a recommender; can't remove/replace a landing page content block once **published**. Landing pages → use a **real-time** graph.
- **SMS/WhatsApp:** only the default data graph (not shown in panel, but works in merge fields).
- **Unified Individual DMO** = fallback when no data graph; only option in Starter/Pro Suite emails.
- **Event:** 1 per item; repeaters don't support custom event data; can't remove/replace after publish.
- **Recommender:** only trained recommenders on the same data graph; needs ≥1 successful refresh; **replace but not remove**; data works only in a repeater.
- **Lookup data graph:** non-profile data (catalog); needs a primary key; can't nest; max 5.
- **Content Variable:** boolean/string/date/date time/number/recordId; mapped to Flow data (MuleSoft/HTTP).
- **Changing a data source** after attributes are used in merge fields → delete merge fields, add new source, recreate.
- **Combining content types** (form + landing page) → data graphs must match.

**Key rule:** a field must be explicitly added to the data graph to be usable. Data in Data 360 ≠ available everywhere.

### Dynamic Content & Linking (Personalization Points)

- **Personalization point** = a content element eligible for a decision (subject line, preheader, image). First variation **auto-creates** the point.
- **Decision** = who's eligible (each variation ↔ a decision with the **same name**).
- **Targeting rule** = conditions for showing a variation (attributes, related attributes, calculated insights, segment memberships).
- **All Conditions Are Met** vs. **Any Conditions Are Met** — every condition vs. at least one.
- **Default variation** shows when no rule matches; its priority **can't be changed**.
- **Clone** = separate copy (component must have no variations; only points on the same data graph are shown). **Link** = share one point (point must already exist in the content item; component must have no variations).
- **Linked components:** add/delete variation or edit rules/priorities → applies to **all** linked components; content/style edits stay independent.
- **Unlink** = clones the point ("Copy of …") so the component keeps its settings but is independent.
- **Repeaters:** series of items from a data source; empty if no data for recipient; changing layout **removes content/data/style**; recommender data works **only inside a repeater**.
- **Objective-based recommender:** picks the best image per contact at send time (no rules); canvas shows a **placeholder** — use Preview with a segment to see real output.

### Flow Elements & Logic

- **Entry** — who enters, when.
- **Decision** — branching; **first match wins**; unmatched → default (catch-all). **Two logic methods:** Define Manually (outcomes evaluated in order) vs. Define with AI (Advanced; simultaneous — order has no impact; ⚠️ not supported for Marketing Cloud flows). → [[flow-elements-deep-dive]]
- **Action** — send email/SMS, create/update records, create consent, add/remove actionable list.
- **Wait** — fixed duration OR wait-until-event (click, open). ⚠️ **Wait elements require autolaunched flows**; can't mix with screens/choice. Wait Until Date with no time → **12 AM org time zone**. Wait Until Event must be **immediately after** the monitored element; dynamic/merge-field links unsupported (use **Any Link**).
- **Path Experiment** (Advanced + Personalization) — random split + optimizer; auto-declares winner at **95% confidence** (Bayesian); max 10 variations; percentages are **targets, not exact counts**; manual winner selection doesn't need a new version.
- **Marketing completion actions** — Assign to Queue/User, Notify User (Audience flows only).
- **Einstein Decision** — routes by engagement level (Engagement Frequency/Scoring).
- **Determine CRM Record for Individual** — branch on contact/lead/prospect.
- **Send to Journey / Send to a Flow** — hand off to MCE journey or on-demand flow. Send to Journey supports only **Running** journeys with an **API event entry source**; Individual ID → SubscriberKey.
- **Subflow** — launches another active flow; ⚠️ **can't call flows with wait elements**; variable API names ≤ **40 chars**; calls the **active version** (API 61.0+).
- **Data elements:** Get Records (pull in; limit **2–20,000**; needs DLO→DMO mapping for Data Cloud objects) · Create/Update/Delete Records (push back; ⚠️ Update with no filter updates **ALL** records; Delete → Recycle Bin **15 days**; records change only when the **transaction completes**). → [[flow-data-operations]]
- **Collections:** Assignment (consecutive in order) · Loop (Current Item from Loop) · Collection Filter (output null until run; source unchanged) · Collection Sort (up to **3 fields**; modifies directly) · Transform (≤**1 nested collection**; formula ≤**255 chars**; no data graphs for joins).
- **Operators:** **In/Not In** only in Create/Get/Update Records; **Contains/Is Changed** aren't filter conditions; multi-select picklist matching is fragile → use **INCLUDES**.
- **Exit rules:** up to **10**; evaluated on start/resume; numeric attributes support aggregation (Average/Sum/Max/Min).
- **Engagement signals:** only **Engagement-category DMOs**; one related DMO (1:1 or many-to-one); **item identifier required** for recommenders; identifiers = User/Timestamp/Item/Event; count-based metric by default; custom events from signals = **Advanced only**.

**Decision condition = 3 parts:** Resource (data-graph attribute) + Operator (Equals/Greater Than…) + Value.

**Flow data graph ≠ org default data graph.** Org default → message personalization; flow graph → decisioning.

**Flow statuses:** Preparing · Activated · Finishing · Completed · Scheduled · Canceled · Draft · Error. Only **one version active**; a **paused flow counts as active**.

**On-Canvas Insights** = Advanced only. **Flow Reports** = Growth + Advanced.

### Activation Templates & Contact Points

- **Contact point selection** = which fields (email, phone, MAID, etc.) go to the activation target.
- **Source priority order** = which value wins when a contact has multiple sources.
- **Priority values:** Primary (Primary Flag mapped) · Personal (For Personal Use = 1) · Business (For Business Use = 1) · Any (no flag).
- ⚠️ **Reconciliation rules don't govern contact points** — only source priority does.
- Removing "Any Source/Any Type" → smaller population.

### Contact Point Resolution at Send Time
In Data 360 an individual can have **multiple email addresses** (unlike MCE's single address). ⚠️ **Reconciliation rules don't resolve contact points** — all contact points are retained in the unified profile. **Different addresses → separate messages; duplicate addresses → one send.**

**Four ways contact point selection is determined:**
1. **Data graph** selected in the flow's automation properties (must have the required structure/field set).
2. **On-demand flow API payload** — but a configured data graph **takes precedence**.
3. **Activation source priority order** (activation-triggered flows).
4. **Activation template** (audience flows using a segment).

**Activation template:** define source priority order + filter rules; select it in the send message element. ⚠️ **Required when the segment-on object is NOT Unified Individual.** For phone, select the field from the **Contact Point Phone DMO**. → [[contact-point-resolution]]

### Email Content & Sending

- **Create/edit:** Content tab (Add → Content → Email), campaign record, or flow's Send Email Message element. Permissions: Marketing Cloud Manager + any CMS contributor role (create/edit); + content admin/manager (publish/unpublish).
- **Copying an email drops personalization:** only default variations are copied — other variations, rules, and recommenders aren't (merge fields/repeaters are). → [[email-creation-editing]]
- **Convert to Code is one-way** and removes dynamic content (repeaters, conditional logic, content variants); you lose drag-and-drop + Style tab.
- **View as Web Page link** (`{$link.ViewAsWebPageUrl}`): works **90 days** after send; reflects the published version; personalized values **re-render against the recipient's current profile** on each open.
- **Plain text version:** manually editing it desyncs it from the HTML version (future changes not included).
- **Test sends:** up to **5** recipients; count toward **message credits**; From name must be from an **authenticated domain**.
- **File attachment:** PDF from CMS, up to **5 MB**.
- **CAN-SPAM consent details:** Physical Address merge field + opt-out link (Unsubscribe / Preference Manager / custom preference page). ⚠️ Preference Manager & Unsubscribe links don't work in preview.
- **Email templates:** locked by default; nested components mirror the parent (locking cascades); unlock template-wide (Settings), subject/preheader (lock icons), data sources, or per-component.
- **Dynamic From/Reply:** → [[dynamic-from-reply-addresses]]
  - **Static From + dynamic display name** = subdomain senders (avoids **DMARC alignment failures**).
  - **Dynamic From** = root-domain authenticators (personal addresses align with sending domain).
  - **Dynamic reply requires an authorized email domain**; unauthorized → fallback address.
  - **Direct reply bypasses RMM** (no auto-reply/out-of-office/unsubscribe processing); RMM routing for centralized handling.
  - **Always configure an authenticated fallback** — used when a dynamic value is missing.
- **Distributed Marketing & Alerts:** → [[distributed-marketing]]
  - **30 approved images + 30 approved phrases**; only **one default image**; only **phrases** can be required (locked); images can't be required.
  - Non-marketer senders need **Send Distributed Marketing Messages** + **Marketing Cloud Manager**.
  - Availability = **event-triggered flow** with the **Distributed Marketing and Alerts Message** event; Get Records (List Email) + Decision (Status = Scheduled) prevent canceled sends.
  - **Unschedule cancels** the email (and any scheduled with it in the campaign).
  - Dashboards: **Distributed Sends** (Individual Email / Bulk Email / Bulk Email Recipient Activity; your own sends only) + **Unified Engagement History** (record pages).
- **Conversational Email:** two-way email; integrates with **Agentforce, Digital Engagement, Data 360**; replies analyzed for intent → trigger flows, route to agents/human reps, update data in real time. → [[conversational-marketing]]

### Landing Pages

- Hosted on the **Marketing Landing Pages site** (component/template pages) or a **marketing site** (code-view pages). Deep dive → [[landing-pages]] · [[marketing-sites]]
- **URL alias** (vanity URL): editable in **Draft** only; publishing activates aliases. Alias statuses: Draft / Active / Inactive (reactivatable).
- **Redirect URL:** must start with `https://` and be **< 2,000 characters**; set up before unpublishing to avoid the "URL no longer exists" page.
- A form is only visible once added to a landing page that's **published with an active URL alias**.
- Publishing a landing page with a form publishes the form + activates the related flow.
- **SEO:** public page title, description, head tags; **only JSON-LD** structured data allowed (no JavaScript); allowed tags = `<link>`, `<meta>`, `<script>`.
- **Preview:** requires site contributor access; **merge fields unresolved**; external images need Trusted URL list entry.
- **Template locking protects content/settings only** — authors can still edit targeting rules/variations; clone the personalization point for logic control. Template dynamic content rules/variants copy to new pages automatically.
- **Tracking:** consent banner (Marketing Cloud Admin config; Manager + content role to publish) or Relaxed CSP + Head Markup `set-consent` event (no banner). Custom domain → path `/lp`. Re-publish the site after banner changes.

### Forms

- **One form per landing page; one flow per form**; view modes must match (block ↔ block, code ↔ code). Deep dive → [[forms-data-sources]]
- **Minimum:** ≥1 input + 1 button. Unique names: `Email`, `FirstName`, `LastName` (case-insensitive, no extra chars).
- **Write data provider:** Account/Contact/Lead/Prospect or a marketing object (default if available, else **Lead**); one object at a time; respects **FLS**.
- **Read data providers:** data graph, marketing object, Prospect — pre-fill + progressive profiling; up to **2 lookup providers** (max 1 marketing object + 1 recipient data graph).
- **Supported field types:** Checkbox, Date, Date/Time, Time, Email, Phone, Number, Picklist, Text, Text Area, Text Area (Long), URL. ⚠️ **Number of Employees** unsupported; **multi-picklist** unsupported; no duplicate fields; changing a field's API name breaks future saves.
- **Hidden fields/defaults:** Checkbox/Dropdown/Number/Plain Text/Text Area; hidden required fields need a **fallback value**; URL parameters (UTM) supported.
- **reCAPTCHA v2:** marketing landing pages with forms only; applies to every form once enabled; **one per external page**; changing My Domain breaks it.
- **Progressive profiling:** needs a read data provider; no rules on hidden fields/related objects; changing the read source removes rule connections. ⚠️ **Avoid pre-filling PII.**
- **Unpublish a form:** deactivates its flow; Submit stops working; save the flow as a new version to edit/republish.

### External Forms & Form Handlers

- **Embedding code = 2 `<script>` tags + 1 `<fragment>` element**; generated from the published version (republish to refresh). Deep dive → [[external-forms-form-handlers]]
- **Security setup:** CORS Allowed Origin List + clickjack protection (Trusted Domains for Inline Framing, or allow any page) + Trusted Sites for Scripts → **publish the Experience Cloud site** (else frame-ancestors 'self' CSP error).
- **Form handler** = capture existing external form submissions into Salesforce (also creates a Data 360 data source).
  - ⚠️ **External field names must exactly match HTML `name` attributes.** Date = `YYYY-MM-DD`; Time = `hh:mm:ss`; DateTime = ISO 8601; selected checkbox = `true`.
  - **Honeypot** spam field (block submissions with a value); use a generic label, not `honeypot`.
  - **Map all fields before creating the flow** (edits after don't reflect automatically).
  - **Client-side (JS snippet):** supports web tracking + identity resolution. **Server-side (direct POST URL):** no tracking/identity resolution; works with strict CSP/third-party builders. Both need a **CORS Allowlist** entry.
- **LinkedIn posts:** Social Posts related list on campaigns object; connect LinkedIn account; Publish Now or Schedule.

### Campaign Monitoring & Reporting

- **Campaign Stage** field (derived from all flows): In Planning / In Progress / Completed / Error / Canceled / Paused. ⚠️ One Error flow → whole campaign Error. → [[campaign-reporting-tools]]
- **Marketing Calendar:** Campaigns + Campaign Segment Flows + Segment Flows (default); access = Marketing Cloud Admin/Manager or Access Marketing Calendar permission; drag campaigns (not segment flows); ⚠️ event/form-triggered flows don't appear.
- **NotSentReason** field → maps to **Engagement Action Reason** on the **Email Engagement DMO**. Common: no consent, no opt-in, unauthorized From, hard bounce, TTL exceeded.
- **On-canvas element analytics** (Advanced): run/success/error counts, avg duration; messaging metrics (Sends, Delivery Rate, Opt-Out Rate, Reads, Failed Deliveries, Response Rate, CTR); needs **Tableau Next Included App Business User**; ⚠️ Open Details consumes **Data Cloud credits**; not available for runs before **Winter '25**.
- **AI campaigns:** Draft with Agentforce → brief + campaign preview (name, flow, multichannel content); conversational campaigns add a **"Forward to Agent"** step; agent actions (Create/Draft/Save Brief, Save Campaign) are **powered by Salesforce Flow**; Generate Campaign Insights analyzes the **first flow**.

---

## Section 3 — Data Modeling, Identity Resolution & Segmentation (25%)

### Data 360 Capabilities Checklist (exam expects familiarity)
MC Next is a **Lightning app built on Data 360**. Know **what each does and where it fits** (deep expertise not required): **object model** (DLO/DMO) · **data streams** & DLO→DMO mapping · **data spaces** · **data kits** · **calculated insights** · **data graphs** · **segmentation** · **activations** · **identity resolution**. The exam guide recommends the **Salesforce Certified Data 360 Consultant** certification first (not a prerequisite).

### Data Object Concepts (Layers)

1. **DLO** (Data Lake Object) — raw intake, unprocessed.
2. **DMO** (Data Model Object) — standardized structure.
3. **Unified Individual** — identity-resolved single profile.

**Data graph** = the "map" exposing which DMO fields are available for personalization/decisioning. **Unified Individual must be the primary object.**

### Identity Resolution

- Matches records into a **Unified Individual** via rulesets.
- Generated Individual ruleset = **3 match rules**: Normalized Email, Lead-to-Contact, Device-to-Known.
- **Recommend one active ruleset per object** (Individual + Account) — two doubles billing.
- Runs ~**once per day** (real-time resolution available for immediate needs).
- Custom rules: `lead-to-contact`, `device-to-known` (Identity Match Type).

### Match Rules (deep dive)

- **Match rule** = an opportunity to match (records match if **any one** rule's criteria are met). More rules → **higher** consolidation.
- **Match criteria** = precision within a rule (records must match **all** criteria). More criteria → **lower** consolidation.
- **Match methods (5):** Exact · Exact Normalized · Fuzzy High/Medium/Low Precision.
  - **Exact** = case-insensitive (Maryanne = maryanne).
  - **Exact Normalized** = transforms data (email: strips whitespace/quotes, gmail `.`/`+`; phone: libphonenumber validation; address: country rules).
  - **Fuzzy** = BERT AI model (150+ countries, 3B words, 20M names), **0.7 confidence**; not available for Account fields.
- **Real-time matching:** all criteria run **Exact** except phone/email (**Exact Normalized**), regardless of scheduled method.
- **Advanced settings:** Case Sensitive · Match on Blank (⚠️ ignored in real-time; can cause overmatching / "50,000+ profiles" error).
- ⚠️ **Don't match on a single contact point** (except unique external IDs) — mixes household members into one profile.
- **Default rules:** Accounts = 2 (Exact Name + Normalized Address ± Phone); Individuals = 4 (Fuzzy Name + Normalized Email/Phone/Address/Phone+Email); Households = **1 rule only**.
- **Anonymous vs. known:** unified profile is known if any source profile is known; account profiles always known. Known profiles from **all rulesets** count toward entitlement.

### Reconciliation Rules

- Select a **single value** for a unified field that can't hold multiple values (e.g., name).
- **3 types:** Last Updated (ties → alphabetical) · Most Frequent (ties → last updated) · Source Priority (use on **ID fields** to stabilize).
- ⚠️ **Reconciliation rules don't apply to contact points** — all contact points stay in the unified profile; use **source priority** in activations.
- Reconciliation only determines what's **shown** in the unified profile — never changes source data.

### Segmentation (5 types)

| Type | Purpose |
|------|---------|
| **Standard** | Scheduled audience on a DMO |
| **Real-time** | Millisecond on-demand (no exclusion/nested/counts) |
| **Waterfall** | Priority-ranked, mutually exclusive offers (max 20) |
| **Dynamic** | Parameterized placeholders (API/broadcast flow) |
| **Data kit** | Predefined segment, editable |

**Limits:** 9,950 segments/org · 50 filters/tab · 100 attributes · 20 filters/container · nest 3 (container) / 10 (across).

**Lookback window:** default 90 days, max 2 years (container criteria override).

**Publish:** standard 12/24h · rapid 1/4h (max 20, SFMC/file storage only, can't convert).

### CRM Data & Actionable Lists

- **Prospect** (unqualified, marketing) → **Lead** (qualified, sales) → **Contact** (customer). Deep dive → [[people-records-prospects]].
- **Prospect vs. Lead:** prospect = top of funnel, may have interacted once, no owner, low-to-medium conversion potential; lead = middle of funnel, actively engaging, sales-owned, medium-to-high potential.
- **Unified Individual:** prospects are treated as unified individuals → build a unified individual segment for prospects and add them to campaigns. Individual/Unified Individual records can't be created manually (sync + harmonization only).
- **Account** is required to create a contact; **Campaign Member** records relate a person to a campaign (status: Responded, Attended).
- **Prospect conversion:**
  - Prospect → Lead: manual, or **Data 360-Triggered Flow** on engagement score threshold.
  - Prospect → Contact: manual, or **Record-Triggered Flow** (Prospect created/updated, e.g., `ProspectStatus` = Qualified) with the **Convert Prospect** action (inputs: Prospect ID, Converted Status + Converted checkbox, Existing/New Contact, Existing/New Account, optional Opportunity). Data 360-triggered and form-triggered flows can also convert.
  - Converting to an existing lead only overwrites **empty** fields.
  - **Multi-Currency:** prospect's currency code wins on conversion (avoids conversion problems).
  - ⚠️ **Title > 80 chars** on the lead breaks conversion (prospect allows 128).
  - ⚠️ Custom required fields on Lead → can't convert prospect → lead.
  - **Field mapping:** Company → Account Name (Contact/Account); City/State/Zip → Mailing (Contact) / Billing (Account); Email/Phone → same; Industry → Account only; Prospect Currency → Lead/Contact/Account Currency.
- **Prospect restrictions:** can't add as campaign member; not in Data Import Wizard; can't clone/bulk delete; converted prospects don't show in list view; status values = lead status values; CSV import needs **opt-in consent values** before sending marketing email.
- **Lead Assignment Rules** (Setup → Assignment Rules) determine the record owner after conversion; each rule entry = processing order + condition + assigned user.
- **Actionable list** = static collection (leads OR contacts, never both); use list-triggered flow. ⚠️ **Adding new leads/contacts does NOT create consent records** — load consent separately or the audience is suppressed. → [[crm-integration-and-actionable-lists]]
- **CRM integration:** **Spring '26** = CRM records as an audience source (scheduled or event); **Summer '26** = campaign members + actionable lists. **Sales Data Kit** = pre-configured streams/mappings for leads, contacts, accounts, prospects (optional; Opportunity Influence requires it).
- **Marketing objects** = data-extension-like storage (Text≤255/Number≤18digits/Decimal; Growth 10GB/25, Advanced 40GB/100; 100 columns/object). Deep dive → [[marketing-objects-ampscript-handlebars]].
  - Created by **CSV import** (data types inferred; object = only the file's columns); multiple primary key fields allowed but **no composite keys**.
  - ⚠️ **Field API name, data type, and primary key designation are immutable** after creation — delete + recreate the field (deletes its data).
  - **Full refresh** deletes + replaces all data (CSV must match columns); needs `Manage Marketing Objects` + `Modify All Marketing Object Records`.
  - **Delete is permanent** (all data gone, can't restore) and blocked if any other object references it.
  - Permissions: `ViewAllMarketingObjectRecords` (view) vs. `ManageMarketingObjects` (view + create/delete); Data Management tab = **Default On** for Marketing User profile.

### Consumption & Entitlements

- **Segmentation credits** consumed on **publish**.
- **Identity resolution** consumes credits (one ruleset/object recommended).
- **Scoring frequency** = more frequent = more credits.
- Reduce costs: fewer schedules, tighter lookback, preview before publish, nest common filters.

### Data 360 Billing (deep dive)

- **Internal Data Pipeline** (Salesforce CRM/Marketing Cloud/Commerce Cloud/Personalization connectors) = **free** since Aug 7, 2025.
- **External ingestion** (Snowflake, S3, streaming) = consumes credits.
- **Activate DMO - Streaming** — records created/updated per activation; **doubles** if a data graph is used.
- **Batch Calculated Insights** — charges only when underlying objects change; objects used multiple times counted once.
- **Batch Profile Unification** — after first run, only new/modified source profiles count.
- **Unstructured Data** — chunking + vectorizing counted **once**.
- **Code Extension** — measured in Compute Units.
- **Minimum credit decrement** = 1 per usage type (when fractional usage ≥1 over the month).
- "Segmentation and Activation" card retired **Sept 4, 2025** (merged into Data Services card).

---

## Section 1 — Platform Setup & Governance (13%)

### The Agentforce Marketing Portfolio
- **Agentforce Marketing is a portfolio, not a product.** It contains four products: **Marketing Cloud Next** (evolution of Marketing Cloud Engagement) · **Salesforce Personalization** (real-time, evolution of MC Personalization) · **Marketing Intelligence** (AI analytics, evolution of MC Intelligence) · **Loyalty Management** (no-code B2B/B2C loyalty). → [[agentforce-marketing-portfolio]]
- **Editions:** Growth vs. Advanced (Advanced = all of Growth + extras). ⚠️ **Account scoring, Engagement Scoring, Engagement Frequency, Business Units, Path Experiments, On-Canvas Insights** are **Advanced only**; **people scoring** is in both.

### Environment Setup
- **Editions:** Enterprise & Unlimited with **Growth** or **Advanced**.
- **Configuration, not implementation** — MC Next + Data 360 enable in a few clicks. **Six key configuration steps** minimum; the first three are driven by the **Setup Assistant**: set up Data 360 → enable Marketing Cloud → deploy required data streams. Then add the **physical address** (Company Information) and create an **authenticated domain**.
- **Two permission sets required before configuration** (assigned by a System Administrator-profile user): **Data Cloud Architect** (Data 360 setup, data modelling, data kits, streams, identity resolution) + **Marketing Admin** (most marketing Setup settings, publish/activate campaigns & segments). ⚠️ **Data Cloud Architect replaced Data Cloud Admin in Spring '26**; **System Administrator is a profile, not a permission set**.
- **Data kits** install first (data plumbing); data streams auto-deploy.
- **Permission sets:** Marketing Cloud Admin (Setup access) vs. Marketing Cloud Manager (campaigns/segments/flows only).

### Business Units (Advanced only)
- **1:1 mapping with data space** = data isolation.
- Max **150**; deactivation **permanent**; can't deactivate the last one.
- Two roles: **Marketer-Standard** (activates flows) vs. **Marketer-ReadOnly** (can't activate).

### Enhanced CMS Workspaces
- Share workspaces (source → target); **sharing is non-transitive** (share source to each target).
- Roles: Content Admin / Manager / Author (separate from permission sets).
- **Business unit content isolation:** all content lives in **CMS content workspaces**, each tied to a **specific business unit**. A **data space** maps to **no business unit or one**; a **business unit** maps to **one or more workspaces**. ⚠️ **Content can't be accessed directly across business units** — post as a **common asset**, then copy into the target workspace. → [[marketing-workspaces-and-cms]]
- **Role access:** **Marketing Standard** = data space + CMS content; **Marketing Read-Only** = data space only. Users without Marketing Manager/Admin permission sets can **only** be Read-Only.
- **Workspaces:** organise by campaign/initiative/brand/team; folders; share with a general workspace; export/import between orgs (production ↔ sandbox); roles at workspace level too. ⚠️ **Content must be published** before use; **publishing a form activates its flow**.

### Domain Authentication & IP
- Authenticate **sending subdomain** (DKIM/SPF/DMARC); DNS up to **48 hrs**.
- **MCE vs. MC Next:** MCE uses a **sender authentication package**; MC Next uses an **authenticated domain** + published DNS records (Setup → Authenticated Domains → Add Domain → subdomain → default From username → DNS zone file/records → Activate My Domain).
- ⚠️ **Authorized email domain ≠ authenticated domain.** Authorized verifies **ownership only** (one verification record, no DKIM/DNS sending config) and is required for **dynamic From/Reply-to addresses**. A **personal email on the root domain** as the From address can cause **DMARC alignment failures**.
- **Functional subdomains:** `reply` (replies) · `bounce` (bounces) · `leave` (unsubscribes) — each needs a CNAME.
- **Managed dedicated IPs:** auto-assigned by volume; continuous rebalancing.
- **Domain warming:** domain reputation is PRIMARY signal; start a few hundred/day; bounce <2%, complaint <0.1%.
- DKIM 2048-bit via 3 outbound CNAMEs; DMARC recommended (not required to activate).

---

## Section 2 — Consent (13%)

### Core Model
- **Strict opt-in** — absence of "Yes" = blocked.
- **Composite key:** Subscription + Contact Point + Channel Type.
- **Four levels of consent granularity:** **L1** = entire individual record (all channels/subscriptions/points) · **L2** = a channel as a whole (all email) · **L3** = a specific contact point value (email/phone) · **L4** = a specific contact point **+** a specific subscription type. ⚠️ **MC Next enforces Level 4.**
- Consent tied to **contact point** (not the person).
- **Keyed on Contact Point value + CSCT ID, NOT PartyID** (PartyId blank by design). Shared address → opt-out affects everyone on it.
- **Three consent models coexist** in one org: Salesforce Consent Data Model (legal basis) · Data 360 consent objects (activation eligibility) · Communication Subscription Consent (MC Next sends). **MC Next reads only the third**, through the cache. → [[consent-objects-and-models]]

### Consent Objects (DMOs)
- **Contact Point** (address) · **Communication Subscription** (topic) · **Engagement Channel Type** (medium) · **Communication Subscription Channel Type** (delivery method) · **Communication Subscription Consent** (the opt-in/opt-out record).
- **Id prefixes:** Communication Subscription `0Xl` · Engagement Channel Type `0eF` · Communication Subscription Channel Type `0eB`. First three are **CRM objects** (API 48.0, Spring '20); the consent record lives in **Data 360 only**. ⚠️ **Engagement Channel Type has no DMO.**
- **Subscription governance (fixed at creation):** scope can't change (single BU or all BUs); deleting a subscription deletes all its consent data; a new subscription doesn't appear on the preference page by default; **no frequency capping** (`CommSubscriptionTiming` exists but isn't mapped).
- **Consent Audit Trail** — append-only history of every consent change (fields: TimeStamp, ConsentStatus, **PassedConsentStatus**, ContactPointValue, CSCT ID, caller-provided source attribution). No actor/user field. GDPR delete via Consent API **ShouldForget** (30/60/90-day reprocessing). It's a **DLO not mapped to any DMO** — use Query Editor, not Data Explorer.

### Consent Data Streams
- Data kit **`UnifiedMessagingConsent`** installs **two** streams: consent records (`MessagingConsentV2`) + audit trail (`ConsentAuditTrailV2`).
- **Two ways to get duplicate records** for the same contact point + subscription: (1) the documented pre-Summer '25 generation switch (`MessagingConsent` → `MessagingConsentV2`); (2) the **org-ID naming quirk** — Salesforce appended the org ID to stream names, both spellings stayed active, so even a V2-only org gets duplicates. Send-time is fine (**latest record wins**); queries are not (naive `SELECT` returns both rows).
- ⚠️ **No consent DLO name is portable** — the org ID is in the name. Always read the actual stream name in your org before copying any query/transform.
- V2 mapping: `ConsentId` = primary key (contact point value + CSCT Id); `ConsentCapturedDateTime` (when the person decided) ≠ `UpdatedTime` (when the row changed); `PartyId` mapped to `Party` but empty. → [[consent-data-streams]]

### Methods to Create/Manage Consent
1. **Preference Pages** — subscriber self-service. ⚠️ Unsubscribe via Preference Page = **consent update, not an Email Engagement event** → skews Email Opt-Out Rate lower. **Spring '26** added custom pages; **Summer '26** added **multiple pages** (e.g., per brand). Configure a **brand** (colours/typography/buttons/spacing/borders), **content blocks** (dividers/headings/lists/paragraphs), **layouts**, **image blocks**, and a **default page**. ⚠️ Channel determines the page (email → email preference manager; SMS → SMS-specific page); no unified cross-channel page, no native multilingual, no custom code (AMPscript/Apex/server-side JS), no URL-parameter pre-population. Standard subscription block can't edit button labels/headings/subheadings or reorder the list (rename subscriptions from the Consent tab as a workaround).
2. **Consent Status LWC** — admin drops on record layouts.
3. **Consent Imports** — CSV (one channel + subscription + status per import; max 50k rows, one-time loads).
4. **Salesforce Flow** — `Create Consent` (Data Cloud Record-Triggered) or `Consent Request` (Automation Event/On-Demand). ⚠️ **Never** `MessagingConsent`.
- **Unsupported write paths** (cause stale consent): Data Stream→Consent DLO, Bulk Ingestion API→Consent DMO, Batch Data Transform→DLO mapped to CSC DMO, MessagingConsent/MessagingConsentV2. ⚠️ External consent mapped straight into the CSC DMO **appears saved but is ignored at send time** (silent dropouts, compliance violations, UI misalignment).
- **Consent at scale:** Batch Data Transform→DLO, then Data Cloud-Triggered Flow with Create Consent.
- **Send-time consent cache:** at send time MC Next reads a **cache** (keyed by recipient email), not the DMO directly. Populated on cache miss; used for **90 days** unless updated. **Only these refresh the cache:** manual layout update, Unsubscribe link/Preference Center, CSV import, and *officially* the **Create Consent** flow activity (`MessagingConsentV2` is *not* guaranteed). ⚠️ **Direct DMO/DLO writes (e.g., mapped DLO import) do NOT refresh the cache** → consent can look saved yet be stale at send. → [[consent-cache]]
- **Segmentation on consent** = Calculated Insight workaround (metered/credits).
- **3-flow CRM ↔ Data 360 ↔ MC Next sync** → [[consent-sync-3-flow]]:
  - **Flow 1 (Data Cloud-Triggered)** on `ssot_Individual__dlm` created → Get Contact Point Email + CRM CommSubscriptionConsent → Decision on `Privacy Consent Status` → **Create Consent** (Opt In / Opt Out).
  - **Flow 2 (Data Cloud-Triggered)** on `ssot_CommunicationSubscriptionConsent__dlm` updated → Get CRM CommSubscriptionConsent (match `Consent Giver ID` to `Party`) → Decision on Data Cloud `Consent Status` → **Update Records** (`Privacy Consent Status` = Opt In/Out).
  - **Flow 3 (Automation Event-Triggered)** on CRM `CommSubscriptionConsent` updated (anchor `Consent Giver ID (Contact)`) → Get Contact → Decision on `Privacy Consent Status` → **Create Consent** (Opt Out = suppressed, prevents deployment immediately).

### Channel Rules
| Channel | Opt-out scope |
|---------|--------------|
| Email | Per subscription + channel (unsubscribe link) |
| SMS | Per **sender code** |
| WhatsApp | Per contact point (block in-app) |

- **Consent-check applicability:** promotional email **required** · transactional email **not required** · promotional SMS/WhatsApp/RCS **required** · transactional SMS/WhatsApp/RCS **required**. Separate switches under Setup → email channel settings.
- **Disabling consent checks** requires an explicit written affirmation of responsibility, and ⚠️ **doesn't affect active flows** — anything already running keeps checking.
- **SMS/WhatsApp/RCS granularity:** each code/number/agent maps to one or more subscriptions; opting out of the channel opts out of **all** mapped subscriptions (no per-subscription opt-out over SMS). **RCS exception:** can reuse existing SMS consent when the use case matches.
- **Compliance BCC** is excluded from consent checks; **CC recipients** are suppressed if the primary recipient lacks consent.
- "Unsubscribe from all" does **not** persist as a permanent block.
- **Never delete** a Communication Subscription (destroys audit trail).
- **Transactional email:** consent check off by default, but selecting a Communication Subscription turns it on. **Transactional SMS (OTP/2FA) still requires consent** (TCPA).
- **Spam complaint (FBL) + Reply Mail Management** opt out of **all** current subscriptions (no channel/account-level opt-out today).
- **Consent read latency:** changes take **minutes** to appear in the DMO (up to a couple of hours with Consent Changes in flows).
- **What you can't see:** the cache · who changed a record · consent history on the record · anything in the Party field · more than the 100 most recent records on the component.

### Consent Banner
- Landing pages + external sites via **Web Tracking**.
- Cookie `sfmc_consent` (365 days) stores True/False.
- ⚠️ **First page view not recorded** when consent required.

---

## Section 5 — Agentforce & AI Innovation (11%)

### Marketing Agents
- **Campaign Creation agent** — draft brief, create campaign from brief, summarize, insights.
- **Content Builder agent** — draft content, create sections.
- **Einstein Segments** — natural language → segment (requires Unified Individual DMO ≥10 records).

**The five out-of-the-box agents (memorize the pairing):** **Segment Creation** (natural language → editable segment criteria) · **Campaign Creation** (briefs, flows, multi-channel content) · **Content Creation** (drafts/refines email, LP, SMS content) · **Journey Decisioning** (picks journey/flow + personalizes) · **Account Discovery** (account insights + buying group members). → [[marketing-agents]]

### Conversational Messaging
- **Channel = pipe** (delivery), **Agent = brain** (LLM + Data 360).
- Ecosystem: Channel + Flow + Agent + Data 360.
- **Subagents** = job description (boundaries); **Actions** = tools (get info / update records).
- Lifecycle: Trigger → Routing/intent → Execution → Handoff/resolution.

### Predictive AI Features
| Feature | Edition |
|---------|---------|
| Send Time Optimization (STO) | Growth (global model) / Advanced |
| Metrics Guard | Growth + Advanced |
| Engagement Scoring | Advanced only |
| Engagement Frequency | Advanced only |

- **Metrics Guard** score is counterintuitive: **lower = more likely real**.
- STO/Scoring/Frequency require identity resolution ruleset with **Individual** primary.
- **All three predictive models analyse up to 90 days** of data.
- **Engagement Frequency:** goal = optimal send frequency (reduce fatigue/unsubscribes); trained **only on your org's data**, refreshed **weekly**; classifications = **Saturated / Almost Saturated / On Target / Under Saturated**.
- **Engagement Scoring:** predicts likelihood to **open / click / remain subscribed**; emphasises **recent activity**; personas = **Loyalists** (high/high) · **Selective Subscribers** (low open/high click) · **Window Shoppers** (high open/low click) · **Win Back/Dormant** (low/low); tiers = **Most/More/Less/Least Likely**.
- **STO:** needs the **Send Time Optimization DMO** in the data graph (**Hourly Scores by Week** field); optimization window **2 hours to 1 week**; predictions refresh **~weekly**; available in **both editions**.
- Use insights as **segment criteria** or in a **Decision element** (requires the data graph).

### Einstein Trust Layer
Toxicity detection · dynamic grounding (anti-hallucination) · PII masking · zero data retention · encryption · audit trail · human escalation.

---

## Section 6 — Analytics & Performance Insights (8%)

### Pre-built Dashboards
| Dashboard | Purpose |
|-----------|---------|
| **Campaign Performance** | Aggregated/individual campaign KPIs |
| **Content Performance** | Cross-channel + variation data |
| **Deliverability** | Email delivery + failure reasons |
| **Email Engagement** | Email KPIs |
| **SMS/Forms/Landing Page Engagement** | Channel-specific |
| **B2B Analytics** (Account-Based Marketing, Pipeline, Marketing Manager, B2B Attribution) | Revenue attribution |

### The Three Out-of-the-Box Reporting Capabilities
All included with **no additional license or SKU**:
1. **Campaign Performance Dashboard** — end-to-end view of an individual campaign (sends, opens, clicks, bounces, **contact progression**).
2. **Marketing Performance Dashboard** — broader **cross-channel view over time** (audience growth, program-level engagement trends); available from the **Marketing Analytics tab** and **embedded in campaign records**.
3. **Semantic Data Model** — the **Marketing Intelligence Semantic Data Model** (Tableau Next) combines multiple Data 360 objects and defines relationships/metrics **centrally** for consistent calculation; use it for **custom reports**, stakeholder sharing outside CRM, and external tools.

- **Content performance dashboards** are accessed from the **Analytics tab in the flow messaging element** (select element → Analytics tab → **Details** → pulse cards + row-level data).
- **Deliverability dashboards** cover **SMS, WhatsApp, and mobile app** messaging.
- **Unified Engagement History** — shared sales/marketing view of lead/contact activity on an account; embed the component on **account, lead, and contact page layouts**.

### Key Metric Formulas
- **Open Rate** = unique opens / (sends − bounces)
- **Click Rate** = unique clicks / (sends − bounces)
- **CTR** = unique clicks / unique opens
- **Bounce Rate** = bounces / sends
- **Delivery Rate** = (sends − bounces) / sends
- **Opt-Out Rate** = unsubscribes / (sends − bounces)

### Surfacing Insights
- **Marketing Performance** (Data Cloud + Tableau Next) — install needs **both** Data Cloud admin + Marketing Cloud Admin permission sets; **Tableau Next Included App Business User** to view.
- **Opportunity Influence** — email/SMS click attribution, **30-day-before** window to Closed/Won.
- Attribution models: first-touch vs. last-touch.
- Share folders or dashboards won't appear to users.

---

## High-Frequency "Gotcha" Facts (cram list)

- **60 / 105 / 72% / 44** — scored questions / minutes / pass mark / minimum correct (plus up to **5 unscored**; **1 min 45 s** per question; **Summer '26** release).
- **4 products** — Agentforce Marketing portfolio = MC Next + Salesforce Personalization + Marketing Intelligence + Loyalty Management.
- **6 configuration steps** — Setup Assistant does the first three (Data 360, enable Marketing Cloud, deploy streams).
- **Data Cloud Architect** — permission set renamed from Data Cloud Admin in Spring '26 (System Administrator is a *profile*).
- **Authorized ≠ authenticated domain** — authorized = ownership only (dynamic From/Reply); authenticated = DKIM/DNS sending.
- **Level 4** — the consent granularity MC Next enforces (contact point + subscription type).
- **Off-core** — marketing flows run on a separate high-scale engine (governor limits don't apply the same way).
- **1–3 seconds** — typical on-demand flow latency.
- **Data 360 capabilities** — object model (DLO/DMO), data streams, data spaces, data kits, calculated insights, data graphs, segmentation, activations, identity resolution.
- **8 data providers** — data graph, event, activation, Salesforce record, Apex class, recommender, lookup graph, offer.
- **5 AI agents** — Segment Creation, Campaign Creation, Content Creation, Journey Decisioning, Account Discovery.
- **4 contact point selection methods** — flow data graph, on-demand API payload, activation source priority, activation template.
- **90 days** — the analysis window for all three predictive AI models.
- **2 hours to 1 week** — STO optimization window.
- **Activation + event can't combine** — a message can't use both data providers.
- **Common assets** — the only way to share content across business units (post, then copy).
- **1:1** Business Unit ↔ Data Space.
- **48 hours** — DNS propagation.
- **95% confidence** — Path Experiment auto-winner.
- **72%** — pass score; **30%** — Section 4 weight.
- **2048-bit** — DKIM key strength.
- **9,950** — max segments.
- **150** — max business units.
- **25 / 15 / 50 / 100** — personalization points / variations / filters-per-tab / attributes.
- **5 / 5 / 1 / 1 / 1** — max Offers / Lookup Data Graphs / Event / Apex Class / Activation data sources per content item or message.
- **Subject line + preheader = 1 component** — personalized together.
- **Replace but not remove** — recommender data sources.
- **≥1 successful refresh** — recommender training requirement.
- **Real-time data graph** — recommended for landing pages (faster, costs more).
- **80 chars** — prospect Title conversion limit (prospect allows 128; conversion fails if lead Title > 80).
- **90 days** — View as Web Page link validity (re-renders personalized values per open).
- **5 MB** — max email file attachment (PDF from CMS).
- **30 / 30** — max approved images / phrases in a Distributed Marketing template.
- **2,000 chars** — max landing page redirect URL length (must start with `https://`).
- **1 form per landing page; 1 flow per form** — view modes must match.
- **2 lookup data providers** — max on a form (1 marketing object + 1 recipient data graph).
- **20 chars** — max form data source name (alphanumeric + underscores only).
- **< 2% bounce, < 0.1% complaint** — reputation targets.
- **6 months** — engagement cutoff for list hygiene.
- **E.164** — phone format for consent imports.
- **STOP/QUIT/CANCEL/END/UNSUBSCRIBE** — SMS opt-out keywords.
- **GSM-7 = 160 chars / UCS-2 = 70 chars** — SMS encoding.
- **20** — max MCE journeys per campaign.
- **15M actions/hr + 210 threads** — activation-triggered flow rate limit (MC/Data 360).
- **2.5%** — flow element error rate that triggers rate limiting.
- **+50%** — concurrency allowance for real-time-response flows.
- **0.7** — fuzzy match AI confidence threshold.
- **Aug 7, 2025** — internal Data Pipeline became free.
- **Sept 4, 2025** — Segmentation/Activation card retired.
- **Create Consent** = Data Cloud-Triggered, Automation Event-Triggered, On-Demand flows (+ Record-Triggered from Winter '27).
- **3-flow consent sync** — all MC Next consent writes must use Create Consent (Data Cloud or Automation Event-triggered); direct DMO field mapping is ignored at send time.
- **0Xl / 0eF / 0eB** — Id prefixes for Communication Subscription / Engagement Channel Type / Communication Subscription Channel Type.
- **API 48.0 (Spring '20)** — since when `CommSubscription`/`CommSubscriptionConsent` existed (5 years before MC Next).
- **UnifiedMessagingConsent** — the data kit that installs the two consent streams.
- **90 days** — consent cache TTL (send-time source of truth; invisible, can't be flushed).
- **50,000 rows** — max consent CSV import per file (one channel + subscription + status each).
- **100** — max consent records shown by the Privacy Consent Status component (most recent only).
- **Party field** — wired end to end but always empty; never build on it.
- **Path Experiment** = Advanced + Personalization.
- **10** — max exit rules per flow (evaluated on start/resume).
- **40 chars** — max Subflow variable API name.
- **2–20,000** — Get Records record limit range.
- **15 days** — Recycle Bin retention for deleted records.
- **180 days** — default in-app message expiration.
- **3 fields** — max Collection Sort fields.
- **1 nested collection / 255-char formula** — Transform element limits.
- **Reconciliation rules don't govern contact points** — source priority does.

---

## Related
- [[study-roadmap]] — full learning tracks & progress dashboard
- **Exam Q&A Study Guide** (scenario questions + reasoning): [[Exam Q&A Study Guide/README|README]] · [[section-1-platform-setup-governance]] · [[section-2-consent]] · [[section-3-data-identity-segmentation]] · [[section-4-campaign-flow-content]] · [[section-5-agentforce-ai]] · [[section-6-analytics-insights]]
- **Exam Section Based Flashcards** (drill by exam section): [[Exam Section Based Flashcards/README|README]] · [[section-1-platform-setup-governance]] · [[section-2-consent]] · [[section-3-data-identity-segmentation]] · [[section-4-campaign-flow-content]] · [[section-5-agentforce-ai]] · [[section-6-analytics-insights]] · [[gotcha-facts-cram-deck]]
- Flashcards: [[flashcards/marketing-cloud-next-setup]], [[flashcards/channels-consent-reporting]], [[flashcards/campaigns-content-beyond]], [[flashcards/agentic-conversational-data-email]], [[flashcards/data360-segmentation]], [[flashcards/consent-management-deep-dive]], [[flashcards/consent-cache-and-subscription-model]], [[flashcards/identity-billing-flow-orchestration]], [[flashcards/personalization-data-sources-deep-dive]], [[flashcards/web-content-forms-deep-dive]], [[flashcards/campaigns-flows-deep-dive]], [[flashcards/exam-masterclass-session1]], [[flashcards/exam-masterclass-session2]], [[flashcards/exam-masterclass-session3]], [[flashcards/exam-masterclass-session4]]
