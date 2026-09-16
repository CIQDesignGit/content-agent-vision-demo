"use client"

import { useSyncExternalStore } from "react"

const STORAGE_KEY = "ca:queue-progress:v1"
const CHANGE_EVENT = "ca:queue-progress:v1"

/** SKU ids published this session, keyed by the queue they were reviewed from. */
type ProgressMap = Record<string, string[]>

const EMPTY: ProgressMap = {}

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

/** How many distinct SKUs the user has published out of this queue. */
export function useQueueActedCount(queueId: string | undefined): number {
  const progress = useSyncExternalStore(subscribe, readProgress, () => EMPTY)
  return queueId ? (progress[queueId]?.length ?? 0) : 0
}

/** Books published SKUs against their queue. Re-publishing a SKU never double-counts. */
export function recordQueueProgress(queueId: string, skuIds: string[]) {
  if (typeof window === "undefined" || !queueId || skuIds.length === 0) return

  const prev = readProgress()
  const merged = new Set([...(prev[queueId] ?? []), ...skuIds])
  const next: ProgressMap = { ...prev, [queueId]: Array.from(merged) }

  window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(next))
  window.dispatchEvent(new Event(CHANGE_EVENT))
}
