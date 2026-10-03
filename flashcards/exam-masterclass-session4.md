# Flashcards — Exam Masterclass Session 4 (Elliot Harper)

> Source: `sources/MCNext_Consultant_Exam_Masterclass_Session4.txt` — the official Salesforce exam-prep masterclass, **final session**. Covers contact point resolution at send time, AI agents and predictive AI, and analytics/reporting.

## Card: Session 4 Agenda
**Q:** What three areas does the final session cover?
**A:** 1) How **contact point resolution** works at send time. 2) **Agentforce and other AI-powered innovations**. 3) **Analytics and performance insight** reports and dashboards.

## Card: Contact Points in Data 360 vs. MCE
**Q:** How does the contact point model differ between MCE and Data 360?
**A:** MCE subscribers can only have **one email address**. In **Data 360, an individual can have multiple email addresses**, plus multiple contact point values for other channels like SMS.

## Card: Reconciliation Rules and Contact Points
**Q:** Do reconciliation rules determine which contact point is used?
**A:** ⚠️ **No.** Reconciliation rules determine which **single value** is selected for a **unified field that can't contain multiple values** (like an individual's name). They **don't apply to contact points** such as email addresses or phone numbers.

## Card: What Happens to Contact Points
**Q:** What happens to all contact points after identity resolution?
**A:** They are **all retained** as part of the unified profile and remain **available for segmentation and activation**.

## Card: Multi-Address Send Behaviour
**Q:** If a unified individual has records with three email addresses, two of which are the same, how many emails are sent?
**A:** **Two** — a separate message is sent to **each unique email address**, and a duplicate address is treated as a **single contact point** (one send).

## Card: The Four Contact Point Selection Methods
**Q:** Name the four ways MC Next determines which contact point to use at send time.
**A:** 1) **Data graph** selected in the flow's automation properties. 2) **On-demand flow API payload**. 3) **Activation source priority order** (activation-triggered flows). 4) **Activation template** (audience flows using a segment).

## Card: Data Graph Contact Point Selection
**Q:** What must the flow's data graph include for contact point selection to work?
**A:** A **specific structure and field set** — otherwise messages won't send successfully. (The required structure is documented on a Salesforce Help page.)

## Card: On-Demand Flow Precedence
**Q:** In an on-demand flow, what takes precedence — the API payload or a configured data graph?
**A:** The contact point is typically derived from the **API payload**, but if a **data graph is configured in the flow's automation properties, that data graph takes precedence**.

## Card: Activation Template Definition
**Q:** What is an activation template?
**A:** A template that lets you define the **source priority order** and use **rules to filter** the segment members or contact points included in an activation. You select it when configuring a send message element in a flow.

## Card: Activation Template Requirement
**Q:** When is an activation template required?
**A:** When the segment's **segment-on object is NOT Unified Individual**.

## Card: Creating an Activation Template
**Q:** Walk through creating an activation template.
**A:** Activations tab in Data 360 → **New** → select **Template** as the activation type → **Continue** → select a **data space** and the **DMO used as the segment-on criteria** (typically Individual or Unified Individual) → choose **Data Cloud** as the platform → **Continue** → define the **priority order for contact point selection** (expand the email channel → **Edit**) → **Save** → optionally add **contact point filters** and **activation membership filters** → name and save.

## Card: Source Priority Example
**Q:** In the demo, what source priority order was configured, and what's the result?
**A:** **Salesforce → Contact**, then **Salesforce → Lead**, then **Any** (all other sources). MC Next prioritises an email from a **Contact** record; if unavailable, a **Lead** record; then **any other source**.

## Card: Phone Contact Point Field
**Q:** Which DMO holds the telephone number field for phone contact point selection?
**A:** The **Contact Point Phone DMO** — not the Individual or Unified Individual DMO.

## Card: The Five Marketing Agents
**Q:** Name the five out-of-the-box AI agents in Marketing Cloud Next.
**A:** **Segment Creation Agent**, **Campaign Creation Agent**, **Content Creation Agent**, **Journey Decisioning Agent**, and **Account Discovery Agent**.

## Card: Segment Creation Agent
**Q:** What does the Segment Creation Agent do?
**A:** Uses **natural language prompts** to create Data 360 audience segments — translating an audience description into **editable segmentation criteria**.

## Card: Campaign Creation Agent
**Q:** What does the Campaign Creation Agent do?
**A:** Creates **campaign briefs, flows, and multi-channel content** from conversational prompts — accelerating campaign planning and development.

