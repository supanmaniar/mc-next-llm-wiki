# Q&A Study Guide — Section 6: Analytics & Performance Insights (8%)

> **Exam weight: 8%.** Scenario-driven questions with full reasoning. Cover the **Answer** and **Why** until you've committed to your own answer.
> **Related concept pages:** [[reporting-analytics-setup]] · [[reporting-metrics-dashboards]] · [[opportunity-influence-b2b-analytics]] · [[campaign-reporting-tools]]

---

## Q1 — Dashboard Selection

**Question:** A client reports that a large number of emails are failing to reach inboxes and wants to understand why. Which pre-built dashboard should the consultant recommend?

**Answer:** **The Deliverability dashboard — it shows email delivery and failure reasons.**

**Why:** The scenario's clue is "why" emails are failing, which requires failure-reason data. The Deliverability dashboard is purpose-built for this. The Email Engagement dashboard shows KPIs (opens, clicks) but not failure diagnostics. The roadmap flags dashboard selection as a thin spot worth drilling.

> ⚠️ **Distractor logic:** "The Email Engagement dashboard" is the plausible-but-wrong answer — it's the right channel but the wrong diagnostic lens.

---

## Q2 — Campaign Performance Dashboard

**Question:** A client wants to compare performance across individual campaigns. Which dashboard applies?

**Answer:** **The Campaign Performance dashboard — aggregated and individual campaign KPIs.**

**Why:** The dashboard covers both aggregate and per-campaign views, which matches the "compare across campaigns" requirement. Distinguishing it from Content Performance (which is cross-channel and variation-focused) is the tested skill.

---

## Q3 — Content Performance Dashboard

**Question:** A client wants to compare how different content variations performed across channels. Which dashboard applies?

**Answer:** **The Content Performance dashboard — cross-channel and variation data.**

**Why:** The two defining characteristics are "cross-channel" and "variation data". This links back to Section 4's dynamic content variations, so the dashboard is the measurement counterpart to that feature.

---

## Q4 — Channel-Specific Dashboards

**Question:** A client wants to analyse landing page engagement specifically. Which dashboard applies?

**Answer:** **The SMS / Forms / Landing Page Engagement dashboards (channel-specific).**

**Why:** These dashboards are grouped as channel-specific views. Recognising the grouping matters because the exam may ask about any of the three, and they share the same purpose — deep-diving a single channel.

---

## Q5 — B2B Analytics

**Question:** A client wants to understand how marketing influenced closed revenue. Which dashboards apply?

**Answer:** **B2B Analytics — Account-Based Marketing, Pipeline, Marketing Manager, and B2B Attribution — focused on revenue attribution.**

**Why:** The four dashboards form a revenue-attribution suite. The scenario's clue is "influenced closed revenue", which points to attribution rather than engagement metrics. This connects to Opportunity Influence (Q9).

---

## Q6 — Open Rate Formula

**Question:** A campaign sent 10,000 emails, had 200 bounces, and 3,000 unique opens. What is the Open Rate?

**Answer:** **3,000 ÷ (10,000 − 200) = 30.6%.**

**Why:** The formula is unique opens ÷ (sends − bounces). The critical detail is the **denominator**: bounces are excluded, so the rate reflects deliverable sends. Using sends alone (30.0%) is the classic error. All the rate formulas in this section share this "sends − bounces" denominator pattern.

> ⚠️ **Distractor logic:** "3,000 ÷ 10,000 = 30%" is the plausible-but-wrong answer — it omits the bounce adjustment.

---

## Q7 — Click Rate vs CTR

**Question:** A client is confused about the difference between Click Rate and CTR. How should the consultant explain it?

**Answer:** **Click Rate = unique clicks ÷ (sends − bounces). CTR = unique clicks ÷ unique opens.**

**Why:** The denominators differ: Click Rate measures clicks against *delivered* emails, while CTR measures clicks against *opened* emails. CTR therefore answers "of those who opened, how many clicked?" — a measure of content effectiveness rather than overall campaign performance.

> ⚠️ **Distractor logic:** "They are the same metric with different names" is the plausible-but-wrong answer — the denominators are genuinely different.

---

## Q8 — Bounce and Delivery Rate

