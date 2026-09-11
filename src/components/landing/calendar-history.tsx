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
    accent: "bg-teal-400",
    icon: "bg-teal-50 text-teal-600 ring-teal-100",
    badge: "bg-teal-50 text-teal-700 ring-teal-100",
    value: "text-teal-700",
    Icon: CircleCheck,
  },
  forfeited: {
    accent: "bg-slate-300",
    icon: "bg-slate-50 text-slate-400 ring-slate-200",
    badge: "bg-slate-100 text-slate-500 ring-slate-200",
    value: "text-slate-400",
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
    <Card className="relative min-w-0 overflow-hidden rounded-2xl border-0 bg-white/80 ring-1 ring-slate-900/6 backdrop-blur-md shadow-pane!">
      {/* Tone lives in a hairline accent, not a filled header block. */}
      <span
        aria-hidden
        className={cn("absolute inset-x-0 top-0 h-0.5", style.accent)}
      />

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

        <ul className="divide-y divide-slate-100 border-t border-slate-100">
          {events.map((event) => (
            <li key={event.id}>
              <div className="px-5 pt-5 pb-4">
                <p
                  className={cn(
                    "font-sans text-3xl font-semibold leading-none tracking-[-0.03em] tabular-nums",
                    style.value,
                  )}
                >
                  {event.valueLabel}
                </p>
                <p className="mt-2 truncate text-sm font-semibold text-slate-900">
                  {event.name}
                </p>
              </div>
              <div className="grid grid-cols-2 border-t border-slate-100 bg-slate-50/60">
                <div className="flex items-center gap-2 px-5 py-3 text-xs text-slate-500">
                  <Package className="size-3.5 text-slate-300" aria-hidden />
                  <span className="font-medium tabular-nums">
                    {event.skuCount.toLocaleString()} SKUs
                  </span>
                </div>
                <div className="flex items-center justify-end gap-2 border-l border-slate-100 px-5 py-3 text-xs text-slate-500">
                  <CalendarDays className="size-3.5 text-slate-300" aria-hidden />
                  <span className="font-medium tabular-nums">
                    {tone === "captured" ? "Captured" : "Closed"} {event.dateLabel}
                  </span>
                </div>
              </div>
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
