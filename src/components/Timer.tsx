import { useEffect, useState } from 'react'
import { formatClock } from '../lib/format'

interface Props {
  startedAt: number
  limitSec: number
  onExpire: () => void
}

export function Timer({ startedAt, limitSec, onExpire }: Props) {
  const [now, setNow] = useState(() => Date.now())
  const remaining = limitSec - (now - startedAt) / 1000

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    if (remaining <= 0) onExpire()
  }, [remaining, onExpire])

  const warning = remaining <= 5 * 60
  return (
    <span
      role="timer"
      aria-label="Time remaining"
      className={`rounded-md px-2.5 py-1 font-mono text-sm font-semibold tabular-nums ${warning ? 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-200' : 'bg-slate-200 text-slate-800 dark:bg-slate-800 dark:text-slate-200'}`}
    >
      {formatClock(remaining)}
    </span>
  )
}