**Question:** A campaign sent 10,000 emails with 200 bounces. What are the Bounce Rate and Delivery Rate?

**Answer:** **Bounce Rate = 200 ÷ 10,000 = 2%. Delivery Rate = (10,000 − 200) ÷ 10,000 = 98%.**

**Why:** Note the asymmetry: Bounce Rate uses **sends** as the denominator, while Delivery Rate uses sends minus bounces in the numerator. The two are complementary (they sum to 100%). Also note that a 2% bounce rate sits exactly at the Section 1 reputation threshold — a useful cross-reference.

---

## Q9 — Opt-Out Rate

**Question:** A campaign sent 10,000 emails, had 200 bounces, and 50 unsubscribes. What is the Opt-Out Rate?

**Answer:** **50 ÷ (10,000 − 200) = 0.51%.**

**Why:** The formula is unsubscribes ÷ (sends − bounces), following the same denominator pattern as Open and Click Rate. The practical caveat: Preference Page unsubscribes are recorded as consent updates, not Email Engagement events, so the metric **understates** reality (see Section 2, Q18).

> ⚠️ **Distractor logic:** "50 ÷ 10,000 = 0.5%" is the plausible-but-wrong answer — it omits the bounce adjustment.

---

## Q10 — Marketing Performance

**Question:** A consultant is installing Marketing Performance. Which permission sets are required, and what is needed to view it?

**Answer:** **Installation needs both the Data Cloud admin and Marketing Cloud Admin permission sets. Viewing needs Tableau Next Included App Business User.**

**Why:** The dual-permission requirement is the tested detail — installation spans two platforms, so a single admin cannot complete it. The viewing permission is separate, which means installation and access are distinct concerns.

> ⚠️ **Distractor logic:** "Marketing Cloud Admin alone" is the plausible-but-wrong answer — it omits the Data Cloud admin requirement.

---

## Q11 — Opportunity Influence

**Question:** A client wants to attribute closed revenue to email and SMS clicks. What is the attribution window?

**Answer:** **A 30-day-before window to Closed/Won.**

**Why:** The window is measured *backwards* from the Closed/Won date, capturing marketing touches in the 30 days preceding the close. This is a memorised number, and the direction (before, not after) is the detail most often confused.

> ⚠️ **Distractor logic:** "30 days after the click" is the plausible-but-wrong answer — it reverses the window's anchor.

---

## Q12 — Attribution Models

**Question:** A client wants to credit the campaign that first introduced a customer. Which attribution model applies?

**Answer:** **First-touch (as opposed to last-touch).**

**Why:** First-touch credits the earliest interaction; last-touch credits the final one before conversion. The choice materially changes which campaigns appear effective, so the model must be selected deliberately rather than by default.

---

## Q13 — Sharing Dashboards

**Question:** A consultant shares a dashboard folder with the marketing team, but the team reports they cannot see it. Why?

**Answer:** **Sharing folders or dashboards alone does not make them appear to users — sharing does not grant visibility.**

**Why:** This is a counterintuitive behaviour and a favourite exam trap. The natural assumption is that sharing equals visibility, but the platform requires additional configuration. The practical lesson is to verify visibility from the user's perspective after sharing.

> ⚠️ **Distractor logic:** "The team needs a higher permission set" is the plausible-but-wrong answer — it misdiagnoses a *visibility* issue as a *permissions* issue.

---

## Q14 — On-Canvas Analytics Cost

**Question:** A consultant opens element details in on-canvas analytics to investigate a flow run. What is the cost implication?

**Answer:** **Opening element details consumes Data Cloud credits.**

**Why:** This is an easily overlooked cost — investigating analytics is not free. It matters for high-frequency troubleshooting, where repeated detail views could accumulate meaningful consumption. Note also that on-canvas analytics is unavailable for runs before **Winter '25**.

---

## Q15 — NotSentReason

**Question:** A client wants to report on why emails were not sent. Which field and DMO should the consultant use?

**Answer:** **The NotSentReason field, which maps to Engagement Action Reason on the Email Engagement DMO.**

**Why:** The mapping tells you where to query. Common values include no consent, no opt-in, unauthorized From, hard bounce, and TTL exceeded. The "no consent" value links directly to Section 2, making this a useful cross-section diagnostic.

