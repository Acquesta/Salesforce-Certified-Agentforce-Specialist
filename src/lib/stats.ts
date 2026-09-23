import type { QuestionStats, QuizSession } from '../types/quiz'
import { isCorrect } from './scoring'

/**
 * Adds one finished attempt to the lifetime stats. Questions left unanswered are
 * skipped: they say nothing about what the user knows.
 */
export function applyAttempt(stats: QuestionStats, session: QuizSession): QuestionStats {
  const at = session.finishedAt ?? Date.now()
  const next: QuestionStats = { ...stats }

  for (const { question } of session.questions) {
    const selected = session.answers[question.id] ?? []
    if (selected.length === 0) continue
    const ok = isCorrect(question, selected)
    const previous = next[question.id]
    next[question.id] = {
      answered: (previous?.answered ?? 0) + 1,
      correct: (previous?.correct ?? 0) + (ok ? 1 : 0),
      wrong: (previous?.wrong ?? 0) + (ok ? 0 : 1),
      lastResult: ok ? 'correct' : 'wrong',
      lastAt: at,
    }
  }

  return next
}

export interface StatsOverview {
  answered: number
  correct: number
  wrong: number
  accuracy: number
  /** Questions whose most recent answer was wrong. */
  toReview: string[]
}

export function summarizeStats(stats: QuestionStats, bankIds: string[]): StatsOverview {
  const known = bankIds.filter((id) => stats[id])
  const correct = known.filter((id) => stats[id].lastResult === 'correct').length
  const toReview = known.filter((id) => stats[id].lastResult === 'wrong')
  const totalAnswers = known.reduce((sum, id) => sum + stats[id].answered, 0)
  const totalCorrect = known.reduce((sum, id) => sum + stats[id].correct, 0)

  return {
    answered: known.length,
    correct,
    wrong: toReview.length,
    accuracy: totalAnswers === 0 ? 0 : Math.round((totalCorrect / totalAnswers) * 100),
    toReview,
  }
}
