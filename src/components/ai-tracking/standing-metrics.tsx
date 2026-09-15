import { Card } from "@ciq-dev/ciq-design-system"
import { standingMetrics } from "./data"
import { DeltaChip } from "./shared"

export function StandingMetrics() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      {standingMetrics.map((metric) => (
        <Card
          key={metric.id}
          className="overflow-hidden rounded-2xl border border-border-default bg-surface !shadow-brand-soft"
        >
          <div className="flex flex-col gap-2 px-5 pb-4 pt-5">
            <p className="text-sm font-medium text-fg-secondary">{metric.label}</p>
            <p className="font-sans text-3xl font-semibold tracking-tight tabular-nums text-fg-primary">
              {metric.value}
            </p>
          </div>
          <div className="flex flex-col gap-2 border-t border-slate-100 px-5 py-3">
            <p className="text-sm text-fg-tertiary">{metric.support}</p>
            <DeltaChip tone={metric.deltaTone} label={metric.deltaLabel} />
          </div>
        </Card>
      ))}
    </div>
  )
}
