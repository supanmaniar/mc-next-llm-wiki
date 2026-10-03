# Email Domain Authentication (DKIM, SPF, DMARC)

## Core Idea
To send email, you must authenticate a sending domain (and verify a From address) so receiving servers trust your messages aren't spoofed — improving deliverability and protecting your domain's reputation.

## Prerequisites
- [[marketing-cloud-next-overview]]
- [[channels-overview]]

## Detailed Explanation

### Three Required Email Settings
1. **Authenticate a domain for sending** (configure DKIM)
2. **Verify at least one sender (From) email address**
3. **Provide a physical address** (for the Physical Address merge tag)

### Best Practice: Use a Subdomain
Send from a **subdomain** of your root domain (e.g., `mktg.example.com`) to improve deliverability and protect root-domain reputation. The subdomain must have an inbox to receive the authentication verification email.

### DKIM, SPF, DMARC
- **DKIM (DomainKeys Identified Mail)** — adds a digital signature to emails so receivers verify the sender is legitimate
- **SPF (Sender Policy Framework)** — allows receiving servers to verify the sending server is authorized
- **DMARC** — tells receiving servers how to handle messages that fail authentication

Marketing Cloud Next emails sent from an authenticated domain **automatically pass DKIM and SPF**.

### Generated DNS Records (Unified Messaging)
Salesforce generates the following records to add to your DNS provider ([tenant] = your unique tenant identifier):

- **DKIM CNAME entries** — three records (`s1-`, `s2-`, `s3-e360-[DKIM Key]._domainkey.<subdomain>`) pointing to `…dkim.[tenant].mx.salesforce.com`.
- **DMARC TXT record** — Name `_dmarc`, Value `v=DMARC1; p=reject; adkim=r; aspf=r; pct=100;`
  - ⚠️ Applying `p=reject` at the **root (organizational) domain** affects ALL corporate email from that domain. Misconfigured DMARC can fail legitimate mail — coordinate with IT.

### Functional Subdomains (Inbound Routing)
A **functional subdomain** is a prefix added to your authenticated sending domain that routes specific inbound mail types to Salesforce-managed infrastructure:

| Inbound use case | Prefix | Example (for `marketing.yourcompany.com`) |
|------------------|--------|------------------------------------------|
| Reply handling | `reply` | `reply.marketing.yourcompany.com` |
| Bounce handling | `bounce` | `bounce.marketing.yourcompany.com` |
| Unsubscribe handling | `leave` | `leave.marketing.yourcompany.com` |

Each functional subdomain requires a **CNAME record** mapping it to `…inbound.[tenant].mx.salesforce.com`.

### Authenticate a Domain (Unified Messaging)
1. Setup → "Authenticated Domains" → **Add Domain**
2. Review prerequisites → Continue → enter subdomain → Submit
3. Configure DNS records with your registrar (CNAME must include subdomain info)
4. Click **Verify Domain**

Status: **Pending** → (up to 48 hrs for DNS) → **Active**. Can't delete a Pending or Active domain.

### Authenticate a Domain (MC Next — step by step)
1. Setup → Quick Find **"Authenticated Domains"** → **Add Domain**
2. Click **Continue**, then define the **subdomain** to use
3. Create a **default From email username** (used when sending emails)
4. Download a **DNS zone file** *or* view the individual DNS records to add via your DNS provider
5. Once the DNS changes are done, select the **confirmation checkbox** → **Activate My Domain**

> **MCE vs. MC Next:** Marketing Cloud Engagement uses a **sender authentication package** to configure the sending domain and other branded account domains. Marketing Cloud Next instead has you add an **authenticated domain**, generate the required DNS records, and publish them through your DNS provider.

**DNS provider behaviors** (avoid config errors):
- **Guided experience** — auto-appends the root domain; confirm the final saved record matches the full CNAME Name Salesforce gave you.
- **Verified experience** — requires the full CNAME Name; validates it.
- **WYSIWYG** — copy/paste the full Name and Value exactly.

> **Edition note:** domain authentication in Unified Messaging is available in Enterprise/Unlimited (Service Cloud) and Enterprise/Unlimited with Growth/Advanced editions — **not supported in Government Cloud Plus**.

### Authenticate a From Address
1. Setup → "Authenticated From Addresses" → **Add From Addresses**
2. Enter **Display Name** (who the email appears to come from)
3. Enter username (part before @) + select authenticated domain
4. Save

### Physical Address Requirement
All marketing AND transactional emails must include a complete physical address (with alphanumeric State field). If no state/region, insert a placeholder.

