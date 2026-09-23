import { describe, expect, it } from 'vitest'
import type { Question, QuestionStats, QuizSession, SessionQuestion } from '../types/quiz'
import { buildQuiz } from './buildExam'
import { applyAttempt, summarizeStats } from './stats'

function question(id: string, correct: string[] = ['a']): Question {
  return {
    id,
    section: 'ai-agents',
    type: correct.length > 1 ? 'multiple' : 'single',
    prompt: id,
    options: ['a', 'b'].map((o) => ({ id: o, text: o, explanation: o })),
    correct,
  }
}

function session(answers: Record<string, string[]>, ids: string[]): QuizSession {
  const questions: SessionQuestion[] = ids.map((id) => ({ question: question(id), optionOrder: ['a', 'b'] }))
  return {
    config: { mode: 'exam', questionCount: ids.length, sections: ['ai-agents'] },
    questions,
    answers,
    submitted: {},
    flagged: {},
    current: 0,
    startedAt: 0,
    finishedAt: 5_000,
    timeLimit: null,
  }
}

describe('applyAttempt', () => {
  it('counts right and wrong answers and ignores unanswered questions', () => {
    const stats = applyAttempt({}, session({ 'Q-1': ['a'], 'Q-2': ['b'] }, ['Q-1', 'Q-2', 'Q-3']))
    expect(stats['Q-1']).toMatchObject({ answered: 1, correct: 1, wrong: 0, lastResult: 'correct', lastAt: 5_000 })
    expect(stats['Q-2']).toMatchObject({ answered: 1, correct: 0, wrong: 1, lastResult: 'wrong' })
    expect(stats['Q-3']).toBeUndefined()
  })

  it('accumulates across attempts and keeps the latest result', () => {
    const first = applyAttempt({}, session({ 'Q-1': ['b'] }, ['Q-1']))
    const second = applyAttempt(first, session({ 'Q-1': ['a'] }, ['Q-1']))
    expect(second['Q-1']).toMatchObject({ answered: 2, correct: 1, wrong: 1, lastResult: 'correct' })
  })
})

describe('summarizeStats', () => {
  const stats: QuestionStats = {
    'Q-1': { answered: 2, correct: 2, wrong: 0, lastResult: 'correct', lastAt: 1 },
    'Q-2': { answered: 2, correct: 1, wrong: 1, lastResult: 'wrong', lastAt: 2 },
    'Q-GONE': { answered: 1, correct: 1, wrong: 0, lastResult: 'correct', lastAt: 3 },
  }

  it('reports the questions to review and the overall accuracy', () => {
    expect(summarizeStats(stats, ['Q-1', 'Q-2', 'Q-3'])).toEqual({
      answered: 2,
      correct: 1,
      wrong: 1,
      accuracy: 75,
      toReview: ['Q-2'],
    })
  })

  it('ignores stats for questions no longer in the bank', () => {
    expect(summarizeStats(stats, ['Q-1']).answered).toBe(1)
  })
})

describe('buildQuiz with questionIds', () => {
  it('only uses the listed questions', () => {
    const bank = ['Q-1', 'Q-2', 'Q-3'].map((id) => question(id))
    const quiz = buildQuiz(bank, {
      mode: 'practice',
      questionCount: 3,
      sections: ['ai-agents'],
      questionIds: ['Q-2', 'Q-3'],
    })
    expect(quiz.map((q) => q.question.id).sort()).toEqual(['Q-2', 'Q-3'])
  })
})
