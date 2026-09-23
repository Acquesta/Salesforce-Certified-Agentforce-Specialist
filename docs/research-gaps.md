# Research — coverage gaps (Agentforce Specialist, Spring '26)

Companion to `docs/research.md`. Covers three topics the question bank does not reach yet.
Research date: 2026-09-23. Reliability tags: `[OFFICIAL]` = help.salesforce.com / trailhead / developer.salesforce.com / salesforce.com, `[3P]` = reputable third party, `UNVERIFIED` = could not confirm.

Fetch note: `developer.salesforce.com` returns HTTP 403 to plain fetchers and `help.salesforce.com` renders client-side. Everything below marked `[OFFICIAL]` was read from the rendered page in a real browser, not from a search snippet, unless the bullet says otherwise.

---

## Topic 1 — Manage and prevent specific models from being accessed

### 1.1 The headline finding

There is **no single "disable this model" toggle** for Salesforce-managed foundation models. Model access is governed by four separate levers: an org-level model option, the AI Models library (add/edit/delete), per-agent/per-subagent/per-template overrides, and permissions. A question that assumes a "Turn off model" checkbox would be wrong.

This resolves the UNVERIFIED note in `research.md` §5.6.

### 1.2 Org-level model option for Agentforce

- Setup path: **Setup → Quick Find "Audit, Analytics, and Monitoring" → Einstein Audit, Analytics, and Monitoring Setup → "Select the Model for Agentforce"**. `[OFFICIAL]` — this is *not* the Agentforce Agents page any more; `research.md` §5.6 has the older location.
- Three options only: **Salesforce Default**, **AWS-Hosted**, **Google Gemini**. `[OFFICIAL]`
- **Salesforce Default** = a Salesforce-managed mix. New Agentforce Builder agents use **GPT-4.1**; legacy Agentforce Builder agents use **GPT-4o**. `[OFFICIAL]`
- **AWS-Hosted** = **Anthropic Claude Haiku 4.5 on Amazon Bedrock**, hosted on the Salesforce instance of Bedrock: traffic stays in the Salesforce VPC, TLS 1.2 minimum, AWS PrivateLink, no customer data stored in Bedrock, no data persisted or used for training. Described as the first LLM provider fully inside the Salesforce trust boundary. `[OFFICIAL]`
- **Google Gemini** = **Gemini 3.5 Flash on Vertex AI**. Supported for **new Agentforce Builder agents only** — do not select it if active legacy-builder agents exist. `[OFFICIAL]`
- The selection **applies to all Agentforce agents in the org** and is used by the **reasoning engine**. Specific tasks such as subagent classification and citations may still use Salesforce-owned models regardless of the choice. `[OFFICIAL]`
- Zero-data-retention is enforced contractually with all external providers (OpenAI, Anthropic, Google). `[OFFICIAL]`
- Source: https://help.salesforce.com/s/articleView?language=en_US&id=ai.agent_setup_select_model_provider.htm&type=5

### 1.3 What the org-level option does NOT block (the key exam nuance)

- Verbatim note on that page: Agentforce is limited to a few model options, but **a custom action that uses a prompt template, Apex, or the Models API can reference any Salesforce-managed or BYO model**. `[OFFICIAL]`
- So switching the org to AWS-Hosted does **not** prevent a prompt template or Apex call from hitting a different model. Help explicitly recommends updating custom agent actions to match the chosen model "for consistency" — a recommendation, not an enforcement. `[OFFICIAL]`
- After switching the model option, previously built prompts, custom actions and subagents **must be retested**. `[OFFICIAL]`

### 1.4 AI Models (formerly Einstein Studio) — the actual removal mechanism

- AI Models lives inside **Data 360** (Data Cloud). It lets you configure foundation models, customize hyperparameters, and test prompts in **Model Playground** before production. `[OFFICIAL]` https://developer.salesforce.com/docs/ai/agentforce/guide/get-started-einstein-studio.html
- **BYOLLM** adds an externally hosted foundation model (endpoint connection); it is saved to the **Model Library** in AI Models. The **LLM Open Connector** connects any model, including custom-built ones. `[OFFICIAL]`
- **Edit or Delete a Foundation Model** is the documented way to remove a model. Constraint: you can edit most settings **only while the model isn't a source for other models**; if it is a source, you must **first delete all associated model configurations**, then delete the foundation model. `[OFFICIAL]` https://help.salesforce.com/s/articleView?language=en_US&id=data.c360_a_ai_foundation_models.htm&type=5
- Model Playground structure: Create a Model Configuration → Data Masking → Edit a Model Configuration → Test Your Prompt → Create a Prompt Template. Model Playground **uses the Trust Layer**; org-level data masking settings are **enabled by default**. `[OFFICIAL]` https://help.salesforce.com/s/articleView?id=sf.c360_a_ai_foundation_models_test.htm&language=en_US&type=5
- Guidance if a configuration is already attached to prompts: **create a new model configuration instead of editing**, because changing settings can degrade associated prompts. `[OFFICIAL]`
- **Monitor Model Activity** dashboard shows model inference use and errors. `[OFFICIAL]`

