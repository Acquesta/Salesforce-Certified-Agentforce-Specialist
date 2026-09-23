import type {
  AttemptSummary,
  ExplanationLang,
  QuestionStats,
  QuizMode,
  QuizSession,
  SectionId,
  StoredAttempt,
} from '../types/quiz'
import { applyAttempt } from './stats'

const SESSION_KEY = 'afs-quiz:session:v1'
const HISTORY_KEY = 'afs-quiz:history:v1'
const HISTORY_LIMIT = 10

// Storage can be unavailable (private mode, blocked site data), so every access is guarded.
function read<T>(key: string): T | null {
  try {
    const raw = localStorage.getItem(key)
    return raw ? (JSON.parse(raw) as T) : null
  } catch {
    return null
  }
}

function write(key: string, value: unknown): void {
  try {
    if (value === null) localStorage.removeItem(key)
    else localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // Ignore: persistence is a convenience only.
  }
}

export function loadSession(): QuizSession | null {
  const session = read<QuizSession>(SESSION_KEY)
  return session && Array.isArray(session.questions) && session.questions.length > 0 ? session : null
}

export function saveSession(session: QuizSession | null): void {
  write(SESSION_KEY, session)
}

export function loadHistory(): AttemptSummary[] {
  return read<AttemptSummary[]>(HISTORY_KEY) ?? []
}

export function addToHistory(attempt: AttemptSummary): AttemptSummary[] {
  const history = [attempt, ...loadHistory().filter((a) => a.id !== attempt.id)].slice(0, HISTORY_LIMIT)
  write(HISTORY_KEY, history)
  return history
}

const ATTEMPTS_KEY = 'afs-quiz:attempts:v1'
const STATS_KEY = 'afs-quiz:stats:v1'
// Full attempts carry every question, so only the newest few are kept.
const ATTEMPT_LIMIT = 5

/** Finished attempts kept in full, newest first, so results can be reopened. */
export function loadAttempts(): StoredAttempt[] {
  const attempts = read<StoredAttempt[]>(ATTEMPTS_KEY)
  return Array.isArray(attempts) ? attempts.filter((a) => a?.summary && a?.session) : []
}

export function loadStats(): QuestionStats {
  return read<QuestionStats>(STATS_KEY) ?? {}
}

export function saveStats(stats: QuestionStats): void {
  write(STATS_KEY, stats)
}

/** Records a finished attempt: summary, full answers and the lifetime per-question stats. */
export function recordAttempt(summary: AttemptSummary, session: QuizSession) {
  const attempts = [{ summary, session }, ...loadAttempts().filter((a) => a.summary.id !== summary.id)].slice(
    0,
    ATTEMPT_LIMIT,
  )
  write(ATTEMPTS_KEY, attempts)
  const stats = applyAttempt(loadStats(), session)
  saveStats(stats)
  return { attempts, history: addToHistory(summary), stats }
}

export function clearAnswerHistory(): void {
  write(ATTEMPTS_KEY, null)
  write(STATS_KEY, null)
  write(HISTORY_KEY, null)
}

const PREFS_KEY = 'afs-quiz:prefs:v1'

export interface StartPrefs {
  mode: QuizMode
  count: number
  sections: SectionId[]
}

export function loadPrefs(): StartPrefs | null {
  return read<StartPrefs>(PREFS_KEY)
}

export function savePrefs(prefs: StartPrefs): void {
  write(PREFS_KEY, prefs)
}

const LANG_KEY = 'afs-quiz:explanation-lang:v1'

export function loadExplanationLang(): ExplanationLang {
  return read<ExplanationLang>(LANG_KEY) === 'pt' ? 'pt' : 'en'
}

export function saveExplanationLang(lang: ExplanationLang): void {
  write(LANG_KEY, lang)
}
