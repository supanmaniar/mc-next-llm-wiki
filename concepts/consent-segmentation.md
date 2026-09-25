# Consent Segmentation

## Core Idea
Segmenting **directly** on consent data isn't supported out of the box — the supported workaround is to build a **Calculated Insight** on consent data and use it in your segment filter (a metered, credit-consuming operation).

## Prerequisites
- [[consent-data-model]]
- [[segments-and-audiences]]
- [[data360-segment-types]]

## Detailed Explanation

### The Problem
Segmenting directly on consent data stored in Data Cloud **isn't supported out of the box today**. Subscriber-Key-based consent segmentation is on the roadmap.

### The Workaround: Calculated Insight
Create a **Calculated Insight** on consent data, then use that Calculated Insight in your segment filter.

**Sample Calculated Insight query:**
```sql
SELECT UnifiedIndividual__dlm.ssot__Id__c AS id__c,
count (UnifiedIndividual__dlm.ssot__Id__c) AS index__c,
ssot__CommunicationSubscriptionConsent__dlm.ssot__ConsentStatus__c AS ConsentStatus__c
FROM UnifiedIndividual__dlm
JOIN UnifiedContactPointEmail__dlm ON UnifiedIndividual__dlm.ssot__Id__c = UnifiedContactPointEmail__dlm.ssot__PartyId__c
JOIN ssot__CommunicationSubscriptionConsent__dlm ON ssot__CommunicationSubscriptionConsent__dlm.ssot__ContactPointValueText__c = UnifiedContactPointEmail__dlm.ssot__EmailAddress__c
GROUP BY ConsentStatus__c, id__c
```

⚠️ This query is a **starting point only** and will likely need modification for your data model and use case.

### Billing / Credits
Calculated Insights and segments that reference consent data are **metered Data Cloud usage types** — running them may incur additional credit consumption each time they run. Design and schedule them with this in mind, especially at high contact volumes.

## Common Pitfalls / Misconceptions
⚠️ You can't segment directly on consent data — use the Calculated Insight workaround.
⚠️ Consent segmentation consumes Data Cloud credits each time it runs.
⚠️ The sample query must be adapted to your data model.

## Active Recall Questions
1. Why can't you segment directly on consent data?
2. What's the supported workaround?
3. Why should you be careful about scheduling consent-based Calculated Insights?

## Related Concepts
- [[consent-data-model]]
- [[consent-audit-trail]]
- [[segments-and-audiences]]
- [[data360-segment-types]]
- [[einstein-segments]]

## Source References
- User-provided "Consent Management: Segmentation and the Consent Model" article