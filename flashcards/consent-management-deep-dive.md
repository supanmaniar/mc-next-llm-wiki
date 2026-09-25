# Flashcards — Consent Management Deep Dive

## Card: Consent Storage Location
**Q:** Where is Marketing Cloud Next consent data stored?
**A:** In Data Cloud, in the Communication Subscription Consent (CSC) Data Model Object (DMO).

## Card: Consent Composite Key
**Q:** What two things does Marketing Cloud Next consent key on?
**A:** The Contact Point value (email/phone/device ID) + the Communication Subscription Channel Type (CSCT) ID.

## Card: Why Not PartyID
**Q:** Why is consent intentionally agnostic of PartyID?
**A:** A single email/phone can map to multiple individuals (shared household, merges). Keying on the individual would require resolving whose preference "wins"; keying on the address is conservative and regulator-friendly (any opt-out on the address = address opted out).

## Card: Shared Address Opt-Out
**Q:** What happens when two people share one email and one opts out?
**A:** The opt-out affects all of them — there's no way to send to some and suppress others sharing the same address.

## Card: Audit Trail vs DMO
**Q:** What's the key difference between the Consent Audit Trail and the CSC DMO?
**A:** The Audit Trail is append-only (historical record of every change); the CSC DMO stores current status and is updated in place.

## Card: Audit Trail PartyId
**Q:** Why is PartyId blank in audit trail rows?
**A:** Consent is keyed on Contact Point value + CSCT ID, so PartyId is written blank by design — even for Lead/Contact records.

## Card: Audit Trail Actor
**Q:** How do you attribute "who" made a consent change?
**A:** There's no UserId/ActorId field. Use caller-provided source attribution (ConsentCapturedSourceType, ConsentCapturedSourceName, ConsentCapturedSourceDetails, SenderId).

## Card: Audit Trail Deletion
**Q:** How do you delete audit trail rows for GDPR?
**A:** Use the Consent API "ShouldForget" endpoint on the Individual — flags the individual, async deletion across DMOs, reprocessed at 30/60/90 days, permanent. No UI for bulk deletion (engage Support).

## Card: Rejected Audit Rows
**Q:** What are three common causes of rejected audit rows?
**A:** Wrong object mapping, date-format issues, and status case mismatch ("OptIn" instead of "OPT_IN").

## Card: Create Consent Inputs
**Q:** What are the four input parameters of the Create Consent action?
**A:** Consent Status, Contact Point, Channel, and Communication Subscription.

## Card: Create Consent Availability
**Q:** In which three flow types is Create Consent/Consent Request available?
**A:** Data Cloud-Triggered Flows, Automation Event-Triggered Flows, and On-Demand Flows.

## Card: Unsupported Consent Writes
**Q:** Name the unsupported consent write paths.
**A:** Data Stream mapped to Consent DLO; Bulk Ingestion API to Consent DMO; Batch Data Transform to a DLO mapped to CSC DMO; legacy MessagingConsent/MessagingConsentV2 actions.

## Card: Consent at Scale
**Q:** What's the recommended 2-step process for consent at scale (millions of records)?
**A:** 1) Initial data load into Data Cloud (Batch Data Transform creates records in the consent DLO). 2) Data Cloud-Triggered Flow with Create Consent to write consent so it's honored at send time.

## Card: CSV Import Limit
**Q:** What's the CSV consent import limit and purpose?
**A:** 50,000 rows per file, intended for one-time loads — not sustained high-volume sync.

## Card: contactPointValue Error
**Q:** What does "contactPointValue provided value cannot be formatted" mean?
**A:** The Contact Point field must reference a contact point value (e.g., an email address), not a contact point ID (e.g., Contact Point Email ID).

## Card: Double Opt-In Steps
**Q:** What are the two steps of double opt-in?
**A:** 1) Submit sign-up form + receive transactional confirmation email. 2) Click the confirmation link to verify intent — only then is consent recorded.

