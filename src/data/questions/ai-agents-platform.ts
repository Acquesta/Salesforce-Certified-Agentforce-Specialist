import type { Question } from '../../types/quiz'

const CUSTOM_ACTION_HELP =
  'https://help.salesforce.com/s/articleView?language=en_US&id=ai.copilot_actions_custom.htm&type=5'

export const aiAgentsPlatformQuestions: Question[] = [
  {
    id: 'AA-101',
    section: 'ai-agents',
    type: 'single',
    prompt:
      'Universal Containers (UC) wants its account executives to ask an agent inside Lightning Experience for summaries of their accounts and open opportunities. Each rep must only see records they already have access to in Salesforce. Which approach best meets this requirement?',
    options: [
      {
        id: 'a',
        text: 'Deploy an Agentforce Service Agent with a dedicated agent user that has read access to all accounts.',
        explanation:
          'A Service agent runs as its agent user, so every rep would see whatever that user can see. This breaks the per-rep visibility requirement and is meant for external customers.',
      },
      {
        id: 'b',
        text: 'Create a separate agent user for each rep and clone the rep\'s permission sets onto it.',
        explanation:
          'This is unnecessary and hard to maintain. The Employee agent already runs as the logged-in user, so no extra agent users are needed.',
      },
      {
        id: 'c',
        text: 'Use the Agentforce Employee Agent in the Lightning Experience Agentforce panel.',
        explanation:
          'The Employee agent is built for internal users and runs as the logged-in user. It respects that user\'s profile, permission sets, field-level security, and sharing.',
      },
      {
        id: 'd',
        text: 'Expose a Service agent to the reps through the Agent API from a custom Lightning web component.',
        explanation:
          'The Agent API runs as the configured integration or agent user, not as each rep. It adds complexity and does not give per-user record visibility.',
      },
    ],
    correct: ['c'],
    reference:
      'https://trailhead.salesforce.com/content/learn/modules/agentforce-for-employees-quick-look/get-started-with-agentforce-for-employees',
  },
  {
    id: 'AA-102',
    section: 'ai-agents',
    type: 'single',
    prompt:
      'Cloud Kicks wants visitors on its public website, most of whom are not logged in, to check order status and get answers to shipping questions at any hour. Human reps should only be involved when the agent cannot help. Which solution should an Agentforce Specialist recommend?',
    options: [
      {
        id: 'a',
        text: 'An Agentforce Service Agent on Enhanced Chat that verifies customers before order lookups.',
        explanation:
          'Service agents are built for external, often anonymous customers and run 24/7 on channels like Enhanced Chat. Verifying the customer first keeps order data protected.',
      },
      {
        id: 'b',
        text: 'The Agentforce Employee Agent embedded in the website through an Experience Cloud component.',
        explanation:
          'The Employee agent is for internal users and runs as the logged-in employee. It is not meant for anonymous customers on a public site.',
      },
      {
        id: 'c',
        text: 'A legacy Chat (Live Agent) button that sends every visitor to a human rep queue.',
        explanation:
          'Legacy Chat is being retired and would send every conversation to humans. It does not deflect routine questions the way an agent does.',
      },
      {
        id: 'd',
        text: 'A Sales Development (SDR) agent enrolled on all website visitors as leads.',
        explanation:
          'The SDR agent nurtures inbound leads and books meetings. It is not designed to support existing customers with order status.',
      },
    ],
    correct: ['a'],
    reference:
      'https://help.salesforce.com/s/articleView?id=service.service_agent_overview.htm&language=en_US&type=5',
  },
  {
    id: 'AA-103',
    section: 'ai-agents',
    type: 'single',
    prompt:
      'UC needs an agent action that looks up a customer\'s active contract, checks several eligibility rules, and creates a return authorization record. The logic must run the same way every time, and the admin team does not write code. Which reference action type should be used?',
    options: [
      {
        id: 'a',
        text: 'A screen flow that guides the agent through each eligibility step.',
        explanation:
          'Screen flows need a user interface to run and cannot be used as agent actions. Only autolaunched flows (no trigger) can be referenced.',
      },
      {
        id: 'b',
        text: 'An autolaunched flow with inputs and outputs for the agent.',
        explanation:
          'An autolaunched flow runs multi-step logic deterministically without code, and its input and output variables map to action inputs and outputs.',
      },
      {
        id: 'c',
        text: 'A record-triggered flow on the Return Authorization object.',
        explanation:
          'Record-triggered flows run when a record changes, not when the agent calls them. They cannot be picked as the reference for an agent action.',
      },
      {
        id: 'd',
        text: 'A Flex prompt template that describes the eligibility rules.',
        explanation:
          'Prompt template actions are handled by the LLM and are not deterministic. They also cannot reliably create records under strict business rules.',
      },
    ],
    correct: ['b'],
    reference: CUSTOM_ACTION_HELP,
  },
  {
    id: 'AA-104',
    section: 'ai-agents',
    type: 'multiple',
    prompt:
      'An Agentforce Specialist is creating a custom agent action. Which items can be selected as the reference action type?',
    options: [
      {
        id: 'a',
        text: 'An Apex class with an invocable method',
        explanation:
          'Apex invocable methods can be used as agent actions. The descriptions on the invocable variables help the LLM fill the inputs correctly.',
      },
      {
        id: 'b',
        text: 'A record-triggered flow',
        explanation:
          'Record-triggered flows start from data changes and cannot be called by an agent. Only autolaunched flows can be used.',
      },
      {
        id: 'c',
        text: 'A validation rule',
        explanation:
          'Validation rules check data when records are saved. They are not an agent action type.',
      },
      {
        id: 'd',
        text: 'A prompt template',
        explanation:
          'Prompt templates, such as Flex templates, can be used as agent actions to generate text with grounded data.',
      },
      {
        id: 'e',
        text: 'A screen flow',
        explanation:
          'Screen flows need screens that a user clicks through, so they cannot run as agent actions.',
      },
    ],
    correct: ['a', 'd'],
    reference: CUSTOM_ACTION_HELP,
  },
  {
    id: 'AA-105',
    section: 'ai-agents',
    type: 'single',
    prompt:
      'Cloud Kicks has a flow action that returns a list of available repair appointment slots. The customer must see this list exactly as the flow returns it in the chat. Which output setting should the Agentforce Specialist enable?',
    options: [
      {
        id: 'a',
        text: 'Filter from agent action',
        explanation:
          'This hides the output from the conversation, and the reasoning engine cannot use it in its reply. That is the opposite of what is needed.',
      },
      {
        id: 'b',
        text: 'Require input',
        explanation:
          'Require input applies to action inputs and means the action cannot run without that value. It does not control how outputs are shown.',
      },
      {
        id: 'c',
        text: 'Show in conversation',
        explanation:
          'Show in conversation displays the output value to the user in the chat. It is the right setting for results the customer must see.',
      },
      {
        id: 'd',
        text: 'Collect data from user',
        explanation:
          'Collect data from user is an input setting that makes the agent ask the user for a value. It has no effect on outputs.',
      },
    ],
    correct: ['c'],
    reference: CUSTOM_ACTION_HELP,
  },
  {
    id: 'AA-106',
    section: 'ai-agents',
    type: 'single',
    prompt:
      'During a security review, UC finds that its Service agent sometimes returns case details that belong to other customers. The agent user has limited permissions, and the Einstein Trust Layer is on. The action behind this is an Apex invocable method. What is the most likely root cause?',
    options: [
      {
        id: 'a',
        text: 'Data masking in the Einstein Trust Layer is turned off for the agent.',
        explanation:
          'The Trust Layer protects data sent to the LLM. It does not enforce record access, so turning on masking would not stop an action from returning the wrong records.',
      },
      {
        id: 'b',
        text: 'The case subagent (formerly topic) has a classification description that is too broad.',
        explanation:
          'A broad classification description affects which subagent is picked. It does not decide which records an action can read.',
      },
      {
        id: 'c',
        text: 'The agent user is missing the Einstein Agent User profile.',
        explanation:
          'A missing or wrong profile would usually give the agent less access, not more. It does not explain the agent seeing other customers\' records.',
      },
      {
        id: 'd',
        text: 'The Apex class runs without sharing and doesn\'t filter by the verified customer.',
        explanation:
          'Apex that runs without sharing ignores the agent user\'s record access. If the query is not also limited to the verified customer, it can return other customers\' data.',
      },
    ],
    correct: ['d'],
    reference:
      'https://www.salesforceben.com/agentforce-permissions-explained-agent-users-access-and-security/',
  },
  {
    id: 'AA-107',
    section: 'ai-agents',
    type: 'single',
    prompt:
      'After a Service agent goes live on Enhanced Chat, customers who ask about warranty registrations get the reply "I couldn\'t find that information." An admin runs the same autolaunched flow in debug mode and it returns the right records. What should the Agentforce Specialist check first?',
    options: [
      {
        id: 'a',
        text: 'Whether the agent user can access the Warranty Registration object and the flow',
        explanation:
          'The Service agent runs as its agent user, not as the admin. Missing object, field, or flow access for that user is a common reason the action finds nothing in production.',
      },
      {
        id: 'b',
        text: 'Whether the flow was saved as a record-triggered flow instead of autolaunched',
        explanation:
          'The flow already runs and returns data in debug, and it is available as an action. The flow type is not what is failing here.',
      },
      {
        id: 'c',
        text: 'Whether the LLM temperature for the agent is set high enough',
        explanation:
          'Temperature affects how varied the wording is. It cannot give the agent access to records the agent user cannot read.',
      },
      {
        id: 'd',
        text: 'Whether the admin has the Manage AI Agents permission',
        explanation:
          'That permission lets someone build and manage agents. It has nothing to do with the access the agent has while it runs.',
      },
    ],
    correct: ['a'],
    reference:
      'https://help.salesforce.com/s/articleView?language=en_US&id=ai.agent_user.htm&type=5',
  },
  {
    id: 'AA-108',
    section: 'ai-agents',
    type: 'multiple',
    prompt:
      'UC creates a new Agentforce Service Agent and chooses to create a new agent user. Which statements about the security context of this agent are true?',
    options: [
      {
        id: 'a',
        text: 'The agent runs with the permissions of the anonymous customer who starts the chat.',
        explanation:
          'Anonymous visitors have no Salesforce user of their own for the agent to run as. The Service agent runs as its agent user.',
      },
      {
        id: 'b',
        text: 'The agent user is based on the Einstein Agent User profile.',
        explanation:
          'Creating a new agent user sets it up with the Einstein Agent User profile. Access is then added through permission sets.',
      },
      {
        id: 'c',
        text: 'The agent user should be given the System Administrator profile so actions never fail.',
        explanation:
          'This breaks least privilege and could expose any data to customers. Give only the object, field, flow, and Apex access the actions need.',
      },
      {
        id: 'd',
        text: 'Object and field access for the agent\'s actions is granted through permission sets on the agent user.',
        explanation:
          'Admins add the needed access, such as object permissions, field-level security, and flow or Apex class access, to the agent user\'s permission sets.',
      },
      {
        id: 'e',
        text: 'The agent runs as the admin who last activated the agent.',
        explanation:
          'Activating an agent does not change who it runs as. A Service agent always runs as the agent user assigned to it.',
      },
    ],
    correct: ['b', 'd'],
    reference:
      'https://help.salesforce.com/s/articleView?language=en_US&id=ai.agent_user.htm&type=5',
  },
  {
    id: 'AA-109',
    section: 'ai-agents',
    type: 'single',
    prompt:
      'An Agentforce Specialist notices that when customers ask to cancel an order, the agent often runs the "Get Order Status" action instead of "Cancel Order". Both actions are in the same subagent (formerly topic), and the right subagent is being selected. What is the best way to fix this?',
    options: [
      {
        id: 'a',
        text: 'Make each action\'s instructions clearly state when it should and should not be used.',
        explanation:
          'The reasoning engine reads action instructions and input descriptions to choose an action. Clear, distinct wording is the direct fix when the right subagent is chosen but the wrong action runs.',
      },
      {
        id: 'b',
        text: 'Rewrite the subagent\'s classification description to mention order cancellations.',
        explanation:
          'The classification description is used to pick the subagent, and that part already works. It does not help choose between actions inside the subagent.',
      },
      {
        id: 'c',
        text: 'Move both actions into the General FAQ standard subagent.',
        explanation:
          'Moving the actions does not make them easier to tell apart. It would also mix order tasks into a subagent meant for general questions.',
      },
      {
        id: 'd',
        text: 'Turn on Show in conversation for the outputs of the Cancel Order action.',
        explanation:
          'This setting only controls whether outputs are shown to the user after the action runs. It does not affect which action is chosen.',
      },
    ],
    correct: ['a'],
    reference: CUSTOM_ACTION_HELP,
  },
  {
    id: 'AA-110',
    section: 'ai-agents',
    type: 'single',
    prompt:
      'UC has an active Employee agent that sales reps use in Lightning Experience. The reps spend most of their day in Slack and want to use the same agent there, still seeing only the Salesforce data they can access. The Salesforce org is already connected to the Slack workspace. What should the Agentforce Specialist do next?',
    options: [
      {
        id: 'a',
        text: 'Create an Enhanced Chat deployment and share its link in a Slack channel.',
        explanation:
          'Enhanced Chat is a customer messaging channel for websites and apps. Sharing a link does not deploy an agent inside Slack or keep each rep\'s access.',
      },
      {
        id: 'b',
        text: 'Build a custom Slack bot that calls the Agent API as a shared integration user.',
        explanation:
          'This needs custom code, and a shared integration user would give every rep the same data access instead of their own.',
      },
      {
        id: 'c',
        text: 'Add a Slack connection to the Employee agent, then commit and activate it.',
        explanation:
          'Employee agents are deployed to Slack by adding a Slack connection to the agent. They keep user-specific context, so each rep sees only what their permissions allow.',
      },
      {
        id: 'd',
        text: 'Recreate the agent\'s subagents and actions in Slack Workflow Builder.',
        explanation:
          'Workflow Builder automates Slack tasks. Rebuilding the agent there duplicates work and loses the Agentforce reasoning and Salesforce security context.',
      },
    ],
    correct: ['c'],
    reference:
      'https://trailhead.salesforce.com/content/learn/modules/agentforce-configuration-for-slack-deployment/deploy-an-agent-in-slack',
  },
  {
    id: 'AA-111',
    section: 'ai-agents',
    type: 'single',
    prompt:
      'Cloud Kicks has set up Enhanced Chat (Messaging for In-App and Web) on its website and activated a Service agent. New chat conversations still wait in a human queue and never reach the agent. What should the Agentforce Specialist configure?',
    options: [
      {
        id: 'a',
        text: 'An Einstein Bot dialog that forwards every message to the agent',
        explanation:
          'Einstein Bots are not how you route Enhanced Chat conversations to an agent. Routing is done with an Omni-Channel flow or the agent\'s connection.',
      },
      {
        id: 'b',
        text: 'A record-triggered flow on MessagingSession that sets the owner to the agent user',
        explanation:
          'Changing the record owner does not route live work to the agent. Omni-Channel routing is what sends the conversation.',
      },
      {
        id: 'c',
        text: 'A new Agent API session for each chat started on the website',
        explanation:
          'The Agent API is for custom or headless channels. Enhanced Chat is a native channel and is routed through Omni-Channel.',
      },
      {
        id: 'd',
        text: 'An Omni-Channel flow on the messaging channel that routes work to the agent',
        explanation:
          'Incoming messaging sessions are routed to the Service agent through an Omni-Channel flow (Route Work to the agent), usually with a fallback queue in case the agent cannot take them.',
      },
    ],
    correct: ['d'],
    reference:
      'https://help.salesforce.com/s/articleView?id=service.messaging_routing_flows.htm&language=en_US&type=5',
  },
  {
    id: 'AA-112',
    section: 'ai-agents',
    type: 'single',
    prompt:
      'A UC admin is building a screen flow for service reps. In one step, the flow must send the case description to an active agent and store the agent\'s reply for a later screen. Everything happens inside the Salesforce org, and the team wants to avoid custom code and external integrations. Which approach should the Agentforce Specialist recommend?',
    options: [
      {
        id: 'a',
        text: 'Add an HTTP callout in the flow that calls the Agent API through an External Client App.',
        explanation:
          'The Agent API is meant for external or headless apps. Calling it from a flow adds OAuth setup and an integration that the built-in flow action makes unnecessary.',
      },
      {
        id: 'b',
        text: 'Embed an Enhanced Chat deployment in the screen so the rep can chat with the agent.',
        explanation:
          'Enhanced Chat is a customer messaging channel. It would not pass the case description in or return the reply to a flow variable.',
      },
      {
        id: 'c',
        text: 'Add an Action element that calls the agent from the AI Agent Actions category.',
        explanation:
          'Flow lists an action for each active agent under AI Agent Actions. It takes a user message (and optional session ID) and returns the agent\'s response for use later in the flow.',
      },
      {
        id: 'd',
        text: 'Add a Flex prompt template action that copies the agent\'s instructions.',
        explanation:
          'A prompt template action sends a single prompt to the LLM. It does not run the agent\'s subagents, actions, or reasoning.',
      },
    ],
    correct: ['c'],
    reference:
      'https://developer.salesforce.com/blogs/2025/04/invoke-agentforce-agents-with-apex-and-flow',
  },
  {
    id: 'AA-113',
    section: 'ai-agents',
    type: 'multiple',
    prompt:
      'Cloud Kicks wants its Service agent on Enhanced Chat to hand conversations to a human rep when customers ask for one. Which items are needed?',
    options: [
      {
        id: 'a',
        text: 'A legacy Chat button in the embedded service deployment',
        explanation:
          'Legacy Chat is being retired and is not how Enhanced Chat conversations are escalated.',
      },
      {
        id: 'b',
        text: 'Toxicity detection turned on in the Einstein Trust Layer',
        explanation:
          'Toxicity scoring flags harmful content. It does not trigger or route a transfer to a human.',
      },
      {
        id: 'c',
        text: 'The Escalation subagent (topic) added to the agent',
        explanation:
          'The Escalation subagent lets the agent recognize a request for a human and start the transfer.',
      },
      {
        id: 'd',
        text: 'A separate Employee agent that watches chats and takes over',
        explanation:
          'Employee agents help internal users. They do not take over customer conversations from a Service agent.',
      },
      {
        id: 'e',
        text: 'An outbound Omni-Channel flow that routes the conversation to a queue or rep',
        explanation:
          'The outbound Omni-Channel flow on the agent\'s connection sends the escalated conversation to the right queue, skill, or rep.',
      },
    ],
    correct: ['c', 'e'],
    reference:
      'https://help.salesforce.com/s/articleView?language=en_US&id=ai.service_agent_escalation.htm&type=5',
  },
  {
    id: 'AA-114',
    section: 'ai-agents',
    type: 'single',
    prompt:
      'UC has its own native mobile app with a fully custom chat interface built by its engineering team. It wants customers to talk to a UC Service agent inside that interface without using any Salesforce-provided chat UI. Which option is most appropriate?',
    options: [
      {
        id: 'a',
        text: 'Embed an Experience Cloud site in a web view in the app.',
        explanation:
          'This would show a Salesforce site UI instead of the team\'s own chat interface, so it does not meet the requirement.',
      },
      {
        id: 'b',
        text: 'Call the Agent API from the app\'s back end to create sessions and send messages.',
        explanation:
          'The Agent API lets custom apps talk to an agent without a Salesforce UI. The app controls the interface and calls the agent through sessions.',
      },
      {
        id: 'c',
        text: 'Invoke the agent from a record-triggered flow when a Case is created from the app.',
        explanation:
          'Flow and Apex can invoke agents for automation inside the org. This does not support a live back-and-forth conversation in a mobile app.',
      },
      {
        id: 'd',
        text: 'Deploy the Agentforce Employee Agent in the Salesforce mobile app.',
        explanation:
          'The Salesforce mobile app is for internal users, and the Employee agent is not meant for customers.',
      },
    ],
    correct: ['b'],
    reference: 'https://developer.salesforce.com/docs/ai/agentforce/guide/agent-api-get-started.html',
  },
  {
    id: 'AA-115',
    section: 'ai-agents',
    type: 'single',
    prompt:
      'A developer at Cloud Kicks tries to call the Agent API with the ID of the org\'s legacy Agentforce (Default) agent, but the integration does not work. The External Client App and OAuth settings have been confirmed correct. What should the Agentforce Specialist advise?',
    options: [
      {
        id: 'a',
        text: 'Give the run-as user the same permission sets as the employees who use the agent.',
        explanation:
          'Permissions are not the problem. The Agent API does not support agents of type Agentforce (Default), whatever the user\'s access.',
      },
      {
        id: 'b',
        text: 'Switch the API calls from streaming to synchronous messages.',
        explanation:
          'Both message modes are available for supported agents. Changing the mode does not make an unsupported agent type work.',
      },
      {
        id: 'c',
        text: 'Target an active agent of a type the Agent API supports, such as a Service agent.',
        explanation:
          'The Agent API is not supported for Agentforce (Default) agents, so the integration should call a supported, active agent.',
      },
      {
        id: 'd',
        text: 'Publish the Agentforce (Default) agent to an Enhanced Chat deployment first.',
        explanation:
          'Enhanced Chat is a customer messaging channel. Adding a channel does not change which agent types the Agent API supports.',
      },
    ],
    correct: ['c'],
    reference: 'https://developer.salesforce.com/docs/ai/agentforce/guide/agent-api-considerations.html',
  },
  {
    id: 'AA-116',
    section: 'ai-agents',
    type: 'multiple',
    prompt:
      'UC is connecting a back-end system to one of its agents through the Agent API. Which steps are part of a correct implementation?',
    options: [
      {
        id: 'a',
        text: 'Set up an External Client App that uses the OAuth client credentials flow with the required scopes.',
        explanation:
          'Agent API calls are authorized through an External Client App (or connected app) using the client credentials flow and scopes such as api and chatbot_api.',
      },
      {
        id: 'b',
        text: 'Publish an Enhanced Chat embedded service deployment for the back-end system to call.',
        explanation:
          'Enhanced Chat deployments are for native web and in-app chat. The Agent API does not need one.',
      },
      {
        id: 'c',
        text: 'Start a session with the agent, send messages in that session, and end the session when done.',
        explanation:
          'The Agent API is session-based: you create a session, exchange messages in it, and then end it.',
      },
      {
        id: 'd',
        text: 'Send each message on its own without a session so the agent stays stateless.',
        explanation:
          'Messages are sent inside a session, which keeps the context of the conversation. Standalone calls are not how the API works.',
      },
      {
        id: 'e',
        text: 'Authenticate with the Experience Cloud site guest user profile.',
        explanation:
          'The guest user is for public site access. The Agent API uses OAuth through an External Client App.',
      },
    ],
    correct: ['a', 'c'],
    reference: 'https://developer.salesforce.com/docs/ai/agentforce/guide/agent-api-get-started.html',
  },
  {
    id: 'AA-117',
    section: 'ai-agents',
    type: 'single',
    prompt:
      'A UC web team uses the Agent API for a custom support portal. Long agent replies make users wait several seconds before anything appears. The team wants text to appear as it is generated. What should they use?',
    options: [
      {
        id: 'a',
        text: 'Synchronous message calls with a longer HTTP timeout',
        explanation:
          'A synchronous call returns the full reply only after it is done. A longer timeout does not make text appear sooner.',
      },
      {
        id: 'b',
        text: 'A new session for every message to reduce context size',
        explanation:
          'Starting new sessions drops the conversation context. It does not stream partial replies.',
      },
      {
        id: 'c',
        text: 'A record-triggered flow that polls the agent every second',
        explanation:
          'Flows cannot poll an Agent API conversation to stream text. This adds complexity without solving the problem.',
      },
      {
        id: 'd',
        text: 'Streaming message calls that return the reply through Server-Sent Events',
        explanation:
          'The Agent API supports streaming with Server-Sent Events, so the portal can show parts of the reply as they arrive.',
      },
    ],
    correct: ['d'],
    reference: 'https://developer.salesforce.com/docs/ai/agentforce/guide/agent-api-get-started.html',
  },
  {
    id: 'AA-118',
    section: 'ai-agents',
    type: 'single',
    prompt:
      'Cloud Kicks uses the Answer Questions with Knowledge action. The agent answers well from most Knowledge articles, but never uses a custom article field that holds sensitive troubleshooting notes. That field is an Encrypted Text field. What explains this behavior?',
    options: [
      {
        id: 'a',
        text: 'The action can only read the standard Title and Summary fields of Knowledge articles.',
        explanation:
          'The action can use custom text fields too, such as Text Area (Long) and Rich Text Area. Only some field types are not supported.',
      },
      {
        id: 'b',
        text: 'Encrypted Text is not one of the field types that the action supports.',
        explanation:
          'Answer Questions with Knowledge supports Text, Text Area, Text Area (Long), and Text Area (Rich) fields. Encrypted Text and URL fields are not supported.',
      },
      {
        id: 'c',
        text: 'The Einstein Trust Layer masks every encrypted field before retrieval.',
        explanation:
          'Trust Layer masking applies to data in prompts. The field is skipped because its type is not supported, not because of masking.',
      },
      {
        id: 'd',
        text: 'The action must be added to a second subagent that is only for sensitive content.',
        explanation:
          'Adding the action to another subagent does not change which field types it can read, so the Encrypted Text field would still be skipped.',
      },
    ],
    correct: ['b'],
    reference:
      'https://help.salesforce.com/s/articleView?language=en_US&id=ai.copilot_actions_ref_answer_questions_with_knowledge.htm&type=5',
  },
  {
    id: 'AA-119',
    section: 'ai-agents',
    type: 'single',
    prompt:
      'UC\'s contact center gets a high volume of phone calls about warranty status. UC wants callers to speak with an AI agent in natural language before being connected to a human if needed. Which capability fits this requirement?',
    options: [
      {
        id: 'a',
        text: 'Einstein Conversation Insights on recorded calls',
        explanation:
          'Conversation Insights analyzes recorded calls after they happen. It does not let an agent talk with callers in real time.',
      },
      {
        id: 'b',
        text: 'The Agentforce Employee Agent in the Salesforce mobile app',
        explanation:
          'The Employee agent serves internal users in Salesforce apps and Slack. It does not answer customer phone calls.',
      },
      {
        id: 'c',
        text: 'Agentforce Voice with a Service agent on Salesforce Voice',
        explanation:
          'Agentforce Voice lets Service agents handle spoken conversations on Salesforce Voice (formerly Service Cloud Voice) telephony, with escalation to humans.',
      },
      {
        id: 'd',
        text: 'Enhanced Chat with voice-note attachments turned on',
        explanation:
          'Enhanced Chat is a messaging channel. Voice notes are not a live phone call with an AI agent.',
      },
    ],
    correct: ['c'],
    reference:
      'https://help.salesforce.com/s/articleView?language=en_US&id=ai.agentforce_voice.htm&type=5',
  },
  {
    id: 'AA-120',
    section: 'ai-agents',
    type: 'single',
    prompt:
      'Cloud Kicks gets hundreds of inbound leads each week, and its reps cannot reply to all of them quickly. Leadership wants an agent that emails these leads on its own, answers product questions and objections, and books meetings for reps. Which agent should the Agentforce Specialist recommend?',
    options: [
      {
        id: 'a',
        text: 'Agentforce Sales Coach',
        explanation:
          'Sales Coach helps reps practice through role-play and gives feedback. It does not contact leads.',
      },
      {
        id: 'b',
        text: 'Agentforce Employee Agent',
        explanation:
          'The Employee agent helps internal users when they ask it something. It does not reach out to leads on its own.',
      },
      {
        id: 'c',
        text: 'Agentforce Service Agent on Enhanced Chat',
        explanation:
          'A Service agent supports customers who contact the company. It is not built to contact leads and book sales meetings.',
      },
      {
        id: 'd',
        text: 'Agentforce Sales Development (SDR) agent',
        explanation:
          'The SDR agent works inbound leads on its own through email, handles questions and objections, and books meetings before handing off to reps.',
      },
    ],
    correct: ['d'],
    reference:
      'https://help.salesforce.com/s/articleView?id=sf.sales_agent_sdr_intro.htm&language=en_US&type=5',
  },
  {
    id: 'AA-121',
    section: 'ai-agents',
    type: 'multiple',
    prompt:
      'A UC agent action cancels a subscription and takes a Subscription Number input. Testing shows the agent sometimes guesses the number from earlier in the chat, or tries to run the action without it. The action must never run without the number, and the value must come from the customer. Which input settings should be enabled?',
    options: [
      {
        id: 'a',
        text: 'Filter from agent action',
        explanation:
          'This is an output setting that keeps a value out of the conversation and the agent\'s response. It does not control how inputs are collected.',
      },
      {
        id: 'b',
        text: 'Require input',
        explanation:
          'Require input means the action cannot run until the agent has a value for this input, so it will not skip the subscription number.',
      },
      {
        id: 'c',
        text: 'Show in conversation',
        explanation:
          'This output setting shows results to the user. It has no effect on where input values come from.',
      },
      {
        id: 'd',
        text: 'Add "never guess the subscription number" to the subagent scope',
        explanation:
          'Scope and instructions guide the LLM but do not guarantee anything. The input settings enforce this behavior more reliably.',
      },
      {
        id: 'e',
        text: 'Collect data from user',
        explanation:
          'Collect data from user tells the agent to ask the customer for the value instead of filling it from context.',
      },
    ],
    correct: ['b', 'e'],
    reference: CUSTOM_ACTION_HELP,
  },
]
