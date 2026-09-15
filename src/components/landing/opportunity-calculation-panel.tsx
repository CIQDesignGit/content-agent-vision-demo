"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { swapTransition } from "@/lib/motion"
import type {
  OpportunityCalculationData,
  OpportunityCalculationTabId,
} from "./types"
import { OpportunityCalculationTabPane } from "./opportunity-calculation-tab-pane"

const TAB_ORDER: OpportunityCalculationTabId[] = ["annualized", "value-realized"]

interface OpportunityCalculationPanelProps {
  data: OpportunityCalculationData
}

export function OpportunityCalculationPanel({
  data,
}: OpportunityCalculationPanelProps) {
  const [activeTab, setActiveTab] =
    useState<OpportunityCalculationTabId>("annualized")

  const tabById = {
    annualized: data.annualized,
    "value-realized": data.valueRealized,
  } as const

  return (
    <div className="flex w-full min-w-0 flex-col gap-2.5 px-6 pb-5 pt-5">
      <div
        role="tablist"
        aria-label="Opportunity calculation views"
        className="inline-flex w-fit max-w-full rounded-lg bg-slate-100/80 p-0.5 ring-1 ring-slate-900/5"
      >
        {TAB_ORDER.map((id) => {
          const tab = tabById[id]
          const selected = activeTab === id
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={selected}
              onClick={() => setActiveTab(id)}
              className={cn(
                "relative whitespace-nowrap rounded-md px-3 py-1 text-[11px] font-semibold leading-tight transition-colors sm:text-xs",
                selected ? "text-slate-900" : "text-slate-500 hover:text-slate-700",
              )}
            >
              {selected ? (
                <motion.span
                  layoutId="opportunity-calc-tab-thumb"
                  aria-hidden
                  className="absolute inset-0 rounded-md bg-white shadow-sm ring-1 ring-slate-900/5"
                  transition={swapTransition}
                />
              ) : null}
              <span className="relative">{tab.tabLabel}</span>
            </button>
          )
        })}
      </div>

      <div role="tabpanel" className="grid min-w-0">
        {TAB_ORDER.map((id) => {
          const selected = activeTab === id
          return (
            <div
              key={id}
              className={cn(
                "col-start-1 row-start-1 min-w-0",
                !selected && "invisible pointer-events-none",
              )}
              aria-hidden={!selected}
            >
              <OpportunityCalculationTabPane tab={tabById[id]} />
            </div>
          )
        })}
      </div>
    </div>
  )
}
