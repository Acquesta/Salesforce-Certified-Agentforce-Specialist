import type { Question } from '../../types/quiz'

const SUBAGENTS_HELP =
  'https://help.salesforce.com/s/articleView?language=en_US&id=ai.agent_topics.htm&type=5'
const FIVE_LEVELS = 'https://www.salesforce.com/agentforce/five-levels-of-determinism/'
const HYBRID_ARCH =
  'https://architect.salesforce.com/docs/architect/fundamentals/guide/hybrid-reasoning-agentforce-builder-agent-script'
const NEW_BUILDER =
  'https://trailhead.salesforce.com/content/learn/modules/new-agentforce-builder-quick-look/explore-the-new-agentforce-builder'
const VARIABLES_FILTERS =
  'https://developer.salesforce.com/blogs/2025/04/control-agent-access-and-decision-making-with-variables-and-filters'

export const aiAgentsReasoningQuestions: Question[] = [
  {
    id: 'AA-001',
    section: 'ai-agents',
    type: 'single',
    prompt:
      'Universal Containers has a service agent with an Order Status subagent and a Shipping Issues subagent. When customers ask "Where is my package?", the agent frequently routes to Shipping Issues instead of Order Status. What should the Agentforce Specialist do first?',
    options: [
      {
        id: 'a',
        text: 'Add an instruction to Order Status that says it must always handle package questions.',
        explanation:
          'Instructions are only read after a subagent has already been selected, so they cannot influence which subagent is chosen for the utterance.',
      },
      {
        id: 'b',
        text: 'Expand the Scope of Order Status to explicitly list package tracking requests.',
        explanation:
          'Scope describes what a subagent does and does not do once it is active. It is not used to classify the incoming utterance, so routing will not improve.',
      },
      {
        id: 'c',
        text: 'Rewrite both classification descriptions so they are distinct and do not overlap.',
        explanation:
          'The reasoning engine matches the utterance against subagent classification descriptions. Overlapping descriptions cause misrouting, so making them semantically distinct is the right fix.',
      },
      {
        id: 'd',
        text: 'Assign the order lookup action to both subagents so either one can respond.',
        explanation:
          'Duplicating actions hides the routing problem instead of fixing it and increases overlap between subagents, which makes classification even less reliable.',
      },
    ],
    correct: ['c'],
    reference: SUBAGENTS_HELP,
  },
  {
    id: 'AA-002',
    section: 'ai-agents',
    type: 'single',
    prompt:
      'Cloud Kicks built a Rewards subagent in Agent Script. A before_reasoning block already loads the customer\'s loyalty tier into a loyalty_tier variable. The prompt instructions must include the actual tier value so the LLM tailors its offers. What should the Agentforce Specialist do?',
    options: [
      {
        id: 'a',
        text: 'Add an "available when" condition on the subagent that checks loyalty_tier.',
        explanation:
          'An "available when" condition gates whether something is offered to the LLM. It does not insert the variable\'s value into the prompt text.',
      },
      {
        id: 'b',
        text: 'Reference the variable in the prompt instruction as {!@variables.loyalty_tier}.',
        explanation:
          'Correct. A template expression injects the current variable value into the natural-language instruction at runtime, so the LLM reasons with the real tier.',
      },
      {
        id: 'c',
        text: 'Add a prompt instruction telling the LLM to work out the customer\'s tier.',
        explanation:
          'The LLM cannot see the variable value unless it is injected, so it would guess the tier and results would vary.',
      },
      {
        id: 'd',
        text: 'Type a list of all loyalty tiers as static text in the system block.',
        explanation:
          'Static text is the same for every customer and the system block applies to the whole agent, so the LLM still would not know this customer\'s tier.',
      },
    ],
    correct: ['b'],
    reference:
      'https://developer.salesforce.com/sample-apps/agent-script-recipes/language-essentials/template-expressions',
  },
  {
    id: 'AA-003',
    section: 'ai-agents',
    type: 'single',
    prompt:
      'Cloud Kicks deploys a service agent for sneaker orders. A customer asks it for tomorrow\'s weather forecast, and the agent politely declines. Which part of the reasoning process produced this outcome?',
    options: [
      {
        id: 'a',
        text: 'The Einstein Trust Layer toxicity detection blocked the request.',
        explanation:
          'A weather question is not toxic. Toxicity scoring flags harmful content; it is not what handles requests that fall outside the agent\'s subagents.',
      },
      {
        id: 'b',
        text: 'No classification description matched, so the Off Topic subagent handled it.',
        explanation:
          'Correct. When an utterance matches none of the configured subagents, the reasoning engine routes it to the Off Topic subagent, which responds that the request is outside what the agent can help with.',
      },
      {
        id: 'c',
        text: 'The grounding check removed the forecast because no action returned it.',
        explanation:
          'The grounding check validates responses against action outputs, but the refusal comes from routing to Off Topic before any action planning happens.',
      },
      {
        id: 'd',
        text: 'The agent reached its maximum number of LLM calls in the reasoning loop.',
        explanation:
          'Hitting the loop limit happens on long multi-step plans, not on a single simple out-of-scope question.',
      },
    ],
    correct: ['b'],
    reference: FIVE_LEVELS,
  },
  {
    id: 'AA-004',
    section: 'ai-agents',
    type: 'multiple',
    prompt:
      'An Agentforce Specialist is explaining to stakeholders how the Atlas Reasoning Engine processes a customer utterance in an agent built with subagents and actions. Which statements accurately describe this process?',
    options: [
      {
        id: 'a',
        text: 'The engine selects one subagent for the utterance by comparing it to classification descriptions.',
        explanation:
          'Correct. Subagent selection matches the utterance to the classification descriptions and chooses a single subagent; the conversation can pivot to another subagent on a later message.',
      },
      {
        id: 'b',
        text: 'The engine runs every action assigned to the selected subagent in the order they were added.',
        explanation:
          'The engine chooses which action, if any, is needed. It can also ask a clarifying question or respond directly instead of running all actions.',
      },
      {
        id: 'c',
        text: 'The engine reads each subagent\'s Scope first to rank subagents before classifying the request.',
        explanation:
          'Scope is only considered after a subagent has been selected. Ranking and routing depend on classification descriptions.',
      },
      {
        id: 'd',
        text: 'Before the reply is sent, a grounding check validates it against the outputs of the actions.',
        explanation:
          'Correct. After the reason-act-observe loop finishes, the response is checked against action results to reduce ungrounded answers.',
      },
      {
        id: 'e',
        text: 'The engine merges several matching subagents and combines all their instructions in one prompt.',
        explanation:
          'Only one subagent is active for an utterance. Merging subagents would defeat the purpose of separating jobs into distinct subagents.',
      },
    ],
    correct: ['a', 'd'],
    reference: FIVE_LEVELS,
  },
  {
    id: 'AA-005',
    section: 'ai-agents',
    type: 'single',
    prompt:
      'Universal Containers built an employee agent with more than 20 subagents, several of which have nearly identical descriptions and 15 or more actions each. Routing and action choice have become inconsistent. Which approach follows Salesforce best practices?',
    options: [
      {
        id: 'a',
        text: 'Add detailed instructions to every subagent explaining when the others should be used instead.',
        explanation:
          'Adding more instructions does not fix classification, and long instruction lists across many subagents make behavior less predictable.',
      },
      {
        id: 'b',
        text: 'Move company policy documents into subagent instructions so the LLM has more context.',
        explanation:
          'Policies belong in knowledge used for grounding, not in instructions. Stuffing instructions with policy text adds noise and hurts reliability.',
      },
      {
        id: 'c',
        text: 'Raise the model temperature so the reasoning engine explores more subagent options.',
        explanation:
          'Agents do not expose a temperature setting for routing, and more randomness would make selection less consistent, not more.',
      },
      {
        id: 'd',
        text: 'Consolidate into fewer, clearly distinct subagents, each with a focused set of actions.',
        explanation:
          'Correct. Salesforce guidance recommends keeping subagents to a small number (around 10 or fewer) with semantically distinct descriptions and limiting actions per subagent.',
      },
    ],
    correct: ['d'],
    reference: FIVE_LEVELS,
  },
  {
    id: 'AA-006',
    section: 'ai-agents',
    type: 'single',
    prompt:
      'Cloud Kicks requires that its service agent never runs the Get Order Details action until the customer has been verified. Testing shows the agent occasionally skips verification. What is the most reliable way to enforce this requirement in the legacy Agentforce Builder?',
    options: [
      {
        id: 'a',
        text: 'Add a subagent instruction stating that the agent must ALWAYS verify the customer first.',
        explanation:
          'Instructions are interpreted by the LLM and remain probabilistic, which is exactly why verification is sometimes skipped.',
      },
      {
        id: 'b',
        text: 'Have the verification action set a Verified variable and add a filter on Get Order Details.',
        explanation:
          'Correct. A filter based on a variable deterministically hides the action until the condition, such as Verified equals true, is met, without relying on the LLM.',
      },
      {
        id: 'c',
        text: 'Enable data masking in the Einstein Trust Layer so order details stay hidden until verification.',
        explanation:
          'Masking protects sensitive data sent to the LLM; it does not control when an action can be invoked or enforce a verification step.',
      },
      {
        id: 'd',
        text: 'Rename the action so its description says it is only for verified customers.',
        explanation:
          'Action descriptions guide the LLM but do not enforce anything. The model could still select the action before verification.',
      },
    ],
    correct: ['b'],
    reference: VARIABLES_FILTERS,
  },
  {
    id: 'AA-007',
    section: 'ai-agents',
    type: 'single',
    prompt:
      'An Agentforce Specialist needs to store the customer ID returned by a verification action so that later actions in the same session can use it as an input. Which type of variable should be used?',
    options: [
      {
        id: 'a',
        text: 'A context variable mapped from the MessagingSession record.',
        explanation:
          'Context variables provide system session data, such as the end user language, and are read-only to the agent. Action outputs cannot be written to them.',
      },
      {
        id: 'b',
        text: 'A merge field referenced in the agent\'s description.',
        explanation:
          'The agent description helps classification and behavior; it is not a storage mechanism for values produced during the conversation.',
      },
      {
        id: 'c',
        text: 'A custom variable that is set from the verification action\'s output.',
        explanation:
          'Correct. Custom variables are session-scoped, can be populated from action outputs, and can then be passed as inputs to other actions or used in filters.',
      },
      {
        id: 'd',
        text: 'A context variable enabled with "Allow value to be set by API".',
        explanation:
          'The API-settable option applies to custom variables, and in any case it lets an external caller set the value, not an action output during the session.',
      },
    ],
    correct: ['c'],
    reference: VARIABLES_FILTERS,
  },
  {
    id: 'AA-008',
    section: 'ai-agents',
    type: 'multiple',
    prompt:
      'Universal Containers wants its service agent to verify a customer and then return only that customer\'s orders. Which steps together create a deterministic and secure design?',
    options: [
      {
        id: 'a',
        text: 'Add a filter so the order lookup action is available only when the Verified variable is true.',
        explanation:
          'Correct. The filter guarantees that the order action cannot be selected until verification has succeeded.',
      },
      {
        id: 'b',
        text: 'Rely on the Einstein Trust Layer to mask orders that belong to other customers.',
        explanation:
          'The Trust Layer does not know which records belong to which customer and does not replace data access logic in the action.',
      },
      {
        id: 'c',
        text: 'Pass the verified customer ID variable into the Flow so its query returns only that customer\'s records.',
        explanation:
          'Correct. Verification alone does not restrict data. The action must use the verified ID to scope the records it retrieves.',
      },
      {
        id: 'd',
        text: 'Instruct the LLM to ignore any orders in the action output that do not match the customer name.',
        explanation:
          'This depends on the model following an instruction after the data has already been retrieved, which is neither deterministic nor secure.',
      },
      {
        id: 'e',
        text: 'Write the verified customer ID into a context variable so it cannot be changed later.',
        explanation:
          'Context variables are read-only session data supplied by the system; actions cannot write verification results to them.',
      },
    ],
    correct: ['a', 'c'],
    reference: VARIABLES_FILTERS,
  },
  {
    id: 'AA-009',
    section: 'ai-agents',
    type: 'single',
    prompt:
      'A compliance manager at Cloud Kicks asks why the team should rebuild its agent with hybrid reasoning in the new Agentforce Builder. Which statement best describes the main benefit?',
    options: [
      {
        id: 'a',
        text: 'It replaces the LLM with rules, so the agent no longer needs a reasoning engine.',
        explanation:
          'Hybrid reasoning still uses the LLM and the Atlas Reasoning Engine. It limits the LLM to the steps that need it rather than removing it.',
      },
      {
        id: 'b',
        text: 'It sends every step to two different LLMs and keeps the answer they agree on.',
        explanation:
          'Hybrid does not mean combining models. It means combining deterministic execution with LLM reasoning.',
      },
      {
        id: 'c',
        text: 'It removes the need for subagents because a single prompt handles all requests.',
        explanation:
          'Agents built with hybrid reasoning still organize work into subagents with their own reasoning and actions.',
      },
      {
        id: 'd',
        text: 'Critical steps run deterministically, and the LLM is used only for language and ambiguity.',
        explanation:
          'Correct. Hybrid reasoning separates deterministic execution of business logic from LLM reasoning, giving predictable routing and auditable behavior while keeping natural conversation.',
      },
    ],
    correct: ['d'],
    reference: HYBRID_ARCH,
  },
  {
    id: 'AA-010',
    section: 'ai-agents',
    type: 'single',
    prompt:
      'At Universal Containers, an admin designs an agent in Canvas view of the new Agentforce Builder. A developer later opens Script view to add conditional logic. What happens to the admin\'s work?',
    options: [
      {
        id: 'a',
        text: 'Both views edit the same agent, so the changes stay in sync across views.',
        explanation:
          'Correct. Canvas view and Script view are two ways of editing the same Agent Script definition, and changes made in one are reflected in the other.',
      },
      {
        id: 'b',
        text: 'Script view creates a separate copy of the agent that must be merged into the original.',
        explanation:
          'Script view does not fork the agent. It displays the same agent definition as Agent Script.',
      },
      {
        id: 'c',
        text: 'The Canvas view layout is discarded once the agent has been edited in Script view.',
        explanation:
          'Editing in Script view does not lock out or delete the Canvas view; admins can keep working in Canvas.',
      },
      {
        id: 'd',
        text: 'Script view is read-only until the developer is assigned a separate developer license.',
        explanation:
          'No separate license is needed to edit in Script view. Agent Script is included with Agentforce.',
      },
    ],
    correct: ['a'],
    reference: NEW_BUILDER,
  },
  {
    id: 'AA-011',
    section: 'ai-agents',
    type: 'single',
    prompt:
      'An architect reviews how an agent written in Agent Script runs. The script is compiled into an Agent Graph and executed by the Atlas Reasoning Engine. Which part of the graph invokes the LLM?',
    options: [
      {
        id: 'a',
        text: 'A conditional check that compares a variable value to decide the next step.',
        explanation:
          'Conditionals are deterministic nodes that run as code without calling the LLM.',
      },
      {
        id: 'b',
        text: 'A deterministic transition that hands the conversation to another subagent.',
        explanation:
          'Scripted transitions are executed directly by the runtime and do not need LLM reasoning.',
      },
      {
        id: 'c',
        text: 'A reasoning step that contains natural-language prompt instructions.',
        explanation:
          'Correct. Prompt instructions are sent to the LLM, while actions, conditionals, variable sets, and transitions run deterministically.',
      },
      {
        id: 'd',
        text: 'A step that stores an action\'s output in a variable.',
        explanation:
          'Setting a variable from an action result is a deterministic operation handled by the runtime, not by the LLM.',
      },
    ],
    correct: ['c'],
    reference: HYBRID_ARCH,
  },
  {
    id: 'AA-012',
    section: 'ai-agents',
    type: 'single',
    prompt:
      'In Agent Script, an Agentforce Specialist adds an "available when" condition to a Process Refund action so that it depends on a refund_eligible variable. How does this condition behave at runtime?',
    options: [
      {
        id: 'a',
        text: 'It adds a hint to the prompt suggesting the LLM should check eligibility first.',
        explanation:
          'An "available when" condition is not a suggestion in the prompt; it is enforced by the platform regardless of what the LLM decides.',
      },
      {
        id: 'b',
        text: 'The action is not presented to the LLM at all unless the condition is true.',
        explanation:
          'Correct. The platform evaluates the gate, and when it is false the action is simply not available for the LLM to choose.',
      },
      {
        id: 'c',
        text: 'The action always runs, and its output is discarded when the condition is false.',
        explanation:
          'The gate prevents the action from being offered in the first place, so the action does not run and discard results.',
      },
      {
        id: 'd',
        text: 'The LLM evaluates the condition and decides whether it is satisfied.',
        explanation:
          'The condition is evaluated deterministically against the variable value. Leaving it to the LLM would reintroduce unpredictability.',
      },
    ],
    correct: ['b'],
    reference: HYBRID_ARCH,
  },
  {
    id: 'AA-013',
    section: 'ai-agents',
    type: 'multiple',
    prompt:
      'An Agentforce Specialist is reviewing an Agent Script subagent that mixes logic instructions and prompt instructions. Which elements are logic instructions that run deterministically?',
    options: [
      {
        id: 'a',
        text: 'A line telling the agent to respond in a warm, empathetic tone.',
        explanation:
          'This is a natural-language prompt instruction that is sent to the LLM, so its effect is probabilistic.',
      },
      {
        id: 'b',
        text: 'Running a lookup action with an input bound to a variable.',
        explanation:
          'Correct. Explicitly running an action with bound inputs is a logic instruction executed by the runtime.',
      },
      {
        id: 'c',
        text: 'A line asking the agent to summarize the order history for the customer.',
        explanation:
          'Summarizing requires language generation, so this is a prompt instruction handled by the LLM.',
      },
      {
        id: 'd',
        text: 'A line telling the agent to ask clarifying questions when a request is vague.',
        explanation:
          'This guides the LLM\'s conversational judgment and is therefore a prompt instruction, not deterministic logic.',
      },
      {
        id: 'e',
        text: 'An if/else check that sets a variable based on an action result.',
        explanation:
          'Correct. Conditionals and variable assignments are logic instructions that execute as code without the LLM.',
      },
    ],
    correct: ['b', 'e'],
    reference: HYBRID_ARCH,
  },
  {
    id: 'AA-014',
    section: 'ai-agents',
    type: 'single',
    prompt:
      'Cloud Kicks wants its agent to check whether the user is authenticated and load the customer\'s loyalty tier into a variable before the LLM reasons about each request in a subagent. Where should this logic be placed in Agent Script?',
    options: [
      {
        id: 'a',
        text: 'In the subagent\'s before_reasoning block.',
        explanation:
          'Correct. before_reasoning runs before the LLM sees the context, making it the place for authentication checks and data hydration.',
      },
      {
        id: 'b',
        text: 'In the subagent\'s after_reasoning block.',
        explanation:
          'after_reasoning runs once reasoning has completed, which is too late for data the LLM needs while it reasons.',
      },
      {
        id: 'c',
        text: 'In the config block as agent metadata.',
        explanation:
          'The config block holds agent metadata; it does not execute actions or checks during a conversation.',
      },
      {
        id: 'd',
        text: 'As a prompt instruction asking the LLM to check authentication.',
        explanation:
          'A prompt instruction makes the check depend on the LLM, so it could be skipped. Authentication should be scripted deterministically.',
      },
    ],
    correct: ['a'],
    reference: HYBRID_ARCH,
  },
  {
    id: 'AA-015',
    section: 'ai-agents',
    type: 'single',
    prompt:
      'During testing, an agent built with Agent Script keeps calling the same Send Confirmation action several times in one conversation. What is the recommended way to prevent this loop?',
    options: [
      {
        id: 'a',
        text: 'Add a prompt instruction telling the LLM to send the confirmation only once.',
        explanation:
          'Prompt instructions are probabilistic, so the LLM may still repeat the action. A deterministic gate is more reliable.',
      },
      {
        id: 'b',
        text: 'Move the action to a separate subagent with no instructions.',
        explanation:
          'Moving the action does not stop it from being selected repeatedly; the missing control is a condition that closes after it runs.',
      },
      {
        id: 'c',
        text: 'Let the LLM set a has_run variable whenever it believes the action succeeded.',
        explanation:
          'Gate variables should never be set by the LLM, because the model could set them incorrectly and bypass or break the control.',
      },
      {
        id: 'd',
        text: 'Set a has_run variable after the action runs and gate the action with "available when".',
        explanation:
          'Correct. Setting a flag deterministically after execution and using it in the "available when" condition closes the gate so the action cannot be offered again.',
      },
    ],
    correct: ['d'],
    reference: HYBRID_ARCH,
  },
  {
    id: 'AA-016',
    section: 'ai-agents',
    type: 'single',
    prompt:
      'An Agentforce Specialist opens an agent in Script view and wants to find the part of the agent that acts as its entry point and routes user requests to the appropriate subagent, the role previously called the Topic Selector. Which building block should they look at?',
    options: [
      {
        id: 'a',
        text: 'The system block.',
        explanation:
          'The system block holds global instructions and messages that apply to the whole agent, not the routing logic.',
      },
      {
        id: 'b',
        text: 'The variables block.',
        explanation:
          'The variables block declares the data the agent stores and reads; it does not decide which subagent handles a request.',
      },
      {
        id: 'c',
        text: 'The start_agent block.',
        explanation:
          'Correct. The start_agent block is the entry point that routes requests to subagents and is presented as the Agent Router, formerly the Topic Selector.',
      },
      {
        id: 'd',
        text: 'The after_reasoning block of the first subagent.',
        explanation:
          'after_reasoning runs at the end of a subagent\'s reasoning. It can transition deterministically, but it is not the agent\'s entry point.',
      },
    ],
    correct: ['c'],
    reference: 'https://developer.salesforce.com/docs/ai/agentforce/guide/ascript-patterns-topic-selector.html',
  },
  {
    id: 'AA-017',
    section: 'ai-agents',
    type: 'single',
    prompt:
      'Universal Containers is building an agent that creates cases and updates orders. The team wants to preview conversations in the new Agentforce Builder without changing any real records. Which option should they use?',
    options: [
      {
        id: 'a',
        text: 'Live Test mode in the Preview panel.',
        explanation:
          'Live Test runs real actions, so cases and orders could actually be created or updated.',
      },
      {
        id: 'b',
        text: 'Simulate mode in the Preview panel.',
        explanation:
          'Correct. Simulate mode uses mocked actions and data, so the team can review the conversation and trace without changing records.',
      },
      {
        id: 'c',
        text: 'Activating the agent and chatting with it on an Enhanced Chat deployment.',
        explanation:
          'An activated agent on a live channel runs real actions against real data, which is the opposite of what the team wants.',
      },
      {
        id: 'd',
        text: 'Committing a version so actions run in read-only mode.',
        explanation:
          'Committing a version creates an immutable snapshot of the agent; it does not make actions read-only.',
      },
    ],
    correct: ['b'],
    reference: NEW_BUILDER,
  },
  {
    id: 'AA-018',
    section: 'ai-agents',
    type: 'multiple',
    prompt:
      'Cloud Kicks manages its agent versions in the new Agentforce Builder. Which statements about committing and activating versions are accurate?',
    options: [
      {
        id: 'a',
        text: 'A committed version can be edited in place, and the edits apply immediately to users.',
        explanation:
          'Committed versions are immutable. Changes require a new draft that is committed and activated.',
      },
      {
        id: 'b',
        text: 'Several versions of the same agent can be active at once to split traffic between them.',
        explanation:
          'Only one version of an agent can be active at a time, so traffic splitting between active versions is not supported this way.',
      },
      {
        id: 'c',
        text: 'Committing a version creates an immutable snapshot that can then be activated.',
        explanation:
          'Correct. Commit Version freezes the draft, compiles it into runtime metadata, and makes it ready for activation.',
      },
      {
        id: 'd',
        text: 'Activating a new version automatically deactivates the previously active version.',
        explanation:
          'Correct. Because only one version can be active, activating one version replaces the version that was active before.',
      },
      {
        id: 'e',
        text: 'Saving a draft publishes the changes to the currently active version.',
        explanation:
          'Saving only preserves the draft. The changes reach users only after the draft is committed and that version is activated.',
      },
    ],
    correct: ['c', 'd'],
    reference: NEW_BUILDER,
  },
  {
    id: 'AA-019',
    section: 'ai-agents',
    type: 'single',
    prompt:
      'Universal Containers\' agent must calculate a refund amount using a fixed multi-step business formula, and auditors require the result to be identical every time. The current subagent instructions describe the formula in natural language, and results vary. What should the Agentforce Specialist do?',
    options: [
      {
        id: 'a',
        text: 'Move the calculation into a deterministic action and have the agent call it.',
        explanation:
          'Correct. Deterministic actions such as a Flow or Apex run the same logic every time, which is a higher level of determinism than instructions.',
      },
      {
        id: 'b',
        text: 'Rewrite the instructions with more examples of correct refund calculations.',
        explanation:
          'Better instructions may improve results, but the LLM still interprets them, so identical results cannot be guaranteed.',
      },
      {
        id: 'c',
        text: 'Ground the subagent on a knowledge article that explains the formula.',
        explanation:
          'Data grounding gives the LLM better context, but the LLM would still perform the calculation, so results could still vary.',
      },
      {
        id: 'd',
        text: 'Split the formula across several subagents so each performs one step.',
        explanation:
          'Spreading the steps across subagents adds routing complexity and still leaves each step to the LLM.',
      },
    ],
    correct: ['a'],
    reference: FIVE_LEVELS,
  },
  {
    id: 'AA-020',
    section: 'ai-agents',
    type: 'single',
    prompt:
      'Cloud Kicks wants its agent to answer questions about return and warranty policies. An Agentforce Specialist proposes pasting the full policy text into the instructions of a custom subagent. What is the better approach?',
    options: [
      {
        id: 'a',
        text: 'Paste the policies into the agent\'s description so every subagent can see them.',
        explanation:
          'The agent description supports routing and overall behavior. Long policy text there adds noise and does not provide retrieval-based grounding.',
      },
      {
        id: 'b',
        text: 'Create one subagent per policy, with the policy text in each classification description.',
        explanation:
          'Classification descriptions should briefly describe the job of a subagent. Filling them with policy text creates overlap and harms routing.',
      },
      {
        id: 'c',
        text: 'Keep the policy text in instructions but split it into more than 20 short instructions.',
        explanation:
          'Salesforce recommends a small number of focused instructions per subagent. Many policy-style instructions make behavior less predictable.',
      },
      {
        id: 'd',
        text: 'Store policies as knowledge and use the Answer Questions with Knowledge action.',
        explanation:
          'Correct. Policies belong in knowledge used for grounding, and the standard Answer Questions with Knowledge action retrieves relevant content from a data library.',
      },
    ],
    correct: ['d'],
    reference:
      'https://help.salesforce.com/s/articleView?language=en_US&id=ai.copilot_actions_ref_answer_questions_with_knowledge.htm&type=5',
  },
  {
    id: 'AA-021',
    section: 'ai-agents',
    type: 'multiple',
    prompt:
      'Universal Containers is converting a legacy service agent to Agent Script. Which design choices follow Salesforce guidance for using hybrid reasoning effectively?',
    options: [
      {
        id: 'a',
        text: 'Script every turn of the conversation so the LLM is never used for responses.',
        explanation:
          'Over-scripting removes the conversational flexibility that makes agents useful. The LLM should still handle natural language and ambiguity.',
      },
      {
        id: 'b',
        text: 'Script critical paths, such as authentication and compliance, and keep the middle flexible.',
        explanation:
          'Correct. Guidance is to make business-critical steps deterministic while leaving the rest of the conversation to LLM reasoning.',
      },
      {
        id: 'c',
        text: 'Let the LLM fill the is_verified variable from the conversation when the customer confirms their identity.',
        explanation:
          'Gate variables should never be set by the LLM, because a customer could simply claim to be verified.',
      },
      {
        id: 'd',
        text: 'Rely on prompt instructions written in capital letters to enforce mandatory steps.',
        explanation:
          'Emphasis does not make a prompt instruction deterministic. Mandatory steps should use logic instructions or gates.',
      },
      {
        id: 'e',
        text: 'Set gate variables from action results so conditions reflect verified system data.',
        explanation:
          'Correct. Binding gate variables to action outputs deterministically keeps controls such as "available when" trustworthy.',
      },
    ],
    correct: ['b', 'e'],
    reference: HYBRID_ARCH,
  },
]
