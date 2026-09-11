"use client"

import { ChevronRight } from "lucide-react"
import { cn } from "@ciq-dev/ciq-design-system"
import type { CalendarEvent } from "./types"
import { CalendarEventDetail } from "./calendar-event-detail"

interface CalendarEventRowProps {
  event: CalendarEvent
  expanded: boolean
  onToggle: () => void
}

function statusMeta(event: CalendarEvent) {
  if (event.status === "forfeited") {
    return {
      muted: true,
      className: "text-fg-tertiary",
      label: `Window closed ${event.dateLabel} — forfeited`,
    }
  }
  if (event.status === "captured") {
    return {
      muted: false,
      className: "font-medium text-emerald-700",
      label: `Captured ${event.dateLabel}`,
    }
  }
  return {
    muted: false,
    className: "font-medium text-brand-700",
    label:
      event.daysToAct != null
        ? `Publish by ${event.dateLabel} · ${event.daysToAct} days to act`
        : `Publish by ${event.dateLabel}`,
  }
}

export function CalendarEventRow({
  event,
  expanded,
  onToggle,
}: CalendarEventRowProps) {
  const forfeited = event.status === "forfeited"
  const meta = statusMeta(event)
  const canExpand =
    !forfeited &&
    Boolean(event.insightSummary || event.skuFindings?.length)

  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl border border-border-default bg-surface shadow-brand-soft",
        forfeited && "opacity-70",
      )}
    >
      <button
        type="button"
        onClick={canExpand ? onToggle : undefined}
        disabled={!canExpand}
        aria-expanded={canExpand ? expanded : undefined}
        className={cn(
          "flex w-full items-center gap-3 px-4 py-4 text-left",
          canExpand && "hover:bg-slate-50/80",
          !canExpand && "cursor-default",
        )}
      >
        <ChevronRight
          className={cn(
            "size-4 shrink-0 text-slate-400 transition-transform",
            expanded && "rotate-90",
            forfeited && "opacity-40",
          )}
          aria-hidden
        />

        <span
          className={cn(
            "w-40 shrink-0 truncate text-sm font-semibold",
            meta.muted ? "text-fg-tertiary" : "text-fg-primary",
          )}
        >
          {event.name}
        </span>

        <span
          className={cn(
            "w-20 shrink-0 font-sans text-base font-semibold tabular-nums tracking-tight",
            meta.muted ? "text-fg-tertiary" : "text-fg-primary",
          )}
        >
          {event.valueLabel}
        </span>

        <span className="hidden w-20 shrink-0 text-sm text-fg-tertiary sm:inline">
          {event.skuCount.toLocaleString()} SKUs
        </span>

        <span
          className={cn(
            "min-w-0 flex-1 truncate text-right text-sm",
            meta.className,
          )}
        >
          {meta.label}
        </span>
      </button>

      {expanded && canExpand ? <CalendarEventDetail event={event} /> : null}
    </div>
  )
}
