"use client"

import { useEffect, type ReactNode } from "react"
import { motion, useAnimationControls } from "framer-motion"
import { cn } from "@ciq-dev/ciq-design-system"
import { DURATION, EASE_OUT, EASE_SWAP, swapTransition } from "@/lib/motion"
import {
  CompositionBarFrame,
  CompositionBarSegment,
  CompositionBarTrack,
} from "./composition-bar"
import type { OpportunityStatusKind, OpportunityStatusSegment } from "./types"

export interface StatusSegmentLayout {
  segment: OpportunityStatusSegment
  share: number
  /** Midpoint of the segment along the track, 0–100 */
  mid: number
}

/**
 * One marker for the whole track. It slides to whichever segment is hovered
 * and returns to the captured position on release, so the reading never
 * jumps from one place to another.
 */
function BarMarker({
  leftPct,
  label,
  emphasis,
  pulse,
}: {
  leftPct: number
  label: ReactNode
  emphasis: boolean
  /** Pop once, as the figure inside counts to its new value. */
  pulse?: boolean
}) {
  // Driven imperatively rather than by a variant: this pill sits inside the
  // meter's variant tree, where declarative child animations get swallowed.
  const pop = useAnimationControls()

  useEffect(() => {
    if (!pulse) return
    void pop.start({
      scale: [1, 1.18, 1],
      transition: { duration: 0.6, ease: EASE_OUT, times: [0, 0.35, 1], delay: 0.1 },
    })
  }, [pulse, pop])

  return (
    <motion.div
      className={cn(
        "pointer-events-none absolute top-0 flex -translate-x-1/2 flex-col items-center",
        emphasis ? "z-20" : "z-10",
      )}
      initial={{ opacity: 0, left: `${leftPct}%` }}
      animate={{ opacity: 1, left: `${leftPct}%` }}
      transition={{
        left: swapTransition,
        opacity: { duration: DURATION.base, ease: EASE_SWAP, delay: 0.3 },
      }}
    >
      <motion.span
        className={cn(
          "whitespace-nowrap rounded-full px-2.5 py-1 text-[11px] font-semibold tabular-nums text-white shadow-sm transition-colors duration-200",
          emphasis ? "bg-slate-900" : "bg-slate-700",
        )}
        animate={pop}
      >
        {label}
      </motion.span>
      <span
        className={cn(
          "h-2 w-px transition-colors duration-200",
          emphasis ? "bg-slate-900" : "bg-slate-700",
        )}
        aria-hidden
      />
    </motion.div>
  )
}

/** Vertical rule + knob dropped onto the track at a given position. */
function TrackNeedle({
  leftPct,
  tone,
  faded,
}: {
  leftPct: number
  tone: string
  faded?: boolean
}) {
  return (
    <motion.div
      className={cn(
        "pointer-events-none absolute inset-y-0 w-0.5 -translate-x-1/2 rounded-full",
        tone,
        faded ? "z-10" : "z-20",
      )}
      style={{ left: `${leftPct}%` }}
      initial={{ opacity: 0 }}
      animate={{ opacity: faded ? 0.25 : 1 }}
      transition={{ duration: DURATION.base, ease: EASE_SWAP, delay: faded ? 0 : 0.3 }}
      aria-hidden
    >
      <span
        className={cn(
          "absolute top-1/2 left-1/2 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full ring-2 ring-white",
          tone,
        )}
      />
    </motion.div>
  )
}

interface OpportunityStatusTrackProps {
  layouts: StatusSegmentLayout[]
  segmentFill: Record<OpportunityStatusKind, string>
  hoveredId: OpportunityStatusKind | null
  onHoverChange: (id: OpportunityStatusKind | null) => void
  /** Needle position along the track, 0–100 */
  markerPct: number
  markerLabel: ReactNode
  ariaLabel: string
  /** Right-hand annotation — the "captured more revenue" note. */
  note?: ReactNode
  /** Pop the readout — set while a fresh capture is being called out. */
  markerPulse?: boolean
  /** Omit the marker pill so the track can sit under a headline row. */
  flush?: boolean
}

export function OpportunityStatusTrack({
  layouts,
  segmentFill,
  hoveredId,
  onHoverChange,
  markerPct,
  markerLabel,
  ariaLabel,
  note,
  markerPulse: pulse,
  flush = false,
}: OpportunityStatusTrackProps) {
  const markerLeft = Math.min(Math.max(markerPct, 0), 100)
  const hovered = layouts.find((s) => s.segment.id === hoveredId)

  return (
    <CompositionBarFrame
      flush={flush}
      annotation={
        <BarMarker
          leftPct={hovered ? hovered.mid : markerLeft}
          label={
            hovered
              ? `${hovered.segment.label} · ${hovered.segment.amountLabel}`
              : markerLabel
          }
          emphasis={Boolean(hovered)}
          // Hovering swaps the label for the segment readout — popping that
          // would read as a hover effect rather than a change.
          pulse={pulse && !hovered}
        />
      }
      note={note}
    >
      <div className="relative">
        <CompositionBarTrack ariaLabel={ariaLabel}>
          {layouts.map(({ segment, share }, index) => (
            <CompositionBarSegment
              key={segment.id}
              widthPct={share}
              className={segmentFill[segment.id]}
              title={`${segment.label} ${segment.amountLabel}`}
              isFirst={index === 0}
              isLast={index === layouts.length - 1}
              dimmed={hoveredId != null && hoveredId !== segment.id}
              enterDelay={index * 0.07}
              onHoverChange={(active) =>
                onHoverChange(active ? segment.id : null)
              }
            />
          ))}
        </CompositionBarTrack>

        {/* One needle only. On hover the segment brightens and its siblings
            dim, so a second needle would just add noise. */}
        <TrackNeedle
          leftPct={markerLeft}
          tone="bg-slate-900"
          faded={hoveredId != null}
        />
      </div>
    </CompositionBarFrame>
  )
}
