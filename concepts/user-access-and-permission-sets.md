# User Access & Permission Sets

## Core Idea
Marketing Cloud Next ships with two main permission sets — **Marketing Cloud Admin** and **Marketing Cloud Manager** — plus granular permissions and content roles that control who can build, publish, and manage campaigns, content, and flows.

## Prerequisites
- [[marketing-cloud-next-overview]]

## Detailed Explanation

### The Two Permission Sets

| Permission Set | What it grants |
|----------------|----------------|
| **Marketing Cloud Admin** | Access to Salesforce Setup, Agentforce Admin, Prompt Template Manager, **full control** on campaigns, segments, and flows |
| **Marketing Cloud Manager** | Full control on campaigns, segments, and campaign (non-admin) flows; access to Agentforce and Prompt Templates |

### Assigning Permission Sets
- **Single user:** Setup → Users → select user → Permission Set Assignments → Edit Assignments (Add/Remove)
- **Bulk:** Setup → Permission Sets → select set → Manage Assignments → Add Assignments → select users

Permission needed: **Assign Permission Sets** system permission, or Marketing Cloud Admin.

### Content Contributor Roles (CMS Workspace)
Digital Experiences tools use separate roles:
- **Content Admin** — manage users, sharing, publish all content, assign default brand
- **Content Manager** — create/publish all content, assign default brand
- **Content Author** — view, edit, create content

Add via: Marketing app → Content tab → workspace → Contributors → Add Contributors.

### Site Contributors (Landing Page Preview)
Add contributors to the **Marketing Landing Pages** site with the **Viewer** role (must also be site members) so they can preview landing pages as authenticated users.

### Identity-Licensed Users
Identity-licensed users sign in via Salesforce SSO and get Marketing Cloud Manager-level access (campaigns, segments, flows, shared Analytics reports).
1. Clone the **Identity User** profile → rename
2. Set these tabs to **Default On**: Analytics, Briefs, Campaigns, Consent, Contacts, Content, Flows, Home, Leads, Segments
3. Create user with **Identity** license + that profile
4. Add permission sets: **Marketing Cloud Manager** + **Tableau Next Included App Business User**

### Privacy Preference Manager Tab
Turn on the **Privacy Preference Manager** tab (Default On) in the Standard User profile so marketers can edit the default email preference page.

## Common Pitfalls / Misconceptions
⚠️ **Marketing Cloud Admin ≠ Marketing Cloud Manager** — Admin can access Setup; Manager cannot access full Setup (only campaigns/segments/flows).
⚠️ CMS content roles (Content Admin/Manager/Author) are separate from permission sets — don't confuse them.
⚠️ Site contributors need **both** the Viewer role AND site membership.

## Active Recall Questions
1. What are the two main permission sets and their key difference?
2. Which roles can create and publish all content in a CMS workspace?
3. What two permission sets must an Identity-licensed user receive?
4. Which tabs must be set to "Default On" for an Identity profile?

## Related Concepts
- [[marketing-cloud-next-overview]]
- [[consent-and-compliance]]

## Source References
- `sources/mktg_implementation_guide.pdf` — "Manage User Access", "User Permissions in Marketing Cloud Next"