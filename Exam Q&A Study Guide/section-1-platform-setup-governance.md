# Q&A Study Guide — Section 1: Platform Setup & Governance (13%)

> **Exam weight: 13%.** Scenario-driven questions with full reasoning. Cover the **Answer** and **Why** until you've committed to your own answer.
> **Related concept pages:** [[marketing-cloud-next-overview]] · [[user-access-and-permission-sets]] · [[business-units]] · [[email-domain-authentication]] · [[domain-settings]] · [[domain-warming-ip-infrastructure]] · [[data-kits-and-data-streams]]

---

## Q1 — Editions

**Question:** A consultant is scoping a Marketing Cloud Next implementation for a mid-market company on the Enterprise edition. The marketing team wants to isolate data between three regional divisions and use on-canvas flow insights. Which product tier must the consultant recommend?

**Answer:** **Advanced.**

**Why:** Business Units and on-canvas insights are both **Advanced-only** capabilities. Growth is the standard tier and does not include Business Units (which provide the 1:1 data-space isolation the team needs) or on-canvas insights. The edition (Enterprise vs Unlimited) is a separate axis from the tier (Growth vs Advanced) — the question deliberately gives you Enterprise to make you think the edition is the constraint, when the real gate is the **tier**.

> ⚠️ **Distractor logic:** "Growth" is the "almost right" answer — it's a valid tier, just missing the two specific features named. Always check whether the *named requirements* are Advanced-gated.

---

## Q2 — Permission Sets

**Question:** A new marketing operations hire needs to build campaigns, segments, and flows, but must **not** have access to Setup. Which permission set should the consultant assign?

**Answer:** **Marketing Cloud Manager.**

**Why:** The two core permission sets split cleanly: **Marketing Cloud Admin** includes Setup access, while **Marketing Cloud Manager** grants campaigns, segments, and flows only. The requirement "must not have access to Setup" is the constraint that eliminates Admin. This is a classic least-privilege scenario — Salesforce exams reward the option that grants *exactly* what's needed and no more.

> ⚠️ **Distractor logic:** "Marketing Cloud Admin" is the plausible-but-wrong answer — it does everything the user needs, but violates the explicit constraint.

---

## Q3 — Business Units

**Question:** A company on the Advanced tier has 150 Business Units configured. They want to deactivate one that is no longer used, then reactivate it next quarter if the division returns. What should the consultant advise?

**Answer:** **Deactivation is permanent — the Business Unit cannot be reactivated.**

**Why:** Business Unit deactivation is irreversible, and the maximum is **150**. The scenario stacks two limits: the org is already at the cap, and the requested reactivation is impossible. The correct advice is that the division would need a **new** Business Unit if it returns, which is only possible if a slot is freed — and you cannot deactivate the last remaining Business Unit either.

> ⚠️ **Distractor logic:** An option saying "deactivate and reactivate later" is the "almost right" answer — it sounds operationally sensible but contradicts a hard product rule.

---

## Q4 — Business Unit Roles

**Question:** A regional marketer needs to review flows and segments in their Business Unit but must not be able to activate flows. Which Business Unit member role should be assigned?

**Answer:** **Marketer-ReadOnly.**

**Why:** The two Business Unit member roles are **Marketer-Standard** (can activate flows) and **Marketer-ReadOnly** (cannot activate flows). The constraint "must not be able to activate flows" maps directly onto ReadOnly. Note this is a *Business Unit member role*, distinct from the platform permission sets in Q2 — a common source of confusion.

> ⚠️ **Distractor logic:** "Marketer-Standard" is the plausible-but-wrong answer — it's the more capable role, which is exactly what the constraint forbids.

---

## Q5 — CMS Workspace Sharing

**Question:** A consultant shares an Enhanced CMS workspace from the Brand workspace to the Regional workspace, and then shares the Regional workspace to the Local workspace. A Local author reports they cannot see the Brand content. What is the cause?

**Answer:** **CMS workspace sharing is non-transitive — the Brand workspace must be shared directly to the Local workspace.**

**Why:** Sharing flows from a **source** to a **target**, and does not cascade. Sharing A→B and B→C does not give C access to A. The fix is to share the source (Brand) to **each** target (Regional *and* Local) individually. This is a favourite exam trap because transitive sharing is the intuitive assumption.

