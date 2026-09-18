"use client"

import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { CheckCircle2 } from "lucide-react"
import { DURATION, EASE_OUT } from "@/lib/motion"
import { AnimatedFigure } from "./animated-figure"

interface SeasonalProgressBannerProps {
  actedCount: number
  totalCount: number
}

/** Celebratory today's-progress strip — appears once the analyst has published. */
export function SeasonalProgressBanner({
  actedCount,
  totalCount,
}: SeasonalProgressBannerProps) {
  const reduced = useReducedMotion()
  const show = actedCount > 0 && totalCount > 0
  const progressPct = Math.round((actedCount / totalCount) * 100)
  // A single SKU is under 1% — hold a visible sliver so the bar reads as started.
  const barWidth = `${Math.max(progressPct, 2)}%`

  const collapsed = reduced
    ? { opacity: 0 }
    : { opacity: 0, height: 0, marginTop: 0, y: -6 }

  return (
    <AnimatePresence initial={false}>
      {show ? (
        <motion.div
          key="progress"
          initial={collapsed}
          animate={
            reduced
              ? { opacity: 1 }
              : { opacity: 1, height: "auto", marginTop: 16, y: 0 }
          }
          exit={collapsed}
          transition={{ duration: DURATION.calm, ease: EASE_OUT }}
          className="overflow-hidden"
        >
          <motion.div
            initial={reduced ? false : { scale: 0.97 }}
            animate={{ scale: [0.97, 1.015, 1] }}
            transition={{
              duration: DURATION.draw,
              ease: EASE_OUT,
              delay: 0.18,
              times: [0, 0.55, 1],
            }}
            className="space-y-1.5 rounded-xl bg-success-50 px-3 py-2.5"
          >
            <div className="flex items-center justify-between gap-2 text-xs tabular-nums text-success-800">
              <span className="flex items-center gap-1.5">
                <motion.span
                  initial={reduced ? false : { scale: 0, rotate: -25 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 520,
                    damping: 16,
                    delay: 0.24,
                  }}
                  className="flex shrink-0 text-success-600"
                >
                  <CheckCircle2 className="size-3.5" aria-hidden />
                </motion.span>
                <span>
                  <AnimatedFigure
                    value={actedCount}
                    fractionDigits={0}
                    delay={0.3}
                    format={(v) => Math.round(v).toLocaleString()}
                    className="font-semibold"
                  />{" "}
                  of {totalCount.toLocaleString()} SKUs acted on today
                </span>
              </span>
              <span className="font-semibold">{progressPct}%</span>
            </div>

            <div
              className="h-1.5 w-full overflow-hidden rounded-full bg-success-200/80"
              role="progressbar"
              aria-valuenow={actedCount}
              aria-valuemin={0}
              aria-valuemax={totalCount}
              aria-label={`${actedCount} of ${totalCount} SKUs acted on today`}
            >
              <motion.div
                className="h-full rounded-full bg-success-600"
                initial={reduced ? false : { width: 0 }}
                animate={{ width: barWidth }}
                transition={{
                  duration: DURATION.draw,
                  ease: EASE_OUT,
                  delay: 0.34,
                }}
              />
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
