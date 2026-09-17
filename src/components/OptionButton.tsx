import type { Option } from '../types/quiz'

export type OptionState = 'neutral' | 'selected' | 'correct' | 'wrong' | 'missed'

interface Props {
  option: Option
  letter: string
  shortcut: number
  multiple: boolean
  selected: boolean
  state: OptionState
  disabled: boolean
  onToggle: () => void
  showShortcut?: boolean
}

const STATE_CLASSES: Record<OptionState, string> = {
  neutral:
    'border-slate-300 bg-white hover:border-sky-500 hover:bg-sky-50 dark:border-slate-700 dark:bg-slate-900 dark:hover:border-sky-400 dark:hover:bg-slate-800',
  selected: 'border-sky-600 bg-sky-50 ring-1 ring-sky-600 dark:border-sky-400 dark:bg-sky-950 dark:ring-sky-400',
  correct: 'border-emerald-600 bg-emerald-50 ring-1 ring-emerald-600 dark:border-emerald-400 dark:bg-emerald-950 dark:ring-emerald-400',
  wrong: 'border-rose-600 bg-rose-50 ring-1 ring-rose-600 dark:border-rose-400 dark:bg-rose-950 dark:ring-rose-400',
  missed: 'border-emerald-600 border-dashed bg-white dark:border-emerald-400 dark:bg-slate-900',
}

const STATE_LABEL: Partial<Record<OptionState, string>> = {
  correct: 'Correct',
  wrong: 'Incorrect',
  missed: 'Correct answer',
}

export function OptionButton({
  option,
  letter,
  shortcut,
  multiple,
  selected,
  state,
  disabled,
  onToggle,
  showShortcut = true,
}: Props) {
  const indicator = multiple ? 'rounded' : 'rounded-full'
  return (
    <button
      type="button"
      role={multiple ? 'checkbox' : 'radio'}
      aria-checked={selected}
      aria-keyshortcuts={showShortcut ? String(shortcut) : undefined}
      aria-disabled={disabled}
      onClick={disabled ? undefined : onToggle}
      className={`group flex w-full items-start gap-3 rounded-lg border p-3 text-left transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600 sm:p-4 ${STATE_CLASSES[state]} ${disabled ? 'cursor-default' : 'cursor-pointer'}`}
    >
      <span
        aria-hidden
        className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center border-2 ${indicator} ${selected ? 'border-sky-600 bg-sky-600 dark:border-sky-400 dark:bg-sky-400' : 'border-slate-400 dark:border-slate-500'}`}
      >
        {selected && <span className={`block h-2 w-2 bg-white dark:bg-slate-900 ${indicator}`} />}
      </span>
      <span className="font-semibold text-slate-700 dark:text-slate-200">{letter}.</span>
      <span className="flex-1 text-slate-900 dark:text-slate-100">
        {option.text}
        {STATE_LABEL[state] && (
          <span
            className={`ml-2 inline-block rounded px-1.5 py-0.5 text-xs font-medium ${state === 'wrong' ? 'bg-rose-100 text-rose-800 dark:bg-rose-900 dark:text-rose-100' : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-100'}`}
          >
            {STATE_LABEL[state]}
          </span>
        )}
      </span>
      {showShortcut && (
        <kbd
        title={`Shortcut: press ${shortcut}`}
        className="hidden shrink-0 rounded border border-slate-300 bg-slate-100 px-1.5 py-0.5 font-mono text-xs text-slate-600 sm:inline-block dark:border-slate-600 dark:bg-slate-800 dark:text-slate-300"
      >
        {shortcut}
        </kbd>
      )}
    </button>
  )
}
