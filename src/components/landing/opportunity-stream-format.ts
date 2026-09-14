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
