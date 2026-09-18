"use client"

import { useRouter } from "next/navigation"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { OpportunityStream, UpNextData } from "./types"
import { OpportunityStreamTable } from "./opportunity-stream-table"
import { OpportunityStreamBuckets } from "./opportunity-stream-buckets"
import { OpportunityStreamInsight } from "./opportunity-stream-insight"

interface OpportunityStreamDetailProps {
  stream: OpportunityStream
  windowClosed?: boolean
  upNext?: UpNextData
}

/** Expanded body shared by every opportunity-stream accordion. */
export function OpportunityStreamDetail({
  stream,
  windowClosed = false,
  upNext,
}: OpportunityStreamDetailProps) {
  const router = useRouter()
  const warning = stream.tone === "warning"

  function reviewAll() {
    router.push(`/workbench?stream=${stream.id}`)
  }

  return (
    <div className="flex flex-col gap-5 px-6 pb-6 pt-1">
      <div className="h-px w-full bg-slate-100" aria-hidden />

      <div
        className={cn(
          "rounded-2xl px-4 py-3.5",
          warning ? "bg-warning-100/50" : "bg-brand-50",
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

      {stream.buckets ? (
        <>
          <OpportunityStreamBuckets
            buckets={stream.buckets}
            valueKind={stream.valueKind}
            streamId={stream.id}
            windowClosed={windowClosed}
            upNext={upNext}
          />
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-slate-500">
              These issues are a slice of the queue — or open every SKU at once.
            </p>
            <Button
              className="group h-9 shrink-0 rounded-lg bg-brand-800 px-3.5 text-sm font-semibold text-white hover:bg-brand-900 focus-visible:outline-brand-800"
              onClick={reviewAll}
            >
              Review all {stream.skuCount.toLocaleString()} SKUs
              <ArrowRight
                className="size-3.5 transition-transform group-hover:translate-x-0.5"
                aria-hidden
              />
            </Button>
          </div>
        </>
      ) : (
        <>
          <div className="-mx-6">
            <OpportunityStreamTable kind={stream.id} rows={stream.rows} />
          </div>
          <p className="px-1 text-xs text-slate-700">{stream.remainingLabel}</p>
        </>
      )}
    </div>
  )
}
