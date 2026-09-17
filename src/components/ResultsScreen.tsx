import { useState } from 'react'
import { PASSING_PERCENT, SECTION_BY_ID } from '../data/sections'
import { formatDuration } from '../lib/format'
import { isCorrect } from '../lib/scoring'
import type { AttemptSummary, QuizSession } from '../types/quiz'
import { QuestionCard } from './QuestionCard'

interface Props {
  session: QuizSession
  summary: AttemptSummary
  onRestart: () => void
}

export function ResultsScreen({ session, summary, onRestart }: Props) {
  const [wrongOnly, setWrongOnly] = useState(false)
  const unanswered = session.questions.filter((q) => !(session.answers[q.question.id]?.length)).length
  const weak = summary.bySection.filter((s) => (s.correct / s.total) * 100 < PASSING_PERCENT)

  return (
    <div className="space-y-8">
      <header className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <p className="text-sm font-semibold tracking-wide text-slate-500 uppercase dark:text-slate-400">
          {summary.mode === 'exam' ? 'Exam simulation' : 'Practice'} results
        </p>
        <div className="mt-2 flex flex-wrap items-end gap-4">
          <span className="text-5xl font-bold text-slate-900 tabular-nums dark:text-slate-50">{summary.percent}%</span>
          <span
            className={`mb-1 rounded-full px-3 py-1 text-sm font-bold ${summary.passed ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200' : 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-200'}`}
          >
            {summary.passed ? 'PASS' : 'FAIL'}
          </span>
        </div>
        <dl className="mt-4 grid grid-cols-2 gap-4 text-sm sm:grid-cols-4">
          <Stat label="Correct" value={`${summary.correct} / ${summary.total}`} />
          <Stat label="Passing score" value={`${PASSING_PERCENT}%`} />
          <Stat label="Time spent" value={formatDuration(summary.durationSec)} />
          <Stat label="Unanswered" value={String(unanswered)} />
        </dl>
      </header>

      <section>
        <h2 className="mb-3 text-lg font-semibold text-slate-900 dark:text-slate-100">Score by section</h2>
        <ul className="space-y-4 rounded-xl border border-slate-200 bg-white p-4 sm:p-6 dark:border-slate-800 dark:bg-slate-900">
          {summary.bySection.map((s) => {
            const section = SECTION_BY_ID[s.section]
            const exact = (s.correct / s.total) * 100
            const ok = exact >= PASSING_PERCENT
            // Floor so a failing score never displays as the passing value.
            const pct = Math.floor(exact)
            return (
              <li key={s.section}>
                <div className="mb-1 flex flex-wrap items-baseline justify-between gap-2 text-sm">
                  <span className="font-medium text-slate-800 dark:text-slate-200">
                    {section.name}{' '}
                    <span className="text-xs font-normal text-slate-500 dark:text-slate-400">
                      (exam weight {Math.round(section.weight * 100)}%)
                    </span>
                  </span>
                  <span className="text-slate-600 tabular-nums dark:text-slate-400">
                    {s.correct}/{s.total} · <span className={ok ? 'text-emerald-700 dark:text-emerald-400' : 'text-rose-700 dark:text-rose-400'}>{pct}%</span>
                  </span>
                </div>
                <div className="relative h-2.5 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
                  <div
                    className={`h-full ${ok ? 'bg-emerald-600 dark:bg-emerald-500' : 'bg-rose-600 dark:bg-rose-500'}`}
                    style={{ width: `${pct}%` }}
                  />
                  <div
                    aria-hidden
                    className="absolute top-0 h-full w-0.5 bg-slate-900 dark:bg-slate-100"
                    style={{ left: `${PASSING_PERCENT}%` }}
                  />
                </div>
              </li>
            )
          })}
        </ul>
      </section>

      {weak.length > 0 && (
        <section className="rounded-xl border border-amber-300 bg-amber-50 p-4 sm:p-6 dark:border-amber-800 dark:bg-amber-950">
          <h2 className="font-semibold text-amber-900 dark:text-amber-100">Focus your study</h2>
          <ul className="mt-2 space-y-1 text-sm">
            {weak.map((s) => (
              <li key={s.section}>
                <a
                  href={SECTION_BY_ID[s.section].studyUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="font-medium text-amber-900 underline underline-offset-2 dark:text-amber-100"
                >
                  {SECTION_BY_ID[s.section].name}
                </a>
                <span className="text-amber-800 dark:text-amber-200"> — below {PASSING_PERCENT}%</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section>
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Review answers</h2>
          <label className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
            <input
              type="checkbox"
              checked={wrongOnly}
              onChange={(e) => setWrongOnly(e.target.checked)}
              className="h-4 w-4 accent-sky-600"
            />
            Show only incorrect
          </label>
        </div>
        {wrongOnly && summary.correct === summary.total && (
          <p className="rounded-xl border border-slate-200 bg-white p-4 text-sm text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400">
            No incorrect answers. Nice work.
          </p>
        )}
        <ol className="space-y-4">
          {session.questions.map((item, i) => {
            const selected = session.answers[item.question.id] ?? []
            const ok = isCorrect(item.question, selected)
            if (wrongOnly && ok) return null
            return (
              <li
                key={item.question.id}
                className={`rounded-xl border bg-white p-4 sm:p-6 dark:bg-slate-900 ${ok ? 'border-emerald-300 dark:border-emerald-900' : 'border-rose-300 dark:border-rose-900'}`}
              >
                <p className={`mb-2 text-xs font-bold uppercase ${ok ? 'text-emerald-700 dark:text-emerald-400' : 'text-rose-700 dark:text-rose-400'}`}>
                  {ok
                    ? 'Correct'
                    : selected.length === 0
                      ? 'Not answered'
                      : selected.length < item.question.correct.length
                        ? 'Incomplete'
                        : 'Incorrect'}
                  {session.flagged[item.question.id] ? ' · Flagged' : ''}
                </p>
                <QuestionCard
                  item={item}
                  index={i}
                  total={session.questions.length}
                  selected={selected}
                  reveal
                  locked
                  onToggle={() => {}}
                  showShortcuts={false}
                />
              </li>
            )
          })}
        </ol>
      </section>

      <div className="flex justify-center">
        <button
          type="button"
          onClick={onRestart}
          className="rounded-md bg-sky-600 px-6 py-3 font-semibold text-white hover:bg-sky-700"
        >
          Start a new quiz
        </button>
      </div>
    </div>
  )
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-slate-500 dark:text-slate-400">{label}</dt>
      <dd className="font-semibold text-slate-900 tabular-nums dark:text-slate-100">{value}</dd>
    </div>
  )
}
