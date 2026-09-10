import { ArrowUpRight } from "lucide-react"
import { Card, CardContent } from "@ciq-dev/ciq-design-system"
import type { SecondaryStat } from "./types"

interface SecondaryStatsProps {
  stats: SecondaryStat[]
}

export function SecondaryStats({ stats }: SecondaryStatsProps) {
  return (
    <div className="flex shrink-0 gap-3">
      {stats.map((stat) => (
        <Card
          key={stat.id}
          className="flex w-[132px] border-transparent bg-surface-muted shadow-none"
        >
          <CardContent className="flex flex-1 flex-col justify-between p-4">
            <p className="type-caption leading-snug text-fg-tertiary">{stat.label}</p>
            <div className="mt-3">
              <p className="type-title tracking-tight text-fg-primary tabular-nums">
                {stat.value}
              </p>
              {stat.delta ? (
                <p className="mt-1 flex items-center gap-0.5 type-caption text-fg-secondary">
                  {stat.id === "actions" ? (
                    <ArrowUpRight
                      className="size-3 text-feedback-success"
                      aria-hidden
                    />
                  ) : null}
                  <span
                    className={
                      stat.id === "actions"
                        ? "text-feedback-success"
                        : "text-fg-secondary"
                    }
                  >
                    {stat.delta}
                  </span>
                </p>
              ) : null}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
