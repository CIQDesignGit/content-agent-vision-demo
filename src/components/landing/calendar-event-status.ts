import { CalendarClock, CircleCheck, CircleSlash } from "lucide-react"
import type { CalendarEvent } from "./types"

/** Deadlines inside this window get the warning tone instead of brand. */
const URGENT_DAYS = 7

export function statusMeta(event: CalendarEvent) {
  if (event.status === "forfeited") {
    return {
      muted: true,
      pill: "bg-slate-100 text-slate-500 ring-slate-200",
      Icon: CircleSlash,
      label: `Window closed ${event.dateLabel} — forfeited`,
    }
  }
  if (event.status === "captured") {
    return {
      muted: false,
      pill: "bg-teal-50 text-teal-700 ring-teal-100",
      Icon: CircleCheck,
      label: `Captured ${event.dateLabel}`,
    }
  }

  const urgent = event.daysToAct != null && event.daysToAct <= URGENT_DAYS
  return {
    muted: false,
    // Only the urgent window gets colour, so it is the one thing that pulls
    // the eye down the list.
    pill: urgent
      ? "bg-warning-50 text-warning-700 ring-warning-200"
      : "bg-slate-50 text-slate-600 ring-slate-200",
    Icon: CalendarClock,
    label:
      event.daysToAct != null
        ? `Publish by ${event.dateLabel} · ${event.daysToAct} days to act`
        : `Publish by ${event.dateLabel}`,
  }
}
