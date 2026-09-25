# Identity Resolution Rulesets

## Core Idea
Identity resolution matches duplicate and related records (from different systems) into a single **Unified Individual** record, so marketers can target real people instead of fragmented data fragments.

## Prerequisites
- [[data-kits-and-data-streams]]
- [[marketing-cloud-next-overview]]

## Detailed Explanation

### Why It Matters
Data originates from many systems, each labeling fields differently. Identity resolution **rulesets** define relationships between DMOs and their fields, so Data Cloud can unify related/duplicate data into unified records marketers use for targeting.

### Permissions & Billing
- **Create ruleset:** Data Cloud admin permission set
- **Billing:** Identity resolution consumes Data Cloud credits. **Recommend one active ruleset for Individual, and one for Account.** Two rulesets per object doubles identity-resolution billing.

### Generate a Ruleset for the Individual Object
The generated ruleset uses three match rules by default:
1. **Normalized Email** — matches on normalized email
2. **Lead to Contact** — prevents duplication when leads become contacts
3. **Device to Known** — matches web visitors to known profiles

Steps:
1. Setup → "Basic" → Basic Settings → Identity Resolution Rulesets section
2. Under Unified Individual → **Generate Ruleset**
3. Confirm → Generate
4. Verify on **Identity Resolutions** tab that status = **Published**

### Configure a Custom Ruleset (Individual or Account)
1. Identity Resolutions tab → **New** → Create New Ruleset
2. Select data space + Primary DMO (**Account** or **Individual**)
3. Enter 4-character ID (appended to API name to distinguish rulesets)
4. Name & save
5. From the record, **Match Rules → Configure** to define rules
6. Select which object to use for personalization (Unified Individual/Account)

### Recommended Custom Rules for Individual
Add two custom rules:
- **Lead to Contact** → Identity Match Type = `lead-to-contact`, Exact match
- **Web tracking attribution** → Identity Match Type = `device-to-known`, Exact match

> After Winter '26, generating an Individual ruleset includes these rules by default.

Steps to add:
1. Open ruleset → Match Rules → Edit → Next → **Add Match Rule**
2. **Custom Rule** → Next → name it
3. Match criteria: DMO = **Identity Match**, Field = **Identity Match Type**, Method = **Exact**
4. Advanced Settings → Configure → enter Identity Match Type value
5. Repeat for second rule

## Common Pitfalls / Misconceptions
⚠️ **Two active rulesets per object = double billing.** Keep one per object.
⚠️ Forgetting the 4-character ID — it's appended to the API name and needed to distinguish rulesets.
⚠️ The generated Individual ruleset already includes Lead to Contact and Device to Known — don't duplicate these if generating after Winter '26.

## Active Recall Questions
1. What are the three match rules in a generated Individual ruleset?
2. Why does Salesforce recommend only one active ruleset per object?
3. What is the "Identity Match Type" value for web tracking attribution?
4. What 4-character value distinguishes rulesets?

## Related Concepts
- [[data-kits-and-data-streams]]
- [[scoring-models]]
- [[segments-and-audiences]]
- [[identity-resolution-match-rules]]
- [[identity-resolution-reconciliation-rules]]

## Source References
- `sources/mktg_implementation_guide.pdf` — "Configure Identity Resolution Rulesets for Marketing Cloud Next"
- User-provided identity resolution deep-dive articles (match rules, reconciliation rules)