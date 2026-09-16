"use client"

import { Suspense } from "react"
import { useSearchParams } from "next/navigation"
import {
  dateRangeHeadline,
  dateRangesForYear,
  resolveDateRange,
} from "@/components/landing/date-range"
import { trackingMeta } from "./data"

function TrackingPeriodLabel() {
  const searchParams = useSearchParams()
  const year = new Date().getFullYear()
  const selected = resolveDateRange(searchParams.get("range"), year)

  return (
    <p className="flex flex-wrap items-center gap-x-2 text-sm font-medium text-slate-600">
      <span>{dateRangeHeadline(selected)}</span>
      <span className="text-xs font-normal tabular-nums text-slate-400">
        {selected.span}
      </span>
    </p>
  )
}

function TrackingPeriodFallback() {
  const selected = dateRangesForYear(new Date().getFullYear())[0]
  return (
    <p className="flex flex-wrap items-center gap-x-2 text-sm font-medium text-slate-600">
      <span>{dateRangeHeadline(selected)}</span>
      <span className="text-xs font-normal tabular-nums text-slate-400">
        {selected.span}
      </span>
    </p>
  )
}

export function TrackingHeader() {
  return (
    <div className="border-y border-slate-200 bg-white">
      <div className="mx-auto flex w-full max-w-[1200px] flex-wrap items-baseline gap-x-3 gap-y-0.5 px-6 py-3">
        <h1 className="font-sans text-xl font-semibold tracking-tight text-slate-900">
          {trackingMeta.brand}
        </h1>
        <Suspense fallback={<TrackingPeriodFallback />}>
          <TrackingPeriodLabel />
        </Suspense>
      </div>
    </div>
  )
}