### 1.5 Permissions that govern who can change models

- User permission: **"Allow users to manage models in AI Models"** — enables create, update and delete of models in AI Models. Originally shipped Summer '24 as "Allow users to manage models in Einstein Studio". `[OFFICIAL]` https://help.salesforce.com/s/articleView?id=data.c360_a_ai_license_perms.htm&language=en_US&type=5
- Permission sets: **Data Cloud Architect** = admin-level access to all AI Models features (create, update, delete, activate). **Data Cloud User** = restricted, use-only (get predictions/improvements). `[OFFICIAL]`
- Data Cloud Architect was **formerly named Data Cloud Admin**. `[OFFICIAL]` (stated in KB 004333412)
- Prompt Builder side: **Prompt Template Manager** permission set is required to access and create custom prompt templates. `[OFFICIAL]` (search excerpt of help.salesforce.com; page itself not re-rendered) — already in `research.md` §5.4
- Agent side: **Manage AI Agents** grants **org-wide** management of all agents — it lets a user manage, activate, deactivate, customize subagents and actions, and monitor activity. Help warns to assign it only to users who need org-wide access. **Manage Agentforce Service Agents** *contains* Manage AI Agents, so it is not narrower in practice. `[OFFICIAL]` https://help.salesforce.com/s/articleView?language=en_US&id=ai.agent_setup_explore_types.htm&type=5

### 1.6 Per-agent / per-subagent model override (new builder, Agent Script)

- Default: Agentforce uses the **org-level model** selected in Setup for all agents and subagents. Override with the **`model_config`** block. `[OFFICIAL]` https://developer.salesforce.com/docs/ai/agentforce/guide/ascript-model.html
- Syntax: `model_config:` → `model: "model://sfdc_ai__DefaultBedrockAnthropicClaude45Haiku"`.
- **Precedence: subagent > agent > org default.** Worked example in the docs: org = Salesforce default, agent = Claude Haiku 4.5, subagent = Gemini 3.1 Pro → that subagent uses Gemini 3.1 Pro, every other subagent in that agent uses Claude Haiku 4.5, other agents in the org use the Salesforce default. `[OFFICIAL]`
- Recommended model API names: `sfdc_ai__DefaultGPT41`, `sfdc_ai__DefaultBedrockAnthropicClaude45Haiku`, `sfdc_ai__DefaultVertexAIGemini35Flash` — these are the thoroughly tested ones. `[OFFICIAL]`
- **`EinsteinHyperClassifier`** (Salesforce-owned) is often used for subagent classification in the `agent_router`. Advantages: much faster classification, better accuracy on specialized constraints and negative instructions. Limitations: **cannot use `before_reasoning` or `after_reasoning`**, and **can only use the `@utils.transition` tool**, no other tools. Some templates (e.g. Agentforce Service agent) use it by default. `[OFFICIAL]`
- Testing tip from docs: use different models in different **versions** of the agent to compare. `[OFFICIAL]`

### 1.7 Distractors that look right and are not

- **"Salesforce Einstein: Global Model Opt-Out"** (KB 000384050) is about **global predictive models** built from aggregated cross-customer data (Einstein Opportunity Scoring, Einstein Search, Einstein Bots, etc.). It stops Salesforce using your data to build those models. It has **nothing to do with restricting which LLM an org or template may call**, and opting out does not affect Einstein's access to your org data. Admin-controlled via "Manage Salesforce Access to Customer Data". `[OFFICIAL]` https://help.salesforce.com/s/articleView?id=000384050&language=en_US&type=1
- **"Enable or Disable a Model"** (`sf.bi_edd_model_manager_model_deactivate.htm`) belongs to **Einstein Discovery / Model Manager** — predictive ML models, not generative LLMs. `[3P]` (identified from search result title and article-id namespace; page not rendered) Good wrong-answer material.
- Deactivating a **prompt template** stops that template, not the model. Only one version of a template can be active at a time; with no active version the template is unavailable to users. `[OFFICIAL]` (search excerpt of `sf.prompt_builder_activate_deactivate_templates.htm`)

### 1.8 Traps and distractors — Topic 1

