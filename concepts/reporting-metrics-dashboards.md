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

### The Three Out-of-the-Box Reporting Capabilities
Marketing Cloud Next provides **three reporting capabilities out of the box** — all included with **no additional license or SKU required**:

| Capability | What it provides |
|-----------|------------------|
| **Campaign Performance Dashboard** | An **end-to-end view of an individual campaign** — sends, opens, clicks, bounces, and **contact progression** |
| **Marketing Performance Dashboard** | A **broader cross-channel view over time** — audience growth and program-level engagement trends |
| **Semantic Data Model** | A **consistent business layer** for building custom reports, sharing insights with stakeholders, and connecting marketing data to other analytics tools |

### Marketing Performance Dashboards (Marketing Analytics tab)
Available from the **Marketing Analytics tab**, these give marketers a **consolidated view** of performance across marketing activities:
- Review overall campaign engagement and identify **top-performing campaigns, audience segments, content, and channels**.
- Brings together activity across **web, email, SMS, WhatsApp, and mobile** — performance across the entire customer experience.
- ⚠️ The **same performance dashboards are embedded directly in each campaign record**, so you can evaluate a campaign's results in context without navigating to a separate reporting tab.

### Content Performance Dashboards
Help marketers identify **top-performing content directly in their flow of work**:
1. Select the corresponding element in your **active flow** (e.g., a **Send Email Message** element).
2. From the **Analytics tab**, click the **Details** button.
3. Review **pulse card metrics** relevant to the selected content type, plus **row-level data** for more detailed analytics.

> ⚠️ **Content performance dashboards are accessed from the Analytics tab in the respective flow messaging element** — not from a standalone reporting tab.

### Deliverability Dashboards
MC Next provides **deliverability dashboards for SMS, WhatsApp, and mobile app messaging**:
- Visibility into **message delivery health** and campaign performance.
- Help you understand **why a particular message failed to reach specific recipients** — so you can resolve delivery issues and improve future reach.

### The Semantic Data Model (Tableau Next)
Powered by **Tableau Next**, the semantic data model provides the **foundation for reports and dashboards** in MC Next, available from the **Analytics tab** in the marketing app.

- MC Next includes the **Marketing Intelligence Semantic Data Model** — a reporting layer that **combines data from multiple Data 360 objects** and defines the **relationships and metrics** needed to report on campaign performance, engagement, and deliverability.
- Because those definitions are applied **centrally**, reports and dashboards calculate key metrics **consistently**.
- **Use it to:** create reports answering specific business questions, then combine them as **widgets in a dashboard** for a broader view. Example: a report compares email engagement by campaign; a dashboard brings together performance across campaigns, channels, content, and audience segments.
- **Customise standard dashboards** by changing their **widgets, labels, layouts, and filters**.
- **Extend the semantic model** to other Data 360 objects to support org-specific reporting requirements.
- **Beyond dashboards:** use it to build custom reports, share data with stakeholders **outside Salesforce CRM**, or connect **any external tool**.

### Unified Engagement History Dashboards
Pre-built dashboards that give **sales and marketing teams a shared view** of the activities performed by the **leads and contacts associated with an account**.

- Sales reps use the insights to identify the **most engaged people**, understand their **interests**, and determine **who to contact next**.
- Powered by **Data 360 and Tableau Next**.
- ⚠️ **Embedded directly on account, lead, and contact records** by adding the **Unified Engagement History dashboard component** to the respective **page layout**.

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
⚠️ **Content performance dashboards live in the flow messaging element's Analytics tab** — not a standalone reporting tab.
⚠️ The **semantic data model** is the layer for **custom** reports and external sharing; the three out-of-box capabilities need **no extra license**.

## Active Recall Questions
1. What's the difference between Click Rate and Click-Through Rate?
2. What's the email delivery rate formula?
3. How many filters can a dashboard have?
4. What does the NotSentReason "Reached or exceeded sending allowance" mean?
5. Name the three out-of-the-box reporting capabilities and what each provides.
6. Where do you access content performance dashboards?
7. What is the semantic data model, and what can you do with it?
8. Which channels do the deliverability dashboards cover?

## Related Concepts
- [[reporting-analytics-setup]]
- [[opportunity-influence-b2b-analytics]]
- [[campaign-reporting-tools]]
- [[data360-billing-usage]]

## Source References
- `sources/Marketing Cloud Next Salesforce Help Information.txt` — "Measure Success in Marketing Cloud Next", "Metrics Formulas for Marketing Cloud Next"
- `sources/MCNext_Consultant_Exam_Masterclass_Session4.txt` — Elliot Harper, "Marketing Cloud Next Consultant Exam Masterclass" Session 4 (Salesforce, Summer '26)
