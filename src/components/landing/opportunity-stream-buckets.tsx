"use client"

import { useRouter } from "next/navigation"
import { ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import type {
  OpportunityStreamBucket,
  OpportunityStreamKind,
} from "./types"
import { formatStreamValue } from "./opportunity-stream-format"

interface OpportunityStreamBucketsProps {
  buckets: OpportunityStreamBucket[]
  valueKind: "blocked" | "potential"
  streamId: OpportunityStreamKind
}

export function OpportunityStreamBuckets({
  buckets,
  valueKind,
  streamId,
}: OpportunityStreamBucketsProps) {
  return (
    <ul className="grid grid-cols-1 gap-4 md:grid-cols-3">
      {buckets.map((bucket) => (
        <li key={bucket.id} className="min-w-0">
          <BucketCard
            bucket={bucket}
            valueKind={valueKind}
            streamId={streamId}
          />
        </li>
      ))}
    </ul>
  )
}

function BucketCard({
  bucket,
  valueKind,
  streamId,
}: {
  bucket: OpportunityStreamBucket
  valueKind: "blocked" | "potential"
  streamId: OpportunityStreamKind
}) {
  const router = useRouter()
  const needsInput = bucket.fillMode === "input"
  const blocked = valueKind === "blocked"
  const agentLabel =
    streamId === "seasonal" ? "Agent drafts it" : "Agent fills it"

  const valueLabel = blocked ? "Blocked" : "Potential lift"

  function openBucketReview() {
    const params = new URLSearchParams({ stream: streamId, bucket: bucket.id })
    router.push(`/workbench?${params.toString()}`)
  }

  return (
    <button
      type="button"
      onClick={openBucketReview}
      className="group flex h-full w-full flex-col overflow-hidden rounded-2xl bg-slate-50 text-left transition-colors duration-200 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
    >
      <div
        className={cn(
          "flex flex-1 flex-col p-5 transition-colors duration-200 ease-out",
          blocked
            ? "group-hover:bg-warning-50"
            : "group-hover:bg-brand-25",
        )}
      >
        <div className="flex w-full items-start justify-between gap-3">
          <span
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-widest",
              blocked
                ? "bg-warning-100 text-warning-700"
                : "bg-brand-100 text-brand-700",
            )}
          >
            <span
              className={cn(
                "size-1.5 rounded-full",
                blocked ? "bg-warning-500" : "bg-brand-500",
              )}
              aria-hidden
            />
            {valueLabel}
          </span>
          <ArrowRight
            className={cn(
              "mt-0.5 size-4 shrink-0 text-slate-400 transition-[transform,color] duration-200 group-hover:translate-x-0.5",
              blocked
                ? "group-hover:text-warning-600"
                : "group-hover:text-brand-600",
            )}
            aria-hidden
          />
        </div>

        <p className="mt-3.5 font-sans text-3xl font-semibold tabular-nums tracking-[-0.04em] text-slate-950">
          {formatStreamValue(bucket.valueThousands)}
        </p>

        <p className="mt-1.5 text-sm font-medium leading-snug text-slate-700">
          {bucket.title}
        </p>

        <div className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1.5 text-xs">
          <span className="font-semibold tabular-nums text-slate-900">
            {bucket.skuCount.toLocaleString()} SKUs
          </span>
          <span className="text-slate-300" aria-hidden>
            ·
          </span>
          <span
            className={cn(
              "font-medium",
              needsInput ? "text-warning-700" : "text-slate-500",
            )}
          >
            {needsInput ? "Needs your input" : agentLabel} · {bucket.fillTime}
          </span>
        </div>
      </div>

      <p
        className={cn(
          "bg-slate-100/70 px-5 py-3 text-xs leading-relaxed text-slate-500 transition-colors duration-200 ease-out",
          blocked
            ? "group-hover:bg-warning-100 group-hover:text-slate-600"
            : "group-hover:bg-brand-50 group-hover:text-brand-950",
        )}
      >
        {blocked && bucket.releasesThousands != null ? (
          <>
            Also releases{" "}
            <span className="font-semibold text-slate-700">
              {formatStreamValue(bucket.releasesThousands)}
            </span>{" "}
            of queued content — {bucket.alsoNote}
          </>
        ) : (
          bucket.alsoNote
        )}
      </p>
    </button>
  )
}
