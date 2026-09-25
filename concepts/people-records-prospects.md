# People Records: Prospects, Leads, Contacts & Unified Individuals

## Core Idea
Marketing Cloud Next tracks people through distinct lifecycle stages — Prospect (unqualified) → Lead (qualified) → Contact (customer) — while Identity Resolution merges their records into a **Unified Individual** used for segmentation. Each stage maps to DMOs in Data 360, and records can be created, imported, converted, and automated via flows.

## Prerequisites
- [[identity-resolution-rulesets]]
- [[segments-and-audiences]]
- [[scoring-models]]

## Detailed Explanation

### Prospect vs. Lead

| | **Prospect** | **Lead** |
|---|---|---|
| Definition | Shared contact info, not yet qualified | Qualified, shows buying intent |
| Funnel Stage | Top of funnel | Middle of funnel |
| Source | Campaigns, events, signup forms, referrals | Sales qualification, scoring |
| Qualification | Unqualified | Qualified (budget, authority, need, timeline) |
| Engagement | May have interacted only once | Actively engaging with sales/marketing content |
| Ownership | Marketing team (no owner) | Sales team (assigned owner) |
| Objective | Nurture & qualify | Convert to opportunity/contact |
| Conversion Potential | Low to medium | Medium to high |

### Contacts
Represents an open deal / ongoing relationship / closed effort. Created individually, bulk-imported, or by converting a qualified lead. With Sales/Service Cloud you can log sales activity or add a contact to an opportunity via **Opportunity Contact Roles**.

### Unified Individual
- Each new prospect/lead/contact creates an **Individual** record in Data Cloud at next sync.
- Identity resolution consolidates matching Individuals into a **Unified Individual**.
- Not a static "golden record" — a collection of IDs + contact points (email, phone) flagged for segmentation.
- Can't create individual/unified individual records manually (sync/harmonization only).
- **Prospects are treated as unified individuals** — you can build a unified individual segment for prospects and add them to campaigns.

### Related Records
- **Account** — represents someone's business; **required for creating a contact**. Tracks company size, industry, regulatory/association IDs.
- **Campaign Member** — relates a person to a marketing campaign for reporting/segmentation; status field tracks engagement (Responded, Attended).

### Common People-Record Tasks
- Create, edit, share, delete a record.
- Bulk import via CSV.
- Automate record creation with the **Create Records** element in a flow.
- Customize page layouts (related lists, buttons, Lightning components).
- Add/automate **consent data** for prospects/leads with Create Records.
- Score and grade prospects/leads on engagement activity.
- Use Prospect or Lead object with a **form** to auto-capture data into Salesforce records.

### Working with Prospects
- **Add:** Prospects tab → New → at least **last name, email, or phone** → Save.
- **Import:** Prospects tab → Import → CSV → map columns → Start Import. ⚠️ Include **opt-in values in the Consent Status column** if you plan to send marketing emails.
- Unqualified prospects remain **hidden** until they reach the required engagement score.

### Converting Prospects
- **Prospect → Lead (manual):** Prospects tab → Convert → name/select lead → enter info (owner, company) → Convert.
- **Prospect → Lead (flow):** **Data 360-Triggered Flow** → Start element = engagement score object → condition: engagement score > value → convert to lead.
- **Prospect → Contact (manual):** Convert → **Contact** → select contact + account (⚠️ creating a new account is disabled if you choose an existing contact) → optionally link an opportunity (or "Don't create an opportunity on conversion") → owner + converted status → Convert.
- **Prospect → Contact (flow):** **Record-Triggered Flow** on Prospect (created or updated) → condition (e.g., `ProspectStatus` = Qualified) → **Convert Prospect** action → inputs: Prospect ID, Converted Status (valid picklist option + **Converted checkbox selected**), Existing/New Contact, Existing/New Account, optional Opportunity. Data 360-triggered and form-triggered flows can also convert prospects.

### Prospect Considerations
- Converted prospects don't show in list view.
- Converting to existing lead only overwrites **empty** fields.
- **Multi-Currency:** if lead's annual revenue is empty but prospect's is populated, the prospect's Currency ISO code + annual revenue replace the lead's. Different currency codes → prospect's currency code wins (avoids conversion problems).
- If custom required fields enabled on leads, can't convert prospect → lead.
- Can't add prospect as campaign member.
- Prospects not supported in Data Import Wizard; can't clone/bulk-delete.
- Prospect status values = lead status values.

### Prospect → Lead/Contact/Account Field Mapping (key examples)
| Prospect Field | Lead | Contact | Account |
|----------------|------|---------|---------|
| Annual Revenue | Annual Revenue | N/A | Annual Revenue |
| Company | Company | Account Name | Account Name |
| Email | Email | Email | N/A |
| Industry | Industry | N/A | Industry |
| Phone | Phone | Phone | Phone |
| City | City | Mailing City | Billing City |
| Country | Country | Mailing Country | Mailing Country |
| State/Province | State/Province | Mailing State/Province | Billing State/Province |
| Zip/Postal Code | Zip/Postal Code | Mailing Zip/Postal Code | Billing Zip/Postal Code |
| No. of Employees | No. of Employees | N/A | No. of Employees |
| Title | Title | Title | N/A |
| Prospect Currency | Lead Currency | Contact Currency | Account Currency |

> ⚠️ **Title length gotcha:** the prospect Title field allows up to **128 characters**, but conversion **fails** if the lead's Title field would contain more than **80 characters**.

### Lead Assignment Rules
After a prospect converts to a lead, **Lead Assignment Rules** (Setup → Assignment Rules → Lead Assignment Rules) determine the record owner. Create a rule (active for leads), then rule entries with: processing **order**, the **condition** the lead must match, and the **user** assigned.

## Common Pitfalls / Misconceptions
⚠️ **Prospect ≠ Lead** — prospect is unqualified (marketing-owned), lead is qualified (sales-owned).
⚠️ Unified Individual records can't be created manually.
⚠️ Converting to an existing lead only overwrites empty fields.
⚠️ Prospect → Lead conversion fails if custom required fields exist on Lead.
⚠️ **Multi-currency:** the prospect's currency code wins on conversion to avoid conversion problems.
⚠️ **Title > 80 chars** on the lead breaks prospect → lead/contact conversion.
⚠️ **CSV prospect imports need opt-in consent values** before sending marketing emails.
⚠️ **Account is required to create a contact** — and you can't create a new account when converting to an existing contact.

## Active Recall Questions
1. What's the key difference between a prospect and a lead?
2. How is a Unified Individual created (vs. an Individual)?
3. What happens when converting a prospect to an existing lead with empty fields?
4. Which two objects can a prospect be converted into, and which flow types support it?
5. What's the Title length gotcha on conversion?
6. What do Lead Assignment Rules determine, and what three things does each rule entry specify?

## Related Concepts
- [[identity-resolution-rulesets]]
- [[segments-and-audiences]]
- [[scoring-models]]
- [[campaigns-and-flows]]
- [[consent-and-compliance]]
- [[personalization-data-sources]]

## Source References
- `sources/Marketing Cloud Next Salesforce Help Information.txt` — "People Records in Marketing Cloud Next", "Working with Prospects"
- `sources/People_Records_Deep_Dive.txt` — user-provided Salesforce Help articles (People Records, Considerations for Prospects, Working with Prospects, Convert Prospects, Prospect Field Conversion Mapping, Set Up Lead Assignment Rules)