> ⚠️ **Distractor logic:** "The Local author needs a higher content role" is the plausible-but-wrong answer — it misdiagnoses a *sharing topology* problem as a *permissions* problem.

---

## Q6 — Domain Authentication

**Question:** A company wants to authenticate their sending domain in Marketing Cloud Next. Their DNS team asks how many CNAME records are needed for DKIM and what key strength is used. What should the consultant state?

**Answer:** **3 outbound CNAME records, using a 2048-bit DKIM key.**

**Why:** Marketing Cloud Next uses **2048-bit** DKIM configured via **3 outbound CNAMEs**. Separately, the three **functional subdomains** — `reply`, `bounce`, and `leave` — each need their own CNAME. The question asks specifically about DKIM, so the answer is 3 CNAMEs at 2048-bit; don't conflate this with the functional subdomain records.

> ⚠️ **Distractor logic:** An option citing 1024-bit is the "almost right" answer — a real DKIM strength historically, but not what Marketing Cloud Next uses.

---

## Q7 — DMARC

**Question:** A client's security team insists that DMARC must be configured before the sending domain can be activated. Is this correct?

**Answer:** **No — DMARC is recommended but not required to activate a sending domain.**

**Why:** Activation requires DKIM and SPF records; DMARC is **recommended** for deliverability and alignment but is not a gate. The scenario tests whether you know the difference between a *requirement* and a *best practice*. Note that DMARC alignment *does* matter for dynamic From addresses (Section 4), which is a different question.

> ⚠️ **Distractor logic:** "Yes, DMARC is mandatory" is the plausible-but-wrong answer — it sounds like good security advice, which is precisely why it's tempting.

---

## Q8 — DNS Propagation

**Question:** A consultant adds the authentication records and the client asks how long until sending can begin. What is the maximum expected wait?

**Answer:** **Up to 48 hours for DNS propagation.**

**Why:** DNS changes propagate across the internet's resolver network, and Marketing Cloud Next documents up to **48 hours**. This is a memorised number — the exam tests it directly because it affects project timelines.

---

## Q9 — IP Infrastructure

**Question:** A high-volume sender asks whether they should request a specific dedicated IP address and manage their own warming schedule. What should the consultant explain?

**Answer:** **Managed dedicated IPs are auto-assigned by volume with continuous rebalancing — the sender does not pick or manually manage them.**

**Why:** Marketing Cloud Next handles IP assignment automatically based on sending volume and continuously rebalances across the pool. This removes the manual IP-selection and warming-management burden of legacy platforms. The sender's responsibility shifts to **domain reputation**, which is the primary signal.

> ⚠️ **Distractor logic:** "Request a dedicated IP and warm it manually" is the legacy/over-engineered answer — it describes the old Marketing Cloud model, not Marketing Cloud Next.

---

## Q10 — Reputation Signals

**Question:** A deliverability specialist is troubleshooting inbox placement. They focus on IP reputation. What should the consultant recommend they prioritise instead?

**Answer:** **Domain reputation — it is the PRIMARY signal.**

**Why:** In Marketing Cloud Next, **domain reputation** is the primary signal, not IP reputation. This is a deliberate architectural shift from legacy sending. The practical implication is that warming and monitoring effort should centre on the domain.

> ⚠️ **Distractor logic:** "IP reputation" is the plausible-but-wrong answer — it's the correct mental model for older platforms, which is exactly the trap.

---

## Q11 — Warming Targets

**Question:** A client is starting a domain warming program. What starting volume and quality thresholds should the consultant recommend?

**Answer:** **Start with a few hundred sends per day; keep bounce rate < 2% and complaint rate < 0.1%.**

**Why:** Warming is a gradual reputation-building exercise. Starting at a few hundred per day avoids reputation shocks, and the quality thresholds (**< 2% bounce, < 0.1% complaint**) are the documented targets. These numbers are memorised facts the exam tests directly.

---

## Q12 — List Hygiene

**Question:** A client's engagement has declined and they ask when to stop mailing a contact. What engagement cutoff should the consultant recommend?

**Answer:** **6 months of no engagement.**

**Why:** The recommended list hygiene cutoff is **6 months**. Mailing unengaged contacts damages domain reputation, which (per Q10) is the primary signal. This connects list hygiene directly to the deliverability strategy rather than treating it as a separate housekeeping task.

---

## Q13 — Data 360 Provisioning

