# Domain Warming & IP Sending Infrastructure

## Core Idea
Marketing Cloud Next starts email sends on **shared IPs** and **automatically assigns dedicated IPs based on volume**, continuously rebalancing traffic for optimal delivery — but you still must **warm your sending domain** because major mailbox providers now treat **domain reputation** as the primary signal (with IP reputation as fallback for unknown domains).

## Prerequisites
- [[email-domain-authentication]]
- [[email-sending-setup]]
- [[consent-and-compliance]]

## Detailed Explanation

### Shared vs. Managed Dedicated IPs
- Marketing Cloud Next **starts with shared IPs** for sending.
- Email sends are **automatically assigned dedicated IPs based on volume** (managed, "Reduce Complexity with Managed Dedicated IPs").
- Internal services **continuously monitor shared and dedicated IP pools and rebalance traffic** to ensure optimal delivery.
- This dynamic adjustment of IP assignments is based on **sending volume and delivery trends** — no manual IP management.

> Even with shared/dedicated IP automation, you still **must warm your domain(s)**.

### Why Domain Warming Matters
The largest mailbox providers (Google, Yahoo, Apple, Microsoft) now use **domain reputation as the primary source** of sender reputation, with **IP reputation as a fallback** for unknown domains.

- **New domain/subdomain**: start slow — no more than a **few hundred emails per day**.
- **Existing domain/subdomain**: still warm, because the **IP address will be different** when sending from Marketing Cloud Next (even domains previously used in Marketing Cloud Engagement or Account Engagement).

### Authentication Guidance (Before Warming)
1. Ensure the domain meets **bulk sender guidelines** (Gmail/Yahoo).
2. Verify **DMARC, SPF, DKIM** pass via a third-party tool (e.g., aboutmy.email).
3. Send to **most active/engaged subscribers** during warming — MBPs assess reputation from these initial sends; more opens/clicks = faster reputation establishment.

### Reputation Scoring
Reputation is based on **opens, clicks, bounces, and complaints**. Higher reputation = faster volume ramp-up. To improve:
- Clear **double opt-in** process + list hygiene.
- Let recipients choose content type/frequency.
- Remove unengaged recipients; limit sends to those engaged in the **last 6 months**.
- Targets: **bounce rate < 2%**, **complaint rate < 0.1%**.

### Increasing Send Volume (Warming Schedule)

| Day | Daily Max Volume |
|-----|------------------|
| 1–3 | 500 |
| 4–5 | 1,000 |
| 6 | 1,500 |
| 7 | 2,000 |
| 8 | 2,500 |

After week 1, expand the list **each week by one month of engagement** (week 2 = engaged in last 2 months, week 3 = last 3 months, etc.). From **week 6**, proactively remove unengaged (>6 months) recipients.

**Growth rules:**
- Low engagement / spam hits → limit daily increase to **10–20%** (most active subscribers only).
- High opens / minimal issues → increase **20–30% per day**.
- After reaching **60–70% of total audience volume**, open up to everyone. Typically takes **4–7 weeks**.

### Spam Traps
| Type | What it signals |
|------|-----------------|
| **Honeypot** (created to catch spammers) | Issues with opt-in process, or purchased data |
| **Recycled** (reusable after 6–12 mo inactivity) | List hygiene issues — scale back to last-6-months engagement |

Successful traps → blocklisting with specific receivers, or **Spamhaus** listing (widespread blocking).

**Avoid traps:** don't buy/rent lists; remove hard bounces; re-engage at 3 months (win-back campaign), drop at 6 months.

### Bulk Sender Guidelines (Gmail & Yahoo)
- **Authentication**: SAP/Private Domains meet requirements (SPF + DKIM + DMARC). "Add Email Address"/"Register Domain" do NOT authenticate — use SAP/Private Domain.
- **SPF alignment**: if Private Domain base ≠ SAP domain (e.g., `secondbrand.com` vs. `e.firstbrand.com`), enable **multi-bounce domain** (support case).
- **Gmail**: use **Postmaster Tools** to monitor spam rates. **Yahoo**: enrolled in Complaint Feedback Loop (`_Complaint` data view).
- **IP addresses**: forward/reverse (PTR) records aligned.
- **TLS**: "opportunistic TLS" — sent over TLS wherever possible.
- **List-Unsubscribe**: one-click unsubscribe by default (no config needed) via **List-Unsubscribe + List-Unsubscribe-Post** headers. Requires **HTTPS** and **DKIM**. HTTP URI sourced from `subscription_center_url` brand tag.
- **Monitoring**: complaints at `_Complaint` data view; DMARC failure insight via DMARC reporting tools.

### Authentication Specifics (Marketing Cloud Next)
- **SPF**: passes automatically (activated authenticated domain required); SPF records managed by Salesforce (view via the **bounce CNAME** DNS lookup). No extra SPF records needed.
- **DKIM**: passes automatically; **2048-bit keys by default**; uses the **3 outbound CNAME records** (`s1`/`s2`/`s3-e360`) in required DNS records.
- **DMARC**: recommended but **not required** to activate a domain; required for **bulk senders** by Gmail/Yahoo (Oct 2023 joint statements). Salesforce can't configure your DMARC — work with IT.

> Note: For Salesforce Starter/Pro Suite/Foundations, email is sent via a `salesforce.com` domain and authentication is automatic (no DNS setup). This differs from Marketing Cloud Next, which requires the Unified Messaging authenticated domain.

## Common Pitfalls / Misconceptions
⚠️ **Shared→dedicated IP automation doesn't remove the need to warm your domain** — domain reputation is now the primary signal.
⚠️ Existing domains still need warming — the **IP will differ** from your previous Marketing Cloud send.
⚠️ "Add Email Address"/"Register Domain" do **not** authenticate — only SAP/Private Domain.
⚠️ DMARC is **not required** to activate a domain, but IS required for bulk senders.
⚠️ Private Domain base ≠ SAP domain breaks SPF alignment unless **multi-bounce domain** is enabled.

## Active Recall Questions
1. What's the relationship between shared IPs and dedicated IPs in Marketing Cloud Next?
2. Why do you still need to warm an *existing* (already-used) sending domain?
3. What are the bounce-rate and complaint-rate targets?
4. What are the two spam-trap types, and what does each signal?
5. What three things are needed for List-Unsubscribe one-click to work?

## Related Concepts
- [[email-domain-authentication]]
- [[email-sending-setup]]
- [[consent-and-compliance]]

## Source References
- `sources/Contact_Points_and_Domains.txt` — "Domain Warming", "Bulk Sender Guidelines", "Authenticating Marketing Cloud Next Emails"