import type { Question } from '../../types/quiz'
import { aiAgentsPlatformQuestions } from './ai-agents-platform'
import { aiAgentsReasoningQuestions } from './ai-agents-reasoning'
import { data360Questions } from './data-360'
import { governanceObservabilityQuestions } from './governance-observability'
import { multiAgentQuestions } from './multi-agent'
import { promptEngineeringQuestions } from './prompt-engineering'
import { testingDeploymentQuestions } from './testing-deployment'

export const QUESTION_BANK: Question[] = [
  ...aiAgentsReasoningQuestions,
  ...aiAgentsPlatformQuestions,
  ...promptEngineeringQuestions,
  ...data360Questions,
  ...testingDeploymentQuestions,
  ...governanceObservabilityQuestions,
  ...multiAgentQuestions,
]
