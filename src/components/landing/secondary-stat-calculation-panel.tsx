"use client"

import { cn } from "@/lib/utils"
import type { SecondaryStatCalculation } from "./types"

interface SecondaryStatCalculationPanelProps {
  detail: SecondaryStatCalculation
  /** Extra top padding when the panel tucks under the tile */
  overlapped?: boolean
  className?: string
}

export function SecondaryStatCalculationPanel({
  detail,
  overlapped = false,
  className,
}: SecondaryStatCalculationPanelProps) {
  return (
    <div
      className={cn(
        overlapped
          ? "flex min-h-120 flex-col rounded-b-2xl rounded-t-none border border-t-0 border-slate-200 bg-white px-6 pb-5 pt-7 shadow-pane"
          : "rounded-2xl border border-slate-200 bg-white px-6 py-5 shadow-pane",
        className,
      )}
    >
      <h3 className="text-base font-semibold text-slate-900">{detail.title}</h3>
      <dl className="mt-4 flex shrink-0 flex-col">
        {detail.rows.map((row) => (
          <div
            key={row.label}
            className="flex items-baseline justify-between gap-4 border-b border-slate-200 py-3 first:pt-0"
          >
            <dt className="text-sm text-slate-600">{row.label}</dt>
            <dd className="shrink-0 text-sm font-semibold tabular-nums text-slate-900">
              {row.value}
            </dd>
          </div>
        ))}
        {detail.summaryRow ? (
          <div className="flex items-baseline justify-between gap-4 border-t-2 border-slate-900 py-3">
            <dt className="text-sm font-medium text-slate-900">
              {detail.summaryRow.label}
            </dt>
            <dd className="shrink-0 text-sm font-semibold tabular-nums text-slate-900">
              {detail.summaryRow.value}
            </dd>
          </div>
        ) : null}
      </dl>
      <p
        className={
          overlapped
            ? "mt-auto pt-4 text-sm leading-relaxed text-slate-500"
            : "mt-4 text-sm leading-relaxed text-slate-500"
        }
      >
        {detail.methodology}
      </p>
    </div>
  )
}
