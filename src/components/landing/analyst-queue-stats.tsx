"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { DURATION, EASE_OUT, fadeRiseLand } from "@/lib/motion"
import { cn } from "@/lib/utils"
import { AnimatedFigure } from "./animated-figure"
import { analystTaskSummary } from "./analyst-tasks-data"
import { RevealGroup, RevealItem } from "./reveal"

/** Review queue counters — secondary to the seasonal up-next card. */
export function AnalystQueueStats({ className }: { className?: string }) {
  const tasks = analystTaskSummary

  return (
    <RevealGroup
      className={cn("flex h-full flex-col gap-3", className)}
      delay={0.06}
      stagger={0.1}
    >
      <RevealItem variants={fadeRiseLand} className="flex min-h-0 flex-1 flex-col">
        <QueueStatCard
          label={tasks.openLabel}
          value={tasks.openCount}
          pill={tasks.openPrimary}
          tone="risk"
          footnote={tasks.openSecondary}
          href={tasks.openHref}
          countDelay={0.42}
        />
      </RevealItem>
      <RevealItem variants={fadeRiseLand} className="flex min-h-0 flex-1 flex-col">
        <QueueStatCard
          label={tasks.closedLabel}
          value={tasks.closedCount}
          pill={tasks.closedPrimary}
          tone="positive"
          footnote={tasks.closedSecondary}
          href={tasks.closedHref}
          countDelay={0.54}
        />
      </RevealItem>
    </RevealGroup>
  )
}

function QueueStatCard({
  label,
  value,
  pill,
  tone,
  footnote,
  href,
  countDelay,
}: {
  label: string
  value: number
  pill: string
  tone: "risk" | "positive"
  footnote: string
  href: string
  countDelay: number
}) {
  const isRisk = tone === "risk"

  return (
    <motion.div
      whileHover={{ y: -1 }}
      transition={{ duration: DURATION.quick, ease: EASE_OUT }}
      className={cn(
        "relative flex h-full flex-1 flex-col overflow-hidden rounded-2xl",
        "bg-white/80 ring-1 backdrop-blur-md shadow-pane",
        "transition-shadow duration-200 hover:shadow-pane-hover",
        isRisk ? "ring-slate-900/8" : "ring-slate-900/5",
      )}
    >
      <div
        aria-hidden
        className={cn(
          "absolute inset-y-3 left-0 w-0.5 rounded-full",
          isRisk ? "bg-error-500" : "bg-teal-500",
        )}
      />

      <div className="relative flex flex-1 flex-col justify-center px-5 py-4 pl-5">
        <p className="text-xs font-semibold tracking-wide text-slate-500 uppercase">
          {label}
        </p>

        <div className="mt-2 flex flex-wrap items-baseline gap-2">
          <p className="font-sans text-3xl font-semibold tracking-tight text-slate-900 tabular-nums">
            <AnimatedFigure
              value={value}
              fractionDigits={0}
              delay={countDelay}
              format={(v) => Math.round(v).toLocaleString()}
            />
          </p>
          <p
            className={cn(
              "rounded-full px-2 py-0.5 text-xs font-semibold tabular-nums",
              isRisk
                ? "bg-error-50 text-error-700"
                : "bg-teal-50 text-teal-700",
            )}
          >
            {pill}
          </p>
        </div>

        <p className="mt-2 max-w-[90%] text-xs leading-snug text-slate-500">
          {footnote}
        </p>

        <Link
          href={href}
          className="group/link mt-3 inline-flex items-center gap-1 text-sm font-semibold text-brand-700 underline-offset-2 transition-colors hover:text-brand-900 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
        >
          Review {value.toLocaleString()} SKUs
          <ArrowRight
            className="size-3.5 transition-transform duration-150 group-hover/link:translate-x-0.5"
            aria-hidden
          />
        </Link>
      </div>
    </motion.div>
  )
}
