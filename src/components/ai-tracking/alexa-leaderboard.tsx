"use client"

import { Card, cn } from "@ciq-dev/ciq-design-system"
import { motion } from "framer-motion"
import { ArrowDownRight, ArrowUpRight, Minus } from "lucide-react"
import { DURATION, EASE_OUT } from "@/lib/motion"
import { leaderboardRows } from "./data"
import { PanelHeader } from "./shared"

function ChangeMark({ change }: { change: number | null }) {
  if (change == null) {
    return (
      <span className="inline-flex size-7 shrink-0 items-center justify-center rounded-full bg-slate-50 text-slate-400">
        <Minus className="size-3.5" aria-hidden />
      </span>
    )
  }

  const up = change > 0
  return (
    <span
      className={cn(
        "inline-flex size-7 shrink-0 items-center justify-center gap-0.5 rounded-full text-[11px] font-semibold tabular-nums",
        up ? "bg-success-100 text-success-700" : "bg-error-100 text-error-700",
      )}
    >
      {up ? (
        <ArrowUpRight className="size-3" aria-hidden />
      ) : (
        <ArrowDownRight className="size-3" aria-hidden />
      )}
      {Math.abs(change)}
    </span>
  )
}

export function AlexaLeaderboard() {
  return (
    <Card className="flex h-full min-w-0 flex-col overflow-hidden rounded-2xl border border-border-default bg-white !shadow-brand-soft">
      <div className="px-4 pt-5 pb-3">
        <PanelHeader
          title="Alexa AI top 10"
          description="Ranked by AI-shelf score. Change is vs. the previous period."
        />
      </div>

      <ol className="flex flex-col gap-0.5 px-2 pb-4">
        {leaderboardRows.map((row) => (
          <li
            key={row.id}
            className={cn(
              "grid grid-cols-[1.5rem_minmax(0,1fr)_2.5rem_2rem_1.75rem_1.75rem] items-center gap-1.5 rounded-xl px-2 py-1.5",
              row.isYou && "bg-brand-50",
            )}
          >
            <span
              className={cn(
                "grid size-6 shrink-0 place-items-center rounded-full text-[11px] font-semibold",
                row.isYou
                  ? "bg-brand-500 text-white"
                  : "bg-slate-100 text-slate-600",
              )}
            >
              {row.initials}
            </span>
            <p
              className={cn(
                "min-w-0 truncate text-sm",
                row.isYou ? "font-semibold text-fg-primary" : "text-fg-secondary",
              )}
            >
              {row.name}
            </p>
            <div className="h-1.5 w-full justify-self-stretch overflow-hidden rounded-full bg-slate-100">
              <motion.div
                className={cn(
                  "h-full rounded-full",
                  row.isYou ? "bg-brand-500" : "bg-slate-300",
                )}
                initial={false}
                animate={{ width: `${row.score}%` }}
                transition={{ duration: DURATION.draw, ease: EASE_OUT }}
              />
            </div>
            <p className="text-right text-sm font-medium tabular-nums text-fg-primary">
              {row.score}
            </p>
            <p className="text-right text-xs font-medium tabular-nums text-slate-400">
              #{row.rank}
            </p>
            <div className="flex justify-end">
              <ChangeMark change={row.change} />
            </div>
          </li>
        ))}
      </ol>
    </Card>
  )
}
