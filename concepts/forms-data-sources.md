# Forms & Form Data Sources

## Core Idea
Forms capture user information and are added as a component on a landing page (one form per landing page). A form has two parts — the **fields/settings** and the **flow** that processes submissions — and uses **data providers** to bridge form fields to Salesforce objects: a **write data provider** saves submissions, while **read data providers** pre-fill fields and drive progressive profiling.

## Prerequisites
- [[landing-pages]]
- [[content-and-personalization]]
- [[personalization-data-sources]]
- [[campaigns-and-flows]]

## Detailed Explanation

### Permissions
- **Create a form on a landing page:** Marketing Cloud Manager permission set **AND** any CMS workspace contributor role.
- **Publish a form and landing page:** Marketing Cloud Manager permission set **AND** a CMS workspace contributor role of **content admin or content manager**.
- **Create/publish a form using data source fields:** the above **AND** **Modify All Data** permission for the data source object, its fields on the form, and the record type selected.
- **Author with AMPscript:** the above **AND** the **AMPscript Author** permission.

### Create a Form
- Entry points: signup campaign (Start Trigger → Edit), Content tab → Add → Content → **Form**, or a flow's Start element → Form card → Edit.
- Creation methods: **components** or **code view**.
- **Publish** the form and its flow together.

### Form Requirements & Rules
- Each form needs **≥1 input component + 1 button**.
- **Unique names** for submission capture: email field = `Email`, first name = `FirstName`, last name = `LastName` (case-insensitive, no extra characters/spaces).
- **One form per landing page**; a form relates to **only one flow**.
- **View mode must match:** block-view landing pages host block-view forms; code-view pages host code-view forms. Use the same creation method for both.
- **Embedding isn't available for code-view forms** — build with components to embed externally.
- If a form has multiple published versions, the **latest published version** is shown on the landing page.
- ⚠️ **Dropdown as the last field can get cut off** (especially embedded) — move it up or add bottom padding.
- ⚠️ **Multi-picklist fields aren't available** in forms and form handlers.
- ⚠️ **Duplicate rules:** if the org manages duplicates, the CreateRecords element can't create a record matching an existing one.
- ⚠️ Form data-source fields inherit the **language of the person building the form**, not the CMS workspace language.

### Data Providers (Write vs. Read)
| Provider | Role | Data sources |
|----------|------|--------------|
| **Write** | Saves submissions to a data source | Account, Contact, Lead, Prospect, or a **marketing object** (default if available; otherwise **Lead**) |
| **Read** | Pre-fills fields + drives progressive profiling; doesn't receive submitted data | Recipient **data graph**, **marketing object**, or **Prospect**; plus up to **2 lookup data providers** (max 1 marketing object + 1 recipient data graph) |

- Read and write providers are **independent** — a form can write to one source and read from another.
- **Only one data source object at a time** for the write provider — a form can't contain fields from multiple objects (changing objects can create data discrepancies).
- The write provider respects **field-level security (FLS)** — only fields the running user can edit are saved.
- **Data source name:** up to **20 characters**, alphanumeric + underscores, no spaces or consecutive underscores.

### Supported Field Types
Checkbox · Date · Date/Time · Time · Email · Phone Number · Number · Picklist · Text · Text Area · Text Area (Long) · URL

- ⚠️ **Number of Employees** (Account, Lead, Prospect) isn't supported.
- ⚠️ Changing a custom field to an unsupported type → the form **can no longer save** captured data.
- ⚠️ A data source field can appear **only once** on a form (no duplicates).
- ⚠️ Editing a CRM field's **API name** after using it in a form → new submissions to that field **aren't saved**.
- **Signup form campaign** forms/landing pages have predefined API names you **can't change** — create from your content workspace to control API names (then manually connect the form to a flow and map fields).

### Unified Profile Fields
To store data in a **unified profile** instead of a Salesforce object field, use: **Checkbox, Dropdown, Email, Phone Number, or Plain Text** input components.

### Hidden Fields & Default Values
Available on: **Checkbox, Dropdown, Number, Plain Text, Text Area**.
- **Hide this field** — hidden fields are visible on the canvas (with an icon) but not in preview/live form.
- **Default value types:** **Static Value** or **URL Parameter** (UTM or any URL parameter; e.g., hidden Source field with `utm_source`).
- ⚠️ **A hidden field marked required needs a fallback value** — used when the URL parameter is invalid or missing.

### reCAPTCHA
- **Google reCAPTCHA v2** — available **only for marketing landing pages with forms** (not LWR sites or template-built sites).
- Admin adds the integration to the **Marketing Landing Pages** site (All Sites → Builder → Settings → Integrations); when enabled, reCAPTCHA shows on **every** form automatically.
- ⚠️ Changing **My Domain** breaks reCAPTCHA on existing published sites — add the new domain in the Google admin console.
- ⚠️ **Only one reCAPTCHA-protected form per external page** — subsequent forms fail silently.

### Progressive Profiling & Pre-Fill
- Both require a **read data provider**.
- **Progressive profiling rule:** show a field conditionally (e.g., Business Phone only when Email has a value). ⚠️ Can't add a rule to a hidden field; can't hide a field that has a profile rule; **can't apply to a related object**.
- ⚠️ Changing the read data provider/source **removes all progressive profiling rule connections** — recreate them.
- **Pre-fill:** map a field to a data source attribute (namespaced: `dataGraph.LastName`, `myObject__mo.LastName`, `prospect.LastName`); optional default text when no profile value is found.
- ⚠️ **Avoid pre-filling PII** (SSN, credit card numbers).
- ⚠️ If a returning visitor can't be identified (e.g., identity token expired), the form shows **default fields** instead of the progressive profiling variation.

### Unpublish a Form
- Unpublishing deactivates the form's **flow** and the Submit button stops working (an in-flight submission still completes and saves).
- Disconnect from related landing pages first (unpublish the landing page or remove the Form component + republish).
- After unpublish, the form reverts to draft and the flow is deactivated so you can delete both; to edit/republish, **save the flow as a new version**.

## Common Pitfalls / Misconceptions
⚠️ **One form per landing page; one flow per form.**
⚠️ **View modes must match** (block ↔ block, code ↔ code).
⚠️ **Code-view forms can't be embedded externally.**
⚠️ **A form can't mix fields from multiple write data source objects.**
⚠️ **Multi-picklist fields aren't supported.**
⚠️ **Hidden required fields need a fallback value.**
⚠️ **reCAPTCHA applies to every form once enabled; one per external page.**
⚠️ **Progressive profiling rules break if the read data source changes.**

## Active Recall Questions
1. What are the write vs. read data provider roles, and which objects can each use?
2. What unique names must the Email/FirstName/LastName fields have?
3. Which field types store data in a unified profile vs. a Salesforce object?
4. What happens when you unpublish a form?
5. What's the reCAPTCHA scope, and what breaks it?
6. What are the rules for hidden fields and default values?

## Related Concepts
- [[landing-pages]]
- [[external-forms-form-handlers]]
- [[content-and-personalization]]
- [[personalization-data-sources]]
- [[campaigns-and-flows]]
- [[web-tracking]]

## Source References
- `sources/Web_Content_Deep_Dive.txt` — "Create and Manage Forms", "Data Sources for Forms", "Use Hidden Fields and Default Values on a Form", "Protect Forms with reCAPTCHA", "Add Progressive Profiling and Turn On Pre-Fill for Forms", "Using a Form with Landing Pages"