import { candleThumbnail } from "@/lib/candle-thumbnails"
import { makePdpImagesFromPim } from "@/lib/image-match"
import type { ContentState, Sku, SkuContent } from "./types"
import { SKU_CONTENT } from "./sku-content-data"

export const MOCK_SKUS: Sku[] = [
  {
    id: "sku-1",
    asin: "B08NF9KBZ4",
    productId: "9876542501",
    category: "Home Fragrance",
    brand: "Aurelle Candles",
    title: "Aurelle Candles Noir Cherry Large Scented Jar, 22 oz",
    thumbnailUrl: candleThumbnail("B08NF9KBZ4"),
    metrics: { compliance: 54, seo: 22, aeo: 16, ops: 4200 },
    salsifyIssues: [
      { type: "error", label: "Image mismatch" },
      { type: "warning", label: "Title too long" },
    ],
    lastUpdated: "Apr 8, 2025",
    pimSyncedOn: "2026-06-28",
    aiSyncedOn: "2026-06-28",
    actionStatus: "in-progress",
  },
  {
    id: "sku-2",
    asin: "B00I0DI0Z6",
    productId: "9876542536",
    category: "Home Fragrance",
    brand: "Aurelle Candles",
    title: "Bright Citrus Zest Hand-Poured Soy Jar Candle, 14 oz",
    thumbnailUrl: candleThumbnail("B00I0DI0Z6"),
    metrics: { compliance: 54, seo: 30, aeo: 40, ops: 1850 },
    salsifyIssues: [{ type: "warning", label: "Title mismatch vs. PDP" }],
    lastUpdated: "Mar 7, 2025",
    pimSyncedOn: "2026-06-27",
    aiSyncedOn: "2026-06-27",
    actionStatus: "to-do",
  },
  {
    id: "sku-3",
    asin: "B07GR5MSKD",
    productId: "8722510044",
    category: "Home Fragrance",
    brand: "Aurelle Candles",
    title: "Warm Amber Floral Soy Jar Candle, 16 oz",
    thumbnailUrl: candleThumbnail("B07GR5MSKD"),
    metrics: { compliance: 54, seo: 40, aeo: 16, ops: 7600 },
    salsifyIssues: [{ type: "error", label: "Image mismatch" }],
    lastUpdated: "Feb 14, 2025",
    pimSyncedOn: "2026-06-28",
    aiSyncedOn: "2026-06-26",
    actionStatus: "to-do",
  },
  {
    id: "sku-4",
    asin: "B00FQK1H8C",
    productId: "3344210099",
    category: "Home Fragrance",
    brand: "Aurelle Candles",
    title: "Aurelle Candles Vanilla Tobacco Scented Jar Candle, 12 oz",
    thumbnailUrl: candleThumbnail("B00FQK1H8C"),
    metrics: { compliance: 54, seo: 30, aeo: 40, ops: 930 },
    salsifyIssues: [{ type: "warning", label: "Bullet count low" }],
    lastUpdated: "Jan 22, 2025",
    pimSyncedOn: "2026-06-25",
    aiSyncedOn: "2026-06-25",
    isBookmarked: true,
    actionStatus: "in-progress",
  },
  {
    id: "sku-5",
    asin: "B00H8R3KM2",
    productId: "5612430018",
    category: "Home Fragrance",
    brand: "Aurelle Candles",
    title: "Room-Filling Spiced Cedar Three-Wick Soy Candle, 21 oz",
    thumbnailUrl: candleThumbnail("B00H8R3KM2"),
    metrics: { compliance: 30, seo: 25, aeo: 20, ops: 2310 },
    salsifyIssues: [
      { type: "error", label: "Description missing" },
      { type: "error", label: "Image mismatch" },
    ],
    lastUpdated: "Mar 19, 2025",
    pimSyncedOn: "2026-06-28",
    aiSyncedOn: "2026-06-28",
    actionStatus: "to-do",
  },
  {
    id: "sku-6",
    asin: "B003IH3JN4",
    productId: "7701230056",
    category: "Home Fragrance",
    brand: "Aurelle Candles",
    title: "Aurelle Candles Pink Sands Scented Tumbler Candle, 10 oz",
    thumbnailUrl: candleThumbnail("B003IH3JN4"),
    metrics: { compliance: 72, seo: 55, aeo: 48, ops: 5480 },
    salsifyIssues: [{ type: "warning", label: "Title too long" }],
    lastUpdated: "Mar 3, 2025",
    pimSyncedOn: "2026-06-27",
    aiSyncedOn: "2026-06-27",
    actionStatus: "to-do",
  },
  {
    id: "sku-7",
    asin: "B00005UP2P",
    productId: "6600450077",
    category: "Home Fragrance",
    brand: "Aurelle Candles",
    title: "Bergamot Grove Decorative Scented Pillar Candle Set",
    thumbnailUrl: candleThumbnail("B00005UP2P"),
    metrics: { compliance: 88, seo: 75, aeo: 62, ops: 12400 },
    salsifyIssues: [{ type: "error", label: "Image mismatch" }],
    lastUpdated: "Apr 12, 2025",
    pimSyncedOn: "2026-06-28",
    aiSyncedOn: "2026-06-28",
    actionStatus: "in-progress",
  },
  {
    id: "sku-8",
    asin: "B00FLYWNYQ",
    productId: "4412870088",
    category: "Home Fragrance",
    brand: "Aurelle Candles",
    title: "Aurelle Candles Coastal Linen Large Scented Jar, 22 oz",
    thumbnailUrl: candleThumbnail("B00FLYWNYQ"),
    metrics: { compliance: 45, seo: 38, aeo: 30, ops: 8750 },
    salsifyIssues: [{ type: "warning", label: "Bullet count low" }],
    lastUpdated: "Apr 1, 2025",
    pimSyncedOn: "2026-06-26",
    aiSyncedOn: "2026-06-26",
    actionStatus: "to-do",
  },
  {
    id: "sku-9",
    asin: "B079KLGWGR",
    productId: "3301990099",
    category: "Home Fragrance",
    brand: "Aurelle Candles",
    title: "Hearthwood Cedar Hand-Poured Soy Jar Candle, 18 oz",
    thumbnailUrl: candleThumbnail("B079KLGWGR"),
    metrics: { compliance: 65, seo: 50, aeo: 42, ops: 3190 },
    salsifyIssues: [{ type: "error", label: "Description missing" }],
    lastUpdated: "Mar 28, 2025",
    pimSyncedOn: "2026-06-28",
    aiSyncedOn: "2026-06-28",
    actionStatus: "to-do",
  },
  {
    id: "sku-10",
    asin: "B08C4L7HC1",
    productId: "2209880010",
    category: "Home Fragrance",
    brand: "Aurelle Candles",
    title: "Rasa Decorative Scented Candle Duo Gift Set",
    thumbnailUrl: candleThumbnail("B08C4L7HC1"),
    metrics: { compliance: 38, seo: 22, aeo: 18, ops: 620 },
    salsifyIssues: [
      { type: "error", label: "Image mismatch" },
      { type: "error", label: "Description missing" },
    ],
    lastUpdated: "Feb 27, 2025",
    pimSyncedOn: "2026-06-25",
    aiSyncedOn: "2026-06-25",
    actionStatus: "to-do",
  },
]

