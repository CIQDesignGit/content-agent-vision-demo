import { formatMillions } from "./apply-capture"
import type { OpportunityCalculationData } from "./types"

/** Seeded value-realized split, before a publish moves dollars into Captured. */
const VALUE_REALIZED_SEED_MILLIONS = 0.8
const VALUE_FOUNDATIONAL_SEED_MILLIONS = 0.6
const VALUE_SEASONAL_SEED_MILLIONS = 0.2

/**
 * The two calculation cards are the overview figures, not a second set of totals.
 * Captured (and its lift split) follows a publish so it stays on the legend amount.
 */
export function withOverviewFigures(
  calculation: OpportunityCalculationData,
  identifiedMillions: number,
  realizedMillions: number,
): OpportunityCalculationData {
  const totalLabel = `$${identifiedMillions.toFixed(2)}M`
  const scale =
    VALUE_REALIZED_SEED_MILLIONS > 0
      ? realizedMillions / VALUE_REALIZED_SEED_MILLIONS
      : 1

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
      foundationalLiftAmount: formatMillions(
        VALUE_FOUNDATIONAL_SEED_MILLIONS * scale,
      ),
      seasonalLiftAmount: formatMillions(VALUE_SEASONAL_SEED_MILLIONS * scale),
    },
  }
}
