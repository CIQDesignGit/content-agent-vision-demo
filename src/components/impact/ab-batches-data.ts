export interface AbBatchStat {
  value: string
  label: string
  sub: string
}

export interface AbBatchSkuRow {
  name: string
  asin: string
  beforeRatePct: number
  afterRatePct: number
  visitors: number
  impactCents: number
  units: number
  significant: boolean
}

export interface AbBatch {
  id: string
  name: string
  /** Highlighted baseline A/B batch (shown with an A/B badge). */
  featured?: boolean
  whenLabel: string
  skuCount: number
  pooledLiftPct: number
  wins: number
  losses: number
  gainCents: number
  units: number
  status: "ended" | "active"
  stats: AbBatchStat[]
  findings: string[]
  impact?: { text: string; note: string }
  rollout?: string
  rows: AbBatchSkuRow[]
  /** SKUs still collecting traffic — no result yet, so no row to click into. */
  pendingCount?: number
}

function money(cents: number): string {
  const sign = cents < 0 ? "-" : ""
  return `${sign}$${Math.round(Math.abs(cents) / 100).toLocaleString("en-US")}`
}

/** Deterministic 0..1 pseudo-random from a string seed (stable across server/client render). */
function seeded(seed: string): number {
  let h = 2166136261
  for (let i = 0; i < seed.length; i += 1) {
    h ^= seed.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return ((h >>> 0) % 10000) / 10000
}

function seededRange(seed: string, min: number, max: number): number {
  return min + seeded(seed) * (max - min)
}

const FILLER_SCENTS = [
  "Toasted Marshmallow", "Autumn Harvest", "Blackberry Sage", "White Tea & Fig", "Honeyed Pear",
  "Cashmere Musk", "Driftwood & Sea Salt", "Vanilla Chai", "Pumpkin Spice", "Cranberry Spruce",
  "Bergamot Bloom", "Smoked Cedar", "Peppermint Bark", "Wild Fig & Cassis", "Golden Amber",
  "Juniper Breeze", "Rosemary Mint", "Sugared Plum", "Maple Bourbon", "Winter Frost",
  "Lemon Verbena", "Clove & Orange", "Patchouli Rose", "Espresso Bean", "Coastal Linen",
  "Frankincense & Myrrh", "Toasted Coconut", "Spiced Pomegranate", "Velvet Tuberose", "Hazelnut Praline",
]

/**
 * Fills out the long tail of an A/B batch with smaller, lower-traffic SKUs so
 * the headline SKU/win counts can match a bigger stated batch size (e.g. the
 * "42 SKUs A/B tested" KPI on Overview) without ever falling back to
 * a rolled-up "N more SKUs" row — every SKU stays a real, clickable row.
 * Losses are placed at the end of the range so the win/loss split is exact,
 * not probabilistic.
 */
function buildFillerRows(config: {
  seedPrefix: string
  count: number
  lossCount: number
  significantCount: number
  asinPrefix: string
}): AbBatchSkuRow[] {
  const rows: AbBatchSkuRow[] = []
  for (let i = 0; i < config.count; i += 1) {
    const seed = `${config.seedPrefix}-${i}`
    const isLoss = i >= config.count - config.lossCount
    const beforeRate = Number(seededRange(`${seed}-before`, 4.6, 6.8).toFixed(2))
    const afterRate = isLoss
      ? Number((beforeRate * (1 - seededRange(`${seed}-drop`, 0.02, 0.06))).toFixed(2))
      : Number((beforeRate * (1 + seededRange(`${seed}-lift`, 0.03, 0.12))).toFixed(2))
    const visitors = Math.round(seededRange(`${seed}-visitors`, 140, 520))
    const unitsMagnitude = Math.round(seededRange(`${seed}-units`, 8, 40))
    const units = isLoss ? -Math.round(unitsMagnitude * 0.35) : unitsMagnitude
    const pricePerUnitCents = Math.round(seededRange(`${seed}-price`, 2600, 3200))
    const scent = FILLER_SCENTS[i % FILLER_SCENTS.length]
    const asin = `${config.asinPrefix}${String(i).padStart(2, "0")}${String.fromCharCode(65 + (i % 26))}${String.fromCharCode(65 + ((i * 5) % 26))}`

    rows.push({
      name: `Aurelle Vegan Soy Candle, ${scent}, 8oz`,
      asin,
      beforeRatePct: beforeRate,
      afterRatePct: afterRate,
      visitors,
      impactCents: units * pricePerUnitCents,
      units,
      significant: !isLoss && i < config.significantCount,
    })
  }
  return rows
}

// --- Batch 1 — Core Assortment (baseline A/B) ------------------------------
// Reconciled with the "42 SKUs A/B tested" / "38 of 42 · Challenger
// won" / "+3.0%" KPIs shown in the Overview opportunity calculation panel —
// same batch, same story, viewed from the Agent Impact side.
const BATCH_1_NAMED_ROWS: AbBatchSkuRow[] = [
  { name: "Aurelle Vegan Soy Candle, Golden Hour, 8oz", asin: "B0D8QXK4TN", beforeRatePct: 6.04, afterRatePct: 6.40, visitors: 12300, impactCents: 176_000, units: 200, significant: false },
  { name: "Aurelle Vegan Soy Candle, Vanilla Bloom, 8oz", asin: "B0D8QXW3ZL", beforeRatePct: 5.9, afterRatePct: 7.1, visitors: 1200, impactCents: 152_000, units: 168, significant: true },
  { name: "Aurelle Vegan Soy Candle, Midnight Fig, 8oz", asin: "B0D8QXM7RJ", beforeRatePct: 6.5, afterRatePct: 7.6, visitors: 1100, impactCents: 134_000, units: 152, significant: true },
  { name: "Aurelle Vegan Soy Candle Trio Gift Set, 3 x 4oz", asin: "B0D8QXP2LK", beforeRatePct: 4.8, afterRatePct: 5.9, visitors: 900, impactCents: 118_000, units: 96, significant: true },
  { name: "Aurelle Vegan Soy Candle, Sea Salt Neroli, 8oz", asin: "B0D8QXR9WT", beforeRatePct: 6.0, afterRatePct: 6.9, visitors: 1000, impactCents: 98_000, units: 118, significant: false },
  { name: "Aurelle Vegan Soy Candle, Amber Woods, 8oz", asin: "B0D8QY1A2M", beforeRatePct: 6.1, afterRatePct: 6.8, visitors: 950, impactCents: 86_000, units: 104, significant: false },
  { name: "Aurelle Vegan Soy Candle, Ocean Mist, 8oz", asin: "B0D8QY2B3N", beforeRatePct: 5.7, afterRatePct: 6.3, visitors: 880, impactCents: 74_000, units: 92, significant: false },
  { name: "Aurelle Vegan Soy Candle, Citrus Grove, 8oz", asin: "B0D8QY3C4P", beforeRatePct: 6.3, afterRatePct: 6.7, visitors: 820, impactCents: 62_000, units: 78, significant: false },
  { name: "Aurelle Vegan Soy Candle, Coconut Cream, 8oz", asin: "B0D8QYC1A1", beforeRatePct: 6.0, afterRatePct: 6.5, visitors: 760, impactCents: 54_000, units: 66, significant: false },
  { name: "Aurelle Vegan Soy Candle, Fireside Oak, 8oz", asin: "B0D8QYC2B2", beforeRatePct: 5.8, afterRatePct: 6.2, visitors: 700, impactCents: 48_000, units: 58, significant: false },
  { name: "Aurelle Vegan Soy Candle, Rainstorm Petrichor, 8oz", asin: "B0D8QYC3C3", beforeRatePct: 6.1, afterRatePct: 6.5, visitors: 640, impactCents: 41_000, units: 50, significant: true },
  { name: "Aurelle Unscented Pure Soy Candle, 8oz", asin: "B0D8QYC4D4", beforeRatePct: 6.5, afterRatePct: 6.3, visitors: 700, impactCents: -12_000, units: -14, significant: false },
]

// 11 wins + 1 loss above; fill out to the batch's real 42 SKUs / 38 wins / 4
// losses / 16 significant with 27 more wins + 3 more losses (12 more significant).
const BATCH_1_FILLER_ROWS = buildFillerRows({
  seedPrefix: "b1-filler",
  count: 30,
  lossCount: 3,
  significantCount: 12,
  asinPrefix: "B0D8QZ",
})

const BATCH_1_ROWS = [...BATCH_1_NAMED_ROWS, ...BATCH_1_FILLER_ROWS]
const BATCH_1_SKU_COUNT = BATCH_1_ROWS.length
const BATCH_1_WINS = BATCH_1_ROWS.filter((row) => row.afterRatePct >= row.beforeRatePct).length
const BATCH_1_LOSSES = BATCH_1_SKU_COUNT - BATCH_1_WINS
const BATCH_1_GAIN_CENTS = BATCH_1_ROWS.reduce((sum, row) => sum + row.impactCents, 0)
const BATCH_1_UNITS = BATCH_1_ROWS.reduce((sum, row) => sum + row.units, 0)
const BATCH_1_SIG_ROWS = BATCH_1_ROWS.filter((row) => row.significant)
const BATCH_1_SIG_GAIN_CENTS = BATCH_1_SIG_ROWS.reduce((sum, row) => sum + row.impactCents, 0)
const BATCH_1_TIME_SAVED_HRS = Number(((BATCH_1_SKU_COUNT * 29) / 60).toFixed(1))
const BATCH_1_WIN_RATE_PCT = Number(((BATCH_1_WINS / BATCH_1_SKU_COUNT) * 100).toFixed(1))

/**
 * A/B test batches — every batch the agent has run, oldest to newest.
 * Every SKU in a batch is a real, clickable row (no rolled-up "N more SKUs"
 * summary). Batch 1 is the baseline A/B test referenced on Overview's opportunity
 * calculation panel — its SKU/win/lift numbers are computed above so the two
 * screens always agree. Adapted from the approved "Agent Impact" concept
 * (content-agent-at-a-glance mockup), restyled into this app's own design
 * language.
 */
export const AB_BATCHES: AbBatch[] = [
  {
    id: "b1",
    name: "Batch 1 — Core Assortment",
    featured: true,
    whenLabel: "Staggered rollout, Nov 24, 2025 – Jan 4, 2026 · Published Dec 1, 2025 – Jan 5, 2026",
    skuCount: BATCH_1_SKU_COUNT,
    pooledLiftPct: 3.0,
    wins: BATCH_1_WINS,
    losses: BATCH_1_LOSSES,
    gainCents: BATCH_1_GAIN_CENTS,
    units: BATCH_1_UNITS,
    status: "ended",
    stats: [
      { value: `${BATCH_1_WINS} / ${BATCH_1_SKU_COUNT}`, label: "SKUs improved", sub: `${BATCH_1_WIN_RATE_PCT}% win rate` },
      { value: "+3.0%", label: "Pooled sales lift", sub: "visitor-weighted, not averaged" },
      { value: BATCH_1_UNITS.toLocaleString("en-US"), label: "Incremental units", sub: `across the ${BATCH_1_SKU_COUNT} tested SKUs` },
      { value: `${BATCH_1_TIME_SAVED_HRS} hrs`, label: "Time saved", sub: `29 min/SKU vs. manual, these ${BATCH_1_SKU_COUNT}` },
      { value: money(BATCH_1_GAIN_CENTS), label: "Projected annual gain", sub: `on these ${BATCH_1_SKU_COUNT} SKUs' own revenue` },
    ],
    findings: [
      `${BATCH_1_SIG_ROWS.length} of ${BATCH_1_SKU_COUNT} SKUs reached statistical significance — the agent's version performed better in all ${BATCH_1_SIG_ROWS.length}.`,
      "Conversion reliably improved when the agent added scent-family and use-occasion language to bullets (“cozy autumn evenings”, “gift for a candle person”) — not when it simply lengthened the title.",
      `The ${BATCH_1_LOSSES} losses skewed toward unscented, minimalist candles — there's little descriptive scent language for the agent to add, and the plainer bullets tested slightly worse than the original.`,
    ],
    impact: {
      text: `${BATCH_1_SIG_ROWS.length} of ${BATCH_1_SKU_COUNT} SKUs performed better with statistical confidence, and they account for ${money(BATCH_1_SIG_GAIN_CENTS)} of the ${money(BATCH_1_GAIN_CENTS)} projected annual gain.`,
      note: "Calculated on each SKU's own trailing 12-month revenue as of test start.",
    },
    rollout:
      "This is the same 42-SKU A/B test and +3.0% pooled rate behind the opportunity calculation on Overview — the rate used to size the always-on opportunity across the rest of the catalog.",
    rows: BATCH_1_ROWS,
  },
  {
    id: "b2",
    name: "Batch 2 — Gift Sets",
    whenLabel: "Feb 10 – Mar 3, 2026",
    skuCount: 7,
    pooledLiftPct: 4.4,
    wins: 6,
    losses: 1,
    gainCents: 399_000,
    units: 323,
    status: "ended",
    stats: [
      { value: "6 / 7", label: "SKUs improved", sub: "85.7% win rate" },
      { value: "+4.4%", label: "Pooled sales lift", sub: "visitor-weighted" },
      { value: "323", label: "Incremental units", sub: "across 7 tested SKUs" },
      { value: "3.4 hrs", label: "Time saved", sub: "these 7 SKUs" },
      { value: "$3,990", label: "Projected annual gain", sub: "on these 7 SKUs" },
    ],
    findings: [
      "Gift-set bundling language outperformed single-candle copy by the widest margin of any batch so far.",
      "The one exception — plain, undecorated gift packaging — underperformed the decorative options above, a reminder that shoppers are buying the presentation as much as the candle.",
    ],
    rows: [
      { name: "Aurelle Vegan Soy Candle Duo, Gifting Edition", asin: "B0D8QY4D5Q", beforeRatePct: 5.6, afterRatePct: 6.9, visitors: 640, impactCents: 124_000, units: 96, significant: true },
      { name: "Aurelle Vegan Soy Candle, Lavender Fields, 8oz", asin: "B0D8QY5E6R", beforeRatePct: 6.2, afterRatePct: 7.0, visitors: 520, impactCents: 98_000, units: 74, significant: true },
      { name: "Aurelle Mini Candle Trio, Travel Size", asin: "B0D8QY6F7S", beforeRatePct: 4.9, afterRatePct: 5.7, visitors: 480, impactCents: 76_000, units: 58, significant: false },
      { name: "Aurelle Vegan Soy Candle, Fresh Linen, 8oz", asin: "B0D8QY7G8T", beforeRatePct: 6.0, afterRatePct: 6.4, visitors: 410, impactCents: 54_000, units: 42, significant: false },
      { name: "Aurelle Vegan Soy Candle Gift Box, Sunset Amber, 8oz", asin: "B0D8QYD1E1", beforeRatePct: 5.9, afterRatePct: 6.8, visitors: 380, impactCents: 30_000, units: 34, significant: false },
      { name: "Aurelle Candle & Match Gift Tin, Warm Spice", asin: "B0D8QYD2F2", beforeRatePct: 5.5, afterRatePct: 6.3, visitors: 340, impactCents: 26_000, units: 28, significant: false },
      { name: "Aurelle Holiday Gift Wrap Candle Set, Plain Kraft", asin: "B0D8QYD3G3", beforeRatePct: 6.0, afterRatePct: 5.7, visitors: 300, impactCents: -9_000, units: -9, significant: false },
    ],
  },
  {
    id: "b3",
    name: "Batch 3 — Vessels & Refills",
    whenLabel: "Apr 14 – May 5, 2026",
    skuCount: 6,
    pooledLiftPct: 2.7,
    wins: 5,
    losses: 1,
    gainCents: 162_000,
    units: 132,
    status: "ended",
    stats: [
      { value: "5 / 6", label: "SKUs improved", sub: "83.3% win rate" },
      { value: "+2.7%", label: "Pooled sales lift", sub: "visitor-weighted" },
      { value: "132", label: "Incremental units", sub: "across 6 tested SKUs" },
      { value: "2.9 hrs", label: "Time saved", sub: "these 6 SKUs" },
      { value: "$1,620", label: "Projected annual gain", sub: "on these 6 SKUs" },
    ],
    findings: [
      "The smallest lift of the four batches — refill and vessel SKUs have less descriptive room than scented candles, and the gap between winners and losers was narrow.",
      "The one loss — a compact 4oz travel refill — suggests smaller-format refills don't carry the same value story as the full-size vessel refills above.",
    ],
    rows: [
      { name: "Aurelle Refillable Ceramic Candle Vessel, 10oz", asin: "B0D8QXT5HN", beforeRatePct: 6.1, afterRatePct: 6.6, visitors: 380, impactCents: 62_000, units: 48, significant: true },
      { name: "Aurelle Soy Wax Refill Pouch, 8oz", asin: "B0D8QY8H9U", beforeRatePct: 5.8, afterRatePct: 6.1, visitors: 340, impactCents: 41_000, units: 36, significant: false },
      { name: "Aurelle Wooden Wick Trimmer Set", asin: "B0D8QY9J1V", beforeRatePct: 4.6, afterRatePct: 5.0, visitors: 260, impactCents: 29_000, units: 22, significant: false },
      { name: "Aurelle Glass Refill Vessel, Fluted, 10oz", asin: "B0D8QYE1H1", beforeRatePct: 5.5, afterRatePct: 5.9, visitors: 240, impactCents: 21_000, units: 18, significant: false },
      { name: "Aurelle Bamboo Wick Trimmer & Snuffer Set", asin: "B0D8QYE2I2", beforeRatePct: 4.8, afterRatePct: 5.2, visitors: 200, impactCents: 15_000, units: 14, significant: false },
      { name: "Aurelle Travel Tin Refill, 4oz", asin: "B0D8QYE3J3", beforeRatePct: 5.0, afterRatePct: 4.7, visitors: 180, impactCents: -6_000, units: -6, significant: false },
    ],
  },
  {
    id: "b4",
    name: "Batch 4 — Holiday Push",
    whenLabel: "Oct 6 – Oct 27, 2026 · still running",
    skuCount: 12,
    pooledLiftPct: 3.6,
    wins: 4,
    losses: 0,
    gainCents: 146_000,
    units: 114,
    status: "active",
    pendingCount: 8,
    stats: [
      { value: "4 / 12", label: "SKUs called so far", sub: "8 still collecting traffic" },
      { value: "+3.6%", label: "Pooled sales lift", sub: "interim, visitor-weighted" },
      { value: "114", label: "Incremental units", sub: "so far, 12 tested SKUs" },
      { value: "5.8 hrs", label: "Time saved", sub: "these 12 SKUs" },
      { value: "$1,460", label: "Projected gain so far", sub: "interim — 8 SKUs still running" },
    ],
    findings: [
      "Too early to call — 8 of 12 SKUs haven't reached significance yet. Final read expected after Oct 27.",
    ],
    rows: [
      { name: "Aurelle Vegan Soy Candle, Spiced Cranberry, 8oz", asin: "B0D8QYA2K3", beforeRatePct: 5.9, afterRatePct: 6.8, visitors: 290, impactCents: 48_000, units: 38, significant: true },
      { name: "Aurelle Vegan Soy Candle, Winter Balsam, 8oz", asin: "B0D8QYB3L4", beforeRatePct: 6.0, afterRatePct: 6.7, visitors: 260, impactCents: 41_000, units: 32, significant: false },
      { name: "Aurelle Vegan Soy Candle, Frosted Pine, 8oz", asin: "B0D8QYF1K1", beforeRatePct: 5.7, afterRatePct: 6.3, visitors: 220, impactCents: 31_000, units: 24, significant: false },
      { name: "Aurelle Vegan Soy Candle, Mulled Cider, 8oz", asin: "B0D8QYF2L2", beforeRatePct: 5.9, afterRatePct: 6.4, visitors: 200, impactCents: 26_000, units: 20, significant: false },
    ],
  },
]