## Card: Content Creation Agent
**Q:** What does the Content Creation Agent do?
**A:** **Drafts and refines content** for emails, landing pages, and SMS messages — adjusting messaging, tone, length, or audience relevance.

## Card: Journey Decisioning Agent
**Q:** What does the Journey Decisioning Agent do?
**A:** Selects the **most appropriate journey or flow** and creates **personalized content** for each individual.

## Card: Account Discovery Agent
**Q:** What does the Account Discovery Agent do?
**A:** Provides **account insights** and identifies potential **buying group members** — helping discover stakeholders and guide nurturing or follow-up activities.

## Card: Draft with Agentforce
**Q:** Walk through the "Draft with Agentforce" campaign flow.
**A:** Marketing Home → **New Campaign** → **Draft with Agentforce** → describe the **campaign objective** → choose to **draft a brief** → ask Agentforce to **generate a campaign** → Agentforce creates a **draft campaign brief** → open the **campaign preview** (flow + content) → **save as a new campaign** → open the campaign record.

## Card: Einstein Segment Creation in the Campaign Flow
**Q:** How does Einstein Segment Creation fit into the campaign demo?
**A:** Select Segment → **Segment Builder** → **Next** → **Create with Einstein Segment Creation** → choose the **DMO** → **Next**. Einstein has **already drafted an audience definition based on the campaign objective**; you can refine it or edit rules manually, then **Create Segment**.

## Card: The Three Predictive AI Capabilities
**Q:** Name the three predictive AI capabilities in MC Next, and which are Advanced-only?
**A:** **Engagement Frequency**, **Engagement Scoring**, and **Send Time Optimization**. ⚠️ **Engagement Frequency and Engagement Scoring are Advanced only** — not Growth.

## Card: Using Predictive AI Insights
**Q:** How do you use predictive AI insights for segmentation and decisioning?
**A:** Configure the **required data graph** first, then use fields like **Email Engagement Frequency** or **Engagement Score** to create branches with a **Decision element** — or use those **DMO fields as segment criteria**.

## Card: Engagement Frequency Purpose
**Q:** What is the goal of Engagement Frequency?
**A:** To determine **how often each contact should receive an email** — maximising engagement while reducing **email fatigue and unsubscribes**.

## Card: Engagement Frequency Inputs
**Q:** What does Engagement Frequency analyse, and how is it trained?
**A:** Up to **90 days** of email activity — sends, opens, clicks, bounces, unsubscribes, spam complaints, and **sending patterns**. It compares each individual's behaviour at different frequencies with **similar individuals**, then calculates an **ideal frequency range**. ⚠️ Trained **only on your org's data**; scores refreshed **weekly**.

## Card: Engagement Frequency Classifications
**Q:** What are the four Engagement Frequency classifications?
**A:** The **Email Engagement Classification** field in the **Email Engagement Frequency DMO** assigns each individual to: **Saturated · Almost Saturated · On Target · Under Saturated**.

## Card: Engagement Scoring Purpose
**Q:** What does Engagement Scoring estimate?
**A:** How likely each individual is to **engage with future marketing communications**.

## Card: Engagement Scoring Inputs
**Q:** What does Engagement Scoring analyse?
**A:** Up to **90 days** of historical behaviour, placing **greater emphasis on the most recent activity** — email sends, opens, clicks, bounces, unsubscribes, **subscription history**, and **website interactions**.

## Card: Engagement Scoring Predictions
**Q:** What three likelihood predictions does Engagement Scoring generate?
**A:** Likelihood to **open** an email, likelihood to **click** a link, and likelihood to **remain subscribed**.

## Card: Engagement Scoring Personas
**Q:** Name the four Engagement Scoring personas and their open/click likelihoods.
**A:** **Loyalists** (high open, high click) · **Selective Subscribers** (low open, high click) · **Window Shoppers** (high open, low click) · **Win Back / Dormant** (low open, low click).

## Card: Using Personas
**Q:** How might you use the Engagement Scoring personas?
**A:** Send **surveys** to understand selective subscribers, engage window shoppers via **alternative channels**, and place dormant subscribers into a dedicated **win-back campaign**.

## Card: Engagement Scoring Tiers
**Q:** What four tiers are the likelihood predictions grouped into?
**A:** **Most Likely · More Likely · Less Likely · Least Likely** — usable in a **Decision element** to route individuals along different flow paths.

## Card: Send Time Optimization Purpose
**Q:** What does Send Time Optimization do?
**A:** Determines **when each individual is most likely to engage with an email** — rather than sending to everyone at the same time.

