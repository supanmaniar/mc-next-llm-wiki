# External Forms & Form Handlers

## Core Idea
Forms built in Marketing Cloud Next can be **embedded on your own external website** (via embedding code + CORS/clickjack/trusted-site configuration), or you can keep your existing site forms and use a **form handler** to capture their submissions into Salesforce — mapping your form's field names to Salesforce fields and triggering a flow.

## Prerequisites
- [[forms-data-sources]]
- [[landing-pages]]
- [[web-tracking]]
- [[campaigns-and-flows]]

## Detailed Explanation

### Using a Form on an External Site
- The external site must be **secure (HTTPS)**; externally hosted forms **respect end-user consent** (web tracking only transmits with explicit consent).
- The form can be associated with a landing page, but **doesn't have to be** — publish it standalone for external-only use.
- Changes to an embedded form appear on the external site **after republishing**.
- ⚠️ **Only one reCAPTCHA-protected form per external page** — later forms fail without an error.

### Prepare the Org for External Forms
**Permissions:** Modify All Data **OR** Marketing Cloud Admin permission set **OR** Customize Application **AND** Manage Experiences.

Prerequisites: active Experience Cloud site connected to MC Next; published form with embedding code (**two `<script>` tags + a custom HTML `<fragment>` element**); external site origin URL; site supports JavaScript + iframe embedding; prefer **first-party tracking** (align pages under your root domain).

**1. CORS Allowed Origin List** (Setup → CORS Allowed Origin List → New): add the external site origin (e.g., `https://www.example.com`).

**2. Clickjack protection** (All Sites → Builder → Settings → Security & Privacy): the embedding code relies on **Lightning Out** (iframe).
- **Allow framing of site pages on external domains (good protection)** — for sites where your HTML runs directly (custom CMS, static hosting); add **Trusted Domains for Inline Framing**.
- **Allow framing by any page (no protection)** — for platforms with dynamic URLs (e.g., Google Sites); ⚠️ removes all clickjack restrictions — use only when the good option isn't compatible.

**3. Trusted Sites for Scripts** (Security & Privacy): add the external domain so its scripts can interact with your Experience Cloud site.

**4. Publish the Experience Cloud site** — always republish after security changes; ⚠️ skipping publish causes a **frame-ancestors 'self' CSP error**.

**5. Add the embedding code** (form → Embed tab → Copy Code): two `<script>` tags above the form location + the `<fragment>` element where the form renders. The code reflects the **published version** — republish to refresh.

**6. Web tracking (optional):** set `data-web-tracking="true"` on the fragment + configure the **Data 360 Web SDK connector** (a missing SDK shows an informational console message but doesn't block the form).

### Form Handlers (Existing Site Forms)
A **form handler** captures data from a form on an external website and creates/updates Salesforce records — no need to rebuild your site's forms. Creating one also creates a **data source in Data 360**.

**Data structure patterns:**
- **Explicit field names** — each field named in the data model (easy to understand; requires modifying the object when adding fields).
- **Generic field names** — flexible (handle new fields without object changes) but ambiguous; needs metadata to describe payload attributes. Often a combination of both.

**Create a form handler:**
1. Content tab → Add → Content → **Form Handler** → name it.
2. **Add a Data Source** → Type = **Salesforce Record** → Object (e.g., Contact).
3. **Map form fields** — drag fields, then set the **external field name** for each.
   - ⚠️ The external field name must **exactly match** the HTML `name` attribute in your form.
   - **Date** = `YYYY-MM-DD` · **Time** = `hh:mm:ss` · **DateTime** = `YYYY-MM-DDTHH:mm:ss.sssZ` (ISO 8601) · **Checkbox** selected = `true`.
4. **Spam protection (optional):** add a **Honeypot** field — bots fill hidden fields, so the handler blocks submissions containing a value there. ⚠️ Don't use an obvious name (`honeypot`, `do_not_fill`); pick an appealing generic label (e.g., `company`, `website`). Honeypot alone isn't enough — combine with reCAPTCHA.
5. **Automate with a flow:** New Flow from the form handler page — ⚠️ **add and map all required fields before creating the flow** (edits after don't reflect automatically; new flow versions include updated mappings). External field names become **resources** usable in decisions, personalization, and actions on **any object**.
6. **Submission redirects:** full URLs for success and failure.
7. **Publish** — generates the code connecting your form to Salesforce (if using reCAPTCHA, generate/send the token with submissions); turn on web tracking to monitor engagement.

### Connect an External Form to a Form Handler
Two connection methods (both hit the same handler + flow; both need a **CORS Allowlist** entry):

| | **JavaScript Snippet (Client-Side)** | **Direct POST URL (Server-Side)** |
|---|---|---|
| How it works | Script on the page sends data on submit | Form posts directly to a Salesforce URL |
| Add to site | `<script>` tag + form attributes | URL as form action / webhook destination |
| Best for | Pages where you control HTML/scripts | Third-party builders, strict CSP, backend-server posts |
| Web tracking | ✅ Yes | ❌ No |
| Identity resolution | ✅ Yes | ❌ No |
| CORS Allowlist | ✅ Yes | ✅ Yes |

- **Client-side:** paste the tracking script before `</body>`, add `id` + `data-uma-forms="true"` to the `<form>` tag, match `name` attributes, add the domain to CORS, turn on web tracking.
- **Server-side:** set the form `action` to the Salesforce URL (`https://YOUR_DOMAIN/lp/cms/form/submit/v1/CONTENT_KEY`) with `method="POST"` (or POST from a backend with `application/x-www-form-urlencoded`).
- **CORS Allowlist:** authorize the hosting domain (wildcard `https://*.example.com` for subdomains); ⚠️ without it, Salesforce **blocks the submission** before processing.
- **Test:** submit a test entry → confirm success URL + record created/updated. If no record, check `name` attributes match external field names and the flow completes without errors.

## Common Pitfalls / Misconceptions
⚠️ **External sites must be HTTPS** and consent-respecting.
⚠️ **Embedding code = 2 script tags + 1 fragment element**, generated from the published version.
⚠️ **Always republish the Experience Cloud site after security changes** (else frame-ancestors 'self' CSP error).
⚠️ **External field names must exactly match HTML `name` attributes** — otherwise the handler doesn't capture the value.
⚠️ **CORS allowlist is mandatory** for both connection methods.
⚠️ **Map all fields before creating the form-handler flow.**
⚠️ **One reCAPTCHA-protected form per external page.**
⚠️ **Honeypot alone isn't sufficient spam protection.**

## Active Recall Questions
1. What are the two connection methods for a form handler, and what does each support?
2. What three pieces make up the form embedding code?
3. What happens if you don't republish the Experience Cloud site after security changes?
4. What are the date/time formats for form handler fields?
5. What's the honeypot field, and what name should you give it?
6. What must match exactly for the form handler to capture a value?

## Related Concepts
- [[forms-data-sources]]
- [[landing-pages]]
- [[web-tracking]]
- [[campaigns-and-flows]]
- [[marketing-sites]]

## Source References
- `sources/Web_Content_Deep_Dive.txt` — "Using a Form on External Sites", "Prepare to Use Forms on an External Site", "Embed a Form on an External Site", "Use a Form Handler to Update Salesforce Objects with Form Data", "Connect an External Form to a Form Handler"