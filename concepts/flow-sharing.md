# Flow Sharing & Campaign Management

## Core Idea
Marketing flows related to a campaign **inherit the campaign's sharing settings**; standalone flows are **private by default**. You can share flows dynamically (via categories + sharing rules) or manually (per user/group).

## Prerequisites
- [[campaigns-and-flows]]
- [[flow-builder-elements]]
- [[user-access-and-permission-sets]]

## Detailed Explanation

### Campaign ↔ Flow Sharing Relationship
- A flow related to a campaign **inherits the campaign's sharing settings**.
- When you **delete a campaign**, the sharing settings for each related flow revert to the flow record's defined sharing rules. If no sharing rules are defined, the flow becomes **private** — accessible only to the owner, Salesforce admins, and anyone with View All Non-Setup Flows or Manage Flow permissions.
- If you delete a campaign or flow, you remove the relationship but the **other record remains intact**.

### Changing a Flow's Campaign
- Changing the association for an **active** flow causes reporting and data stream issues.
- To change the campaign associated with a **draft** flow, update the **Associated Record** field on the flow record.

### Dynamically Share Flows (Categories + Sharing Rules)
1. Admin creates **criteria-based sharing rules** controlling access to campaign flows.
2. Users add **categories and subcategories** to flows to apply the rules.
3. What you enter for category/subcategory must **match exactly** what's defined in the sharing rule (especially with the Equals operator). With Contains, the flow category only has to include the rule's category.

**Example:** Admin categorizes flows by team (marketing, sales, operations) with subcategories (Email, SMS, Forms). Email marketers get Read/Write on Email flows; SMS marketers get Read/Write on SMS flows, etc.

### Manually Share Campaign Flows
1. Open the flow → click **Sharing**.
2. Search for the user, public group, role, or role + internal subordinates.
3. Save.

### Flow Versions & Campaign Record
- If multiple versions exist, only **one** can be active; a **paused flow is considered active**.
- The campaign record shows the **most recently activated version**. If an old version appears, activate the latest and check again.

## Common Pitfalls / Misconceptions
⚠️ Standalone flows are private by default — share them explicitly.
⚠️ Deleting a campaign reverts flow sharing to the flow's own rules (or private).
⚠️ Changing an active flow's campaign causes reporting/data issues.
⚠️ Category/subcategory values must match sharing rules exactly (for Equals).

## Active Recall Questions
1. What happens to flow sharing when a campaign is deleted?
2. What are the two ways to share standalone flows?
3. Why should you avoid changing an active flow's campaign?
4. What does the campaign record show when multiple flow versions exist?

## Related Concepts
- [[campaigns-and-flows]]
- [[user-access-and-permission-sets]]
- [[business-units]]

## Source References
- User-provided "Share Standalone Marketing Flows", "Work with Marketing Flows"