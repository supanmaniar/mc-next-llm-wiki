# Einstein Segments (Generative AI) & Data Prism

## Core Idea
Einstein Segment Creation uses generative AI to turn a natural-language description into a suggested segment (attributes and values), grounded by **Einstein Data Prism** which maps your metadata to the semantic meaning of objects and fields so the AI understands your actual data.

## Prerequisites
- [[data360-segment-types]]
- [[ai-features]]
- [[segment-canvas-and-filters]]

## Detailed Explanation

### Einstein Segment Creation
Describe your audience in plain language (at least two words), and Einstein translates the words into attributes and values based on the data in your org.

- Results are split into **suggested attributes** (most relevant, selected by default) and **additional attributes** (selectable).
- **Demographic attributes are removed** by default to avoid bias/inaccuracies.
- Attributes producing **fewer than 10 results** are also removed for accuracy.
- You can **deselect/select** attributes, **Refine Segment** (edit description), **Count Population**, or **Edit Segment Rules** (exit to the manual editor — a one-way transition).

### Prerequisites & Setup
1. **Run an identity resolution ruleset** to create a Unified Individual DMO.
2. Unified Individual DMO must have **≥10 unified individual records**.
3. Related DMOs must be related to Unified Individual.
4. Use **descriptive** field/DMO names.
5. Enable **generative AI**, then **Einstein Segment Creation** in the Feature Manager (Data Cloud Setup → Feature Manager).

### Data Privacy & Trust
- No PII (including Unified Individual data) is sent to third parties; customer data isn't shared or used to enrich other customers.
- **Sample data** per field is sent so the model understands context (grounded model).
- **Unethical/biased language is rejected** with an error prompting a rewrite.
- Demographic attributes are deselected by default to reduce bias.

### Einstein Data Prism (Grounding)
Data Prism is a **grounding solution** that improves generative AI accuracy by pinpointing the exact data entities relevant to a natural-language query.

**How it works:**
1. After provisioning (up to **24 hours**), all metadata is scanned — schema, relationships, sample values, descriptions.
2. Missing descriptions are auto-generated and stored in a **vector database**.
3. At runtime, an app sends the natural-language utterance to the Data Prism API; Data Prism returns the matching tables/fields as **focused grounding data**.

**Smart Grounding** — provides the LLM with accurate, up-to-date metadata so outputs fit user intent, improving accuracy and coverage for large orgs.

### Metadata Studio
A human-in-the-loop app to improve grounding by validating/enriching metadata:
- Review all objects and fields; add/edit descriptions (generated descriptions appear in light blue).
- **Validate** entities (standard objects/fields with descriptions auto-imported from Salesforce docs and marked validated).
- **Exclude** irrelevant objects/fields so they aren't sent to the LLM or used for grounding.
- Changes take up to **15 minutes** to take effect.

> ⚠️ Data Prism and Metadata Studio are **not supported in Government Cloud Plus** — don't enable the feature there.

**Use case example:** A custom object named `SP_info_att` (intended for "Solar Panels") is auto-described by the LLM as "stored procedures" (SP). Metadata Studio lets you correct the description so Data Prism returns it for solar-panel queries.

### Billing
- **Data Prism:** consumes **Data Queries** (sample data, once/year) and **Einstein Requests** (LLM gateway calls) — but Einstein Requests are **not billed** for Einstein Segment creation.
- **Segmentation:** credits consumed on **publish** (Data Services "Segmentation" / Flex Credits "Data 360 Segmentation"), plus Data Queries for counting/building/previewing.
- **Real-time segmentation** also consumes sub-second real-time event usage.
- Reduce costs: avoid unnecessary schedules, lower frequency, set end dates, tighten lookback windows, preview before publishing, and nest common filters.

### Writing Good Prompts
- Use **custom field names** in the prompt ("Brand = 'Northern Trail' customers" vs. "Northern Trail customers").
- Be **specific**, not general.
- Specify brand data / website when mentioning it.
- Use **"and"** instead of commas.
- Avoid one-word prompts and complex nested date filters.
- Be **explicit**, not implicit ("10% highest paying customers" vs. "top customers").
- Can't use **OR** or **Exclude** operators.

## Common Pitfalls / Misconceptions
⚠️ Einstein Segments require a **Unified Individual DMO with ≥10 records** and a completed identity resolution ruleset.
⚠️ **Edit Segment Rules is one-way** — you can't return to the AI editor after switching.
⚠️ Data Prism provisioning can take **24 hours**; metadata edits take up to 15 minutes.
⚠️ Data Prism / Metadata Studio unsupported in **Government Cloud Plus**.
⚠️ Demographic attributes are stripped by default — intentional anti-bias behavior, not a config error.

## Active Recall Questions
1. What two things does Einstein strip or remove from a generated segment by default, and why?
2. What are the prerequisites before creating an Einstein segment?
3. How does Einstein Data Prism improve generative AI accuracy?
4. What does Metadata Studio let you do to improve grounding?
5. Why is "Edit Segment Rules" a one-way action?

## Related Concepts
- [[data360-segment-types]]
- [[segment-canvas-and-filters]]
- [[ai-features]]

## Source References
- `sources/Salesforce_D360_Segments.txt` — "Einstein Segments in Data 360", "Einstein Data Prism", "Metadata Studio", "Enable/Create an Einstein Segment", "How to Write a Good Prompt", "Billing Considerations for Segmentation"