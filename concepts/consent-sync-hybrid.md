# Consent Sync & Hybrid

## Core Idea
The standard Salesforce `Email Opt Out` field (`HasOptedOutOfEmail`) does **not** automatically sync with the Marketing Cloud Next Consent layer — you bridge the gap with a **two-Flow solution** (one CRM→MC Next, one MC Next→CRM), and use Consent Mapping tools to run Account Engagement / Marketing Cloud Engagement side by side.

## Prerequisites
- [[consent-write-paths]]
- [[consent-data-model]]
- [[campaigns-and-flows]]

## Detailed Explanation

### The Gap
Marketing Cloud Next manages email consent through a dedicated Consent layer (Communication Subscription Consent records). The standard Salesforce Contact and Lead objects include an **Email Opt Out** field (`HasOptedOutOfEmail`), but this field does **not** automatically sync with the MC Next Consent layer.

Without custom configuration:
- A Contact/Lead that opted out in Salesforce CRM may still receive marketing emails through MC Next.
- A contact who unsubscribes via a Marketing preference page may not have their opt-out reflected on the Contact/Lead record.

### Flow 1: CRM → Marketing Cloud Next
Use an **Automation Event-Triggered Flow** on the Contact or Lead object to listen for new records or changes to the Email Opt Out field, and update the Communication Subscription Consent record.

1. In the **Flows** tab in Marketing, create a new **Automation Event-Triggered Flow**.
2. Configure the trigger: select the event **Prospect, Lead, Contact or Related Record Change**; add trigger conditions (e.g., fire only when `HasOptedOutOfEmail` changes).
3. Add a **Consent Request Action** to update the CSC record with the opt-out status.
4. (Optional) For **Double Opt-In**, add an email message step to request confirmation before updating consent.
5. For multiple channels/subscriptions, add **Decision Actions** to branch logic.
6. Save and activate.

### Flow 2: Marketing Cloud Next → CRM
Use a **Data Cloud-Triggered Flow** to listen for changes to MC Next Consent records and update the Email Opt Out field on the corresponding Contact/Lead.

Consent changes in MC Next can originate from: Preference Page, Consent Import, Channel Update (email reply unsubscribe, SMS STOP), Consent Status LWC, Create Consent Flow Action.

1. In Salesforce Setup → Flow Builder, create a new **Data Cloud-Triggered Flow**.
2. Configure the trigger to listen for updated records in **Marketing Consent**; add conditions.
3. Add an **Update Records Action** to update `HasOptedOutOfEmail` on the Contact/Lead.
4. For multiple channels/subscriptions, add **Decision Actions**.
5. Save and activate.

### Further Considerations
- **Multiple channels/subscriptions:** both Flows need Decision Actions to handle each channel/subscription path.
- **Trigger conditions:** review carefully to avoid unnecessary runs or **infinite loops** (e.g., the Data Cloud-Triggered Flow updating the Contact/Lead shouldn't re-trigger the flow).
- **Custom DMO approach (legacy):** an earlier version used a Custom DMO mapped to the Unified Individual as an intermediate step. The updated approach (Automation Event-Triggered Flow + Consent Request Action) removes the need for this Custom DMO for most use cases.
- **Double Opt-In:** can be added to Flow 1 using an email message step.
- **Product name pairing:** always pair "Flows" with "Salesforce Flows" or specify the Flow type to avoid ambiguity.

### FAQ Highlights
- **Why not MessagingConsent/MessagingConsentV2?** They don't correctly update the MC Next Consent layer over time and may fall out of sync. Use the Consent Request Action.
- **Do I need both Flows?** Implement either independently; both for bidirectional consent management.
- **What if a contact unsubscribes via email reply or SMS STOP?** These channel-level unsubscribes update the Consent layer; Flow 2 detects the change and updates the Email Opt Out field.
- **Is a Custom DMO still required?** No — the updated solution (June 2026) eliminates it for most standard implementations.

### Hybrid Sending: Account Engagement + MC Next
Consent can be matched automatically or manually between Marketing Cloud Account Engagement and Marketing Cloud Next:
- **Automatically Match Overall Email Consent**
- **Manually Match Consent and Subscriptions**

### Hybrid Sending: Marketing Cloud Engagement + MC Next
Use the **Consent Mapping tool** to synchronize consent between Marketing Cloud Engagement and Marketing Cloud Next. **Email and SMS are available today.**

## Common Pitfalls / Misconceptions
⚠️ `HasOptedOutOfEmail` does NOT auto-sync with MC Next consent — you need the two-Flow bridge.
⚠️ Watch for infinite loops between the two Flows.
⚠️ The legacy Custom DMO approach is no longer required for most use cases.
⚠️ Always specify the Flow type to avoid ambiguity with other Salesforce "Flows" products.

## Active Recall Questions
1. Why doesn't the Email Opt Out field sync automatically with MC Next consent?
2. What event does Flow 1 (CRM→MC Next) use?
3. What action does Flow 2 (MC Next→CRM) use to update the Contact/Lead?
4. What tool synchronizes consent between Marketing Cloud Engagement and MC Next?
5. How do you avoid infinite loops between the two Flows?

## Related Concepts
- [[consent-write-paths]]
- [[consent-data-model]]
- [[consent-double-opt-in]]
- [[consent-sync-3-flow]]
- [[campaigns-and-flows]]
- [[distributed-marketing]]

## Source References
- User-provided "Syncing Contact and Lead Email Opt Out with Marketing Cloud Next Consent Using Flows" article
- User-provided "Consent Management: Hybrid Sending: Account Engagement and Engagement" article
- [[consent-sync-3-flow]] (deeper 3-flow bridge for CRM + Data 360 + MC Next sync)