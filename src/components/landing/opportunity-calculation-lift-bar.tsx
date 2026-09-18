"use client"

/** Three categorical hues — not a brand shade ramp, so segments stay distinct. */
export const CALC_SEGMENT_FILL = [
  "bg-sky-600",
  "bg-amber-500",
  "bg-teal-500",
] as const

interface OpportunityCalculationLiftBarProps {
  retailReadinessPct: number
  amazonOptimizationPct: number
  seasonalPct: number
  /** Shown to the right of the bar, e.g. "$4.81M" */
  totalLabel: string
}

export function OpportunityCalculationLiftBar({
  retailReadinessPct,
  amazonOptimizationPct,
  seasonalPct,
  totalLabel,
}: OpportunityCalculationLiftBarProps) {
  return (
    <div className="flex items-center gap-3">
      <div
        className="flex h-2 min-w-0 flex-1 overflow-hidden rounded-full bg-slate-100"
        role="img"
        aria-label={`Retail readiness, Amazon optimization, and seasonal opportunity. Total ${totalLabel}`}
      >
        <div
          className={`h-full shrink-0 ${CALC_SEGMENT_FILL[0]}`}
          style={{ width: `${retailReadinessPct}%` }}
        />
        <div
          className={`h-full shrink-0 ${CALC_SEGMENT_FILL[1]}`}
          style={{ width: `${amazonOptimizationPct}%` }}
        />
        <div
          className={`h-full shrink-0 ${CALC_SEGMENT_FILL[2]}`}
          style={{ width: `${seasonalPct}%` }}
        />
      </div>
      <p className="shrink-0 text-sm font-semibold tabular-nums text-slate-900">
        {totalLabel}
      </p>
    </div>
  )
}
