# Personalization Data Sources in Marketing Cloud Next

## Core Idea
A **data source** is any org object or element whose fields become available for personalization — merge fields, expressions, repeater components, and dynamic content. The Data Sources tab in Content Builder is where you add, view, and manage them, and the **data graph** (usually a profile graph on the Unified Individual DMO) is the backbone that most personalization depends on.

## Prerequisites
- [[content-and-personalization]]
- [[data-architecture-layers]]
- [[data360-segment-types]]
- [[marketing-objects-ampscript-handlebars]]

## Detailed Explanation

### What a Data Source Is
A data source represents an object or element from your org that contains fields and data. After you select one, its fields and attributes are available to use in:
- **Merge fields** — insert a single value (name, city).
- **Expressions** — filter/sort criteria that return one value.
- **Repeater components** — series of items (products, events).
- **Dynamic content** — targeting rules for variations.

### The Data Source Type Reference

| Data source | Editions | Content types | Notes |
|-------------|----------|----------------|-------|
| **Data Graph** (default profile graph) | Growth, Advanced | Email, LP, Content Blocks, SMS, WhatsApp | Default badge in panel; see below |
| **Unified Individual DMO** | Starter/Pro Suite, Growth, Advanced | Email, LP, Content Blocks, SMS | Fallback when no data graph; only option in Starter/Pro Suite emails |
| **Event** | Starter/Pro Suite, Growth, Advanced | Email, Content Block: Email, SMS, WhatsApp | Max **1** per content item; no custom event data in repeaters |
| **Offer** | Growth, Advanced | Email | Max **5** per email; dynamic content can show different offers by attribute |
| **Personalization Recommender** | Advanced + Personalization Decision Credits | Email, Content Block: Email | Repeater + merge fields only; replace but not remove |
| **Content Variable** | Growth, Advanced | Email | Mapped to Flow data (incl. MuleSoft/HTTP); boolean/string/date/date time/number/recordId |
| **Salesforce Record** | Growth, Advanced | Email | Most current business data (Cases, Leads) |
| **Lookup Data Graph** | Growth, Advanced | Email | Non-profile data (product catalog); max **5**; needs a primary key; can't nest |
| **Apex Class** | Growth, Advanced | Email, SMS | Pass flow data into content; max **1** per message |
| **Activation** | Growth, Advanced | Email | Data 360 segment activation attributes; max **1** per message |
| **Marketing Object** | Growth, Advanced | Landing Page, Form | Read data provider; marketer-maintained data without CRM object |
| **Prospect** | Growth, Advanced | Landing Page, Form | Profile extension of the unified individual |

### The Data Graph (the Backbone)
A **data graph** is a Data 360 object built from a **primary DMO** (usually the **Unified Individual**) plus its related objects, flattened into a streamlined table for common tasks. Profile data graphs contain details about people — e.g., contact record data plus attributes from related objects like a recent product purchase or service case.

- **Standard vs. real-time:** real-time graphs respond faster but cost more (see [[data360-billing-usage]]).
- **Default data graph:** set up in Setup; appears with a **Default badge** in the Data Sources panel.
- **SMS/WhatsApp:** only the default data graph is available — it doesn't appear in the panel, but its data still works in merge fields.

**Data graph guardrails:**
- In an email/content block, the default graph is sufficient for most tasks.
- If an email has **any dynamic content variations or a Personalization recommender**, you **can't remove or replace** the data graph.
- For landing pages, use a **real-time** graph (faster response, better performance); once a landing page content block is **published**, you can't remove/replace the graph.

### Unified Individual DMO as Fallback
Even with no data graph or data source, merge fields based on the **Unified Individual DMO** still work. If you delete the default data graph, the unified individual data provider is the fallback. In **Starter and Pro Suite** emails, this is the *only* way to personalize.

### Event Data Source
An event is a specific activity that can trigger a flow (order confirmation, subscription sign-up). See [[campaigns-and-flows]] and [[marketing-triggers]].
- **1 event data source per content item** (e.g., an email series triggered each time a form is submitted).
- Repeaters **don't support custom event data** in emails.
- Once published, you **can't remove or replace** an event.

### Offer Data Source
Tailored promotions activated directly in email content. Add an offer, then merge fields populate offer name/description/coupon code. Dynamic content rules can show different offers by attribute (e.g., loyalty tier). **Max 5 offer data providers per email.**

### Personalization Recommender
A Salesforce Personalization element that shows recommendations based on customer interests. In emails, recommender data works **only inside a repeater** (and merge fields within it).
- Only **trained recommenders based on the same data graph** as the email are selectable.
- New recommenders need a **training period with at least one successful refresh**.
- You can **replace but not remove** recommender data sources.
- In MC Next emails, dynamic content and recommenders **aren't available until a data graph is added** as a data source.

### Content Variable
Custom dynamic placeholders mapped to **any data source available in Salesforce Flow**, including MuleSoft and HTTP connectors. Flow populates them at run time. Data types: **boolean, string, date, date time, number, recordId** (references a Salesforce record).

### Salesforce Record
Merge fields based on **Salesforce Objects** (Cases, Leads) for the most current business data.

### Lookup Data Graph
Non-profile Data 360 data (e.g., product catalog) that **complements** the default data graph or unified individual. Requires a **primary key** to filter and get data related to the recipient.
- Lookup providers **can't be nested** under other lookup providers.
- **Max 5** lookup data providers per content item.

### Apex Class
Pass data from a flow directly into content — simple parameters (name, assigned sales rep) or complex structured data (entire order collections for transactional messages). **One Apex class data source per message.**

### Activation
References a **Data 360 segmentation activation**, making segment attributes of recipient data available in email merge fields for real-time audience targeting. **One activation data source per message.**

### Marketing Object & Prospect (Landing Pages / Forms)
- **Marketing Object:** marketer-maintained data without a CRM object; read data provider on landing pages and forms.
- **Prospect:** profile extension of the unified individual; read data provider on landing pages and forms.

### General Data Source Rules
- **Changing a data source** after its attributes are used in merge fields → delete those merge fields first, add the new source, recreate the fields.
- **Combining content types** (e.g., adding a form to a landing page) → the data graphs must **match** (form's data graph = landing page's data graph).

## Common Pitfalls / Misconceptions
⚠️ **SMS/WhatsApp don't show the data graph in the panel** — but the default graph's data still works in merge fields.
⚠️ **Dynamic content or a recommender locks the data graph** — you can't remove/replace it afterwards.
⚠️ **Publishing a landing page content block locks the data graph.**
⚠️ **Repeaters don't support custom event data** in emails.
⚠️ **Recommenders can be replaced but never removed.**
⚠️ **Starter/Pro Suite emails can only use Unified Individual DMO merge fields.**
⚠️ **Lookup data graphs can't nest, and max out at 5 per content item.**

## Active Recall Questions
1. What is a data source, and where do you manage them in Content Builder?
2. Which data sources are limited to one per content item or message?
3. When can't you remove or replace a data graph?
4. What's the difference between a data graph and a lookup data graph?
5. Which data sources are available only on landing pages and forms?
6. What happens if you change a data source after its attributes are used in merge fields?

## Related Concepts
- [[content-and-personalization]]
- [[email-building-personalization]]
- [[merge-fields-and-expressions]]
- [[dynamic-content-variations]]
- [[repeaters-and-recommenders]]
- [[data-architecture-layers]]
- [[data360-billing-usage]]
- [[marketing-objects-ampscript-handlebars]]

## Source References
- `sources/Content_Personalization_Data_Sources_Deep_Dive.txt` — "Manage Data Sources for Personalizing Content"