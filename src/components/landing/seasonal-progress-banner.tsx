"use client"

import { useEffect, useState } from "react"
import {
  AnimatePresence,
  motion,
  useAnimationControls,
  useReducedMotion,
} from "framer-motion"
import { CheckCircle2 } from "lucide-react"
import { DURATION, EASE_OUT } from "@/lib/motion"
import { AnimatedFigure } from "./animated-figure"
import { SeasonalProgressConfetti } from "./seasonal-progress-confetti"

interface SeasonalProgressBannerProps {
  actedCount: number
  totalCount: number
}

// Survives remounts when the analyst returns from workbench with a higher count.
let lastCelebratedCount = 0

/**
 * Today's-progress strip for the seasonal card.
 * First appear: slides up out of the footer. Later bumps: number roller + confetti.
 */
export function SeasonalProgressBanner({
  actedCount,
  totalCount,
}: SeasonalProgressBannerProps) {
  const reduced = useReducedMotion()
  const show = actedCount > 0 && totalCount > 0
  const progressPct = Math.round((actedCount / totalCount) * 100)
  const barWidth = `${Math.max(progressPct, 2)}%`
  const bumpControls = useAnimationControls()
  const [burstKey, setBurstKey] = useState(0)

  useEffect(() => {
    if (!show) return

    const previous = lastCelebratedCount
    const isFirstAppear = previous === 0
    lastCelebratedCount = actedCount

    if (isFirstAppear || actedCount <= previous || reduced) return

    // Wait a beat so the strip finishes sliding up before the celebration.
    const timer = window.setTimeout(() => {
      void bumpControls.start({
        scale: [1, 1.03, 1],
        transition: { duration: DURATION.calm, ease: EASE_OUT },
      })
      setBurstKey((n) => n + 1)
    }, 420)

    return () => window.clearTimeout(timer)
  }, [actedCount, bumpControls, reduced, show])

  const collapsed = reduced
    ? { opacity: 0 }
    : { opacity: 0, height: 0, y: 28 }

  return (
    <AnimatePresence initial={false}>
      {show ? (
        <motion.div
          key="progress"
          initial={collapsed}
          animate={reduced ? { opacity: 1 } : { opacity: 1, height: "auto", y: 0 }}
          exit={collapsed}
          transition={{ duration: DURATION.draw, ease: EASE_OUT }}
          className="relative z-10 overflow-hidden"
        >
          <motion.div
            initial={reduced ? false : { scale: 0.97, y: 14 }}
            animate={{ scale: 1, y: 0 }}
            transition={{ duration: DURATION.draw, ease: EASE_OUT, delay: 0.04 }}
            className="mx-5 mb-3"
          >
            <motion.div
              animate={bumpControls}
              className="relative space-y-1.5 rounded-xl bg-success-50 px-3 py-2.5 ring-1 ring-success-200/60"
            >
              <SeasonalProgressConfetti burstKey={burstKey} />

              <div className="relative flex items-center justify-between gap-2 text-xs tabular-nums text-success-800">
                <span className="flex items-center gap-1.5">
                  <motion.span
                    initial={reduced ? false : { scale: 0, rotate: -25 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{
                      type: "spring",
                      stiffness: 520,
                      damping: 16,
                      delay: 0.2,
                    }}
                    className="flex shrink-0 text-success-600"
                  >
                    <CheckCircle2 className="size-3.5" aria-hidden />
                  </motion.span>
                  <span>
                    <AnimatedFigure
                      value={actedCount}
                      fractionDigits={0}
                      delay={0.28}
                      format={(v) => Math.round(v).toLocaleString()}
                      className="font-semibold"
                    />{" "}
                    of {totalCount.toLocaleString()} SKUs acted on today
                  </span>
                </span>
                <span className="font-semibold">
                  <AnimatedFigure
                    value={progressPct}
                    fractionDigits={0}
                    delay={0.34}
                    format={(v) => `${Math.round(v)}%`}
                  />
                </span>
              </div>

              <div
                className="relative h-1.5 w-full overflow-hidden rounded-full bg-success-200/80"
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
                    delay: 0.28,
                  }}
                />
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
