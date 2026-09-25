# Sandbox & Deployment

## Core Idea
Sandboxes are safe copies of your production org for testing, training, and development. Marketing Cloud Next supports all sandbox types, but you must handle Data Cloud objects, sender codes, and content replication carefully before deploying back to production.

## Prerequisites
- [[marketing-cloud-next-overview]]
- [[data-kits-and-data-streams]]

## Detailed Explanation

### Supported Sandbox Types
Developer, Developer Pro, Partial Copy, Full Copy — all supported.

### Sandbox Uses
Training, parallel development, app development/customization, app testing/automation, implementing new features/proof-of-concept.

### Replication & Deployability (Key Examples)

| Feature | Replicated in Full sandbox | Deployable from sandbox |
|---------|---------------------------|------------------------|
| Campaign | Yes | No |
| Brief | Yes | No |
| Communication Subscription | Yes | No |
| Email/Form/Landing Page content | Yes | Yes |
| Brand content / CMS workspace | Yes | Yes |
| Event-triggered flow | Yes | Yes |
| Segment-triggered flow | Yes | Yes |

> **General rule:** content and flows are deployable; campaigns, briefs, and subscriptions are **not** deployable.

### Key Considerations
- **Billing:** sandbox usage consumes credits (Data Cloud, Unified Messaging, Personalization), visible in production's Digital Wallet.
- **Unified Messaging:** don't reuse the production SMS sender code in sandbox (a code can only be active in one org). Each channel needs unique config per sandbox (authenticated domain, tracking domains, WhatsApp number, blockout windows).
- **Content:** Developer/Dev Pro/Partial Copy sandboxes don't copy CMS content (storage limits) — use change sets or imports.
- **Testing data:** add behavior/messaging events via CSV file upload data stream.

### Setup a Sandbox
1. Create/refresh sandbox (match licenses)
2. Turn on Data Cloud
3. Confirm connectors active (Salesforce CRM, Websites & Mobile Apps, Ingestion API)
4. Set up Marketing Cloud Next + channels
5. Publish Marketing Landing Pages site

### Blackhole for Email
Prevents accidental sending of test emails to real customers. Setup → "Blackhole" → Sandbox Blackhole → turn on (10 min to take effect). Add up to 5 allowed domains (exceptions). Doesn't suppress Preview/Test window or Debug flow window.

### Deploying Changes to Production
1. **Deploy Data Cloud objects first** (segments, DMOs, DLOs, data graphs, calculated insights, data actions, Personalization Points, recommenders, engagement signals) → then activate/publish.
2. **Deploy Marketing Cloud Next objects** (content records, email templates, brand, images; CMS workspace; flows) → activate/publish.

**Methods:** Change Sets, DevOps Center, Metadata Retrieve/Deploy, CLI Retrieve/Deploy.

> **Note:** Deployed flows and content always have **Draft** status in the target org.

## Common Pitfalls / Misconceptions
⚠️ Reusing production SMS sender code in sandbox (a code can't be active in two orgs).
⚠️ Deploying Marketing objects before Data Cloud objects (Data Cloud first).
⚠️ Deployed flows/content are always Draft — must manually activate/publish.
⚠️ Campaigns, briefs, and subscriptions are NOT deployable from sandbox.

## Active Recall Questions
1. Which objects must you deploy FIRST (Data Cloud or Marketing)?
2. Why can't you reuse the production SMS sender code in a sandbox?
3. What status do deployed flows always have in the target org?
4. What does the email blackhole do, and what does it NOT suppress?

## Related Concepts
- [[data-kits-and-data-streams]]
- [[channels-overview]]

## Source References
- `sources/mktg_implementation_guide.pdf` — "Test Marketing Cloud Next in a Sandbox", "Deploy Changes"