import { useCallback, useEffect, useState, type Dispatch } from 'react'
import { currentQuestion, isAnswered, isLocked, type QuizAction } from '../hooks/quizReducer'
import { chooseLabel } from '../lib/format'
import type { QuizSession } from '../types/quiz'
import { QuestionCard } from './QuestionCard'
import { QuestionNavigator } from './QuestionNavigator'
import { Timer } from './Timer'

interface Props {
  session: QuizSession
  dispatch: Dispatch<QuizAction>
  onQuit: () => void
}

export function QuizScreen({ session, dispatch, onQuit }: Props) {
  const [confirmFinish, setConfirmFinish] = useState(false)
  const item = currentQuestion(session)
  const { question } = item
  const isExam = session.config.mode === 'exam'
  const selected = session.answers[question.id] ?? []
  const submitted = !!session.submitted[question.id]
  const locked = isLocked(session, question.id)
  const isLast = session.current === session.questions.length - 1
  const flagged = !!session.flagged[question.id]
  const canSubmit = selected.length === question.correct.length
  const answeredCount = session.questions.filter((q) => isAnswered(session, q)).length
  const unanswered = session.questions.filter((q) => (session.answers[q.question.id]?.length ?? 0) === 0).length
  const incomplete = session.questions.length - answeredCount - unanswered
  const submittedCount = session.questions.filter((q) => session.submitted[q.question.id]).length
  const progressCount = isExam ? answeredCount : submittedCount
  const flaggedCount = session.questions.filter((q) => session.flagged[q.question.id]).length

  const finish = useCallback(() => dispatch({ type: 'FINISH', now: Date.now() }), [dispatch])

  const primaryAction = useCallback(() => {
    if (!isExam && !submitted) {
      if (canSubmit) dispatch({ type: 'SUBMIT' })
      return
    }
    if (isLast) {
      if (isExam) setConfirmFinish(true)
      else finish()
      return
    }
    dispatch({ type: 'NEXT' })
  }, [isExam, submitted, canSubmit, isLast, dispatch, finish])

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.ctrlKey || e.metaKey || e.altKey) return
      const target = e.target as HTMLElement | null
      if (target && ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName)) return
      if (confirmFinish) {
        if (e.key === 'Escape') setConfirmFinish(false)
        return
      }

      const n = Number(e.key)
      if (Number.isInteger(n) && n >= 1 && n <= item.optionOrder.length) {
        e.preventDefault()
        dispatch({ type: 'TOGGLE_OPTION', optionId: item.optionOrder[n - 1] })
      } else if (e.key === 'Enter') {
        // Let Enter activate a focused button other than the options.
        if (target?.tagName === 'BUTTON' && !target.getAttribute('aria-keyshortcuts')) return
        e.preventDefault()
        primaryAction()
      } else if (e.key === 'ArrowRight') {
        dispatch({ type: 'NEXT' })
      } else if (e.key === 'ArrowLeft') {
        dispatch({ type: 'PREV' })
      } else if (e.key.toLowerCase() === 'f') {
        dispatch({ type: 'TOGGLE_FLAG' })
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [item, primaryAction, dispatch, confirmFinish])

  let primaryLabel = 'Next'
  if (!isExam && !submitted) primaryLabel = 'Submit'
  else if (isLast) primaryLabel = isExam ? 'Finish exam' : 'See results'

  const primaryDisabled = !isExam && !submitted && !canSubmit
  const progress = (progressCount / session.questions.length) * 100

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <button
          type="button"
          onClick={onQuit}
          className="text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"
        >
          ← Quit
        </button>
        <div className="flex items-center gap-3">
          <span className="text-sm text-slate-600 dark:text-slate-400">
            {isExam ? 'Exam' : 'Practice'} · {progressCount}/{session.questions.length} {isExam ? 'answered' : 'submitted'}
          </span>
          {isExam && session.timeLimit !== null && (
            <Timer startedAt={session.startedAt} limitSec={session.timeLimit} onExpire={finish} />
          )}
        </div>
      </div>

      <div
        role="progressbar"
        aria-label="Progress"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(progress)}
        className="h-1.5 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800"
      >
        <div className="h-full bg-sky-600 transition-all dark:bg-sky-400" style={{ width: `${progress}%` }} />
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6 dark:border-slate-800 dark:bg-slate-900">
        <QuestionCard
          item={item}
          index={session.current}
          total={session.questions.length}
          selected={selected}
          reveal={!isExam && submitted}
          locked={locked}
          onToggle={(optionId) => dispatch({ type: 'TOGGLE_OPTION', optionId })}
        />

        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 pt-4 dark:border-slate-800">
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => dispatch({ type: 'PREV' })}
              disabled={session.current === 0}
              className="rounded-md border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 disabled:opacity-40 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              Previous
            </button>
            <button
              type="button"
              aria-pressed={flagged}
              onClick={() => dispatch({ type: 'TOGGLE_FLAG' })}
              className={`rounded-md border px-4 py-2 text-sm font-medium ${flagged ? 'border-amber-500 bg-amber-100 text-amber-900 dark:border-amber-400 dark:bg-amber-950 dark:text-amber-100' : 'border-slate-300 text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800'}`}
            >
              {flagged ? 'Flagged' : 'Flag for review'}
            </button>
          </div>
          <div className="flex flex-wrap items-center justify-end gap-2">
            {primaryDisabled && selected.length > 0 && (
              <span role="status" className="text-xs text-slate-500 dark:text-slate-400">
                {chooseLabel(question.correct.length)} answers to submit.
              </span>
            )}
            {isExam && !isLast && (
              <button
                type="button"
                onClick={() => setConfirmFinish(true)}
                className="rounded-md border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
              >
                Finish
              </button>
            )}
            <button
              type="button"
              onClick={primaryAction}
              disabled={primaryDisabled}
              className="rounded-md bg-sky-600 px-5 py-2 text-sm font-semibold text-white hover:bg-sky-700 disabled:cursor-not-allowed disabled:bg-slate-400 dark:disabled:bg-slate-700 dark:disabled:text-slate-400"
            >
              {primaryLabel}
            </button>
          </div>
        </div>
      </div>

      {isExam && <QuestionNavigator session={session} onGoTo={(index) => dispatch({ type: 'GO_TO', index })} />}

      {confirmFinish && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="finish-title"
          className="fixed inset-0 z-10 flex items-center justify-center bg-slate-900/60 p-4"
        >
          <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl dark:bg-slate-900">
            <h2 id="finish-title" className="text-lg font-semibold text-slate-900 dark:text-slate-50">
              Finish exam?
            </h2>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
              {unanswered > 0 ? `${unanswered} question(s) unanswered. ` : ''}
              {incomplete > 0 ? `${incomplete} question(s) with too few options selected. ` : ''}
              {unanswered === 0 && incomplete === 0 ? 'All questions answered. ' : ''}
              {flaggedCount > 0 ? `${flaggedCount} flagged for review.` : ''}
            </p>
            <div className="mt-6 flex justify-end gap-2">
              <button
                type="button"
                autoFocus
                onClick={() => setConfirmFinish(false)}
                className="rounded-md border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
              >
                Keep reviewing
              </button>
              <button
                type="button"
                onClick={finish}
                className="rounded-md bg-sky-600 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-700"
              >
                Finish exam
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
