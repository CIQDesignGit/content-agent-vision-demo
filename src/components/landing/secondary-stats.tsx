"use client"

import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { DURATION, EASE_SWAP, fadeRise, staggerContainer } from "@/lib/motion"
import { SecondaryStatCalculationPanel } from "./secondary-stat-calculation-panel"
import { ViewCalculationIcon } from "./view-calculation-icon"
import type { SecondaryStat } from "./types"

interface SecondaryStatsProps {
  stats: SecondaryStat[]
}

const panelMotion = {
  height: { duration: DURATION.base, ease: EASE_SWAP },
  opacity: { duration: DURATION.quick, ease: EASE_SWAP },
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
  const [expandedId, setExpandedId] = useState<string | null>(null)

  function toggleStat(id: string) {
    setExpandedId((current) => (current === id ? null : id))
  }

  return (
    <motion.div variants={fadeRise} className="min-w-0">
      <motion.div
        aria-label="Key performance metrics"
        className="flex flex-col items-stretch gap-3"
        variants={staggerContainer(0.06)}
      >
        {stats.map((stat) => {
          const isExpanded = expandedId === stat.id
          const isPositive = stat.deltaPositive ?? Boolean(stat.delta)
          return (
            <motion.div
              key={stat.id}
              variants={fadeRise}
              className={cn(
                "overflow-hidden rounded-2xl bg-white/70 shadow-pane backdrop-blur-md transition-shadow duration-200",
                isExpanded
                  ? "ring-2 ring-brand-300"
                  : "ring-1 ring-slate-900/5 hover:shadow-pane-hover",
              )}
            >
              <button
                type="button"
                aria-expanded={isExpanded}
                aria-controls={`stat-calc-${stat.id}`}
                onClick={() => toggleStat(stat.id)}
                className={cn(
                  "relative w-full cursor-pointer px-5 py-3 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand-500",
                  stat.calculation && "pr-8",
                  stat.accent && "border-l-[3px] border-l-brand-500",
                )}
              >
                <div className="flex items-center justify-between gap-2">
                  <p className="text-xs font-medium text-slate-500">{stat.label}</p>
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
                          ? "rounded-full bg-teal-50 px-2 py-0.5 text-[11px] font-semibold tabular-nums text-teal-700"
                          : "rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-semibold tabular-nums text-slate-600"
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
              </button>

              <AnimatePresence initial={false}>
                {isExpanded && stat.calculation ? (
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
            </motion.div>
          )
        })}
      </motion.div>
    </motion.div>
  )
}
