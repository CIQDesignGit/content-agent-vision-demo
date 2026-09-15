"use client"

import { Card, cn } from "@ciq-dev/ciq-design-system"
import { motion } from "framer-motion"
import { ArrowDownRight, ArrowUpRight, Minus } from "lucide-react"
import { DURATION, EASE_OUT } from "@/lib/motion"
import { leaderboardRows } from "./data"

function ChangeMark({ change }: { change: number | null }) {
  if (change == null) {
    return (
      <span className="inline-flex size-7 items-center justify-center rounded-full bg-slate-50 text-slate-400">
        <Minus className="size-3.5" aria-hidden />
      </span>
    )
  }

  const up = change > 0
  return (
    <span
      className={cn(
        "inline-flex h-7 min-w-7 items-center justify-center gap-0.5 rounded-full px-1.5 text-[11px] font-semibold tabular-nums",
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
    <Card className="overflow-hidden rounded-2xl border border-border-default bg-surface !shadow-brand-soft">
      <div className="px-5 pt-5 pb-4">
        <h3 className="text-sm font-semibold text-fg-primary">Alexa AI top 10</h3>
        <p className="mt-1 text-xs text-fg-tertiary">
          Ranked by AI-shelf score across your tracked topics · change vs. previous
          period
        </p>
      </div>

      <ol className="flex flex-col gap-2 px-5 pb-5">
        {leaderboardRows.map((row) => (
          <li
            key={row.id}
            className={cn(
              "flex items-center gap-3 rounded-xl px-3 py-2",
              row.isYou && "ring-1 ring-brand-400",
            )}
          >
            <span
              className={cn(
                "grid size-7 shrink-0 place-items-center rounded-full text-xs font-semibold",
                row.isYou
                  ? "bg-brand-500 text-white"
                  : "bg-slate-100 text-slate-600",
              )}
            >
              {row.initials}
            </span>
            <p
              className={cn(
                "w-44 shrink-0 truncate text-sm",
                row.isYou ? "font-semibold text-fg-primary" : "text-fg-secondary",
              )}
            >
              {row.name}
            </p>
            <div className="h-2 min-w-0 flex-1 overflow-hidden rounded-full bg-slate-100">
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
            <p className="w-10 text-right text-sm font-medium tabular-nums text-fg-primary">
              {row.score}
            </p>
            <p className="w-8 text-right text-xs font-medium tabular-nums text-slate-400">
              #{row.rank}
            </p>
            <ChangeMark change={row.change} />
          </li>
        ))}
      </ol>
    </Card>
  )
}
