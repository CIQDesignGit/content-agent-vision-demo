"use client"

import { useSyncExternalStore } from "react"

const STORAGE_KEY = "ca:captured-opportunity:v2"
const CHANGE_EVENT = "ca:captured-opportunity:v2"

/** Open buckets on the overview status bar that a publish can draw dollars out of. */
export type CaptureBucket = "seasonal" | "pdp"

export interface CaptureLedger {
  /** USD captured by publishes this session, on top of the seeded baseline. */
  capturedUsd: number
  /** Slice of `capturedUsd` the overview has not animated in yet. */
  pendingUsd: number
  /** SKUs behind `pendingUsd`. */
  pendingSkuCount: number
  /** Bucket the most recent publish drew from. */
  bucket: CaptureBucket
}

const EMPTY: CaptureLedger = {
  capturedUsd: 0,
  pendingUsd: 0,
  pendingSkuCount: 0,
  bucket: "pdp",
}

// useSyncExternalStore loops forever if getSnapshot hands back a new object each
// call, so parse only when the stored string actually moves.
let cachedRaw: string | null = null
let cached: CaptureLedger = EMPTY

function readLedger(): CaptureLedger {
  if (typeof window === "undefined") return EMPTY

  const raw = window.sessionStorage.getItem(STORAGE_KEY)
  if (raw === cachedRaw) return cached

  cachedRaw = raw
  try {
    cached = raw ? { ...EMPTY, ...(JSON.parse(raw) as Partial<CaptureLedger>) } : EMPTY
  } catch {
    cached = EMPTY
  }
  return cached
}

function writeLedger(next: CaptureLedger) {
  window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(next))
  window.dispatchEvent(new Event(CHANGE_EVENT))
}

function subscribe(onChange: () => void) {
  window.addEventListener(CHANGE_EVENT, onChange)
  window.addEventListener("storage", onChange)
  return () => {
    window.removeEventListener(CHANGE_EVENT, onChange)
    window.removeEventListener("storage", onChange)
  }
}

export function useCapturedOpportunity(): CaptureLedger {
  return useSyncExternalStore(subscribe, readLedger, () => EMPTY)
}

/**
 * A SKU's 3-month OPS figure runs $620–$12.4K, which is a rounding error against
 * a $4.81M meter — one publish would leave the headline and the bar visibly
 * unchanged. The prototype books each publish at an annualized value so a single
 * publish reads on the overview. Drop the scale to 1 to book raw OPS instead.
 */
const DEMO_CAPTURE_SCALE = 11
const DEMO_CAPTURE_FLOOR_USD = 35_000

/** What one published SKU is worth to the overview meter. */
export function captureValueForOps(ops: number): number {
  if (ops <= 0) return 0
  return Math.max(Math.round(ops * DEMO_CAPTURE_SCALE), DEMO_CAPTURE_FLOOR_USD)
}

/** Books a publish against the overview meter. `usd` is the SKU's opportunity value. */
export function recordCapture(usd: number, bucket: CaptureBucket, skuCount = 1) {
  if (typeof window === "undefined" || usd <= 0) return

  const prev = readLedger()
  writeLedger({
    capturedUsd: prev.capturedUsd + usd,
    pendingUsd: prev.pendingUsd + usd,
    pendingSkuCount: prev.pendingSkuCount + skuCount,
    bucket,
  })
}

/** Called once the overview has finished animating the rise. */
export function settleCapture() {
  if (typeof window === "undefined") return

  const prev = readLedger()
  if (prev.pendingUsd === 0) return
  writeLedger({ ...prev, pendingUsd: 0, pendingSkuCount: 0 })
}
