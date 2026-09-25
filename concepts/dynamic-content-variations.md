# Dynamic Content, Variations & Personalization Points

## Core Idea
Dynamic content swaps whole components (subject line, image, CTA) per audience using **variations** governed by **targeting rules**. Each component with variations is tied to a **personalization point**; each variation maps to a **decision** (same name). Link multiple components to one personalization point to control them together — and personalize more than 25 components per item.

## Prerequisites
- [[personalization-data-sources]]
- [[merge-fields-and-expressions]]
- [[content-and-personalization]]
- [[email-building-personalization]]

## Detailed Explanation

### The Three Salesforce Personalization Concepts
| Term | Definition |
|------|-----------|
| **Personalization point** | A content element eligible for a personalization decision (subject line, preheader, image component). Configuring the first variation **auto-creates** a personalization point for that component/field. |
| **Personalization decision** | Determines who's eligible to receive a response based on the targeting rules. Each variation is related to a decision, and they share the **same name**. |
| **Targeting rule** | The conditions that decide which variation shows — based on attributes, related attributes, calculated insights, or segment memberships. |

If a recipient doesn't match any targeting rule, they get the **default variation**.

### Limits
- **25 personalization points** per email or landing page.
- **15 variations** per component.
- Email **subject line + preheader = ONE component** (personalized together).
- Content with variations **can't be exported or imported**.
- Personalization points/decisions/rules appear in Salesforce Personalization (viewable there), but **edits happen in the marketing workspace** where the content was created.

### Create a Variation
1. Open the email/landing page for editing.
2. Select the component (or the edit pencil next to the subject line/preheader).
3. **First variation:** click **New Variation** in the component property panel, then **New Variation** again. **Existing variations:** Variation dropdown → **New Variation**.
4. Name the variation and the decision.
5. Set when the variation appears:
   - **All Conditions Are Met** — recipient must meet every condition.
   - **Any Conditions Are Met** — recipient meets at least one.
6. **Add Condition** → select the **resource** (based on the data graph) → configure operator, values, or dates.
7. (Optional) Add a **group of conditions** for a more flexible/restrictive rule.
8. Save, then customize the variation's content and style per audience (Copilot can generate content).

### Clone a Personalization Point
Reuse an existing personalization point (from the same campaign, or created in Salesforce Personalization) to create variations quickly.
- You can clone **only when the component has no variations**.
- **New Variation** → pick a recently used point or **View All** — only points based on the **same data graph** as the email are shown.
- Selecting a point with **multiple variations** creates multiple variations at once.
- If the point is already used in this email, choose **Clone the personalization point**.
- Edit names, save, then customize each variation.

### Prioritize Variations
If a recipient qualifies for more than one variation, priority decides which shows.
1. Variations dropdown → **Edit Priorities**.
2. Reorder with the arrow buttons.
3. ⚠️ You **can't change the priority of the default variation** — it shows when no rule matches.
4. Save.

### Edit / Delete a Variation
- **Targeting rule:** select the variation → Rules panel → **Edit** → edit/add/delete conditions or groups → save.
- **Rename/delete:** Variation Settings button → **Rename** or **Delete**.

### Linking Components to a Personalization Point
Link multiple components or fields to **one** personalization point so they share settings and rules. Any change — adding/deleting variations, editing targeting rules, reordering priorities — applies to **all linked components**. Per-variation **content and style stay independent**.

**To link:** the point must be in the content item you're editing, and the component must have **no variations**.
1. Select the component → **New Variation**.
2. Select an existing personalization point (recent list, or **View All**; points already used show a **Current** badge).
3. Choose **Link the personalization point to this component or field**.
4. Review decisions/rules → save. The component inherits the settings; new variations get default content/style.

**How linking behaves:**
- Edit the targeting rule for variation X on the image → applies to variation X on the button and subject line/preheader.
- Delete variation X on the image → deleted from all linked components.
- Add variation Z on the image → added to all linked components.
- Content/style edits are isolated per component.

**Check the link:** hover over the **Linked badge** in the component property panel.

### Unlink a Component
To edit personalization settings for only one component, **unlink** it.
1. Select the component → Variation dropdown → **Unlink**.
2. Review → **Next** → edit names → save.
3. The component is now associated with a **copy** of the personalization point ("Copy of Personalization Point A") — it keeps all prior targeting rules, priorities, variations, content, and style, but is independent.
4. The other components remain linked to the original. If only one component remains in the original, the **Linked badge disappears**.

### Example: Outdoor Clothing Campaign
A marketer creates a summer email for hiking and trail-running audiences:
- Subject line/preheader: variations "Hiking" and "Running" with targeting rules per interest → first variation auto-creates a personalization point.
- Hero image: same two variations → a **new** personalization point.
- Button: instead of new rules, **link** the image's personalization point → button inherits Hiking/Running variations and rules; only the link URLs differ per variation.
- At send time, hikers see "Versatile Summer Hiking Pants" + pants image + pants CTA; runners see the shorts equivalents.

## Common Pitfalls / Misconceptions
⚠️ **Subject line + preheader = one component** — you can't personalize them separately.
⚠️ **The default variation's priority can't change** — it's the catch-all.
⚠️ **Linking requires the point to already exist in the content item** and the component to have no variations.
⚠️ **Unlinking clones the point** — it doesn't break the other components' relationship.
⚠️ **Variations can't be exported/imported** — copying content drops them.
⚠️ **Dynamic content isn't available until a data graph is added** as a data source (MC Next emails).

## Active Recall Questions
1. What are the three Salesforce Personalization concepts, and how do they relate?
2. What are the limits for personalization points and variations?
3. How do "All Conditions Are Met" and "Any Conditions Are Met" differ?
4. What happens when you link vs. clone a personalization point?
5. What does unlinking do to the personalization point and the other components?
6. Why can't you change the default variation's priority?

## Related Concepts
- [[personalization-data-sources]]
- [[merge-fields-and-expressions]]
- [[repeaters-and-recommenders]]
- [[content-and-personalization]]
- [[email-building-personalization]]
- [[campaigns-and-flows]]

## Source References
- `sources/Content_Personalization_Data_Sources_Deep_Dive.txt` — "Create and Manage Variations", "Link Components to an Existing Personalization Point", "How Dynamic Content and Salesforce Personalization Work Together", "Linked Personalization Points in Dynamic Content"