"use client"

import { useState } from "react"
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

/** Teal = banked · brand violet = live money to act on · hatch = not yet activated. */
const SEGMENT_FILL: Record<OpportunityStatusKind, string> = {
  captured: "bg-teal-500",
  deadline: "bg-brand-500",
  open: "bg-[repeating-linear-gradient(-45deg,var(--color-brand-300),var(--color-brand-300)_1.5px,var(--color-brand-50),var(--color-brand-50)_6px)]",
}

const DOT_FILL: Record<OpportunityStatusKind, string> = {
  captured: "bg-teal-500",
  deadline: "bg-brand-500",
  open: "bg-brand-200",
}

const AMOUNT_TONE: Record<OpportunityStatusKind, string> = {
  captured: "text-teal-700",
  deadline: "text-brand-700",
  open: "text-brand-500",
}

interface OpportunityStatusBarProps {
  segments: OpportunityStatusSegment[]
  capturedPct: number
  capturedAmountLabel: string
  totalAmountLabel: string
}

export function OpportunityStatusBar({
  segments,
  capturedPct,
  capturedAmountLabel,
  totalAmountLabel,
}: OpportunityStatusBarProps) {
  const [hoveredId, setHoveredId] = useState<OpportunityStatusKind | null>(null)
  const total = segments.reduce((sum, s) => sum + s.millions, 0)

  let cursor = 0
  const layouts = segments.map((segment) => {
    const share = total > 0 ? (segment.millions / total) * 100 : 0
    const mid = cursor + share / 2
    cursor += share
    return { segment, share, mid }
  })

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <OpportunityStatusTrack
          layouts={layouts}
          segmentFill={SEGMENT_FILL}
          hoveredId={hoveredId}
          onHoverChange={setHoveredId}
          capturedPct={capturedPct}
          capturedAmountLabel={capturedAmountLabel}
          totalAmountLabel={totalAmountLabel}
        />
        <CompositionBarScale end={totalAmountLabel} />
      </div>

      <TooltipProvider delayDuration={200}>
        <ul className="grid grid-cols-3 gap-x-6 gap-y-3 border-t border-slate-100 pt-4">
          {segments.map((segment) => (
            <CompositionBarLegendItem
              key={segment.id}
              swatchClassName={DOT_FILL[segment.id]}
              swatchRingClassName={
                segment.id === "open" ? "ring-1 ring-brand-300" : undefined
              }
              label={segment.label}
              amountLabel={segment.amountLabel}
              amountClassName={AMOUNT_TONE[segment.id]}
              dimmed={hoveredId != null && hoveredId !== segment.id}
              info={
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      type="button"
                      aria-label={`About ${segment.label}`}
                      className="shrink-0 rounded-full text-slate-300 transition-colors hover:text-slate-500"
                      onClick={(e) => e.stopPropagation()}
                      onKeyDown={(e) => e.stopPropagation()}
                    >
                      <Info className="size-3.5" aria-hidden />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent side="bottom" className="max-w-xs type-caption">
                    <p>{segment.tooltip}</p>
                  </TooltipContent>
                </Tooltip>
              }
            />
          ))}
        </ul>
      </TooltipProvider>
    </div>
  )
}
