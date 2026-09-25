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

## Related

- [[exam-revision-summary]] — Section 6 summary
- [[section-5-agentforce-ai]] — previous guide
- [[section-1-platform-setup-governance]] — restart the cycle
- `Exam Section Based Flashcards/section-6-analytics-insights` — recall drilling