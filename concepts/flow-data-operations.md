# Flow Data Operations (Records, Collections & Transform)

## Core Idea
Flows aren't connected to your data by default — **Get Records** pulls data *into* the flow, and **Create/Update/Delete Records** push it *back* to Salesforce. **Assignment, Loop, Collection Filter/Sort, and Transform** manipulate variables and collections, and **flow operators** define how filter conditions compare values.

## Prerequisites
- [[flow-builder-elements]]
- [[flow-elements-deep-dive]]
- [[marketing-objects-ampscript-handlebars]]

## Detailed Explanation

### The Data Flow Model
> **Get Records** pulls info into your Flow; **Create/Delete/Update Records** push that info back into your Salesforce Org. Decisions/updates inside the flow are **temporary** until pushed back.

### Get Records Element
Retrieves Salesforce standard/custom object records or **Marketing Object** records (needs Read/Create/Edit/Delete permissions on Marketing Objects).

**How many records to store:**
- **Only the first record** — e.g., caller details by phone number.
- **All records** — e.g., all contacts for an account.
- **All records, up to a specified limit** — between **2 and 20,000** records.

**How to store record data:**
- **Automatically store all fields** — every field in a flow variable.
- **Choose fields and let Salesforce do the rest** — selective, more efficient.
- **Choose fields and assign variables (advanced)** — manual assignment; for the first record, filter by a **unique field (ID)** to guarantee which record's values are stored.

**Sorting:** ascending → null values first (smallest); descending → null values last.

**Counting results:** assign the record collection variable with the **Equals Count** operator in an Assignment element.

**No records returned:** variables are empty/null — use Decision elements to check before proceeding.

**Filter criteria:** multiple filters default to **AND**; same-field Equals filters combine with **OR** (e.g., `Type = (Problem OR Feature Request) AND Escalated = true`).

**Data Cloud objects:** require a **data mapping** (DLO → DMO) in the org to be selectable.

### Create Records Element
Creates/updates Salesforce or Marketing Object records.
- **Collection of records:** use a record collection variable (ID fields blank); enable **Update Existing Records** with a unique identifying field.
- **Single record:** record variable (ID blank), or manually map values; optionally store the created record's ID in a Text variable.
- **Check for Matching Records** — dynamically check for duplicates.
- ⚠️ **The record isn't created until the interview's transaction completes** (finishes, or runs a Screen/Local Action/Wait element).
- ⚠️ With a record collection + no fault path, a failure creates **no records** and stops the flow; with a fault path, only successful records are created.
- ⚠️ Can't update locked records, read-only fields, or objects that don't support update.
- **Set Audit Fields upon Record Creation** permission → cloned records can copy `CreatedDate`, `CreatedById`, `LastModifiedDate`, `LastModifiedById`.

### Update Records Element
- **Via record variable/collection:** IDs must be set (configure with an Assignment element earlier).
- **Via conditions:** choose the object, add conditions, set field values. ⚠️ **Configure at least one filter condition, or the flow updates ALL records for the object.**
- ⚠️ The element doesn't know which fields are required for the object.

### Delete Records Element
- Identify records via record variable/collection (IDs must be set) or **conditions** (at least one).
- ⚠️ **Even an inactive flow triggers the delete operation when tested.**
- ⚠️ Records are deleted the moment the element runs; sent to the **Recycle Bin for 15 days** before permanent deletion.
- ⚠️ Flows can delete records **pending approval**.
- The record isn't deleted until the interview's transaction completes.

### Assignment Element
Sets values in variables (collection, record, record collection, global). Multiple assignments run **consecutively in order**.
- **Variable** (API name) + **Operator** (depends on data type) + **Value** (must be compatible data type).
- Common pattern: on a Loop's For Each path, set record variable fields, then **Add** the record variable to a record collection (Operator = Add) → Create Records outside the loop.
- Common pattern: set an error message variable on a Fault path.

### Loop Element
Iterates over a collection variable; the **loop variable** holds the current item (`Current Item from Loop`).
- **Direction:** first item or last item.
- Non-record collection → loop variable is the same data type (e.g., text); record collection → record variable of the same object type.
- ⚠️ **Save changes before the next iteration overwrites them** — add the updated record to a record collection, then Update Records after the loop.

