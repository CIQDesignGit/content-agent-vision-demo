"use client"

import type { ReactNode } from "react"
import { cn } from "@ciq-dev/ciq-design-system"
import type { CalendarEvent } from "./types"
import { CalendarEventRow } from "./calendar-event-row"

interface CalendarEventSectionProps {
  label: string
  description?: string
  items: CalendarEvent[]
  activeRing?: boolean
  expandedId: string | null
  onToggle: (id: string) => void
}

/** Upcoming opportunities — timeline list with expandable rows. */
export function CalendarEventSection({
  label,
  description,
  items,
  activeRing = false,
  expandedId,
  onToggle,
}: CalendarEventSectionProps): ReactNode {
  if (items.length === 0) return null

  return (
    <section aria-label={label} className="flex flex-col gap-4">
      <div>
        <h2 className="type-title text-fg-primary">{label}</h2>
        {description ? (
          <p className="mt-1 type-body text-fg-tertiary">{description}</p>
        ) : null}
      </div>

      <ol className="relative flex flex-col">
        {items.map((event, index) => {
          const isLast = index === items.length - 1
          const isActive = activeRing && index === 0

          return (
            <li key={event.id} className="relative flex gap-3">
              <div className="flex w-14 shrink-0 flex-col items-end pt-4">
                <span className="text-xs font-semibold tabular-nums text-fg-secondary">
                  {event.dateLabel}
                </span>
              </div>

              <div className="relative flex w-4 shrink-0 justify-center">
                {!isLast ? (
                  <span
                    className="absolute top-5 bottom-0 w-px bg-slate-200"
                    aria-hidden
                  />
                ) : null}
                <span
                  className={cn(
                    "relative z-10 mt-5 size-2.5 rounded-full",
                    isActive
                      ? "bg-brand-700 ring-4 ring-brand-100"
                      : "bg-slate-400",
                  )}
                  aria-hidden
                />
              </div>

              <div className={cn("min-w-0 flex-1", !isLast && "pb-2.5")}>
                <CalendarEventRow
                  event={event}
                  expanded={expandedId === event.id}
                  onToggle={() => onToggle(event.id)}
                />
              </div>
            </li>
          )
        })}
      </ol>
    </section>
  )
}
