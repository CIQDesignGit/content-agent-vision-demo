"use client"

import { cn } from "@/lib/utils"
import type { OpportunityMeterData, OpportunityStatusSegment } from "./types"
import { formatMillions } from "./apply-capture"
import { AnimatedFigure } from "./animated-figure"
import { OpportunityMeterRail } from "./opportunity-meter-rail"
import { OpportunityStatusBar } from "./opportunity-status-bar"
import type { CaptureReveal } from "./use-capture-reveal"

interface OpportunityMeterOverviewProps {
  data: OpportunityMeterData
  statusSegments: OpportunityStatusSegment[]
  capture: CaptureReveal
  capturedPct: number
  totalAmountLabel: string
  variant: "full" | "rail"
  className?: string
}

export function OpportunityMeterOverview({
  data,
  statusSegments,
  capture,
  capturedPct,
  totalAmountLabel,
  variant,
  className,
}: OpportunityMeterOverviewProps) {
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

  return (
    <div className={cn("flex w-full flex-col gap-4", className)}>
      <div className="flex flex-col gap-2">
        <p className="text-[13px] font-medium text-brand-600">
          Total opportunity the agent has found for {data.yearLabel}
        </p>

        <p className="flex items-start font-sans font-semibold leading-none text-brand-950">
          <span className="mt-1 -mr-1 text-3xl text-slate-600 sm:mt-1.5 sm:text-4xl">
            $
          </span>
          <AnimatedFigure
            value={data.identifiedMillions}
            delay={0.3}
            className="text-6xl tracking-[-0.045em] tabular-nums sm:text-7xl"
          />
          <span className="mt-1 ml-1 text-3xl text-slate-600 sm:mt-1.5 sm:text-4xl">
            M
          </span>
        </p>

        <p className="text-sm leading-relaxed text-slate-500">
          <span className="font-semibold tabular-nums text-slate-900">
            <AnimatedFigure
              value={data.realizedMillions}
              delay={0.45}
              format={(v) =>
                v >= 1 ? `$${v.toFixed(2)}M` : `$${Math.round(v * 1000)}K`
              }
            />
          </span>{" "}
          captured (
          <span className="font-semibold tabular-nums text-slate-900">
            <AnimatedFigure
              value={capturedPct}
              fractionDigits={0}
              delay={0.5}
              animateOnMount={false}
            />
            %
          </span>{" "}
          of this total).
        </p>
      </div>

      <div className="w-full min-w-0">
        <OpportunityStatusBar
          segments={statusSegments}
          capturedPct={capturedPct}
          capturedAmountLabel={formatMillions(data.realizedMillions)}
          totalAmountLabel={totalAmountLabel}
          capture={capture}
        />
      </div>
    </div>
  )
}
