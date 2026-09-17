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
        "flex min-w-0 cursor-pointer flex-col gap-1 rounded-t-2xl px-3.5 py-3 text-left transition-[color,opacity,background-color]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-2",
        selected
          ? "relative z-10 border border-slate-200 border-b-white bg-white"
          : "rounded-b-2xl bg-transparent opacity-55 hover:bg-white/60 hover:opacity-100",
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
    <div className="flex w-full min-w-0 flex-col px-4 pt-4 pb-3">
      {/* The selected figure's fill runs straight into the breakdown below it, so
          the two read as one region without needing a stroke around them. */}
      <div
        role="tablist"
        aria-label="Opportunity calculation views"
        className="relative z-10 grid grid-cols-1 gap-x-3 sm:grid-cols-2"
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

      <div
        role="tabpanel"
        className={cn(
          "-mt-px grid min-w-0 rounded-b-2xl border border-slate-200 bg-white px-3.5 pt-2.5 pb-3",
          activeTab === TAB_ORDER[0] ? "rounded-tr-2xl" : "rounded-tl-2xl",
        )}
      >
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
