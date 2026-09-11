"use client"

import { useRouter } from "next/navigation"
import { ArrowUpRight } from "lucide-react"
import { Button, cn } from "@ciq-dev/ciq-design-system"
import type {
  CalendarDriverKind,
  CalendarEvent,
  CalendarSkuFinding,
  MomentDimensionInsight,
} from "./types"

const DRIVER_BADGE: Record<CalendarDriverKind, string> = {
  seasonal: "bg-sky-100 text-sky-800",
  aeo: "bg-brand-100 text-brand-800",
  foundational: "bg-slate-100 text-slate-700",
}

interface CalendarEventDetailProps {
  event: CalendarEvent
}

function LiftBreakdown({ dimensions }: { dimensions: MomentDimensionInsight[] }) {
  return (
    <ul className="grid grid-cols-3 gap-4">
      {dimensions.map((dim) => (
        <li key={dim.kind} className="min-w-0">
          <p className="font-sans text-sm font-semibold tabular-nums tracking-tight text-fg-primary">
            {dim.potential}
          </p>
          <p className="mt-0.5 text-xs text-fg-tertiary">{dim.label}</p>
        </li>
      ))}
    </ul>
  )
}

function SkuFindingsTable({ findings }: { findings: CalendarSkuFinding[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[640px] border-collapse text-left">
        <thead>
          <tr className="border-b border-slate-100 text-xs font-medium text-fg-tertiary">
            <th className="px-3 py-2.5 pr-4 font-medium">SKU</th>
            <th className="py-2.5 pr-4 text-right font-medium">Impact</th>
            <th className="py-2.5 pr-4 font-medium">Driver</th>
            <th className="px-3 py-2.5 pl-0 font-medium">What the agent found</th>
          </tr>
        </thead>
        <tbody>
          {findings.map((row) => (
            <tr key={row.id} className="border-b border-slate-100 last:border-0">
              <td className="px-3 py-3 pr-4 align-middle">
                <div className="flex items-center gap-3">
                  <img
                    src={row.imageUrl}
                    alt=""
                    className="size-10 shrink-0 rounded-md border border-slate-200 object-cover"
                  />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-fg-primary">
                      {row.name}
                    </p>
                    <p className="font-mono text-xs text-fg-tertiary">
                      {row.asin}
                    </p>
                  </div>
                </div>
              </td>
              <td className="py-3 pr-4 text-right align-middle text-sm font-semibold tabular-nums text-fg-primary">
                {row.impactLabel}
              </td>
              <td className="py-3 pr-4 align-middle">
                <span
                  className={cn(
                    "inline-flex rounded-md px-2 py-0.5 text-xs font-medium",
                    DRIVER_BADGE[row.driver],
                  )}
                >
                  {row.driverLabel}
                </span>
              </td>
              <td className="px-3 py-3 pl-0 align-middle text-sm text-fg-secondary">
                {row.finding}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export function CalendarEventDetail({ event }: CalendarEventDetailProps) {
  const router = useRouter()
  const hasInsightRow =
    Boolean(event.insightSummary) || Boolean(event.dimensions?.length)

  return (
    <div className="flex flex-col border-t border-slate-100">
      {hasInsightRow ? (
        <div className="border-b border-slate-100">
          {event.insightSummary ? (
            <div className="bg-linear-to-r from-brand-50 via-brand-50/40 to-surface px-3 py-3.5">
              <p className="text-sm leading-relaxed text-fg-secondary">
                {event.insightSummary}
              </p>
            </div>
          ) : null}

          {event.dimensions?.length ? (
            <div
              className={cn(
                "px-3 py-3",
                event.insightSummary && "border-t border-slate-200",
              )}
            >
              <LiftBreakdown dimensions={event.dimensions} />
            </div>
          ) : null}
        </div>
      ) : null}

      {event.skuFindings?.length ? (
        <SkuFindingsTable findings={event.skuFindings} />
      ) : null}

      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 px-3 py-3.5">
        {event.remainingCount != null && event.remainingValueLabel ? (
          <p className="text-sm text-fg-tertiary">
            {event.remainingCount.toLocaleString()} more SKUs worth{" "}
            {event.remainingValueLabel}, ranked by impact.
          </p>
        ) : (
          <span />
        )}
        <Button
          size="sm"
          className="shrink-0 bg-brand-800 text-action-primary-fg hover:bg-brand-900 focus:outline-brand-800"
          onClick={() => router.push(`/impact?moment=${event.id}`)}
        >
          View impact
          <ArrowUpRight className="size-3.5" aria-hidden />
        </Button>
      </div>
    </div>
  )
}
