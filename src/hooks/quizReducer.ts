import type { QuizSession, SessionQuestion, QuizConfig } from '../types/quiz'
import { EXAM_TIME_LIMIT_SEC } from '../data/sections'

export type QuizAction =
  | { type: 'START'; config: QuizConfig; questions: SessionQuestion[]; now: number }
  | { type: 'RESUME'; session: QuizSession; now: number }
  | { type: 'TOGGLE_OPTION'; optionId: string }
  | { type: 'SUBMIT' }
  | { type: 'GO_TO'; index: number }
  | { type: 'NEXT' }
  | { type: 'PREV' }
  | { type: 'TOGGLE_FLAG' }
  | { type: 'FINISH'; now: number }
  | { type: 'RESET' }

export type QuizState = QuizSession | null

export function currentQuestion(session: QuizSession): SessionQuestion {
  return session.questions[session.current]
}

/** A question counts as answered only when all required options are selected. */
export function isAnswered(session: QuizSession, item: SessionQuestion): boolean {
  return (session.answers[item.question.id]?.length ?? 0) === item.question.correct.length
}

/** In practice mode an answer locks once submitted; in exam mode it stays editable until finish. */
export function isLocked(session: QuizSession, questionId: string): boolean {
  return session.finishedAt !== null || (session.config.mode === 'practice' && !!session.submitted[questionId])
}

export function quizReducer(state: QuizState, action: QuizAction): QuizState {
  if (action.type === 'START') {
    return {
      config: action.config,
      questions: action.questions,
      answers: {},
      submitted: {},
      flagged: {},
      current: 0,
      startedAt: action.now,
      finishedAt: null,
      timeLimit: action.config.mode === 'exam' ? EXAM_TIME_LIMIT_SEC : null,
    }
  }
  if (action.type === 'RESUME') {
    // Time spent away from the quiz does not count.
    const { pausedAt, startedAt } = action.session
    const shift = pausedAt ? Math.max(0, action.now - pausedAt) : 0
    return { ...action.session, startedAt: startedAt + shift, pausedAt: null }
  }
  if (action.type === 'RESET') return null
  if (!state) return state

  const { question } = currentQuestion(state)

  switch (action.type) {
    case 'TOGGLE_OPTION': {
      if (isLocked(state, question.id)) return state
      if (!question.options.some((o) => o.id === action.optionId)) return state
      const selected = state.answers[question.id] ?? []
      let next: string[]
      if (question.type === 'single') {
        next = [action.optionId]
      } else if (selected.includes(action.optionId)) {
        next = selected.filter((id) => id !== action.optionId)
      } else if (selected.length >= question.correct.length) {
        // Limit selection to "Choose N": drop the oldest pick.
        next = [...selected.slice(1), action.optionId]
      } else {
        next = [...selected, action.optionId]
      }
      return { ...state, answers: { ...state.answers, [question.id]: next } }
    }
    case 'SUBMIT': {
      if (state.config.mode !== 'practice' || state.finishedAt !== null) return state
      const selected = state.answers[question.id] ?? []
      if (selected.length !== question.correct.length) return state
      return { ...state, submitted: { ...state.submitted, [question.id]: true } }
    }
    case 'GO_TO':
      if (action.index < 0 || action.index >= state.questions.length) return state
      return { ...state, current: action.index }
    case 'NEXT':
      return state.current < state.questions.length - 1 ? { ...state, current: state.current + 1 } : state
    case 'PREV':
      return state.current > 0 ? { ...state, current: state.current - 1 } : state
    case 'TOGGLE_FLAG':
      return { ...state, flagged: { ...state.flagged, [question.id]: !state.flagged[question.id] } }
    case 'FINISH':
      if (state.finishedAt !== null) return state
      // An exam cannot finish later than its deadline (e.g. the device slept past it).
      return {
        ...state,
        finishedAt: state.timeLimit === null ? action.now : Math.min(action.now, state.startedAt + state.timeLimit * 1000),
      }
  }
}
