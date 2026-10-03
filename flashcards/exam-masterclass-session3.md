# Flashcards — Exam Masterclass Session 3 (Elliot Harper)

> Source: `sources/MCNext_Consultant_Exam_Masterclass_Session3.txt` — the official Salesforce exam-prep masterclass, Session 3. Covers business units + Salesforce CMS, Marketing Workspaces, and the eight data providers for content personalization.

## Card: Session 3 Agenda
**Q:** What two areas does Session 3 cover?
**A:** 1) How **Salesforce CMS integrates** with Marketing Cloud Next (business units, workspaces, content). 2) The different **options for content personalization** (data providers, content variables, marketing objects, and personalization methods).

## Card: Business Units and Content
**Q:** What do business units separate in MC Next, and where is all marketing content stored?
**A:** They separate **content and data** across teams, brands, or regions. All marketing content (images, landing pages, forms, brand assets, emails) is stored in **CMS content workspaces**.

## Card: Workspace ↔ Business Unit
**Q:** What is each CMS content workspace associated with?
**A:** A **specific business unit**. This structure works alongside Data 360's **data spaces**.

## Card: The Entity Relationships
**Q:** What are the cardinalities between data spaces, business units, and content workspaces?
**A:** A **data space** can be associated with **no business units or one business unit**. A **business unit** can be associated with **one or more content workspaces**.

## Card: Content Filtering
**Q:** How does the system filter content by business unit?
**A:** When marketers create an asset, the system displays **only the content available to the associated business unit**. The same filtering applies when selecting content from a **campaign or flow**.

## Card: Cross-Business-Unit Content
**Q:** Can content be accessed directly across business units?
**A:** ⚠️ **No — by design, content cannot be accessed directly across business units.** Each CMS content workspace must be associated with a specific business unit in Setup.

## Card: Common Assets
**Q:** How do you share content across business units?
**A:** Post content as a **common asset**, which makes it available to **all business units**. Users in other business units can then **copy that asset into their own workspaces** and use it locally.

## Card: Business Unit Role Access
**Q:** What content access does each business unit role have?
**A:** **Marketing Standard** = access to **both the data space and CMS content**. **Marketing Read-Only** = access to **only the data space** (no CMS content).

## Card: Read-Only Role Restriction
**Q:** Who can only be assigned the Marketing Read-Only role?
**A:** Users **without** the **Marketing Manager or Marketing Admin** permission sets.

## Card: Business Unit Setup Options
**Q:** What can you configure from a business unit's setup page?
**A:** Associate **CMS workspaces**, assign **authenticated email domains** and channel-specific settings, configure **preference pages for each domain**, enable specific **AI features**, add **members** (with roles), and enable **common assets** (Business Unit Settings).

## Card: Marketing Workspace Purpose
**Q:** What is a Marketing Workspace, and how can you organise assets?
**A:** Where content is stored. Use the **default Marketing Cloud Content Workspace** or create additional workspaces to organise assets by **campaign, initiative, brand, or team** — and to support collaboration across teams.

## Card: Sharing Content Between Workspaces
**Q:** How can content be shared between workspaces?
**A:** Share content between **marketing workspaces**, or with a **general workspace** used by other users. Example: manage brand assets in a marketing workspace, then share them with a general workspace so other teams can use them.

## Card: Workspace Organisation & Portability
**Q:** How do you organise and move content within/between workspaces?
**A:** Organise content into **folders** within each workspace. **Export content assets** and import them into another Salesforce org — e.g., moving content between **production and sandbox** orgs.

## Card: Workspace-Level Access
**Q:** Besides business-unit-level roles, how else can access be managed?
**A:** By assigning roles at the **individual workspace level**.

## Card: Creating a Workspace
**Q:** How do you create a Marketing Workspace?
**A:** Content tab → **Add Workspace** → choose **Marketing Workspace** → enter a **name and default language**.

