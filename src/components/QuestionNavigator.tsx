import { useState } from 'react'
import { isAnswered } from '../hooks/quizReducer'
import type { QuizSession } from '../types/quiz'

interface Props {
  session: QuizSession
  onGoTo: (index: number) => void
}

export function QuestionNavigator({ session, onGoTo }: Props) {
  const [flaggedOnly, setFlaggedOnly] = useState(false)
  const flaggedCount = session.questions.filter((q) => session.flagged[q.question.id]).length

  return (
    <nav aria-label="Question navigator" className="rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-3 flex items-center justify-between gap-2">
        <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-100">Questions</h2>
        <label className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
          <input
            type="checkbox"
            checked={flaggedOnly}
            onChange={(e) => setFlaggedOnly(e.target.checked)}
            className="h-3.5 w-3.5 accent-amber-500"
          />
          Flagged only ({flaggedCount})
        </label>
      </div>
      <ol className="grid grid-cols-6 gap-1.5 sm:grid-cols-10">
        {session.questions.map(({ question }, i) => {
          const flagged = !!session.flagged[question.id]
          if (flaggedOnly && !flagged) return null
          const answered = isAnswered(session, session.questions[i])
          const partial = !answered && (session.answers[question.id]?.length ?? 0) > 0
          const current = i === session.current
          return (
            <li key={question.id}>
              <button
                type="button"
                onClick={() => onGoTo(i)}
                aria-current={current ? 'step' : undefined}
                aria-label={`Question ${i + 1}${answered ? ', answered' : partial ? ', incomplete' : ''}${flagged ? ', flagged' : ''}`}
                className={`relative flex h-9 w-full items-center justify-center rounded text-xs font-semibold tabular-nums ${current ? 'ring-2 ring-sky-600 dark:ring-sky-400' : ''} ${answered ? 'bg-sky-600 text-white dark:bg-sky-500' : partial ? 'bg-sky-100 text-sky-900 ring-1 ring-sky-400 ring-inset dark:bg-sky-950 dark:text-sky-200' : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'}`}
              >
                {i + 1}
                {flagged && <span aria-hidden className="absolute -top-1 -right-1 h-2.5 w-2.5 rounded-full bg-amber-500" />}
              </button>
            </li>
          )
        })}
      </ol>
      {flaggedOnly && flaggedCount === 0 && (
        <p className="text-sm text-slate-500 dark:text-slate-400">No flagged questions yet. Use Flag for review to mark one.</p>
      )}
      <p className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-500 dark:text-slate-400">
        <span>
          <span aria-hidden className="mr-1 inline-block h-2.5 w-2.5 rounded-sm bg-sky-600 align-middle" />
          Answered
        </span>
        <span>
          <span aria-hidden className="mr-1 inline-block h-2.5 w-2.5 rounded-sm bg-sky-100 align-middle ring-1 ring-sky-400" />
          Incomplete
        </span>
        <span>
          <span aria-hidden className="mr-1 inline-block h-2.5 w-2.5 rounded-full bg-amber-500 align-middle" />
          Flagged
        </span>
      </p>
    </nav>
  )
}