1. "Turn off the model in Setup → Einstein Generative AI → Models" — no such toggle. Removal happens by deleting the model configuration then the foundation model in AI Models.
2. Setting the org model option to AWS-Hosted does **not** stop prompt templates, Apex or the Models API from calling other models.
3. Deleting a foundation model while a model configuration still points at it — must delete the configurations first.
4. Global Model Opt-Out confused with blocking an LLM.
5. Einstein Discovery "Enable or Disable a Model" confused with generative model access.
6. Org-level model option confused with per-subagent `model_config`; and the precedence order reversed (it is subagent > agent > org).
7. Selecting Google Gemini in an org that still runs active **legacy-builder** agents.
8. "Prompt Template Manager" offered as the permission that controls the model library — it is the Prompt Builder permission. The model library is governed by "Allow users to manage models in AI Models" / Data Cloud Architect.
9. Editing a model configuration already bound to live prompts instead of creating a new one.

### 1.9 Verdict — Topic 1

**ENOUGH TO WRITE QUESTIONS.** The Setup path, the three model options, the delete-order constraint, the permission names and the three-level override precedence are all confirmed on official pages. Write questions around "where does the admin do this", "what does the org-level setting fail to block", and "what must be deleted first" — avoid any question premised on a literal disable/deactivate switch for a Salesforce-managed LLM, because that switch does not exist.

---

## Topic 2 — Connecting an agent to the EMAIL channel

### 2.1 Scope: which agent types

- **Agentforce Service agents only.** The Help page states explicitly: "This article doesn't apply to: Agentforce Employee agents." `[OFFICIAL]` https://help.salesforce.com/s/articleView?language=en_US&id=ai.agent_email_parent.htm&type=5
- The feature name in Setup is **Agentforce for Service on Email** (a.k.a. Agentforce Service Agent on Email).
- Email responses are **grounded in Agentforce Data Libraries**. `[OFFICIAL]`

### 2.2 Prerequisites (pre-setup checklist, verbatim order)

1. **Enable Flex Credits.** `[OFFICIAL]`
2. **Create a Service agent**, select a data source to ground responses, and **activate** it. Agentforce Service Agent on Email is **not visible in Setup until Agentforce is enabled**. `[OFFICIAL]`
3. **If the agent includes a user verification subagent, remove it** — Agentforce Service Agent on Email **does not support end-user verification**. `[OFFICIAL]` (high-value exam fact)
4. **Turn on and configure Email-to-Case**, and add one or more **verified routing addresses**. `[OFFICIAL]`
5. **Enable Lightning threading for emails.** `[OFFICIAL]`

### 2.3 Setup steps

- **Email template**: must be a **Lightning email template**. **Classic email templates are not supported.** `[OFFICIAL]`
- **Email configuration**: Setup → Quick Find "Agentforce" → **Agentforce for Service on Email** → **New Configuration**. Enter a name, select the email template, select an **active** Service agent, enter a **legal disclosure** (it replaces the `[[[LEGAL_DISCLOSURE]]]` token in the sent email), optionally check **Reply All**, Save and Next. `[OFFICIAL]` https://help.salesforce.com/s/articleView?id=ai.service_agent_email_configuration.htm&language=en_US&type=5
- **Link to routing address**: Go to Email-to-Case Setup → Routing Addresses → Edit the routing address → under **Agentforce Service Agent Settings**, select the email configuration → Save. One configuration can be linked to multiple routing addresses. `[OFFICIAL]`
- **Legacy builder**: to deploy to channels you must set up the **Service Email Connection** under Connections. `[OFFICIAL]`
- **Routing logic**: recommended approach is an **Omni-Channel flow** that decides which cases go to the Service agent vs a human rep. A "basic alternative to a flow" also exists. `[OFFICIAL]`
- **Testing**: test the flow against a **new unused routing address** first, then switch to an active one. `[OFFICIAL]`
- **Sender**: the **From/Sender field shows the Email-to-Case routing address** the customer wrote to. `[OFFICIAL]`

### 2.4 Permissions

| To do | Permission |
|---|---|
| Create email templates | Lightning Experience User |
| Edit public email templates | Modify All Data, or Manage Public Lightning Email Templates, or template ownership |
| Create Agentforce Service Agent email configurations | **Manage Agentforce Service Agents AND Manage AI Agents**, OR Customize Application |
| Edit routing addresses | Customize Application |
| Create Omni-Channel flows | Customize Application |

`[OFFICIAL]` — same table on both email Help pages.

### 2.5 What the agent can and cannot do on email (vs chat)

