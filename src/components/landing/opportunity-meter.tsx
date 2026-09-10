"use client"

import { useState } from "react"
import { Flag, ScanSearch } from "lucide-react"
import {
  Card,
  CardContent,
  cn,
} from "@ciq-dev/ciq-design-system"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import type { OpportunityMeterData, SecondaryStat, ValuePillar } from "./types"
import { OpportunityBreakdown } from "./opportunity-breakdown"
import { OpportunityProgress } from "./opportunity-progress"
import { SecondaryStats } from "./secondary-stats"

interface OpportunityMeterProps {
  data: OpportunityMeterData
  pillars: ValuePillar[]
  stats?: SecondaryStat[]
  onOpenAudit?: () => void
}

export function OpportunityMeter({
  data,
  pillars,
  stats,
  onOpenAudit,
}: OpportunityMeterProps) {
  const [calcOpen, setCalcOpen] = useState(false)
  const pct = Math.min(
    100,
    Math.round((data.realizedMillions / data.identifiedMillions) * 100),
  )
  const isInteractive = Boolean(onOpenAudit)

  return (
    <>
      <Card
        role={isInteractive ? "button" : undefined}
        tabIndex={isInteractive ? 0 : undefined}
        onClick={onOpenAudit}
        onKeyDown={
          isInteractive
            ? (e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault()
                  onOpenAudit?.()
                }
              }
            : undefined
        }
        className={cn(
          "min-w-0 flex-1 rounded-2xl border-border-default bg-surface shadow-sm",
          isInteractive &&
            "cursor-pointer transition-colors hover:bg-surface-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus",
        )}
      >
        <CardContent className="flex flex-col gap-6 p-6">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="flex min-w-0 flex-1 flex-col gap-1 text-base text-fg-primary">
              <div className="flex items-baseline gap-1.5">
                <span className="font-sans text-5xl font-semibold tracking-tight text-brand-800 tabular-nums">
                  ${data.identifiedMillions.toFixed(1)}M
                </span>
                <button
                  type="button"
                  aria-label="How this number is calculated"
                  title="How this number is calculated"
                  className="grid size-8 shrink-0 place-items-center rounded-md text-fg-tertiary transition-colors hover:bg-surface-subtle hover:text-fg-secondary"
                  onClick={(e) => {
                    e.stopPropagation()
                    setCalcOpen(true)
                  }}
                  onKeyDown={(e) => e.stopPropagation()}
                >
                  <ScanSearch className="size-5" aria-hidden />
                </button>
              </div>
              <p className="text-sm font-medium">
                added to revenue when you act on the agent&apos;s recommendations
              </p>
            </div>
            <span className="inline-flex shrink-0 items-center gap-1.5 rounded-md bg-slate-50 px-2.5 py-1 text-xs font-medium text-fg-secondary">
              <Flag className="size-3.5 text-fg-tertiary" aria-hidden />
              Unlock by {data.timelineLabel}
            </span>
          </div>

          <OpportunityProgress
            identifiedMillions={data.identifiedMillions}
            realizedMillions={data.realizedMillions}
            pct={pct}
          />

          <OpportunityBreakdown
            identifiedMillions={data.identifiedMillions}
            pillars={pillars}
          />

          {stats && stats.length > 0 ? (
            <div className="mt-4">
              <SecondaryStats stats={stats} variant="embedded" />
            </div>
          ) : null}
        </CardContent>
      </Card>

      <Dialog open={calcOpen} onOpenChange={setCalcOpen}>
        <DialogContent
          className="sm:max-w-md"
          onClick={(e) => e.stopPropagation()}
        >
          <DialogHeader>
            <DialogTitle>
              How ${data.identifiedMillions.toFixed(1)}M is calculated
            </DialogTitle>
            <DialogDescription>
              Placeholder methodology — replace with the live model explanation.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3 type-body text-fg-secondary">
            <p>
              Identified opportunity aggregates projected incremental revenue
              across foundational, seasonal, and AI-visibility levers for the
              active catalog.
            </p>
            <ul className="list-disc space-y-1.5 pl-4 type-caption text-fg-tertiary">
              <li>Inputs: SKU coverage, content gaps, historical lift rates</li>
              <li>Scaling: pilot results extrapolated to in-scope SKUs</li>
              <li>Exclusions: TBD (out-of-stock, discontinued, suppressed)</li>
              <li>Refresh cadence: TBD</li>
            </ul>
            <p className="rounded-lg border border-border-default bg-surface-muted px-3 py-2 type-caption text-fg-tertiary">
              Detailed formula, confidence intervals, and source tables to be
              wired in a later pass.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
