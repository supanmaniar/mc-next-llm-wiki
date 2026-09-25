# Landing Pages (Create, Templates, SEO & URLs)

## Core Idea
Landing pages host introductory/brand content and forms for lead generation. They're built with components/templates (hosted on the auto-generated **Marketing Landing Pages** Experience Cloud site) or in **code view** (hosted on a marketing site), configured with SEO properties and URL aliases, and published to activate their URLs and any related form + flow.

## Prerequisites
- [[content-and-personalization]]
- [[personalization-data-sources]]
- [[web-tracking]]
- [[forms-data-sources]]

## Detailed Explanation

### Permissions
- **Create/edit content:** Marketing Cloud Manager permission set **AND** any CMS workspace contributor role.
- **Publish/unpublish content:** Marketing Cloud Manager permission set **AND** a CMS workspace contributor role of **content admin or content manager**.
- **Author with AMPscript:** the above **AND** the **AMPscript Author** permission.

### Hosting: Two Kinds of Sites
| Creation method | Hosted on |
|-----------------|-----------|
| **Components or template** | **Marketing Landing Pages** — auto-generated Experience Cloud site, used only to host content, generally no editing needed |
| **Code view** | A **marketing site** (manage from the Marketing Sites tab) |

> If a landing page uses a language other than the site default, a content admin must add that language to the site and **republish** it.

### Create a Landing Page
- **Create the form first** if you plan to include one (a draft form + landing page come with a **Signup Form campaign**).
- Entry points: Campaigns tab → **Signup Form campaign** → edit the landing page; or Content tab → Add → Content → **Landing Page**.
- Steps: choose creation method → configure **SEO** → save + preview → edit **URL alias** (⚠️ can't change after publish) → **publish** (activates URL aliases; publishing a page with a form publishes the form and **activates the related flow**) → test via the **Public URL**.

### Personalization on Landing Pages
- Merge field picker lists every data source a **read data provider** can access — data graphs, marketing objects, and Prospect — namespaced by source: `$recipient.FirstName`, `$Storefront_DG.StoreName`, `myObject__mo.FieldName`, `prospect.Company`.
- **Recipient profile value** → select the recipient data graph → Primary Objects field.
- **Reference data** (e.g., product catalog) → add a **lookup data provider** with a single-attribute filter matching the current recipient.

### Code View Landing Pages
- Build with custom HTML/CSS/Handlebars; live preview; search; Handlebars hints.
- Map each input to a data source field via a **`data-ref`** attribute — each `data-ref` must reference a **single field** (no expressions/logic), and each field maps to **only one input**.
- Add a write data source for form fields; ensure **every required field** on the data source has a mapped input.

### SEO Settings
- **Public page title** (search results + browser tab), **description** (if blank with indexing on, search engines show the first text found), **head tags** (structured data), and **"Let search engines index this page"**.
- **Structured data:** only **JSON-LD** (`<script type="application/ld+json">`) is allowed in head tags — **no JavaScript**.
- **Allowed head tags:** `<link>`, `<meta>`, `<script>` only, with restricted attributes/values (e.g., `http-equiv="X-UA-Compatible"` only with `content="IE=Edge"`).

### Preview
- Must be a **site contributor** to the Marketing Landing Pages site.
- ⚠️ **Merge fields are unresolved in preview**; external images need their domain in the **Trusted URL list** in Setup.
- Preview Device menu (desktop/mobile); select a **segment + sample visitor** for personalized content (empty → default variations + fallback values).

### URL Details
| URL type | Notes |
|----------|-------|
| **Public URL** | Generated on publish; multiple public URLs possible with multiple domains (add domains or LWR site channels, then republish); custom domain → custom URL |
| **URL alias** (vanity) | End of the public URL, no spaces; default = title + content key; editable **only in Draft** status |

**URL alias statuses:** **Draft** (never activated, editable) · **Active** (accessible online) · **Inactive** (deactivated, users redirected; can reactivate).

**Redirect:** URL tab → **Deactivate URL Alias...** → enter redirect URL (must start with `https://`, **fewer than 2,000 characters**).

### Unpublish a Landing Page
- Visitors can no longer access the public URL/alias.
- ⚠️ **Set up the redirect before unpublishing** — otherwise visitors get a generic **"URL no longer exists"** page (404).
- Reverts to draft; can be republished later.

### Landing Page Templates
- Create: Content tab → Add → Content → **Landing Page Template** → standard template (Template Switcher to change layout without losing content) or custom (**Use Components**).
- **Dynamic content in templates:** enable Dynamic Content on a component → create/clone/link a personalization point → add variants per rule (first matching rule wins) → designate a **fallback variant** (shown when no rules match or the data lookup fails).
  - ⚠️ **Locking a component only protects content/settings** — authors can still edit targeting rules, add/delete variations, and modify personalization logic on locked components. **Clone** the personalization point (don't link) for control over the logic.
  - When a marketer creates a landing page from the template, **all dynamic content rules and variants are copied automatically**.
- **Edit:** merge fields in locked components can only be edited in the template; changes to **linked** personalization points propagate between template and content **regardless of locking**.
- **Publish/unpublish:** Publish Now or schedule; unpublish hides it from other users.

### LinkedIn Posts (Social Posting)
- **One-time admin setup:** add the **Social Posts** related list to the campaigns object (Object Manager → Campaigns Layout → Related List).
- **Connect:** campaign record → Social Posts related list → **Manage Connections** → **Connect to LinkedIn** → log in + confirm external access.
- **Create:** **Add Social Posts** → select account → **Post Name** + **Post Body** → **Publish Now** or **Schedule** (future date/time) → **Schedule Post**.

## Common Pitfalls / Misconceptions
⚠️ **URL alias can't be changed after publish** — edit it in Draft only.
⚠️ **Merge fields are unresolved in landing page preview.**
⚠️ **Publishing a landing page with a form publishes the form and activates its flow.**
⚠️ **Only JSON-LD structured data is allowed in head tags — no JavaScript.**
⚠️ **Unpublishing without a redirect → "URL no longer exists" page.**
⚠️ **Template component locking doesn't protect personalization logic** — clone the point for that.
⚠️ **Code view `data-ref` must map one field to one input** — no expressions.

## Active Recall Questions
1. Where are component-based vs. code-view landing pages hosted?
2. When can you edit a URL alias, and what happens on publish?
3. What structured data format is allowed in head tags?
4. What happens when you publish a landing page that contains a form?
5. What's the redirect URL requirement (scheme + length)?
6. What does locking a template component protect — and what doesn't it protect?

## Related Concepts
- [[forms-data-sources]]
- [[external-forms-form-handlers]]
- [[marketing-sites]]
- [[content-and-personalization]]
- [[personalization-data-sources]]
- [[web-tracking]]
- [[dynamic-content-variations]]

## Source References
- `sources/Web_Content_Deep_Dive.txt` — "Create a LinkedIn Post", "Create and Manage a Landing Page", "Create and Manage a Landing Page Template", "SEO Page Properties for Landing Pages", "URL Details for Marketing Landing Pages"