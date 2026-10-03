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

### On-Demand Flows (API transactional messaging)
On-demand flows let external systems trigger **transactional messaging instantly** through the REST API. Real-time personalization data is passed **directly in the API payload** using an **Apex-defined data schema** — there's **no requirement to first ingest or hydrate data into Data Cloud**.

**Setup pattern (demo):**
1. Create an **Apex wrapper class** defining the variables to pass in the payload.
2. Create a **transactional email** that uses an **Apex class data provider** to personalize content from those properties.
3. In the flow, create an **Apex-defined variable** based on the class and enable **Available for Input** (lets external systems pass values via API).
4. Add a **Send Email Message** element referencing the transactional email.
5. Trigger via REST Explorer: `POST /services/data/vXX/actions/custom/flow/FLOW_API_NAME`.

**Key API requirements:**
- Both the **email address** and **individual ID** values are **required**.
- ⚠️ The **individual ID does not need to correspond to an Individual record in Data 360** — it simply **cannot be null**.
- The request **won't create a new record** in the Individual DMO, although the resulting engagement activity **will still appear in the Email Engagement DMO**.
- **Typical latency: ~1–3 seconds** — ideal for one-time passcodes, order confirmations, password resets, real-time service alerts.

### Broadcast Flows (API fan-out)
Broadcast flows are also triggered through the REST API, but **target all members of a dynamic segment** rather than a single individual.

**Setup pattern (demo):**
1. Create a segment (e.g., a passenger manifest) with **parameterized values** enabled for each rule — this lets you pass values into the segment dynamically at execution time.
2. ⚠️ You can **combine static and parameterized criteria** in the same segment definition.
3. Create an email using an **Apex class data provider** to personalize content from the API payload.
4. In the flow, select the segment and create **flow variables for each parameterized segment value**, each marked **Available for Input**.
5. Trigger via the same REST endpoint, appending the broadcast flow's API name.

**What happens on execution:**
1. The flow passes the parameter values required by the dynamic segment.
2. The segment **refreshes** and evaluates all individuals matching **both static and dynamic criteria**.
3. Every qualifying segment member is **admitted into the broadcast flow**.
4. Each recipient receives the personalized message.

Broadcast flows can run **synchronously or asynchronously**, depending on the use case.

## Common Pitfalls / Misconceptions
⚠️ Only **autolaunched** flows can be started via REST API.
⚠️ `Invocable.Action` = dynamic + bulkified; `Flow.Interview` = static + referential integrity (no bulkification).
⚠️ REST runs the **active** version; Apex as flow admin runs the **latest** version.
⚠️ Multiple inputs in one REST call run in a single transaction.
⚠️ On-demand flows require **email address + individual ID** — the ID can't be null but needn't match a Data 360 Individual record.
⚠️ On-demand flows **don't create** an Individual DMO record, but engagement still lands in the Email Engagement DMO.
⚠️ Broadcast flows require a **dynamic segment**; you can mix static and parameterized criteria.
⚠️ Broadcast flow variables for parameterized segment values must be marked **Available for Input**.

## Active Recall Questions
1. What's the REST endpoint to run a flow?
2. What's the difference between Invocable.Action and Flow.Interview?
3. Which flow version does REST run vs. Apex-as-admin?
4. How do you run multiple flow instances in one REST call?
5. What two values are required for an on-demand flow API call, and what's the rule about the individual ID?
6. What segment type must a broadcast flow use, and what happens on execution?
7. What is the typical latency of an on-demand flow?

## Related Concepts
- [[campaigns-and-flows]]
- [[flow-builder-elements]]
- [[marketing-triggers]]
- [[activation-triggered-flows]]
- [[marketing-flow-types]]

## Source References
- User-provided "Start a Flow from REST API", "Start a Flow from Apex"
- `sources/MCNext_Consultant_Exam_Masterclass_Session2.txt` — Elliot Harper, "Marketing Cloud Next Consultant Exam Masterclass" Session 2 (Salesforce, Summer '26)