"use client"

import { useState } from "react"
import { Card, CardContent, cn } from "@ciq-dev/ciq-design-system"
import type {
  OpportunityMeterData,
  OpportunityStatusSegment,
  OpportunityViewMode,
  ValuePillar,
} from "./types"
import { OpportunityBreakdown } from "./opportunity-breakdown"
import { OpportunityStatusBar } from "./opportunity-status-bar"

interface OpportunityMeterProps {
  data: OpportunityMeterData
  statusSegments: OpportunityStatusSegment[]
  pillars: ValuePillar[]
}

const VIEW_OPTIONS: { id: OpportunityViewMode; label: string }[] = [
  { id: "status", label: "By status" },
  { id: "driver", label: "By driver" },
]

export function OpportunityMeter({
  data,
  statusSegments,
  pillars,
}: OpportunityMeterProps) {
  const [view, setView] = useState<OpportunityViewMode>("status")
  const capturedPct = Math.min(
    100,
    Math.round((data.realizedMillions / data.identifiedMillions) * 100),
  )
  const totalAmountLabel = `$${data.identifiedMillions.toFixed(2)}M`

  return (
    <Card className="min-w-0 flex-1 rounded-2xl border-border-default bg-surface shadow-sm">
      <CardContent className="flex flex-col gap-6 p-6">
        <div className="flex flex-col gap-1">
          <p className="text-sm text-fg-tertiary">
            Total opportunity the agent has found for {data.yearLabel}
          </p>
          <p className="font-sans text-5xl font-semibold tracking-tight text-brand-950 tabular-nums">
            ${data.identifiedMillions.toFixed(2)}M
          </p>
          <p className="mt-1 text-sm text-fg-secondary">
            You&apos;ve captured{" "}
            <span className="font-semibold text-fg-primary">
              ${data.realizedMillions.toFixed(2)}M
            </span>{" "}
            of it so far, just under a third of the year.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <div
            role="tablist"
            aria-label="Opportunity breakdown view"
            className="inline-flex w-fit shrink-0 rounded-lg bg-slate-100 p-0.5"
          >
            {VIEW_OPTIONS.map((option) => {
              const active = view === option.id
              return (
                <button
                  key={option.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setView(option.id)}
                  className={cn(
                    "rounded-md px-3 py-1.5 text-xs font-medium transition-colors",
                    active
                      ? "bg-surface text-fg-primary shadow-sm"
                      : "text-fg-tertiary hover:text-fg-secondary",
                  )}
                >
                  {option.label}
                </button>
              )
            })}
          </div>

          {view === "status" ? (
            <OpportunityStatusBar
              segments={statusSegments}
              capturedPct={capturedPct}
              capturedAmountLabel={`$${data.realizedMillions.toFixed(2)}M`}
              totalAmountLabel={totalAmountLabel}
            />
          ) : (
            <OpportunityBreakdown
              identifiedMillions={data.identifiedMillions}
              pillars={pillars}
            />
          )}
        </div>
      </CardContent>
    </Card>
  )
}
