import { ArrowUpRight } from "lucide-react"
import { Card, CardContent } from "@ciq-dev/ciq-design-system"
import type { SecondaryStat } from "./types"

interface SecondaryStatsProps {
  stats: SecondaryStat[]
  /** Flat row inside a parent card vs standalone cards */
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
      <p className="type-title tracking-tight text-fg-secondary tabular-nums">
        {stat.value}
      </p>
      {stat.delta ? (
        <p
          className={
            isPositive
              ? "flex items-center gap-0.5 text-xs font-medium text-feedback-success"
              : "flex items-center gap-0.5 type-caption text-fg-secondary"
          }
        >
          {isPositive ? (
            <ArrowUpRight className="size-3" aria-hidden />
          ) : null}
          <span>{stat.delta}</span>
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
        className="grid grid-cols-3 divide-x divide-border-default border-t border-border-default py-4"
      >
        {stats.map((stat) => {
          const isPositive = POSITIVE_DELTA_IDS.has(stat.id)
          return (
            <div
              key={stat.id}
              className="flex min-w-0 flex-col gap-1 px-6"
            >
              <p className="min-w-0 truncate text-xs font-medium text-fg-tertiary">
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
          <Card
            key={stat.id}
            className="rounded-2xl border-border-default bg-surface shadow-none"
          >
            <CardContent className="flex items-center justify-between gap-3 px-4 py-3">
              <p className="min-w-0 truncate text-xs font-medium text-fg-secondary">
                {stat.label}
              </p>
              <StatValue stat={stat} isPositive={isPositive} />
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
