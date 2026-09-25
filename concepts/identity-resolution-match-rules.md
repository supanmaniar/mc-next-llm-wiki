# Identity Resolution Match Rules

## Core Idea
Match rules tell Data 360 **which profiles to unify** during identity resolution. Each rule contains one or more criteria; profiles match when **all** criteria in a rule are satisfied, and a unified profile is created if **any single** match rule is activated.

## Prerequisites
- [[identity-resolution-rulesets]]
- [[data-architecture-layers]]
- [[data-kits-and-data-streams]]

## Detailed Explanation

### Match Rules vs. Criteria vs. Methods
| Term | Role | Effect on consolidation |
|------|------|------------------------|
| **Match Rule** | An opportunity for records to be matched. Records must match the criteria of only **one** rule to be matched. | More rules → **higher** consolidation rate |
| **Match Criteria** | Within a rule, how precise the match is. Records must match **all** criteria in a rule. | More criteria → **lower** consolidation rate |
| **Match Method** | How source data is transformed before comparison. | More stringent (Exact) → lower; more permissive (Fuzzy Low) → higher |

### Objects Available for Matching
Match rules can be created only on certain objects (must be properly mapped):
- **Matching accounts:** Account, Contact Point Address, Contact Point Phone, Contact Point Email, Party Identification
- **Matching individuals:** Individual, Contact Point Address, Contact Point App, Contact Point Email, Contact Point Phone, Contact Point Social, Party Identification

### Match Methods (up to 5)
| Method | Behavior |
|--------|----------|
| **Exact** | Values match regardless of case (Maryanne = maryanne = MARYANNE) |
| **Exact Normalized** | Transforms data (trailing spaces, special chars, formatting); available for specific fields on Contact Point Email/Phone/Address + Individual First Name |
| **Fuzzy - High Precision** | Nicknames, punctuation, international abbreviations, cross-cultural spellings (William↔Bill, Håkon↔Hakon) |
| **Fuzzy - Medium Precision** | Same initials, gender variants, shuffled names (S.↔Sharon, Gabriel↔Gabrielle) |
| **Fuzzy - Low Precision** | Loose similarities (Lisa↔Liza, Cathi↔Cathy) |

**Fuzzy matching** uses an AI model (BERT) trained on 150+ countries, 3B English words, 20M names, with a **0.7 confidence threshold**. Fuzzy methods aren't available for Account object fields.

**Exact Normalized details:**
- **Email:** removes whitespace, non-alphanumeric chars (quotes, brackets); for gmail.com removes `.` and `+`.
- **Phone:** removes whitespace/non-alphanumeric; validates with Google libphonenumber; uses country code/name for normalization.
- **Address:** standardized per country-specific rules.

### Real-Time Matching Behavior
When a ruleset runs for **real-time matching**, all criteria except phone/email run using **Exact** regardless of the scheduled method. Phone and email run **Exact Normalized** (unless you specified Exact as the scheduled method).

### Advanced Match Criteria Settings
- **Case Sensitive** — uppercase doesn't match lowercase (e.g., Maryanne ≠ MaryAnne). Can also set "Use case sensitive matching to link Individual ID and Fully Qualified Key" for the whole ruleset.
- **Match on Blank** — empty values count as matches. ⚠️ Use thoughtfully to avoid overmatching (e.g., middle name). **Ignored in real-time.** Can cause the "matched 50,000 or more other profiles" error.

### Default Match Rules
- **Accounts:** 2 defaults — "Exact Name and Normalized Address" and "Exact Name and Normalized Address and Normalized Phone". Recommended: match by account name + geographical location.
- **Individuals:** 4 defaults — Fuzzy Name + Normalized Email / Phone / Address / Phone+Email. Identity resolution matches records with the same `Individual.Id` even without a rule.
- **Households:** only **one** match rule per ruleset; each household contains one+ individuals. Recommended: last name + address, or party identifier.

### Custom Match Rules
- Create based on **Party Identification** (Identification Number) or **Identity Match** (Identity Match Type) for external identity links.
- **Match on Device:** Exact match on `Device.AdvertiserId` (IDFA/AAID) unifies records across apps, Mobile Push, and offline files. Requires Device → Contact Point App → Individual mapping.
- ⚠️ **Matching on a single contact point isn't recommended** (except unique external identifiers) — it can mix household members sharing an email/phone into one profile.

### Configuration
1. Ruleset record homepage → Match Rules → Configure/Edit → Add Match Rule.
2. Select a default rule or **Custom Rule**.
3. Edit/add/delete criteria (object + field + match method).
4. Advanced settings: cross-object matching, case-sensitive, match on blank.
5. Name (≤80 chars) → Save.
6. Optionally add **filter conditions** (from primary DMO fields) to control which source records enter matching.

### Anonymous vs. Known Profiles
- A unified profile is **known** if any source profile was designated known; **anonymous** if only anonymous sources. Account profiles are always known.
- Known profiles from **all rulesets** count toward the entitlement limit. Use a second ruleset temporarily to test, then delete it.

## Common Pitfalls / Misconceptions
⚠️ More match rules raise consolidation; more criteria lower it — balance them.
⚠️ Matching on a single email/phone can merge household members into one profile.
⚠️ Match on Blank is ignored in real-time and can cause overmatching.
⚠️ Fuzzy methods aren't available for Account fields.
⚠️ You can't delete the last match rule from a ruleset (each needs ≥1).

## Active Recall Questions
1. What's the difference between match rules, criteria, and methods on consolidation rate?
2. Name the five match methods.
3. How does real-time matching differ from scheduled matching?
4. What are the four default match rules for individuals?
5. What's the risk of matching on a single contact point?

## Related Concepts
- [[identity-resolution-rulesets]]
- [[identity-resolution-reconciliation-rules]]
- [[data-architecture-layers]]
- [[contact-points-activation]]

## Source References
- User-provided "Identity Resolution Match Rules", "Identity Resolution Match Rule Terminology", "Configure Identity Resolution Match Rules", "Identity Resolution Match Methods", "Advanced Match Criteria Settings", "Default and Custom Match Rules", "Match Rules for Accounts", "Match Rules for Individuals", "Match Rules for Households", "Tips for Improving Account Matching", "Anonymous and Known Profiles in Identity Resolution"