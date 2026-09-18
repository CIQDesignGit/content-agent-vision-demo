"use client"

import { cn } from "@/lib/utils"
import type { OpportunityCalculationRow } from "./types"
import { CALC_SEGMENT_FILL } from "./opportunity-calculation-lift-bar"

interface FormulaGroup {
  operands: OpportunityCalculationRow[]
  subtotal?: OpportunityCalculationRow
}

const GROUP_DOT = CALC_SEGMENT_FILL

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
    <ul className="divide-y divide-slate-100">
      {groups.map((group, index) => (
        <li
          key={group.subtotal?.label ?? group.operands[0]?.label ?? index}
          className="flex flex-col gap-1.5 py-2.5 first:pt-0 last:pb-0"
        >
          {group.subtotal ? (
            <div className="flex items-baseline justify-between gap-3">
              <p className="flex min-w-0 items-center gap-2 text-sm font-medium text-slate-800">
                <span
                  className={cn(
                    "size-2 shrink-0 rounded-full",
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
          <dl className="flex flex-col gap-1 pl-4">
            {group.operands.map((row) => (
              <div
                key={row.label}
                className="flex items-baseline justify-between gap-3 text-xs leading-snug"
              >
                <dt className="min-w-0 text-slate-500">{row.label}</dt>
                <dd className="shrink-0 font-medium tabular-nums text-slate-700">
                  {row.value}
                </dd>
              </div>
            ))}
          </dl>
        </li>
      ))}
    </ul>
  )
}
