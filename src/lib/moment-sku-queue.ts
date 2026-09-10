import { MOCK_SKUS } from "@/components/home/data"
import type { Sku } from "@/components/home/types"
import type { UpcomingMoment } from "@/components/landing/types"

/** Build a Review-queue SKU list sized to the moment's pending count. */
export function buildMomentSkuQueue(moment: UpcomingMoment): Sku[] {
  const templates = MOCK_SKUS
  return Array.from({ length: moment.skuCount }, (_, index) => {
    const template = templates[index % templates.length]!
    const n = index + 1
    return {
      ...template,
      id: `${moment.id}-sku-${n}`,
      asin: `B${String(8000000000 + n).slice(0, 10)}`,
      productId: String(7000000000 + n),
      title: `${template.title.replace(/ · .*$/, "")} · ${moment.name} #${n}`,
      actionStatus: "to-do" as const,
      isBookmarked: false,
    }
  })
}
