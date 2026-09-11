"use client"

import { useState } from "react"
import { Info } from "lucide-react"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  cn,
} from "@ciq-dev/ciq-design-system"
import {
  CompositionBarFrame,
  CompositionBarScale,
  CompositionBarSegment,
  CompositionBarTrack,
} from "./composition-bar"
import type { OpportunityStatusKind, OpportunityStatusSegment } from "./types"

/** Teal · sky · hatched open (was forfeited texture). */
const SEGMENT_FILL: Record<OpportunityStatusKind, string> = {
  captured: "bg-teal-500",
  deadline: "bg-sky-500",
  open: "bg-[repeating-linear-gradient(-45deg,var(--color-violet-300),var(--color-violet-300)_1px,var(--color-violet-50)_1px,var(--color-violet-50)_5px)]",
}

const DOT_FILL: Record<OpportunityStatusKind, string> = {
  captured: "bg-teal-500",
  deadline: "bg-sky-500",
  open: "bg-violet-200",
}

const AMOUNT_TONE: Record<OpportunityStatusKind, string> = {
  captured: "text-teal-700",
  deadline: "text-sky-700",
  open: "text-violet-700",
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
  const markerLeft = Math.min(Math.max(capturedPct, 0), 100)

  let cursor = 0
  const segmentLayouts = segments.map((segment) => {
    const share = total > 0 ? (segment.millions / total) * 100 : 0
    const mid = cursor + share / 2
    cursor += share
    return { segment, share, mid }
  })

  const hovered = segmentLayouts.find((s) => s.segment.id === hoveredId)

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <CompositionBarFrame
          annotation={
            hovered ? (
              <div
                className="pointer-events-none absolute top-0 z-20 flex -translate-x-1/2 flex-col items-center"
                style={{ left: `${hovered.mid}%` }}
              >
                <span className="whitespace-nowrap rounded-md bg-slate-900 px-2 py-0.5 text-2xs font-semibold tabular-nums text-white shadow-sm">
                  {hovered.segment.label} · {hovered.segment.amountLabel}
                </span>
                <span className="h-2 w-px bg-slate-900" aria-hidden />
              </div>
            ) : (
              <div
                className="pointer-events-none absolute top-0 z-10 flex -translate-x-1/2 flex-col items-center"
                style={{ left: `${markerLeft}%` }}
              >
                <span className="whitespace-nowrap rounded-md bg-slate-800 px-2 py-0.5 text-2xs font-semibold tabular-nums text-white shadow-sm">
                  {capturedPct}% · {capturedAmountLabel}
                </span>
                <span className="h-2 w-px bg-slate-800" aria-hidden />
              </div>
            )
          }
        >
          <div className="relative">
            <CompositionBarTrack
              ariaLabel={`Opportunity breakdown by status. ${capturedPct}% captured (${capturedAmountLabel} of ${totalAmountLabel})`}
            >
              {segmentLayouts.map(({ segment, share }, index) => (
                <CompositionBarSegment
                  key={segment.id}
                  widthPct={share}
                  className={SEGMENT_FILL[segment.id]}
                  title={`${segment.label} ${segment.amountLabel}`}
                  isFirst={index === 0}
                  isLast={index === segmentLayouts.length - 1}
                  dimmed={hoveredId != null && hoveredId !== segment.id}
                  onHoverChange={(active) =>
                    setHoveredId(active ? segment.id : null)
                  }
                />
              ))}
            </CompositionBarTrack>

            <div
              className={cn(
                "pointer-events-none absolute inset-y-0 z-10 w-0.5 -translate-x-1/2 bg-slate-800 transition-opacity",
                hoveredId ? "opacity-30" : "opacity-100",
              )}
              style={{ left: `${markerLeft}%` }}
              aria-hidden
            >
              <span className="absolute top-1/2 left-1/2 size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-slate-800 ring-2 ring-white" />
            </div>

            {hovered ? (
              <div
                className="pointer-events-none absolute inset-y-0 z-20 w-0.5 -translate-x-1/2 bg-slate-900"
                style={{ left: `${hovered.mid}%` }}
                aria-hidden
              >
                <span className="absolute top-1/2 left-1/2 size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-slate-900 ring-2 ring-white" />
              </div>
            ) : null}
          </div>
        </CompositionBarFrame>

        <CompositionBarScale end={totalAmountLabel} />
      </div>

      <TooltipProvider delayDuration={200}>
        <ul className="grid grid-cols-3 gap-x-6 gap-y-3">
          {segments.map((segment) => (
            <li
              key={segment.id}
              className={cn(
                "flex min-w-0 flex-col gap-1 transition-opacity duration-150",
                hoveredId != null && hoveredId !== segment.id && "opacity-40",
              )}
            >
              <span className="flex items-center gap-1.5 text-xs text-fg-secondary">
                <span
                  className={cn(
                    "size-2.5 shrink-0 rounded-full",
                    DOT_FILL[segment.id],
                    segment.id === "open" && "ring-1 ring-violet-300",
                  )}
                  aria-hidden
                />
                <span className="truncate">{segment.label}</span>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      type="button"
                      aria-label={`About ${segment.label}`}
                      className="shrink-0 rounded-sm text-fg-tertiary transition-colors hover:text-fg-secondary"
                      onClick={(e) => e.stopPropagation()}
                      onKeyDown={(e) => e.stopPropagation()}
                    >
                      <Info className="size-3.5" aria-hidden />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent
                    side="bottom"
                    className="max-w-xs type-caption"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <p>{segment.tooltip}</p>
                  </TooltipContent>
                </Tooltip>
              </span>
              <span
                className={cn(
                  "pl-4 font-sans text-base font-semibold tabular-nums tracking-tight",
                  AMOUNT_TONE[segment.id],
                )}
              >
                {segment.amountLabel}
              </span>
            </li>
          ))}
        </ul>
      </TooltipProvider>
    </div>
  )
}
