# Flashcards — Section 1: Platform Setup & Governance (13%)

> **Exam weight: 13%.** Covers editions, permission sets, business units, CMS workspaces, domain authentication, and IP infrastructure.
> **Related concept pages:** [[marketing-cloud-next-overview]] · [[user-access-and-permission-sets]] · [[business-units]] · [[email-domain-authentication]] · [[domain-settings]] · [[domain-warming-ip-infrastructure]] · [[data-kits-and-data-streams]]

---

## Editions & Environment

## Card: Marketing Cloud Next Editions
**Q:** Which Salesforce editions and product tiers support Marketing Cloud Next?
**A:** Enterprise and Unlimited editions, with either the **Growth** or **Advanced** product tier.

## Card: Growth vs Advanced
**Q:** What is the core difference between the Growth and Advanced tiers?
**A:** Growth is the standard tier; **Advanced** unlocks extra capabilities — Business Units, Engagement Scoring/Frequency, on-canvas insights, Path Experiments, and higher marketing-object storage limits.

## Card: Built On What
**Q:** What platform is Marketing Cloud Next built natively on?
**A:** Salesforce **Data Cloud (Data 360)** — it is not a standalone product bolted onto the old Marketing Cloud.

## Card: Install Order
**Q:** What must be installed first when setting up Marketing Cloud Next, and what follows automatically?
**A:** **Data kits** install first (the data plumbing); **data streams** auto-deploy afterwards.

## Card: Data 360 Provisioning
**Q:** What are the two Data 360 provisioning models to know for the exam?
**A:** A **core-org** configuration (Data 360 in the same org) versus a **Data Cloud One / companion-org** configuration. ⚠️ This is a thin spot in the source material — know that provisioning model is an explicit exam objective.

---

## Permission Sets & Access

## Card: Two Permission Sets
**Q:** What are the two core Marketing Cloud Next permission sets and how do they differ?
**A:** **Marketing Cloud Admin** (includes Setup access) and **Marketing Cloud Manager** (campaigns, segments, and flows only — no Setup).

## Card: Content Roles vs Permission Sets
**Q:** How do CMS content roles differ from permission sets?
**A:** Content roles (**Content Admin / Manager / Author**) are separate from permission sets and govern what a user can do with CMS content, not platform access.

## Card: Identity-Licensed Users
**Q:** What is an identity-licensed user in Marketing Cloud Next?
**A:** A user licensed to access identity-resolved profile data — relevant when granting access to unified individual records.

## Card: Marketing Triggers Permission
**Q:** Which permission set is needed to work with Marketing Triggers?
**A:** The **Marketing Triggers Admin** permission set.

---

## Business Units

## Card: Business Unit Edition
**Q:** Which edition tier is required for Business Units?
**A:** **Advanced** only.

## Card: Business Unit Mapping
**Q:** What is the relationship between a Business Unit and a data space?
**A:** A **1:1 mapping** — one Business Unit equals one data space, which provides data isolation.

## Card: Business Unit Limit
**Q:** What is the maximum number of Business Units, and can they be reactivated?
**A:** Maximum **150**. Deactivation is **permanent** — you cannot reactivate a deactivated Business Unit.

## Card: Last Business Unit
**Q:** Can you deactivate the last remaining Business Unit?
**A:** No — the system prevents deactivating the final Business Unit.

## Card: Business Unit Member Roles
**Q:** What are the two Business Unit member roles and how do they differ?
**A:** **Marketer-Standard** (can activate flows) and **Marketer-ReadOnly** (cannot activate flows).

---

## Enhanced CMS Workspaces

## Card: Workspace Sharing Direction
**Q:** How does sharing work between Enhanced CMS workspaces?
**A:** You share from a **source** workspace to a **target** workspace.

## Card: Non-Transitive Sharing
**Q:** What does "sharing is non-transitive" mean for CMS workspaces?
**A:** If you share workspace A to B, and B to C, C does **not** automatically get A's content. You must share the source to **each** target individually.

## Card: CMS Roles
**Q:** What are the three Enhanced CMS workspace roles?
**A:** **Content Admin**, **Content Manager**, and **Content Author**.

---

## Domain Authentication

## Card: What Gets Authenticated
**Q:** What exactly do you authenticate in Marketing Cloud Next?
**A:** The **sending subdomain** — via DKIM, SPF, and DMARC records.

## Card: DNS Propagation
**Q:** How long can DNS propagation take after adding authentication records?
**A:** Up to **48 hours**.

