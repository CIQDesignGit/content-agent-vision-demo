"use client"

import { ArrowRight } from "lucide-react"
import { Button, cn } from "@ciq-dev/ciq-design-system"
import type { OpportunityStream } from "./types"
import { OpportunityStreamTable } from "./opportunity-stream-table"
import { OpportunityStreamInsight } from "./opportunity-stream-insight"

interface OpportunityStreamDetailProps {
  stream: OpportunityStream
  onReview: () => void
}

/** Expanded body shared by every opportunity-stream accordion. */
export function OpportunityStreamDetail({
  stream,
  onReview,
}: OpportunityStreamDetailProps) {
  const warning = stream.tone === "warning"

  return (
    <div className="flex flex-col gap-5 px-6 pb-6 pt-1">
      <div
        className={cn(
          "h-px w-full",
          warning ? "bg-warning-200/70" : "bg-brand-200/60",
        )}
        aria-hidden
      />

      <div
        className={cn(
          "rounded-2xl px-4 py-3.5",
          warning ? "bg-warning-100/50" : "bg-brand-50/50",
        )}
      >
        <OpportunityStreamInsight
          markdown={stream.insight}
          warning={warning}
        />
      </div>

      {stream.queueNote ? (
        <p className="text-xs leading-relaxed text-slate-400">{stream.queueNote}</p>
      ) : null}

      <div className="-mx-6">
        <OpportunityStreamTable kind={stream.id} rows={stream.rows} />
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 px-1">
        <p className="text-xs text-slate-700">{stream.remainingLabel}</p>
        <Button
          size="sm"
          className="group shrink-0 rounded-xl bg-brand-700 font-semibold text-white hover:bg-brand-800 focus:outline-brand-700"
          onClick={onReview}
        >
          Review {stream.skuCount} SKUs
          <ArrowRight
            className="size-4 transition-transform group-hover:translate-x-0.5"
            aria-hidden
          />
        </Button>
      </div>
    </div>
  )
}
