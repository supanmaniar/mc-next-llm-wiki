# Flashcards — Business Units, Campaigns, Content & Beyond

## Card: Business Unit Isolation
**Q:** What enforces data isolation between business units?
**A:** A one-to-one mapping between a business unit and a data space (each business unit → exactly one data space, not shared).

## Card: Business Unit Roles
**Q:** What are the two business unit member roles and their key difference?
**A:** Marketer-Standard (can activate flows) vs. Marketer-ReadOnly (can't activate; can send messages + view dashboards).

## Card: Business Unit Limits
**Q:** How many business units can you create, and can you deactivate the last one?
**A:** Up to 150; you can't deactivate the last remaining business unit (and deactivation is permanent).

## Card: Business Unit Einstein
**Q:** Which Einstein feature is NOT supported with business units?
**A:** Einstein Metrics Guard.

## Card: Campaign vs Flow
**Q:** What's the cardinality between campaigns and flows?
**A:** One campaign can contain multiple flows; each flow relates to only one campaign.

## Card: Flow Types
**Q:** Name three marketing-oriented flow types and their triggers.
**A:** Audience Flow (schedule/segment), Automation Event-Triggered Flow (event), Activation-Triggered Flow (activation publish), Broadcast/On-Demand (API call).

## Card: Decision Element
**Q:** How does a Decision element evaluate outcomes?
**A:** Like IF/ELSE — outcomes evaluated in order, first match wins, unmatched records follow the default path.

## Card: Flow Pause
**Q:** What happens to a Wait element when you pause a flow?
**A:** Pause duration counts toward total wait time; past-due tasks complete immediately on resume.

## Card: Exit Rules
**Q:** How many exit rules can a flow have, and when are they evaluated?
**A:** Up to 10; evaluated each time a user starts or resumes a flow.

## Card: Personalization Concepts
**Q:** What three Salesforce Personalization concepts power dynamic content?
**A:** Personalization point, decision, and targeting rule.

## Card: Personalization Limits
**Q:** Max personalization points per content item and variations per component?
**A:** 25 personalization points per item; 15 variations per component.

## Card: SMS Encoding
**Q:** What are the GSM-7 vs UCS-2 SMS character limits?
**A:** GSM-7 = 160 chars; UCS-2 (Unicode/emoji) = 70 chars; segmented messages add a header (153/67).

## Card: SMS Opt-Out Keywords
**Q:** Which five SMS opt-out keywords are always reserved?
**A:** STOP, QUIT, CANCEL, END, UNSUBSCRIBE.

## Card: Content Status
**Q:** What does "published" mean for an email (vs. sent)?
**A:** Published = ready to send in a flow; customers see it only when the campaign/flow is activated.

## Card: Prospect vs Lead
**Q:** Key difference between a prospect and a lead?
**A:** Prospect is unqualified (marketing-owned, top of funnel); lead is qualified (sales-owned, middle of funnel).

## Card: Unified Individual
**Q:** Can you create a Unified Individual record manually?
**A:** No — created only by syncing + identity resolution harmonization.

## Card: Prospect Conversion
**Q:** What happens when converting a prospect to an existing lead with empty fields?
**A:** Only empty fields in the existing lead are overwritten by prospect values.

## Card: Marketing Triggers
**Q:** Name three product-related marketing triggers.
**A:** Product Back In Stock, Product Low Inventory, Product Price Drop (also Abandoned Cart/Page/Browse).

## Card: Inactivity vs Frequency
**Q:** Difference between Inactivity Period and Job Frequency in a trigger?
**A:** Inactivity = wait after last interaction; Job Frequency = how often the trigger job evaluates customers.

## Card: Trigger Permission
**Q:** What permission set configures marketing triggers?
**A:** Marketing Triggers Admin.

## Card: Opportunity Influence
**Q:** What engagement types does Opportunity Influence use for attribution?
**A:** Email and SMS click activities (not opens, not external sites).

## Card: Attribution Window
**Q:** What's the attribution window for Opportunity Influence?
**A:** 30 days before opportunity creation to the date it's Closed/Won.

## Card: Attribution Models
**Q:** Difference between first-touch and last-touch attribution?
**A:** First-touch credits the first campaign engaged; last-touch credits the last campaign before close.

## Card: B2B Dashboards
**Q:** Name the four B2B Analytics dashboards.
**A:** Account-Based Marketing, Pipeline, Marketing Manager, B2B Attribution.

## Card: Campaign ROI
**Q:** What's the Campaign ROI% formula?
**A:** (Revenue − Cost) / Cost.

## Card: Distributed Marketing Limits
**Q:** Max approved images/phrases, and which can be "required"?
**A:** 30 images + 30 phrases; only phrases can be required (locked), one default image.

## Card: Distributed Marketing Permissions
**Q:** What two permission sets does a non-marketing sender need?
**A:** Send Distributed Marketing Messages + Marketing Cloud Manager.

## Card: Email Metrics
**Q:** Difference between Click Rate and Click-Through Rate (CTR)?
**A:** Click Rate = clicks/sends; CTR = clicks/opens (different denominators).

## Card: Email Delivery Rate
**Q:** What's the email delivery rate formula?
**A:** (sends − bounces) / sends.

## Card: Push Open Rate
**Q:** What's the push open rate denominator?
**A:** Opened / Delivered (not sent).

## Card: Marketing Object Data Types
**Q:** What are the three marketing object data types and their limits?
**A:** Text (up to 255 chars), Number (integer up to 18 digits), Decimal (decimal up to 18 digits). Max length can't be changed after creation.

## Card: Marketing Object Allocations
**Q:** What are the Growth vs. Advanced allocations for marketing object storage and count?
**A:** Growth = 10 GB / 25 objects; Advanced = 40 GB / 100 objects; 100 columns per object (both).

## Card: Marketing Object Identifiers
**Q:** What identifier suffix marks a marketing object vs. a field vs. a data graph field?
**A:** Object = API name + `__mo`; field = API name + `__c`; data graph field = `$dataGraph.<Field>`.

## Card: AMPscript vs Handlebars
**Q:** What function/helper reads marketing object data in AMPscript vs. Handlebars?
**A:** AMPscript uses `Lookup()` (e.g., `%=v(@points)=%`); Handlebars uses `queryFirst type="MO"`.

## Card: Actionable List vs Segment
**Q:** How does an actionable list differ from a segment?
**A:** Actionable list = fixed/static collection (leads OR contacts, not both); segment = dynamic, rule-based.

## Card: Actionable List Removal
**Q:** Who can manually remove members from an actionable list record page?
**A:** Only the list's creator (flow automation can also remove members).

## Card: Marketing Object Creation
**Q:** How do you create a marketing object, and what happens to the data types?
**A:** Import a CSV file (Data Management → Marketing Objects → New → From File). The object contains only the CSV's columns; MC Next infers each column's data type from the file.

## Card: Marketing Object Primary Keys
**Q:** Can a marketing object have multiple primary key fields or composite keys?
**A:** You can select more than one primary key field, but marketing objects don't support composite keys.

## Card: Marketing Object Full Refresh
**Q:** What does a Full Refresh do to a marketing object, and what must the CSV match?
**A:** It deletes the object's data and replaces it with the CSV's data. The file must have the same columns as the marketing object. Needs Manage Marketing Objects + Modify All Marketing Object Records.

## Card: Marketing Object Field Immutability
**Q:** Which marketing object field properties can't be changed after creation?
**A:** Field API name, data type, and primary key designation. To change them, delete the field and recreate it — which permanently removes all data in that field.

## Card: Marketing Object Schema Change
**Q:** What happens while a marketing object schema change is processing?
**A:** It typically completes in a few seconds; you can't make additional schema changes during processing (fields show a "Read Only" indicator), but the object remains available for queries and record creation.

## Card: Marketing Object Delete
**Q:** When can't you delete a marketing object, and what happens when you do?
**A:** You can't delete it if any other object refers to its data (remove references from content, campaigns, briefs, flows first). Deleting removes all contained data permanently — it can't be restored.

## Card: Marketing Object Permissions
**Q:** What do ViewAllMarketingObjectRecords vs. ManageMarketingObjects grant?
**A:** ViewAllMarketingObjectRecords = view records from any marketing object. ManageMarketingObjects = view records + create and delete marketing objects.

## Card: Data Management Tab
**Q:** How do you make the Data Management tab appear for marketing users?
**A:** Setup → Profiles → Marketing User → Edit → Tab Settings → Data Management → Default On. Users can also add/rearrange it in the tab bar.

## Card: Marketing Object Record Insert
**Q:** When should you insert records manually vs. import a CSV?
**A:** Use Add Records (Data Explorer) for a small number of manual entries; use CSV import for larger data loads.

## Card: Workspace Sharing Cascade
**Q:** In a workspace share chain (A→B→C), why might an asset fail to publish to C?
**A:** Sharing is not transitive — publishing to C doesn't publish A's assets; you must share the original source A directly to each target.

## Card: Prospect vs Lead Engagement
**Q:** How does engagement differ between a prospect and a lead?
**A:** A prospect may have interacted only once; a lead is actively engaging with sales or marketing content.

## Card: Prospect Conversion Potential
**Q:** What's the conversion potential of a prospect vs. a lead?
**A:** Prospect = low to medium; lead = medium to high.

## Card: Account Requirement for Contact
**Q:** What's required to create a contact, and what happens when converting to an existing contact?
**A:** An account is required for creating a contact; when converting a prospect to an existing contact, creating a new account is disabled.

## Card: Prospect Unified Individual
**Q:** Can prospects be added to campaigns, and how?
**A:** Yes — prospects are treated as unified individuals, so you can create a unified individual segment, define rules for prospects, and add them to campaigns.

## Card: Prospect Import Consent
**Q:** What must the Consent Status column include when importing prospects via CSV?
**A:** Opt-in values, if you plan to send marketing emails.

## Card: Prospect Minimum Fields
**Q:** What's the minimum information needed to add a prospect manually?
**A:** At least last name, email, or phone number.

## Card: Prospect to Lead Flow
**Q:** Which flow type converts prospects to leads on engagement score, and how?
**A:** A Data 360-Triggered Flow — Start element = engagement score object, condition = engagement score greater than a value → convert to lead.

## Card: Prospect to Contact Flow
**Q:** Which flow type converts prospects to contacts, and what's the example condition?
**A:** A Record-Triggered Flow on Prospect (created or updated) with the Convert Prospect action; e.g., if ProspectStatus equals Qualified → convert to contact. Data 360-triggered and form-triggered flows can also convert.

## Card: Convert Prospect Action Inputs
**Q:** What inputs does the Convert Prospect flow action require?
**A:** Prospect ID; Converted Status (valid picklist option + Converted checkbox selected); Existing/New Contact; Existing/New Account; optional Existing/New Opportunity.

## Card: Prospect Multi-Currency Conversion
**Q:** How does Multi-Currency affect prospect → lead conversion?
**A:** If the lead's annual revenue is empty but the prospect's is populated, the prospect's Currency ISO code + annual revenue replace the lead's. Different currency codes → the prospect's currency code wins to avoid conversion problems.

## Card: Prospect Title Length
**Q:** What's the Title length gotcha when converting a prospect?
**A:** Prospect Title allows up to 128 characters, but conversion fails if the lead's Title field would contain more than 80 characters.

## Card: Prospect Field Mapping - Address
**Q:** How do prospect address fields map to Contact and Account?
**A:** City → Mailing City / Billing City; Country → Mailing Country / Mailing Country; State/Province → Mailing State/Province / Billing State/Province; Zip → Mailing Zip / Billing Zip.

## Card: Prospect Field Mapping - Company
**Q:** How does the prospect Company field map on conversion?
**A:** Lead: Company; Contact: Account Name; Account: Account Name.

## Card: Prospect Field Mapping - Currency
**Q:** How does Prospect Currency map on conversion?
**A:** Lead: Lead Currency; Contact: Contact Currency; Account: Account Currency.

## Card: Lead Assignment Rules
**Q:** What do Lead Assignment Rules determine, and what does each rule entry specify?
**A:** They determine the record owner after a prospect converts to a lead. Each rule entry specifies: processing order, the condition the lead must match, and the user assigned.

## Card: Prospect Restrictions
**Q:** Which restrictions apply to prospects?
**A:** Can't add a prospect as a campaign member; not supported in Data Import Wizard; can't clone or bulk delete prospects; converted prospects don't show in list view; status values = lead status values.

## Card: Distributed Marketing Template Defaults
**Q:** What's the difference between default and required content in a Distributed Marketing template?
**A:** A default appears automatically but the user can edit/remove it (only one default image); a required phrase is locked and can't be edited. If neither, the section shows as a blank placeholder.

## Card: Distributed Marketing Subject Lock
**Q:** How do you force non-marketers to choose only approved subject lines/preheaders?
**A:** Lock the subject line/preheader field — if unlocked, users can enter custom text even when approved options are available.

## Card: Distributed Marketing Flow
**Q:** What flow elements make an approved template available and prevent canceled sends?
**A:** An event-triggered flow with the Distributed Marketing and Alerts Message event; Wait Until Date (scheduled sends), Get Records (List Email), Decision (Status = Scheduled), and Send Email Message on the scheduled branch. Canceled emails go down the alternate path and aren't sent.

## Card: Distributed Marketing Unschedule
**Q:** What happens when you unschedule a Distributed Marketing email?
**A:** It cancels the email so it isn't sent — and if it was scheduled with other emails in a campaign, those are canceled too. To send on a new schedule, recreate it.

## Card: Distributed Sends Dashboard Views
**Q:** What are the three views of the Distributed Sends dashboard?
**A:** Individual Email (Total Recipients = 1–1), Bulk Email (Total Recipients > 1), and Bulk Email Recipient Activity (per-recipient engagement). You only see your own sends.

## Card: Conversational Email
**Q:** What is Conversational Email, and what does it integrate with?
**A:** Two-way email engagement directly from MC Next — messages support replies. It integrates with Agentforce, Digital Engagement, and Data 360: replies are analyzed for intent, can trigger flows, route to agents or human reps, and update data in real time.

## Card: Conversational Email Use Cases
**Q:** Name three Conversational Email use cases.
**A:** Drive event registrations, recover abandoned carts, personalize post-purchase journeys, enhance transactional emails, service scheduling, order management, loyalty engagement, product recommendations, account engagement (any three).
