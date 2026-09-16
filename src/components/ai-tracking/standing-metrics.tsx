import { Card } from "@ciq-dev/ciq-design-system"
import { standingMetrics } from "./data"
import { DeltaChip, trackingCardClass } from "./shared"

export function StandingMetrics() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      {standingMetrics.map((metric) => (
        <Card
          key={metric.id}
          className={`${trackingCardClass} flex h-full flex-col p-0`}
        >
          <div className="flex flex-col gap-2 rounded-b-2xl border-b border-slate-100 bg-white px-5 pb-4 pt-5">
            <p className="text-xs font-medium uppercase tracking-wide text-brand-700">
              {metric.label}
            </p>
            <p className="font-sans text-4xl font-semibold tracking-tight tabular-nums text-slate-900">
              {metric.value}
            </p>
          </div>
          <div className="mt-auto flex min-h-[5.5rem] flex-1 flex-col justify-start gap-1.5 bg-slate-50 px-5 py-3">
            <p className="text-sm leading-snug text-slate-500">{metric.support}</p>
            <DeltaChip tone={metric.deltaTone} label={metric.deltaLabel} />
          </div>
        </Card>
      ))}
    </div>
  )
}
