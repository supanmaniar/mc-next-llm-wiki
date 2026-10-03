# Flashcards — Exam Masterclass Session 2 (Elliot Harper)

> Source: `sources/MCNext_Consultant_Exam_Masterclass_Session2.txt` — the official Salesforce exam-prep masterclass, Session 2. Covers Data 360 foundations, CRM integration, and the complete marketing flow taxonomy.

## Card: Session 2 Agenda
**Q:** What three areas does Session 2 cover?
**A:** 1) Key **Data 360** topics referenced in the exam objectives. 2) How **Salesforce CRM integrates** with Marketing Cloud Next. 3) The different **types of marketing flows**.

## Card: Data 360 Certification Recommendation
**Q:** What does the exam guide recommend regarding Data 360, and is it a prerequisite?
**A:** It's **not a prerequisite**, but the exam guide recommends candidates consider earning the **Salesforce Certified Data 360 Consultant** certification first. Candidates are expected to have some Data 360 experience.

## Card: Why Data 360 Knowledge Matters
**Q:** Why do you need Data 360 knowledge for the MC Next exam?
**A:** Because **Marketing Cloud Next is a Lightning app built on Data 360** — you need a solid understanding of core Data 360 concepts, though not deep expertise in every area.

## Card: Data 360 Object Model
**Q:** What should you understand about the Data 360 object model?
**A:** The role of **DLOs** (Data Lake Objects) and **DMOs** (Data Model Objects). You **don't** need to go deeply into **unstructured data**.

## Card: Data Streams & Mapping
**Q:** What should you understand about data streams?
**A:** How to **create data streams** and how data is **mapped from DLOs into DMOs**.

## Card: Data 360 Capabilities Checklist
**Q:** Name the Data 360 capabilities the exam expects you to be familiar with.
**A:** Data 360 object model · data streams & DLO→DMO mapping · **data spaces** · **data kits** · **calculated insights** · **data graphs** · **segmentation** · **activations** · **identity resolution**.

## Card: Data 360 Learning Journey
**Q:** Where does Salesforce recommend building your Data 360 foundation?
**A:** Trailhead — search for the **Data 360 Learning Journey**, a progressive multi-part learning experience.

## Card: The CRM Dependency Shift
**Q:** How has the Data 360 dependency for audience data changed?
**A:** Earlier releases required audience/decisioning/personalization data to exist **in Data 360**. **Spring '26** began reducing that dependency (CRM records as an audience source); **Summer '26** went further (campaign members + actionable lists).

## Card: Spring '26 CRM Integration
**Q:** What did Spring '26 add to CRM integration?
**A:** You can use **CRM records directly as an audience source** — either on a **scheduled basis** or based on an **event**.

## Card: Summer '26 CRM Integration
**Q:** What did Summer '26 add to CRM integration?
**A:** Support for **campaign members** and **actionable lists**.

## Card: Sales Data Kit
**Q:** What does the Sales Data Kit create, and which objects does it cover?
**A:** Pre-configured **data streams and mappings** for common CRM objects — **leads, contacts, accounts, and prospects**, plus related objects.

## Card: Sales Data Kit Optionality
**Q:** Is the Sales Data Kit required, and what happens if you skip it?
**A:** It's **optional**. Skip it if you manage identity outside Salesforce or want more control over CRM data. ⚠️ If you skip it, some features (like reporting dashboards) need **extra configuration**, and **Opportunity Influence requires it**.

## Card: Flow Support for CRM Audiences
**Q:** How does Flow work with CRM audiences?
**A:** You can add **campaign members or CRM records** on a **schedule**, or respond to **Change Data Capture (CDC)** events — such as when a CRM record is created or updated.

## Card: Actionable List Definition
**Q:** What is an actionable list?
**A:** A **fixed (static) collection of audience members** — useful when you already know exactly who you want to engage.

## Card: Actionable List Examples
**Q:** Give three examples of when to use an actionable list.
**A:** Attendees captured at a **trade show** · **selected leads or contacts** from CRM · a **curated audience** that needs to be activated.

