import { RevealGroup, RevealItem } from "@/components/landing/reveal"
import { AbBatchList } from "./ab-batch-list"
import { ImpactModeToggle, type ImpactMode } from "./impact-mode-toggle"
import { ImpactTable } from "./impact-table"
import type { ImpactRow } from "./types"

/** Gap between each staggered reveal item — header, then one per batch card. */
export const BREAKDOWN_STAGGER = 0.08

interface ImpactBreakdownProps {
  rows: ImpactRow[]
  mode: ImpactMode
  onModeChange: (mode: ImpactMode) => void
  initialOpenBatchId?: string | null
  /** When this section's own reveal sequence should start, in seconds. */
  baseDelay: number
}

export function ImpactBreakdown({
  rows,
  mode,
  onModeChange,
  initialOpenBatchId,
  baseDelay,
}: ImpactBreakdownProps) {
  return (
    <RevealGroup delay={baseDelay} stagger={BREAKDOWN_STAGGER} className="flex flex-col gap-3">
      <RevealItem>
        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 px-1">
          <div>
            <h2 className="font-sans text-base font-semibold tracking-tight text-slate-900">
              Impact by {mode === "ab-test" ? "A/B test" : "ASIN"}
            </h2>
            <p className="text-xs text-slate-400">
              {mode === "ab-test"
                ? "Every A/B batch the agent has run, and what it proved"
                : "Ranked by attributed impact across all ASINs"}
            </p>
          </div>
          <ImpactModeToggle mode={mode} onModeChange={onModeChange} />
        </div>
      </RevealItem>

      {mode === "ab-test" ? (
        <AbBatchList
          initialOpenBatchId={initialOpenBatchId}
          revealBaseDelay={baseDelay}
          revealStagger={BREAKDOWN_STAGGER}
        />
      ) : (
        <RevealItem>
          <ImpactTable rows={rows} />
        </RevealItem>
      )}
    </RevealGroup>
  )
}
