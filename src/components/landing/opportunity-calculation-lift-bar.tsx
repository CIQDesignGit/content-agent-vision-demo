"use client"

interface OpportunityCalculationLiftBarProps {
  foundationalPct: number
  seasonalPct: number
}

export function OpportunityCalculationLiftBar({
  foundationalPct,
  seasonalPct,
}: OpportunityCalculationLiftBarProps) {
  return (
    <div
      className="flex h-2 w-full overflow-hidden rounded-full bg-slate-100"
      role="img"
      aria-label="Foundational and seasonal lift"
    >
      <div
        className="h-full shrink-0 bg-data-1"
        style={{ width: `${foundationalPct}%` }}
      />
      <div
        className="h-full shrink-0 bg-data-3"
        style={{ width: `${seasonalPct}%` }}
      />
    </div>
  )
}
