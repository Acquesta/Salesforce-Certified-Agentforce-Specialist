import { PASSING_PERCENT, SECTIONS } from '../data/sections'
import type { AttemptSummary, Question, QuizSession, SectionScore } from '../types/quiz'

/** Multiple-select questions are all-or-nothing, as on the real exam. */
export function isCorrect(question: Question, selected: string[] | undefined): boolean {
  if (!selected || selected.length !== question.correct.length) return false
  return question.correct.every((id) => selected.includes(id))
}

export function scoreSession(session: QuizSession): AttemptSummary {
  const bySection = new Map<string, SectionScore>()
  let correct = 0

  for (const { question } of session.questions) {
    const ok = isCorrect(question, session.answers[question.id])
    if (ok) correct += 1
    const entry = bySection.get(question.section) ?? { section: question.section, correct: 0, total: 0 }
    entry.total += 1
    if (ok) entry.correct += 1
    bySection.set(question.section, entry)
  }

  const total = session.questions.length
  const percent = total === 0 ? 0 : Math.round((correct / total) * 1000) / 10
  const finishedAt = session.finishedAt ?? Date.now()

  return {
    id: `${session.startedAt}`,
    mode: session.config.mode,
    finishedAt,
    durationSec: Math.round((finishedAt - session.startedAt) / 1000),
    correct,
    total,
    percent,
    passed: percent >= PASSING_PERCENT,
    bySection: SECTIONS.map((s) => bySection.get(s.id)).filter((s): s is SectionScore => !!s),
  }
}
