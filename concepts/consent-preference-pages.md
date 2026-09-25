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

### Customization Limits of Out-of-the-Box Pages
- The standard preference page supports **limited branding**.
- For deeper control, build a custom experience with **Forms + Form-Triggered Flows + Landing Pages**.
- Pre-populating a page with a person's current subscription state via URL parameters **isn't natively supported** today.
- The one-click unsubscribe confirmation ("thank you") page has **limited customization**.

### Multiple Preference Pages
Yes — you can create and publish **more than one** Preference Page. They're available in the Merge Field selector when you add the Preference Page link to your message.

### Localization
Use **multiple Preference Pages (one per language)** along with **dynamic rules** in your message to surface the right Preference Page URL based on a language-preference field stored in Data Cloud.

### Multi-Channel
Adding **multiple channels to a single Preference Page is not available today**.

### Reverting a Custom Page
Publishing a custom page is **unsupported to revert** — it's intended to be a one-way change.

### Coding Languages
**AMPscript, Apex, and other coding languages are not supported** on Preference Pages.

### Unsubscribe Event Behavior (Important)
If a recipient navigates to the Preference Page (including via a link in an email) and unsubscribes there, **no Unsubscribe event is logged in the Email Engagement DMO**. This is expected behavior.

- The change is processed as a **consent update**, not an Email Engagement Unsubscribe event.
- Verify the change by checking the **consent-related DMOs** instead of Email Engagement.
- This can make the **Email Opt-Out Rate** of a specific email look **lower than expected**, because preference-center unsubscribes aren't included in that rate.

## Common Pitfalls / Misconceptions
⚠️ Preference Page unsubscribes don't log Email Engagement Unsubscribe events — check consent DMOs instead.
⚠️ This skews the Email Opt-Out Rate metric lower than expected.
⚠️ You can't revert a published custom page.
⚠️ No coding languages (AMPscript/Apex) on Preference Pages.
⚠️ No multi-channel on a single Preference Page.

## Active Recall Questions
1. What are the customization limits of the out-of-the-box preference page?
2. How do you localize a Preference Page?
3. Can you have more than one Preference Page?
4. Why might Email Opt-Out Rate look lower than expected?
5. What happens when someone unsubscribes via the Preference Page?

## Related Concepts
- [[consent-and-compliance]]
- [[consent-write-paths]]
- [[content-and-personalization]]
- [[reporting-metrics-dashboards]]

## Source References
- User-provided "Consent Management: Preference Pages" article