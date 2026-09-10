"use client"

interface OpportunityProgressProps {
  identifiedMillions: number
  realizedMillions: number
  pct: number
}

export function OpportunityProgress({
  identifiedMillions,
  realizedMillions,
  pct,
}: OpportunityProgressProps) {
  return (
    <div className="relative h-10">
      <div
        className="absolute inset-y-0 left-0 right-12"
        role="progressbar"
        aria-valuenow={pct}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`${pct}% of identified opportunity realized ($${realizedMillions.toFixed(2)}M of $${identifiedMillions.toFixed(1)}M)`}
      >
        <div className="absolute inset-x-0 top-1/2 h-2.5 -translate-y-1/2 overflow-hidden rounded-full bg-slate-100">
          <div
            className="h-full rounded-full bg-linear-to-r from-violet-500 via-sky-500 to-teal-500"
            style={{ width: `${pct}%` }}
          />
        </div>

        <div
          className="absolute top-1/2 z-10 flex h-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-brand-800 px-2.5 text-[11px] font-semibold text-white tabular-nums ring-6 ring-brand-100"
          style={{ left: `${pct}%` }}
          aria-hidden
        >
          ${realizedMillions.toFixed(2)}M/{pct}%
        </div>
      </div>

      <div
        className="absolute right-0 top-1/2 -translate-y-1/2 text-xs font-semibold tabular-nums text-fg-secondary"
        aria-hidden
      >
        ${identifiedMillions.toFixed(1)}M
      </div>
    </div>
  )
}
