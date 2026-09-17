"use client"

import { AnimatePresence, motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { DURATION, EASE_IN_OUT, EASE_OUT, EASE_SWAP } from "@/lib/motion"
import { SecondaryStatCalculationPanel } from "./secondary-stat-calculation-panel"
import { ViewCalculationIcon } from "./view-calculation-icon"
import type { SecondaryStat } from "./types"

const panelMotion = {
  height: { duration: DURATION.calm, ease: EASE_IN_OUT },
  opacity: { duration: DURATION.quick, ease: EASE_SWAP },
}

const layoutMove = { layout: { duration: DURATION.calm, ease: EASE_IN_OUT } }

function LiveBadge() {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-teal-50 px-2 py-0.5 text-[10px] font-semibold text-teal-700">
      <span className="size-1.5 shrink-0 rounded-full bg-teal-600" aria-hidden />
      live
    </span>
  )
}

interface SecondaryStatCardProps {
  stat: SecondaryStat
  expanded: boolean
  anyExpanded: boolean
  onToggle: () => void
}

export function SecondaryStatCard({
  stat,
  expanded,
  anyExpanded,
  onToggle,
}: SecondaryStatCardProps) {
  const isPositive = stat.deltaPositive ?? Boolean(stat.delta)

  return (
    <motion.div
      layout="position"
      variants={{
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: DURATION.base, ease: EASE_OUT } },
      }}
      transition={layoutMove}
      className={cn(
        "relative flex min-h-0 flex-col rounded-2xl bg-white/70 shadow-pane backdrop-blur-md transition-shadow duration-200",
        anyExpanded ? "shrink-0" : "lg:flex-1",
        expanded
          ? "z-10 ring-2 ring-brand-300"
          : "ring-1 ring-slate-900/5 hover:shadow-pane-hover",
      )}
    >
      <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-2xl">
        <button
          type="button"
          aria-expanded={expanded}
          aria-controls={`stat-calc-${stat.id}`}
          onClick={onToggle}
          className={cn(
            "flex w-full cursor-pointer flex-col border-0 bg-transparent text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand-500",
            !anyExpanded && "lg:min-h-0 lg:flex-1 lg:justify-center",
            stat.accent && "border-l-[3px] border-l-brand-500",
          )}
        >
          <div className={cn("relative px-5 py-3", stat.calculation && "pr-8")}>
            <div className="flex items-center justify-between gap-2">
              <p className="text-sm font-semibold text-slate-700">{stat.label}</p>
              {stat.live ? <LiveBadge /> : null}
            </div>
            <div className="mt-1.5 flex flex-wrap items-baseline gap-2">
              <p className="font-sans text-2xl font-semibold tracking-tight text-slate-900 tabular-nums">
                {stat.value}
              </p>
              {stat.delta ? (
                <p
                  className={
                    isPositive
                      ? "rounded-full bg-teal-50 px-2 py-0.5 text-xs font-semibold tabular-nums text-teal-700"
                      : "rounded-full bg-slate-100 px-2 py-0.5 text-xs font-semibold tabular-nums text-slate-600"
                  }
                >
                  {stat.delta}
                </p>
              ) : null}
            </div>
            {stat.footnote ? (
              <p className="mt-2 pr-4 text-xs leading-snug text-slate-500">{stat.footnote}</p>
            ) : null}
            {stat.calculation ? (
              <span
                className="pointer-events-none absolute right-4 bottom-3.5 text-brand-600"
                aria-hidden
              >
                <ViewCalculationIcon />
              </span>
            ) : null}
          </div>

          <AnimatePresence initial={false}>
            {expanded && stat.calculation ? (
              <motion.div
                id={`stat-calc-${stat.id}`}
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={panelMotion}
                className="overflow-hidden"
              >
                <SecondaryStatCalculationPanel
                  detail={stat.calculation}
                  overlapped
                  className="h-auto rounded-none border-x-0 border-b-0 border-t border-slate-200 bg-transparent shadow-none"
                />
              </motion.div>
            ) : null}
          </AnimatePresence>
        </button>
      </div>
    </motion.div>
  )
}