### Collection Filter Element
Outputs a new collection with only matching items (source collection unchanged; output is null until the filter runs).
- **Condition Requirements:** All Conditions Are Met / Any Condition Is Met / **Custom Condition Logic Is Met** (e.g., `1 AND (2 OR 3)`) / **Formula Evaluates to True**.
- Output collection is named after the element's API name (e.g., `Leads from FilterLeads`); also creates a `CurrentItem_FilterLeads` loop variable.
- ⚠️ Deleting the element leaves the `CurrentItem_...` variable — delete it manually.

### Collection Sort Element
Reorders a collection (changes made **directly** in the selected variable) and optionally limits items.
- Sort by up to **3 fields** (greater to lesser priority).
- **Put empty string and null values first** option.

### Transform Element
Maps and transforms source data to target data (screen flows, autolaunched flows with no triggers, record-triggered flows).
- **Formula** uses `[$EachItem]` merge field syntax for collections.
- ⚠️ Transform can't sort/filter collections (use Collection Filter/Sort).
- ⚠️ **Data graphs aren't supported** for join transformations; collections on data graphs aren't supported.
- **Limits:** up to **1 nested collection**; formula ≤ **255 characters** (use a formula resource for longer); debug shows up to 20 records; Apex CPU limits: <700 records (immediate paths), <1,500 (scheduled/async), ≤200 source fields when <600 records.

### Flow Operators (Data Elements & Record Choice Sets)
- **In / Not In** operators are available only in **Create Records, Get Records, and Update Records** elements.
- ⚠️ **Contains and Is Changed aren't available as filter conditions** (Is Changed is available in Decision elements on `$Record` fields in record-triggered flows).
- **Checkbox:** Does Not Equal, Equals, Is Null, In, Not In. ⚠️ `null` ≠ `false` — filtering for empty checkbox returns no records.
- **Currency/Number/Percent:** Does Not Equal, Equals, Greater Than, Greater Than or Equal, Is Null, Less Than, Less Than or Equal, In, Not In.
- **Date/Date-Time:** same comparison set.
- **Picklist/Text:** Contains, Does Not Equal, Equals, Ends With, Is Null, Starts With, In, Not In (⚠️ In/Not In don't support picklist fields).
- **Multi-Select Picklist:** Contains, Does Not Equal, Equals, Ends With, Is Null, Starts With. ⚠️ Semicolon spacing and item order cause mismatches — use the **INCLUDES** function in a formula.
- **Time:** comparison set + In/Not In.

## Common Pitfalls / Misconceptions
⚠️ **Get Records pulls in; Create/Update/Delete push back** — changes are temporary until pushed.
⚠️ **Update Records with no filter conditions updates ALL records.**
⚠️ **Delete Records runs even in inactive flows** (when tested); Recycle Bin = 15 days.
⚠️ **Records aren't created/deleted until the transaction completes.**
⚠️ **Collection Filter output is null until it runs; source collection unchanged.**
⚠️ **Collection Sort modifies the collection directly.**
⚠️ **In/Not In only in Create/Get/Update Records; Contains/Is Changed not filter conditions.**
⚠️ **Multi-select picklist matching is fragile** — use INCLUDES.

## Active Recall Questions
1. What's the data flow model for Get vs. Create/Update/Delete Records?
2. What's the record limit range for Get Records?
3. What happens if Update Records has no filter conditions?
4. How long do deleted records stay in the Recycle Bin?
5. Which operators are available only in Create/Get/Update Records?
6. What are the Transform element's collection and formula limits?

## Related Concepts
- [[flow-builder-elements]]
- [[flow-elements-deep-dive]]
- [[campaign-record-workflow]]
- [[marketing-objects-ampscript-handlebars]]

## Source References
- `sources/Campaigns_Flows_Deep_Dive.txt` — "Create Records Element", "Get Records Element", "Update Records Element", "Delete Records Element", "Assignment Element", "Loop Element", "Collection Filter Element", "Collection Sort Element", "Transform Element", "Flow Operators in Data Elements and Record Choice Sets"