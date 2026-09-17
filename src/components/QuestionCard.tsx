import { SECTION_BY_ID } from '../data/sections'
import { chooseLabel, LETTERS } from '../lib/format'
import type { SessionQuestion } from '../types/quiz'
import { ExplanationPanel } from './ExplanationPanel'
import { OptionButton, type OptionState } from './OptionButton'

interface Props {
  item: SessionQuestion
  index: number
  total: number
  selected: string[]
  /** Show correct/incorrect colors and explanations. */
  reveal: boolean
  locked: boolean
  onToggle: (optionId: string) => void
  showShortcuts?: boolean
}

export function QuestionCard({ item, index, total, selected, reveal, locked, onToggle, showShortcuts = true }: Props) {
  const { question, optionOrder } = item
  const multiple = question.type === 'multiple'

  function stateFor(id: string): OptionState {
    const picked = selected.includes(id)
    if (!reveal) return picked ? 'selected' : 'neutral'
    const right = question.correct.includes(id)
    if (picked) return right ? 'correct' : 'wrong'
    return right ? 'missed' : 'neutral'
  }

  return (
    <article>
      <div className="mb-3 flex flex-wrap items-center gap-2 text-xs">
        <span className="font-medium text-slate-500 dark:text-slate-400">
          Question {index + 1} of {total}
        </span>
        <span className="rounded-full bg-slate-200 px-2 py-0.5 font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-300">
          {SECTION_BY_ID[question.section].name}
        </span>
      </div>
      <h2 id={`q-${question.id}`} className="text-lg leading-relaxed font-medium text-slate-900 sm:text-xl dark:text-slate-50">
        {question.prompt}
      </h2>
      {multiple && (
        <p className="mt-2 text-sm font-medium text-sky-700 dark:text-sky-400">
          {chooseLabel(question.correct.length)} answers.
        </p>
      )}
      <div
        role={multiple ? 'group' : 'radiogroup'}
        aria-labelledby={`q-${question.id}`}
        className="mt-5 space-y-3"
      >
        {optionOrder.map((id, i) => {
          const option = question.options.find((o) => o.id === id)
          if (!option) return null
          return (
            <OptionButton
              key={id}
              option={option}
              letter={LETTERS[i]}
              shortcut={i + 1}
              multiple={multiple}
              selected={selected.includes(id)}
              state={stateFor(id)}
              disabled={locked}
              onToggle={() => onToggle(id)}
              showShortcut={showShortcuts}
            />
          )
        })}
      </div>
      {reveal && <ExplanationPanel question={question} optionOrder={optionOrder} selected={selected} />}
    </article>
  )
}
