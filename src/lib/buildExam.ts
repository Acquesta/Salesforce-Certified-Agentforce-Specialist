import { SECTION_BY_ID } from '../data/sections'
import type { Question, QuizConfig, SectionId, SessionQuestion } from '../types/quiz'
import { shuffle } from './shuffle'

/**
 * Splits `count` across sections proportionally to their weights using the
 * largest-remainder method, capped by how many questions each section has.
 */
export function allocateBySection(
  count: number,
  sections: SectionId[],
  available: Record<SectionId, number>,
): Record<SectionId, number> {
  const pool = sections.filter((id) => (available[id] ?? 0) > 0)
  const allocation = Object.fromEntries(pool.map((id) => [id, 0])) as Record<SectionId, number>
  const totalAvailable = pool.reduce((sum, id) => sum + available[id], 0)
  let remaining = Math.min(count, totalAvailable)

  while (remaining > 0) {
    const open = pool.filter((id) => allocation[id] < available[id])
    const weightSum = open.reduce((sum, id) => sum + SECTION_BY_ID[id].weight, 0)
    const shares = open.map((id) => {
      const exact = (remaining * SECTION_BY_ID[id].weight) / weightSum
      return { id, floor: Math.floor(exact), rest: exact - Math.floor(exact) }
    })

    let assigned = 0
    for (const share of shares) {
      const take = Math.min(share.floor, available[share.id] - allocation[share.id])
      allocation[share.id] += take
      assigned += take
    }
    // Hand out leftovers one by one to the largest remainders.
    for (const share of [...shares].sort((a, b) => b.rest - a.rest)) {
      if (assigned >= remaining) break
      if (allocation[share.id] < available[share.id]) {
        allocation[share.id] += 1
        assigned += 1
      }
    }
    if (assigned === 0) break
    remaining -= assigned
  }

  return allocation
}

export function buildQuiz(
  bank: Question[],
  config: QuizConfig,
  random: () => number = Math.random,
): SessionQuestion[] {
  const allowed = config.questionIds ? new Set(config.questionIds) : null
  const bySection = new Map<SectionId, Question[]>()
  for (const q of bank) {
    if (!config.sections.includes(q.section)) continue
    if (allowed && !allowed.has(q.id)) continue
    bySection.set(q.section, [...(bySection.get(q.section) ?? []), q])
  }

  const available = Object.fromEntries(
    config.sections.map((id) => [id, bySection.get(id)?.length ?? 0]),
  ) as Record<SectionId, number>
  const allocation = allocateBySection(config.questionCount, config.sections, available)

  const picked = Object.entries(allocation).flatMap(([id, n]) =>
    shuffle(bySection.get(id as SectionId) ?? [], random).slice(0, n),
  )

  return shuffle(picked, random).map((question) => ({
    question,
    optionOrder: shuffle(
      question.options.map((o) => o.id),
      random,
    ),
  }))
}
