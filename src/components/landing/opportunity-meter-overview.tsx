"use client"

import { useState } from "react"
import { TooltipProvider } from "@ciq-dev/ciq-design-system"
import { cn } from "@/lib/utils"
import type { OpportunityMeterData, OpportunityStatusKind, OpportunityStatusSegment } from "./types"
import { displayStatusSegments, formatMillions } from "./apply-capture"
import { AnimatedFigure } from "./animated-figure"
import { CompositionBarLegendItem } from "./composition-bar"
import { OpportunityMeterRail } from "./opportunity-meter-rail"
import { OpportunityStatusBar, statusDotFill } from "./opportunity-status-bar"
import { SegmentInfo } from "./segment-info"
import type { CaptureReveal } from "./use-capture-reveal"

interface OpportunityMeterOverviewProps {
  data: OpportunityMeterData
  statusSegments: OpportunityStatusSegment[]
  capture: CaptureReveal
  capturedPct: number
  totalAmountLabel: string
  windowClosed?: boolean
  variant: "full" | "rail"
  className?: string
}

function compactLabel(label: string) {
  return label.replace(/ opportunity$/i, "")
}

export function OpportunityMeterOverview({
  data,
  statusSegments,
  capture,
  capturedPct,
  totalAmountLabel,
  windowClosed = false,
  variant,
  className,
}: OpportunityMeterOverviewProps) {
  const [hoveredId, setHoveredId] = useState<OpportunityStatusKind | null>(null)

  if (variant === "rail") {
    return (
      <OpportunityMeterRail
        identifiedMillions={data.identifiedMillions}
        realizedMillions={data.realizedMillions}
        capturedPct={capturedPct}
        className={className}
      />
    )
  }

  const legend = displayStatusSegments(statusSegments, windowClosed)
  const dotFill = statusDotFill(windowClosed)

  return (
    <div className={cn("flex w-full flex-col justify-between gap-8 lg:min-h-[22rem]", className)}>
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex min-w-0 flex-col gap-2">
          <p className="text-[13px] font-medium text-brand-600">
            Total opportunity the agent has found
          </p>
          <p className="flex items-baseline font-sans font-semibold leading-none text-brand-950">
            <span className="text-6xl tracking-[-0.045em] sm:text-7xl">$</span>
            <AnimatedFigure
              value={data.identifiedMillions}
              delay={0.3}
              className="text-6xl tracking-[-0.045em] tabular-nums sm:text-7xl"
            />
            <span className="text-6xl tracking-[-0.045em] sm:text-7xl">M</span>
          </p>
        </div>

        <TooltipProvider delayDuration={200}>
          <ul
            className="flex shrink-0 items-stretch divide-x divide-slate-200"
            onPointerLeave={() => setHoveredId(null)}
          >
            {legend.map((segment) => (
              <CompositionBarLegendItem
                key={segment.id}
                className={cn(
                  "w-auto px-4 first:pl-0 last:pr-0",
                  capture.justCaptured &&
                    segment.id === "captured" &&
                    "rounded-lg bg-success-50/80",
                )}
                amountClassName="text-xl"
                swatchClassName={dotFill[segment.id]}
                swatchRingClassName={
                  segment.id === "expired" ||
                  (windowClosed && segment.id === "opportunity")
                    ? "ring-1 ring-slate-300"
                    : undefined
                }
                label={compactLabel(segment.label)}
                amountLabel={
                  <AnimatedFigure
                    value={segment.millions}
                    format={formatMillions}
                    animateOnMount={false}
                  />
                }
                dimmed={hoveredId != null && hoveredId !== segment.id}
                onPointerEnter={() => setHoveredId(segment.id)}
                info={<SegmentInfo label={segment.label} tooltip={segment.tooltip} />}
              />
            ))}
          </ul>
        </TooltipProvider>
      </div>

      <OpportunityStatusBar
        segments={statusSegments}
        capturedPct={capturedPct}
        capturedAmountLabel={formatMillions(data.realizedMillions)}
        totalAmountLabel={totalAmountLabel}
        capture={capture}
        windowClosed={windowClosed}
        hoveredId={hoveredId}
        onHoverChange={setHoveredId}
      />
    </div>
  )
}
