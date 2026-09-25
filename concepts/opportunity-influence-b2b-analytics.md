# Opportunity Influence & B2B Analytics

## Core Idea
Opportunity Influence ties campaign engagement back to revenue (attribution), and B2B Analytics for Marketers connects CRM + engagement data to pipeline and revenue via ready-made dashboards — together they answer "which campaigns actually make money?"

## Prerequisites
- [[campaigns-and-flows]]
- [[reporting-analytics-setup]]

## Detailed Explanation

### Opportunity Influence
Uses engagement data to attribute opportunity revenue to specific campaigns.

**Attribution window:** An engagement activity is eligible from **30 days before** the opportunity is created to the date it's set **Closed/Won**.

**What it uses:**
- Email and SMS **click** engagement activities.
- People with a **contact role** on a Closed/Won opportunity.
- Does NOT use external-site activity or unified profile data (uses Individual objects).

**Attribution models:**
- **First-touch** — credit to first campaign the contact engaged with.
- **Last-touch** — credit to last campaign before close.

**Process:** After enabling, all eligible records evaluated (up to 1 hour), then hourly. Attribution records created for opportunities in past 30 days based on engagements in past 60 days.

**Display:** "Influenced Opportunities" related list on campaign records (up to 1,000 opportunities, ordered by revenue).

> **Note:** Opportunity Influence replaces previous Campaign Influence features — must disable old versions first. Requires the Sales data kit.

### B2B Analytics for Marketers (Advanced Edition only)
Dashboard collections bringing CRM + engagement data together.

**Setup:** Requires Marketing Performance Intelligence + Data Cloud Admin, Marketing Cloud Admin, Tableau Next Admin. Deploy Sales + Events data kits.

**Four dashboards:**
| Dashboard | Purpose |
|-----------|---------|
| **Account-Based Marketing** | Pipeline by account, buying groups, sales effort |
| **Pipeline** | Opp source, pipeline by lead source, campaign ROI% |
| **Marketing Manager** | Engagement mix, campaign performance, deal velocity, visitor volume |
| **B2B Attribution** | Attribution models (first/last touch, linear, time decay, U-shape) |

**Key formulas:**
- Campaign ROI% = (Revenue − Cost) / Cost
- Opportunity Win Rate = Won / (Won + Lost)
- Deal Velocity = AVG(CloseDate − CreateDate) WHERE IsWon

## Common Pitfalls / Misconceptions
⚠️ Opportunity Influence **only uses email/SMS clicks** — not opens, not external sites.
⚠️ It uses Individual objects, **not** unified profiles.
⚠️ Attribution window is **30 days before creation → Closed/Won**.
⚠️ B2B Analytics is Advanced edition only and requires specific data kit deployments.

## Active Recall Questions
1. What engagement types does Opportunity Influence use?
2. What's the attribution window for Opportunity Influence?
3. What's the difference between first-touch and last-touch attribution?
4. Name the four B2B Analytics dashboards.

## Related Concepts
- [[campaigns-and-flows]]
- [[reporting-analytics-setup]]

## Source References
- `sources/Marketing Cloud Next Salesforce Help Information.txt` — "Attribute Revenue to a Specific Campaign", "B2B Analytics for Marketers"
