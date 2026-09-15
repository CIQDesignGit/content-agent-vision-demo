"use client"

import Link from "next/link"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { OpportunityCalculationTabData } from "./types"
import { OpportunityCalculationLiftBar } from "./opportunity-calculation-lift-bar"

interface OpportunityCalculationTabPaneProps {
  tab: OpportunityCalculationTabData
}

function LiftLegendItem({
  dotClassName,
  label,
  amount,
}: {
  dotClassName: string
  label: string
  amount: string
}) {
  return (
    <div className="flex min-w-0 items-center gap-1.5 text-xs">
      <span
        className={cn("size-1.5 shrink-0 rounded-full", dotClassName)}
        aria-hidden
      />
      <span className="truncate text-slate-600">{label}</span>
      <span className="shrink-0 font-semibold tabular-nums text-slate-900">
        {amount}
      </span>
    </div>
  )
}

export function OpportunityCalculationTabPane({
  tab,
}: OpportunityCalculationTabPaneProps) {
  const foundationalDot = "bg-data-1"
  const seasonalDot = "bg-data-3"
  const showCalcTable = tab.calcRows.length > 0

  return (
    <div className="flex w-full min-w-0 flex-col gap-2.5">
      <div className="grid w-full grid-cols-1 items-end gap-x-6 gap-y-1 sm:grid-cols-[minmax(0,1fr)_auto]">
        <div className="flex min-w-0 flex-wrap items-center gap-1.5">
          <p className="text-xs font-medium text-slate-600">{tab.heading}</p>
          <span className="rounded-full bg-brand-50 px-2 py-0.5 text-[10px] font-semibold text-brand-700">
            {tab.periodBadge}
          </span>
          {tab.trendBadge ? (
            <span
              className={cn(
                "rounded-full px-2 py-0.5 text-[10px] font-semibold tabular-nums",
                tab.trendBadge.positive
                  ? "bg-teal-50 text-teal-700"
                  : "bg-slate-100 text-slate-600",
              )}
            >
              {tab.trendBadge.label}
            </span>
          ) : null}
        </div>

        <p className="font-sans text-2xl font-semibold tracking-tight text-brand-950 tabular-nums sm:justify-self-end sm:text-right">
          {tab.heroAmountLabel}
        </p>
      </div>

      <div className="w-full space-y-1.5">
        <OpportunityCalculationLiftBar
          foundationalPct={tab.liftBarPct.foundational}
          seasonalPct={tab.liftBarPct.seasonal}
        />
        <div className="grid w-full grid-cols-2 gap-x-6">
          <LiftLegendItem
            dotClassName={foundationalDot}
            label={tab.foundationalLiftLabel}
            amount={tab.foundationalLiftAmount}
          />
          <LiftLegendItem
            dotClassName={seasonalDot}
            label={tab.seasonalLiftLabel}
            amount={tab.seasonalLiftAmount}
          />
        </div>
      </div>

      <div className="grid w-full grid-cols-3 gap-4 border-y border-slate-200 py-2.5">
        {tab.kpis.map((kpi) => (
          <div key={kpi.label} className="min-w-0">
            <p className="text-sm font-semibold tabular-nums text-slate-900">
              {kpi.value}
            </p>
            <p className="mt-0.5 text-[10px] leading-snug text-slate-500">
              {kpi.label}
            </p>
          </div>
        ))}
      </div>

      {showCalcTable ? (
        <dl className="flex w-full min-w-0 flex-col text-xs">
          {tab.calcRows.map((row) => (
            <div
              key={`${row.label}-${row.value}`}
              className={cn(
                "flex w-full items-baseline justify-between gap-6 border-b border-slate-200 py-1.5",
                row.variant === "subtotal" && "font-semibold text-slate-900",
              )}
            >
              <dt className="min-w-0 text-slate-600">{row.label}</dt>
              <dd className="shrink-0 tabular-nums text-slate-900">{row.value}</dd>
            </div>
          ))}
          {tab.calcSummary ? (
            <div className="flex items-baseline justify-between gap-2 border-t-2 border-slate-900 py-2">
              <dt className="font-semibold text-slate-900">
                {tab.calcSummary.label}
              </dt>
              <dd className="shrink-0 font-semibold tabular-nums text-slate-900">
                {tab.calcSummary.value}
              </dd>
            </div>
          ) : null}
          {tab.methodology ? (
            <p className="pt-2 text-[11px] leading-relaxed text-slate-500">
              {tab.methodology}
            </p>
          ) : null}
        </dl>
      ) : null}

      {tab.bodyCopy ? (
        <p className="text-[11px] leading-relaxed text-slate-600">{tab.bodyCopy}</p>
      ) : null}

      {tab.cta ? (
        <Link
          href={tab.cta.href}
          className={buttonVariants({
            variant: "outline",
            className:
              "h-9 w-full rounded-xl border-brand-300 bg-white text-xs font-semibold text-brand-700 shadow-none hover:border-brand-400 hover:bg-brand-50 hover:text-brand-800",
          })}
        >
          {tab.cta.label}
        </Link>
      ) : null}

      {tab.unrealized ? (
        <div className="border-t border-slate-200 pt-2.5">
          <div className="flex items-baseline justify-between gap-2">
            <p className="text-xs font-medium text-slate-900">
              {tab.unrealized.title}
            </p>
            <p className="text-xs font-semibold tabular-nums text-slate-900">
              {tab.unrealized.amountLabel}
            </p>
          </div>
          <p className="mt-1 text-[11px] leading-relaxed text-slate-500">
            {tab.unrealized.description}
          </p>
        </div>
      ) : null}
    </div>
  )
}