**Question:** A consultant is planning the Data 360 foundation for a Marketing Cloud Next implementation. The client asks which provisioning model applies. What should the consultant clarify?

**Answer:** **Whether the org uses a core-org configuration or a Data Cloud One / companion-org configuration.**

**Why:** Data 360 provisioning is an explicit exam objective, and the two models differ in how Data 360 relates to the core org. ⚠️ This is a **thin spot** in the source material — the roadmap flags it as worth reinforcing. Know that the provisioning model is a decision point, even if the deep configuration detail is light.

---

## Q14 — Install Order

**Question:** A consultant is setting up a new Marketing Cloud Next org. What must be installed first, and what follows automatically?

**Answer:** **Data kits install first; data streams auto-deploy afterwards.**

**Why:** Data kits provide the data plumbing (DMOs, mappings, streams) that everything else depends on. Data streams deploy automatically with the kit, so there's no separate manual step. Getting the order wrong means downstream configuration has nothing to bind to.

---

## Q15 — Marketing Triggers Permission

**Question:** A marketer needs to configure behavioural automation events. Which permission set is required?

**Answer:** **Marketing Triggers Admin.**

**Why:** Marketing Triggers require the dedicated **Marketing Triggers Admin** permission set — it is not covered by the standard Admin or Manager sets. This is a specific, memorised permission mapping.

---

## Q16 — Sandbox Types

**Question:** A client wants to test a Marketing Cloud Next implementation before go-live. Which sandbox types are supported?

**Answer:** **All sandbox types — Developer, Developer Pro, Partial Copy, and Full Copy.**

**Why:** Marketing Cloud Next supports every sandbox type, so the choice is driven by *fidelity* rather than availability. Full Copy replicates the most (including campaigns, briefs, and subscriptions), while Developer and Developer Pro are lighter. The exam tests that no sandbox type is excluded.

> ⚠️ **Distractor logic:** "Only Full Copy is supported" is the plausible-but-wrong answer — it assumes the highest-fidelity option is the only viable one.

---

## Q17 — Sandbox Deployability

**Question:** A consultant builds a campaign, a brief, a Communication Subscription, an email, and a segment-triggered flow in a Full sandbox. Which of these can be deployed to production?

**Answer:** **The email and the segment-triggered flow can be deployed. The campaign, brief, and Communication Subscription cannot.**

**Why:** The general rule is that **content and flows are deployable**, while **campaigns, briefs, and subscriptions are not**. This is a high-value exam fact because it shapes deployment planning — anything non-deployable must be recreated manually in production. Note that Communication Subscriptions are stored as *data* in the DMO, and only *metadata* deploys.

> ⚠️ **Distractor logic:** "Everything replicates, so everything deploys" is the plausible-but-wrong answer — it conflates *replication* (Full sandbox copies it) with *deployability* (can it be promoted?).

---

## Q18 — Deploy Order

**Question:** A consultant is deploying changes from sandbox to production. Which objects must be deployed first?

**Answer:** **Data Cloud objects first** (segments, DMOs, DLOs, data graphs, calculated insights, data actions, Personalization Points, recommenders, engagement signals) — then activate/publish. **Marketing Cloud Next objects follow** (content records, email templates, brand, images, CMS workspace, flows).

**Why:** Marketing objects reference Data Cloud objects, so deploying them in the wrong order leaves dangling references. The sequence is: Data Cloud objects → activate/publish → Marketing objects → activate/publish. Deployment methods include Change Sets, DevOps Center, Metadata Retrieve/Deploy, and CLI Retrieve/Deploy.

> ⚠️ **Distractor logic:** "Deploy Marketing objects first because they're what users see" is the plausible-but-wrong answer — it inverts the dependency order.

---

## Q19 — Deployed Status

**Question:** A consultant deploys a flow and an email to production and tells the client they are live. Is this correct?

**Answer:** **No — deployed flows and content always have Draft status in the target org and must be manually activated/published.**

**Why:** Deployment moves the artefact but does not activate it. This is a deliberate safety measure, but it's a common go-live oversight: the client believes the campaign is running when nothing is actually sending. Always include an activation step in the deployment runbook.

> ⚠️ **Distractor logic:** "Deployment activates them automatically" is the plausible-but-wrong answer — it assumes deployment and activation are the same operation.

---

## Q20 — Email Blackhole

