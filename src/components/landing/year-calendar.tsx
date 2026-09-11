"use client"

import { useState, type ReactNode } from "react"
import { cn } from "@ciq-dev/ciq-design-system"
import type { CalendarEvent } from "./types"
import { CalendarEventRow } from "./calendar-event-row"
import {
  CalendarSectionDivider,
  type CalendarSectionTone,
} from "./calendar-section-divider"

interface YearCalendarProps {
  yearLabel: string
  events: CalendarEvent[]
}

export function YearCalendar({ yearLabel, events }: YearCalendarProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const openEvents = events.filter((e) => e.status === "open")
  const capturedEvents = events.filter((e) => e.status === "captured")
  const forfeitedEvents = events.filter((e) => e.status === "forfeited")

  function renderEvent(
    event: CalendarEvent,
    index: number,
    list: CalendarEvent[],
    opts: { activeRing: boolean },
  ) {
    const isLast = index === list.length - 1
    const isActive = opts.activeRing && index === 0

    return (
      <li key={event.id} className="relative flex gap-3">
        <div className="flex w-14 shrink-0 flex-col items-end pt-4">
          <span
            className={cn(
              "text-xs font-semibold tabular-nums",
              event.status === "forfeited"
                ? "text-fg-tertiary"
                : "text-fg-secondary",
            )}
          >
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
              event.status === "forfeited"
                ? "border-2 border-slate-300 bg-surface"
                : event.status === "captured"
                  ? "bg-emerald-600"
                  : isActive
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
            onToggle={() =>
              setExpandedId((prev) => (prev === event.id ? null : event.id))
            }
          />
        </div>
      </li>
    )
  }

  function EventSection({
    label,
    tone,
    items,
    activeRing,
  }: {
    label: string
    tone: CalendarSectionTone
    items: CalendarEvent[]
    activeRing: boolean
  }): ReactNode {
    if (items.length === 0) return null
    return (
      <div className="flex flex-col gap-4">
        <CalendarSectionDivider
          label={label}
          count={items.length}
          tone={tone}
        />
        <ol className="relative flex flex-col">
          {items.map((event, index) =>
            renderEvent(event, index, items, { activeRing }),
          )}
        </ol>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="type-title text-fg-primary">Upcoming opportunities</h2>
        <p className="mt-1 type-body text-fg-tertiary">
          Publish-by deadlines on your {yearLabel} calendar — not the event
          dates themselves.
        </p>
      </div>

      <div className="flex flex-col gap-8">
        <EventSection
          label="Upcoming"
          tone="upcoming"
          items={openEvents}
          activeRing
        />
        <EventSection
          label="Captured"
          tone="captured"
          items={capturedEvents}
          activeRing={false}
        />
        <EventSection
          label="Forfeited"
          tone="forfeited"
          items={forfeitedEvents}
          activeRing={false}
        />
      </div>
    </div>
  )
}