---

## Q16 — Campaign Stage

**Question:** A campaign has four completed flows and one errored flow. What does the Campaign Stage show?

**Answer:** **Error — one Error flow makes the whole campaign Error.**

**Why:** The stage aggregates across all flows, and a single error propagates upward. This is a frequently tested rule because the intuitive answer ("Completed", since most flows succeeded) is wrong.

> ⚠️ **Distractor logic:** "Completed" is the plausible-but-wrong answer — it reflects the majority state rather than the aggregation rule.

---

## Q17 — Marketing Calendar

**Question:** A client wants to see all their scheduled marketing activity in one view. Which flows will appear?

**Answer:** **Campaigns + Campaign Segment Flows + Segment Flows appear by default. Event-triggered and form-triggered flows do not appear.**

**Why:** The calendar is for plannable, scheduled activity, so event-driven flows are excluded. Access requires Marketing Cloud Admin/Manager or the Access Marketing Calendar permission, and you can drag campaigns (not segment flows).

---

## Q18 — Dashboard Selection Drill

**Question:** A client asks which dashboard to use for each of these: (a) comparing content variations, (b) diagnosing delivery failures, (c) attributing closed revenue. What should the consultant recommend?

**Answer:** **(a) Content Performance · (b) Deliverability · (c) B2B Analytics (B2B Attribution).**

**Why:** Each scenario maps to a dashboard's defining purpose: variation comparison → Content Performance; failure diagnosis → Deliverability; revenue attribution → B2B Analytics. The roadmap flags this scenario drill as a thin spot, so practising the mapping is high-value.

---

## Q19 — Metric Formula Drill

**Question:** A campaign sent 50,000 emails, had 1,000 bounces, 10,000 unique opens, 2,000 unique clicks, and 100 unsubscribes. Calculate Open Rate, Click Rate, CTR, Bounce Rate, Delivery Rate, and Opt-Out Rate.

**Answer:**
- **Open Rate** = 10,000 ÷ 49,000 = **20.4%**
- **Click Rate** = 2,000 ÷ 49,000 = **4.1%**
- **CTR** = 2,000 ÷ 10,000 = **20.0%**
- **Bounce Rate** = 1,000 ÷ 50,000 = **2.0%**
- **Delivery Rate** = 49,000 ÷ 50,000 = **98.0%**
- **Opt-Out Rate** = 100 ÷ 49,000 = **0.2%**

**Why:** The drill reinforces the denominator pattern: Open, Click, and Opt-Out all use **(sends − bounces)**, Bounce Rate uses **sends**, and CTR uses **unique opens**. Note that the 2% bounce rate sits exactly at the Section 1 reputation threshold — a useful cross-reference for interpreting whether the campaign is healthy.

---

## Q20 — The Three Reporting Capabilities

**Question:** A consultant is documenting the reporting capabilities included with Marketing Cloud Next. How many are there out of the box, and what does each provide?

**Answer:** **Three, all included with no additional license or SKU: the Campaign Performance Dashboard (end-to-end view of an individual campaign — sends, opens, clicks, bounces, contact progression), the Marketing Performance Dashboard (broader cross-channel view over time — audience growth and program-level engagement trends), and the Semantic Data Model (a consistent business layer for custom reports, stakeholder sharing, and external tool connections).**

**Why:** The distinction between the two dashboards is the tested skill: **Campaign Performance** is *one campaign, end to end*; **Marketing Performance** is *cross-channel, over time*. The semantic data model is the layer beneath both, used for custom reporting.

> ⚠️ **Distractor logic:** "The semantic data model requires an additional license" is the plausible-but-wrong answer — all three are included.

---

## Q21 — Marketing Performance Dashboard Location

**Question:** A marketer wants a consolidated view of performance across campaigns, channels, content, and audience segments. Where do they find it, and what does it cover?

**Answer:** **The Marketing Performance dashboards, available from the Marketing Analytics tab. They bring together activity across web, email, SMS, WhatsApp, and mobile — and the same dashboards are embedded directly in each campaign record.**

**Why:** From the Marketing Analytics tab you can review overall campaign engagement and identify top-performing campaigns, audience segments, content, and channels. The **embedded campaign record** version lets you evaluate an individual campaign's results in context without navigating to a separate reporting tab.

