# Identity Resolution Reconciliation Rules

## Core Idea
Reconciliation rules select **a single value** to save to a unified field that can't hold multiple values (like a name) during identity resolution — they determine what's *shown* in the unified profile, not a "best" value, and they **don't apply to contact points**.

## Prerequisites
- [[identity-resolution-rulesets]]
- [[identity-resolution-match-rules]]
- [[contact-points-activation]]

## Detailed Explanation

### What Reconciliation Does
A reconciliation rule specifies how to select a single value to save to a unified field that can't have multiple values (e.g., an individual's name). Reconciliation rules are set at the **object level** and can be **overridden by field-specific** rules.

The reconciliation process:
- Does **not** delete or change source profile data.
- Does **not** update connected source systems.
- Does **not** tell you which source data to use.
- Determines only what's **shown in the unified profile** — reconciled values are shorthand to summarize/label a customer 360 profile, not a "best" value.

### Reconciliation Rules Don't Apply to Contact Points
⚠️ Reconciliation rules **don't apply to contact points** (email, phone). All contact points remain part of a unified profile, so all are available when creating activations. Use the **source priority order** in activations to deliver a contact point from the desired source.

### Reconciliation Rule Settings

| Rule | Definition |
|------|-----------|
| **Last Updated** | Value from the most recently updated record (by Last Modified Date on the primary DMO; available only when that field is mapped). Ties → alphabetical. |
| **Most Frequent** | Most frequently occurring value. If Ignore Empty Values, nulls aren't selected. Ties → last updated value. |
| **Source Priority** | Sorts data lake objects most→least preferred. Use on **ID fields** to stabilize IDs. If Ignore Empty Values, selects highest-priority non-null. |

**Source Priority nuance:** if records from the same source are matched, individual fields are reconciled per field-level rules. If the field-level rule is also source priority, the **last updated** value is selected.

### Example
A unified profile has First Name "Samantha" (source 1) and "Sam" (source 2).
- **Last Updated** rule + source 2 modified most recently → reconciled value = **Sam**.
- **Source Priority** rule + source 1 prioritized → reconciled value = **Samantha**.

### Configuration
- **Set a default reconciliation rule** for each object in the ruleset — tells identity resolution how to select values for all fields in an object.
- **Override an object's default** by applying a reconciliation rule to a specific field.
- **Reconciliation rule warnings** help identify fields to change/review. You can ignore them; identity resolution runs even with warnings.

### Unified Link Objects
Unified link objects connect your unified profile to all source data so you can choose which view of the customer to use. Use unified profiles to guide you to the best source data for your use case.

## Common Pitfalls / Misconceptions
⚠️ Reconciliation rules **don't govern contact points** — source priority does (in activations).
⚠️ Reconciliation isn't about finding a "best" value — it's about what's shown in the unified profile.
⚠️ It never changes source data or updates source systems.
⚠️ Use Source Priority on ID fields to stabilize ID values.

## Active Recall Questions
1. What are the three reconciliation rule types?
2. Why don't reconciliation rules apply to contact points?
3. What happens on a tie with the Last Updated rule?
4. When is the "last updated" value selected under a Source Priority rule?
5. What do unified link objects do?

## Related Concepts
- [[identity-resolution-rulesets]]
- [[identity-resolution-match-rules]]
- [[contact-points-activation]]
- [[data-architecture-layers]]

## Source References
- User-provided "Identity Resolution Reconciliation Rules" article