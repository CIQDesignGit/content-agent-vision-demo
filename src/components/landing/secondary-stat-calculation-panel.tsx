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
          ? "flex h-full flex-col rounded-b-2xl rounded-t-none border border-t-0 border-slate-200 bg-white px-4 pt-2.5 pb-3 shadow-pane"
          : "rounded-2xl border border-slate-200 bg-white px-6 py-5 shadow-pane",
        className,
      )}
    >
      {overlapped ? null : (
        <h3 className="text-base font-semibold text-slate-900">{detail.title}</h3>
      )}
      <dl className={cn("flex shrink-0 flex-col", overlapped ? "" : "mt-4")}>
        {detail.rows.map((row) => (
          <div
            key={row.label}
            className={cn(
              "flex items-baseline justify-between gap-3 border-b border-slate-200 first:pt-0",
              overlapped ? "py-1" : "gap-4 py-3",
            )}
          >
            <dt className={cn("text-slate-600", overlapped ? "text-xs" : "text-sm")}>{row.label}</dt>
            <dd
              className={cn(
                "shrink-0 font-semibold tabular-nums text-slate-900",
                overlapped ? "text-xs" : "text-sm",
              )}
            >
              {row.value}
            </dd>
          </div>
        ))}
        {detail.summaryRow ? (
          <div
            className={cn(
              "flex items-baseline justify-between gap-3 border-t-2 border-slate-900",
              overlapped ? "py-1" : "gap-4 py-3",
            )}
          >
            <dt className={cn("font-medium text-slate-900", overlapped ? "text-xs" : "text-sm")}>
              {detail.summaryRow.label}
            </dt>
            <dd
              className={cn(
                "shrink-0 font-semibold tabular-nums text-slate-900",
                overlapped ? "text-xs" : "text-sm",
              )}
            >
              {detail.summaryRow.value}
            </dd>
          </div>
        ) : null}
      </dl>
      <p
        className={
          overlapped
            ? "mt-2 text-xs leading-snug text-slate-500"
            : "mt-4 text-sm leading-relaxed text-slate-500"
        }
      >
        {detail.methodology}
      </p>
    </div>
  )
}
