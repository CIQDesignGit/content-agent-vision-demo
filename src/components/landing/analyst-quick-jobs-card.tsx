"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { motion } from "framer-motion"
import {
  useProfile,
  withProfileParam,
  type ProfileId,
} from "@/components/home/profile-context"
import { DURATION, EASE_OUT } from "@/lib/motion"
import { cn } from "@/lib/utils"
import { opportunityStreams } from "./data"
import type { OpportunityStreamBucket, OpportunityStreamKind } from "./types"

const QUICK_JOBS: {
  streamId: OpportunityStreamKind
  bucketId: string
}[] = [
  { streamId: "pdp", bucketId: "pdp-b1" },
  { streamId: "retail-readiness", bucketId: "rr-mandatory" },
]

function resolveJob(job: (typeof QUICK_JOBS)[number]): {
  streamId: OpportunityStreamKind
  bucket: OpportunityStreamBucket
} | null {
  const stream = opportunityStreams.find((s) => s.id === job.streamId)
  const bucket = stream?.buckets?.find((b) => b.id === job.bucketId)
  if (!bucket) return null
  return { streamId: job.streamId, bucket }
}

function jobHref(
  streamId: OpportunityStreamKind,
  bucket: OpportunityStreamBucket,
  profileId: ProfileId,
): string {
  const href = `/workbench?${new URLSearchParams({
    stream: streamId,
    bucket: bucket.id,
  }).toString()}`
  return withProfileParam(href, profileId)
}

/** Two highest-leverage jobs beside the seasonal up-next card. */
export function AnalystQuickJobsCard({ className }: { className?: string }) {
  const { profileId } = useProfile()
  const jobs = QUICK_JOBS.map(resolveJob).filter(
    (job): job is NonNullable<typeof job> => job != null,
  )

  return (
    <motion.div
      whileHover={{ y: -1 }}
      transition={{ duration: DURATION.quick, ease: EASE_OUT }}
      className={cn(
        "relative flex h-full flex-col overflow-hidden rounded-3xl",
        "bg-white ring-1 ring-slate-200 shadow-pane-lg",
        "transition-shadow duration-200 hover:shadow-pane-hover",
        className,
      )}
    >
      <div className="border-b border-slate-100 px-5 py-3.5">
        <p className="text-[11px] font-semibold tracking-widest text-slate-400 uppercase">
          From your task list
        </p>
      </div>

      <ul className="flex flex-1 flex-col divide-y divide-slate-100">
        {jobs.map(({ streamId, bucket }) => {
          const disabled = streamId === "retail-readiness"
          const cta = bucket.ctaLabel ?? "Review SKUs"
          return (
            <li key={bucket.id} className="flex min-h-0 flex-1 flex-col">
              <div className="flex flex-1 flex-col justify-between gap-4 px-5 py-4 transition-colors hover:bg-slate-50/80">
                <div className="min-w-0">
                  {bucket.badge ? (
                    <span className="inline-flex rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-600">
                      {bucket.badge}
                    </span>
                  ) : null}
                  <p
                    className={cn(
                      "text-[15px] font-semibold leading-snug tracking-tight text-slate-900",
                      bucket.badge ? "mt-2" : null,
                    )}
                  >
                    {bucket.title}
                  </p>
                  <p className="mt-2 flex flex-wrap items-center gap-x-2 text-sm text-slate-500">
                    <span className="font-semibold tabular-nums text-slate-800">
                      {bucket.skuCount.toLocaleString()} SKUs
                    </span>
                    <span className="text-slate-300" aria-hidden>
                      ·
                    </span>
                    <span>{bucket.fillTime}</span>
                  </p>
                </div>

                {disabled ? (
                  <span
                    aria-disabled="true"
                    className="inline-flex cursor-not-allowed items-center gap-1.5 self-start text-sm font-semibold text-slate-400"
                  >
                    {cta}
                  </span>
                ) : (
                  <Link
                    href={jobHref(streamId, bucket, profileId)}
                    className="group/link inline-flex items-center gap-1.5 self-start text-sm font-semibold text-brand-700 transition-colors hover:text-brand-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
                  >
                    {cta}
                    <ArrowRight
                      className="size-3.5 transition-transform group-hover/link:translate-x-0.5"
                      aria-hidden
                    />
                  </Link>
                )}
              </div>
            </li>
          )
        })}
      </ul>
    </motion.div>
  )
}
