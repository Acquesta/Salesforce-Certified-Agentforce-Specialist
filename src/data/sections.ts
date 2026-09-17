import type { Section, SectionId } from '../types/quiz'

// Official exam guide (Salesforce Help 005298924, aligned to Spring '26).
export const PASSING_PERCENT = 72
export const EXAM_QUESTION_COUNT = 60
export const EXAM_TIME_LIMIT_SEC = 105 * 60

export const SECTIONS: Section[] = [
  {
    id: 'ai-agents',
    name: 'AI Agents',
    weight: 0.35,
    studyUrl: 'https://trailhead.salesforce.com/content/learn/modules/new-agentforce-builder-quick-look/explore-the-new-agentforce-builder',
  },
  {
    id: 'prompt-engineering',
    name: 'Prompt Engineering',
    weight: 0.2,
    studyUrl: 'https://trailhead.salesforce.com/content/learn/modules/prompt-builder-basics',
  },
  {
    id: 'data-360',
    name: 'Data 360 Fundamentals',
    weight: 0.2,
    studyUrl: 'https://trailhead.salesforce.com/content/learn/modules/grounding-an-agent-with-data/review-options-to-ground-an-agent-with-data',
  },
  {
    id: 'testing-deployment',
    name: 'Testing, Deployment, and Maintenance',
    weight: 0.1,
    studyUrl: 'https://trailhead.salesforce.com/content/learn/modules/agentforce-agent-testing/set-up-testing-criteria',
  },
  {
    id: 'governance-observability',
    name: 'Governance and Observability',
    weight: 0.1,
    studyUrl: 'https://trailhead.salesforce.com/content/learn/modules/agentforce-analytics-and-monitoring',
  },
  {
    id: 'multi-agent',
    name: 'Multi-Agent Orchestration',
    weight: 0.05,
    studyUrl: 'https://www.salesforce.com/agentforce/multi-agent-orchestration/',
  },
]

export const SECTION_BY_ID: Record<SectionId, Section> = Object.fromEntries(
  SECTIONS.map((s) => [s.id, s]),
) as Record<SectionId, Section>
