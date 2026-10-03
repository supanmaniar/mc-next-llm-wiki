# Flashcards — Exam Masterclass Session 1 (Elliot Harper)

> Source: `sources/MCNext_Consultant_Exam_Masterclass_Session1.txt` — the official Salesforce exam-prep masterclass, Session 1. Covers exam logistics, the Agentforce Marketing portfolio, setup/configuration, and consent management.

## Card: Exam Logistics
**Q:** How many questions, how long, and what's the pass mark for the Marketing Cloud Next Consultant exam?
**A:** **60 scored** multiple-choice questions (plus up to **5 unscored** ones randomly integrated), **105 minutes**, pass mark **72%** (at least **44 of 60** correct). Average **1 minute 45 seconds** per question. Pass/fail — no benefit to scoring above the threshold.

## Card: Exam Prerequisites & Release
**Q:** What are the formal prerequisites for the exam, and which release is it based on?
**A:** **No formal prerequisites**, but a solid understanding of **Salesforce CRM** and **Data 360 Fundamentals** is highly recommended. Content is based on the **Summer '26 release**.

## Card: Exam Objectives
**Q:** How many key areas does the exam cover, and what does each percentage represent?
**A:** **Six** key areas. Each percentage is the **weighting** — approximately how many questions you can expect from that category.

## Card: Agentforce Marketing — Product or Portfolio?
**Q:** Is Agentforce Marketing a product? What is it?
**A:** It's **not a single product** — it's the **broader brand** of Salesforce's next-generation marketing portfolio. Marketing Cloud Next is just **one product** inside it.

## Card: The Four Portfolio Products
**Q:** Name the four products in the Agentforce Marketing portfolio and what each evolved from.
**A:** **Marketing Cloud Next** (evolution of Marketing Cloud Engagement) · **Salesforce Personalization** (evolution of Marketing Cloud Personalization, real-time) · **Marketing Intelligence** (evolution of Marketing Cloud Intelligence, AI-powered analytics) · **Loyalty Management** (no-code B2B/B2C loyalty & rewards).

## Card: MC Next Editions
**Q:** What two editions does Marketing Cloud Next offer, and how do they relate?
**A:** **Growth Edition** and **Advanced Edition**. Advanced includes **all** Growth capabilities plus additional features. The list isn't exhaustive — new capabilities arrive each release.

## Card: Scoring Edition Trap
**Q:** Which scoring types are available in which editions?
**A:** **Individual (people) scoring** = **both** Growth and Advanced. **Account scoring** = **Advanced only**. The predictive AI features **Engagement Scoring** and **Engagement Frequency** are also **Advanced only**.

## Card: Configuration vs. Implementation
**Q:** How does Salesforce frame the Marketing Cloud Next setup process?
**A:** As **configuration rather than implementation** — MC Next and Data 360 can be enabled in just a few clicks with a setup interface guiding you through the process.

## Card: The Six Configuration Steps
**Q:** At a minimum, how many key configuration steps are there, and what are the first three?
**A:** **Six** key steps (plus optional ones not required for core functionality). The first three — driven by the **Setup Assistant** — are: **set up Data 360**, **enable Marketing Cloud**, and **deploy the required data streams**.

## Card: Two Permission Sets Before Configuration
**Q:** Which two permission sets must a System Administrator-profile user assign before anyone configures MC Next?
**A:** **Data Cloud Architect** (Data 360 setup, data modelling objects, install data kits, deploy streams, configure identity resolution) and **Marketing Admin** (configure most marketing settings in Setup, publish/activate campaigns and segments).

## Card: Data Cloud Architect Rename
**Q:** What happened to the Data Cloud Admin permission set?
**A:** It was **renamed to Data Cloud Architect** in the **Spring '26 release**. ⚠️ A common exam distractor is the old name.

## Card: Profile vs. Permission Set
**Q:** Why is "System Administrator" a distractor in permission-set questions?
**A:** Because **System Administrator is a profile, not a permission set**. The permission sets are Data Cloud Architect and Marketing Admin.

## Card: Setup Assistant Tasks
**Q:** What three tasks does the Marketing Cloud Next Setup Assistant guide you through?
**A:** **Set up Data 360**, **enable Marketing Cloud**, and **deploy the required data streams** — each initiated with a single button click that starts the automated enablement process.

## Card: Two Additional Required Tasks
**Q:** After the Setup Assistant completes, what two additional required tasks remain?
**A:** 1) Add the company's **physical address** to the Company Information page (included in the footer of promotional emails for regulatory compliance). 2) Create an **authenticated domain**.