> ⚠️ **Distractor logic:** "You must navigate to a separate reporting tab for campaign results" is the plausible-but-wrong answer — the dashboards are embedded in the campaign record.

---

## Q22 — Content Performance Dashboard Access

**Question:** A marketer wants to see how a specific email element is performing within an active flow. How do they access content performance insights?

**Answer:** **Select the corresponding element in the active flow (such as a Send Email Message element), then from the Analytics tab click the Details button to review pulse card metrics for the content type plus row-level data.**

**Why:** Content performance dashboards help marketers identify top-performing content **directly in their flow of work**. The access path — flow element → Analytics tab → Details — is the tested detail, because it's not a standalone reporting tab.

> ⚠️ **Distractor logic:** "Open the Content Performance dashboard from the Analytics tab" is the plausible-but-wrong answer — content performance is accessed from the flow messaging element itself.

---

## Q23 — Deliverability Dashboards

**Question:** A client reports that some SMS and WhatsApp messages aren't reaching recipients. Which dashboard helps, and what does it show?

**Answer:** **The deliverability dashboards for SMS, WhatsApp, and mobile app messaging. They provide visibility into message delivery health and campaign performance, and help you understand why a particular message failed to reach specific recipients.**

**Why:** The deliverability dashboards are channel-specific for non-email channels. Their diagnostic value is the point — they don't just report failure rates, they help you **resolve delivery issues and improve future reach**.

> ⚠️ **Distractor logic:** "The Email Engagement dashboard" is the plausible-but-wrong answer — it covers email, not SMS/WhatsApp/mobile.

---

## Q24 — Semantic Data Model

**Question:** A client wants to build custom reports, share marketing data with stakeholders outside Salesforce CRM, and connect an external BI tool. What should the consultant recommend?

**Answer:** **The semantic data model — powered by Tableau Next, it provides the foundation for reports and dashboards in Marketing Cloud Next and is available from the Analytics tab.**

**Why:** MC Next includes the **Marketing Intelligence Semantic Data Model**, a reporting layer that combines data from multiple **Data 360 objects** and defines the **relationships and metrics** needed to report on campaign performance, engagement, and deliverability. Because those definitions are applied **centrally**, reports and dashboards calculate key metrics **consistently**. It can be **extended to other Data 360 objects** for org-specific requirements.

> ⚠️ **Distractor logic:** "Build a custom Data 360 DMO for reporting" is the plausible-but-wrong answer — the semantic model already provides the business layer.

---

## Q25 — Customising Standard Dashboards

**Question:** A client wants to adjust the standard dashboards to show different metrics and layouts. What can they change?

**Answer:** **Standard dashboards can be used as provided or customised by changing their widgets, labels, layouts, and filters.**

**Why:** The semantic model underpins the standard dashboards, so customisation happens at the presentation layer (widgets, labels, layouts, filters) rather than by rebuilding the data layer. You can also create **reports** answering specific business questions and combine them as **widgets in a dashboard**.

> ⚠️ **Distractor logic:** "Standard dashboards are read-only" is the plausible-but-wrong answer — they're customisable.

---

## Q26 — Unified Engagement History

**Question:** A sales team wants visibility into which contacts at an account are most engaged with marketing. What should the consultant recommend, and how is it deployed?

**Answer:** **The Unified Engagement History dashboard — a pre-built dashboard giving sales and marketing a shared view of activities performed by the leads and contacts associated with an account. Embed it by adding the Unified Engagement History dashboard component to the account, lead, and contact page layouts.**

**Why:** Sales reps use the insights to identify the **most engaged people**, understand their **interests**, and determine **who to contact next**. It's powered by **Data 360 and Tableau Next**. The deployment detail — adding the component to **page layouts** — is the tested skill.

> ⚠️ **Distractor logic:** "It's a standalone dashboard in the Analytics tab" is the plausible-but-wrong answer — it's designed to be embedded on record pages.

---

## Related

- [[exam-revision-summary]] — Section 6 summary
- [[section-5-agentforce-ai]] — previous guide
- [[section-1-platform-setup-governance]] — restart the cycle
- `Exam Section Based Flashcards/section-6-analytics-insights` — recall drilling