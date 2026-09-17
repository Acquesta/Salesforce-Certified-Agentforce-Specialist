import type { Question } from '../../types/quiz'

export const testingDeploymentQuestions: Question[] = [
  {
    id: 'TD-001',
    section: 'testing-deployment',
    type: 'single',
    prompt:
      'Universal Containers (UC) has a Service agent whose actions create and update Case records. After every change, UC wants to check about 500 customer utterances to confirm the agent still picks the right subagent and actions. What is the most appropriate approach?',
    options: [
      {
        id: 'a',
        text: 'Type the utterances one by one into the Agentforce Builder preview panel in production.',
        explanation:
          'The builder preview is for quick, interactive checks of individual conversations. It does not scale to hundreds of utterances or compare results with expected values, and doing it in production risks changing live data.',
      },
      {
        id: 'b',
        text: 'Run a batch test in Testing Center in a sandbox, comparing each utterance with its expected subagent and actions.',
        explanation:
          'Testing Center is built for batch testing at scale against expected subagents (topics), actions, and responses. Tests run real actions that can change CRM data, so Salesforce recommends running them in a sandbox.',
      },
      {
        id: 'c',
        text: 'Run a batch test in Testing Center in production so the results reflect real customer records.',
        explanation:
          'Testing Center runs real actions, so a test in production could create or update live Case records. The recommended place for batch tests is a sandbox.',
      },
      {
        id: 'd',
        text: 'Activate the agent and review the Utterance Analysis dashboard after a week of live traffic.',
        explanation:
          'Utterance Analysis looks back at real usage after release. It does not validate a change before customers are exposed to it and has no expected values to compare against.',
      },
    ],
    correct: ['b'],
    reference: 'https://help.salesforce.com/s/articleView?language=en_US&id=ai.agent_testing_center.htm&type=5',
  },
  {
    id: 'TD-002',
    section: 'testing-deployment',
    type: 'single',
    prompt:
      'An Agentforce Specialist uploads a CSV of test cases to Testing Center. In the builder preview the agent handles each utterance correctly, yet the topic and action checks fail for almost every test case. The CSV lists values such as "Order Status" and "Look Up Order". What is the most likely cause?',
    options: [
      {
        id: 'a',
        text: 'The CSV uses labels instead of the API names of the subagents and actions.',
        explanation:
          'The expected topic and expected actions columns must contain API names. Labels such as "Order Status" do not match what the agent actually selected, so the checks fail even when the agent behaves correctly.',
      },
      {
        id: 'b',
        text: 'Testing Center only accepts test cases that it generated with AI.',
        explanation:
          'CSV upload using the downloadable test template is a supported way to create test cases, alongside AI-generated test cases.',
      },
      {
        id: 'c',
        text: 'The agent must be deactivated before Testing Center can evaluate it.',
        explanation:
          'Deactivating the agent would not change how expected values are matched. The failures come from what the CSV contains, not from the activation state.',
      },
      {
        id: 'd',
        text: 'The expected response column is empty, which disables topic and action checks.',
        explanation:
          'Each expected column is evaluated separately. An empty expected value counts as a failure for that check, but it does not turn off the topic and action checks.',
      },
    ],
    correct: ['a'],
    reference: 'https://trailhead.salesforce.com/content/learn/modules/agentforce-agent-testing/set-up-testing-criteria',
  },
  {
    id: 'TD-003',
    section: 'testing-deployment',
    type: 'single',
    prompt:
      'Cloud Kicks tests a refund agent in Testing Center. The response evaluation passes when the wording differs from the expected response, but the team also needs to confirm that the reply contains the exact refund amount returned by an action. What should the Agentforce Specialist use?',
    options: [
      {
        id: 'a',
        text: 'Write the exact sentence in the Expected Response column so the evaluation switches to exact matching.',
        explanation:
          'The expected response is judged by meaning (an LLM compares actual and expected), not by exact text. Writing a precise sentence does not make it an exact string check.',
      },
      {
        id: 'b',
        text: 'Raise the coherence and completeness thresholds for the test.',
        explanation:
          'Coherence and completeness are general quality metrics. They do not check that a specific number appears in the response.',
      },
      {
        id: 'c',
        text: 'Add the refund action API name to the Expected Actions column.',
        explanation:
          'An expected action confirms that the action ran. It does not check the value in the output or whether the reply shows the right amount.',
      },
      {
        id: 'd',
        text: 'Add a custom evaluation that checks the response or action output for the specific value.',
        explanation:
          'Custom evaluations check responses or action outputs for specific strings or numbers. That fills the gap left by the meaning-based response evaluation.',
      },
    ],
    correct: ['d'],
    reference: 'https://developer.salesforce.com/docs/einstein/genai/guide/testing-api-custom-evaluation-criteria.html',
  },
  {
    id: 'TD-004',
    section: 'testing-deployment',
    type: 'multiple',
    prompt:
      'Universal Containers is setting up its first Testing Center test and needs test cases. Which are supported ways to create them?',
    options: [
      {
        id: 'a',
        text: 'Download the test template, fill in utterances and expected values, and upload it as a CSV.',
        explanation:
          'CSV upload with the downloadable template is a standard way to bring in test cases, with an utterance plus expected subagent, actions, and/or response.',
      },
      {
        id: 'b',
        text: 'Import conversations directly from the Agent Health Monitoring alert history.',
        explanation:
          'Agent Health Monitoring tracks near real-time errors and latency in live traffic. It is not a source of Testing Center test cases.',
      },
      {
        id: 'c',
        text: 'Have Testing Center generate test cases with AI from the selected subagents and actions.',
        explanation:
          'Testing Center can generate test cases with AI based on the subagents (topics) and actions you select and a description of what to test.',
      },
      {
        id: 'd',
        text: 'Export the weekly Utterance Analysis dashboard, which Testing Center syncs automatically.',
        explanation:
          'Utterance Analysis is an analytics dashboard. There is no automatic sync from it into Testing Center.',
      },
      {
        id: 'e',
        text: 'Record test cases by enabling debug logs for the agent user during preview sessions.',
        explanation:
          'Debug logs record Apex and Flow execution for troubleshooting. They do not create Testing Center test cases.',
      },
    ],
    correct: ['a', 'c'],
    reference: 'https://trailhead.salesforce.com/content/learn/modules/agentforce-specialist-certification-maintenance-summer-25',
  },
  {
    id: 'TD-005',
    section: 'testing-deployment',
    type: 'single',
    prompt:
      'A Service agent at Cloud Kicks has a filter that only allows the "Cancel Order" action when a context variable mapped from the Messaging Session contains a verified Contact ID. In Testing Center, every cancellation test case fails because the agent never calls the action. How should the Agentforce Specialist make the tests realistic?',
    options: [
      {
        id: 'a',
        text: 'Remove the filter from the action while the tests run, then add it back.',
        explanation:
          'Removing the filter means you are no longer testing the agent that will run in production, and it is easy to forget to restore it. The tests should reproduce the real conditions instead.',
      },
      {
        id: 'b',
        text: 'Add an instruction telling the agent to always call Cancel Order during tests.',
        explanation:
          'Instructions do not override a deterministic filter, and an instruction for test runs would change how the agent behaves for real users.',
      },
      {
        id: 'c',
        text: 'Set the context variable value as a test condition for those test cases.',
        explanation:
          'Agent tests can include context variable values, so the session looks like a real verified conversation. The filter is then met and the action can be evaluated.',
      },
      {
        id: 'd',
        text: 'Mark the Expected Actions column as optional so those failures are ignored.',
        explanation:
          'There is no optional setting that ignores failures. Hiding the failures would also hide real problems with the cancellation flow.',
      },
    ],
    correct: ['c'],
    reference: 'https://developer.salesforce.com/docs/ai/agentforce/guide/agent-dx-test-customize.html',
  },
  {
    id: 'TD-006',
    section: 'testing-deployment',
    type: 'single',
    prompt:
      'Universal Containers manages its agents in source control and wants agent tests to run automatically in its CI/CD pipeline before each deployment. Which approach supports this?',
    options: [
      {
        id: 'a',
        text: 'Schedule a report on the Einstein generative AI audit data after each deployment.',
        explanation:
          'Audit data describes past activity. It does not run tests or stop a bad change before it is deployed.',
      },
      {
        id: 'b',
        text: 'Store Agentforce DX test specs as metadata and run them with the Salesforce CLI.',
        explanation:
          'Agentforce DX generates a test spec that is stored as AiEvaluationDefinition metadata. The CLI agent test commands can then run it in a pipeline.',
      },
      {
        id: 'c',
        text: 'Include a BotVersion component in the change set, which runs Testing Center automatically.',
        explanation:
          'BotVersion is part of the agent definition. Deploying it does not start any test run.',
      },
      {
        id: 'd',
        text: 'Ask testers to use the Live Test mode in Agentforce Builder after each pipeline run.',
        explanation:
          'Manual preview testing cannot be automated in a pipeline, and it does not give repeatable pass/fail results against expected values.',
      },
    ],
    correct: ['b'],
    reference: 'https://developer.salesforce.com/docs/ai/agentforce/guide/agent-dx-test.html',
  },
  {
    id: 'TD-007',
    section: 'testing-deployment',
    type: 'single',
    prompt:
      'An Agentforce Specialist deploys the subagents (GenAiPlugin), actions (GenAiFunction), and planner bundle (GenAiPlannerBundle) of an agent from a sandbox to production. The deployment succeeds, but the agent does not appear in the production org. What is the most likely cause?',
    options: [
      {
        id: 'a',
        text: 'The Einstein Trust Layer hides newly deployed agents until data masking is configured.',
        explanation:
          'Trust Layer settings control how prompts and responses are protected. They do not decide whether an agent is visible after deployment.',
      },
      {
        id: 'b',
        text: 'Agents cannot be deployed with metadata and must be rebuilt in each org.',
        explanation:
          'Agents are made of metadata and can be deployed with change sets, the Metadata API or Salesforce CLI, DevOps Center, or packages.',
      },
      {
        id: 'c',
        text: 'Testing Center results were not included in the deployment.',
        explanation:
          'Test results are not required for an agent to exist in the target org. Test definitions (AiEvaluationDefinition) are optional metadata.',
      },
      {
        id: 'd',
        text: 'The Bot and BotVersion components, which hold the agent itself, were not included.',
        explanation:
          'Bot and BotVersion are the container for the agent. Without them, the subagents, actions, and planner arrive but there is no agent to show.',
      },
    ],
    correct: ['d'],
    reference: 'https://developer.salesforce.com/docs/ai/agentforce/guide/agent-dx-deploy-metadata.html',
  },
  {
    id: 'TD-008',
    section: 'testing-deployment',
    type: 'multiple',
    prompt:
      'Cloud Kicks successfully deployed a Service agent and its metadata from a full sandbox to production. Which steps should the Agentforce Specialist still plan to complete in production before customers can use the agent?',
    options: [
      {
        id: 'a',
        text: 'Copy the Testing Center results from the sandbox so production can activate the agent.',
        explanation:
          'Activation does not depend on test results from another org. Tests can be run again in production if needed, but results are not copied.',
      },
      {
        id: 'b',
        text: 'Confirm the agent user exists in production and has the required permission sets assigned.',
        explanation:
          'Users and permission set assignments are specific to each org and are not carried over by the metadata deployment. The agent runs as this user, so its access must be set up in production.',
      },
      {
        id: 'c',
        text: 'Turn off the Einstein Trust Layer in production so the deployed actions can run.',
        explanation:
          'The Trust Layer does not block deployed actions, and turning off its protections would weaken governance.',
      },
      {
        id: 'd',
        text: 'Rebuild every subagent by hand because subagents cannot be deployed.',
        explanation:
          'Subagents are deployed as GenAiPlugin metadata. They do not need to be rebuilt by hand.',
      },
      {
        id: 'e',
        text: 'Activate the agent in production and publish its channel connection, such as the Embedded Service deployment.',
        explanation:
          'Activation state and channel publishing are not carried over by deployment. The agent must be activated and connected to its channel in the target org.',
      },
    ],
    correct: ['b', 'e'],
    reference: 'https://trailhead.salesforce.com/content/learn/modules/agentforce-deployment-quick-look/deploy-an-ai-agent-with-agentforce',
  },
  {
    id: 'TD-009',
    section: 'testing-deployment',
    type: 'single',
    prompt:
      'A consulting partner built an Agentforce agent, with its actions and flows, in the partner\'s own Developer Edition org. The partner now needs to deliver it to Universal Containers\' production org, which is not related to the partner org. What is the most appropriate way to move the metadata?',
    options: [
      {
        id: 'a',
        text: 'Bundle the components in a package and install it in the customer org.',
        explanation:
          'Packages, such as unlocked or managed packages, move metadata between orgs that are not related, which is the typical partner or ISV case. The Metadata API or CLI would also work, but change sets would not.',
      },
      {
        id: 'b',
        text: 'Send an outbound change set from the partner org to Universal Containers\' production org.',
        explanation:
          'Change sets only work between related orgs, such as a production org and its sandboxes, connected by a deployment connection. Two separate orgs cannot use them.',
      },
      {
        id: 'c',
        text: 'Use a data kit, because data kits move agent metadata between any two orgs.',
        explanation:
          'Data kits package Data 360 configuration such as data streams and mappings. They are not the tool for deploying agents, actions, and flows.',
      },
      {
        id: 'd',
        text: 'Rebuild the agent by hand in Agentforce Builder, since agents cannot move between unrelated orgs.',
        explanation:
          'Agents can move between unrelated orgs with packages or metadata deployment tools. Rebuilding by hand is slow and easy to get wrong.',
      },
    ],
    correct: ['a'],
    reference: 'https://trailhead.salesforce.com/content/learn/modules/agentforce-deployment-quick-look/deploy-an-ai-agent-with-agentforce',
  },
  {
    id: 'TD-010',
    section: 'testing-deployment',
    type: 'single',
    prompt:
      'Universal Containers deploys a new version of a Flex prompt template from a sandbox to production with a change set. The deployment succeeds, but the agent action in production still does not use the new version. What should the Agentforce Specialist do?',
    options: [
      {
        id: 'a',
        text: 'Deploy the same change set again, because prompt templates need two deployments.',
        explanation:
          'Deploying again does not activate anything. An existing published version is skipped on deployment, so a second run changes nothing.',
      },
      {
        id: 'b',
        text: 'Edit the active version in production to match the sandbox text.',
        explanation:
          'An active (published) template version cannot be edited in place. Changes go into a new version that is then activated.',
      },
      {
        id: 'c',
        text: 'Activate the deployed prompt template version in the production org.',
        explanation:
          'Unless the target org is set up to activate deployed templates, a deployed version is not activated automatically. It must be activated after deployment, just like in the source org.',
      },
      {
        id: 'd',
        text: 'Delete the agent action and create a new one that calls the template.',
        explanation:
          'The action already points to the template. The problem is which template version is active, not the action.',
      },
    ],
    correct: ['c'],
    reference: 'https://help.salesforce.com/s/articleView?id=ai.prompt_builder_considerations_deployment.htm&language=en_US&type=5',
  },
  {
    id: 'TD-011',
    section: 'testing-deployment',
    type: 'single',
    prompt:
      'In a sandbox, Cloud Kicks built a prompt template that uses a custom model configuration created in the sandbox. Deploying the template to production fails. What is the most likely cause?',
    options: [
      {
        id: 'a',
        text: 'Prompt templates that use a custom model can only be deployed with DevOps Center.',
        explanation:
          'Prompt templates can be deployed with change sets, the Metadata API or CLI, and packages. The tool is not the problem.',
      },
      {
        id: 'b',
        text: 'The template must be deactivated in the sandbox before it can be deployed.',
        explanation:
          'Activation state in the source does not cause a deployment failure. The reference to the missing model does.',
      },
      {
        id: 'c',
        text: 'The Einstein Trust Layer blocks deploying templates that use any model other than the default.',
        explanation:
          'The Trust Layer protects prompts and responses at run time. It does not block templates from being deployed.',
      },
      {
        id: 'd',
        text: 'Production does not have a model configuration with the same name as the one the template references.',
        explanation:
          'When a template references a custom model, the target org must already have a model with the same name. Otherwise the deployment fails.',
      },
    ],
    correct: ['d'],
    reference: 'https://help.salesforce.com/s/articleView?id=ai.prompt_builder_considerations_deployment.htm&language=en_US&type=5',
  },
  {
    id: 'TD-012',
    section: 'testing-deployment',
    type: 'multiple',
    prompt:
      'Universal Containers is deploying an agent whose subagent has two actions: one runs an autolaunched Flow that calls an invocable Apex class, and the other runs a Flex prompt template. Which components must already exist in production or be deployed along with the agent?',
    options: [
      {
        id: 'a',
        text: 'The sandbox agent user record and its login history.',
        explanation:
          'User records are data specific to each org, not deployable metadata. The agent user is set up separately in production.',
      },
      {
        id: 'b',
        text: 'The Agent Analytics dashboards built from sandbox sessions.',
        explanation:
          'Analytics from sandbox testing are not dependencies of the agent. The agent works without them.',
      },
      {
        id: 'c',
        text: 'The autolaunched Flow and the Apex class it calls.',
        explanation:
          'An action cannot reference a Flow or Apex class that is not already in the target org or in the same deployment. Missing ones cause the deployment to fail.',
      },
      {
        id: 'd',
        text: 'The session trace records from Testing Center runs.',
        explanation:
          'Trace data is stored as data for monitoring. It is not metadata the agent depends on.',
      },
      {
        id: 'e',
        text: 'The prompt template (GenAiPromptTemplate) that the prompt template action uses.',
        explanation:
          'The prompt template action depends on the template. It must exist in the target org or be in the same deployment, and it must then be activated.',
      },
    ],
    correct: ['c', 'e'],
    reference: 'https://developer.salesforce.com/docs/ai/agentforce/guide/agent-dx-deploy-metadata.html',
  },
]