## Card: MCE vs. MC Next Domain Setup
**Q:** How does domain setup differ between Marketing Cloud Engagement and Marketing Cloud Next?
**A:** **MCE** uses a **sender authentication package** to configure the sending domain and branded account domains. **MC Next** has you add an **authenticated domain**, generate the required **DNS records**, and publish them through your DNS provider.

## Card: Authenticated Domain Workflow
**Q:** What are the steps to add an authenticated domain in MC Next?
**A:** Setup → Quick Find "Authenticated Domains" → **Add Domain** → **Continue** → define the **subdomain** → create a **default From email username** → download a **DNS zone file** or view individual DNS records → add them at your DNS provider → tick the confirmation checkbox → **Activate My Domain**.

## Card: Authorized vs. Authenticated Domain
**Q:** What's the difference between an authorized email domain and an authenticated domain?
**A:** An **authorized email domain** verifies **ownership** with a **simple verification record** and does **not** provide the complete DKIM/DNS sending configuration. An **authenticated domain** establishes the full DKIM and DNS sending configuration. Authorized domains are required for **dynamic From or Reply-to addresses**.

## Card: DMARC Alignment Failure
**Q:** What causes a DMARC alignment failure with From addresses?
**A:** For DMARC alignment, the domain in the **From address must align with the authenticated sending domain**. Using a **personal email address on the root domain** as the From address may result in DMARC alignment failures.

## Card: Four Levels of Consent Granularity
**Q:** Name the four levels of attributing consent to promotional communications.
**A:** **Level 1** = the entire individual record (all channels/subscriptions/contact points). **Level 2** = a communication channel as a whole (e.g., all email). **Level 3** = a specific contact point value (email/phone), regardless of subscription. **Level 4** = a specific contact point **and** a specific subscription type.

## Card: Which Level Does MC Next Enforce?
**Q:** Which consent level does Marketing Cloud Next enforce?
**A:** **Level 4** — the most granular level, applying to a specific contact point (email address or phone number) **and** a specific subscription type.

## Card: The Four Consent Objects
**Q:** Name the four objects that manage Level 4 consent and what each represents.
**A:** **Communication Subscription** (the type/purpose/category of communication) · **Communication Subscription Channel Type** (the channel used to deliver a subscription) · **Communication Subscription Consent** (the individual's consent status for a subscription at a specific contact point value + subscription channel type) · **Engagement Channel Type** (the channel: email, SMS, WhatsApp, RCS).

## Card: Consent Object Example
**Q:** Give a concrete example of what a Communication Subscription Consent record stores.
**A:** Someone at `example.com` **opted into Marketing via email** — i.e., a contact point value + subscription + channel combination.

## Card: Consent CSV Import Limits
**Q:** What are the limitations of the consent file import?
**A:** It's a **manual, user-driven** process; each file is limited to **50,000 rows**; each upload covers **one channel**, applies to **one subscription**, and assigns **one consent status** (opt-in or opt-out).

## Card: Create Consent Flow Element Availability
**Q:** In which flow types is the Create Consent element available, and what is it called in each?
**A:** Available in **Automation Event-Triggered Flows**, **On-Demand Flows**, and **Data Cloud-Triggered Flows**. In Automation Event-Triggered and On-Demand flows it's labelled **Consent Request**; in Data Cloud-Triggered flows it's **Create Consent**.

## Card: Unsupported Consent Methods
**Q:** Name the four unsupported methods for updating consent.
**A:** **Batch Data Transform**, **direct mapping from a data stream**, **bulk ingestion using the Bulk Ingestion API**, and the **MessagingConsentV2 flow action**. They can materialize records from a DLO into the CSC DMO, but aren't supported consent management methods.

## Card: Consent Read Latency
**Q:** How long can it take for a consent record created via a data stream to materialise in the CSC DMO?
**A:** Approximately **15 minutes** — records ingested through data streams aren't available in the DMO in real time.

## Card: Why the Consent Cache Exists
**Q:** Why did Salesforce build a caching layer into the consent service?
**A:** To provide **read-after-write consistency** for consent updates — so the latest consent status is immediately available rather than waiting for the DMO to refresh.

## Card: Consent Cache TTL
**Q:** What is the time-to-live of a consent cache entry?
**A:** **90 days**, after which it expires automatically.

## Card: Consent Write Order
**Q:** When a consent record is created through the consent service, what order do things happen in?
**A:** The **cache is updated first** (making the latest status immediately available), then the record is written to the underlying **DLO**, and the CSC DMO is later **hydrated** with the updated record.

## Card: Send-Time Consent Lookup
**Q:** At send time, how does the send engine decide which consent value to use?
**A:** It looks at the **cache first**. If there's **no value** for a contact point value, it looks at the value in the **CSC DMO** and then updates the cache. If a value **is** in the cache, it does **not** look at the DMO.

## Card: The Stale Cache Scenario
**Q:** Walk through the scenario where an opt-out is ignored at send time.
**A:** 1) A consent record is created (opt-in) and materialised in the DMO via an **unsupported method** (e.g., direct data stream mapping). 2) An email is sent — no prior cache entry, so the cache is populated with the current (opt-in) status. 3) An **opt-out** record is streamed to the consent DLO — but there's **no automatic cache update**. 4) The next email sends because the cache still reports opt-in.

