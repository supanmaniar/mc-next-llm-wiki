# Engagement Signals

## Core Idea
Engagement signals are configured using a **primary engagement DMO** and mapped fields to identify and track individual engagements — they power Salesforce Personalization features like custom recommender objectives, custom attribution models, and personalization experiments.

## Prerequisites
- [[data-architecture-layers]]
- [[content-and-personalization]]
- [[ai-features]]

## Detailed Explanation

### What Engagement Signals Are
Engagement signals are configured using a primary engagement data model object (DMO). You use mapped DMO fields to identify and track individual engagements. They're used when configuring various Salesforce Personalization features: **custom recommender objectives, custom attribution models, and personalization experiments**. Define engagement signals **before** configuring these features.

### Considerations
- Configure using only DMOs categorized as **Engagement**.
- Select from only **mapped** DMOs and DMO fields.
- Can use fields of the primary DMO and related DMOs with **1:1 or many-to-one** cardinality.
- If using a related DMO, you can use fields from **only one** related DMO.
- Must specify an **item identifier** if using the signal in custom objective-based recommenders.
- A **count-based engagement signal metric** is created by default for each signal (insights on how individuals interact with personalized content).

### Configuration
1. App Launcher → **Engagement Signals** → New.
2. Choose **Manual Setup** (from scratch) or **Use a Data Kit** (import).
3. **Manual Setup:**
   - Select the data space containing the engagement DMO.
   - Select an engagement DMO (only mapped, Engagement-category DMOs shown).
   - (Optional) Make the signal **available in flows** — this excludes related objects (unsupported in flows) and enables use in both Salesforce Personalization and MC Next automation-event-triggered flows.
4. Select fields from the DMO (or one related DMO) to define the signal:
   - **User Identifier** — identifiable field (email, phone, etc.)
   - **Timestamp Identifier** — date/time when engagement occurs
   - **Item Identifier** — specific item/data point to isolate engagement
   - **Event Identifier** — unique event identifier to group identical engagements and eliminate duplicates
5. Define how events are counted:
   - **Count each event as discrete** — each occurrence counted (e.g., total email clicks).
   - **Group repeat events** using added fields and count as one signal (e.g., unique email click = individual ID + bulk message ID + click event).
6. (Optional) Define **filters** to identify specific engagements (All Conditions Met = AND, Any Conditions Met = OR; operators: Is Equal To, Is Less Than, Is Greater Than, Is Not Equal To, Has No Value, Has Value).
7. Name the signal (API name auto-generated) → Save.

### Data Kit Method
- Verify required DMOs and field mappings exist before installing.
- Only **unmanaged data kits** are available for this method.

## Common Pitfalls / Misconceptions
⚠️ Engagement signals use only **Engagement-category** DMOs.
⚠️ Making a signal available in flows excludes related-object fields.
⚠️ Item identifier is required for custom objective-based recommenders.
⚠️ Only unmanaged data kits can be used for import.

## Active Recall Questions
1. What three Personalization features use engagement signals?
2. What are the four identifier types in an engagement signal?
3. What's the difference between counting discrete events vs. grouping repeat events?
4. What happens when you make a signal available in flows?

## Related Concepts
- [[content-and-personalization]]
- [[ai-features]]
- [[marketing-triggers]]
- [[flow-builder-elements]]

## Source References
- User-provided "Configure an Engagement Signal" article