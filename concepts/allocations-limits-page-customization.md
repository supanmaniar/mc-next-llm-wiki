# Allocations, Limits & Page Customization

## Core Idea
Marketing Cloud Next has hard limits on flows, scoring, message credits, and CMS storage that differ between Growth and Advanced editions — and a few recommended Lightning components you should add to record pages for marketers.

## Prerequisites
- [[marketing-cloud-next-overview]]
- [[scoring-models]]

## Detailed Explanation

### Edition Limits

| Resource | Growth | Advanced |
|----------|--------|----------|
| Total active flows | 500 | 750 |
| Total saved flows | 50,000 | 50,000 |
| Versions per flow | 50 | 50 |
| Email message credits | 180,000/yr | 360,000/yr |
| CMS storage | 10 GB + 2 GB/user | 10 GB + 2 GB/user |
| Fit scoring rules | 30 | 30 |
| Engagement scoring rules | 30 | 30 |
| Scoring models | 1 | 2 |

> SMS credits aren't included in any edition — purchasable add-on.

### Recommended Lightning Components

| Component | Description | Available on |
|-----------|-------------|-------------|
| **Privacy Consent Status** | List of subscriptions + consent values | Lead & Contact records |
| **Data Cloud Profile Engagement** | Table of engagement metrics from automations/messaging | Lead & Contact records |
| **Data Cloud Profile Insights** | Numerical engagement score | Lead & Contact records |

### Data Cloud Profile Engagement Settings
- Match On: Lead ID or Contact ID
- Data Space: default
- Unified Individual DMO: Unified Individual
- Unified Individual Link: Unified Link Individual
- Engagement DMOs: Flow Runs (campaigns) + Messaging Engagement (SMS)

### Data Cloud Profile Insights Settings
- Calculated Insight → Measure field:
  - Marketing Engagement Score → `Engagement__Score__c`
  - Marketing Fit Score → `Fit_Score__c`
  - Overall Marketing Score → `People_Score__c`

## Common Pitfalls / Misconceptions
⚠️ Account scores **can't** be added to account pages (only lead/contact).
⚠️ Growth edition allows only **1** scoring model; Advanced allows 2.
⚠️ The Data Cloud Profile Insights component must be configured per score type.

## Active Recall Questions
1. How many active flows does Growth vs. Advanced edition allow?
2. How many scoring models can each edition have?
3. What's the Measure field for the Overall Marketing Score?
4. Which component shows someone's engagement score?

## Related Concepts
- [[scoring-models]]
- [[marketing-cloud-next-overview]]

## Source References
- `sources/mktg_implementation_guide.pdf` — "Allocations and Limits", "Recommended Page Customization"