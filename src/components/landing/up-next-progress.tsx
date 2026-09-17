"use client"

import { motion } from "framer-motion"
import { DURATION, EASE_OUT } from "@/lib/motion"

interface UpNextProgressProps {
  actedCount: number
  totalCount: number
  /** Moment value, e.g. "$1.24M". Progress is a pro-rata slice of this figure. */
  valueLabel: string
}

function parseUsd(label: string): number {
  const amount = Number(label.replace(/[^0-9.]/g, ""))
  if (!Number.isFinite(amount)) return 0
  if (/m/i.test(label)) return amount * 1_000_000
  if (/k/i.test(label)) return amount * 1_000
  return amount
}

function formatShare(usd: number): string {
  if (usd >= 1_000_000) {
    const millions = usd / 1_000_000
    const digits = millions >= 10 ? 1 : 2
    return `$${millions.toFixed(digits)}M`
  }
  if (usd >= 10_000) return `$${Math.round(usd / 1000)}K`
  if (usd >= 1000) return `$${(usd / 1000).toFixed(1)}K`
  return `$${Math.round(usd)}`
}

export function UpNextProgress({
  actedCount,
  totalCount,
  valueLabel,
}: UpNextProgressProps) {
  if (actedCount <= 0 || totalCount <= 0) return null

  const done = Math.min(actedCount, totalCount)
  const share = done / totalCount
  const totalUsd = parseUsd(valueLabel)
  const captured = formatShare(totalUsd * share)
  const remaining = formatShare(totalUsd * (1 - share))
  // A single SKU is a fraction of a percent — keep a visible sliver without labeling it 0%.
  const bar = `${Math.max(share * 100, 1.5)}%`

  return (
    <div className="flex w-fit max-w-full flex-col gap-1.5">
      <p className="text-xs leading-5 text-slate-600">
        {done >= totalCount ? (
          <>
            All{" "}
            <span className="font-semibold text-success-700 tabular-nums">{valueLabel}</span>{" "}
            is in motion.
          </>
        ) : (
          <>
            <span className="font-semibold text-success-700 tabular-nums">{captured}</span>
            {" captured today"}
            <span className="px-1.5 text-slate-300" aria-hidden>
              ·
            </span>
            <span className="font-semibold text-slate-800 tabular-nums">{remaining}</span>
            {" to go"}
          </>
        )}
      </p>
      <div className="h-1 w-28 overflow-hidden rounded-full bg-slate-200">
        <motion.div
          className="h-full rounded-full bg-success-600"
          initial={{ width: 0 }}
          animate={{ width: bar }}
          transition={{ duration: DURATION.calm, ease: EASE_OUT }}
        />
      </div>
    </div>
  )
}
