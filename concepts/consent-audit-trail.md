# Consent Audit Trail

## Core Idea
The Consent Audit Trail is an **append-only** Data Cloud object that records a row for every consent change — the historical record of all opt-in/opt-out events — unlike the CSC DMO, which stores only current status and is updated in place.

## Prerequisites
- [[consent-data-model]]
- [[consent-and-compliance]]

## Detailed Explanation

### What It Is
The Consent Audit Trail is an object in Data Cloud that records a row for every consent change. It is **append-only**: rows are inserted, never updated. This makes it the historical record of all opt-in/opt-out events for a given Contact Point value and Communication Subscription Channel Type.

### Key Fields

| Field | Description |
|-------|-------------|
| **Id** | Unique system identifier |
| **TimeStamp** | Date/time the audit row was written (when the change was recorded) |
| **ConsentCaptureSourceDateTime** | Date/time the consent decision was actually captured (caller-provided); can differ from TimeStamp when consent was collected earlier and synced later |
| **ConsentStatus** | Resulting status after the change (e.g., Opt In / Opt Out) |
| **PassedConsentStatus** | Status passed in by the calling application |
| **ConsentUpdateAction** | The action that triggered the update (create/update) |
| **ContactPointValue** | The contact point the consent applies to (email/phone) |
| **CommunicationSubscriptionChannelTypeId** | ID of the CSCT the record is tied to |
| **ChannelType** | The channel (Email, SMS) |
| **PartyId** | Identifier of the individual — **written blank by design** |
| **SenderId** | Identifier of the sender |
| **ConsentCapturedSourceType / Name / Details** | Caller-provided source attribution (form, flow, or application name/details) |

### Who Made the Change?
There's **no dedicated UserId / ActorId / ModifiedById field** — by design. The closest fields are caller-provided source attribution (ConsentCapturedSourceType, ConsentCapturedSourceName, ConsentCapturedSourceDetails, SenderId), populated only if your calling application sets them at ingestion time. For actor-level compliance attribution, populate ConsentCapturedSourceName and ConsentCapturedSourceDetails from your flow/form/integration.

### Why PartyId Is Blank
Consent is keyed on the Contact Point value + CSCT ID, so PartyId is written blank by design — even when the upstream record is a Lead or Contact. To stitch audit rows back to a Lead/Contact for reporting, join ContactPointValue from the audit object to the ContactPointEmail or ContactPointPhone DMOs, which carry the PartyId mapping.

### Deleting Audit Rows
The audit object is **insert/upsert-only** — no self-service feature to delete individual rows. Options:

1. **GDPR Right to be Forgotten** — use the Consent API "ShouldForget" endpoint on the Individual. Flags the individual; an async process performs deletion across the Individual DMO and related objects. Takes hours; reprocessed at 30, 60, 90 days. Permanent.
2. **Bulk deletion** (e.g., undoing a bad import) — no UI feature; engage Salesforce Support.
3. **Right to Be Forgotten Policies in Privacy Center** — a separate framework; confirm which applies based on your edition.

### Rejected Rows — Common Causes
1. **Wrong object mapping** — audit object mapped to the wrong target, creating phantom rows.
2. **Date-format issues** — unsupported timestamp format for the consent-captured date can skip the intended write while still writing an audit row.
3. **Status case mismatch** — sending "OptIn"/"OptOut" instead of "OPT_IN"/"OPT_OUT". Use the Create Consent action, which produces correctly formatted values.

### Reporting & Segmentation
- **Reporting is supported:** query consent and audit objects via Data Cloud's Query Editor and Data Explorer for compliance/operational reports.
- **Segmentation on consent status isn't supported** out of the box — use the Calculated Insight workaround (see [[consent-segmentation]]).

## Common Pitfalls / Misconceptions
⚠️ The audit trail is append-only — you can't update or delete individual rows via the UI.
⚠️ PartyId is blank by design — don't expect it to be populated.
⚠️ There's no user/actor field; attribution is caller-provided only.
⚠️ A Preference Page unsubscribe does **not** log an Email Engagement Unsubscribe event — it's a consent update, so Email Opt-Out Rate can look lower than expected.

## Active Recall Questions
1. What's the key difference between the Audit Trail and the CSC DMO?
2. Why is PartyId blank in audit trail rows?
3. How do you delete audit trail rows for GDPR?
4. What are three common causes of rejected audit rows?
5. How do you attribute "who" made a consent change?

## Related Concepts
- [[consent-data-model]]
- [[consent-write-paths]]
- [[consent-segmentation]]
- [[consent-cache]]
- [[reporting-metrics-dashboards]]

## Source References
- User-provided "Consent Management: Audit Trail" article
- User-provided "Consent Management: Preference Pages" article (Email Opt-Out Rate note)