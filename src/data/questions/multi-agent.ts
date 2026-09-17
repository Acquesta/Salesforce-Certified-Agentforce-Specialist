import type { Question } from '../../types/quiz'

export const multiAgentQuestions: Question[] = [
  {
    id: 'MA-001',
    section: 'multi-agent',
    type: 'single',
    prompt:
      'Universal Containers uses a primary agent that hands requests to specialist agents for billing, shipping, and returns. Returns questions are often sent to the shipping agent, which cannot help. What should the Agentforce Specialist do first?',
    options: [
      {
        id: 'a',
        text: 'Add the returns actions to the primary agent so it handles returns directly.',
        explanation:
          'Moving actions onto the primary agent undoes the specialist design and makes the primary agent heavier, without fixing why the handoff was wrong.',
      },
      {
        id: 'b',
        text: 'Merge the shipping and returns specialist agents into one combined agent.',
        explanation:
          'Merging may hide the symptom, but it throws away a separation that may be deliberate. The first step is to make the handoff criteria clear.',
      },
      {
        id: 'c',
        text: 'Increase the primary agent\'s model temperature so it considers more options.',
        explanation:
          'Higher temperature makes choices more random, which would make handoffs less reliable, not more.',
      },
      {
        id: 'd',
        text: 'Rewrite the specialist descriptions to state what each handles and does not.',
        explanation:
          'The primary agent picks a specialist from its description, instructions, and capabilities. Clear, bounded descriptions ("handles returns, not shipping status") reduce overlap and fix the handoff.',
      },
    ],
    correct: ['d'],
    reference: 'https://www.salesforce.com/agentforce/multi-agent-orchestration/',
  },
  {
    id: 'MA-002',
    section: 'multi-agent',
    type: 'single',
    prompt:
      'Cloud Kicks wants its Agentforce agent to use tools and data exposed by an external inventory system through an open standard, instead of building a custom integration for each operation. Which standard fits this need?',
    options: [
      {
        id: 'a',
        text: 'Agent2Agent (A2A) protocol',
        explanation:
          'A2A is for one agent handing tasks to another agent. Here the agent needs to use tools and data, not talk to a peer agent.',
      },
      {
        id: 'b',
        text: 'Model Context Protocol (MCP)',
        explanation:
          'MCP is the open standard for connecting agents to tools, resources, and prompts exposed by MCP servers. Agentforce can act as an MCP client, so those tools become available to the agent.',
      },
      {
        id: 'c',
        text: 'Agent API',
        explanation:
          'The Agent API lets an external app hold a conversation with an Agentforce agent. It works in the opposite direction and is not an open standard for giving an agent tools.',
      },
      {
        id: 'd',
        text: 'Platform Events',
        explanation:
          'Platform Events are a Salesforce event messaging feature. They are not an open agent standard for finding and calling tools.',
      },
    ],
    correct: ['b'],
    reference: 'https://www.salesforce.com/agentforce/mcp-support/',
  },
  {
    id: 'MA-003',
    section: 'multi-agent',
    type: 'single',
    prompt:
      'Universal Containers\' Agentforce Service agent must hand a logistics task to an agent that a partner built on a different AI platform, then receive the result and continue the conversation. Which approach is designed for this?',
    options: [
      {
        id: 'a',
        text: 'Use the Agent2Agent (A2A) protocol, where the partner agent publishes an Agent Card describing its capabilities.',
        explanation:
          'A2A is the open standard for agents on different platforms to talk to each other. The remote agent advertises its skills in an Agent Card, and the client agent sends it tasks and gets results back.',
      },
      {
        id: 'b',
        text: 'Connect the partner system as an MCP server so its agent becomes a tool.',
        explanation:
          'MCP connects an agent to tools and data. Handing a stateful task to another independent agent is what A2A is designed for.',
      },
      {
        id: 'c',
        text: 'Have the partner agent call the Agentforce Agent API to answer for the Service agent.',
        explanation:
          'The Agent API lets external apps talk to an Agentforce agent. It does not let the Service agent hand tasks out to a third-party agent.',
      },
      {
        id: 'd',
        text: 'Install the partner agent from AgentExchange so it runs inside the Service agent.',
        explanation:
          'AgentExchange is a marketplace for finding partner components. It does not provide a protocol for talking to an agent running on another platform.',
      },
    ],
    correct: ['a'],
    reference: 'https://www.salesforce.com/agentforce/ai-agents/agent2agent-protocol/',
  },
  {
    id: 'MA-004',
    section: 'multi-agent',
    type: 'multiple',
    prompt:
      'Cloud Kicks is deciding whether to split its work across several agents or keep one agent with more subagents. Which situations suggest that a multi-agent architecture is appropriate?',
    options: [
      {
        id: 'a',
        text: 'The use case is a small FAQ assistant for one department with a handful of related subagents.',
        explanation:
          'A small use case in one domain is best served by one agent. Adding more agents only adds latency, cost, and complexity.',
      },
      {
        id: 'b',
        text: 'Separate teams own distinct domains, such as HR and finance, that need different agent users and security contexts.',
        explanation:
          'Clear domain ownership and different security needs are strong reasons to use separate specialist agents with a primary agent in front.',
      },
      {
        id: 'c',
        text: 'The agent needs to call one additional external REST API.',
        explanation:
          'A single extra integration can be added as an action (or through MCP) on the existing agent. It does not justify another agent.',
      },
      {
        id: 'd',
        text: 'The team wants the lowest possible response time for simple requests.',
        explanation:
          'Handing work between agents adds steps and usually more latency. Speed alone is not a reason to go multi-agent.',
      },
      {
        id: 'e',
        text: 'One agent has grown to many overlapping subagents and actions, and routing accuracy is dropping.',
        explanation:
          'When too many overlapping capabilities hurt routing in one agent, splitting them into focused specialist agents can bring accuracy back.',
      },
    ],
    correct: ['b', 'e'],
    reference: 'https://www.salesforce.com/agentforce/multi-agent-orchestration/',
  },
  {
    id: 'MA-005',
    section: 'multi-agent',
    type: 'single',
    prompt:
      'Universal Containers\' developers use an external AI assistant that supports MCP. They want it to access Salesforce data and run approved Flows securely, without building and hosting their own integration server. What should the Agentforce Specialist recommend?',
    options: [
      {
        id: 'a',
        text: 'Publish the Flows as Agent2Agent tasks through an Agent Card.',
        explanation:
          'A2A is for talking to another agent. The external assistant needs access to tools and data, which is what MCP provides.',
      },
      {
        id: 'b',
        text: 'Give the assistant the Agent API endpoint of an Agentforce Service agent.',
        explanation:
          'The Agent API lets the assistant chat with an Agentforce agent. It does not expose Salesforce data and Flows as MCP tools.',
      },
      {
        id: 'c',
        text: 'Use Salesforce Hosted MCP Servers to expose the Salesforce data and Flows to MCP clients.',
        explanation:
          'Salesforce Hosted MCP Servers expose Salesforce capabilities, such as data, Flows, and Apex, as MCP tools that external MCP clients can use, with Salesforce hosting and securing the server.',
      },
      {
        id: 'd',
        text: 'Install a prompt template from AgentExchange into the external assistant.',
        explanation:
          'AgentExchange components are installed into Salesforce orgs. A prompt template would not give an outside assistant access to Salesforce data or Flows.',
      },
    ],
    correct: ['c'],
    reference: 'https://developer.salesforce.com/blogs/2026/04/salesforce-hosted-mcp-servers-are-now-generally-available',
  },
  {
    id: 'MA-006',
    section: 'multi-agent',
    type: 'single',
    prompt:
      'Cloud Kicks wants to speed up its Agentforce rollout by finding ready-made partner actions, subagent templates, and MCP server integrations instead of building everything itself. Where should the Agentforce Specialist look?',
    options: [
      {
        id: 'a',
        text: 'Testing Center',
        explanation:
          'Testing Center runs batch tests on agents. It is not a place to find partner components.',
      },
      {
        id: 'b',
        text: 'The Agent2Agent protocol registry',
        explanation:
          'A2A is a communication standard between agents, not a Salesforce marketplace for installable actions and templates.',
      },
      {
        id: 'c',
        text: 'AgentExchange',
        explanation:
          'AgentExchange is the Salesforce marketplace for partner-built Agentforce components, such as actions, subagent and prompt templates, and MCP server integrations.',
      },
      {
        id: 'd',
        text: 'Agent Analytics',
        explanation:
          'Agent Analytics reports on how agents perform. It does not offer components to install.',
      },
    ],
    correct: ['c'],
    reference: 'https://www.salesforce.com/news/press-releases/2025/03/04/agentexchange-announcement/',
  },
]
