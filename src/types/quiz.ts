export type SectionId =
  | 'ai-agents'
  | 'prompt-engineering'
  | 'data-360'
  | 'testing-deployment'
  | 'governance-observability'
  | 'multi-agent'

export interface Option {
  id: string
  text: string
  /** Why this option is correct or incorrect. */
  explanation: string
}

export interface Question {
  /** Stable id, e.g. 'AA-001'. */
  id: string
  section: SectionId
  type: 'single' | 'multiple'
  prompt: string
  options: Option[]
  /** Ids of correct options. More than one means multiple-select ("Choose N"). */
  correct: string[]
  /** Salesforce Help / Trailhead link for further study. */
  reference?: string
}

export interface Section {
  id: SectionId
  name: string
  weight: number
  studyUrl: string
}

export type QuizMode = 'exam' | 'practice'

export interface QuizConfig {
  mode: QuizMode
  questionCount: number
  sections: SectionId[]
}

/** A question as presented in one attempt: options already shuffled. */
export interface SessionQuestion {
  question: Question
  optionOrder: string[]
}

export interface QuizSession {
  config: QuizConfig
  questions: SessionQuestion[]
  answers: Record<string, string[]>
  submitted: Record<string, boolean>
  flagged: Record<string, boolean>
  current: number
  startedAt: number
  finishedAt: number | null
  /** Exam mode only: time limit in seconds. */
  timeLimit: number | null
  /** Set when the quiz is left (quit or page closed) so the clock can pause. */
  pausedAt?: number | null
}

export interface SectionScore {
  section: SectionId
  correct: number
  total: number
}

export interface AttemptSummary {
  id: string
  mode: QuizMode
  finishedAt: number
  durationSec: number
  correct: number
  total: number
  percent: number
  passed: boolean
  bySection: SectionScore[]
}

/** Portuguese explanations: question id -> option id -> text. Questions and options stay in English. */
export type ExplanationTranslations = Record<string, Record<string, string>>

export type ExplanationLang = 'en' | 'pt'