## Card: Why Unsupported Methods Break Consent
**Q:** Why is there no automatic cache update when consent is written via a data stream mapping?
**A:** Because there is currently **no process that automatically updates an existing cache record** when the status update is retrieved using a data stream mapping. Only supported write paths (which go through the consent service) refresh the cache.

## Card: Create Consent in a Data Cloud-Triggered Flow
**Q:** How does the Create Consent element behave in a Data Cloud-Triggered Flow?
**A:** When a change occurs on the contact point email DMO, the flow evaluates a condition (e.g., a consent status field updated). When satisfied, it triggers the consent action. When the flow interview reaches the action, consent values are written **immediately to both the cache layer and the underlying DLO** — so subsequent reads return the up-to-date status right away, before the DMO refreshes.

## Card: Privacy Consent Status LWC
**Q:** Where can you use the Privacy Consent Status Lightning Web Component to trigger the consent service?
**A:** On **Lead, Contact, and Personal Account** records.

## Card: Preference Pages — Spring vs. Summer
**Q:** What did the Spring and Summer releases each add to preference pages?
**A:** **Spring:** introduced **custom preference pages**. **Summer:** expanded to allow **multiple preference pages** (e.g., separate pages per brand).

## Card: Preference Page Configuration
**Q:** What can you configure when building a preference page?
**A:** A **brand** (colours, typography, buttons, spacing, borders), **content blocks** (dividers, headings, lists, paragraphs), **layouts**, and **image blocks** — plus designate a **default preference page** used across all marketing message sends.

## Card: Preference Page Channel Rule
**Q:** How does the message channel affect which preference page is used?
**A:** The channel **automatically determines** the page type: **email** messages link to the **email preference manager**; **SMS** messages use a separate **SMS-specific** page. A unified email+SMS page isn't available out-of-the-box.

## Card: Preference Page Limitations
**Q:** Name four limitations of out-of-the-box preference pages.
**A:** No **unified cross-channel** page (needs custom development) · no **native multilingual** support (needs custom forms/development) · no **custom code** (AMPscript, Apex, server-side JavaScript) · can't **pre-populate from URL parameters**.

## Card: Standard Subscription Block Limits
**Q:** What can't you edit in the standard subscription block, and what's the workaround?
**A:** You can't edit **button labels, headings, subheadings**, or the **order of the subscription list**. Partial workaround: **rename the communication subscriptions from the Consent tab**. Full text customization is planned for an upcoming release.

## Card: Multiple Preference Pages in Merge Fields
**Q:** When you publish multiple preference pages, where do they appear?
**A:** In the **merge field selector**, so you can choose the appropriate one when adding a preference page link to a message.

## Card: Consent Object Distractor
**Q:** Why is the CRM Communication Subscription Consent object a distractor?
**A:** Because the **Communication Subscription Consent object in CRM is not the same object as the Communication Subscription Consent DMO** — they're different halves of the model.

## Card: Has Opted Out of Email Distractor
**Q:** Does the "Has Opted Out of Email" field on Lead/Contact records update consent in MC Next?
**A:** **No** — it does not update consent in Marketing Cloud Next. It's a common exam distractor.

## Related
- [[marketing-cloud-next-overview]] · [[agentforce-marketing-portfolio]] · [[user-access-and-permission-sets]] · [[email-domain-authentication]] · [[consent-and-compliance]] · [[consent-preference-pages]] · [[consent-cache]] · [[consent-write-paths]] · [[scoring-models]]
- Deck index: [[study-roadmap]]
