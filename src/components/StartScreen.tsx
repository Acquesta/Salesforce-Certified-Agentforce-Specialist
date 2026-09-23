import { useEffect, useState } from 'react'
import { EXAM_QUESTION_COUNT, PASSING_PERCENT, SECTIONS } from '../data/sections'
import type { StatsOverview } from '../lib/stats'
import { loadPrefs, savePrefs } from '../lib/storage'
import type { Question, QuizConfig, QuizMode, QuizSession, SectionId, StoredAttempt } from '../types/quiz'
import { AnswerHistory } from './AnswerHistory'

interface Props {
  bank: Question[]
  attempts: StoredAttempt[]
  stats: StatsOverview
  saved: QuizSession | null
  onStart: (config: QuizConfig) => void
  onResume: () => void
  onPracticeMistakes: () => void
  onReview: (attempt: StoredAttempt) => void
  onClearHistory: () => void
}

const PRACTICE_COUNTS = [10, 20, 30, 60]

const ALL_SECTION_IDS = SECTIONS.map((s) => s.id)

export function StartScreen({
  bank,
  attempts,
  stats,
  saved,
  onStart,
  onResume,
  onPracticeMistakes,
  onReview,
  onClearHistory,
}: Props) {
  const [prefs] = useState(() => loadPrefs())
  const [mode, setMode] = useState<QuizMode>(prefs?.mode === 'exam' ? 'exam' : 'practice')
  const [count, setCount] = useState(PRACTICE_COUNTS.includes(prefs?.count ?? 0) ? prefs!.count : 10)
  const [sections, setSections] = useState<SectionId[]>(() => {
    const valid = (prefs?.sections ?? []).filter((id) => ALL_SECTION_IDS.includes(id))
    return valid.length > 0 ? valid : ALL_SECTION_IDS
  })
  const [confirmReplace, setConfirmReplace] = useState(false)

  useEffect(() => {
    savePrefs({ mode, count, sections })
  }, [mode, count, sections])

  const countBySection = (id: SectionId) => bank.filter((q) => q.section === id).length
  const available = sections.reduce((sum, id) => sum + countBySection(id), 0)
  const isExam = mode === 'exam'
  const effectiveCount = Math.min(isExam ? EXAM_QUESTION_COUNT : count, isExam ? bank.length : available)

  function toggleSection(id: SectionId) {
    setSections((prev) => (prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]))
  }

  function start() {
    if (saved && !confirmReplace) {
      setConfirmReplace(true)
      return
    }
    onStart({
      mode,
      questionCount: effectiveCount,
      sections: isExam ? ALL_SECTION_IDS : sections,
    })
  }

  return (
    <div className="space-y-8">
      <header>
        <p className="text-sm font-semibold tracking-wide text-sky-700 uppercase dark:text-sky-400">Practice quiz</p>
        <h1 className="mt-1 text-3xl font-bold text-slate-900 sm:text-4xl dark:text-slate-50">
          Salesforce Certified Agentforce Specialist
        </h1>
        <p className="mt-3 text-slate-600 dark:text-slate-400">
          Real exam: {EXAM_QUESTION_COUNT} multiple-choice questions, 105 minutes, {PASSING_PERCENT}% to pass.
        </p>
      </header>

      {saved && (
        <div className="flex flex-col gap-3 rounded-lg border border-amber-300 bg-amber-50 p-4 sm:flex-row sm:items-center sm:justify-between dark:border-amber-700 dark:bg-amber-950">
          <p className="text-sm text-amber-900 dark:text-amber-100">
            <span className="font-semibold">{saved.config.mode === 'exam' ? 'Exam simulation' : 'Practice'} in progress</span>
            {' · '}question {saved.current + 1} of {saved.questions.length}
            {' · '}
            {saved.questions.filter((q) => (saved.answers[q.question.id]?.length ?? 0) === q.question.correct.length).length} answered
          </p>
          <button
            type="button"
            onClick={onResume}
            className="rounded-md bg-amber-600 px-4 py-2 text-sm font-semibold text-white hover:bg-amber-700"
          >
            Resume quiz
          </button>
        </div>
      )}

      <fieldset>
        <legend className="mb-3 font-semibold text-slate-900 dark:text-slate-100">Mode</legend>
        <div className="grid gap-3 sm:grid-cols-2">
          {(
            [
              ['practice', 'Practice', 'Instant feedback and explanations after each answer. No timer.'],
              ['exam', 'Exam simulation', `${EXAM_QUESTION_COUNT} weighted questions, 105-minute timer, results at the end.`],
            ] as const
          ).map(([value, title, description]) => (
            <label
              key={value}
              className={`cursor-pointer rounded-lg border p-4 transition has-focus-visible:outline-2 has-focus-visible:outline-sky-600 ${mode === value ? 'border-sky-600 bg-sky-50 ring-1 ring-sky-600 dark:border-sky-400 dark:bg-sky-950 dark:ring-sky-400' : 'border-slate-300 bg-white hover:border-sky-500 dark:border-slate-700 dark:bg-slate-900'}`}
            >
              <input
                type="radio"
                name="mode"
                value={value}
                checked={mode === value}
                onChange={() => setMode(value)}
                className="sr-only"
              />
              <span className="block font-semibold text-slate-900 dark:text-slate-100">{title}</span>
              <span className="mt-1 block text-sm text-slate-600 dark:text-slate-400">{description}</span>
            </label>
          ))}
        </div>
      </fieldset>

      {!isExam && (
        <>
          <fieldset>
            <legend className="mb-3 font-semibold text-slate-900 dark:text-slate-100">Number of questions</legend>
            <div className="flex flex-wrap gap-2">
              {PRACTICE_COUNTS.map((n) => (
                <button
                  key={n}
                  type="button"
                  aria-pressed={count === n}
                  onClick={() => setCount(n)}
                  className={`rounded-md border px-4 py-2 text-sm font-medium ${count === n ? 'border-sky-600 bg-sky-600 text-white dark:border-sky-400 dark:bg-sky-500' : 'border-slate-300 bg-white text-slate-700 hover:border-sky-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200'}`}
                >
                  {n}
                </button>
              ))}
            </div>
          </fieldset>

          <fieldset>
            <legend className="mb-3 font-semibold text-slate-900 dark:text-slate-100">Sections</legend>
            <div className="space-y-2">
              {SECTIONS.map((s) => (
                <label
                  key={s.id}
                  className="flex cursor-pointer items-center gap-3 rounded-md border border-slate-200 bg-white px-3 py-2 dark:border-slate-800 dark:bg-slate-900"
                >
                  <input
                    type="checkbox"
                    checked={sections.includes(s.id)}
                    onChange={() => toggleSection(s.id)}
                    className="h-4 w-4 accent-sky-600"
                  />
                  <span className="flex-1 text-slate-800 dark:text-slate-200">{s.name}</span>
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    {Math.round(s.weight * 100)}% · {countBySection(s.id)} questions
                  </span>
                </label>
              ))}
            </div>
          </fieldset>
        </>
      )}

      <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
        <button
          type="button"
          onClick={start}
          disabled={effectiveCount === 0}
          className="rounded-md bg-sky-600 px-6 py-3 font-semibold text-white hover:bg-sky-700 disabled:cursor-not-allowed disabled:bg-slate-400 dark:disabled:bg-slate-700 dark:disabled:text-slate-400"
        >
          Start {isExam ? 'exam' : 'practice'} ({effectiveCount} questions)
        </button>
        {effectiveCount === 0 && (
          <p className="text-sm text-rose-700 dark:text-rose-400">No questions available for this selection.</p>
        )}
        {confirmReplace && (
          <p role="alert" className="text-sm text-amber-800 dark:text-amber-200">
            This discards the quiz in progress. Click Start again to confirm.{' '}
            <button
              type="button"
              onClick={() => setConfirmReplace(false)}
              className="font-medium underline underline-offset-2"
            >
              Cancel
            </button>
          </p>
        )}
      </div>

      <section className="rounded-lg border border-slate-200 bg-white p-4 text-sm text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400">
        <h2 className="mb-2 font-semibold text-slate-900 dark:text-slate-100">Keyboard shortcuts</h2>
        <ul className="grid gap-1 sm:grid-cols-2">
          <li><Kbd>1</Kbd>–<Kbd>5</Kbd> select option A–E</li>
          <li><Kbd>Enter</Kbd> submit / next question</li>
          <li><Kbd>←</Kbd> <Kbd>→</Kbd> previous / next question</li>
          <li><Kbd>F</Kbd> flag question for review</li>
        </ul>
      </section>

      <AnswerHistory
        overview={stats}
        bankSize={bank.length}
        attempts={attempts}
        onPracticeMistakes={onPracticeMistakes}
        onReview={onReview}
        onClear={onClearHistory}
      />
    </div>
  )
}

function Kbd({ children }: { children: React.ReactNode }) {
  return (
    <kbd className="rounded border border-slate-300 bg-slate-100 px-1.5 py-0.5 font-mono text-xs text-slate-700 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-300">
      {children}
    </kbd>
  )
}
