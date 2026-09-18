"use client"

import { AnimatePresence, motion } from "framer-motion"
import { AlertTriangle, ChevronRight, Timer } from "lucide-react"
import { cn } from "@ciq-dev/ciq-design-system"
import { DURATION, EASE_SWAP } from "@/lib/motion"
import type { OpportunityStream, UpNextData } from "./types"
import { OpportunityStreamDetail } from "./opportunity-stream-detail"

interface OpportunityStreamCardProps {
  stream: OpportunityStream
  expanded: boolean
  onToggle: () => void
  windowClosed?: boolean
  /** Seasonal — shown as the first card in the expanded bucket grid. */
  upNext?: UpNextData
}

export function OpportunityStreamCard({
  stream,
  expanded,
  onToggle,
  windowClosed = false,
  upNext,
}: OpportunityStreamCardProps) {
  const warning = stream.tone === "warning"

  return (
    <div
      className={cn(
        "relative transition-colors duration-200",
        !expanded && warning && "bg-warning-50/50",
        expanded && "bg-white",
        !expanded && !warning && "hover:bg-brand-25/30",
      )}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={expanded}
        className="group flex w-full items-center gap-4 px-6 py-5 text-left focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-brand-600"
      >
        <span
          className={cn(
            "grid size-8 shrink-0 place-items-center rounded-full bg-white/70 shadow-sm ring-1 transition-[color,background-color,box-shadow,ring-color] duration-200",
            warning
              ? expanded
                ? "text-warning-700 ring-warning-300/90 bg-warning-50/90"
                : "text-warning-600 ring-warning-200/80 group-hover:bg-warning-50 group-hover:ring-warning-300/70"
              : expanded
                ? "text-brand-700 ring-brand-200 bg-brand-50/90"
                : "text-slate-500 ring-slate-200/90 group-hover:bg-brand-50 group-hover:text-brand-700 group-hover:ring-brand-200/80",
          )}
        >
          <ChevronRight
            className={cn(
              "size-4 transition-transform duration-200 ease-out",
              expanded && "rotate-90",
            )}
            aria-hidden
          />
        </span>

        <span className="min-w-0 flex-1">
          <span className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <span className="inline-flex items-center gap-1.5 text-[15px] font-semibold tracking-tight text-slate-900">
              {warning ? (
                <AlertTriangle
                  className="size-3.5 shrink-0 text-warning-600"
                  aria-hidden
                />
              ) : null}
              {stream.title}
            </span>
            <span className="rounded-full bg-slate-100/80 px-2 py-0.5 text-[11px] font-medium tabular-nums text-slate-500">
              {stream.skuCount} SKUs
            </span>
          </span>
          <span className="mt-1 block text-sm leading-relaxed text-slate-500">
            {stream.readyPercent != null ? (
              <span className="font-semibold tabular-nums text-slate-700">
                {stream.readyPercent}%{" "}
              </span>
            ) : null}
            {stream.context}
            {stream.contextHighlight ? (
              <>
                {" "}
                <span className="inline-flex items-center gap-1 font-semibold text-brand-700">
                  <Timer
                    className="size-3.5 shrink-0 text-brand-600"
                    aria-hidden
                  />
                  {stream.contextHighlight}
                </span>
              </>
            ) : null}
          </span>
        </span>

        <span className="shrink-0 text-right">
          <span
            className={cn(
              "block text-[10px] font-semibold uppercase tracking-[0.12em]",
              warning ? "text-warning-600" : "text-slate-400",
            )}
          >
            Opportunity
          </span>
          <span
            className={cn(
              "mt-1 block font-sans text-2xl font-semibold tabular-nums tracking-[-0.03em]",
              warning ? "text-warning-700" : "text-brand-950",
            )}
          >
            {stream.valueLabel}
          </span>
        </span>
      </button>

      <AnimatePresence initial={false}>
        {expanded ? (
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
            <OpportunityStreamDetail
              stream={stream}
              windowClosed={windowClosed}
              upNext={upNext}
            />
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  )
}
