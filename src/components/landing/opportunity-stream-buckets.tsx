"use client"

import { cn } from "@/lib/utils"
import type { OpportunityStreamBucket } from "./types"
import { formatStreamValue } from "./opportunity-stream-format"

interface OpportunityStreamBucketsProps {
  buckets: OpportunityStreamBucket[]
  onOpen?: () => void
}

export function OpportunityStreamBuckets({
  buckets,
  onOpen,
}: OpportunityStreamBucketsProps) {
  return (
    <ul className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {buckets.map((bucket) => (
        <li key={bucket.id} className="min-w-0">
          <BucketCard bucket={bucket} onOpen={onOpen} />
        </li>
      ))}
    </ul>
  )
}

function BucketCard({
  bucket,
  onOpen,
}: {
  bucket: OpportunityStreamBucket
  onOpen?: () => void
}) {
  const needsInput = bucket.fillMode === "input"

  return (
    <button
      type="button"
      onClick={onOpen}
      className="group flex h-full w-full flex-col rounded-2xl border border-warning-400 bg-white p-4 text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
    >
      

      <div className="flex items-end justify-between gap-3">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-500">
            Blocked
          </p>
          <p className="mt-1 font-sans text-2xl font-semibold tabular-nums tracking-[-0.03em] text-slate-950">
            {formatStreamValue(bucket.blockedThousands)}
          </p>
        </div>
        <div className="flex flex-col items-end gap-1.5 pb-0.5">
          <p className="text-xs font-medium tabular-nums text-slate-600">
            {bucket.skuCount} SKUs
          </p>
          <span
            className={cn(
              "rounded-full px-2 py-0.5 text-[11px] font-medium",
              needsInput
                ? "bg-warning-100 text-warning-700"
                : "bg-success-100 text-success-700",
            )}
          >
            {needsInput ? "Needs your input" : "Agent fills it"} · {bucket.fillTime}
          </span>
        </div>
      </div>

      <p className="-mx-4 mt-3 border-t border-slate-100 px-4 pt-3 text-xs leading-relaxed text-slate-500">
        Also releases{" "}
        <span className="font-semibold text-slate-700">
          {formatStreamValue(bucket.releasesThousands)}
        </span>{" "}
        of queued content — {bucket.alsoNote}
      </p>
    </button>
  )
}
