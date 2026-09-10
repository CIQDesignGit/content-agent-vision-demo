"use client"

import { Info } from "lucide-react"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@ciq-dev/ciq-design-system"
import type { PillarKind, ValuePillar } from "./types"

const SEGMENT_CLASS: Record<PillarKind, string> = {
  foundational: "bg-violet-100",
  seasonal: "bg-sky-100",
  aeo: "bg-teal-100",
}

const SEGMENT_BORDER_CLASS: Record<PillarKind, string> = {
  foundational: "!border-violet-300",
  seasonal: "!border-sky-300",
  aeo: "!border-teal-300",
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

  return (
    <div className="flex flex-col gap-3">
      <p className="text-sm text-fg-primary">
        Where the ${identifiedMillions.toFixed(1)}M comes from
      </p>

      <div
        className="flex h-3 w-full gap-0.5"
        role="img"
        aria-label="Opportunity breakdown by source"
      >
        {pillars.map((pillar, index) => {
          const share =
            total > 0 ? (parseMillions(pillar.displayValue) / total) * 100 : 0
          return (
            <div
              key={pillar.id}
              className={`h-full border ${SEGMENT_CLASS[pillar.kind]} ${SEGMENT_BORDER_CLASS[pillar.kind]} ${
                index === 0
                  ? "rounded-l-full"
                  : index === pillars.length - 1
                    ? "rounded-r-full"
                    : ""
              }`}
              style={{ width: `${share}%` }}
              title={`${pillar.title} ${pillar.displayValue}`}
            />
          )
        })}
      </div>

      <TooltipProvider delayDuration={200}>
        <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
          {pillars.map((pillar) => (
            <li key={pillar.id} className="flex min-w-0 items-center gap-1.5">
              <span
                className={`size-3 shrink-0 rounded-sm border-2 ${SEGMENT_CLASS[pillar.kind]} ${SEGMENT_BORDER_CLASS[pillar.kind]}`}
                aria-hidden
              />
              <span className="truncate text-sm text-fg-primary">
                <span className="font-normal text-fg-secondary">{pillar.title}</span>{" "}
                <span className="font-semibold tabular-nums">
                  {pillar.displayValue}
                </span>
              </span>
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
            </li>
          ))}
        </ul>
      </TooltipProvider>
    </div>
  )
}
