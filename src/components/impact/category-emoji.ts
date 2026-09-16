const CATEGORY_EMOJI: Record<string, string> = {
  Candles: "🕯️",
  Diffusers: "🌸",
  "Wax Melts": "🧈",
  "Gift Sets": "🎁",
  Warmers: "🔥",
}

/** Last segment of a taxonomy path — "Home Fragrance · Candles" → "Candles". */
export function lastCategorySegment(category: string): string {
  const parts = category.split("·")
  return parts[parts.length - 1]!.trim()
}

export function categoryEmoji(category: string): string {
  return CATEGORY_EMOJI[lastCategorySegment(category)] ?? "📦"
}
