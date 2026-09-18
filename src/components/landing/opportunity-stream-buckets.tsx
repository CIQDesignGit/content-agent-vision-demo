"use client"

import Link from "next/link"
import { cn } from "@/lib/utils"
import type {
  OpportunityStreamBucket,
  OpportunityStreamKind,
  UpNextActionItem,
  UpNextData,
} from "./types"
import { bucketCardTone } from "./bucket-card-tone"
import { formatStreamValue } from "./opportunity-stream-format"

interface OpportunityStreamBucketsProps {
  buckets: OpportunityStreamBucket[]
  valueKind: "blocked" | "potential"
  streamId: OpportunityStreamKind
  windowClosed?: boolean
  /** Seasonal — prepended as the first card(s) in the same grid. */
  upNext?: UpNextData
}

function valueLabelToThousands(label: string): number {
  const millions = label.match(/\$([\d.]+)\s*M/i)
  if (millions) return Math.round(parseFloat(millions[1]) * 1000)
  const thousands = label.match(/\$([\d.]+)\s*K/i)
  if (thousands) return Math.round(parseFloat(thousands[1]))
  return 0
}

function upNextToBucket(item: UpNextActionItem): OpportunityStreamBucket {
  return {
    id: `up-next-${item.id}`,
    title: item.name,
    skuCount: item.skuCount,
    fillTime: `Publish by ${item.publishBy}`,
    valueThousands: valueLabelToThousands(item.valueLabel),
    badge: "Up next",
    alsoNote: `Goes live ${item.goesLiveNote}`,
    momentId: item.id,
  }
}

function reviewHref(
  bucket: OpportunityStreamBucket,
  streamId: OpportunityStreamKind,
): string {
  if (bucket.momentId) return `/workbench?moment=${bucket.momentId}`
  const params = new URLSearchParams({ stream: streamId, bucket: bucket.id })
  return `/workbench?${params.toString()}`
}

export function OpportunityStreamBuckets({
  buckets,
  valueKind,
  streamId,
  windowClosed = false,
  upNext,
}: OpportunityStreamBucketsProps) {
  const cards = [
    ...(upNext?.items.map(upNextToBucket) ?? []),
    ...buckets,
  ]

  return (
    <ul
      className={cn(
        "grid grid-cols-1 gap-4",
        cards.length <= 2 ? "md:grid-cols-2" : "md:grid-cols-3",
      )}
    >
      {cards.map((bucket) => (
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
  const blocked = valueKind === "blocked"
  const tone = bucketCardTone({ bucket, streamId, blocked, windowClosed })
  const { ChipIcon } = tone

  return (
    <div
      className={cn(
        "group relative flex h-full w-full flex-col overflow-hidden rounded-2xl text-left transition-colors duration-200 ease-out",
        tone.surface,
      )}
    >
      <div className="relative flex min-h-0 flex-1 flex-col">
        {tone.upNext ? (
          <>
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-linear-to-b from-warning-100/80 via-warning-50/50 to-white transition-[background] duration-300 ease-out group-hover:from-warning-200/55 group-hover:via-warning-100/40 group-hover:to-white"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-[radial-gradient(ellipse_90%_100%_at_50%_-15%,var(--color-warning-200)_0%,transparent_68%)] opacity-75 transition-opacity duration-300 ease-out group-hover:opacity-95"
            />
          </>
        ) : null}

        <div
          className={cn(
            "relative z-10 flex flex-1 flex-col p-5 transition-colors duration-200 ease-out",
            tone.hover,
          )}
        >
        {bucket.valueThousands != null ? (
          <>
            <div className="flex items-start justify-between gap-3">
              <p
                className={cn(
                  "min-w-0 font-sans text-3xl font-semibold tabular-nums tracking-[-0.04em]",
                  tone.value,
                )}
              >
                {formatStreamValue(bucket.valueThousands)}
              </p>
              <span
                className={cn(
                  "inline-flex shrink-0 items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold tracking-widest",
                  !bucket.badge && "uppercase",
                  tone.chip,
                )}
              >
                {bucket.badge ? null : (
                  <ChipIcon className="size-2.5 shrink-0" aria-hidden />
                )}
                {tone.chipLabel}
              </span>
            </div>
            <p
              className={cn(
                "mt-1 text-base font-semibold leading-snug tracking-tight",
                tone.title,
              )}
            >
              {bucket.title}
            </p>
          </>
        ) : (
          <div className="flex items-start justify-between gap-3">
            <p
              className={cn(
                "min-w-0 text-base font-semibold leading-snug tracking-tight",
                tone.title,
              )}
            >
              {bucket.title}
            </p>
            <span
              className={cn(
                "inline-flex shrink-0 items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold tracking-widest",
                !bucket.badge && "uppercase",
                tone.chip,
              )}
            >
              {bucket.badge ? null : (
                <ChipIcon className="size-2.5 shrink-0" aria-hidden />
              )}
              {tone.chipLabel}
            </span>
          </div>
        )}

        <div className="mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs">
          <span className={cn("font-semibold tabular-nums", tone.skuCount)}>
            {bucket.skuCount.toLocaleString()} SKUs
          </span>
          <span className="text-slate-300" aria-hidden>
            ·
          </span>
          <span className="font-medium text-slate-500">{tone.metaLabel}</span>
        </div>
        </div>
      </div>

      <div
        className={cn(
          "relative z-10 mt-auto shrink-0 rounded-b-2xl flex flex-col gap-3 px-5 py-3 transition-colors duration-200 ease-out",
          tone.footer,
        )}
      >
        {bucket.alsoNote ||
        (blocked && bucket.releasesThousands != null) ? (
          <p className="text-xs leading-relaxed text-slate-500">
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
        ) : null}
        {!tone.captured && !tone.missed ? (
          <Link
            href={reviewHref(bucket, streamId)}
            className="text-sm font-semibold text-brand-700 underline-offset-2 transition-colors hover:text-brand-900 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
          >
            Review {bucket.skuCount.toLocaleString()} SKUs
          </Link>
        ) : null}
      </div>
    </div>
  )
}
