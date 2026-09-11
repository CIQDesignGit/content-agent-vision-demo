import { CalendarDays, CircleCheck, CircleSlash, Package } from "lucide-react"
import { Card, CardContent, cn } from "@ciq-dev/ciq-design-system"
import type { CalendarEvent } from "./types"

interface HistoryCardProps {
  tone: "captured" | "forfeited"
  label: string
  description: string
  events: CalendarEvent[]
}

const TONE = {
  captured: {
    card: "!border-success-100",
    header: "border-success-100 bg-success-50/70",
    badge: "bg-success-100 text-success-700",
    icon: "bg-success-100 text-success-700",
    value: "text-success-700",
    Icon: CircleCheck,
  },
  forfeited: {
    card: "!border-slate-200",
    header: "border-slate-200 bg-slate-50/80",
    badge: "bg-slate-200 text-slate-700",
    icon: "bg-slate-200 text-slate-600",
    value: "text-fg-tertiary",
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
    <Card
      className={cn(
        "min-w-0 overflow-hidden rounded-2xl bg-surface shadow-brand-soft!",
        style.card,
      )}
    >
      <CardContent className="p-0">
        <div
          className={cn(
            "flex items-start justify-between gap-4 border-b px-5 py-4",
            style.header,
          )}
        >
          <div className="flex min-w-0 items-start gap-3">
            <span
              className={cn(
                "grid size-9 shrink-0 place-items-center rounded-lg",
                style.icon,
              )}
            >
              <Icon className="size-4.5" aria-hidden />
            </span>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-fg-primary">{label}</p>
              <p className="mt-0.5 text-xs leading-relaxed text-fg-tertiary">
                {description}
              </p>
            </div>
          </div>
          <span
            className={cn(
              "shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold tabular-nums",
              style.badge,
            )}
          >
            {events.length}
          </span>
        </div>

        <ul className="divide-y divide-slate-100">
          {events.map((event) => (
            <li key={event.id}>
              <div className="px-5 py-5">
                <p className={cn("font-sans text-3xl font-semibold tracking-tight tabular-nums", style.value)}>
                  {event.valueLabel}
                </p>
                <p className="mt-1.5 truncate text-sm font-semibold text-fg-primary">
                  {event.name}
                </p>
              </div>
              <div className="grid grid-cols-2 border-t border-slate-100 bg-surface-muted/50">
                <div className="flex items-center gap-2 px-5 py-3 text-xs text-fg-secondary">
                  <Package className="size-3.5 text-fg-tertiary" aria-hidden />
                  <span className="font-medium tabular-nums">
                    {event.skuCount.toLocaleString()} SKUs
                  </span>
                </div>
                <div className="flex items-center justify-end gap-2 border-l border-slate-100 px-5 py-3 text-xs text-fg-secondary">
                  <CalendarDays className="size-3.5 text-fg-tertiary" aria-hidden />
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
      <div>
        <h2 className="type-title text-fg-primary">Opportunity history</h2>
        <p className="mt-1 type-body text-fg-tertiary">
          Past windows — lift you already banked, and value that closed without
          action.
        </p>
      </div>

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
