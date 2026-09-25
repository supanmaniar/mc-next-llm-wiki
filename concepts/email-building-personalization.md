# Building & Personalizing Emails

## Core Idea
The email editor lets you build structure on a canvas, add components, and layer personalization through rule-based dynamic content and merge fields — so a single email adapts its structure *and* its details to each recipient.

## Prerequisites
- [[content-and-personalization]]
- [[data-architecture-layers]]
- [[campaigns-and-flows]]

## Detailed Explanation

### The Email Editor (Three Core Parts)
| Part | Purpose |
|------|---------|
| **Canvas** | Arrange the overall structure of the message |
| **Components panel** | Choose elements (text, images, buttons, dividers) to add |
| **Properties sidebar** | Adjust settings per component |

### Message Purpose (Promotional vs. Transactional)
- **Promotional** — marketing content, offers, announcements. Requires opt-in consent.
- **Transactional** — relates to something the customer did (receipt, account update, password reset). Does **not** require a promotional subscription.

The selection determines which **compliance elements** the editor prompts for (e.g., mailing address, unsubscribe link), and which **consent rules** are applied at send time.

### Personalization Tracking Setup
Personalized experiences must be tracked to measure version performance. This is a **one-time-per-org** setup (Customer Engagement → Personalization Setup) that deploys the data/objects supporting analytics and decision tracking for rule-based personalization.

### The Data Graph: The Backbone of Personalization
Personalization is driven by a **recipient data graph** that brings together profile details (name, city, preferences) and related event data (purchases, sign-ups). Without a data graph:
- Merge fields can't resolve customer values.
- Targeting rules have no data to evaluate.

The **default data graph** (set in Customer Engagement setup) becomes the automatic data source in the email editor. A single, strategically built graph can power many personalization scenarios.

### Dynamic Content (Rule-Based Variations)
Dynamic content lets you create **multiple versions of a component** (heading, image, CTA) and use **targeting rules** (if-then conditions) to decide which version each customer sees. Best when structure stays the same but details change per recipient.

Key concepts:
- **Variation** — a specific version of a component (plus a **Default**).
- **Targeting condition** — `Resource | Operator | Value` (e.g., Birth Date `Is Between` Aug 1–31).
- **Variation priorities** — when a recipient qualifies for multiple variations, the one at the top wins.
- **Personalization point** — a named rule set that can be shared across components.

### Linking Components (Shared Personalization Points)
Instead of rebuilding variations per element, you **link multiple components to the same personalization point**. When a customer qualifies, all linked components (heading, hero image, CTA button) update together. Updates to rules/priorities/names apply everywhere that point is used.

> **Clone vs. Link:** Linking shares one point; cloning creates a separate copy with its own rules/settings.

### Merge Fields
Merge fields pull a value (name, city) directly from connected data into content. **Data-graph-based merge fields** are the recommended approach for most scenarios.

- Customer attributes (name, location) come from the data graph.
- If a merge field has **no value** for a recipient, the email still sends but shows blank (or **default text** if defined).

### Saved Expressions
A **saved expression** defines *which single value* to return when multiple are possible — using filters and sorting (most recent, highest value). Because they're saved, they're reusable across emails/channels.

Creating one requires a data graph + Marketing Cloud/CMS permissions. Example: an expression returning a customer's *most recent purchase*.

### Combining Dynamic Content + Merge Fields
Layer both: a variation decides the *structure* (August-birthday version), and merge fields populate the *details* (first name, city) within that variation.

### Preview & Test Workflow
1. **Preview** — select a segment + sample recipient; confirm each variation loads and merge fields resolve.
2. **Check rules/data** — review the Rules tab; confirm targeting rules use the data graph and attributes exist.
3. **Test send** — send a test to your own inbox to verify layout, images, links, and variations.

**Best practice:** always preview and test before sending. If a merge field shows a placeholder, revisit rules or confirm the field exists in the data source.

## Common Pitfalls / Misconceptions
⚠️ If **New Variation** is grayed out, a data graph likely isn't configured — add it under Data Sources.
⚠️ Fields can't be removed from a data graph after save — don't over-add.
⚠️ Merge fields with missing values still send (blank or default text) — add default text or tighten targeting rules.
⚠️ **Promotional vs. transactional** changes both compliance elements and consent rules — choose correctly.
⚠️ When linking, select a *current* personalization point or you'll be prompted to clone instead.

## Active Recall Questions
1. What are the three core parts of the email editor?
2. What's the difference between promotional and transactional message purpose?
3. What powers rule-based dynamic content, and how do variations get prioritized?
4. What's the difference between linking and cloning a personalization point?
5. What does a saved expression do?

## Related Concepts
- [[content-and-personalization]]
- [[personalization-data-sources]]
- [[merge-fields-and-expressions]]
- [[dynamic-content-variations]]
- [[repeaters-and-recommenders]]
- [[data-architecture-layers]]
- [[campaigns-and-flows]]
- [[consent-and-compliance]]

## Source References
- `sources/Salesforce_Trails.txt` — "Build Emails in Marketing Cloud Next", "Set Up Rule-Based Personalization", "Personalize Content with Merge Fields", "Review and Test Personalized Emails"
- `sources/Content_Personalization_Data_Sources_Deep_Dive.txt` — user-provided personalization articles (Data Sources, Merge Fields, Expressions, Variations, Linked Personalization Points, Repeaters, Recommenders)
