import { CalendarDays, CircleCheck, CircleSlash, Package } from "lucide-react"
import { Card, CardContent, cn } from "@ciq-dev/ciq-design-system"
import type { CalendarEvent } from "./types"
import { SectionHeading } from "./section-heading"

interface HistoryCardProps {
  tone: "captured" | "forfeited"
  label: string
  description: string
  events: CalendarEvent[]
}

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

function HistoryCard({
  tone,
  label,
  description,
  events,
}: HistoryCardProps) {
  if (events.length === 0) return null
  const style = TONE[tone]
  const Icon = style.Icon

  return (
    <Card className="min-w-0 overflow-hidden rounded-2xl border-0 bg-white/80 ring-1 ring-slate-900/6 backdrop-blur-md shadow-pane!">
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
        <ul className="divide-y divide-slate-100 border-t border-slate-100">
          {events.map((event) => (
            <li
              key={event.id}
              className="flex items-center gap-4 px-5 py-4 transition-colors hover:bg-slate-50/70"
            >
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-slate-900">
                  {event.name}
                </p>
                <p className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate-400">
                  <span className="inline-flex items-center gap-1.5">
                    <Package className="size-3.5 shrink-0" aria-hidden />
                    <span className="font-medium tabular-nums">
                      {event.skuCount.toLocaleString()} SKUs
                    </span>
                  </span>
                  <span aria-hidden>·</span>
                  <span className="inline-flex items-center gap-1.5">
                    <CalendarDays className="size-3.5 shrink-0" aria-hidden />
                    <span className="font-medium tabular-nums">
                      {tone === "captured" ? "Captured" : "Closed"}{" "}
                      {event.dateLabel}
                    </span>
                  </span>
                </p>
              </div>
              <p
                className={cn(
                  "shrink-0 font-sans text-2xl font-semibold tracking-[-0.02em] tabular-nums",
                  style.value,
                )}
              >
                {event.valueLabel}
              </p>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

interface CalendarHistoryProps {
  captured: CalendarEvent[]
  forfeited: CalendarEvent[]
}

export function CalendarHistory({ captured, forfeited }: CalendarHistoryProps) {
  if (captured.length === 0 && forfeited.length === 0) return null

  return (
    <section aria-label="Opportunity history" className="flex flex-col gap-5">
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
    </section>
  )
}