## Card: STO Inputs & Refresh
**Q:** What does STO analyse, and how often are predictions updated?
**A:** Up to **90 days** of email engagement history — sends, opens, clicks, bounces, unsubscribes, spam complaints, **plus the timestamps** of those events. Predictions update **approximately once a week**.

## Card: STO Edition & Setup
**Q:** Which editions support STO, and what setup is required?
**A:** **Both Growth and Advanced** editions, and it **must be enabled in Setup**. Add the **Send Time Optimization DMO** to your data graph (required structure), then select the **Hourly Scores by Week** field.

## Card: STO Optimization Window
**Q:** What is the STO optimization window range?
**A:** From **2 hours up to 1 week**. MC Next sends each message at the recipient's predicted optimal time within that window.

## Card: The Three Reporting Capabilities
**Q:** Name the three out-of-the-box reporting capabilities and what each provides.
**A:** **Campaign Performance Dashboard** (end-to-end view of an individual campaign — sends, opens, clicks, bounces, contact progression) · **Marketing Performance Dashboard** (broader cross-channel view over time — audience growth, program-level engagement trends) · **Semantic Data Model** (consistent business layer for custom reports, stakeholder sharing, and external tool connections). ⚠️ All three are included with **no additional license or SKU**.

## Card: Marketing Performance Dashboards
**Q:** Where are marketing performance dashboards available, and what do they show?
**A:** From the **Marketing Analytics tab**. They give a **consolidated view** across marketing activities — overall campaign engagement and top-performing campaigns, audience segments, content, and channels — bringing together **web, email, SMS, WhatsApp, and mobile**.

## Card: Embedded Campaign Dashboards
**Q:** Where else do the performance dashboards appear?
**A:** **Embedded directly in each campaign record**, so you can evaluate an individual campaign's results in context without navigating to a separate reporting tab.

## Card: Content Performance Dashboards
**Q:** How do you access content performance dashboards?
**A:** Select the corresponding element in your **active flow** (e.g., a **Send Email Message** element) → from the **Analytics tab** click **Details** → review **pulse card metrics** for the content type plus **row-level data**.

## Card: Deliverability Dashboards
**Q:** What do the deliverability dashboards cover, and what are they for?
**A:** **SMS, WhatsApp, and mobile app messaging**. They provide visibility into **message delivery health** and campaign performance, and help you understand **why a message failed to reach specific recipients**.

## Card: Semantic Data Model
**Q:** What is the semantic data model, and what does it do?
**A:** Powered by **Tableau Next**, it's the **foundation for reports and dashboards** in MC Next, available from the **Analytics tab**. The **Marketing Intelligence Semantic Data Model** combines data from multiple **Data 360 objects** and defines the **relationships and metrics** for campaign performance, engagement, and deliverability — applied **centrally** so metrics calculate **consistently**.

## Card: Semantic Model Uses
**Q:** What can you do with the semantic data model?
**A:** Create **reports** answering specific business questions, combine them as **widgets in a dashboard**, **customise** standard dashboards (widgets, labels, layouts, filters), **extend** it to other Data 360 objects, build **custom reports**, share data with stakeholders **outside Salesforce CRM**, or connect **any external tool**.

## Card: Unified Engagement History
**Q:** What is the Unified Engagement History dashboard?
**A:** A pre-built dashboard giving **sales and marketing teams a shared view** of activities performed by the **leads and contacts associated with an account**. Sales reps use it to identify the **most engaged people**, understand their interests, and decide **who to contact next**. Powered by **Data 360 and Tableau Next**.

## Card: Embedding Unified Engagement History
**Q:** How do you embed the Unified Engagement History dashboard?
**A:** Add the **Unified Engagement History dashboard component** to the **page layout** of **account, lead, and contact** records.

## Card: Series Wrap-Up
**Q:** What did the masterclass series say about scope?
**A:** The purpose wasn't to cover **every** feature — it focused on the **concepts and capabilities in the exam guide**. Topics not covered include scoring rules, convergent features with MCE, RCS and WhatsApp channels, retail triggers, Einstein Metrics Guard, and distributed marketing.

## Related
- [[contact-point-resolution]] · [[marketing-agents]] · [[ai-features]] · [[contact-points-activation]] · [[reporting-metrics-dashboards]] · [[reporting-analytics-setup]] · [[einstein-segments]] · [[agentic-marketing]]
- Deck index: [[study-roadmap]]
