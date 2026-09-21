import type { ExplanationTranslations } from '../../../types/quiz'
import { aiAgentsPlatformPt } from './ai-agents-platform'
import { aiAgentsReasoningPt } from './ai-agents-reasoning'
import { data360Pt } from './data-360'
import { governanceObservabilityPt } from './governance-observability'
import { multiAgentPt } from './multi-agent'
import { promptEngineeringPt } from './prompt-engineering'
import { testingDeploymentPt } from './testing-deployment'

export const EXPLANATIONS_PT: ExplanationTranslations = {
  ...aiAgentsReasoningPt,
  ...aiAgentsPlatformPt,
  ...promptEngineeringPt,
  ...data360Pt,
  ...testingDeploymentPt,
  ...governanceObservabilityPt,
  ...multiAgentPt,
}
