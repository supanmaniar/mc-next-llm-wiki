# Dynamic From & Reply Addresses

## Core Idea
Instead of one mailbox for every email, **Dynamic From and Reply addresses** resolve the sender, display name, and reply-to from related CRM or Data 360 records at send time — so subscribers see and reply to a specific person (contact owner, account manager, customer success manager) or a brand/region address. The right configuration depends on how you authenticate your sending domain.

## Prerequisites
- [[email-sending-setup]]
- [[email-domain-authentication]]
- [[email-creation-editing]]
- [[flow-builder-elements]]

## Detailed Explanation

### Two Ways to Source a Dynamic Address
| Source | What it is |
|--------|-----------|
| **Associated user** | Email of a related user (contact owner, account manager, customer success manager) — subscribers see/reply to a specific person |
| **Custom field** | Email stored in a custom field — can represent a brand, publication, or region instead of a person/inbox |

You can configure the **From address**, the **reply address**, or **both** dynamically.

### Capabilities
- **Sender identity** — personalize display name + From address.
- **Reply routing** — direct to a resolved mailbox, or through Reply Mail Management (RMM).
- **Data sourcing** — resolve from CRM data or a data graph.
- **Fallback values** — verified, authenticated address when a dynamic value doesn't resolve.

### How It Works
At send time, MC Next resolves the merge field expressions configured in the From/reply addresses and inserts the values into the **email header**.

**From address — depends on domain authentication:**

| | Scenario 1 | Scenario 2 |
|---|---|---|
| **Use when** | You send from an **authenticated subdomain** | You authenticate your **root domain** |
| **From address** | **Static** authenticated address | **Dynamic** address resolved from a record |
| **Display name** | Dynamic | Dynamic |
| **Reply address** | Dynamic (direct reply) | Dynamic (direct reply) |
| **Example source** | Contact owner or custom field | Contact owner or custom field |
| **Fallback** | Authenticated From + fallback reply | Authenticated From + fallback reply |

- **Static From + dynamic display name** — for subdomain senders. Avoids **DMARC alignment failures** (a personal address on the root domain would break alignment when sending from a subdomain).
- **Dynamic From** — for root-domain authenticators. Personal addresses align with the authenticated sending domain.

**Reply address:**
- Requires an **authorized email domain**. MC Next validates each resolved reply address's domain against your authorized list; if not authorized → **fallback address**.

### Reply Management
| Route | Behavior |
|-------|----------|
| **Direct reply** | Replies go straight to the resolved mailbox (e.g., sender's personal inbox); **bypasses RMM** (no auto-reply management, out-of-office handling, or unsubscribe processing) |
| **RMM routing** | Replies route through RMM → conversational agents, shared inboxes, or Sales/Service Cloud routing rules |

> Use RMM when your org requires **centralized handling** of email replies.

### Data Sourcing
- **CRM data** — standard/custom objects and fields (contacts, leads, accounts).
- **Data 360 data graph** — unified individual data.

### Fallback Mechanism
If a dynamic value is **missing or empty** at send time, MC Next uses the configured fallback. **Configure a verified, authenticated address as the fallback for every campaign** to maintain deliverability.

### Prerequisites (Domains)
- **Authenticated domains** — required to send personalized emails (root or subdomain used for personalized campaigns).
- **Authorized email domains** — required to route direct replies safely (verified so replies deliver to valid organizational mailboxes).

### Configuration (Flow Builder → Send Email Message → Sender Options)
**Static From + dynamic display name:**
1. From Address → **Dynamic Sending**.
2. Display Name → merge field (e.g., contact owner's full name).
3. From Address Type → **Static**.
4. Authenticated Addresses → select an authenticated address.

**Dynamic From:**
1. From Address → **Dynamic Sending**.
2. Display Name → merge field (e.g., customer success manager's name).
3. From Address Type → **Dynamic**.
4. From Address → merge field (e.g., CSM's email).
5. **Fallback Address** → authenticated fallback (used when the merge field can't resolve).

**Dynamic Reply Address:**
1. Reply Address → **Dynamic Reply Address** (add/verify an **Authorized Email Domain** if prompted).
2. Display Name → merge field.
3. Reply Address → merge field.
4. **Fallback Email** → fallback mailbox name + verified domain.

## Common Pitfalls / Misconceptions
⚠️ **Subdomain senders should use a static From address** — a personal root-domain address causes DMARC alignment failures.
⚠️ **Dynamic reply bypasses RMM** — no auto-reply/out-of-office/unsubscribe processing; use RMM for centralized handling.
⚠️ **Reply domains must be authorized** — otherwise the fallback address is used.
⚠️ **Always configure an authenticated fallback** — missing/empty dynamic values fall back to it.

## Active Recall Questions
1. What are the two ways to source a dynamic email address?
2. When should you use a static From address vs. a dynamic From address?
3. What does a dynamic reply address require, and what happens if the domain isn't authorized?
4. What's the difference between direct reply and RMM routing?
5. What happens when a dynamic value is missing at send time?

## Related Concepts
- [[email-sending-setup]]
- [[email-domain-authentication]]
- [[email-creation-editing]]
- [[flow-builder-elements]]
- [[consent-and-compliance]]

## Source References
- `sources/Email_Deep_Dive.txt` — "Dynamic From and Reply Addresses", "Configure Dynamic From Addresses", "Configure Dynamic Reply Addresses"