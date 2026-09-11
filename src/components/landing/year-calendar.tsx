"use client"

import { useState } from "react"
import type { CalendarEvent } from "./types"
import { CalendarEventSection } from "./calendar-event-section"
import { CalendarHistory } from "./calendar-history"

interface YearCalendarProps {
  yearLabel: string
  events: CalendarEvent[]
}

export function YearCalendar({ yearLabel, events }: YearCalendarProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const openEvents = events.filter((e) => e.status === "open")
  const capturedEvents = events.filter((e) => e.status === "captured")
  const forfeitedEvents = events.filter((e) => e.status === "forfeited")

  return (
    <div className="flex flex-col gap-14">
      <CalendarEventSection
        label="Upcoming opportunities"
        description={`Publish-by deadlines on your ${yearLabel} calendar — not the event dates themselves.`}
        items={openEvents}
        activeRing
        expandedId={expandedId}
        onToggle={(id) =>
          setExpandedId((prev) => (prev === id ? null : id))
        }
      />

      <CalendarHistory captured={capturedEvents} forfeited={forfeitedEvents} />
    </div>
  )
}
