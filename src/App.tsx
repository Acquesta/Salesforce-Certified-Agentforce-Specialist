import { useEffect, useMemo, useReducer, useRef, useState } from 'react'
import { QuizScreen } from './components/QuizScreen'
import { ResultsScreen } from './components/ResultsScreen'
import { StartScreen } from './components/StartScreen'
import { QUESTION_BANK } from './data/questions'
import { quizReducer } from './hooks/quizReducer'
import { buildQuiz } from './lib/buildExam'
import { scoreSession } from './lib/scoring'
import { addToHistory, loadHistory, loadSession, saveSession } from './lib/storage'
import type { QuizConfig } from './types/quiz'

export default function App() {
  const [session, dispatch] = useReducer(quizReducer, null)
  const [saved, setSaved] = useState(() => loadSession())
  const [history, setHistory] = useState(() => loadHistory())
  const recorded = useRef<string | null>(null)

  const summary = useMemo(() => (session?.finishedAt ? scoreSession(session) : null), [session])

  // Persist the in-progress quiz; clear it once finished.
  useEffect(() => {
    if (!session) return
    saveSession(session.finishedAt ? null : session)
  }, [session])

  // Pause the clock when the page is closed or reloaded mid-quiz.
  useEffect(() => {
    if (!session || session.finishedAt) return
    const onPageHide = () => saveSession({ ...session, pausedAt: Date.now() })
    window.addEventListener('pagehide', onPageHide)
    return () => window.removeEventListener('pagehide', onPageHide)
  }, [session])

  useEffect(() => {
    if (summary && recorded.current !== summary.id) {
      recorded.current = summary.id
      setHistory(addToHistory(summary))
    }
  }, [summary])

  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [session?.current, session?.finishedAt, session === null])

  function start(config: QuizConfig) {
    saveSession(null)
    setSaved(null)
    dispatch({ type: 'START', config, questions: buildQuiz(QUESTION_BANK, config), now: Date.now() })
  }

  function resume() {
    if (saved) dispatch({ type: 'RESUME', session: saved, now: Date.now() })
    setSaved(null)
  }

  function quit() {
    if (!session) return
    // Keep the attempt, with the clock paused, so it can be resumed from the start screen.
    const paused = { ...session, pausedAt: Date.now() }
    saveSession(paused)
    setSaved(paused)
    dispatch({ type: 'RESET' })
  }

  function restart() {
    setSaved(null)
    dispatch({ type: 'RESET' })
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <main className="mx-auto max-w-3xl px-4 py-8 sm:py-12">
        {!session && (
          <StartScreen bank={QUESTION_BANK} history={history} saved={saved} onStart={start} onResume={resume} />
        )}
        {session && !summary && <QuizScreen session={session} dispatch={dispatch} onQuit={quit} />}
        {session && summary && <ResultsScreen session={session} summary={summary} onRestart={restart} />}
      </main>
      <footer className="mx-auto max-w-3xl px-4 pb-8 text-center text-xs text-slate-500 dark:text-slate-500">
        Unofficial study aid. Original practice questions, not affiliated with or endorsed by Salesforce. Not exam dumps.
      </footer>
    </div>
  )
}