**Question:** A consultant is testing in a sandbox and wants to prevent test emails reaching real customers. What should they enable, and what are the caveats?

**Answer:** **The Sandbox Blackhole (Setup → Blackhole → Sandbox Blackhole), which takes 10 minutes to take effect. It allows up to 5 permitted domains as exceptions, and does NOT suppress the Preview/Test window or the Debug flow window.**

**Why:** The blackhole is the safety net for sandbox testing. The two caveats matter: the 10-minute activation delay means a test sent immediately after enabling could still escape, and the Preview/Test and Debug windows bypass it entirely — so those remain a risk.

> ⚠️ **Distractor logic:** "It blocks all email including previews" is the plausible-but-wrong answer — the Preview/Test and Debug windows are explicitly not suppressed.

---

## Q21 — SMS Sender Code in Sandbox

**Question:** A consultant copies the production SMS sender code into a sandbox to test SMS. What happens?

**Answer:** **It fails — a sender code can only be active in one org. Each channel needs unique configuration per sandbox (authenticated domain, tracking domains, WhatsApp number, blockout windows).**

**Why:** Sender codes are globally unique identifiers, so they cannot be active in two orgs simultaneously. This means every sandbox needs its own channel configuration, which is a real setup cost to plan for. The same principle applies to authenticated domains and WhatsApp numbers.

> ⚠️ **Distractor logic:** "Reuse the production code to keep testing realistic" is the plausible-but-wrong answer — it sounds pragmatic but is technically impossible.

---

## Q22 — Default Domains

**Question:** A client asks which domain types Marketing Cloud Next provides out of the box. Which one is NOT provided by default?

**Answer:** **Email sending domains are NOT provided by default — you must authenticate them.** My Domain, tracker domains, and landing page domains have defaults.

**Why:** The default set covers login (`[mydomain].salesforce.com`), email links (`cdp3.tracking.e360.salesforce.com`), email images, the preference centre, landing pages, and SMS links (`sfmsg.co`). Sending domains are deliberately excluded because they must be authenticated to prove sender legitimacy — which links directly to the DKIM/SPF/DMARC setup in Q6.

> ⚠️ **Distractor logic:** "Tracker domains must be configured" is the plausible-but-wrong answer — a Salesforce-owned tracker domain is provided by default.

---

## Q23 — Tracker Domain

**Question:** A client asks how Marketing Cloud Next captures email opens and clicks. What mechanism should the consultant describe?

**Answer:** **The tracker domain, via "link rewriting" — URLs are rewritten with the tracker domain, engagement is captured, then the visitor is forwarded to the target.**

**Why:** Link rewriting is the mechanism that makes engagement tracking possible. The default tracker domain is Salesforce-owned, but a **branded** tracker domain can be configured for brand consistency. Note that SMS uses a separate tracker domain plus a URL shortener.

> ⚠️ **Distractor logic:** "A tracking pixel only" is the plausible-but-wrong answer — pixels capture opens, but clicks require link rewriting.

---

## Q24 — Domain Per Use Case

**Question:** A client wants to use one custom domain for email links, SMS links, and landing pages. What should the consultant advise?

**Answer:** **Each use case needs its own authenticated domain or subdomain — email links, SMS, and landing pages cannot share one.**

**Why:** Separate domains per use case allow independent reputation management and configuration. The practical guidance is to use the Salesforce CDN for landing pages, and to add a custom URL with the path defined as `/lp` to track activity on a custom-domain landing page.

> ⚠️ **Distractor logic:** "One domain is simpler and works fine" is the plausible-but-wrong answer — it optimises for simplicity over the platform's requirement.

---

## Q25 — Trusted Sending Identity

**Question:** A consultant is establishing a trusted sending identity. What four elements make it up?

**Answer:** **A physical mailing address · an authenticated sending domain · authenticated from addresses · branded tracking domains.**

**Why:** Each element addresses a different concern: the physical address is a **legal requirement** (CAN-SPAM, CASL, GDPR), the authenticated domain proves legitimacy, the from addresses give marketers sender choice, and branded tracking domains keep tracked links on-brand. Branded tracking domains require a **CA-signed certificate** plus a DNS certificate.

> ⚠️ **Distractor logic:** "A physical address is only needed for marketing email" is the plausible-but-wrong answer — it is required for **all** commercial email.

---

## Q26 — RMM Scope

