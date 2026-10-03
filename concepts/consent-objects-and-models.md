# Consent Objects & Models

## Core Idea
Salesforce contains **three separate consent models** in one org, and Marketing Cloud Next reads only one of them (Communication Subscription Consent, through the cache) — so a perfectly maintained record in the platform's standard consent model has **no bearing** on whether an email goes out.

## Prerequisites
- [[consent-data-model]]
- [[consent-and-compliance]]
- [[business-units]]

## Detailed Explanation

### Three Consent Models in Salesforce
A single org can contain all three models at once. Each answers a different question:

| Model | Question it answers |
|-------|---------------------|
| **Salesforce Consent Data Model** (`Individual`, `ContactPointTypeConsent`, `ContactPointConsent`, `DataUsePurpose`, with `BusinessBrand` alongside) | What is the **legal basis** for processing this person's data? |
| **Data 360 consent objects** (`Contact Point Consent`, `Privacy Consent Log`) | Can this contact point be used in an **activation**? |
| **Communication Subscription Consent** | Can Marketing Cloud Next **send this specific message**? |

The first is Salesforce's documented standard model, layered from global preferences on the `Individual` object down through channel type, contact point and purpose of use. It considers the whole person, and it's what you want if your requirement is **proof of consent or legal basis for an audit**.

**Marketing Cloud Next reads only the third one, through the cache.** A perfectly maintained `ContactPointTypeConsent` record has no bearing whatsoever on whether an email goes out.

### Four Consent Objects
| Object | Id prefix | What it is |
|--------|-----------|------------|
| **Communication Subscription** | `0Xl` | the subscription ("Weekly Newsletter") |
| **Engagement Channel Type** | `0eF`* | the channel (Email, SMS, WhatsApp, RCS) |
| **Communication Subscription Channel Type** | `0eB`* | one subscription paired with one channel |
| **Communication Subscription Consent** | – | the consent record itself |

