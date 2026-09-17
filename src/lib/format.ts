export const LETTERS = ['A', 'B', 'C', 'D', 'E']

export function formatDuration(totalSec: number): string {
  const sec = Math.max(0, Math.floor(totalSec))
  const h = Math.floor(sec / 3600)
  const m = Math.floor((sec % 3600) / 60)
  const s = sec % 60
  const mm = String(m).padStart(2, '0')
  const ss = String(s).padStart(2, '0')
  return h > 0 ? `${h}:${mm}:${ss}` : `${mm}:${ss}`
}

/** Countdown clock in total minutes, e.g. 105:00. */
export function formatClock(totalSec: number): string {
  const sec = Math.max(0, Math.ceil(totalSec))
  return `${Math.floor(sec / 60)}:${String(sec % 60).padStart(2, '0')}`
}

const NUMBER_WORDS = ['zero', 'one', 'two', 'three', 'four', 'five']

export function chooseLabel(n: number): string {
  return `Choose ${NUMBER_WORDS[n] ?? n}`
}
