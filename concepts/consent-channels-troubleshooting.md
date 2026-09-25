# Consent Channels & Troubleshooting

## Core Idea
Consent behaves differently per channel (transactional email, SMS, WhatsApp) and per unsubscribe method — and when consent "isn't working," a systematic 5-step troubleshooting path isolates whether the write ever reached the CSC DMO and whether it was written through a supported path.

## Prerequisites
- [[consent-data-model]]
- [[consent-write-paths]]
- [[consent-audit-trail]]
- [[channels-overview]]

## Detailed Explanation

### Transactional Emails & Consent
The transactional consent check is **off by default**. However, if a **Communication Subscription is populated at send time**, consent is evaluated even when the global setting is disabled.

**Recommended pattern:** unless you want consent honored at send time, do **not** select a Communication Subscription for transactional sends.

### SMS & WhatsApp Consent
SMS and WhatsApp consent use the same **Communication Subscription + CSC DMO model** as email, with Contact Point Phone records. Opt-in/opt-out keyword handling is configured per channel. Note that **"transactional" SMS (OTP, 2FA, account notifications) still requires consent** under TCPA and most carrier rules.

### Unsubscribe & Complaint Actions
Marketing Cloud Next records all opt-outs at the **Communication Subscription level** — there is currently **no account-level or channel-level opt-out**.

An "opt out of all" action opts the recipient out of each of their current subscriptions individually. Opt-outs are independent of sending domain and business unit. If someone opts out of a **global Communication Subscription** (sendable from any business unit), that opt-out applies to sends from every business unit.

**How each method behaves:**
- **Email body unsubscribe link** — opts out of the specific Communication Subscription used on that send (subscription level).
- **One-click / List-Unsubscribe header (HTTPS one-click and mailto)** — subscription level when the originating subscription can be identified.
- **Spam complaint (feedback loop / FBL)** — opts out of **all** current subscriptions.
- **Reply Mail Management (RMM)** — opts out of **all** current subscriptions.

**Example scenario:**
1. Recipient undergoes an "opt out of all" action.
2. Recipient is opted out of all current subscriptions individually.
3. Later an admin creates a new subscription and opts this recipient into it.
4. The recipient could then receive marketing based on the new subscription. There's no channel-level or global opt-out mechanism.

Note: opting out of all current subscriptions is the current behavior for spam complaints and RMM. Once channel-level consent is available (on the roadmap), these actions are planned to opt out at the channel level instead.

### Troubleshooting Consent Issues
Common issues: "I opted out but I'm still receiving emails," "I imported consent but my segment is still empty," "My opt-out via an external system isn't reflected."

**Step 1 — Confirm the consent record in the CSC DMO.** Open Data Cloud > Data Explorer > Communication Subscription Consent DMO. Filter by contact point value and CSCT ID.
- If absent: the upstream write never reached the DMO. Investigate the source.
- If present with expected status: continue to Step 2.

**Step 2 — Compare the DMO to what's honored at send time.** Open the Consent Status component on the Lead/Contact and compare.
- Match: consent is current; issue is elsewhere (audience filter, missing Lead/Contact, channel mismatch).
- Mismatch: continue to Step 3.

**Step 3 — Identify the write path.** Check what wrote the most recent value, in order:
1. A Flow using MessagingConsent / MessagingConsentV2 actions.
2. A Data Stream mapped directly to the Consent DLO.
3. A Batch Data Transform writing to the Consent DLO.
4. A Data Cloud Ingestion API call writing directly to the Consent DMO.
5. A custom integration writing consent fields directly.

Any of these is an unsupported write path and the likely cause.

**Step 4 — Repair.**
- Single record/small set: update via the Consent Status LWC.
- Bulk (≤50k rows): Consent Import CSV.
- Bulk (>50k rows): stage into a custom DMO, then run a Data Cloud-Triggered Flow calling Create Consent.
- Re-run Step 2 to confirm values match. Expect up to ~15 minutes of latency when reading updated records in Data Cloud.

**Step 5 — Prevent recurrence.**
- Audit Flows for MessagingConsent/MessagingConsentV2; replace with Create Consent.
- Audit Data Streams and Batch Data Transforms targeting the Consent DLO; reroute through a Data Cloud-Triggered Flow.
- Audit Ingestion API and custom integrations for direct Consent DMO writes.

If consent still isn't honored after re-writing through a supported method, engage Salesforce Support with details (contact point value, Channel Type ID, DMO value, timestamp of most recent write, and the write path identified).

## Common Pitfalls / Misconceptions
⚠️ Transactional consent check is off by default — but selecting a Communication Subscription turns it on.
⚠️ Transactional SMS (OTP/2FA) still requires consent under TCPA.
⚠️ There's no account-level or channel-level opt-out — only subscription-level.
⚠️ Spam complaints and RMM opt out of all current subscriptions.
⚠️ The most common consent bug is an unsupported write path (MessagingConsent, direct DLO/DMO writes).

## Active Recall Questions
1. When is consent evaluated for transactional emails?
2. What's the recommended pattern for transactional sends?
3. How do spam complaints and RMM affect consent?
4. What are the 5 steps of consent troubleshooting?
5. What's the most common cause of consent not being honored?

## Related Concepts
- [[consent-write-paths]]
- [[consent-data-model]]
- [[consent-audit-trail]]
- [[channels-overview]]
- [[email-sending-setup]]

## Source References
- User-provided "Consent Management: Email, SMS, WhatsApp" article
- User-provided "Consent Management: Troubleshooting Issues" article