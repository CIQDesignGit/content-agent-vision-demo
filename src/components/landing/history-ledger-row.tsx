"use client"

import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { CalendarDays, ChevronRight, Package } from "lucide-react"
import { cn } from "@ciq-dev/ciq-design-system"
import { fadeRiseTightOnScroll } from "@/lib/motion"
import type { CalendarEvent } from "./types"

interface HistoryLedgerRowProps {
  event: CalendarEvent
  tone: "captured" | "forfeited"
  valueClassName: string
}

const ROW_LAYOUT = "flex w-full items-center gap-4 px-5 py-4 text-left"

export function HistoryLedgerRow({
  event,
  tone,
  valueClassName,
}: HistoryLedgerRowProps) {
  const router = useRouter()
  // A forfeited window never published, so there is no measured impact behind
  // it to drill into — only captured rows get the affordance.
  const drillable = tone === "captured"

  const body = (
    <>
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
              {tone === "captured" ? "Captured" : "Closed"} {event.dateLabel}
            </span>
          </span>
        </p>
      </div>

      <p
        className={cn(
          "shrink-0 font-sans text-2xl font-semibold tracking-[-0.02em] tabular-nums",
          valueClassName,
        )}
      >
        {event.valueLabel}
      </p>

      {drillable ? (
        <ChevronRight
          className="size-4 shrink-0 text-slate-300 transition-[transform,color] duration-200 group-hover:translate-x-0.5 group-hover:text-slate-500"
          aria-hidden
        />
      ) : null}
    </>
  )

  return (
    <motion.li variants={fadeRiseTightOnScroll}>
      {drillable ? (
        <button
          type="button"
          onClick={() => router.push(`/impact?moment=${event.id}`)}
          aria-label={`View impact for ${event.name}`}
          className={cn(
            "group transition-colors hover:bg-slate-50/70",
            ROW_LAYOUT,
          )}
        >
          {body}
        </button>
      ) : (
        <div className={ROW_LAYOUT}>{body}</div>
      )}
    </motion.li>
  )
}
