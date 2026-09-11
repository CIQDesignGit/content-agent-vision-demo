"use client"

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
import type { PillarKind, ValuePillar } from "./types"

const SEGMENT_FILL: Record<PillarKind, string> = {
  foundational: "bg-violet-500",
  seasonal: "bg-sky-500",
  aeo: "bg-teal-500",
}

const DOT_FILL: Record<PillarKind, string> = {
  foundational: "bg-violet-500",
  seasonal: "bg-sky-500",
  aeo: "bg-teal-500",
}

const AMOUNT_TONE: Record<PillarKind, string> = {
  foundational: "text-violet-700",
  seasonal: "text-sky-700",
  aeo: "text-teal-700",
}

function parseMillions(displayValue: string): number {
  const n = Number.parseFloat(displayValue.replace(/[^0-9.]/g, ""))
  return Number.isFinite(n) ? n : 0
}

interface OpportunityBreakdownProps {
  identifiedMillions: number
  pillars: ValuePillar[]
}

export function OpportunityBreakdown({
  identifiedMillions,
  pillars,
}: OpportunityBreakdownProps) {
  const total = pillars.reduce((sum, p) => sum + parseMillions(p.displayValue), 0)
  const totalAmountLabel = `$${identifiedMillions.toFixed(2)}M`

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <CompositionBarFrame>
          <CompositionBarTrack ariaLabel="Opportunity breakdown by source">
            {pillars.map((pillar, index) => {
              const share =
                total > 0
                  ? (parseMillions(pillar.displayValue) / total) * 100
                  : 0
              return (
                <CompositionBarSegment
                  key={pillar.id}
                  widthPct={share}
                  className={SEGMENT_FILL[pillar.kind]}
                  title={`${pillar.title} ${pillar.displayValue}`}
                  isFirst={index === 0}
                  isLast={index === pillars.length - 1}
                />
              )
            })}
          </CompositionBarTrack>
        </CompositionBarFrame>

        <CompositionBarScale end={totalAmountLabel} />
      </div>

      <TooltipProvider delayDuration={200}>
        <ul className="grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-3">
          {pillars.map((pillar) => (
            <li key={pillar.id} className="flex min-w-0 flex-col gap-1">
              <span className="flex items-center gap-1.5 text-xs text-fg-secondary">
                <span
                  className={cn(
                    "size-2.5 shrink-0 rounded-full",
                    DOT_FILL[pillar.kind],
                  )}
                  aria-hidden
                />
                <span className="truncate">{pillar.title}</span>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      type="button"
                      aria-label={`About ${pillar.title}`}
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
                    <p>{pillar.methodology}</p>
                    {pillar.benchmark ? (
                      <p className="mt-1 opacity-80">{pillar.benchmark}</p>
                    ) : null}
                  </TooltipContent>
                </Tooltip>
              </span>
              <span
                className={cn(
                  "pl-4 font-sans text-base font-semibold tabular-nums tracking-tight",
                  AMOUNT_TONE[pillar.kind],
                )}
              >
                {pillar.displayValue}
              </span>
            </li>
          ))}
        </ul>
      </TooltipProvider>
    </div>
  )
}
