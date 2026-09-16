"use client"

import { PartyPopper, X } from "lucide-react"
import { toast } from "sonner"
import { PublishConfetti } from "./publish-confetti"

function formatUsdCompact(value: number): string {
  if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(2)}M`
  if (value >= 1000) {
    const k = value / 1000
    return `$${Number.isInteger(k) ? k.toFixed(0) : k.toFixed(1)}k`
  }
  return `$${Math.round(value)}`
}

interface PublishSuccessToastProps {
  toastId: string | number
  identifiedMillions: number
  thisCaptureUsd?: number
}

function PublishSuccessToast({
  toastId,
  identifiedMillions,
  thisCaptureUsd,
}: PublishSuccessToastProps) {
  const capturedLabel =
    thisCaptureUsd != null && thisCaptureUsd > 0
      ? `+${formatUsdCompact(thisCaptureUsd)}`
      : null

  return (
    <div className="relative w-80 overflow-visible">
      <div className="relative z-10 rounded-xl border border-slate-200 bg-white px-4 py-3.5 shadow-2xl ring-1 ring-slate-900/10">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-xl bg-linear-to-tl from-emerald-100/50 via-emerald-50/20 to-transparent"
        />
        <button
          type="button"
          className="absolute top-2.5 right-2.5 z-10 grid size-5 place-items-center rounded text-slate-400 hover:bg-slate-100 hover:text-slate-600"
          aria-label="Dismiss"
          onClick={() => toast.dismiss(toastId)}
        >
          <X className="size-3.5" />
        </button>

        <div className="relative z-10 flex items-center gap-2.5 pr-5">
          <span className="relative grid size-5 shrink-0 place-items-center">
            <PartyPopper className="size-5 text-emerald-600" aria-hidden />
            <PublishConfetti />
          </span>
          <p className="text-sm font-semibold tracking-tight text-slate-900">
            Your changes are published
          </p>
        </div>

        {capturedLabel ? (
          <p className="relative z-10 mt-2.5 pl-7.5 text-sm leading-snug text-slate-500">
            <span className="font-semibold tabular-nums text-slate-900">
              {capturedLabel} captured
            </span>
            {" "}of ${identifiedMillions.toFixed(2)}M opportunity
          </p>
        ) : null}
      </div>
    </div>
  )
}

export function showPublishSuccessToast(opts: {
  fieldLabels: string[]
  capturedMillions: number
  identifiedMillions: number
  thisCaptureUsd?: number
}) {
  toast.custom(
    (toastId) => (
      <PublishSuccessToast
        toastId={toastId}
        identifiedMillions={opts.identifiedMillions}
        thisCaptureUsd={opts.thisCaptureUsd}
      />
    ),
    { duration: 7000, unstyled: true, className: "!overflow-visible" },
  )
}
