import type { SecondaryStat } from "./types"

interface SecondaryStatsProps {
  stats: SecondaryStat[]
}

const POSITIVE_DELTA_IDS = new Set(["changes-approved", "ai-share"])

export function SecondaryStats({ stats }: SecondaryStatsProps) {
  return (
    <div
      aria-label="Key performance metrics"
      className="grid grid-cols-2 overflow-hidden rounded-2xl border border-border-default bg-surface shadow-brand-soft sm:grid-cols-4"
    >
      {stats.map((stat, index) => {
        const isPositive = POSITIVE_DELTA_IDS.has(stat.id)
        return (
          <div
            key={stat.id}
            className={`flex flex-col gap-2 px-5 py-5 ${
              index > 0
                ? "border-t border-slate-100 sm:border-t-0 sm:border-l sm:border-slate-100"
                : ""
            }`}
          >
            <p className="text-xs text-fg-tertiary">{stat.label}</p>
            <div className="flex items-baseline gap-2">
              <p className="font-sans text-2xl font-semibold tracking-tight text-fg-primary tabular-nums">
                {stat.value}
              </p>
              {stat.delta ? (
                <p
                  className={
                    isPositive
                      ? "text-sm font-medium text-success-600"
                      : "text-sm font-medium text-fg-secondary"
                  }
                >
                  {stat.delta}
                </p>
              ) : null}
            </div>
          </div>
        )
      })}
    </div>
  )
}
