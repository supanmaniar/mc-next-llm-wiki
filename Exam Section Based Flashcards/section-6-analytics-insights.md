# Flashcards — Section 6: Analytics & Performance Insights (8%)

> **Exam weight: 8%.** Covers pre-built dashboards, metric formulas, surfacing insights, and attribution.
> **Related concept pages:** [[reporting-analytics-setup]] · [[reporting-metrics-dashboards]] · [[opportunity-influence-b2b-analytics]] · [[campaign-reporting-tools]]

---

## Pre-Built Dashboards

## Card: Campaign Performance Dashboard
**Q:** What does the Campaign Performance dashboard show?
**A:** Aggregated and individual campaign KPIs.

## Card: Content Performance Dashboard
**Q:** What does the Content Performance dashboard show?
**A:** Cross-channel and variation data.

## Card: Deliverability Dashboard
**Q:** What does the Deliverability dashboard show?
**A:** Email delivery and failure reasons.

## Card: Email Engagement Dashboard
**Q:** What does the Email Engagement dashboard show?
**A:** Email KPIs.

## Card: Channel-Specific Dashboards
**Q:** Which dashboards cover SMS, forms, and landing pages?
**A:** The **SMS / Forms / Landing Page Engagement** dashboards (channel-specific).

## Card: B2B Analytics Dashboards
**Q:** What dashboards make up B2B Analytics?
**A:** Account-Based Marketing, Pipeline, Marketing Manager, and B2B Attribution — focused on revenue attribution.

## Card: Dashboard Selection Drill
**Q:** Which dashboard would you use to investigate email deliverability failures?
**A:** The **Deliverability** dashboard (email delivery + failure reasons).

---

## Key Metric Formulas

## Card: Open Rate
**Q:** What is the Open Rate formula?
**A:** Unique opens ÷ (sends − bounces).

## Card: Click Rate
**Q:** What is the Click Rate formula?
**A:** Unique clicks ÷ (sends − bounces).

## Card: CTR
**Q:** What is the Click-Through Rate (CTR) formula?
**A:** Unique clicks ÷ unique opens.

## Card: Bounce Rate
**Q:** What is the Bounce Rate formula?
**A:** Bounces ÷ sends.

## Card: Delivery Rate
**Q:** What is the Delivery Rate formula?
**A:** (Sends − bounces) ÷ sends.

## Card: Opt-Out Rate
**Q:** What is the Opt-Out Rate formula?
**A:** Unsubscribes ÷ (sends − bounces).

## Card: Opt-Out Rate Trap
**Q:** ⚠️ Why might Opt-Out Rate be understated?
**A:** Preference Page unsubscribes are recorded as **consent updates**, not Email Engagement Unsubscribe events, so they are excluded from the metric.

---

## Surfacing Insights

## Card: Marketing Performance
**Q:** What is Marketing Performance and what does installing it require?
**A:** A Data Cloud + Tableau Next analytics surface; installation needs **both** the Data Cloud admin and Marketing Cloud Admin permission sets; viewing needs **Tableau Next Included App Business User**.

## Card: Opportunity Influence
**Q:** What is Opportunity Influence and what is its attribution window?
**A:** Email/SMS click attribution with a **30-day-before** window to Closed/Won.

## Card: Attribution Models
**Q:** What are the two attribution models?
**A:** **First-touch** vs. **last-touch**.

## Card: Sharing Trap
**Q:** ⚠️ What happens when you share folders or dashboards?
**A:** They **won't appear** to users — sharing alone does not grant visibility.

## Card: On-Canvas Analytics Cost
**Q:** ⚠️ What does opening element details in on-canvas analytics consume?
**A:** **Data Cloud credits**.

---

## Reporting Capabilities & Semantic Model

## Card: The Three Reporting Capabilities
**Q:** Name the three out-of-the-box reporting capabilities.
**A:** **Campaign Performance Dashboard** (individual campaign end-to-end) · **Marketing Performance Dashboard** (cross-channel over time) · **Semantic Data Model** (consistent business layer). ⚠️ All included with **no additional license**.

## Card: Campaign vs Marketing Performance
**Q:** What's the difference between the Campaign Performance and Marketing Performance dashboards?
**A:** **Campaign Performance** = one campaign, end to end (sends, opens, clicks, bounces, contact progression). **Marketing Performance** = broader **cross-channel view over time** (audience growth, program-level trends).

## Card: Embedded Campaign Dashboards
**Q:** Where else do performance dashboards appear?
**A:** **Embedded directly in each campaign record** — no need to navigate to a separate reporting tab.

## Card: Content Performance Access
**Q:** How do you access content performance dashboards?
**A:** Select the element in the **active flow** (e.g., Send Email Message) → **Analytics tab** → **Details** → pulse card metrics + row-level data.

## Card: Deliverability Dashboards
**Q:** Which channels do the deliverability dashboards cover?
**A:** **SMS, WhatsApp, and mobile app** messaging — showing delivery health and why messages failed to reach recipients.

## Card: Semantic Data Model
**Q:** What is the semantic data model?
**A:** Powered by **Tableau Next**, the **Marketing Intelligence Semantic Data Model** combines multiple **Data 360 objects** and defines relationships/metrics **centrally** so metrics calculate consistently.

## Card: Semantic Model Uses
**Q:** What can you do with the semantic data model?
**A:** Build **custom reports**, combine them as **dashboard widgets**, **customise** standard dashboards (widgets/labels/layouts/filters), **extend** to other Data 360 objects, share with stakeholders **outside CRM**, or connect **external tools**.

## Card: Unified Engagement History
**Q:** What is the Unified Engagement History dashboard, and how is it deployed?
**A:** A pre-built dashboard giving sales and marketing a **shared view** of lead/contact activity on an account. Embed by adding the component to **account, lead, and contact page layouts**.

---

## Related

- [[exam-revision-summary]] — Section 6 summary
- [[section-5-agentforce-ai]] — previous deck
- [[section-1-platform-setup-governance]] — restart the cycle
- `flashcards/channels-consent-reporting` — topic-based deep dive