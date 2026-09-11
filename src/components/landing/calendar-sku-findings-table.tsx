"use client"

import { cn } from "@ciq-dev/ciq-design-system"
import type { CalendarDriverKind, CalendarSkuFinding } from "./types"

const DRIVER_BADGE: Record<CalendarDriverKind, string> = {
  seasonal: "bg-sky-50 text-sky-700 ring-sky-100",
  aeo: "bg-teal-50 text-teal-700 ring-teal-100",
  foundational: "bg-brand-50 text-brand-700 ring-brand-100",
}

export function CalendarSkuFindingsTable({
  findings,
}: {
  findings: CalendarSkuFinding[]
}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[640px] border-collapse text-left">
        <thead>
          <tr className="border-b border-slate-100 text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-400">
            <th className="px-4 py-3 pr-4 font-semibold">SKU</th>
            <th className="py-3 pr-4 text-right font-semibold">Impact</th>
            <th className="py-3 pr-4 font-semibold">Driver</th>
            <th className="px-4 py-3 pl-0 font-semibold">What the agent found</th>
          </tr>
        </thead>
        <tbody>
          {findings.map((row) => (
            <tr
              key={row.id}
              className="border-b border-slate-100 transition-colors last:border-0 hover:bg-slate-50/70"
            >
              <td className="px-4 py-3 pr-4 align-middle">
                <div className="flex items-center gap-3">
                  <img
                    src={row.imageUrl}
                    alt=""
                    className="size-10 shrink-0 rounded-lg object-cover ring-1 ring-slate-200"
                  />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-slate-900">
                      {row.name}
                    </p>
                    <p className="font-mono text-xs text-slate-400">{row.asin}</p>
                  </div>
                </div>
              </td>
              <td className="py-3 pr-4 text-right align-middle font-sans text-sm font-semibold tabular-nums text-slate-900">
                {row.impactLabel}
              </td>
              <td className="py-3 pr-4 align-middle">
                <span
                  className={cn(
                    "inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset",
                    DRIVER_BADGE[row.driver],
                  )}
                >
                  {row.driverLabel}
                </span>
              </td>
              <td className="px-4 py-3 pl-0 align-middle text-sm text-slate-600">
                {row.finding}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
