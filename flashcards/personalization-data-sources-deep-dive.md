# Flashcards — Personalization Data Sources, Merge Fields, Dynamic Content & Repeaters

## Card: Data Source Definition
**Q:** What is a data source in Marketing Cloud Next, and where do you manage them?
**A:** An object or element from your org that contains fields and data; its attributes become available for merge fields, expressions, repeaters, and dynamic content. Managed in the Data Sources tab of Content Builder.

## Card: Data Source Change Rule
**Q:** What must you do if you change a data source after its attributes are used in merge fields?
**A:** Delete those merge fields, add the new data source, then recreate the merge fields.

## Card: Data Graph Definition
**Q:** What is a data graph, and what's it usually based on for personalization?
**A:** A Data 360 object built from a primary DMO plus related objects, flattened into a streamlined table. For personalization it's usually a profile data graph based on the Unified Individual DMO.

## Card: Standard vs Real-Time Data Graph
**Q:** What's the trade-off between standard and real-time data graphs?
**A:** Real-time graphs provide faster response times but cost more.

## Card: Data Graph Lock Rules
**Q:** When can't you remove or replace a data graph?
**A:** If an email has dynamic content variations or a Personalization recommender; or when a landing page content block is published. For landing pages, use a real-time graph for better performance.

## Card: SMS/WhatsApp Data Graph
**Q:** How do SMS and WhatsApp messages use the data graph?
**A:** Only the default data graph is available; it doesn't appear in the Data Sources panel, but its data still works in merge fields.

## Card: Unified Individual Fallback
**Q:** What happens if you delete the default data graph, and what's the only personalization option in Starter/Pro Suite emails?
**A:** The Unified Individual DMO data provider is the fallback. In Starter and Pro Suite emails, merge fields can only refer to the Unified Individual DMO.

## Card: Event Data Source Limits
**Q:** What are the limits of an Event data source?
**A:** Max 1 event data source per content item; repeaters don't support custom event data in emails; once published you can't remove or replace it.

## Card: Offer Data Source
**Q:** What does an Offer data source do, and what's its limit?
**A:** Delivers tailored promotions in email (name, description, coupon code) with dynamic content rules by attribute (e.g., loyalty tier). Max 5 offer data providers per email.

## Card: Recommender Data Source Rules
**Q:** What rules govern Personalization Recommender data sources?
**A:** Only trained recommenders based on the same data graph as the email are selectable; needs a training period with at least one successful refresh; you can replace but not remove them; data works only in a repeater and its merge fields.

## Card: Content Variable Data Types
**Q:** What data types do content variables support?
**A:** Boolean, string, date, date time, number, and recordId (references a Salesforce record). Mapped to any Flow data source including MuleSoft and HTTP connectors.

## Card: Lookup Data Graph Rules
**Q:** What are the rules for Lookup Data Graph data sources?
**A:** Uses non-profile Data 360 data (e.g., product catalog) to complement the default graph; requires a primary key; can't be nested under other lookup providers; max 5 per content item.

## Card: Apex Class Data Source
**Q:** What can an Apex Class data source do, and what's its limit?
**A:** Passes data from a flow directly into content — simple parameters or complex structured data (order collections). One Apex class data source per message.

## Card: Activation Data Source
**Q:** What does the Activation data source do, and what's its limit?
**A:** References a Data 360 segmentation activation, making segment attributes available in email merge fields for real-time audience targeting. One activation data source per message.

## Card: Landing Page Data Sources
**Q:** Which data sources are available only on landing pages and forms?
**A:** Marketing Object and Prospect (both via the read data provider).

## Card: Merge Field Locations
**Q:** Where can you add merge fields in an email?
**A:** In the subject line and preheader (Add Merge Field), or in the text of content via the Add Merge Field icon in the editing toolbar.

## Card: Expression Definition
**Q:** What is a saved expression, and where is it stored?
**A:** Saved filter and sort criteria across related data objects that select the right attribute for a merge field. Stored in Salesforce CMS; reusable in email, SMS, and WhatsApp.

