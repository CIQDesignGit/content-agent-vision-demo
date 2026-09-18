"use client"

import { useSyncExternalStore } from "react"

const STORAGE_KEY = "ca:queue-progress:v1"
const CHANGE_EVENT = "ca:queue-progress:v1"

/** SKU ids published this session, keyed by the queue they were reviewed from. */
type ProgressMap = Record<string, string[]>

const EMPTY: ProgressMap = {}

// A reload must not surface leftover progress. The chip only appears after an
// action is booked in this visit and the user navigates back to the overview.
let actedThisVisit = false

// useSyncExternalStore loops forever if getSnapshot hands back a new object each
// call, so parse only when the stored string actually moves.
let cachedRaw: string | null = null
let cached: ProgressMap = EMPTY

function readProgress(): ProgressMap {
  if (typeof window === "undefined") return EMPTY

  const raw = window.sessionStorage.getItem(STORAGE_KEY)
  if (raw === cachedRaw) return cached

  cachedRaw = raw
  try {
    cached = raw ? (JSON.parse(raw) as ProgressMap) : EMPTY
  } catch {
    cached = EMPTY
  }
  return cached
}

function subscribe(onChange: () => void) {
  window.addEventListener(CHANGE_EVENT, onChange)
  window.addEventListener("storage", onChange)
  return () => {
    window.removeEventListener(CHANGE_EVENT, onChange)
    window.removeEventListener("storage", onChange)
  }
}

/** How many distinct SKUs the user has published out of this queue this visit. */
export function useQueueActedCount(queueId: string | undefined): number {
  const progress = useSyncExternalStore(subscribe, readProgress, () => EMPTY)
  if (!actedThisVisit || !queueId) return 0
  return progress[queueId]?.length ?? 0
}

/** SKU ids already booked against this queue — used to resume a Review list mid-visit. */
export function getQueueActedSkuIds(queueId: string | undefined): string[] {
  if (typeof window === "undefined" || !actedThisVisit || !queueId) return []
  return readProgress()[queueId] ?? []
}

/** Books acted-on SKUs against their queue. Acting on a SKU twice never double-counts. */
export function recordQueueProgress(queueId: string, skuIds: string[]) {
  if (typeof window === "undefined" || !queueId || skuIds.length === 0) return

  const prev = readProgress()
  const existing = prev[queueId] ?? []
  const merged = new Set([...existing, ...skuIds])
  // Callers re-send the full acted set on every change, so bail when nothing
  // new arrived — otherwise each keystroke would republish the store.
  if (merged.size === existing.length) return

  actedThisVisit = true
  const next: ProgressMap = { ...prev, [queueId]: Array.from(merged) }

  window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(next))
  window.dispatchEvent(new Event(CHANGE_EVENT))
}
