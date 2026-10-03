# Marketing Agents (Out-of-the-Box AI Agents)

## Core Idea
Marketing Cloud Next ships with **five out-of-the-box AI agents** — Segment Creation, Campaign Creation, Content Creation, Journey Decisioning, and Account Discovery — each handling a different stage of the marketing workflow, from audience definition through to account-based discovery.

## Prerequisites
- [[ai-features]]
- [[agentic-marketing]]
- [[einstein-segments]]

## Detailed Explanation

### The Five Agents (memorize the pairing)
The exam asks you to **identify the different agents and understand when to use each one**. Match the agent to its job:

| Agent | What it does | When to use it |
|-------|--------------|----------------|
| **Segment Creation Agent** | Uses **natural language prompts** to create Data 360 audience segments; translates an audience description into **editable segmentation criteria** | Quickly define an audience without manual rule-building |
| **Campaign Creation Agent** | Creates **campaign briefs, flows, and multi-channel content** from conversational prompts | Accelerate campaign planning and development |
| **Content Creation Agent** | **Drafts and refines content** for emails, landing pages, and SMS messages | Adjust messaging, tone, length, or audience relevance |
| **Journey Decisioning Agent** | Selects the **most appropriate journey or flow** and creates **personalized content** for each individual | Route people to the right journey with tailored content |
| **Account Discovery Agent** | Provides **account insights** and identifies potential **buying group members** | Discover stakeholders and guide nurturing or follow-up activities |

> **Memory hook:** Segment → Campaign → Content → Journey → Account. The agents map to the funnel: define the audience, build the campaign, write the content, route the journey, discover the accounts.

### Campaign Creation Agent in Action (demo)
1. From the **Marketing Home** tab → **New Campaign** → **Draft with Agentforce**.
2. Describe the **campaign objective**.
3. Choose to **draft a brief** for the campaign.
4. Ask Agentforce to **generate a campaign** from that objective.
5. Agentforce creates a **draft campaign brief**.
6. Open the **campaign preview** to review the proposed campaign — including its **flow and content**.
7. **Save it as a new campaign**, then open the campaign record.

### Segment Creation Agent in Action (demo)
1. Click **Select Segment** → go to **Segment Builder** → **Next**.
2. Select **Create with Einstein Segment Creation**.
3. Choose the **DMO** to segment on → **Next**.
4. Einstein Segment Creation has **already drafted an audience definition based on the campaign objective**.
5. Refine the description, or **edit the segment rules manually**.
6. Accept the suggested definition → **Create Segment**.

> **Combined power:** in a few clicks, the **Campaign Creation Agent** transformed a campaign objective into a complete brief and campaign, while the **Segment Creation Agent** created the target audience segment. See [[einstein-segments]] for the full Einstein Segment Creation detail (Data Prism grounding, prompt-writing rules, limits).

### Relationship to Agentforce
These agents are part of the broader **Agentforce** capability set. See [[agentic-marketing]] for the strategic framing (three waves, agentic vs. automation) and [[ai-features]] for the Einstein Trust Layer and agent setup.

## Common Pitfalls / Misconceptions
⚠️ **Don't confuse the agents** — Segment Creation builds audiences; Campaign Creation builds briefs/flows/content; Content Creation drafts/refines content; Journey Decisioning picks journeys and personalizes; Account Discovery finds buying group members.
⚠️ The **Segment Creation Agent** is the same capability as **Einstein Segment Creation** — it requires a Unified Individual DMO and identity resolution.
⚠️ Agentforce campaign drafting produces a **draft** — you still review the preview and save it as a campaign.

## Active Recall Questions
1. Name the five out-of-the-box marketing agents and what each does.
2. Which agent creates campaign briefs, flows, and multi-channel content?
3. Which agent identifies potential buying group members?
4. Which agent selects the most appropriate journey and personalizes content?
5. What does the Segment Creation Agent produce, and what can you do with it?
6. Walk through the "Draft with Agentforce" campaign flow.

## Related Concepts
- [[ai-features]]
- [[agentic-marketing]]
- [[einstein-segments]]
- [[conversational-marketing]]
- [[campaign-record-workflow]]

## Source References
- `sources/MCNext_Consultant_Exam_Masterclass_Session4.txt` — Elliot Harper, "Marketing Cloud Next Consultant Exam Masterclass" Session 4 (Salesforce, Summer '26)
- `sources/mktg_implementation_guide.pdf` — "Agentforce Agents & Standard Actions"
