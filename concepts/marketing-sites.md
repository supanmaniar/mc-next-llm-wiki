# Marketing Sites

## Core Idea
A **marketing site** hosts landing pages created in **code view** (component/template pages live on the auto-generated **Marketing Landing Pages** site instead). Each org has a default marketing site that publishes automatically when a landing page goes live, and its settings control public access, languages, integrations, security, and site-wide head markup.

## Prerequisites
- [[landing-pages]]
- [[web-tracking]]
- [[email-domain-authentication]]

## Detailed Explanation

### What a Marketing Site Hosts
| Site | Hosts |
|------|-------|
| **Marketing Landing Pages** (auto-generated Experience Cloud site) | Component/template-based landing pages |
| **Marketing site** (manage from the Marketing Sites tab) | **Code-view** landing pages and forms |

> **All Sites** under Digital Experiences lists both Marketing Sites and Marketing Landing Pages, but you can view/manage **only a marketing site** from the Marketing Sites tab.

### Permissions
- **Edit marketing site settings and publish a site:** **Marketing Cloud Admin** permission set.

### Edit Site Settings (Marketing Sites tab → Edit Settings)
Changes take effect when you **save and publish** the site (you receive an email when it's live).

| Tab | What you control |
|-----|------------------|
| **General** | Public access (anyone can view/interact without logging in); review the published URL |
| **Languages** | Default locale + supported languages. ⚠️ To publish a landing page in a non-default language, add the language here and **republish the site** |
| **Integrations** | Data 360, Data 360 Web Tracking Consent Banner, Google Analytics 4, Meta Pixel |
| **Security** | CSP security level, trusted sites for scripts, clickjack protection, cookie policy, Lightning Web Security; add trusted domains for script hosts |
| **Advanced** | Head markup applied to **every page** on the site; version history to review/roll back settings |

## Common Pitfalls / Misconceptions
⚠️ **Marketing sites host code-view pages only** — component/template pages use the Marketing Landing Pages site.
⚠️ **Non-default languages require adding the language + republishing the site.**
⚠️ **Site changes only go live after you publish the site.**
⚠️ **Only the Marketing Sites tab lets you manage a marketing site** — All Sites lists it but isn't where you edit it.

## Active Recall Questions
1. What content does a marketing site host vs. the Marketing Landing Pages site?
2. What permission is needed to edit marketing site settings and publish?
3. What must you do to publish a landing page in a non-default language?
4. What's on the Security tab of a marketing site?
5. When do site setting changes take effect?

## Related Concepts
- [[landing-pages]]
- [[forms-data-sources]]
- [[external-forms-form-handlers]]
- [[web-tracking]]
- [[user-access-and-permission-sets]]

## Source References
- `sources/Web_Content_Deep_Dive.txt` — "Manage a Marketing Site in Marketing Cloud Next"