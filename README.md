# Agentforce Specialist Practice Quiz

Practice quiz for the **Salesforce Certified Agentforce Specialist** exam. Built with Vite, React, TypeScript and Tailwind CSS v4. No login, no backend.

## Features

- **Practice mode**: instant feedback after each answer, with an explanation for every option.
- **Exam simulation**: 60 questions weighted like the real exam, 105-minute timer with auto-finish, results at the end.
- Flag questions for review and jump between them with the question navigator.
- Questions and options are shuffled on every attempt. Options are labeled A–E; press 1–5 to select.
- Results overview: score, PASS/FAIL at 72%, score by section, study links for weak sections, full answer review.
- In-progress quiz and the last 10 attempts are kept in `localStorage`.
- Explanations can be switched between English and Brazilian Portuguese (EN / PT toggle in the explanation card). Questions and options always stay in English.
- Dark mode follows the system setting.

## Exam sections

| Section | Weight |
| --- | --- |
| AI Agents | 35% |
| Prompt Engineering | 20% |
| Data 360 Fundamentals | 20% |
| Testing, Deployment, and Maintenance | 10% |
| Governance and Observability | 10% |
| Multi-Agent Orchestration | 5% |

## Scripts

```bash
npm install
npm run dev        # start dev server
npm run test       # unit tests + question bank validation
npm run build      # typecheck and production build
```

## Adding questions

Questions live in `src/data/questions/<section>.ts` and follow the `Question` type in `src/types/quiz.ts`. Every option needs an `explanation`. Multiple-select questions list more than one id in `correct`; the UI shows "Choose N answers", so do not repeat it in the prompt. Portuguese explanations live in `src/data/questions/pt/<section>.ts` (question id → option id → text); every option needs one. `npm run test` validates the bank and the translations.

## Disclaimer

Unofficial study aid. All questions are original and written in the style of the exam; they are not exam dumps and are not affiliated with or endorsed by Salesforce. Verify details against the official exam guide and Salesforce Help.
