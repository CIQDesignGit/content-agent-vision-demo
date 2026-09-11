"use client"

import type { ReactNode } from "react"
import { motion } from "framer-motion"
import { cn } from "@ciq-dev/ciq-design-system"
import { drawDownOnScroll, fadeRiseOnScroll } from "@/lib/motion"
import type { CalendarEvent } from "./types"
import { CalendarEventRow } from "./calendar-event-row"
import { RevealGroup } from "./reveal"
import { SectionHeading } from "./section-heading"

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
    <RevealGroup
      as="section"
      aria-label={label}
      className="flex flex-col gap-5"
      stagger={0.14}
      onScroll
    >
      <SectionHeading title={label} description={description} />

      <ol className="relative flex flex-col">
        {items.map((event, index) => {
          const isLast = index === items.length - 1
          const isActive = activeRing && index === 0

          return (
            <motion.li
              key={event.id}
              variants={fadeRiseOnScroll}
              className="relative flex gap-3"
            >
              <div className="flex w-14 shrink-0 flex-col items-end pt-4">
                <span
                  className={cn(
                    "text-xs font-semibold tabular-nums",
                    isActive ? "text-brand-700" : "text-slate-400",
                  )}
                >
                  {event.dateLabel}
                </span>
              </div>

              <div className="relative flex w-4 shrink-0 justify-center">
                {!isLast ? (
                  // Draws downward as each row lands, so the spine appears to
                  // thread the list together rather than being there already.
                  <motion.span
                    variants={drawDownOnScroll}
                    className="absolute top-5 bottom-0 w-px origin-top bg-linear-to-b from-slate-300 to-slate-200"
                    aria-hidden
                  />
                ) : null}
                <span
                  className={cn(
                    "relative z-10 mt-5 rounded-full",
                    isActive
                      ? "size-2.5 bg-brand-600 ring-4 ring-brand-200/70"
                      : "size-2 bg-slate-300 ring-3 ring-slate-50",
                  )}
                  aria-hidden
                />
              </div>

              <div className={cn("min-w-0 flex-1", !isLast && "pb-3")}>
                <CalendarEventRow
                  event={event}
                  expanded={expandedId === event.id}
                  onToggle={() => onToggle(event.id)}
                />
              </div>
            </motion.li>
          )
        })}
      </ol>
    </RevealGroup>
  )
}
