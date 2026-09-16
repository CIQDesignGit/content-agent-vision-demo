"use client"

import { cn } from "@/lib/utils"
import type { OpportunityStreamKind, OpportunityStreamSku } from "./types"
import { SkuGradientThumbnail } from "@/components/sku-gradient-thumbnail"
import { formatStreamValue } from "./opportunity-stream-format"

const TYPE_PILL: Record<NonNullable<OpportunityStreamSku["findingType"]>, string> =
  {
    SEO: "bg-info-100 text-info-700",
    AEO: "bg-brand-100 text-brand-700",
  }

interface OpportunityStreamTableProps {
  kind: OpportunityStreamKind
  rows: OpportunityStreamSku[]
}

export function OpportunityStreamTable({
  kind,
  rows,
}: OpportunityStreamTableProps) {
  const showType = kind === "pdp"
  const findingHeader =
    kind === "retail-readiness" ? "Missing attributes" : "What the agent found"
  const valueHeader = kind === "retail-readiness" ? "Blocked" : "Impact"

  return (
    <div className="overflow-x-auto border-y border-slate-100/90 bg-white/80">
      <table className="w-full min-w-[640px] border-collapse text-left">
        <thead>
          <tr className="border-b border-slate-100 bg-slate-50/60 text-[10px] font-semibold uppercase tracking-[0.1em] text-slate-400">
            <th className="py-3 pl-6 pr-4 font-semibold">SKU</th>
            <th className="py-3 pr-4 font-semibold">{findingHeader}</th>
            {showType ? (
              <th className="py-3 pr-4 font-semibold">Type</th>
            ) : null}
            <th className="py-3 pr-6 text-right font-semibold">
              {valueHeader}
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr
              key={row.id}
              className="border-b border-slate-100/80 transition-colors last:border-0 hover:bg-slate-50/80"
            >
              <td className="py-3.5 pl-6 pr-4 align-middle">
                  <div className="flex items-center gap-3">
                    <SkuGradientThumbnail seed={row.asin} />
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold tracking-tight text-slate-900">
                        {row.name}
                      </p>
                      <p className="mt-0.5 font-mono text-[11px] text-slate-400">
                        {row.asin}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="py-3.5 pr-4 align-middle text-sm leading-snug text-slate-600">
                  {row.finding}
                </td>
                {showType && row.findingType ? (
                  <td className="py-3.5 pr-4 align-middle">
                    <span
                      className={cn(
                        "inline-flex rounded-full px-2 py-0.5 text-[10px] font-semibold tracking-wide",
                        TYPE_PILL[row.findingType],
                      )}
                    >
                      {row.findingType}
                    </span>
                  </td>
                ) : null}
              <td className="py-3.5 pr-6 text-right align-middle font-sans text-sm font-semibold tabular-nums tracking-tight text-slate-900">
                {formatStreamValue(row.impactThousands)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
