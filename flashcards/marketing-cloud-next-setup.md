# Flashcards — Marketing Cloud Next Setup & Data Foundation

## Card: Admin Roles
**Q:** What three admin roles are involved in Marketing Cloud Next setup?
**A:** Salesforce admin (System Administrator profile), Data Cloud admin (installs data kits, deploys streams, configures identity resolution & scoring), and Marketing admin (Marketing Cloud Admin permission set).

## Card: Core Differentiator
**Q:** What makes Marketing Cloud Next fundamentally different from legacy email tools?
**A:** It's built natively on **Data Cloud**, so data unification, identity, segments, and AI all depend on the Data Cloud foundation.

## Card: Enable Prerequisites
**Q:** What two things must be enabled before accessing required/additional setup settings?
**A:** Enable **Data Cloud** and enable **Marketing Cloud Next** in Basic Settings.

## Card: Data Kit
**Q:** What is a data kit, and what does installing one trigger?
**A:** A pre-built package of DMOs, fields, and data connections. Installing auto-deploys its related data streams in Data Cloud.

## Card: Always-Required Data Kits
**Q:** Which data kits are always required regardless of channel add-ons?
**A:** Marketing Setup Objects, Consent Objects, Flows Integration, Email Channel, and Sales (accounts/leads/contacts). SMS/WhatsApp kits only for those add-ons.

## Card: Identity Resolution Purpose
**Q:** What does an identity resolution ruleset do?
**A:** Defines relationships among DMOs/fields so Data Cloud unifies related/duplicate records into Unified Individual records for targeting.

## Card: Individual Ruleset Rules
**Q:** What three match rules are in a generated Individual ruleset?
**A:** Normalized Email, Lead to Contact, and Device to Known.

## Card: Ruleset Billing
**Q:** Why does Salesforce recommend one ruleset per object?
**A:** Identity resolution consumes Data Cloud credits; two active rulesets per object doubles billing.

## Card: Permission Sets
**Q:** What's the key difference between Marketing Cloud Admin and Marketing Cloud Manager?
**A:** Admin gets Salesforce Setup access; Manager gets full control on campaigns/segments/flows but no full Setup access.

## Card: Content Roles
**Q:** Which CMS content role can manage users and sharing?
**A:** **Content Admin** (also creates/publishes all content and assigns default brand).

## Card: Identity-licensed Permission Sets
**Q:** What two permission sets must an Identity-licensed marketing user receive?
**A:** Marketing Cloud Manager + Tableau Next Included App Business User.

## Card: Email Requirements
**Q:** What three things are required to send email?
**A:** Authenticate a sending domain, verify a From address, and provide a physical address.

## Card: DKIM/SPF/DMARC
**Q:** What do DKIM, SPF, and DMARC each do?
**A:** DKIM adds a digital signature; SPF verifies the sending server is authorized; DMARC tells receivers how to handle failures.

## Card: RMM Unsubscribe Terms
**Q:** What triggers auto-unsubscribe in Reply Mail Management?
**A:** A manual reply containing unsub/unsubscribe/opt-out/remove/stop in the first 200 characters.

## Card: SMS Long Code
**Q:** What three requests are needed for a 10-digit US long code?
**A:** Brand Request, Campaign Request, and Code Request.

## Card: Government Cloud
**Q:** Which channels are NOT supported in Government Cloud?
**A:** SMS, WhatsApp, and Mobile App Messaging.

## Card: Consent Import Scope
**Q:** What does a single consent import correspond to, and what can't it do?
**A:** One channel + one subscription + one status. It can't create new leads/contacts — only updates existing contact points.

## Card: E.164
**Q:** What phone format is required for SMS/WhatsApp consent imports?
**A:** ITU E.164 with country code, e.g. +12065550123.

## Card: Web Tracking Activities
**Q:** What four activities does web tracking track?
**A:** Page views, form submissions, link clicks, button clicks.

## Card: Consent Cookie
**Q:** What cookie stores the tracking consent decision?
**A:** `sfmc_consent` (True = opted in, False = opted out/ignored).

## Card: Scoring Components
**Q:** What are the three score types?
**A:** Engagement Score, Fit Score, and Overall Marketing Score (normalized 0–100).

## Card: Scoring Case Sensitivity
**Q:** How must attribute values be entered in scoring rules?
**A:** Exact, case-sensitive — e.g. "UNSUBSCRIBE" not "unsubscribe".

## Card: Account Scoring Availability
**Q:** Which edition supports account scoring?
**A:** Advanced edition only.

## Card: Einstein Advanced-only
**Q:** Which three Einstein features are Advanced edition only?
**A:** Engagement Scoring, Engagement Frequency, and (partially) Send Time Optimization global model opt-out.

## Card: Metrics Guard Score
**Q:** Does a low or high Metrics Guard score indicate a real click?
**A:** **Low** score = higher confidence it's real (high = machine-generated).

