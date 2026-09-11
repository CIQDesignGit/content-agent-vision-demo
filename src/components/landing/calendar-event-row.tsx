"use client"

import { AnimatePresence, motion } from "framer-motion"
import { ChevronRight } from "lucide-react"
import { cn } from "@ciq-dev/ciq-design-system"
import { DURATION, EASE_SWAP } from "@/lib/motion"
import type { CalendarEvent } from "./types"
import { CalendarEventDetail } from "./calendar-event-detail"
import { statusMeta } from "./calendar-event-status"

interface CalendarEventRowProps {
  event: CalendarEvent
  expanded: boolean
  onToggle: () => void
}

export function CalendarEventRow({
  event,
  expanded,
  onToggle,
}: CalendarEventRowProps) {
  const forfeited = event.status === "forfeited"
  const meta = statusMeta(event)
  const canExpand =
    !forfeited &&
    Boolean(event.insightSummary || event.skuFindings?.length)
  const StatusIcon = meta.Icon

  return (
    <motion.div
      whileHover={
        canExpand && !expanded
          ? { y: -1, transition: { duration: DURATION.quick, ease: EASE_SWAP } }
          : undefined
      }
      className={cn(
        "group overflow-hidden rounded-2xl bg-white/80 ring-1 backdrop-blur-md transition-[box-shadow,background-color] duration-200",
        expanded
          ? "ring-brand-200 shadow-pane-hover"
          : "ring-slate-900/6 shadow-pane",
        canExpand && !expanded && "hover:ring-brand-200/80 hover:shadow-pane-hover",
        forfeited && "bg-white/50",
      )}
    >
      <button
        type="button"
        onClick={canExpand ? onToggle : undefined}
        disabled={!canExpand}
        aria-expanded={canExpand ? expanded : undefined}
        className={cn(
          "flex w-full items-center gap-3.5 px-4 py-4 text-left",
          !canExpand && "cursor-default",
        )}
      >
        <span
          className={cn(
            "grid size-7 shrink-0 place-items-center rounded-full transition-colors",
            canExpand
              ? "bg-slate-100 text-slate-500 group-hover:bg-brand-100 group-hover:text-brand-700"
              : "bg-slate-50 text-slate-300",
            expanded && "bg-brand-100 text-brand-700",
          )}
        >
          <ChevronRight
            className={cn("size-4 transition-transform duration-200", expanded && "rotate-90")}
            aria-hidden
          />
        </span>

        <span
          className={cn(
            "w-40 shrink-0 truncate text-sm font-semibold",
            meta.muted ? "text-slate-400" : "text-slate-900",
          )}
        >
          {event.name}
        </span>

        <span
          className={cn(
            "w-24 shrink-0 font-sans text-lg font-semibold tabular-nums tracking-[-0.02em]",
            meta.muted ? "text-slate-400" : "text-brand-950",
          )}
        >
          {event.valueLabel}
        </span>

        <span className="hidden w-24 shrink-0 text-sm tabular-nums text-slate-400 sm:inline">
          {event.skuCount.toLocaleString()} SKUs
        </span>

        <span className="flex min-w-0 flex-1 justify-end">
          <span
            className={cn(
              "inline-flex min-w-0 items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset",
              meta.pill,
            )}
          >
            <StatusIcon className="size-3.5 shrink-0" aria-hidden />
            <span className="truncate">{meta.label}</span>
          </span>
        </span>
      </button>

      {/* Height tween on open/close — the detail body is the one place on this
          page where content genuinely arrives, so it earns the movement. */}
      <AnimatePresence initial={false}>
        {expanded && canExpand ? (
          <motion.div
            key="detail"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              height: { duration: DURATION.base, ease: EASE_SWAP },
              opacity: { duration: DURATION.quick, ease: EASE_SWAP },
            }}
            className="overflow-hidden"
          >
            <CalendarEventDetail event={event} />
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.div>
  )
}
