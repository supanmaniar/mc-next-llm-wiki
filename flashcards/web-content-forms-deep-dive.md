# Flashcards — Landing Pages, Forms, External Forms & Marketing Sites

## Card: Landing Page Hosting
**Q:** Where are component/template landing pages vs. code-view landing pages hosted?
**A:** Component/template pages → the auto-generated Marketing Landing Pages Experience Cloud site; code-view pages → a marketing site (managed from the Marketing Sites tab).

## Card: Landing Page Permissions
**Q:** What permissions are needed to create vs. publish landing page content?
**A:** Create/edit: Marketing Cloud Manager + any CMS workspace contributor role. Publish/unpublish: Marketing Cloud Manager + a CMS workspace contributor role of content admin or content manager. AMPscript authoring adds the AMPscript Author permission.

## Card: URL Alias Editing
**Q:** When can you edit a landing page URL alias, and what happens on publish?
**A:** Only in Draft status (default alias = title + content key). After publish you can't change it; publishing activates the alias.

## Card: Landing Page Publish Cascade
**Q:** What happens when you publish a landing page that contains a form?
**A:** The form is published and the flow related to the form is activated.

## Card: Landing Page SEO Structured Data
**Q:** What structured data format is allowed in landing page head tags?
**A:** Only JSON-LD (`<script type="application/ld+json">`). Head tags don't support JavaScript; only `<link>`, `<meta>`, and `<script>` tags are allowed.

## Card: Landing Page Redirect
**Q:** What are the requirements for a landing page redirect URL?
**A:** Must begin with https:// and be fewer than 2,000 characters. Set it up before unpublishing to avoid the "URL no longer exists" page.

## Card: Landing Page Preview
**Q:** What's required to preview a landing page, and what's unresolved in preview?
**A:** You must be a site contributor to the Marketing Landing Pages site. Merge fields are unresolved in preview; external images need their domain in the Trusted URL list.

## Card: Template Component Locking
**Q:** What does locking a landing page template component protect — and what doesn't it protect?
**A:** It protects content and settings only. Authors can still edit targeting rules, add/delete variations, and modify personalization logic on locked components — clone the personalization point for control over the logic.

## Card: Landing Page Template Variants
**Q:** What happens when a marketer creates a landing page from a template with dynamic content?
**A:** All dynamic content rules and variants are copied to the new landing page automatically. The fallback variant renders when no rules match or the data lookup fails.

## Card: LinkedIn Post Setup
**Q:** What one-time admin setup is needed for LinkedIn posts?
**A:** Add the Social Posts related list to the campaigns object (Object Manager → Campaigns Layout → Related List), then connect a LinkedIn account via Manage Connections.

## Card: Form Requirements
**Q:** What are the minimum requirements for a form, and the unique names for submission fields?
**A:** At least one input component and one button. Email field = unique name Email, first name = FirstName, last name = LastName (case-insensitive, no extra characters/spaces).

## Card: Form-Landing Page Relationship
**Q:** How many forms per landing page, and how many flows per form?
**A:** One form per landing page; a form relates to only one flow. View modes must match (block ↔ block, code ↔ code).

## Card: Form Write Data Provider
**Q:** What objects can a form's write data provider use, and what's the default?
**A:** Account, Contact, Lead, Prospect, or an available marketing object. If a marketing object is available it's the default; otherwise the form defaults to Lead. Only one write data source object at a time.