## Card: Content Types to Know
**Q:** Which content types should you be familiar with?
**A:** The most commonly used: **images, landing pages, forms, and emails**. (MC Next supports many more, but you don't need to know all of them.)

## Card: Content Must Be Published
**Q:** After saving content, what must happen before it can be used?
**A:** It must be **published**. Saving alone isn't enough.

## Card: Form Creation Order
**Q:** Why must a form be created before a landing page?
**A:** Because the form **needs to exist before it can be placed on a page**.

## Card: Form Data Source
**Q:** How do you set up a form's data source?
**A:** Add a data source and choose the **CRM object where submissions should create records** (e.g., name it "leads" and select the **Lead** object).

## Card: Form Handler Flow
**Q:** What happens when you select "New Flow" on a form?
**A:** It creates a **form handler**. Flow Builder pre-adds a **Create Records** element with mappings between the form fields and the corresponding record fields (e.g., Lead).

## Card: Publishing a Form
**Q:** What happens when you publish a form?
**A:** It **also activates the associated flow**.

## Card: Landing Page Setup
**Q:** What do you configure when building a landing page with a form?
**A:** Add the **published form**, add other elements (e.g., a header image), configure the **page title and SEO title**, then **save and publish**. When a visitor submits the form, the flow runs and creates a new record in CRM.

## Card: MCE Personalization Source
**Q:** What is the primary data source for personalization in Marketing Cloud Engagement?
**A:** **Data extensions** — either a **sendable** data extension (personalization strings reference subscriber data directly) or a **non-sendable** one (AMPscript retrieves the required fields). There are some exceptions, but data extensions remain primary.

## Card: MC Next Personalization Options
**Q:** What three mechanisms does MC Next offer for personalization?
**A:** **Data providers**, **content variables**, and **marketing objects**.

## Card: Exam Scope for Personalization
**Q:** Which channel's personalization does the exam cover?
**A:** **Email** content personalization only — not other channels.

## Card: Merge Fields
**Q:** What do merge fields do?
**A:** Insert a **single value** from the selected data source into your content — the **simplest option for field-level personalization**.

## Card: Repeaters
**Q:** What do repeaters do?
**A:** Display a **collection of related items** (recent purchases, upcoming events, recommended products). You design one item connected to a data source, and MC Next **repeats that layout for each relevant record**.

## Card: Dynamic Content
**Q:** What does dynamic content do?
**A:** Changes an **entire component or field** based on targeting rules — the same email can show different images, offers, or messages depending on location, interests, or loyalty status. If a customer qualifies for multiple variations, you can **prioritise** which they see.

## Card: Handlebars
**Q:** What does Handlebars provide?
**A:** A **templating language** that can access **nested data**, apply **conditional logic**, **format values**, and **iterate through collections** — giving developers more control over how personalized content is rendered.

## Card: AMPscript in MC Next
**Q:** What's the caveat about AMPscript in MC Next?
**A:** You can use it for complex personalization logic and data operations, but ⚠️ **not every AMPscript function available in Marketing Cloud Engagement is supported in Marketing Cloud Next**.

## Card: Marketer vs. Developer Methods
**Q:** Which personalization methods are marketer-friendly vs. developer-oriented?
**A:** **Marketer configuration:** merge fields, repeaters, dynamic content. **Developer flexibility:** Handlebars and AMPscript.

## Card: The Eight Data Providers
**Q:** Name the eight data providers in Marketing Cloud Next.
**A:** 1) **Data graph** 2) **Event** 3) **Activation** 4) **Salesforce record** 5) **Apex class** 6) **Personalization recommender** 7) **Lookup graph** 8) **Offer**.

## Card: Data Graph Definition
**Q:** What is a data graph, and how does it work?
**A:** A **pre-assembled view** combining selected fields from multiple related DMOs. It begins with a **primary DMO** (typically Individual or Unified Individual) and connects related objects (contact points, accounts, orders, products, engagement activity). Data 360 prepares it as a **single read-only record**, so MC Next retrieves customer data quickly **without joining the underlying objects each time content is rendered**.

## Card: Event Data Provider
**Q:** What does an event data provider do, and what's its key limitation?
**A:** It makes data from an **event-triggered automation flow** available for content. Each event has a defined schema corresponding to the underlying **engagement DMO** that triggers the flow (form submissions, email sends/opens, engagement signals). ⚠️ It supports **direct attributes from the event DMO, but not related collections** — e.g., an order event provides Sales Order DMO attributes but **not** related products from the Sales Order Product DMO.

## Card: Activation Data Provider
**Q:** What does an activation data provider do?
**A:** Makes the **direct and related attributes configured in the activation** available for content personalization. It supports segments based on either **Individual or Unified Individual**.

## Card: Activation + Event Conflict
**Q:** Can a message use both an activation and an event data provider?
**A:** ⚠️ **No.** Each requires a specific flow orchestration pattern, so using both would create a **conflict in how the data is bound to the message**.

## Card: Salesforce Record Data Provider
**Q:** What does a Salesforce record data provider do?
**A:** Lets you personalize content with **current data from Salesforce CRM objects** — add a case, lead, or another supported object as a data source, then insert its fields using merge fields.

## Card: Apex Class Data Provider
**Q:** What does an Apex class data provider do, and what is it designed for?
**A:** It defines a **custom data structure** for personalization — the Apex class primarily defines the **schema** (fields and data types) that content can reference. It's designed for **on-demand or broadcast flows** passing data into an email, but can be used with other flow types.

## Card: Personalization Recommender
**Q:** What does a personalization recommender do?
**A:** Brings **recommendations from Salesforce Personalization** into an email — returning a collection of relevant products, services, or content per recipient, displayed using a **Repeater** component.

