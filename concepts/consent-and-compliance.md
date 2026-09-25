# Consent & Compliance

## Core Idea
Consent is the gatekeeper of marketing: a strict, subscription-based opt-in model ties consent to specific contact points (email/phone) and channels, so each preference is tracked independently and enforced at send time to keep you compliant with GDPR, CAN-SPAM, and CASL.

## Prerequisites
- [[marketing-cloud-next-overview]]
- [[channels-overview]]
- [[data-architecture-layers]]

## Detailed Explanation

### The Strict Opt-In Principle
Marketing Cloud Next is a **strict opt-in system**. If **no consent record exists** for a recipient on a given subscription, the system treats them as **opted out** and blocks the message. You don't log an explicit "No" — the *absence* of a recorded "Yes" is enough to suppress the send. This protects sender reputation and the customer's inbox.

### The Subscription-Based Model
Consent is managed through **individual subscription preferences** — not a single opt-in field. Being opted into one subscription does **not** affect another (opting into "Product Updates" ≠ opted into "Newsletters").

- A default subscription called **Marketing** is created out of the box; all others are marketer-created.
- Consent is tied to **specific contact points** (a particular email address or phone number), *not* the generic person record. A customer with personal + work emails can hold different preferences per address.

### Granular Subscriptions vs. Global Opt-Out
- **Granular subscriptions** — flexible, per-topic control.
- **"Unsubscribe from all"** — a button on the out-of-the-box Preference Page that removes the contact from all existing subscriptions across channels in one action.
  - ⚠️ It does **not** persist as a permanent block. If a brand-new subscription is created later, there's no higher-level consent preventing a new opt-in on it.

### The Composite Key (Golden Rule)
Opt-in/opt-out status is identified by a **composite key** of three parts:
1. **Communication Subscription** (the topic: flash sales, product updates)
2. **Contact Point** (email address or phone number)
3. **Engagement Channel Type** (Email, SMS, or WhatsApp)

Because they're keyed separately, changing consent on one channel has **zero carry-over** to another channel for the same subscription.

### Consent Data Model Objects (DMOs)
Consent is stored centrally in **Data 360** as DMOs (not a checkbox on a lead/contact record), so every system (Service, Sales, Marketing) sees the same preferences:

| Object | Role |
|--------|------|
| **Contact Point** | The routing address (email/phone); consent is tied here, not the person record |
| **Communication Subscription** | The list/topic/category joined (Newsletter, Product Updates) |
| **Engagement Channel Type** | The medium (Email, SMS, WhatsApp) |
| **Communication Subscription Channel Type** | The specific delivery method per subscription (opt in per channel) |
| **Communication Subscription Consent** | The core record: explicit opt-in/opt-out status for a point+subscription+channel, plus consent date and source |

### Consent Tools & Options
- **Preference Pages** — branded, customizable pages (built in the Content tab) where subscribers manage their own preferences; dynamic links can be embedded in email templates.
- **Consent Status (LWC)** — a Lightning Web Component admins drop onto Prospect/Lead/Contact/Person Account layouts so frontline reps can view/update opt-in status.
- **Consent Imports** — CSV upload to create/update consent across thousands of records (migration use case).
- **Salesforce Flow Integration** — automate consent capture (e.g., opt-in when a new Lead submits a web-to-lead form).
  - **Supported triggers only:** Data Cloud Record-Triggered Flow, Automation Event-Triggered Flow, On-Demand Triggered Flow.
  - **Correct actions:** `Create Consent` (Data Cloud Record-Triggered) or `Consent Request` (Automation Event / On-Demand).
  - ⚠️ **Do NOT** use `MessagingConsent.MessagingConsent` or `MessagingConsent.MessagingConsentV2` actions — they cause system issues.

### Channel-Specific Consent Rules

| Channel | Opt-in | Opt-out | Scope |
|---------|--------|---------|-------|
| **Email (Promotional)** | Yes (Preference Page, form, import) | Unsubscribe link or Preference Page | Per subscription + channel |
| **Email (Transactional)** | Configurable (can disable via global setting) | Respect global opt-outs | Per subscription + channel |
| **SMS** | Always explicit (keywords like JOIN, form, API) | STOP keyword | **Per sender code** (not global per phone) |
| **WhatsApp** | Always explicit (form, in-app, keyword) | Block in-app or opt-out keyword | Per contact point (phone) |

**Key channel nuances:**
- **Email:** every promotional email requires a visible unsubscribe link / Preference Page link; clicking updates the consent record to OPT_OUT. Transactional emails (receipts, password resets) don't need a subscription but must respect global opt-outs.
- **SMS:** explicit, verifiable opt-in is mandatory (implicit consent / prechecked boxes never acceptable). Universal keywords (STOP, CANCEL, UNSUBSCRIBE) auto-set OPT_OUT. SMS opt-out is **sender-code specific** — opting out of one code doesn't affect other codes from the same brand. Sign-up forms must state message type, monthly frequency, and opt-out instructions.
- **WhatsApp:** governed by Meta's business messaging policies; opt-in must explicitly state agreement to receive WhatsApp messages from your business. You can't buy a phone list and broadcast. Monitor your **WhatsApp business quality rating** — violations can get the account banned by Meta.

### The Double Opt-In Flow (Gold Standard)
1. **Data capture** — visitor fills a web-to-lead form (no immediate opt-in).
2. **Pending** — a record-triggered flow sends a transactional confirmation email (transactional emails need no subscription).
3. **Confirmation** — user clicks the unique verification link.
4. **Capture opt-in** — the click triggers a **`Consent Request` action** to write OPT_IN. ⚠️ Updating the DMO directly does **not** update Marketing consent (cache layer) — use the correct action.
5. **Ready** — verified subscriber receives promotional campaigns safely.