## Card: DOI Confirmation Email Purpose
**Q:** Why must the DOI confirmation email be Transactional?
**A:** Only Transactional emails can be sent to contacts without confirmed consent; Promotional would fail delivery for unconfirmed contacts.

## Card: Wait Until Event
**Q:** What does the Wait Until Event step monitor in a DOI flow?
**A:** The transactional confirmation email (flow action to monitor) and the opt-in confirmation link/CTA (link to monitor).

## Card: Preference Page Unsubscribe Event
**Q:** Why might Email Opt-Out Rate look lower than expected?
**A:** Preference Page unsubscribes are processed as consent updates, not Email Engagement Unsubscribe events — so they're not included in the Email Opt-Out Rate.

## Card: Preference Page Limits
**Q:** What are the customization limits of out-of-the-box preference pages?
**A:** Limited branding; no URL-parameter pre-population; limited thank-you page customization; no multi-channel per page; no coding languages (AMPscript/Apex); can't revert a published custom page.

## Card: Preference Page Localization
**Q:** How do you localize a Preference Page?
**A:** Use multiple Preference Pages (one per language) with dynamic rules to surface the right URL based on a language-preference field in Data Cloud.

## Card: Email Opt Out Sync
**Q:** Does the Contact/Lead Email Opt Out field (HasOptedOutOfEmail) auto-sync with MC Next consent?
**A:** No — you need a two-Flow bridge: Flow 1 (Automation Event-Triggered, CRM→MC Next) and Flow 2 (Data Cloud-Triggered, MC Next→CRM).

## Card: Flow 1 Event
**Q:** What event does Flow 1 (CRM→MC Next consent sync) use?
**A:** The "Prospect, Lead, Contact or Related Record Change" event in an Automation Event-Triggered Flow, with a Consent Request Action.

## Card: Hybrid Consent Mapping
**Q:** What tool synchronizes consent between Marketing Cloud Engagement and MC Next?
**A:** The Consent Mapping tool (Email and SMS available today).

## Card: Transactional Consent Check
**Q:** When is consent evaluated for transactional emails?
**A:** The transactional consent check is off by default, but if a Communication Subscription is populated at send time, consent is evaluated even when the global setting is disabled.

## Card: Transactional SMS Consent
**Q:** Does transactional SMS (OTP, 2FA) require consent?
**A:** Yes — under TCPA and most carrier rules, transactional SMS still requires consent.

## Card: Opt-Out Scope
**Q:** At what level does MC Next record opt-outs?
**A:** Communication Subscription level — there's no account-level or channel-level opt-out today.

## Card: Spam Complaint / RMM
**Q:** How do spam complaints (FBL) and Reply Mail Management affect consent?
**A:** They opt the recipient out of all of their current subscriptions (subscription level, individually).

## Card: Consent Segmentation
**Q:** How do you segment on consent data?
**A:** Direct segmentation isn't supported — build a Calculated Insight on consent data and use it in the segment filter (metered, consumes credits).

## Card: Consent Package Install
**Q:** What two prerequisites must be met before the consent package installs cleanly?
**A:** Data Protection enabled, and Data Cloud Salesforce Connector permissions (Read + View All Records) on Communication Subscription, Communication Subscription Channel Type, and Engagement Channel Type.

## Card: Consent Streams NEEDS_ACTIVATION
**Q:** Why do consent data streams fail to ingest on new sandboxes?
**A:** They're in NEEDS_ACTIVATION state because connections aren't activated by default — activate each stream in Data Cloud Setup.

## Card: Consent Ingestion Credits
**Q:** Does ingesting consent via the internal Salesforce connector consume credits?
**A:** No — as of Aug 7, 2025, it's included with Data 360. External-source ingestion (Snowflake, S3) does consume credits.

## Card: Deploy Communication Subscriptions
**Q:** Can you deploy Communication Subscriptions between orgs?
**A:** No — they're stored as data in the Communication Subscription DMO, and only metadata deploys to a sandbox.

