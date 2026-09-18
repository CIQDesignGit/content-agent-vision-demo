/** Format thousands → display label ($8.9K, $84K, $1.2M). */
export function formatStreamValue(thousands: number): string {
  if (thousands >= 1000) {
    const millions = thousands / 1000
    const label = Number.isInteger(millions)
      ? String(millions)
      : millions.toFixed(2).replace(/\.?0+$/, "")
    return `$${label}M`
  }
  if (Number.isInteger(thousands)) return `$${thousands}K`
  return `$${thousands.toFixed(1)}K`
}

/** Parse `$1.24M` / `$224K` labels into thousands of USD. */
export function parseValueLabelToThousands(label: string): number {
  const millions = label.match(/\$([\d.]+)\s*M/i)
  if (millions) return parseFloat(millions[1]) * 1000
  const thousands = label.match(/\$([\d.]+)\s*K/i)
  if (thousands) return parseFloat(thousands[1])
  return 0
}
