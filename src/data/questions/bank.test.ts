import { describe, expect, it } from 'vitest'
import { SECTIONS } from '../sections'
import { QUESTION_BANK } from './index'

// Minimum per section so a full 60-question exam keeps the official weights.
const MIN_PER_SECTION: Record<string, number> = {
  'ai-agents': 21,
  'prompt-engineering': 12,
  'data-360': 12,
  'testing-deployment': 6,
  'governance-observability': 6,
  'multi-agent': 3,
}

describe('question bank', () => {
  it('has unique ids', () => {
    const ids = QUESTION_BANK.map((q) => q.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it.each(QUESTION_BANK.map((q) => [q.id, q] as const))('%s is well formed', (_, q) => {
    expect(q.prompt.trim().length).toBeGreaterThan(0)
    expect(q.options.length).toBeGreaterThanOrEqual(3)
    expect(q.options.length).toBeLessThanOrEqual(5)
    expect(new Set(q.options.map((o) => o.id)).size).toBe(q.options.length)
    for (const o of q.options) {
      expect(o.text.trim().length, `option ${o.id} text`).toBeGreaterThan(0)
      expect(o.explanation.trim().length, `option ${o.id} explanation`).toBeGreaterThan(0)
    }
    expect(new Set(q.correct).size).toBe(q.correct.length)
    for (const id of q.correct) expect(q.options.map((o) => o.id)).toContain(id)
    expect(q.type).toBe(q.correct.length > 1 ? 'multiple' : 'single')
    // The UI renders "Choose N answers", so prompts must not repeat it.
    expect(q.prompt).not.toMatch(/choose (two|three|\d)/i)
    expect(SECTIONS.map((s) => s.id)).toContain(q.section)
  })

  it('has enough questions per section for a full exam', () => {
    for (const s of SECTIONS) {
      const count = QUESTION_BANK.filter((q) => q.section === s.id).length
      expect(count, s.id).toBeGreaterThanOrEqual(MIN_PER_SECTION[s.id])
    }
  })
})
