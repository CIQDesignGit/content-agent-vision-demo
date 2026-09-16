import { TrendingDown, TrendingUp } from "lucide-react"
import { cn } from "@/lib/utils"
import type { ImpactMetricCard } from "./types"

interface ImpactMetricCardsProps {
  metrics: ImpactMetricCard[]
}

function DeltaPill({ metric }: { metric: ImpactMetricCard }) {
  const down = metric.supportLeadTone === "down"
  const up = metric.supportLeadTone === "up"

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-semibold tabular-nums",
        down
          ? "bg-error-50 text-error-700"
          : up
            ? "bg-teal-50 text-teal-700"
            : "bg-slate-100 text-slate-600",
      )}
    >
      {down ? (
        <TrendingDown className="size-3" aria-hidden />
      ) : up ? (
        <TrendingUp className="size-3" aria-hidden />
      ) : null}
      {metric.supportLead}
    </span>
  )
}

export function ImpactMetricCard({ metric }: { metric: ImpactMetricCard }) {
  return (
    <div
      className="flex min-w-0 flex-col rounded-2xl bg-white/70 px-5 py-4 ring-1 ring-slate-900/5 shadow-pane backdrop-blur-md"
    >
      <p className="text-xs font-medium text-slate-500">{metric.label}</p>
      <div className="mt-2 flex flex-wrap items-baseline gap-2">
        <p
          className={cn(
            "font-sans text-2xl font-semibold tracking-tight tabular-nums",
            metric.valueTone === "success" ? "text-teal-700" : "text-slate-900",
          )}
        >
          {metric.value}
        </p>
        {metric.supportLead ? <DeltaPill metric={metric} /> : null}
      </div>
      <p className="mt-2.5 text-xs leading-snug text-slate-500">{metric.support}</p>
    </div>
  )
}

export function ImpactMetricCards({ metrics }: ImpactMetricCardsProps) {
  return (
    <div
      aria-label="Impact metrics"
      className="grid grid-cols-1 items-start gap-4 sm:grid-cols-2 lg:grid-cols-4"
    >
      {metrics.map((metric) => (
        <ImpactMetricCard key={metric.id} metric={metric} />
      ))}
    </div>
  )
}
