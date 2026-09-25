# Decision Branching & Path Experiments

## Core Idea
Flows route each customer to the right path using **Decision elements** (first-match-wins branching on data-graph attributes), and **Path Experiments** bring A/B testing *into* the flow so the winning variation can go out to the remaining audience automatically.

## Prerequisites
- [[campaigns-and-flows]]
- [[data-architecture-layers]]

## Detailed Explanation

### Branching Logic in Flows
Instead of one linear journey, a flow splits into multiple paths, each with its own content and actions. Branching is implemented with the **Decision element** — when a flow reaches it, the element evaluates the contact against criteria and routes each contact down a specific outcome path.

**Key rule:** outcomes are evaluated **in order**, and the **first match wins**. If no defined outcome matches, the contact follows the **default outcome** (the catch-all).

> **Order matters.** Place the most specific/restrictive criteria first; leave the broadest path as the default.

### Decision Element Structure (Three Parts)
| Part | Purpose |
|------|---------|
| **Decision Label** | Name shown on the canvas (clear, descriptive) |
| **Outcomes** | The possible paths (one per distinct branch + a default); each creates a connector on the canvas |
| **Outcome Conditions** | Criteria for each outcome (except default) |

Each **condition** has three parts:
- **Resource** — what the flow evaluates (attributes from the data graph; the menu shows a structured list of graph objects).
- **Operator** — how to compare (`Equals`, `Does Not Equal`, `Greater Than`, `Is Null`, etc.).
- **Value** — what it's tested against (typed entry or a reference to another field/resource).

### Flow Data Graph (Separate from Org Default)
Each flow uses **its own data graph**, separate from the org default:
- **Org default data graph** → which data populates *messages* for personalization.
- **Flow data graph** → which data the *flow* can evaluate for decisioning.

Connect the data graph directly to the flow (View Properties → Data Graph) to make fields available in the Decision element.

### Formula Resources
Before adding decision logic, you may create a **formula resource** — a computed value the Decision element can reference. Example: a `DaysSinceCreated` formula of `Today()-30` to test whether a contact was created in the last 30 days.

### Common Decision Patterns
- **Count + threshold** — "does this customer have ≥1 record meeting a condition" (e.g., annual revenue > $5,000).
- **Recency** — "was the record created within the last N days" (via formula resource).
- **Attribute match** — route by loyalty tier, spend, engagement score, etc.

### Path Experiments (Advanced Edition Only)
Traditional A/B testing happens *outside* the journey (split a list, send separate campaigns, manually piece results together). Marketing Cloud Next runs experimentation **natively inside the flow** via the **Path Experiment** element.

Path Experiment combines two capabilities:
1. **Random Split** — distributes contacts randomly across paths.
2. **Path Optimizer** — evaluates which path performs best.

**Configuration:**
- Choose the **success metric** (e.g., email link clicks).
- Set the **percentage** of the audience in the experiment.
- Set the **duration** of the experiment.
- Assign each path a percentage of the experiment audience.

> Path Experiments are **Advanced Edition only**, require the Marketing Cloud Manager or Admin permission set, and require personalization features to be set up. (Max 10 variations per test.)

### Selecting a Winner
- **Automatic selection** — the system tracks the metric and declares a winner when a path reaches **95% confidence** against all others, then automatically sends the **delayed group** (remaining contacts) down the winning path. If no path hits 95% before the test ends, the system applies the **fallback behavior** defined in settings.
- **Manual selection** — review results in the Path Experiment element's Analytics tab and choose the winner yourself (even before the test period ends). Useful when you want to factor in external data (CRM revenue, sales feedback).

Either way, after a winner is identified, the delayed group follows the winning path and the experiment closes. A **History tab** records all changes for a clear audit trail.

### Applying Insights to Future Campaigns
- **Update the campaign record** — store the winning offer type in notes/custom fields for future launches.
- **Refine segments** — different offers may win for different groups; encode this in Decision elements so each segment auto-receives the best offer.
- **Design better experiments** — a narrow result suggests other variables (subject line, timing, design) are worth testing.
- **Review Conversion Analytics** — a dashboard tracking how email/SMS messages contribute to outcomes (order completion, form submission) within a **30-day conversion window**.

## Common Pitfalls / Misconceptions
⚠️ **First match wins** — if you put a broad condition first, specific paths may never trigger. Order outcomes most-specific → least-specific.
⚠️ The **flow data graph** is separate from the **org default data graph** — connect it or Decision elements can't see the fields.
⚠️ Path Experiments are **Advanced Edition only** (not Growth).
⚠️ A **formula resource** is needed to evaluate computed values (like recency) — the Decision element can't compute on the fly.

## Active Recall Questions
1. What is the "first match wins" rule in a Decision element?
2. What are the three parts of a Decision element, and the three parts of a condition?
3. How does the flow data graph differ from the org default data graph?
4. What two capabilities does a Path Experiment combine?
5. At what confidence level does automatic selection declare a winner?

## Related Concepts
- [[campaigns-and-flows]]
- [[data-architecture-layers]]
- [[email-building-personalization]]

## Source References
- `sources/Salesforce_Trails.txt` — "Discover How Data Powers Marketing Cloud Next", "Create Branching with Decision Elements", "Improve Performance with Path Experiments"