## Card: Functional Subdomains
**Q:** Name the three functional subdomains and what each handles.
**A:** **reply** (replies) · **bounce** (bounces) · **leave** (unsubscribes). Each requires its own CNAME record.

## Card: DKIM Key Strength
**Q:** What key strength does Marketing Cloud Next use for DKIM, and how is it configured?
**A:** **2048-bit**, configured via **3 outbound CNAME records**.

## Card: DMARC Requirement
**Q:** Is DMARC required to activate a sending domain?
**A:** No — DMARC is **recommended** but not required to activate.

## Card: Branded Tracking Domain
**Q:** What is a branded tracking domain and what does it need?
**A:** A custom domain used for click/open tracking links, secured with a **CA-signed certificate**.

---

## IP Infrastructure & Reputation

## Card: Managed Dedicated IPs
**Q:** How are managed dedicated IPs assigned in Marketing Cloud Next?
**A:** They are **auto-assigned by volume**, with **continuous rebalancing** across the pool.

## Card: Primary Reputation Signal
**Q:** What is the PRIMARY signal for domain reputation?
**A:** **Domain reputation** (not IP reputation) is the primary signal.

## Card: Domain Warming Start
**Q:** How should you start a domain warming program?
**A:** Begin with a **few hundred sends per day** and ramp gradually.

## Card: Reputation Targets
**Q:** What are the target bounce and complaint rate thresholds?
**A:** Bounce rate **< 2%** and complaint rate **< 0.1%**.

## Card: List Hygiene Cutoff
**Q:** What engagement cutoff is recommended for list hygiene?
**A:** **6 months** of no engagement.

---

## Marketing Cloud Portfolio & Configuration

## Card: Marketing Cloud
**Q:** Is Marketing Cloud a product?
**A:** ⚠️ **No — it's the portfolio brand.** It contains four products: **Marketing Cloud Next** (← MCE), **Salesforce Personalization** (← MC Personalization), **Marketing Intelligence** (← MC Intelligence), and **Loyalty Management** (no-code B2B/B2C loyalty).

## Card: Configuration Steps
**Q:** How many configuration steps are there, and which are automated?
**A:** **Six** minimum. The **Setup Assistant** automates the first three: set up Data 360, enable Marketing Cloud, deploy required data streams. Then add the **physical address** and create an **authenticated domain**.

## Card: Two Permission Sets Before Configuration
**Q:** Which two permission sets must be assigned before configuring MC Next?
**A:** **Data Cloud Architect** (Data 360 setup, data modelling, data kits, streams, identity resolution) + **Marketing Admin** (most marketing Setup settings, publish/activate campaigns & segments).

## Card: Data Cloud Architect Rename
**Q:** What replaced the Data Cloud Admin permission set?
**A:** **Data Cloud Architect** — renamed in the **Spring '26 release**. ⚠️ System Administrator is a **profile**, not a permission set.

## Card: Authorized vs Authenticated Domain
**Q:** What's the difference between an authorized and an authenticated email domain?
**A:** **Authenticated** = full DKIM/DNS sending configuration. **Authorized** = ownership only (one verification record, no sending config), required for **dynamic From/Reply-to addresses**.

## Card: DMARC Alignment Failure
**Q:** What causes a DMARC alignment failure?
**A:** Using a **personal email address on the root domain** as the From address — the From domain must align with the **authenticated sending domain**.

## Card: CMS Content Workspaces
**Q:** Where is all marketing content stored, and what is each workspace tied to?
**A:** In **CMS content workspaces**, each associated with a **specific business unit**.

## Card: Content Cardinalities
**Q:** What are the cardinalities between data spaces, business units, and content workspaces?
**A:** Data space → **no business unit or one**. Business unit → **one or more content workspaces**.

## Card: Cross-Business-Unit Content
**Q:** How do you share content across business units?
**A:** ⚠️ Content **can't be accessed directly across business units**. Post it as a **common asset** (available to all units), then **copy it into the target workspace**.

## Card: Business Unit Role Content Access
**Q:** Which business unit role gets CMS content access?
**A:** **Marketing Standard** = data space + CMS content. **Marketing Read-Only** = data space only. ⚠️ Users without Marketing Manager/Admin permission sets can **only** be Read-Only.

## Card: Content Must Be Published
**Q:** What must happen before content can be used, and what does publishing a form do?
**A:** Content must be **published** (saving isn't enough). Publishing a **form activates its associated flow**.

---

## Related

- [[exam-revision-summary]] — Section 1 summary
- [[section-2-consent]] — next deck
- `flashcards/marketing-cloud-next-setup` — topic-based deep dive