### Branded Tracking Domains (Certificates)
To use a branded tracking domain (links reflect your brand, not a generic redirect), you need a **CA-signed certificate**:
1. Setup → **Certificate and Key Management** → Create CA-Signed Certificate (label, unique name, key size — type/key size can't be changed after save).
2. Download the **Certificate Signing Request (CSR)** → send to a certificate authority.
3. Upload the **signed certificate**.
4. Setup → **Links** → Manage Domains → Create New → enter domain + select the DNS certificate → Save.

> Prerequisite: your sending domain must be **fully authenticated** before creating a branded tracking domain.

### Authorized Email Domain (vs. Authenticated Domain)
An **authorized email domain** is a *different* thing from an authenticated domain, and the exam tests the distinction directly:

| | Authenticated Domain | Authorized Email Domain |
|-|----------------------|-------------------------|
| **Verifies** | Full sending configuration | Ownership only |
| **Mechanism** | DKIM + SPF/DNS sending records | A single **simple verification record** |
| **Provides DKIM/DNS sending config?** | ✅ Yes | ❌ No |
| **Required for** | All sending from the domain | **Dynamic From or Reply-to addresses only** |

- You may need to configure an **authorized email domain** if you want to use **dynamic From or Reply-to addresses**.
- ⚠️ **DMARC alignment:** for DMARC to align, the domain in the **From address must align with the authenticated sending domain**. Using a **personal email address on the root domain** as the From address may result in **DMARC alignment failures**.

> **Memory hook:** *Authenticated* = you can send from it (DKIM/DNS). *Authorized* = you're allowed to put it in the From/Reply-to of a dynamic address, but it doesn't set up sending.

### Reply Mail Management (RMM)
Filters automatic replies, routes real messages to a monitored inbox, and processes opt-out keywords. Three options:
- **Delete Auto-Responses** — removes out-of-office/bounce messages.
- **Auto-Response** — optional acknowledgment for non-filtered replies.
- **Routing** — forwards meaningful replies to a monitored inbox/user.

RMM automatically processes common opt-out keywords (stop, unsubscribe, remove) and applies to **all messages** from the authenticated domain — it **cannot** be turned on per campaign. If a manual reply contains these terms in the **first 200 characters**, the sender is unsubscribed:
- `unsub`, `unsubscribe`, `opt-out`, `remove`, `stop`

## Common Pitfalls / Misconceptions
⚠️ Using the root domain instead of a subdomain (hurts deliverability + reputation).
⚠️ Forgetting the physical address — a compliance requirement for ALL emails, not just marketing.
⚠️ DNS changes can take up to **48 hours** — don't expect instant verification.
⚠️ **`p=reject` DMARC at the root domain affects all corporate mail** — apply carefully, coordinate with IT.
⚠️ Each **functional subdomain** (reply/bounce/leave) needs its own CNAME record.
⚠️ CNAME Name handling differs by DNS provider (guided vs. verified vs. WYSIWYG) — verify the final saved record matches.
⚠️ **Authorized ≠ authenticated domain.** An authorized domain only proves ownership (one verification record) and does **not** provide DKIM/DNS sending configuration. It's required for **dynamic From/Reply** addresses.
⚠️ A **personal email on the root domain** as the From address can cause **DMARC alignment failures** — the From domain must align with the authenticated sending domain.
⚠️ MCE uses a **sender authentication package**; MC Next uses an **authenticated domain** + published DNS records.

## Active Recall Questions
1. What three things are required before you can send email?
2. What do DKIM, SPF, and DMARC each do?
3. What happens when a reply contains "unsubscribe" in the first 200 characters?
4. Why use a subdomain instead of the root domain?
5. What are the three functional subdomains, and what inbound purpose does each serve?
6. What is the difference between an **authorized** and an **authenticated** email domain?
7. What is the practical difference between MCE sender authentication and MC Next domain authentication?

## Related Concepts
- [[channels-overview]]
- [[domain-settings]]
- [[consent-and-compliance]]
- [[contact-points-activation]]
- [[dynamic-from-reply-addresses]]

## Source References
- `sources/mktg_implementation_guide.pdf` — "Configure Required Email Settings", "Authenticate a Domain for Unified Messaging"
- `sources/Salesforce_Trails.txt` — "Configure Trusted and Compliant Email Sending"
- `sources/Contact_Points_and_Domains.txt` — "Authenticate and Configure Domains in Unified Messaging", "Functional Subdomains", "Set Up and Authenticate a Sending Domain"
- `sources/MCNext_Consultant_Exam_Masterclass_Session1.txt` — Elliot Harper, "Marketing Cloud Next Consultant Exam Masterclass" Session 1 (Salesforce, Summer '26)