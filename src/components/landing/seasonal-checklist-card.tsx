"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { AlertTriangle, ArrowRight } from "lucide-react"
import { useProfile, withProfileParam } from "@/components/home/profile-context"
import { DURATION, EASE_OUT } from "@/lib/motion"
import { useQueueActedCount } from "@/lib/queue-progress"
import { cn } from "@/lib/utils"
import { AnimatedFigure } from "./animated-figure"
import { seasonalChecklist } from "./analyst-tasks-data"
import { formatStreamValue } from "./opportunity-stream-format"
import { reviewSkuCtaClassName } from "./review-sku-cta"
import { SeasonalProgressBanner } from "./seasonal-progress-banner"

function valueLabelToThousands(label: string): number {
  const millions = label.match(/\$([\d.]+)\s*M/i)
  if (millions) return parseFloat(millions[1]) * 1000
  const thousands = label.match(/\$([\d.]+)\s*K/i)
  if (thousands) return parseFloat(thousands[1])
  return 0
}

/**
 * Up-next seasonal moment — primary card in the analyst task strip.
 * Hierarchy: value + event → urgency → support copy → meta → CTA.
 */
export function SeasonalChecklistCard({ className }: { className?: string }) {
  const { profileId } = useProfile()
  const event = seasonalChecklist
  const actedCount = useQueueActedCount(event.momentId)
  const remaining = Math.max(event.skuCount - actedCount, 0)
  const started = actedCount > 0
  const valueThousands = valueLabelToThousands(event.valueLabel)
  const reviewHref = withProfileParam(
    `/workbench?moment=${event.momentId}`,
    profileId,
  )

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
        className="pointer-events-none absolute inset-0 bg-linear-to-br from-brand-200/40 via-brand-50/25 to-brand-25 transition-opacity duration-300 group-hover:from-brand-200/50"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_95%_85%_at_8%_-25%,var(--color-brand-300)_0%,var(--color-brand-100)_40%,transparent_72%)] opacity-55"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_65%_55%_at_100%_0%,var(--color-brand-200)_0%,transparent_58%)] opacity-40"
      />

      <div className="relative z-10 flex flex-1 flex-col px-5 pt-5 pb-4">
        {/* Context row — eyebrow quiet, urgency is the only loud chip */}
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="text-[11px] font-semibold tracking-widest text-brand-700/80 uppercase">
            {event.eyebrow}
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-warning-100 px-2.5 py-1 text-[11px] font-semibold tracking-wide text-warning-800 uppercase">
            <AlertTriangle className="size-3 shrink-0" aria-hidden />
            {event.daysToAct} days to act
          </span>
        </div>

        {/* Primary block — value dominates, event name sits under it */}
        <div className="mt-5">
          <p className="font-sans text-5xl font-semibold tabular-nums leading-none tracking-[-0.04em] text-slate-950">
            <AnimatedFigure
              value={valueThousands}
              fractionDigits={0}
              delay={0.28}
              format={formatStreamValue}
            />
          </p>
          <p className="mt-2 text-lg font-semibold tracking-tight text-slate-900">
            {event.name}
          </p>
        </div>

        {/* Secondary support — one sentence, then quiet facts */}
        <p className="mt-4 max-w-lg text-sm leading-relaxed text-slate-600">
          {event.subtitle}
        </p>
        <p className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate-500">
          <span className="font-semibold tabular-nums text-slate-700">
            {event.skuCount.toLocaleString()} SKUs
          </span>
          <Dot />
          <span>Publish by {event.publishBy}</span>
          <Dot />
          <span>Live {event.eventDate}</span>
          <Dot />
          <span>{event.fillTime}</span>
        </p>
      </div>

      <SeasonalProgressBanner
        actedCount={actedCount}
        totalCount={event.skuCount}
      />

      {/* Footer — note is tertiary; CTA is the action */}
      <div className="relative z-10 mt-auto flex flex-wrap items-center justify-between gap-3 border-t border-brand-100/80 bg-white/70 px-5 py-3.5">
        <p className="min-w-0 flex-1 text-xs leading-relaxed text-slate-500">
          {event.goesLiveNote}
        </p>
        <Link href={reviewHref} className={reviewSkuCtaClassName}>
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
    <span className="text-slate-300" aria-hidden>
      ·
    </span>
  )
}