**Question:** A client wants Reply Mail Management enabled for one campaign only. Is this possible?

**Answer:** **No — RMM applies to all messages from the authenticated domain and cannot be turned on per campaign.**

**Why:** RMM operates at the domain level, performing three functions: deleting auto-responses (out-of-office and bounce messages), optionally sending an auto-acknowledgement, and routing meaningful replies to a monitored inbox. It also automatically processes opt-out keywords (stop, unsubscribe, remove). The domain-wide scope is the tested constraint.

> ⚠️ **Distractor logic:** "Enable it per campaign" is the plausible-but-wrong answer — it assumes granular control that does not exist.

---

## Q27 — Metrics Guard Purpose

**Question:** A client's open rates look inflated by automated scanning. Which feature should the consultant enable?

**Answer:** **Einstein Metrics Guard — it uses AI to filter activity unlikely to be from humans (bot scans, security checks) so open and click rates stay meaningful. Enabled via Unified Messaging → Settings.**

**Why:** Metrics Guard protects metric integrity rather than improving deliverability. This links to Section 5's counterintuitive scoring rule: a **lower** Metrics Guard score means **more likely real**. The feature is available on both Growth and Advanced.

---

## Q28 — Send-Time Validation Failures

**Question:** A client's campaign shows "messages not sent". What are the two most likely causes?

**Answer:** **`Consent Not Given` or `Invalid From Address`.**

**Why:** These are the two documented send-time validation failures. Other signals map to different causes: **high bounces** points to domain authentication or sender configuration, and **unexpected unsubscribes** points to audience targeting or message relevance. The activation step checks send-time requirements, and warnings or errors must be resolved before sending.

> ⚠️ **Distractor logic:** "The segment is empty" is the plausible-but-wrong answer — an empty segment produces no sends at all, rather than a "not sent" validation error.

---

## Q29 — Edition Limits

**Question:** A client on Growth wants to run 600 active flows and use 2 scoring models. Is this possible?

**Answer:** **No — Growth allows 500 active flows and 1 scoring model. Advanced allows 750 active flows and 2 scoring models.**

**Why:** Both limits are exceeded on Growth. Other shared limits: **50,000 saved flows**, **50 versions per flow**, **30 fit scoring rules**, **30 engagement scoring rules**, and **10 GB + 2 GB/user CMS storage**. Email message credits differ: **180,000/yr (Growth)** vs **360,000/yr (Advanced)**. Note that **SMS credits are not included in any edition** — they are a purchasable add-on.

> ⚠️ **Distractor logic:** "Yes, if you buy more credits" is the plausible-but-wrong answer — the flow and scoring-model limits are edition gates, not purchasable quantities.

---

## Q30 — Recommended Lightning Components

**Question:** A marketer wants to see a contact's engagement score and consent status directly on the Contact record. Which components should the consultant add?

**Answer:** **Data Cloud Profile Insights (numerical engagement score) and Privacy Consent Status (subscriptions + consent values) — both available on Lead and Contact records.**

**Why:** Three components are recommended: **Privacy Consent Status**, **Data Cloud Profile Engagement** (a table of engagement metrics), and **Data Cloud Profile Insights** (the numerical score). All three are available on **Lead and Contact** records only.

> ⚠️ **Distractor logic:** "Add them to the Account page" is the plausible-but-wrong answer — account scores cannot be added to account pages.

---

## Q31 — Profile Insights Measure Fields

**Question:** A consultant is configuring the Data Cloud Profile Insights component. Which Measure field maps to the Overall Marketing Score?

**Answer:** **`People_Score__c`.** (Marketing Engagement Score → `Engagement__Score__c`; Marketing Fit Score → `Fit_Score__c`.)

**Why:** The component must be configured **per score type**, so each score needs its own Measure field mapping. The three mappings are memorised facts. Note the related configuration for Data Cloud Profile Engagement: Match On (Lead ID or Contact ID), Data Space (default), Unified Individual DMO, Unified Individual Link, and Engagement DMOs (Flow Runs + Messaging Engagement).

> ⚠️ **Distractor logic:** `Engagement__Score__c` is the plausible-but-wrong answer — it is the *Engagement* score, not the *Overall* score.

---

## Q32 — Data Kits

**Question:** A consultant is setting up a new org and asks what data kits provide. What should they explain?

