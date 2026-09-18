"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { analystTaskSummary } from "./analyst-tasks-data"

/** Review queue counters — mirrors homepage SecondaryStatCard layout. */
export function AnalystQueueStats({ className }: { className?: string }) {
  const tasks = analystTaskSummary

  return (
    <div className={cn("flex h-full flex-col gap-3", className)}>
      <QueueStatCard
        label={tasks.openLabel}
        value={tasks.openCount}
        pill={tasks.openPrimary}
        pillTone="risk"
        footnote={tasks.openSecondary}
        href={tasks.openHref}
      />
      <QueueStatCard
        label={tasks.closedLabel}
        value={tasks.closedCount}
        pill={tasks.closedPrimary}
        pillTone="positive"
        footnote={tasks.closedSecondary}
        href={tasks.closedHref}
      />
    </div>
  )
}

function QueueStatCard({
  label,
  value,
  pill,
  pillTone,
  footnote,
  href,
}: {
  label: string
  value: number
  pill: string
  pillTone: "risk" | "positive"
  footnote: string
  href: string
}) {
  return (
    <div
      className={cn(
        "relative flex flex-1 flex-col overflow-hidden rounded-2xl bg-white/70 shadow-pane ring-1 ring-slate-900/5 backdrop-blur-md",
        "transition-shadow duration-200 hover:shadow-pane-hover",
      )}
    >
      <div className="relative flex flex-1 flex-col justify-center px-5 py-4 pr-6">
        <p className="text-sm font-semibold text-slate-700">{label}</p>

        <div className="mt-1.5 flex flex-wrap items-baseline gap-2">
          <p className="font-sans text-2xl font-semibold tracking-tight text-slate-900 tabular-nums">
            {value}
          </p>
          <p
            className={cn(
              "rounded-full px-2 py-0.5 text-xs font-semibold tabular-nums",
              pillTone === "risk"
                ? "bg-error-50 text-error-700"
                : "bg-teal-50 text-teal-700",
            )}
          >
            {pill}
          </p>
        </div>

        <p className="mt-2 max-w-[85%] text-xs leading-snug text-slate-500">
          {footnote}
        </p>

        <Link
          href={href}
          className="group/link mt-3 inline-flex items-center gap-1 text-sm font-semibold text-brand-700 underline-offset-2 transition-colors hover:text-brand-900 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
        >
          Review {value.toLocaleString()} SKUs
          <ArrowRight
            className="size-3.5 transition-transform group-hover/link:translate-x-0.5"
            aria-hidden
          />
        </Link>
      </div>
    </div>
  )
}
