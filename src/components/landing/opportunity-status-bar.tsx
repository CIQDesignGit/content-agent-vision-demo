"use client"

import { useState } from "react"
import { TooltipProvider } from "@ciq-dev/ciq-design-system"
import { cn } from "@/lib/utils"
import { AnimatedFigure } from "./animated-figure"
import {
  displayStatusSegments,
  formatMillions,
  trackStatusSegments,
} from "./apply-capture"
import { CaptureNote } from "./capture-note"
import {
  CompositionBarLegendItem,
  CompositionBarScale,
} from "./composition-bar"
import { OpportunityStatusTrack } from "./opportunity-status-track"
import { SegmentInfo } from "./segment-info"
import type { CaptureReveal } from "./use-capture-reveal"
import type { OpportunityStatusKind, OpportunityStatusSegment } from "./types"

/** Chart blues only — captured deepest, open buckets step lighter (data-1 → data-3). */
const SEGMENT_FILL: Record<OpportunityStatusKind, string> = {
  captured: "bg-data-1",
  seasonal: "bg-data-2",
  pdp: "bg-data-3",
  opportunity: "bg-data-2",
  expired:
    "bg-[repeating-linear-gradient(-45deg,var(--color-slate-300),var(--color-slate-300)_1.5px,var(--color-slate-100),var(--color-slate-100)_5px)]",
}

const DOT_FILL: Record<OpportunityStatusKind, string> = {
  captured: "bg-data-1",
  seasonal: "bg-data-2",
  pdp: "bg-data-3",
  opportunity: "bg-data-2",
  expired:
    "bg-[repeating-linear-gradient(-45deg,var(--color-slate-400),var(--color-slate-400)_1px,var(--color-slate-200),var(--color-slate-200)_3px)]",
}

interface OpportunityStatusBarProps {
  segments: OpportunityStatusSegment[]
  capturedPct: number
  capturedAmountLabel: string
  totalAmountLabel: string
  capture: CaptureReveal
}

export function OpportunityStatusBar({
  segments,
  capturedPct,
  capturedAmountLabel,
  totalAmountLabel,
  capture,
}: OpportunityStatusBarProps) {
  const [hoveredId, setHoveredId] = useState<OpportunityStatusKind | null>(null)
  const legend = displayStatusSegments(segments)
  const track = trackStatusSegments(segments)
  const total = track.reduce((sum, s) => sum + s.millions, 0)

  const layouts = track.map((segment, index) => {
    const share = total > 0 ? (segment.millions / total) * 100 : 0
    const cursor = track
      .slice(0, index)
      .reduce(
        (sum, item) => sum + (total > 0 ? (item.millions / total) * 100 : 0),
        0,
      )
    return { segment, share, mid: cursor + share / 2 }
  })

  // The track spans every bucket, expired included, so the needle rides the
  // captured segment's trailing edge and reads as a share of the whole track.
  const captured = layouts.find((l) => l.segment.id === "captured")
  const markerPct = captured ? captured.mid + captured.share / 2 : capturedPct
  const markerShare = Math.round(markerPct)
  const trackTotalLabel = `$${total.toFixed(2)}M`

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <OpportunityStatusTrack
          layouts={layouts}
          segmentFill={SEGMENT_FILL}
          hoveredId={hoveredId}
          onHoverChange={setHoveredId}
          markerPct={markerPct}
          markerLabel={
            <>
              <AnimatedFigure
                value={markerShare}
                fractionDigits={0}
                animateOnMount={false}
              />
              % ·{" "}
              <AnimatedFigure
                value={captured?.segment.millions ?? 0}
                format={formatMillions}
                animateOnMount={false}
              />
            </>
          }
          markerPulse={capture.justCaptured}
          ariaLabel={`Opportunity breakdown by status. ${markerShare}% captured (${capturedAmountLabel} of ${trackTotalLabel})`}
          note={
            <CaptureNote
              deltaUsd={capture.deltaUsd}
              skuCount={capture.skuCount}
              show={capture.justCaptured}
              dimmed={hoveredId != null}
            />
          }
        />
        <CompositionBarScale end={trackTotalLabel} />
      </div>

      <TooltipProvider delayDuration={200}>
        <ul className="grid grid-cols-2 gap-2.5 border-t border-slate-100 pt-3 sm:grid-cols-3">
          {legend.map((segment) => (
            <CompositionBarLegendItem
              key={segment.id}
              className={cn(
                "rounded-xl border border-slate-200 bg-white px-3 py-2.5 transition-[box-shadow,border-color] duration-500",
                // Points at the one figure that just moved, without recolouring it.
                capture.justCaptured &&
                  segment.id === "captured" &&
                  "border-success-500/40 ring-2 ring-success-100",
              )}
              swatchClassName={DOT_FILL[segment.id]}
              swatchRingClassName={
                segment.id === "expired" ? "ring-1 ring-slate-300" : undefined
              }
              label={segment.label}
              amountLabel={
                // Expired never moves, so leave it as plain text.
                segment.muted ? (
                  segment.amountLabel
                ) : (
                  <AnimatedFigure
                    value={segment.millions}
                    format={formatMillions}
                    animateOnMount={false}
                  />
                )
              }
              muted={segment.muted}
              dimmed={
                hoveredId != null &&
                hoveredId !== segment.id &&
                !(
                  segment.id === "opportunity" &&
                  (hoveredId === "seasonal" || hoveredId === "pdp")
                )
              }
              info={
                <SegmentInfo label={segment.label} tooltip={segment.tooltip} />
              }
            />
          ))}
        </ul>
      </TooltipProvider>
    </div>
  )
}
