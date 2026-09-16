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
  className,
}: {
  tab: OpportunityCalculationTabData
  selected: boolean
  onSelect: () => void
  className?: string
}) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={selected}
      onClick={onSelect}
      className={cn(
        "flex min-w-0 cursor-pointer flex-col gap-1 py-1 text-left",
        !selected && "group/figure",
        className,
      )}
    >
      <span className="flex items-baseline justify-between gap-3">
        <span
          className={cn(
            "min-w-0 text-xs font-medium",
            selected
              ? "text-slate-700"
              : "text-slate-500 underline decoration-transparent underline-offset-4 group-hover/figure:text-slate-800 group-hover/figure:decoration-slate-300",
          )}
        >
          {tab.tabLabel}
        </span>
        <span className="shrink-0 text-[11px] tabular-nums text-slate-400">
          {tab.periodBadge}
        </span>
      </span>
      <span className="flex items-baseline gap-2">
        <span
          className={cn(
            "font-sans text-3xl font-semibold tracking-tight tabular-nums",
            selected
              ? "text-brand-950"
              : "text-slate-500 group-hover/figure:text-slate-900",
          )}
        >
          {tab.heroAmountLabel}
        </span>
        {tab.trendBadge ? (
          <span
            className={cn(
              "text-[11px] font-semibold tabular-nums",
              selected && tab.trendBadge.positive
                ? "text-success-700"
                : "text-slate-400",
            )}
          >
            {tab.trendBadge.label}
          </span>
        ) : null}
      </span>
      <span
        className={cn(
          "h-0.5 w-8 rounded-full",
          selected
            ? "bg-slate-900"
            : "bg-transparent group-hover/figure:bg-slate-300",
        )}
        aria-hidden
      />
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
    <div className="flex w-full min-w-0 flex-col gap-4 px-6 pt-14 pb-6">
      <div
        role="tablist"
        aria-label="Opportunity calculation views"
        className="grid grid-cols-1 sm:grid-cols-2 sm:divide-x sm:divide-slate-200"
      >
        {TAB_ORDER.map((id, index) => (
          <CalculationFigure
            key={id}
            tab={tabById[id]}
            selected={activeTab === id}
            onSelect={() => setActiveTab(id)}
            className={index === 0 ? "sm:pr-6" : "sm:pl-6"}
          />
        ))}
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
