import { MOCK_SKUS } from "@/components/home/data"
import type { Sku } from "@/components/home/types"

/** Anything that can seed a Review queue — a moment or an opportunity stream. */
export interface SkuQueueSource {
  id: string
  name: string
  skuCount: number
}

interface BucketQueueSeed {
  id: string
  title: string
  skuCount: number
}

/** Build a Review-queue SKU list sized to the source's pending count. */
export function buildMomentSkuQueue(source: SkuQueueSource): Sku[] {
  return buildSizedSkuQueue(source.id, source.name, source.skuCount)
}

/** One aggregated job pattern — queue shows only SKUs in that bucket. */
export function buildBucketSkuQueue(
  source: SkuQueueSource,
  bucket: BucketQueueSeed,
): Sku[] {
  return buildSizedSkuQueue(
    `${source.id}-${bucket.id}`,
    bucket.title,
    bucket.skuCount,
  )
}

function buildSizedSkuQueue(
  idPrefix: string,
  queueLabel: string,
  count: number,
): Sku[] {
  const templates = MOCK_SKUS
  return Array.from({ length: count }, (_, index) => {
    const template = templates[index % templates.length]!
    const n = index + 1
    return {
      ...template,
      id: `${idPrefix}-sku-${n}`,
      asin: `B${String(8000000000 + n).slice(0, 10)}`,
      productId: String(7000000000 + n),
      title: `${template.title.replace(/ · .*$/, "")} · ${queueLabel} #${n}`,
      actionStatus: "to-do" as const,
      isBookmarked: false,
    }
  })
}