## Card: Form Read Data Providers
**Q:** What can a form's read data providers supply, and what's the lookup limit?
**A:** Pre-fill fields and drive progressive profiling (they don't receive submitted data). Sources: recipient data graph, marketing object, or Prospect; up to 2 lookup data providers (max 1 marketing object + 1 recipient data graph).

## Card: Form Field Types
**Q:** Which field types are supported on forms, and which standard field isn't?
**A:** Checkbox, Date, Date/Time, Time, Email, Phone Number, Number, Picklist, Text, Text Area, Text Area (Long), URL. Number of Employees (Account/Lead/Prospect) isn't supported.

## Card: Form API Name Change
**Q:** What happens if you edit a CRM field's API name after using it in a form?
**A:** Any new data submitted to that field isn't saved. Also, a data source field can appear only once on a form (no duplicates).

## Card: Hidden Field Fallback
**Q:** What's required for a hidden form field marked as required?
**A:** A fallback value — used when the URL parameter is invalid or missing. Hidden fields are visible on the canvas but not in preview/live form.

## Card: reCAPTCHA Scope
**Q:** Where does Google reCAPTCHA v2 apply, and what breaks it?
**A:** Only marketing landing pages with forms (not LWR/template sites); once enabled it shows on every form. Changing My Domain breaks it on existing published sites — add the new domain in the Google admin console.

## Card: Progressive Profiling Rules
**Q:** What are the restrictions on progressive profiling rules?
**A:** Can't add a rule to a hidden field; can't hide a field that has a profile rule; can't apply to a related object. Changing the read data provider/source removes all rule connections.

## Card: Pre-Fill PII Warning
**Q:** What should you avoid pre-filling in forms?
**A:** Personally identifiable information such as Social Security numbers or credit card numbers.

## Card: Form Unpublish
**Q:** What happens when you unpublish a form?
**A:** Its flow is deactivated and the Submit button stops working (an in-flight submission still completes). The form reverts to draft; to edit/republish, save the flow as a new version.

## Card: External Form Embedding Code
**Q:** What makes up the form embedding code for external sites?
**A:** Two `<script>` tags (hosting + Lightning Out bootstrap) and a custom HTML `<fragment>` element. Generated from the published version — republish to refresh.

## Card: External Form Security Setup
**Q:** What security configuration is needed before embedding a form externally?
**A:** CORS Allowed Origin List entry, clickjack protection (Trusted Domains for Inline Framing or allow any page), Trusted Sites for Scripts, then publish the Experience Cloud site (skipping publish causes a frame-ancestors 'self' CSP error).

## Card: Form Handler Definition
**Q:** What does a form handler do, and what does creating one also create?
**A:** Captures data from an existing external website form and creates/updates Salesforce records (no site rebuild needed). Creating one also creates a data source in Data 360.

## Card: Form Handler Field Matching
**Q:** What must match exactly for a form handler to capture a value?
**A:** The external field name must exactly match the HTML name attribute of the field in your form. Date = YYYY-MM-DD; Time = hh:mm:ss; DateTime = ISO 8601; selected checkbox = true.

## Card: Form Handler Honeypot
**Q:** What's a honeypot field, and what name should you give it?
**A:** A hidden field that bots fill in — the handler blocks submissions containing a value there. Use an appealing generic label (company, website), not an obvious name like honeypot or do_not_fill. Combine with reCAPTCHA.

## Card: Form Handler Flow
**Q:** When must you map fields relative to creating the form-handler flow?
**A:** Add and map all required fields before creating the flow — edits after don't reflect automatically (new flow versions include updated mappings).

## Card: Client-Side vs Server-Side Connection
**Q:** What's the difference between client-side and server-side form handler connections?
**A:** Client-side (JavaScript snippet) supports web tracking and identity resolution; server-side (direct POST URL) doesn't, but works with third-party builders, strict CSP, and backend posts. Both need a CORS Allowlist entry.

## Card: Marketing Site Hosting
**Q:** What does a marketing site host, and what permission is needed to manage it?
**A:** Code-view landing pages and forms (component/template pages use the Marketing Landing Pages site). Editing settings and publishing requires the Marketing Cloud Admin permission set.

## Card: Marketing Site Languages
**Q:** What must you do to publish a landing page in a non-default language?
**A:** Add the language to the marketing site (Languages tab) and republish the site.

## Related
- [[landing-pages]]
- [[forms-data-sources]]
- [[external-forms-form-handlers]]
- [[marketing-sites]]
- [[web-tracking]]
- [[content-and-personalization]]