"use client"

interface OpportunityProgressProps {
  identifiedMillions: number
  realizedMillions: number
  pct: number
}

function formatTick(millions: number): string {
  if (millions === 0) return "$0"
  const rounded = Math.round(millions * 20) / 20
  return `$${parseFloat(rounded.toFixed(2))}M`
}

export function OpportunityProgress({
  identifiedMillions,
  realizedMillions,
  pct,
}: OpportunityProgressProps) {
  const ticks = [0, 0.25, 0.5, 0.75, 1].map((t) => identifiedMillions * t)

  return (
    <div className="flex flex-col gap-2">
      <div className="relative h-4">
        {ticks.map((tick, i) => (
          <span
            key={tick}
            className="absolute top-0 -translate-x-1/2 type-caption text-fg-tertiary tabular-nums first:translate-x-0 last:-translate-x-full"
            style={{ left: `${(i / (ticks.length - 1)) * 100}%` }}
          >
            {formatTick(tick)}
          </span>
        ))}
      </div>

      <div className="relative h-10">
        <div
          className="absolute inset-x-0 top-1/2 h-2.5 -translate-y-1/2 overflow-hidden rounded-full bg-slate-100"
          role="progressbar"
          aria-valuenow={pct}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`${pct}% of identified opportunity realized ($${realizedMillions.toFixed(2)}M of $${identifiedMillions.toFixed(1)}M)`}
        >
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
    </div>
  )
}
