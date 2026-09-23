import { useEffect, useMemo, useReducer, useRef, useState } from 'react'
import { QuizScreen } from './components/QuizScreen'
import { ResultsScreen } from './components/ResultsScreen'
import { StartScreen } from './components/StartScreen'
import { QUESTION_BANK } from './data/questions'
import { SECTIONS } from './data/sections'
import { quizReducer } from './hooks/quizReducer'
import { buildQuiz } from './lib/buildExam'
import { scoreSession } from './lib/scoring'
import { summarizeStats } from './lib/stats'
import { clearAnswerHistory, loadAttempts, loadSession, loadStats, recordAttempt, saveSession } from './lib/storage'
import type { QuizConfig, StoredAttempt } from './types/quiz'

const BANK_IDS = QUESTION_BANK.map((q) => q.id)

export default function App() {
  const [session, dispatch] = useReducer(quizReducer, null)
  const [saved, setSaved] = useState(() => loadSession())
  const [attempts, setAttempts] = useState(() => loadAttempts())
  const [stats, setStats] = useState(() => loadStats())
  const [reviewing, setReviewing] = useState<StoredAttempt | null>(null)
  const recorded = useRef<string | null>(null)

  const summary = useMemo(() => (session?.finishedAt ? scoreSession(session) : null), [session])
  const overview = useMemo(() => summarizeStats(stats, BANK_IDS), [stats])

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

  // Keep the finished attempt: its answers and the lifetime per-question stats.
  useEffect(() => {
    if (!session || !summary || recorded.current === summary.id) return
    recorded.current = summary.id
    const stored = recordAttempt(summary, session)
    setAttempts(stored.attempts)
    setStats(stored.stats)
  }, [summary, session])

  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [session?.current, session?.finishedAt, session === null, reviewing])

  function start(config: QuizConfig) {
    saveSession(null)
    setSaved(null)
    setReviewing(null)
    dispatch({ type: 'START', config, questions: buildQuiz(QUESTION_BANK, config), now: Date.now() })
  }

  function practiceMistakes() {
    start({
      mode: 'practice',
      questionCount: overview.toReview.length,
      sections: SECTIONS.map((s) => s.id),
      questionIds: overview.toReview,
    })
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

  function clearHistory() {
    clearAnswerHistory()
    setAttempts([])
    setStats({})
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <main className="mx-auto max-w-3xl px-4 py-8 sm:py-12">
        {!session && !reviewing && (
          <StartScreen
            bank={QUESTION_BANK}
            attempts={attempts}
            stats={overview}
            saved={saved}
            onStart={start}
            onResume={resume}
            onPracticeMistakes={practiceMistakes}
            onReview={setReviewing}
            onClearHistory={clearHistory}
          />
        )}
        {!session && reviewing && (
          <ResultsScreen
            session={reviewing.session}
            summary={reviewing.summary}
            onRestart={() => setReviewing(null)}
            restartLabel="Back to start"
          />
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
