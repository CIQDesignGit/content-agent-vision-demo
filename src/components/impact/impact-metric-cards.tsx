import { Card, cn } from "@ciq-dev/ciq-design-system"
import type { ImpactMetricCard } from "./types"

interface ImpactMetricCardsProps {
  metrics: ImpactMetricCard[]
}

export function ImpactMetricCards({ metrics }: ImpactMetricCardsProps) {
  return (
    <div className="grid grid-cols-4 gap-4">
      {metrics.map((metric) => (
        <Card
          key={metric.id}
          className="overflow-hidden rounded-2xl border border-border-default bg-surface !shadow-brand-soft"
        >
          <div className="flex flex-col gap-2 px-5 pb-4 pt-5">
            <p className="text-sm font-medium text-fg-secondary">
              {metric.label}
            </p>
            <p
              className={cn(
                "font-sans text-3xl font-semibold tracking-tight tabular-nums",
                metric.valueTone === "success"
                  ? "text-success-700"
                  : "text-fg-primary",
              )}
            >
              {metric.value}
            </p>
          </div>
          <div className="border-t border-slate-100 px-5 py-3">
            <p className="text-sm text-fg-tertiary">
              {metric.supportLead ? (
                <span className="font-medium text-fg-primary">
                  {metric.supportLead}{" "}
                </span>
              ) : null}
              {metric.support}
            </p>
          </div>
        </Card>
      ))}
    </div>
  )
}
