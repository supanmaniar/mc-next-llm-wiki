# Consent Preference Pages

## Core Idea
Preference Pages let subscribers manage their own consent, but the out-of-the-box pages have real limits (limited branding, no multi-channel, no coding) — for deeper control you build a custom experience with Forms + Form-Triggered Flows + Landing Pages.

## Prerequisites
- [[consent-and-compliance]]
- [[consent-write-paths]]
- [[content-and-personalization]]

## Detailed Explanation

### Customizable Preference Pages
Customizable Preference Pages are **generally available**. They're the standard way for subscribers to manage their own subscriptions.

- **Spring release:** introduced **custom preference pages**.
- **Summer release:** expanded to allow **multiple preference pages** — for example, separate pages for different brands.

### Building a Preference Page (what you can configure)
When creating a preference page, users can:
- Apply a **brand** that controls colours, typography, buttons, spacing, borders, and more.
- Add **content blocks** such as dividers, headings, lists, and paragraphs.
- Include **layouts** and **image blocks**.
- Designate a **default preference page** used across all marketing message sends.

**Creation flow (demo):** create a **subscription** first (Consent tab → Subscriptions → New Subscription; name it, assign a channel, choose BU scope) → open a **CMS workspace** → create the preference page → add the **subscription list block** (choose channel + business unit scope) → customise with content → **save and publish**. Once published, it can be added as a **preference page link** in an email.

### Customization Limits of Out-of-the-Box Pages
- The standard preference page supports **limited branding**.
- For deeper control, build a custom experience with **Forms + Form-Triggered Flows + Landing Pages**.
- Pre-populating a page with a person's current subscription state via URL parameters **isn't natively supported** today.
- The one-click unsubscribe confirmation ("thank you") page has **limited customization**.

### Multiple Preference Pages
Yes — you can create and publish **more than one** Preference Page (e.g., one per brand). They're available in the Merge Field selector when you add the Preference Page link to your message.

### Channel-Specific Pages (message channel determines the page)
The **message channel automatically determines which type of preference page is available**:
- **Email** messages generate a link to the **email preference manager**.
- **SMS** messages use a separate, **SMS-specific** preference page.

⚠️ A single **unified preference page covering both email and SMS isn't available out-of-the-box** — the experience remains channel-specific, and a unified cross-channel experience requires **custom development**.

### Standard Subscription Block Limits
- The standard subscription block **doesn't currently allow editing** of elements like **button labels, headings, and subheadings**, or the **order of the subscription list**.
- **Partial workaround:** rename the communication subscriptions from the **Consent tab**.
- **Full text customization is planned for an upcoming release** (roadmap features and dates are subject to change).

### Localization
Use **multiple Preference Pages (one per language)** along with **dynamic rules** in your message to surface the right Preference Page URL based on a language-preference field stored in Data Cloud.

⚠️ **Multilingual preference pages aren't natively supported today** — supporting multiple languages requires **custom forms or custom preference page development**.

### Multi-Channel
Adding **multiple channels to a single Preference Page is not available today**.

### Reverting a Custom Page
Publishing a custom page is **unsupported to revert** — it's intended to be a one-way change.

### Coding Languages
**AMPscript, Apex, and other coding languages are not supported** on Preference Pages. This includes **server-side JavaScript**.

### Unsubscribe Event Behavior (Important)
If a recipient navigates to the Preference Page (including via a link in an email) and unsubscribes there, **no Unsubscribe event is logged in the Email Engagement DMO**. This is expected behavior.

- The change is processed as a **consent update**, not an Email Engagement Unsubscribe event.
- Verify the change by checking the **consent-related DMOs** instead of Email Engagement.
- This can make the **Email Opt-Out Rate** of a specific email look **lower than expected**, because preference-center unsubscribes aren't included in that rate.

## Common Pitfalls / Misconceptions
⚠️ Preference Page unsubscribes don't log Email Engagement Unsubscribe events — check consent DMOs instead.
⚠️ This skews the Email Opt-Out Rate metric lower than expected.
⚠️ You can't revert a published custom page.
⚠️ No coding languages (AMPscript/Apex/server-side JavaScript) on Preference Pages.
⚠️ No multi-channel on a single Preference Page — email and SMS use separate pages; a unified page needs custom development.
⚠️ **Multilingual pages aren't natively supported** — use custom forms/development.
⚠️ The standard subscription block can't edit button labels/headings/subheadings or reorder the subscription list (rename subscriptions from the Consent tab as a partial workaround).
⚠️ You can't pre-populate a page from URL parameters.

## Active Recall Questions
1. What are the customization limits of the out-of-the-box preference page?
2. How do you localize a Preference Page?
3. Can you have more than one Preference Page?
4. Why might Email Opt-Out Rate look lower than expected?
5. What happens when someone unsubscribes via the Preference Page?
6. What does the message channel determine about the preference page?
7. What can you configure when building a preference page (brand, content blocks, layouts)?
8. What's the partial workaround for editing subscription list text?

## Related Concepts
- [[consent-and-compliance]]
- [[consent-write-paths]]
- [[content-and-personalization]]
- [[reporting-metrics-dashboards]]

## Source References
- User-provided "Consent Management: Preference Pages" article
- `sources/MCNext_Consultant_Exam_Masterclass_Session1.txt` — Elliot Harper, "Marketing Cloud Next Consultant Exam Masterclass" Session 1 (Salesforce, Summer '26)