## Card: Creating an Actionable List
**Q:** How do you create an actionable list from a CSV import?
**A:** Import → **Import from File** → choose the CSV → enable **Add to Actionable List** → select an existing list or create a new one → review **field mappings** → **Start Import**. Members then appear on the **Actionable Lists** tab.

## Card: The Actionable List Consent Gap
**Q:** What happens to consent when you add new leads or contacts to an actionable list?
**A:** Marketing Cloud Next **does not automatically create corresponding consent records**. Those consent records must be **created or loaded separately** — otherwise the audience is suppressed at send time (strict opt-in).

## Card: CRM Record Operations in Flow
**Q:** How does CRM integration extend beyond audience selection?
**A:** Within Flow you can perform standard operations on Salesforce records using the **Get, Create, Update, and Delete Records** elements.

## Card: CRM Reporting Integration
**Q:** What reporting capabilities combine CRM and Data 360 data?
**A:** Standard **Salesforce CRM reports** alongside Data 360 data, including reports based on **DMOs**, plus analytics experiences such as the **Unified Engagement History Dashboard**.

## Card: Flow as the Orchestration Engine
**Q:** What is the single orchestration engine for outbound messaging in MC Next, and how does that differ from MCE?
**A:** **Flow** is the orchestration engine. In **Marketing Cloud Engagement**, messages could be sent from many tools/contexts (journeys, automations, triggered sends, UI sends, Salesforce sends, Content Builder sends). In MC Next, **all outbound messaging is orchestrated through Flow**.

## Card: Marketing Flows / High-Scale Flows
**Q:** What are marketing flows also called, and how do they differ from core flows?
**A:** Also called **high-scale flows**. They run on a **separate high-scale processing engine** and run **off-core** (outside the core Salesforce transactional runtime), so traditional governor-limit, transaction-management, and scaling concerns **don't apply the same way**.

## Card: The Six Flow Types
**Q:** Name the six flow types in Marketing Cloud Next.
**A:** **Audience flow** · **Activation-triggered flow** · **Automation event-triggered flow** · **On-demand flow** · **Broadcast flow** · **Data Cloud-triggered flow**.

## Card: Audience Flows (Summer '26)
**Q:** What are audience flows, and what do they unify?
**A:** A **Summer '26** concept that unifies several previously separate flow types into a single simplified orchestration experience — covering **segments, actionable lists, CRM records, and campaign members**. You choose the audience source directly in the flow configuration.

## Card: Audience Flow Re-entry
**Q:** What Journey Builder concept do audience flow re-entry conditions mirror?
**A:** Journey Builder's **contact entry mode**. The three options are **no re-entry**, **re-entry at any time**, and **re-entry only after exiting**.

## Card: Activation-Triggered Flows (Winter '26)
**Q:** When were activation-triggered flows introduced, and what target type do they use?
**A:** **Winter '26**; they use the **Data 360 activation target type**.

## Card: Activation Enrichment Options
**Q:** What four things can you configure when creating an activation?
**A:** Add **filters to activation membership** · add **contact point filters** · **limit audience size** based on attributes · **append additional attributes from related objects** associated with a segment member.

## Card: Activation as Personalization Source
**Q:** Why is the activation-as-personalization-source capability significant?
**A:** Messages can use the **activation directly as the personalization source**, so email **merge fields and repeaters** can reference **enriched Data 360 activation attributes** — **without additional lookups at send time**.

