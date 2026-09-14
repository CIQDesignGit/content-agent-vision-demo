"use client"

import { useEffect, useState } from "react"
import { Info } from "lucide-react"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@ciq-dev/ciq-design-system"
import {
  CompositionBarLegendItem,
  CompositionBarScale,
} from "./composition-bar"
import { OpportunityStatusTrack } from "./opportunity-status-track"
import type { OpportunityStatusKind, OpportunityStatusSegment } from "./types"

/** Brand → cool → soft brand → expired hatch. */
const SEGMENT_FILL: Record<OpportunityStatusKind, string> = {
  captured: "bg-brand-500",
  seasonal: "bg-data-1",
  pdp: "bg-brand-200",
  expired:
    "bg-[repeating-linear-gradient(-45deg,var(--color-slate-300),var(--color-slate-300)_1.5px,var(--color-slate-100),var(--color-slate-100)_5px)]",
}

const DOT_FILL: Record<OpportunityStatusKind, string> = {
  captured: "bg-brand-500",
  seasonal: "bg-data-1",
  pdp: "bg-brand-200",
  expired:
    "bg-[repeating-linear-gradient(-45deg,var(--color-slate-400),var(--color-slate-400)_1px,var(--color-slate-200),var(--color-slate-200)_3px)]",
}

interface OpportunityStatusBarProps {
  segments: OpportunityStatusSegment[]
  capturedPct: number
  capturedAmountLabel: string
  totalAmountLabel: string
}

function SegmentInfo({
  label,
  tooltip,
}: {
  label: string
  tooltip: string
}) {
  // Radix tooltip IDs differ between server and client — mount before wiring.
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    queueMicrotask(() => setMounted(true))
  }, [])

  if (!mounted) {
    return (
      <button
        type="button"
        aria-label={`About ${label}`}
        className="shrink-0 rounded-full text-slate-300 transition-colors hover:text-slate-500"
      >
        <Info className="size-3.5" aria-hidden />
      </button>
    )
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          type="button"
          aria-label={`About ${label}`}
          className="shrink-0 rounded-full text-slate-300 transition-colors hover:text-slate-500"
          onClick={(e) => e.stopPropagation()}
          onKeyDown={(e) => e.stopPropagation()}
        >
          <Info className="size-3.5" aria-hidden />
        </button>
      </TooltipTrigger>
      <TooltipContent side="bottom" className="max-w-xs type-caption">
        <p>{tooltip}</p>
      </TooltipContent>
    </Tooltip>
  )
}

export function OpportunityStatusBar({
  segments,
  capturedPct,
  capturedAmountLabel,
  totalAmountLabel,
}: OpportunityStatusBarProps) {
  const [hoveredId, setHoveredId] = useState<OpportunityStatusKind | null>(null)
  const total = segments.reduce((sum, s) => sum + s.millions, 0)

  const layouts = segments.map((segment, index) => {
    const share = total > 0 ? (segment.millions / total) * 100 : 0
    const cursor = segments
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
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <OpportunityStatusTrack
          layouts={layouts}
          segmentFill={SEGMENT_FILL}
          hoveredId={hoveredId}
          onHoverChange={setHoveredId}
          markerPct={markerPct}
          markerLabel={`${markerShare}% · ${capturedAmountLabel}`}
          ariaLabel={`Opportunity breakdown by status. ${markerShare}% captured (${capturedAmountLabel} of ${trackTotalLabel})`}
        />
        <CompositionBarScale end={trackTotalLabel} />
      </div>

      <TooltipProvider delayDuration={200}>
        <ul className="grid grid-cols-2 gap-3 border-t border-slate-100 pt-4 sm:grid-cols-4">
          {segments.map((segment) => (
            <CompositionBarLegendItem
              key={segment.id}
              className="rounded-xl border border-slate-200 bg-white px-3 py-3"
              swatchClassName={DOT_FILL[segment.id]}
              swatchRingClassName={
                segment.id === "expired" ? "ring-1 ring-slate-300" : undefined
              }
              label={segment.label}
              amountLabel={segment.amountLabel}
              muted={segment.muted}
              dimmed={hoveredId != null && hoveredId !== segment.id}
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
