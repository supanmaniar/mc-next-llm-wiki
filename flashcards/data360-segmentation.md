# Flashcards — Data 360 Segmentation

## Card: Five Segment Types
**Q:** Name the five Data 360 segment types and their primary job.
**A:** Standard (scheduled audience on a DMO), Real-Time (millisecond on-demand), Waterfall (priority-ranked mutually-exclusive offers), Dynamic (parameterized query, no persistence), Data Kit (predefined segment).

## Card: Lookback Window
**Q:** What's the default lookback window, and its maximum?
**A:** Default 90 days; up to 2 years (or 360 days via the "Days" dropdown). Container criteria can override the segment-level window.

## Card: Max Segments
**Q:** What's the maximum number of segments per org?
**A:** 9,950.

## Card: Real-Time Segment Limits
**Q:** What can't a real-time segment do?
**A:** Use exclusion criteria, nested batch segments, segment counts, or manual publish. (Requires Segment ID + Timestamp fields in the real-time data graph.)

## Card: Waterfall Purpose
**Q:** What problem does a waterfall segment solve?
**A:** It processes segments in priority order so a customer matching multiple segments is placed only in the highest-priority one — creating mutually exclusive audiences (one offer per person).

## Card: Waterfall Rules
**Q:** What are three key waterfall segment constraints?
**A:** Max 20 segments; a segment can exist in only one waterfall (no nested segments); rapid publish not available.

## Card: Dynamic Segment Execution
**Q:** How is a dynamic segment run, and why?
**A:** Via API call through a broadcast flow supplying runtime values — because it uses placeholders and doesn't persist data in Segment Membership DMOs (can't be scheduled/published via UI).

## Card: Standard vs Rapid Publish
**Q:** What are the standard and rapid publish intervals?
**A:** Standard = 12 or 24 hours; Rapid = 1 or 4 hours (Marketing Cloud Engagement / file storage targets only).

## Card: Rapid Publish Limits
**Q:** How many rapid-publish segments can you create, and can you convert standard → rapid?
**A:** Up to 20 rapid-publish segments; you cannot change a standard publish to rapid publish after creation.

## Card: Segment Membership DMO (Latest vs History)
**Q:** What do the "Latest" and "History" segment membership DMOs store?
**A:** Latest = profiles in the most recent publish; History = prior publish (last 30 days), with Delta Type marking New/Existing/Removed.

## Card: Deactivate vs Stop Schedule
**Q:** Why should you "stop the publish schedule" instead of deactivating a segment you might reuse?
**A:** Deactivation is permanent (can't be re-enabled); stopping the schedule preserves the segment for future use.

## Card: Composite Key Limitation
**Q:** Why do composite keys cause problems in the Segment Canvas?
**A:** The canvas joins on single-field relationships; composite keys only work in manual queries where every field is explicitly defined. Use DMOs with a single unique primary key.

## Card: Direct vs Related Attribute
**Q:** What's the difference between a direct and a related attribute?
**A:** Direct = single data point (postal code, name; 1:1 or N:1); related = collection of data points (purchase history; 1:N, often behavioral).

## Card: Container Logic
**Q:** How do same-container vs. separate-container attributes behave?
**A:** Same container = AND on the same row (single record); separate containers = independent filters (bought any X AND any Y).

## Card: Aggregation Types
**Q:** What are the five aggregation types?
**A:** Count, Sum, Average, Max, Min.

## Card: Filter Limits
**Q:** What are the filter/attribute/container limits in the segment canvas?
**A:** 50 filters per tab (Include/Exclude), 100 attributes per segment, 20 filters per container.

## Card: Nesting Limits
**Q:** What are the nesting limits?
**A:** Up to 3 levels within a container; up to 10 levels across containers.

## Card: Group Rank Limit
**Q:** What three steps make up Group/Rank/Limit?
**A:** (1) Group By a shared attribute, (2) Sort By an attribute with order, (3) Limit the maximum records per group.

## Card: Group Rank Limit Constraints
**Q:** What are two constraints on grouping/ranking/limiting rules?
**A:** Max 3 group + 3 sort rules per ruleset; applies only within qualified profiles (not global), and only to direct attributes.

## Card: Case Sensitivity
**Q:** How are object joins and value matching case-sensitive?
**A:** Object joins are case-sensitive (c12d3 ≠ C12D3); queries honor exact matching (accents, leading zeros) but text operators are case-insensitive.

## Card: Approximate Population
**Q:** What is the Approximate Segment Population field?
**A:** A 95%-confidence range estimate of the population (enable in Feature Manager); less accurate for small populations or low Segment On counts.

## Card: Attribute Shortcuts
**Q:** What does an attribute shortcut store, and what's its limit?
**A:** Segment-on object + object path + target attribute (reusable filter); limit 500 per tenant, scoped to data space.

## Card: Hierarchical Aggregation
**Q:** What does hierarchical aggregation do, and on which entities?
**A:** Rolls up revenues across account hierarchies (parent/subsidiary); supported on Account/Unified Account, up to 5 containers and 3 levels per DMO.

## Card: Event Time Window
**Q:** How far back can an Engagement DMO's event date field go in a segment?
**A:** Up to 24 months; a segment fails if the date range exceeds this.

## Card: Is In Operator
**Q:** What are the value limits of the Is In operator?
**A:** Up to 100 comma-separated values (bulk paste up to 10,000 via import).

## Card: Einstein Segment Setup
**Q:** What two prerequisites must be met before creating an Einstein segment?
**A:** A completed identity resolution ruleset creating a Unified Individual DMO with ≥10 records, and enabling generative AI + Einstein Segment Creation in Feature Manager.

## Card: Einstein Bias Handling
**Q:** How does Einstein Segment Creation reduce bias and improve accuracy?
**A:** Demographic attributes are removed by default, and attributes producing fewer than 10 results are stripped.

## Card: Einstein Data Prism
**Q:** What does Einstein Data Prism do?
**A:** Grounds generative AI by scanning metadata (schema, relationships, sample values, descriptions), auto-generating descriptions, and returning focused grounding data for natural-language queries.

## Card: Metadata Studio
**Q:** What does Metadata Studio let you do?
**A:** Validate/edit object+field descriptions and exclude irrelevant entities so they aren't sent to the LLM or used for grounding.

## Card: Data Prism Government Cloud
**Q:** Where are Einstein Data Prism and Metadata Studio unsupported?
**A:** Government Cloud Plus — don't enable the feature there.

## Card: Segmentation Billing
**Q:** When are segmentation credits consumed?
**A:** On segment publish (Data Services "Segmentation" / Flex Credits "Data 360 Segmentation"), plus Data Queries for counting/building/previewing.