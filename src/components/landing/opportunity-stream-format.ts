/** Placeholder thumbnails aligned with workbench MOCK_SKUs (by ASIN). */
const SKU_THUMBNAIL_BY_ASIN: Record<string, string> = {
  B08NF9KBZ4: "https://placehold.co/64x64/fce7f3/be185d?text=YC",
  B00I0DI0Z6: "https://placehold.co/64x64/ede9fe/7c3aed?text=NC",
  B07GR5MSKD: "https://placehold.co/64x64/dbeafe/1d4ed8?text=DY",
  B00FQK1H8C: "https://placehold.co/64x64/fef3c7/92400e?text=PS",
  B00H8R3KM2: "https://placehold.co/64x64/dcfce7/15803d?text=VV",
  B003IH3JN4: "https://placehold.co/64x64/e0f2fe/0369a1?text=SH",
  B00005UP2P: "https://placehold.co/64x64/fee2e2/b91c1c?text=KA",
  B00FLYWNYQ: "https://placehold.co/64x64/f3e8ff/7e22ce?text=IP",
  B079KLGWGR: "https://placehold.co/64x64/ecfdf5/065f46?text=VM",
  B08C4L7HC1: "https://placehold.co/64x64/fafafa/374151?text=iR",
}

export function streamSkuThumbnailUrl(asin: string): string {
  return (
    SKU_THUMBNAIL_BY_ASIN[asin] ??
    `https://placehold.co/40x40/f8fafc/64748b?text=${encodeURIComponent(asin.slice(-4))}`
  )
}

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
