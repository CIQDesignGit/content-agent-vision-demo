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
  // Keep "Open opportunity" intact; trim the trailing word on longer titles.
  if (/^open opportunity$/i.test(label)) return label
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
  const heroInThousands = data.identifiedMillions < 1
  const heroValue = heroInThousands
    ? data.identifiedMillions * 1000
    : data.identifiedMillions

  return (
    <div className={cn("flex w-full flex-col justify-between gap-8 lg:min-h-[22rem]", className)}>
      <div className="flex flex-col gap-2">
        <p className="text-[13px] font-medium text-brand-600">
          {data.title ?? "Total annualized content opportunity"}
        </p>

        {/* Hero + legend share one row so amounts sit on the $5.24M baseline;
            the PvP chip sits underneath and must not participate in that align. */}
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <p className="flex min-w-0 items-baseline font-sans font-semibold leading-none text-brand-950">
              <span className="text-6xl tracking-[-0.045em] sm:text-7xl">$</span>
              <AnimatedFigure
                value={heroValue}
                fractionDigits={heroInThousands ? 0 : 2}
                delay={0.3}
                className="text-6xl tracking-[-0.045em] tabular-nums sm:text-7xl"
              />
              <span className="text-6xl tracking-[-0.045em] sm:text-7xl">
                {heroInThousands ? "K" : "M"}
              </span>
            </p>

            <TooltipProvider delayDuration={200}>
              <ul
                className="flex shrink-0 items-end divide-x divide-slate-200"
                onPointerLeave={() => setHoveredId(null)}
              >
                {legend.map((segment) => (
                  <CompositionBarLegendItem
                    key={segment.id}
                    className="w-auto px-4 first:pl-0 last:pr-0"
                    amountClassName="text-xl leading-none"
                    swatchClassName={dotFill[segment.id]}
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

          {data.pvpDelta ? (
            <span
              className={
                data.pvpDeltaPositive !== false
                  ? "w-fit rounded-full bg-teal-50 px-2.5 py-1 text-sm font-semibold tabular-nums text-teal-700"
                  : "w-fit rounded-full bg-slate-100 px-2.5 py-1 text-sm font-semibold tabular-nums text-slate-600"
              }
            >
              {data.pvpDelta}
            </span>
          ) : null}
        </div>
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
