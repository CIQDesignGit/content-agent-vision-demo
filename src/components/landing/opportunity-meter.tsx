"use client"

import { useState } from "react"
import { Sparkles } from "lucide-react"
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
    <Card className="relative min-w-0 flex-1 overflow-hidden rounded-3xl border-0 bg-white ring-1 ring-slate-900/6 !shadow-pane-lg">
      {/* Light falling from the top-left corner onto the headline value. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-56 bg-[radial-gradient(70%_100%_at_15%_0%,var(--color-brand-50),transparent_72%)]"
      />

      <CardContent className="relative flex flex-col gap-8 p-8">
        <div className="flex flex-col gap-2.5">
          <p className="flex items-center gap-2 text-[13px] font-medium text-brand-600">
            <span className="grid size-5 shrink-0 place-items-center rounded-full bg-brand-100">
              <Sparkles className="size-3 text-brand-600" aria-hidden />
            </span>
            Total opportunity the agent has found for {data.yearLabel}
          </p>

          {/* Currency and scale marks are subordinate so the numerals
              carry the weight. tabular-nums stays on the digits only —
              on "$" and "M" it just adds dead advance width. */}
          <p className="flex items-start font-sans font-semibold leading-none text-brand-950">
            <span className="mt-1 -mr-1 text-3xl text-brand-500 sm:mt-1.5 sm:text-4xl">
              $
            </span>
            <span className="text-6xl tracking-[-0.045em] tabular-nums sm:text-7xl">
              {data.identifiedMillions.toFixed(2)}
            </span>
            <span className="mt-1 ml-1 text-3xl text-brand-500 sm:mt-1.5 sm:text-4xl">
              M
            </span>
          </p>

          <p className="text-sm leading-relaxed text-slate-500">
            You&apos;ve captured{" "}
            <span className="font-semibold text-slate-900">
              ${data.realizedMillions.toFixed(2)}M
            </span>{" "}
            of it so far, just under a third of the year.
          </p>
        </div>

        <div className="flex flex-col gap-5">
          <div
            role="tablist"
            aria-label="Opportunity breakdown view"
            className="inline-flex w-fit shrink-0 rounded-full bg-slate-100/80 p-1 ring-1 ring-slate-900/5"
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
                    "rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all duration-200",
                    active
                      ? "bg-white text-brand-900 shadow-sm ring-1 ring-slate-900/5"
                      : "text-slate-500 hover:text-slate-700",
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