### Core Components (Setup)
- **Communication Subscription** — a category of marketing content (e.g., "Product Updates") with one or more channels. Subscribers consent per channel.
- **Preference Pages** — default pages for email, SMS, WhatsApp; subscribers manage their own subscriptions via the Preference Manager link.
- **Consent Imports** — CSV imports of consent data for a single channel + subscription + status.

### Communication Subscription
1. Consent page → Preference Pages and Subscriptions → **New Subscription**
2. Name it → select ≥1 channel
3. If SMS/WhatsApp, select ≥1 sender code/number
4. Save

### Preference Page Editing
Changes publish **immediately** when saved. Merge field links (Preference Manager, Unsubscribe) don't work in email/SMS/WhatsApp **preview** — review them on the Consent tab instead.

### Import Consent Data
Each import = one channel + one subscription + one consent status.
1. Consent → Consent Imports → Import
2. Select channel + subscription (+ Sender Code for SMS)
3. Select consent status → Next
4. Upload CSV → preview → Import

> **Important:** Import only adds/updates consent for **existing** contact points; it doesn't create leads/contacts. Contact points (email/phone) must already exist.

### CSV Formatting Rules
**General:**
- First column = contact point (email or phone), second column = consent date
- One import per subscription/channel/status combo

**Date formats (DateTime):**
- `yyyy-MM-dd HH:mm:ss.SSSZ`, `MM/dd/yyyy HH:mm:ss`, `MM/dd/yyyy`, `yyyy-MM-dd`, `M/dd/yyyy`
- `Z` = UTC (or blank or +0000)

**Email:** valid complete address, no special characters.
**Phone (SMS/WhatsApp):** country code + full number, **ITU E.164** format (e.g., `+12065550123`). Spaces/dashes/underscores/parentheses auto-removed; numerals only.

> **Rule:** You can't set a consent date **earlier** than the existing record's consent date — earlier dates are ignored.

### Example (from guide)
Lyn has SMS + email consent for "Product Updates" subscription. She creates **4 files**: opted-in email, opted-out email, opted-in SMS, opted-out SMS.

### Best Practices (Data Hygiene & Compliance)
- **Keep data clean** — consent is tied to the *contact point*, not the person. If an email changes, the old consent doesn't transfer; capture a new record for the new address.
- **Centralize consent** in Data 360 (single source of truth) so an unsubscribe in Service Cloud flows through to Marketing — no fragmented silos.
- **Match the consent-given date** when importing legacy data — preserves an accurate audit trail for compliance.
- **Never delete an active or historical Communication Subscription** — deleting it cascades and destroys all related historical consent data. To retire a newsletter, remove it from the Preference Pages instead.
- **Monitor list health** — track opt-in/opt-out metrics; a spike in global opt-outs after a campaign signals content/frequency problems.

## Common Pitfalls / Misconceptions
⚠️ Marketing Cloud Next is **strict opt-in**: absence of a "Yes" = blocked, even without an explicit "No".
⚠️ "Unsubscribe from all" does **not** persist as a permanent block for future subscriptions.
⚠️ SMS opt-out is **per sender code**, not global per phone number.
⚠️ Never delete a Communication Subscription — it destroys the historical consent audit trail.
⚠️ In flows, use `Create Consent` / `Consent Request` actions — **not** `MessagingConsent` actions.
⚠️ Updating the consent DMO directly doesn't update Marketing consent (cache layer) — use the correct action.
⚠️ Consent imports don't create new leads/contacts — only update existing contact points.
⚠️ Importing a consent date earlier than existing is silently ignored.
⚠️ Phone numbers must be E.164 formatted with country code.
⚠️ Preview doesn't render Preference Manager/Unsubscribe links — verify on Consent tab.
⚠️ At send time consent is read from a **cache** (90-day validity), not the DMO directly — see [[consent-cache]].

## Active Recall Questions
1. What three things does a single consent import correspond to?
2. Why would Lyn need 4 import files for SMS + email consent?
3. What phone number format is required for SMS/WhatsApp consent imports?
4. What happens if you import a consent date earlier than the existing date?
5. What three parts make up the consent composite key?
6. What's the difference between a granular subscription and "Unsubscribe from all"?
7. Why must you never delete a Communication Subscription?
8. What action should a flow use (and avoid) to write consent?

## Related Concepts
- [[channels-overview]]
- [[web-tracking]]
- [[data-architecture-layers]]
- [[email-sending-setup]]
- **Deeper consent pages:** [[consent-data-model]], [[consent-write-paths]], [[consent-audit-trail]], [[consent-double-opt-in]], [[consent-preference-pages]], [[consent-sync-hybrid]], [[consent-segmentation]], [[consent-setup-billing]], [[consent-channels-troubleshooting]], [[consent-cache]]

## Source References
- `sources/mktg_implementation_guide.pdf` — "Ensure Compliance with Consent Settings", "Formatting Marketing Consent Import Files"
- `sources/Salesforce_Trails.txt` — "Get Started with Consent Management", "Explore Consent Tools and Concepts", "Discover Channel-Specific Consent", "Get to Know Consent Best Practices and Considerations"
- User-provided consent management articles (deep-dive: data model, write paths, audit trail, double opt-in, preference pages, sync/hybrid, segmentation, setup/billing, channels/troubleshooting)