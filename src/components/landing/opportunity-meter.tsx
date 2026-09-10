"use client"

import { useState } from "react"
import { Flag, Info, ScanSearch } from "lucide-react"
import {
  Card,
  CardContent,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  cn,
} from "@ciq-dev/ciq-design-system"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import type { OpportunityMeterData, ValuePillar } from "./types"

interface OpportunityMeterProps {
  data: OpportunityMeterData
  pillars: ValuePillar[]
  onOpenAudit?: () => void
}

export function OpportunityMeter({
  data,
  pillars,
  onOpenAudit,
}: OpportunityMeterProps) {
  const [calcOpen, setCalcOpen] = useState(false)
  const pct = Math.min(
    100,
    Math.round((data.realizedMillions / data.identifiedMillions) * 100),
  )

  return (
    <>
      <Card
        role="button"
        tabIndex={0}
        onClick={onOpenAudit}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault()
            onOpenAudit?.()
          }
        }}
        className={cn(
          "min-w-0 flex-1 cursor-pointer border-border-default bg-surface",
          "shadow-none transition-colors hover:bg-surface-muted",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus",
        )}
      >
        <CardContent className="relative flex flex-col gap-6 p-6">
          <button
            type="button"
            aria-label="How this number is calculated"
            title="How this number is calculated"
            className="absolute right-4 top-4 grid size-7 place-items-center rounded-md text-fg-tertiary transition-colors hover:bg-surface-subtle hover:text-fg-secondary"
            onClick={(e) => {
              e.stopPropagation()
              setCalcOpen(true)
            }}
            onKeyDown={(e) => e.stopPropagation()}
          >
            <ScanSearch className="size-3.5" aria-hidden />
          </button>

          <div className="flex flex-wrap items-end justify-between gap-4 pr-8">
            <div>
              <p className="type-caption-strong uppercase tracking-wider text-fg-tertiary">
                Identified opportunity
              </p>
              <div className="mt-2 flex items-center gap-3">
                <p className="font-sans text-5xl font-semibold tracking-tight text-fg-brand tabular-nums">
                  ${data.identifiedMillions.toFixed(1)}M
                </p>
                <Flag
                  className="mb-1 size-5 shrink-0 text-action-primary fill-current"
                  aria-hidden
                />
              </div>
            </div>
            <div className="text-right">
              <p className="type-caption text-fg-tertiary">Realized so far</p>
              <p className="mt-1 type-title tabular-nums text-feedback-success">
                ${data.realizedMillions.toFixed(2)}M
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <div
              className="relative h-1.5 w-full overflow-hidden rounded-full bg-surface-subtle"
              role="progressbar"
              aria-valuenow={pct}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label={`${pct}% of identified opportunity realized`}
            >
              <div
                className="h-full rounded-full bg-feedback-success"
                style={{ width: `${pct}%` }}
              />
            </div>
            <div className="flex items-center justify-between gap-3">
              <p className="type-caption text-fg-tertiary">
                {pct}% of identified captured
              </p>
              <p className="type-caption text-fg-tertiary">
                {data.updatedLabel} · {data.rolloutLabel}
              </p>
            </div>
          </div>

          <TooltipProvider delayDuration={200}>
            <div className="grid grid-cols-3 gap-4 border-t border-border-default pt-5">
              {pillars.map((pillar) => (
                <div key={pillar.id} className="min-w-0">
                  <div className="flex items-center gap-1">
                    <p className="type-caption min-w-0 truncate text-fg-tertiary">
                      {pillar.title}
                      {pillar.tag ? <span> · {pillar.tag.label}</span> : null}
                    </p>
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
                  </div>
                  <p className="mt-1 type-title tracking-tight text-fg-secondary tabular-nums">
                    {pillar.displayValue}
                  </p>
                </div>
              ))}
            </div>
          </TooltipProvider>
        </CardContent>
      </Card>

      <Dialog open={calcOpen} onOpenChange={setCalcOpen}>
        <DialogContent
          className="sm:max-w-md"
          onClick={(e) => e.stopPropagation()}
        >
          <DialogHeader>
            <DialogTitle>How ${data.identifiedMillions.toFixed(1)}M is calculated</DialogTitle>
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
