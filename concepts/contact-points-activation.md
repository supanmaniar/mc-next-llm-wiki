# Contact Points & Activation Source Priority

## Core Idea
When you publish a segment to an **activation target**, contact point selection decides *which* fields (email, phone, MAID, etc.) get sent, and **source priority order** decides *which value* wins when a contact has that data from multiple sources.

## Prerequisites
- [[data360-segment-types]]
- [[identity-resolution-rulesets]]
- [[data-architecture-layers]]

## Detailed Explanation

### What Contact Points Are
A **contact point** is a communication identifier (email address, phone number, device ID) attached to a Unified Individual. Contact point selection determines which objects/fields are included in an activation and sent to an activation target. Each activation target type accepts different contact points.

> Prerequisite: complete all required data stream mappings and data model relationships first. Some contact points require specific DMO fields to be populated.

### Contact Point Reference Table

| Contact Point | Supported Targets | Required Relationship | Key Fields |
|---------------|-------------------|-----------------------|------------|
| **Phone Number** | Cloud File Storage, External Platform, MC Engagement | Contact Point Phone.Party → Individual.Id (ManyToOne) | Subscriber Key, Formatted E164 Phone, Country (ISO 3166 for MC Engagement) |
| **Email Address** | Cloud File Storage, External Platform, MC Personalization, MC Engagement | Contact Point Email.Party → Individual.Id | Subscriber Key, Email Address |
| **Mobile App (MobilePush)** | MC Engagement | Contact Point App.Party → Individual.Id | Subscriber Key |
| **Mobile Advertiser ID (MAID)** | External Platform | Contact Point App.Party → Individual.Id; Contact Point App.Device → Device.Id | Device: Device Id, Advertiser Id, OS Name (iOS/Android) |
| **Over-the-top (OTT) ID** | External Platform | Same as MAID | Device: Device Id, Advertiser Id, OS Name (RokuOS/AndroidTV/tvOS/FireOS/Tizen/SmartCast/WebOS) |
| **WhatsApp** | MC Engagement, Cloud File Storage | Contact Point OTT Service.Party → Individual.Id | Subscriber Key, Username, Country (ISO 3166) |
| **Contact Point Digital Id** | External Activation Platforms, Cloud File Storage | Contact Point Digital Id.Individual → Individual.Id | Contact Point Digital Id, Digital Id Type |

**Notes:**
- OS Name is **case-insensitive** (must be one of the listed values).
- **Digital Id** doesn't appear on the Channel Selection page by default — it appears in the **Contact Point Filter** section only after you add attributes from the Contact Point Digital Id DMO.

### Source Priority Order
Used to determine **which contact point value is selected** when multiple values are available (or to reorder which value is chosen for segment members with data from multiple sources). Change priority by adding, reordering, or deleting sources.

**Key architectural fact:** after Identity Resolution, all contact points remain part of the Unified Individual DMO. **Reconciliation rules only reconcile Unified Individual object fields — NOT unified contact point objects.** So source priority (not reconciliation rules) determines which source delivers the contact point.

### Priority Value Options

| Value | Condition |
|-------|-----------|
| **Primary** | The Primary Flag field is mapped in Data Streams |
| **Any** | Primary Flag isn't mapped — retrieves from any available source |
| **Personal** | For Personal Use field mapped, value = 1 |
| **Business** | For Business Use field mapped, value = 1 |

> If Email Type is not "Any", the **Primary Flag must be mapped** on the corresponding contact point DMO for contact points to match.

> To use values **only from specific sources**, delete **Any Source** and **Any Type** from the priority order — but expect a **lower population count** (fewer sources = fewer matches).

### Default Source Priority Order

| Platform | Priority 1 | Priority 2 | Priority 3 |
|----------|-----------|-----------|-----------|
| MC Engagement (Phone, Email, WhatsApp) | MC Engagement → Primary | Any → Any | — |
| MC Personalization | MC Personalization → Primary | MC Engagement → Primary | Any → Any |
| Cloud File Storage (S3, SFTP, GCS, Azure) | Any → Any | — | — |
| MobilePush (in MC Engagement) | MC Engagement → Primary | — | — |

- **B2C Commerce Cloud and MobilePush**: default order is fixed and **can't be changed**.
- **External platforms**: the platform **creator defines** the default order.

### Example
A segment sources data from **MC Engagement and Amazon S3**, with the Email contact point added. Default priority selects each individual's email from **MC Engagement first**, falling back to S3 only if absent. If you remove "Any Source/Any Type", the segment shrinks because only MC Engagement addresses are included.

## Common Pitfalls / Misconceptions
⚠️ **Reconciliation rules don't govern contact points** — only Unified Individual fields. Source priority is what actually controls contact-point delivery.
⚠️ If Email Type ≠ "Any", the **Primary Flag** must be mapped or contact points won't match.
⚠️ Removing "Any Source/Any Type" reduces population — intentional but easy to overlook.
⚠️ OS Name and Country are **case-insensitive** but must be exact valid values (ISO 3166 country codes; specific OS lists).

## Active Recall Questions
1. What's the difference between contact point *selection* and *source priority order*?
2. Why can't reconciliation rules determine which contact point to deliver?
3. What do the "Primary", "Personal", and "Business" priority values depend on?
4. Which platforms have a fixed (unchangeable) default source priority order?
5. What happens to population count when you remove "Any Source/Any Type"?

## Related Concepts
- [[data360-segment-types]]
- [[identity-resolution-rulesets]]
- [[data-architecture-layers]]
- [[consent-and-compliance]]

## Source References
- `sources/Contact_Points_and_Domains.txt` — "Contact Points and Source Priority Order", "Default Source Priority Order"