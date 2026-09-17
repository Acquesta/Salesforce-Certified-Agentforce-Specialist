import type { Question } from '../../types/quiz'

export const governanceObservabilityQuestions: Question[] = [
  {
    id: 'GO-001',
    section: 'governance-observability',
    type: 'single',
    prompt:
      'A customer complains that a Universal Containers Service agent started a return when they only asked about a delivery date. The Agentforce Specialist wants to see, step by step, how the agent reasoned in that conversation and which subagent and action it chose. Which feature should they use?',
    options: [
      {
        id: 'a',
        text: 'Agent Analytics dashboards showing escalation and deflection trends.',
        explanation:
          'Agent Analytics shows totals and trends across many sessions. It does not show the reasoning steps of one conversation.',
      },
      {
        id: 'b',
        text: 'Agent Health Monitoring alerts for the agent.',
        explanation:
          'Health Monitoring focuses on near real-time errors and latency. It does not explain why the agent chose a specific action.',
      },
      {
        id: 'c',
        text: 'Agent Optimization, which shows the session trace with each reasoning step.',
        explanation:
          'Agent Optimization, built on Session Tracing, gives a step-by-step trace of each session: inputs, subagent choice, actions, and responses. That is how you find the root cause of a single wrong decision.',
      },
      {
        id: 'd',
        text: 'The Einstein Trust Layer toxicity score for the response.',
        explanation:
          'A toxicity score flags harmful language. It says nothing about how a subagent or action was chosen.',
      },
    ],
    correct: ['c'],
    reference: 'https://www.salesforce.com/agentforce/observability/',
  },
  {
    id: 'GO-002',
    section: 'governance-observability',
    type: 'single',
    prompt:
      'Cloud Kicks leadership wants a monthly view of how its Service agent performs: number of sessions, escalation and abandonment rates, and user feedback trends. Which capability best meets this need?',
    options: [
      {
        id: 'a',
        text: 'Agent Analytics in Agentforce Observability.',
        explanation:
          'Agent Analytics provides dashboards and KPI trends for usage and effectiveness, such as sessions, escalations, abandonment, and feedback, over time.',
      },
      {
        id: 'b',
        text: 'The reasoning trace in the Agentforce Builder preview panel.',
        explanation:
          'The preview trace shows one test conversation while you build. It does not give trends from production traffic.',
      },
      {
        id: 'c',
        text: 'A Testing Center batch test run every month.',
        explanation:
          'Testing Center checks the agent against expected results. It does not measure real customer usage or feedback.',
      },
      {
        id: 'd',
        text: 'Setup Audit Trail entries for the agent.',
        explanation:
          'Setup Audit Trail records configuration changes made by admins. It does not track conversation KPIs.',
      },
    ],
    correct: ['a'],
    reference: 'https://www.salesforce.com/news/stories/agentforce-studio-observability-tools-announcement/',
  },
  {
    id: 'GO-003',
    section: 'governance-observability',
    type: 'single',
    prompt:
      'Universal Containers wants its operations team to be alerted quickly when an agent in production suddenly shows more errors or much slower responses, instead of discovering it later in a weekly report. Which feature should the Agentforce Specialist recommend?',
    options: [
      {
        id: 'a',
        text: 'The Utterance Analysis dashboard.',
        explanation:
          'Utterance Analysis shows what users ask and how the agent responds, and it refreshes weekly. It is not built for fast alerts.',
      },
      {
        id: 'b',
        text: 'Agent Optimization intent clusters.',
        explanation:
          'Agent Optimization groups similar requests and helps improve quality over time. It is not a near real-time alerting tool for errors and latency.',
      },
      {
        id: 'c',
        text: 'A scheduled Testing Center test run.',
        explanation:
          'Scheduled tests use predefined test cases. They do not watch live traffic for sudden spikes in errors or latency.',
      },
      {
        id: 'd',
        text: 'Agent Health Monitoring.',
        explanation:
          'Agent Health Monitoring tracks near real-time health metrics such as errors and latency and alerts on spikes or silent failures.',
      },
    ],
    correct: ['d'],
    reference: 'https://www.salesforce.com/blog/agent-monitoring/',
  },
  {
    id: 'GO-004',
    section: 'governance-observability',
    type: 'single',
    prompt:
      'An Agentforce Specialist enables Agentforce Session Tracing today. The compliance team then asks for traces of agent conversations from last month, but none appear. What is the reason?',
    options: [
      {
        id: 'a',
        text: 'Session traces are kept for only 24 hours before being deleted.',
        explanation:
          'Traces are stored in Data 360 for analysis. The missing data is explained by when tracing was turned on, not a 24-hour limit.',
      },
      {
        id: 'b',
        text: 'Tracing captures only sessions after it is enabled; there is no backfill.',
        explanation:
          'Tracing starts collecting from the moment it is turned on. Conversations from before that were never recorded, so they cannot appear.',
      },
      {
        id: 'c',
        text: 'The agent must be redeployed before historical sessions are processed.',
        explanation:
          'Redeploying the agent does not create trace data for past conversations.',
      },
      {
        id: 'd',
        text: 'Historical traces appear only after running a Testing Center batch test.',
        explanation:
          'Testing Center runs new test conversations. It does not rebuild traces of past production sessions.',
      },
    ],
    correct: ['b'],
    reference: 'https://help.salesforce.com/s/articleView?id=ai.generative_ai_session_trace_about.htm&language=en_US&type=5',
  },
  {
    id: 'GO-005',
    section: 'governance-observability',
    type: 'single',
    prompt:
      'Where are the Einstein generative AI audit trail and user feedback data stored, so they can be used for governance reporting on prompts, responses, and agent activity?',
    options: [
      {
        id: 'a',
        text: 'In Data 360, as audit and feedback data model objects.',
        explanation:
          'When audit and feedback collection is enabled, this data is stored in Data 360, where it can feed reports and dashboards.',
      },
      {
        id: 'b',
        text: 'Only at the external LLM provider, under its own retention policy.',
        explanation:
          'With zero data retention, the LLM provider does not keep prompts or responses. The audit trail is stored in Salesforce, not by the provider.',
      },
      {
        id: 'c',
        text: 'In the Setup Audit Trail, together with admin configuration changes.',
        explanation:
          'Setup Audit Trail logs changes to setup. It does not hold prompt, response, or feedback data.',
      },
      {
        id: 'd',
        text: 'In debug logs for the agent user.',
        explanation:
          'Debug logs are temporary troubleshooting logs for code and automation. They are not the governed store for AI audit and feedback data.',
      },
    ],
    correct: ['a'],
    reference: 'https://help.salesforce.com/s/articleView?id=ai.generative_ai_feedback_data_model.htm&language=en_US&type=5',
  },
  {
    id: 'GO-006',
    section: 'governance-observability',
    type: 'multiple',
    prompt:
      'Cloud Kicks wants to start using Agentforce Observability to trace and analyze its agents\' sessions. Which are required parts of the setup?',
    options: [
      {
        id: 'a',
        text: 'Deploy AiEvaluationDefinition metadata for every agent.',
        explanation:
          'AiEvaluationDefinition holds test definitions for Testing Center. It is not needed to collect session traces.',
      },
      {
        id: 'b',
        text: 'Have Data 360 enabled in the org, because trace data is stored there.',
        explanation:
          'Session Tracing writes its data model into Data 360, so Data 360 must be available before observability features can work.',
      },
      {
        id: 'c',
        text: 'Turn on debug logging for the agent user so reasoning steps are captured.',
        explanation:
          'Debug logs are not how reasoning steps are captured. Session Tracing records them in Data 360.',
      },
      {
        id: 'd',
        text: 'Enable Agentforce Session Tracing in Einstein Audit, Analytics, and Monitoring Setup.',
        explanation:
          'Session Tracing is turned on in Setup under Einstein Audit, Analytics, and Monitoring Setup. Analytics and optimization features rely on this data.',
      },
      {
        id: 'e',
        text: 'Deactivate the agents while tracing is turned on.',
        explanation:
          'The point of tracing is to capture real sessions. Deactivating the agents would mean there is nothing to trace.',
      },
    ],
    correct: ['b', 'd'],
    reference: 'https://trailhead.salesforce.com/content/learn/modules/agentforce-specialist-certification-maintenance-summer-26',
  },
  {
    id: 'GO-007',
    section: 'governance-observability',
    type: 'single',
    prompt:
      'An admin at Universal Containers opens the Utterance Analysis dashboard for the employee agent to review questions users asked this morning, but today\'s conversations are not shown. What is the most likely explanation?',
    options: [
      {
        id: 'a',
        text: 'Utterance Analysis only includes conversations that received negative feedback.',
        explanation:
          'The dashboard covers user inputs and response types in general, not only conversations with negative feedback.',
      },
      {
        id: 'b',
        text: 'The admin needs the Prompt Template Manager permission set to see recent data.',
        explanation:
          'Prompt Template Manager controls creating and editing prompt templates. It does not decide how fresh dashboard data is.',
      },
      {
        id: 'c',
        text: 'The Utterance Analysis data is refreshed weekly, so recent conversations appear after the next refresh.',
        explanation:
          'Utterance Analysis is refreshed on a weekly schedule. It is for reviewing trends, not for seeing conversations from the last few hours.',
      },
      {
        id: 'd',
        text: 'Conversations are masked by the Trust Layer and never reach analytics.',
        explanation:
          'Masking protects sensitive data sent to the LLM. It does not stop conversations from reaching analytics.',
      },
    ],
    correct: ['c'],
    reference: 'https://trailhead.salesforce.com/content/learn/modules/agentforce-analytics-and-monitoring',
  },
  {
    id: 'GO-008',
    section: 'governance-observability',
    type: 'single',
    prompt:
      'Cloud Kicks needs to change the instructions of a Service agent that is active in production, but it must not disrupt customers while the change is built and tested. What is the recommended approach?',
    options: [
      {
        id: 'a',
        text: 'Edit the active version directly, since changes apply only to new sessions.',
        explanation:
          'Editing the live configuration directly skips testing and puts untested behavior in front of customers.',
      },
      {
        id: 'b',
        text: 'Clone the agent into a second active agent and split traffic between them.',
        explanation:
          'A duplicate agent brings duplicate channel setup and governance overhead. Versioning is the built-in way to change an agent safely.',
      },
      {
        id: 'c',
        text: 'Deactivate the agent for the whole time the new instructions are being written.',
        explanation:
          'Deactivating the agent for the whole change is the disruption the company wants to avoid.',
      },
      {
        id: 'd',
        text: 'Create a new agent version, test it, and then activate it.',
        explanation:
          'A new version can be built and tested while the current version keeps serving customers. Only one version is active at a time, so activating the new one switches over cleanly and old versions stay available.',
      },
    ],
    correct: ['d'],
    reference: 'https://trailhead.salesforce.com/content/learn/modules/agentforce-deployment-quick-look/deploy-an-ai-agent-with-agentforce',
  },
  {
    id: 'GO-009',
    section: 'governance-observability',
    type: 'single',
    prompt:
      'Monitoring shows that a newly released Universal Containers agent is giving customers incorrect warranty information. The team needs to stop customer exposure right away while it investigates. What should the Agentforce Specialist do first?',
    options: [
      {
        id: 'a',
        text: 'Delete the agent and all of its subagents from the org.',
        explanation:
          'Deleting removes the configuration and history the team needs to investigate and fix the problem. It goes much further than needed.',
      },
      {
        id: 'b',
        text: 'Deactivate the agent or roll back to the last good version.',
        explanation:
          'Deactivating, or going back to a previous version, stops the bad behavior quickly and keeps the configuration for root-cause analysis.',
      },
      {
        id: 'c',
        text: 'Turn off the Einstein Trust Layer so the agent answers with fewer restrictions.',
        explanation:
          'The Trust Layer is not causing wrong warranty answers, and turning off its protections would add risk.',
      },
      {
        id: 'd',
        text: 'Wait for the next weekly Utterance Analysis refresh to confirm the pattern.',
        explanation:
          'Waiting a week leaves customers exposed to incorrect information. The situation needs immediate action.',
      },
    ],
    correct: ['b'],
    reference: 'https://www.salesforce.com/agentforce/observability/',
  },
  {
    id: 'GO-010',
    section: 'governance-observability',
    type: 'multiple',
    prompt:
      'Cloud Kicks sees that many order-tracking requests are routed to the wrong subagent in production. Which steps belong to a sound agent optimization loop for fixing this?',
    options: [
      {
        id: 'a',
        text: 'Use Agent Optimization to find the group of similar requests that are misrouted and inspect their traces.',
        explanation:
          'Agent Optimization groups similar requests and shows session traces, so the team can see the pattern and the root cause, such as overlapping subagent descriptions.',
      },
      {
        id: 'b',
        text: 'Increase the model temperature so the agent explores other subagents.',
        explanation:
          'Higher temperature makes output more random, not routing more accurate. Misrouting is fixed by clearer subagent descriptions and less overlap.',
      },
      {
        id: 'c',
        text: 'Edit the live active version directly so the fix reaches customers sooner.',
        explanation:
          'Changing the live version without testing risks new problems. Changes should go into a new version first.',
      },
      {
        id: 'd',
        text: 'Turn off Session Tracing so the misrouted sessions no longer affect the metrics.',
        explanation:
          'Turning off tracing only hides the evidence and removes the data needed to confirm the fix.',
      },
      {
        id: 'e',
        text: 'Update the subagent descriptions in a new version and run a Testing Center regression test before activating it.',
        explanation:
          'Refining the classification descriptions, testing in batch against expected subagents, and only then activating closes the loop safely.',
      },
    ],
    correct: ['a', 'e'],
    reference: 'https://www.salesforce.com/news/stories/agentforce-studio-observability-tools-announcement/',
  },
  {
    id: 'GO-011',
    section: 'governance-observability',
    type: 'single',
    prompt:
      'While building a new subagent in Agentforce Builder, before anything is deployed, an Agentforce Specialist wants to see which subagent and actions the agent selects for a sample utterance and what inputs it passes. What should they use?',
    options: [
      {
        id: 'a',
        text: 'The Agent Analytics dashboard for the agent.',
        explanation:
          'Agent Analytics summarizes real sessions over time. It has no data for a subagent that has not been released yet.',
      },
      {
        id: 'b',
        text: 'The Einstein generative AI audit report in Data 360.',
        explanation:
          'Audit reports are for reviewing past activity. They are not the quick, interactive way to inspect one test conversation while building.',
      },
      {
        id: 'c',
        text: 'The conversation preview in Agentforce Builder, reviewing its reasoning trace.',
        explanation:
          'The builder preview lets you try an utterance and view the reasoning trace, including the subagent chosen, the actions called, and their inputs and outputs, while you build.',
      },
      {
        id: 'd',
        text: 'Agent Health Monitoring for the sandbox.',
        explanation:
          'Health Monitoring tracks errors and latency across traffic. It does not show the reasoning of a single test utterance.',
      },
    ],
    correct: ['c'],
    reference: 'https://trailhead.salesforce.com/content/learn/modules/new-agentforce-builder-quick-look/explore-the-new-agentforce-builder',
  },
  {
    id: 'GO-012',
    section: 'governance-observability',
    type: 'multiple',
    prompt:
      'Universal Containers\' security team is reviewing governance for a customer-facing agent that can update account data. Which practices should the Agentforce Specialist recommend?',
    options: [
      {
        id: 'a',
        text: 'Give the agent user the System Administrator profile so actions never fail because of permissions.',
        explanation:
          'Broad admin access breaks least privilege and could expose or change data the agent should never touch.',
      },
      {
        id: 'b',
        text: 'Rely on an instruction saying "never update another customer\'s account" to enforce the rule.',
        explanation:
          'Instructions guide the LLM but are not guaranteed. Sensitive rules need deterministic controls.',
      },
      {
        id: 'c',
        text: 'Give the agent user only the object and field permissions its actions need.',
        explanation:
          'The agent runs as the agent user, so least-privilege permissions limit what the agent can read or change, whatever the LLM decides.',
      },
      {
        id: 'd',
        text: 'Turn off audit and feedback data collection to reduce stored data.',
        explanation:
          'Audit and feedback data is a key monitoring source. Turning it off removes visibility that governance depends on.',
      },
      {
        id: 'e',
        text: 'Gate update actions with filters on a verified-customer variable.',
        explanation:
          'Filters (or conditions in Agent Script) apply deterministic gates, so the action is not available until the conditions are met.',
      },
    ],
    correct: ['c', 'e'],
    reference: 'https://help.salesforce.com/s/articleView?language=en_US&id=ai.agent_user.htm&type=5',
  },
]
