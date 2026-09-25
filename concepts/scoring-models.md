# Scoring Models (People & Accounts)

## Core Idea
Scoring assigns a 0–100 value to leads, contacts, prospects, and accounts based on **engagement** (how they interact) and **fit** (how closely they match your ideal customer), so you can build segments and target content.

## Prerequisites
- [[identity-resolution-rulesets]]
- [[data-kits-and-data-streams]]

## Detailed Explanation

### Availability
- **People scoring:** Growth or Advanced edition
- **Account scoring:** Advanced edition only

### Score Components
- **Engagement Score** — how engaged someone is (email clicks, web actions)
- **Fit Score** — how closely they resemble ideal customer (demographics)
- **Overall Marketing Score** — weighted combination of engagement + fit, normalized 0–100

### Enable & Create
1. Setup → "Marketing Cloud" → Reporting & Optimization → Customer Engagement → **Enable Scoring**
2. Go to Scoring Setup → create Scoring Model

**Create scoring model:**
1. Setup → "Scoring" → Scoring Models → New
2. Name + business unit → select People/Account/both
3. Edit score ratio (engagement vs fit)
4. (Account) optionally enable **intent scoring** → set ratio to 100%
5. Review/edit default Engagement/Fit rules or create custom rules
6. **Publish** → select frequency schedule

### Custom Scoring Rule
1. Select scoring model (must be Inactive/Draft)
2. New → Description → Match logic (AND/ANY)
3. Attribute + Operator + Value (exact, case-sensitive)
4. Add conditions / condition groups
5. Set points to add/subtract → Done

### Scoring Schedule
Frequency from **every 1 hour to every 24 hours** (4 options). More frequent = more actionable but more credits.

### Limits
- 30 engagement rules + 30 fit rules max
- 10 conditions per rule (nested conditions count)
- Growth: 1 scoring model; Advanced: 2 models

### Delete Order (Calculated Insights)
Delete in this exact order: Overall Marketing Score → Account Score → Marketing Engagement Score → Account Engagement Score → Lead Engagement Score → Contact Engagement Score → Marketing Fit Score → Account Fit Score → Account Intent Score → Individual Engagement Score.

### Default Scoring Values (People)

| Rule Type | Condition | Value | Points |
|-----------|-----------|-------|--------|
| Engagement | Website Engagement action | error | -5 |
| Engagement | Website Engagement action | form-submit | +10 |
| Engagement | Website Engagement action | anchor-click / button-click / search | +3 |
| Engagement | Website Engagement action | page-view | +1 |
| Engagement | Message action | SUBSCRIBE | +5 |
| Engagement | Message action | CLICK | +3 |
| Engagement | Message action | UNSUBSCRIBE | -5 |
| Engagement | Email action | CLICK | +3 |
| Engagement | Email action | UNSUBSCRIBE | -5 |
| Fit | Contact Point Address Country | United States | +3 |

### Account Scoring Defaults
- Engagement: Account Contact Activity Participant Email Message Incoming = true → +50
- Engagement: Lead Activity Participant Email Message Incoming = true → +50
- Fit: Account Type = Prospect → +30

## Common Pitfalls / Misconceptions
⚠️ Attribute values are **case-sensitive** — "UNSUBSCRIBE" not "unsubscribe".
⚠️ Account scoring requires Advanced edition.
⚠️ Deleting scoring models has a strict Calculated Insights deletion order.
⚠️ Scores are applied **retroactively** after publishing.

## Active Recall Questions
1. What are the three score types and how do they relate?
2. What's the point value of a page-view vs. a form-submit?
3. What's the max number of engagement rules allowed?
4. Why is the Calculated Insights deletion order important?

## Related Concepts
- [[identity-resolution-rulesets]]
- [[segments-and-audiences]]
- [[ai-features]]

## Source References
- `sources/mktg_implementation_guide.pdf` — "Score People and Accounts in Marketing Cloud Next", "Default Scoring System"