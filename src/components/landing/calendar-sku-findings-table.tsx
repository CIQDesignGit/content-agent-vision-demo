"use client"

import { motion } from "framer-motion"
import { cn } from "@ciq-dev/ciq-design-system"
import { fadeRiseTight, staggerContainer } from "@/lib/motion"
import type { CalendarDriverKind, CalendarSkuFinding } from "./types"

/** Swatch + label instead of a tinted pill — same mapping as the chart legend,
 *  and it keeps colored chips out of a dense table. */
const DRIVER_DOT: Record<CalendarDriverKind, string> = {
  foundational: "bg-data-1",
  seasonal: "bg-data-2",
  aeo: "bg-data-3",
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
        {/* The rows trail the panel's height tween rather than racing it, so
            the findings read as the agent listing them out one at a time.
            Declares its own initial/animate — the panel above animates to
            object targets, so there is no variant state to inherit. */}
        <motion.tbody
          variants={staggerContainer(0.05, 0.14)}
          initial="hidden"
          animate="visible"
        >
          {findings.map((row) => (
            <motion.tr
              key={row.id}
              variants={fadeRiseTight}
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
                <span className="inline-flex items-center gap-2 text-xs font-medium text-slate-600">
                  <span
                    className={cn(
                      "size-2 shrink-0 rounded-full",
                      DRIVER_DOT[row.driver],
                    )}
                    aria-hidden
                  />
                  {row.driverLabel}
                </span>
              </td>
              <td className="px-4 py-3 pl-0 align-middle text-sm text-slate-600">
                {row.finding}
              </td>
            </motion.tr>
          ))}
        </motion.tbody>
      </table>
    </div>
  )
}
