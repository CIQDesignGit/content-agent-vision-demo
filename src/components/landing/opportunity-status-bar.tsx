"use client"

import { useState } from "react"
import { AnimatedFigure } from "./animated-figure"
import { formatMillions, trackStatusSegments } from "./apply-capture"
import { CaptureNote } from "./capture-note"
import { OpportunityStatusTrack } from "./opportunity-status-track"
import type { CaptureReveal } from "./use-capture-reveal"
import type { OpportunityStatusKind, OpportunityStatusSegment } from "./types"

/** Captured is azure; remaining opportunity is a saturated cyan so the two stay distinct. */
const SEGMENT_FILL: Record<OpportunityStatusKind, string> = {
  captured: "bg-sky-600",
  seasonal: "bg-cyan-500",
  pdp: "bg-cyan-500",
  opportunity: "bg-cyan-500",
  expired:
    "bg-[repeating-linear-gradient(-45deg,var(--color-slate-300),var(--color-slate-300)_1.5px,var(--color-slate-100),var(--color-slate-100)_5px)]",
}

export const STATUS_DOT_FILL: Record<OpportunityStatusKind, string> = {
  captured: "bg-sky-600",
  seasonal: "bg-cyan-500",
  pdp: "bg-cyan-500",
  opportunity: "bg-cyan-500",
  expired:
    "bg-[repeating-linear-gradient(-45deg,var(--color-slate-400),var(--color-slate-400)_1px,var(--color-slate-200),var(--color-slate-200)_3px)]",
}

export function statusDotFill(windowClosed: boolean) {
  return windowClosed
    ? { ...STATUS_DOT_FILL, opportunity: STATUS_DOT_FILL.expired }
    : STATUS_DOT_FILL
}

interface OpportunityStatusBarProps {
  segments: OpportunityStatusSegment[]
  capturedPct: number
  capturedAmountLabel: string
  totalAmountLabel: string
  capture: CaptureReveal
  windowClosed?: boolean
  hoveredId?: OpportunityStatusKind | null
  onHoverChange?: (id: OpportunityStatusKind | null) => void
}

export function OpportunityStatusBar({
  segments,
  capturedPct,
  capturedAmountLabel,
  totalAmountLabel,
  capture,
  windowClosed = false,
  hoveredId: hoveredIdProp,
  onHoverChange,
}: OpportunityStatusBarProps) {
  const [hoveredInternal, setHoveredInternal] = useState<OpportunityStatusKind | null>(null)
  const hoveredId = hoveredIdProp !== undefined ? hoveredIdProp : hoveredInternal
  const setHoveredId = onHoverChange ?? setHoveredInternal
  const track = trackStatusSegments(segments, windowClosed)
  const segmentFill = windowClosed
    ? { ...SEGMENT_FILL, opportunity: SEGMENT_FILL.expired }
    : SEGMENT_FILL
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

  // The needle rides the captured segment's trailing edge on a track that
  // includes expired. The percent itself is captured / identified — the same
  // figure as the caption — so the pill and the sentence never disagree.
  const captured = layouts.find((l) => l.segment.id === "captured")
  const markerPct = captured ? captured.mid + captured.share / 2 : capturedPct
  const capturedMillions = captured?.segment.millions ?? 0
  const trackTotalLabel = `$${total.toFixed(2)}M`

  return (
    <div className="flex w-full min-w-0 flex-col gap-3">
      <OpportunityStatusTrack
        layouts={layouts}
        segmentFill={segmentFill}
        hoveredId={hoveredId}
        onHoverChange={setHoveredId}
        markerPct={markerPct}
        markerLabel={
          <>
            <AnimatedFigure
              value={capturedPct}
              fractionDigits={0}
              animateOnMount={false}
            />
            % ·{" "}
            <AnimatedFigure
              value={capturedMillions}
              format={formatMillions}
              animateOnMount={false}
            />
          </>
        }
        markerPulse={capture.justCaptured}
        ariaLabel={`Opportunity breakdown by status. ${capturedPct}% captured (${capturedAmountLabel} of ${totalAmountLabel})`}
        note={
          <CaptureNote
            deltaUsd={capture.deltaUsd}
            skuCount={capture.skuCount}
            show={capture.justCaptured}
            dimmed={hoveredId != null}
          />
        }
      />
      <div className="flex items-baseline justify-between gap-4 text-base text-slate-500">
        <p>
          <AnimatedFigure
            value={capturedMillions}
            format={formatMillions}
            animateOnMount={false}
            className="font-semibold text-slate-800"
          />{" "}
          (
          <AnimatedFigure
            value={capturedPct}
            fractionDigits={0}
            animateOnMount={false}
            className="font-semibold text-slate-800"
          />
          %) of the {totalAmountLabel} opportunity captured
        </p>
        <p className="shrink-0 tabular-nums">
          <span className="font-semibold text-slate-700">{trackTotalLabel}</span>{" "}
          identified
        </p>
      </div>
    </div>
  )
}
