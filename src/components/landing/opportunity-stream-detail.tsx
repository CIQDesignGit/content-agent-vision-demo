"use client"

import type { OpportunityStream, UpNextData } from "./types"
import { OpportunityStreamTable } from "./opportunity-stream-table"
import { OpportunityStreamBuckets } from "./opportunity-stream-buckets"
import { OpportunityStreamInsight } from "./opportunity-stream-insight"
import { cn } from "@/lib/utils"

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
  const warning = stream.tone === "warning"

  return (
    <div className="flex flex-col gap-5 px-6 pb-6 pt-1">
      <div className="h-px w-full bg-slate-100" aria-hidden />

      <div
        className={cn(
          "rounded-2xl px-4 py-3.5",
          warning ? "bg-warning-100/50" : "bg-brand-25",
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
        <OpportunityStreamBuckets
          buckets={stream.buckets}
          valueKind={stream.valueKind}
          streamId={stream.id}
          windowClosed={windowClosed}
          upNext={upNext}
        />
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
