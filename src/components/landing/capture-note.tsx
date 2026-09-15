"use client"

import { AnimatePresence, motion, type Variants } from "framer-motion"
import { TrendingUp } from "lucide-react"
import { cn } from "@ciq-dev/ciq-design-system"
import { DURATION, EASE_OUT, EASE_SWAP } from "@/lib/motion"
import { formatCaptureDelta } from "./apply-capture"
import { CaptureConfetti } from "./capture-confetti"

/**
 * Rises into place behind the bar, then drops back out once the numbers have
 * had their moment. Variant form so each direction carries its own timing —
 * this sits inside the meter's variant tree, where object-form transitions
 * never get applied.
 */
const noteMotion: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.base, ease: EASE_OUT, delay: 0.25 },
  },
  exit: {
    opacity: 0,
    y: 8,
    transition: { duration: DURATION.base, ease: EASE_SWAP },
  },
}

interface CaptureNoteProps {
  /** Dollars added by the publish being revealed; 0 on a later visit. */
  deltaUsd: number
  skuCount: number
  show: boolean
  /** Step aside while a segment is hovered — the marker pill slides under here. */
  dimmed?: boolean
}

export function CaptureNote({ deltaUsd, skuCount, show, dimmed }: CaptureNoteProps) {
  return (
    <AnimatePresence>
      {show ? (
        <motion.p
          className={cn(
            "absolute top-0 right-0 rounded-full bg-success-100 px-2.5 py-1 text-[11px] font-semibold whitespace-nowrap text-success-700 transition-opacity duration-200",
            dimmed && "opacity-0",
          )}
          variants={noteMotion}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {/* Ahead of the label in the DOM, and the label is positioned, so
              particles read as coming out from behind the text. */}
          <CaptureConfetti />
          <span className="relative flex items-center gap-1.5">
            <TrendingUp className="size-3 shrink-0" aria-hidden />
            You have captured more revenue
            {deltaUsd > 0 ? (
              <span className="tabular-nums">
                {formatCaptureDelta(deltaUsd)}
                {skuCount > 0 ? ` · ${skuCount} SKU${skuCount > 1 ? "s" : ""}` : ""}
              </span>
            ) : null}
          </span>
        </motion.p>
      ) : null}
    </AnimatePresence>
  )
}
