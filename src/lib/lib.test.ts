import { describe, expect, it } from 'vitest'
import { quizReducer, type QuizState } from '../hooks/quizReducer'
import type { Question, QuizConfig, SectionId } from '../types/quiz'
import { allocateBySection, buildQuiz } from './buildExam'
import { isCorrect, scoreSession } from './scoring'
import { shuffle } from './shuffle'

const ALL: SectionId[] = [
  'ai-agents',
  'prompt-engineering',
  'data-360',
  'testing-deployment',
  'governance-observability',
  'multi-agent',
]
const FULL = { 'ai-agents': 42, 'prompt-engineering': 24, 'data-360': 24, 'testing-deployment': 12, 'governance-observability': 12, 'multi-agent': 6 }

function makeQuestion(id: string, section: SectionId, correct: string[] = ['a']): Question {
  return {
    id,
    section,
    type: correct.length > 1 ? 'multiple' : 'single',
    prompt: `Question ${id}`,
    options: ['a', 'b', 'c', 'd'].map((o) => ({ id: o, text: o, explanation: `why ${o}` })),
    correct,
  }
}

function makeBank(perSection: Partial<Record<SectionId, number>>): Question[] {
  return Object.entries(perSection).flatMap(([section, n]) =>
    Array.from({ length: n ?? 0 }, (_, i) => makeQuestion(`${section}-${i}`, section as SectionId)),
  )
}

describe('shuffle', () => {
  it('keeps all items and does not mutate input', () => {
    const input = [1, 2, 3, 4, 5]
    const out = shuffle(input)
    expect(out.sort()).toEqual([1, 2, 3, 4, 5])
    expect(input).toEqual([1, 2, 3, 4, 5])
  })
})

describe('allocateBySection', () => {
  it('splits 60 questions by exam weights', () => {
    expect(allocateBySection(60, ALL, FULL)).toEqual({
      'ai-agents': 21,
      'prompt-engineering': 12,
      'data-360': 12,
      'testing-deployment': 6,
      'governance-observability': 6,
      'multi-agent': 3,
    })
  })

  it('redistributes when a section is short', () => {
    const available = { ...FULL, 'multi-agent': 1 }
    const result = allocateBySection(60, ALL, available)
    expect(result['multi-agent']).toBe(1)
    expect(Object.values(result).reduce((a, b) => a + b, 0)).toBe(60)
  })

  it('never exceeds what is available', () => {
    const available = { 'ai-agents': 2, 'prompt-engineering': 1, 'data-360': 0, 'testing-deployment': 0, 'governance-observability': 0, 'multi-agent': 0 }
    const result = allocateBySection(60, ALL, available)
    expect(Object.values(result).reduce((a, b) => a + b, 0)).toBe(3)
  })
})

describe('buildQuiz', () => {
  const bank = makeBank(FULL)

  it('builds a 60 question exam without duplicates and with shuffled option order', () => {
    const quiz = buildQuiz(bank, { mode: 'exam', questionCount: 60, sections: ALL })
    expect(quiz).toHaveLength(60)
    expect(new Set(quiz.map((q) => q.question.id)).size).toBe(60)
    for (const q of quiz) expect([...q.optionOrder].sort()).toEqual(['a', 'b', 'c', 'd'])
  })

  it('respects the section filter', () => {
    const quiz = buildQuiz(bank, { mode: 'practice', questionCount: 10, sections: ['data-360'] })
    expect(quiz).toHaveLength(10)
    expect(quiz.every((q) => q.question.section === 'data-360')).toBe(true)
  })
})

describe('isCorrect', () => {
  it('handles single and all-or-nothing multiple select', () => {
    expect(isCorrect(makeQuestion('1', 'ai-agents'), ['a'])).toBe(true)
    expect(isCorrect(makeQuestion('1', 'ai-agents'), ['b'])).toBe(false)
    const multi = makeQuestion('2', 'ai-agents', ['a', 'c'])
    expect(isCorrect(multi, ['c', 'a'])).toBe(true)
    expect(isCorrect(multi, ['a'])).toBe(false)
    expect(isCorrect(multi, ['a', 'b'])).toBe(false)
    expect(isCorrect(multi, undefined)).toBe(false)
  })
})

describe('quizReducer', () => {
  const questions = [makeQuestion('s', 'ai-agents'), makeQuestion('m', 'data-360', ['a', 'b'])].map((question) => ({
    question,
    optionOrder: ['a', 'b', 'c', 'd'],
  }))

  function start(config: Partial<QuizConfig> = {}): QuizState {
    return quizReducer(null, {
      type: 'START',
      config: { mode: 'practice', questionCount: 2, sections: ALL, ...config },
      questions,
      now: 1000,
    })
  }

  it('locks answers after submit in practice mode', () => {
    let s = start()
    s = quizReducer(s, { type: 'TOGGLE_OPTION', optionId: 'b' })
    s = quizReducer(s, { type: 'SUBMIT' })
    s = quizReducer(s, { type: 'TOGGLE_OPTION', optionId: 'a' })
    expect(s!.answers.s).toEqual(['b'])
    expect(s!.submitted.s).toBe(true)
  })

  it('limits multiple select to Choose N', () => {
    let s = quizReducer(start(), { type: 'NEXT' })
    for (const id of ['a', 'b', 'c']) s = quizReducer(s, { type: 'TOGGLE_OPTION', optionId: id })
    expect(s!.answers.m).toEqual(['b', 'c'])
  })

  it('does not count paused time after resume', () => {
    const s = start({ mode: 'exam' })!
    const resumed = quizReducer(null, { type: 'RESUME', session: { ...s, pausedAt: 5000 }, now: 65_000 })
    expect(resumed!.startedAt).toBe(61_000)
    expect(resumed!.pausedAt).toBeNull()
  })

  it('caps exam finish time at the deadline', () => {
    const s = quizReducer(start({ mode: 'exam' }), { type: 'FINISH', now: 1000 + 2 * 86_400_000 })
    expect(scoreSession(s!).durationSec).toBe(105 * 60)
  })

  it('scores a finished exam session and sets a time limit', () => {
    let s = start({ mode: 'exam' })
    expect(s!.timeLimit).toBe(105 * 60)
    s = quizReducer(s, { type: 'TOGGLE_OPTION', optionId: 'a' })
    s = quizReducer(s, { type: 'TOGGLE_FLAG' })
    s = quizReducer(s, { type: 'FINISH', now: 61_000 })
    const summary = scoreSession(s!)
    expect(summary).toMatchObject({ correct: 1, total: 2, percent: 50, passed: false, durationSec: 60 })
    expect(s!.flagged.s).toBe(true)
  })
})
