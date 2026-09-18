"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { AlertTriangle, ArrowRight } from "lucide-react"
import { DURATION, EASE_OUT } from "@/lib/motion"
import { useQueueActedCount } from "@/lib/queue-progress"
import { cn } from "@/lib/utils"
import { AnimatedFigure } from "./animated-figure"
import { seasonalChecklist } from "./analyst-tasks-data"
import { reviewSkuCtaClassName } from "./review-sku-cta"

/** Up-next seasonal moment — primary card in the analyst task strip. */
export function SeasonalChecklistCard({ className }: { className?: string }) {
  const event = seasonalChecklist
  const actedCount = useQueueActedCount(event.momentId)
  const remaining = Math.max(event.skuCount - actedCount, 0)
  const started = actedCount > 0
  const progressPct = Math.round((actedCount / event.skuCount) * 100)
  const valueAmount = Number(event.valueLabel.replace(/[^0-9.]/g, "")) || 0

  return (
    <motion.div
      whileHover={{ y: -2 }}
      transition={{ duration: DURATION.quick, ease: EASE_OUT }}
      className={cn(
        "group relative flex h-full w-full flex-col overflow-hidden rounded-2xl bg-brand-25",
        "ring-1 ring-brand-200/60 shadow-pane-lg",
        "transition-shadow duration-300 ease-out",
        "hover:shadow-[0_2px_8px_-4px_rgb(15_23_42/0.04),0_20px_56px_-20px_rgb(15_23_42/0.06),0_40px_96px_-40px_rgb(135_91_247/0.07)]",
        className,
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-linear-to-br from-brand-200/40 via-brand-50/25 to-brand-25 transition-[opacity] duration-300 group-hover:from-brand-200/50"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_95%_85%_at_8%_-25%,var(--color-brand-300)_0%,var(--color-brand-100)_40%,transparent_72%)] opacity-55"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_65%_55%_at_100%_0%,var(--color-brand-200)_0%,transparent_58%)] opacity-40"
      />

      <div className="relative z-10 flex flex-1 flex-col p-5">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <span className="inline-flex items-center rounded-full bg-brand-100/80 px-2.5 py-0.5 text-[10px] font-semibold tracking-widest text-brand-800 uppercase ring-1 ring-brand-200/50">
            {event.eyebrow}
          </span>
          <span className="inline-flex items-center gap-1 rounded-full bg-warning-100 px-2.5 py-0.5 text-[10px] font-semibold tracking-widest text-warning-800 uppercase ring-1 ring-warning-300/60">
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
          <p className="text-sm leading-snug text-slate-600">{event.subtitle}</p>
        </div>

        <div className="mt-3.5 flex flex-wrap items-center gap-x-2.5 gap-y-1.5 text-base text-slate-600">
          <span className="font-semibold tabular-nums text-slate-900">
            {event.skuCount.toLocaleString()} SKUs
          </span>
          <Dot />
          <span className="font-medium">Publish by {event.publishBy}</span>
          <Dot />
          <span className="font-medium">Live {event.eventDate}</span>
        </div>

        {started ? (
          <div className="mt-4 space-y-1.5 rounded-xl bg-success-50 px-3 py-2.5">
            <div className="flex justify-between gap-2 text-xs tabular-nums text-success-800">
              <span>
                <span className="font-semibold">
                  {actedCount.toLocaleString()}
                </span>{" "}
                of {event.skuCount.toLocaleString()} SKUs acted on today
              </span>
              <span className="font-semibold">{progressPct}%</span>
            </div>
            <div
              className="h-1.5 w-full overflow-hidden rounded-full bg-success-200/80"
              role="progressbar"
              aria-valuenow={actedCount}
              aria-valuemin={0}
              aria-valuemax={event.skuCount}
              aria-label={`${actedCount} of ${event.skuCount} SKUs acted on today`}
            >
              <motion.div
                className="h-full rounded-full bg-success-600"
                initial={{ width: 0 }}
                animate={{
                  width: `${Math.max(progressPct, actedCount > 0 ? 2 : 0)}%`,
                }}
                transition={{ duration: DURATION.calm, ease: EASE_OUT, delay: 0.4 }}
              />
            </div>
          </div>
        ) : null}
      </div>

      <div className="relative z-10 mt-auto flex flex-wrap items-center justify-between gap-3 rounded-b-2xl border-t border-brand-100/80 bg-white/70 px-5 py-3.5">
        <p className="max-w-md text-sm leading-relaxed text-slate-600">
          {event.goesLiveNote}
        </p>
        <Link
          href={`/workbench?moment=${event.momentId}`}
          className={reviewSkuCtaClassName}
        >
          {started
            ? `Continue — ${remaining.toLocaleString()} left`
            : `Review ${event.skuCount.toLocaleString()} SKUs`}
          <ArrowRight
            className="size-3.5 transition-transform group-hover:translate-x-0.5"
            aria-hidden
          />
        </Link>
      </div>
    </motion.div>
  )
}

function Dot() {
  return (
    <span className="text-brand-200" aria-hidden>
      ·
    </span>
  )
}
