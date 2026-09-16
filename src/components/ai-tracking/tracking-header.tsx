"use client"

import { trackingMeta } from "./data"

export function TrackingHeader() {
  return (
    <div className="border-y border-slate-200 bg-white">
      <div className="mx-auto flex w-full max-w-[1200px] flex-wrap items-baseline gap-x-3 gap-y-0.5 px-6 py-3">
        <h1 className="font-sans text-xl font-semibold tracking-tight text-slate-900">
          {trackingMeta.brand}
        </h1>
        <p className="flex flex-wrap items-center gap-x-2 text-sm text-slate-500">
          <span>{trackingMeta.weekLabel}</span>
          <span className="text-slate-300" aria-hidden>
            ·
          </span>
          <span>{trackingMeta.refreshLabel}</span>
        </p>
      </div>
    </div>
  )
}
