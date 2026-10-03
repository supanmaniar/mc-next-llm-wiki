# Marketing Triggers (Behavioral Automation Events)

## Core Idea
Marketing triggers detect key customer behaviors (abandoned carts, product views, price drops, low inventory) and start automation event-triggered flows so marketers can respond with personalized, timely messages across channels.

## Prerequisites
- [[campaigns-and-flows]]
- [[data-kits-and-data-streams]]

## Detailed Explanation

### Available Triggers
| Trigger | Detects | Key Parameters |
|---------|---------|---------------|
| **Abandoned Shopping Cart** | Added items but didn't purchase | Inactivity period (10 min–7 days) |
| **Abandoned Page** | Viewed key pages, left without action | Inactivity period |
| **Abandoned Product Browse** | Viewed products, left without cart/purchase | Inactivity period |
| **Product Back In Stock** | Unavailable product now available | Lookback period (1–60 days) |
| **Product Low Inventory** | Stock below threshold | Threshold (1–1M units) |
| **Product Price Drop** | Price dropped by % | % drop (1–100%) |

### Event Sources for Automation Event-Triggered Flows
Marketing triggers are one category of event that can start an **automation event-triggered flow**. The full set of event sources is:

1. **Standard engagement events** — email opens, clicks, form submissions (**no additional configuration required**)
2. **Engagement signals** — custom customer engagement events you define (website interactions, PDF downloads, other tracked activities)
3. **CRM record-triggered events** (**Spring '26**) — fire when a **prospect, lead, contact, or any related object** record is created or updated
4. **Marketing triggers** — the behavioral triggers in the table above (abandoned cart, price drop, etc.)

See [[marketing-flow-types]] for the complete flow taxonomy.

### Common Configuration (all triggers)
1. Turn on the trigger (Setup → Marketing Features → Triggers).
2. Map required DMOs (checkmark = mapped).
3. Set conditions (Inactivity Period or Lookback Period + threshold).
4. Set Job Frequency (minutes 10–59 / hours 1–23 / days 1–7).
5. Select channels (Email, SMS/RCS, WhatsApp).

> **Inactivity Period vs. Job Frequency:** Inactivity = wait after last interaction; Job Frequency = how often the trigger job runs. They combine to determine when a shopper qualifies.

### Permission
**Marketing Triggers Admin** permission set.

### Order Lifecycle API Automation Events
API-first events that trigger flows from an external commerce system via POST:
- **Order Status via API** — order placed/processed/updated
- **Order Shipment Status via API** — shipped/delivered
- **Order Return via API** — return initiated

Trigger URL: `POST /services/data/<api_version>/actions/custom/flow/flowApiName`

Each event exposes a rich payload (Sales Order, Individual, Contact Point Email/Phone, Product DMOs) usable in merge fields and decision elements.

### Why Triggers Matter
Triggers expose **contextual data** in the flow event resource (product SKU, cart value, page URL, stock count) so marketers can personalize content and add conditions (e.g., only send for high-value carts).

## Common Pitfalls / Misconceptions
⚠️ Triggers require **DMO mapping** first — without mapped DMOs the trigger won't fire correctly.
⚠️ Inactivity period (wait) and job frequency (evaluation cadence) are **different** — don't conflate.
⚠️ Triggers are configured by admins (Marketing Triggers Admin), but consumed by marketers in flows.
⚠️ Order API events need your external commerce system to POST to Salesforce.

## Active Recall Questions
1. Name three product-related marketing triggers.
2. What's the difference between Inactivity Period and Job Frequency?
3. What permission set is needed to configure triggers?
4. What's the difference between the "back in stock" and "low inventory" triggers?

## Related Concepts
- [[campaigns-and-flows]]
- [[content-and-personalization]]
- [[marketing-flow-types]]
- [[engagement-signals]]

## Source References
- `sources/Marketing Cloud Next Salesforce Help Information.txt` — "Set Up Marketing Triggers in Marketing Cloud Next", "Order Lifecycle API Automation Events"
- `sources/MCNext_Consultant_Exam_Masterclass_Session2.txt` — Elliot Harper, "Marketing Cloud Next Consultant Exam Masterclass" Session 2 (Salesforce, Summer '26)
