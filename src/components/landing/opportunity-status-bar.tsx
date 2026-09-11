"use client"

import { cn } from "@ciq-dev/ciq-design-system"
import {
  CompositionBarFrame,
  CompositionBarScale,
  CompositionBarSegment,
  CompositionBarTrack,
} from "./composition-bar"
import type { OpportunityStatusKind, OpportunityStatusSegment } from "./types"

/** Chart hues stay off-brand purple: emerald · amber · cyan · slate. */
const SEGMENT_FILL: Record<OpportunityStatusKind, string> = {
  captured: "bg-emerald-600",
  deadline: "bg-amber-500",
  open: "bg-cyan-300",
  forfeited:
    "bg-[repeating-linear-gradient(-45deg,var(--color-slate-400),var(--color-slate-400)_1px,var(--color-slate-100)_1px,var(--color-slate-100)_5px)]",
}

const DOT_FILL: Record<OpportunityStatusKind, string> = {
  captured: "bg-emerald-600",
  deadline: "bg-amber-500",
  open: "bg-cyan-300",
  forfeited: "bg-slate-400",
}

const AMOUNT_TONE: Record<OpportunityStatusKind, string> = {
  captured: "text-emerald-800",
  deadline: "text-amber-800",
  open: "text-cyan-900",
  forfeited: "text-slate-600",
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
  const total = segments.reduce((sum, s) => sum + s.millions, 0)
  const markerLeft = Math.min(Math.max(capturedPct, 0), 100)

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <CompositionBarFrame
          annotation={
            <div
              className="pointer-events-none absolute top-0 z-10 flex -translate-x-1/2 flex-col items-center"
              style={{ left: `${markerLeft}%` }}
            >
              <span className="whitespace-nowrap rounded-md bg-slate-800 px-2 py-0.5 text-2xs font-semibold tabular-nums text-white shadow-sm">
                {capturedPct}% · {capturedAmountLabel}
              </span>
              <span className="h-2 w-px bg-slate-800" aria-hidden />
            </div>
          }
        >
          <div className="relative">
            <CompositionBarTrack
              ariaLabel={`Opportunity breakdown by status. ${capturedPct}% captured (${capturedAmountLabel} of ${totalAmountLabel})`}
            >
              {segments.map((segment, index) => {
                const share =
                  total > 0 ? (segment.millions / total) * 100 : 0
                return (
                  <CompositionBarSegment
                    key={segment.id}
                    widthPct={share}
                    className={SEGMENT_FILL[segment.id]}
                    title={`${segment.label} ${segment.amountLabel}`}
                    isFirst={index === 0}
                    isLast={index === segments.length - 1}
                  />
                )
              })}
            </CompositionBarTrack>

            <div
              className="pointer-events-none absolute inset-y-0 z-10 w-0.5 -translate-x-1/2 bg-slate-800"
              style={{ left: `${markerLeft}%` }}
              aria-hidden
            >
              <span className="absolute top-1/2 left-1/2 size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-slate-800 ring-2 ring-white" />
            </div>
          </div>
        </CompositionBarFrame>

        <CompositionBarScale end={totalAmountLabel} />
      </div>

      <ul className="grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-4">
        {segments.map((segment) => (
          <li key={segment.id} className="flex min-w-0 flex-col gap-1">
            <span className="flex items-center gap-1.5 text-xs text-fg-secondary">
              <span
                className={cn(
                  "size-2.5 shrink-0 rounded-full",
                  DOT_FILL[segment.id],
                  segment.id === "forfeited" && "ring-1 ring-slate-300",
                )}
                aria-hidden
              />
              {segment.label}
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
    </div>
  )
}