## Card: Sandbox Deploy Order
**Q:** Which objects deploy first from sandbox to production?
**A:** Data Cloud objects first (segments, DMOs, data graphs, calculated insights), then Marketing Cloud Next objects.

## Card: Blackhole
**Q:** What does the sandbox email blackhole do?
**A:** Prevents test emails reaching real customer addresses (with up to 5 allowed domains); doesn't suppress Preview/Test or Debug flow sends.

## Card: Edition Flows
**Q:** How many active flows do Growth vs. Advanced allow?
**A:** Growth 500, Advanced 750.

## Card: Contact Point vs Source Priority
**Q:** What's the difference between contact point *selection* and *source priority order*?
**A:** Selection = which objects/fields (email, phone, MAID…) are included in an activation; source priority = which *value* wins when a contact has that data from multiple sources.

## Card: Reconciliation vs Contact Points
**Q:** Why can't reconciliation rules determine which contact point to deliver?
**A:** Reconciliation rules only reconcile Unified Individual *object* fields — NOT unified contact point objects. Source priority controls contact-point delivery.

## Card: Priority Value Options
**Q:** What do "Primary", "Personal", and "Business" priority values depend on?
**A:** Primary = Primary Flag mapped in Data Streams; Personal = For Personal Use field = 1; Business = For Business Use field = 1 (Any = no Primary Flag mapped).

## Card: Remove Any Source
**Q:** What happens when you remove "Any Source/Any Type" from source priority?
**A:** The activation uses only specific sources, so the population count drops (fewer sources = fewer matches).

## Card: Fixed Default Priority
**Q:** Which platforms have a fixed (unchangeable) default source priority order?
**A:** B2C Commerce Cloud and MobilePush (MC Engagement → Primary).

## Card: Contact Point EMAIL Platforms
**Q:** Which activation targets accept the Email Address contact point?
**A:** Cloud File Storage, External Platform, Marketing Cloud Personalization, and Marketing Cloud Engagement.

## Card: Functional Subdomains
**Q:** What are the three functional subdomains and their inbound purpose?
**A:** `reply` (reply handling), `bounce` (bounce notifications), `leave` (unsubscribe requests) — each needs a CNAME to `…inbound.[tenant].mx.salesforce.com`.

## Card: DMARC Root Domain Risk
**Q:** Why is applying `p=reject` DMARC at the root domain risky?
**A:** It affects ALL corporate email from that domain; misconfiguration can fail legitimate mail — coordinate with IT.

## Card: Shared vs Dedicated IPs
**Q:** How does Marketing Cloud Next handle shared vs. dedicated IPs?
**A:** Starts on shared IPs; automatically assigns dedicated IPs based on volume; continuously rebalances traffic across pools based on volume and delivery trends (managed — no manual IP management).

## Card: Domain vs IP Reputation
**Q:** Why must you warm your domain even though IPs are managed automatically?
**A:** Major mailbox providers now use domain reputation as the PRIMARY sender-reputation signal (IP reputation is a fallback for unknown domains).

## Card: Warming Start Volume
**Q:** What's the recommended starting volume for a brand-new sending domain?
**A:** No more than a few hundred emails per day, using a slow, methodical approach.

## Card: Warming Schedule Day 1-3
**Q:** What's the daily max volume on days 1–3 of the warming schedule?
**A:** 500 emails (then 1,000 on days 4–5, 1,500 day 6, 2,000 day 7, 2,500 day 8).

## Card: Reputation Targets
**Q:** What are the bounce-rate and complaint-rate targets?
**A:** Bounce rate < 2%; complaint rate < 0.1%.

## Card: Spam Trap Types
**Q:** What are the two spam-trap types and what does each signal?
**A:** Honeypot (created to catch spammers → opt-in/purchased-data issues) vs. Recycled (reused after 6–12 months inactivity → list hygiene issues).

## Card: List-Unsubscribe Requirements
**Q:** What three things does one-click List-Unsubscribe require?
**A:** List-Unsubscribe + List-Unsubscribe-Post headers, HTTPS, and a DKIM signature.

## Card: DKIM Key Strength
**Q:** What DKIM key size does Marketing Cloud Next use by default, and which records carry it?
**A:** 2048-bit keys, carried by the 3 outbound CNAME records (s1/s2/s3-e360).

## Card: DMARC Required?
**Q:** Is DMARC required to activate a domain in Marketing Cloud Next?
**A:** No — recommended but not required to activate; however, it IS required for bulk senders (Gmail/Yahoo).

Related
- [[marketing-cloud-next-overview]]
- [[data-kits-and-data-streams]]
- [[identity-resolution-rulesets]]
- [[scoring-models]]
- [[ai-features]]
- [[sandbox-and-deployment]]
