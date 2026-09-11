"use client"

import { motion } from "framer-motion"
import { CircleCheck, CircleSlash } from "lucide-react"
import { Card, CardContent, cn } from "@ciq-dev/ciq-design-system"
import { fadeRiseOnScroll, staggerContainer } from "@/lib/motion"
import type { CalendarEvent } from "./types"
import { HistoryLedgerRow } from "./history-ledger-row"
import { RevealItem } from "./reveal"

const TONE = {
  captured: {
    icon: "bg-teal-50 text-teal-600 ring-teal-100",
    badge: "bg-teal-50 text-teal-700 ring-teal-100",
    value: "text-teal-700",
    Icon: CircleCheck,
  },
  /** Red is earned here — this is value the user lost by not acting. */
  forfeited: {
    icon: "bg-error-50 text-error-600 ring-error-100",
    badge: "bg-error-50 text-error-700 ring-error-100",
    value: "text-error-600",
    Icon: CircleSlash,
  },
} as const

interface HistoryCardProps {
  tone: "captured" | "forfeited"
  label: string
  description: string
  events: CalendarEvent[]
}

export function HistoryCard({
  tone,
  label,
  description,
  events,
}: HistoryCardProps) {
  if (events.length === 0) return null
  const style = TONE[tone]
  const Icon = style.Icon

  return (
    <RevealItem className="min-w-0" variants={fadeRiseOnScroll}>
      <Card className="overflow-hidden rounded-2xl border-0 bg-white/80 ring-1 ring-slate-900/6 backdrop-blur-md shadow-pane!">
        <CardContent className="p-0">
          <div className="flex items-start justify-between gap-4 px-5 pt-5 pb-4">
            <div className="flex min-w-0 items-start gap-3">
              <span
                className={cn(
                  "grid size-9 shrink-0 place-items-center rounded-xl ring-1 ring-inset",
                  style.icon,
                )}
              >
                <Icon className="size-4.5" aria-hidden />
              </span>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-slate-900">{label}</p>
                <p className="mt-0.5 text-xs leading-relaxed text-slate-400">
                  {description}
                </p>
              </div>
            </div>
            <span
              className={cn(
                "shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold tabular-nums ring-1 ring-inset",
                style.badge,
              )}
            >
              {events.length}
            </span>
          </div>

          {/* Ledger rows, not a hero figure per event — the pattern repeats
              cleanly whether there is one window or a dozen. */}
          <motion.ul
            variants={staggerContainer(0.09, 0.16)}
            className="divide-y divide-slate-100 border-t border-slate-100"
          >
            {events.map((event) => (
              <HistoryLedgerRow
                key={event.id}
                event={event}
                tone={tone}
                valueClassName={style.value}
              />
            ))}
          </motion.ul>
        </CardContent>
      </Card>
    </RevealItem>
  )
}
