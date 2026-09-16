/**
 * Compact currency formatting shared across the ASIN detail page: amounts
 * of $10K or more collapse to "$XXK" / "$X.XM" so hero numbers and cycle
 * totals stay readable at a glance; smaller amounts keep full precision.
 */
export function formatCompactUsd(cents: number): string {
  const dollars = Math.round(cents / 100)
  const sign = dollars < 0 ? "-" : ""
  const abs = Math.abs(dollars)

  if (abs >= 1_000_000) {
    const millions = abs / 1_000_000
    const label = Number.isInteger(millions) ? millions.toFixed(0) : millions.toFixed(1)
    return `${sign}$${label}M`
  }
  if (abs >= 10_000) {
    return `${sign}$${Math.round(abs / 1000)}K`
  }
  return `${sign}$${abs.toLocaleString("en-US")}`
}