- Processes **only the email subject and body**. **Images and attachments are ignored.** `[OFFICIAL]`
- The **email connection must exist before** the agent can use the email subject as context. `[OFFICIAL]`
- Responses are **asynchronous**; response times vary. `[OFFICIAL]`
- **`MessagingSession` record is not available** on the email channel. `[OFFICIAL]` — contrast with enhanced messaging, where MessagingSession context variables exist (`research.md` §4.7).
- **Welcome and Error system messages are not used** on email. `[OFFICIAL]`
- The agent **always sends a response** unless a human escalation is requested or a runtime error occurs. **Instructions telling it to stay silent or take no action are not supported.** `[OFFICIAL]`
- **Does not process new inbound emails on closed cases.** `[OFFICIAL]`
- Ignores inbound mail whose headers show automated-response markers (out-of-office, etc.) to prevent auto-response loops. `[OFFICIAL]`
- Language: responds in the end user's language if it is in the agent's **allowed languages**; otherwise the configured **default language**; if none configured, **English**. `[OFFICIAL]`
- **Custom variables**: inbound email context such as **Case ID** is passed into custom variables rather than bundled into the user message, and can be referenced in subagents and action inputs. `[OFFICIAL]`
- Legacy-builder agents **without the Service Email Connection enabled**: **every email creates a new session**, and context variables set by actions are **not maintained between sessions**. `[OFFICIAL]`

### 2.6 Case behaviour and escalation on email

- **Escalation**: the email includes a custom AI-disclosure line and customers can **request escalation to a service rep**. `[OFFICIAL]`
- To intervene manually, **reassign the case from the AI agent to yourself**. `[OFFICIAL]`
- The agent **does not auto-close cases**. Recommendation: build a **scheduled Flow** to close old cases. `[OFFICIAL]`
- On a **runtime error**: a **case comment with error details** is created and the case is reassigned to the **org's default case owner**. `[OFFICIAL]`
- Agent user permissions: **View** on Case for Case Assignment Rules; **View + Update** on Case for the agent to update a case. Help explicitly invokes least privilege. `[OFFICIAL]`
- Emails appear in the **case feed** like any other case email; monitoring is via a **custom report** (or the case feed). `[OFFICIAL]`

### 2.7 Limits

- **Daily transaction limit: 5,000 inbound emails by default** for Agentforce for Service on Email. Increases require a consistent history of successful production usage up to the limit, then a Salesforce Customer Support request. `[OFFICIAL]`
- **Reply All caps at 20 recipients** across To and CC. `[OFFICIAL]`
- One inbound email sent to **multiple routing addresses** with no existing case for the thread → **a case is created per routing address**; the agent replies on one and **adds a comment on the others pointing to the case with the real response**. `[OFFICIAL]`
- **Multiple inbound emails in quick succession on one case** → the agent may answer them all in a **single reply to the most recent email**. `[OFFICIAL]`
- **Salesforce for Outlook Email-to-Case routing addresses are not supported.** `[OFFICIAL]`
- The org preference **"Place User Signatures before Email Threads"** applies only to signatures defined on the Email Setup page — **not** to the Agentforce Service Agent on Email signature. `[OFFICIAL]`
- Source for all of §2.5–2.7: https://help.salesforce.com/s/articleView?language=en_US&id=ai.service_agent_considerations_1.htm&type=5

### 2.8 The SDR agent's outbound email is a different mechanism — confirmed

