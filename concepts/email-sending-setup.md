# Email Sending Setup (Trust & Compliance)

## Core Idea
Before sending trusted, compliant email you must establish a trusted sending identity (physical address, authenticated domain, from addresses, branded tracking links), configure consent, enable reply handling, and protect engagement metrics — building trust in both the email *and* the results.

## Prerequisites
- [[email-domain-authentication]]
- [[consent-and-compliance]]
- [[marketing-cloud-next-overview]]

## Detailed Explanation

### The Three Roles of Email Sending
Email sending typically involves three roles (one person may fill several in a small team):

| Role | What they do |
|------|--------------|
| **Marketing Cloud admin** | Enables Marketing Cloud Next, manages core email settings |
| **Data Cloud architect** | Configures data streams, identity resolution, data models |
| **Marketing Cloud manager** | Builds campaigns, selects audiences, designs email, activates sends |

### 1. Establish a Trusted Sending Identity

**Physical mailing address** — a legal requirement for commercial email (CAN-SPAM US, CASL Canada, GDPR EU) and a trust/deliverability signal. Entered in Company Information.

**Authenticate a sending domain** — proves to inbox providers you're the legitimate sender, preventing spoofing. Salesforce generates **DNS records (CNAME, DKIM, DMARC)** that your IT team publishes with the domain registrar. DNS propagation can take up to **48 hours**.

**Authenticated from addresses** — the initial from address is created with the domain; add more (Display Name + local part + domain) so marketers can pick the right sender per campaign.

**Branded tracking domains** — make tracked links reflect your brand instead of a generic redirect. Requires a **CA-signed certificate** (Certificate and Key Management) and a **DNS certificate**, then configured under Setup → Links → Manage Domains.

### 2. Configure Consent & Subscriptions
Consent is managed through **communication subscriptions**. Best practice: separate subscriptions by **message type** (marketing vs. product updates) so subscribers control what they receive.

- Create a subscription (name + channel), review the **Preference Manager page** for the opt-in/opt-out experience.
- Link the preference page in emails so subscribers manage preferences anytime.
- Marketing Cloud Next sends **only to opted-in subscribers**.
- **Import existing consent** via CSV (Consent Imports) to honor historical opt-ins/opt-outs during migration.

### 3. Enable Reply Mail Management (RMM)
Customers reply with questions, out-of-office notices, and unsubscribe requests. RMM:
- **Delete Auto-Responses** — removes out-of-office/bounce messages.
- **Auto-Response** — optional acknowledgment for non-filtered replies.
- **Routing** — forwards meaningful replies to a monitored inbox.

RMM **automatically processes opt-out keywords** (stop, unsubscribe, remove) and applies to **all messages** from the authenticated domain — it **cannot** be turned on per campaign.

### 4. Turn On Einstein Metrics Guard
Uses AI to filter activity unlikely to be from humans (bot scans, security checks) so open/click rates stay meaningful. Enabled via Unified Messaging → Settings.

### The Full Send Workflow (Campaign Lifecycle)
1. **Create campaign + select audience segment** (quick filters or segment builder).
2. **Customize the email** (message purpose, subject/preheader, compliance merge fields).
3. **Test** (preview with sample recipient; send test email).
4. **Publish + schedule** (publish the segment; configure schedule; select communication subscription).
5. **Activate** — the Marketing app checks send-time requirements; warnings/errors must be resolved first.

### Send-Time Validations & Troubleshooting
Common failure signals and causes:

| Signal | Likely cause |
|--------|-------------|
| **Messages not sent** | `Consent Not Given` or `Invalid From Address` |
| **High bounces** | Domain authentication / sender configuration |
| **Unexpected unsubscribes** | Audience targeting or message relevance |

### Measuring & Reporting
- **Marketing Performance tab** → Insights and Deliverability dashboards (require admin config + send data + permissions).
- Review metrics: **Sends, Delivered, Opens, Clicks, Unsubscribes**.
- Build **custom reports** via the **Marketing Performance Semantic Data Model** (fields like `SendStatus`, `Bounce`, `Unsubscribe`).

## Common Pitfalls / Misconceptions
⚠️ A valid physical address is required for **all** commercial email — not just marketing.
⚠️ DNS changes take up to **48 hours** to propagate — plan ahead.
⚠️ Reply Mail Management applies to the whole domain, not per-campaign.
⚠️ The **promotional** purpose requires opt-in consent; **transactional** messages don't require a promotional subscription.

## Active Recall Questions
1. What three roles are involved in email sending?
2. What four pieces establish a trusted sending identity?
3. What three functions does Reply Mail Management perform?
4. What does Einstein Metrics Guard do?
5. What are two common causes of "messages not sent"?

## Related Concepts
- [[email-domain-authentication]]
- [[consent-and-compliance]]
- [[email-building-personalization]]

## Source References
- `sources/Salesforce_Trails.txt` — "Prepare Your Org for Email Sending", "Configure Trusted and Compliant Email Sending", "Send an Email Campaign", "Measure and Troubleshoot Email Engagement"
