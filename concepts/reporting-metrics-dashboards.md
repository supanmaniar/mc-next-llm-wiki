# Reporting Metrics & Dashboards (Measure Success)

## Core Idea
Marketing Cloud Next reporting (powered by Data Cloud/Data 360 + Tableau Next) provides dashboards across every channel — email, SMS, RCS, WhatsApp, push, in-app, landing pages, forms, tracked links — with well-defined metric formulas for measuring campaign success.

## Prerequisites
- [[reporting-analytics-setup]]
- [[campaigns-and-flows]]

## Detailed Explanation

### Reporting Types & Locations

| Reporting Type | Location | Purpose |
|----------------|----------|---------|
| Campaign Performance dashboard | Marketing Performance Intelligence tab + campaign records | Aggregated/individual campaign KPIs |
| Content Performance dashboard | Content records | Cross-channel KPIs + variation data |
| Deliverability dashboard | MPI tab + campaign records | Email deliverability + failure reasons |
| Email Engagement dashboard/reports | Analytics tab | Email KPIs (filterable) |
| SMS/Forms/Landing Page Engagement | Analytics tab | Channel-specific KPIs |
| Engagement Score / Details | Prospect/Lead/Contact records | Individual engagement |

### Key Email Metric Formulas (core knowledge)
- **Open Rate** = unique opens / (sends − bounces)
- **Click Rate** = unique clicks / (sends − bounces)
- **Click-Through Rate (CTR)** = unique clicks / unique opens
- **Bounce Rate** = bounces / sends
- **Delivery Rate** = (sends − bounces) / sends
- **Opt-Out Rate** = unsubscribes / (sends − bounces)

> Data 360 reports count **all** opens/clicks (not unique); Marketing Performance Intelligence uses **unique** where noted.

### Channel Metric Highlights
- **SMS**: Deliveries, Delivery Rate, Clicks, Response Rate, Inbound Replies, Opt-Out Rate.
- **RCS**: Deliveries, Reads, Open Rate (reads/delivered), Response Rate, Opt-Out Rate.
- **WhatsApp**: Deliveries, Reads, Open Rate, Click Rate, Response Rate.
- **Push**: Sends, Deliveries, Bounce Rate, Opens, Open Rate (opened/delivered).
- **In-App**: Sends, Displays, Dismissals, CTA Button Clicks, Downloads.
- **Landing Page/Form**: Page Views, Page Clicks, Form Submissions, Submission Rate.

### Email: Not Sent Reasons (NotSentReason field)
Common values & resolutions:
- Can't verify recipient consent → get consent
- Promotional email without opt-in → get opt-in
- Reached sending allowance → buy entitlements
- From address not authorized → fix From address
- Hard bounce previously → remove address
- Syntax errors → fix message

### Flow Analytics
- **On-Canvas Insights** (Advanced edition) — recent metrics on flow canvas.
- **Flow Reports** — installed via data kits.

### Customize Dashboards
Up to **5 filters** per dashboard; rearrange widgets; Save As for new dashboards.

## Common Pitfalls / Misconceptions
⚠️ **Open rate vs. CTR**: open rate = opens/sends; CTR = clicks/opens — different denominators.
⚠️ Data 360 reports count non-unique; MPI often counts unique — metric values can differ between locations.
⚠️ "Open rate" for RCS/WhatsApp is really **read rate** (reads/delivered).
⚠️ Push open rate = opened / delivered (not sent).

## Active Recall Questions
1. What's the difference between Click Rate and Click-Through Rate?
2. What's the email delivery rate formula?
3. How many filters can a dashboard have?
4. What does the NotSentReason "Reached or exceeded sending allowance" mean?

## Related Concepts
- [[reporting-analytics-setup]]
- [[opportunity-influence-b2b-analytics]]

## Source References
- `sources/Marketing Cloud Next Salesforce Help Information.txt` — "Measure Success in Marketing Cloud Next", "Metrics Formulas for Marketing Cloud Next"
