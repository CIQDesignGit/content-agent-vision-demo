"use client"

import { cn } from "@/lib/utils"
import type { OpportunityCalculationRow } from "./types"

interface FormulaGroup {
  operands: OpportunityCalculationRow[]
  subtotal?: OpportunityCalculationRow
}

const GROUP_DOT = ["bg-data-1", "bg-data-3"]

function groupFormula(rows: OpportunityCalculationRow[]): FormulaGroup[] {
  const groups: FormulaGroup[] = []
  let operands: OpportunityCalculationRow[] = []

  for (const row of rows) {
    if (row.variant === "subtotal") {
      groups.push({ operands, subtotal: row })
      operands = []
    } else {
      operands.push(row)
    }
  }

  if (operands.length > 0) groups.push({ operands })
  return groups
}

export function OpportunityCalculationFormula({
  rows,
}: {
  rows: OpportunityCalculationRow[]
}) {
  const groups = groupFormula(rows)
  if (groups.length === 0) return null

  return (
    <div className="flex flex-col gap-3">
      <div
        className={cn(
          "grid gap-3",
          groups.length > 1 && "sm:grid-cols-2",
        )}
      >
        {groups.map((group, index) => (
          <div
            key={group.subtotal?.label ?? group.operands[0]?.label ?? index}
            className="flex min-w-0 flex-col gap-2 rounded-xl bg-slate-50 px-3.5 py-3"
          >
            {group.subtotal ? (
              <div className="flex items-baseline justify-between gap-3">
                <p className="flex min-w-0 items-center gap-1.5 text-sm font-medium text-slate-600">
                  <span
                    className={cn(
                      "size-2.5 shrink-0 rounded-full",
                      GROUP_DOT[index] ?? "bg-slate-400",
                    )}
                    aria-hidden
                  />
                  <span className="truncate">{group.subtotal.label}</span>
                </p>
                <p className="shrink-0 text-sm font-semibold tabular-nums text-slate-900">
                  {group.subtotal.value}
                </p>
              </div>
            ) : null}
            <dl className="flex flex-col gap-1.5 border-t border-slate-200/80 pt-2">
              {group.operands.map((row) => (
                <div
                  key={row.label}
                  className="flex items-baseline justify-between gap-3 text-sm leading-snug"
                >
                  <dt className="min-w-0 text-slate-500">{row.label}</dt>
                  <dd className="shrink-0 tabular-nums text-slate-700">
                    {row.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        ))}
      </div>

    </div>
  )
}
