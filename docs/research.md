# Salesforce Certified Agentforce Specialist — Research Knowledge Base

> Companion file: `research-gaps.md` covers model access management, the email channel and standard subagents, and corrects a few notes below.

Date checked: **2026-09-17**. Prepared as the source of truth for writing ~120 ORIGINAL exam-style practice questions.

Reliability legend used below:
- **[OFFICIAL]** = Salesforce Help, Trailhead, Salesforce developer/architect docs, salesforce.com.
- **[3P]** = reputable third party (SalesforceBen, Gearset, UnofficialSF, etc.). Usually right, but double-check wording.
- **UNVERIFIED** = seen only in low-reliability sources, conflicting sources, or could not be confirmed. Do NOT build a question whose correct answer depends on an UNVERIFIED item.

---

## 0. HEADLINE: the official outline does NOT match the planned sections

The planned sections (AI Agents 35 / Prompt Engineering 20 / Data Cloud for Agentforce 20 / Development Lifecycle 20 / Multi-Agent Interoperability 5) match the **previous** version of the exam (the Oct 2025 refresh aligned to Summer '25; still described that way by SalesforceBen, updated 2026-04-28).

The **current official exam guide** (Salesforce Help article 005298924; the Trailhead exam-guide link redirects there) says questions **align to the Spring '26 release** and uses **six** sections:

| # | Official section (current) | Weight | Maps to planned section |
|---|---|---|---|
| 1 | AI Agents | **35%** | AI Agents (same weight, content now includes Agent Script / hybrid reasoning / Agent API) |
| 2 | Prompt Engineering | **20%** | Prompt Engineering (same) |
| 3 | Data 360 Fundamentals | **20%** | "Data Cloud for Agentforce" (renamed; Data Cloud is now Data 360) |
| 4 | Testing, Deployment, and Maintenance | **10%** | First half of "Development Lifecycle" |
| 5 | Governance and Observability | **10%** | Second half of "Development Lifecycle" (monitoring/analytics) |
| 6 | Multi-Agent Orchestration | **5%** | "Multi-Agent Interoperability" (renamed; Agent API moved to AI Agents) |

**Recommended split for a 120-question bank (proportional to official weights):** AI Agents 42, Prompt Engineering 24, Data 360 Fundamentals 24, Testing/Deployment/Maintenance 12, Governance & Observability 12, Multi-Agent Orchestration 6.

Note: third-party sites currently publish at least four other, contradictory outlines (e.g. "4 x 25%", "Prompt Engineering 30% / Agentforce Concepts 30%...", "Platform knowledge 27%"). Ignore them; they are stale or fabricated.

---

## 1. Exam format facts

| Fact | Value | Source |
|---|---|---|
| Official name | Salesforce Certified Agentforce Specialist (exam code often shown as AI-201 by vendors; formerly "Salesforce Certified AI Specialist") | [OFFICIAL] Help 005298924 |
| Questions | 60 multiple-choice/multiple-select scored + up to 5 unscored | [OFFICIAL] |
| Time | 105 minutes | [OFFICIAL] |
| Passing score | **72%** (SalesforceBen says 73%; other blogs say 65% or 70% — use the official 72%) | [OFFICIAL] |
| Release alignment | Spring '26 | [OFFICIAL] |
| Fee | USD 200 (JPY 30,000), plus applicable taxes | [OFFICIAL] |
| Retake fee | USD 100 (JPY 15,000) | [OFFICIAL] |
| Delivery | Proctored, onsite test center or online | [OFFICIAL] |
| References allowed | None | [OFFICIAL] |
| Prerequisites | None (Platform Administrator and Platform App Builder recommended, not required) | [OFFICIAL] |
| Languages | English, French, Japanese | [OFFICIAL] |
| Recommended prep | Earn Agentblazer Status on Trailhead | [OFFICIAL] |
| Maintenance | Free annual/release maintenance module on Trailhead (a Summer '26 module exists covering Agent Script, Agentforce Grid, Agentforce Observability) | [OFFICIAL] Trailhead |

Target candidate (paraphrased from guide): ~1 year of Salesforce platform configuration experience, hands-on with Data 360, Agent Builder and Prompt Builder; can engineer Agentforce agents, manage their lifecycle, ground them with Data 360, apply governance controls, orchestrate via MCP/A2A, and choose scalable architectures.

Explicitly OUT of scope (good for avoiding bad questions): configuring/fine-tuning LLMs, writing code (Apex, Python), external AI tools, transformer architecture, ROI calculations, Marketing Cloud, Heroku, MuleSoft, Tableau, Slack (as a product to administer), Industries solutions.

Sources: https://help.salesforce.com/s/articleView?id=005298924&language=en_US&type=1 · https://trailhead.salesforce.com/help?article=Salesforce-Certified-Agentforce-Specialist-Exam-Guide · https://trailhead.salesforce.com/credentials/agentforcespecialist · https://www.salesforceben.com/salesforce-agentforce-specialist-certification-guide-tips/ · https://www.salesforceben.com/3-big-changes-to-the-salesforce-agentforce-specialist-certification-you-should-know/

---

## 2. Official outline (objectives, lightly paraphrased from the guide)

### 2.1 Prompt Engineering — 20%
- Given business requirements, identify when Prompt Builder is appropriate.
- Identify access controls governing prompt templates.
- Identify considerations for using a prompt template type (field generation, flex, etc.).
- Given a scenario, identify the appropriate grounding technique.
- Explain the process for creating, activating, and executing prompt templates.
- Explain how to implement best practices for writing effective prompts.
- Identify the security and privacy features of the (Einstein) Trust Layer.
- Explain how to manage and prevent specific models from being accessed.

### 2.2 Data 360 Fundamentals — 20%
- Explain the considerations of Agentforce Data Library and its concepts.
- Explain foundational Data 360 concepts such as chunking, indexing, and retrievers.

### 2.3 AI Agents — 35%
- Explain how an agent works and the basic building blocks of Agent Script.
- Explain the components and benefits of hybrid reasoning (including Canvas view / Script view).
- Given a use case, manage deterministic behavior (filters, variables, template expressions).
- Given a scenario, select and configure standard topics (subagents), custom topics, and standard agent actions.
- Explain the process for connecting agents to channels (digital experiences, email, voice, Slack).
- Explain the security context in which the agent is actually running.
- Given a scenario, identify when to use an Employee agent or a Service agent.
- Given a scenario, identify when it is appropriate to use the Agent API.

### 2.4 Testing, Deployment, and Maintenance — 10%
- Given a scenario, test an agent using Testing Center.
- Explain how Testing Center evaluations work.
- Identify considerations for deploying an agent from sandbox to production.
- Identify considerations for deploying a (prompt) template from sandbox to production.

### 2.5 Governance and Observability — 10%
- Explain the process for managing and monitoring agents.
- Explain agent analytics and agent optimization.

### 2.6 Multi-Agent Orchestration — 5%
- Given a scenario, determine whether a multi-agent architecture is appropriate.
- Explain the purpose of open multi-agent standards such as MCP and A2A.

---

## 3. Current terminology and recent renames (use these names in questions)

| Old / legacy term | Current term | When / notes | Reliability |
|---|---|---|---|
| Salesforce Certified AI Specialist | Salesforce Certified Agentforce Specialist | 2024–2025 | [OFFICIAL] |
| Einstein Copilot | Agentforce (Default) agent → now "Agentforce Employee Agent" | Copilot renamed ~Oct 2024/Jan 2025 | [3P]/[OFFICIAL] Trailhead uses "Agentforce Employee Agent" |
| Agent Builder (Setup) | **Legacy Agentforce Builder**; new builder is **Agentforce Builder** in **Agentforce Studio** | New Agentforce (hybrid reasoning) GA Feb 2026; "New Agent" removed from legacy builder week of **2026-07-13** | [OFFICIAL] architect.salesforce.com, salesforce.com migration page |
| Topics | **Subagents** | Beginning April 2026, "no changes to functionality"; docs show mixed terms during transition | [OFFICIAL] Help "Subagents" |
| Topic Selector | **Agent Router** (Agent Script block `start_agent`) | April 2026 | [OFFICIAL]/[3P] |
| Data Cloud | **Data 360** | Dreamforce, 2025-10-14; product/licensing unchanged | [OFFICIAL]/[3P SalesforceBen] |
| Einstein 1 Platform | Agentforce 360 (Platform) | Oct 2025 | [3P] |
| Einstein Studio | **AI Models** (inside Data 360) — retrievers and models configured there | 2025 | [OFFICIAL] Trailhead ("AI Models (formerly Einstein Studio)") |
| Service Cloud Voice | Salesforce Voice (underlies Agentforce Voice) | 2025–26 | [3P] |
| Messaging for In-App and Web (MIAW) | Enhanced Chat (legacy Chat/Live Agent retiring) | 2025 | [3P] |
| AppExchange | AgentExchange (launched 2025-03-04; unified with AppExchange/Slack Marketplace at TDX April 2026) | [OFFICIAL press] + [3P] |
| Sales Cloud / Service Cloud | Agentforce Sales / Agentforce Service (naming) | Spring '26 | [3P] UNVERIFIED as exam wording |
| Legacy "Agent Analytics" toggle | Agentforce Session Tracing + Agentforce Observability | Legacy toggle marked for retirement starting May 2026 | [3P] |

Writing guidance: prefer "subagent (formerly topic)" on first use, or simply "topic" in legacy-builder scenarios. The exam is aligned to Spring '26, so both terms may appear; avoid questions whose only trick is the rename.

---

## 4. Section facts — AI Agents (35%)

### 4.1 Agent anatomy (legacy and new)
- An agent = role/description + **subagents (topics)** + **actions** + **instructions**, run by the **Atlas Reasoning Engine**, protected by the Einstein Trust Layer. [OFFICIAL]
- **Subagent/topic fields** (legacy builder): Name/Label, **Classification Description**, **Scope**, **Instructions**, assigned **Actions**. [OFFICIAL/3P]
  - The reasoning engine uses the **classification description** (plus agent description) to decide which topic matches the utterance.
  - **Scope** defines what the topic does and does NOT do; it is only considered **after** the topic has been selected.
  - **Instructions** tell the agent how/when to use actions and act as guardrails; live with the topic, not in prompt templates.
  - **Action descriptions/instructions** (and input/output descriptions) are what the LLM reads to pick an action and fill parameters.
- **Reasoning loop (legacy/"Atlas")** [OFFICIAL salesforce.com five-levels guide]:
  1. Subagent (topic) selection: LLM matches utterance to classification descriptions. One topic per utterance, can pivot on the next user input.
  2. Action selection: decide to run an action, ask a clarifying question, or respond.
  3. Agentic loop (ReAct: Reason → Act → Observe → repeat) until intent fulfilled or max LLM calls reached.
  4. Grounding check: response validated against action outputs before sending.
  - A hidden **Off Topic** subagent catches utterances that match no topic.
- **Best-practice sizing** [OFFICIAL five-levels guide]: keep subagents below ~10 for classification quality; ~10 actions max per subagent; ~5–10 instructions per topic; make classification descriptions semantically distinct; put policies in knowledge, not instructions. Older guidance/limits: max 15 topics per agent and 15 actions per topic (SalesforceBen 2024; legacy considerations) — treat hard numbers as **UNVERIFIED** for the new builder.
- **Five (now six) levels of determinism** [OFFICIAL salesforce.com]: 1 instruction-free topic/action selection; 2 agent instructions; 3 data grounding (RAG); 4 agent variables; 5 deterministic actions (Flow/Apex/API); 6 Agent Script (hybrid reasoning).

### 4.2 Hybrid reasoning, new Agentforce Builder, Agent Script
- **Agentforce Builder** (in Agentforce Studio) has **Canvas view** (low-code, document-style blocks) and **Script view** (Agent Script with syntax highlighting + real-time validation). Both views edit the same agent; changes sync. Built-in AI assistance can draft the agent. [OFFICIAL Trailhead]
- **Hybrid reasoning** = separating deterministic execution from LLM reasoning; LLM used only where needed (NL understanding, ambiguity, conversational responses). [OFFICIAL architect.salesforce.com]
  - Problems it solves vs legacy: non-guaranteed routing, many LLM cycles per turn, audit gaps, lost state, loops.
  - Pipeline: **Agent Script (authoring)** → compiled to **Agent Graph** → executed by **Atlas Reasoning Engine** as a state machine.
  - Deterministic nodes (Flow/Apex/API actions, conditionals, variable sets, transitions) run as code with no LLM; nodes with prompt instructions invoke the LLM.
- **Agent Script** [OFFICIAL salesforce.com blog, architect docs, GitHub salesforce/agentscript]:
  - Single-file (`.agent`), indentation-sensitive, YAML/Python-like, block-based DSL. Parser/compiler/linter/language server open-sourced (Apache 2.0); runtime is Salesforce-only. Included with Agentforce at no extra cost.
  - Key blocks: `system` (global instructions/messages), `config` (agent metadata), `variables`, `start_agent` (the entry/router block, "Topic Selector"/Agent Router in Canvas), `topic`/subagent blocks, each with `reasoning` (instructions + actions), optional `before_reasoning` and `after_reasoning`.
  - Two kinds of instructions: **logic instructions** (deterministic: run actions, `if/else`, `set` variables, `transition to`) and **prompt instructions** (natural language lines, typically prefixed with `|`, sent to the LLM). `->` introduces procedural instruction content.
  - `available when <condition>`: platform-enforced gate — the action/transition is not even shown to the LLM unless true. Not a prompt suggestion.
  - `transition to @subagent.x` / `@utils.transition to`: deterministic hand-off between subagents.
  - `run @actions.x with param=value` and `set @variables.y = result...`: deterministic action execution and output binding. `...` lets the LLM fill a parameter from conversation.
  - Template expressions / merge syntax in prompt text: `{!@variables.name}`.
  - Variables: `mutable` (changeable by script/actions), **linked** (bound to an external source such as session/context data or action output; read-only), system variables (e.g. user input). Types: string, number, boolean, list, object (exact list UNVERIFIED).
  - `before_reasoning`: runs at start of each parse before the LLM sees context (auth checks, hydration). `after_reasoning`: runs after reasoning completes (cleanup, deterministic transitions). Caveat: if an action is displayable/returns directly to user, `after_reasoning` may not run. [OFFICIAL architect docs]
  - Action-loop prevention: close the `available when` gate after execution (e.g. `has_run` boolean).
  - Design guidance: never let the LLM set gate variables; script critical paths (authentication at start, compliance at end), keep the middle flexible; don't over-script.
  - Exact keyword spellings vary between sources (`topic` vs `subagent`, `@utils.transition to` vs `transition to`) — avoid syntax-trivia questions; test concepts.
- **Preview/testing in new builder**: Preview panel with **Simulate** mode (mock actions/data, no real changes) and **Live Test** mode (runs real actions), step-by-step **trace** (subagent chosen, actions, variable values, latency), AI-generated interaction summaries. [OFFICIAL Trailhead]
- **Versions (new builder)**: draft → Save → **Commit Version** (immutable snapshot; compiles Agent Script into Bot/GenAi* runtime metadata) → **Activate**. Only one version active at a time; activating one deactivates the previous. Active agents/versions must be deactivated before deletion. [OFFICIAL Trailhead/Help]
- **Legacy builder**: **Plan Canvas / Conversation Preview** shows selected topic, reasoning, prompt, chosen action, inputs/outputs, and response (the "plan tracer"). Legacy agents keep running and remain editable/versionable; migrating via one-click upgrade creates a draft in Agent Script; activating the rebuilt agent auto-deactivates the legacy one. [OFFICIAL]

### 4.3 Deterministic controls in the legacy builder: variables and filters
- **Context variables**: system-provided, typically mapped from the **MessagingSession** (e.g. end-user language, contact/record IDs) when connected to a messaging channel; referenced like `$Context.EndUserLanguage`; **read-only** for the agent/actions (input only). [OFFICIAL five-levels + 3P Aquiva]
- **Custom variables**: builder-defined, session-scoped; types text/boolean/number; can be action inputs and can be **set from action outputs**; can be set via API if "Allow value to be set by API" is enabled. [3P Aquiva / OFFICIAL five-levels]
- **Filters** (introduced ~March 2025): conditions on variables attached to **topics or actions** that hide/prevent them until conditions are met (e.g. `Verified == true` before "Get Order Details"). Deterministic; do not rely on the LLM. [OFFICIAL maintenance module + dev blog]
- Canonical pattern: verification action sets a boolean/customer ID variable → filter gates sensitive actions → Flow/Apex uses the verified ID to scope records (verification alone does NOT restrict data access). [3P SalesforceBen]

### 4.4 Actions
- **Reference action types for custom actions** [OFFICIAL Trailhead/Help]: **Flow** (autolaunched, no trigger), **Apex** (invocable method `@InvocableMethod`, or REST Apex class), **Prompt Template**, **API** (External Services / MuleSoft API / named REST), and (newer) MCP tools via API Catalog.
  - Deterministic: Flow, Apex, API. Non-deterministic: Prompt Template actions.
  - Screen flows and record-triggered flows cannot be agent actions (autolaunched only). [3P]
  - Apex: `@InvocableVariable` descriptions become parameter guidance for the LLM; clear descriptions improve parameter extraction. [3P/OFFICIAL dev guide]
  - Define inputs/outputs up front; action instructions/descriptions drive selection.
- **Action configuration options (legacy)**: action instructions; per-input "Require input" and "Collect data from user"; per-output "Filter from agent action" (hide from LLM) and "Show in conversation" (display to user). [OFFICIAL Help "Create a custom agent action"; exact labels partly UNVERIFIED]
- **Standard actions** (examples) [OFFICIAL "Explore Standard Agent Topics and Actions"]: Answer Questions with Knowledge; Query Records; Identify Record by Name; Get Record Details; Summarize Record; Draft or Revise Email/Sales Email; Select User; Identify Object by Name; Update Record; Create/Close Case; Escalate (Escalation topic action). Exact list varies by release — use well-known ones.
- **Answer Questions with Knowledge**: uses a standard prompt template; grounds on a **Data Library** (Knowledge or files); supported knowledge field types Text, Text Area, Text Area (Long), Text Area (Rich) (not Encrypted Text or URL); file types text, HTML, PDF; **only one topic per agent can use this action** (2025 Help wording; the current Help page no longer states this limit — see `research-gaps.md` §3.4, treat as UNVERIFIED); requires agent user access to Knowledge, "Allow View Knowledge", fields, and the Data 360 data space. [OFFICIAL Help snippet]
- **Standard topics/subagents** (examples): General FAQ, General CRM, Escalation, Off Topic, Ambiguous Question, Single Record Summary, Customer Verification (service templates), Case Management, Order Inquiries (templates). [OFFICIAL/3P] Web-search-based data libraries are deprecated; the Search the Web action replaces them, so the old "remove the General FAQ topic" note no longer applies (see `research-gaps.md` §3.4). The current standard subagent list lives in Setup → Agentforce Assets and depends on the org licenses.

### 4.5 Agent types: Employee vs Service (and sales agents)
- **Agentforce Employee Agent** (formerly Agentforce (Default) / Einstein Copilot): internal users; runs in Lightning Experience (Agentforce panel), Salesforce mobile app, and Slack. Runs **as the logged-in user** — respects that user's profile, permission sets, FLS and sharing. [OFFICIAL Trailhead]
- **Agentforce Service Agent (ASA)**: customer-facing, autonomous, 24/7; channels such as Enhanced Chat (web/in-app), Experience Cloud sites, SMS/WhatsApp/other messaging, email, voice; escalates to humans via Omni-Channel. Runs as a dedicated **agent user** (not the customer). [OFFICIAL]
- **Agentforce Sales Development (SDR) agent**: autonomously nurtures inbound leads via email (and messaging), answers questions/objections, books meetings, hands off to reps; configured with enrollment conditions and outreach schedule; runs as its own user. **Agentforce Sales Coach**: role-plays sales scenarios grounded in opportunity data and gives feedback; requires Data 360. [OFFICIAL Help/Trailhead + 3P]
- Other templates exist (Commerce/Shopper, Field Service, Financial Services, etc.) — keep questions to Employee vs Service decisions.
- Decision rule: internal employee productivity with per-user data visibility → Employee agent; external customers/anonymous visitors, high-volume support deflection → Service agent.

### 4.6 Security context, agent user, permissions
- Service agent creation with "New user" auto-creates an **agent user** with the **Einstein Agent User** profile and **Einstein Agent** license (does not consume a paid seat). [3P SalesforceBen, consistent with OFFICIAL]
- Auto-assigned: permission set group **AgentforceServiceAgentUserPsg** (contains Agentforce Service Agent User, Data Cloud User, Prompt Template User permission sets) plus **Agentforce Service Agent Secure Base** (basic Case/Contact access) and an empty custom permission set named after the agent. [3P SalesforceBen]
- Least privilege: add object/field/Apex class/Flow access to the agent's permission set; missing permissions cause silent "couldn't find that" behavior in production. [3P]
- Running context summary [3P SalesforceBen]: anonymous or verified-but-unauthenticated visitor → runs as agent user; authenticated Experience Cloud user → can run with the end user's permissions (UNVERIFIED as universal rule). Employee agent → always the logged-in user.
- Einstein Trust Layer does NOT fix over-permissioned actions; an Apex action running `without sharing` or a Flow in system context can still expose data. Security of actions = the action's run context + agent user permissions.
- Builder/admin permissions: "Manage AI Agents" (Agentforce admin), "Customize Application"; Prompt Template Manager for prompt authoring. Exact permission names for new Agentforce Studio roles: UNVERIFIED.

### 4.7 Channels and escalation
- **Enhanced Chat (Messaging for In-App and Web)** via Embedded Service Deployment on websites or **Experience Cloud** sites; route the messaging channel via **Omni-Channel Flow** with routing type "Agentforce Service Agent" (or connect in the agent's Connections tab) and set a **fallback queue**. Legacy Chat/Live Agent is being retired and isn't the target channel. [OFFICIAL/3P UnofficialSF]
- Context variables become available when connected to a messaging channel (MessagingSession fields).
- **Escalation to human**: agent uses the **Escalation** subagent/topic; on enhanced messaging channels it transfers via an **outbound Omni-Channel flow** configured on the agent's connection (route to a queue/skill/agent). Voice and email have their own escalation paths. [OFFICIAL Help "Transfer Conversations from an Agent with an Omni-Channel Flow"]
- **Email**: Service agents can be connected to Service email (Email-to-Case style) — Help: "Connect an Agent to Service Email" / "Add Agentforce Service Agent to Email". Details UNVERIFIED.
- **Voice**: **Agentforce Voice** runs on Salesforce Voice (formerly Service Cloud Voice) with Amazon Connect or partner telephony; requires Agentforce + voice licenses; new builder only for new voice features. [3P + OFFICIAL migration page]
- **Slack**: connect Salesforce org to Slack workspace, install the Agentforce Slack app, map users; Slack admins approve/deploy agents per workspace; employee agents are the typical Slack use case (members @mention agents or DM them); Slack users without a full CRM license may use a lighter identity license. Whether service agents are supported in Slack: UNVERIFIED (one source says Employee only).
- **Bring Your Own Channel (BYOC)** for CCaaS/partner messaging, and the **Agent API** for custom/headless channels.

### 4.8 Agent API
- REST API to talk to an agent **headlessly** from custom apps (mobile app, custom website, backend system, other platforms). Session-based: create session (POST `/einstein/ai-agent/v1/agents/{agentId}/sessions` on api.salesforce.com), send messages (**synchronous** or **streaming via Server-Sent Events**), end session. [OFFICIAL dev guide via search + 3P]
- Auth: **External Client App** (or connected app) with **OAuth client credentials flow**, a run-as user, and scopes including api, refresh_token/offline, chatbot_api, sfap_api. [3P]
- **Not supported for the Agentforce (Default)/Employee copilot agent**; use a Service-type (or other supported) agent that is active. [3P, consistent across sources]
- Use Agent API when the channel is not a supported native channel, or for system-to-system invocation; use Enhanced Chat/Experience Cloud for standard web chat; use Flow/Apex "Invoke Agent" actions for in-org automation (Apex/Flow can invoke agents too). [OFFICIAL dev blog 2025/04]

---

## 5. Section facts — Prompt Engineering (20%)

### 5.1 Prompt Builder basics
- Prompt Builder (Setup) lets admins build, test, and manage reusable **prompt templates** grounded in CRM/Data 360 data, executed through the Einstein Trust Layer. [OFFICIAL Trailhead]
- **Template workspace**: Prompt editor; **Resolution** (resolved prompt with merged data, masked values shown) and **Response** (LLM output) previews for a chosen record. [OFFICIAL]
- **Versions**: "Save as New Version" vs "Save as New Template" (new API name). **Only one active version**; the active version is what other features use. Activated versions are immutable — edit by creating a new version. Each version can carry its own model configuration. [OFFICIAL/3P]
- Limits seen: template max ~128,000 chars, 50 versions, 50 merge fields — **UNVERIFIED** (single 3P source).

### 5.2 Template types (know what each does and where it runs)
| Type | Purpose / where used | Key considerations |
|---|---|---|
| **Sales Email** | Drafts personalized emails from record data; invoked in the email composer (Einstein "draft with" button) and usable in agent actions | Standard inputs: Recipient (Contact/Lead) and optional related object; sender = current user. [OFFICIAL Trailhead] |
| **Field Generation** | Populates a specific field on a record page with AI content via an Einstein button on the field | Tied to **one object** and one target field (writable Text, Text Area, Long, Rich); requires **Dynamic Forms** (Record Detail must be upgraded) and assigning the template in the field's properties in Lightning App Builder. [OFFICIAL Trailhead] |
| **Record Summary** | Rich-text summary of a record; used by agent "Summarize Record" style actions / record summaries | Single-record context. [OFFICIAL Trailhead] |
| **Flex** | Any use case not covered by other types; **you define the inputs** (up to **5** inputs of object or text types) | Most common type for custom agent prompt actions and multi-object prompts. [OFFICIAL Trailhead] |
| **Knowledge Answers** | Customizes how agents answer questions from knowledge (used by Answer Questions with Knowledge) | [3P/OFFICIAL Help snippet] |
| **Record Prioritization** | Prioritizes a list of records (employee agent use) | [3P] — lower-confidence; avoid as correct answer |
| Service-specific (e.g. Service Replies/Work Summaries, Case summary) | Standard templates for Service features | [OFFICIAL] |

Standard (Salesforce-provided) templates can be **overridden/customized**; deactivating the original version of a standard template deactivates overrides. [OFFICIAL Help snippet]

### 5.3 Grounding techniques (choose the right one)
- **Merge fields / record fields**: `{!$Input:Recipient.Title}`, `{!$Input:Sender.Name}`; related-object fields; **related lists** (e.g. last N related records). Simple, no code. [OFFICIAL]
- **Flow**: **Template-Triggered Prompt Flow** type; uses Get Records + **Add Prompt Instructions** element to build text; referenced as a flow merge field. For filtering/looping/conditional data assembly without code. [OFFICIAL Trailhead/3P]
- **Apex**: `@InvocableMethod` with **CapabilityType** matching the template type (e.g. `PromptTemplateType://einstein_gpt__salesEmail` / flex), returns a `Prompt` string; referenced like `{!$Apex:ClassName.Prompt}`. For complex logic or external callouts. [OFFICIAL Trailhead]
- **Data 360 / retrievers**: `{!$EinsteinSearch:...results}` — ground on unstructured content via search index + retriever (RAG); default dynamic retriever or custom retriever. [OFFICIAL/3P SalesforceBen]
- **Data 360 DMOs / related attributes** and **Data Graphs** for unified profile data. [3P]
- Decision heuristics for questions: same-record fields → merge fields; related child records → related list; conditional logic/aggregation without code → Flow; external API/complex logic → Apex; unstructured documents/knowledge semantic search → retriever/Data Library.

### 5.4 Access controls / permissions
- **Prompt Template Manager** permission set: create/edit/manage templates in Prompt Builder (needed even to see Prompt Builder in Setup). **Prompt Template User**: run/use templates, not manage. [3P, consistent]
- Einstein Generative AI must be enabled (Einstein Setup); Data 360 provisioned for Trust Layer audit/masking and retrievers. [OFFICIAL]
- Users running a template only see data they have access to (secure data retrieval honors object/field permissions and sharing). [OFFICIAL]
- Agent user for service agents gets Prompt Template User through the auto PSG. [3P]
- Retriever creation requires AI Models manage permission or Data 360 Admin/architect role. [OFFICIAL maintenance module]

### 5.5 Creating, activating, executing
- Create (type, name/API name, object/inputs) → write instructions + insert resources → preview with a record (Resolution/Response) → **Save** → **Activate** → use.
- Execution surfaces: Einstein buttons (field generation, email composer), **agent actions** (Prompt Template reference action), **Flow** (prompt template invocable action), **Apex** (`ConnectApi.EinsteinLLM.generateMessagesForPromptTemplate`), **REST/Connect API**, Lightning web components via Apex. [OFFICIAL/3P]
- Model selection per template (Salesforce-managed default models from OpenAI/Anthropic/Google, BYO LLM configured models); temperature/hyperparameters set via configured models in AI Models (Einstein Studio). [OFFICIAL/3P]

### 5.6 Managing/preventing model access (objective 8)
- **AI Models (formerly Einstein Studio) → Model Library/Models**: Salesforce-managed models are enabled by default; admins create **configured models** (named instance of a foundation model with custom hyperparameters) and **BYO LLM** connections (OpenAI, Azure OpenAI, Google Gemini/Vertex, Anthropic on Bedrock, LLM Open Connector). [OFFICIAL dev guide/3P]
- The default model for agents can be changed from the Agentforce Agents Setup page; per-subagent model selection exists in the new builder. [OFFICIAL/3P]
- Mechanism to **deactivate/turn off specific models** so they can't be selected in Prompt Builder/agents: exists per the exam objective, but exact UI name could not be confirmed — **UNVERIFIED**. Safe question angle: "control which LLM a template uses via a configured model in AI Models, and remove/deactivate models you don't want used; deployment fails if target org lacks a model with the same name."

### 5.7 Einstein Trust Layer (security/privacy features)
**Prompt journey** [OFFICIAL Trailhead "Follow the Prompt Journey"]:
1. **Prompt template** with placeholders.
2. **Secure data retrieval** — only data the running user can access (object/field permissions, sharing).
3. **Dynamic grounding** — merge fields, page context, knowledge articles fill the template.
4. **Data masking** — sensitive values tokenized (placeholders) using pattern matching + ML/context; defaults mask Name, Email, Phone, Credit Card, US SSN; configured in Setup > Einstein Trust Layer; format validation (invalid values aren't masked). **Masking is currently DISABLED for agents** (applies to embedded gen-AI features and Prompt Builder previews/Sales Emails, etc.). [OFFICIAL]
5. **Prompt defense** — system policies (guardrail instructions) added to reduce hallucinations, jailbreaks, prompt injection.
6. **Secure LLM gateway** — prompt sent to the model.
7. **Zero data retention** — contractual agreements with third-party LLM providers: prompts/responses not retained or used for training.

**Response journey** [OFFICIAL Trailhead]:
1. **Toxicity detection/scoring** — categories violence, sexual, profanity, hate, physical (plus overall); scores 0–1 (higher = more toxic); returned with response; flagging, not a hallucination fix.
2. **Data demasking** — placeholders replaced with original values.
3. **Feedback framework** — accept/edit/reject, thumbs up/down with reasons.
4. **Audit trail** — timestamped prompts, masked prompts, responses, toxicity scores, feedback stored in **Data 360** DMOs (GenAIGatewayRequest, GenAIGatewayResponse, GenAIGeneration, GenAIFeedback...) once "data collection for audit and feedback" is enabled; consumes Data 360 credits. [OFFICIAL Help snippets/dev blog]

Trust Layer traps: it does NOT prevent all hallucinations; does NOT replace permissions/sharing; masking not applied to agents; zero retention applies to external LLM providers; audit requires Data 360.

### 5.8 Prompt-writing best practices [OFFICIAL Help "Best Practices for Building Prompt Templates" + Trailhead]
- Assign a role/persona; state audience, goal, format, tone, length limits.
- Give clear, specific, ordered instructions; use examples when helpful.
- Add guardrails ("don't guess if data is missing", "only use provided data").
- Ground with relevant data, avoid dumping unnecessary fields (token cost, confusion).
- Test with multiple records (edge cases, missing data) using Resolution/Response preview; iterate via versions.
- Evaluate responses for relevance, completion, tone, factual accuracy, repetition, toxicity, bias.

---

## 6. Section facts — Data 360 Fundamentals (20%)

### 6.1 RAG in Salesforce
- **RAG** = retrieve relevant chunks from indexed content at run time and add them to the prompt, instead of fine-tuning. Pipeline: ingest (data stream → DLO/UDLO) → map (DMO/UDMO) → **chunk** → **vectorize (embed)** → **search index** → **retriever** → prompt template / agent action → LLM. [OFFICIAL Trailhead]
- Unstructured data lands in **Unstructured Data Lake Objects (UDLO)** / **UDMOs**; search index creates chunk DMO and index/vector DMO. [OFFICIAL Trailhead]

### 6.2 Agentforce Data Library (ADL)
- Purpose: fastest way to ground agents in unstructured content with automated setup. [OFFICIAL]
- **Sources**: Salesforce **Knowledge** articles, **uploaded files**, **web search** (external web content, Summer '25), and **custom retrievers** (point a library at an existing Data 360 retriever). Library type choice (Knowledge vs files) is **permanent** once saved. [OFFICIAL Trailhead/maintenance]
- **File limits**: text/HTML up to **4 MB**, PDF up to **100 MB**. [OFFICIAL Trailhead]
- **On save, automatically**: pushes data streams to Data 360, creates/maps data objects, creates a **search index** and a **retriever** (and wires the standard Answer Questions with Knowledge prompt). Processing takes time. [OFFICIAL]
- Knowledge libraries: choose **identifying fields** (help locate the right article) and **content fields** (text used for answers); can show citations/sources. [3P/OFFICIAL]
- Assign in the agent's Knowledge/Data section (legacy Agent Builder "Data Library" field); used via Answer Questions with Knowledge (one topic per agent). [OFFICIAL]
- Requirements: Data 360 provisioned; agent user needs Knowledge access and data space access; data space typically **default**. [OFFICIAL Help snippet]
- Testing Center can AI-generate up to **100** test cases from a data library. [OFFICIAL maintenance module]

### 6.3 Search indexes
- **Vector (semantic) search index**: chunks → embeddings → nearest-neighbor semantic similarity; good for longer natural-language questions; handles synonyms/paraphrase; weaker on exact codes/SKUs/product names. [OFFICIAL Trailhead]
- **Hybrid search index**: runs **keyword** + **vector** search, fuses and ranks results (fusion ranker); best for long queries with **domain-specific terms**, product codes, acronyms; returns keyword, vector and hybrid scores. [OFFICIAL]
  - Ranking options: Reciprocal Rank Fusion (RRF), Linear Fusion Ranker, Deep Fusion Ranker; ranking factors like recency/popularity; up to **10 prefilter fields** set at index creation. [OFFICIAL Trailhead hybrid-search]
- **Enriched index** (option on vector/hybrid): LLM generates metadata chunks and question chunks (keywords, entities, summaries, questions) for higher accuracy at extra cost (Flex Credits). [OFFICIAL]
- Keyword-only search exists conceptually (and in Salesforce search) but the Data 360 index types to know are vector and hybrid.
- Setup paths: **Easy/basic setup** (defaults) vs **Advanced setup** (choose fields to chunk, chunking strategy, embedding model, filter fields). Status: Submitted → In Progress → Ready. [OFFICIAL]

### 6.4 Chunking and embeddings
- **Chunking** splits documents into passages small enough to embed and fit in prompts while keeping meaning. Too large → diluted relevance/token cost; too small → lost context. [OFFICIAL blog]
- Built-in strategies: **Passage Extraction** (semantic-based, uses HTML structure like headings, lists, bold as boundaries; window-based for plain text/paragraphs) and **Section-Aware chunking** (preserves document sections; e.g. website pattern uses max tokens with zero overlap and **title prepending**). Custom chunking via **Data 360 Code Extension**. **Intelligent Context** (smart defaults, LLM-based parsing of complex docs incl. images/tables) is the recommended starting point. [OFFICIAL salesforce.com blog/Trailhead]
- Chunk **overlap** helps when information crosses boundaries; add metadata (titles, URLs, dates, product) to disambiguate and filter. [OFFICIAL blog]
- Embedding models: Salesforce-provided (e.g. Salesforce Embedding V2 Small; multilingual E5 variants historically) — pick one supporting your chunk size/language. Exact model list **UNVERIFIED**.

### 6.5 Retrievers
- A **retriever** queries a search index (or web data) and returns relevant results to augment a prompt; configured in **AI Models (formerly Einstein Studio)**. [OFFICIAL]
- **Default retriever**: auto-created with each search index; returns many fields. **Custom (individual) retriever**: one search index; configure **filters** (up to **10** conditions, AND/OR, Text/Number fields; static or dynamic values), **fields to return** (e.g. Chunk, SourceRecordId), **number of results** (e.g. default 20), citations, and advanced options (query transformation, result summarization). Each edit creates a **new version**; activate before use. [OFFICIAL maintenance module/3P SalesforceBen]
- **Ensemble retriever**: combines/ranks results from multiple individual retrievers so the prompt references one retriever. [3P, consistent]
- Dynamic retriever reference in templates: `{!$EinsteinSearch:sfdc_ai__DynamicRetriever.results}`; replace with custom retriever to control results. Test retrievers in Prompt Builder before wiring into agents. [3P SalesforceBen]
- Retrievers must exist (be deployed) before a dependent prompt template deploys. [3P Gearset]

### 6.6 Data model, data spaces, zero copy
- **Data streams** ingest into **DLOs**; mapped to **DMOs** (canonical model, e.g. Individual, Unified Individual); identity resolution creates unified profiles; **calculated insights**, **data graphs** for fast agent/prompt lookup. [OFFICIAL]
- **Data spaces** logically partition data, metadata, and permissions within a Data 360 org (e.g. by brand/region); search indexes/retrievers live in a data space; agent users need access to the relevant data space. [OFFICIAL]
- **Zero Copy** (federation) lets Data 360 query external lakes (Snowflake, Databricks, BigQuery, Redshift) without duplicating data; agents can be grounded on that data. [OFFICIAL Trailhead]
- Data 360 also stores Trust Layer audit/feedback and agent session tracing (observability) data. [OFFICIAL]
- Trap: Data 360 is NOT required for every basic agent (CRM records, Flow/Apex actions work without it), but IS required for Data Library, retrievers/RAG, audit trail, observability/session tracing, Sales Coach. [3P + OFFICIAL]

---

## 7. Section facts — Testing, Deployment, and Maintenance (10%)

### 7.1 Testing Center
- **Agentforce Testing Center**: batch-test agents at scale; compare actual vs expected **topic/subagent**, **actions**, and **response/outcome**. [OFFICIAL]
- **Test case sources**: (a) **AI-generated** from selected topics/actions (with a description of purpose/scope), (b) AI-generated from **data library** content (max **100**), (c) **CSV upload** using the downloaded `testing_template.csv`. Up to **1,000** test cases per test; up to **10 test jobs in a 10-hour window** (Summer '25 note). [OFFICIAL maintenance module]
- **CSV columns**: Utterance (required) + at least one of Expected Topic (API name), Expected Actions (list of action **API names** in brackets/quotes), Expected Response (natural-language description of what the answer should contain). Use **API names, not labels**; **empty expected values are treated as failures**. [OFFICIAL Trailhead]
- Tests can set **context variables** (test conditions) and conversation history (newer). [OFFICIAL]
- **Evaluations**: topic assertion, action assertion, response/outcome evaluation (LLM-as-judge comparing actual to expected response, so wording need not match exactly), plus quality metrics **coherence, completeness, conciseness, latency (ms), instruction adherence, factuality**; **custom evaluations** check responses/action outputs for specific strings or numbers. [OFFICIAL dev guide snippets]
- **Run tests in a sandbox**: tests execute real actions and can modify CRM data; tests consume requests/credits in any org. [OFFICIAL]
- Permissions (legacy): Manage AI Agents + agent-type permissions (System Admin), or Customize Application. [OFFICIAL Trailhead]
- Pro-code: **Agentforce DX** `sf agent generate test-spec` (YAML test spec) → deploy as **AiEvaluationDefinition** metadata → `sf agent test run` (CI/CD). [OFFICIAL dev guide]
- Complementary tools: Agentforce Builder preview (Simulate/Live Test, trace), Plan Canvas (legacy), Agentforce Grid (spreadsheet-style bulk testing/AI workflows), Testing API.

### 7.2 Deploying agents (sandbox → production)
- Metadata (API v60+): **Bot** + **BotVersion** (agent container — must be included or agent is invisible), **GenAiPlannerBundle** (agent reasoning definition; replaced GenAiPlanner in API 64+), **GenAiPlugin** (topic/subagent), **GenAiFunction** (action), **GenAiPromptTemplate**, **AiEvaluationDefinition** (tests), context/conversation variables; **AiAuthoringBundle** (contains the Agent Script `.agent` file) for new-builder agents. [OFFICIAL dev guide + 3P Gearset]
- Include dependencies first: custom objects/fields, Apex, Flows, named credentials, retrievers, prompt templates → actions → topics → planner. Nothing may reference a component that isn't already in the target or in the same deployment. [3P]
- Tools: **change sets** (related orgs only; need Deploy Change Sets + Modify Metadata; 75% Apex coverage), **Metadata API/Salesforce CLI (sf project deploy)**, **DevOps Center**, **unlocked/managed packages**, 3P tools (Gearset, Copado). [OFFICIAL maintenance module]
- New builder pro-code flow: keep AiAuthoringBundle in source control → deploy → `sf agent publish authoring-bundle` (equivalent to Commit Version; generates Bot/GenAi* metadata) → activate. [OFFICIAL dev guide]
- **Doesn't carry over / post-deploy checklist**: agent activation state (activate in target), agent user + permission set assignments (agent user is org-specific), prompt template activation, Flow version activation, data library content/indexing and Data 360 config (use data kits), channel/Embedded Service deployment publishing, Omni-Channel routing, MCP registrations. Deactivate the agent in the source before deploying (recommended in 3P guides). Target org must have Einstein/Agentforce/Data 360 enabled and licenses. [OFFICIAL Trailhead deployment module + 3P]
- SDR/Sales Coach agents may not support Metadata API deployment (configure per org) — **UNVERIFIED**.
- Versions: create a new version to change an active agent without disrupting production; only one active version. Legacy note: up to 20 versions per agent — **UNVERIFIED** for current release.

### 7.3 Deploying prompt templates [OFFICIAL Help "Deployment Considerations for Prompt Templates" snippets]
- Can be deployed via change sets, CLI/Metadata API, and packages (managed, unmanaged, unlocked).
- A published (activated) template version can't be modified and is **skipped** on deployment if it already exists.
- If a template is overridden, it can't be overridden again via change set/CLI/Connect API.
- Custom LLM config: target org must have a model with the **same name**, or deployment fails.
- A version does **not auto-activate** in the target org unless the **Deploy Prompt Templates** permission is enabled there — plan to activate after deploy.
- Dependencies (fields for Field Generation, Flows, Apex, retrievers) must exist or deploy together; known issue with Flow+Apex dependencies requiring separate deployments. [3P Gearset]

---

## 8. Section facts — Governance and Observability (10%)

- **Agentforce Observability** (announced Dreamforce 2025; Agent Analytics & Agent Optimization GA ~Nov 2025 / broadly April 2026; **Agent Health Monitoring** GA Spring '26): [OFFICIAL salesforce.com news]
  - **Agent Analytics**: dashboards/KPI trends of agent usage and effectiveness (sessions, deflection/escalation, abandonment, user feedback, task resolution rate, instruction adherence rate, average toxicity score); identifies ineffective topics/actions; built on Tableau Next/semantic model. [OFFICIAL + maintenance module]
  - **Agent Optimization**: step-by-step reasoning trace of every session; groups similar requests into "moments"/intent clusters; quality scoring; pinpoints configuration issues (bad topic routing, missing instructions). [OFFICIAL]
  - **Agent Health Monitoring**: near real-time health metrics (errors, latency), alerts on silent failures/spikes. [OFFICIAL]
  - **Session Tracing Data Model**: logs user inputs, responses, reasoning steps, LLM calls, guardrail checks into **Data 360**; OpenTelemetry-compatible export to Datadog/Splunk etc. [OFFICIAL/3P]
  - Setup: Data 360 required; Setup > **Einstein Audit, Analytics, and Monitoring Setup** → enable Agentforce Session Tracing / Agent Optimization; install Employee/Service Agent Analytics. **No backfill** — only sessions after enablement are captured. [3P]
- **Legacy Agentforce Analytics**: CRM Analytics-based dashboards on Einstein gen-AI audit & feedback data (adoption, acceptance, toxicity, masking). **Utterance Analysis** dashboard (Agentforce (Default)/employee folder) tracks user inputs and response types, refreshed **weekly**. [OFFICIAL Help/Trailhead snippets]
- **Einstein Generative AI Audit and Feedback** data in Data 360 (see 5.7) underpins governance reporting. [OFFICIAL]
- **Agentforce Command Center** (Summer '25): real-time monitoring of agent performance/health in Service. [3P]
- **MuleSoft Agent Fabric**: register, govern, and observe agents regardless of where built (multi-vendor governance). [OFFICIAL]
- Governance practices to test: least-privilege agent users; filters/Agent Script gates; Trust Layer settings; monitoring toxicity/feedback; adoption monitoring (who uses, acceptance rate); iterate via new versions + Testing Center regression before activation.

---

## 9. Section facts — Multi-Agent Orchestration (5%)

- **When multi-agent is appropriate**: a single agent is overloaded (too many semantically overlapping subagents/actions hurting routing), distinct domains/teams own separate capabilities, different security contexts/agent users are needed, or tasks require agents on other platforms. Overkill for a small, single-domain use case (adds latency/cost/complexity). [OFFICIAL salesforce.com + 3P]
- **Orchestrator (supervisor) pattern**: a primary agent is the single entry point, determines intent, delegates to specialist agents, maintains context, returns results. Atlas routes using each agent's **description, instructions, and actions** — precise, bounded descriptions ("handles X, not Y") are critical. In Agentforce Builder: Connect Agent as Subagent (Beta in some sources; one source says GA June 2026 — status **UNVERIFIED**). [OFFICIAL/3P]
- **MCP (Model Context Protocol)**: open standard (originated by Anthropic) for connecting AI agents/apps to **tools, resources, and prompts** exposed by MCP servers — agent-to-tool/context. Agentforce acts as a **native MCP client** (Agentforce 3, June 2025; pilot → beta); MCP servers registered/governed through **API Catalog** (including MuleSoft-built servers) become agent actions. **Salesforce Hosted MCP Servers** (GA April 2026) expose Salesforce data/Flows/Apex/Named Queries to external AI clients. [OFFICIAL dev blog/salesforce.com]
- **A2A (Agent2Agent) protocol**: open standard launched by Google (April 2025), now under the Linux Foundation, for **agent-to-agent** communication across platforms: client agent delegates tasks to remote agent; **Agent Card** advertises capabilities; tasks, messages, artifacts; stateful. Agentforce supports A2A so a primary agent can delegate to third-party agents. [OFFICIAL salesforce.com]
- **MCP vs A2A** (core exam contrast): MCP = connect an agent to tools/data/context; A2A = connect agents to other agents (peer delegation). Agent API = Salesforce-specific REST to converse with one Agentforce agent from a custom app.
- **AgentExchange**: Salesforce marketplace (launched 2025-03-04) for partner **actions, topics, prompt templates, agent templates**, and MCP servers/components; 200+ launch partners. [OFFICIAL press]

---

## 10. Common question patterns and traps (described in our own words)

### AI Agents
- Scenario: an internal sales rep needs account summaries respecting their own visibility → Employee agent (trap: Service agent or "create an agent user for the rep").
- Scenario: anonymous website visitors asking order status → Service agent on Enhanced Chat with verification + filters (trap: Employee agent; Einstein Bots; legacy chat).
- "Agent picks the wrong topic" → improve **classification description** / reduce overlap (traps: add more instructions, raise temperature, edit scope — scope is read only after selection).
- "Agent must always verify identity before sensitive action" → deterministic control: filter/variable or Agent Script `available when`/`before_reasoning` (trap: "add an instruction saying ALWAYS verify" — probabilistic).
- "Action returned data the customer shouldn't see" → agent user permissions / action's sharing context / scope query by verified ID (trap: Trust Layer masking would prevent it).
- Which action type for multi-step deterministic logic without code → autolaunched Flow (traps: screen flow, record-triggered flow, prompt template).
- Canvas vs Script view: same agent, synced — trap claiming Script view creates a separate agent or requires a developer license.
- Agent API vs Enhanced Chat vs Experience Cloud: custom mobile app or external system → Agent API; trap: using Agent API with Agentforce (Default)/employee agent.
- Escalation: need Escalation topic + Omni-Channel outbound flow/queue on a messaging channel (trap: "escalation works automatically without routing config").
- Context vs custom variables: context = read-only session data from MessagingSession; custom = settable by actions (trap reversing these).
- Legacy vs new builder: new agents must be created in the new Agentforce Builder (after July 2026) — exam is Spring '26 aligned, so avoid date-specific trivia.

### Prompt Engineering
- Pick template type: populate a field on record page → Field Generation (trap: Flex); draft email to a contact → Sales Email; custom multi-input or agent action prompt → Flex; summarize a record → Record Summary.
- Field Generation button not visible → page must use Dynamic Forms and field configured with template; user needs Prompt Template User; template must be active.
- Grounding choice: related records → related list merge field; complex filtering without code → Template-Triggered Prompt Flow; external API → Apex; PDFs/knowledge → retriever/Data Library (trap: pasting documents into the prompt).
- "User can run but not create templates" → Prompt Template User vs Manager confusion.
- Trust Layer traps: masking does not apply to agents; zero data retention ≠ Salesforce stores nothing (audit trail is stored in Data 360 if enabled); toxicity scoring flags but doesn't guarantee accuracy; Trust Layer doesn't bypass/replace FLS and sharing; prompt defense = system policies.
- Versioning: editing an active version → must save a new version and activate (trap: edit active version in place).
- Model control: specify model per template via configured models; deployment fails if target lacks model with same name.

### Data 360 Fundamentals
- Keyword-heavy domain terms (SKUs, error codes) + natural language → hybrid index (trap: vector only).
- Conceptual/paraphrased questions → vector search.
- Irrelevant/too-broad results → adjust chunking (size/overlap/section-aware), add retriever filters, reduce fields/number of results (trap: switch LLM model or raise temperature).
- Quick RAG without manual setup → Agentforce Data Library (auto data stream, index, retriever) (trap: manually building search index first).
- File too large/unsupported type in Data Library (PDF ≤100 MB, text/HTML ≤4 MB).
- Retriever edits don't show → new retriever version must be activated.
- Data spaces: agent user lacks data space access → no results.
- "Data 360 required for every agent" is a trap.

### Testing, Deployment, Maintenance
- Where to run Testing Center → sandbox (trap: production because "real data").
- CSV failures → used labels instead of API names, or blank expected columns treated as failures.
- Response evaluation is semantic (LLM judge), not exact string match; use custom evaluations for exact strings/numbers.
- Agent invisible after deployment → Bot/BotVersion missing.
- Post-deploy: agent inactive, agent user/perm sets not assigned, prompt template not activated, flows inactive, embedded deployment unpublished.
- Change sets only between related orgs; packages for unrelated orgs/ISVs.

### Governance & Observability
- Why did the agent choose X? → Agent Optimization / session trace (or Plan Canvas in builder) (trap: Agent Analytics dashboards).
- Trend KPIs/adoption over time → Agent Analytics / legacy Agentforce Analytics & Utterance Analysis.
- Real-time error/latency alerts → Agent Health Monitoring.
- Historical data missing after enabling tracing → no backfill.
- Where is audit/trace data stored → Data 360.

### Multi-Agent Orchestration
- Connect agent to an external tool/data source using open standard → MCP; delegate to a third-party agent (e.g. on another cloud) → A2A; custom app chatting with agent → Agent API; find prebuilt partner actions/templates → AgentExchange.
- Single small use case → single agent is better (trap: always use multi-agent).
- Poor delegation → improve specialist agent descriptions (trap: add more actions to orchestrator).

Unreliable content warning: several public "study guides" (e.g. some Salesforce Dictionary blog posts, dump sites) contain invented facts (mandatory superbadge prerequisites, "topic priority field", made-up passing scores). Don't import facts from them.

---

## 11. Reference URLs (cite these)

### Exam / prep
- Official exam guide: https://help.salesforce.com/s/articleView?id=005298924&language=en_US&type=1
- Credential page: https://trailhead.salesforce.com/credentials/agentforcespecialist
- Summer '26 maintenance module: https://trailhead.salesforce.com/content/learn/modules/agentforce-specialist-certification-maintenance-summer-26
- Summer '25 maintenance (Testing Center, filters, data library facts): https://trailhead.salesforce.com/content/learn/modules/agentforce-specialist-certification-maintenance-summer-25
- SalesforceBen exam guide (previous 5-section outline): https://www.salesforceben.com/salesforce-agentforce-specialist-certification-guide-tips/
- SalesforceBen "3 big changes": https://www.salesforceben.com/3-big-changes-to-the-salesforce-agentforce-specialist-certification-you-should-know/

### AI Agents
- Hybrid reasoning / Agent Script (architect): https://architect.salesforce.com/docs/architect/fundamentals/guide/hybrid-reasoning-agentforce-builder-agent-script
- New Agentforce Builder (Trailhead): https://trailhead.salesforce.com/content/learn/modules/new-agentforce-builder-quick-look/explore-the-new-agentforce-builder
- Agent Script developer guide: https://developer.salesforce.com/docs/ai/agentforce/guide/agent-script.html
- Agent Script blocks: https://developer.salesforce.com/docs/ai/agentforce/guide/ascript-blocks.html
- Agent Script control-plane blog: https://www.salesforce.com/blog/agent-script-control-plane/
- Agent Script open source: https://github.com/salesforce/agentscript
- Levels of determinism guide: https://www.salesforce.com/agentforce/five-levels-of-determinism/
- Subagents (formerly topics): https://help.salesforce.com/s/articleView?language=en_US&id=ai.agent_topics.htm&type=5
- Standard topics and actions: https://help.salesforce.com/s/articleView?id=sf.copilot_ref.htm&language=en_US&type=5
- Answer Questions with Knowledge: https://help.salesforce.com/s/articleView?language=en_US&id=ai.copilot_actions_ref_answer_questions_with_knowledge.htm&type=5
- Custom agent actions (Trailhead): https://trailhead.salesforce.com/content/learn/modules/agent-customization-quick-look/customize-your-agents
- Variables and filters (dev blog): https://developer.salesforce.com/blogs/2025/04/control-agent-access-and-decision-making-with-variables-and-filters
- Filters Help: https://help.salesforce.com/s/articleView?id=ai.agent_asset_filters.htm&language=en_US&type=5
- Agent user best practices: https://help.salesforce.com/s/articleView?language=en_US&id=ai.agent_user.htm&type=5
- Agent permissions explained: https://www.salesforceben.com/agentforce-permissions-explained-agent-users-access-and-security/
- Employee agents (Trailhead): https://trailhead.salesforce.com/content/learn/modules/agentforce-for-employees-quick-look/get-started-with-agentforce-for-employees
- Agentforce Service Agent overview: https://help.salesforce.com/s/articleView?id=service.service_agent_overview.htm&language=en_US&type=5
- Escalation via Omni-Channel flow: https://help.salesforce.com/s/articleView?language=en_US&id=ai.service_agent_escalation.htm&type=5
- Connect agent to Service email: https://help.salesforce.com/s/articleView?language=en_US&id=ai.agent_email_parent.htm&type=5
- Slack deployment (Trailhead): https://trailhead.salesforce.com/content/learn/modules/agentforce-configuration-for-slack-deployment/deploy-an-agent-in-slack
- Agent API get started: https://developer.salesforce.com/docs/ai/agentforce/guide/agent-api-get-started.html
- Invoke agents from Apex/Flow: https://developer.salesforce.com/blogs/2025/04/invoke-agentforce-agents-with-apex-and-flow
- Builder migration: https://www.salesforce.com/agentforce/agent-builder/migration/
- Atlas Reasoning Engine: https://www.salesforce.com/agentforce/what-is-a-reasoning-engine/atlas/

### Prompt Engineering
- Prompt template types: https://help.salesforce.com/s/articleView?id=ai.prompt_builder_standard_template_types.htm&language=en_US&type=5
- Prompt Builder Basics (Trailhead): https://trailhead.salesforce.com/content/learn/modules/prompt-builder-basics
- Field Generation template (Trailhead): https://trailhead.salesforce.com/content/learn/modules/prompt-builder-basics/build-a-field-generation-prompt-template
- Best practices: https://help.salesforce.com/s/articleView?id=ai.prompt_builder_best_practices.htm&language=en_US&type=5
- Activate/deactivate templates: https://help.salesforce.com/s/articleView?id=ai.prompt_builder_activate_deactivate_templates.htm&language=en_US&type=5
- Trust Layer (Help): https://help.salesforce.com/s/articleView?id=ai.generative_ai_trust_arch.htm&language=en_US&type=5
- Trust Layer (Trailhead): https://trailhead.salesforce.com/content/learn/modules/the-einstein-trust-layer
- LLM data masking config: https://trailhead.salesforce.com/content/learn/modules/llm-data-masking-in-the-einstein-trust-layer/configure-llm-data-masking-policies
- Audit & feedback data model: https://help.salesforce.com/s/articleView?id=ai.generative_ai_feedback_data_model.htm&language=en_US&type=5
- Models and prompts (dev guide): https://developer.salesforce.com/docs/ai/agentforce/guide/get-started-einstein-studio.html
- Supported models: https://developer.salesforce.com/docs/ai/agentforce/guide/supported-models.html
- BYO LLM: https://help.salesforce.com/s/articleView?id=sf.c360_a_ai_foundation_models.htm&language=en_US&type=5

### Data 360
- Agentforce Data Library (Help): https://help.salesforce.com/s/articleView?id=ai.data_library_parent.htm&language=en_US&type=5
- Data Library (Trailhead): https://trailhead.salesforce.com/content/learn/modules/agentforce-data-library-basics/build-a-file-based-data-library-for-an-agent
- Search index types (Trailhead): https://trailhead.salesforce.com/content/learn/modules/search-index-types-data-cloud-quick-look/get-to-know-search-index-types-in-data-cloud
- Hybrid search for RAG (Trailhead): https://trailhead.salesforce.com/content/learn/modules/hybrid-search-for-rag-quick-look/optimize-hybrid-search-results-for-rag
- Search index configuration project: https://trailhead.salesforce.com/content/learn/projects/unstructured-data-in-data-cloud/create-a-search-index-configuration
- Chunking in Data 360 (blog): https://www.salesforce.com/blog/from-documents-to-context-designing-effective-chunking-in-data-360/
- Retrievers (Help): https://help.salesforce.com/s/articleView?id=data.c360_a_ai_retriever_about.htm&language=en_US&type=5
- Grounding an agent with data (Trailhead): https://trailhead.salesforce.com/content/learn/modules/grounding-an-agent-with-data/review-options-to-ground-an-agent-with-data
- Data Cloud powered Agentforce (Trailhead): https://trailhead.salesforce.com/content/learn/modules/data-cloud-powered-agentforce
- RAG with Data Cloud (SalesforceBen): https://www.salesforceben.com/connecting-agentforce-to-data-cloud-for-grounding-with-rag/
- Data 360 rename: https://www.salesforceben.com/salesforce-data-cloud-renamed-to-data-360-as-part-of-agentforce-360/

### Testing, Deployment, Maintenance
- Testing Center (Help): https://help.salesforce.com/s/articleView?language=en_US&id=ai.agent_testing_center.htm&type=5
- Agent testing (Trailhead): https://trailhead.salesforce.com/content/learn/modules/agentforce-agent-testing/set-up-testing-criteria
- Agentforce DX tests: https://developer.salesforce.com/docs/ai/agentforce/guide/agent-dx-test.html
- Custom evaluation criteria: https://developer.salesforce.com/docs/einstein/genai/guide/testing-api-custom-evaluation-criteria.html
- Deploy agent metadata (DX): https://developer.salesforce.com/docs/ai/agentforce/guide/agent-dx-deploy-metadata.html
- Publish authoring bundle: https://developer.salesforce.com/docs/ai/agentforce/guide/agent-dx-nga-publish.html
- Deployment (Trailhead): https://trailhead.salesforce.com/content/learn/modules/agentforce-deployment-quick-look/deploy-an-ai-agent-with-agentforce
- Agentforce deployment with change set (Help KB): https://help.salesforce.com/s/articleView?id=005232697&language=en_US&type=1
- Prompt template deployment considerations: https://help.salesforce.com/s/articleView?id=ai.prompt_builder_considerations_deployment.htm&language=en_US&type=5
- Change set considerations for prompt templates: https://help.salesforce.com/s/articleView?id=ai.prompt_builder_considerations_changeset.htm&language=en_US&type=5
- Gearset deploy guide: https://gearset.com/blog/how-to-deploy-agentforce/

### Governance & Observability
- Observability announcement: https://www.salesforce.com/news/stories/agentforce-studio-observability-tools-announcement/
- Observability product page: https://www.salesforce.com/agentforce/observability/
- Legacy Agentforce Analytics: https://help.salesforce.com/s/articleView?language=en_US&id=ai.copilot_analytics.htm&type=5
- Utterance Analysis (Trailhead module): https://trailhead.salesforce.com/content/learn/modules/agentforce-analytics-and-monitoring
- Gen AI audit & feedback: https://help.salesforce.com/s/articleView?id=sf.generative_ai_feedback_about.htm&language=en_US&type=5

### Multi-Agent Orchestration
- Multi-agent orchestration: https://www.salesforce.com/agentforce/multi-agent-orchestration/
- A2A protocol: https://www.salesforce.com/agentforce/ai-agents/agent2agent-protocol/
- MCP support: https://www.salesforce.com/agentforce/mcp-support/
- MCP solutions (dev guide): https://developer.salesforce.com/docs/ai/agentforce/guide/mcp.html
- Hosted MCP servers GA: https://developer.salesforce.com/blogs/2026/04/salesforce-hosted-mcp-servers-are-now-generally-available
- AgentExchange launch: https://www.salesforce.com/news/press-releases/2025/03/04/agentexchange-announcement/

Note: many help.salesforce.com pages render client-side and could not be fetched directly; their facts above come from Trailhead mirrors, search-result excerpts of those Help pages, and corroborating sources. Items where that chain was weak are marked UNVERIFIED.
