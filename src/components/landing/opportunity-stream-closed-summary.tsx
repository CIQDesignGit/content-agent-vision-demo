import type { OpportunityStreamClosedSummary } from "./types"
import { StreamTitleTip } from "./stream-title-tip"

interface OpportunityStreamClosedSummaryProps {
  title: string
  titleTooltip?: string
  skuCount: number
  context: string
  valueLabel: string
  insight: string
  summary: OpportunityStreamClosedSummary
}

export function OpportunityStreamClosedRow({
  title,
  titleTooltip,
  skuCount,
  context,
  valueLabel,
  insight,
  summary,
}: OpportunityStreamClosedSummaryProps) {
  const capturedWidth = `${Math.max(summary.capturedPct, 2)}%`
  const uncapturedWidth = `${Math.max(100 - summary.capturedPct, 2)}%`

  return (
    <div className="flex flex-col gap-3.5 px-6 py-5">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <span className="inline-flex items-center gap-1.5 text-[15px] font-semibold tracking-tight text-slate-900">
              {title}
              {titleTooltip ? (
                <StreamTitleTip label={title} tooltip={titleTooltip} />
              ) : null}
            </span>
            <span className="rounded-full bg-slate-100/80 px-2 py-0.5 text-[11px] font-medium tabular-nums text-slate-500">
              {skuCount} SKUs
            </span>
          </div>
          <p className="mt-1 text-sm leading-relaxed text-slate-500">
            {context}
          </p>
        </div>
        <div className="shrink-0 text-right">
          <div className="text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-400">
            Identified
          </div>
          <div className="mt-1 font-sans text-2xl font-semibold tabular-nums tracking-[-0.03em] text-brand-950">
            {valueLabel}
          </div>
        </div>
      </div>

      <div
        className="flex h-2.5 overflow-hidden rounded-full bg-slate-100"
        role="img"
        aria-label={`Captured ${summary.capturedLabel}, ${summary.uncapturedKind} ${summary.uncapturedLabel}`}
      >
        <span
          className="h-full bg-success-500"
          style={{ width: capturedWidth }}
        />
        <span
          className="h-full bg-error-500"
          style={{ width: uncapturedWidth }}
        />
      </div>

      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 text-sm text-slate-700">
        <span className="inline-flex items-center gap-2">
          <span className="size-2 shrink-0 rounded-full bg-success-500" aria-hidden />
          Captured{" "}
          <span className="font-semibold tabular-nums text-slate-900">
            {summary.capturedLabel}
          </span>
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="size-2 shrink-0 rounded-full bg-error-500" aria-hidden />
          {summary.uncapturedKind}{" "}
          <span className="font-semibold tabular-nums text-slate-900">
            {summary.uncapturedLabel}
          </span>
        </span>
      </div>

      <p className="text-xs leading-relaxed text-slate-500">{insight}</p>
    </div>
  )
}
