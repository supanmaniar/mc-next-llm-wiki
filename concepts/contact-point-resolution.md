# Contact Point Resolution at Send Time

## Core Idea
In Data 360 an individual can have **multiple email addresses and multiple contact point values per channel** — so before a message sends, Marketing Cloud Next must decide **which contact point to use**, and that decision is controlled by the **flow configuration** (data graph, API payload, activation source priority, or an activation template).

## Prerequisites
- [[contact-points-activation]]
- [[identity-resolution-reconciliation-rules]]
- [[audience-flows]]
- [[activation-triggered-flows]]

## Detailed Explanation

### The Core Difference from MCE
Unlike **subscribers in Marketing Cloud Engagement**, which can only have **one email address**, in **Data 360 an individual can have multiple email addresses** — along with multiple contact point values for other channels like SMS.

### ⚠️ Reconciliation Rules Don't Resolve Contact Points
A common exam trap: people assume reconciliation rules decide which email address is used. They don't.

- A **reconciliation rule** determines which **single value** is selected for a **unified field that can't contain multiple values** — like an individual's **name**.
- **Reconciliation rules don't apply to contact points** such as email addresses or phone numbers.
- Instead, **all contact points are retained** as part of the unified profile and remain **available for segmentation and activation**.

### What Happens by Default (the multi-address example)
When an identity resolution ruleset matches several individual records to a single unified individual profile, and those records contain **different email addresses**:

- When an email is sent to that unified individual, a **separate message is sent to each unique email address**.
- If the **same email address appears more than once** across records, it's treated as a **single contact point** — so only **one** email is sent to that address.

> **Memory hook:** different addresses = multiple sends; duplicate addresses = one send.

### The Four Ways Contact Point Selection Is Determined
MC Next determines which contact point to use at send time in several ways, depending on how the **flow** and its **send message element** are configured:

| # | Method | How it works |
|---|--------|--------------|
| 1 | **Data graph in flow automation properties** | If a data graph was selected when the flow was created, that data graph is used for contact point selection. ⚠️ It must include a **specific structure and field set** for messages to send successfully (see the Salesforce Help page on required data graph structure). |
| 2 | **On-demand flow API payload** | The contact point is typically derived from the **values supplied in the API payload**. ⚠️ But if a data graph is configured in the flow's automation properties, that data graph **takes precedence**. |
| 3 | **Activation source priority order** | For **activation-triggered flows**, configure the activation's **source priority order** to determine which contact point is selected when multiple sources are available. |
| 4 | **Activation template** | For **audience flows using a segment**, create an **activation template** to define source priority order and filter rules, then select it when configuring the send message element. |

### Activation Templates
An **activation template** lets you define the **source priority order** and use **rules to filter** the segment members or contact points included in the activation.

**Creating one (demo):**
1. **Activations tab** in Data 360 → **New**.
2. Select **Template** as the activation type → **Continue**.
3. Select a **data space** and the **DMO used as the segment-on criteria** in your segment (typically **Individual** or **Unified Individual**).
4. Choose **Data Cloud** as the platform → **Continue**.
5. Define the **priority order for contact point selection** — expand the **email channel** → **Edit** → configure the **source priority order**.
   - Example: add **Salesforce → Contact**, then **Salesforce → Lead**, then **Any** (all other data sources).
   - Result: MC Next prioritises an email from a **Contact** record; if unavailable, a **Lead** record; then **any other source**.
6. **Save**.
7. *(Optional)* Add **contact point filters** (criteria applied to contact point DMOs) and **activation membership filters** (which segment members are included).
8. Name and save the template.
9. Back in the **audience flow**, open the **audience properties** and select the activation template.

> ⚠️ **An activation template is required when the segment's segment-on object is NOT Unified Individual.**

### Contact Point Field Selection (quiz point)
When configuring contact point selection for phone, you select the **telephone number field from the Contact Point Phone DMO** — not from the Individual or Unified Individual DMO. See [[contact-points-activation]] for the full contact point reference table.

## Common Pitfalls / Misconceptions
⚠️ **Reconciliation rules don't resolve contact points** — they only reconcile unified fields that can't hold multiple values (like name).
⚠️ **All contact points are retained** in the unified profile and remain available for segmentation and activation.
⚠️ **Different email addresses → separate messages**; duplicate addresses → a single send.
⚠️ A **data graph configured in flow automation properties takes precedence** over the on-demand API payload.
⚠️ The flow's data graph must have the **required structure and field set** or messages won't send.
⚠️ **An activation template is required when the segment-on object isn't Unified Individual.**
⚠️ For phone contact points, select the field from the **Contact Point Phone DMO**.

## Active Recall Questions
1. How does Data 360's contact point model differ from MCE subscribers?
2. Why don't reconciliation rules determine which contact point is used?
3. What happens when a unified individual has three records with two unique email addresses?
4. Name the four ways contact point selection can be determined at send time.
5. What takes precedence in an on-demand flow — the API payload or a configured data graph?
6. When is an activation template required?
7. Which DMO holds the telephone number field for phone contact point selection?

## Related Concepts
- [[contact-points-activation]]
- [[identity-resolution-reconciliation-rules]]
- [[audience-flows]]
- [[activation-triggered-flows]]
- [[rest-api-flow-integration]]
- [[data-architecture-layers]]

## Source References
- `sources/MCNext_Consultant_Exam_Masterclass_Session4.txt` — Elliot Harper, "Marketing Cloud Next Consultant Exam Masterclass" Session 4 (Salesforce, Summer '26)
- `sources/Contact_Points_and_Domains.txt` — "Contact Points and Source Priority Order"
