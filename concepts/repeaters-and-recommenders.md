# Repeaters & Personalization Recommenders

## Core Idea
A **repeater** shows a series of items (products, order updates, events) in an email, fed by a data source (event, data graph attribute, or a **Personalization recommender**). Recommenders pick the best item per contact at send time — no hand-written rules — and improve over time as they learn from engagement.

## Prerequisites
- [[personalization-data-sources]]
- [[merge-fields-and-expressions]]
- [[dynamic-content-variations]]
- [[content-and-personalization]]

## Detailed Explanation

### What a Repeater Is
A repeater component renders a **series of items** — new or best-selling products, recent order updates, upcoming events or promotions. You connect it to a data source, customize the layout, and add merge fields to the **nested components** to show data from the repeater source.

### Repeater Considerations
- If a repeater source has **no data** for a recipient, the repeater appears **empty** to them.
- **No limit** on the number of items, but too many items increase the **size of the entire email**.
- If you change a repeater source after its attributes are used in merge fields, **delete those merge fields** first, then add the new source and recreate them.

### Add a Repeater (Steps)
1. **Open content:** from a campaign (edit the email), from the Content tab (**Add** | **Content** | **Email**), or from a flow's **Send Email Message** element.
2. **Data Sources tab:** make sure the data you want is listed as a data source.
3. **Drag a Repeater** to the canvas.
4. **Settings tab → Data Layout:** select a **Repeater Layout**, then adjust the number of items and items per row.
   > ⚠️ Changing the repeater layout when it contains content or data **removes the content, data, and style settings** within the repeater.
5. **Select a Repeater Source** (e.g., Product Browse Engagement from the default data graph).
6. (Optional) **Edit Expression** to refine which items appear (filter + sort).
7. **Add merge fields to nested components** — e.g., for an image:
   - Select the image component in the repeater → image source = **Merge Field** → **Add Merge Field**.
   - Expand the item with the **same name as your repeater source** (it's the first item in the menu and holds the source attributes).
   - Select the attribute (e.g., image URL), configure details, **Done**.
8. Customize each component's settings/style and save.

### Example: Product Browse Engagement
A marketer promotes products to returning customers who recently engaged with the site. They add a repeater configured for **4 cards in 2 rows**, select **Product Browse Engagement** as the source, and use **Edit Expression** to sort by **descending Engagement Date Time**. Merge fields on nested components show each product's image, name, and link — each customer sees the four most recent products they were interested in.

### Personalization Recommenders
A **recommender** is a Salesforce Personalization element that shows recommendations based on customer interests. In emails, recommender data works **only in a repeater component** (and merge fields within it).

**Key rules:**
- Only **trained recommenders based on the same data graph** as the email are shown/selectable.
- New recommenders need a **training period with at least one successful refresh**.
- You can **replace but not remove** recommender data sources.
- In MC Next emails, dynamic content and recommenders **aren't available until a data graph is added** as a data source.

**Steps to show recommendations:**
1. **Data Sources tab** → add the Personalization recommender.
2. Drag a **Repeater** to the canvas.
3. Configure the **Data Layout** (layout, items, items per row).
4. **Repeater Source** = the recommender.
5. Add a **recommendation merge field** to a nested component — e.g., select a heading → **{ }** → expand **Recommendations** → select **Product Name** → configure → **Done**.
6. Customize and save.

### Objective-Based Recommenders (Image Selection)
Instead of writing rules to decide which image each contact sees, let a recommender choose the best image **at send time**. It's powered by Salesforce Personalization and learns from engagement over time.

**Prerequisites:** objective-based recommender connected; data graph configured (it determines which recommender attributes are available as merge fields).

**Apply to an image block:**
1. Add the objective-based recommender as a **data source**.
2. Select the image block → image source = **Merge Field**.
3. Under Source, select **Personalization Recommendation Data Provider**.
4. Select **Recommended Items**, choose the fields/attributes to display, configure details (optionally caption or URL).
5. Save — attributes are visible when you preview the email.

**Previewing recommender content:** the design canvas shows a **placeholder** (the recommender chooses per contact, so there's no single fixed result). In **Preview**, enter parameters such as a **segment** to simulate a contact context and review what the recommender returns for that context.

## Common Pitfalls / Misconceptions
⚠️ **Changing the repeater layout wipes its content, data, and style.**
⚠️ **Repeaters don't support custom event data** in emails.
⚠️ **Recommender data only works inside a repeater** (and its merge fields).
⚠️ **Recommenders can be replaced but never removed.**
⚠️ **A recommender needs at least one successful refresh** after training before it's usable.
⚠️ **The canvas shows a placeholder for recommender content** — use Preview with a segment to see real output.

## Active Recall Questions
1. What does a repeater do, and what happens if a recipient has no data for its source?
2. What's the danger of changing a repeater layout after adding content?
3. How do you connect a repeater to a recommender, and what's the restriction on recommender data?
4. What's the difference between a rule-based image variation and an objective-based recommender?
5. How do you preview what a recommender will show for a specific contact?

## Related Concepts
- [[personalization-data-sources]]
- [[merge-fields-and-expressions]]
- [[dynamic-content-variations]]
- [[content-and-personalization]]
- [[email-building-personalization]]
- [[ai-features]]

## Source References
- `sources/Content_Personalization_Data_Sources_Deep_Dive.txt` — "Add a Repeater to a Marketing Email", "Show Personalization Recommendations by Using Repeaters", "Add an Objective-Based Recommender to a Marketing Email"