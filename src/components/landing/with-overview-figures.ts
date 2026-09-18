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
 * Open opportunity keeps its authored total — it is not the same as everything found.
 */
export function withOverviewFigures(
  calculation: OpportunityCalculationData,
  _identifiedMillions: number,
  realizedMillions: number,
  capturedSplit: CapturedLiftSplit,
): OpportunityCalculationData {
  const seed =
    capturedSplit.retailReadinessMillions +
    capturedSplit.amazonOptimizationMillions +
    capturedSplit.seasonalMillions
  const scale = seed > 0 ? realizedMillions / seed : 1

  return {
    annualized: calculation.annualized,
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
