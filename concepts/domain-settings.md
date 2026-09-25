# Domain Settings

## Core Idea
Marketing Cloud Next uses several domains for different jobs (login, email links, images, landing pages, SMS links), and you can configure My Domain, tracker domains, sending domains, and custom domains to brand and control your URLs.

## Prerequisites
- [[email-domain-authentication]]
- [[channels-overview]]

## Detailed Explanation

### Default Domains

| Usage | Domain Type | Default Value |
|-------|-------------|---------------|
| Salesforce login URL | My Domain | `[mydomain].salesforce.com` |
| Email Links | Tracker Domain | `cdp3.tracking.e360.salesforce.com` |
| Email Images | My Domain | `https://[mydomain].cdn.salesforce-experiences.com` |
| Email Preference Center | My Domain | `https://[mydomain].salesforce.com` |
| Landing Pages | Custom Domain | `https://[mydomain].cdn.salesforce-experiences.com` |
| SMS Links | Tracker Domain, Shortener | `https://[a].sfmsg.co` |

> **Email sending domains are NOT provided by default** — you must authenticate them.

### Domain Types
- **My Domain** — custom subdomain for login + app URLs. Setup → Company Settings → My Domain.
- **Tracker Domain** — monitors opens/click in email & SMS. Default is Salesforce-owned; can configure branded domain. Called "link rewriting" (URLs rewritten with tracker domain, capture engagement, forward to target).
- **Email Sending Domain** — custom domain with DKIM + DMARC. Setup → Unified Messaging → Email → Authenticated Domains.
- **Custom Domains** — for page/asset URLs; configure via Setup → User Interface → Sites and Domains → Domains.

### Tracking Configuration Locations
- **Email:** Setup → Unified Messaging → Email → Email Links
- **SMS:** Setup → Unified Messaging → Branded Domain → URL Shortening Domain
- Marketers create **Marketing Tracked Links** in Content tab (support UTM parameters)

### Custom Domain for Landing Pages
- Must authenticate a **different domain/subdomain for each use case** (email links, SMS, landing pages).
- Recommend using Salesforce CDN.
- To track activity on custom-domain landing page, add custom URL + define path as `/lp`.

## Common Pitfalls / Misconceptions
⚠️ Email sending domains aren't provided by default — forgetting this blocks sending.
⚠️ Each use case (email/SMS/landing) needs its own authenticated domain/subdomain.
⚠️ Tracker domain = "link rewriting" (engagement captured, then forwarded).

## Active Recall Questions
1. Which domain type is NOT provided by default?
2. What does the tracker domain do (link rewriting)?
3. Where do you configure SMS URL shortening domains?

## Related Concepts
- [[email-domain-authentication]]
- [[web-tracking]]

## Source References
- `sources/mktg_implementation_guide.pdf` — "Domain Settings in Marketing Cloud Next"