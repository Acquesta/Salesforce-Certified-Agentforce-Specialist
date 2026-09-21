import { EXPLANATIONS_PT } from '../data/questions/pt'
import { setExplanationLang, useExplanationLang } from '../hooks/useExplanationLang'
import { LETTERS } from '../lib/format'
import type { ExplanationLang, Question } from '../types/quiz'

interface Props {
  question: Question
  optionOrder: string[]
  selected: string[]
}

// Some explanations already open with a verdict; the panel adds its own label.
const VERDICT_PREFIX = /^(correct|incorrect|wrong|right|corret[ao]|incorret[ao]|errad[ao])\b[.:!,\s-]*/i

// Only the explanation card is translated. Questions and options always stay in English.
const LABELS: Record<ExplanationLang, Record<'title' | 'correct' | 'incorrect' | 'yourChoice' | 'learnMore', string>> = {
  en: { title: 'Explanation', correct: 'Correct', incorrect: 'Incorrect', yourChoice: ' (your choice)', learnMore: 'Learn more' },
  pt: { title: 'Explicação', correct: 'Correta', incorrect: 'Incorreta', yourChoice: ' (sua escolha)', learnMore: 'Saiba mais' },
}

const LANG_OPTIONS: { value: ExplanationLang; label: string; name: string }[] = [
  { value: 'en', label: 'EN', name: 'English' },
  { value: 'pt', label: 'PT', name: 'Português' },
]

export function ExplanationPanel({ question, optionOrder, selected }: Props) {
  const lang = useExplanationLang()
  const t = LABELS[lang]
  const translations = EXPLANATIONS_PT[question.id]

  return (
    <section
      aria-label={t.title}
      className="mt-6 rounded-lg border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-900/60"
    >
      <div className="mb-3 flex items-center justify-between gap-3">
        <h3 className="text-sm font-semibold tracking-wide text-slate-600 uppercase dark:text-slate-300">{t.title}</h3>
        <div
          role="radiogroup"
          aria-label="Explanation language"
          className="inline-flex rounded-md border border-slate-300 bg-white p-0.5 dark:border-slate-600 dark:bg-slate-800"
        >
          {LANG_OPTIONS.map((o) => (
            <button
              key={o.value}
              type="button"
              role="radio"
              aria-checked={lang === o.value}
              title={o.name}
              onClick={() => setExplanationLang(o.value)}
              className={`rounded px-2.5 py-1 text-xs font-semibold focus-visible:outline-2 focus-visible:outline-sky-600 ${lang === o.value ? 'bg-sky-600 text-white dark:bg-sky-500' : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-700'}`}
            >
              {o.label}
            </button>
          ))}
        </div>
      </div>
      <ul className="space-y-3">
        {optionOrder.map((id, i) => {
          const option = question.options.find((o) => o.id === id)
          if (!option) return null
          const isRight = question.correct.includes(id)
          const picked = selected.includes(id)
          const text = (lang === 'pt' && translations?.[id]) || option.explanation
          return (
            <li key={id} className="flex gap-3">
              <span
                className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white ${isRight ? 'bg-emerald-600' : 'bg-rose-600'}`}
                aria-label={isRight ? 'correct option' : 'incorrect option'}
              >
                {LETTERS[i]}
              </span>
              <p lang={lang === 'pt' && translations?.[id] ? 'pt-BR' : 'en'} className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                <span className="font-medium text-slate-900 dark:text-slate-100">
                  {isRight ? t.correct : t.incorrect}
                  {picked ? t.yourChoice : ''}.
                </span>{' '}
                {text.replace(VERDICT_PREFIX, '')}
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
          {t.learnMore}
        </a>
      )}
    </section>
  )
}
