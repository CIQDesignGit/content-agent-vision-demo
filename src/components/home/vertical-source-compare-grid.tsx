"use client"

import { useState, type ReactNode } from "react"
import { ChevronDown, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { fieldLabelContentStack, fieldSectionStack } from "./field-layout"
import { BulletSourceCell, SourceCellLabel } from "./bullet-source-cell"
import { MatchPercentBadge } from "./match-percent-badge"
import { PIM_CHANNEL_LABEL, PIM_LOGO_ALT, RETAILER_LOGO_SRC, SALSIFY_LOGO_SRC } from "./source-logos"

export type FieldCompareTarget = "pim" | "pdp" | "final"

interface VerticalSourceCompareGridProps {
  pimValue: string
  pdpValue: string
  /** Used by parents for diff baseline in the recommendation body. */
  compareTarget: FieldCompareTarget
  showPim?: boolean
  showPdp?: boolean
  pimEmptyLabel?: string
  /** When false, column labels are omitted (e.g. shared headers on the parent section). */
  showColumnLabels?: boolean
  /** When set, replaces the default text cell for the PIM column. */
  pimCell?: ReactNode
  /** Overrides the default shell classes on the pimCell wrapper (border, bg, rounding). */
  pimCellClassName?: string
  /** When true, renders pimCell directly with no wrapper shell (no border/bg box). */
  pimCellBare?: boolean
  /** Overrides the default Salsify logo label for the PIM column header. */
  pimColumnLabel?: ReactNode
  /** When set, replaces the default text cell for the PDP column. */
  pdpCell?: ReactNode
  /** Overrides the default Retailer/Amazon label for the PDP column header. */
  pdpColumnLabel?: ReactNode
  /** When true, renders pdpCell directly with no wrapper shell (no border/bg box). */
  pdpCellBare?: boolean
  /** Full-width row below the source columns (e.g. AI Recommended Title + tabs). */
  recommendationHeader?: ReactNode
  /** Full-width row below the header (editable field, actions, reasoning). */
  recommendationBody?: ReactNode
  /** When true, renders PDP column before PIM column. */
  reverseColumns?: boolean
  /** When set, shows a character counter inside each source text box. */
  charLimit?: number
  /** When true, recommendation block renders above PIM/retailer columns. */
  recommendationFirst?: boolean
  /** When true, PIM/retailer grid can be collapsed (see defaultSourceCompareOpen). */
  sourceCompareCollapsible?: boolean
  /** Initial expanded state for the source compare grid. Defaults to true. */
  defaultSourceCompareOpen?: boolean
  /** When set, shows a match pill beside the PIM/retailer toggle (PIM vs retailer). */
  matchPercent?: number
  /** When true, omits the match pill from the PIM/retailer toggle row. */
  hideMatchBadge?: boolean
}

function sourceColumnClass(showPim: boolean, showPdp: boolean) {
  return showPim && showPdp ? "grid-cols-2" : "grid-cols-1"
}

/** Label + source text box grouped with gap-2 (8px). */
function SourceCompareColumn({
  showLabel,
  label,
  children,
}: {
  showLabel: boolean
  label: ReactNode
  children: ReactNode
}) {
  if (!showLabel) {
    return <div className="flex min-h-0 min-w-0 flex-1 flex-col">{children}</div>
  }

  return (
    <div className={fieldLabelContentStack("min-h-0 min-w-0")}>
      <div className="flex min-h-6 items-center">{label}</div>
      <div className="flex min-h-0 flex-1 flex-col">{children}</div>
    </div>
  )
}

/** PIM and retailer side by side; AI recommendation spans full width below. */
export function VerticalSourceCompareGrid({
  pimValue,
  pdpValue,
  showPim = true,
  showPdp = true,
  pimEmptyLabel = "—",
  showColumnLabels = true,
  pimCell,
  pimCellClassName,
  pimCellBare = false,
  pimColumnLabel,
  pdpCell,
  pdpColumnLabel,
  pdpCellBare = false,
  recommendationHeader,
  recommendationBody,
  reverseColumns = false,
  charLimit,
  recommendationFirst = false,
  sourceCompareCollapsible = false,
  defaultSourceCompareOpen = true,
  matchPercent,
  hideMatchBadge = false,
}: VerticalSourceCompareGridProps) {
  const [sourceCompareOpen, setSourceCompareOpen] = useState(defaultSourceCompareOpen)
  const columnClass = sourceColumnClass(showPim, showPdp)
  const hasRecommendation = Boolean(recommendationHeader || recommendationBody)
  const sourceCellShellClass =
    "group relative flex h-full min-h-18 w-full flex-1 flex-col rounded-lg border border-slate-200 bg-slate-50"

  const recommendationGrouped =
    recommendationHeader && recommendationBody ? (
      <div className={fieldLabelContentStack("w-full min-w-0")}>
        {recommendationHeader}
        {recommendationBody}
      </div>
    ) : (
      <>
        {recommendationHeader ? (
          <div className="flex w-full min-w-0">{recommendationHeader}</div>
        ) : null}
        {recommendationBody ? <div className="w-full min-w-0">{recommendationBody}</div> : null}
      </>
    )

  const sourceGrid = (
    <div className={cn("grid gap-x-3", (pimCellBare || pdpCellBare) ? "items-start" : "items-stretch", columnClass)}>
        {(() => {
          const pimColumn = showPim ? (
            <SourceCompareColumn
              key="pim"
              showLabel={showColumnLabels}
              label={pimColumnLabel ?? <SourceCellLabel logoSrc={SALSIFY_LOGO_SRC} logoAlt={PIM_LOGO_ALT} sublabel={PIM_CHANNEL_LABEL} />}
            >
              {pimCell ? (
                pimCellBare ? pimCell : <div className={pimCellClassName ?? sourceCellShellClass}>{pimCell}</div>
              ) : (
                <BulletSourceCell
                  logoSrc={SALSIFY_LOGO_SRC}
                  logoAlt={PIM_LOGO_ALT}
                  sublabel={PIM_CHANNEL_LABEL}
                  value={pimValue}
                  compareValue={pdpValue}
                  side="pim"
                  emptyLabel={pimEmptyLabel}
                  showLabel={false}
                  charLimit={charLimit}
                />
              )}
            </SourceCompareColumn>
          ) : null

          const pdpColumn = showPdp ? (
            <SourceCompareColumn
              key="pdp"
              showLabel={showColumnLabels}
              label={
                pdpColumnLabel ?? (
                  <SourceCellLabel logoSrc={RETAILER_LOGO_SRC} logoAlt="Amazon" sublabel="Retailer" />
                )
              }
            >
              {pdpCell ? (
                pdpCellBare ? (
                  pdpCell
                ) : (
                  <div className={sourceCellShellClass}>{pdpCell}</div>
                )
              ) : (
                <BulletSourceCell
                  logoSrc={RETAILER_LOGO_SRC}
                  logoAlt="Amazon"
                  sublabel="Retailer"
                  value={pdpValue}
                  compareValue={pimValue}
                  side="pdp"
                  showLabel={false}
                  charLimit={charLimit}
                />
              )}
            </SourceCompareColumn>
          ) : null

          return reverseColumns ? [pdpColumn, pimColumn] : [pimColumn, pdpColumn]
        })()}
    </div>
  )

  const sourceCompareToggleClass =
    "inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 transition-colors hover:text-slate-800"

  function SourceCompareToggle({
    expanded,
    onClick,
  }: {
    expanded: boolean
    onClick: () => void
  }) {
    return (
      <div className="flex w-full flex-wrap items-center justify-between gap-x-3 gap-y-1.5">
        <button
          type="button"
          onClick={onClick}
          className={sourceCompareToggleClass}
          aria-expanded={expanded}
        >
          {expanded ? (
            <ChevronDown className="size-3.5 shrink-0 text-slate-400" aria-hidden />
          ) : (
            <ChevronRight className="size-3.5 shrink-0 text-slate-400" aria-hidden />
          )}
          PIM and Retailer
        </button>
        {!hideMatchBadge && matchPercent !== undefined ? (
          <MatchPercentBadge percent={matchPercent} />
        ) : null}
      </div>
    )
  }

  const sourceCompareSeparatorClass =
    recommendationFirst && hasRecommendation ? "border-t border-slate-100 pt-3" : undefined

  const sourceCompareBlock = sourceCompareCollapsible ? (
    sourceCompareOpen ? (
      <div className={cn(fieldLabelContentStack("w-full"), sourceCompareSeparatorClass)}>
        <SourceCompareToggle expanded onClick={() => setSourceCompareOpen(false)} />
        {sourceGrid}
      </div>
    ) : (
      <div className={sourceCompareSeparatorClass}>
        <SourceCompareToggle expanded={false} onClick={() => setSourceCompareOpen(true)} />
      </div>
    )
  ) : (
    sourceGrid
  )

  return (
    <div className={fieldSectionStack("w-full")}>
      {recommendationFirst && hasRecommendation ? recommendationGrouped : null}
      {sourceCompareBlock}
      {!recommendationFirst && hasRecommendation ? recommendationGrouped : null}
    </div>
  )
}
