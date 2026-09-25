# Consent Sync: The 3-Flow Architecture

## Core Idea
Salesforce CRM, Data 360 and Marketing Cloud Next stay in sync through **three dedicated flows** — because consent can only be written to MC Next via the native **Create Consent** action (Data Cloud-Triggered or Automation Event-Triggered), never by mapping fields straight into the CSC DMO.

## Prerequisites
- [[consent-write-paths]] — why Create Consent is the only honored write path
- [[consent-data-model]] — CSC DMO, contact-point-value keying, Privacy Consent Status
- [[consent-sync-hybrid]] — the two-Flow Email Opt Out bridge (conceptual predecessor)
- [[campaigns-and-flows]] — flow types and elements
- [[contact-points-activation]] — how contact points (email) are selected for delivery

## Detailed Explanation

### The Golden Rule (Architectural Guardrail)
With MC Next, consent is **highly structured, multi-channel, and bound to Contact Points** (a unique email address or phone number) rather than to the Lead/Contact record itself. You **cannot** map external consent data directly into the **Communication Subscription Consent DMO** via data streams or batch data transforms.

Although the data *appears* to save successfully in the DMO, MC Next **ignores it during message sends**, producing three compliance failures:

| Failure | Result |
|---|---|
| **Silent Dropouts** | Emails fail to send to fully opted-in addresses |
| **Compliance Violations** | Emails sent to opted-out individuals — the transactional consent service never registered the change |
| **UI Misalignment** | DMO data mismatches the Consent Status component on individual records |

**The only supported route:** consent updates within MC Next execute **exclusively** via native **Create Consent Flow Actions** inside either a **Data Cloud-Triggered Flow** or an **Automation Event-Triggered Flow**.

### The E-Commerce Context
Salesforce CRM holds the standard **Communication Subscription Consent (CommSubscriptionConsent)** object as the core transactional repository. Its `Privacy Consent Status` field carries the Opt In / Opt Out signal, and `Consent Giver ID` links consent to an Individual. The goal: real-time, **bi-directional** sync among CRM, Data 360 and MC Next.

### Flow 1 — New Registration Automation (Data Cloud-Triggered)
Establishes the baseline consent state when a new customer record is processed in Data Cloud.

- **Trigger Object:** `ssot_Individual__dlm` (created)
- **Steps:**
  1. **Get Records** — query `ssot_ContactPointEmail__dlm` where `Party` = triggering Individual Id.
  2. **Get Records** — query CRM `CommSubscriptionConsent` where `Consent Giver ID` = triggering Individual Id.
  3. **Decision** — evaluate CRM `Privacy Consent Status`.
- **Branches (Create Consent action, Channel = Email, Contact Point mapped dynamically from the retrieved email record):**
  - **Opt In** → Consent Status = `Opt In`
  - **Opt Out** → Consent Status = `Opt Out`

### Flow 2 — Reflect MC Next Preferences in CRM (Data Cloud-Triggered)
Pushes MC Next-side changes (preference page submissions, unsubscribe URL clicks) downstream to the CRM.

- **Trigger Object:** `ssot_CommunicationSubscriptionConsent__dlm` (updated)
- **Steps:**
  1. **Get Records** — query CRM `CommSubscriptionConsent` where core `Consent Giver ID` = triggering `ssot_CommunicationSubscriptionConsent__dlm > Party` ID; store `Id` and `PrivacyConsentStatus`.
  2. **Decision** — is the triggering Data Cloud `Consent Status` equal to **True**?
- **Branches (standard Update Records on the CRM core object):**
  - **True (Consent Given)** → CRM `Privacy Consent Status` = **Opt In**
  - **False (Consent Revoked)** → CRM `Privacy Consent Status` = **Opt Out**

### Flow 3 — Reflect CRM Updates in MC Next (Automation Event-Triggered)
Forces back-office changes (customer service agent or external API editing a CRM CommSubscriptionConsent record) upstream into MC Next.

- **Trigger Object:** CRM `CommSubscriptionConsent` (updated); object anchor set to `Consent Giver ID (Contact)`.
- **Steps:**
  1. **Get Records** — query the CRM Contact where Contact ID = triggering record's Consent Giver ID.
  2. **Decision** — evaluate the triggering record's `Privacy Consent Status`.
- **Branches (Create Consent action, target channel mapped, email contact point value supplied):**
  - **Opt In** → Consent Status = `Opt In`
  - **Opt Out** → Consent Status = `Opt Out` (contact point becomes suppressed — prevents future deployment immediately)

### Technical Summary Matrix

| Flow | Purpose | Flow Type | Starting Trigger Object | Core Action Element |
|------|---------|-----------|-------------------------|---------------------|
| 1 | Net New Opt-In | Data Cloud-Triggered | `ssot_Individual__dlm` (Created) | Native **Create Consent** |
| 2 | MC Next → CRM | Data Cloud-Triggered | `ssot_CommunicationSubscriptionConsent__dlm` (Updated) | Standard **Update Records** (CRM Core) |
| 3 | CRM → MC Next | Automation Event-Triggered | `CommSubscriptionConsent` (Updated) | Native **Create Consent** |

## Common Pitfalls / Misconceptions
⚠️ Mapping external consent data straight into the CSC DMO via data streams/batch transforms *looks* successful but is ignored at send time.
⚠️ Opt-outs registered through those unsupported paths are **missed by the transactional consent service** — the exact compliance scenario GDPR/CCPA audits punish.
⚠️ Flow 2 uses a plain **Update Records** action on the CRM `CommSubscriptionConsent` (governed by CRM); Flow 1 and Flow 3 need the **Create Consent** action into MC Next — mixing them up breaks the direction of sync.
⚠️ Consent is anchored to the **contact point** (email value), so flows must map the contact point dynamically from the retrieved email/contact records rather than hard-coding an ID.

## Active Recall Questions
1. Why can't you map external consent data directly into the Communication Subscription Consent DMO?
2. What three compliance failures do unsupported consent writes produce?
3. Which object triggers Flow 1, and what does the flow's Decision step evaluate?
4. In Flow 2, what does the Update Records action write to the CRM when Data Cloud Consent Status is True?
5. Which flow type is Flow 3, and what action does it use to push a back-office opt-out into MC Next?

## Related Concepts
- [[consent-write-paths]]
- [[consent-data-model]]
- [[consent-sync-hybrid]]
- [[consent-and-compliance]]
- [[consent-double-opt-in]]
- [[contact-points-activation]]
- [[flow-builder-elements]]
- [[campaigns-and-flows]]

## Source References
- `sources/Consent_Sync_Salesforce_Data360_MCNext.txt` — "How to Keep Consent in Sync between Salesforce, Data 360 and Marketing Cloud Next" (Dominik Modrzejewski, Jun 2026)