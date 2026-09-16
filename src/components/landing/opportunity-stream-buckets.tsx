"use client"

import { useRouter } from "next/navigation"
import { ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import type {
  OpportunityStreamBucket,
  OpportunityStreamKind,
} from "./types"
import { bucketCardTone } from "./bucket-card-tone"
import { formatStreamValue } from "./opportunity-stream-format"

interface OpportunityStreamBucketsProps {
  buckets: OpportunityStreamBucket[]
  valueKind: "blocked" | "potential"
  streamId: OpportunityStreamKind
  windowClosed?: boolean
}

export function OpportunityStreamBuckets({
  buckets,
  valueKind,
  streamId,
  windowClosed = false,
}: OpportunityStreamBucketsProps) {
  return (
    <ul className="grid grid-cols-1 gap-4 md:grid-cols-3">
      {buckets.map((bucket) => (
        <li key={bucket.id} className="min-w-0">
          <BucketCard
            bucket={bucket}
            valueKind={valueKind}
            streamId={streamId}
            windowClosed={windowClosed}
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
  windowClosed,
}: {
  bucket: OpportunityStreamBucket
  valueKind: "blocked" | "potential"
  streamId: OpportunityStreamKind
  windowClosed: boolean
}) {
  const router = useRouter()
  const blocked = valueKind === "blocked"
  const tone = bucketCardTone({ bucket, streamId, blocked, windowClosed })
  const { ChipIcon } = tone

  function openBucketReview() {
    const params = new URLSearchParams({ stream: streamId, bucket: bucket.id })
    router.push(`/workbench?${params.toString()}`)
  }

  return (
    <button
      type="button"
      onClick={openBucketReview}
      className={cn(
        "group flex h-full w-full flex-col overflow-hidden rounded-2xl text-left transition-colors duration-200 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600",
        tone.surface,
      )}
    >
      <div
        className={cn(
          "flex flex-1 flex-col p-5 transition-colors duration-200 ease-out",
          tone.hover,
        )}
      >
        <div className="flex w-full items-start justify-between gap-3">
          <span
            className={cn(
              "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-widest",
              tone.chip,
            )}
          >
            <ChipIcon className="size-2.5" aria-hidden />
            {tone.chipLabel}
          </span>
          <ArrowRight
            className={cn(
              "mt-0.5 size-4 shrink-0 text-slate-400 transition-[transform,color] duration-200 group-hover:translate-x-0.5",
              tone.arrowHover,
            )}
            aria-hidden
          />
        </div>

        <p
          className={cn(
            "mt-3.5 font-sans text-3xl font-semibold tabular-nums tracking-[-0.04em]",
            tone.value,
          )}
        >
          {formatStreamValue(bucket.valueThousands)}
        </p>

        <p className={cn("mt-1.5 text-sm font-medium leading-snug", tone.title)}>
          {bucket.title}
        </p>

        <div className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1.5 text-xs">
          <span className={cn("font-semibold tabular-nums", tone.skuCount)}>
            {bucket.skuCount.toLocaleString()} SKUs
          </span>
          <span className="text-slate-300" aria-hidden>
            ·
          </span>
          <span className="font-medium text-slate-500">{tone.metaLabel}</span>
        </div>
      </div>

      <p
        className={cn(
          "px-5 py-3 text-xs leading-relaxed text-slate-500 transition-colors duration-200 ease-out",
          tone.footer,
        )}
      >
        {blocked && bucket.releasesThousands != null ? (
          <>
            {windowClosed ? "Also released " : "Also releases "}
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
