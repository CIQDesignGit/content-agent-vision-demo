"use client"

import { Info } from "lucide-react"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@ciq-dev/ciq-design-system"
import {
  CompositionBarFrame,
  CompositionBarLegendItem,
  CompositionBarScale,
  CompositionBarSegment,
  CompositionBarTrack,
} from "./composition-bar"
import type { PillarKind, ValuePillar } from "./types"

/** Same sequential ramp as the status view — one palette for all charts. */
const SEGMENT_FILL: Record<PillarKind, string> = {
  foundational: "bg-data-1",
  seasonal: "bg-data-2",
  aeo: "bg-data-3",
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
    <div className="flex flex-col gap-5">
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
        <ul className="grid grid-cols-1 gap-x-6 gap-y-3 border-t border-slate-100 pt-4 sm:grid-cols-3">
          {pillars.map((pillar) => (
            <CompositionBarLegendItem
              key={pillar.id}
              swatchClassName={SEGMENT_FILL[pillar.kind]}
              label={pillar.title}
              amountLabel={pillar.displayValue}
              info={
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      type="button"
                      aria-label={`About ${pillar.title}`}
                      className="shrink-0 rounded-full text-slate-300 transition-colors hover:text-slate-500"
                      onClick={(e) => e.stopPropagation()}
                      onKeyDown={(e) => e.stopPropagation()}
                    >
                      <Info className="size-3.5" aria-hidden />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent side="bottom" className="max-w-xs type-caption">
                    <p>{pillar.methodology}</p>
                    {pillar.benchmark ? (
                      <p className="mt-1 opacity-80">{pillar.benchmark}</p>
                    ) : null}
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