// ─── Content initializer ──────────────────────────────────────────────────────

export function makeInitialContent(sku: Sku): SkuContent {
  const bundle = SKU_CONTENT[sku.id] ?? SKU_CONTENT["sku-1"]
  const pdpImages =
    bundle.pdpContent.images ??
    makePdpImagesFromPim(bundle.images, bundle.pdpContent.imageCount)
  return {
    ...bundle,
    pdpContent: { ...bundle.pdpContent, images: pdpImages },
    descriptionStatus: bundle.descriptionStatus ?? "pending",
    descriptionRecommendation: bundle.descriptionRecommendation,
  }
}

export function buildInitialState(): ContentState {
  return MOCK_SKUS.reduce<ContentState>((acc, sku) => {
    acc[sku.id] = makeInitialContent(sku)
    return acc
  }, {})
}

// ─── Filter utilities ─────────────────────────────────────────────────────────

export function passesFilter(sku: Sku, filter: string): boolean {
  if (filter === "compliance") return sku.metrics.compliance < 100
  if (filter === "seo") return sku.metrics.seo < 100
  if (filter === "aeo") return sku.metrics.aeo < 100
  return true
}

export function passesSearch(sku: Sku, q: string): boolean {
  if (!q.trim()) return true
  const needle = q.trim().toLowerCase()
  return (
    sku.title.toLowerCase().includes(needle) ||
    sku.asin.toLowerCase().includes(needle) ||
    sku.brand.toLowerCase().includes(needle) ||
    sku.category.toLowerCase().includes(needle)
  )
}
