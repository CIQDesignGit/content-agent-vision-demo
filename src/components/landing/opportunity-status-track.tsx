"use client"

import { cn } from "@ciq-dev/ciq-design-system"
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

/** Pointer + pill used for both the captured marker and the hovered segment. */
function BarMarker({
  leftPct,
  label,
  emphasis,
}: {
  leftPct: number
  label: string
  emphasis: boolean
}) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute top-0 flex -translate-x-1/2 flex-col items-center",
        emphasis ? "z-20" : "z-10",
      )}
      style={{ left: `${leftPct}%` }}
    >
      <span
        className={cn(
          "whitespace-nowrap rounded-full px-2.5 py-1 text-[11px] font-semibold tabular-nums text-white shadow-sm",
          emphasis ? "bg-slate-900" : "bg-brand-900",
        )}
      >
        {label}
      </span>
      <span
        className={cn("h-2 w-px", emphasis ? "bg-slate-900" : "bg-brand-900")}
        aria-hidden
      />
    </div>
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
    <div
      className={cn(
        "pointer-events-none absolute inset-y-0 w-0.5 -translate-x-1/2 rounded-full transition-opacity",
        tone,
        faded ? "z-10 opacity-25" : "z-20 opacity-100",
      )}
      style={{ left: `${leftPct}%` }}
      aria-hidden
    >
      <span
        className={cn(
          "absolute top-1/2 left-1/2 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full ring-2 ring-white",
          tone,
        )}
      />
    </div>
  )
}

interface OpportunityStatusTrackProps {
  layouts: StatusSegmentLayout[]
  segmentFill: Record<OpportunityStatusKind, string>
  hoveredId: OpportunityStatusKind | null
  onHoverChange: (id: OpportunityStatusKind | null) => void
  capturedPct: number
  capturedAmountLabel: string
  totalAmountLabel: string
}

export function OpportunityStatusTrack({
  layouts,
  segmentFill,
  hoveredId,
  onHoverChange,
  capturedPct,
  capturedAmountLabel,
  totalAmountLabel,
}: OpportunityStatusTrackProps) {
  const markerLeft = Math.min(Math.max(capturedPct, 0), 100)
  const hovered = layouts.find((s) => s.segment.id === hoveredId)

  return (
    <CompositionBarFrame
      annotation={
        hovered ? (
          <BarMarker
            leftPct={hovered.mid}
            label={`${hovered.segment.label} · ${hovered.segment.amountLabel}`}
            emphasis
          />
        ) : (
          <BarMarker
            leftPct={markerLeft}
            label={`${capturedPct}% · ${capturedAmountLabel}`}
            emphasis={false}
          />
        )
      }
    >
      <div className="relative">
        <CompositionBarTrack
          ariaLabel={`Opportunity breakdown by status. ${capturedPct}% captured (${capturedAmountLabel} of ${totalAmountLabel})`}
        >
          {layouts.map(({ segment, share }, index) => (
            <CompositionBarSegment
              key={segment.id}
              widthPct={share}
              className={segmentFill[segment.id]}
              title={`${segment.label} ${segment.amountLabel}`}
              isFirst={index === 0}
              isLast={index === layouts.length - 1}
              dimmed={hoveredId != null && hoveredId !== segment.id}
              onHoverChange={(active) =>
                onHoverChange(active ? segment.id : null)
              }
            />
          ))}
        </CompositionBarTrack>

        <TrackNeedle
          leftPct={markerLeft}
          tone="bg-brand-900"
          faded={hoveredId != null}
        />
        {hovered ? (
          <TrackNeedle leftPct={hovered.mid} tone="bg-slate-900" />
        ) : null}
      </div>
    </CompositionBarFrame>
  )
}
