# Web Tracking (Landing Pages & External Sites)

## Core Idea
Marketing Cloud Next can track page views, form submissions, link clicks, and button clicks on both hosted landing pages AND your external website — using cookies and an optional consent banner — to feed engagement data into Data Cloud for better segmentation.

## Prerequisites
- [[marketing-cloud-next-overview]]
- [[consent-and-compliance]]
- [[data-kits-and-data-streams]]

## Detailed Explanation

### What Gets Tracked
- Page views
- Form submissions
- Link clicks
- Button clicks

### Two Tracking Scenarios

| Scenario | Key Requirements |
|----------|-----------------|
| **Landing Pages with consent banner** | Data Cloud integration + Data Cloud Web Tracking Consent Banner integration + banner design |
| **Landing Pages without consent banner** | Data Cloud integration + Relaxed CSP + event tracking code in head markup |
| **External Sites with consent banner** | External Tracking data kit + Website connector + banner design + embed code |
| **External Sites without consent banner** | External Tracking data kit + Website connector + embed code |

### Cookies Reference

| Cookie | Duration | Purpose |
|--------|----------|---------|
| `_sfid_${domainHash}` | 730 days | Creates unique visitor ID on landing page visit |
| `sfmc_consent` | 365 days | True = opted in, False = opted out/ignored banner |
| `guest_uuid_essential_<SiteID>` | 365 days | No longer used, but still set on visit |

> **First-party tracking recommended:** align all pages under your root domain. Industry is moving away from third-party cookies.

### Landing Pages with Consent Banner
1. Setup → "Web Tracking" → Consent Banner → customize
2. Setup → All Sites → Marketing Landing Pages → Builder → Settings → Integrations
3. Add Data Cloud integration + Data Cloud Web Tracking Consent Banner integration → **Publish**
4. To test: create a landing page and view in a real browser

> **Permissions:** configure external tracking = Marketing Cloud Admin; create/publish a consent banner = Marketing Cloud Manager + a CMS workspace contributor role (content admin or content manager).

> **Custom domain:** to track a landing page on a custom domain, add a custom URL for that domain in Setup and define the path as `/lp`.

> **Re-publish:** any time you change the banner, publish the Marketing Landing Pages site again in Experience Cloud.

### Landing Pages without Consent Banner
1. Set security level to **Relaxed CSP** (Site Settings → Security & Privacy)
2. Add Data Cloud integration (NOT the consent banner integration)
3. Add tracking code snippet to **Head Markup** (avoids needing consent banner)
4. Publish

The Head Markup code dispatches a `set-consent` custom event:
```html
<script>
document.dispatchEvent(
        new CustomEvent('experience_interaction', {
            bubbles: true,
            composed: true,
            detail: { name: 'set-consent', value: true },
        })
    );
</script>
```

### External Site Tracking
1. Create a **Website Connector** (Setup → Web Tracking → Website Connectors → New)
2. Create **Webpage Embed Code** (name it, select connector, choose consent requirement, associate campaign)
3. Copy embed code → add to your external site's `<head>` tag

> **Pre-Winter '26:** Update your external tracking configuration by replacing the old embed script with the new one.

### Compliance
You're responsible for complying with privacy laws. If consent is required, the **first page view** isn't recorded (happens before consent). The same consent banner is used for both landing pages and external sites.

## Common Pitfalls / Misconceptions
⚠️ **First page view not recorded** when consent banner is required — visitor hasn't consented yet.
⚠️ Using the default Marketing Landing Pages site for content — it's a behind-the-scenes framework, don't add content to it.
⚠️ For custom domains, add a custom URL in Setup and define path as `/lp`.
⚠️ Not updating pre-Winter '26 external tracking scripts.

## Active Recall Questions
1. What four activities are tracked by web tracking?
2. What cookie stores the consent decision (True/False)?
3. Why is the first page view not recorded when consent is required?
4. What are the two integration tiles needed for landing pages with consent banner?

## Related Concepts
- [[consent-and-compliance]]
- [[channels-overview]]
- [[reporting-analytics-setup]]
- [[content-and-personalization]]

## Source References
- `sources/mktg_implementation_guide.pdf` — "Configure Web Tracking in Marketing Cloud Next"
- User-provided "Track Activity on Marketing Landing Pages" article