## Card: Expression Permissions
**Q:** What permissions are needed to create vs. publish an expression?
**A:** Create/edit: Marketing Cloud Manager permission set + any CMS workspace contributor role. Publish/unpublish: Marketing Cloud Manager + a CMS workspace contributor role of content admin or content manager.

## Card: Expression Prerequisite
**Q:** What must be set up before you can create an expression?
**A:** A data graph.

## Card: Personalization Point
**Q:** What is a personalization point?
**A:** A content element eligible for a personalization decision (subject line, preheader, image component). Configuring the first variation auto-creates one for that component/field.

## Card: Decision vs Targeting Rule
**Q:** What's the difference between a personalization decision and a targeting rule?
**A:** A decision determines who's eligible for a response based on targeting rules (each variation relates to a decision with the same name). A targeting rule defines the conditions for showing a specific variation.

## Card: Dynamic Content Limits
**Q:** What are the limits for personalization points and variations?
**A:** 25 personalization points per email/landing page; 15 variations per component. Subject line + preheader count as one component.

## Card: All vs Any Conditions
**Q:** What's the difference between "All Conditions Are Met" and "Any Conditions Are Met"?
**A:** All = recipient must meet every condition; Any = recipient meets at least one condition.

## Card: Default Variation Priority
**Q:** Can you change the priority of the default variation?
**A:** No — the default variation's priority can't be changed; it shows when a recipient doesn't qualify for any personalized variation.

## Card: Clone vs Link
**Q:** What's the difference between cloning and linking a personalization point?
**A:** Cloning creates a separate copy with its own rules/settings; linking shares one point so changes apply to all linked components. Linking requires the point to already exist in the content item and the component to have no variations.

## Card: Linked Component Behavior
**Q:** What happens when you add, delete, or edit a variation on a linked component?
**A:** Adding a variation adds it to all linked components; deleting removes it everywhere; editing targeting rules or priorities applies to all linked components. Content and style edits stay independent.

## Card: Unlink Behavior
**Q:** What happens when you unlink a component from a personalization point?
**A:** The personalization point is cloned (e.g., "Copy of Personalization Point A") so the component keeps its targeting rules, priorities, variations, content, and style, but becomes independent. Other components stay linked to the original.

## Card: Dynamic Content Export
**Q:** Can you export or import content that contains variations?
**A:** No — content with variations can't be exported or imported.

## Card: Repeater Empty State
**Q:** What happens if a repeater source has no data for a recipient?
**A:** The repeater appears empty when that recipient opens the email.

## Card: Repeater Layout Change
**Q:** What happens if you change a repeater layout when it contains content or data?
**A:** The content, data, and any style settings within the repeater get removed.

## Card: Repeater Source Change
**Q:** What must you do if you change a repeater source after its attributes are used in merge fields?
**A:** Delete those merge fields, add the new repeater source, then recreate the merge fields.

## Card: Repeater Merge Field Source
**Q:** When adding a merge field inside a repeater, which item do you expand?
**A:** The item with the same name as the repeater source — it's the first item in the Add Merge Field menu and contains the source's attributes.

## Card: Recommender Training
**Q:** Why must you allocate time when using a new recommender?
**A:** The recommender needs a training period with at least one successful refresh before it can be used.

## Card: Objective-Based Recommender
**Q:** How does an objective-based recommender differ from rule-based image variations?
**A:** Instead of writing rules to decide which image each contact sees, the recommender chooses the best image for each contact at send time, learning from engagement over time.

## Card: Recommender Preview
**Q:** Why does the design canvas show a placeholder for recommender content, and how do you see real output?
**A:** The recommender chooses content per contact, so there's no single fixed result. Use Preview, enter parameters such as a segment to simulate a contact context, and review what the recommender returns.

## Related
- [[personalization-data-sources]]
- [[merge-fields-and-expressions]]
- [[dynamic-content-variations]]
- [[repeaters-and-recommenders]]
- [[content-and-personalization]]
- [[email-building-personalization]]