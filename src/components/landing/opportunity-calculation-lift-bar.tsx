"use client"

interface OpportunityCalculationLiftBarProps {
  retailReadinessPct: number
  amazonOptimizationPct: number
  seasonalPct: number
}

export function OpportunityCalculationLiftBar({
  retailReadinessPct,
  amazonOptimizationPct,
  seasonalPct,
}: OpportunityCalculationLiftBarProps) {
  return (
    <div
      className="flex h-2 w-full overflow-hidden rounded-full bg-slate-100"
      role="img"
      aria-label="Retail readiness, Amazon optimization, and seasonal opportunity"
    >
      <div
        className="h-full shrink-0 bg-data-1"
        style={{ width: `${retailReadinessPct}%` }}
      />
      <div
        className="h-full shrink-0 bg-data-2"
        style={{ width: `${amazonOptimizationPct}%` }}
      />
      <div
        className="h-full shrink-0 bg-data-3"
        style={{ width: `${seasonalPct}%` }}
      />
    </div>
  )
}
