# Activation-Triggered Flows

## Core Idea
An activation-triggered flow runs **when a Data 360 activation is published** — connecting segment data to external systems automatically via MuleSoft connectors or HTTP callouts, or sending to other marketing destinations.

## Prerequisites
- [[campaigns-and-flows]]
- [[flow-builder-elements]]
- [[data360-segment-types]]

## Detailed Explanation

### What It Is
An activation-triggered flow runs when an activation is published. Example: if a customer receives an email but doesn't open it, an activation-triggered flow can send their info to Google Ads via an activation so they receive a targeted ad.

Records are added based on the **segment publishing schedule** — refresh can be as often as every **10 minutes** (incremental) to every **24 hours** (standard), or triggered manually.

### Activation as the Personalization Source (key capability)
Conceptually these flows function like segment-based flows, but there's an important difference. When creating an activation you can:
- Add **filters to the activation membership**
- Add **contact point filters**
- **Limit audience size** based on attributes
- **Append additional attributes from related objects** associated with a segment member

**Why this matters:** messages can use the **activation directly as the personalization source**, allowing email **merge fields and repeaters** to reference **enriched Data 360 activation attributes** — **without requiring additional lookups at send time**.

In Email Builder you add an **activation data provider** and then use those activation attributes to personalize the message. See [[personalization-data-sources]].

**Demo pattern:** a segment of individuals who registered for a back-in-stock notification → data streams import the product catalog into a Goods Product DMO and registrations into a custom DMO (related to the Individual) → an activation uses the segment with a **Data 360 DMO target** and appends related attributes from the Goods Product DMO → an activation-triggered flow selects the activation and adds a Send Email Message element. When the segment refreshes, the activation publishes automatically and qualifying members enter the flow per the **re-entry rules**.

### Connecting to External Systems
Two ways to connect to an external destination:
1. **MuleSoft Connectors** — available within Flow Builder (select from supported third-party connectors).
2. **External Services (HTTP Callout)** — uses Named Credentials to configure API endpoints + authentication. Set up a Named Credential first, then select "Create HTTP Callout" when adding an action.

### Authentication Methods
- **OAuth 2.0 Authorization Code Flow** — user interaction via web browser (Per User access).
- **OAuth 2.0 Client Credentials Flow** — server-to-server, no user (handshakes must be standards-compliant).
- **Basic Authentication** — username/password in base64 header (use over HTTPS).
- **API Keys** — unique key in the HTTP request.

### Creating the Flow
1. Flows tab → New → **Activation-Triggered Flow**.
2. From the Activation Library, select the Data 360 activation that triggers the flow.
   - ⚠️ Supports **only activations with Data 360 as the activation target type**. Selecting another target type (like Marketing) causes an error on save.
3. In the Start element, optionally configure **exit rules** and **reentry conditions**.
4. Add actions: MuleSoft connector, HTTP callout, **Send to Data 360 Activation** element (can add multiple), Marketing elements (Send to Journey, Send SMS, Send Email), or standard Get/Create/Update/Delete Records.
5. Map fields required by the external system to the triggering activation data. Retrieve related attributes up to **5 levels deep** using **Collection Filter Criteria**.
6. Activate.

### Troubleshooting & Metrics
- Check the **publish status** of the segment used to create the activation.
- If segment publish = Success, verify Segment count and Activation count in the Publish History / Activation History tables.
- After an activation triggers the flow, a **flow version occurrence record** is created tracking entries, exits, and errors.
- Create a **Flow Element Run report** to view flow run details. Requires deploying the **FlowRun and FlowElementRun DMO** data streams (Flow Integration package).

### Rate Limits
Rate limits depend on license, measured in **actions per hour** (a flow run path = one action; a flow with a wait element = two actions).

| License | Actions/hour | Concurrent threads |
|---------|-------------|-------------------|
| RUN | 150,000 | 2 |
| Starter | 1,000,000 | 14 |
| Marketing Cloud, Data 360 | 15,000,000 | 210 |

- Formula: `(actions per hour × time to run in seconds) / 3600 = required concurrency per hour`.
- **Error rate limit:** elements failing >2.5% trigger additional rate limiting.
- **Real-time responses** (form submissions, SMS sign-ups, 2-way SMS, high-priority transactional emails) get a **50% additional allowance** to the concurrency limit.

### Other Considerations
- You **can't package Data 360 metadata** (activations) in the same package as non-Data 360 metadata. To package an activation with a flow, use **2 packages**.

## Common Pitfalls / Misconceptions
⚠️ Activation-triggered flows support **only Data 360 activation target type** — other target types error on save.
⚠️ Rate limits are actions/hour + concurrency; error rates >2.5% throttle the flow.
⚠️ Real-time-response flows get a 50% concurrency allowance.
⚠️ Data 360 metadata can't be packaged with non-Data 360 metadata.
⚠️ The activation can serve as the **personalization source** — no extra send-time lookups needed for enriched activation attributes.

## Active Recall Questions
1. What triggers an activation-triggered flow?
2. What are the two ways to connect to an external destination?
3. Which activation target type is supported?
4. What's the concurrency limit for Marketing Cloud/Data 360?
5. What's the error-rate threshold that triggers rate limiting?
6. What four things can you configure when creating an activation?
7. Why can an activation be used as the personalization source?

## Related Concepts
- [[campaigns-and-flows]]
- [[flow-builder-elements]]
- [[data360-segment-types]]
- [[data360-billing-usage]]
- [[marketing-flow-types]]
- [[personalization-data-sources]]

## Source References
- User-provided "Automate Data Delivery with Activation-Triggered Flows", "Comparison of Marketing-Oriented Flow Types"
- `sources/MCNext_Consultant_Exam_Masterclass_Session2.txt` — Elliot Harper, "Marketing Cloud Next Consultant Exam Masterclass" Session 2 (Salesforce, Summer '26)