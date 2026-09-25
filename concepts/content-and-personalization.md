# Content & Personalization in Marketing Cloud Next

## Core Idea
The Content tab (powered by Salesforce CMS) is where you create emails, landing pages, forms, SMS/MMS, RCS, WhatsApp, and push messages. Personalization lets you swap content per-recipient using merge fields and dynamic content powered by personalization points, decisions, and targeting rules.

## Prerequisites
- [[marketing-cloud-next-overview]]
- [[campaigns-and-flows]]

## Detailed Explanation

### Content Types (CMS Workspace)

| Type | Purpose |
|------|---------|
| **Brand** | Colors, fonts, button styles, brand identity + tone (used by Agentforce) |
| **Email** | Promotional/transactional |
| **Landing Page** | Promo pages, host forms |
| **Form** | Capture user info |
| **SMS / MMS** | Text (SMS) or media (MMS, US/Canada only) |
| **RCS Message** | Rich media + suggestions |
| **WhatsApp** | Template + session messages |
| **Push / In-App** | Mobile notifications |
| **Tracked Link** | Track external clicks |
| **Contact Card (VCF)** | Digital business card in MMS |
| **Reusable Content Block** | Banners/footers reused across emails |
| **Expression** | Saved merge field filter/sort criteria |

### Content Statuses
| Status | Meaning |
|--------|---------|
| **Draft** | Not published / unpublished; visible only to contributors |
| **Published** | Available in channels; editing creates "revised" |
| **Revised** | Published with unpublished edits |
| **Scheduled** | Publish/unpublish scheduled for future |
| **Processing** | Landing page/form/brand mid-publish |

> Publishing an email doesn't send it — customers see it only when the flow/campaign is activated.

### Data Sources for Personalization
Data sources determine which data is available for merge fields. **Deep dive → [[personalization-data-sources]]**:
- **Data Graph** (default profile graph on Unified Individual)
- **Unified Individual DMO** (fallback)
- **Event** (order confirmation, subscription signup; max 1 per item)
- **Offer** (max 5 per email)
- **Personalization Recommender** (Advanced + Personalization Decision credits)
- **Content Variable** (mapped to Flow data)
- **Salesforce Record** (Cases, Leads)
- **Lookup Data Graph** (product catalogs; max 5)
- **Apex Class** (pass data from flow; max 1 per message)
- **Activation** (Data Cloud segment data; max 1 per message)
- **Marketing Object / Prospect** (landing pages & forms only)

### Merge Fields vs. Expressions
- **Merge field**: insert customer data (e.g., name) into subject/preheader/text. **Deep dive → [[merge-fields-and-expressions]]**.
- **Expression**: saved filter+sort criteria for selecting a data-graph attribute; reusable across email/SMS/WhatsApp. Requires a data graph; publish to use in content.

### Dynamic Content (Personalization Point / Decision / Targeting Rule)
| Term | Definition |
|------|-----------|
| **Personalization point** | A content element eligible for personalization (e.g., subject line, image) |
| **Decision** | Who's eligible for a response based on targeting rules |
| **Targeting rule** | Conditions determining which variation shows |

**Deep dive → [[dynamic-content-variations]]**:
- Each email/landing page: up to **25 personalization points**.
- Each component: up to **15 variations**.
- **Linking** multiple components to one personalization point lets you control them together (and personalize >25 components).
- Default variation shows if no rule matches.
- Content with variations **can't be exported/imported**.

### Repeaters & Recommenders
- **Repeater**: show a series of items (products, events) connected to a data source. **Deep dive → [[repeaters-and-recommenders]]**.
- **Recommender** (Salesforce Personalization): picks best content per contact at send time; works only inside a repeater.

### Email Specifics
- Promotional vs. transactional message purpose.
- Plain text version for non-HTML clients.
- Code View (HTML/CSS + Handlebars).
- Required consent details: opt-out link + physical address (CAN-SPAM).
- **Dynamic From/Reply addresses** (personalize sender/reply from CRM or data graph).

### Messaging Specifics
- **SMS length**: GSM-7 = 160 chars; UCS-2 (Unicode/emoji) = 70 chars; segmented adds 6-byte header (153/67).
- **Opt-out keywords** (always reserved): STOP, QUIT, CANCEL, END, UNSUBSCRIBE.
- **UTM parameters**: utm_campaign, utm_medium, utm_source, utm_term, utm_content.

### Forms
- Each form needs ≥1 input + 1 button.
- Form handler captures data from external forms (client-side JS or server-side POST).
- reCAPTCHA v2 for spam protection; honeypot field as backup.
- Progressive profiling (show fields conditionally via data graph).
- Hidden fields + default values (incl. URL parameter capture).

## Common Pitfalls / Misconceptions
⚠️ **Publishing ≠ sending** — content must be in an activated flow to reach customers.
⚠️ Copying an email with personalization drops dynamic content variations and recommender.
⚠️ Email subject + preheader count as **one** component for variations.
⚠️ Only short/long codes support SMS opt-out keywords (alphanumeric IDs don't).
⚠️ Merge fields in landing page preview are unresolved.

## Active Recall Questions
1. What three Salesforce Personalization concepts power dynamic content?
2. How many personalization points per content item, and variations per component?
3. What's the difference between GSM-7 and UCS-2 SMS encoding limits?
4. Which five SMS opt-out keywords are always reserved?
5. What's the difference between a merge field and an expression?

## Related Concepts
- [[personalization-data-sources]]
- [[merge-fields-and-expressions]]
- [[dynamic-content-variations]]
- [[repeaters-and-recommenders]]
- [[campaigns-and-flows]]
- [[business-units]]
- [[consent-and-compliance]]
- [[engagement-signals]]
- [[data360-billing-usage]]

## Source References
- `sources/Marketing Cloud Next Salesforce Help Information.txt` — "Manage Content in Marketing Cloud Next", "Content Personalization in Marketing Cloud Next"
- `sources/Content_Personalization_Data_Sources_Deep_Dive.txt` — user-provided personalization articles (Data Sources, Merge Fields, Expressions, Variations, Linked Personalization Points, Repeaters, Recommenders, Set Up Personalization)