**Answer:** **Data kits are pre-built bundles that install the data plumbing (DMOs, mappings, streams) for a use case — and data streams auto-deploy with them.**

**Why:** Data kits are the foundation layer that everything else binds to, which is why they install first (Q14). The auto-deployment of data streams removes a manual step. Recognising that kits are *use-case bundles* rather than raw connectors explains why different implementations install different kits.

---

## Q33 — Channel Add-Ons

**Question:** A client wants to send SMS, WhatsApp, and mobile app messages. Which channels require a paid add-on?

**Answer:** **SMS (Salesforce Message Credits - SMS), WhatsApp (Salesforce Message Credits - WhatsApp), and Mobile App Messaging (Salesforce Message Credits - Mobile App Regional, Advanced Edition). Email and Landing Pages are included.**

**Why:** Only email and landing pages are included in the base product. Each non-email channel needs its own add-on, and Mobile App Messaging additionally requires the **Advanced** edition. This is a scoping question — the exam tests whether you know which channels are "free" versus metered.

> ⚠️ **Distractor logic:** "All channels are included with message credits" is the plausible-but-wrong answer — it assumes a single credit pool covers every channel.

---

## Q34 — Government Cloud Restrictions

**Question:** A public-sector client on Government Cloud wants to use SMS and WhatsApp. Is this supported?

**Answer:** **No — SMS, WhatsApp, and Mobile App Messaging are not supported in Government Cloud. Email and Landing Pages are supported.**

**Why:** The restriction applies to all three non-email channels. This is a hard platform constraint that must be surfaced during scoping, since a public-sector client may assume channel parity with commercial orgs.

> ⚠️ **Distractor logic:** "All channels are available with the right add-on" is the plausible-but-wrong answer — the restriction is platform-level, not commercial.

---

## Q35 — SMS Code Types

**Question:** A client needs a 10-digit US SMS number. What must they request, and what is the lead time?

**Answer:** **A long code — it requires associated Brand + Campaign + Code requests, and existing 10-digit codes cannot be ported. Registration can take weeks.**

**Why:** Long codes carry more registration requirements than short codes. By contrast, **short codes** (US/Canadian) can be requested new or ported, require no brand/campaign, and are registered via a Salesforce Services agreement or Mobile Approved Partner. The "weeks" lead time is the planning detail the exam tests.

> ⚠️ **Distractor logic:** "Port an existing 10-digit number" is the plausible-but-wrong answer — long codes cannot be ported.

---

## Q36 — WhatsApp Setup

**Question:** A consultant is configuring WhatsApp. What are the setup steps?

**Answer:** **Setup → "Your" → Your Numbers · install the required managed packages for consent and engagement · create/connect a WhatsApp Business Account · review consent validation settings (Setup → "Channels" → WhatsApp).**

**Why:** The sequence matters because the managed packages must be installed before the business account is connected. The consent validation review is the step most often skipped, and it links directly to Section 2's consent model.

---

## Q37 — Mobile App Messaging

**Question:** A client wants mobile push notifications. What are the platform requirements?

**Answer:** **Advanced Edition plus the Mobile App Regional add-on, and the org must be hosted in Germany or the United States.**

**Why:** The hosting restriction is the easily missed constraint — a client on another instance region cannot use the feature regardless of edition or add-on. Configuration covers iOS (APNs: Environment Type, Key Type, certificate, Key ID, Team ID, Bundle ID) and Android (FCM: Firebase Developer certificate).

> ⚠️ **Distractor logic:** "Available in any hosted instance" is the plausible-but-wrong answer — the Germany/US restriction is absolute.

---

## Q38 — Custom Mobile App Events

**Question:** A consultant has activated a custom mobile app event and now wants to delete one of its attributes. Is this possible?

**Answer:** **No — once an event attribute is activated, it cannot be deleted. You can deactivate (but not delete) active events.**

**Why:** The immutability mirrors the marketing object rule (Section 3, Q32): activation is a one-way door for structural changes. Custom events track button clicks, screen views, and purchases, so the attribute schema must be designed before activation.

> ⚠️ **Distractor logic:** "Deactivate the event, then delete the attribute" is the plausible-but-wrong answer — deactivation does not unlock deletion.

---

## Related

- [[exam-revision-summary]] — Section 1 summary
- [[section-2-consent]] — next guide
- `Exam Section Based Flashcards/section-1-platform-setup-governance` — recall drilling