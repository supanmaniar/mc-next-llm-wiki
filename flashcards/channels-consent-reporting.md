# Flashcards — Channels, Consent & Reporting

## Card: Channel Add-ons
**Q:** Which add-on does each non-email channel require?
**A:** SMS → Message Credits - SMS; WhatsApp → Message Credits - WhatsApp; Mobile App → Message Credits - Mobile App Regional (Advanced only).

## Card: Short Code
**Q:** Do US/Canadian short codes require brand/campaign?
**A:** No — short codes don't require associated brands or campaigns (long codes do).

## Card: Mobile App Regions
**Q:** Which regions host Mobile App Messaging?
**A:** Germany and United States only.

## Card: iOS/Android Services
**Q:** What push services are configured for iOS and Android?
**A:** iOS → APNs (Apple Push Notification service); Android → FCM (Firebase Cloud Messaging).

## Card: Custom Event Activation
**Q:** What can't you do after activating a custom mobile app event?
**A:** Delete its attributes (you can deactivate the event, but not delete active events or activated attributes).

## Card: Preference Page Publish
**Q:** When do preference page changes go live?
**A:** Immediately upon save (published instantly to subscribers).

## Card: Consent CSV Columns
**Q:** What are the first two columns of a consent import CSV?
**A:** Contact point (email or phone) as column 1, consent date as column 2.

## Card: Consent Date Rule
**Q:** What happens if you import a consent date earlier than the existing date?
**A:** It's ignored (the importer ignores incoming dates before existing consent dates).

## Card: Lyn's 4 Files
**Q:** Why would Lyn need 4 import files for SMS + email consent?
**A:** One per channel+status: opted-in email, opted-out email, opted-in SMS, opted-out SMS.

## Card: First Page View
**Q:** Why isn't the first page view recorded when consent banner is required?
**A:** It occurs before the visitor provides consent.

## Card: Landing Page Integrations
**Q:** What two integration tiles are needed for landing pages with consent banner?
**A:** Data Cloud integration + Data Cloud Web Tracking Consent Banner integration.

## Card: Analytics Packages
**Q:** What are the four main analytics packages?
**A:** Marketing Engagement Analytics, Flow Reports Analytics, SMS Analytics, Landing Pages and Forms Analytics.

## Card: Marketing Performance Permissions
**Q:** What permission sets install vs. view Marketing Performance?
**A:** Install = Data Cloud admin + Marketing Cloud Admin; View = Tableau Next Included App Business User.

## Card: Dynamic Dashboards
**Q:** What license limit can block Marketing Analytics package install?
**A:** Requires ≥2 available dynamic dashboard licenses.

## Card: Scoring Schedule
**Q:** What's the scoring frequency range?
**A:** Every 1 hour to every 24 hours (4 options); more frequent = more credits.

## Card: Scoring Limits
**Q:** Max engagement/fit rules, conditions per rule, and models per edition?
**A:** 30 engagement + 30 fit rules, 10 conditions/rule, 1 model (Growth) / 2 models (Advanced).

## Card: Default Scoring Points
**Q:** What are the point values for form-submit, page-view, and UNSUBSCRIBE (people)?
**A:** form-submit +10, page-view +1, UNSUBSCRIBE -5.

## Card: Account Default Fit
**Q:** What's the default account fit rule?
**A:** Account Type = Prospect → +30.

## Card: STO Prerequisite
**Q:** What prerequisite do STO, Engagement Scoring, and Frequency share?
**A:** Identity resolution ruleset with Individual as primary DMO (must be one of first two rulesets).

## Card: STO Window
**Q:** How much engagement history does Send Time Optimization analyze?
**A:** Past 90 days.

## Card: Domain Not Default
**Q:** Which domain is NOT provided by default?
**A:** Email sending domains (must be authenticated yourself).

## Card: Tracker Domain
**Q:** What is the tracker domain / link rewriting?
**A:** URLs are rewritten with the tracker domain, engagement is captured, then forwarded to the target URL.

## Card: Insights Measure Fields
**Q:** What are the Measure field values for the three scores?
**A:** Engagement → Engagement__Score__c; Fit → Fit_Score__c; Overall → People_Score__c.

## Related
- [[channels-overview]]
- [[consent-and-compliance]]
- [[web-tracking]]
- [[reporting-analytics-setup]]
- [[scoring-models]]
- [[ai-features]]
- [[domain-settings]]