## Card: Automation Event-Triggered Flow Sources
**Q:** What event sources can start an automation event-triggered flow?
**A:** 1) **Standard engagement events** (email opens, clicks, form submissions — no extra config). 2) **Engagement signals** (custom events like website interactions, PDF downloads). 3) **CRM record-triggered events** (Spring '26 — prospect/lead/contact/related object created or updated).

## Card: CRM Record-Triggered Events
**Q:** When were CRM record-triggered events introduced, and what fires them?
**A:** **Spring '26**. They fire when a **prospect, lead, contact, or any related object** record is created or updated.

## Card: On-Demand Flows
**Q:** What are on-demand flows, and what makes them powerful?
**A:** They let external systems trigger **transactional messaging instantly** through the **REST API**. Real-time personalization data can be passed **directly in the API payload** using an **Apex-defined data schema** — **no need to ingest or hydrate data into Data Cloud** first.

## Card: On-Demand Flow Latency & Use Cases
**Q:** What is the typical latency of an on-demand flow, and what is it ideal for?
**A:** Approximately **1 to 3 seconds**. Ideal for **one-time passcodes, order confirmations, password resets, and real-time service alerts**.

## Card: On-Demand Flow API Requirements
**Q:** What two values are required in an on-demand flow API call, and what's the rule about the individual ID?
**A:** Both the **email address** and **individual ID** are required. The individual ID **doesn't need to correspond to an Individual record in Data 360** — it simply **cannot be null**. The request won't create an Individual DMO record, but engagement still appears in the **Email Engagement DMO**.

## Card: Broadcast Flows
**Q:** What are broadcast flows designed for, and how do they differ from on-demand flows?
**A:** Designed for **fan-out processing** — a single event triggers communication to a **large group simultaneously**. Both use the REST API, but **on-demand targets an individual** while **broadcast targets all members of a segment**.

## Card: Broadcast Flow Segment Type
**Q:** What segment type must a broadcast flow use, and when is it evaluated?
**A:** A **dynamic segment** — evaluated at **execution time** using variables passed into the flow, allowing highly contextual audience resolution.

## Card: Broadcast Flow Use Cases
**Q:** Give three use cases for broadcast flows.
**A:** **Airline flight delay notifications** · **utility outage alerts** · **emergency notifications**.

## Card: Broadcast Flow Execution Sequence
**Q:** What happens when a broadcast flow API call executes?
**A:** 1) The flow passes the parameter values required by the dynamic segment. 2) The segment **refreshes** and evaluates all individuals matching **both static and dynamic criteria**. 3) Every qualifying member is **admitted into the flow**. 4) Each recipient receives the personalized message.

## Card: Broadcast Flow Run Modes
**Q:** Can broadcast flows run synchronously or asynchronously?
**A:** **Either**, depending on the use case.

## Card: Data Cloud-Triggered Flows
**Q:** What triggers a Data Cloud-triggered flow, and how does it work under the hood?
**A:** It executes when a record within a **Data Cloud DMO** (or **Calculated Insight object**) is created or updated. Data 360 **monitors the DMO**; when a matching change occurs, a **data action publishes a platform event** that triggers the flow.

## Card: Data Cloud-Triggered Flow — Marketing Flow?
**Q:** Is a Data Cloud-triggered flow a marketing flow?
**A:** ⚠️ **Technically not** — but it's still considered a **high-scale flow type**.

## Card: Data Cloud-Triggered Flow Use Case
**Q:** What is the most common use of a Data Cloud-triggered flow?
**A:** **Automating consent management** based on DMO or Calculated Insight object record changes, using the **Create Consent** flow action — which updates the **Communication Subscription DMO** and the **consent cache layer**.

## Card: Which Flows Can't Send Email?
**Q:** Which two flow types cannot send emails from Marketing Cloud Next?
**A:** **Record-triggered flows** (they're CRM flows) and **Data Cloud-triggered (Data 360-triggered) flows**.

## Card: Off-Core Execution
**Q:** What does "off-core" mean, and what does it change?
**A:** Marketing flows execute **outside the core Salesforce transactional runtime** on a separate high-scale engine. Because of this, traditional concerns around **governor limits, transaction management, and scaling patterns don't apply in the same way**.

## Card: Apex Class Data Provider
**Q:** How is personalization data supplied to on-demand and broadcast flow emails?
**A:** Via an **Apex class data provider** — an Apex wrapper class defines the variables passed in the API payload, and the email uses the Apex class data provider to personalize content from those properties.

## Card: Available for Input
**Q:** What does the "Available for Input" option do on a flow variable?
**A:** It allows **external systems to pass values into the flow through an API request** — required for on-demand and broadcast flow variables supplied externally.

## Related
- [[marketing-flow-types]] · [[crm-integration-and-actionable-lists]] · [[data-architecture-layers]] · [[data-kits-and-data-streams]] · [[audience-flows]] · [[activation-triggered-flows]] · [[rest-api-flow-integration]] · [[marketing-triggers]] · [[campaigns-and-flows]]
- Deck index: [[study-roadmap]]
