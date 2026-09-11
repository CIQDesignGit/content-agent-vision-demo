"use client"

import { useRouter } from "next/navigation"
import { ArrowUpRight, Sparkles } from "lucide-react"
import { Button, cn } from "@ciq-dev/ciq-design-system"
import { CalendarSkuFindingsTable } from "./calendar-sku-findings-table"
import type {
  CalendarDriverKind,
  CalendarEvent,
  MomentDimensionInsight,
} from "./types"

/** Same data ramp, same kind-to-step mapping, as the breakdown legend. */
const DRIVER_DOT: Record<CalendarDriverKind, string> = {
  foundational: "bg-data-1",
  seasonal: "bg-data-2",
  aeo: "bg-data-3",
}

interface CalendarEventDetailProps {
  event: CalendarEvent
}

function LiftBreakdown({ dimensions }: { dimensions: MomentDimensionInsight[] }) {
  return (
    <ul className="grid grid-cols-3 gap-4">
      {dimensions.map((dim) => (
        <li key={dim.kind} className="min-w-0">
          <p className="flex items-center gap-1.5 text-xs text-slate-500">
            <span
              className={cn("size-2 shrink-0 rounded-full", DRIVER_DOT[dim.kind])}
              aria-hidden
            />
            <span className="truncate">{dim.label}</span>
          </p>
          <p className="mt-1 pl-3.5 font-sans text-base font-semibold tabular-nums tracking-tight text-slate-900">
            {dim.potential}
          </p>
        </li>
      ))}
    </ul>
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
            <div className="flex items-start gap-3 bg-brand-50/60 px-4 py-4">
              <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-white text-brand-600 ring-1 ring-brand-100">
                <Sparkles className="size-3.5" aria-hidden />
              </span>
              <p className="text-sm leading-relaxed text-slate-600">
                {event.insightSummary}
              </p>
            </div>
          ) : null}

          {event.dimensions?.length ? (
            <div
              className={cn(
                "px-4 py-4",
                event.insightSummary && "border-t border-brand-100",
              )}
            >
              <LiftBreakdown dimensions={event.dimensions} />
            </div>
          ) : null}
        </div>
      ) : null}

      {event.skuFindings?.length ? (
        <CalendarSkuFindingsTable findings={event.skuFindings} />
      ) : null}

      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 bg-slate-50/60 px-4 py-3.5">
        {event.remainingCount != null && event.remainingValueLabel ? (
          <p className="text-sm text-slate-500">
            {event.remainingCount.toLocaleString()} more SKUs worth{" "}
            {event.remainingValueLabel}, ranked by impact.
          </p>
        ) : (
          <span />
        )}
        <Button
          size="sm"
          className="group shrink-0 rounded-lg bg-brand-800 text-action-primary-fg hover:bg-brand-900 focus:outline-brand-800"
          onClick={() => router.push(`/workbench?moment=${event.id}`)}
        >
          Take Action
          <ArrowUpRight
            className="size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            aria-hidden
          />
        </Button>
      </div>
    </div>
  )
}
