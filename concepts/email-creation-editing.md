# Creating & Editing Emails (Visual, Code View & Templates)

## Core Idea
Emails are built in the Content Builder (visual canvas) or in **Code View** (HTML/CSS + Handlebars), previewed/tested against a segment, and **published** before a campaign flow can send them. Reusable **email templates** lock brand elements while letting authors edit within boundaries, and promotional emails must carry CAN-SPAM consent details via merge fields.

## Prerequisites
- [[email-building-personalization]]
- [[content-and-personalization]]
- [[consent-and-compliance]]
- [[personalization-data-sources]]

## Detailed Explanation

### Permissions (Content)
- **Create/edit content:** Marketing Cloud Manager permission set **AND** any CMS workspace contributor role.
- **Publish/unpublish content:** Marketing Cloud Manager permission set **AND** a CMS workspace contributor role of **content admin or content manager**.

> A marketing admin can **lock** email settings (global styles, layouts, personalization data sources) in templates, plus lock the subject line/preheader and specific content blocks (footer, header) for brand consistency.

### Ways to Create or Edit an Email
| Entry point | How |
|-------------|-----|
| **Content tab** | Add → Content → Email → choose creation method |
| **Campaign** | Campaigns tab → open campaign → Edit next to the email |
| **Flow** | Open a Send Email Message element → edit the related email |
| **Copy** | Open email → **Copy to another folder** (name + folder; can be same folder) |

⚠️ **Copying an email with personalization drops elements:** only the **default variations** of dynamic content components are copied — other variations and personalization rules are **not**. A Personalization recommender isn't copied either (but its merge fields and repeaters are) — remove/replace it or add it to a new email.

### Editor Steps (Visual)
1. Enter a **title** (visible only to MC Next users in your org).
2. Specify **brand**, **subject**, and **preheader**.
3. Add/move components; rich text editor (font, size, colors, line height; emoji, block quotes, horizontal lines).
4. Set **Message Purpose** to Promotional or Transactional.
5. **File attachment:** PDF from Salesforce CMS, up to **5 MB**.
6. **Merge fields** for subject/preheader or content (data graph attributes, unified profile values, offers, event data…).
7. Promotional emails (or transactional with consent validation enabled): include **physical address + opt-out link**.
8. **Publish** to make it sendable — you **can't activate a campaign flow** containing an unpublished email.

### Edit Content with Agentforce
- Click the **sparkle** button next to subject/preheader or in a text component's toolbar, or open the Agentforce chat.
- The agent grounds content in the **campaign brief**, the **assigned brand**, and **existing canvas content**.
- Refine with **Try Again** or direct requests (e.g., "create a section with 2 columns, add a heading and button to each").

### Plain Text Version
- Add a plain text version for clients that don't render HTML (no formatting, fonts, colors, or inline images).
- ⚠️ Once you **manually edit** the plain text version, it's **no longer in sync** with the original — future changes to the original aren't included. **Restore** discards plain-text edits.

### Preview & Test
- **Prerequisite:** publish at least one segment. Preview/test works in **any status**; **test sends count toward message credits**.
- Preview: select a **segment** + **sample recipient**.
- Test: up to **5 comma-separated** addresses; From name must be from an **authenticated domain**; verify merge fields, links/buttons (especially opt-out links).
- ⚠️ A **complete physical address** (including an alphanumeric value in the State field) is required in every marketing email. If your address has no state/region/province, insert a **placeholder** (add it to the region picklist first if applicable).

### Unpublish an Email
- Returns the email to **draft** status and prevents sending in a campaign.
- Review related flows/content first; then **Unpublish Now** or **Schedule Unpublish**.

### Required Consent Details (CAN-SPAM)
- Add an **opt-out link** and a **physical mailing address** via merge fields in text-based components (commonly a footer).
- **Physical Address** merge field → org address from Salesforce Setup; opt-out merge fields resolve to URLs at send time.
- ⚠️ Preference Manager and Unsubscribe links **aren't functional in preview** (review default preference pages on the Consent tab).
- Opt-out link options:
  - **Unsubscribe** — unsubscribes from the email's communication subscription immediately + shows a confirmation page.
  - **Preference Manager** — page to manage individual email preferences.
  - **Custom preference page** — add your own URL instead of a merge field.

### Email Templates
- **Create:** Content tab → Add → Content → **Email Template** → Create → standard template (Template Switcher to change layout without losing content) or custom (**Use Components**).
- Configure: title, subject, preheader, Message Purpose. **Publish Now** to make it available to authors (appears under **Custom Templates**).
- **Manage template content (locked by default):**
  - Template-wide: Settings tab → **Allow users to modify template settings for an individual email** (styles, layouts, settings, unlocked components).
  - Subject/preheader: lock icons in Settings (can be unlocked even when template-wide editing is off).
  - Data sources: Data Sources tab → **Allow users to modify data sources**.
  - Components: select component/column/section → **Allow users to modify this component** (applies to nested components too).
  - ⚠️ **Nested components mirror the parent** — locking/unlocking the parent cascades.
- **Unpublish a template:** Unpublish Now or Schedule Unpublish (prevents others from using it).

### Code View (HTML/CSS + Handlebars)
- Create with **Create with HTML**, or convert a component-based email via the **Code View** icon → **Convert to Code**.
- ⚠️ **Converting to code is irreversible** and removes dynamic content — repeaters, conditional logic, and content variants. You also lose drag-and-drop components and Style tab styling.
- Code view provides **syntax validation, inline coding assistance, and search**.
- **View as Web Page link** (`{$link.ViewAsWebPageUrl}`): active when sent, works for **90 days**; reflects the **published version** at send time; personalized values **re-render against the recipient's current profile** each time the link is opened.
- **Preview (code view):** Preview Source = **Segment (Unified Individual)** + published segment + sample recipient; provide preview data for **Content Variables** (or JSON), **Apex Input** (JSON), and **Event** values; preview in another language.

## Common Pitfalls / Misconceptions
⚠️ **Copying an email drops non-default variations, personalization rules, and recommenders.**
⚠️ **Converting to code is one-way** and strips dynamic content (repeaters, conditional logic, variants).
⚠️ **Manually editing the plain text version desyncs it** from the HTML version.
⚠️ **Test sends count toward message credits.**
⚠️ **Unpublished emails block campaign flow activation.**
⚠️ **Preference Manager/Unsubscribe links don't work in preview.**
⚠️ **Physical address (with alphanumeric State) is mandatory** in every marketing email.

## Active Recall Questions
1. What permissions are needed to create vs. publish content?
2. What happens when you copy an email that includes personalization?
3. What does converting an email to code remove, and can you undo it?
4. How long does a View as Web Page link work, and what does it re-render?
5. What are the three opt-out link options for promotional emails?
6. How does locking work for template-wide settings vs. individual components?

## Related Concepts
- [[email-building-personalization]]
- [[content-and-personalization]]
- [[consent-and-compliance]]
- [[personalization-data-sources]]
- [[dynamic-from-reply-addresses]]
- [[distributed-marketing]]
- [[conversational-marketing]]

## Source References
- `sources/Email_Deep_Dive.txt` — "Create an Email in Marketing Cloud Next", "Add Required Consent Details to Promotional Emails", "Create an Email Template", "Create an Email in Code View"