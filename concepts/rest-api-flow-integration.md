# Starting Flows from REST API & Apex

## Core Idea
Autolaunched flows can be started programmatically via a **REST API call** (invocable action endpoint) or from **Apex** (`Invocable.Action` or `Flow.Interview` classes) — enabling external systems and custom code to trigger flows with input variables and read output values.

## Prerequisites
- [[campaigns-and-flows]]
- [[flow-builder-elements]]
- [[marketing-triggers]]

## Detailed Explanation

### REST API
**Only autolaunched flows** can be started by a REST API call. The call runs the **active version** of the flow.

**Get flow metadata (inputs):**
```
GET /services/data/v65.0/actions/custom/flow/FLOW_API_NAME
```

**Run a flow:**
```
POST /services/data/v65.0/actions/custom/flow/FLOW_API_NAME
```
- Headers: `Authorization` (OAuth 2.0 token or session ID), `Content-Type: application/json`.
- Body: an `inputs` array with the flow's input variable names/values.

**Response:** includes `outputValues` (output variable names/values), the Flow Interview's unique GUID, and final status (`Finished`/`Error`). On error, `isSuccess` is `false` and an `errors` array provides details.

**Multiple instances:** include multiple objects in the `inputs` array — each runs as a separate flow execution in a **single transaction** (bulkifiable elements run as a bulkified operation).

### Apex — Two Classes
| Class | Behavior |
|-------|----------|
| **`Invocable.Action`** | Runs flows in batches with **bulkification**; references flows **dynamically** (string name, no referential integrity). Good for running arbitrary flows. |
| **`Flow.Interview`** | References flows **statically** (referential integrity); can't package/deploy Apex without the flow existing. Can't run in batches via bulkification. |

**`Invocable.Action` pattern:**
```apex
Invocable.Action flowAction = Invocable.Action.createCustomAction('flow','MyFunFlow');
flowAction.setInvocations(flowInputs); // List<Map<String,Object>>
List<Invocable.Action.Result> results = flowAction.invoke();
```

**`Flow.Interview` dynamic:**
```apex
Flow.Interview myFlow = Flow.Interview.createInterview('MyFunFlow', flowInputVariables);
myFlow.start();
String output = (String)myFlow.getVariableValue('outputVariable');
```

**`Flow.Interview` static:**
```java
Flow.Interview myFlow = new Flow.Interview.MyFunFlow(flowInputVariables);
myFlow.start();
```

### Notes
- SOQL and DML limits apply during flow execution (per-transaction flow limits).
- Starting a flow from Apex as a **flow admin** uses the **latest version** regardless of activation status.
- Screen flows can be embedded in Visualforce pages or custom Lightning (Aura) components.

## Common Pitfalls / Misconceptions
⚠️ Only **autolaunched** flows can be started via REST API.
⚠️ `Invocable.Action` = dynamic + bulkified; `Flow.Interview` = static + referential integrity (no bulkification).
⚠️ REST runs the **active** version; Apex as flow admin runs the **latest** version.
⚠️ Multiple inputs in one REST call run in a single transaction.

## Active Recall Questions
1. What's the REST endpoint to run a flow?
2. What's the difference between Invocable.Action and Flow.Interview?
3. Which flow version does REST run vs. Apex-as-admin?
4. How do you run multiple flow instances in one REST call?

## Related Concepts
- [[campaigns-and-flows]]
- [[flow-builder-elements]]
- [[marketing-triggers]]
- [[activation-triggered-flows]]

## Source References
- User-provided "Start a Flow from REST API", "Start a Flow from Apex"