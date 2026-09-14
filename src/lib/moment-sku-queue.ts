import { MOCK_SKUS } from "@/components/home/data"
import type { Sku } from "@/components/home/types"

/** Anything that can seed a Review queue — a moment or an opportunity stream. */
export interface SkuQueueSource {
  id: string
  name: string
  skuCount: number
}

/** Build a Review-queue SKU list sized to the source's pending count. */
export function buildMomentSkuQueue(source: SkuQueueSource): Sku[] {
  const templates = MOCK_SKUS
  return Array.from({ length: source.skuCount }, (_, index) => {
    const template = templates[index % templates.length]!
    const n = index + 1
    return {
      ...template,
      id: `${source.id}-sku-${n}`,
      asin: `B${String(8000000000 + n).slice(0, 10)}`,
      productId: String(7000000000 + n),
      title: `${template.title.replace(/ · .*$/, "")} · ${source.name} #${n}`,
      actionStatus: "to-do" as const,
      isBookmarked: false,
    }
  })
}
