# Reporting & Analytics Setup

## Core Idea
Marketing Cloud Next uses **Marketing Performance** (Data Cloud + Tableau Next) and preconfigured analytics packages to give you embedded dashboards and reporting — but you must install the right packages, connect analytics objects, and share folders first.

## Prerequisites
- [[data-kits-and-data-streams]]
- [[marketing-cloud-next-overview]]

## Detailed Explanation

### Analytics Packages

| Setup Label | Package Name | Contents |
|-------------|-------------|----------|
| **Marketing Engagement Analytics** | `Marketing Analytics` | Email Engagement Dashboard (+V2), Email Engagement Reports (+V2) |
| **Flow Reports Analytics** | `Salesforce Data Cloud - Flow Reports` | Flow Reports folder |
| **SMS Analytics** | `Marketing Analytics - SMS` | SMS UMA Dashboards/Reports (SMS add-on only) |
| **Landing Pages and Forms Analytics** | `Marketing Analytics - Landing Pages and Forms` | Forms & Landing Page Engagement dashboards/reports |

> Requires ≥2 available **dynamic dashboard licenses** for Marketing Analytics package.

### Install & Connect Analytics Objects
1. Setup → "Marketing Cloud" → Reporting and Optimization → **Analytics**
2. Install **Marketing Engagement Analytics** package (all users)
3. (SMS add-on) Install SMS Analytics
4. Configure Marketing Landing Pages site analytics (add Data Cloud integration + optional consent banner integration + Landing Pages & Forms Analytics package)
5. **Share folders** to users (Analytics tab → Browse → Folders → Share → set Viewer/Editor/Manager)

> Preserve field visibility for the **Data Cloud Salesforce Connector permission set** to avoid data processing issues.

### Marketing Performance
Uses Data Cloud + Tableau Next. Requires **Data Cloud admin + Marketing Cloud Admin** permission sets to install; **Tableau Next Included App Business User** to view dashboards.

**Install steps:**
1. Setup → "Marketing Performance"
2. Confirm prerequisites (data kits, Personalization, web tracking, Flow Performance)
3. Click Install → monitor on Marketing Performance tab
4. Assign Tableau permission set
5. Verify dashboard in Marketing app

**Update (get latest dashboards):** delete existing app → update data kits (to "Deployed") → reinstall → view updated dashboard.

> Marketing Performance consumes **Data Cloud credits** (billing impact).

### Customize Analytics Page
- **Collections:** group reports/dashboards for easy finding
- **Filters:** add fields + values to dashboards, then save

## Common Pitfalls / Misconceptions
⚠️ Marketing Performance needs **both** Data Cloud admin AND Marketing Cloud Admin permission sets to install.
⚠️ Dynamic dashboard license limit can block the Marketing Analytics package install.
⚠️ Not sharing folders = users can't see dashboards even after install.

## Active Recall Questions
1. What two permission sets are needed to install Marketing Performance?
2. Which permission set lets users VIEW Marketing Performance dashboards?
3. What are the four main analytics packages?
4. How do you update Marketing Performance to get the latest dashboards?

## Related Concepts
- [[data-kits-and-data-streams]]
- [[web-tracking]]
- [[scoring-models]]

## Source References
- `sources/mktg_implementation_guide.pdf` — "Set Up Reporting in Marketing Cloud Next", "Set Up Marketing Performance"