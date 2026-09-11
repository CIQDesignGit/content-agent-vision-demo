"use client"

import type { CalendarEvent } from "./types"
import { HistoryCard } from "./history-card"
import { RevealGroup } from "./reveal"
import { SectionHeading } from "./section-heading"

interface CalendarHistoryProps {
  captured: CalendarEvent[]
  forfeited: CalendarEvent[]
}

export function CalendarHistory({ captured, forfeited }: CalendarHistoryProps) {
  if (captured.length === 0 && forfeited.length === 0) return null

  return (
    <RevealGroup
      as="section"
      aria-label="Opportunity history"
      className="flex flex-col gap-5"
      stagger={0.18}
      onScroll
    >
      <SectionHeading
        title="Opportunity history"
        description="Past windows — lift you already banked, and value that closed without action."
      />

      <div className="grid gap-4 lg:grid-cols-2">
        <HistoryCard
          tone="captured"
          label="Captured"
          description="Made it live in time — already contributing to incremental sales."
          events={captured}
        />
        <HistoryCard
          tone="forfeited"
          label="Forfeited"
          description="Closed before publish — excluded from your active opportunity total."
          events={forfeited}
        />
      </div>
    </RevealGroup>
  )
}
