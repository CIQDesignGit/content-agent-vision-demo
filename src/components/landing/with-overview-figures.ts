import { formatMillions } from "./apply-capture"
import type { OpportunityCalculationData } from "./types"

/** Captured dollars before a publish, split the same way the value-realized card shows. */
export interface CapturedLiftSplit {
  retailReadinessMillions: number
  amazonOptimizationMillions: number
  seasonalMillions: number
}

/**
 * The calculation cards are the overview figures, not a second set of totals.
 * Captured (and its lift split) follows a publish so it stays on the legend amount.
 * The split is the selected period's seed — not a hardcoded $800K year total.
 */
export function withOverviewFigures(
  calculation: OpportunityCalculationData,
  identifiedMillions: number,
  realizedMillions: number,
  capturedSplit: CapturedLiftSplit,
): OpportunityCalculationData {
  const totalLabel = `$${identifiedMillions.toFixed(2)}M`
  const seed =
    capturedSplit.retailReadinessMillions +
    capturedSplit.amazonOptimizationMillions +
    capturedSplit.seasonalMillions
  const scale = seed > 0 ? realizedMillions / seed : 1

  return {
    annualized: {
      ...calculation.annualized,
      heroAmountLabel: totalLabel,
      calcSummary: calculation.annualized.calcSummary
        ? { ...calculation.annualized.calcSummary, value: totalLabel }
        : undefined,
    },
    valueRealized: {
      ...calculation.valueRealized,
      heroAmountLabel: formatMillions(realizedMillions),
      retailReadinessLiftAmount: formatMillions(
        capturedSplit.retailReadinessMillions * scale,
      ),
      amazonOptimizationLiftAmount: formatMillions(
        capturedSplit.amazonOptimizationMillions * scale,
      ),
      seasonalLiftAmount: formatMillions(
        capturedSplit.seasonalMillions * scale,
      ),
    },
  }
}
