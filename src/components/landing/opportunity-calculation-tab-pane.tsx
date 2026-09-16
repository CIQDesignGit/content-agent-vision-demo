"use client"

import Link from "next/link"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { OpportunityCalculationTabData } from "./types"
import { CalculationExplanation } from "./opportunity-calculation-explanation"
import { OpportunityCalculationFormula } from "./opportunity-calculation-formula"
import { OpportunityCalculationLiftBar } from "./opportunity-calculation-lift-bar"

interface OpportunityCalculationTabPaneProps {
  tab: OpportunityCalculationTabData
}

function LiftAmount({
  dotClassName,
  label,
  amount,
}: {
  dotClassName: string
  label: string
  amount: string
}) {
  return (
    <div className="flex min-w-0 flex-col gap-0.5">
      <p className="flex items-center gap-1.5 text-xs text-slate-500">
        <span
          className={cn("size-1.5 shrink-0 rounded-full", dotClassName)}
          aria-hidden
        />
        <span className="truncate">{label}</span>
      </p>
      <p className="text-sm font-semibold tabular-nums text-slate-900">{amount}</p>
    </div>
  )
}

export function OpportunityCalculationTabPane({
  tab,
}: OpportunityCalculationTabPaneProps) {
  const explanation = [tab.bodyCopy, tab.methodology, tab.unrealized?.description].some(
    Boolean,
  )
  const hasFormula = tab.calcRows.length > 0

  return (
    <div className="flex w-full min-w-0 flex-col gap-4">
      <div className="w-full space-y-2.5">
        <OpportunityCalculationLiftBar
          foundationalPct={tab.liftBarPct.foundational}
          seasonalPct={tab.liftBarPct.seasonal}
        />
        {hasFormula ? null : (
          <div className="grid w-full grid-cols-2 gap-x-6">
            <LiftAmount
              dotClassName="bg-data-1"
              label={tab.foundationalLiftLabel}
              amount={tab.foundationalLiftAmount}
            />
            <LiftAmount
              dotClassName="bg-data-3"
              label={tab.seasonalLiftLabel}
              amount={tab.seasonalLiftAmount}
            />
          </div>
        )}
      </div>

      {hasFormula ? (
        <OpportunityCalculationFormula
          rows={tab.calcRows}
          summary={tab.calcSummary}
        />
      ) : null}

      <div className="grid w-full grid-cols-3 gap-4 border-y border-slate-200 py-3">
        {tab.kpis.map((kpi) => (
          <div key={kpi.label} className="min-w-0">
            <p className="text-sm font-semibold tabular-nums text-slate-900">
              {kpi.value}
            </p>
            <p className="mt-0.5 text-[11px] leading-snug text-slate-500">
              {kpi.label}
            </p>
          </div>
        ))}
      </div>

      {tab.unrealized ? (
        <div className="flex items-baseline justify-between gap-3 rounded-xl bg-slate-50 px-3.5 py-2.5">
          <p className="text-xs text-slate-600">{tab.unrealized.title}</p>
          <p className="shrink-0 text-sm font-semibold tabular-nums text-slate-500">
            {tab.unrealized.amountLabel}
          </p>
        </div>
      ) : null}

      {explanation ? (
        <CalculationExplanation>
          {tab.bodyCopy ? <p>{tab.bodyCopy}</p> : null}
          {tab.methodology ? <p>{tab.methodology}</p> : null}
          {tab.unrealized ? (
            <p>
              <span className="font-medium text-slate-700">
                {tab.unrealized.title}.
              </span>{" "}
              {tab.unrealized.description}
            </p>
          ) : null}
        </CalculationExplanation>
      ) : null}

      {tab.cta ? (
        <Link
          href={tab.cta.href}
          className={buttonVariants({
            variant: "outline",
            className:
              "h-9 w-full rounded-xl border-brand-800 bg-white text-xs font-semibold text-brand-700 shadow-none hover:border-brand-800 hover:bg-brand-50 hover:text-brand-800",
          })}
        >
          {tab.cta.label}
        </Link>
      ) : null}
    </div>
  )
}