- **Rename**: **Agentforce SDR → Agentforce Lead Nurturing → Agentforce Engagement.** Help states the Lead Nurturing name changed to Engagement, to distinguish it from the **Agentforce Lead Generation** template. The agent-types table still lists the type as "Lead Nurturing (formerly known as SDR)". `[OFFICIAL]` https://help.salesforce.com/s/articleView?language=en_US&id=sales.sales_agent_sdr_intro.htm&type=5
- It is **outbound and proactive**, not Email-to-Case. The agent acts as a **user with its own user record**, and drives email through a **special Sales Engagement cadence**, planning and tracking outreach with Agent Actions. `[OFFICIAL]`
- **Send as Seller** sends using the **prospect record owner's email address and signature**. **Require Manual Approval** (also referred to as Review Before Send) makes users approve agent-generated emails before they go out; owners review and edit in the **Activity Timeline** or the **Agentforce Engagement Control Center**. `[OFFICIAL]`
- Prospect assignment: (a) **assignment rules** in Setup/Agentforce Builder (global, all leads), (b) **Automated Actions** created by a rep or manager (scoped to their own/subordinates' prospects), (c) the **Assign to Agent** action on lead, contact and person account detail pages and list views. Assignment **does not change the record owner**. `[OFFICIAL]`
- Required features: Agentforce Sales, **Sales Engagement**, **Einstein Activity Capture**, Agentforce, Einstein Generative AI, **Salesforce Email Productivity** (Outlook/Gmail integration), Automated Actions, Data 360. `[OFFICIAL]`
- **If Activity 360 Reporting is on, Agentforce Engagement doesn't work.** `[OFFICIAL]`
- Default cap: **up to 20 sales agents** per org without contacting Support. `[OFFICIAL]`
- Activity appears in the prospect's **Activity Timeline**; aggregate reporting is via reports on the **Email Message** object filtered by user. `[OFFICIAL]`
- Standard prompt templates in play: Draft Agentforce SDR Intro Email, Follow-up on Agentforce SDR Email (nudge), Reply with Product Q&A Agentforce Email, Reply with Meeting Agentforce SDR Email. `[3P]` (search-result summary of help pages; not individually rendered)

### 2.9 Traps and distractors — Topic 2

1. Offering **Omni-Channel routing type "Agentforce Service Agent"** as the email setup step — that is the **enhanced messaging** path. Email goes through an **email configuration linked to an Email-to-Case routing address**.
2. Claiming an **Employee agent** can be connected to Service email.
3. Using a **Classic** email template.
4. Keeping the **customer/user verification subagent** on an email agent.
5. Expecting **MessagingSession** context variables on email.
6. Expecting the agent to **close the case** when the conversation ends.
7. Expecting the agent to **read an attached PDF or screenshot** in the email.
8. Writing an instruction like "if you cannot help, do not reply" — suppressing the response is unsupported.
9. Confusing **Agentforce Engagement (SDR) outbound email** with **Agentforce for Service on Email**; and offering "Send as Seller" or Sales Engagement cadences as part of a service email setup.
10. Forgetting **Lightning threading** or **Flex Credits** in a prerequisites question.
11. Quoting the wrong daily cap — it is **5,000**, and Reply All caps at **20** recipients.

### 2.10 Verdict — Topic 2

**ENOUGH TO WRITE QUESTIONS.** This is the strongest of the three: exact Setup path, a five-item prerequisite list, a permission table, a long considerations list with hard numbers, and a clean contrast against the Engagement/SDR outbound mechanism. Resolves the UNVERIFIED note in `research.md` §4.7.

---

## Topic 3 — Standard subagents (formerly standard topics)

### 3.1 Terminology and where the list actually lives

- **Beginning April 2026, agent topics are called subagents; no functional change.** Docs mix both terms during the transition. **Topic Selector → Agent Router.** `[OFFICIAL]` https://help.salesforce.com/s/articleView?language=en_US&id=ai.agent_topics.htm&type=5
- **Salesforce no longer publishes one enumerated list of standard subagents in Help.** `sf.copilot_ref.htm` / `ai.copilot_ref.htm` now render as **"Agentforce Standard Asset Reference"** containing only *Standard Agent Connection Reference* and *Standard Adaptive Response Format Reference* — the standard-topic tables that older third-party write-ups cite are gone. Verified by rendering the page. `[OFFICIAL]`
- The canonical in-org list is **Setup → Quick Find "Agentforce Assets"**, which opens two tabs: **Subagents** and **Actions**. Clicking a subagent opens **Subagent Configuration** (Classification Description, Scope, Instructions) and **This Subagent's Actions**. **Which subagents appear depends on the licenses in the org.** `[OFFICIAL]` https://trailhead.salesforce.com/content/learn/projects/quick-start-create-employee-agents-in-agentforce/enable-agentforce-and-review-default-topics-and-actions
- Standard subagents live in an **asset library**; you can **add and remove** them from an agent, **create versions and customize them**, and build custom subagents from scratch. `[OFFICIAL]` (ai.agent_topics.htm "Manage Subagents"; Trailhead)

### 3.2 Standard subagent names confirmed in official sources

| Subagent | What it does | Confirmed by | Reliability |
|---|---|---|---|
| **Agent Router** (was Topic Selector) | Entry point. Welcomes the user, classifies intent, routes to the right subagent, controls which subagents are available. In Agent Script it is the `start_agent agent_router:` block. | ai.agent_topics.htm; ascript-model.html | `[OFFICIAL]` |
| **Escalation** | The subagent an agent uses to escalate/transfer. Without it, **the agent cannot escalate at all**. | ai.service_agent_escalation.htm | `[OFFICIAL]` |
| **General FAQ** | Knowledge Q&A; normally carries the **Answer Questions with Knowledge** action. | KB 004333412 ("usually associated with the General FAQ topic") | `[OFFICIAL]` |
| **General CRM** | CRM record work. **Sales Email** ships inside it. | Trailhead Agentforce Assets walkthrough; search excerpt of help | `[OFFICIAL]` |
| **Single Record Summary** | Record summarization. **Sales Summaries** ships inside it. | search excerpt of help.salesforce.com | `[OFFICIAL]` (snippet only) |
| **Case Management** | Case work; contains **Create Case with Enhanced Data**, cited as the fallback when escalation fails. | ai.service_agent_escalation.htm | `[OFFICIAL]` |
| **Account Management** | Account work; listed as an includable Service-template subagent. | search excerpt of help | `[OFFICIAL]` (snippet only) |
| **Order Inquiries** | Order work; listed as an includable Service-template subagent. | search excerpt of help | `[OFFICIAL]` (snippet only) |
| **Reservation Management** | Reservations; used as the worked example in Agent Script docs (`subagent ReservationManagement:`). | ascript-model.html; search excerpt of help | `[OFFICIAL]` |
| **Off Topic** | Redirects the conversation back to relevant subagents when the request goes off-topic. | search excerpts / community | `[3P]` — name is real, exact behaviour text UNVERIFIED |
| **Ambiguous Question** | Handles unclear requests. | search excerpts / community | `[3P]` — UNVERIFIED on an official page |
| **Customer Verification** / user verification | End-user verification before sensitive actions. Confirmed to **exist** because the email docs instruct removing it. | ai.agent_email_parent.htm | `[OFFICIAL]` that it exists; exact label UNVERIFIED |

Which subagents ship depends on the **agent template**. Confirmed template families: Employee Agent, Service Agent (plus specialized Agentforce Service templates), Lead Nurturing/Engagement, Sales Coach, Service Assistant, Setup with Agentforce. `[OFFICIAL]` https://help.salesforce.com/s/articleView?language=en_US&id=ai.agent_setup_explore_types.htm&type=5

### 3.3 Anatomy of a subagent (needed to write plausible distractors)

- New-builder parts: **Name** (API name, 2–3 words), **Description** (1–3 sentences, drives classification), **Instructions / reasoning instructions** (Agent Script logic + natural language), **Actions Available for Reasoning** (reasoning actions, may include utilities: transition to another subagent, set variables, escalate), **Action Definitions** (the full list of actions bound to the subagent). `[OFFICIAL]` ai.agent_topics.htm
- Legacy-builder parts: **Name, Classification Description, Scope, Instructions, Actions.** Instruction fields support up to **131,072 characters**, but shorter is recommended. Instructions are **nondeterministic**. `[OFFICIAL]` sf.copilot_topics.htm
- Determinism rule: to run an action **deterministically before reasoning**, put it in the subagent's **reasoning instructions**; to let the LLM pick it, put it in **reasoning actions**. Adding an action puts it in **both** action definitions and reasoning actions by default. Removing it from reasoning actions still leaves it usable inside the subagent. `[OFFICIAL]`
- Design guidance: minimum number of subagents to avoid **semantic overlap**; actions that must run in a chain belong in the **same** subagent; names and classification descriptions must be **distinct**. `[OFFICIAL]` ai.agent_plan_action_identify.htm

### 3.4 Caveats — corrected and confirmed

- **Escalation, customization**: agents without the Escalation subagent **cannot escalate**. On enhanced messaging channels, escalation transfers via an **outbound Omni-Channel flow** selected in the Messaging connection (new builder: Explorer → Messaging connection → Escalations → Escalation Flow; legacy builder: Connections tab → Escalations). **Agents attempt a transfer only once per session.** If the transfer fails, the agent continues the session using the Escalation subagent and keeps prior context. **Transfers are not supported for employee agents connected to the Agentforce panel in Lightning Experience or the Salesforce mobile app.** **Employee agents on Enhanced Web Chat do not support case creation when escalation fails.** Escalation cannot be tested inside Agentforce Builder because no messaging session exists there. `[OFFICIAL]` https://help.salesforce.com/s/articleView?language=en_US&id=ai.service_agent_escalation.htm&type=5
- **The "remove General FAQ to use a web-search data library" caveat is now STALE.** The current Help page says **Agentforce Data Library does not support new web-search data libraries** (existing ones keep working). Web search is now done with the **Search the Web standard action** for agents, or the **web retriever** for prompt templates — **neither requires a web-search data library**. Do not write a question on the old "delete General FAQ, add General Web Search" flow. `[OFFICIAL]` https://help.salesforce.com/s/articleView?id=ai.data_library_web_search.htm&language=en_US&type=5
- **The "only one subagent per agent can use Answer Questions with Knowledge" claim is UNVERIFIED.** The current official action-reference page lists the considerations for `AnswerQuestionsWithKnowledge` and **does not state that limit**. It appears only in third-party posts and community threads. Do not make it a correct answer. `[OFFICIAL]` (absence verified on https://help.salesforce.com/s/articleView?language=en_US&id=ai.copilot_actions_ref_answer_questions_with_knowledge.htm&type=5)
- **Answer Questions with Knowledge**, confirmed facts: API name `AnswerQuestionsWithKnowledge`; it **does execute a prompt template**; it **requires an Agentforce Data Library**; it **respects the requesting user's permissions and sharing** and only uses articles that user can access; supported custom Knowledge field types are **Text, Text Area, Text Area (Long), Text Area (Rich)** — **Text (Encrypted) and URL are not supported**; supported file types are **text, html, PDF**, up to **4 MB for text/html and 100 MB for PDF**. `[OFFICIAL]`
- **Data Library plumbing** (useful for grounding-related distractors): creating an ADL auto-creates a **chunk UDLO/UDMO**, an **index UDLO/UDMO**, a **vector search index** and a **retriever**. Retriever naming: **`KA_`** prefix for Knowledge-based, **`File_`** for file-based. A knowledge library created with the **same identifying fields** as an existing one **reuses the existing search index**; file-based libraries always reuse **`FileUDMO_SI`**. The **Search Index status must be Ready** before Answer Questions with Knowledge works. Knowledge **field labels must be ≤ 35 characters** or library creation errors. If "Use Public Knowledge Articles" is on, only **Published** articles are returned. `[OFFICIAL]` https://help.salesforce.com/s/articleView?id=004333412&language=en_US&type=1
- **Setup with Agentforce** creates its agent automatically, and that agent **is not visible or customizable in Agentforce Builder** — so it has no editable subagents. **Agent for Setup** is retired and cannot be enabled in new orgs from April 2026. **Agentforce (Default)** is retired: no new features since June 17, 2025, unavailable in new environments, migrate to Employee Agent. `[OFFICIAL]` ai.agent_setup_explore_types.htm
- **Model per subagent**: some templates, including the Agentforce Service agent, use **EinsteinHyperClassifier** in the agent router; that model cannot use `before_reasoning`/`after_reasoning` and can only call `@utils.transition`. `[OFFICIAL]` (see §1.6)

### 3.5 Traps and distractors — Topic 3

1. Answering that a definitive standard-subagent list lives on a Help reference page — it does not any more; it is **Setup → Agentforce Assets**, and it is **license-dependent**.
2. Saying standard subagents cannot be customized or removed — they can be versioned, customized and deleted.
3. "Topics and subagents are different objects" — same thing, renamed April 2026.
4. Claiming an agent escalates through a standard action rather than the **Escalation subagent** (+ outbound Omni-Channel flow).
5. Expecting repeated escalation attempts — only **one per session**.
6. Testing escalation inside Agentforce Builder.
7. Reusing the stale "delete General FAQ to enable the web-search data library" answer instead of the **Search the Web action / web retriever**.
8. Asserting the one-subagent-per-agent limit on Answer Questions with Knowledge (unconfirmed).
9. Assuming Answer Questions with Knowledge bypasses sharing — it respects the requesting user's access.
10. Putting an action in **reasoning actions** when the scenario demands deterministic execution (that requires **reasoning instructions**).
11. Treating **Off Topic** and **Ambiguous Question** as the same subagent.
12. Assuming the **Setup with Agentforce** agent's subagents can be edited in Builder.

### 3.6 Verdict — Topic 3

**PARTIALLY ENOUGH.** Enough to write solid questions about: the topic→subagent rename, subagent anatomy and the reasoning-instructions vs reasoning-actions distinction, where the standard list lives (Agentforce Assets, license-dependent), the Escalation subagent and its rules, the customer-verification subagent on email, and Answer Questions with Knowledge / General FAQ constraints.

**NOT ENOUGH** to write a question that asks a candidate to pick the exact set of subagents that ships with a named template, or to quote official one-line descriptions of **Off Topic**, **Ambiguous Question**, **Single Record Summary**, **Account Management** or **Order Inquiries**. Those come only from search snippets or third parties.

Missing, and only obtainable from an org or a re-check later:
- The Agentforce Assets subagent list per agent template, with each classification description.
- Whether "Customer Verification" is the literal label (email docs say "user verification subagent").
- Confirmation or removal of the one-subagent Answer Questions with Knowledge limit.
- Which standard subagents are undeletable, if any.

---

## Reference URLs

### Topic 1 — model access
- https://help.salesforce.com/s/articleView?language=en_US&id=ai.agent_setup_select_model_provider.htm&type=5 — Select Agentforce Model Option `[OFFICIAL, rendered]`
- https://developer.salesforce.com/docs/ai/agentforce/guide/get-started-einstein-studio.html — Get Started with AI Models `[OFFICIAL, rendered]`
- https://developer.salesforce.com/docs/ai/agentforce/guide/ascript-model.html — Specify Different Models in Agent Script `[OFFICIAL, rendered]`
- https://help.salesforce.com/s/articleView?language=en_US&id=data.c360_a_ai_foundation_models.htm&type=5 — Bring Your Own Large Language Model `[OFFICIAL, rendered]`
- https://help.salesforce.com/s/articleView?id=sf.c360_a_ai_foundation_models_test.htm&language=en_US&type=5 — Configure and Test a Model in Model Playground `[OFFICIAL, rendered]`
- https://help.salesforce.com/s/articleView?id=data.c360_a_ai_license_perms.htm&language=en_US&type=5 — Set Up AI Models (permissions) `[OFFICIAL, rendered]`
- https://help.salesforce.com/s/articleView?id=release-notes.rn_cdp_2024_summer_ai_model_permissions.htm&language=en_US&release=250&type=5 — Manage AI Models in Einstein Studio (Summer '24) `[OFFICIAL, rendered]`
- https://help.salesforce.com/s/articleView?id=000384050&language=en_US&type=1 — Global Model Opt-Out (distractor) `[OFFICIAL, rendered]`
- https://help.salesforce.com/s/articleView?id=sf.bi_edd_model_manager_model_deactivate.htm&language=en_US&type=5 — Enable or Disable a Model, Einstein Discovery (distractor) `[3P identification, not rendered]`
- https://developer.salesforce.com/docs/ai/agentforce/guide/supported-models.html — Supported Models `[not rendered — 403 to fetcher]`

### Topic 2 — email channel
- https://help.salesforce.com/s/articleView?language=en_US&id=ai.agent_email_parent.htm&type=5 — Connect an Agent to Service Email `[OFFICIAL, rendered]`
- https://help.salesforce.com/s/articleView?id=ai.service_agent_email_configuration.htm&language=en_US&type=5 — Create an Email Configuration `[OFFICIAL, rendered]`
- https://help.salesforce.com/s/articleView?language=en_US&id=ai.service_agent_considerations_1.htm&type=5 — Considerations for Agentforce Service Agent on Email `[OFFICIAL, rendered]`
- https://help.salesforce.com/s/articleView?language=en_US&id=sales.sales_agent_sdr_intro.htm&type=5 — Agentforce Engagement Overview (SDR) `[OFFICIAL, rendered]`
- https://help.salesforce.com/s/articleView?id=service.service_agent_overview.htm&language=en_US&type=5 — Agentforce Service Agent `[OFFICIAL, rendered]`
- https://help.salesforce.com/s/articleView?id=ai.service_agent_messaging.htm&language=en_US&type=5 — Connect a Service Agent to Other Messaging Channels `[not rendered]`
- https://help.salesforce.com/s/articleView?id=sales.sales_agent_sdr_considerations.htm&language=en_US&type=5 — Considerations for Agentforce Lead Nurturing `[not rendered]`

### Topic 3 — subagents
- https://help.salesforce.com/s/articleView?language=en_US&id=ai.agent_topics.htm&type=5 — Subagents `[OFFICIAL, rendered]`
- https://help.salesforce.com/s/articleView?language=en_US&id=sf.copilot_topics.htm&type=5 — Subagents in the Legacy Builder `[OFFICIAL, rendered]`
- https://help.salesforce.com/s/articleView?language=en_US&id=ai.agent_plan_action_identify.htm&type=5 — Identify the Subagents and Actions `[OFFICIAL, rendered]`
- https://help.salesforce.com/s/articleView?language=en_US&id=ai.service_agent_escalation.htm&type=5 — Transfer Conversations with an Omni-Channel Flow `[OFFICIAL, rendered]`
- https://help.salesforce.com/s/articleView?language=en_US&id=ai.agent_setup_explore_types.htm&type=5 — Agent Types and Considerations `[OFFICIAL, rendered]`
- https://help.salesforce.com/s/articleView?language=en_US&id=ai.copilot_actions_ref_answer_questions_with_knowledge.htm&type=5 — Answer Questions with Knowledge `[OFFICIAL, rendered]`
- https://help.salesforce.com/s/articleView?id=ai.data_library_web_search.htm&language=en_US&type=5 — Use Web Search `[OFFICIAL, rendered]`
- https://help.salesforce.com/s/articleView?id=004333412&language=en_US&type=1 — Setup & Troubleshoot Agentforce Data Libraries `[OFFICIAL, rendered]`
- https://help.salesforce.com/s/articleView?id=sf.copilot_ref.htm&language=en_US&type=5 — Agentforce Standard Asset Reference (no longer lists standard topics) `[OFFICIAL, rendered]`
- https://trailhead.salesforce.com/content/learn/projects/quick-start-create-employee-agents-in-agentforce/enable-agentforce-and-review-default-topics-and-actions — Agentforce Assets walkthrough `[OFFICIAL, rendered]`
- https://help.salesforce.com/s/articleView?id=ai.agent_topics_routing.htm&language=en_US&type=5 — Subagent Classification and Routing `[not rendered]`

### Exam guide
- https://help.salesforce.com/s/articleView?id=005298924&language=en_US&type=1 — Salesforce Certified Agentforce Specialist Exam Guide `[OFFICIAL]`
