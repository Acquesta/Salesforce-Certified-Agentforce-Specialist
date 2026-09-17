import { LETTERS } from '../lib/format'
import type { Question } from '../types/quiz'

interface Props {
  question: Question
  optionOrder: string[]
  selected: string[]
}

// Some explanations already open with a verdict; the panel adds its own label.
const VERDICT_PREFIX = /^(correct|incorrect|wrong|right)\b[.:!,\s-]*/i

export function ExplanationPanel({ question, optionOrder, selected }: Props) {
  return (
    <section
      aria-label="Explanations"
      className="mt-6 rounded-lg border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-900/60"
    >
      <h3 className="mb-3 text-sm font-semibold tracking-wide text-slate-600 uppercase dark:text-slate-300">
        Explanation
      </h3>
      <ul className="space-y-3">
        {optionOrder.map((id, i) => {
          const option = question.options.find((o) => o.id === id)
          if (!option) return null
          const isRight = question.correct.includes(id)
          const picked = selected.includes(id)
          return (
            <li key={id} className="flex gap-3">
              <span
                className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white ${isRight ? 'bg-emerald-600' : 'bg-rose-600'}`}
                aria-label={isRight ? 'correct option' : 'incorrect option'}
              >
                {LETTERS[i]}
              </span>
              <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                <span className="font-medium text-slate-900 dark:text-slate-100">
                  {isRight ? 'Correct' : 'Incorrect'}
                  {picked ? ' (your choice)' : ''}.
                </span>{' '}
                {option.explanation.replace(VERDICT_PREFIX, '')}
              </p>
            </li>
          )
        })}
      </ul>
      {question.reference && (
        <a
          href={question.reference}
          target="_blank"
          rel="noreferrer"
          className="mt-4 inline-block text-sm font-medium text-sky-700 underline underline-offset-2 hover:text-sky-900 dark:text-sky-400 dark:hover:text-sky-300"
        >
          Learn more
        </a>
      )}
    </section>
  )
}