**The first three are CRM objects.** Standard Salesforce sObjects, available in all editions. `CommSubscription` and `CommSubscriptionConsent` have both been in the API since **version 48.0** (Spring '20) — roughly five years before Marketing Cloud Next existed. When you create a subscription in the Consent tab, you create a **CRM record**:
```sql
SELECT Id, Name FROM CommSubscription

SELECT Id, Name, CommSubscriptionId, EngagementChannelTypeId
FROM CommSubscriptionChannelType
```

**The fourth object is the one that isn't in CRM.** Consent records live in **Data 360 only**. So "consent is all in Data 360" and "these are CRM objects" are both correct statements, about different halves of the same model.

⚠️ **Engagement Channel Type has no DMO at all.** Communication Subscription Channel Type carries an `ssot__EngagementChannelTypeId__c` with **no relationship attached**, so on the Data 360 side the channel is a bare identifier pointing nowhere.

### Subscription Governance (get it right at creation)
Four things about subscriptions that are much easier to get right at the start than to fix later:

- **Scope cannot be changed.** With business units enabled (Advanced Edition), a subscription is assigned either to a **single business unit** or to **all of them**, and the scope **cannot be edited after creation**. The assignment also limits which channels you can add to it.
- **Deleting a subscription deletes all of its consent data.** That's a legal exposure rather than an admin inconvenience; Salesforce's own recommendation is simply not to delete subscriptions once consent has been collected against them.
- **A new subscription does not appear on your preference page.** MC Next ships **one** customizable email preference page, and by default it contains the default marketing communication subscription and nothing else. Adding subscriptions to it is a **separate step** after you create the subscription.
- **There is no frequency capping on a subscription.** The platform has a `CommSubscriptionTiming` object for exactly this, related to consent in Salesforce's own model. **Marketing Cloud Next doesn't map it.** If you need send-frequency rules, they live in your journey logic or segment.

### How the Objects Connect
A consent record keys on the **contact point value combined with the Communication Subscription Channel Type Id**. That pairing is the whole join key, and it explains both what's easy and what's impossible: **searching consent by email address works, searching it by person doesn't**.

The Relationships tab confirms it from the other side: the consent DMO has **exactly one relationship you can traverse**, N:1 to Communication Subscription Channel Type. Nothing to Contact Point Email. The link to a person isn't a weak relationship here — it's a **string comparison you make yourself**.

There is also an out-of-the-box relationship between `Individual.Id` and `CommunicationSubscriptionConsent.Party`. **There will be no records connected through it.** The field is exactly as designed, just for a path Marketing Cloud Next doesn't use — the DMO is a standard object in the Data 360 Privacy subject area, designed for consent arriving from external systems that carry a person identifier. `ssot__PartyId__c` is wired end to end from the data lake object to the DMO, and **nothing ever flows through it**.

⚠️ **Don't build on the Party field.** No segment filters, no joins, no assumption that it will fill in later. If you need to get from a consent record to a person, go through the **contact point**.

### Joining Consent Back to a Person
The proper way — the same one the Privacy Consent Status component uses on Contact, Lead and Prospect — is to tie Communication Subscription Consent to the Individual through the **Contact Point Email** or **Contact Point Phone** DMO. Those carry the PartyId mapping that the consent record doesn't.

```sql
SELECT
    c."ssot__ContactPointValueText__c" AS contact_point,
    c."ssot__ConsentStatus__c"         AS status,
    cpe."ssot__PartyId__c"             AS individual_id
FROM "ssot__CommunicationSubscriptionConsent__dlm" c
JOIN "ssot__ContactPointEmail__dlm" cpe
    ON c."ssot__ContactPointValueText__c" = cpe."ssot__EmailAddress__c"
WHERE c."ssot__ContactPointValueText__c" = 'someone@example.com'
```
For phone consent, swap `ContactPointEmail` for `ContactPointPhone` and `ssot__EmailAddress__c` for `ssot__FormattedE164PhoneNumber__c`.

⚠️ **Check two things against your own org before relying on that query:**
1. The consent DMO exists in **two namespaces** — the older `ssot__CommunicationSubscriptionConsent__dlm` and a newer `std__CommunicationSubscriptionConsentDmo__dlm` (introduced in **API version 254**) — and their field lists are **not identical**.
2. Field names differ from the public reference: some orgs have `ssot__ConsentStatus__c` holding the value directly, where the documentation describes a `ssot__ConsentStatusId__c` reference.

The namespace split matters on its own: the public DMO reference for `ssot__CommunicationSubscriptionConsent__dlm` lists `ssot__ContactPointId__c` (a reference) and **no contact point value field at all**. The field you actually see in Data Explorer, labelled **Contact Point Value**, comes from the **newer generation** of the object. Two versions of the same DMO, documented in two places — and the page most search engines rank first describes the one you're probably not using.

## Common Pitfalls / Misconceptions
⚠️ Three consent models coexist; MC Next reads **only** Communication Subscription Consent (via the cache). The standard model is irrelevant to sends.
⚠️ `CommSubscription` / `CommSubscriptionConsent` are **CRM objects** (API 48.0, Spring '20) — but the consent *records* live in Data 360 only.
⚠️ **Engagement Channel Type has no DMO**; the channel is a bare identifier on the Data 360 side.
⚠️ Subscription **scope is fixed at creation** (single BU or all BUs) and limits which channels can be added.
⚠️ **Deleting a subscription deletes all its consent data** — a legal exposure, not just an admin inconvenience.
⚠️ A new subscription **does not appear on the preference page** by default — adding it is a separate step.
⚠️ **No frequency capping** on a subscription; `CommSubscriptionTiming` exists but MC Next doesn't map it.
⚠️ The `Party` field is wired but **always empty** — never build on it.
⚠️ The consent DMO exists in **two namespaces** with different field lists.

## Active Recall Questions
1. What are the three consent models in Salesforce, and which one does MC Next read?
2. Which three of the four consent objects are CRM objects, and since which API version?
3. Why does Engagement Channel Type have no DMO?
4. What are the four subscription governance rules you must get right at creation?
5. Why is the `Party` field always empty, and how do you join consent back to a person instead?

## Related Concepts
- [[consent-data-model]]
- [[consent-data-streams]]
- [[consent-write-paths]]
- [[consent-preference-pages]]
- [[business-units]]
- [[consent-and-compliance]]

## Source References
- `sources/Consent_Management_MCNext_SzymonLewandowski.md` — "Consent Management in Marketing Cloud Next" (Szymon Lewandowski, 20 Sep 2026)