## Card: Lookup Graph Data Provider
**Q:** What does a lookup graph data provider do?
**A:** Provides access to **non-profile data** that doesn't have a direct relationship back to a unified individual. It takes a **value from the recipient's primary data graph** and uses it as a **key** to retrieve matching information from a **second, smaller data graph** (e.g., a product identifier → product details from a catalog graph). Results display in merge fields or repeaters.

## Card: Offer Data Provider
**Q:** What does the offer data provider do?
**A:** Works with **Salesforce Loyalty Management** to deliver tailored promotions in email content. Use merge fields for offer name/description/coupon code, and **dynamic content rules** to show different offers by customer attribute (e.g., loyalty tier).

## Card: Content Variables
**Q:** What are content variables, and how do they differ from a data graph?
**A:** **Custom placeholders** defined within an email and populated at runtime from **Salesforce Flow**. Unlike a data graph, they **don't retrieve data from predefined customer data structures** — the email defines what it expects (order number, appointment date, discount amount, support rep's name) and the flow supplies the values at send time.

## Card: Content Variable Data Sources
**Q:** What can a content variable be mapped to?
**A:** **Any data source available to Salesforce Flow** — including Salesforce data, MuleSoft integrations, and HTTP connectors. Useful when information is **calculated during the flow** or comes from a system **outside Data 360**.

## Card: Content Variable Data Types
**Q:** What data types do content variables support?
**A:** **Boolean, Text, Date, DateTime, and Number** — plus a **Record ID** value that references a Salesforce record.

## Card: Content Variable Summary
**Q:** In simple terms, how do content variables work?
**A:** The **content defines the placeholders**, and the **flow supplies their values at send time**.

## Card: Marketing Object Definition
**Q:** What is a marketing object, and what's the MCE comparison?
**A:** A **flexible data store** in MC Next holding information for marketing use cases. The closest MCE comparison is a **data extension**.

## Card: Marketing Object Uses
**Q:** What are marketing objects useful for storing?
**A:** Product catalogs, reference tables, rewards balances, promotional codes, and more.

## Card: Marketing Object Autonomy
**Q:** Why do marketing objects give marketers autonomy?
**A:** Because an **admin doesn't need to create a Salesforce object or modify the Data 360 data model** — a marketer creates one by importing a CSV, defining fields, and identifying a primary key.

## Card: Querying Marketing Objects
**Q:** How do you use marketing object data in a message?
**A:** Query the marketing object with **Handlebars or AMPscript**. Example: use the recipient's address from the default data graph to find their matching record in a marketing object and retrieve their current rewards balance.

## Card: Marketing Object Fields & Refresh
**Q:** What field types do marketing objects support, and how is data refreshed?
**A:** **Text, number, and decimal** fields. Data can be **fully refreshed** by uploading a new CSV file, which **replaces existing records**.

## Card: Marketing Object Summary
**Q:** In summary, what is a marketing object?
**A:** A **marketer-managed table of data** that can be **queried at runtime** to personalize content.

## Card: Creating a Marketing Object
**Q:** How do you create a marketing object?
**A:** From the **Data Management tab** in the Marketing app → **New** → upload a CSV → **Next** → give it a name → review the **fields and data types detected** from the file (adjust if needed) → select the **primary key** field → done.

## Card: Merge Field Fallback
**Q:** What can you define when inserting a merge field?
**A:** A **fallback value** to use when the customer's data is missing (e.g., "Friend" when the first name is absent). The merge field menu shows the configured data providers alongside options like **global strings**.

## Card: Two Levels of Personalization
**Q:** What two levels of personalization does the back-in-stock demo illustrate?
**A:** **Merge fields** provide a simple, marketer-friendly way to insert data; **Handlebars and AMPscript** give more control over how data is retrieved and formatted (e.g., converting a name to uppercase, formatting a price as currency).

## Card: Dynamic Content Prerequisite
**Q:** What does dynamic content require?
**A:** A **data graph** configured as a data source.

## Card: Dynamic Content Demo
**Q:** Walk through the US West States variation demo.
**A:** Select the header image → in the **dynamic content** section of the image properties panel click **New Variation** → name it → define the targeting rule by selecting the **State/Province** field from the individual's **related contact point address** data → choose the **isIn** operator → enter the state values → save → assign a different header image. You can preview each variation, create more, and set **priority order** when a recipient qualifies for multiple.

## Related
- [[marketing-workspaces-and-cms]] · [[business-units]] · [[personalization-data-sources]] · [[content-and-personalization]] · [[merge-fields-and-expressions]] · [[dynamic-content-variations]] · [[marketing-objects-ampscript-handlebars]] · [[repeaters-and-recommenders]]
- Deck index: [[study-roadmap]]
