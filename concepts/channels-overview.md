# Channels Overview (SMS, WhatsApp, Mobile App)

## Core Idea
Marketing Cloud Next is multichannel — email, landing pages, SMS, WhatsApp, and mobile push — but each non-email channel requires its own add-on and specific setup steps before you can send.

## Prerequisites
- [[email-domain-authentication]]
- [[marketing-cloud-next-overview]]

## Detailed Explanation

### Channel → Add-on Requirements

| Channel | Add-on Required | Government Cloud Support |
|---------|----------------|--------------------------|
| Email | Included (message credits) | Yes |
| Landing Pages | Included | Yes |
| SMS | Salesforce Message Credits - SMS | ❌ Not supported |
| WhatsApp | Salesforce Message Credits - WhatsApp | ❌ Not supported |
| Mobile App Messaging | Salesforce Message Credits - Mobile App Regional (Advanced Edition) | ❌ Not supported |

### SMS Setup
Must request/register **codes** (numbers). Registration can take **weeks** — plan ahead.

- **Long Codes:** 10-digit US number. Requires associated **Brand + Campaign + Code** requests. Can't port existing 10-digit code.
- **Short Codes:** US/Canadian, can request new or port existing. No brand/campaign required. Register via Salesforce Services agreement or Mobile Approved Partner.

### WhatsApp Setup
1. Setup → "Your" → **Your Numbers**
2. Install required managed packages for consent & engagement
3. Create/connect **WhatsApp Business Account**
4. Review consent validation settings (Setup → "Channels" → WhatsApp)

### Mobile App Messaging
Advanced Edition + Mobile App Regional add-on. Available only in **Germany and United States** hosted instances.

**Add app:** Setup → Unified Messaging → Mobile App → Your Applications → Add Application.

**iOS (APNs):** configure Environment Type (Production/Sandbox), Key Type (APNS p8 or p12), upload certificate, Key ID, Team ID, Bundle ID (reverse DNS, e.g. `com.example.app`).

**Android (FCM):** upload Firebase Developer certificate.

**Test:** Choose identifier type (System Token / Device ID / Individual ID), enter ID, click Test Configuration.

### Custom Mobile App Events
Track button clicks, screen views, purchases. Can't delete attributes after activating an event; can deactivate (not delete) active events.

## Common Pitfalls / Misconceptions
⚠️ SMS/WhatsApp/Mobile are **not** available in Government Cloud.
⚠️ SMS code registration takes weeks — plan well ahead of launch.
⚠️ Mobile App Messaging limited to Germany/US hosting — check your instance region.
⚠️ Once an event attribute is activated, you **can't delete it**.

## Active Recall Questions
1. Which channels are unsupported in Government Cloud?
2. What three requests are needed for a 10-digit US long code?
3. What's the difference between long codes and short codes regarding brand/campaign requirements?
4. What two push services are configured for mobile app messaging?

## Related Concepts
- [[email-domain-authentication]]
- [[consent-and-compliance]]
- [[web-tracking]]

## Source References
- `sources/mktg_implementation_guide.pdf` — "Set Up Channels in Marketing Cloud Next"