"use client"

import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { DURATION, EASE_SWAP, fadeRise, staggerContainer } from "@/lib/motion"
import { SecondaryStatCalculationPanel } from "./secondary-stat-calculation-panel"
import { ViewCalculationIcon } from "./view-calculation-icon"
import type { SecondaryStat } from "./types"

/** Panel slides out from under the tile by this much (matches wrapper -mt / pt). */
const TILE_PANEL_OVERLAP_PX = 16

interface SecondaryStatsProps {
  stats: SecondaryStat[]
}

function LiveBadge() {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-teal-50 px-2 py-0.5 text-[10px] font-semibold text-teal-700">
      <span className="size-1.5 shrink-0 rounded-full bg-teal-600" aria-hidden />
      live
    </span>
  )
}

export function SecondaryStats({ stats }: SecondaryStatsProps) {
  const [expandedIds, setExpandedIds] = useState<Set<string>>(() => new Set())

  function toggleStat(id: string) {
    setExpandedIds((current) => {
      const next = new Set(current)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  return (
    <motion.div variants={fadeRise}>
      <motion.div
        aria-label="Key performance metrics"
        className="grid grid-cols-1 items-start gap-4 md:grid-cols-3 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_340px]"
        variants={staggerContainer(0.06)}
      >
        {stats.map((stat) => {
          const isPositive = stat.deltaPositive ?? Boolean(stat.delta)
          const isExpanded = expandedIds.has(stat.id)
          return (
            <motion.div
              key={stat.id}
              variants={fadeRise}
              className="flex min-w-0 flex-col overflow-visible"
            >
              <motion.button
                type="button"
                whileHover={
                  isExpanded
                    ? undefined
                    : {
                        y: -2,
                        transition: { duration: DURATION.quick, ease: EASE_SWAP },
                      }
                }
                aria-expanded={isExpanded}
                aria-controls={`stat-calc-${stat.id}`}
                onClick={() => toggleStat(stat.id)}
                className={cn(
                  "relative z-10 w-full cursor-pointer bg-white/70 px-5 py-4 text-left ring-1 ring-slate-900/5 shadow-pane backdrop-blur-md transition-[box-shadow,ring-color,border-radius] duration-200 hover:shadow-pane-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500",
                  isExpanded
                    ? "rounded-t-2xl rounded-b-none border border-b-0 border-slate-200 ring-2 ring-brand-300 shadow-pane-hover"
                    : "rounded-2xl",
                  stat.calculation && !isExpanded && "pr-5",
                  stat.accent && "border-l-[3px] border-l-brand-500",
                )}
              >
                <div className="flex items-center justify-between gap-2">
                  <p className="text-xs font-medium text-slate-500">{stat.label}</p>
                  {stat.live ? <LiveBadge /> : null}
                </div>
                <div className="mt-2 flex flex-wrap items-baseline gap-2">
                  <p className="font-sans text-2xl font-semibold tracking-tight text-slate-900 tabular-nums">
                    {stat.value}
                  </p>
                  {stat.delta ? (
                    <p
                      className={
                        isPositive
                          ? "rounded-full bg-teal-50 px-2 py-0.5 text-[11px] font-semibold tabular-nums text-teal-700"
                          : "rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-semibold tabular-nums text-slate-600"
                      }
                    >
                      {stat.delta}
                    </p>
                  ) : null}
                </div>
                {stat.footnote ? (
                  <p
                    className={cn(
                      "mt-2.5 text-xs leading-snug text-slate-500",
                      stat.calculation && !isExpanded && "pr-6",
                    )}
                  >
                    {stat.footnote}
                  </p>
                ) : null}
                {stat.calculation && !isExpanded ? (
                  <span
                    className="pointer-events-none absolute bottom-4 right-5 text-brand-600"
                    aria-hidden
                  >
                    <ViewCalculationIcon />
                  </span>
                ) : null}
              </motion.button>

              <AnimatePresence initial={false}>
                {isExpanded && stat.calculation ? (
                  <motion.div
                    id={`stat-calc-${stat.id}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: DURATION.base, ease: EASE_SWAP }}
                    style={{ marginTop: -TILE_PANEL_OVERLAP_PX, paddingTop: TILE_PANEL_OVERLAP_PX }}
                    className="relative z-0 overflow-hidden px-px pb-px"
                  >
                    <SecondaryStatCalculationPanel detail={stat.calculation} overlapped />
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </motion.div>
          )
        })}
      </motion.div>
    </motion.div>
  )
}
