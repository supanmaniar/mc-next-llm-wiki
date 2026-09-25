# Consent Data Model

## Core Idea
Consent is stored in Data Cloud in the **Communication Subscription Consent (CSC) Data Model Object (DMO)**, keyed on the **Contact Point value + Communication Subscription Channel Type (CSCT) ID** — deliberately independent of PartyID — so a single address's preference is enforced conservatively at send time.

## Prerequisites
- [[consent-and-compliance]]
- [[data-architecture-layers]]
- [[contact-points-activation]]
- [[identity-resolution-rulesets]]

## Detailed Explanation

### Where Consent Lives
Consent is stored in Data Cloud in the **Communication Subscription Consent (CSC) DMO**. This is the single source of truth that Marketing Cloud Next checks at send time. It is **not** a checkbox on a Lead/Contact record.

### The Core Consent Model (Marketing Cloud Next)
Marketing Cloud Next consent is intentionally **agnostic of PartyID** (the individual identifier). Instead, it keys consent on:

1. **Contact Point value** — the email address, phone number, or device ID
2. **Communication Subscription Channel Type (CSCT) ID**

This design has two consequences:

- **Avoids conflicting consents for the same channel address.** A single email/phone can be associated with multiple individuals (shared household email, merges, duplicates). Keying on the individual would require resolving whose preference "wins."
- **Uses a conservative, regulator-friendly default.** If *any* individual sharing an address has opted out, the address is treated as opted out — matching how regulations are enforced (against the address being messaged).

### Individual / Unified Individual Relationship
Consent does **not** store a mapping to the Individual or Unified Individual. It's a direct mapping between the Contact Point value, Communication Subscription, and Engagement Channel Type.

- **At build time:** a Segment is created based on Individuals, and its output includes their related Contact Point values. A Send action is created, and you select which Communication Subscription is used to derive consent.
- **At send time:** each Contact Point value is evaluated against Communication Subscription Consent. If opted in, the message sends; if opted out, it doesn't. A relationship between the Unified Individual and the Contact Point value is needed so the Segment can produce the Contact Point values — but that's upstream and doesn't require a direct object relationship within the consent model.

### Shared Addresses
If two or more individuals share the same email or phone, an opt-out on that address affects **all** of them. There's no way to send to some individuals and suppress others when they share the same address — consistent with the conservative, address-level approach.

### The Broader Salesforce Consent Data Model (4 Levels)
The Salesforce Consent Data Model manages consent at multiple levels, from global preferences to granular controls. It considers the individual's entire experience, not just a single contact point. Any record relating to an individual (leads, users, person accounts, contacts) can have related consent.

| Level | Object | What it governs |
|-------|--------|-----------------|
| **1. Global Consent** | `Individual` | All-or-nothing settings: Don't Process, Don't Profile, Don't Solicit, Don't Track, Forget This Individual, Block Geolocation Tracking, Export Individual's Data, Individual's Age, OK to Store PII Elsewhere |
| **2. Engagement Channel Consent** | `ContactPointTypeConsent` | Consent by contact type (e.g., "email me but don't call me") |
| **3. Contact Point Consent** | `ContactPointConsent` | Consent by specific contact point (e.g., work email vs. personal email) |
| **4. Data Use Purpose** | `DataUsePurpose` | Consent based on the reason for communication (legal notices, marketing, service) |
| **Brand** (not a consent object) | `BusinessBrand` | Distinguishes consent preferences across different brands in the same org |

### Consent API
The Consent API aggregates consent settings across Contact, Contact Point Type Consent, Data Use Purpose, Individual, Lead, Person Account, and User objects (when records have a lookup relationship). It can't locate records where the email field is protected by Shield Platform Encryption. It returns consent based on a single action (like email or track); the multiaction endpoint allows multiple actions in one call.

## Common Pitfalls / Misconceptions
⚠️ Consent is keyed on the **contact point value**, not PartyID — PartyId is intentionally blank in consent records.
⚠️ A shared email/phone means an opt-out affects **everyone** sharing that address.
⚠️ The CSC DMO is separate from the Core CRM `CommunicationSubscriptionConsent` object — having data on the CRM object alone doesn't make records eligible for sending.
⚠️ Consent doesn't store a mapping to the Individual/Unified Individual.
⚠️ Since Summer '25 the CSC DMO may map to **both** `MessagingConsent` and `MessagingConsentV2` DSOs — pre-V2 instances can hold two records per Contact Point/Subscription/Channel. **MC Next always uses the latest record as the current status.**
⚠️ At send time MC Next reads a **consent cache**, not the DMO directly — see [[consent-cache]].

## Active Recall Questions
1. What two things does Marketing Cloud Next consent key on?
2. Why is consent intentionally agnostic of PartyID?
3. What happens when two people share one email address and one opts out?
4. What are the four levels of the broader Salesforce consent data model?
5. What does the Consent API aggregate across?

## Related Concepts
- [[consent-and-compliance]]
- [[consent-write-paths]]
- [[consent-sync-3-flow]]
- [[consent-audit-trail]]
- [[consent-segmentation]]
- [[consent-cache]]
- [[data-architecture-layers]]
- [[identity-resolution-rulesets]]

## Source References
- User-provided consent management articles (Consent Management: How Consent is Stored and Written; Segmentation and the Consent Model; Working with Leads, Contacts and Individuals)
- "Understand the Salesforce Consent Data Model" article