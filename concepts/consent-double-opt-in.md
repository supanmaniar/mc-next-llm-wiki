# Consent Double Opt-In

## Core Idea
Double opt-in (DOI) is a **two-step subscription confirmation** process: after a prospect submits a sign-up form, they receive a transactional confirmation email, and only after they click the confirmation link is their consent officially recorded — providing verifiable proof of consent for GDPR and CAN-SPAM.

## Prerequisites
- [[consent-write-paths]]
- [[consent-and-compliance]]
- [[campaigns-and-flows]]

## Detailed Explanation

### What Is Double Opt-In?
Double opt-in (DOI) is a two-step subscription confirmation process:
1. A prospect/contact submits a sign-up form.
2. They receive a **transactional confirmation email**.
3. Only after they click the confirmation link — verifying intent — is their consent officially recorded.

This is especially important for compliance with email regulations such as **GDPR** and **CAN-SPAM**, which require verifiable proof of consent before sending marketing communications.

Marketing Cloud Next supports DOI by combining **automation-triggered flows**, **transactional email sends**, and the **Consent Request action**.

### Implicit Consent
Implicit consent is the idea that a person has given permission based on their actions or an existing relationship rather than a formal opt-in. Global privacy laws place strict guardrails around it — **GDPR (Europe) and CASL (Canada) are strict**, while **CAN-SPAM (USA) is more relaxed**. ⚠️ Always consult your legal team before implementing any implicit-consent process.

Generally, an implicit-consent use case can be simulated using a Flow to create an opt-in for a related Communication Subscription.

### Building a Double Opt-In Process (Step-by-Step)

**Step 1: Create a Sign-Up Form** — capture contact info, including at minimum an email address field. This is the entry point.

**Step 2: Create an Automation-Triggered Flow** — associated with the sign-up form; fires each time a prospect submits.

**Step 3: Create or Update a Record** — choose the record type that fits your data model: Prospect, Lead, or Contact.

**Step 4: Send the Opt-In Confirmation Email**
- Add a **Send Email** step.
- Set **Message Purpose to Transactional** (ensures delivery regardless of subscription status).
- Include a clear CTA (button) that confirms intent.
- Configure the CTA to redirect to a thank-you page after clicking.
- ⚠️ **Transactional is required** for the confirmation email to send to unconfirmed contacts. Do **not** use Promotional.

**Step 5: Add a Wait Until Event Step**
- After the Send Email step, add a **Wait Until Event** step.
- **Flow action to monitor:** the transactional confirmation email from Step 4.
- **Link to monitor:** the opt-in confirmation link (CTA button) within that email.
- This pauses the flow until the subscriber clicks the link — or until the wait period expires.

**Step 6: Add the Consent Request Action**
- In the **Event Occurs** path (subscriber clicked the link), add the **Consent Request** action.
- Configure opt-in options: subscription list/channel, consent type (e.g., email marketing), and any additional required consent fields.

**Step 7 (Optional): Send a Confirmation Acknowledgment Email** — after Consent Request, notify the subscriber they've successfully opted in.

### Final Flow Overview
1. Form submission triggers the flow
2. Record is created or updated
3. Transactional confirmation email is sent
4. Flow waits for the subscriber to click the opt-in link
5. Consent Request records the confirmed opt-in
6. (Optional) Acknowledgment email is sent

### Further Considerations
- **Expired wait periods:** if the subscriber doesn't click before the Wait Until Event period expires, the flow follows the alternate path. Configure the expiry path appropriately — typically by not recording consent and optionally sending a re-engagement prompt.
- **Transactional vs. Promotional:** only Transactional emails can be sent to contacts without confirmed consent. Using Promotional for the confirmation email causes delivery failures for unconfirmed contacts.
- **Record type selection:** choose Prospect, Lead, or Contact to align with your CRM data model and the stage at which you capture consent.
- **Compliance:** DOI alone doesn't guarantee full regulatory compliance — work with your legal team.
- **Naming:** Marketing Cloud Next is also referred to as Marketing Cloud on Core; the terms are used interchangeably.

## Common Pitfalls / Misconceptions
⚠️ The confirmation email **must** be Transactional — Promotional won't deliver to unconfirmed contacts.
⚠️ DOI alone doesn't guarantee compliance — legal review is still required.
⚠️ Implicit consent is heavily restricted under GDPR/CASL; always get legal sign-off.

## Active Recall Questions
1. What are the two steps of double opt-in?
2. Why must the confirmation email be Transactional?
3. What does the Wait Until Event step monitor?
4. Where does the Consent Request action go in the flow?
5. What happens if the wait period expires without a click?

## Related Concepts
- [[consent-write-paths]]
- [[consent-and-compliance]]
- [[campaigns-and-flows]]
- [[consent-sync-hybrid]]

## Source References
- User-provided "Consent Management: Double Opt-In and Implicit Consent" article
- User-provided "Syncing Contact and Lead Email Opt Out with Marketing Cloud Next Consent Using Flows" article