"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { AlertTriangle, ArrowRight } from "lucide-react"
import { DURATION, EASE_OUT } from "@/lib/motion"
import { cn } from "@/lib/utils"
import { AnimatedFigure } from "./animated-figure"
import { seasonalChecklist } from "./analyst-tasks-data"

/** Up-next seasonal moment — primary card in the analyst task strip. */
export function SeasonalChecklistCard({ className }: { className?: string }) {
  const event = seasonalChecklist
  const remaining = Math.max(event.skuCount - event.checkedCount, 0)
  const started = event.checkedCount > 0
  const progressPct = Math.round((event.checkedCount / event.skuCount) * 100)
  const valueAmount = Number(event.valueLabel.replace(/[^0-9.]/g, "")) || 0

  return (
    <motion.div
      whileHover={{ y: -2 }}
      transition={{ duration: DURATION.quick, ease: EASE_OUT }}
      className={cn(
        "group relative flex h-full w-full flex-col overflow-hidden rounded-2xl",
        "bg-brand-25 ring-1 ring-brand-200/60 shadow-pane-lg",
        "transition-shadow duration-200 ease-out hover:shadow-pane-brand",
        className,
      )}
    >
      <div className="flex flex-1 flex-col p-5">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <span className="inline-flex items-center rounded-full bg-brand-100 px-2 py-0.5 text-[10px] font-semibold tracking-widest text-brand-700 uppercase">
            {event.eyebrow}
          </span>
          <span className="inline-flex items-center gap-1 rounded-full bg-warning-100 px-2 py-0.5 text-[10px] font-semibold tracking-widest text-warning-800 uppercase">
            <AlertTriangle className="size-2.5 shrink-0" aria-hidden />
            {event.daysToAct} days to act
          </span>
        </div>

        <p className="mt-4 font-sans text-4xl font-semibold tabular-nums tracking-[-0.04em] text-slate-950">
          <AnimatedFigure
            value={valueAmount}
            fractionDigits={0}
            delay={0.28}
            format={(v) => `$${Math.round(v)}K`}
          />
        </p>

        <div className="mt-3 space-y-1">
          <p className="text-xl font-semibold leading-snug tracking-tight text-slate-950">
            {event.name}
          </p>
          <p className="text-sm leading-snug text-slate-500">{event.subtitle}</p>
        </div>

        <div className="mt-3.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate-500">
          <span className="font-semibold tabular-nums text-slate-700">
            {event.skuCount.toLocaleString()} SKUs
          </span>
          <Dot />
          <span>Publish by {event.publishBy}</span>
          <Dot />
          <span>Live {event.eventDate}</span>
        </div>

        {started ? (
          <div className="mt-4 space-y-1.5">
            <div className="flex justify-between gap-2 text-xs tabular-nums text-slate-500">
              <span>
                {event.checkedCount} of {event.skuCount} checked
              </span>
              <span className="font-semibold text-slate-700">{progressPct}%</span>
            </div>
            <div
              className="h-1 w-full overflow-hidden rounded-full bg-brand-100"
              aria-hidden
            >
              <motion.div
                className="h-full rounded-full bg-brand-500"
                initial={{ width: 0 }}
                animate={{ width: `${progressPct}%` }}
                transition={{ duration: DURATION.calm, ease: EASE_OUT, delay: 0.4 }}
              />
            </div>
          </div>
        ) : null}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-brand-200/50 bg-white/50 px-5 py-3.5">
        <p className="max-w-md text-xs leading-relaxed text-slate-500">
          {event.goesLiveNote}
        </p>
        <Link
          href={`/workbench?moment=${event.momentId}`}
          className={cn(
            "inline-flex shrink-0 items-center gap-1.5 rounded-lg bg-brand-700 px-3.5 py-2",
            "text-sm font-semibold text-white shadow-sm",
            "transition-colors hover:bg-brand-800",
            "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-700",
          )}
        >
          {started
            ? `Continue — ${remaining.toLocaleString()} left`
            : `Review ${event.skuCount.toLocaleString()} SKUs`}
          <ArrowRight className="size-3.5" aria-hidden />
        </Link>
      </div>
    </motion.div>
  )
}

function Dot() {
  return (
    <span className="text-slate-300" aria-hidden>
      ·
    </span>
  )
}
