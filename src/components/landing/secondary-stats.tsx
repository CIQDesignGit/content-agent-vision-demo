import type { SecondaryStat } from "./types"

interface SecondaryStatsProps {
  stats: SecondaryStat[]
  /** Soft sub-cards inside a parent card vs standalone bordered cards */
  variant?: "cards" | "embedded"
}

const POSITIVE_DELTA_IDS = new Set(["actions", "ai-rank"])

function StatValue({
  stat,
  isPositive,
}: {
  stat: SecondaryStat
  isPositive: boolean
}) {
  return (
    <div className="flex shrink-0 items-baseline gap-1.5">
      <p className="font-sans text-xl font-semibold tracking-tight text-fg-primary tabular-nums">
        {stat.value}
      </p>
      {stat.delta ? (
        <p
          className={
            isPositive
              ? "text-xs font-medium text-emerald-600"
              : "type-caption text-fg-secondary"
          }
        >
          {stat.delta}
        </p>
      ) : null}
    </div>
  )
}

export function SecondaryStats({
  stats,
  variant = "cards",
}: SecondaryStatsProps) {
  if (variant === "embedded") {
    return (
      <div
        aria-label="Auxiliary metrics"
        className="grid grid-cols-3 gap-3"
      >
        {stats.map((stat) => {
          const isPositive = POSITIVE_DELTA_IDS.has(stat.id)
          return (
            <div
              key={stat.id}
              className="flex min-w-0 flex-col gap-1.5 rounded-xl bg-slate-50 px-4 py-3"
            >
              <p className="min-w-0 truncate uppercase tracking-wider text-[11px] font-medium text-fg-tertiary">
                {stat.label}
              </p>
              <StatValue stat={stat} isPositive={isPositive} />
            </div>
          )
        })}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-3 gap-3">
      {stats.map((stat) => {
        const isPositive = POSITIVE_DELTA_IDS.has(stat.id)
        return (
          <div
            key={stat.id}
            className="flex items-center justify-between gap-3 rounded-2xl border border-border-default bg-surface px-4 py-3"
          >
            <p className="min-w-0 truncate text-xs font-medium text-fg-secondary">
              {stat.label}
            </p>
            <StatValue stat={stat} isPositive={isPositive} />
          </div>
        )
      })}
    </div>
  )
}
