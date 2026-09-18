"use client"

import Link from "next/link"
import { AlertTriangle } from "lucide-react"
import { cn } from "@/lib/utils"
import { seasonalChecklist } from "./analyst-tasks-data"

/** Up-next seasonal moment — same card language as the stream bucket grid. */
export function SeasonalChecklistCard({ className }: { className?: string }) {
  const event = seasonalChecklist
  const remaining = Math.max(event.skuCount - event.checkedCount, 0)
  const started = event.checkedCount > 0
  const progressPct = Math.round((event.checkedCount / event.skuCount) * 100)

  return (
    <div
      className={cn(
        "group flex h-full w-full flex-col overflow-hidden rounded-2xl bg-brand-25 ring-1 ring-slate-900/6 !shadow-pane-lg",
        className,
      )}
    >
      <div className="flex flex-1 flex-col p-5 transition-colors duration-200 ease-out group-hover:bg-brand-50">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <span className="inline-flex items-center rounded-full bg-brand-100 px-2 py-0.5 text-[10px] font-semibold tracking-widest text-brand-700 uppercase">
            {event.eyebrow}
          </span>
          <span className="inline-flex items-center gap-1 rounded-full bg-warning-100 px-2 py-0.5 text-[10px] font-semibold tracking-widest text-warning-800 uppercase">
            <AlertTriangle className="size-2.5 shrink-0" aria-hidden />
            {event.daysToAct} days to act
          </span>
        </div>

        <p className="mt-3.5 font-sans text-3xl font-semibold tabular-nums tracking-[-0.04em] text-slate-950">
          {event.valueLabel}
        </p>

        <p className="mt-1.5 text-sm font-medium leading-snug text-slate-700">
          {event.name} — {event.subtitle}
        </p>

        <div className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1.5 text-xs">
          <span className="font-semibold tabular-nums text-slate-900">
            {event.skuCount.toLocaleString()} SKUs
          </span>
          <Dot />
          <span className="font-medium text-slate-500">
            Publish by {event.publishBy}
          </span>
          <Dot />
          <span className="font-medium text-slate-500">
            Live {event.eventDate}
          </span>
        </div>

        {started ? (
          <div className="mt-4 space-y-1.5">
            <div className="flex justify-between gap-2 text-xs tabular-nums text-slate-500">
              <span>
                {event.checkedCount} of {event.skuCount} checked
              </span>
              <span className="font-semibold text-slate-700">
                {progressPct}%
              </span>
            </div>
            <div
              className="h-1 w-full overflow-hidden rounded-full bg-brand-100"
              aria-hidden
            >
              <div
                className="h-full rounded-full bg-brand-500"
                style={{ width: `${progressPct}%` }}
              />
            </div>
          </div>
        ) : null}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 bg-brand-50/80 px-5 py-3 transition-colors duration-200 ease-out group-hover:bg-brand-100">
        <p className="text-sm leading-relaxed text-muted-foreground">
          {event.goesLiveNote}
        </p>
        <Link
          href={`/workbench?moment=${event.momentId}`}
          className="text-sm font-semibold text-brand-700 underline-offset-2 transition-colors hover:text-brand-900 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
        >
          {started
            ? `Continue — ${remaining.toLocaleString()} SKUs left`
            : `Review ${event.skuCount.toLocaleString()} SKUs`}
        </Link>
      </div>
    </div>
  )
}

function Dot() {
  return (
    <span className="text-slate-300" aria-hidden>
      ·
    </span>
  )
}
