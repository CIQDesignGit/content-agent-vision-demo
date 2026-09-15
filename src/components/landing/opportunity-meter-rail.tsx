"use client"

import { cn } from "@/lib/utils"
import { formatMillions } from "./apply-capture"

interface OpportunityMeterRailProps {
  identifiedMillions: number
  realizedMillions: number
  capturedPct: number
  className?: string
}

export function OpportunityMeterRail({
  identifiedMillions,
  realizedMillions,
  capturedPct,
  className,
}: OpportunityMeterRailProps) {
  const totalLabel = `$${identifiedMillions.toFixed(2)}M`
  const capturedLabel = formatMillions(realizedMillions)

  return (
    <div
      className={cn(
        "flex flex-col items-start gap-4 py-6 px-3 text-left",
        className,
      )}
    >
      <div className="w-full space-y-1">
        <p className="text-[10px] font-medium leading-snug text-slate-500">
          Total opportunity
        </p>
        <p className="font-sans text-xl font-semibold leading-none tracking-tight text-brand-950 tabular-nums">
          {totalLabel}
        </p>
      </div>

      <div className="w-full space-y-2 border-t border-slate-200/80 pt-3">
        <div
          className="h-1 w-full overflow-hidden rounded-full bg-slate-200"
          aria-hidden
        >
          <div
            className="h-full rounded-full bg-data-1"
            style={{ width: `${Math.min(100, capturedPct)}%` }}
          />
        </div>
        <div>
          <p className="text-[10px] font-medium text-slate-500">Captured</p>
          <p className="mt-0.5 text-sm font-semibold tabular-nums text-slate-900">
            {capturedLabel}
          </p>
          <p className="mt-0.5 text-[10px] tabular-nums text-slate-400">
            {capturedPct}% of total
          </p>
        </div>
      </div>
    </div>
  )
}
