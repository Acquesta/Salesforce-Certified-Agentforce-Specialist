import { describe, expect, it } from 'vitest'
import { QUESTION_BANK } from '../index'
import { EXPLANATIONS_PT } from './index'

describe('Portuguese explanations', () => {
  it.each(QUESTION_BANK.map((q) => [q.id, q] as const))('%s has a translation for every option', (id, q) => {
    const pt = EXPLANATIONS_PT[id]
    expect(pt, `missing translations for ${id}`).toBeDefined()
    expect(Object.keys(pt).sort()).toEqual(q.options.map((o) => o.id).sort())
    for (const o of q.options) {
      expect(pt[o.id].trim().length, `${id} option ${o.id}`).toBeGreaterThan(0)
      expect(pt[o.id]).not.toBe(o.explanation)
    }
  })

  it('has no translations for unknown questions', () => {
    const ids = new Set(QUESTION_BANK.map((q) => q.id))
    expect(Object.keys(EXPLANATIONS_PT).filter((id) => !ids.has(id))).toEqual([])
  })
})
