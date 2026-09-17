"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import type {
  OpportunityCalculationData,
  OpportunityCalculationTabData,
  OpportunityCalculationTabId,
} from "./types"
import { OpportunityCalculationTabPane } from "./opportunity-calculation-tab-pane"

const TAB_ORDER: OpportunityCalculationTabId[] = ["annualized", "value-realized"]

function CalculationFigure({
  tab,
  selected,
  onSelect,
}: {
  tab: OpportunityCalculationTabData
  selected: boolean
  onSelect: () => void
}) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={selected}
      onClick={onSelect}
      className={cn(
        "flex min-w-0 cursor-pointer flex-col gap-1 rounded-xl px-3.5 py-3 text-left transition-[color,opacity,box-shadow]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-2",
        selected
          ? "bg-brand-50 shadow-pane"
          : "bg-transparent opacity-60 hover:bg-slate-50 hover:opacity-100",
      )}
    >
      <span className="flex items-baseline justify-between gap-3">
        <span
          className={cn(
            "min-w-0 text-xs font-medium",
            selected ? "text-brand-800" : "text-slate-700",
          )}
        >
          {tab.tabLabel}
        </span>
        <span className="shrink-0 text-[11px] font-medium tabular-nums text-slate-600">
          {tab.periodBadge}
        </span>
      </span>
      <span className="flex items-baseline gap-2">
        <span
          className={cn(
            "font-sans text-3xl font-semibold tracking-tight tabular-nums",
            selected ? "text-brand-950" : "text-slate-800",
          )}
        >
          {tab.heroAmountLabel}
        </span>
        {tab.trendBadge ? (
          <span
            className={cn(
              "text-[11px] font-semibold tabular-nums",
              tab.trendBadge.positive ? "text-success-700" : "text-slate-500",
            )}
          >
            {tab.trendBadge.label}
          </span>
        ) : null}
      </span>
    </button>
  )
}

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
    <div className="flex w-full min-w-0 flex-col gap-4 px-6 pt-7 pb-6">
      <div
        role="tablist"
        aria-label="Opportunity calculation views"
        className="grid grid-cols-1 gap-3 sm:grid-cols-2"
      >
        {TAB_ORDER.map((id) => (
          <CalculationFigure
            key={id}
            tab={tabById[id]}
            selected={activeTab === id}
            onSelect={() => setActiveTab(id)}
          />
        ))}
      </div>

      <div role="tabpanel" className="grid min-w-0">
        {TAB_ORDER.map((id) => {
          const selected = activeTab === id
          return (
            <div
              key={id}
              className={cn("min-w-0", !selected && "hidden")}
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
