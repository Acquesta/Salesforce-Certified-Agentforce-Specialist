import { useState } from 'react'
import { formatDuration } from '../lib/format'
import type { StatsOverview } from '../lib/stats'
import type { StoredAttempt } from '../types/quiz'

interface Props {
  overview: StatsOverview
  bankSize: number
  attempts: StoredAttempt[]
  onPracticeMistakes: () => void
  onReview: (attempt: StoredAttempt) => void
  onClear: () => void
}

export function AnswerHistory({ overview, bankSize, attempts, onPracticeMistakes, onReview, onClear }: Props) {
  const [confirmClear, setConfirmClear] = useState(false)
  if (overview.answered === 0 && attempts.length === 0) return null

  return (
    <section className="space-y-3">
      <h2 className="font-semibold text-slate-900 dark:text-slate-100">Your answer history</h2>

      <div className="rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
        <dl className="grid grid-cols-2 gap-4 text-sm sm:grid-cols-4">
          <Stat label="Questions answered" value={`${overview.answered} / ${bankSize}`} />
          <Stat label="Right last time" value={String(overview.correct)} tone="good" />
          <Stat label="Wrong last time" value={String(overview.wrong)} tone="bad" />
          <Stat label="Overall accuracy" value={`${overview.accuracy}%`} />
        </dl>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={onPracticeMistakes}
            disabled={overview.wrong === 0}
            className="rounded-md bg-rose-600 px-4 py-2 text-sm font-semibold text-white hover:bg-rose-700 disabled:cursor-not-allowed disabled:bg-slate-400 dark:disabled:bg-slate-700 dark:disabled:text-slate-400"
          >
            Practice my mistakes ({overview.wrong})
          </button>
          {confirmClear ? (
            <span role="alert" className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
              Erase all saved answers?
              <button
                type="button"
                onClick={() => {
                  onClear()
                  setConfirmClear(false)
                }}
                className="font-semibold text-rose-700 underline underline-offset-2 dark:text-rose-400"
              >
                Erase
              </button>
              <button type="button" onClick={() => setConfirmClear(false)} className="underline underline-offset-2">
                Cancel
              </button>
            </span>
          ) : (
            <button
              type="button"
              onClick={() => setConfirmClear(true)}
              className="text-sm font-medium text-slate-500 underline underline-offset-2 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200"
            >
              Clear history
            </button>
          )}
        </div>
      </div>

      {attempts.length > 0 && (
        <ul className="divide-y divide-slate-200 rounded-lg border border-slate-200 bg-white dark:divide-slate-800 dark:border-slate-800 dark:bg-slate-900">
          {attempts.map(({ summary, session }) => (
            <li key={summary.id} className="flex flex-wrap items-center justify-between gap-2 px-4 py-3 text-sm">
              <span className="text-slate-600 dark:text-slate-400">
                {new Date(summary.finishedAt).toLocaleString()} · {summary.mode === 'exam' ? 'Exam' : 'Practice'}
              </span>
              <span className="text-slate-600 dark:text-slate-400">
                {summary.correct}/{summary.total} · {formatDuration(summary.durationSec)}
              </span>
              <span
                className={`font-semibold ${summary.passed ? 'text-emerald-700 dark:text-emerald-400' : 'text-rose-700 dark:text-rose-400'}`}
              >
                {summary.percent}% {summary.passed ? 'PASS' : 'FAIL'}
              </span>
              <button
                type="button"
                onClick={() => onReview({ summary, session })}
                className="rounded-md border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
              >
                Review answers
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

function Stat({ label, value, tone }: { label: string; value: string; tone?: 'good' | 'bad' }) {
  const toneClass =
    tone === 'good'
      ? 'text-emerald-700 dark:text-emerald-400'
      : tone === 'bad'
        ? 'text-rose-700 dark:text-rose-400'
        : 'text-slate-900 dark:text-slate-100'
  return (
    <div>
      <dt className="text-slate-500 dark:text-slate-400">{label}</dt>
      <dd className={`font-semibold tabular-nums ${toneClass}`}>{value}</dd>
    </div>
  )
}
