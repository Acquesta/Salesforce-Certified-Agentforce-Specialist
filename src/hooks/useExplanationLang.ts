import { useSyncExternalStore } from 'react'
import { loadExplanationLang, saveExplanationLang } from '../lib/storage'
import type { ExplanationLang } from '../types/quiz'

// One shared choice for every explanation panel, so switching in one card switches them all.
let current: ExplanationLang = loadExplanationLang()
const listeners = new Set<() => void>()

function subscribe(listener: () => void) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

export function setExplanationLang(lang: ExplanationLang) {
  if (lang === current) return
  current = lang
  saveExplanationLang(lang)
  listeners.forEach((l) => l())
}

export function useExplanationLang(): ExplanationLang {
  return useSyncExternalStore(subscribe, () => current)
}
