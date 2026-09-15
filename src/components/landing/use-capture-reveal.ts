"use client"

import { useEffect, useState } from "react"
import {
  settleCapture,
  useCapturedOpportunity,
  type CaptureBucket,
} from "@/lib/captured-opportunity"

/**
 * Hold the pre-publish numbers until the pane's own entrance has landed —
 * releasing them during the reveal would read as one continuous draw-in rather
 * than as a rise caused by what the user just published.
 */
const RISE_DELAY_MS = 900

/** How long the "just captured" affordances stay up before the pane settles. */
export const CELEBRATION_MS = 5000

export interface CaptureReveal {
  /** USD to render right now — pre-publish while holding, full total after. */
  capturedUsd: number
  /** The rise this visit is showing; 0 when nothing new landed. */
  deltaUsd: number
  skuCount: number
  bucket: CaptureBucket
  /** Open while the rise is being called out; closes once the pane settles. */
  justCaptured: boolean
}

export function useCaptureReveal(): CaptureReveal {
  const ledger = useCapturedOpportunity()
  // Stashed before settleCapture() zeroes the pending slice, so the note keeps
  // its figure after the rise has played.
  const [revealed, setRevealed] = useState<{ usd: number; skuCount: number } | null>(null)
  const [settled, setSettled] = useState(false)

  useEffect(() => {
    if (ledger.pendingUsd <= 0) return

    const timer = setTimeout(() => {
      setRevealed({ usd: ledger.pendingUsd, skuCount: ledger.pendingSkuCount })
      settleCapture()
    }, RISE_DELAY_MS)

    return () => clearTimeout(timer)
  }, [ledger.pendingUsd, ledger.pendingSkuCount])

  useEffect(() => {
    if (revealed == null) return
    const timer = setTimeout(() => setSettled(true), CELEBRATION_MS)
    return () => clearTimeout(timer)
  }, [revealed])

  const holding = ledger.pendingUsd > 0

  return {
    capturedUsd: holding ? ledger.capturedUsd - ledger.pendingUsd : ledger.capturedUsd,
    deltaUsd: revealed?.usd ?? ledger.pendingUsd,
    skuCount: revealed?.skuCount ?? ledger.pendingSkuCount,
    bucket: ledger.bucket,
    justCaptured: revealed != null && !settled,
  }
}