## Card: Consent Troubleshooting Step 1
**Q:** What's the first step of consent troubleshooting?
**A:** Confirm the consent record in the CSC DMO (Data Cloud > Data Explorer > Communication Subscription Consent DMO), filtered by contact point value and CSCT ID.

## Card: Consent Repair Paths
**Q:** How do you repair consent by volume?
**A:** Single/small set → Consent Status LWC; ≤50k rows → Consent Import CSV; >50k rows → stage into a custom DMO then run a Data Cloud-Triggered Flow calling Create Consent.

## Card: Salesforce Consent Model Levels
**Q:** What are the four levels of the Salesforce consent data model?
**A:** Global Consent (Individual), Engagement Channel Consent (ContactPointTypeConsent), Contact Point Consent (ContactPointConsent), Data Use Purpose (DataUsePurpose). Brand (BusinessBrand) is not a consent object but distinguishes brands.

## Card: DMO Field Mapping Guardrail
**Q:** Why can't you map external consent data directly into the Communication Subscription Consent DMO?
**A:** Although the data appears to save successfully, MC Next ignores it during message sends — the transactional consent service never registers the change, causing silent dropouts, compliance violations, and UI misalignment.

## Card: 3-Flow Purpose
**Q:** What three flows keep CRM, Data 360 and MC Next consent in sync?
**A:** 1) New Registration Automation (Data Cloud-Triggered) establishes baseline consent; 2) MC Next → CRM mirrors preference page/unsubscribe changes; 3) CRM → MC Next pushes back-office CommSubscriptionConsent edits upstream.

## Card: Flow 1 Trigger
**Q:** What triggers Flow 1 (New Registration Automation) and what does its Decision evaluate?
**A:** A created `ssot_Individual__dlm` record in Data Cloud; the Decision evaluates the related CRM CommSubscriptionConsent's Privacy Consent Status to branch the Create Consent action.

## Card: Consent Keyed to Contact Point
**Q:** Why must Flow 1 map the contact point dynamically from the retrieved email record?
**A:** MC Next consent is bound to the contact point (email value), not the Lead/Contact record — so the Create Consent action needs the retrieved email address, never a hard-coded ID.

## Card: Flow 2 Action
**Q:** Which action does Flow 2 (MC Next → CRM) use, and what values does it write?
**A:** A standard Update Records action on the CRM core object: sets Privacy Consent Status to Opt In when Data Cloud Consent Status is True, and Opt Out when False.

## Card: Flow 2 Trigger Object
**Q:** What triggers Flow 2?
**A:** An updated `ssot_CommunicationSubscriptionConsent__dlm` record in Data Cloud — caused by a preference page submission or an unsubscribe URL click in an email campaign.

## Card: Flow 3 Trigger and Anchor
**Q:** What triggers Flow 3 and where is the object anchor set?
**A:** An updated CRM CommSubscriptionConsent record; Automation Event-Triggered Flow with the anchor set to Consent Giver ID (Contact).

## Card: Flow 3 Suppression
**Q:** How does Flow 3 stop future sends after a back-office opt-out?
**A:** The Create Consent action sets Opt Out, telling the transactional engine to treat the contact point as suppressed, immediately preventing future campaign deployment.

## Card: Unsupported vs Supported Sync
**Q:** What's the only supported route for consent updates into MC Next?
**A:** Native Create Consent Flow Actions inside Data Cloud-Triggered Flows or Automation Event-Triggered Flows — never direct DMO field mapping via data streams or batch transforms.

## Related
- [[consent-and-compliance]]
- [[consent-data-model]]
- [[consent-write-paths]]
- [[consent-audit-trail]]
- [[consent-double-opt-in]]
- [[consent-preference-pages]]
- [[consent-sync-hybrid]]
- [[consent-segmentation]]
- [[consent-setup-billing]]
- [[consent-channels-troubleshooting]]
- [[consent-sync-3-flow]]
